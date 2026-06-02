import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/lib/toolAccess';

export async function POST(request) {
    try {
        const access = await checkToolAccess('epub-formatter');
        if (!access.allowed) return access.response;

        const formData = await request.formData();
        const file = formData.get('file');
        const title = formData.get('title') || 'Untitled';
        const author = formData.get('author') || 'Unknown';
        const language = formData.get('language') || 'English';
        const fixSmartQuotes = formData.get('fixSmartQuotes') === 'true';
        const fixEmDashes = formData.get('fixEmDashes') === 'true';
        const fixEncoding = formData.get('fixEncoding') === 'true';
        const removeDoubleSpaces = formData.get('removeDoubleSpaces') === 'true';

        if (!file) {
            return NextResponse.json({ error: 'No file uploaded' }, { status: 400 });
        }

        const fileBuffer = Buffer.from(await file.arrayBuffer());
        let manuscriptText = '';

        // Extract text based on file type
        if (file.name.endsWith('.docx')) {
            const mammoth = (await import('mammoth')).default;
            const result = await mammoth.extractRawText({ buffer: fileBuffer });
            manuscriptText = result.value;
        } else if (file.name.endsWith('.txt')) {
            manuscriptText = fileBuffer.toString('utf-8');
        } else {
            return NextResponse.json({ error: 'Only .docx and .txt files are supported' }, { status: 400 });
        }

        if (!manuscriptText.trim()) {
            return NextResponse.json({ error: 'File appears to be empty' }, { status: 400 });
        }

        // Apply Kindle Format Fixer logic
        let cleaned = manuscriptText;

        if (fixEncoding) {
            cleaned = cleaned
                .replace(/â€™/g, "'").replace(/â€œ/g, '"').replace(/â€/g, '"')
                .replace(/â€"/g, '—').replace(/â€"/g, '–').replace(/Ã©/g, 'é')
                .replace(/Ã /g, 'à').replace(/Ã¨/g, 'è').replace(/Ã¼/g, 'ü')
                .replace(/[\u0080-\u009F]/g, '');
        }

        if (fixSmartQuotes) {
            cleaned = cleaned
                .replace(/[\u2018\u2019]/g, "'")
                .replace(/[\u201C\u201D]/g, '"');
        }

        if (fixEmDashes) {
            cleaned = cleaned
                .replace(/--/g, '—')
                .replace(/\s*—\s*/g, '—');
        }

        if (removeDoubleSpaces) {
            cleaned = cleaned
                .replace(/  +/g, ' ')
                .replace(/\t/g, '    ')
                .replace(/\n{3,}/g, '\n\n');
        }

        // Detect chapters
        const headingRegex = /^(#{1,3}\s+.+|chapter\s+\d+.*|CHAPTER\s+\d+.*|PART\s+[IVX\d]+.*)$/im;
        const lines = cleaned.split('\n');
        const chapters = [];
        let current = { title: 'Introduction', content: [] };

        for (const line of lines) {
            const match = line.match(headingRegex);
            if (match) {
                if (current.content.filter(l => l.trim()).length > 0 || chapters.length > 0) {
                    chapters.push({ ...current });
                }
                current = {
                    title: line.replace(/^#+\s*/, '').trim(),
                    content: []
                };
            } else {
                current.content.push(line);
            }
        }
        chapters.push({ ...current });

        if (chapters.length === 0 || (chapters.length === 1 && chapters[0].content.filter(l => l.trim()).length === 0)) {
            chapters.push({ title: 'Chapter 1', content: lines });
        }

        // Build EPUB
        const JSZip = (await import('jszip')).default;
        const { v4: uuidv4 } = await import('uuid');

        const bookId = `urn:uuid:${uuidv4()}`;
        const langCode = {
            English: 'en', Spanish: 'es', French: 'fr',
            German: 'de', Portuguese: 'pt', Italian: 'it', Dutch: 'nl'
        }[language] || 'en';

        const slugify = (s) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

        const zip = new JSZip();
        zip.file('mimetype', 'application/epub+zip', { compression: 'STORE' });
        zip.file('META-INF/container.xml', `<?xml version="1.0" encoding="UTF-8"?>
<container version="1.0" xmlns="urn:oasis:names:tc:opendocument:xmlns:container">
  <rootfiles>
    <rootfile full-path="OEBPS/content.opf" media-type="application/oebps-package+xml"/>
  </rootfiles>
</container>`);

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

            zip.file(`OEBPS/${filename}`, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${langCode}" lang="${langCode}">
<head><title>${ch.title}</title></head>
<body>
  <h1>${ch.title}</h1>
${paragraphs}
</body>
</html>`);

            manifestItems.push(`<item id="ch-${i}" href="${filename}" media-type="application/xhtml+xml"/>`);
            spineItems.push(`<itemref idref="ch-${i}"/>`);
        });

        // nav.xhtml
        const navItems = chapters.map((ch, i) => {
            const slug = slugify(ch.title) || `chapter-${i + 1}`;
            return `      <li><a href="${slug}.xhtml">${ch.title}</a></li>`;
        }).join('\n');

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
        const ncxNavPoints = chapters.map((ch, i) => {
            const slug = slugify(ch.title) || `chapter-${i + 1}`;
            return `    <navPoint id="navpoint-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${ch.title}</text></navLabel>
      <content src="${slug}.xhtml"/>
    </navPoint>`;
        }).join('\n');

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
    ${manifestItems.join('\n    ')}
  </manifest>
  <spine toc="ncx">
    ${spineItems.join('\n    ')}
  </spine>
</package>`);

        const buffer = await zip.generateAsync({ type: 'nodebuffer', mimeType: 'application/epub+zip' });

        return new Response(buffer, {
            status: 200,
            headers: {
                'Content-Type': 'application/epub+zip',
                'Content-Disposition': `attachment; filename="${slugify(title) || 'book'}.epub"`,
                'X-Chapters-Found': String(chapters.length),
                'X-Word-Count': String(manuscriptText.split(/\s+/).length),
            },
        });

    } catch (err) {
        console.error('Manuscript mode error:', err);
        return NextResponse.json({ error: 'manuscript_mode_error', message: err.message }, { status: 500 });
    }
}
