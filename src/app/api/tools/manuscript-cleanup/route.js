import { NextResponse } from 'next/server';
import { checkToolAccess, checkWordLimit, callClaude, deductCredits, saveHistory, countWords } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        // Auth + credit check
        const access = await checkToolAccess('manuscript-cleanup');
        if (!access.allowed) return access.response;

        const { text, mode, genre, checks } = await request.json();
        if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 });

        // Word limit enforcement (server-side)
        const wordError = checkWordLimit('manuscript-cleanup', text);
        if (wordError) return wordError;

        const wc = countWords(text);

        const enabledChecks = Object.entries(checks || {})
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ');

        const data = await callClaude({
            system: 'You are a professional manuscript editor specializing in eBook formatting. Return ONLY valid JSON. No markdown. No text outside the JSON object.',
            user: `Clean this ${genre || 'fiction'} manuscript. Mode: ${mode || 'deep'}. Apply: ${enabledChecks || 'all'}.

TEXT:
${text}

Return ONLY: {
  "cleaned_text": "the full cleaned text",
  "changes": [{"type": "string", "description": "string"}],
  "flags": [{"type": "repeat|cliche", "word": "string", "occurrences": 0, "suggestion": "string"}]
}`,
            toolSlug: 'manuscript-cleanup',
            temperature: 0,
        });

        // Deduct credits ONLY after successful response
        if (access.user && access.profile && !access.profile.is_lifetime) {
            await deductCredits(access.user.id, 'manuscript-cleanup');
        }

        // Save to history
        if (access.user) {
            await saveHistory({
                userId: access.user.id,
                toolSlug: 'manuscript-cleanup',
                inputs: { mode, genre, checks },
                output: data,
                wordCount: wc,
                creditsSpent: access.profile?.is_lifetime ? 0 : 3,
            });
        }

        return NextResponse.json({ success: true, data, wordCount: wc });
    } catch (err) {
        console.error('Manuscript cleanup error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
