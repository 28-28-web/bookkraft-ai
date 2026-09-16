import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { HANDBOOK, handbookEditionFor } from '@/lib/bookDownloads';

// The handbook EPUB for the signed-in user's plan: the full edition for
// Lifetime, the sampler for Starter and Pro, nothing for everyone else.
//
// Fails closed, like checkToolAccess: no user, no profile row, or any error
// while checking means no file. The edition comes from the database, never
// from the request, so a Starter account cannot ask for the full book.
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

        const edition = handbookEditionFor(profile);
        if (!edition) {
            return NextResponse.json(
                { error: 'upgrade_required', purchase_url: '/pricing' },
                { status: 403 },
            );
        }

        const { file, downloadName } = HANDBOOK.editions[edition];
        const body = await readFile(path.join(process.cwd(), 'private', 'downloads', file));

        return new NextResponse(body, {
            status: 200,
            headers: {
                'Content-Type': 'application/epub+zip',
                'Content-Length': String(body.length),
                'Content-Disposition': `attachment; filename="${downloadName}"`,
                'Cache-Control': 'private, no-store',
                'X-Handbook-Edition': edition,
            },
        });
    } catch (err) {
        console.error('Handbook download failed closed:', err);
        return NextResponse.json({ error: 'download_failed' }, { status: 500 });
    }
}
