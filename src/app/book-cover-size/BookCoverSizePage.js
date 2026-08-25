import Link from 'next/link';

const faqs = [
  {
    q: 'What is the recommended ebook cover size?',
    a: "The industry standard is 1600 × 2560 pixels (1.6:1 height-to-width ratio) for ebook covers across Amazon KDP, Apple Books, and Kobo. This size renders sharply on high-DPI screens and meets all major retailers' minimum requirements. Amazon KDP lists 1600 × 2560px as its ideal size; Apple Books requires a minimum of 1400px on the longer side; Kobo recommends 1600 × 2400px.",
  },
  {
    q: 'What aspect ratio should an ebook cover be?',
    a: "1.6:1 height-to-width — meaning the cover is 1.6 times taller than it is wide. A 1600 × 2560px cover meets this ratio exactly. Amazon KDP enforces this ratio and will reject or letterbox covers that fall significantly outside it. Apple Books and Kobo are more flexible but still favor the portrait orientation standard.",
  },
  {
    q: 'What file format should I use for my ebook cover?',
    a: "JPEG for ebook covers across all platforms. PNG is not listed as an accepted format by Amazon KDP for the embedded EPUB cover image. Apple Books and Kobo both accept JPEG. Export your cover as JPEG at maximum quality (95–100%) to minimize compression artifacts — cover images are one of the most visible elements of the published ebook.",
  },
  {
    q: 'Can I use my print cover for the ebook?',
    a: "Not directly. Print covers are designed at 300 DPI in CMYK color mode with bleed. Amazon KDP rejects CMYK images. For the ebook, export a separate RGB JPEG at the correct pixel dimensions (1600 × 2560px) from your design tool. The visual design can be identical — the difference is color mode (RGB vs CMYK) and how the file is sized.",
  },
  {
    q: 'Does the cover size inside the EPUB matter separately from the KDP listing cover?',
    a: "Yes. KDP requires a cover image inside every EPUB file (embedded in the package manifest) and a separate cover image upload on the product listing page. Both must meet the same size and format requirements. The embedded cover is what displays on the ebook device; the listing cover is what shows in Amazon search results and the product page.",
  },
  {
    q: 'What are the minimum cover dimensions for Amazon KDP?',
    a: "Amazon KDP's current minimum is 625 × 1000 pixels. The often-cited 500px minimum is outdated — KDP updated its requirements. Covers below 625 × 1000px are rejected or display poorly on high-DPI screens. Always design at the ideal 1600 × 2560px and export down if needed.",
  },
];

const ebookCovers = [
  {
    platform: 'Amazon KDP',
    ideal: '1600 × 2560 px',
    minimum: '625 × 1000 px',
    ratio: '1.6:1 (height:width)',
    format: 'JPEG or TIFF',
    colorMode: 'RGB',
    maxFileSize: '50 MB',
    slug: 'amazon-kdp-ebook',
  },
  {
    platform: 'Apple Books',
    ideal: '1400 × 2240 px or larger',
    minimum: '1400 px (longer side)',
    ratio: '1.6:1 recommended',
    format: 'JPEG',
    colorMode: 'RGB',
    maxFileSize: '4 MB',
    slug: 'apple-books-ebook',
  },
  {
    platform: 'Kobo',
    ideal: '1600 × 2400 px',
    minimum: '800 × 1200 px',
    ratio: '1.5:1 (height:width)',
    format: 'JPEG or PNG',
    colorMode: 'RGB',
    maxFileSize: '—',
    slug: null,
  },
  {
    platform: 'IngramSpark (ebook)',
    ideal: '2500 px (longer side)',
    minimum: '1600 px (longer side)',
    ratio: '1.6:1 recommended',
    format: 'JPEG or PDF',
    colorMode: 'RGB',
    maxFileSize: '—',
    slug: 'ingramspark-print',
  },
];

const printCovers = [
  {
    note: 'Print cover dimensions depend on trim size and page count.',
    rows: [
      { label: 'Standard trim (6×9 in)', dims: 'Spine width + 6 in front + 6 in back + bleed', dpi: '300 DPI minimum' },
      { label: 'Mass market (4.25×6.87 in)', dims: 'Spine width + 4.25 in × 2 + bleed', dpi: '300 DPI minimum' },
      { label: 'Color mode', dims: 'CMYK for print', dpi: '—' },
      { label: 'Spine width', dims: 'Page count × paper thickness (0.002252 in/page for white paper)', dpi: 'Calculated per book' },
    ],
  },
];

const commonMistakes = [
  {
    mistake: 'Using CMYK color mode',
    detail: 'Print cover files are typically exported in CMYK. Amazon KDP, Apple Books, and Kobo all require RGB for ebook covers. CMYK images are rejected by KDP\'s image processor even if the file looks correct when opened in Photoshop.',
  },
  {
    mistake: 'Cover below minimum dimensions',
    detail: 'The 500px minimum cited by older guides is outdated. KDP\'s current minimum is 625 × 1000px. Covers below this threshold are rejected or display at poor quality on retina screens. Always design at 1600 × 2560px.',
  },
  {
    mistake: 'Wrong aspect ratio',
    detail: "A square (1:1) or landscape cover will be stretched or letterboxed by KDP's display system. Start from a 1600 × 2560px canvas — the 1.6:1 ratio is built in.",
  },
  {
    mistake: 'Cover not declared in EPUB package',
    detail: "The ebook cover must be declared as a cover-image item in the EPUB OPF manifest — not just inserted as an inline image in the first chapter. Without the manifest declaration, KDP and Apple Books won't recognize it as the cover.",
  },
];

export default function BookCoverSizePage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Book Cover Size Guide
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Cover size requirements vary by retailer and by format — ebook covers and print covers have different dimension standards, color mode requirements, and file format rules. This page covers ebook cover sizes for every major retailer and the key differences for print. For full per-platform specifications, see the platform-specific pages linked below each table.
        </p>

        {/* Ebook cover table */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Ebook cover dimensions</h2>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Platform</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Ideal size</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Minimum</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Aspect ratio</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Format</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Color</th>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Max size</th>
              </tr>
            </thead>
            <tbody>
              {ebookCovers.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    {r.slug
                      ? <Link href={`/cover-requirements/${r.slug}`} style={{ color: '#9c7f35', textDecoration: 'none' }}>{r.platform}</Link>
                      : r.platform}
                  </td>
                  <td style={{ padding: '10px 16px', opacity: 0.85, whiteSpace: 'nowrap' }}>{r.ideal}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85, whiteSpace: 'nowrap' }}>{r.minimum}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85, whiteSpace: 'nowrap' }}>{r.ratio}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{r.format}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{r.colorMode}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{r.maxFileSize}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 14, opacity: 0.65, marginBottom: 40, fontStyle: 'italic' }}>
          Use 1600 × 2560 px JPEG in RGB for all platforms — it meets every retailer&apos;s minimum and ideal requirements.
        </p>

        {/* Print cover note */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>Print cover dimensions</h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Print covers are calculated differently from ebook covers. The total width includes the front cover, spine, and back cover — and the spine width changes based on page count and paper stock. Key requirements for print covers:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 24 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700 }}>Spec</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700 }}>Value</th>
                <th style={{ padding: '10px 16px', textAlign: 'left', fontWeight: 700 }}>Notes</th>
              </tr>
            </thead>
            <tbody>
              {printCovers[0].rows.map(({ label, dims, dpi }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600 }}>{label}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.85 }}>{dims}</td>
                  <td style={{ padding: '10px 16px', opacity: 0.75, fontSize: 13 }}>{dpi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          Amazon KDP and IngramSpark both provide cover templates that calculate exact dimensions from your page count and trim size — use those templates rather than calculating manually. The full print cover specification for IngramSpark is at{' '}
          <Link href="/cover-requirements/ingramspark-print" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            IngramSpark print cover requirements
          </Link>
          .
        </p>

        {/* Common mistakes */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 48, marginBottom: 8 }}>
          Common cover size mistakes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          These are the cover errors that cause the most retailer rejections.
        </p>
        {commonMistakes.map((item, i) => (
          <div key={i} style={{ marginBottom: 24, paddingLeft: 16, borderLeft: '3px solid rgba(201,168,76,0.4)' }}>
            <h3 style={{ fontSize: 18, fontWeight: 700, marginBottom: 6 }}>{item.mistake}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.85, margin: 0 }}>{item.detail}</p>
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
          Full cover specifications by platform:{' '}
          <Link href="/cover-requirements/amazon-kdp-ebook" style={{ color: '#9c7f35', textDecoration: 'none' }}>Amazon KDP ebook</Link>
          {', '}
          <Link href="/cover-requirements/apple-books-ebook" style={{ color: '#9c7f35', textDecoration: 'none' }}>Apple Books</Link>
          {', '}
          <Link href="/cover-requirements/ingramspark-print" style={{ color: '#9c7f35', textDecoration: 'none' }}>IngramSpark print</Link>
          {'. All cover requirement pages at '}
          <Link href="/cover-requirements" style={{ color: '#9c7f35', textDecoration: 'none' }}>cover requirements hub</Link>
          . Cover errors inside EPUB files are listed in the{' '}
          <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>EPUB error reference</Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Catch cover errors before submission — free EPUB Validator.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Checks cover declaration, aspect ratio, and format compliance for KDP, Apple Books, and Kobo.</p>
          <Link
            href="/tools/epub-validator"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open EPUB Validator →
          </Link>
        </div>
      </main>
    </>
  );
}
