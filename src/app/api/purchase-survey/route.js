import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPool } from '@/lib/db/pool';

// "How did you hear about BookKraft?" on /welcome. One row per user (answer
// or skip), so GET reports show:false once they've responded.

const SOURCES = new Set(['google', 'ai', 'amazon_book', 'reddit_facebook', 'youtube', 'friend', 'other']);
const PLANS = new Set(['starter', 'pro', 'lifetime']);

async function getUser() {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return user;
}

export async function GET() {
    try {
        const user = await getUser();
        if (!user) return NextResponse.json({ show: false });
        const { rows } = await getPool().query(
            'SELECT 1 FROM purchase_source_survey WHERE user_id = $1',
            [user.id]
        );
        return NextResponse.json({ show: rows.length === 0 });
    } catch (err) {
        console.error('purchase-survey GET failed:', err.message);
        return NextResponse.json({ show: false });
    }
}

export async function POST(request) {
    const user = await getUser();
    if (!user) return NextResponse.json({ error: 'unauthorized' }, { status: 401 });

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }

    const plan = PLANS.has(body?.plan) ? body.plan : null;
    const skipped = body?.skipped === true;
    const source = skipped ? null : body?.source;
    if (!skipped && !SOURCES.has(source)) {
        return NextResponse.json({ error: 'invalid_source' }, { status: 400 });
    }
    const otherText = source === 'other' && typeof body?.other_text === 'string'
        ? body.other_text.trim().slice(0, 200) || null
        : null;

    try {
        await getPool().query(
            `INSERT INTO purchase_source_survey (user_id, plan, source, other_text, skipped)
             VALUES ($1, $2, $3, $4, $5)
             ON CONFLICT (user_id) DO NOTHING`,
            [user.id, plan, source, otherText, skipped]
        );
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('purchase-survey POST failed:', err.message);
        return NextResponse.json({ error: 'save_failed' }, { status: 500 });
    }
}
