'use client';

import { useState, useCallback } from 'react';

/**
 * FileUploader — Drag-and-drop .docx/.txt upload component.
 * Extracts plain text from .docx using mammoth, or reads .txt directly.
 * Calls onTextExtracted(text) when done.
 */
export default function FileUploader({ onTextExtracted, accept = '.docx,.txt', label = 'Upload a file' }) {
    const [fileName, setFileName] = useState('');
    const [dragOver, setDragOver] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const processFile = useCallback(async (file) => {
        if (!file) return;
        setLoading(true);
        setError('');
        setFileName(file.name);

        try {
            if (file.name.endsWith('.docx')) {
                const mammoth = (await import('mammoth')).default;
                const arrayBuffer = await file.arrayBuffer();
                const result = await mammoth.extractRawText({ arrayBuffer });
                onTextExtracted(result.value);
            } else if (file.name.endsWith('.txt') || file.type === 'text/plain') {
                const text = await file.text();
                onTextExtracted(text);
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
                            Uploaded: {fileName}
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
