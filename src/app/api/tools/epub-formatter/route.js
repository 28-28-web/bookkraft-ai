import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/lib/toolAccess';

function getMediaType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    return { jpg: 'image/jpeg', jpeg: 'image/jpeg', png: 'image/png', gif: 'image/gif', webp: 'image/webp', svg: 'image/svg+xml' }[ext] || 'image/jpeg';
}

/**
 * Escape XHTML-significant characters, then convert inline markdown emphasis.
 * Escaping runs first so that the <strong>/<em> tags emitted here survive it;
 * only < and > are escaped, which leaves the asterisk patterns intact to match.
 * Bold is matched before italic so ** is never consumed as two single *.
 * Never call this on image alt text - see renderParagraph.
 */
function renderInline(text) {
    return text
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/\*\*(?=\S)([\s\S]*?\S)\*\*/g, '<strong>$1</strong>')
        .replace(/(^|[^*])\*(?=\S)([^*]*?\S)\*(?!\*)/g, '$1<em>$2</em>');
}

/**
 * Markdown pipe-table support.
 *
 * A table is a header row, a |---|---| separator row, then body rows - all
 * consecutive lines, so the block reaches this file intact from the paragraph
 * splitter. Cells run through renderInline, so they get the same escaping and
 * bold/italic handling as ordinary prose.
 */
const isTableRow = (line) => {
    const t = line.trim();
    return t.length > 1 && t.startsWith('|') && t.endsWith('|');
};

const splitTableRow = (line) =>
    line
        .trim()
        .replace(/^[|]/, '')
        .replace(/[|]$/, '')
        .split('|')
        .map((c) => c.trim());

const isTableSeparatorRow = (line) =>
    isTableRow(line) && splitTableRow(line).every((c) => /^:?-+:?$/.test(c));

function renderTable(lines) {
    const header = splitTableRow(lines[0]);
    const aligns = splitTableRow(lines[1]).map((c) => {
        if (/^:-+:$/.test(c)) return 'center';
        if (/^-+:$/.test(c)) return 'right';
        return '';
    });
    const cell = (tag, text, i) => {
        const align = aligns[i] ? ` style="text-align:${aligns[i]}"` : '';
        return `<${tag}${align}>${renderInline(text || '')}</${tag}>`;
    };
    const head = header.map((c, i) => cell('th', c, i)).join('');
    const body = lines
        .slice(2)
        .map((line) => {
            const cells = splitTableRow(line);
            // Pad or trim each row to the header's column count so a malformed
            // row still produces a rectangular table instead of broken markup.
            const row = Array.from({ length: header.length }, (_, i) => cell('td', cells[i], i));
            return `        <tr>${row.join('')}</tr>`;
        })
        .join('\n');
    return [
        '    <table>',
        `      <thead><tr>${head}</tr></thead>`,
        '      <tbody>',
        body,
        '      </tbody>',
        '    </table>',
    ].join('\n');
}

/**
 * Render one paragraph block to XHTML, handling inline image references.
 * Supports two forms:
 *   - Whole paragraph = ![alt](filename) → <figure><img .../></figure>
 *   - Image inline among text  → <p>text <img .../> text</p>
 * Images not in imageMap (not uploaded) fall back to escaped literal text.
 */
function renderParagraph(text, imageMap) {
    const trimmed = text.trim();
    if (!trimmed) return null;

    // Tables are block-level: pull one out before any paragraph handling so its
    // rows are never flattened into a single <p>. Text on either side of the
    // table within the same block still renders normally.
    const blockLines = trimmed.split('\n');
    const tableStart = blockLines.findIndex(
        (line, i) =>
            isTableRow(line) && i + 1 < blockLines.length && isTableSeparatorRow(blockLines[i + 1])
    );
    if (tableStart !== -1) {
        let tableEnd = tableStart + 2;
        while (tableEnd < blockLines.length && isTableRow(blockLines[tableEnd])) tableEnd++;
        const before = blockLines.slice(0, tableStart).join('\n').trim();
        const after = blockLines.slice(tableEnd).join('\n').trim();
        return [
            before && renderParagraph(before, imageMap),
            renderTable(blockLines.slice(tableStart, tableEnd)),
            after && renderParagraph(after, imageMap),
        ]
            .filter(Boolean)
            .join('\n');
    }

    const hasImage = /!\[[^\]]*\]\([^)]+\)/.test(trimmed);
    if (!hasImage) {
        return `    <p>${renderInline(trimmed)}</p>`;
    }

    // Entire paragraph is a single image ref
    const imageOnlyMatch = trimmed.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
    if (imageOnlyMatch) {
        const alt = imageOnlyMatch[1].replace(/"/g, '&quot;');
        const rawFile = imageOnlyMatch[2].split('/').pop();
        if (imageMap[rawFile]) {
            return `    <figure><img src="images/${imageMap[rawFile].safeFilename}" alt="${alt}"/></figure>`;
        }
        return `    <p>${trimmed.replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`;
    }

    // Inline images mixed with text — split on image tokens, escape non-image parts
    const parts = trimmed.split(/(!\[[^\]]*\]\([^)]+\))/);
    const rendered = parts.map(part => {
        const m = part.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);
        if (m) {
            const alt = m[1].replace(/"/g, '&quot;');
            const rawFile = m[2].split('/').pop();
            if (imageMap[rawFile]) {
                return `<img src="images/${imageMap[rawFile].safeFilename}" alt="${alt}"/>`;
            }
            return part.replace(/</g, '&lt;').replace(/>/g, '&gt;');
        }
        return renderInline(part);
    }).join('');
    return `    <p>${rendered}</p>`;
}

export async function POST(request) {
    try {
        const access = await checkToolAccess('epub-formatter');
        if (!access.allowed) return access.response;

        const formData = await request.formData();
        const manuscriptRaw = formData.get('manuscript');
        // Browsers submit textarea content with CRLF line endings, which makes the
        // paragraph split on /\n\n+/ below never match - collapsing a whole
        // chapter into a single <p> and stopping standalone image refs from
        // rendering as <figure>.
        const manuscript =
            typeof manuscriptRaw === 'string'
                ? manuscriptRaw.replace(/\r\n?/g, '\n')
                : manuscriptRaw;
        const title = formData.get('title') || 'Untitled';
        const author = formData.get('author') || 'Unknown';
        const language = formData.get('language') || 'en';
        const isbn = formData.get('isbn') || '';
        const headingDetection = formData.get('headingDetection') || 'auto';
        const coverFile = formData.get('cover');

        if (!manuscript) {
            return NextResponse.json({ error: 'Missing manuscript text' }, { status: 400 });
        }

        // Collect inline image uploads: FormData keys like 'image:filename.jpg'
        const imageMap = {};
        for (const [key, value] of formData.entries()) {
            if (key.startsWith('image:') && value?.size > 0) {
                const rawName = key.slice(6);
                const safeFilename = rawName.replace(/[^a-zA-Z0-9._-]/g, '_');
                imageMap[rawName] = {
                    buffer: Buffer.from(await value.arrayBuffer()),
                    safeFilename,
                    mediaType: getMediaType(rawName),
                };
            }
        }

        // Dynamic import JSZip
        const JSZip = (await import('jszip')).default;
        const { v4: uuidv4 } = await import('uuid');

        const bookId = isbn || `urn:uuid:${uuidv4()}`;
        const langCode = { English: 'en', Spanish: 'es', French: 'fr', German: 'de', Portuguese: 'pt', Italian: 'it', Dutch: 'nl' }[language] || 'en';

        // Parse chapters
        let headingRegex;
        if (headingDetection === 'hash') {
            headingRegex = /^#{1,3}\s+(.+)$/m;
        } else if (headingDetection === 'caps') {
            headingRegex = /^([A-Z][A-Z\s]{2,80})$/m;
        } else {
            headingRegex = /^(#{1,3}\s+.+|chapter\s+\d+.*|PART\s+[IVX\d]+.*)$/im;
        }

        const lines = manuscript.split('\n');
        const chapters = [];
        let current = { title: 'Untitled Chapter', content: [] };

        for (const line of lines) {
            if (/^-{3,}$/.test(line.trim())) {
                // Standalone separator (scene break) — push blank line to preserve paragraph gap
                current.content.push('');
                continue;
            }
            const match = line.match(headingRegex);
            if (match) {
                if (current.content.length > 0 || chapters.length > 0) {
                    chapters.push({ ...current });
                }
                current = { title: match[1]?.replace(/^#+\s*/, '').trim() || line.trim(), content: [] };
            } else {
                current.content.push(line);
            }
        }
        chapters.push({ ...current });

        if (chapters.length === 0) {
            chapters.push({ title: 'Chapter 1', content: lines });
        }

        // Build slug
        const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        // Build EPUB
        const zip = new JSZip();

        // mimetype MUST be first & uncompressed
        zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });

        // container.xml
        zip.file('META-INF/container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

        // Cover image
        let coverManifest = '';
        if (coverFile && coverFile.size > 0) {
            const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
            const ext = coverFile.type === 'image/png' ? 'png' : 'jpg';
            zip.file(`OEBPS/cover.${ext}`, coverBuffer);
            coverManifest = `<item id="cover-image" href="cover.${ext}" media-type="${coverFile.type}" properties="cover-image"/>`;
        }

        // Inline images → OEBPS/images/
        const imageManifestItems = [];
        for (const { buffer, safeFilename, mediaType } of Object.values(imageMap)) {
            zip.file(`OEBPS/images/${safeFilename}`, buffer);
            const itemId = `img-${safeFilename.replace(/[^a-zA-Z0-9]/g, '-')}`;
            imageManifestItems.push(`<item id="${itemId}" href="images/${safeFilename}" media-type="${mediaType}"/>`);
        }

        // Chapter files
        const manifestItems = [];
        const spineItems = [];

        chapters.forEach((ch, i) => {
            const slug = slugify(ch.title) || `chapter-${i + 1}`;
            const filename = `${slug}.xhtml`;
            const paragraphs = ch.content
                .join('\n')
                .split(/\n\n+/)
                .filter((p) => p.trim())
                .map((p) => renderParagraph(p, imageMap))
                .filter(Boolean)
                .join('\n');

            // Table CSS is emitted per chapter, only where a table exists, so
            // chapters without one carry no extra markup. Kept to properties
            // that render reliably across Kindle, Apple Books, and Kobo.
            const tableCss = paragraphs.includes('<table>')
                ? `
<style type="text/css">
table { border-collapse: collapse; width: 100%; margin: 1em 0; font-size: 0.9em; }
th, td { border: 1px solid #999; padding: 0.4em 0.5em; text-align: left; vertical-align: top; }
th { background-color: #eee; font-weight: bold; }
</style>`
                : '';

            const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${langCode}" lang="${langCode}">
<head><title>${ch.title}</title>${tableCss}</head>
<body>
  <h1>${ch.title}</h1>
${paragraphs}
</body>
</html>`;

            zip.file(`OEBPS/${filename}`, xhtml);
            manifestItems.push(`<item id="ch-${i}" href="${filename}" media-type="application/xhtml+xml"/>`);
            spineItems.push(`<itemref idref="ch-${i}"/>`);
        });

        // nav.xhtml
        const navItems = chapters
            .map((ch, i) => {
                const slug = slugify(ch.title) || `chapter-${i + 1}`;
                return `      <li><a href="${slug}.xhtml">${ch.title}</a></li>`;
            })
            .join('\n');

        zip.file('OEBPS/nav.xhtml', `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xmlns:epub="http://www.idpf.org/2007/ops" xml:lang="${langCode}">
<head><title>Table of Contents</title></head>
<body>
  <nav epub:type="toc" id="toc">
    <h1>Table of Contents</h1>
    <ol>
${navItems}
    </ol>
  </nav>
</body>
</html>`);

        // toc.ncx
        const ncxNavPoints = chapters
            .map((ch, i) => {
                const slug = slugify(ch.title) || `chapter-${i + 1}`;
                return `    <navPoint id="navpoint-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${ch.title}</text></navLabel>
      <content src="${slug}.xhtml"/>
    </navPoint>`;
            })
            .join('\n');

        zip.file('OEBPS/toc.ncx', `<?xml version="1.0" encoding="UTF-8"?>
<ncx xmlns="http://www.daisy.org/z3986/2005/ncx/" version="2005-1">
  <head>
    <meta name="dtb:uid" content="${bookId}"/>
    <meta name="dtb:depth" content="1"/>
    <meta name="dtb:totalPageCount" content="0"/>
    <meta name="dtb:maxPageNumber" content="0"/>
  </head>
  <docTitle><text>${title}</text></docTitle>
  <navMap>
${ncxNavPoints}
  </navMap>
</ncx>`);

        // content.opf
        zip.file('OEBPS/content.opf', `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${title}</dc:title>
    <dc:creator>${author}</dc:creator>
    <dc:language>${langCode}</dc:language>
    <dc:identifier id="bookid">${bookId}</dc:identifier>
  </metadata>
  <manifest>
    <item id="nav" href="nav.xhtml" media-type="application/xhtml+xml" properties="nav"/>
    <item id="ncx" href="toc.ncx" media-type="application/x-dtbncx+xml"/>
    ${coverManifest}
    ${imageManifestItems.join('\n    ')}
    ${manifestItems.join('\n    ')}
  </manifest>
  <spine toc="ncx">
    ${spineItems.join('\n    ')}
  </spine>
</package>`);

        // Generate zip buffer
        const buffer = await zip.generateAsync({ type: 'nodebuffer', mimeType: 'application/epub+zip' });

        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/epub+zip',
                'Content-Disposition': `attachment; filename="${slugify(title) || 'book'}.epub"`,
            },
        });
    } catch (err) {
        console.error('EPUB formatter error:', err);
        return NextResponse.json({ error: 'epub_error', message: err.message }, { status: 500 });
    }
}
