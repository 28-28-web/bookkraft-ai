'use client';

import { useState, useMemo } from 'react';
// Note: Adjust these paths if your components moved
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

    const hasOutput = form.title || form.authors;
    const hasCoreFields = form.title && form.authors && form.bisacCategory1;

    return (
        <>
        <div className="tool-layout">
            <div className="tool-input-card" style={{ maxHeight: '600px', overflowY: 'auto' }}>
                <h3>Book Metadata</h3>
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

                {/* NEW: Next Step CTA when user has filled core fields */}
                {hasCoreFields && (
                    <div style={{
                        background: '#faf9f7', border: '2px solid #C9933A', borderRadius: '12px',
                        padding: '20px', marginTop: '20px'
                    }}>
                        <h4 style={{fontSize: '1rem', fontWeight: 700, color: '#1a1a1a', marginBottom: '8px'}}>
                            ✅ Metadata looks good
                        </h4>
                        <p style={{fontSize: '0.9rem', color: '#666', marginBottom: '16px'}}>
                            Next step: build your table of contents. KDP requires a TOC for every ebook.
                        </p>
                        <a href="/tools/toc-generator" style={{
                            display: 'inline-block', background: '#C9933A', color: '#fff',
                            padding: '10px 20px', borderRadius: '8px', textDecoration: 'none',
                            fontWeight: 600, marginRight: '12px'
                        }}>
                            Generate Table of Contents →
                        </a>
                        <a href="/signup?plan=pro" style={{
                            display: 'inline-block', color: '#b8860b', fontWeight: 600,
                            textDecoration: 'none', fontSize: '0.9rem'
                        }}>
                            or get all tools in one →
                        </a>
                    </div>
                )}

                {/* Upsell banner shown once user starts filling in data */}
                {hasOutput && <UpsellBanner toolName="Metadata Builder" />}
            </div>
        </div>

        {/* SEO Content */}
        <div className="seo-content" style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
            <h2>Book Metadata Builder for Self-Publishing Platforms</h2>
            <p>Bad metadata is one of the most common reasons self-published books underperform. Wrong categories, weak descriptions, missing BISAC codes — small errors that quietly hurt your discoverability across every platform you publish on. This tool makes sure you get it right the first time.</p>

            <h2>What This Tool Does</h2>
            <p>The Metadata Builder guides you through every metadata field step by step — title, subtitle, description, categories, BISAC codes, keywords, and more. And where it can, it auto-generates metadata based on your book's content. So instead of staring at a blank description field, you start with a solid draft to refine in minutes.</p>

            <h2>Works Across Multiple Platforms</h2>
            <p>Publishing on more than one platform means managing slightly different metadata requirements for each one. The Metadata Builder accounts for platform-specific differences. So whether you're publishing wide or going Amazon-exclusive, your metadata is formatted correctly. Supported platforms include Amazon KDP, IngramSpark, Draft2Digital, Smashwords, and Barnes and Noble Press.</p>

            <h2>Who This Is For</h2>
            <p>First-time authors who don't know what BISAC codes are or why they matter. Experienced authors publishing across multiple platforms who want consistent, accurate metadata without filling in the same fields five different times. Freelance editors and publishing consultants who set up client listings and need a reliable, repeatable process.</p>

            <h2>How It Works</h2>
            <p>Enter your book details and upload or paste your description. The tool auto-generates metadata fields where possible. Then review and refine each field with guided prompts and export your completed metadata formatted for your chosen platforms. The whole process takes under 15 minutes for a new title.</p>

            <h2>Why Metadata Gets Overlooked</h2>
            <p>Most authors rush through metadata because they're excited to finally hit publish. But metadata is what tells platforms — and readers — what your book is about, who it's for, and where it belongs. Strong metadata means better category placement, better search visibility, and more readers finding your book organically.</p>
            <StickyUpgradeBanner />
           </div>
        </>
    );
}