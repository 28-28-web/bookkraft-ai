// Records a Paddle purchase and grants access, atomically, over the direct
// Postgres connection (DATABASE_URL) — the same privileged, server-only
// path used for deduct_credits and the job worker. No PostgREST, no anon
// grant, no SECURITY DEFINER function reachable from the public anon key.
// This must stay that way: the Paddle signature check lives entirely in
// the webhook route (src/app/api/paddle-webhook/route.js), and this
// function is the only thing that can grant access after that check
// passes. Anything that exposes this path to an unauthenticated client —
// directly or indirectly — reintroduces the privilege-escalation hole a
// prior version of this migration had (SECURITY DEFINER RPC granted to
// anon, callable straight from the browser's public anon key).

import { getPool } from '@/lib/db/pool';

/**
 * Insert the purchase record and grant access in one transaction.
 * Idempotent on paddle_order_id (the Paddle transaction ID) — a retried
 * webhook delivery for the same transaction returns { alreadyProcessed:
 * true } instead of double-crediting.
 *
 * Throws on failure (missing users row, DB error) — the caller (webhook
 * route) is responsible for turning that into a non-2xx response so
 * Paddle retries instead of marking delivery successful.
 */
export async function processPaddlePurchase({
    userId,
    purchaseType,
    paddleOrderId,
    amountPaid,
    creditsToAdd,
    grantLogicBundle,
    grantFullAccess,
    grantLifetime,
}) {
    const db = getPool();
    const client = await db.connect();

    try {
        await client.query('begin');

        const { rows: existing } = await client.query(
            `select id from purchases where paddle_order_id = $1`,
            [paddleOrderId]
        );
        if (existing.length > 0) {
            await client.query('rollback');
            return { ok: true, alreadyProcessed: true };
        }

        try {
            await client.query(
                `insert into purchases (user_id, purchase_type, paddle_order_id, amount_paid, credits_added)
                 values ($1, $2, $3, $4, $5)`,
                [userId, purchaseType, paddleOrderId, amountPaid || 0, creditsToAdd || 0]
            );
        } catch (err) {
            // Lost a race to a concurrent delivery of the same transaction —
            // that delivery already did the crediting. Not an error.
            if (err.code === '23505') {
                await client.query('rollback');
                return { ok: true, alreadyProcessed: true };
            }
            throw err;
        }

        const { rowCount } = await client.query(
            `update users
             set has_logic_bundle = has_logic_bundle or $2,
                 has_full_access  = has_full_access  or $3,
                 is_lifetime      = is_lifetime      or $4,
                 credits_balance  = credits_balance + $5
             where id = $1`,
            [userId, !!grantLogicBundle, !!grantFullAccess, !!grantLifetime, creditsToAdd || 0]
        );

        if (rowCount === 0) {
            throw new Error(`No users row found for id ${userId} — purchase not recorded`);
        }

        await client.query('commit');
        return { ok: true, alreadyProcessed: false };
    } catch (err) {
        await client.query('rollback');
        throw err;
    } finally {
        client.release();
    }
}
