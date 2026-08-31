'use client';

import { useState, useCallback } from 'react';
import { CHAPTER_BOUNDARY_MARKER } from '@/lib/ai/chunker';
import { useLoadingSteps } from '@/hooks/useLoadingSteps';

const FILE_STEPS = [
    { text: 'Reading file...', ms: 800 },
    { text: 'Extracting text...', ms: 1800 },
    { text: 'Almost done...', ms: 0 },
];

/**
 * FileUploader — Drag-and-drop .docx/.txt upload component.
 * Uses mammoth.convertToHtml with styleMap to preserve bold/italic/headings.
 * Calls onTextExtracted(plainText, html) when done.
 *
 * Heading 1 blocks get an invisible chapter-boundary marker inlined into the
 * extracted plain text (see lib/ai/chunker.ts) so long-manuscript tools can
 * chunk on real chapter breaks instead of only paragraph count. Pasted text
 * never has this marker and chunks on paragraphs alone, same as before.
 */
export default function FileUploader({ onTextExtracted, accept = '.docx,.txt', label = 'Upload a file' }) {
    const [fileName, setFileName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const stepText = useLoadingSteps(FILE_STEPS, loading);

    // Strip HTML tags to get plain text for tool textareas
    const htmlToPlainText = (html) => {
        return html
            .replace(/<h1[^>]*>/gi, `\n\n${CHAPTER_BOUNDARY_MARKER}`)
            .replace(/<br\s*\/?>/gi, '\n')
            .replace(/<\/p>/gi, '\n\n')
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .replace(/&#39;/g, "'")
            .trim();
    };

    const gtag = (...args) => {
        if (typeof window !== 'undefined' && window.gtag) window.gtag(...args);
    };

    const fileSizeRange = (bytes) => {
        if (!bytes) return 'unknown';
        if (bytes < 1024 * 1024) return '0-1MB';
        if (bytes < 5 * 1024 * 1024) return '1-5MB';
        if (bytes < 10 * 1024 * 1024) return '5-10MB';
        return '10MB+';
    };

    const processFile = useCallback(async (file) => {
        if (!file) return;
        setLoading(true);
        setError('');
        setFileName(file.name);

        gtag('event', 'file_upload_start', { tool_name: 'file_uploader', file_type: file.name.split('.').pop(), file_size_range: fileSizeRange(file.size) });

        try {
            if (file.name.endsWith('.docx')) {
                const mammoth = (await import('mammoth')).default;
                const arrayBuffer = await file.arrayBuffer();

                // v8.0 Part F1: ALWAYS use convertToHtml with styleMap
                const { value: html } = await mammoth.convertToHtml({ arrayBuffer }, {
                    styleMap: [
                        'b => b', 'i => i', 'u => u', 'strike => s',
                        "p[style-name='Heading 1'] => h1:fresh",
                        "p[style-name='Heading 2'] => h2:fresh",
                        "p[style-name='Heading 3'] => h3:fresh",
                    ]
                });

                const plainText = htmlToPlainText(html);
                onTextExtracted(plainText, html);
                gtag('event', 'file_upload_success', { tool_name: 'file_uploader', file_type: 'docx', file_size_range: fileSizeRange(file.size) });
            } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
                const text = await file.text();
                onTextExtracted(text, null);
                gtag('event', 'file_upload_success', { tool_name: 'file_uploader', file_type: 'txt', file_size_range: fileSizeRange(file.size) });
            } else {
                const ext = file.name.split('.').pop().toLowerCase();
                setError(`"${ext}" files aren't supported. Please upload a .docx or .txt file.`);
                gtag('event', 'file_upload_failed', { tool_name: 'file_uploader', error_type: 'invalid_format', file_type: ext, file_size_range: fileSizeRange(file.size) });
            }
        } catch (err) {
            setError("We couldn't read this file — it may be corrupted or in an unsupported format. Try re-saving as .docx or paste your text instead.");
            console.error('File upload error:', err);
            gtag('event', 'file_upload_failed', { tool_name: 'file_uploader', error_type: 'parse_error', file_type: file.name.split('.').pop(), file_size_range: fileSizeRange(file.size) });
        } finally {
            setLoading(false);
        }
    }, [onTextExtracted]);

    return (
        <div style={{ marginBottom: 'var(--space-4)' }}>
            <div
                className={`drop-zone ${dragOver ? 'drop-zone-active' : ''}`}
                style={{ padding: '20px', minHeight: 'auto', cursor: 'pointer' }}
                onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                onDragLeave={() => setDragOver(false)}
                onDrop={(e) => { e.preventDefault(); setDragOver(false); processFile(e.dataTransfer.files[0]); }}
                onClick={() => document.getElementById('file-upload-input').click()}
            >
                <input id="file-upload-input" type="file" accept={accept} hidden
                    onChange={(e) => processFile(e.target.files[0])} />

                {loading ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', justifyContent: 'center' }}>
                        <div className="spinner" /> {stepText}
                    </div>
                ) : fileName ? (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontWeight: 600, color: 'var(--sage)', fontSize: 'var(--text-sm)' }}>
                            ✓ {fileName}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--mid)', marginTop: '4px' }}>
                            Click or drop another file to replace
                        </p>
                    </div>
                ) : (
                    <div style={{ textAlign: 'center' }}>
                        <p style={{ fontWeight: 600, fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>
                            {label}
                        </p>
                        <p style={{ fontSize: '12px', color: 'var(--mid)', marginTop: '4px' }}>
                            Drag & drop .docx or .txt — or click to browse
                        </p>
                    </div>
                )}
            </div>
            {error && (
                <div style={{ marginTop: '8px', padding: '10px 12px', background: 'rgba(255,107,91,0.06)', border: '1px solid rgba(255,107,91,0.25)', borderRadius: '6px' }}>
                    <p style={{ color: 'var(--rust)', fontSize: '13px', margin: '0 0 8px' }}>{error}</p>
                    <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                        <button
                            style={{ fontSize: '12px', fontWeight: 600, color: 'var(--gold)', background: 'none', border: '1px solid var(--gold)', borderRadius: '4px', padding: '3px 10px', cursor: 'pointer' }}
                            onClick={(e) => { e.stopPropagation(); setError(''); setFileName(''); document.getElementById('file-upload-input').click(); }}
                        >
                            Try Again
                        </button>
                        <span style={{ fontSize: '12px', color: 'var(--mid)' }}>Supported: .docx, .txt</span>
                    </div>
                </div>
            )}
        </div>
    );
}

