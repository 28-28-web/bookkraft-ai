import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'EPUB OPF Metadata Guide — Required Fields, ISBNs, and Store Listings | BookKraft AI',
  description: 'The OPF package document controls what stores display when you upload an EPUB. This guide covers every required metadata field — dc:title, dc:language, dc:identifier — how ISBN appears in EPUB files, and what KDP and Apple Books read from OPF.',
  alternates: { canonical: 'https://bookkraftai.com/epub-metadata-guide' },
  robots: 'index, follow',
};

const fieldRows = [
  { field: 'dc:title', required: 'Required', example: 'My Novel', notes: 'Book title. Missing title fails EPUBCheck and store upload.' },
  { field: 'dc:language', required: 'Required', example: 'en', notes: 'BCP 47 language tag. Missing language causes rejection at KDP, Apple Books, and Kobo.' },
  { field: 'dc:identifier', required: 'Required', example: 'urn:uuid:… or urn:isbn:…', notes: 'Unique identifier for this EPUB. Must match the package element\'s unique-identifier attribute.' },
  { field: 'dc:creator', required: 'Recommended', example: 'Jane Author', notes: 'Author name. Not strictly required by the spec but expected by stores.' },
  { field: 'dc:publisher', required: 'Optional', example: 'My Press', notes: 'Publisher name. Displayed in store listings on some platforms.' },
  { field: 'dc:description', required: 'Optional', example: 'A story about…', notes: 'Book description. Stores generally use the description you enter in their dashboard, not this field.' },
  { field: 'dc:subject', required: 'Optional', example: 'Fiction / Mystery', notes: 'Subject / genre. Used for BISAC-style categorization in some platforms.' },
  { field: 'dc:date', required: 'Optional', example: '2026-01-01', notes: 'Publication date in ISO 8601 format.' },
  { field: 'dc:rights', required: 'Optional', example: 'Copyright © 2026', notes: 'Copyright statement.' },
];

const faqs = [
  {
    q: 'What happens if dc:language is missing from the OPF?',
    a: 'EPUBCheck reports OPF-049 (or similar) and the file fails validation. KDP, Apple Books, and Kobo all reject files without a language declaration. This is one of the most common causes of EPUB upload failures. Add <dc:language>en</dc:language> (or the appropriate BCP 47 tag) to the metadata block.',
  },
  {
    q: 'Does Amazon KDP display dc:description from the EPUB on the store page?',
    a: 'No — KDP does not pull the book description from the EPUB file for its store listing. The description shown on your Amazon product page comes from what you enter in the KDP dashboard during the publishing process. The dc:description field in OPF is read by some other platforms and tools but does not control what appears on Amazon.',
  },
  {
    q: 'Do I need an ISBN in the dc:identifier field?',
    a: "No. The dc:identifier field requires a unique identifier, but it doesn't have to be an ISBN. If you don't have an ISBN, generate a UUID (any free UUID generator online produces one) and use it as urn:uuid:your-uuid-here. If you do have an ISBN, use urn:isbn:9780000000000. The important thing is that the identifier is unique to this EPUB and that the package element's unique-identifier attribute points to its id.",
  },
  {
    q: 'What language code should I use for English?',
    a: 'Use en for English without a regional distinction, en-US for American English, or en-GB for British English. BCP 47 two-letter codes cover most cases. Use the most specific tag that applies — en-US and en-GB can matter for dictionary selection in reading systems. For other languages: fr (French), de (German), es (Spanish), ja (Japanese), zh (Chinese). A full list is available at IANA Language Subtag Registry.',
  },
  {
    q: 'EPUBCheck reports OPF-030 — what does that mean?',
    a: 'OPF-030 means the package element\'s unique-identifier attribute points to an id that doesn\'t exist in the metadata block, or the dc:identifier element is missing entirely. Fix: make sure there is a dc:identifier element with an id attribute (e.g., id="book-id"), and that the package element\'s unique-identifier attribute is set to that same id value.',
  },
  {
    q: 'Can I add custom metadata fields to the OPF?',
    a: 'Yes, using the meta element. EPUB 3 allows <meta property="custom:field">value</meta> for non-standard metadata. Some tools add their own metadata this way. Stores ignore unknown meta elements, so custom fields do not cause validation failures — but they also have no effect on what stores display or how the book is categorized.',
  },
];

export default function EpubMetadataGuidePage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://bookkraftai.com/' },
      { '@type': 'ListItem', position: 2, name: 'EPUB Formatting Guide', item: 'https://bookkraftai.com/epub-formatting-guide' },
      { '@type': 'ListItem', position: 3, name: 'EPUB Metadata Guide', item: 'https://bookkraftai.com/epub-metadata-guide' },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/epub-formatting-guide" style={{ color: 'var(--mid)', textDecoration: 'none' }}>EPUB Formatting Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>EPUB Metadata Guide</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          EPUB OPF Metadata Guide
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          The OPF package document is the central file in every EPUB — it lists every file in the archive, declares the reading order, and contains the book's metadata. When you upload an EPUB to KDP, Apple Books, or Kobo, the first thing the platform reads is your OPF file. Three metadata fields are required by the EPUB specification; missing any one of them fails validation before any store even sees your file.
        </p>

        {/* What is the OPF */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          What is the OPF package document?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Every EPUB archive contains a file typically named <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>content.opf</code> (the name can vary, but the path is declared in <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>META-INF/container.xml</code>). The OPF file has three sections:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><strong>{'<metadata>'}</strong> — the book's bibliographic data: title, author, language, identifier, and other Dublin Core fields.</li>
          <li><strong>{'<manifest>'}</strong> — an inventory of every file in the EPUB (HTML chapters, images, CSS, nav.xhtml, toc.ncx). A file that exists in the archive but isn't in the manifest is invisible to reading systems.</li>
          <li><strong>{'<spine>'}</strong> — the linear reading order: a list of manifest items in the sequence a reader encounters them chapter by chapter.</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Stores do not read metadata from your cover image, your chapter files, or your file name. The OPF metadata block is the only place they look for structured book data.
        </p>

        {/* Required fields */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Metadata fields — required and optional
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', fontFamily: 'monospace' }}>Field</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>Status</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' }}>Example</th>
                <th style={{ padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)', minWidth: 200 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {fieldRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ink)', fontWeight: 500, whiteSpace: 'nowrap' }}>{r.field}</td>
                  <td style={{ padding: '10px 14px', whiteSpace: 'nowrap', color: r.required === 'Required' ? 'var(--gold)' : 'var(--mid)', fontWeight: r.required === 'Required' ? 600 : 400 }}>{r.required}</td>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 12, color: 'var(--mid)', whiteSpace: 'nowrap' }}>{r.example}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.5 }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Minimum valid metadata block */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Minimum valid metadata block
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          A valid EPUB 3 metadata block with the three required fields:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 48, fontFamily: 'monospace' }}>
          <code>{`<metadata xmlns:dc="http://purl.org/dc/elements/1.1/">

  <!-- Required -->
  <dc:title>My Novel</dc:title>
  <dc:language>en</dc:language>
  <dc:identifier id="book-id">urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890</dc:identifier>

  <!-- Recommended -->
  <dc:creator>Jane Author</dc:creator>

</metadata>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          The <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>{'<package>'}</code> element (the root of content.opf) must have a <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>unique-identifier</code> attribute set to the id of the dc:identifier element — in this case, <code style={{ fontFamily: 'monospace', fontSize: 13, background: 'var(--cream)', padding: '1px 4px', borderRadius: 3 }}>unique-identifier="book-id"</code>. EPUBCheck OPF-030 fires when these don't match.
        </p>

        {/* dc:identifier and ISBNs */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          dc:identifier and ISBNs
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The dc:identifier field must contain a unique string that identifies this specific EPUB file. Two formats are standard:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><strong>ISBN:</strong> <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>urn:isbn:9780000000000</code> — use this if you have purchased an ISBN for your ebook.</li>
          <li><strong>UUID:</strong> <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>urn:uuid:a1b2c3d4-e5f6-7890-abcd-ef1234567890</code> — use this if you don't have an ISBN. Any free UUID generator produces a valid value.</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          KDP assigns its own ASIN to your book regardless of what appears in dc:identifier. The identifier in the EPUB is used internally by the EPUB specification and by some library catalog systems — it does not control your Amazon or Apple Books product identifier.
        </p>

        {/* Language codes */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Language codes
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          dc:language uses BCP 47 language tags. Common values:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>en</code> — English (no regional distinction)</li>
          <li><code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>en-US</code> — American English</li>
          <li><code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>en-GB</code> — British English</li>
          <li><code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>fr</code> — French &nbsp;|&nbsp; <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>de</code> — German &nbsp;|&nbsp; <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>es</code> — Spanish &nbsp;|&nbsp; <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>ja</code> — Japanese</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          A missing dc:language is a required-field error — EPUBCheck flags it, and KDP, Apple Books, and Kobo all reject files without it. It is also used by reading systems to select the appropriate dictionary for spell-check and hyphenation.
        </p>

        {/* How stores use metadata */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          How stores use EPUB metadata
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Stores validate the required fields (title, language, identifier) and reject files that are missing them. Beyond validation, what platforms actually display from OPF metadata varies:
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.9, color: 'var(--ink)', paddingLeft: '1.4em', marginBottom: 16, opacity: 0.9 }}>
          <li><strong>KDP:</strong> Uses dc:title to pre-fill the book title field in the dashboard, but authors typically override this during setup. The store listing title, description, author, and categories all come from what you enter in the KDP publishing workflow — not from the EPUB file. KDP validates dc:language and dc:identifier but does not display dc:description on the Amazon store page.</li>
          <li><strong>Apple Books:</strong> More actively uses OPF metadata. dc:creator, dc:publisher, and dc:language are read and can affect catalog entries. Apple Books is strict about dc:language and rejects files where it is absent or malformed.</li>
          <li><strong>Kobo and Draft2Digital:</strong> Both validate required fields. Kobo may read dc:creator and dc:title from the file; Draft2Digital's ingestion pipeline normalizes metadata from the OPF when you upload directly.</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The practical rule: treat OPF metadata as what platforms use to validate your file, not as what controls your store listing. Enter title, author, description, and categories in each store's dashboard — don't rely on EPUB fields to populate store listings automatically.
        </p>

        {/* FAQ */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 28 }}>
            <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, color: 'var(--ink)' }}>{f.q}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.65, opacity: 0.85, margin: 0 }}>{f.a}</p>
          </div>
        ))}

        {/* Cross-links */}
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginTop: 48, marginBottom: 16, opacity: 0.9 }}>
          For the full EPUB build workflow — manuscript cleanup, TOC, navigation, and platform submission — see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          . For nav.xhtml and toc.ncx format details — how to write EPUB navigation documents and what KDP checks — see the{' '}
          <Link href="/epub-toc-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB TOC guide
          </Link>
          . For EPUB CSS — safe properties for paragraphs, headings, and page breaks across reading systems — see{' '}
          <Link href="/epub-css-for-ebooks" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            CSS for EPUB files
          </Link>
          .
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For metadata-related validation errors — missing dc:language, missing dc:identifier, OPF-030 — see the{' '}
          <Link href="/epub-errors/missing-language-declaration" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            missing language declaration error guide
          </Link>
          {' '}and the full{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB error reference
          </Link>
          .
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Build complete metadata for KDP, IngramSpark, and EPUB OPF — in one form.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Enter your book details once. Get correctly formatted metadata for every platform, ready to copy and paste. Free.</p>
          <Link
            href="/tools/metadata-builder"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open Metadata Builder →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
