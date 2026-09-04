import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
    // /auth/callback handles its own session exchange — middleware must not touch it
    if (request.nextUrl.pathname === '/auth/callback') {
        return NextResponse.next({ request });
    }

    let supabaseResponse = NextResponse.next({ request });

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll();
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    );
                    supabaseResponse = NextResponse.next({ request });
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    );
                },
            },
        }
    );

    let user = null;
    try {
        const { data } = await supabase.auth.getUser();
        user = data?.user ?? null;
    } catch (err) {
        console.error('[updateSession] getUser threw:', err?.message ?? err);
    }

    // Protected routes — redirect to login if not authenticated.
    //
    // /tools is deliberately NOT here. Tool pages are marketing pages: name,
    // description, how it works, FAQ, and JSON-LD, all server-rendered. Guarding
    // the route meant an unauthenticated visitor - including Googlebot and
    // Bingbot - got a redirect to /login instead of the page, so no tool page
    // could ever be indexed. Running a tool stays gated server-side in
    // checkToolAccess (src/lib/toolAccess.js), which fails closed on every
    // /api/tools/* request, so dropping the page guard costs no access control.
    const protectedPaths = ['/dashboard', '/history', '/account', '/admin', '/onboarding'];
    const isProtected = protectedPaths.some((p) => request.nextUrl.pathname.startsWith(p));

    if (isProtected && !user) {
        const url = request.nextUrl.clone();
        url.pathname = '/login';
        url.searchParams.set('redirect', request.nextUrl.pathname);
        url.searchParams.set('reason', 'auth-required');
        return NextResponse.redirect(url);
    }

    // If user is logged in and tries to visit login/signup, redirect to dashboard
    if (user && (request.nextUrl.pathname === '/login' || request.nextUrl.pathname === '/signup')) {
        const url = request.nextUrl.clone();
        url.pathname = '/dashboard';
        return NextResponse.redirect(url);
    }

    return supabaseResponse;
}
