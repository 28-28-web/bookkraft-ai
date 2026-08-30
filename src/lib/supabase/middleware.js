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

    // Protected routes — redirect to login if not authenticated
    const protectedPaths = ['/dashboard', '/tools', '/history', '/account', '/admin', '/onboarding'];
    const isProtected = protectedPaths.some((p) => request.nextUrl.pathname.startsWith(p));

    // Free tools bypass auth — no login required (v8.0 spec)
    const freeSlugs = ['epub-validator', 'metadata-builder', 'word-cleanup', 'cover-checker', 'manuscript-mode', 'publishing-score'];
    const isFreeToolUrl = freeSlugs.some((s) => request.nextUrl.pathname === `/tools/${s}`);

    if (isProtected && !isFreeToolUrl && !user) {
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
