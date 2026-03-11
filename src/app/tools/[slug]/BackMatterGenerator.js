'use client';

import { useState } from 'react';
import LivePreview from '@/components/LivePreview';

export default function BackMatterGenerator() {
    const [form, setForm] = useState({
        author: '', background: '', bookTitle: '', genre: 'Romance',
        otherBooks: '', mailingListUrl: '', readerMagnet: '', socials: '', tone: 'warm',
        sections: { authorBio: true, alsoBy: true, readerList: true, connect: true, noteFromAuthor: true, acknowledgements: false },
    });
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const toggleSection = (key) => setForm((f) => ({ ...f, sections: { ...f.sections, [key]: !f.sections[key] } }));

    const handleSubmit = async () => {
        if (!form.author || !form.bookTitle) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/tools/back-matter', {
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

    const sections = result ? [
        result.author_bio_short && { title: 'Author Bio (Short)', content: result.author_bio_short },
        result.author_bio_long && { title: 'Author Bio (Long)', content: result.author_bio_long },
        result.also_by && { title: 'Also By This Author', content: result.also_by },
        ...(result.reader_list_ctas || []).map((c) => ({ title: `Reader List CTA (${c.style})`, content: c.text })),
        result.connect && { title: 'Connect', content: result.connect },
        result.note_from_author && { title: 'A Note From the Author', content: result.note_from_author },
        result.acknowledgements && { title: 'Acknowledgements', content: result.acknowledgements },
    ].filter(Boolean) : [];

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Details</h3>
                <div className="form-group"><label className="form-label">Author name *</label><input className="form-input" value={form.author} onChange={(e) => updateField('author', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Book title *</label><input className="form-input" value={form.bookTitle} onChange={(e) => updateField('bookTitle', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Background (2-3 sentences)</label><textarea className="form-textarea" style={{ minHeight: '80px' }} value={form.background} onChange={(e) => updateField('background', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Genre</label>
                    <select className="form-select" value={form.genre} onChange={(e) => updateField('genre', e.target.value)}>
                        {['Romance', 'Thriller', 'Mystery', 'Fantasy', 'Sci-Fi', 'Literary Fiction', 'Self-Help', 'Business', 'Memoir', 'How-To', 'Health', 'Other'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Other books (one per line)</label><textarea className="form-textarea" style={{ minHeight: '60px' }} value={form.otherBooks} onChange={(e) => updateField('otherBooks', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Mailing list URL</label><input className="form-input" value={form.mailingListUrl} onChange={(e) => updateField('mailingListUrl', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Reader magnet/offer</label><input className="form-input" value={form.readerMagnet} onChange={(e) => updateField('readerMagnet', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Social handles</label><input className="form-input" value={form.socials} onChange={(e) => updateField('socials', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Tone</label>
                    {['warm', 'professional', 'humorous'].map((t) => (
                        <label key={t} className="fix-checkbox"><input type="radio" checked={form.tone === t} onChange={() => updateField('tone', t)} /><span>{t.charAt(0).toUpperCase() + t.slice(1)}</span></label>
                    ))}
                </div>
                <div className="form-group"><label className="form-label">Include sections</label>
                    {Object.entries(form.sections).map(([k, v]) => (
                        <label key={k} className="fix-checkbox"><input type="checkbox" checked={v} onChange={() => toggleSection(k)} /><span>{{ authorBio: 'Author Bio', alsoBy: 'Also By', readerList: 'Reader List CTA', connect: 'Connect', noteFromAuthor: 'Note From Author', acknowledgements: 'Acknowledgements' }[k]}</span></label>
                    ))}
                </div>
                <button className="btn btn-primary generate-btn" onClick={handleSubmit} disabled={loading || !form.author || !form.bookTitle}>
                    {loading ? <><div className="spinner" /> Generating...</> : '📝 Generate Back Matter'}
                </button>
                {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
            </div>

            <div className="tool-output-card">
                <h3>Generated Back Matter</h3>
                {!result && !loading && <div className="output-placeholder">Fill in the form and click Generate to create your back matter.</div>}
                {loading && <div className="loading-state"><div className="spinner" /> AI is crafting your back matter...</div>}
                {result && (
                    <div className="back-matter-sections">
                        {sections.map((s, i) => (
                            <div key={i} className="back-matter-card">
                                <div className="back-matter-card-header">
                                    <h4>{s.title}</h4>
                                    <button className="btn btn-outline btn-sm" onClick={() => navigator.clipboard.writeText(s.content)}>Copy</button>
                                </div>
                                <div className="back-matter-content">{s.content}</div>
                            </div>
                        ))}
                    </div>
                )}

                {/* LivePreview — formatted back matter */}
                {result && sections.length > 0 && (
                    <LivePreview
                        beforeHtml=""
                        afterHtml={sections.map(s => `<h3>${s.title}</h3><p>${s.content.replace(/\n/g, '<br>')}</p>`).join('')}
                    />
                )}
            </div>
        </div>
    );
}
