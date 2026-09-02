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
            system: `You are a KDP publishing expert and Amazon SEO specialist. Return ONLY valid JSON. No markdown.

HARD RULE: Never suggest keywords that reference competitor products, brand names, trademarked terms, or author names. Never suggest comparison tactics like "better than [book]", "alternative to [product]", or "vs [author]" — these violate Amazon's keyword Terms of Service and would cause keyword rejection. Only suggest original descriptive phrases the author's own book can legitimately own.

REQUIRED FIELDS: Every keyword object MUST include all 6 fields: phrase, character_count, rationale, angle, competition_level, and ranking_potential. Do not omit any field from any keyword.`,
            user: `Find the best KDP keywords and categories for this book:
Title: ${title}
Genre: ${genre}
Target reader: ${reader || 'General audience'}
Comparable titles: ${comps || 'Not specified'}
Key themes: ${themes || 'Not specified'}

Rules: 2-5 words each, all <50 chars, different angle per keyword, FULL Amazon breadcrumb paths.

Return ONLY this exact JSON structure with no omitted fields:
{
  "keywords": [
    {
      "phrase": "exact keyword phrase",
      "character_count": 0,
      "rationale": "why this phrase works for this book",
      "angle": "theme|audience|setting|trope|emotion|comp",
      "competition_level": "low|medium|high",
      "ranking_potential": "strong|moderate|weak"
    }
  ],
  "primary_categories": [{"path": "string", "rationale": "string"}],
  "alternative_categories": [{"path": "string", "rationale": "string"}],
  "tips": ["string", "string", "string"]
}

competition_level: estimate how saturated Amazon is for this phrase (low = few competing books, medium = moderate competition, high = many competing books).
ranking_potential: estimate whether a new release can realistically reach page 1 (strong = achievable, moderate = possible with reviews, weak = very difficult).

Provide exactly 7 keywords, 2 primary categories, 3 alternative categories, and 3-5 tips.`,
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
                creditsSpent: access.profile?.is_lifetime ? 0 : 2,
            });
        }

        return NextResponse.json({ success: true, data });
    } catch (err) {
        console.error('KDP keyword finder error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
