import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { REJECTED_BOOK, rejectedBookAccessFor } from '@/lib/bookDownloads';

// Serves "Why Your Book Got Rejected" EPUB.
// Lifetime → full edition immediately.
// Starter/Pro (has_logic_bundle or has_full_access) → full edition 3 months after signup.
// Free or not signed in → 403.
// The edition is never taken from the request — plan is re-checked in the database.
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { data: profile, error: profileError } = await supabase
            .from('users')
            .select('is_lifetime, has_full_access, has_logic_bundle')
            .eq('id', user.id)
            .single();
        if (profileError || !profile) {
            return NextResponse.json({ error: 'no_profile' }, { status: 401 });
        }

        const access = rejectedBookAccessFor(profile, user.created_at);
        if (access !== 'full') {
            return NextResponse.json(
                {
                    error: access === 'locked' ? 'not_yet_unlocked' : 'upgrade_required',
                    purchase_url: '/pricing',
                },
                { status: 403 },
            );
        }

        const { file, downloadName } = REJECTED_BOOK.editions.full;
        const body = await readFile(path.join(process.cwd(), 'private', 'downloads', file));

        return new NextResponse(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/epub+zip',
                'Content-Length': String(body.length),
                'Content-Disposition': `attachment; filename="${downloadName}"`,
                'Cache-Control': 'private, no-store',
            },
        });
    } catch (err) {
        console.error('Rejected book download failed:', err);
        return NextResponse.json({ error: 'download_failed' }, { status: 500 });
    }
}
