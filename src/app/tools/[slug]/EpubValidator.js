'use client';

import { useState, useCallback } from 'react';
import UpsellBanner from '@/components/UpsellBanner';
import StickyUpgradeBanner from '@/components/StickyUpgradeBanner';

export default function EpubValidator() {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [fileError, setFileError] = useState(null);

    const [step, setStep] = useState('upload');
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [pendingResults, setPendingResults] = useState(null);

    const validate = useCallback(async (epubFile) => {
        setLoading(true);
        setResults(null);
        setFileError(null);

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

            const validationData = {
                checks,
                passCount,
                total: checks.length,
                filename: epubFile.name,
                sizeMB,
                hasErrors: passCount < checks.length,
            };

            // GA4: email gate shown
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'email_gate_shown', {
                    tool_name: 'epub_validator',
                    issue_count: checks.length - passCount,
                });
            }

            setPendingResults(validationData);
            setStep('email');

        } catch (err) {
            setPendingResults({
                checks: [{ name: 'File Parse', status: 'fail', detail: `Could not read EPUB: ${err.message}. Is this a valid .epub file?` }],
                passCount: 0,
                total: 1,
                filename: epubFile.name,
                hasErrors: true,
            });
            setStep('email');
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
            body: JSON.stringify({ email, name, results: pendingResults }),
        });

        // GA4: email gate completed
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'email_gate_completed', {
                tool_name: 'epub_validator',
            });
        }

        setEmailSent(true);
        setResults(pendingResults);
        setStep('report');
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
            {step === 'upload' && (
                <>
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

            {step === 'email' && pendingResults && !loading && (
                <div style={{ background: '#fff', border: '1px solid #e5e7eb', borderRadius: '12px', padding: '32px', maxWidth: '480px', margin: '0 auto', textAlign: 'center' }}>
                    <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>
                        {pendingResults.checks.some(c => c.status === 'fail') ? '⚠️' : '✅'}
                    </div>
                    <h2 style={{ fontSize: '1.25rem', fontWeight: 700, marginBottom: '8px' }}>
                        Your EPUB has {pendingResults.total - pendingResults.passCount} issue{pendingResults.total - pendingResults.passCount !== 1 ? 's' : ''} out of {pendingResults.total} checks
                    </h2>
                    <p style={{ color: '#6b7280', fontSize: '0.95rem', marginBottom: '24px' }}>
                        Enter your email to see the full report — and we'll send you a copy so you can fix issues at your own pace.
                    </p>

                    <form onSubmit={handleEmailSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                        <input
                            type="text"
                            placeholder="Your first name (optional)"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            style={{ padding: '12px 16px', border: '1px solid #d1d5db', borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                        />
                        <input
                            type="email"
                            placeholder="Your email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            style={{ padding: '12px 16px', border: `1px solid ${emailError ? '#fca5a5' : '#d1d5db'}`, borderRadius: '8px', fontSize: '0.95rem', outline: 'none' }}
                        />
                        {emailError && <p style={{ color: '#c53030', fontSize: '0.85rem', margin: 0 }}>{emailError}</p>}
                        <button
                            type="submit"
                            style={{ background: '#1a1a1a', color: '#fff', padding: '13px', borderRadius: '8px', fontWeight: 600, fontSize: '1rem', border: 'none', cursor: 'pointer' }}
                        >
                            See My Full Report →
                        </button>
                        <p style={{ color: '#9ca3af', fontSize: '0.8rem', margin: 0 }}>No spam. One email with your report.</p>
                    </form>
                </div>
            )}

            {step === 'report' && results && (
                <>
                    {emailSent && (
                        <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '8px', padding: '12px 16px', marginBottom: '20px', fontSize: '0.9rem', color: '#166534' }}>
                            📬 Report sent to <strong>{email}</strong> — check your inbox.
                        </div>
                    )}

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

                                <a
                                    href="/signup?plan=pro"
                                    style={{ display: 'block', background: '#C9933A', color: '#fff', padding: '13px', borderRadius: '8px', textDecoration: 'none', fontWeight: 700, fontSize: '1rem', textAlign: 'center', marginBottom: '16px' }}
                                >
                                    🔧 Auto-Fix All — Start Free Trial
                                </a>

                                {fixChain.length > 0 && (
                                    <>
                                        <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '10px' }}>Or fix step by step:</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {fixChain.map((item, i) => (
                                                <a
                                                    key={i}
                                                    href={item.fixLink}
                                                    style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.07)', borderRadius: '7px', padding: '10px 14px', textDecoration: 'none', color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}
                                                >
                                                    <span style={{ background: '#C9933A', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                                    {item.name} issue → <span style={{ color: '#C9933A', marginLeft: 'auto' }}>Open {item.fixTool} →</span>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '14px', textAlign: 'center' }}>
                                    <a href="/blog/why-kdp-rejects-epub" style={{ color: '#9ca3af' }}>Why is KDP rejecting my EPUB? Read the guide →</a>
                                </p>
                            </div>
                        )}

                        {!hasIssues && results.passCount === results.total && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>✅ Your EPUB is KDP-ready</h3>
                                <p style={{ fontSize: '0.95rem', color: '#166534', marginBottom: '20px' }}>Great job. Want to make sure your metadata and TOC are perfect too?</p>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <a href="/tools/metadata-builder" style={{ display: 'inline-block', background: '#fff', color: '#166534', border: '1px solid #166534', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Check Metadata →</a>
                                    <a href="/signup?plan=pro" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Get All 12 Tools — $9.99</a>
                                </div>
                            </div>
                        )}

                        <div className="val-checks">
                            {results.checks.map((c, i) => (
                                <div key={i} className={`val-check ${statusClass(c.status)}`}>
                                    <span className="val-check-icon">{statusIcon(c.status)}</span>
                                    <div style={{ flex: 1 }}>
                                        <strong>{c.name}</strong>
                                        <p>{c.detail}</p>
                                        {c.fixLink && (
                                            <a
                                                href={c.fixLink}
                                                style={{ display: 'inline-block', marginTop: '8px', color: '#b8860b', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}
                                            >
                                                → Fix this with {c.fixTool}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '10px', padding: '20px', marginTop: '20px', textAlign: 'center' }}>
                            <p style={{ fontWeight: 600, marginBottom: '4px', fontSize: '0.95rem' }}>Liked this tool?</p>
                            <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: '14px' }}>Get all 12 BookKraft tools + auto-fix for everything.</p>
                            <a
                                href="/signup?plan=pro"
                                style={{ display: 'inline-block', background: '#1a1a1a', color: '#fff', padding: '11px 24px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.95rem' }}
                            >
                                Upgrade to Pro — $9.99
                            </a>
                        </div>
                    </div>

                    <UpsellBanner toolName="EPUB Validator" />
                </>
            )}

            <StickyUpgradeBanner />
        </div>
    );
}