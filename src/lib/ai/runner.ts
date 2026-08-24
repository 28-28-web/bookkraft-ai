// Drives chunk processing for a single job: claims chunks with
// SELECT ... FOR UPDATE SKIP LOCKED, runs up to 3 at a time, retries
// transient failures, writes each result to its own row the moment it's
// ready, and merges everything into the job's final output once every
// chunk has reached a terminal state.

import { getPool } from '@/lib/db/pool';
import { callClaude } from '@/lib/toolAccess';

const CONCURRENCY_PER_JOB = 3;
const MAX_ATTEMPTS = 3;
const MAX_FINALIZE_ATTEMPTS = 5;

type ToolConfig = {
    mainTextField: string;
    listFields: { name: string; dedupeKey: (item: any) => string }[];
    systemPrompt: string;
    buildUserPrompt: (chunkText: string, meta: Record<string, any>) => string;
    responseSchemaHint: string;
};

const TOOL_CONFIGS: Record<string, ToolConfig> = {
    'manuscript-cleanup': {
        mainTextField: 'cleaned_text',
        listFields: [
            { name: 'changes', dedupeKey: (i) => `${i.type}::${String(i.description || '').slice(0, 40).toLowerCase()}` },
            { name: 'flags', dedupeKey: (i) => `${i.type}::${String(i.word || '').toLowerCase()}` },
        ],
        systemPrompt: 'You are a professional manuscript editor specializing in eBook formatting. Return ONLY valid JSON. No markdown. No text outside the JSON object.',
        buildUserPrompt: (chunkText, meta) => `Clean this section of a larger ${meta.genre || 'fiction'} manuscript. Mode: ${meta.mode || 'deep'}. Apply: ${meta.enabledChecks || 'all'}.
This is one chunk of a longer manuscript — clean it on its own terms, do not reference other chunks.

TEXT:
${chunkText}

Return ONLY: {
  "cleaned_text": "the full cleaned text for this chunk",
  "changes": [{"type": "string", "description": "string"}],
  "flags": [{"type": "repeat|cliche", "word": "string", "occurrences": 0, "suggestion": "string"}]
}
Return at most 30 of the most significant changes in the changes array.`,
        responseSchemaHint: 'cleaned_text/changes/flags',
    },
    'print-to-digital': {
        mainTextField: 'adapted_text',
        listFields: [
            { name: 'conversions', dedupeKey: (i) => `${i.type}::${String(i.original || '').slice(0, 40).toLowerCase()}` },
            { name: 'needs_review', dedupeKey: (i) => `${String(i.item || '').slice(0, 40).toLowerCase()}` },
        ],
        systemPrompt: 'You are an expert in converting print books to digital eBook format. Return ONLY valid JSON. No markdown.',
        buildUserPrompt: (chunkText, meta) => `Convert this section of a larger print-formatted manuscript to eBook-ready digital format.
Apply these adaptations: ${meta.enabledAdaptations || 'all'}
Footnote format preference: ${meta.footnoteFormat || 'endnotes'}
This is one chunk of a longer manuscript — adapt it on its own terms, do not reference other chunks.

For page references: use context to infer chapter. Replace "see page N" with "see [Chapter Name]".

TEXT:
${chunkText}

Return ONLY: {
  "adapted_text": "the full adapted text for this chunk",
  "conversions": [{"type": "page_reference|footnote|running_header|table|figure_ref", "original": "string", "replacement": "string"}],
  "needs_review": [{"item": "string", "reason": "string"}]
}`,
        responseSchemaHint: 'adapted_text/conversions/needs_review',
    },
    'style-sheet-auditor': {
        mainTextField: '',
        listFields: [
            { name: 'violations', dedupeKey: (i) => `${i.category}::${String(i.quoted_text || '').slice(0, 40).toLowerCase()}` },
            { name: 'detected_rules', dedupeKey: (i) => `${i.category}::${String(i.rule || '').slice(0, 40).toLowerCase()}` },
        ],
        systemPrompt: 'You are a professional copy editor. Find style inconsistencies. Return ONLY valid JSON.',
        buildUserPrompt: (chunkText, meta) => `Audit this section of a larger manuscript for style inconsistencies.
${meta.styleInstruction || "Infer the author's intended style rules, then find violations."}
This is one chunk of a longer manuscript — audit it on its own terms; a separate merge step reconciles findings across chunks.

Categories to check: ${meta.enabledCategories || 'all'}

TEXT:
${chunkText}

Return ONLY: {
  "detected_rules": [{"category": "string", "rule": "string"}],
  "violations": [{"severity": "critical|warning|notice", "category": "string", "quoted_text": "string", "issue": "string", "suggestion": "string"}]
}`,
        responseSchemaHint: 'detected_rules/violations',
    },
};

export function getToolConfig(toolSlug: string): ToolConfig | null {
    return TOOL_CONFIGS[toolSlug] || null;
}

function sleep(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

function isRetryable(err: any): boolean {
    const msg = String(err?.message || '');
    return /Claude API error: (429|5\d\d)/.test(msg);
}

async function processOneChunk(chunk: any, config: ToolConfig, meta: Record<string, any>, toolSlug: string) {
    const db = getPool();
    let lastError: any = null;

    for (let attempt = 1; attempt <= MAX_ATTEMPTS; attempt++) {
        try {
            const data = await callClaude({
                system: config.systemPrompt,
                user: config.buildUserPrompt(chunk.input_text, meta),
                temperature: 0,
                maxTokens: 4000,
                toolSlug,
            });
            await db.query(
                `update job_chunks set status = 'done', result_json = $2, error = null where id = $1`,
                [chunk.id, JSON.stringify(data)]
            );
            return;
        } catch (err: any) {
            lastError = err;
            if (!isRetryable(err) || attempt === MAX_ATTEMPTS) break;
            await sleep(2 ** attempt * 500 + Math.random() * 250);
        }
    }

    await db.query(
        `update job_chunks set status = 'failed', error = $2 where id = $1`,
        [chunk.id, String(lastError?.message || 'Unknown error')]
    );
}

/**
 * Merge every 'done' chunk's result into the job's final output, in
 * chunk_index order (== original document order), deduping list fields.
 */
function mergeChunkResults(config: ToolConfig, doneChunks: any[]) {
    const sorted = [...doneChunks].sort((a, b) => a.chunk_index - b.chunk_index);
    const merged: Record<string, any> = {};

    if (config.mainTextField) {
        merged[config.mainTextField] = sorted
            .map((c) => c.result_json?.[config.mainTextField] || '')
            .join('\n\n');
    }

    for (const field of config.listFields) {
        const seen = new Set<string>();
        const items: any[] = [];
        for (const chunk of sorted) {
            const list = chunk.result_json?.[field.name];
            if (!Array.isArray(list)) continue;
            for (const item of list) {
                const key = field.dedupeKey(item);
                if (seen.has(key)) continue;
                seen.add(key);
                items.push(item);
            }
        }
        merged[field.name] = items;
    }

    return merged;
}

/**
 * Drive one job to completion (or as far as it can go). Safe to call
 * repeatedly / after a restart — it only ever claims 'queued' chunks and
 * picks up wherever the job was left.
 *
 * Reads meta (mode/genre/checks etc.) from the job row itself rather than
 * taking it as a parameter — the poll loop in instrumentation.js only ever
 * calls runJob(id), so a parameter here was silently always {} and every
 * chunk prompt fell back to defaults regardless of what the user picked.
 */
export async function runJob(jobId: string) {
    const db = getPool();

    const { rows: jobRows } = await db.query(`select * from jobs where id = $1`, [jobId]);
    const job = jobRows[0];
    if (!job) return;
    const meta = job.input_meta || {};

    const config = getToolConfig(job.tool_slug);
    if (!config) {
        await db.query(`update jobs set status = 'failed', error = $2 where id = $1`, [jobId, `Unknown tool: ${job.tool_slug}`]);
        return;
    }

    if (job.status === 'queued') {
        await db.query(`update jobs set status = 'running' where id = $1`, [jobId]);
    }

    while (true) {
        const { rows: claimed } = await db.query(
            `update job_chunks
             set status = 'running', attempts = attempts + 1
             where id in (
                 select id from job_chunks
                 where job_id = $1 and status = 'queued'
                 order by chunk_index
                 limit $2
                 for update skip locked
             )
             returning *`,
            [jobId, CONCURRENCY_PER_JOB]
        );

        if (claimed.length === 0) break;

        await Promise.all(claimed.map((chunk) => processOneChunk(chunk, config, meta, job.tool_slug)));

        const { rows: progressRows } = await db.query(
            `select count(*) filter (where status = 'done') as done,
                    count(*) filter (where status = 'failed') as failed
             from job_chunks where job_id = $1`,
            [jobId]
        );
        const { done, failed } = progressRows[0];
        await db.query(
            `update jobs set completed_chunks = $2 where id = $1`,
            [jobId, Number(done) + Number(failed)]
        );
    }

    await finalizeJob(jobId, config);
}

async function finalizeJob(jobId: string, config: ToolConfig) {
    const db = getPool();
    const client = await db.connect();

    try {
        await client.query('begin');

        const { rows: chunkRows } = await client.query(
            `select * from job_chunks where job_id = $1 order by chunk_index`,
            [jobId]
        );

        const doneChunks = chunkRows.filter((c) => c.status === 'done');
        const failedChunks = chunkRows.filter((c) => c.status === 'failed');
        const total = chunkRows.length;

        // No FOR UPDATE here: instrumentation.js inFlight Set guarantees a single
        // finalizeJob caller per job within one process, and the db.query counter
        // bump below uses a separate pool connection that would deadlock if this
        // row were locked.
        const { rows: jobRows } = await client.query(`select * from jobs where id = $1`, [jobId]);
        const job = jobRows[0];

        if (doneChunks.length === 0) {
            await client.query(
                `update jobs set status = 'failed', error = 'All chunks failed', credits_charged = 0 where id = $1`,
                [jobId]
            );
            await client.query('commit');
            return;
        }

        const merged = mergeChunkResults(config, doneChunks);
        const status = failedChunks.length === 0 ? 'done' : 'partial';

        // credits_reserved was only ever a soft hold (see jobs.js createJob) —
        // nothing was actually subtracted from the balance yet. This is the
        // one point real money moves, through the same trusted RPC every
        // other single-shot AI tool uses, so deduction stays atomic and in
        // one place instead of a subtract-then-refund pair.
        const chargedCredits = job.credits_reserved > 0
            ? Math.max(1, Math.round((job.credits_reserved * doneChunks.length) / total))
            : 0;

        if (chargedCredits > 0) {
            // deduct_credits is a Supabase RPC normally called through
            // PostgREST (which sets session context per the authenticated
            // request). Called here over a raw pg connection, that context
            // doesn't exist — if the function's body depends on it (e.g. an
            // internal auth.uid() check instead of trusting p_user_id), the
            // call can return successfully while updating zero rows. Verify
            // the balance actually moved instead of trusting the call didn't
            // throw; if it didn't move, throw so this transaction rolls back
            // and the job stays 'running' — the poll loop will retry
            // finalizeJob on the next tick rather than silently marking a
            // free run as paid.
            //
            // The attempt counter is bumped via a separate auto-committed
            // statement (db.query, not client/transaction) so it survives
            // even when the verification below fails and rolls everything
            // else in this transaction back — otherwise a permanently broken
            // deduct_credits would retry forever instead of ever hitting the cap.
            const { rows: attemptRows } = await db.query(
                `update jobs
                 set input_meta = jsonb_set(
                     coalesce(input_meta, '{}'::jsonb),
                     '{finalize_attempts}',
                     to_jsonb(coalesce((input_meta->>'finalize_attempts')::int, 0) + 1)
                 )
                 where id = $1
                 returning (input_meta->>'finalize_attempts')::int as attempts`,
                [jobId]
            );
            const finalizeAttempts = attemptRows[0]?.attempts || 1;

            const { rows: beforeRows } = await client.query(
                `select credits_balance from users where id = $1 for update`,
                [job.user_id]
            );
            const balanceBefore = beforeRows[0]?.credits_balance;

            await client.query(
                `select deduct_credits(p_user_id => $1, p_cost => $2, p_tool_slug => $3, p_history_id => null)`,
                [job.user_id, chargedCredits, job.tool_slug]
            );

            const { rows: afterRows } = await client.query(
                `select credits_balance from users where id = $1`,
                [job.user_id]
            );
            const balanceAfter = afterRows[0]?.credits_balance;

            const actualDelta = (balanceBefore ?? 0) - (balanceAfter ?? 0);
            if (balanceBefore == null || balanceAfter == null || actualDelta !== chargedCredits) {
                if (finalizeAttempts >= MAX_FINALIZE_ATTEMPTS) {
                    // Stop retrying — fail loudly instead of looping forever
                    // or handing out a free run. credits_charged stays 0:
                    // nothing was actually taken, so nothing to refund.
                    await client.query(
                        `update jobs
                         set status = 'failed',
                             error = $2,
                             credits_charged = 0,
                             input_meta = input_meta || $3::jsonb
                         where id = $1`,
                        [
                            jobId,
                            `Credit deduction failed after ${finalizeAttempts} attempts (expected -${chargedCredits}, saw ${actualDelta}). Results were discarded, not charged.`,
                            JSON.stringify({ finalize_attempts: finalizeAttempts }),
                        ]
                    );
                    await client.query('commit');
                    return;
                }

                throw new Error(
                    `deduct_credits did not deduct as expected for job ${jobId}: expected -${chargedCredits}, saw ${actualDelta} (attempt ${finalizeAttempts})`
                );
            }
        }

        await client.query(
            `update jobs
             set status = $2, credits_charged = $3, input_meta = input_meta || $4::jsonb
             where id = $1`,
            [jobId, status, chargedCredits, JSON.stringify({ result: merged })]
        );

        await client.query('commit');
    } catch (err) {
        await client.query('rollback');
        throw err;
    } finally {
        client.release();
    }
}
