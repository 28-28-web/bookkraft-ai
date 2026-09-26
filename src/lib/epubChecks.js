// Pure EPUB structure checks. Lifted verbatim from EpubValidator.js so the
// validator tool and the readiness report share one copy of every rule.
// Input: a loaded JSZip instance + the file's byte size.
// Output: { checks, passCount, total } — no tracking, no gtag, no UI.
export async function runEpubChecks(zip, fileSize) {
    const checks = [];
    let passCount = 0;

    const mimetype = zip.file('mimetype');
    if (mimetype) {
        const content = await mimetype.async('string');
        if (content.trim() === 'application/epub+zip') {
            checks.push({ name: 'Mimetype', status: 'pass', detail: 'Valid mimetype present.' });
            passCount++;
        } else {
            checks.push({ name: 'Mimetype', status: 'fail', detail: "KDP can't read your file type. Your EPUB is corrupted or was exported incorrectly.", fixLink: '/epub-errors/invalid-mimetype', fixTool: 'Fix Guide' });
        }
    } else {
        checks.push({ name: 'Mimetype', status: 'fail', detail: "KDP can't read your file type. Your EPUB is corrupted or was exported with wrong settings.", fixLink: '/epub-errors/invalid-mimetype', fixTool: 'Fix Guide' });
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
            // Point at the specific error guide for the missing field;
            // identifier takes priority (highest search intent), then
            // language. Title-only falls back to the Metadata Builder tool.
            let metaFixLink = '/tools/metadata-builder';
            let metaFixTool = 'Metadata Builder';
            if (!hasId) { metaFixLink = '/epub-errors/unique-identifier-not-found'; metaFixTool = 'Fix Guide'; }
            else if (!hasLang) { metaFixLink = '/epub-errors/missing-language-declaration'; metaFixTool = 'Fix Guide'; }
            checks.push({ name: 'Required Metadata', status: 'fail', detail: `Missing ${missing.join(', ')} — incomplete metadata is likely to cause problems on KDP.`, fixLink: metaFixLink, fixTool: metaFixTool });
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
            checks.push({ name: 'Manifest Files', status: 'warn', detail: `${missing} files referenced in your EPUB are missing. This causes blank pages or broken images on Kindle.`, fixLink: '/epub-errors/missing-manifest-resource', fixTool: 'Fix Guide' });
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
            checks.push({ name: 'Navigation', status: 'warn', detail: "No table of contents found — readers can't jump between chapters on Kindle.", fixLink: '/epub-errors/missing-nav-document', fixTool: 'Fix Guide' });
        }
    }

    if (opfContent) {
        const hasCover = /properties="[^"]*cover-image[^"]*"/.test(opfContent) || /name="cover"/.test(opfContent);
        if (hasCover) {
            checks.push({ name: 'Cover Image', status: 'pass', detail: 'Cover image referenced in metadata.' });
            passCount++;
        } else {
            checks.push({ name: 'Cover Image', status: 'warn', detail: 'No cover image detected — some stores require this for listing.', fixLink: '/epub-errors/cover-image-not-declared', fixTool: 'Fix Guide' });
        }
    }

    const sizeMB = (fileSize / 1024 / 1024).toFixed(1);
    if (fileSize < 650 * 1024 * 1024) {
        checks.push({ name: 'File Size', status: 'pass', detail: `${sizeMB} MB (KDP limit: 650 MB)` });
        passCount++;
    } else {
        checks.push({ name: 'File Size', status: 'fail', detail: `${sizeMB} MB exceeds KDP 650 MB limit. Compress images or split into volumes.` });
    }

    return { checks, passCount, total: checks.length };
}
