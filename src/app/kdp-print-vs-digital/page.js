import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'KDP Print vs Digital — Ebook and Paperback Differences Explained | BookKraft AI',
  description: 'Publishing on KDP means choosing between ebook and print — or both. This guide covers the format, ISBN, royalty, and distribution differences between KDP ebook and KDP Print paperback and hardcover.',
  alternates: { canonical: 'https://bookkraftai.com/kdp-print-vs-digital' },
  robots: 'index, follow',
};

const comparisonRows = [
  {
    feature: 'File format submitted',
    ebook: 'EPUB or Word DOCX',
    print: 'PDF (interior) + PDF or JPG (cover)',
  },
  {
    feature: 'Amazon identifier',
    ebook: 'ASIN — automatically assigned by Amazon, not an ISBN',
    print: 'ISBN — KDP provides one free, or supply your own from a registration authority',
  },
  {
    feature: 'Royalty model',
    ebook: 'Percentage of list price. KDP offers two rate tiers — the tier depends on your list price. Check current rates and thresholds in the KDP royalty calculator.',
    print: 'List price minus printing cost and distribution fee. The printing cost depends on page count, paper type, trim size, and distribution channel. Use the KDP royalty calculator for current figures.',
  },
  {
    feature: 'Exclusivity option',
    ebook: 'KDP Select (optional) — enrolling locks the ebook to Amazon for 90-day periods in exchange for Kindle Unlimited access and promotional tools',
    print: 'No exclusivity requirement — print books can be sold through other channels simultaneously',
  },
  {
    feature: 'Additional distribution',
    ebook: 'Kindle Unlimited (via KDP Select enrollment)',
    print: 'Expanded Distribution (optional) — makes the book available through distributors supplying bookstores and libraries. Check KDP dashboard for current Expanded Distribution royalty rates.',
  },
  {
    feature: 'Proof before publishing',
    ebook: 'Digital preview via Kindle Previewer or the KDP online previewer',
    print: 'Physical proof copy can be ordered before approving the book for sale',
  },
  {
    feature: 'Inventory and storage',
    ebook: 'None — digital delivery on purchase',
    print: 'Print on demand — Amazon prints and ships each copy when ordered; no inventory to hold',
  },
  {
    feature: 'Time to go live',
    ebook: 'Typically within 24–72 hours of submission',
    print: 'Typically 5–7 business days for paperback; hardcover may take longer',
  },
];

const trimSizes = [
  { size: '5" × 8"', notes: 'Common for fiction and trade paperbacks' },
  { size: '5.25" × 8"', notes: 'Common for fiction' },
  { size: '5.5" × 8.5"', notes: 'Common for fiction and memoir' },
  { size: '6" × 9"', notes: 'Common for non-fiction and business books' },
  { size: '7" × 10"', notes: 'Common for workbooks and illustrated non-fiction' },
  { size: '8.5" × 11"', notes: 'Common for activity books and large-format reference' },
];

const faqs = [
  {
    q: 'Do I need to publish both an ebook and a print version?',
    a: 'No — KDP treats them as separate products with separate listings. You can publish only an ebook, only a print book, or both. They share an Amazon detail page and the "Other formats" section links them, but you manage them independently. Many authors publish the ebook first because it requires no print cost, then add a print version when the ebook validates demand.',
  },
  {
    q: 'Can I use the same ISBN for both the ebook and print versions?',
    a: 'No. ISBNs are format-specific — the same ISBN cannot cover both an ebook and a print book. The print version requires its own ISBN (KDP provides one free, or you can supply your own). KDP ebooks do not use an ISBN at all; they use an ASIN, which is Amazon\'s own identifier system. If you later publish the ebook through other retailers, those platforms may assign their own identifiers or accept an ISBN you supply separately.',
  },
  {
    q: 'How are KDP print royalties calculated?',
    a: 'Print royalties are calculated as your list price minus Amazon\'s printing cost minus Amazon\'s distribution fee. The printing cost depends on page count, paper type (black and white or color interior), and trim size. The distribution fee depends on whether the sale is direct Amazon or through Expanded Distribution. KDP provides a royalty calculator in the dashboard — use it with your actual page count and trim size to see your royalty per sale before you set your price.',
  },
  {
    q: 'What is KDP Select and does it affect print books?',
    a: 'KDP Select is an optional enrollment program for ebooks only — it does not apply to print books. Enrolling an ebook in KDP Select makes it available in Kindle Unlimited (readers can borrow it and you earn a per-page-read royalty from a shared pool) and provides access to promotional tools like Kindle Countdown Deals and free book promotions. The trade-off is that the ebook must be exclusive to Amazon for 90-day enrollment periods — it cannot be sold or distributed on other platforms during enrollment. The specific royalty pool rate varies; check the KDP Select page for current terms.',
  },
  {
    q: 'Does KDP provide a free ISBN for print books?',
    a: 'Yes. KDP provides a free ISBN for print books published through KDP. This is a legitimate ISBN registered in standard databases, but it is assigned to KDP as the publisher of record. If you want an ISBN that lists your own imprint or publishing entity as the publisher of record, obtain an ISBN from the national registration authority for your country (Bowker in the US) and supply it to KDP instead. An ISBN can only be used for one format at one publisher — if you publish both paperback and hardcover, each edition needs its own ISBN.',
  },
  {
    q: 'Which should I publish first — the ebook or the print book?',
    a: 'Ebook first is the lower-cost path to validate demand. The formatting process is faster, there\'s no minimum price tied to printing costs, and you can make changes quickly after publishing. Once you have sales history or reader feedback, adding a print version is straightforward. That said, there\'s no rule — if you have a clear print-focused audience (gift books, children\'s books, illustrated reference), starting with print makes sense too. The two formats are managed independently on KDP.',
  },
];

export default function KdpPrintVsDigitalPage() {
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
      { '@type': 'ListItem', position: 2, name: 'KDP Formatting Guide', item: 'https://bookkraftai.com/kdp-formatting-guide' },
      { '@type': 'ListItem', position: 3, name: 'KDP Print vs Digital', item: 'https://bookkraftai.com/kdp-print-vs-digital' },
    ],
  };

  const LINK = { color: '#9c7f35', textDecoration: 'none' };
  const TH = { padding: '10px 14px', textAlign: 'left', fontWeight: 700, color: 'var(--ink)' };
  const TD_LABEL = { padding: '10px 14px', fontWeight: 600, color: 'var(--ink)', verticalAlign: 'top' };
  const TD = { padding: '10px 14px', color: 'var(--mid)', lineHeight: 1.55, verticalAlign: 'top' };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />

      <main style={{ maxWidth: 720, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={LINK}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/kdp-formatting-guide" style={LINK}>KDP Formatting Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Print vs Digital</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          KDP Print vs Digital
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          KDP offers two separate publishing paths: ebook (Kindle) and print (paperback and hardcover). Each has different file requirements, identifiers, royalty models, and distribution options. They share an Amazon product page and can be published independently — but the formatting, pricing, and exclusivity decisions for one do not carry over to the other.
        </p>

        {/* Comparison table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Print vs digital — side-by-side
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ ...TH, minWidth: 130 }}>Feature</th>
                <th style={{ ...TH, minWidth: 180 }}>KDP Ebook</th>
                <th style={{ ...TH, minWidth: 180 }}>KDP Print</th>
              </tr>
            </thead>
            <tbody>
              {comparisonRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={TD_LABEL}>{r.feature}</td>
                  <td style={TD}>{r.ebook}</td>
                  <td style={TD}>{r.print}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* File formats */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          File format requirements
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Ebook submissions accept EPUB or Word DOCX. KDP converts DOCX internally, though submitting a properly formatted EPUB gives you more control over the final output. For a reference on EPUB structure for Kindle, see the{' '}
          <Link href="/kindle-epub-format" style={LINK}>Kindle EPUB format guide</Link>.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Print submissions require two PDF files: the interior (all pages, correct trim size, no crop marks) and the cover (front, spine, and back with bleed). KDP provides a cover template calculator that generates exact dimensions once you enter your page count and paper type — use it, because spine width depends on page count and paper, and an off-width cover PDF will be rejected.
        </p>

        {/* Trim sizes */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Print trim sizes
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP supports a set of standard trim sizes for paperback and hardcover. Common choices:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 12 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={TH}>Trim Size</th>
                <th style={TH}>Common Use</th>
              </tr>
            </thead>
            <tbody>
              {trimSizes.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ padding: '10px 14px', fontFamily: 'monospace', fontSize: 13, color: 'var(--ink)' }}>{r.size}</td>
                  <td style={{ padding: '10px 14px', color: 'var(--mid)' }}>{r.notes}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 48 }}>
          Check current KDP guidelines for the full list — availability can vary by paper type and binding option.
        </p>

        {/* ISBN */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          ISBN and identifiers
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP ebooks do not use an ISBN. Amazon assigns an ASIN — its own identifier system — automatically. You cannot supply an ISBN for a KDP ebook listing.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP print books require an ISBN. KDP provides one free of charge — a valid ISBN registered in standard bibliographic databases, with KDP listed as the publisher of record. If you want your own imprint listed as publisher of record, obtain an ISBN from the registration authority in your country (Bowker in the US) and supply it during print setup.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          ISBNs are format-specific. The ISBN on a paperback cannot be reused for a hardcover edition, and neither can be used for the ebook. Each distinct format and edition requires its own ISBN.
        </p>

        {/* Royalties */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Royalties — what to check in your KDP dashboard
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP ebook royalties are a percentage of the list price. KDP offers two royalty rate tiers — the applicable tier depends on your list price relative to thresholds KDP sets. The exact percentages and the price thresholds that determine which tier applies are published in your KDP dashboard and can change. Check the current royalty rate table there before setting your price. For pricing strategy — how tiers affect pricing decisions — see the{' '}
          <Link href="/kdp-ebook-pricing" style={LINK}>KDP ebook pricing guide</Link>.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          KDP print royalties are calculated as list price minus printing cost minus distribution fee. The printing cost is determined by page count, paper type, and trim size. The distribution fee differs between standard Amazon sales and Expanded Distribution sales. KDP's royalty calculator in the dashboard accepts your page count and trim size and shows your royalty per sale at different price points — use it before committing to a price.
        </p>

        {/* KDP Select */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          KDP Select and Kindle Unlimited
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP Select is optional and applies only to ebooks. Enrolling makes your ebook available in Kindle Unlimited — readers can borrow it, and you earn a per-page-read royalty from a shared monthly pool. The pool size and per-page rate vary; check KDP announcements for current figures.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          The trade-off is exclusivity: the enrolled ebook cannot be sold or distributed on any other platform during the 90-day enrollment period. Print books have no equivalent exclusivity requirement and can be distributed through Expanded Distribution and other channels simultaneously.
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
          For ebook pricing strategy — how royalty tiers affect price selection, permafree mechanics, and price testing — see the{' '}
          <Link href="/kdp-ebook-pricing" style={LINK}>KDP ebook pricing guide</Link>.
          For converting a print-formatted manuscript to ebook format — handling page references, footnotes, and running headers — see the{' '}
          <Link href="/tools/print-to-digital" style={LINK}>Print-to-Digital Adapter</Link>.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For the full ebook formatting workflow — EPUB structure, metadata, and Kindle submission — see the{' '}
          <Link href="/epub-formatting-guide" style={LINK}>EPUB formatting guide</Link>.
          For KDP metadata fields — title, subtitle, description, and keywords — see the{' '}
          <Link href="/kdp-formatting-guide" style={LINK}>KDP formatting guide</Link>.
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Converting a print manuscript to ebook format?</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>
            Removes page references, footnotes, running headers, and fixed-width tables automatically — any manuscript length, no manual search and replace.
          </p>
          <Link
            href="/tools/print-to-digital"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Convert Print to Digital →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
