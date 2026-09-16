import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

// Apply a promo code for the signed-in user.
//
// Checks (in order):
//   1. User is authenticated.
//   2. Code exists and has remaining uses (current_uses < max_uses).
//   3. User has not used this code before (unique constraint on user_promo_codes).
//   4. Update users.promo_bundle_expires_at: extend from max(now, current expiry)
//      by duration_months so stacked promos accumulate correctly.
//   5. Insert user_promo_codes row (idempotency guard).
//   6. Increment promo_codes.current_uses.
export async function POST(request) {
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

        // 1. Fetch promo code
        const { data: promo, error: promoError } = await supabase
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

        // 2. Check user hasn't used it — attempt insert first (unique constraint is the guard)
        const { error: usedError } = await supabase
            .from('user_promo_codes')
            .insert({ user_id: user.id, code: raw });

        if (usedError) {
            // unique_violation = 23505
            if (usedError.code === '23505') {
                return NextResponse.json({ error: 'already_used' }, { status: 409 });
            }
            throw usedError;
        }

        // 3. Extend promo_bundle_expires_at from max(now, current expiry)
        const { data: currentProfile } = await supabase
            .from('users')
            .select('promo_bundle_expires_at')
            .eq('id', user.id)
            .single();

        const base = currentProfile?.promo_bundle_expires_at
            ? new Date(Math.max(Date.now(), new Date(currentProfile.promo_bundle_expires_at).getTime()))
            : new Date();

        const newExpiry = new Date(base);
        newExpiry.setMonth(newExpiry.getMonth() + promo.duration_months);

        const { error: updateError } = await supabase
            .from('users')
            .update({ promo_bundle_expires_at: newExpiry.toISOString() })
            .eq('id', user.id);

        if (updateError) throw updateError;

        // 4. Increment current_uses
        const { error: incrError } = await supabase
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
