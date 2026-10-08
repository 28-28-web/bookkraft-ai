import Link from 'next/link';
import RelatedLinks from '@/components/RelatedLinks';
import ChecklistOptin from '@/components/ChecklistOptin';

const faqs = [
  {
    q: 'Does Kindle support EPUB?',
    a: "Yes. Amazon accepts EPUB through Send to Kindle and converts it to the Kindle format for delivery — you no longer need to make a MOBI yourself. For authors, EPUB is one of the formats KDP accepts for publishing to Amazon, along with Word (DOC/DOCX) and KPF files from Kindle Create.",
  },
  {
    q: 'Which format should I submit to KDP — EPUB or MOBI?',
    a: "EPUB, not MOBI. KDP no longer accepts MOBI: it ended MOBI support for reflowable ebooks on August 1, 2021 and for fixed-layout ebooks on March 18, 2025. Besides EPUB, KDP also accepts Word (DOC/DOCX) and KPF files from Kindle Create. KDP converts your upload to its internal formats (AZW3/KFX), so you don't need to produce MOBI, AZW3 or KFX files yourself.",
  },
  {
    q: 'Can Kindle read PDF files?',
    a: "Yes — readers can send PDF files to their Kindle via the Send to Kindle service or USB transfer. But PDF on Kindle is a poor reading experience: the fixed-page layout doesn't reflow to the screen size, small text stays small, and font-size adjustments have no effect. For authors: KDP lists PDF only as an additional ebook format, for some languages. Its suggested formats are EPUB, Word (DOC/DOCX) and KPF, which give readers reflowable text.",
  },
  {
    q: 'What is the difference between MOBI, AZW3, and KFX?',
    a: "All three are Amazon-proprietary Kindle formats. MOBI is the oldest — based on the PalmDOC format, limited HTML/CSS support, still widely compatible. AZW3 (also called KF8) replaced MOBI as Kindle's primary format around 2011 — it supports HTML5 and CSS3, better typography, and enhanced ebook features. KFX is Amazon's current format for newer Kindle devices and apps. Authors don't produce KFX directly; KDP generates it from your EPUB submission.",
  },
  {
    q: 'Will my EPUB pass KDP validation?',
    a: "KDP supports EPUB files that meet the specifications in its Kindle Publishing Guidelines, and recommends validating the file with Kindle Previewer before you upload. As an extra check, the free EPUB Validator runs 11 structural checks in your browser, including the cover declaration and navigation.",
  },
  {
    q: 'What is EPUB 3 vs EPUB 2?',
    a: "EPUB 3 is the current standard. It's based on HTML5 and CSS3, requires a nav.xhtml navigation document, supports media overlays and accessibility metadata, and is the only version Apple's current Books Asset Guide covers. EPUB 2 uses older HTML 4 / XHTML 1.1 and an older NCX-based table of contents. KDP supports EPUB files that meet its Kindle Publishing Guidelines. BookKraft AI's EPUB Formatter outputs EPUB 3.",
  },
  {
    q: 'Should I use EPUB or PDF for selling ebooks?',
    a: "EPUB for selling through retailers (Amazon KDP, Apple Books, Kobo, IngramSpark). These platforms take EPUB for ebooks (KDP also takes Word and KPF files). PDF isn't a Kobo or Draft2Digital ebook format, and KDP accepts it only for some languages. PDF is appropriate if you're selling directly from your own website as a downloadable file and your content benefits from a fixed layout (heavily designed books, workbooks, visual guides). For standard novels and nonfiction, EPUB is the correct format for distribution everywhere.",
  },
  {
    q: 'Can I send an EPUB to my Kindle directly?',
    a: "Yes. Use Amazon's Send to Kindle service (sendtokindle.com or the desktop app) — upload the EPUB and Amazon converts it to the Kindle format and delivers it to your registered devices and apps. You can also transfer EPUB files via USB to recent Kindle devices, which handle the conversion on the device.",
  },
  {
    q: 'Should the cover image be inside the EPUB?',
    a: "Yes, and you also upload it separately. KDP's Cover Image Guidelines say a Kindle eBook needs a marketing cover for the website detail page and an internal cover image inside the book content. Declare the internal cover in the OPF manifest with properties=\"cover-image\" (KDP's preferred method) or a meta name=\"cover\" element. Don't add an HTML cover page as well: KDP says that may make the cover appear twice or cause the book to fail conversion.",
  },
  {
    q: 'Which CSS does Kindle override?',
    a: "KDP's Text Guidelines say body text must use the default font size (1em) and line height, and the font size used in most of the content is normalized to 1em. Forced font colors in body text are removed, body text must not have a black or white background, and text is fully justified by default. KDP's reflowable guidelines also ask for a single-column layout without the CSS position property for alignment.",
  },
];

const KDP_HELP = (id) => `https://kdp.amazon.com/en_US/help/topic/${id}`;

// Each row states only what the cited KDP help topics say; where KDP is
// silent, the row says so instead of guessing.
const settings = [
  {
    setting: 'EPUB version',
    doThis: 'Export EPUB 3.',
    kdp: "KDP supports EPUB files that meet the specifications in its Kindle Publishing Guidelines. It doesn't name an EPUB version; EPUB 3 is our recommendation.",
    sources: [['G200634390', 'eBook manuscript formats']],
    link: { href: '/epub-formatting-guide', label: 'EPUB formatting guide' },
  },
  {
    setting: 'Reflowable or fixed layout',
    doThis: 'Reflowable for novels and most nonfiction. Fixed layout only for image-heavy books.',
    kdp: "KDP's format comparison lists reflowable for text-heavy titles, and fixed layout for image-heavy books such as children's picture books, coffee table books and comics.",
    sources: [['G42HENP2VHSN8VW8', 'Comparing Formats']],
    link: { href: '/reflowable-vs-fixed-layout-epub', label: 'reflowable vs fixed-layout EPUB' },
  },
  {
    setting: 'Table of contents',
    doThis: 'Include a toc nav document and an HTML table of contents near the start of the book, with linked entries.',
    kdp: 'Kindle builds the logical TOC from a toc nav element or an NCX file; KDP says it is especially important for books longer than 20 pages, and Kindle supports two levels of nesting. Place the HTML TOC toward the beginning, make its entries links, and keep the toc nav in a separate document from the HTML TOC.',
    sources: [['GY3AD8C6C6GAG42N', 'Navigation Guidelines']],
    link: { href: '/epub-toc-guide', label: 'EPUB table of contents guide' },
  },
  {
    setting: 'Cover image',
    doThis: 'Put the cover image inside the EPUB, declared with properties="cover-image", and upload the cover in KDP too. Don\'t add an HTML cover page.',
    kdp: 'KDP requires a marketing cover for the detail page and an internal cover image in the book content. An extra HTML cover page may make the cover appear twice or cause the book to fail conversion. The Cover Image Guidelines ask for 2,560 × 1,600 pixels, RGB, JPEG preferred and 5MB or less; the eBook cover criteria page allows JPEG or TIFF under 50MB.',
    sources: [['G6GTK3T3NUHKLEFX', 'Cover Image Guidelines'], ['G200645690', 'eBook cover criteria']],
    link: { href: '/cover-requirements/amazon-kdp-ebook', label: 'KDP ebook cover requirements' },
  },
  {
    setting: 'Embedded fonts',
    doThis: "Embed only OTF or TTF fonts you're licensed to use, and don't force a font on body text.",
    kdp: "Fonts can be OpenType (OTF) or TrueType (TTF); Kindle doesn't recommend Type 1 fonts. The publisher is responsible for font license rights, and body text should not have a forced font face.",
    sources: [['GH4DRT75GWWAGBTU', 'Text Guidelines - Reflowable']],
    link: { href: '/epub-fonts', label: 'fonts in EPUB files' },
  },
  {
    setting: 'Images',
    doThis: 'Use sRGB images without transparency, real text instead of pictures of text, and alt text on every image.',
    kdp: "Kindle doesn't support TIFF, multi-frame GIFs or images with transparent areas, or CMYK; use sRGB. Don't render text as images, and give every image alt text. Pictures should fill at least 60% of the screen width (80% if they contain text). Images in other accepted formats, such as BMP or PNG, may be recompressed as JPEG during conversion.",
    sources: [['G75V4YX5X8GRGXWV', 'Image Guidelines - Reflowable'], ['G200735140', 'manuscript file size']],
    link: { href: '/epub-images', label: 'images in EPUB files' },
  },
  {
    setting: 'CSS Kindle overrides',
    doThis: 'Leave body text at the default size and line height, with no forced color or background, in a single column.',
    kdp: 'Body text must use the default font size (1em) and line height, and Kindle normalizes it. Forced body text colors are removed, body text must not have a black or white background, and text is justified by default. Body indents of no more than 4em are recommended, and the CSS position property should not be used for alignment.',
    sources: [['GH4DRT75GWWAGBTU', 'Text Guidelines - Reflowable'], ['GPNJPYK298J8TRRV', 'Creating Reflowable Books']],
    link: { href: '/epub-css-for-ebooks', label: 'EPUB CSS for ebooks' },
  },
  {
    setting: 'OPF metadata',
    doThis: 'Fill in dc:title and dc:language (plus the dc:identifier the EPUB specification requires), and match them to the details you enter in KDP.',
    kdp: "KDP lists dc:title and dc:language as required in the OPF file. It doesn't say whether the file or your KDP book details take precedence, so match them.",
    sources: [['GPNJPYK298J8TRRV', 'Creating Reflowable Books']],
    link: { href: '/epub-metadata-guide', label: 'EPUB metadata guide' },
  },
  {
    setting: 'File size and file names',
    doThis: 'Keep the file lean, and avoid special characters in file and folder names.',
    kdp: 'You can upload files up to 650MB. File names and paths should not include special characters such as !, @, # or $. On the 70% royalty option, a delivery cost based on file size is deducted ($0.15 per MB on Amazon.com).',
    sources: [['G200735140', 'manuscript file size'], ['GRWTKMGXU2MV5KKP', 'Creating a Source File'], ['G200634500', 'delivery costs']],
    link: { href: '/checklist/kdp-pre-launch-checklist', label: 'KDP preflight checklist' },
  },
  {
    setting: 'Check before upload',
    doThis: 'Open the EPUB in Kindle Previewer before you upload it.',
    kdp: 'KDP recommends validating the file with Kindle Previewer before you upload your book.',
    sources: [['G200634390', 'eBook manuscript formats']],
    link: { href: '/tools/epub-validator', label: 'EPUB Validator (structure check)' },
  },
];

const formats = [
  {
    format: 'EPUB 3',
    producer: 'Industry standard',
    kindle: '✓ Converted',
    kdpSubmit: '✓ Suggested format',
    appleBooks: '✓ Covered by Apple\'s asset guide',
    kobo: '✓ ePub accepted',
    notes: 'Submit this to KDP. BookKraft AI outputs EPUB 3.',
  },
  {
    format: 'EPUB 2',
    producer: 'Older standard',
    kindle: '✓ Converted',
    kdpSubmit: '✓ EPUB accepted',
    appleBooks: '— Not in Apple\'s current guide',
    kobo: '✓ ePub accepted',
    notes: 'Older EPUB version. Apple\'s current asset guide covers EPUB 3 only, so use EPUB 3 for new books.',
  },
  {
    format: 'Word (DOC/DOCX)',
    producer: 'Microsoft Word',
    kindle: '—',
    kdpSubmit: '✓ Suggested format',
    appleBooks: '—',
    kobo: '✓ Converted to ePub',
    notes: 'KDP converts it for Kindle. Complex formatting may not convert well; check the result in Kindle Previewer.',
  },
  {
    format: 'KPF',
    producer: 'Amazon Kindle Create',
    kindle: '—',
    kdpSubmit: '✓ Suggested format',
    appleBooks: '—',
    kobo: '—',
    notes: 'Kindle Package Format, made with Amazon\'s free Kindle Create tool. Amazon-only.',
  },
  {
    format: 'AZW3 / KF8',
    producer: 'Amazon',
    kindle: '✓ Native',
    kdpSubmit: '✗ Not a KDP upload format',
    appleBooks: '—',
    kobo: '—',
    notes: 'Amazon\'s HTML5-based format. KDP generates this from your EPUB — no need to produce it yourself.',
  },
  {
    format: 'MOBI',
    producer: 'Amazon (legacy)',
    kindle: '✓ Native',
    kdpSubmit: '✗ No longer accepted',
    appleBooks: '—',
    kobo: '—',
    notes: 'Retired. KDP ended MOBI uploads for reflowable ebooks on August 1, 2021 and for fixed-layout ebooks on March 18, 2025.',
  },
  {
    format: 'KFX',
    producer: 'Amazon (current)',
    kindle: '✓ Native',
    kdpSubmit: '— (generated by KDP)',
    appleBooks: '—',
    kobo: '—',
    notes: 'KDP\'s internal delivery format. Generated automatically from your EPUB after upload.',
  },
  {
    format: 'PDF',
    producer: 'Any',
    kindle: '⚠ Fixed layout only',
    kdpSubmit: '⚠ Some languages only; not a suggested format',
    appleBooks: '—',
    kobo: '✗ Not a Kobo upload format',
    notes: 'Not suitable for ebook distribution. Fixed layout breaks reflow on all screen sizes.',
  },
];

const epubVsPdf = [
  {
    aspect: 'Retailer distribution',
    epub: '✓ Accepted by KDP, Apple Books, Kobo and IngramSpark',
    pdf: '⚠ Google Play accepts it; KDP only in some languages; not a Kobo or Draft2Digital ebook format',
  },
  {
    aspect: 'Font size adjustment',
    epub: '✓ Reflowable — reader sets their own size',
    pdf: '✗ Fixed — small text stays small on small screens',
  },
  {
    aspect: 'Screen size adaptation',
    epub: '✓ Reflows to any screen (phone, tablet, e-reader)',
    pdf: '✗ Fixed page size — requires zooming and scrolling',
  },
  {
    aspect: 'E-reader compatibility',
    epub: '✓ All e-readers, all screen sizes',
    pdf: '⚠ Readable but poor experience on 6-inch Kindle screens',
  },
  {
    aspect: 'Accessibility',
    epub: '✓ Screen reader compatible, semantic structure',
    pdf: '⚠ Varies significantly by how the PDF was created',
  },
  {
    aspect: 'Fixed visual layout',
    epub: '⚠ Reflowable — exact layout not preserved',
    pdf: '✓ Exact layout preserved (useful for workbooks, visual books)',
  },
  {
    aspect: 'Direct download sales',
    epub: '✓ Works well',
    pdf: '✓ Works well — common for blog-based ebook sales',
  },
];

export default function KindleEpubFormatPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Does Kindle Support EPUB?
        </h1>

        <div style={{ padding: '20px 24px', background: 'rgba(201,168,76,0.08)', border: '2px solid rgba(201,168,76,0.35)', borderRadius: 10, marginBottom: 36 }}>
          <p style={{ fontSize: 18, lineHeight: 1.6, margin: 0, fontWeight: 500 }}>
            <strong>Yes.</strong> Amazon accepts EPUB through KDP and Send to Kindle, then converts it for Kindle delivery. For authors publishing on Amazon: KDP accepts EPUB, Word (DOC/DOCX) and KPF files made with Kindle Create, among other formats. It no longer accepts MOBI. You don&apos;t need to produce MOBI, AZW3 or KFX files — KDP handles the conversion.
          </p>
        </div>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          This guide is about Kindle and KDP specifically: which file to upload to KDP, which EPUB settings to use, how Kindle formats work, and why EPUB beats PDF on Kindle — with a table of every format Kindle reads. For a general comparison across all stores and devices, see{' '}
          <Link href="/blog/best-ebook-formats-epub-vs-pdf-vs-mobi" style={{ color: '#9c7f35', textDecoration: 'none' }}>EPUB vs PDF vs MOBI: ebook formats compared</Link>.
        </p>

        {/* Format comparison table */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
          Ebook formats — Kindle compatibility and retailer support
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 13 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>Format</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>Kindle</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>KDP submit</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>Apple Books</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700 }}>Kobo</th>
                <th style={{ padding: '12px 14px', textAlign: 'left', fontWeight: 700, minWidth: 200 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {formats.map((r, i) => (
                <tr
                  key={i}
                  style={{
                    borderBottom: '1px solid rgba(201,168,76,0.15)',
                    background: r.format === 'EPUB 3' ? 'rgba(201,168,76,0.06)' : i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)',
                  }}
                >
                  <td style={{ padding: '10px 14px', fontWeight: r.format === 'EPUB 3' ? 700 : 600, whiteSpace: 'nowrap' }}>{r.format}</td>
                  <td style={{ padding: '10px 14px', opacity: 0.85 }}>{r.kindle}</td>
                  <td style={{ padding: '10px 14px', opacity: 0.85 }}>{r.kdpSubmit}</td>
                  <td style={{ padding: '10px 14px', opacity: 0.85 }}>{r.appleBooks}</td>
                  <td style={{ padding: '10px 14px', opacity: 0.85 }}>{r.kobo}</td>
                  <td style={{ padding: '10px 14px', opacity: 0.75, fontSize: 12 }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <ChecklistOptin source="checklist-kindle-epub-format" style={{ margin: '32px 0 0' }} />

        {/* Kindle EPUB settings */}
        <h2 id="kindle-epub-settings" style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Kindle EPUB settings: what to export
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          The settings below are what to choose when you export or build an EPUB for KDP. Each one shows what KDP&apos;s help pages and Kindle Publishing Guidelines say, with the topic it comes from.
        </p>
        {settings.map((s) => (
          <div key={s.setting} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{s.setting}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, margin: '0 0 6px' }}><strong>Do this:</strong> {s.doThis}</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, opacity: 0.85, margin: '0 0 6px' }}>
              <strong>KDP says:</strong> {s.kdp}{' '}
              (
              {s.sources.map(([id, label], i) => (
                <span key={id}>
                  {i > 0 && '; '}
                  <a href={KDP_HELP(id)} target="_blank" rel="noopener nofollow" style={{ color: '#9c7f35', textDecoration: 'none' }}>KDP: {label}</a>
                </span>
              ))}
              )
            </p>
            <p style={{ fontSize: 14, margin: 0, opacity: 0.85 }}>
              More: <Link href={s.link.href} style={{ color: '#9c7f35', textDecoration: 'none' }}>{s.link.label}</Link>
            </p>
          </div>
        ))}

        {/* Kindle format history */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          MOBI, AZW3 and KFX — what Kindle actually uses
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Kindle has used three main formats over its history. As an author, you only need to know which one to submit — KDP handles the rest.
        </p>
        <ul style={{ fontSize: 17, lineHeight: 1.9, opacity: 0.9, paddingLeft: 24, marginBottom: 24 }}>
          <li>
            <strong>MOBI</strong> — Kindle&apos;s original format (2007). Based on the PalmDOC standard, limited CSS support, widely compatible with all Kindle generations. KDP no longer accepts MOBI uploads: support ended August 1, 2021 for reflowable ebooks and March 18, 2025 for fixed-layout.
          </li>
          <li>
            <strong>AZW3 (KF8)</strong> — Replaced MOBI as Kindle&apos;s primary format around 2011. HTML5 and CSS3 support, better typography and layout control. KDP generates AZW3 from your EPUB submission.
          </li>
          <li>
            <strong>KFX</strong> — Amazon&apos;s current internal delivery format for newer Kindle devices and apps. Adds improved font rendering, better hyphenation, and Kindle-specific features. KDP generates KFX automatically — you never produce it yourself.
          </li>
        </ul>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 32, opacity: 0.9 }}>
          The practical implication: submit EPUB 3 to KDP. KDP converts it to AZW3 or KFX for delivery to readers. The quality of that conversion depends heavily on how clean your EPUB is — a valid, well-structured EPUB 3 file produces better Kindle output than a poorly structured one.
        </p>

        {/* EPUB vs PDF */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          EPUB vs PDF for Kindle and KDP
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 20, opacity: 0.9 }}>
          PDF has limited retail support for ebooks: KDP accepts it only for some languages, and Kobo and Draft2Digital don&apos;t take it as an ebook format. The comparison:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Aspect</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>EPUB</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>PDF</th>
              </tr>
            </thead>
            <tbody>
              {epubVsPdf.map(({ aspect, epub, pdf }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600 }}>{aspect}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{epub}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{pdf}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          PDF makes most sense where exact visual layout matters, for example direct download sales from your own website — heavily designed workbooks, graphic-heavy guides, formatted planners. For standard novels, memoir, and most nonfiction, EPUB is the correct format for everywhere that matters.
        </p>

        {/* How to submit EPUB to KDP */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 8 }}>
          How to submit an EPUB to KDP
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          Before uploading, validate the file — structural errors can stop an EPUB from converting cleanly on KDP.
        </p>
        {[
          {
            n: 1,
            title: 'Prepare a valid EPUB 3 file',
            href: '/tools/epub-formatter',
            body: 'Paste your manuscript into the EPUB Formatter (Starter plan) to generate an EPUB 3 file with a nav document, clean CSS and package metadata. If something needs fixing, fixing it in your source file and re-exporting is simpler than patching the EPUB.',
          },
          {
            n: 2,
            title: 'Validate before uploading',
            href: '/tools/epub-validator',
            body: 'Run the EPUB through the free EPUB Validator. It checks common structural problems before you upload: package structure, metadata, navigation, the cover declaration, fonts, images and file size.',
          },
          {
            n: 3,
            title: 'Upload to KDP',
            body: 'Log in to kdp.amazon.com. Go to your Bookshelf and create a new Kindle eBook (or edit an existing one). In the Content section, upload your EPUB file and your cover.',
          },
          {
            n: 4,
            title: 'Preview the book',
            body: "KDP shows a preview of your book after upload. Check it in KDP's online previewer, or in the downloadable Kindle Previewer, which KDP recommends before you upload. Look at the first chapter, a chapter break, the table of contents and any images.",
          },
          {
            n: 5,
            title: 'Publish',
            body: "Once the preview looks right, publish. KDP says a new ebook can take up to 3 business days to go live (Book Status, G200627450), and changes you make later, such as to the description, keywords, manuscript or cover, can take up to 72 hours (Timelines, G202173620).",
          },
        ].map((step) => (
          <div key={step.n} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>
              {step.n}.{' '}
              {step.href
                ? <Link href={step.href} style={{ color: '#9c7f35', textDecoration: 'none' }}>{step.title} →</Link>
                : step.title}
            </h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{step.body}</p>
          </div>
        ))}

        {/* FAQ */}
        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 56, marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
          </div>
        ))}

        {/* Cross-links */}
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9, marginTop: 32 }}>
          Converting a Word document to EPUB? See the{' '}
          <Link href="/word-to-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Word to EPUB guide
          </Link>
          . Full EPUB formatting standards are in the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . EPUB validation errors by type are in the{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          . Starting from a Word template? See{' '}
          <Link href="/ebook-template" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            ebook template
          </Link>
          . Before you upload, check your Word file for the{' '}
          <Link href="/blog/kindle-formatting-mistakes" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            Kindle formatting mistakes that get books sent back
          </Link>
          . Not sure whether your book should reflow or keep fixed pages? See{' '}
          <Link href="/reflowable-vs-fixed-layout-epub" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            reflowable vs fixed-layout EPUB
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Build your EPUB 3, then check it.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Paste your manuscript into the EPUB Formatter (Starter plan), then run the free EPUB Validator to check for common structural problems before you upload.</p>
          <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
            <Link
              href="/tools/epub-formatter"
              style={{ display: 'inline-block', padding: '13px 28px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}
            >
              Open EPUB Formatter →
            </Link>
            <Link
              href="/tools/epub-validator"
              style={{ display: 'inline-block', padding: '13px 28px', background: 'transparent', color: 'var(--ink, #1a1a1a)', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15, border: '1px solid rgba(201,168,76,0.5)' }}
            >
              Validate Existing EPUB →
            </Link>
          </div>
        </div>
        <RelatedLinks related={[{type: 'guide', slug: 'kdp-formatting-guide', label: 'the complete KDP formatting guide'}]} />
        <ChecklistOptin source="checklist-kindle-epub-format" variant="full" />
      </main>
    </>
  );
}
