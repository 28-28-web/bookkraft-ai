import { NextResponse } from 'next/server';
import { checkToolAccess, callClaude, saveHistory, countWords } from '@/lib/toolAccess';

/**
 * Free Sample — Manuscript Cleanup
 * 500 words max, 0 credits, rate limited at 5/hr per user (tracked via history)
 */
export async function POST(request) {
    try {
        // Auth required but NO credit check
        const access = await checkToolAccess('manuscript-cleanup');
        // Even if insufficient credits, allow sample — just need auth
        if (!access.user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { text, mode, genre, checks } = await request.json();
        if (!text) return NextResponse.json({ error: 'Missing text' }, { status: 400 });

        // Rate limit: check sample usage in last hour
        const { createClient } = await import('@/lib/supabase/server');
        const supabase = await createClient();
        const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000).toISOString();

        const { count } = await supabase
            .from('history')
            .select('id', { count: 'exact', head: true })
            .eq('user_id', access.user.id)
            .eq('tool_slug', 'manuscript-cleanup')
            .eq('is_sample', true)
            .gte('created_at', oneHourAgo);

        if (count >= 5) {
            return NextResponse.json({
                error: 'sample_limit_exceeded',
                message: 'Free samples are limited to 5 per hour. Top up credits to run the full tool.',
            }, { status: 429 });
        }

        // Enforce 500-word cap (server-side — never trust frontend)
        const words = text.trim().split(/\s+/);
        const sampleText = words.slice(0, 500).join(' ');
        const wc = Math.min(words.length, 500);

        const enabledChecks = Object.entries(checks || {})
            .filter(([, v]) => v)
            .map(([k]) => k)
            .join(', ');

        const data = await callClaude({
            system: 'You are a professional manuscript editor specializing in eBook formatting. Return ONLY valid JSON. No markdown. No text outside the JSON object.',
            user: `Clean this ${genre || 'fiction'} manuscript. Mode: ${mode || 'deep'}. Apply: ${enabledChecks || 'all'}.

TEXT:
${sampleText}

Return ONLY: {
  "cleaned_text": "the full cleaned text",
  "changes": [{"type": "string", "description": "string"}],
  "flags": [{"type": "repeat|cliche", "word": "string", "occurrences": 0, "suggestion": "string"}]
}`,
            maxTokens: 2000, // reduced for sample
            temperature: 0,
        });

        // NO credit deduction on sample route
        // Save to history with isSample flag
        await saveHistory({
            userId: access.user.id,
            toolSlug: 'manuscript-cleanup',
            inputs: { mode, genre, checks, isSample: true },
            output: data,
            wordCount: wc,
            creditsSpent: 0,
            isSample: true,
        });

        return NextResponse.json({ success: true, data, isSample: true, wordsProcessed: wc });
    } catch (err) {
        console.error('Manuscript cleanup sample error:', err);
        return NextResponse.json({ error: 'api_error', message: err.message }, { status: 500 });
    }
}
