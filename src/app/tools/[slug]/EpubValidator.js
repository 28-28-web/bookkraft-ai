'use client';

import { useState, useCallback, useEffect } from 'react';
import UpsellBanner from '@/components/UpsellBanner';
import ValidationBadge from './ValidationBadge';
import StickyUpgradeBanner from '@/components/StickyUpgradeBanner';
import { TOOLS } from '@/lib/tools';

export default function EpubValidator() {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [fileError, setFileError] = useState(null);

    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSent, setEmailSent] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'tool_view', { tool_name: 'epub_validator' });
        }
    }, []);

    const fileSizeRange = (bytes) => {
        if (!bytes) return 'unknown';
        if (bytes < 1024 * 1024) return '0-1MB';
        if (bytes < 5 * 1024 * 1024) return '1-5MB';
        if (bytes < 10 * 1024 * 1024) return '5-10MB';
        return '10MB+';
    };

    const validate = useCallback(async (epubFile) => {
        setLoading(true);
        setResults(null);
        setFileError(null);

        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'tool_start', { tool_name: 'epub_validator' });
            window.gtag('event', 'file_upload_start', { tool_name: 'epub_validator', file_type: 'epub', file_size_range: fileSizeRange(epubFile.size) });
        }

        try {
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(epubFile);
            const checks = [];
            let passCount = 0;

            const mimetype = zip.file('mimetype');
            if (mimetype) {
                const content = await mimetype.async('string');
                if (content.trim() === 'application/epub+zip') {
                    checks.push({ name: 'Mimetype', status: 'pass', detail: 'Valid mimetype present.' });
                    passCount++;
                } else {
                    checks.push({ name: 'Mimetype', status: 'fail', detail: "KDP can't read your file type. Your EPUB is corrupted or was exported incorrectly.", fixLink: '/tools/kindle-format-fixer', fixTool: 'Kindle Format Fixer' });
                }
            } else {
                checks.push({ name: 'Mimetype', status: 'fail', detail: "KDP can't read your file type. Your EPUB is corrupted or was exported with wrong settings.", fixLink: '/tools/kindle-format-fixer', fixTool: 'Kindle Format Fixer' });
            }

            const container = zip.file('META-INF/container.xml');
            let opfPath = 'OEBPS/content.opf';
            if (container) {
                const containerXml = await container.async('string');
                const match = containerXml.match(/full-path="([^"]+)"/);
                if (match) { opfPath = match[1]; }
                checks.push({ name: 'Container', status: 'pass', detail: `container.xml found, rootfile: ${opfPath}` });
                passCount++;
            } else {
                checks.push({ name: 'Container', status: 'fail', detail: "Your EPUB is missing its internal structure file. This usually happens when exporting from Word or Calibre with wrong settings.", fixLink: '/tools/kindle-format-fixer', fixTool: 'Kindle Format Fixer' });
            }

            const opf = zip.file(opfPath);
            let opfContent = '';
            if (opf) {
                opfContent = await opf.async('string');
                checks.push({ name: 'OPF Package', status: 'pass', detail: `Found at ${opfPath}` });
                passCount++;
            } else {
                checks.push({ name: 'OPF Package', status: 'fail', detail: "Your book's table of contents and metadata are missing. KDP requires these to process your upload.", fixLink: '/tools/metadata-builder', fixTool: 'Metadata Builder' });
            }

            if (opfContent) {
                const hasTitle = /<dc:title/i.test(opfContent);
                const hasLang = /<dc:language/i.test(opfContent);
                const hasId = /<dc:identifier/i.test(opfContent);
                if (hasTitle && hasLang && hasId) {
                    checks.push({ name: 'Required Metadata', status: 'pass', detail: 'Title, language, and identifier present.' });
                    passCount++;
                } else {
                    const missing = [];
                    if (!hasTitle) missing.push('title');
                    if (!hasLang) missing.push('language');
                    if (!hasId) missing.push('identifier');
                    checks.push({ name: 'Required Metadata', status: 'fail', detail: `Missing ${missing.join(', ')} — KDP will reject uploads without complete metadata.`, fixLink: '/tools/metadata-builder', fixTool: 'Metadata Builder' });
                }
            } else {
                checks.push({ name: 'Required Metadata', status: 'skip', detail: 'Skipped — OPF not found' });
            }

            if (opfContent) {
                const spineMatch = opfContent.match(/<spine[^>]*>([\s\S]*?)<\/spine>/);
                if (spineMatch) {
                    const idrefMatches = [...spineMatch[1].matchAll(/idref="([^"]+)"/g)].map((m) => m[1]);
                    if (idrefMatches.length > 0) {
                        checks.push({ name: 'Spine', status: 'pass', detail: `${idrefMatches.length} items in spine.` });
                        passCount++;
                    } else {
                        checks.push({ name: 'Spine', status: 'fail', detail: "No reading order defined — readers won't know which chapter comes first.", fixLink: '/tools/toc-generator', fixTool: 'TOC Generator' });
                    }
                } else {
                    checks.push({ name: 'Spine', status: 'fail', detail: 'No reading order found in your EPUB. KDP requires a defined chapter sequence.', fixLink: '/tools/toc-generator', fixTool: 'TOC Generator' });
                }
            }

            if (opfContent) {
                const hrefMatches = [...opfContent.matchAll(/href="([^"#]+)"/g)].map((m) => m[1]);
                const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/') + 1) : '';
                let missing = 0;
                for (const href of hrefMatches) {
                    const fullPath = opfDir + href;
                    if (!zip.file(fullPath) && !zip.file(href)) missing++;
                }
                if (missing === 0) {
                    checks.push({ name: 'Manifest Files', status: 'pass', detail: `All ${hrefMatches.length} manifest items found.` });
                    passCount++;
                } else {
                    checks.push({ name: 'Manifest Files', status: 'warn', detail: `${missing} files referenced in your EPUB are missing. This causes blank pages or broken images on Kindle.`, fixLink: '/tools/kindle-format-fixer', fixTool: 'Kindle Format Fixer' });
                }
            }

            if (opfContent) {
                const emfHrefs = [...opfContent.matchAll(/href="([^"]+\.(?:emf|wmf))"/gi)].map(m => m[1]);
                const emfMimeType = /media-type="image\/(?:x-)?(?:emf|wmf)"/i.test(opfContent);
                if (emfHrefs.length === 0 && !emfMimeType) {
                    checks.push({ name: 'EMF/WMF Images', status: 'pass', detail: 'No Windows-only image formats detected.' });
                    passCount++;
                } else {
                    const count = emfHrefs.length || 1;
                    checks.push({ name: 'EMF/WMF Images', status: 'warn', detail: `${count} EMF/WMF image${count > 1 ? 's' : ''} found. KDP and Apple Books reject EPUBs with Windows-only image formats — re-save these as PNG or JPG in your source document before re-exporting.`, fixLink: '/epub-errors/emf-image-fallback', fixTool: 'Fix Guide' });
                }
            }

            if (opfContent) {
                const normPath = (p) => p.split('/').reduce((acc, seg) => { if (seg === '..') acc.pop(); else if (seg !== '.') acc.push(seg); return acc; }, []).join('/');
                const cssHrefs = [...opfContent.matchAll(/href="([^"]+\.css)"/gi)].map(m => m[1]);
                const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/') + 1) : '';
                let totalFontRefs = 0;
                let missingFonts = 0;
                for (const cssHref of cssHrefs) {
                    const cssPath = opfDir + cssHref;
                    const cssFile = zip.file(cssPath) || zip.file(cssHref);
                    if (!cssFile) continue;
                    const cssContent = await cssFile.async('string');
                    const fontUrls = [...cssContent.matchAll(/url\(['"]?([^'")\s]+\.(?:woff2?|ttf|otf|eot))['"]?\)/gi)].map(m => m[1]);
                    for (const fontUrl of fontUrls) {
                        if (fontUrl.startsWith('http') || fontUrl.startsWith('//')) continue;
                        totalFontRefs++;
                        const cssDir = cssPath.includes('/') ? cssPath.substring(0, cssPath.lastIndexOf('/') + 1) : '';
                        const resolvedPath = normPath(cssDir + fontUrl);
                        if (!zip.file(resolvedPath) && !zip.file(fontUrl)) missingFonts++;
                    }
                }
                if (totalFontRefs === 0) {
                    checks.push({ name: 'Font Files', status: 'pass', detail: 'No custom fonts embedded — device default font will be used.' });
                    passCount++;
                } else if (missingFonts === 0) {
                    checks.push({ name: 'Font Files', status: 'pass', detail: `${totalFontRefs} embedded font${totalFontRefs > 1 ? 's' : ''} verified.` });
                    passCount++;
                } else {
                    checks.push({ name: 'Font Files', status: 'warn', detail: `${missingFonts} font file${missingFonts > 1 ? 's' : ''} referenced in CSS but missing from the package. KDP and Apple Books may reject or mangle the layout.`, fixLink: '/epub-errors/font-link-validation', fixTool: 'Fix Guide' });
                }
            }

            if (opfContent) {
                const hasNav = /properties="[^"]*nav[^"]*"/.test(opfContent);
                const hasNcx = /media-type="application\/x-dtbncx\+xml"/.test(opfContent);
                if (hasNav || hasNcx) {
                    checks.push({ name: 'Navigation', status: 'pass', detail: `${hasNav ? 'EPUB3 nav' : ''}${hasNav && hasNcx ? ' + ' : ''}${hasNcx ? 'NCX' : ''} found.` });
                    passCount++;
                } else {
                    checks.push({ name: 'Navigation', status: 'warn', detail: "No table of contents found — readers can't jump between chapters on Kindle.", fixLink: '/tools/toc-generator', fixTool: 'TOC Generator' });
                }
            }

            if (opfContent) {
                const hasCover = /properties="[^"]*cover-image[^"]*"/.test(opfContent) || /name="cover"/.test(opfContent);
                if (hasCover) {
                    checks.push({ name: 'Cover Image', status: 'pass', detail: 'Cover image referenced in metadata.' });
                    passCount++;
                } else {
                    checks.push({ name: 'Cover Image', status: 'warn', detail: 'No cover image detected — some stores require this for listing.' });
                }
            }

            const sizeMB = (epubFile.size / 1024 / 1024).toFixed(1);
            if (epubFile.size < 650 * 1024 * 1024) {
                checks.push({ name: 'File Size', status: 'pass', detail: `${sizeMB} MB (KDP limit: 650 MB)` });
                passCount++;
            } else {
                checks.push({ name: 'File Size', status: 'fail', detail: `${sizeMB} MB exceeds KDP 650 MB limit. Compress images or split into volumes.` });
            }

            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'epub_validated', { issue_count: checks.length - passCount });
                window.gtag('event', 'file_upload_success', { tool_name: 'epub_validator', file_type: 'epub', file_size_range: fileSizeRange(epubFile.size) });
                window.gtag('event', 'tool_complete', { tool_name: 'epub_validator', issue_count: checks.length - passCount });
            }

            setResults({ checks, passCount, total: checks.length, filename: epubFile.name, sizeMB, hasErrors: passCount < checks.length });

        } catch (err) {
            console.error('EPUB parse error:', err);
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'file_upload_failed', { tool_name: 'epub_validator', file_type: 'epub', error_type: 'parse', file_size_range: fileSizeRange(epubFile.size) });
            }
            setResults({
                checks: [{ name: 'File Parse', status: 'fail', detail: 'Could not read this file — it may be corrupted or not a valid .epub file.' }],
                passCount: 0, total: 1, filename: epubFile.name, hasErrors: true,
            });
        }

        setLoading(false);
    }, []);

    const handleFile = (f) => {
        if (!f) return;
        if (!f.name.toLowerCase().endsWith('.epub')) {
            setFileError(`"${f.name}" is not an EPUB file. Please upload a .epub file, or use our Word-to-EPUB converter first.`);
            setFile(null);
            setResults(null);
            return;
        }
        setFileError(null);
        setFile(f);
        validate(f);
    };

    const handleEmailSubmit = async (e) => {
        e.preventDefault();
        if (!email || !email.includes('@')) {
            setEmailError('Please enter a valid email address.');
            return;
        }
        setEmailError('');

        await fetch('/api/send-epub-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, results }),
        });

        fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source_tool: 'epub-validator', issue_count: failCount + warnCount }),
        }).catch(() => {});

        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'email_captured', { tool_name: 'epub_validator' });
        }

        setEmailSent(true);
    };

    const statusIcon = (s) => ({ pass: '✅', fail: '❌', warn: '⚠️', skip: '⏭️' }[s] || '❓');
    const statusClass = (s) => ({ pass: 'val-pass', fail: 'val-fail', warn: 'val-warn', skip: 'val-skip' }[s] || '');

    const failCount = results ? results.checks.filter(c => c.status === 'fail').length : 0;
    const warnCount = results ? results.checks.filter(c => c.status === 'warn').length : 0;
    const hasFails = results && results.checks.some(c => c.status === 'fail');
    const hasIssues = results && results.checks.some(c => c.status === 'fail' || c.status === 'warn');

    const fixChain = results
        ? results.checks
            .filter(c => (c.status === 'fail' || c.status === 'warn') && c.fixLink)
            .reduce((acc, c) => {
                if (!acc.find(x => x.fixLink === c.fixLink)) acc.push(c);
                return acc;
            }, [])
        : [];

    return (
        <div>
            {/* Upload section */}
            {!results && (
                <>
                    {/* Pro hint — visible before upload */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                            Free scan checks 11 core issues.
                        </p>
                        <a
                            href="/tools/epub-validator-premium"
                            style={{ fontSize: '0.85rem', color: '#C9933A', fontWeight: 600, textDecoration: 'none' }}
                        >
                            Need ghost spacing + duplicate ID + store report? → Pro Scan
                        </a>
                    </div>

                    <div
                        className={`drop-zone ${dragOver ? 'drop-zone-active' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                        onClick={() => document.getElementById('epub-file-input').click()}
                    >
                        <input id="epub-file-input" type="file" accept=".epub" hidden onChange={(e) => handleFile(e.target.files[0])} />
                        <div className="drop-zone-icon">📥</div>
                        <p className="drop-zone-text">Drop your .epub file here or click to browse</p>
                        {file && <p className="drop-zone-file">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>}
                    </div>

                    {fileError && (
                        <div style={{ background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: '8px', padding: '16px', marginTop: '20px', color: '#c53030' }}>
                            <strong>Wrong file type</strong>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{fileError}</p>
                        </div>
                    )}

                    {loading && <div className="loading-state"><div className="spinner" /> Validating your EPUB...</div>}
                </>
            )}

            {/* Full Report */}
            {results && (
                <>
                    <div className="validation-results">
                        <div className="val-summary">
                            <div className="val-score">
                                <span className="val-score-num">{results.passCount}</span>
                                <span className="val-score-denom">/{results.total}</span>
                            </div>
                            <p className="val-score-label">
                                {results.passCount === results.total
                                    ? 'All checks passed! ✨'
                                    : results.passCount >= results.total - 2
                                        ? 'Looking good — minor issues found.'
                                        : 'Some issues found. Review below.'}
                            </p>
                        </div>

                        {/* Issues block */}
                        {hasIssues && (
                            <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                                    {hasFails ? '❌ Your EPUB will be rejected by KDP' : '⚠️ Your EPUB has warnings to review'}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '20px' }}>
                                    {failCount > 0 && `${failCount} critical ${failCount === 1 ? 'issue' : 'issues'}`}
                                    {failCount > 0 && warnCount > 0 && ' + '}
                                    {warnCount > 0 && `${warnCount} ${warnCount === 1 ? 'warning' : 'warnings'}`}
                                    {' '}found. BookKraft Pro auto-fixes all of them in under 2 minutes.
                                </p>

                                <a href="/signup?plan=pro" style={{ display: 'block', background: '#C9933A', color: '#fff', padding: '13px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', textAlign: 'center', marginBottom: '16px' }}>
                                    🔧 Auto-Fix All — Start Free Trial
                                </a>

                                {fixChain.length > 0 && (
                                    <>
                                        <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '10px' }}>Or fix step by step:</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {fixChain.map((item, i) => (
                                                <a key={i} href={item.fixLink} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.07)', borderRadius: '7px', padding: '10px 14px', textDecoration: 'none', color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}>
                                                    <span style={{ background: '#C9933A', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                                    {item.name} issue → <span style={{ color: '#C9933A', marginLeft: 'auto' }}>Open {item.fixTool} →</span>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '14px', textAlign: 'center' }}>
                                    <a href="/blog/kdp-rejecting-epub-fix" style={{ color: '#9ca3af' }}>Why is KDP rejecting my EPUB? Read the guide →</a>
                                </p>
                            </div>
                        )}

                        {/* All passed block */}
                        {!hasIssues && results.passCount === results.total && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.95rem', color: '#166534', marginBottom: '20px' }}>Great job. Want to make sure your metadata and TOC are perfect too?</p>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>✅ Your EPUB is KDP-ready</h3>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <a href="/tools/metadata-builder" style={{ display: 'inline-block', background: '#fff', color: '#166534', border: '1px solid #166534', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Check Metadata →</a>
                                    <a href="/signup?plan=starter" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Get All {TOOLS.length} Tools — $19</a>
                                </div>
                            </div>
                        )}
                        {!hasFails && (<ValidationBadge filename={results.filename} />)}

                        {/* Check list */}
                        <div className="val-checks">
                            {results.checks.map((c, i) => (
                                <div key={i} className={`val-check ${statusClass(c.status)}`}>
                                    <span className="val-check-icon">{statusIcon(c.status)}</span>
                                    <div style={{ flex: 1 }}>
                                        <strong>{c.name}</strong>
                                        <p>{c.detail}</p>
                                        {c.fixLink && (
                                            <a href={c.fixLink} style={{ display: 'inline-block', marginTop: '8px', color: '#b8860b', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                                                → Fix this with {c.fixTool}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Email capture */}
                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '24px', marginTop: '24px' }}>
                            {!emailSent ? (
                                <>
                                    <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '4px' }}>📬 Want a copy of this report?</p>
                                    <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: '16px' }}>We'll email it to you so you can fix issues at your own pace. No spam.</p>
                                    <form onSubmit={handleEmailSubmit} style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                                        <input
                                            type="text"
                                            placeholder="First name (optional)"
                                            value={name}
                                            onChange={(e) => setName(e.target.value)}
                                            style={{ padding: '10px 14px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.9rem', outline: 'none', flex: '1', minWidth: '140px' }}
                                        />
                                        <input
                                            type="email"
                                            placeholder="Your email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            required
                                            style={{ padding: '10px 14px', border: `1px solid ${emailError ? '#fca5a5' : '#d1d5db'}`, borderRadius: '8px', fontSize: '0.9rem', outline: 'none', flex: '2', minWidth: '180px' }}
                                        />
                                        <button type="submit" style={{ background: '#1a1a1a', color: '#fff', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}>
                                            Send Report
                                        </button>
                                    </form>
                                    {emailError && <p style={{ color: '#c53030', fontSize: '0.85rem', marginTop: '6px' }}>{emailError}</p>}
                                </>
                            ) : (
                                <p style={{ color: '#166534', fontWeight: 600, fontSize: '0.95rem', textAlign: 'center' }}>
                                    📬 Report sent to <strong>{email}</strong> — check your inbox.
                                </p>
                            )}
                        </div>
                    </div>

                    {/* Pro Scan upsell — single, clean block */}
                    <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2410 100%)', borderRadius: '12px', padding: '24px', marginTop: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                            <div style={{ fontSize: '2rem', flexShrink: 0 }}>🔬</div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                                    Want a deeper scan?
                                </h3>
                                <p style={{ color: '#d1d5db', fontSize: '0.88rem', marginBottom: '8px', lineHeight: 1.5 }}>
                                    Pro scan checks ghost spacing, duplicate IDs, OPF manifest cross-check, and cover dimensions — plus a store-specific report for KDP, Apple Books, and Google Play.
                                </p>
                                <p style={{ color: '#9ca3af', fontSize: '0.82rem', marginBottom: '16px' }}>
                                    Costs 2 credits. Results download as a full HTML report.
                                </p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <a href="/tools/epub-validator-premium" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Run Pro Scan — 2 Credits →
                                    </a>
                                    <a href="/pricing" style={{ display: 'inline-block', background: 'transparent', color: '#C9933A', border: '1px solid #C9933A', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Buy Credits
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <UpsellBanner toolName="EPUB Validator" />
                </>
            )}

            <StickyUpgradeBanner />
        </div>
    );
}