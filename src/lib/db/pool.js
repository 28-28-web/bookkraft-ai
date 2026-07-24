// Direct Postgres connection for the AI job worker.
//
// This MUST be the direct connection (port 5432), never the transaction
// pooler (6543/pgbouncer). The worker relies on session state and
// SELECT ... FOR UPDATE SKIP LOCKED inside multi-statement transactions,
// which break under transaction pooling. We validate the URL at first use
// and throw immediately rather than let the worker fail mysteriously later.
//
// Prisma shares this same database from elsewhere — keep this pool small.

import { Pool } from 'pg';

let pool = null;

function assertDirectConnection(connectionString) {
    let parsed;
    try {
        parsed = new URL(connectionString);
    } catch {
        throw new Error('DATABASE_URL is not a valid connection string.');
    }

    if (parsed.searchParams.get('pgbouncer') === 'true') {
        throw new Error(
            'DATABASE_URL points at the pgbouncer transaction pooler (?pgbouncer=true). ' +
            'The job worker needs a direct connection (port 5432) for FOR UPDATE SKIP LOCKED and session state.'
        );
    }

    if (parsed.port === '6543') {
        throw new Error(
            'DATABASE_URL uses port 6543 (transaction pooler). ' +
            'The job worker needs the direct connection on port 5432.'
        );
    }
}

export function getPool() {
    if (pool) return pool;

    const connectionString = process.env.DATABASE_URL;
    if (!connectionString) {
        throw new Error('DATABASE_URL is not set. The AI job worker cannot start without a direct Postgres connection.');
    }

    assertDirectConnection(connectionString);

    pool = new Pool({
        connectionString,
        max: 5,
        idleTimeoutMillis: 30_000,
    });

    pool.on('error', (err) => {
        console.error('[db pool] Unexpected idle client error:', err);
    });

    return pool;
}

/**
 * Startup health check — run once on boot. Logs a clear message instead of
 * letting the first real query fail with a confusing error deep in the worker.
 */
export async function checkDbConnection() {
    if (!process.env.DATABASE_URL) {
        console.error('[db health check] DATABASE_URL is not set — the AI job worker will not run.');
        return false;
    }

    try {
        const db = getPool();
        await db.query('SELECT 1');
        console.log('[db health check] Direct Postgres connection OK.');
        return true;
    } catch (err) {
        console.error('[db health check] Could not reach Postgres via DATABASE_URL:', err.message);
        return false;
    }
}
