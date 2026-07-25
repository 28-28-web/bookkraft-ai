import { NextResponse } from 'next/server';
import { processPaddlePurchase } from '@/lib/db/purchases';

/**
 * Paddle Webhook — Phase 3 pricing
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

export async function POST(request) {
    const rawBody = await request.text();

    try {
        const signature = request.headers.get('paddle-signature');
        const secret = process.env.PADDLE_WEBHOOK_SECRET;

        // Fail closed: no secret configured means we cannot verify this
        // request came from Paddle at all. Previously this skipped
        // verification entirely and processed the event anyway — anyone
        // who found this URL could grant themselves credits.
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
        const { userId, purchaseType } = customData;
        const paddleOrderId = body.data?.id;
        const amountPaid = parseFloat(body.data?.details?.totals?.total || '0') / 100;

        if (!userId) {
            console.error('Paddle webhook: missing userId in customData');
            return NextResponse.json({ error: 'missing_user_id' }, { status: 400 });
        }
        if (!paddleOrderId) {
            console.error('Paddle webhook: missing transaction id');
            return NextResponse.json({ error: 'missing_transaction_id' }, { status: 400 });
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
