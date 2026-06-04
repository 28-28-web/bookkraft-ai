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
            await refreshProfile();
        } catch {
            setError('Network error. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
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

        {/* SEO Content */}
        <div className="seo-content" style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
            <h2>KDP Keyword Finder for Self-Publishing Authors</h2>
            <p>Most self-published books don't fail because of bad writing. They fail because nobody finds them. On Amazon KDP, the right keywords are the difference between consistent sales and sitting invisible on page 12. This tool helps you find keywords that actually work.</p>

            <h2>What This Tool Does</h2>
            <p>The KDP Keyword Finder does two things well. First, it suggests relevant keywords based on your book's title, genre, and description. These are terms real readers use when searching for books like yours on Amazon. Second, it analyzes each keyword for competition and search volume. So you can see which terms are worth targeting and which ones are too crowded to compete in.</p>

            <h2>Why KDP Keywords Matter</h2>
            <p>Amazon gives you 7 keyword slots when you publish a book. Most authors fill them in quickly without much research. That's a mistake. Those 7 slots directly affect how Amazon categorizes your book and who sees it in search results. A well-researched keyword strategy puts your book in front of readers who are already looking for what you wrote.</p>

            <h2>Who This Is For</h2>
            <p>New authors publishing their first book and trying to get visibility without a big marketing budget. Experienced authors who want to optimize existing listings and improve discoverability across their catalog. Freelance editors and publishing consultants helping clients set up their KDP listings properly from the start. If you publish on Amazon, keyword research isn't optional. It's foundational.</p>

            <h2>How It Works</h2>
            <p>Enter your book title, genre, and a short description. The tool generates keyword suggestions tailored to your book. Then review competition and search volume for each keyword and choose the best 7 to add directly to your KDP listing. The whole process takes under 10 minutes.</p>

            <h2>What Makes This Different</h2>
            <p>Most keyword tools are built for general SEO or ecommerce. They aren't designed with book publishing in mind. This tool focuses specifically on Amazon KDP — so the suggestions are relevant to how readers actually search for books, not products.</p>
        </div>
        </>
    );
}