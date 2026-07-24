// Job creation and lookup.
//
// Credits are RESERVED, not deducted, at job creation — this is a soft hold
// checked against (balance - other in-flight reservations), not a balance
// mutation. The only point a user's balance actually changes is the
// deduct_credits RPC call in runner.ts's finalizeJob(), once we know exactly
// how many chunks really succeeded. That keeps the one trusted, atomic
// balance-mutating path in one place instead of split across a subtract-then-
// refund pair.

import { getPool } from '@/lib/db/pool';
import { calculateCreditCost, TOOL_CREDIT_COSTS } from '@/lib/toolAccess';
import { chunkManuscript } from '@/lib/ai/chunker';

const LIFETIME_MAX_CONCURRENT_RUNS = 3;
const LIFETIME_MAX_WORDS_PER_24H = 500_000;

/**
 * Create a job + its chunks in one transaction.
 *
 * Access order mirrors checkToolAccess():
 *   - is_lifetime: unlimited, but capped at 3 concurrent runs + 500k words/24h.
 *   - has_full_access: legacy grandfathered accounts — unconditional, no cap,
 *     no reservation. Never set by new purchases; only pre-existing rows.
 *   - everyone else: real credit balance, reserved (not deducted) up front.
 *
 * Returns { ok: true, jobId, wordCount, chunkCount, creditsReserved }
 * or      { ok: false, error: 'insufficient_credits' | 'concurrent_limit' | 'daily_word_limit' | 'empty_input' }
 */
export async function createJob({ userId, toolSlug, rawText, meta = {} }) {
    if (!TOOL_CREDIT_COSTS[toolSlug]) {
        return { ok: false, error: 'unknown_tool' };
    }

    const chunks = chunkManuscript(rawText);
    if (chunks.length === 0) {
        return { ok: false, error: 'empty_input' };
    }

    const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
    const db = getPool();
    const client = await db.connect();

    try {
        await client.query('begin');

        // Locks the user row so two concurrent job-creation requests can't
        // both read the same "available" balance and over-reserve it.
        const { rows: userRows } = await client.query(
            `select credits_balance, is_lifetime, has_full_access from users where id = $1 for update`,
            [userId]
        );
        const user = userRows[0];
        if (!user) {
            await client.query('rollback');
            return { ok: false, error: 'no_profile' };
        }

        let creditsReserved = 0;

        if (user.is_lifetime) {
            const { rows: concurrentRows } = await client.query(
                `select count(*)::int as n from jobs where user_id = $1 and status in ('queued', 'running')`,
                [userId]
            );
            if (concurrentRows[0].n >= LIFETIME_MAX_CONCURRENT_RUNS) {
                await client.query('rollback');
                return { ok: false, error: 'concurrent_limit' };
            }

            const { rows: wordRows } = await client.query(
                `select coalesce(sum(word_count), 0)::int as words
                 from jobs
                 where user_id = $1 and status != 'failed' and created_at > now() - interval '24 hours'`,
                [userId]
            );
            if (wordRows[0].words + wordCount > LIFETIME_MAX_WORDS_PER_24H) {
                await client.query('rollback');
                return { ok: false, error: 'daily_word_limit' };
            }
        } else if (user.has_full_access) {
            // Grandfathered legacy Full Access — unconditional, no reservation.
        } else {
            creditsReserved = calculateCreditCost(toolSlug, wordCount);

            const { rows: reservedRows } = await client.query(
                `select coalesce(sum(credits_reserved), 0)::int as held
                 from jobs where user_id = $1 and status in ('queued', 'running')`,
                [userId]
            );
            const available = user.credits_balance - reservedRows[0].held;

            if (available < creditsReserved) {
                await client.query('rollback');
                return { ok: false, error: 'insufficient_credits', credits_needed: creditsReserved, credits_balance: available };
            }
        }

        const { rows: jobRows } = await client.query(
            `insert into jobs (user_id, tool_slug, status, total_chunks, word_count, credits_reserved, input_meta)
             values ($1, $2, 'queued', $3, $4, $5, $6)
             returning id`,
            [userId, toolSlug, chunks.length, wordCount, creditsReserved, JSON.stringify(meta)]
        );
        const jobId = jobRows[0].id;

        for (const chunk of chunks) {
            await client.query(
                `insert into job_chunks (job_id, chunk_index, start_offset, end_offset, input_text)
                 values ($1, $2, $3, $4, $5)`,
                [jobId, chunk.index, chunk.startOffset, chunk.endOffset, chunk.text]
            );
        }

        await client.query('commit');

        return { ok: true, jobId, wordCount, chunkCount: chunks.length, creditsReserved };
    } catch (err) {
        await client.query('rollback');
        throw err;
    } finally {
        client.release();
    }
}

export async function getJobWithChunks(jobId, userId) {
    const db = getPool();
    const { rows: jobRows } = await db.query(`select * from jobs where id = $1 and user_id = $2`, [jobId, userId]);
    const job = jobRows[0];
    if (!job) return null;

    const { rows: chunkRows } = await db.query(
        `select chunk_index, status, error from job_chunks where job_id = $1 order by chunk_index`,
        [jobId]
    );

    return { job, chunks: chunkRows };
}

/**
 * Estimate cost/size without creating a job.
 */
export function estimateJob(toolSlug, rawText) {
    const chunks = chunkManuscript(rawText);
    const wordCount = rawText.trim().split(/\s+/).filter(Boolean).length;
    return {
        wordCount,
        chunkCount: chunks.length,
        estimatedCredits: calculateCreditCost(toolSlug, wordCount),
    };
}
