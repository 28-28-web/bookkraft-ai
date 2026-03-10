import { NextResponse } from 'next/server';
import { checkToolAccess, checkWordLimit, callClaude, deductCredits, saveHistory, countWords } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('style-sheet-auditor');
        if (!access.allowed) return access.response;

        const { text, styleSheet, categories } = await request.json();
        if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 });

        // Word limit enforcement
        const wordError = checkWordLimit('style-sheet-auditor', text);
        if (wordError) return wordError;

        const wc = countWords(text);

        const enabledCategories = Object.entries(categories || {})
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ');

        const styleInstruction = styleSheet
            ? `Apply these known style rules: ${styleSheet}`
            : 'First infer the author\'s intended style rules from the text, then identify violations.';

        const data = await callClaude({
            system: 'You are a professional copy editor. Find style inconsistencies. Be precise. Quote exact text. Return ONLY valid JSON.',
            user: `Audit this manuscript for style inconsistencies.
${styleInstruction}

Categories to check: ${enabledCategories || 'all'}

TEXT:
${text}

Severity: critical = clear error | warning = possible error | notice = style preference

Return ONLY: {
  "detected_rules": [{"category": "string", "rule": "string"}],
  "violations": [{"severity": "critical|warning|notice", "category": "string", "quoted_text": "string", "issue": "string", "suggestion": "string"}],
  "generated_style_sheet": "string"
}`,
            toolSlug: 'style-sheet-auditor',
            temperature: 0,
        });

        if (access.user && access.profile && !access.profile.is_lifetime) {
            await deductCredits(access.user.id, 'style-sheet-auditor');
        }

        if (access.user) {
            await saveHistory({
                userId: access.user.id,
                toolSlug: 'style-sheet-auditor',
                inputs: { categories },
                output: data,
                wordCount: wc,
                creditsSpent: access.profile?.is_lifetime ? 0 : 3,
            });
        }

        return NextResponse.json({ success: true, data, wordCount: wc });
    } catch (err) {
        console.error('Style sheet auditor error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
