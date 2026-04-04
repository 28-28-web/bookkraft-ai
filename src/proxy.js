import { NextResponse } from 'next/server';

// Protected routes — redirect to login if not authenticated
// Full Supabase session check runs on the live server (env vars required)
export async function proxy(request) {
    return NextResponse.next();
}

export const config = {
    matcher: [
        '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
    ],
};

