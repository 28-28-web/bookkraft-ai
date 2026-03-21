import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

/**
 * Paddle Webhook — v8.0 Credit System
 *
 * Handles 5 purchase types:
 * - essentials: grants has_logic_bundle
 * - credits_starter: adds 15 credits
 * - credits_pro: adds 40 credits
 * - full: grants has_logic_bundle + has_full_access + 30 credits
 * - lifetime: grants everything + is_lifetime
 */
export async function POST(request) {
    try {
        const rawBody = await request.text();
        const signature = request.headers.get('paddle-signature');
        const secret = process.env.PADDLE_WEBHOOK_SECRET;

        // ── Signature verification ──
        if (secret && signature) {
            const { Paddle } = await import('@paddle/paddle-node-sdk');
            const paddle = new Paddle(process.env.PADDLE_API_KEY);
            try {
                paddle.webhooks.unmarshal(rawBody, secret, signature);
            } catch (e) {
                console.error('Invalid Paddle signature');
                return NextResponse.json({ error: 'invalid_signature' }, { status: 401 });
            }
        }

        const body = JSON.parse(rawBody);
        const eventType = body.event_type;

        if (eventType !== 'transaction.completed') {
            return NextResponse.json({ received: true });
        }

        const customData = body.data?.custom_data || {};
        const { userId, purchaseType } = customData;
        const paddleOrderId = body.data?.id || '';
        const amountPaid = parseFloat(body.data?.details?.totals?.total || '0') / 100;

        if (!userId) {
            console.error('Paddle webhook: missing userId in customData');
            return NextResponse.json({ error: 'missing_user_id' }, { status: 400 });
        }

        const supabase = await createClient();

        // ── Essentials Bundle — Logic tools only ──
        if (purchaseType === 'essentials') {
            await supabase.from('users')
                .update({ has_logic_bundle: true })
                .eq('id', userId);

            await supabase.from('purchases').insert({
                user_id: userId, purchase_type: 'essentials',
                paddle_order_id: paddleOrderId, amount_paid: amountPaid, credits_added: 0,
            });
        }

        // ── Starter Credits — 15 credits ──
        if (purchaseType === 'credits_starter') {
            await supabase.rpc('add_credits', {
                p_user_id: userId, p_amount: 15, p_paddle_order_id: paddleOrderId,
            });

            await supabase.from('purchases').insert({
                user_id: userId, purchase_type: 'credits_starter',
                paddle_order_id: paddleOrderId, amount_paid: amountPaid, credits_added: 15,
            });
        }

        // ── Author Pro Credits — 40 credits ──
        if (purchaseType === 'credits_pro') {
            await supabase.rpc('add_credits', {
                p_user_id: userId, p_amount: 40, p_paddle_order_id: paddleOrderId,
            });

            await supabase.from('purchases').insert({
                user_id: userId, purchase_type: 'credits_pro',
                paddle_order_id: paddleOrderId, amount_paid: amountPaid, credits_added: 40,
            });
        }

        // ── Full Access — All logic tools + 30 credits ──
        if (purchaseType === 'full') {
            await supabase.from('users')
                .update({ has_logic_bundle: true, has_full_access: true })
                .eq('id', userId);

            await supabase.rpc('add_credits', {
                p_user_id: userId, p_amount: 30, p_paddle_order_id: paddleOrderId,
            });

            await supabase.from('purchases').insert({
                user_id: userId, purchase_type: 'full',
                paddle_order_id: paddleOrderId, amount_paid: amountPaid, credits_added: 30,
            });
        }

        // ── Lifetime — Everything ──
        if (purchaseType === 'lifetime') {
            await supabase.from('users')
                .update({ has_logic_bundle: true, has_full_access: true, is_lifetime: true })
                .eq('id', userId);

            await supabase.from('purchases').insert({
                user_id: userId, purchase_type: 'lifetime',
                paddle_order_id: paddleOrderId, amount_paid: amountPaid, credits_added: 0,
            });
        }

        return NextResponse.json({ received: true, processed: purchaseType });
    } catch (err) {
        console.error('Paddle webhook error:', err);
        return NextResponse.json({ error: 'webhook_error' }, { status: 500 });
    }
}