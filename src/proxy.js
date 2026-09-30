import { updateSession } from '@/lib/supabase/middleware';

export async function proxy(request) {
    return await updateSession(request);
}

// Only paths that act on the session: the protected routes (keep in sync with
// protectedPaths in lib/supabase/middleware.js) and the signed-in bounce off
// /login and /signup. Public pages skip the proxy so a signed-in visitor does
// not pay a Supabase round trip before render; the browser client in
// AuthProvider refreshes tokens there. API routes call getUser() themselves.
export const config = {
    matcher: [
        '/dashboard/:path*',
        '/history/:path*',
        '/account/:path*',
        '/admin/:path*',
        '/onboarding/:path*',
        '/login',
        '/signup',
    ],
};

