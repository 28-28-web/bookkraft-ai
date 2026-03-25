import { createServerClient } from '@supabase/ssr';
import { NextResponse } from 'next/server';

export async function updateSession(request) {
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

    const {
        data: { user },
    } = await supabase.auth.getUser();

    // Protected routes — redirect to login if not authenticated
    const protectedPaths = ['/dashboard', '/tools', '/history', '/account', '/admin', '/onboarding'];
    const isProtected = protectedPaths.some((p) => request.nextUrl.pathname.startsWith(p));

    // Free tools bypass auth — no login required (v8.0 spec)
    const freeSlugs = ['epub-validator', 'metadata-builder'];
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
