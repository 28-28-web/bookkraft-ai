'use client';

import { useState, useCallback } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useRouter } from 'next/navigation';

export default function EpubValidatorPremium() {
    const { user, profile, refreshProfile } = useAuth();
    const router = useRouter();
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [fileError, setFileError] = useState(null);
    const [creditError, setCreditError] = useState(null);

    const validate = useCallback(async (epubFile) => {
        if (!user) {
            router.push('/login?redirect=/tools/epub-validator-premium');
            return;
        }
        if (!profile || (profile.credits_balance || 0) < 2) {
            setCreditError('You need 2 credits to run a premium validation. Purchase credits to continue.');
            return;
        }

        setLoading(true);
        setResults(null);
        setFileError(null);
        setCreditError(null);

        try {
            // Credits deducted server-side after validation completes
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(epubFile);
            const checks = [];
            const storeReport = { kdp: [], appleBooks: [], googlePlay: [] };

            // ── 1. Mimetype ──
            const mimetype = zip.file('mimetype');
            if (mimetype) {
                const content = await mimetype.async('string');
                const valid = content.trim() === 'application/epub+zip';
                checks.push({
                    name: 'Mimetype',
                    status: valid ? 'pass' : 'fail',
                    detail: valid ? 'Valid mimetype present.' : 'Invalid mimetype — file may be corrupted.',
                    stores: { kdp: valid, appleBooks: valid, googlePlay: valid },
                });
            } else {
                checks.push({ name: 'Mimetype', status: 'fail', detail: 'Missing mimetype file.', stores: { kdp: false, appleBooks: false, googlePlay: false } });
            }

            // ── 2. Container ──
            const container = zip.file('META-INF/container.xml');
            let opfPath = 'OEBPS/content.opf';
            if (container) {
                const containerXml = await container.async('string');
                const match = containerXml.match(/full-path="([^"]+)"/);
                if (match) opfPath = match[1];
                checks.push({ name: 'Container', status: 'pass', detail: `container.xml found. Rootfile: ${opfPath}`, stores: { kdp: true, appleBooks: true, googlePlay: true } });
            } else {
                checks.push({ name: 'Container', status: 'fail', detail: 'Missing META-INF/container.xml — all stores will reject this file.', stores: { kdp: false, appleBooks: false, googlePlay: false } });
            }

            // ── 3. OPF ──
            const opf = zip.file(opfPath);
            let opfContent = '';
            if (opf) {
                opfContent = await opf.async('string');
                checks.push({ name: 'OPF Package', status: 'pass', detail: `Found at ${opfPath}`, stores: { kdp: true, appleBooks: true, googlePlay: true } });
            } else {
                checks.push({ name: 'OPF Package', status: 'fail', detail: 'OPF file missing — book structure is broken.', stores: { kdp: false, appleBooks: false, googlePlay: false } });
            }

            // ── 4. Metadata ──
            if (opfContent) {
                const hasTitle = /<dc:title/i.test(opfContent);
                const hasLang = /<dc:language/i.test(opfContent);
                const hasId = /<dc:identifier/i.test(opfContent);
                const missing = [];
                if (!hasTitle) missing.push('title');
                if (!hasLang) missing.push('language');
                if (!hasId) missing.push('identifier');
                const pass = missing.length === 0;
                checks.push({
                    name: 'Required Metadata',
                    status: pass ? 'pass' : 'fail',
                    detail: pass ? 'Title, language, and identifier all present.' : `Missing: ${missing.join(', ')}`,
                    stores: { kdp: pass, appleBooks: pass, googlePlay: pass },
                });
            }

            // ── 5. Spine ──
            if (opfContent) {
                const spineMatch = opfContent.match(/<spine[^>]*>([\s\S]*?)<\/spine>/);
                if (spineMatch) {
                    const items = [...spineMatch[1].matchAll(/idref="([^"]+)"/g)];
                    const pass = items.length > 0;
                    checks.push({
                        name: 'Spine Order',
                        status: pass ? 'pass' : 'fail',
                        detail: pass ? `${items.length} spine items found.` : 'No spine items — reading order undefined.',
                        stores: { kdp: pass, appleBooks: pass, googlePlay: pass },
                    });
                }
            }

            // ── 6. OPF Manifest Cross-check ──
            if (opfContent) {
                const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/') + 1) : '';
                const manifestItems = [...opfContent.matchAll(/href="([^"#]+)"/g)].map(m => m[1]);
                const missingFiles = [];
                const extraFiles = [];

                for (const href of manifestItems) {
                    const fullPath = opfDir + href;
                    if (!zip.file(fullPath) && !zip.file(href)) missingFiles.push(href);
                }

                // Check for HTML files in zip not in manifest
                zip.forEach((relativePath) => {
                    if (relativePath.endsWith('.xhtml') || relativePath.endsWith('.html')) {
                        const filename = relativePath.includes('/') ? relativePath.split('/').pop() : relativePath;
                        const inManifest = manifestItems.some(m => m.includes(filename));
                        if (!inManifest) extraFiles.push(relativePath);
                    }
                });

                const pass = missingFiles.length === 0 && extraFiles.length === 0;
                const detail = pass
                    ? `All ${manifestItems.length} manifest items verified.`
                    : [
                        missingFiles.length > 0 ? `${missingFiles.length} listed file(s) missing from EPUB: ${missingFiles.slice(0, 3).join(', ')}` : '',
                        extraFiles.length > 0 ? `${extraFiles.length} file(s) in EPUB not listed in manifest: ${extraFiles.slice(0, 3).join(', ')}` : '',
                    ].filter(Boolean).join(' | ');

                checks.push({
                    name: 'OPF Manifest Cross-check',
                    status: pass ? 'pass' : missingFiles.length > 0 ? 'fail' : 'warn',
                    detail,
                    stores: { kdp: missingFiles.length === 0, appleBooks: pass, googlePlay: missingFiles.length === 0 },
                });
            }

            // ── 7. Navigation (NCX + nav) ──
            if (opfContent) {
                const hasNav = /properties="[^"]*nav[^"]*"/.test(opfContent);
                const hasNcx = /media-type="application\/x-dtbncx\+xml"/.test(opfContent);
                const status = hasNav && hasNcx ? 'pass' : hasNav || hasNcx ? 'warn' : 'fail';
                const detail = hasNav && hasNcx
                    ? 'Both EPUB3 nav.xhtml and NCX present — compatible with all devices.'
                    : hasNav ? 'Only EPUB3 nav found. NCX missing — older Kindles may have no navigation.'
                    : hasNcx ? 'Only NCX found. EPUB3 nav missing — Apple Books may flag this.'
                    : 'No navigation found — readers cannot jump between chapters.';
                checks.push({
                    name: 'Navigation (NCX + Nav)',
                    status,
                    detail,
                    stores: { kdp: hasNcx || hasNav, appleBooks: hasNav, googlePlay: hasNav },
                });
            }

            // ── 8. Ghost Spacing ──
            const opfDir = opfPath.includes('/') ? opfPath.substring(0, opfPath.lastIndexOf('/') + 1) : '';
            let totalGhostTags = 0;
            let ghostFiles = [];
            const htmlFiles = [];
            zip.forEach((relativePath, file) => {
                if ((relativePath.endsWith('.xhtml') || relativePath.endsWith('.html')) && !relativePath.includes('nav') && !relativePath.includes('toc')) {
                    htmlFiles.push({ path: relativePath, file });
                }
            });

            for (const { path, file } of htmlFiles.slice(0, 20)) {
                const content = await file.async('string');
                const emptySpans = (content.match(/<span[^>]*>\s*<\/span>/gi) || []).length;
                const zeroFontSpans = (content.match(/font-size:\s*0/gi) || []).length;
                const count = emptySpans + zeroFontSpans;
                if (count > 0) {
                    totalGhostTags += count;
                    ghostFiles.push({ path: path.split('/').pop(), count });
                }
            }

            const ghostPass = totalGhostTags === 0;
            const ghostStatus = totalGhostTags === 0 ? 'pass' : totalGhostTags < 20 ? 'warn' : 'fail';
            checks.push({
                name: 'Ghost Spacing',
                status: ghostStatus,
                detail: ghostPass
                    ? 'No ghost spacing detected. HTML is clean.'
                    : `${totalGhostTags} empty span tags found across ${ghostFiles.length} file(s). This causes broken formatting on older Kindles and strict validators.${ghostFiles.length > 0 ? ' Worst: ' + ghostFiles.sort((a,b) => b.count - a.count).slice(0,2).map(f => `${f.path} (${f.count})`).join(', ') : ''}`,
                stores: { kdp: totalGhostTags < 50, appleBooks: ghostPass, googlePlay: totalGhostTags < 20 },
            });

            // ── 9. Duplicate IDs ──
            let totalDuplicates = 0;
            const allIds = [];
            for (const { file } of htmlFiles.slice(0, 20)) {
                const content = await file.async('string');
                const ids = [...content.matchAll(/\sid="([^"]+)"/g)].map(m => m[1]);
                allIds.push(...ids);
            }
            const idCounts = allIds.reduce((acc, id) => { acc[id] = (acc[id] || 0) + 1; return acc; }, {});
            const duplicateIds = Object.entries(idCounts).filter(([, count]) => count > 1).map(([id]) => id);
            totalDuplicates = duplicateIds.length;

            checks.push({
                name: 'Duplicate IDs',
                status: totalDuplicates === 0 ? 'pass' : 'fail',
                detail: totalDuplicates === 0
                    ? 'No duplicate IDs found.'
                    : `${totalDuplicates} duplicate ID(s) detected: ${duplicateIds.slice(0, 5).join(', ')}. Apple Books hard-fails on duplicate IDs.`,
                stores: { kdp: true, appleBooks: totalDuplicates === 0, googlePlay: totalDuplicates === 0 },
            });

            // ── 10. Cover Image Dimensions ──
            let coverCheck = { name: 'Cover Dimensions', status: 'skip', detail: 'No cover image found in manifest.', stores: { kdp: null, appleBooks: null, googlePlay: null } };
            if (opfContent) {
                const coverMatch = opfContent.match(/properties="[^"]*cover-image[^"]*"[^>]*href="([^"]+)"/);
                const coverHref = coverMatch ? coverMatch[1] : null;
                if (coverHref) {
                    const coverPath = opfDir + coverHref;
                    const coverFile = zip.file(coverPath) || zip.file(coverHref);
                    if (coverFile) {
                        const coverBlob = await coverFile.async('blob');
                        const img = await new Promise((resolve) => {
                            const i = new Image();
                            i.onload = () => resolve(i);
                            i.onerror = () => resolve(null);
                            i.src = URL.createObjectURL(coverBlob);
                        });
                        if (img) {
                            const w = img.naturalWidth;
                            const h = img.naturalHeight;
                            const kdpOk = h >= 1000 && w >= 625;
                            const appleOk = h >= 1400 && w >= 1400 * (w/h);
                            const ratio = (h / w).toFixed(2);
                            const idealRatio = ratio >= 1.5 && ratio <= 1.6;
                            coverCheck = {
                                name: 'Cover Dimensions',
                                status: kdpOk && appleOk ? 'pass' : 'warn',
                                detail: `Cover: ${w}×${h}px (ratio ${ratio}:1). ${!kdpOk ? 'Below KDP minimum (625×1000px). ' : ''}${!appleOk ? 'Below Apple Books recommended (1400px min). ' : ''}${!idealRatio ? 'Ideal ratio is 1.5–1.6:1 (e.g. 1600×2560px).' : 'Dimensions look good.'}`,
                                stores: { kdp: kdpOk, appleBooks: appleOk, googlePlay: kdpOk },
                            };
                        }
                    }
                }
            }
            checks.push(coverCheck);

            // ── 11. File Size ──
            const sizeMB = (epubFile.size / 1024 / 1024).toFixed(1);
            checks.push({
                name: 'File Size',
                status: epubFile.size < 650 * 1024 * 1024 ? 'pass' : 'fail',
                detail: `${sizeMB} MB — ${epubFile.size < 650 * 1024 * 1024 ? 'within KDP limit (650 MB).' : 'exceeds KDP 650 MB limit.'}`,
                stores: { kdp: epubFile.size < 650 * 1024 * 1024, appleBooks: epubFile.size < 2000 * 1024 * 1024, googlePlay: true },
            });

            // ── Build store report ──
            const stores = ['kdp', 'appleBooks', 'googlePlay'];
            const storeNames = { kdp: 'KDP', appleBooks: 'Apple Books', googlePlay: 'Google Play' };
            const storeResults = {};
            for (const store of stores) {
                const fails = checks.filter(c => c.stores && c.stores[store] === false);
                storeResults[store] = {
                    name: storeNames[store],
                    pass: fails.length === 0,
                    issues: fails.map(c => c.name),
                };
            }

            const passCount = checks.filter(c => c.status === 'pass').length;

            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'epub_premium_validated', {
                    issue_count: checks.length - passCount,
                    ghost_tags: totalGhostTags,
                    duplicate_ids: totalDuplicates,
                });
            }

            const creditRes = await fetch('/api/tools/epub-validator-premium', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ filename: epubFile.name, results: { passCount, total: checks.length } }),
});
if (!creditRes.ok) {
    setCreditError('Validation complete but credits could not be processed. Please contact support.');
}

await refreshProfile();
setResults({ checks, passCount, total: checks.length, filename: epubFile.name, sizeMB, storeResults });

        } catch (err) {
            setResults({
                checks: [{ name: 'File Parse', status: 'fail', detail: `Could not read EPUB: ${err.message}` }],
                passCount: 0, total: 1, filename: epubFile.name, storeResults: {},
            });
        }

        setLoading(false);
    }, [user, profile]);

    const handleFile = (f) => {
        if (!f) return;
        if (!f.name.toLowerCase().endsWith('.epub')) {
            setFileError(`"${f.name}" is not an EPUB file.`);
            setFile(null);
            setResults(null);
            return;
        }
        setFileError(null);
        setFile(f);
        validate(f);
    };

    const downloadReport = () => {
        if (!results) return;
        const rows = results.checks.map(c => `
            <tr>
                <td>${c.name}</td>
                <td style="color:${c.status === 'pass' ? 'green' : c.status === 'fail' ? 'red' : 'orange'}">${c.status.toUpperCase()}</td>
                <td>${c.detail}</td>
                <td>${c.stores ? Object.entries(c.stores).map(([s, v]) => `${s}: ${v === null ? '—' : v ? '✓' : '✗'}`).join(' | ') : '—'}</td>
            </tr>`).join('');
        const html = `<!DOCTYPE html><html><head><meta charset="utf-8"><title>EPUB Validation Report — ${results.filename}</title>
        <style>body{font-family:sans-serif;padding:32px;max-width:900px;margin:0 auto}h1{font-size:1.4rem}table{width:100%;border-collapse:collapse;margin-top:24px}th,td{text-align:left;padding:10px 12px;border-bottom:1px solid #e5e7eb;font-size:0.9rem}th{background:#f9fafb;font-weight:600}</style></head>
        <body><h1>EPUB Validation Report</h1><p>File: <strong>${results.filename}</strong> — ${results.passCount}/${results.total} checks passed</p>
        <table><thead><tr><th>Check</th><th>Status</th><th>Detail</th><th>Stores</th></tr></thead><tbody>${rows}</tbody></table>
        <p style="margin-top:32px;font-size:0.8rem;color:#6b7280">Generated by BookKraft AI EPUB Validator Pro — bookkraftai.com</p></body></html>`;
        const blob = new Blob([html], { type: 'text/html' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `epub-validation-${results.filename.replace('.epub', '')}.html`;
        a.click();
        URL.revokeObjectURL(url);
    };

    const statusIcon = (s) => ({ pass: '✅', fail: '❌', warn: '⚠️', skip: '⏭️' }[s] || '❓');
    const statusClass = (s) => ({ pass: 'val-pass', fail: 'val-fail', warn: 'val-warn', skip: 'val-skip' }[s] || '');

    return (
        <div>
            {/* Credit notice */}
            {!results && (
                <div style={{ background: '#fef9f0', border: '1px solid #f0c070', borderRadius: '10px', padding: '14px 18px', marginBottom: '20px', fontSize: '0.9rem', color: '#92600a' }}>
                    <strong>2 credits per scan.</strong> Includes ghost spacing detection, duplicate ID scan, OPF manifest cross-check, cover dimensions, and store-specific report.
                </div>
            )}

            {/* Credit error */}
            {creditError && (
                <div style={{ background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: '10px', padding: '16px', marginBottom: '20px', color: '#c53030' }}>
                    <strong>Not enough credits</strong>
                    <p style={{ margin: '6px 0 12px', fontSize: '0.9rem' }}>{creditError}</p>
                    <a href="/pricing" style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                        Buy Credits →
                    </a>
                </div>
            )}

            {/* Upload */}
            {!results && !creditError && (
                <div
                    className={`drop-zone ${dragOver ? 'drop-zone-active' : ''}`}
                    onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                    onDragLeave={() => setDragOver(false)}
                    onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                    onClick={() => document.getElementById('epub-premium-input').click()}
                >
                    <input id="epub-premium-input" type="file" accept=".epub" hidden onChange={(e) => handleFile(e.target.files[0])} />
                    <div className="drop-zone-icon">📥</div>
                    <p className="drop-zone-text">Drop your .epub file here or click to browse</p>
                    {file && <p className="drop-zone-file">{file.name}</p>}
                </div>
            )}

            {fileError && (
                <div style={{ background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: '8px', padding: '16px', marginTop: '20px', color: '#c53030' }}>
                    {fileError}
                </div>
            )}

            {loading && (
                <div className="loading-state">
                    <div className="spinner" />
                    Running deep validation — checking ghost spacing, duplicate IDs, manifest, cover dimensions...
                </div>
            )}

            {/* Results */}
            {results && (
                <div className="validation-results">
                    {/* Score */}
                    <div className="val-summary">
                        <div className="val-score">
                            <span className="val-score-num">{results.passCount}</span>
                            <span className="val-score-denom">/{results.total}</span>
                        </div>
                        <p className="val-score-label">
                            {results.passCount === results.total ? 'Perfect — all checks passed ✨' : `${results.total - results.passCount} issue(s) found`}
                        </p>
                    </div>

                    {/* Store report */}
                    {results.storeResults && Object.keys(results.storeResults).length > 0 && (
                        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '12px', marginBottom: '24px' }}>
                            {Object.entries(results.storeResults).map(([key, store]) => (
                                <div key={key} style={{ background: store.pass ? '#f0fdf4' : '#fff5f5', border: `1px solid ${store.pass ? '#86efac' : '#fca5a5'}`, borderRadius: '10px', padding: '16px', textAlign: 'center' }}>
                                    <div style={{ fontSize: '1.4rem', marginBottom: '4px' }}>{store.pass ? '✅' : '❌'}</div>
                                    <div style={{ fontWeight: 700, fontSize: '0.95rem', color: store.pass ? '#166534' : '#c53030' }}>{store.name}</div>
                                    <div style={{ fontSize: '0.8rem', color: store.pass ? '#166534' : '#c53030', marginTop: '4px' }}>
                                        {store.pass ? 'Ready to upload' : `${store.issues.length} issue(s)`}
                                    </div>
                                    {!store.pass && store.issues.length > 0 && (
                                        <div style={{ fontSize: '0.75rem', color: '#6b7280', marginTop: '6px' }}>
                                            {store.issues.join(', ')}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Download report */}
                    <button
                        onClick={downloadReport}
                        style={{ display: 'flex', alignItems: 'center', gap: '8px', background: '#1a1a1a', color: '#fff', padding: '11px 20px', borderRadius: '8px', fontWeight: 600, fontSize: '0.9rem', border: 'none', cursor: 'pointer', marginBottom: '20px' }}
                    >
                        📄 Download Full Report
                    </button>

                    {/* Checks */}
                    <div className="val-checks">
                        {results.checks.map((c, i) => (
                            <div key={i} className={`val-check ${statusClass(c.status)}`}>
                                <span className="val-check-icon">{statusIcon(c.status)}</span>
                                <div style={{ flex: 1 }}>
                                    <strong>{c.name}</strong>
                                    <p>{c.detail}</p>
                                    {c.stores && (
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '6px', flexWrap: 'wrap' }}>
                                            {Object.entries(c.stores).map(([store, pass]) => pass !== null && (
                                                <span key={store} style={{ fontSize: '0.75rem', padding: '2px 8px', borderRadius: '99px', background: pass ? '#f0fdf4' : '#fff5f5', color: pass ? '#166534' : '#c53030', border: `1px solid ${pass ? '#86efac' : '#fca5a5'}` }}>
                                                    {store === 'kdp' ? 'KDP' : store === 'appleBooks' ? 'Apple Books' : 'Google Play'} {pass ? '✓' : '✗'}
                                                </span>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Validate another */}
                    <button
                        onClick={() => { setResults(null); setFile(null); }}
                        style={{ marginTop: '20px', background: 'transparent', border: '1px solid #d1d5db', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', fontSize: '0.9rem', color: '#374151' }}
                    >
                        Validate another file
                    </button>
                </div>
            )}
        </div>
    );
}