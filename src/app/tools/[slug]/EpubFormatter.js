'use client';

import { useState, useRef } from 'react';

export default function EpubFormatter() {
    const [form, setForm] = useState({ title: 'My Book', author: 'Author Name', language: 'English', isbn: '', headingDetection: 'auto' });
    const [manuscript, setManuscript] = useState('');
    const [coverFile, setCoverFile] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const fileRef = useRef(null);

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const handleSubmit = async () => {
        if (!manuscript.trim()) return;
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

            const res = await fetch('/api/tools/epub-formatter', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const data = await res.json();
                setError(data.error || 'Something went wrong');
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
        } catch {
            setError('Network error. Try again.');
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
                    placeholder="Paste your full manuscript here. Use # for chapter headings, or select a detection method."
                    value={manuscript} onChange={(e) => setManuscript(e.target.value)} />

                <button className="btn btn-gold generate-btn" onClick={handleSubmit} disabled={loading || !manuscript.trim()}>
                    {loading ? <><div className="spinner" /> Generating EPUB...</> : '📦 Generate EPUB File'}
                </button>
                {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
                {success && <p className="auth-success" style={{ marginTop: '1rem' }}>{success}</p>}
            </div>
        </div>
    );
}
