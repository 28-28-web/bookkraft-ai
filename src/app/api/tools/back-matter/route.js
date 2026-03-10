import { NextResponse } from 'next/server';
import { checkToolAccess, callClaude, deductCredits, saveHistory, countWords } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('back-matter-generator');
        if (!access.allowed) return access.response;

        const { author, background, bookTitle, genre, otherBooks, mailingListUrl, readerMagnet, socials, tone, sections } = await request.json();
        if (!author || !bookTitle) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

        const enabledSections = Object.entries(sections || {})
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ');

        const data = await callClaude({
            system: 'You are a publishing professional who writes compelling eBook back matter. Return ONLY valid JSON. No markdown. No preamble.',
            user: `Write back matter for this eBook:
Author: ${author} | Background: ${background || 'Not provided'}
Book: ${bookTitle} | Genre: ${genre || 'General'}
Other books: ${otherBooks || 'None listed'}
Mailing list URL: ${mailingListUrl || 'Not provided'} | Reader offer: ${readerMagnet || 'None'}
Social: ${socials || 'None'}
Tone: ${tone || 'warm'}
Sections requested: ${enabledSections || 'all'}

Return ONLY this JSON:
{
  "author_bio_short": "150 word bio",
  "author_bio_long": "300 word bio",
  "also_by": "formatted list with one-line hooks",
  "reader_list_ctas": [
    { "style": "warm", "text": "..." },
    { "style": "direct", "text": "..." },
    { "style": "benefit-led", "text": "..." }
  ],
  "connect": "social/contact section copy",
  "note_from_author": "personal closing note",
  "acknowledgements": "acknowledgements copy"
}`,
            toolSlug: 'back-matter-generator',
            temperature: 0.3,
        });

        // Deduct credits ONLY after successful response
        if (access.user && access.profile && !access.profile.is_lifetime) {
            await deductCredits(access.user.id, 'back-matter-generator');
        }

        if (access.user) {
            await saveHistory({
                userId: access.user.id,
                toolSlug: 'back-matter-generator',
                inputs: { author, bookTitle, genre, tone },
                output: data,
                creditsSpent: access.profile?.is_lifetime ? 0 : 2,
            });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('Back matter error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
