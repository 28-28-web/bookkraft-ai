import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { data: profile } = await supabase
            .from('users')
            .select('credits_balance, has_logic_bundle, has_full_access, is_lifetime')
            .eq('id', user.id)
            .single();

        return NextResponse.json({
            credits_balance: profile?.credits_balance || 0,
            has_logic_bundle: profile?.has_logic_bundle || false,
            has_full_access: profile?.has_full_access || false,
            is_lifetime: profile?.is_lifetime || false,
        });
    } catch (err) {
        console.error('Tool access check error:', err);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}
