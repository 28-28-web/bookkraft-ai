'use client';

import { useState, useMemo } from 'react';

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

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const keywords = [form.kw1, form.kw2, form.kw3, form.kw4, form.kw5, form.kw6, form.kw7].filter(Boolean);

    const langCode = { English: 'en', Spanish: 'es', French: 'fr', German: 'de', Portuguese: 'pt', Italian: 'it', Dutch: 'nl' }[form.language] || 'en';

    const outputs = useMemo(() => {
        const kdp = `TITLE: ${form.title}
${form.subtitle ? `SUBTITLE: ${form.subtitle}` : ''}
AUTHOR: ${form.authors}
${form.series ? `SERIES: ${form.series} #${form.seriesVolume || '1'}` : ''}
KEYWORDS: ${keywords.join(' | ')}
CATEGORY 1: ${form.bisacCategory1}
${form.bisacCategory2 ? `CATEGORY 2: ${form.bisacCategory2}` : ''}
DESCRIPTION (SHORT): ${form.shortDesc}
DESCRIPTION (LONG): ${form.longDesc}
${form.isbn ? `ISBN: ${form.isbn}` : ''}
${form.asin ? `ASIN: ${form.asin}` : ''}
LANGUAGE: ${form.language}
PRICE: $${form.priceUSD || '0.00'}
PUB DATE: ${form.pubDate || 'TBD'}`;

        const ingram = `Title: ${form.title}
${form.subtitle ? `Subtitle: ${form.subtitle}` : ''}
Contributor 1 - Author: ${form.authors}
BISAC Category 1: ${form.bisacCategory1}
${form.bisacCategory2 ? `BISAC Category 2: ${form.bisacCategory2}` : ''}
Description: ${form.longDesc}
${form.isbn ? `ISBN-13: ${form.isbn}` : ''}
Language: ${langCode}
Publication Date: ${form.pubDate || 'TBD'}
List Price (USD): $${form.priceUSD || '0.00'}
${form.priceGBP ? `List Price (GBP): £${form.priceGBP}` : ''}
${form.priceEUR ? `List Price (EUR): €${form.priceEUR}` : ''}
${form.priceAUD ? `List Price (AUD): A$${form.priceAUD}` : ''}
Edition: ${form.edition}
${form.series ? `Series: ${form.series}\nVolume: ${form.seriesVolume || '1'}` : ''}`;

        const d2d = `Title: ${form.title}
${form.subtitle ? `Subtitle: ${form.subtitle}` : ''}
Author: ${form.authors}
Description: ${form.longDesc || form.shortDesc}
Categories: ${form.bisacCategory1}${form.bisacCategory2 ? ', ' + form.bisacCategory2 : ''}
Keywords: ${keywords.join(', ')}
${form.isbn ? `ISBN: ${form.isbn}` : ''}
Language: ${form.language}
Price: $${form.priceUSD || '0.00'}
${form.series ? `Series: ${form.series} #${form.seriesVolume || '1'}` : ''}`;

        const opf = `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${form.title}${form.subtitle ? ': ' + form.subtitle : ''}</dc:title>
    <dc:creator>${form.authors}</dc:creator>
    <dc:language>${langCode}</dc:language>
    ${form.isbn ? `<dc:identifier id="bookid">${form.isbn}</dc:identifier>` : '<dc:identifier id="bookid">urn:uuid:YOUR-UUID-HERE</dc:identifier>'}
    ${form.pubDate ? `<dc:date>${form.pubDate}</dc:date>` : ''}
    <dc:description>${(form.shortDesc || '').replace(/&/g, '&amp;').replace(/</g, '&lt;')}</dc:description>
    ${form.bisacCategory1 ? `<dc:subject>${form.bisacCategory1}</dc:subject>` : ''}
    ${form.bisacCategory2 ? `<dc:subject>${form.bisacCategory2}</dc:subject>` : ''}
    ${form.series ? `<meta property="belongs-to-collection">${form.series}</meta>\n    <meta property="group-position">${form.seriesVolume || '1'}</meta>` : ''}
  </metadata>
</package>`;

        return [kdp, ingram, d2d, opf];
    }, [form, keywords, langCode]);

    return (
        <div className="tool-layout">
            <div className="tool-input-card" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <h3>Book Metadata</h3>
                {/* Text fields */}
                {[
                    ['title', 'Book title'], ['subtitle', 'Subtitle (optional)'], ['authors', 'Author name(s)'],
                    ['series', 'Series name (optional)'], ['seriesVolume', 'Volume # (opt.)'],
                    ['bisacCategory1', 'BISAC Category 1'], ['bisacCategory2', 'BISAC Category 2 (opt.)'],
                ].map(([k, l]) => (
                    <div className="form-group" key={k}>
                        <label className="form-label">{l}</label>
                        <input className="form-input" value={form[k]} onChange={(e) => updateField(k, e.target.value)} />
                    </div>
                ))}

                <div className="form-group">
                    <label className="form-label">Keywords (7 max)</label>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '.5rem' }}>
                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                            <input key={n} className="form-input" placeholder={`Keyword ${n}`} value={form[`kw${n}`]} onChange={(e) => updateField(`kw${n}`, e.target.value)} />
                        ))}
                    </div>
                </div>

                <div className="form-group"><label className="form-label">Short description (150 words)</label><textarea className="form-textarea" style={{ minHeight: '80px' }} value={form.shortDesc} onChange={(e) => updateField('shortDesc', e.target.value)} /></div>
                <div className="form-group"><label className="form-label">Long description (400 words / 4000 chars)</label><textarea className="form-textarea" style={{ minHeight: '120px' }} value={form.longDesc} onChange={(e) => updateField('longDesc', e.target.value)} /></div>

                {[['isbn', 'ISBN'], ['asin', 'ASIN'], ['pubDate', 'Publication date (YYYY-MM-DD)'], ['priceUSD', 'Price (USD)'], ['priceGBP', 'Price (GBP)'], ['priceEUR', 'Price (EUR)'], ['priceAUD', 'Price (AUD)']].map(([k, l]) => (
                    <div className="form-group" key={k}><label className="form-label">{l}</label><input className="form-input" value={form[k]} onChange={(e) => updateField(k, e.target.value)} /></div>
                ))}

                <div className="form-group"><label className="form-label">Edition</label>
                    <select className="form-select" value={form.edition} onChange={(e) => updateField('edition', e.target.value)}>
                        {['First', 'Second', 'Third', 'Revised', 'Updated'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                </div>
                <div className="form-group"><label className="form-label">Language</label>
                    <select className="form-select" value={form.language} onChange={(e) => updateField('language', e.target.value)}>
                        {['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch'].map((o) => <option key={o}>{o}</option>)}
                    </select>
                </div>
            </div>

            <div className="tool-output-card">
                <h3>Formatted Output</h3>
                <div className="output-tabs">
                    {tabs.map((t, i) => (
                        <button key={i} className={`output-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}</button>
                    ))}
                </div>
                <textarea className="form-textarea code-output" style={{ minHeight: '400px', fontFamily: 'monospace', fontSize: '.85rem' }}
                    value={outputs[activeTab]} readOnly />
                <div className="output-actions">
                    <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(outputs[activeTab])}>
                        📋 Copy {tabs[activeTab]}
                    </button>
                </div>
            </div>
        </div>
    );
}
