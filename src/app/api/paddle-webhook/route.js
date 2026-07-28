import { NextResponse } from 'next/server';
import { processPaddlePurchase } from '@/lib/db/purchases';

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
