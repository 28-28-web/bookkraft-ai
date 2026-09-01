import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Fonts in EPUB Files — Embedding, Licensing, and Font Selection | BookKraft AI',
  description: 'Should you embed fonts in your EPUB? Which fonts are safe to embed? This guide covers embed-or-not decisions, font licensing (OFL vs commercial), recommended ebook typefaces, subsetting, and OPF manifest declarations.',
  alternates: { canonical: 'https://bookkraftai.com/epub-fonts' },
  robots: 'index, follow',
};

const embedDecisionRows = [
  {
    scenario: 'Fiction — prose body text',
    rec: 'System fonts usually sufficient',
    reason: 'Readers often override fonts anyway; embedding adds file size for minimal visual gain on plain prose',
  },
  {
    scenario: 'Non-fiction with brand identity',
    rec: 'Embed a body + heading pair',
    reason: 'Consistent look across platforms where system font availability varies between Kindle, Apple Books, and Kobo',
  },
  {
    scenario: 'Poetry or experimental layout',
    rec: 'Embed and set in CSS',
    reason: 'Line breaks and spacing are semantic; system font substitution can break intended layout',
  },
  {
    scenario: "Children's or illustrated books",
    rec: 'Embed display/heading font; system for body',
    reason: 'Display typeface is part of the visual identity; body text is secondary',
  },
  {
    scenario: 'Academic with equations or symbols',
    rec: 'Embed a math-capable font (e.g. STIX Two)',
    reason: 'System fonts lack math glyph coverage on many e-readers',
  },
];

const licensingRows = [
  {
    license: 'OFL (Open Font License)',
    safe: '✓ Safe',
    color: 'var(--ink)',
    notes: 'Embedding always permitted. Most Google Fonts are OFL. Examples: Lora, Merriweather, EB Garamond, Source Serif 4, Literata.',
  },
  {
    license: 'Apache 2.0',
    safe: '✓ Safe',
    color: 'var(--ink)',
    notes: 'Embedding permitted. Some Google Fonts use Apache 2.0.',
  },
  {
    license: 'SIL OFL 1.1',
    safe: '✓ Safe',
    color: 'var(--ink)',
    notes: 'Identical to OFL for embedding purposes.',
  },
  {
    license: 'Commercial desktop license',
    safe: '✗ Check',
    color: '#c0392b',
    notes: 'Desktop licenses typically prohibit embedding in distributed documents. Look for a specific ebook embedding license tier from the foundry.',
  },
  {
    license: 'Freeware / no stated license',
    safe: '✗ Do not embed',
    color: '#c0392b',
    notes: 'No stated license = all rights reserved by default. Do not embed without explicit written permission from the creator.',
  },
];

const faqs = [
  {
    q: 'Can readers override my embedded font on their device?',
    a: 'Yes, on most e-readers. Kindle, Apple Books, and Kobo all allow readers to switch to a built-in font from the reading settings — your embedded font is overridden for readers who change it. The EPUB specification provides no reliable way to prevent this, and attempting to force a font on all devices is not recommended. Design with the assumption your embedded font is the default, not a guarantee.',
  },
  {
    q: 'What is font subsetting and should I do it?',
    a: 'Font subsetting strips all glyphs not used in your book from the font file, dramatically reducing file size. A full Latin font might be 200–400 KB; a subsetted version for English prose is typically 20–50 KB. For an English book you need Latin characters, punctuation, and numerals — not Cyrillic, Greek, or extended Unicode blocks. Most EPUB editors and font tools support subsetting. Always subset before including a font in your EPUB to avoid unnecessarily large file sizes.',
  },
  {
    q: 'Which fonts work well for ebook body text?',
    a: 'Fonts designed for screen reading perform best — generous x-height, open apertures, and good spacing at small sizes. Open-licensed options safe to embed without additional cost: Lora (serif, warm and readable), Merriweather (serif, slightly heavier weight), EB Garamond (classical serif), Source Serif 4 (clean modern serif), and Literata (designed specifically for ebook reading). For sans-serif body text: Source Sans 3, Lato, or Open Sans. All are available under OFL.',
  },
  {
    q: 'Can I embed a Google Font in my EPUB?',
    a: 'Most Google Fonts are under OFL or Apache 2.0, both of which permit EPUB embedding. Download the font file from Google Fonts (the .ttf or .otf file) and include it in your EPUB\'s Fonts directory. Do not link to the Google Fonts CDN — e-readers have no internet connection while displaying a book, so any external URL reference fails silently and falls back to a system font. Check the specific font\'s license on the Google Fonts page before embedding; a small number of fonts in the catalog are under different terms.',
  },
  {
    q: 'Do I need to declare embedded fonts in the OPF manifest?',
    a: 'Yes. Every file in the EPUB archive — including font files — must be declared in the OPF manifest with the correct media-type. For TrueType: media-type="font/ttf". OpenType: media-type="font/otf". WOFF: media-type="font/woff". WOFF2: media-type="font/woff2". A font file not declared in the manifest is technically present in the archive but may be invisible to reading systems and can trigger a validation warning.',
  },
  {
    q: 'What is the difference between embedding a font and linking to it?',
    a: 'Embedding means the font file is physically inside the EPUB archive — included in the ZIP alongside your content files and images. Linking to an external URL (as you would in a web page) does not work in EPUB: e-readers have no internet access while displaying a book, so any external font URL fails silently. Always embed by including the font file in the EPUB archive, declaring it in the OPF manifest, and referencing it with @font-face in your CSS.',
  },
];

export default function EpubFontsPage() {
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
      { '@type': 'ListItem', position: 3, name: 'Fonts in EPUB Files', item: 'https://bookkraftai.com/epub-fonts' },
    ],
  };

  const LINK = { color: '#9c7f35', textDecoration: 'none' };
  const TH = { padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' };
  const TD = { padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.55, verticalAlign: 'top' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={LINK}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/epub-formatting-guide" style={LINK}>EPUB Formatting Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Fonts in EPUB Files</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          Fonts in EPUB Files
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Embedding a font in an EPUB places the font file inside the archive so reading systems use it by default. Whether to embed — and which fonts to choose — depends on your book's genre, layout complexity, and your readers' devices. This guide covers the embed-or-not decision, font licensing, recommended typefaces for ebook reading, and how to declare fonts in the OPF manifest. For the CSS <code style={{ fontFamily: 'monospace', fontSize: 14 }}>@font-face</code> syntax that connects a declared font to your stylesheet, see the{' '}
          <Link href="/epub-css-for-ebooks" style={LINK}>EPUB CSS for ebooks guide</Link>.
        </p>

        {/* Embed decision */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Should you embed fonts?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Embedding is not always the right choice. System fonts — the defaults built into Kindle, Apple Books, and Kobo devices — are optimized for their respective screens and are familiar to readers. Embedding adds file size and complexity. The decision depends on what you're publishing:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ ...TH, minWidth: 160 }}>Scenario</th>
                <th style={{ ...TH, minWidth: 160 }}>Recommendation</th>
                <th style={{ ...TH, minWidth: 200 }}>Reason</th>
              </tr>
            </thead>
            <tbody>
              {embedDecisionRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ ...TD, fontWeight: 500, color: 'var(--ink)' }}>{r.scenario}</td>
                  <td style={TD}>{r.rec}</td>
                  <td style={TD}>{r.reason}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Licensing */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Font licensing — what you can legally embed
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Not every font can be embedded in a distributed document. Font files are licensed software, and embedding a font in an EPUB distributed to readers is considered a form of distribution. Check the license before including any font:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={TH}>License</th>
                <th style={TH}>Embedding</th>
                <th style={{ ...TH, minWidth: 260 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {licensingRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ ...TD, fontWeight: 600, color: 'var(--ink)' }}>{r.license}</td>
                  <td style={{ ...TD, fontWeight: 700, color: r.color, whiteSpace: 'nowrap' }}>{r.safe}</td>
                  <td style={TD}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recommended fonts */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Recommended fonts for ebook reading
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The best ebook fonts have generous x-height (legibility at small sizes), open apertures (letters that don't close up at low resolutions), and good spacing for reading long text. All of the following are available under OFL and safe to embed:
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 8, opacity: 0.9 }}>
          <strong>Serif — for body text in fiction and narrative non-fiction:</strong>
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', opacity: 0.88, marginBottom: 16, paddingLeft: 24 }}>
          <li><strong>Lora</strong> — warm and readable, good weight range, designed for screen</li>
          <li><strong>Merriweather</strong> — slightly heavier, strong on low-resolution e-ink displays</li>
          <li><strong>Literata</strong> — designed specifically for Google Play Books; well-hinted for small sizes</li>
          <li><strong>Source Serif 4</strong> — clean and modern with good italic support</li>
          <li><strong>EB Garamond</strong> — classical proportions, lighter weight; best at larger text sizes</li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 8, opacity: 0.9 }}>
          <strong>Sans-serif — for body text in non-fiction, technical, or business books:</strong>
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', opacity: 0.88, marginBottom: 16, paddingLeft: 24 }}>
          <li><strong>Source Sans 3</strong> — designed for UI and long reading, excellent at screen sizes</li>
          <li><strong>Open Sans</strong> — widely familiar, good glyph coverage across languages</li>
          <li><strong>Lato</strong> — warm humanist sans, good for mixed text and headings</li>
        </ul>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          Avoid display or decorative typefaces for body text — they are designed to be read at large sizes on print, not at 12–16px on an e-ink screen. Use them only for chapter headings if at all.
        </p>

        {/* Subsetting */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Font subsetting
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Font subsetting strips all glyphs not used in your book from the embedded font file. A full Latin font file might be 200–400 KB. A subsetted version for an English prose book — containing only Latin characters, punctuation, and numerals — is typically 20–50 KB. The reduction is significant for EPUB archive size, which affects upload time, download speed for readers, and KDP file size limits.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Most EPUB editors (Sigil, Vellum) support subsetting automatically. Standalone tools like <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>pyftsubset</code> (part of fonttools) can subset font files before you include them. Always subset embedded fonts before distributing your EPUB.
        </p>

        {/* OPF manifest */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Declaring fonts in the OPF manifest
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Every font file included in the EPUB archive must be declared in the OPF manifest. Use the correct <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>media-type</code> for each format:
        </p>
        <pre style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 20px', fontSize: 13, lineHeight: 1.65, overflowX: 'auto', marginBottom: 16, fontFamily: 'monospace' }}>
          <code>{`<!-- In content.opf, inside <manifest> -->
<item id="font-body"
      href="Fonts/Lora-Regular.ttf"
      media-type="font/ttf"/>

<item id="font-body-italic"
      href="Fonts/Lora-Italic.ttf"
      media-type="font/ttf"/>

<item id="font-heading"
      href="Fonts/Merriweather-Bold.ttf"
      media-type="font/ttf"/>`}</code>
        </pre>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 16 }}>
          Common media-type values: <code style={{ fontFamily: 'monospace', fontSize: 13 }}>font/ttf</code> (TrueType), <code style={{ fontFamily: 'monospace', fontSize: 13 }}>font/otf</code> (OpenType), <code style={{ fontFamily: 'monospace', fontSize: 13 }}>font/woff</code> (WOFF), <code style={{ fontFamily: 'monospace', fontSize: 13 }}>font/woff2</code> (WOFF2).
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          A font file not declared in the manifest is technically present in the archive but invisible to reading systems and may trigger a validation warning. For the CSS <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>@font-face</code> rule that connects the manifest font to your stylesheet, see the{' '}
          <Link href="/epub-css-for-ebooks" style={LINK}>EPUB CSS for ebooks guide</Link>.
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
          For the CSS <code style={{ fontFamily: 'monospace', fontSize: 14, background: 'var(--cream)', padding: '1px 5px', borderRadius: 3 }}>@font-face</code> rule syntax — how to link a manifest-declared font to your stylesheet — and the full table of CSS properties with per-platform support, see the{' '}
          <Link href="/epub-css-for-ebooks" style={LINK}>EPUB CSS for ebooks guide</Link>.
          For EPUB metadata and OPF manifest structure, see the{' '}
          <Link href="/epub-metadata-guide" style={LINK}>EPUB metadata guide</Link>.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For the full EPUB build workflow — TOC, metadata, chapter structure, images, and platform submission — see the{' '}
          <Link href="/epub-formatting-guide" style={LINK}>EPUB formatting guide</Link>.
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Generate ebook-safe CSS snippets — including @font-face declarations.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>
            Pre-tested CSS for font embedding, paragraph styling, page breaks, and headings — no reading system guesswork.
          </p>
          <Link
            href="/tools/css-snippet-generator"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Generate CSS Snippets →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
