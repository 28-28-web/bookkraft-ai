import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { estimateJob } from '@/lib/ai/jobs';

const CHUNKED_TOOLS = ['manuscript-cleanup', 'print-to-digital', 'style-sheet-auditor'];

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

    const { text } = await request.json();
    if (!text || !text.trim()) {
        return NextResponse.json({ error: 'empty_input' }, { status: 400 });
    }

    const estimate = estimateJob(toolSlug, text);
    return NextResponse.json({ ok: true, ...estimate });
}
