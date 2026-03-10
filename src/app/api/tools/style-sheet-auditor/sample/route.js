import { NextResponse } from 'next/server';
import { checkToolAccess, callClaude, saveHistory, countWords } from '@/lib/toolAccess';

/**
 * Free Sample — Style Sheet Auditor
 * 500 words max, 0 credits, rate limited at 5/hr per user
 */
export async function POST(request) {
    try {
        const access = await checkToolAccess('style-sheet-auditor');
        if (!access.user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { text, styleSheet, categories } = await request.json();
        if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 });

        // Rate limit check
        const { createClient } = await import('@/lib/supabase/server');
        const supabase = await createClient();
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

        const { count } = await supabase
            .from('history')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', access.user.id)
            .eq('tool_slug', 'style-sheet-auditor')
            .eq('is_sample', true)
            .gte('created_at', oneHourAgo);

        if (count >= 5) {
            return NextResponse.json({
                error: 'sample_limit_exceeded',
                message: 'Free samples are limited to 5 per hour. Top up credits to run the full tool.',
            }, { status: 429 });
        }

        // Enforce 500 words
        const words = text.trim().split(/\s+/);
        const sampleText = words.slice(0, 500).join(' ');
        const wc = Math.min(words.length, 500);

        const enabledCategories = Object.entries(categories || {})
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ');

        const styleInstruction = styleSheet
            ? `Apply these known style rules: ${styleSheet}`
            : 'Infer the author\'s intended style rules, then find violations.';

        const data = await callClaude({
            system: 'You are a professional copy editor. Find style inconsistencies. Return ONLY valid JSON.',
            user: `Audit this manuscript for style inconsistencies.
${styleInstruction}

Categories to check: ${enabledCategories || 'all'}

TEXT:
${sampleText}

Return ONLY: {
  "detected_rules": [{"category": "string", "rule": "string"}],
  "violations": [{"severity": "critical|warning|notice", "category": "string", "quoted_text": "string", "issue": "string", "suggestion": "string"}],
  "generated_style_sheet": "string"
}`,
            maxTokens: 2000,
            temperature: 0,
        });

        await saveHistory({
            userId: access.user.id,
            toolSlug: 'style-sheet-auditor',
            inputs: { categories, isSample: true },
            output: data,
            wordCount: wc,
            creditsSpent: 0,
            isSample: true,
        });

        return NextResponse.json({ success: true, data, isSample: true, wordsProcessed: wc });
    } catch (err) {
        console.error('Style sheet auditor sample error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
