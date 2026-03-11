'use client';

import { useState, useCallback } from 'react';

/**
 * FileUploader — Drag-and-drop .docx/.txt upload component.
 * Uses mammoth.convertToHtml with styleMap to preserve bold/italic/headings.
 * Calls onTextExtracted(plainText, html) when done.
 */
export default function FileUploader({ onTextExtracted, accept = '.docx,.txt', label = 'Upload a file' }) {
    const [fileName, setFileName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    // Strip HTML tags to get plain text for tool textareas
    const htmlToPlainText = (html) => {
        return html
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

    const processFile = useCallback(async (file) => {
        if (!file) return;
        setLoading(true);
        setError('');
        setFileName(file.name);

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
            } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
                const text = await file.text();
                onTextExtracted(text, null);
            } else {
                setError('Please upload a .docx or .txt file.');
            }
        } catch (err) {
            setError('Could not read file. Try pasting your text instead.');
            console.error('File upload error:', err);
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
                        <div className="spinner" /> Extracting text...
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
            {error && <p style={{ color: 'var(--rust)', fontSize: '12px', marginTop: '6px' }}>{error}</p>}
        </div>
    );
}

