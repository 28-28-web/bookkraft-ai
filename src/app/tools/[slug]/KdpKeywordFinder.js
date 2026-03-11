'use client';

import { useState } from 'react';
import LivePreview from '@/components/LivePreview';

export default function KdpKeywordFinder() {
    const [form, setForm] = useState({ title: '', genre: 'Romance', reader: '', comps: '', themes: '' });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));

    const handleSubmit = async () => {
        if (!form.title || !form.genre) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/tools/kdp-keyword-finder', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(form),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
            setResult(data.data);
        } catch {
            setError('Network error. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Book Details</h3>
                <div className="form-group"><label className="form-label">Book title *</label><input className="form-input" value={form.title} onChange={(e) => updateField('title', e.target.value)} placeholder="My Book" /></div>
                <div className="form-group"><label className="form-label">Genre *</label>
                    <select className="form-select" value={form.genre} onChange={(e) => updateField('genre', e.target.value)}>
                        {['Cozy Mystery', 'Thriller', 'Romance', 'Fantasy', 'Sci-Fi', 'Literary Fiction', 'Horror', 'Historical Fiction', 'Self-Help', 'Business', 'Memoir', 'How-To', 'Health & Wellness', 'Finance', 'Parenting', 'Travel', 'Cooking', 'Other'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Target reader</label><textarea className="form-textarea" style={{ minHeight: '60px' }} value={form.reader} onChange={(e) => updateField('reader', e.target.value)} placeholder="Who reads this book?" /></div>
                <div className="form-group"><label className="form-label">Comparable titles/authors</label><input className="form-input" value={form.comps} onChange={(e) => updateField('comps', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Key themes/topics</label><textarea className="form-textarea" style={{ minHeight: '60px' }} value={form.themes} onChange={(e) => updateField('themes', e.target.value)} /></div>

                <button className="btn btn-primary generate-btn" onClick={handleSubmit} disabled={loading || !form.title}>
                    {loading ? <><div className="spinner" /> Finding keywords...</> : '🔎 Find Keywords & Categories'}
                </button>
                {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
            </div>

            <div className="tool-output-card">
                <h3>KDP Keywords & Categories</h3>
                {!result && !loading && <div className="output-placeholder">Enter your book details to generate optimized keywords.</div>}
                {loading && <div className="loading-state"><div className="spinner" /> AI is researching keywords...</div>}

                {result && (
                    <>
                        {/* Keywords */}
                        <h4 style={{ marginTop: '1rem' }}>7 Keywords</h4>
                        <div className="keyword-cards">
                            {result.keywords?.map((kw, i) => (
                                <div key={i} className="keyword-card">
                                    <div className="keyword-header">
                                        <span className="keyword-num">#{i + 1}</span>
                                        <span className="keyword-phrase">{kw.phrase}</span>
                                        <span className={`keyword-chars ${kw.character_count > 50 ? 'keyword-over' : ''}`}>{kw.character_count} chars</span>
                                    </div>
                                    <p className="keyword-rationale">{kw.rationale}</p>
                                    <span className="keyword-angle">{kw.angle}</span>
                                </div>
                            ))}
                        </div>

                        {/* Categories */}
                        <h4 style={{ marginTop: '1.5rem' }}>Primary Categories</h4>
                        <div className="category-paths">
                            {result.primary_categories?.map((c, i) => (
                                <div key={i} className="category-path">
                                    <code>{c.path}</code>
                                    <p>{c.rationale}</p>
                                </div>
                            ))}
                        </div>

                        <h4 style={{ marginTop: '1rem' }}>Alternative Categories</h4>
                        <div className="category-paths">
                            {result.alternative_categories?.map((c, i) => (
                                <div key={i} className="category-path">
                                    <code>{c.path}</code>
                                    <p>{c.rationale}</p>
                                </div>
                            ))}
                        </div>

                        {/* Tips */}
                        {result.tips?.length > 0 && (
                            <div className="keyword-tips">
                                <h4>Tips</h4>
                                <ul>{result.tips.map((t, i) => <li key={i}>{t}</li>)}</ul>
                            </div>
                        )}

                        <div className="output-actions" style={{ marginTop: '1rem' }}>
                            <button className="btn btn-primary btn-sm" onClick={() => {
                                const kwText = result.keywords?.map((k) => k.phrase).join('\n');
                                navigator.clipboard.writeText(kwText);
                            }}>📋 Copy All Keywords</button>
                        </div>
                    </>
                )}

                {/* LivePreview — formatted keywords */}
                {result && (
                    <LivePreview
                        beforeHtml=""
                        afterHtml={
                            `<h3>KDP Keywords</h3><ol>` +
                            (result.keywords?.map(k => `<li><strong>${k.phrase}</strong> — ${k.rationale}</li>`).join('') || '') +
                            `</ol><h3>Categories</h3><ul>` +
                            (result.primary_categories?.map(c => `<li>${c.path}</li>`).join('') || '') +
                            `</ul>`
                        }
                    />
                )}
            </div>
        </div>
    );
}
