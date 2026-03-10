import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('epub-formatter');
        if (!access.allowed) return access.response;

        const formData = await request.formData();
        const manuscript = formData.get('manuscript');
        const title = formData.get('title') || 'Untitled';
        const author = formData.get('author') || 'Unknown';
        const language = formData.get('language') || 'en';
        const isbn = formData.get('isbn') || '';
        const headingDetection = formData.get('headingDetection') || 'auto';
        const coverFile = formData.get('cover');

        if (!manuscript) {
            return NextResponse.json({ error: 'Missing manuscript text' }, { status: 400 });
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
        let coverSpine = '';
        if (coverFile && coverFile.size > 0) {
            const coverBuffer = Buffer.from(await coverFile.arrayBuffer());
            const ext = coverFile.type === 'image/png' ? 'png' : 'jpg';
            zip.file(`OEBPS/cover.${ext}`, coverBuffer);
            coverManifest = `<item id="cover-image" href="cover.${ext}" media-type="${coverFile.type}" properties="cover-image"/>`;
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
                .map((p) => `    <p>${p.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
                .join('\n');

            const xhtml = `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${langCode}" lang="${langCode}">
<head><title>${ch.title}</title></head>
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
        const wordCount = manuscript.split(/\s+/).length;
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
