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

        // Create the success redirect response BEFORE the Supabase client so
        // setAll() writes session cookies directly onto this response object.
        // cookieStore.set() only modifies the implicit response — that object is
        // discarded when we return NextResponse.redirect(), so the session cookies
        // would never reach the browser.
        const redirectResponse = NextResponse.redirect(`${origin}${next}`);

        const supabase = createServerClient(
            process.env.NEXT_PUBLIC_SUPABASE_URL,
            process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
            {
                cookies: {
                    getAll() {
                        return cookieStore.getAll();
                    },
                    setAll(cookiesToSet) {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            redirectResponse.cookies.set(name, value, options)
                        );
                    },
                },
            }
        );

        const allCookies = cookieStore.getAll().map(c => c.name);
        const verifierCookie = allCookies.find(n => n.includes('code-verifier'));
        console.log('[auth/callback] cookies present:', allCookies.filter(n => n.startsWith('sb-')));
        console.log('[auth/callback] code-verifier cookie:', verifierCookie ?? 'MISSING');
        const t0 = Date.now();
        console.log('[auth/callback] code exchange start, next=', next);
        const { data, error } = await supabase.auth.exchangeCodeForSession(code);
        console.log(`[auth/callback] code exchange done in ${Date.now() - t0}ms, error=`, error?.code ?? 'none');

        // Decisive diagnostic: verify Set-Cookie headers actually exist on redirectResponse
        const setCookieRaw = redirectResponse.headers.get('set-cookie');
        console.log('[auth/callback] Set-Cookie on redirectResponse:', setCookieRaw ?? 'NONE — cookies not written to response');
        const cookiesOnResponse = redirectResponse.cookies.getAll();
        console.log('[auth/callback] cookies on redirectResponse count:', cookiesOnResponse.length);
        console.log('[auth/callback] cookie names on response:', cookiesOnResponse.map(c => c.name));

        if (!error) {
            const gaCookie = cookieStore.get('_ga')?.value;
            let gaClientId = `${Math.floor(Math.random() * 1e9)}.${Math.floor(Date.now() / 1000)}`;
            if (gaCookie) {
                const m = gaCookie.match(/^GA\d+\.\d+\.(.+)$/);
                if (m) gaClientId = m[1];
            }

            const provider = data?.user?.app_metadata?.provider ?? 'unknown';
            const method = provider === 'google' ? 'google' : 'magic_link';
            const eventName = next.includes('/onboarding') ? 'sign_up' : 'login';

            void fireGA4AuthEvent({
                eventName,
                method,
                userId: data?.user?.id,
                gaClientId,
            });

            return redirectResponse;
        }

        console.error('Auth error:', error);
        const friendlyMsg = error.code === 'flow_state_not_found'
            ? 'Your sign-in link has expired or was already used. Please try signing in again.'
            : error.message;
        return NextResponse.redirect(`${origin}/login?error=${encodeURIComponent(friendlyMsg)}`);
    }

    return NextResponse.redirect(`${origin}/login?error=auth_failed`);
}
