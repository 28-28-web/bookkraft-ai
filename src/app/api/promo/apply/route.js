import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createAdminClient } from '@/lib/supabase/admin';

// Apply a promo code for the signed-in user.
//
// Uses service-role client for all DB ops so RLS does not block reads on
// promo_codes or writes on user_promo_codes / users.
export async function POST(request) {
    try {
        // Auth: verify session via cookie client (RLS-respecting, anon key)
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

        // 1. Fetch promo code
        const { data: promo, error: promoError } = await admin
            .from('promo_codes')
            .select('id, plan, duration_months, max_uses, current_uses')
            .eq('code', raw)
            .single();

        if (promoError || !promo) {
            return NextResponse.json({ error: 'code_not_found' }, { status: 404 });
        }
        if (promo.current_uses >= promo.max_uses) {
            return NextResponse.json({ error: 'code_exhausted' }, { status: 409 });
        }

        // 2. Insert user_promo_codes — unique constraint catches double-use
        const { error: usedError } = await admin
            .from('user_promo_codes')
            .insert({ user_id: user.id, code: raw });

        if (usedError) {
            if (usedError.code === '23505') {
                return NextResponse.json({ error: 'already_used' }, { status: 409 });
            }
            throw usedError;
        }

        // 3. Extend promo_bundle_expires_at from max(now, current expiry)
        const { data: currentProfile } = await admin
            .from('users')
            .select('promo_bundle_expires_at')
            .eq('id', user.id)
            .single();

        const base = currentProfile?.promo_bundle_expires_at
            ? new Date(Math.max(Date.now(), new Date(currentProfile.promo_bundle_expires_at).getTime()))
            : new Date();

        const newExpiry = new Date(base);
        newExpiry.setMonth(newExpiry.getMonth() + promo.duration_months);

        const { error: updateError } = await admin
            .from('users')
            .update({ promo_bundle_expires_at: newExpiry.toISOString() })
            .eq('id', user.id);

        if (updateError) throw updateError;

        // 4. Increment current_uses
        const { error: incrError } = await admin
            .from('promo_codes')
            .update({ current_uses: promo.current_uses + 1 })
            .eq('id', promo.id);

        if (incrError) throw incrError;

        return NextResponse.json({
            ok: true,
            plan: promo.plan,
            expires_at: newExpiry.toISOString(),
            duration_months: promo.duration_months,
        });
    } catch (err) {
        console.error('promo apply failed:', err);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}
