import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

const PLAN_LIMITS = { free: 10, starter: 100, pro: 500, lifetime: 1000 };

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        const { data: profile } = await supabase
            .from('users')
            .select('*')
            .eq('id', user.id)
            .single();

        const plan = profile?.plan || 'free';
        return NextResponse.json({
            plan,
            runs_used: profile?.runs_this_month || 0,
            runs_limit: PLAN_LIMITS[plan] || 10
        });
    } catch (err) {
        console.error('Usage error:', err);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}
