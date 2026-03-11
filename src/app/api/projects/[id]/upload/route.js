import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// POST /api/projects/[id]/upload — Upload .docx, extract text, store in project
export async function POST(request, { params }) {
    try {
        const supabase = await createClient();
        const { data: { user }, error: authError } = await supabase.auth.getUser();
        if (authError || !user) {
            return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
        }

        const { id } = await params;

        // Verify project ownership
        const { data: project, error: projError } = await supabase
            .from('projects')
            .select('id')
            .eq('id', id)
            .eq('user_id', user.id)
            .single();

        if (projError || !project) {
            return NextResponse.json({ error: 'project_not_found' }, { status: 404 });
        }

        const formData = await request.formData();
        const file = formData.get('file');
        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        // Check file size (max 10MB)
        if (file.size > 10 * 1024 * 1024) {
            return NextResponse.json({ error: 'File too large (max 10MB)' }, { status: 400 });
        }

        let extractedText = '';
        const arrayBuffer = await file.arrayBuffer();

        if (file.name.endsWith('.docx')) {
            // Extract text from .docx using mammoth (server-side)
            const mammoth = (await import('mammoth')).default;
            const result = await mammoth.extractRawText({ arrayBuffer });
            extractedText = result.value;
        } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
            extractedText = Buffer.from(arrayBuffer).toString('utf-8');
        } else {
            return NextResponse.json({ error: 'Only .docx and .txt files are supported' }, { status: 400 });
        }

        // Store extracted text in project
        const wordCount = extractedText.trim().split(/\s+/).length;

        const { error: updateError } = await supabase
            .from('projects')
            .update({
                raw_html: extractedText,
                metadata: {
                    original_filename: file.name,
                    original_size: file.size,
                    word_count: wordCount,
                    uploaded_at: new Date().toISOString(),
                },
                updated_at: new Date().toISOString(),
            })
            .eq('id', id)
            .eq('user_id', user.id);

        if (updateError) throw updateError;

        // Optional: Upload original to R2 for backup
        try {
            const { uploadFile } = await import('@/lib/r2');
            const r2Key = `projects/${user.id}/${id}/${file.name}`;
            await uploadFile(r2Key, Buffer.from(arrayBuffer), file.type);
            await supabase
                .from('projects')
                .update({ r2_key: r2Key })
                .eq('id', id);
        } catch (r2Err) {
            console.warn('R2 upload skipped (not fatal):', r2Err.message);
        }

        return NextResponse.json({
            success: true,
            word_count: wordCount,
            filename: file.name,
            text_preview: extractedText.substring(0, 300),
        });
    } catch (err) {
        console.error('Project upload error:', err);
        return NextResponse.json({ error: 'upload_error', message: err.message }, { status: 500 });
    }
}
