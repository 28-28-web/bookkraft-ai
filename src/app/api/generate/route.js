import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const PLAN_LIMITS = { free: 10, starter: 100, pro: 500, lifetime: 1000 };

export async function POST(request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Get user profile
        const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        const plan = profile?.plan || 'free';
        const runs = profile?.runs_this_month || 0;
        const limit = PLAN_LIMITS[plan] || 10;

        if (runs >= limit) {
            return NextResponse.json(
                { error: 'limit_reached', upgrade_url: '/upgrade' },
                { status: 429 }
            );
        }

        const { prompt } = await request.json();
        if (!prompt) {
            return NextResponse.json({ error: 'Missing prompt' }, { status: 400 });
        }

        // Call Anthropic API
        const res = await fetch('https://api.anthropic.com/v1/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'x-api-key': process.env.ANTHROPIC_API_KEY,
                'anthropic-version': '2023-06-01'
            },
            body: JSON.stringify({
                model: 'claude-haiku-4-5-20251001',
                max_tokens: 2048,
                messages: [{ role: 'user', content: prompt }]
            })
        });

        if (!res.ok) {
            const errBody = await res.text();
            console.error('Anthropic API error:', errBody);
            return NextResponse.json({ error: 'AI generation failed' }, { status: 500 });
        }

        const data = await res.json();
        const content = data.content?.map((b) => b.text || '').join('') || '';

        // Increment runs
        await supabase
            .from('users')
            .update({ runs_this_month: runs + 1 })
            .eq('id', user.id);

        return NextResponse.json({
            content,
            runs_used: runs + 1,
            runs_limit: limit
        });
    } catch (err) {
        console.error('Generate error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
