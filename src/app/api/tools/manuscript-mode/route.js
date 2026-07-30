import { NextResponse } from 'next/server';
import { checkToolAccess } from '@/lib/toolAccess';

// Strip all HTML tags — used for word count and chapter-pattern matching
function textContent(html) {
    return html.replace(/<[^>]+>/g, '');
}

// XML-escape for title/author strings injected into XHTML/OPF/NCX
function escXml(s) {
    return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

// Sanitise mammoth HTML for EPUB XHTML:
// strip <img>, <table> blocks, class/style attrs, <span> wrappers,
// self-close <br>, remove empty <p> elements.
function sanitiseHtml(html) {
    return html
        .replace(/<img[^>]*\/?>/gi, '')
        .replace(/<table[\s\S]*?<\/table>/gi, '')
        .replace(/ class="[^"]*"/g, '')
        .replace(/ style="[^"]*"/g, '')
        .replace(/<\/?span[^>]*>/gi, '')
        .replace(/<br\s*>/gi, '<br/>')
        .replace(/<p[^>]*>\s*<\/p>/gi, '')
        .trim();
}

// Heading patterns that trigger a chapter break (same set as the txt path)
const CHAPTER_HEADING_RE = /^(#{1,3}\s+.+|chapter\s+\d+.*|PART\s+[IVX\d]+.*)$/i;
const BREAK = '\x00B\x00';

// Split sanitised mammoth HTML into chapters.
// Chapter breaks: any <h1>/<h2>/<h3> element, or a <p> whose plain text matches
// CHAPTER_HEADING_RE (e.g. "Chapter 1", "PART II").
function splitHtmlIntoChapters(html) {
    const marked = html
        // mark heading elements as chapter breaks (backreference ensures matching close tag)
        .replace(/<(h[1-3])([^>]*)>([\s\S]*?)<\/\1>/gi, (m) => BREAK + m)
        // mark chapter-pattern <p> elements as chapter breaks
        .replace(/<p([^>]*)>([\s\S]*?)<\/p>/gi, (m, _attrs, inner) => {
            const text = textContent(inner).trim();
            return CHAPTER_HEADING_RE.test(text) ? BREAK + m : m;
        });

    const segments = marked.split(BREAK).filter((s) => s.trim());
    if (segments.length === 0) return [{ title: 'Chapter 1', bodyHtml: '' }];

    const chapters = [];
    for (const segment of segments) {
        const s = segment.trim();

        // Segment opens with a heading element
        const headingM = s.match(/^<(h[1-3])([^>]*)>([\s\S]*?)<\/\1>/i);
        if (headingM) {
            const title = textContent(headingM[3]).trim() || `Chapter ${chapters.length + 1}`;
            chapters.push({ title, bodyHtml: s.slice(headingM[0].length).trim() });
            continue;
        }

        // Segment opens with a chapter-pattern <p>
        const pM = s.match(/^<p([^>]*)>([\s\S]*?)<\/p>/i);
        if (pM) {
            const pText = textContent(pM[2]).trim();
            if (CHAPTER_HEADING_RE.test(pText)) {
                chapters.push({ title: pText, bodyHtml: s.slice(pM[0].length).trim() });
                continue;
            }
        }

        // Content before the first chapter break → preamble
        if (chapters.length === 0) {
            chapters.push({ title: 'Introduction', bodyHtml: s });
        } else {
            chapters[chapters.length - 1].bodyHtml += '\n' + s;
        }
    }

    return chapters.length > 0 ? chapters : [{ title: 'Chapter 1', bodyHtml: html }];
}

export async function POST(request) {
    try {
        const access = await checkToolAccess('manuscript-mode', request);
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
        let rawContent = '';
        let isDocx = false;

        if (file.name.endsWith('.docx')) {
            const mammoth = (await import('mammoth')).default;
            const result = await mammoth.convertToHtml({ buffer: fileBuffer }, {
                styleMap: [
                    "p[style-name='Heading 1'] => h1:fresh",
                    "p[style-name='Heading 2'] => h2:fresh",
                    "p[style-name='Heading 3'] => h3:fresh",
                    "p[style-name='Title'] => h1:fresh",
                    "p[style-name='Subtitle'] => h2:fresh",
                    "u => u",
                ],
            });
            rawContent = result.value;
            isDocx = true;
        } else if (file.name.endsWith('.txt')) {
            rawContent = fileBuffer.toString('utf-8');
        } else {
            return NextResponse.json({ error: 'Only .docx and .txt files are supported' }, { status: 400 });
        }

        if (!rawContent.trim()) {
            return NextResponse.json({ error: 'File appears to be empty' }, { status: 400 });
        }

        // Apply text fixes. These target Unicode / mojibake sequences that never appear
        // in HTML tag syntax, so they are safe to run on the raw mammoth HTML string.
        let processed = rawContent;

        if (fixEncoding) {
            processed = processed
                .replace(/â€™/g, "'").replace(/â€œ/g, '"').replace(/â€/g, '"')
                .replace(/â€"/g, '—').replace(/â€"/g, '–').replace(/Ã©/g, 'é')
                .replace(/Ã /g, 'à').replace(/Ã¨/g, 'è').replace(/Ã¼/g, 'ü')
                .replace(/[-]/g, '');
        }

        if (fixSmartQuotes) {
            processed = processed
                .replace(/[‘’]/g, "'")
                .replace(/[“”]/g, '"');
        }

        if (fixEmDashes) {
            processed = processed
                .replace(/--/g, '—')
                .replace(/\s*—\s*/g, '—');
        }

        if (removeDoubleSpaces) {
            processed = processed
                .replace(/  +/g, ' ')
                .replace(/\t/g, '    ')
                .replace(/\n{3,}/g, '\n\n');
        }

        // Build chapters (two distinct paths: HTML for docx, plain-text for txt)
        let chapters;
        let wordCount;

        if (isDocx) {
            const cleanHtml = sanitiseHtml(processed);
            wordCount = textContent(cleanHtml).split(/\s+/).filter(Boolean).length;
            chapters = splitHtmlIntoChapters(cleanHtml);
        } else {
            wordCount = processed.split(/\s+/).filter(Boolean).length;

            const headingRegex = /^(#{1,3}\s+.+|chapter\s+\d+.*|CHAPTER\s+\d+.*|PART\s+[IVX\d]+.*)$/im;
            const lines = processed.split('\n');
            const rawChapters = [];
            let current = { title: 'Introduction', content: [] };

            for (const line of lines) {
                if (line.match(headingRegex)) {
                    if (current.content.filter((l) => l.trim()).length > 0 || rawChapters.length > 0) {
                        rawChapters.push({ ...current });
                    }
                    current = { title: line.replace(/^#+\s*/, '').trim(), content: [] };
                } else {
                    current.content.push(line);
                }
            }
            rawChapters.push({ ...current });

            if (rawChapters.length === 0 || (rawChapters.length === 1 && rawChapters[0].content.filter((l) => l.trim()).length === 0)) {
                rawChapters.push({ title: 'Chapter 1', content: lines });
            }

            chapters = rawChapters.map((ch) => ({
                title: ch.title,
                bodyHtml: ch.content
                    .join('\n')
                    .split(/\n\n+/)
                    .filter((p) => p.trim())
                    .map((p) => `    <p>${p.trim().replace(/</g, '&lt;').replace(/>/g, '&gt;')}</p>`)
                    .join('\n'),
            }));
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
            const safeTitle = escXml(ch.title);

            zip.file(`OEBPS/${filename}`, `<?xml version="1.0" encoding="UTF-8"?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="${langCode}" lang="${langCode}">
<head><title>${safeTitle}</title></head>
<body>
  <h1>${safeTitle}</h1>
${ch.bodyHtml}
</body>
</html>`);

            manifestItems.push(`<item id="ch-${i}" href="${filename}" media-type="application/xhtml+xml"/>`);
            spineItems.push(`<itemref idref="ch-${i}"/>`);
        });

        const navItems = chapters.map((ch, i) => {
            const slug = slugify(ch.title) || `chapter-${i + 1}`;
            return `      <li><a href="${slug}.xhtml">${escXml(ch.title)}</a></li>`;
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

        const ncxNavPoints = chapters.map((ch, i) => {
            const slug = slugify(ch.title) || `chapter-${i + 1}`;
            return `    <navPoint id="navpoint-${i + 1}" playOrder="${i + 1}">
      <navLabel><text>${escXml(ch.title)}</text></navLabel>
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
  <docTitle><text>${escXml(title)}</text></docTitle>
  <navMap>
${ncxNavPoints}
  </navMap>
</ncx>`);

        zip.file('OEBPS/content.opf', `<?xml version="1.0" encoding="UTF-8"?>
<package xmlns="http://www.idpf.org/2007/opf" unique-identifier="bookid" version="3.0">
  <metadata xmlns:dc="http://purl.org/dc/elements/1.1/">
    <dc:title>${escXml(title)}</dc:title>
    <dc:creator>${escXml(author)}</dc:creator>
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
                'X-Word-Count': String(wordCount),
            },
        });

    } catch (err) {
        console.error('Manuscript mode error:', err);
        return NextResponse.json({ error: 'manuscript_mode_error', message: err.message }, { status: 500 });
    }
}
