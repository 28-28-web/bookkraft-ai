import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { createJob } from '@/lib/ai/jobs';

const CHUNKED_TOOLS = ['manuscript-cleanup', 'print-to-digital', 'style-sheet-auditor'];

function buildMeta(toolSlug, body) {
    if (toolSlug === 'manuscript-cleanup') {
        const enabledChecks = Object.entries(body.checks || {}).filter(([, v]) => v).map(([k]) => k).join(', ');
        return { mode: body.mode, genre: body.genre, enabledChecks };
    }
    if (toolSlug === 'print-to-digital') {
        const enabledAdaptations = Object.entries(body.adaptations || {}).filter(([, v]) => v).map(([k]) => k).join(', ');
        return { enabledAdaptations, footnoteFormat: body.footnoteFormat };
    }
    if (toolSlug === 'style-sheet-auditor') {
        const enabledCategories = Object.entries(body.categories || {}).filter(([, v]) => v).map(([k]) => k).join(', ');
        const styleInstruction = body.styleSheet
            ? `Apply these known style rules: ${body.styleSheet}`
            : "Infer the author's intended style rules, then find violations.";
        return { enabledCategories, styleInstruction };
    }
    return {};
}

const ERROR_STATUS = {
    empty_input: 400,
    unknown_tool: 400,
    no_profile: 401,
    insufficient_credits: 402,
    concurrent_limit: 429,
    daily_word_limit: 429,
};

export async function POST(request, { params }) {
    const { toolSlug } = await params;
    if (!CHUNKED_TOOLS.includes(toolSlug)) {
        return NextResponse.json({ error: 'unsupported_tool' }, { status: 404 });
    }

    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (!user) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { text } = body;
    if (!text || !text.trim()) {
        return NextResponse.json({ error: 'empty_input' }, { status: 400 });
    }

    const result = await createJob({
        userId: user.id,
        toolSlug,
        rawText: text,
        meta: buildMeta(toolSlug, body),
    });

    if (!result.ok) {
        return NextResponse.json(result, { status: ERROR_STATUS[result.error] || 400 });
    }

    return NextResponse.json(result);
}
