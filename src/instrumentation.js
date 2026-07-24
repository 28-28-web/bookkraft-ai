// Runs once when the Next.js server process boots. Two jobs:
//  1. Reset any chunks left stuck 'running' by a crash/redeploy back to
//     'queued' so interrupted jobs resume instead of dying silently.
//  2. Start the in-process poll loop that drives job chunks to completion.
//
// This is a persistent Node process (Dockerfile runs `node server.js`, not
// serverless), so a single module-level loop here is a legitimate worker —
// no external queue needed at this scale.

const POLL_INTERVAL_MS = 2000;
const inFlight = new Set();

export async function register() {
    if (process.env.NEXT_RUNTIME !== 'nodejs') return;

    const { PADDLE_PRICE_IDS } = await import('@/lib/constants');
    const missing = Object.entries(PADDLE_PRICE_IDS).filter(([, id]) => id.startsWith('TODO_'));
    if (missing.length > 0) {
        console.warn('');
        console.warn('╔══════════════════════════════════════════════════════════════════╗');
        console.warn('║  WARNING: Paddle price ID(s) still a placeholder — checkout WILL   ║');
        console.warn('║  fail for these tiers until real IDs are set in lib/constants.js:  ║');
        missing.forEach(([tier]) => console.warn(`║    - ${tier}`.padEnd(70) + '║'));
        console.warn('╚══════════════════════════════════════════════════════════════════╝');
        console.warn('');
    }

    const { checkDbConnection, getPool } = await import('@/lib/db/pool');

    const ok = await checkDbConnection();
    if (!ok) {
        console.error('[jobs] Skipping worker startup — no working DATABASE_URL.');
        return;
    }

    try {
        const db = getPool();
        const { rowCount } = await db.query(
            `update job_chunks set status = 'queued' where status = 'running'`
        );
        if (rowCount > 0) {
            console.log(`[jobs] Reset ${rowCount} chunk(s) stuck 'running' after restart — they'll resume.`);
        }
    } catch (err) {
        console.error('[jobs] Failed to reset stuck chunks on boot:', err.message);
        return;
    }

    const { runJob } = await import('@/lib/ai/runner');
    const db = getPool();

    setInterval(async () => {
        let rows;
        try {
            ({ rows } = await db.query(
                `select id from jobs where status in ('queued', 'running') order by created_at limit 20`
            ));
        } catch (err) {
            console.error('[jobs] Poll query failed:', err.message);
            return;
        }

        for (const { id } of rows) {
            if (inFlight.has(id)) continue;
            inFlight.add(id);
            runJob(id)
                .catch((err) => console.error(`[jobs] Job ${id} crashed:`, err.message))
                .finally(() => inFlight.delete(id));
        }
    }, POLL_INTERVAL_MS);

    console.log('[jobs] Worker loop started.');
}
