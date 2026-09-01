import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'KDP Ebook Pricing Strategy — Royalty Tiers, Permafree, and Series Pricing | BookKraft AI',
  description: 'How to price your Kindle ebook on KDP. Covers royalty tier mechanics, series pricing strategy, permafree, Kindle Unlimited considerations, and price testing — with clear hedging on platform-specific numbers that change.',
  alternates: { canonical: 'https://bookkraftai.com/kdp-ebook-pricing' },
  robots: 'index, follow',
};

const strategyRows = [
  {
    strategy: 'Higher price',
    effect: 'Fewer but more committed readers; higher revenue per unit; often more reviews per sale',
    when: 'Established author, non-fiction or business books, gift or specialty markets',
  },
  {
    strategy: 'Lower price',
    effect: 'More units sold; faster also-bought momentum; better for wide distribution outside KU',
    when: 'New author building an audience, first in a long series, volume-driven strategy',
  },
  {
    strategy: 'First in series free or low',
    effect: 'Loss leader — drives series read-through where revenue comes from books 2+',
    when: 'Series with 3+ books completed or close to release',
  },
  {
    strategy: 'Permafree',
    effect: 'Permanent free listing (via Amazon price-match); maximum discovery, zero direct revenue per unit',
    when: 'First in a long series (5+ books), or as a mailing list lead magnet',
  },
  {
    strategy: 'Launch price, then raise',
    effect: 'Rewards early readers; generates initial review velocity; normalizes to full price',
    when: 'Any book with a mailing list or existing audience to notify at launch',
  },
];

const faqs = [
  {
    q: 'What are the KDP royalty tiers and how do they affect pricing?',
    a: 'KDP offers two royalty rate tiers for ebook sales. The tier your book qualifies for depends on your list price relative to thresholds KDP sets. The specific percentages and price thresholds are published in your KDP dashboard and can change — check the current royalty rate table before setting your price. The tiers create a real pricing incentive: books priced below the lower threshold qualify only for the lower rate, making certain price points financially disadvantageous even if they seem competitive at face value.',
  },
  {
    q: 'What is permafree and how does it work on Amazon?',
    a: 'Permafree refers to a book listed permanently at $0 on Amazon. KDP does not allow you to set a price of $0 directly. The established workaround: price the book at $0 on another major retailer that allows free pricing (Kobo, Apple Books, Draft2Digital). Then report the lower price to Amazon via the product page\'s "tell us about a lower price" link. Amazon may then price-match the book to $0. This price-match is voluntary on Amazon\'s part and not guaranteed, but it is a widely used mechanism that works for many authors. Amazon can also reverse the price-match at any time.',
  },
  {
    q: 'Can I change my KDP price after publishing?',
    a: 'Yes. You can update your list price at any time in the KDP dashboard without republishing the ebook. Price changes typically take effect within 24–72 hours on Amazon. Other retailers receiving the book through Expanded Distribution may take longer to reflect the change. This makes price testing practical — you can run a promotional price, then return to your standard price without any file changes or re-review.',
  },
  {
    q: 'Does being in Kindle Unlimited affect my pricing strategy?',
    a: 'KDP Select enrollment (required for Kindle Unlimited) requires Amazon exclusivity — the ebook cannot be sold or distributed on other platforms during 90-day enrollment periods. In exchange, enrolled books earn a per-page-read royalty from a shared monthly pool whose rate varies month to month; check current KDP announcements for the per-page figure. KDP Select also unlocks promotional tools: Kindle Countdown Deals (temporary price reductions that can maintain the higher royalty tier rate during the deal — verify current eligibility rules in the dashboard) and free promotion days.',
  },
  {
    q: 'Is it worth pricing low to get more reviews?',
    a: 'Lower prices generate more units sold, which creates more opportunities for readers to leave reviews. However, review rates (reviews per copy sold) are roughly similar across price points — a cheaper book does not automatically produce proportionally more reviews. What lower pricing reliably does is increase sales velocity, which improves also-bought recommendations and category ranking. Whether the volume benefit outweighs the per-unit revenue difference depends on your series length, backlist, and whether you have other books for readers to buy after the first.',
  },
  {
    q: 'What is a Kindle Countdown Deal and how does pricing work during one?',
    a: 'Kindle Countdown Deals are promotional price reductions available to KDP Select-enrolled ebooks. The price drops for a set period (1–7 days), then automatically returns to the original price. During a Countdown Deal, you may earn the higher royalty tier rate even if the promotional price falls below the threshold that would normally qualify — check your KDP dashboard to confirm the current eligibility rules, as these can change. Countdown Deals require the book to be at its standard price for a minimum period before and after the deal.',
  },
];

export default function KdpEbookPricingPage() {
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
      { '@type': 'ListItem', position: 3, name: 'KDP Ebook Pricing', item: 'https://bookkraftai.com/kdp-ebook-pricing' },
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
          <Link href="/kdp-formatting-guide" style={LINK}>KDP Formatting Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>KDP Ebook Pricing</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.7rem, 4vw, 2.5rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 16 }}>
          KDP Ebook Pricing Strategy
        </h1>
        <p style={{ fontSize: 17, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Price is one of the few variables an author controls after a book is published. KDP allows price changes at any time without republishing, making pricing a continuous decision rather than a one-time one. This guide covers how KDP's royalty tiers interact with pricing, established pricing strategies for fiction and non-fiction, permafree mechanics, and Kindle Unlimited considerations. Where platform-specific numbers are involved — royalty percentages, price thresholds, per-page rates — the guide directs you to verify in the KDP dashboard, as these can change.
        </p>

        {/* Royalty tiers */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          How KDP royalty tiers work
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP offers two royalty rate tiers for ebook sales. The tier your book qualifies for depends on your list price relative to thresholds KDP sets. The specific percentages and the price thresholds that determine which tier applies are published in your KDP dashboard — verify them there before setting your price, as these can change.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The practical consequence of the two-tier structure: books priced below the lower threshold qualify only for the lower rate. This means certain price points are financially disadvantageous — the price might seem competitive, but the royalty per sale is substantially lower than books priced above the threshold. Use the KDP royalty calculator in the dashboard to compare royalty income at different price points before committing.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Royalty rates also differ by marketplace — the rate for US sales may differ from UK, DE, JP, or other stores. Check the per-marketplace rates in the KDP dashboard if you are pricing across multiple regions. For the difference between ebook and print royalty models, see the{' '}
          <Link href="/kdp-print-vs-digital" style={LINK}>KDP print vs digital guide</Link>.
        </p>

        {/* Strategy table */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Pricing strategy overview
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Price communicates perceived value and drives different reader behaviors. The right strategy depends on your genre, series length, backlist, and whether you are enrolled in KDP Select:
        </p>
        <div style={{ overflowX: 'auto', marginBottom: 48 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ background: 'var(--cream)', borderBottom: '2px solid var(--border)' }}>
                <th style={{ ...TH, minWidth: 120 }}>Strategy</th>
                <th style={{ ...TH, minWidth: 180 }}>Effect</th>
                <th style={{ ...TH, minWidth: 160 }}>Best for</th>
              </tr>
            </thead>
            <tbody>
              {strategyRows.map((r, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'rgba(0,0,0,0.02)' }}>
                  <td style={{ ...TD, fontWeight: 600, color: 'var(--ink)' }}>{r.strategy}</td>
                  <td style={TD}>{r.effect}</td>
                  <td style={TD}>{r.when}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Series pricing */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Series pricing — the loss leader model
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          The most common series pricing approach: price the first book low or free to maximize read-through, and price books 2+ at full price. The logic is that readers who finish book 1 are highly likely to buy book 2 immediately. A $0.99 or free book 1 that converts 30% of readers into book 2 buyers at $4.99 generates more total revenue than a $3.99 book 1 that converts 10%.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          This model works best when the series has at least 3 books, so readers who enter at book 1 have a full series to consume. A loss leader with no sequel recaptures nothing. The loss leader price is also more defensible with a long series — the lifetime value of a reader across 5 books absorbs a discounted entry point easily.
        </p>

        {/* Permafree */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Permafree mechanics
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          Permafree refers to a book listed permanently at $0 on Amazon. KDP does not allow you to set a price of $0 directly. The established workaround: price the book at $0 on another major retailer that allows free pricing — Kobo, Apple Books, and Draft2Digital all support $0 pricing. Then report the lower price to Amazon via the product page's "tell us about a lower price" link.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Amazon may then price-match to $0. This price-match is voluntary on Amazon's part and is not guaranteed. Amazon can also reverse the price-match at any time. Despite this uncertainty, permafree is a widely used mechanism that has worked consistently for many authors across years — but plan for the possibility of the price-match being removed, especially if you are enrolled in KDP Select (where permafree is incompatible with the exclusivity requirement).
        </p>

        {/* Price testing */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Price testing
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP allows price changes at any time without republishing the ebook. Price changes typically take effect within 24–72 hours on Amazon. This makes systematic price testing practical: set a price for 30–60 days, record units sold and revenue, then change the price and compare.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          Meaningful price tests need enough volume to be statistically interpretable — a book selling 5 units per month will not produce comparable data between price points within a reasonable timeframe. For higher-volume books, comparing 60-day periods at different price points is a practical test. Also factor in external variables: seasonal demand, promotions you ran, and changes to your also-bought recommendations from other sources.
        </p>

        {/* Kindle Unlimited */}
        <h2 style={{ fontSize: 22, fontWeight: 700, color: 'var(--ink)', marginBottom: 12 }}>
          Kindle Unlimited and pricing
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP Select enrollment (required for Kindle Unlimited eligibility) locks the ebook to Amazon exclusively during 90-day enrollment periods. In exchange, enrolled books earn a per-page-read royalty from a shared monthly pool — the per-page rate varies month to month. Check current KDP announcements for the per-page figure before factoring it into your revenue model.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          For genre fiction with a large KU reader base — romance, fantasy, thriller — KU page reads can exceed direct sale revenue substantially. For non-fiction, business, or books with a primarily non-KU readership, the exclusivity cost (losing Apple Books, Kobo, and other channels) may outweigh KU income.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          KDP Select also provides Kindle Countdown Deal access — temporary price reductions that may maintain the higher royalty tier rate during the deal period. Verify current Countdown Deal eligibility rules in your KDP dashboard, as these can change.
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
          For print royalty calculations — how list price minus printing cost differs from the ebook tier model — see the{' '}
          <Link href="/kdp-print-vs-digital" style={LINK}>KDP print vs digital guide</Link>.
          For keyword strategy — how search placement interacts with pricing visibility — see the{' '}
          <Link href="/amazon-keyword-research" style={LINK}>Amazon keyword research guide</Link>.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32, opacity: 0.9 }}>
          For optimizing your KDP product page — description HTML, metadata, and categories — see the{' '}
          <Link href="/kdp-book-description" style={LINK}>KDP book description guide</Link>.
        </p>

        {/* CTA */}
        <div style={{ padding: '28px 24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 8, fontWeight: 600 }}>Find keywords that support your pricing tier.</p>
          <p style={{ fontSize: 15, opacity: 0.75, marginBottom: 20 }}>
            KDP keywords determine which searches surface your book. Optimize for readers who buy at your price point, not just high-volume terms.
          </p>
          <Link
            href="/tools/kdp-keyword-finder"
            style={{ display: 'inline-block', padding: '13px 30px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 700, textDecoration: 'none', fontSize: 16 }}
          >
            Find KDP Keywords →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
