import { NextResponse } from 'next/server';
import { checkToolAccess, checkWordLimit, callClaude, deductCredits, saveHistory, countWords } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('print-to-digital');
        if (!access.allowed) return access.response;

        const { text, adaptations, footnoteFormat } = await request.json();
        if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 });

        // Word limit enforcement
        const wordError = checkWordLimit('print-to-digital', text);
        if (wordError) return wordError;

        const wc = countWords(text);

        const enabledAdaptations = Object.entries(adaptations || {})
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ');

        const data = await callClaude({
            system: 'You are an expert in converting print books to digital eBook format. Return ONLY valid JSON. No markdown.',
            user: `Convert this print-formatted text to eBook-ready digital format.
Apply these adaptations: ${enabledAdaptations || 'all'}
Footnote format preference: ${footnoteFormat || 'endnotes'}

For page references: use context to infer chapter. Replace "see page N" with "see [Chapter Name]".

TEXT:
${text}

Return ONLY: {
  "adapted_text": "the full adapted text",
  "conversions": [{"type": "page_reference|footnote|running_header|table|figure_ref", "original": "string", "replacement": "string"}],
  "needs_review": [{"item": "string", "reason": "string"}]
}`,
            toolSlug: 'print-to-digital',
            temperature: 0,
        });

        if (access.user && access.profile && !access.profile.is_lifetime) {
            await deductCredits(access.user.id, 'print-to-digital');
        }

        if (access.user) {
            await saveHistory({
                userId: access.user.id,
                toolSlug: 'print-to-digital',
                inputs: { adaptations, footnoteFormat },
                output: data,
                wordCount: wc,
                creditsSpent: access.profile?.is_lifetime ? 0 : 3,
            });
        }

        return NextResponse.json({ success: true, data, wordCount: wc });
    } catch (err) {
        console.error('Print-to-digital error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
