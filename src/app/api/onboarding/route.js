import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';
import { getPool } from '@/lib/db/pool';

export async function POST(request) {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
        return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
    }

    let body;
    try {
        body = await request.json();
    } catch {
        return NextResponse.json({ error: 'invalid_json' }, { status: 400 });
    }

    const { formatting_goal } = body;
    if (!formatting_goal || typeof formatting_goal !== 'string') {
        return NextResponse.json({ error: 'missing_formatting_goal' }, { status: 400 });
    }

    try {
        const db = getPool();
        await db.query(
            'UPDATE users SET formatting_goal = $1 WHERE id = $2',
            [formatting_goal, user.id]
        );
        return NextResponse.json({ ok: true });
    } catch (err) {
        console.error('Onboarding save failed:', err.message);
        return NextResponse.json({ error: 'save_failed' }, { status: 500 });
    }
}
