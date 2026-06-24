import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase
            .from('site_stats')
            .select('count')
            .eq('key', 'books_stamped')
            .single();

        if (error) {
            console.error('Stamp counter GET error:', error);
            return NextResponse.json({ count: 0 });
        }

        return NextResponse.json({ count: data.count });
    } catch (err) {
        console.error('Stamp counter GET error:', err);
        return NextResponse.json({ count: 0 });
    }
}

export async function POST() {
    try {
        const supabase = await createClient();
        const { data, error } = await supabase.rpc('increment_stamp_counter');

        if (error) {
            console.error('Stamp counter POST error:', error);
            return NextResponse.json({ error: 'failed' }, { status: 500 });
        }

        return NextResponse.json({ count: data });
    } catch (err) {
        console.error('Stamp counter POST error:', err);
        return NextResponse.json({ error: 'failed' }, { status: 500 });
    }
}