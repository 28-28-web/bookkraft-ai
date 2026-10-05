import Link from 'next/link';
import ChecklistOptin from '@/components/ChecklistOptin';
import TrackedLink from '@/components/TrackedLink';
import { COVER_REQUIREMENTS } from '@/lib/coverRequirements';

// Platform order on the hub. Specs and table cells come from coverRequirements.js;
// only spec rows marked verified (checked against the platform's own help page)
// are shown here.
const HUB_ORDER = [
  'amazon-kdp-ebook',
  'kdp-print-cover',
  'kobo-ebook',
  'apple-books-ebook',
  'barnes-noble-press-ebook',
  'ingramspark-print',
  'google-play-ebook',
  'draft2digital-ebook',
];
const HUB_SPEC_PRIORITY = {
  ebook: ['ideal', 'min', 'ratio', 'format', 'maxSize', 'color'],
  print: ['format', 'bleed', 'spine', 'resolution', 'color'],
};
const TABLE_COLUMNS = [
  { key: 'min', label: 'Minimum' },
  { key: 'ideal', label: 'Ideal size' },
  { key: 'ratio', label: 'Aspect ratio' },
  { key: 'format', label: 'Format' },
  { key: 'color', label: 'Color' },
  { key: 'maxSize', label: 'Max file size' },
];

const platforms = HUB_ORDER.map((slug) => COVER_REQUIREMENTS.find((c) => c.slug === slug)).filter(Boolean);
const verifiedSpec = (entry, key) => entry.specs.find((s) => s.key === key && s.verified);
const hubSpecs = (entry) =>
  (HUB_SPEC_PRIORITY[entry.kind] ?? []).map((k) => verifiedSpec(entry, k)).filter(Boolean).slice(0, 3);
const ebookPlatforms = platforms.filter((p) => p.kind === 'ebook');

const LINK = { color: '#9c7f35', textDecoration: 'none' };

const faqs = [
  {
    q: 'What is the recommended ebook cover size?',
    a: "1600 × 2560 pixels is Amazon KDP's ideal ebook cover size (a 1.6:1 height-to-width ratio). It also clears Apple Books' minimum of 1400 pixels on the shorter side and Barnes & Noble Press's recommended 1400 pixels on each side. Kobo suggests a 3:4 width-to-height shape to match its screens, and Draft2Digital asks for 1600 × 2400, but both take a tall portrait cover.",
  },
  {
    q: 'What aspect ratio should an ebook cover be?',
    a: "It depends on the store. KDP's ideal is 1.6:1 height to width — a 1600 × 2560px cover meets it exactly. Kobo suggests making the width three quarters of the height (3:4) to match its device screens. Draft2Digital accepts any tall rectangle and resizes it for each store. Apple Books and Google Play don't set a ratio in their cover guidelines. A portrait cover works everywhere; avoid square and landscape images.",
  },
  {
    q: 'What file format should I use for my ebook cover?',
    a: "JPEG. It is accepted by every store on this page. PNG is not listed as an accepted format by Amazon KDP (which takes JPEG or TIFF), though Apple Books, Kobo, Google Play and B&N Press accept it. Export your cover as JPEG at maximum quality (95–100%) to minimize compression artifacts — cover images are one of the most visible elements of the published ebook.",
  },
  {
    q: 'Can I use my print cover for the ebook?',
    a: "Not directly. Print covers are designed at 300 DPI in CMYK color mode with bleed, and Kindle does not support CMYK. For the ebook, export a separate RGB JPEG at the correct pixel dimensions (1600 × 2560px for KDP) from your design tool. The visual design can be identical — the difference is color mode (RGB vs CMYK) and how the file is sized.",
  },
  {
    q: 'Does the cover size inside the EPUB matter separately from the KDP listing cover?',
    a: "Yes. KDP requires a cover image inside every EPUB file (embedded in the package manifest) and a separate cover image upload on the product listing page. Both must meet the same size and format requirements. The embedded cover is what displays on the ebook device; the listing cover is what shows in Amazon search results and the product page.",
  },
  {
    q: 'What are the minimum cover dimensions for Amazon KDP?',
    a: "KDP's stated minimum is 1000 pixels in height × 625 pixels in width, with an ideal of 2560 × 1600px (KDP Help: 'What criteria does my eBook's cover image need to meet?'). KDP's Cover Image Guidelines separately note that covers with less than 500 pixels on the shortest side are not displayed on the Amazon website. Design at 1600 × 2560px to stay well above both thresholds and stay sharp on high-DPI screens.",
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
    detail: 'Print cover files are typically exported in CMYK. Amazon KDP and Apple Books both require RGB for ebook covers — KDP says Kindle does not support CMYK — even if the file looks correct when opened in Photoshop.',
  },
  {
    mistake: 'Cover below minimum dimensions',
    detail: 'KDP\'s stated minimum is 1000 × 625px (height × width); the ideal is 2560 × 1600px. KDP\'s Cover Image Guidelines note that covers with fewer than 500 pixels on the shortest side are not displayed on the website. Design at 1600 × 2560px so the cover stays sharp on high-DPI screens.',
  },
  {
    mistake: 'Wrong aspect ratio',
    detail: "Ebook stores expect a portrait cover. KDP's ideal is 1.6:1 height to width, so a square (1:1) or landscape image won't fill the cover space. Start from a 1600 × 2560px canvas — the 1.6:1 ratio is built in.",
  },
  {
    mistake: 'Cover not declared in EPUB package',
    detail: "The ebook cover must be declared as a cover-image item in the EPUB OPF manifest — not just inserted as an inline image in the first chapter. Without the manifest declaration, KDP and Apple Books won't recognize it as the cover.",
  },
];

export default function BookCoverSizePage() {
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
        <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 12 }}>
          Book Cover Size Guide
        </h1>
        <p style={{ fontSize: 13, opacity: 0.45, marginBottom: 28, marginTop: 0 }}>Last updated October 2026</p>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 28, opacity: 0.9 }}>
          Cover size requirements vary by retailer and by format — ebook covers and print covers have different dimension standards, color mode requirements, and file format rules. This page covers cover sizes for every major retailer, ebook and print. Each section links to the full specifications for that platform and to the platform&apos;s own help page.
        </p>

        {/* Platform sections — read from coverRequirements.js */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 8 }}>Book cover size by platform</h2>
        <p style={{ fontSize: 15, opacity: 0.7, marginBottom: 20 }}>
          Key specs only, as published by each platform. Open a platform page for everything else.
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginBottom: 40 }}>
          {platforms.map((p) => (
            <section key={p.slug} style={{ border: '1px solid rgba(201,168,76,0.25)', borderRadius: 10, padding: '16px 18px' }}>
              <h3 style={{ fontSize: 18, fontWeight: 700, margin: '0 0 10px' }}>{p.hubLabel}</h3>
              <dl style={{ margin: '0 0 12px', fontSize: 14, lineHeight: 1.5 }}>
                {hubSpecs(p).map((s) => (
                  <div key={s.label} style={{ marginBottom: 6 }}>
                    <dt style={{ fontWeight: 600, opacity: 0.65, fontSize: 12, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{s.label}</dt>
                    <dd style={{ margin: 0 }}>{s.value}</dd>
                  </div>
                ))}
              </dl>
              <Link href={`/cover-requirements/${p.slug}`} style={{ ...LINK, fontWeight: 600, fontSize: 14 }}>
                Full {p.platform} {p.kind === 'print' ? 'print' : 'ebook'} cover requirements →
              </Link>
              {p.source && (
                <p style={{ fontSize: 12, opacity: 0.55, margin: '8px 0 0' }}>
                  Source:{' '}
                  <a href={p.source.url} target="_blank" rel="noopener nofollow" style={{ color: 'inherit' }}>{p.source.label}</a>
                </p>
              )}
            </section>
          ))}
        </div>

        <div style={{ margin: '0 0 40px', padding: '18px 20px', borderRadius: 10, background: 'rgba(201,168,76,0.08)', display: 'flex', gap: 16, alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <p style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>Check your ebook cover against KDP and Apple Books rules.</p>
          <TrackedLink href="/tools/cover-checker" style={{ display: 'inline-block', padding: '10px 22px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 15 }}>
            Check your cover before upload →
          </TrackedLink>
        </div>

        {/* Aspect ratio diagram */}
        <figure style={{ margin: '0 0 40px', padding: '20px 20px 16px', background: 'rgba(201,168,76,0.05)', borderRadius: 10, border: '1px solid rgba(201,168,76,0.18)' }}>
          <figcaption style={{ fontSize: 11, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', opacity: 0.45, marginBottom: 14 }}>
            Ebook cover aspect ratio — portrait vs. square
          </figcaption>
          <svg viewBox="0 0 280 165" style={{ width: '100%', maxWidth: 280, display: 'block' }} role="img" aria-label="Diagram comparing a 1.6:1 portrait ebook cover (1600x2560px, Amazon KDP's ideal size) with a square 1:1 cover, which is not a standard ebook cover shape">
            {/* Correct: portrait 1.6:1 */}
            <rect x="18" y="20" width="62" height="99" rx="2" fill="rgba(80,160,80,0.15)" stroke="#52a052" strokeWidth="1.5"/>
            <text x="49" y="14" textAnchor="middle" fontSize="10" fill="#52a052" fontWeight="700">✓ PORTRAIT</text>
            <text x="49" y="67" textAnchor="middle" fontSize="14" fill="#52a052" fontWeight="800">1.6:1</text>
            <text x="49" y="83" textAnchor="middle" fontSize="9" fill="var(--mid,#888)">1600 × 2560 px</text>
            <text x="49" y="133" textAnchor="middle" fontSize="9" fill="var(--mid,#888)">KDP ideal size</text>
            {/* Divider */}
            <line x1="122" y1="10" x2="122" y2="148" stroke="var(--border,#ddd)" strokeWidth="1" strokeDasharray="4,3"/>
            {/* Wrong: square */}
            <rect x="143" y="45" width="76" height="76" rx="2" fill="rgba(200,60,60,0.1)" stroke="#cc4444" strokeWidth="1.5"/>
            <text x="181" y="38" textAnchor="middle" fontSize="10" fill="#cc4444" fontWeight="700">✗ SQUARE</text>
            <text x="181" y="87" textAnchor="middle" fontSize="14" fill="#cc4444" fontWeight="800">1:1</text>
            <text x="181" y="103" textAnchor="middle" fontSize="9" fill="var(--mid,#888)">Square cover</text>
            <text x="181" y="133" textAnchor="middle" fontSize="9" fill="var(--mid,#888)">Not an ebook cover shape</text>
          </svg>
        </figure>

        {/* Ebook cover comparison table — read from coverRequirements.js */}
        <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 16 }}>Ebook cover dimensions compared</h2>
        <div style={{ overflowX: 'auto', marginBottom: 16 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'rgba(201,168,76,0.1)', borderBottom: '2px solid rgba(201,168,76,0.3)' }}>
                <th style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>Platform</th>
                {TABLE_COLUMNS.map((c) => (
                  <th key={c.key} style={{ padding: '12px 16px', textAlign: 'left', fontWeight: 700 }}>{c.label}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ebookPlatforms.map((p, i) => (
                <tr key={p.slug} style={{ borderBottom: '1px solid rgba(201,168,76,0.15)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 16px', fontWeight: 600, whiteSpace: 'nowrap' }}>
                    <Link href={`/cover-requirements/${p.slug}`} style={LINK}>{p.platform}</Link>
                  </td>
                  {TABLE_COLUMNS.map((c) => (
                    <td key={c.key} style={{ padding: '10px 16px', opacity: 0.85, minWidth: 120 }}>
                      {verifiedSpec(p, c.key)?.value ?? '—'}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 14, opacity: 0.65, marginBottom: 8, fontStyle: 'italic' }}>
          A 1600 × 2560 px RGB JPEG meets the published minimum of every store above. Kobo suggests a 3:4 shape and Draft2Digital asks for 1600 × 2400, but both accept a tall portrait cover.
        </p>
        <p style={{ fontSize: 13, opacity: 0.6, marginBottom: 40 }}>
          — means the platform&apos;s own help page doesn&apos;t state that figure. Every value comes from the platform source linked in its section above. Last checked October 5, 2026.
        </p>

        <ChecklistOptin source="checklist-book-cover-size" />

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
          Amazon KDP and IngramSpark both provide cover templates that calculate exact dimensions from your page count and trim size — use those templates rather than calculating manually. Full print cover specifications:{' '}
          <Link href="/cover-requirements/kdp-print-cover" style={LINK}>KDP paperback cover requirements</Link>
          {' and '}
          <Link href="/cover-requirements/ingramspark-print" style={LINK}>IngramSpark print cover requirements</Link>
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
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
          For how to fix each one, see{' '}
          <Link href="/mistakes/ebook-cover-mistakes" style={LINK}>
            ebook cover mistakes that get files rejected
          </Link>
          .
        </p>

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
          {platforms.map((p, i) => (
            <span key={p.slug}>
              {i > 0 && ', '}
              <Link href={`/cover-requirements/${p.slug}`} style={LINK}>{p.hubLabel}</Link>
            </span>
          ))}
          {'. All cover requirement pages at '}
          <Link href="/cover-requirements" style={LINK}>cover requirements hub</Link>
          . Cover errors inside EPUB files are listed in the{' '}
          <Link href="/epub-errors" style={LINK}>EPUB error reference</Link>
          .
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          If your cover was rejected by KDP or Apple Books, see{' '}
          <Link href="/blog/why-your-book-got-rejected" style={LINK}>why your book got rejected</Link>
          {' '}for the full rejection checklist. Check cover dimensions and format before uploading with the{' '}
          <Link href="/tools/cover-checker" style={LINK}>Cover Checker</Link>
          {' '}— free, no account needed. For ebook interior format requirements — EPUB vs PDF vs MOBI and which platforms accept each — see the{' '}
          <Link href="/blog/best-ebook-formats-epub-vs-pdf-vs-mobi" style={LINK}>EPUB vs PDF vs MOBI comparison</Link>
          .
        </p>

        {/* CTA */}
        <div style={{ marginTop: 48, padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Check your cover size and format before uploading — free Cover Checker.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>Checks format, orientation, minimum and recommended size, aspect ratio and file size against KDP&apos;s ebook cover rules, and the shortest side against Apple Books&apos; 1400px minimum.</p>
          <TrackedLink
            href="/tools/cover-checker"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Open Cover Checker →
          </TrackedLink>
        </div>
        <ChecklistOptin source="checklist-book-cover-size" variant="full" />
      </main>
    </>
  );
}
