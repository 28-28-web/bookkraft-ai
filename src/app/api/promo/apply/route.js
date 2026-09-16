import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

export async function POST(request) {
    let step = 'auth';
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const body = await request.json().catch(() => ({}));
        const raw = typeof body.code === 'string' ? body.code.trim().toUpperCase() : '';
        if (!raw || !/^[A-Z0-9_-]{3,32}$/.test(raw)) {
            return NextResponse.json({ error: 'invalid_code' }, { status: 400 });
        }

        const admin = createAdminClient();

        step = 'fetch_promo';
        // DEBUG: dump raw query result before .single() to see what DB returns
        const { data: debugRows, error: debugError } = await admin
            .from('promo_codes')
            .select('*')
            .eq('code', raw);
        console.log('[promo debug]', JSON.stringify({ code: raw, rows: debugRows, error: debugError }));

        const { data: promo, error: promoError } = await admin
            .from('promo_codes')
            .select('id, plan, duration_months, max_uses, current_uses')
            .eq('code', raw)
            .single();

        if (promoError || !promo) {
            console.error('[promo] fetch_promo failed:', promoError);
            return NextResponse.json({ error: 'code_not_found' }, { status: 404 });
        }
        if (promo.current_uses >= promo.max_uses) {
            return NextResponse.json({ error: 'code_exhausted' }, { status: 409 });
        }

        step = 'insert_user_promo';
        const { error: usedError } = await admin
            .from('user_promo_codes')
            .insert({ user_id: user.id, code: raw });

        if (usedError) {
            if (usedError.code === '23505') {
                return NextResponse.json({ error: 'already_used' }, { status: 409 });
            }
            console.error('[promo] insert_user_promo failed:', usedError);
            throw usedError;
        }

        step = 'fetch_profile';
        const { data: currentProfile, error: profileError } = await admin
            .from('users')
            .select('promo_bundle_expires_at')
            .eq('id', user.id)
            .single();

        if (profileError) {
            console.error('[promo] fetch_profile failed:', profileError);
            throw profileError;
        }

        const base = currentProfile?.promo_bundle_expires_at
            ? new Date(Math.max(Date.now(), new Date(currentProfile.promo_bundle_expires_at).getTime()))
            : new Date();

        const newExpiry = new Date(base);
        newExpiry.setMonth(newExpiry.getMonth() + promo.duration_months);

        step = 'update_expiry';
        const { error: updateError } = await admin
            .from('users')
            .update({ promo_bundle_expires_at: newExpiry.toISOString() })
            .eq('id', user.id);

        if (updateError) {
            console.error('[promo] update_expiry failed:', updateError);
            throw updateError;
        }

        step = 'increment_uses';
        const { error: incrError } = await admin
            .from('promo_codes')
            .update({ current_uses: promo.current_uses + 1 })
            .eq('id', promo.id);

        if (incrError) {
            console.error('[promo] increment_uses failed:', incrError);
            throw incrError;
        }

        return NextResponse.json({
            ok: true,
            plan: promo.plan,
            expires_at: newExpiry.toISOString(),
            duration_months: promo.duration_months,
        });
    } catch (err) {
        console.error(`[promo] FAILED at step=${step}:`, err?.message, err?.code, err?.details, err?.hint);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}
