import { NextResponse } from 'next/server';
import { checkToolAccess, deductCredits, saveHistory } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('epub-validator-premium');
        if (!access.allowed) return access.response;

        const { filename, results } = await request.json();
        if (!filename || !results) {
            return NextResponse.json({ error: 'Missing data' }, { status: 400 });
        }

        // Deduct 2 credits after validation is complete
        if (access.user && access.profile && !access.profile.is_lifetime) {
            await deductCredits(access.user.id, 'epub-validator-premium');
        }

        // Save to history
        if (access.user) {
            await saveHistory({
                userId: access.user.id,
                toolSlug: 'epub-validator-premium',
                inputs: { filename },
                output: results,
                wordCount: 0,
                creditsSpent: access.profile?.is_lifetime ? 0 : 2,
            });
        }

        return NextResponse.json({ success: true });

    } catch (err) {
        console.error('EPUB validator premium error:', err);
        return NextResponse.json({ error: 'server_error', message: err.message }, { status: 500 });
    }
}