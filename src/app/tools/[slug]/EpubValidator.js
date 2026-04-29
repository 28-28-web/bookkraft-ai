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
                    checks.push({ name: 'Mimetype', status: 'fail', detail: 'Invalid mimetype — your EPUB is corrupted or was exported with wrong settings.', fixLink: '/tools/kindle-format-fixer' });
                }
            } else {
                checks.push({ name: 'Mimetype', status: 'fail', detail: 'Missing mimetype file — KDP cannot read your file type. This happens when exporting from Word or using incorrect settings.', fixLink: '/tools/kindle-format-fixer' });
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
                checks.push({ name: 'Container', status: 'fail', detail: 'Missing internal structure file. Your EPUB is missing its container.xml — usually caused by a bad export.', fixLink: '/tools/kindle-format-fixer' });
            }

            const opf = zip.file(opfPath);
            let opfContent = '';
            if (opf) {
                opfContent = await opf.async('string');
                checks.push({ name: 'OPF Package', status: 'pass', detail: `Found at ${opfPath}` });
                passCount++;
            } else {
                checks.push({ name: 'OPF Package', status: 'fail', detail: 'Your book\'s table of contents and metadata are missing. KDP requires these to process your upload.', fixLink: '/tools/metadata-builder' });
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
                    checks.push({ name: 'Required Metadata', status: 'fail', detail: `Missing ${missing.join(', ')} — KDP will reject uploads without complete metadata.`, fixLink: '/tools/metadata-builder' });
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
                        checks.push({ name: 'Spine', status: 'fail', detail: 'No reading order defined — readers won\'t know which chapter comes first.', fixLink: '/tools/toc-generator' });
                    }
                } else {
                    checks.push({ name: 'Spine', status: 'fail', detail: 'No reading order found in your EPUB. KDP requires a defined chapter sequence.', fixLink: '/tools/toc-generator' });
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
                    checks.push({ name: 'Manifest Files', status: 'warn', detail: `${missing} files referenced in your EPUB are missing. This causes blank pages or broken images on Kindle.`, fixLink: '/tools/kindle-format-fixer' });
                }
            }

            if (opfContent) {
                const hasNav = /properties="[^"]*nav[^"]*"/.test(opfContent);
                const hasNcx = /media-type="application\/x-dtbncx\+xml"/.test(opfContent);
                if (hasNav || hasNcx) {
                    checks.push({ name: 'Navigation', status: 'pass', detail: `${hasNav ? 'EPUB3 nav' : ''}${hasNav && hasNcx ? ' + ' : ''}${hasNcx ? 'NCX' : ''} found.` });
                    passCount++;
                } else {
                    checks.push({ name: 'Navigation', status: 'warn', detail: 'No table of contents found — readers can\'t jump between chapters on Kindle.', fixLink: '/tools/toc-generator' });
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

            setResults({ checks, passCount, total: checks.length, filename: epubFile.name, sizeMB, hasErrors: passCount < checks.length });

        } catch (err) {
            setResults({
                checks: [{ name: 'File Parse', status: 'fail', detail: `Could not read EPUB: ${err.message}. Is this a valid .epub file?` }],
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

    const statusIcon = (s) => ({ pass: '✅', fail: '❌', warn: '⚠️', skip: '⏭️' }[s] || '❓');
    const statusClass = (s) => ({ pass: 'val-pass', fail: 'val-fail', warn: 'val-warn', skip: 'val-skip' }[s] || '');

    const failCount = results ? results.total - results.passCount : 0;
    const hasFails = results && results.checks.some(c => c.status === 'fail');

    return (
        <div>
            <div className={`drop-zone ${dragOver ? 'drop-zone-active' : ''}`} onDragOver={(e) => { e.preventDefault(); setDragOver(true); }} onDragLeave={() => setDragOver(false)} onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }} onClick={() => document.getElementById('epub-file-input').click()}>
                <input id="epub-file-input" type="file" accept=".epub" hidden onChange={(e) => handleFile(e.target.files[0])} />
                <div className="drop-zone-icon">📥</div>
                <p className="drop-zone-text">Drop your .epub file here or click to browse</p>
                {file && <p className="drop-zone-file">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>}
            </div>

            {fileError && (
                <div style={{ background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: '8px', padding: '16px', marginTop: '20px', color: '#c53030' }}>
                    <strong>Wrong file type</strong>
                    <p style={{margin: '4px 0 0 0', fontSize: '0.9rem'}}>{fileError}</p>
                </div>
            )}

            {loading && <div className="loading-state"><div className="spinner" /> Validating...</div>}

            {results && !loading && (
                <>
                    <div className="validation-results">
                        <div className="val-summary">
                            <div className="val-score">
                                <span className="val-score-num">{results.passCount}</span>
                                <span className="val-score-denom">/{results.total}</span>
                            </div>
                            <p className="val-score-label">
                                {results.passCount === results.total ? 'All checks passed! ✨' : results.passCount >= results.total - 2 ? 'Looking good, minor issues.' : 'Some issues found — review below.'}
                            </p>
                        </div>

                        {hasFails && (
                            <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
                                <h3 style={{fontSize: '1.1rem', fontWeight: 700, marginBottom: '8px'}}>Your EPUB will be rejected by KDP</h3>
                                <p style={{fontSize: '0.95rem', color: '#ccc', marginBottom: '20px'}}>{failCount} critical {failCount === 1 ? 'issue' : 'issues'} found. BookKraft Pro auto-fixes all of them in under 2 minutes.</p>
                                <a href="/signup?plan=pro" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '12px 28px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '1rem' }}>🔧 Auto-Fix My EPUB — Start Free Trial</a>
                                <p style={{fontSize: '0.8rem', color: '#999', marginTop: '12px'}}>No credit card required. Cancel anytime.</p>
                            </div>
                        )}

                        {!hasFails && results.passCount === results.total && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '24px', marginBottom: '24px', textAlign: 'center' }}>
                                <h3 style={{fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '8px'}}>✅ Your EPUB is KDP-ready</h3>
                                <p style={{fontSize: '0.95rem', color: '#166534', marginBottom: '20px'}}>Great job. Want to make sure your metadata and TOC are perfect too?</p>
                                <div style={{display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap'}}>
                                    <a href="/tools/metadata-builder" style={{ display: 'inline-block', background: '#fff', color: '#166534', border: '1px solid #166534', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Check Metadata →</a>
                                    <a href="/signup?plan=pro" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Get All 12 Tools — $9.99</a>
                                </div>
                            </div>
                        )}

                        <div className="val-checks">
                            {results.checks.map((c, i) => (
                                <div key={i} className={`val-check ${statusClass(c.status)}`}>
                                    <span className="val-check-icon">{statusIcon(c.status)}</span>
                                    <div style={{flex: 1}}>
                                        <strong>{c.name}</strong>
                                        <p>{c.detail}</p>
                                        {c.fixLink && (
                                            <a href={c.fixLink} style={{ display: 'inline-block', marginTop: '8px', color: '#b8860b', fontSize: '0.85rem', fontWeight: 600, textDecoration: 'none' }}>
                                                → Fix this with {c.fixLink.includes('metadata') ? 'Metadata Builder' : c.fixLink.includes('toc') ? 'TOC Generator' : 'Kindle Format Fixer'}
                                            </a>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    <UpsellBanner toolName="EPUB Validator" />
                </>
            )}
           <StickyUpgradeBanner />
        </div>
    );
}