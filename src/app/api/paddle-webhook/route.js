import { NextResponse } from 'next/server';
import { processPaddlePurchase } from '@/lib/db/purchases';
import { getPool } from '@/lib/db/pool';
import { BrevoClient } from '@getbrevo/brevo';

/**
 * Fire a GA4 purchase event via Measurement Protocol.
 * Called server-side after processPaddlePurchase confirms a new transaction —
 * more reliable than client-side (fires even if user closes tab after payment).
 *
 * Failure is non-fatal: any error is logged but the webhook still returns 200
 * so Paddle does not retry. The payment flow is never coupled to analytics.
 *
 * gaClientId is the browser's _ga cookie value passed through Paddle customData.
 * If absent (ad blocker, privacy browser), falls back to a synthetic client_id
 * derived from the Paddle order ID so the event still records in GA4 — it just
 * won't be stitched to the user's browsing session.
 */
async function fireGA4PurchaseEvent({ gaClientId, userId, purchaseType, paddleOrderId, amountPaid }) {
    const measurementId = process.env.GA4_MEASUREMENT_ID;
    const apiSecret = process.env.GA4_MP_SECRET;

    if (!measurementId || !apiSecret) {
        console.warn('GA4 MP: GA4_MEASUREMENT_ID or GA4_MP_SECRET not set — skipping purchase event');
        return;
    }

    const clientId = gaClientId || `${Math.floor(Math.random() * 1e9)}.${Math.floor(Date.now() / 1000)}`;

    const payload = {
        client_id: clientId,
        user_id: userId,
        non_personalized_ads: true,
        events: [{
            name: 'purchase',
            params: {
                transaction_id: paddleOrderId,
                value: amountPaid,
                currency: 'USD',
                items: [{
                    item_id: purchaseType,
                    item_name: purchaseType,
                    price: amountPaid,
                    quantity: 1,
                }],
            },
        }],
    };

    try {
        const res = await fetch(
            `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
            { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) }
        );
        if (!res.ok) {
            console.warn(`GA4 MP: purchase event HTTP ${res.status} for order ${paddleOrderId}`);
        } else {
            console.log(`GA4 MP: purchase event fired — order ${paddleOrderId}, value ${amountPaid}, client_id ${gaClientId ? 'real' : 'synthetic'}`);
        }
    } catch (err) {
        console.warn('GA4 MP: fetch failed:', err.message);
    }
}

/**
 * Paddle Webhook — Phase 3 pricing + cross-domain headshot credits
 *
 * All access-granting writes go through processPaddlePurchase() (see
 * src/lib/db/purchases.js), atomically: insert into purchases (idempotent
 * on paddle_order_id) + update users (logic bundle / full access /
 * lifetime flags + credits) in one transaction, over the direct Postgres
 * connection (DATABASE_URL) — never through Supabase's REST API. That's
 * deliberate: this webhook has no Supabase session (Paddle POSTs directly,
 * no cookies), and the Paddle signature check below only exists in this
 * route — anything reachable via PostgREST with the public anon key would
 * bypass that check entirely. Do not swap this back to a Supabase RPC
 * grantable to anon/authenticated.
 *
 * Every branch below returns non-2xx on failure so Paddle retries instead
 * of marking delivery successful on a write that didn't happen.
 *
 * Current tiers: starter (logic bundle + 40 credits), pro (logic bundle +
 * 200 credits), lifetime (everything, unlimited). Retired tiers
 * (essentials / credits_starter / credits_pro / full) are kept in case a
 * stale checkout link is still in flight — no button on the site sends
 * these purchaseTypes anymore.
 *
 * Cross-domain headshot tiers (purchaseType starts with "headshot-"):
 * Initiated from artrating.art, checked out here, credits granted by
 * calling artrating.art/api/add-credits after verifying payment.
 */
const PURCHASE_GRANTS = {
    essentials:      { creditsToAdd: 0,   grantLogicBundle: true,  grantFullAccess: false, grantLifetime: false },
    credits_starter: { creditsToAdd: 15,  grantLogicBundle: false, grantFullAccess: false, grantLifetime: false },
    credits_pro:     { creditsToAdd: 40,  grantLogicBundle: false, grantFullAccess: false, grantLifetime: false },
    full:            { creditsToAdd: 30,  grantLogicBundle: true,  grantFullAccess: true,  grantLifetime: false },
    starter:         { creditsToAdd: 40,  grantLogicBundle: true,  grantFullAccess: false, grantLifetime: false },
    pro:             { creditsToAdd: 200, grantLogicBundle: true,  grantFullAccess: false, grantLifetime: false },
    lifetime:        { creditsToAdd: 0,   grantLogicBundle: true,  grantFullAccess: true,  grantLifetime: true },
};

const HEADSHOT_CREDITS = {
    'headshot-10':  10,
    'headshot-50':  50,
    'headshot-200': 200,
};

async function sendPurchaseNotification({ userId, purchaseType, paddleOrderId, amountPaid, userEmail }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.warn('sendPurchaseNotification: BREVO_API_KEY not set — skipping');
        return;
    }
    try {
        const brevo = new BrevoClient({ apiKey });
        await brevo.transactionalEmails.sendTransacEmail({
            to: [{ email: 'januinetech7979@gmail.com', name: 'Admin' }],
            sender: { email: 'hello@bookkraftai.com', name: 'BookKraft' },
            subject: `[BookKraft] New purchase — ${purchaseType} ($${amountPaid.toFixed(2)})`,
            htmlContent: `
                <p><strong>A new purchase was completed.</strong></p>
                <table style="border-collapse:collapse;font-family:sans-serif">
                    <tr><td style="padding:4px 12px 4px 0"><strong>Plan</strong></td><td>${purchaseType}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Amount</strong></td><td>$${amountPaid.toFixed(2)}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Customer email</strong></td><td>${userEmail || '(not in customData)'}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>User ID</strong></td><td>${userId}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Paddle order</strong></td><td>${paddleOrderId}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Timestamp</strong></td><td>${new Date().toUTCString()}</td></tr>
                </table>
            `,
        });
        console.log(`sendPurchaseNotification: sent for order ${paddleOrderId}`);
    } catch (err) {
        console.warn('sendPurchaseNotification: Brevo send failed:', err.message);
    }
}

async function sendRefundReviewAlert({ userId, purchaseType, paddleTransactionId, creditsReversed, shortfall }) {
    const apiKey = process.env.BREVO_API_KEY;
    if (!apiKey) {
        console.warn('sendRefundReviewAlert: BREVO_API_KEY not set — skipping');
        return;
    }
    try {
        const brevo = new BrevoClient({ apiKey });
        await brevo.transactionalEmails.sendTransacEmail({
            to: [{ email: 'januinetech7979@gmail.com', name: 'Admin' }],
            sender: { email: 'hello@bookkraftai.com', name: 'BookKraft' },
            subject: `[BookKraft Admin] Refund shortfall — manual review required`,
            htmlContent: `
                <p><strong>A refund was processed but the user had already spent some credits.</strong></p>
                <table style="border-collapse:collapse;font-family:sans-serif">
                    <tr><td style="padding:4px 12px 4px 0"><strong>User ID</strong></td><td>${userId}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Purchase type</strong></td><td>${purchaseType}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Paddle order</strong></td><td>${paddleTransactionId}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Credits reversed</strong></td><td>${creditsReversed}</td></tr>
                    <tr><td style="padding:4px 12px 4px 0"><strong>Shortfall</strong></td><td>${shortfall} credits (already spent before refund)</td></tr>
                </table>
                <p>User balance floored at 0. <code>refund_review_required = true</code> on their account.</p>
                <p>Check the jobs table to audit actual credit consumption for this user.</p>
            `,
        });
        console.log(`sendRefundReviewAlert: sent for order ${paddleTransactionId}`);
    } catch (err) {
        console.warn('sendRefundReviewAlert: Brevo send failed:', err.message);
    }
}

async function processRefundAdjustment({ paddleTransactionId }) {
    const pool = getPool();
    const client = await pool.connect();
    try {
        await client.query('BEGIN');

        // Lock the purchase row. Two concurrent Paddle deliveries of the same
        // adjustment will serialize here: the second blocks until the first
        // commits, then sees refunded_at IS NOT NULL and skips (idempotent).
        const { rows: purchaseRows } = await client.query(
            `SELECT id, user_id, purchase_type, credits_added, refunded_at
             FROM purchases
             WHERE paddle_order_id = $1
             FOR UPDATE`,
            [paddleTransactionId]
        );

        if (purchaseRows.length === 0) {
            // Headshot purchase, test charge, or purchase predates our records.
            await client.query('ROLLBACK');
            return { skipped: 'no_matching_purchase' };
        }

        const purchase = purchaseRows[0];

        if (purchase.refunded_at !== null) {
            // Same adjustment already processed — idempotency gate.
            await client.query('ROLLBACK');
            return { skipped: 'already_refunded' };
        }

        // Stamp refunded_at before touching anything else.
        await client.query(
            `UPDATE purchases SET refunded_at = NOW() WHERE id = $1`,
            [purchase.id]
        );

        const creditsToReverse = purchase.credits_added ?? 0;

        // Re-derive access flags from remaining non-refunded purchases so we
        // don't blind-clear flags if the user bought multiple tiers.
        const { rows: remainingRows } = await client.query(
            `SELECT purchase_type FROM purchases
             WHERE user_id = $1 AND refunded_at IS NULL`,
            [purchase.user_id]
        );

        const netLogicBundle = remainingRows.some(r => PURCHASE_GRANTS[r.purchase_type]?.grantLogicBundle);
        const netFullAccess  = remainingRows.some(r => PURCHASE_GRANTS[r.purchase_type]?.grantFullAccess);
        const netLifetime    = remainingRows.some(r => PURCHASE_GRANTS[r.purchase_type]?.grantLifetime);

        // Lock user row for balance update (purchase → user order, same as
        // processPaddlePurchase, so deadlock impossible between the two).
        const { rows: userRows } = await client.query(
            `SELECT credits_balance FROM users WHERE id = $1 FOR UPDATE`,
            [purchase.user_id]
        );

        if (userRows.length === 0) {
            await client.query('ROLLBACK');
            return { skipped: 'user_not_found' };
        }

        const currentBalance = userRows[0].credits_balance ?? 0;
        const newBalance = Math.max(0, currentBalance - creditsToReverse);
        const shortfall = Math.max(0, creditsToReverse - currentBalance);
        const needsReview = shortfall > 0;

        await client.query(
            `UPDATE users SET
               credits_balance       = $1,
               has_logic_bundle      = $2,
               has_full_access       = $3,
               is_lifetime           = $4,
               refund_review_required = $5
             WHERE id = $6`,
            [newBalance, netLogicBundle, netFullAccess, netLifetime, needsReview, purchase.user_id]
        );

        await client.query('COMMIT');

        if (needsReview) {
            console.warn(
                `processRefundAdjustment: shortfall ${shortfall} credits — user ${purchase.user_id} flagged for review`
            );
        }

        return {
            processed: true,
            userId: purchase.user_id,
            purchaseType: purchase.purchase_type,
            creditsReversed: creditsToReverse,
            newBalance,
            shortfall,
            needsReview,
            netLogicBundle,
            netFullAccess,
            netLifetime,
        };
    } catch (err) {
        await client.query('ROLLBACK');
        throw err;
    } finally {
        client.release();
    }
}

export async function POST(request) {
    const rawBody = await request.text();

    try {
        const signature = request.headers.get('paddle-signature');
        const secret = process.env.PADDLE_WEBHOOK_SECRET;

        if (!secret) {
            console.error('Paddle webhook: PADDLE_WEBHOOK_SECRET is not set — refusing to process.');
            return NextResponse.json({ error: 'webhook_not_configured' }, { status: 500 });
        }
        if (!signature) {
            return NextResponse.json({ error: 'missing_signature' }, { status: 401 });
        }

        const { Paddle } = await import('@paddle/paddle-node-sdk');
        const paddle = new Paddle(process.env.PADDLE_API_KEY);
        try {
            paddle.webhooks.unmarshal(rawBody, secret, signature);
        } catch (e) {
            console.error('Invalid Paddle signature');
            return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
        }

        const body = JSON.parse(rawBody);
        const eventType = body.event_type;

        if (eventType === 'adjustment.created' || eventType === 'adjustment.updated') {
            const action = body.data?.action;
            const status = body.data?.status;
            if (!['refund', 'chargeback'].includes(action) || status !== 'approved') {
                return NextResponse.json({ received: true });
            }

            const adjTransactionId = body.data?.transaction_id;
            if (!adjTransactionId) {
                console.error('Paddle webhook: adjustment missing transaction_id');
                return NextResponse.json({ error: 'missing_transaction_id' }, { status: 400 });
            }

            let result;
            try {
                result = await processRefundAdjustment({ paddleTransactionId: adjTransactionId });
            } catch (err) {
                console.error('processRefundAdjustment failed:', err.message);
                return NextResponse.json({ error: 'refund_processing_failed' }, { status: 500 });
            }

            if (result.skipped) {
                console.log(`Paddle refund skipped (${result.skipped}) for transaction ${adjTransactionId}`);
                return NextResponse.json({ received: true, skipped: result.skipped });
            }

            console.log(
                `Paddle refund processed: user=${result.userId} type=${result.purchaseType} ` +
                `reversed=${result.creditsReversed} new_balance=${result.newBalance} shortfall=${result.shortfall}`
            );

            if (result.needsReview) {
                await sendRefundReviewAlert({
                    userId: result.userId,
                    purchaseType: result.purchaseType,
                    paddleTransactionId: adjTransactionId,
                    creditsReversed: result.creditsReversed,
                    shortfall: result.shortfall,
                });
            }

            return NextResponse.json({ received: true, processed: true });
        }

        if (eventType !== 'transaction.completed') {
            return NextResponse.json({ received: true });
        }

        const customData = body.data?.custom_data || {};
        const { userId, purchaseType, userEmail } = customData;
        const paddleOrderId = body.data?.id;
        const amountPaid = parseFloat(body.data?.details?.totals?.total || '0') / 100;

        if (!paddleOrderId) {
            console.error('Paddle webhook: missing transaction id');
            return NextResponse.json({ error: 'missing_transaction_id' }, { status: 400 });
        }

        // ── Cross-domain headshot purchase ──────────────────────────────────
        // purchaseType is 'headshot-10', 'headshot-50', or 'headshot-200'.
        // No bookkraftai userId — credits go to artrating.art via its
        // /api/add-credits endpoint, authenticated with a shared secret.
        if (purchaseType && purchaseType.startsWith('headshot-')) {
            const creditsToAdd = HEADSHOT_CREDITS[purchaseType];
            if (!creditsToAdd) {
                console.error('Paddle webhook: unknown headshot purchaseType', purchaseType);
                return NextResponse.json({ error: 'unknown_headshot_type' }, { status: 400 });
            }
            if (!userEmail) {
                console.error('Paddle webhook: headshot purchase missing userEmail in customData');
                return NextResponse.json({ error: 'missing_user_email' }, { status: 400 });
            }

            const artSecret = process.env.ARTRATING_WEBHOOK_SECRET;
            if (!artSecret) {
                console.error('Paddle webhook: ARTRATING_WEBHOOK_SECRET not set — cannot credit artrating user');
                return NextResponse.json({ error: 'artrating_secret_not_configured' }, { status: 500 });
            }

            let artRes;
            try {
                artRes = await fetch('https://artrating.art/api/add-credits', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${artSecret}`,
                    },
                    body: JSON.stringify({ email: userEmail, credits: creditsToAdd, paddleOrderId }),
                });
            } catch (err) {
                console.error('Paddle webhook: failed to reach artrating.art/api/add-credits:', err);
                return NextResponse.json({ error: 'artrating_unreachable' }, { status: 502 });
            }

            if (!artRes.ok) {
                const text = await artRes.text().catch(() => '');
                console.error('Paddle webhook: artrating.art/api/add-credits returned', artRes.status, text);
                // 404 = user not found — don't retry, log and move on
                if (artRes.status === 404) {
                    return NextResponse.json({ received: true, error: 'artrating_user_not_found' });
                }
                return NextResponse.json({ error: 'artrating_credit_failed' }, { status: 502 });
            }

            const artBody = await artRes.json().catch(() => ({}));
            console.log(`Paddle webhook: headshot credits granted — ${creditsToAdd} credits → ${userEmail}`, artBody);
            return NextResponse.json({ received: true, processed: purchaseType, creditsGranted: creditsToAdd });
        }

        // ── Standard bookkraftai purchase ───────────────────────────────────
        if (!userId) {
            console.error('Paddle webhook: missing userId in customData');
            return NextResponse.json({ error: 'missing_user_id' }, { status: 400 });
        }

        const grant = PURCHASE_GRANTS[purchaseType];
        if (!grant) {
            console.error('Paddle webhook: unknown purchaseType', purchaseType);
            return NextResponse.json({ error: 'unknown_purchase_type' }, { status: 400 });
        }

        let result;
        try {
            result = await processPaddlePurchase({
                userId,
                purchaseType,
                paddleOrderId,
                amountPaid,
                creditsToAdd: grant.creditsToAdd,
                grantLogicBundle: grant.grantLogicBundle,
                grantFullAccess: grant.grantFullAccess,
                grantLifetime: grant.grantLifetime,
            });
        } catch (err) {
            console.error('processPaddlePurchase failed:', err.message);
            return NextResponse.json({ error: 'purchase_processing_failed' }, { status: 500 });
        }

        // Fire GA4 purchase event and admin notification only for new transactions —
        // not idempotent replays (Paddle may retry a webhook that already succeeded).
        if (!result.alreadyProcessed) {
            await fireGA4PurchaseEvent({
                gaClientId: customData.gaClientId ?? null,
                userId,
                purchaseType,
                paddleOrderId,
                amountPaid,
            });
            void sendPurchaseNotification({ userId, purchaseType, paddleOrderId, amountPaid, userEmail });
        }

        return NextResponse.json({
            received: true,
            processed: purchaseType,
            already_processed: !!result.alreadyProcessed,
        });
    } catch (err) {
        console.error('Paddle webhook error:', err);
        return NextResponse.json({ error: 'webhook_error' }, { status: 500 });
    }
}
