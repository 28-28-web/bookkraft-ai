import { createServerClient } from '@supabase/ssr';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

// Prevent Next.js from ever treating this OAuth callback as a static route.
// Single-use codes must always be handled on demand, never pre-rendered.
export const dynamic = 'force-dynamic';

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

// Traefik's buffering middleware ("upload-limit@file") fails with "no data
// ready" when it tries to buffer a redirect response that has no body.
// Setting Content-Length: 0 tells it explicitly there is nothing to buffer.
function safeRedirect(url) {
    const r = NextResponse.redirect(url);
    r.headers.set('Cache-Control', 'no-store');
    r.headers.set('Content-Length', '0');
    return r;
}

export async function GET(request) {
    // Block prefetch probes — OAuth codes are single-use; a prefetch would
    // consume the code before the real navigation arrives.
    const isPrefetch =
        request.headers.get('next-router-prefetch') !== null ||
        (request.headers.get('purpose') ?? '').toLowerCase() === 'prefetch';
    if (isPrefetch) {
        return new Response(null, { status: 204 });
    }

    const { searchParams } = new URL(request.url);
    const origin = 'https://bookkraftai.com';
    const code = searchParams.get('code');
    const next = searchParams.get('next') ?? '/dashboard';

    if (code) {
        try {
            const cookieStore = await cookies();

            // Create the success redirect response BEFORE the Supabase client so
            // setAll() writes session cookies directly onto this response object.
            // cookieStore.set() only modifies the implicit response — that object is
            // discarded when we return NextResponse.redirect(), so the session cookies
            // would never reach the browser.
            const redirectResponse = safeRedirect(`${origin}${next}`);

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
                                redirectResponse.cookies.set(name, value, {
                                    ...options,
                                    secure: true,
                                    // httpOnly intentionally omitted — Supabase's createBrowserClient
                                    // reads session via document.cookie; HttpOnly makes it invisible
                                    // to client JS and breaks onAuthStateChange session restoration.
                                })
                            );
                        },
                    },
                }
            );

            let data, error;
            try {
                ({ data, error } = await supabase.auth.exchangeCodeForSession(code));
            } catch (thrown) {
                console.error('[auth/callback] exchangeCodeForSession threw:', thrown?.message ?? thrown);
                return safeRedirect(`${origin}/login?error=${encodeURIComponent('Sign-in failed. Please try again.')}`);
            }

            if (!error) {
                try {
                    const gaCookie = cookieStore.get('_ga')?.value;
                    let gaClientId = `${Math.floor(Math.random() * 1e9)}.${Math.floor(Date.now() / 1000)}`;
                    if (gaCookie) {
                        const m = gaCookie.match(/^GA\d+\.\d+\.(.+)$/);
                        if (m) gaClientId = m[1];
                    }
                    const provider = data?.user?.app_metadata?.provider ?? 'unknown';
                    const method = provider === 'google' ? 'google' : 'magic_link';
                    const eventName = next.includes('/onboarding') ? 'sign_up' : 'login';
                    void fireGA4AuthEvent({ eventName, method, userId: data?.user?.id, gaClientId });
                } catch (successErr) {
                    console.error('[auth/callback] GA4 error (auth still succeeded):', successErr?.message ?? successErr);
                }
                return redirectResponse;
            }

            console.error('[auth/callback] auth error:', error?.code, error?.message);
            const friendlyMsg = error.code === 'flow_state_not_found'
                ? 'Your sign-in link has expired or was already used. Please try signing in again.'
                : error.message;
            return safeRedirect(`${origin}/login?error=${encodeURIComponent(friendlyMsg)}`);
        } catch (outerErr) {
            console.error('[auth/callback] unexpected error:', outerErr?.message ?? outerErr);
            return safeRedirect(`${origin}/login?error=${encodeURIComponent('Sign-in failed. Please try again.')}`);
        }
    }

    return safeRedirect(`${origin}/login?error=auth_failed`);
}
