'use client';

import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import UpsellBanner from '@/components/UpsellBanner';
import ReadinessReportCTA from '@/components/ReadinessReportCTA';
import StickyUpgradeBanner from '@/components/StickyUpgradeBanner';
import { TOOLS } from '@/lib/tools';
import { useLoadingSteps } from '@/hooks/useLoadingSteps';
import { track } from '@/lib/analytics';
import { buildMetadataChecks, extractMetadataFromZip } from '@/lib/metadataChecks';
import FixLinks from '@/components/FixLinks';
import FixAllCta from '@/components/FixAllCta';
import ResultEmailCapture from '@/components/ResultEmailCapture';

const META_STEPS = [
    { text: 'Reading EPUB...', ms: 800 },
    { text: 'Extracting metadata...', ms: 1500 },
    { text: 'Almost done...', ms: 0 },
];

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
    const [dragOver, setDragOver] = useState(false);
    const [extracting, setExtracting] = useState(false);
    const [extractError, setExtractError] = useState(null);
    const [epubFilename, setEpubFilename] = useState('');
    const stepText = useLoadingSteps(META_STEPS, extracting);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'tool_view', { tool_name: 'metadata_builder' });
        }
    }, []);

    const updateField = (key, value) => setForm((f) => ({ ...f, [key]: value }));
    const keywords = [form.kw1, form.kw2, form.kw3, form.kw4, form.kw5, form.kw6, form.kw7].filter(Boolean);
    const langCode = { English: 'en', Spanish: 'es', French: 'fr', German: 'de', Portuguese: 'pt', Italian: 'it', Dutch: 'nl' }[form.language] || 'en';

    const fileSizeRange = (bytes) => {
        if (!bytes) return 'unknown';
        if (bytes < 1024 * 1024) return '0-1MB';
        if (bytes < 5 * 1024 * 1024) return '1-5MB';
        if (bytes < 10 * 1024 * 1024) return '5-10MB';
        return '10MB+';
    };

    const extractFromEpub = async (file) => {
        setExtracting(true);
        setExtractError(null);
        setEpubFilename(file.name);
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'file_upload_start', { tool_name: 'metadata_builder', file_type: 'epub', file_size_range: fileSizeRange(file.size) });
        }
        try {
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(file);
            const meta = await extractMetadataFromZip(zip);
            setForm(f => ({
                ...f,
                title: meta.title || f.title,
                authors: meta.authors || f.authors,
                language: meta.language || f.language,
                isbn: meta.isbn || f.isbn,
                pubDate: meta.pubDate || f.pubDate,
                shortDesc: meta.shortDesc || f.shortDesc,
                bisacCategory1: meta.bisacCategory1 || f.bisacCategory1,
                bisacCategory2: meta.bisacCategory2 || f.bisacCategory2,
                series: meta.series || f.series,
                seriesVolume: meta.seriesVolume || f.seriesVolume,
            }));
            track('file_processed', { tool: 'metadata-builder', status: 'success', file_type: 'epub', file_size_range: fileSizeRange(file.size) });
        } catch (err) {
            console.error('EPUB extract error:', err);
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'file_upload_failed', { tool_name: 'metadata_builder', file_type: 'epub', error_type: 'parse', file_size_range: fileSizeRange(file.size) });
            }
            setExtractError('Could not read this EPUB — the file may be corrupted or incorrectly formatted.');
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

    const checks = useMemo(() => buildMetadataChecks(form), [form]);

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
        track('tool_start', { tool: 'metadata-builder' });
        setShowReport(true);
        track('report_completed', { tool: 'metadata-builder', issue_count: failCount + warnCount });
    };

    // Endpoints for the email box; ResultEmailCapture validates and logs the events.
    const sendReport = async ({ email, name }) => {
        await fetch('/api/send-metadata-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, form, checks, passCount, failCount }),
        });

        fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source_tool: 'metadata-builder', issue_count: failCount }),
        }).catch(() => {});
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
                        {stepText && <p style={{ fontSize: '0.85rem', color: '#6b7280' }}>{stepText}</p>}
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

                    <FixAllCta tool="metadata-builder" failedChecks={checks.filter(c => c.status === 'fail' || c.status === 'warn').map(c => c.name)} />

                    <ResultEmailCapture
                        tool="metadata-builder"
                        issueCount={failCount + warnCount}
                        gtagParams={{ tool_name: 'metadata_builder' }}
                        heading="📬 Want a copy of this report?"
                        subtext="We'll email your metadata report and formatted output. No spam."
                        buttonLabel="Send Report"
                        showName
                        onSubmit={sendReport}
                        renderSuccess={(email) => <>📬 Report sent to <strong>{email}</strong> — check your inbox.</>}
                    />

                    {hasIssues && (
                        <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                                {hasFails ? '❌ Your metadata has critical issues' : '⚠️ Your metadata has warnings to fix'}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '20px' }}>
                                {failCount > 0 && `${failCount} critical ${failCount === 1 ? 'issue' : 'issues'}`}
                                {failCount > 0 && warnCount > 0 && ' + '}
                                {warnCount > 0 && `${warnCount} ${warnCount === 1 ? 'warning' : 'warnings'}`}
                                {' '}found. Each one is fixed by filling in the matching field — see the steps below.
                            </p>
                            <button type="button" onClick={() => { track('fix_clicked', { tool: 'metadata-builder', fix_tool: 'metadata-builder', fix_kind: 'edit', check: 'all', issue_count: failCount + warnCount }); setShowReport(false); window.scrollTo({ top: 0, behavior: 'smooth' }); }} style={{ display: 'block', width: '100%', background: '#C9933A', color: '#fff', padding: '13px', borderRadius: '8px', border: 'none', cursor: 'pointer', fontWeight: 700, fontSize: '1rem', textAlign: 'center', marginBottom: '16px' }}>
                                ✏️ Edit your metadata
                            </button>
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
                                <Link href="/tools/toc-generator" onClick={() => track('cta_click', { from: window.location.pathname, to: '/tools/toc-generator', cta: 'next_step_toc' })} style={{ display: 'inline-block', background: '#166534', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Generate Table of Contents →</Link>
                                <a href="/signup?plan=starter" onClick={() => track('cta_click', { from: window.location.pathname, to: '/signup?plan=starter', cta: 'all_passed_starter' })} style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Get All {TOOLS.length} Tools — $19</a>
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
                                    {(c.status === 'fail' || c.status === 'warn') && <FixLinks tool="metadata-builder" check={c.name} />}
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
                            <Link href="/tools/toc-generator" onClick={() => track('cta_click', { from: window.location.pathname, to: '/tools/toc-generator', cta: 'next_step_toc' })} style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, marginRight: '12px' }}>Generate Table of Contents →</Link>
                            <a href="/signup?plan=pro" onClick={() => track('cta_click', { from: window.location.pathname, to: '/signup?plan=pro', cta: 'next_step_pro' })} style={{ display: 'inline-block', color: '#b8860b', fontWeight: 600, textDecoration: 'none', fontSize: '0.9rem' }}>or upgrade to Pro for more credits →</a>
                        </div>
                    )}


                    <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', textAlign: 'center' }}>
                        <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.95rem' }}>Liked this tool?</p>
                        <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: '14px' }}>Get all {TOOLS.length} BookKraft tools — one-time payment, no subscription.</p>
                        <a href="/signup?plan=starter" onClick={() => track('cta_click', { from: window.location.pathname, to: '/signup?plan=starter', cta: 'liked_tool_starter' })} style={{ display: 'inline-block', background: '#1a1a1a', color: '#fff', padding: '11px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}>Get Starter — $19</a>
                    </div>
                </div>
                <ReadinessReportCTA sourceTool="metadata-builder" />
                <UpsellBanner toolName="Metadata Builder" />
            </>
        )}


<StickyUpgradeBanner />
        </>
    );
}