'use client';

import { useState, useRef, useEffect, useMemo } from 'react';
import { useProject } from '@/lib/ProjectContext';
import { useLoadingSteps } from '@/hooks/useLoadingSteps';

const FORMATTER_STEPS = [
    { text: 'Uploading...', ms: 1500 },
    { text: 'Processing manuscript...', ms: 2500 },
    { text: 'Building EPUB...', ms: 3500 },
    { text: 'Almost done...', ms: 0 },
];

export default function EpubFormatter() {
    const { currentProject, loadProjectText } = useProject();
    const [form, setForm] = useState({ title: 'My Book', author: 'Author Name', language: 'English', isbn: '', headingDetection: 'auto' });
    const [manuscript, setManuscript] = useState('');
    const [coverFile, setCoverFile] = useState(null);
    const [imageFiles, setImageFiles] = useState({});
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const stepText = useLoadingSteps(FORMATTER_STEPS, loading);
    const [success, setSuccess] = useState('');
    const fileRef = useRef(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'tool_view', { tool_name: 'epub_formatter' });
        }
    }, []);

    // Pre-fill from active project
    useEffect(() => {
        if (currentProject?.id && !manuscript) {
            loadProjectText(currentProject.id).then(text => {
                if (text) setManuscript(text);
            });
            if (currentProject.title) setForm(f => ({ ...f, title: currentProject.title }));
            if (currentProject.author) setForm(f => ({ ...f, author: currentProject.author }));
        }
    }, [currentProject?.id]);

    // Parse manuscript for ![alt](filename) image references
    const imageRefs = useMemo(() => {
        const seen = new Set();
        const refs = [];
        const regex = /!\[([^\]]*)\]\(([^)]+)\)/g;
        let m;
        while ((m = regex.exec(manuscript)) !== null) {
            const filename = m[2].split('/').pop();
            if (!seen.has(filename)) {
                seen.add(filename);
                refs.push({ filename, alt: m[1] });
            }
        }
        return refs;
    }, [manuscript]);

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const gtag = (...args) => {
        if (typeof window !== 'undefined' && window.gtag) window.gtag(...args);
    };

    const handleSubmit = async () => {
        if (!manuscript.trim()) return;

        gtag('event', 'tool_start', { tool_name: 'epub_formatter' });

        setLoading(true);
        setError('');
        setSuccess('');

        try {
            const formData = new FormData();
            formData.append('manuscript', manuscript);
            formData.append('title', form.title);
            formData.append('author', form.author);
            formData.append('language', form.language);
            formData.append('isbn', form.isbn);
            formData.append('headingDetection', form.headingDetection);
            if (coverFile) formData.append('cover', coverFile);

            // Append only images still referenced in current manuscript
            const currentFilenames = new Set(imageRefs.map(r => r.filename));
            Object.entries(imageFiles).forEach(([filename, file]) => {
                if (file && currentFilenames.has(filename)) {
                    formData.append(`image:${filename}`, file);
                }
            });

            const res = await fetch('/api/tools/epub-formatter', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json().catch(() => ({}));
                const msg = res.status === 413
                    ? 'Your manuscript is too large for this tool. Try splitting it into smaller parts.'
                    : 'EPUB generation failed. Please check your manuscript text and try again.';
                setError(msg);
                console.error('epub-formatter error:', res.status, data);
                return;
            }

            // Download the EPUB
            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            const filename = res.headers.get('Content-Disposition')?.match(/filename="([^"]+)"/)?.[1] || 'book.epub';
            a.href = url;
            a.download = filename;
            a.click();
            URL.revokeObjectURL(url);

            setSuccess(`✓ ${filename} generated! Check your downloads folder.`);
            gtag('event', 'tool_complete', { tool_name: 'epub_formatter' });
        } catch {
            setError('Could not reach the server — check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>EPUB Settings</h3>
                <div className="form-group"><label className="form-label">Book title</label><input className="form-input" value={form.title} onChange={(e) => updateField('title', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Author name</label><input className="form-input" value={form.author} onChange={(e) => updateField('author', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Language</label>
                    <select className="form-select" value={form.language} onChange={(e) => updateField('language', e.target.value)}>
                        {['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">ISBN (optional)</label><input className="form-input" value={form.isbn} onChange={(e) => updateField('isbn', e.target.value)} /></div>
                <div className="form-group">
                    <label className="form-label">Cover image (optional)</label>
                    <input ref={fileRef} type="file" accept="image/jpeg,image/png" onChange={(e) => setCoverFile(e.target.files[0])} style={{ display: 'none' }} />
                    <button className="btn btn-outline btn-sm" onClick={() => fileRef.current?.click()}>
                        {coverFile ? `✓ ${coverFile.name}` : 'Choose cover image'}
                    </button>
                </div>
                <div className="form-group">
                    <label className="form-label">Heading detection</label>
                    {['auto', 'hash', 'caps'].map((h) => (
                        <label key={h} className="fix-checkbox">
                            <input type="radio" checked={form.headingDetection === h} onChange={() => updateField('headingDetection', h)} />
                            <span>{{ auto: 'Auto-detect', hash: 'Lines starting with #', caps: 'ALL CAPS lines' }[h]}</span>
                        </label>
                    ))}
                </div>
            </div>

            <div className="tool-output-card">
                <h3>Manuscript</h3>
                <textarea className="form-textarea" style={{ minHeight: '300px' }}
                    placeholder={`Paste your full manuscript here. Use # for chapter headings.\n\nTo embed images, reference them with Markdown syntax:\n![Alt text](filename.jpg)\n\nUpload slots will appear below for each image you reference.`}
                    value={manuscript} onChange={(e) => setManuscript(e.target.value)} />

                {imageRefs.length > 0 && (
                    <div style={{ margin: '12px 0', padding: '14px 16px', background: 'var(--card-bg, #f9f6f1)', border: '1px solid var(--border, #e8e0d0)', borderRadius: '8px' }}>
                        <p style={{ margin: '0 0 10px', fontWeight: 600, fontSize: '0.9rem' }}>
                            {imageRefs.length} image{imageRefs.length !== 1 ? 's' : ''} referenced — upload them to embed in the EPUB
                        </p>
                        {imageRefs.map(({ filename }) => (
                            <div key={filename} style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                                <code style={{ fontSize: '0.82rem', minWidth: '160px', opacity: 0.75 }}>{filename}</code>
                                <label style={{ cursor: 'pointer', fontSize: '0.85rem', color: 'var(--gold, #c9933a)', textDecoration: 'underline' }}>
                                    {imageFiles[filename] ? `✓ ${imageFiles[filename].name}` : 'Choose file'}
                                    <input type="file" accept="image/*" style={{ display: 'none' }}
                                        onChange={e => {
                                            const file = e.target.files[0];
                                            if (file) setImageFiles(prev => ({ ...prev, [filename]: file }));
                                        }} />
                                </label>
                            </div>
                        ))}
                        <p style={{ margin: '8px 0 0', fontSize: '0.78rem', opacity: 0.6 }}>
                            Images not uploaded will appear as plain text in the EPUB.
                        </p>
                    </div>
                )}

                <button className="btn btn-gold generate-btn" onClick={handleSubmit} disabled={loading || !manuscript.trim()}>
                    {loading ? <><div className="spinner" /> {stepText}</> : '📦 Generate EPUB File'}
                </button>
                {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
                {success && <p className="auth-success" style={{ marginTop: '1rem' }}>{success}</p>}
            </div>
        </div>
    );
}
