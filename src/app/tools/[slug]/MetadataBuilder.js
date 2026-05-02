'use client';

import { useState, useMemo } from 'react';
import UpsellBanner from '@/components/UpsellBanner';
import StickyUpgradeBanner from '@/components/StickyUpgradeBanner';

export default function MetadataBuilder() {
    const [form, setForm] = useState({
        title: '', subtitle: '', authors: '', series: '', seriesVolume: '',
        bisacCategory1: '', bisacCategory2: '',
        kw1: '', kw2: '', kw3: '', kw4: '', kw5: '', kw6: '', kw7: '',
        shortDesc: '', longDesc: '', isbn: '', asin: '', pubDate: '',
        edition: 'First', language: 'English', priceUSD: '', priceGBP: '', priceEUR: '', priceAUD: '',
    });
    const [activeTab, setActiveTab] = useState(0);
    const tabs = ['KDP', 'IngramSpark', 'Draft2Digital', 'EPUB OPF'];

    const [showReport, setShowReport] = useState(false);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [extracting, setExtracting] = useState(false);
    const [extractError, setExtractError] = useState(null);
    const [epubFilename, setEpubFilename] = useState('');

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const keywords = [form.kw1, form.kw2, form.kw3, form.kw4, form.kw5, form.kw6, form.kw7].filter(Boolean);
    const langCode = { English: 'en', Spanish: 'es', French: 'fr', German: 'de', Portuguese: 'pt', Italian: 'it', Dutch: 'nl' }[form.language] || 'en';

    const extractFromEpub = async (file) => {
        setExtracting(true);
        setExtractError(null);
        setEpubFilename(file.name);
        try {
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(file);
            let opfPath = 'OEBPS/content.opf';
            const container = zip.file('META-INF/container.xml');
            if (container) {
                const containerXml = await container.async('string');
                const match = containerXml.match(/full-path="([^"]+)"/);
                if (match) opfPath = match[1];
            }
            const opfFile = zip.file(opfPath);
            if (!opfFile) throw new Error('Could not find OPF file in EPUB.');
            const opfContent = await opfFile.async('string');
            const get = (tag) => {
                const match = opfContent.match(new RegExp(`<dc:${tag}[^>]*>([^<]+)<\/dc:${tag}>`, 'i'));
                return match ? match[1].trim() : '';
            };
            const subjects = [...opfContent.matchAll(/<dc:subject[^>]*>([^<]+)<\/dc:subject>/gi)].map(m => m[1].trim());
            const seriesMatch = opfContent.match(/belongs-to-collection[^>]*>([^<]+)</i);
            const seriesVolumeMatch = opfContent.match(/group-position[^>]*>([^<]+)</i);
            const langRaw = get('language');
            const langMap = { en: 'English', es: 'Spanish', fr: 'French', de: 'German', pt: 'Portuguese', it: 'Italian', nl: 'Dutch' };
            const isbnRaw = get('identifier');
            const descRaw = get('description');
            setForm(f => ({
                ...f,
                title: get('title') || f.title,
                authors: get('creator') || f.authors,
                language: langMap[langRaw] || f.language,
                isbn: isbnRaw && !isbnRaw.startsWith('urn:uuid') ? isbnRaw : f.isbn,
                pubDate: get('date') ? get('date').substring(0, 10) : f.pubDate,
                shortDesc: descRaw ? descRaw.replace(/&amp;/g, '&').replace(/&lt;/g, '<').substring(0, 500) : f.shortDesc,
                bisacCategory1: subjects[0] || f.bisacCategory1,
                bisacCategory2: subjects[1] || f.bisacCategory2,
                series: seriesMatch ? seriesMatch[1].trim() : f.series,
                seriesVolume: seriesVolumeMatch ? seriesVolumeMatch[1].trim() : f.seriesVolume,
            }));
        } catch (err) {
            setExtractError(`Could not read EPUB: ${err.message}`);
        }
        setExtracting(false);
    };

    const handleFile = (f) => {
        if (!f) return;
        if (!f.name.toLowerCase().endsWith('.epub')) {
            setExtractError(`"${f.name}" is not an EPUB file.`);
            return;
        }
        extractFromEpub(f);
    };

    const checks = useMemo(() => {
        const results = [];
        results.push({ name: 'Title', status: form.title ? 'pass' : 'fail', detail: form.title ? 'Title is present.' : 'Missing title — KDP will reject your upload without a book title.', fixHint: 'Add your book title in the Title field.' });
        results.push({ name: 'Author', status: form.authors ? 'pass' : 'fail', detail: form.authors ? 'Author name present.' : 'Missing author — KDP requires at least one author name.', fixHint: 'Add your name in the Author field.' });
        results.push({ name: 'BISAC Category', status: form.bisacCategory1 ? 'pass' : 'fail', detail: form.bisacCategory1 ? `Category set: ${form.bisacCategory1}` : "No BISAC category — without this, KDP places your book incorrectly and readers can't find it.", fixHint: 'Set at least one BISAC category.' });
        results.push({ name: 'Keywords', status: keywords.length >= 3 ? 'pass' : keywords.length > 0 ? 'warn' : 'fail', detail: keywords.length >= 3 ? `${keywords.length} keywords set. Good for discoverability.` : keywords.length > 0 ? `Only ${keywords.length} keyword(s). KDP allows 7 — use all of them.` : "No keywords — you're leaving discoverability on the table. KDP gives you 7 keyword slots.", fixHint: 'Add at least 5–7 relevant keywords.' });
        results.push({ name: 'Short Description', status: form.shortDesc && form.shortDesc.length >= 50 ? 'pass' : form.shortDesc ? 'warn' : 'fail', detail: form.shortDesc && form.shortDesc.length >= 50 ? 'Short description looks good.' : form.shortDesc ? 'Short description is too brief — aim for at least 50 characters.' : "Missing short description — this shows on your book's product page.", fixHint: 'Write a compelling 1–2 sentence description.' });
        results.push({ name: 'Long Description', status: form.longDesc && form.longDesc.length >= 200 ? 'pass' : form.longDesc ? 'warn' : 'fail', detail: form.longDesc && form.longDesc.length >= 200 ? `Long description: ${form.longDesc.length} characters. Good length.` : form.longDesc ? `Long description is only ${form.longDesc.length} chars. Aim for 200–4000 characters.` : 'No long description — this is your main sales copy. Missing it hurts conversions.', fixHint: 'Write a full book description (200–4000 characters).' });
        results.push({ name: 'ISBN / Identifier', status: form.isbn || form.asin ? 'pass' : 'warn', detail: form.isbn || form.asin ? `Identifier present: ${form.isbn || form.asin}` : 'No ISBN or ASIN — not required for KDP, but needed for IngramSpark and wide distribution.', fixHint: 'Add your ISBN if publishing wide.' });
        return results;
    }, [form, keywords]);

    const passCount = checks.filter(c => c.status === 'pass').length;
    const failCount = checks.filter(c => c.status === 'fail').length;
    const warnCount = checks.filter(c => c.status === 'warn').length;
    const hasIssues = failCount > 0 || warnCount > 0;
    const hasFails = failCount > 0;
    const hasCoreFields = form.title && form.authors && form.bisacCategory1;
    const hasStarted = form.title || form.authors;

    const outputs = useMemo(() => {
        const kdp = `TITLE: ${form.title}\n${form.subtitle ? `SUBTITLE: ${form.subtitle}\n` : ''}AUTHOR: ${form.authors}\n${form.series ? `SERIES: ${form.series} #${form.seriesVolume || '1'}\n` : ''}KEYWORDS: ${keywords.join(' | ')}\nCATEGORY 1: ${form.bisacCategory1}\n${form.bisacCategory2 ? `CATEGORY 2: ${form.bisacCategory2}\n` : ''}DESCRIPTION (SHORT): ${form.shortDesc}\nDESCRIPTION (LONG): ${form.longDesc}\n${form.isbn ? `ISBN: ${form.isbn}\n` : ''}${form.asin ? `ASIN: ${form.asin}\n` : ''}LANGUAGE: ${form.language}\nPRICE: $${form.priceUSD || '0.00'}\nPUB DATE: ${form.pubDate || 'TBD'}`;
        const ingram = `Title: ${form.title}\n${form.subtitle ? `Subtitle: ${form.subtitle}\n` : ''}Contributor 1 - Author: ${form.authors}\nBISAC Category 1: ${form.bisacCategory1}\n${form.bisacCategory2 ? `BISAC Category 2: ${form.bisacCategory2}\n` : ''}Description: ${form.longDesc}\n${form.isbn ? `ISBN-13: ${form.isbn}\n` : ''}Language: ${langCode}\nPublication Date: ${form.pubDate || 'TBD'}\nList Price (USD): $${form.priceUSD || '0.00'}\n${form.priceGBP ? `List Price (GBP): £${form.priceGBP}\n` : ''}${form.priceEUR ? `List Price (EUR): €${form.priceEUR}\n` : ''}${form.priceAUD ? `List Price (AUD): A$${form.priceAUD}\n` : ''}Edition: ${form.edition}\n${form.series ? `Series: ${form.series}\nVolume: ${form.seriesVolume || '1'}` : ''}`;
        const d2d = `Title: ${form.title}\n${form.subtitle ? `Subtitle: ${form.subtitle}\n` : ''}Author: ${form.authors}\nDescription: ${form.longDesc || form.shortDesc}\nCategories: ${form.bisacCategory1}${form.bisacCategory2 ? ', ' + form.bisacCategory2 : ''}\nKeywords: ${keywords.join(', ')}\n${form.isbn ? `ISBN: ${form.isbn}\n` : ''}Language: ${form.language}\nPrice: $${form.priceUSD || '0.00'}\n${form.series ? `Series: ${form.series} #${form.seriesVolume || '1'}` : ''}`;
        const opf = `<?xml version="1.0" encoding="UTF-8"?>\n<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">\n  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">\n    <dc:title>${form.title}${form.subtitle ? ': ' + form.subtitle : ''}</dc:title>\n    <dc:creator>${form.authors}</dc:creator>\n    <dc:language>${langCode}</dc:language>\n    ${form.isbn ? `<dc:identifier id="bookid">${form.isbn}</dc:identifier>` : '<dc:identifier id="bookid">urn:uuid:YOUR-UUID-HERE</dc:identifier>'}\n    ${form.pubDate ? `<dc:date>${form.pubDate}</dc:date>` : ''}\n    <dc:description>${(form.shortDesc || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</dc:description>\n    ${form.bisacCategory1 ? `<dc:subject>${form.bisacCategory1}</dc:subject>` : ''}\n    ${form.bisacCategory2 ? `<dc:subject>${form.bisacCategory2}</dc:subject>` : ''}\n    ${form.series ? `<meta property="belongs-to-collection">${form.series}</meta>\n    <meta property="group-position">${form.seriesVolume || '1'}</meta>` : ''}\n  </metadata>\n</package>`;
        return [kdp, ingram, d2d, opf];
    }, [form, keywords, langCode]);

    const handleGenerate = (e) => {
        e.preventDefault();
        if (!form.title && !form.authors) return;
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'metadata_checked', { issue_count: failCount + warnCount });
        }
        setShowReport(true);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');
        await fetch('/api/send-metadata-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, form, checks, passCount, failCount }),
        });
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'email_captured', { tool_name: 'metadata_builder' });
        }
        setEmailSent(true);
    };

    const statusIcon = (s) => ({ pass: '✅', fail: '❌', warn: '⚠️' }[s] || '❓');
    const statusClass = (s) => ({ pass: 'val-pass', fail: 'val-fail', warn: 'val-warn' }[s] || '');

    return (
        <>
        {!showReport && (
            <form onSubmit={handleGenerate}>
            <div className="tool-layout">
                <div className="tool-input-card" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                    {/* EPUB upload */}
                    <div style={{ marginBottom: '20px' }}>
                        <div
                            className={`drop-zone ${dragOver ? 'drop-zone-active' : ''}`}
                            style={{ padding: '16px', marginBottom: '8px' }}
                            onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                            onDragLeave={() => setDragOver(false)}
                            onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                            onClick={() => document.getElementById('epub-meta-input').click()}
                        >
                            <input id="epub-meta-input" type="file" accept=".epub" hidden onChange={(e) => handleFile(e.target.files[0])} />
                            <p style={{ margin: 0, fontSize: '0.88rem', color: '#6b7280', textAlign: 'center' }}>
                                📖 Drop your EPUB to auto-fill metadata, or fill in manually below
                            </p>
                        </div>
                        {extracting && <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>Reading EPUB...</p>}
                        {epubFilename && !extracting && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '6px', padding: '8px 12px', fontSize: '0.85rem', color: '#166534' }}>
                                ✅ Extracted from <strong>{epubFilename}</strong> — review and fill gaps below.
                            </div>
                        )}
                        {extractError && <p style={{ fontSize: '0.85rem', color: '#c53030' }}>{extractError}</p>}
                    </div>

                    <h3>Book Metadata</h3>
                    {[['title', 'Book title'], ['subtitle', 'Subtitle (optional)'], ['authors', 'Author name(s)'], ['series', 'Series name (optional)'], ['seriesVolume', 'Volume # (opt.)'], ['bisacCategory1', 'BISAC Category 1'], ['bisacCategory2', 'BISAC Category 2 (opt.)']].map(([k, l]) => (
                        <div className="form-group" key={k}>
                            <label className="form-label">{l}</label>
                            <input className="form-input" value={form[k]} onChange={(e) => updateField(k, e.target.value)} />
                        </div>
                    ))}

                    <div className="form-group">
                        <label className="form-label">Keywords (7 max)</label>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                            {[1,2,3,4,5,6,7].map((n) => (
                                <input key={n} className="form-input" placeholder={`Keyword ${n}`} value={form[`kw${n}`]} onChange={(e) => updateField(`kw${n}`, e.target.value)} />
                            ))}
                        </div>
                    </div>

                    <div className="form-group"><label className="form-label">Short description</label><textarea className="form-textarea" style={{ minHeight: '80px' }} value={form.shortDesc} onChange={(e) => updateField('shortDesc', e.target.value)} /></div>
                    <div className="form-group"><label className="form-label">Long description</label><textarea className="form-textarea" style={{ minHeight: '120px' }} value={form.longDesc} onChange={(e) => updateField('longDesc', e.target.value)} /></div>

                    {[['isbn','ISBN'],['asin','ASIN'],['pubDate','Publication date (YYYY-MM-DD)'],['priceUSD','Price (USD)'],['priceGBP','Price (GBP)'],['priceEUR','Price (EUR)'],['priceAUD','Price (AUD)']].map(([k,l]) => (
                        <div className="form-group" key={k}><label className="form-label">{l}</label><input className="form-input" value={form[k]} onChange={(e) => updateField(k, e.target.value)} /></div>
                    ))}

                    <div className="form-group"><label className="form-label">Edition</label>
                        <select className="form-select" value={form.edition} onChange={(e) => updateField('edition', e.target.value)}>
                            {['First','Second','Third','Revised','Updated'].map((o) => <option key={o}>{o}</option>)}
                        </select>
                    </div>
                    <div className="form-group"><label className="form-label">Language</label>
                        <select className="form-select" value={form.language} onChange={(e) => updateField('language', e.target.value)}>
                            {['English','Spanish','French','German','Portuguese','Italian','Dutch'].map((o) => <option key={o}>{o}</option>)}
                        </select>
                    </div>

                    <button type="submit" disabled={!form.title && !form.authors} style={{ width: '100%', marginTop: '16px', background: '#1a1a1a', color: '#fff', padding: '13px', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: form.title || form.authors ? 'pointer' : 'not-allowed', opacity: form.title || form.authors ? 1 : 0.5 }}>
                        Check My Metadata →
                    </button>
                </div>

                <div className="tool-output-card">
                    <h3>Live Preview</h3>
                    {!hasStarted ? (
                        <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                            <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>📋</div>
                            <p style={{ fontSize: '0.95rem', marginBottom: '4px', color: '#6b7280', fontWeight: 500 }}>Start filling in your book details</p>
                            <p style={{ fontSize: '0.85rem', color: '#9ca3af' }}>Your metadata quality score will appear here as you type.</p>
                        </div>
                    ) : (
                        <>
                            <p style={{ color: '#6b7280', fontSize: '0.9rem', marginBottom: '16px' }}>{passCount}/{checks.length} checks passing</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {checks.map((c, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '10px', background: '#f9fafb', borderRadius: '8px', fontSize: '0.88rem' }}>
                                        <span>{statusIcon(c.status)}</span>
                                        <div><strong>{c.name}</strong><p style={{ margin: '2px 0 0 0', color: '#6b7280' }}>{c.detail}</p></div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </div>
            </form>
        )}

        {showReport && (
            <>
                <div className="validation-results">
                    <div className="val-summary">
                        <div className="val-score">
                            <span className="val-score-num">{passCount}</span>
                            <span className="val-score-denom">/{checks.length}</span>
                        </div>
                        <p className="val-score-label">
                            {passCount === checks.length ? 'All checks passed! ✨' : passCount >= checks.length - 2 ? 'Looking good — minor issues found.' : 'Some issues found. Review below.'}
                        </p>
                    </div>

                    {hasIssues && (
                        <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                                {hasFails ? '❌ Your metadata has critical issues' : '⚠️ Your metadata has warnings to fix'}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '20px' }}>
                                {failCount > 0 && `${failCount} critical ${failCount === 1 ? 'issue' : 'issues'}`}
                                {failCount > 0 && warnCount > 0 && ' + '}
                                {warnCount > 0 && `${warnCount} ${warnCount === 1 ? 'warning' : 'warnings'}`}
                                {' '}found. BookKraft Pro helps you fix and optimize all of them.
                            </p>
                            <a href="/signup?plan=pro" style={{ display: 'block', background: '#C9933A', color: '#fff', padding: '13px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', textAlign: 'center', marginBottom: '16px' }}>
                                🔧 Fix All — Start Free Trial
                            </a>
                            <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '10px' }}>Or fix step by step:</p>
                            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                {checks.filter(c => c.status === 'fail' || c.status === 'warn').map((item, i) => (
                                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(255,255,255,0.07)', borderRadius: '7px', padding: '10px 14px', fontSize: '0.88rem' }}>
                                        <span style={{ background: '#C9933A', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                        <div><strong style={{ color: '#fff' }}>{item.name}</strong><p style={{ margin: '2px 0 0 0', color: '#9ca3af', fontSize: '0.82rem' }}>{item.fixHint}</p></div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {!hasIssues && passCount === checks.length && (
                        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
                            <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>✅ Your metadata looks great</h3>
                            <p style={{ fontSize: '0.95rem', color: '#166534', marginBottom: '20px' }}>Next step: build your table of contents.</p>
                            <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                <a href="/tools/toc-generator" style={{ display: 'inline-block', background: '#166534', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Generate Table of Contents →</a>
                                <a href="/signup?plan=pro" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Get All 12 Tools — $9.99</a>
                            </div>
                        </div>
                    )}

                    <div className="val-checks" style={{ marginBottom: '24px' }}>
                        {checks.map((c, i) => (
                            <div key={i} className={`val-check ${statusClass(c.status)}`}>
                                <span className="val-check-icon">{statusIcon(c.status)}</span>
                                <div style={{ flex: 1 }}>
                                    <strong>{c.name}</strong>
                                    <p>{c.detail}</p>
                                    {(c.status === 'fail' || c.status === 'warn') && (
                                        <p style={{ margin: '4px 0 0 0', fontSize: '0.83rem', color: '#b8860b', fontWeight: 600 }}>→ {c.fixHint}</p>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    <div style={{ marginBottom: '24px' }}>
                        <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '12px' }}>Your Formatted Output</h3>
                        <div className="output-tabs">
                            {tabs.map((t, i) => (
                                <button key={i} className={`output-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
                            ))}
                        </div>
                        <textarea className="form-textarea code-output" style={{ minHeight: '300px', fontFamily: 'monospace', fontSize: '.85rem' }} value={outputs[activeTab]} readOnly />
                        <div className="output-actions" style={{ marginTop: '8px' }}>
                            <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(outputs[activeTab])}>📋 Copy {tabs[activeTab]}</button>
                        </div>
                    </div>

                    {hasCoreFields && (
                        <div style={{ background: '#faf9f7', border: '2px solid #C9933A', borderRadius: '12px', padding: '20px', marginBottom: '20px' }}>
                            <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px' }}>✅ Metadata done. Next step:</h4>
                            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '16px' }}>Build your table of contents. KDP requires a TOC for every ebook.</p>
                            <a href="/tools/toc-generator" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, marginRight: '12px' }}>Generate Table of Contents →</a>
                            <a href="/signup?plan=pro" style={{ display: 'inline-block', color: '#b8860b', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>or get all 12 tools →</a>
                        </div>
                    )}

                    {/* Soft email capture */}
                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginBottom: '16px' }}>
                        {!emailSent ? (
                            <>
                                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>📬 Want a copy of this report?</p>
                                <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: '16px' }}>We'll email your metadata report and formatted output. No spam.</p>
                                <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                    <input type="text" placeholder="First name (optional)" value={name} onChange={(e) => setName(e.target.value)} style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', flex: '1', minWidth: '140px' }} />
                                    <input type="email" placeholder="Your email" value={email} onChange={(e) => setEmail(e.target.value)} required style={{ padding: '10px 14px', border: `1px solid ${emailError ? '#fca5a5' : '#d1d5db'}`, borderRadius: '8px', fontSize: '0.9rem', outline: 'none', flex: '2', minWidth: '180px' }} />
                                    <button type="submit" style={{ background: '#1a1a1a', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>Send Report</button>
                                </form>
                                {emailError && <p style={{ color: '#c53030', fontSize: '0.85rem', marginTop: '6px' }}>{emailError}</p>}
                            </>
                        ) : (
                            <p style={{ color: '#166534', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center' }}>
                                📬 Report sent to <strong>{email}</strong> — check your inbox.
                            </p>
                        )}
                    </div>

                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                        <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.95rem' }}>Liked this tool?</p>
                        <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: '14px' }}>Get all 12 BookKraft tools + auto-fix for everything.</p>
                        <a href="/signup?plan=pro" style={{ display: 'inline-block', background: '#1a1a1a', color: '#fff', padding: '11px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Upgrade to Pro — $9.99</a>
                    </div>
                </div>
                <UpsellBanner toolName="Metadata Builder" />
            </>
        )}

        <div className="seo-content" style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
            <h2>Book Metadata Builder for Self-Publishing Platforms</h2>
            <p>Upload your EPUB and we'll auto-detect your existing metadata. Then review, fill in any gaps, and export formatted for KDP, IngramSpark, Draft2Digital, and more.</p>
            <h2>Who This Is For</h2>
            <p>First-time authors who don't know what BISAC codes are or why they matter. Experienced authors publishing across multiple platforms who want consistent, accurate metadata without filling in the same fields five different times.</p>
        </div>

        <StickyUpgradeBanner />
        </>
    );
}