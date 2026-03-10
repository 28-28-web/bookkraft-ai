import { NextResponse } from 'next/server';
import { checkToolAccess, callClaude, deductCredits, saveHistory, countWords } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('kdp-keyword-finder');
        if (!access.allowed) return access.response;

        const { title, genre, reader, comps, themes } = await request.json();
        if (!title || !genre) return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });

        // Combined word count check (500 words across all inputs)
        const combined = [title, genre, reader, comps, themes].filter(Boolean).join(' ');
        const wc = countWords(combined);
        if (wc > 500) {
            return NextResponse.json({
                error: 'word_limit_exceeded',
                message: `Combined input is ${wc} words. Limit is 500.`,
                word_count: wc,
                limit: 500,
            }, { status: 400 });
        }

        const data = await callClaude({
            system: 'You are a KDP publishing expert and Amazon SEO specialist. Return ONLY valid JSON. No markdown.',
            user: `Find the best KDP keywords and categories for this book:
Title: ${title}
Genre: ${genre}
Target reader: ${reader || 'General audience'}
Comparable titles: ${comps || 'Not specified'}
Key themes: ${themes || 'Not specified'}

Rules: 2-5 words each, all <50 chars, different angle per keyword, FULL Amazon breadcrumb paths.

Return ONLY: {
  "keywords": [{"phrase": "string", "character_count": 0, "rationale": "string", "angle": "theme|audience|setting|trope|emotion|comp"}],
  "primary_categories": [{"path": "string", "rationale": "string"}],
  "alternative_categories": [{"path": "string", "rationale": "string"}],
  "tips": "string"
}

Provide exactly 7 keywords, 2 primary categories, and 3 alternative categories.`,
            toolSlug: 'kdp-keyword-finder',
            temperature: 0,
        });

        if (access.user && access.profile && !access.profile.is_lifetime) {
            await deductCredits(access.user.id, 'kdp-keyword-finder');
        }

        if (access.user) {
            await saveHistory({
                userId: access.user.id,
                toolSlug: 'kdp-keyword-finder',
                inputs: { title, genre },
                output: data,
                wordCount: wc,
                creditsSpent: access.profile?.is_lifetime ? 0 : 1,
            });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('KDP keyword finder error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
