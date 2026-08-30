import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Non-fatal. Failure is logged but never blocks the redirect.
async function fireGA4AuthEvent({ eventName, method, userId, gaClientId }) {
    const measurementId = process.env.GA4_MEASUREMENT_ID;
    const apiSecret = process.env.GA4_MP_SECRET;
    if (!measurementId || !apiSecret) {
        console.warn('[GA4 MP] missing env vars — GA4_MEASUREMENT_ID or GA4_MP_SECRET not set');
        return;
    }
    const payload = {
        client_id: gaClientId,
        user_id: userId,
        non_personalized_ads: true,
        events: [{ name: eventName, params: { method } }],
    };
    console.log('[GA4 MP] firing', eventName, { method, client_id: gaClientId, user_id: userId });
    try {
        const res = await fetch(
            `https://www.google-analytics.com/mp/collect?measurement_id=${encodeURIComponent(measurementId)}&api_secret=${encodeURIComponent(apiSecret)}`,
            {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            }
        );
        console.log('[GA4 MP] response status', res.status);
    } catch (err) {
        console.warn('[GA4 MP] fetch failed:', err.message);
    }
}

export async function GET(request) {
    const { searchParams } = new URL(request.url);
    const origin = 'https://bookkraftai.com';
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        const cookieStore = await cookies();
        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        try {
                            cookiesToSet.forEach(({ name, value, options }) =>
                                cookieStore.set(name, value, options)
                            );
                        } catch {
                            // Ignore errors from Server Components
                        }
                    },
                },
            }
        );

        console.log('[auth/callback] code exchange, next=', next);
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        if (!error) {
            // Read _ga cookie for client_id so the event stitches to the
            // user's browsing session. Falls back to a valid GA4 MP format
            // (<random>.<timestamp>) when _ga is absent (incognito, fresh browser).
            // auth.<uuid> was the old fallback — GA4 silently drops events with
            // non-numeric client_ids, so those hits never appeared in reports.
            const gaCookie = cookieStore.get('_ga')?.value;
            let gaClientId = `${Math.floor(Math.random() * 1e9)}.${Math.floor(Date.now() / 1000)}`;
            if (gaCookie) {
                const m = gaCookie.match(/^GA\d+\.\d+\.(.+)$/);
                if (m) gaClientId = m[1];
            }

            const provider = data?.user?.app_metadata?.provider ?? 'unknown';
            const method = provider === 'google' ? 'google' : 'magic_link';
            // Heuristic: signup/PageClient.js sets next=/onboarding, login sets /dashboard.
            // If /onboarding is ever reused for non-signup flows, revisit this.
            const eventName = next.includes('/onboarding') ? 'sign_up' : 'login';

            void fireGA4AuthEvent({
                eventName,
                method,
                userId: data?.user?.id,
                gaClientId,
            });

            return NextResponse.redirect(`${origin}${next}`);
        }
        console.error('Auth error:', error);
        const friendlyMsg = error.code === 'flow_state_not_found'
            ? 'Your sign-in link has expired or was already used. Please try signing in again.'
            : error.message;
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(friendlyMsg)}`);
    }

    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}