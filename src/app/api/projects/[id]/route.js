import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// GET /api/projects/[id] — Get single project with full text
export async function GET(request, { params }) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const { data, error } = await supabase
            .from('projects')
            .select('*')
            .eq('id', id)
            .eq('user_id', user.id)
            .single();

        if (error || !data) {
            return NextResponse.json({ error: 'not_found' }, { status: 404 });
        }

        return NextResponse.json(data);
    } catch (err) {
        console.error('Project GET error:', err);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}

// PATCH /api/projects/[id] — Update project
export async function PATCH(request, { params }) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { id } = await params;
        const body = await request.json();

        // Only allow updating specific fields
        const updates = {};
        if (body.title !== undefined) updates.title = body.title;
        if (body.author !== undefined) updates.author = body.author;
        if (body.raw_html !== undefined) updates.raw_html = body.raw_html;
        if (body.metadata !== undefined) updates.metadata = body.metadata;
        if (body.last_tool !== undefined) updates.last_tool = body.last_tool;
        if (body.r2_key !== undefined) updates.r2_key = body.r2_key;
        updates.updated_at = new Date().toISOString();

        const { data, error } = await supabase
            .from('projects')
            .update(updates)
            .eq('id', id)
            .eq('user_id', user.id)
            .select()
            .single();

        if (error) throw error;
        return NextResponse.json(data);
    } catch (err) {
        console.error('Project PATCH error:', err);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}

// DELETE /api/projects/[id] — Delete project
export async function DELETE(request, { params }) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // TODO: Delete R2 files when implemented
        const { error } = await supabase
            .from('projects')
            .delete()
            .eq('id', id)
            .eq('user_id', user.id);

        if (error) throw error;
        return NextResponse.json({ deleted: true });
    } catch (err) {
        console.error('Project DELETE error:', err);
        return NextResponse.json({ error: 'server_error' }, { status: 500 });
    }
}
