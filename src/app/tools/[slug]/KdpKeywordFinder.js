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
    <h2>KDP Keyword & Category Finder for Self-Publishing Authors</h2>
    <p>Most self-published books don't fail because of bad writing. They fail because nobody finds them. On Amazon KDP, the right keywords and categories are the difference between consistent sales and sitting invisible on page 12. This tool helps you find both.</p>

    <h2>Amazon's 7 Keyword Slots — What Most Authors Get Wrong</h2>
    <p>Amazon gives you exactly 7 keyword slots when you publish. Each slot holds up to 50 characters. Most authors fill them in fast, without research. That's a costly mistake.</p>
    <p>Those 7 slots directly affect how Amazon categorizes your book and who sees it in search. A few rules worth knowing before you publish:</p>
    <ul>
        <li>No superlatives — "best," "greatest," or "top" are prohibited and get flagged</li>
        <li>No "on sale" or price references of any kind</li>
        <li>No words already in your title or subtitle — Amazon ignores duplicates</li>
        <li>No category names as keywords — adding "romance novel" won't help your category placement</li>
        <li>Phrases beat single words — "small town romance with pets" outperforms just "romance"</li>
    </ul>

    <h2>KDP Categories: Ghost Categories and Tick Categories Explained</h2>
    <p>Amazon has over 9,000 browse categories. You only pick 2 during upload — but you can request up to 10 total by contacting KDP support after publishing. Most authors never do this.</p>
    <p>Two category types matter most for discoverability:</p>
    <p><strong>Ghost categories</strong> are real Amazon categories that don't appear in the standard KDP category picker. They exist in Amazon's browse tree but are only accessible by emailing KDP support with the exact category path. Getting into a ghost category with low competition can put your book on a bestseller list almost immediately.</p>
    <p><strong>Tick categories</strong> (also called sidebar subcategories) are the narrow subcategories that appear in the left sidebar of Amazon search results. These are highly specific — things like "Cozy Animal Mystery" or "Time Travel Romance." Books in tick categories face far less competition than broad parent categories. Readers who browse these are usually ready to buy.</p>

    <h2>What This Tool Does</h2>
    <p>The KDP Keyword & Category Finder does two things. First, it suggests keyword phrases based on your book's title, genre, and themes — terms real readers type into Amazon when searching for books like yours. Second, it recommends specific category paths, including narrower subcategories where competition is lower and bestseller rank is easier to reach.</p>
    <p>Every keyword suggestion includes a character count so you stay within KDP's 50-character limit per slot.</p>

    <h2>Who This Is For</h2>
    <p>New authors publishing their first book and trying to get visibility without a big marketing budget. Experienced authors who want to re-optimize existing listings that aren't converting. Formatters and publishing consultants setting up KDP listings for clients. If you publish on Amazon, keyword and category research isn't optional — it's foundational.</p>

    <h2>How to Use It</h2>
    <p>Enter your book title, genre, target reader, and key themes. The tool generates 7 keyword phrases and recommended category paths tailored to your book. Review the suggestions, pick the best fit for your listing, and add them directly to your KDP dashboard. The whole process takes under 10 minutes.</p>

    <h2>What Makes This Different</h2>
    <p>Most keyword tools are built for general SEO or ecommerce. They aren't designed with book publishing in mind. This tool focuses specifically on Amazon KDP — so the suggestions reflect how readers actually search for books, not products. Category recommendations include both standard and harder-to-find paths worth requesting from KDP support.</p>

    <script type="application/ld+json">{JSON.stringify({
        "@context": "https://schema.org",
        "@type": "FAQPage",
        "mainEntity": [
            {
                "@type": "Question",
                "name": "How many keyword slots does Amazon KDP give you?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Amazon KDP gives you 7 keyword slots, each up to 50 characters. Use keyword phrases rather than single words to get the most out of each slot."
                }
            },
            {
                "@type": "Question",
                "name": "What are ghost categories on Amazon KDP?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Ghost categories are real Amazon browse categories that don't appear in the standard KDP category picker during upload. You can request placement in them by contacting KDP support with the exact category path after publishing."
                }
            },
            {
                "@type": "Question",
                "name": "What are tick categories on Amazon?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Tick categories are narrow subcategories visible in the Amazon search sidebar. They have lower competition than broad parent categories, making it easier to rank and reach the bestseller list within a specific niche."
                }
            },
            {
                "@type": "Question",
                "name": "Can I add more than 2 categories to my KDP book?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Yes. You select 2 categories during upload, but you can request up to 10 total by emailing KDP support after publishing with your book's ASIN and the exact category paths you want added."
                }
            },
            {
                "@type": "Question",
                "name": "What keywords are banned on Amazon KDP?",
                "acceptedAnswer": {
                    "@type": "Answer",
                    "text": "Amazon prohibits superlatives like 'best' or 'top,' price or sale references, words already in your title or subtitle, and category names used as keywords. Using prohibited terms can result in your keywords being ignored or your listing being flagged."
                }
            }
        ]
    })}</script>
</div>
        </>
    );
}
