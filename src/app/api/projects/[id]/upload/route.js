import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

// POST /api/projects/[id]/upload — Upload .docx, extract HTML + metadata, store in project
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

        let html = '';
        let plainText = '';
        let docMeta = {};
        const arrayBuffer = await file.arrayBuffer();

        if (file.name.endsWith('.docx')) {
            const mammoth = (await import('mammoth')).default;

            // v8.0 Part F1: ALWAYS use convertToHtml with styleMap — preserves bold/italic/headings
            const result = await mammoth.convertToHtml({ arrayBuffer }, {
                styleMap: [
                    'b => b', 'i => i', 'u => u', 'strike => s',
                    "p[style-name='Heading 1'] => h1:fresh",
                    "p[style-name='Heading 2'] => h2:fresh",
                    "p[style-name='Heading 3'] => h3:fresh",
                ]
            });
            html = result.value;

            // Strip tags for plain text + word count
            plainText = html
                .replace(/<br\s*\/?>/gi, '\n')
                .replace(/<\/p>/gi, '\n\n')
                .replace(/<[^>]*>/g, '')
                .replace(/&nbsp;/g, ' ')
                .replace(/&amp;/g, '&')
                .trim();

            // v8.0 Part F2: Extract docx metadata (title, author, keywords)
            try {
                const { extractDocxMetadata } = await import('docx-metadata');
                docMeta = await extractDocxMetadata(Buffer.from(arrayBuffer)) || {};
            } catch (metaErr) {
                console.warn('docx-metadata extraction skipped:', metaErr.message);
                docMeta = {};
            }
        } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
            plainText = Buffer.from(arrayBuffer).toString('utf-8');
            html = plainText; // No formatting to preserve for .txt
        } else {
            return NextResponse.json({ error: 'Only .docx and .txt files are supported' }, { status: 400 });
        }

        const wordCount = plainText.trim().split(/\s+/).length;

        // Update project with HTML (formatting preserved) + metadata
        const updateData = {
            raw_html: html, // HTML with bold/italic/headings preserved
            metadata: {
                original_filename: file.name,
                original_size: file.size,
                word_count: wordCount,
                uploaded_at: new Date().toISOString(),
                // docx-metadata fields for Metadata Builder pre-fill
                doc_title: docMeta.title || null,
                doc_author: docMeta.creator || docMeta.author || null,
                doc_subject: docMeta.subject || null,
                doc_keywords: docMeta.keywords || null,
                doc_description: docMeta.description || null,
            },
            updated_at: new Date().toISOString(),
        };

        // Also update project title/author if extracted and not already set
        if (docMeta.title) updateData.title = docMeta.title;
        if (docMeta.creator || docMeta.author) updateData.author = docMeta.creator || docMeta.author;

        const { error: updateError } = await supabase
            .from('projects')
            .update(updateData)
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
            text_preview: plainText.substring(0, 300),
            metadata: docMeta,
        });
    } catch (err) {
        console.error('Project upload error:', err);
        return NextResponse.json({ error: 'upload_error', message: err.message }, { status: 500 });
    }
}

