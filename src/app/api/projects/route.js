import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/projects — List user's projects
export async function GET() {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { data, error } = await supabase
            .from('projects')
            .select('id, title, author, last_tool, raw_html, metadata, r2_key, created_at, updated_at')
            .eq('user_id', user.id)
            .order('updated_at', { ascending: false });

        if (error) throw error;

        // Return projects with a text preview (first 200 chars) instead of full raw_html
        const projects = (data || []).map(p => ({
            ...p,
            has_text: !!(p.raw_html && p.raw_html.length > 0),
            word_count: p.raw_html ? p.raw_html.trim().split(/\s+/).length : 0,
            text_preview: p.raw_html ? p.raw_html.substring(0, 200) : null,
            raw_html: undefined, // Don't send full text in list
        }));

        return NextResponse.json(projects);
    } catch (err) {
        console.error('Projects GET error:', err);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}

// POST /api/projects — Create a new project
export async function POST(request) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { title, author } = await request.json();
        if (!title) {
            return NextResponse.json({ error: 'Title is required' }, { status: 400 });
        }

        const { data, error } = await supabase
            .from('projects')
            .insert({
                user_id: user.id,
                title: title.trim(),
                author: (author || '').trim(),
            })
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data, { status: 201 });
    } catch (err) {
        console.error('Projects POST error:', err);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}
