'use client';
import { useState, useRef } from 'react';

export default function ManuscriptModeClient() {
    const [file, setFile] = useState(null);
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [language, setLanguage] = useState('English');
    const [fixes, setFixes] = useState({
        fixSmartQuotes: true,
        fixEmDashes: true,
        fixEncoding: true,
        removeDoubleSpaces: true,
    });
    const [status, setStatus] = useState('idle'); // idle | processing | done | error
    const [errorMsg, setErrorMsg] = useState('');
    const [result, setResult] = useState(null);
    const fileInputRef = useRef(null);

    const handleFileChange = (e) => {
        const f = e.target.files[0];
        if (!f) return;
        setFile(f);
        // Auto-fill title from filename
        if (!title) {
            const name = f.name.replace(/\.(docx|txt)$/i, '').replace(/[-_]/g, ' ');
            setTitle(name);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const f = e.dataTransfer.files[0];
        if (f) {
            setFile(f);
            if (!title) {
                const name = f.name.replace(/\.(docx|txt)$/i, '').replace(/[-_]/g, ' ');
                setTitle(name);
            }
        }
    };

    const handleSubmit = async () => {
        if (!file) { setErrorMsg('Please upload a file first.'); return; }
        if (!title.trim()) { setErrorMsg('Please enter a book title.'); return; }
        if (!author.trim()) { setErrorMsg('Please enter an author name.'); return; }

        setStatus('processing');
        setErrorMsg('');
        setResult(null);

        try {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('title', title);
            formData.append('author', author);
            formData.append('language', language);
            Object.entries(fixes).forEach(([k, v]) => formData.append(k, String(v)));

            const res = await fetch('/api/tools/manuscript-mode', {
                method: 'POST',
                body: formData,
            });

            if (!res.ok) {
                const err = await res.json();
                if (err.error === 'unauthorized') {
                    setErrorMsg('Please sign in to use this tool.');
                } else if (err.error === 'bundle_required') {
                    setErrorMsg('This tool requires an Essentials Bundle or Full Access.');
                } else {
                    setErrorMsg(err.message || 'Something went wrong. Please try again.');
                }
                setStatus('error');
                return;
            }

            const chaptersFound = res.headers.get('X-Chapters-Found');
            const wordCount = res.headers.get('X-Word-Count');

            const blob = await res.blob();
            const url = URL.createObjectURL(blob);
            const slug = title.toLowerCase().replace(/[^a-z0-9]+/g, '-');

            setResult({
                downloadUrl: url,
                filename: `${slug}.epub`,
                chaptersFound: chaptersFound || '?',
                wordCount: wordCount ? Number(wordCount).toLocaleString() : '?',
            });
            setStatus('done');

        } catch (err) {
            setErrorMsg('Network error. Please try again.');
            setStatus('error');
        }
    };

    const handleReset = () => {
        setFile(null);
        setTitle('');
        setAuthor('');
        setStatus('idle');
        setErrorMsg('');
        setResult(null);
        if (fileInputRef.current) fileInputRef.current.value = '';
    };

    return (
        <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 20px', fontFamily: 'inherit' }}>

            {/* Header */}
            <div style={{ marginBottom: 32 }}>
                <h1 style={{ fontSize: 28, fontWeight: 700, marginBottom: 8, color: '#111' }}>
                    Full Manuscript Mode
                </h1>
                <p style={{ color: '#555', fontSize: 15, lineHeight: 1.6 }}>
                    Upload your .docx or .txt manuscript. We clean the formatting and generate a publish-ready EPUB in one step.
                </p>
            </div>

            {status === 'done' && result ? (
                /* ── Success State ── */
                <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: 28 }}>
                    <div style={{ fontSize: 20, fontWeight: 700, color: '#15803d', marginBottom: 8 }}>
                        ✓ Your EPUB is ready
                    </div>
                    <div style={{ color: '#555', fontSize: 14, marginBottom: 20 }}>
                        {result.chaptersFound} chapters detected · {result.wordCount} words processed
                    </div>
                    <a
                        href={result.downloadUrl}
                        download={result.filename}
                        style={{
                            display: 'inline-block',
                            background: '#B8962E',
                            color: '#fff',
                            padding: '12px 28px',
                            borderRadius: 8,
                            fontWeight: 600,
                            fontSize: 15,
                            textDecoration: 'none',
                            marginBottom: 16,
                        }}
                    >
                        Download {result.filename}
                    </a>
                    <div>
                        <button
                            onClick={handleReset}
                            style={{ background: 'none', border: 'none', color: '#B8962E', cursor: 'pointer', fontSize: 14, textDecoration: 'underline' }}
                        >
                            Process another manuscript
                        </button>
                    </div>
                </div>
            ) : (
                /* ── Form State ── */
                <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>

                    {/* File Upload */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 8, fontSize: 14 }}>
                            Manuscript file
                        </label>
                        <div
                            onDrop={handleDrop}
                            onDragOver={(e) => e.preventDefault()}
                            onClick={() => fileInputRef.current?.click()}
                            style={{
                                border: `2px dashed ${file ? '#B8962E' : '#ddd'}`,
                                borderRadius: 10,
                                padding: '28px 20px',
                                textAlign: 'center',
                                cursor: 'pointer',
                                background: file ? '#fdf8ee' : '#fafafa',
                                transition: 'all 0.2s',
                            }}
                        >
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept=".docx,.txt"
                                onChange={handleFileChange}
                                style={{ display: 'none' }}
                            />
                            {file ? (
                                <div>
                                    <div style={{ fontSize: 24, marginBottom: 4 }}>📄</div>
                                    <div style={{ fontWeight: 600, color: '#111' }}>{file.name}</div>
                                    <div style={{ color: '#888', fontSize: 13 }}>
                                        {(file.size / 1024).toFixed(1)} KB · Click to change
                                    </div>
                                </div>
                            ) : (
                                <div>
                                    <div style={{ fontSize: 32, marginBottom: 8 }}>📂</div>
                                    <div style={{ fontWeight: 600, color: '#333', marginBottom: 4 }}>
                                        Drop your manuscript here
                                    </div>
                                    <div style={{ color: '#888', fontSize: 13 }}>
                                        .docx or .txt · up to 10MB
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Book Details */}
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                                Book title *
                            </label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="My Book"
                                style={{
                                    width: '100%', padding: '10px 12px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box',
                                }}
                            />
                        </div>
                        <div>
                            <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                                Author name *
                            </label>
                            <input
                                type="text"
                                value={author}
                                onChange={(e) => setAuthor(e.target.value)}
                                placeholder="Jane Doe"
                                style={{
                                    width: '100%', padding: '10px 12px', borderRadius: 8,
                                    border: '1px solid #ddd', fontSize: 14, boxSizing: 'border-box',
                                }}
                            />
                        </div>
                    </div>

                    {/* Language */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 6, fontSize: 14 }}>
                            Language
                        </label>
                        <select
                            value={language}
                            onChange={(e) => setLanguage(e.target.value)}
                            style={{
                                padding: '10px 12px', borderRadius: 8, border: '1px solid #ddd',
                                fontSize: 14, background: '#fff',
                            }}
                        >
                            {['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch'].map(l => (
                                <option key={l}>{l}</option>
                            ))}
                        </select>
                    </div>

                    {/* Fixes */}
                    <div>
                        <label style={{ display: 'block', fontWeight: 600, marginBottom: 10, fontSize: 14 }}>
                            Formatting fixes to apply
                        </label>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                            {[
                                { key: 'fixSmartQuotes', label: 'Fix smart quotes' },
                                { key: 'fixEmDashes', label: 'Fix em dashes (-- → —)' },
                                { key: 'fixEncoding', label: 'Fix encoding artifacts (â€™ → \')' },
                                { key: 'removeDoubleSpaces', label: 'Remove double spaces' },
                            ].map(({ key, label }) => (
                                <label key={key} style={{ display: 'flex', alignItems: 'center', gap: 10, cursor: 'pointer', fontSize: 14 }}>
                                    <input
                                        type="checkbox"
                                        checked={fixes[key]}
                                        onChange={(e) => setFixes(prev => ({ ...prev, [key]: e.target.checked }))}
                                        style={{ width: 16, height: 16, accentColor: '#B8962E' }}
                                    />
                                    {label}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Error */}
                    {errorMsg && (
                        <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: 8, padding: '12px 16px', color: '#dc2626', fontSize: 14 }}>
                            {errorMsg}
                        </div>
                    )}

                    {/* Submit */}
                    <button
                        onClick={handleSubmit}
                        disabled={status === 'processing'}
                        style={{
                            background: status === 'processing' ? '#d4a843' : '#B8962E',
                            color: '#fff',
                            border: 'none',
                            padding: '14px 28px',
                            borderRadius: 8,
                            fontWeight: 700,
                            fontSize: 16,
                            cursor: status === 'processing' ? 'not-allowed' : 'pointer',
                            transition: 'background 0.2s',
                        }}
                    >
                        {status === 'processing' ? 'Processing your manuscript…' : 'Generate EPUB →'}
                    </button>

                </div>
            )}
        </div>
    );
}
