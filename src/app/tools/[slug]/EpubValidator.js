'use client';

import { useState, useCallback } from 'react';

export default function EpubValidator() {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);

    const validate = useCallback(async (epubFile) => {
        setLoading(true);
        setResults(null);

        try {
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(epubFile);
            const checks = [];
            let passCount = 0;

            // 1. Mimetype file
            const mimetype = zip.file('mimetype');
            if (mimetype) {
                const content = await mimetype.async('string');
                if (content.trim() === 'application/epub+zip') {
                    checks.push({ name: 'Mimetype', status: 'pass', detail: 'Valid mimetype present.' });
                    passCount++;
                } else {
                    checks.push({ name: 'Mimetype', status: 'fail', detail: `Invalid mimetype: "${content.trim()}"` });
                }
            } else {
                checks.push({ name: 'Mimetype', status: 'fail', detail: 'Missing mimetype file — this will fail on upload.' });
            }

            // 2. META-INF/container.xml
            const container = zip.file('META-INF/container.xml');
            let opfPath = 'OEBPS/content.opf';
            if (container) {
                const containerXml = await container.async('string');
                const match = containerXml.match(/full-path="([^"]+)"/);
                if (match) { opfPath = match[1]; }
                checks.push({ name: 'Container', status: 'pass', detail: `container.xml found, rootfile: ${opfPath}` });
                passCount++;
            } else {
                checks.push({ name: 'Container', status: 'fail', detail: 'Missing META-INF/container.xml' });
            }

            // 3. OPF file
            const opf = zip.file(opfPath);
            let opfContent = '';
            if (opf) {
                opfContent = await opf.async('string');
                checks.push({ name: 'OPF Package', status: 'pass', detail: `Found at ${opfPath}` });
                passCount++;
            } else {
                checks.push({ name: 'OPF Package', status: 'fail', detail: `OPF not found at ${opfPath}` });
            }

            // 4. Required metadata
            if (opfContent) {
                const hasTitle = /<dc:title/i.test(opfContent);
                const hasLang = /<dc:language/i.test(opfContent);
                const hasId = /<dc:identifier/i.test(opfContent);
                if (hasTitle && hasLang && hasId) {
                    checks.push({ name: 'Required Metadata', status: 'pass', detail: 'Title, language, and identifier present.' });
                    passCount++;
                } else {
                    const missing = [];
                    if (!hasTitle) missing.push('dc:title');
                    if (!hasLang) missing.push('dc:language');
                    if (!hasId) missing.push('dc:identifier');
                    checks.push({ name: 'Required Metadata', status: 'fail', detail: `Missing: ${missing.join(', ')}` });
                }
            } else {
                checks.push({ name: 'Required Metadata', status: 'skip', detail: 'Skipped — OPF not found' });
            }

            // 5. Spine items
            if (opfContent) {
                const spineMatch = opfContent.match(/<spine[^>]*>([\s\S]*?)<\/spine>/);
                if (spineMatch) {
                    const idrefMatches = [...spineMatch[1].matchAll(/idref="([^"]+)"/g)].map((m) => m[1]);
                    if (idrefMatches.length > 0) {
                        checks.push({ name: 'Spine', status: 'pass', detail: `${idrefMatches.length} items in spine.` });
                        passCount++;
                    } else {
                        checks.push({ name: 'Spine', status: 'fail', detail: 'Spine is empty — no reading order defined.' });
                    }
                } else {
                    checks.push({ name: 'Spine', status: 'fail', detail: 'No <spine> element found in OPF.' });
                }
            }

            // 6. Manifest references
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
                    checks.push({ name: 'Manifest Files', status: 'warn', detail: `${missing} of ${hrefMatches.length} files referenced in manifest not found.` });
                }
            }

            // 7. Nav document
            if (opfContent) {
                const hasNav = /properties="[^"]*nav[^"]*"/.test(opfContent);
                const hasNcx = /media-type="application\/x-dtbncx\+xml"/.test(opfContent);
                if (hasNav || hasNcx) {
                    checks.push({ name: 'Navigation', status: 'pass', detail: `${hasNav ? 'EPUB3 nav' : ''}${hasNav && hasNcx ? ' + ' : ''}${hasNcx ? 'NCX' : ''} found.` });
                    passCount++;
                } else {
                    checks.push({ name: 'Navigation', status: 'warn', detail: 'No nav document or NCX found — TOC may not work.' });
                }
            }

            // 8. Cover image
            if (opfContent) {
                const hasCover = /properties="[^"]*cover-image[^"]*"/.test(opfContent) || /name="cover"/.test(opfContent);
                if (hasCover) {
                    checks.push({ name: 'Cover Image', status: 'pass', detail: 'Cover image referenced in metadata.' });
                    passCount++;
                } else {
                    checks.push({ name: 'Cover Image', status: 'warn', detail: 'No cover image meta tag found — some stores require this.' });
                }
            }

            // 9. File size
            const sizeMB = (epubFile.size / 1024 / 1024).toFixed(1);
            if (epubFile.size < 650 * 1024 * 1024) {
                checks.push({ name: 'File Size', status: 'pass', detail: `${sizeMB} MB (KDP limit: 650 MB)` });
                passCount++;
            } else {
                checks.push({ name: 'File Size', status: 'fail', detail: `${sizeMB} MB exceeds KDP 650 MB limit.` });
            }

            setResults({ checks, passCount, total: checks.length, filename: epubFile.name, sizeMB });

        } catch (err) {
            setResults({
                checks: [{ name: 'File Parse', status: 'fail', detail: `Could not read EPUB: ${err.message}. Is this a valid .epub file?` }],
                passCount: 0, total: 1, filename: epubFile.name,
            });
        }

        setLoading(false);
    }, []);

    const handleFile = (f) => {
        if (!f) return;
        setFile(f);
        validate(f);
    };

    const statusIcon = (s) => ({ pass: '✅', fail: '❌', warn: '⚠️', skip: '⏭️' }[s] || '❓');
    const statusClass = (s) => ({ pass: 'val-pass', fail: 'val-fail', warn: 'val-warn', skip: 'val-skip' }[s] || '');

    return (
        <div>
            {/* Drop zone */}
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

            {/* Loading */}
            {loading && <div className="loading-state"><div className="spinner" /> Validating...</div>}

            {/* Results */}
            {results && !loading && (
                <div className="validation-results">
                    <div className="val-summary">
                        <div className="val-score">
                            <span className="val-score-num">{results.passCount}</span>
                            <span className="val-score-denom">/{results.total}</span>
                        </div>
                        <p className="val-score-label">
                            {results.passCount === results.total ? 'All checks passed! ✨' :
                                results.passCount >= results.total - 2 ? 'Looking good, minor issues.' : 'Some issues found — review below.'}
                        </p>
                    </div>

                    <div className="val-checks">
                        {results.checks.map((c, i) => (
                            <div key={i} className={`val-check ${statusClass(c.status)}`}>
                                <span className="val-check-icon">{statusIcon(c.status)}</span>
                                <div>
                                    <strong>{c.name}</strong>
                                    <p>{c.detail}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}
