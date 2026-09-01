import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'KDP Category Keywords: How to Choose the Right Keywords & Categories | BookKraft AI',
  description: 'KDP categories and keywords work as two separate systems — here is how to choose the right ones for both, how ghost categories work, and how the 10-category limit actually applies.',
  alternates: { canonical: 'https://bookkraftai.com/kdp-category-keywords' },
  robots: 'index, follow',
};

export default function KdpCategoryKeywordsPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is the difference between KDP categories and KDP keywords?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KDP categories control browse placement — the hierarchical lists readers navigate on Amazon when browsing by genre. KDP keywords control search placement — the 7 backend fields (each up to 50 characters) that tell Amazon which reader search queries your book should appear in. Both systems affect discovery and need to be optimized separately.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can KDP keywords affect which categories your book appears in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes — Amazon uses a process called keyword-category gating. Certain categories become available only when specific keyword phrases appear in your backend keyword fields. This means your keyword choices can directly determine which categories your book is eligible for, beyond the ones you formally request through KDP support.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many KDP categories can a book be in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Amazon allows up to 10 categories per book. The standard KDP upload interface lets you select 2. The remaining 8 can be added by emailing KDP support after your book is live with your ASIN and the exact category path text. Ghost categories — those not visible in the upload picker — are also accessible through this process.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a KDP ghost category?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "A ghost category is a real Amazon browse category that exists in Amazon's public browse tree but does not appear in the KDP publisher interface during upload. The only way to get your book into one is to email KDP support with your ASIN and the exact category path. Ghost categories often have less competition because most authors never discover them.",
        },
      },
      {
        '@type': 'Question',
        name: 'Should I optimize KDP keywords or categories first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both at the same time, since they reinforce each other. Your backend keyword phrases signal to Amazon which categories your book belongs in (keyword-category gating), so misaligned keywords and categories create a mixed signal. Research your target categories first, then write keyword phrases that match the genre and audience signals those categories represent.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find the right KDP categories for my book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "Browse comparable books on Amazon — books with a similar audience, genre, and themes. Scroll to the Best Sellers Rank section on their product page and read the full list of category paths. Any path you have never seen in the KDP upload picker is a potential ghost category. Evaluate competition in each category (number of books, BSR needed to rank visibly) before requesting placement.",
        },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'KDP Category Keywords: How to Choose the Right Keywords & Categories',
    description: 'KDP categories and keywords work as two separate discovery systems. This guide covers how each works, how to choose the right options for both, ghost categories, and the 10-category limit.',
    url: 'https://bookkraftai.com/kdp-category-keywords',
    publisher: { '@type': 'Organization', name: 'BookKraft AI', url: 'https://bookkraftai.com' },
  };

  const articles = [
    { slug: 'why-kdp-keywords-arent-ranking', label: '5 KDP keyword mistakes killing your ranking →' },
    { slug: 'kdp-keyword-banned-terms', label: 'KDP keyword banned terms — full list →' },
    { slug: 'how-to-find-amazon-ghost-categories', label: 'How to find Amazon ghost categories →' },
    { slug: 'kdp-category-limit', label: 'KDP category limit — how many can you choose →' },
    { slug: 'backend-keywords-vs-search-terms', label: 'Backend keywords vs Amazon search terms →' },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />

      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/kdp-keyword-guide" style={{ color: 'var(--mid)', textDecoration: 'none' }}>KDP Keyword Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>KDP Category Keywords</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 12 }}>
          KDP Category Keywords: How to Choose the Right Keywords &amp; Categories
        </h1>

        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 32 }}>
          Amazon KDP gives authors two separate discovery systems — backend keyword slots and browse categories.
          Most authors optimize one and ignore the other. Both matter, and they interact.
        </p>

        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20 }}>
          Keywords control which search queries surface your book. Categories control which browse paths place your book
          in front of browsing readers. Amazon also uses a process called keyword-category gating: certain categories
          only become available when specific keyword phrases appear in your backend fields. Misaligned keywords and
          categories create a mixed signal that reduces how much browse traffic your category placements actually deliver.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '32px 0' }} />

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          KDP Categories vs Keywords — What&apos;s the Difference
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 12 }}>
          <strong>KDP categories</strong> are browse paths — the hierarchical lists of genres and sub-genres
          readers navigate on Amazon when they are not searching, just browsing. You select 2 during upload.
          You can request up to 10 total through KDP support. Your placement in a category generates a BSR
          (Best Sellers Rank) for that category — a different number per category, all from the same underlying sales data.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 24 }}>
          <strong>KDP keywords</strong> are backend search fields — 7 slots, each up to 50 characters.
          These are the phrases you send directly to Amazon&apos;s search algorithm to determine which reader
          queries surface your book in results. Your title and subtitle are indexed automatically; the 7 keyword
          fields are for everything else the title doesn&apos;t cover: the sub-genre, the tropes, the setting,
          the target reader&apos;s specific problem or emotional need.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          How to Choose the Right KDP Categories
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 12 }}>
          Start by researching comparable books — titles with a similar audience, genre, and themes. Open their
          Amazon product page and scroll to the <strong>Best Sellers Rank</strong> section near the bottom.
          Amazon lists every category path each book currently ranks in. Any path you have never seen
          in the KDP upload picker is a potential ghost category.
        </p>
        <ul style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', paddingLeft: 20, marginBottom: 12 }}>
          <li style={{ marginBottom: 8 }}><strong>Use leaf-level paths.</strong> Amazon&apos;s browse tree is hierarchical. Your placement at the most specific level (the leaf node) implies presence in all parent levels above it. Requesting a parent node like &ldquo;Books &gt; Mystery&rdquo; wastes a slot that leaf-level placement already covers.</li>
          <li style={{ marginBottom: 8 }}><strong>Balance reach and winnability.</strong> A large category with 50,000 books is harder to rank in. A niche category with 800 books may be reachable at a much lower BSR — and a visible rank there drives real browse traffic.</li>
          <li style={{ marginBottom: 8 }}><strong>Select your 2 upload-time categories carefully.</strong> These are the only ones active on launch day. Choose the highest-priority paths first — the ones where your target readers are most likely to browse immediately.</li>
          <li style={{ marginBottom: 8 }}><strong>Request up to 8 more through KDP support.</strong> After your book is live, email KDP support with your ASIN and the full category path text for each additional category. Ghost categories are requested the same way.</li>
        </ul>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 24 }}>
          Full walkthrough: <Link href="/kdp-keyword-guide/kdp-category-limit" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>KDP category limit — how many can you choose →</Link>
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          How to Choose the Right KDP Keywords
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 12 }}>
          Each of your 7 keyword slots is 50 characters. Use every character as a single complete phrase —
          not a comma-separated list of single words. Real readers type phrases: &ldquo;cozy mystery female detective
          small town,&rdquo; &ldquo;how to build passive income online.&rdquo; Amazon&apos;s autocomplete shows which
          phrases buyers search in high enough volume to surface — that&apos;s your primary research starting point.
        </p>
        <ul style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', paddingLeft: 20, marginBottom: 12 }}>
          <li style={{ marginBottom: 8 }}><strong>Don&apos;t repeat your title.</strong> Amazon indexes your title and subtitle automatically. Keyword slots are for angles your title doesn&apos;t cover.</li>
          <li style={{ marginBottom: 8 }}><strong>Avoid banned terms.</strong> Amazon silently strips prohibited keywords — superlatives (&ldquo;best,&rdquo; &ldquo;top&rdquo;), price references (&ldquo;sale,&rdquo; &ldquo;cheap&rdquo;), category names, competitor names. No error message, no warning.</li>
          <li style={{ marginBottom: 8 }}><strong>Match your genre&apos;s search pattern.</strong> Fiction readers search by trope and experience. Nonfiction readers search by problem and outcome. Using the wrong pattern reduces how well your phrases match real buyer queries.</li>
          <li style={{ marginBottom: 8 }}><strong>Review every 60–90 days.</strong> New competing titles, seasonal trends, and algorithm changes degrade keyword performance over time.</li>
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          <Link href="/kdp-keyword-guide/why-kdp-keywords-arent-ranking" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>5 KDP keyword mistakes killing your ranking →</Link>
          <Link href="/kdp-keyword-guide/kdp-keyword-banned-terms" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Full banned keyword terms list →</Link>
          <Link href="/kdp-keyword-guide/backend-keywords-vs-search-terms" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Backend keywords vs Amazon search terms →</Link>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          Ghost Categories
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 24 }}>
          Ghost categories exist in Amazon&apos;s public browse tree but are invisible in the KDP publisher
          interface — you cannot select them during upload. The only way in is to email KDP support
          after publishing with your ASIN and the exact category path. Ghost categories typically have
          far less competition because most authors never discover them. They are found by reading the full
          category list on comparable books&apos; product pages.{' '}
          <Link href="/kdp-keyword-guide/how-to-find-amazon-ghost-categories" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>How to find Amazon ghost categories →</Link>
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          Category Limit
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32 }}>
          The KDP upload interface limits you to 2 categories. Amazon&apos;s actual policy allows 10.
          The remaining 8 are accessible by contacting KDP support after publishing — a manual step most
          authors skip, leaving 8 category slots empty.{' '}
          <Link href="/kdp-keyword-guide/kdp-category-limit" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>Full breakdown of the 10-category limit →</Link>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 32px' }} />

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>What is the difference between KDP categories and KDP keywords?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>Categories control browse placement — which hierarchical genre paths on Amazon show your book to browsing readers. Keywords control search placement — the 7 backend fields that determine which reader search queries surface your book. Both affect discovery and need separate optimization.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>Can KDP keywords affect which categories your book appears in?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>Yes. Amazon uses keyword-category gating — some categories only become available when specific keyword phrases appear in your backend fields. This means keyword choices can directly determine category eligibility, beyond the categories you formally request through KDP support.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>How many KDP categories can a book be in?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>Up to 10 total. The standard upload interface allows 2. The remaining 8 are added by emailing KDP support after your book is live with your ASIN and the full category path text. Ghost categories are requested through the same process.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>What is a KDP ghost category?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>A real Amazon browse category that exists in the public browse tree but does not appear in the KDP publisher interface during upload. The only way in is to email KDP support with your ASIN and the exact category path text. Ghost categories often have much less competition because most authors never discover them.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>Should I optimize KDP keywords or categories first?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>Both at the same time, since they reinforce each other. Research your target categories first, then write keyword phrases that match the same genre and audience signals. A mismatch between keyword phrases and category placements reduces how much browse traffic category placement actually delivers.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>How do I find the right KDP categories for my book?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>Browse comparable books on Amazon and read the Best Sellers Rank section on their product pages — Amazon lists every category path each book ranks in. Any path you have never seen in the KDP upload picker is a potential ghost category to request through KDP support.</p>
          </div>

        </div>

        {/* CTA */}
        <div style={{ marginBottom: 48, padding: '24px', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--cream)' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>KDP Keyword &amp; Category Finder</p>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(247,243,236,.7)', marginBottom: 16 }}>
            Generates 7 keyword phrases for your backend fields and full category paths — including ghost categories —
            tailored to your genre, comparable titles, and target reader. 1 credit per run.
            Included in the Starter plan ($19 one-time).
          </p>
          <Link
            href="/tools/kdp-keyword-finder"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Use the KDP Keyword &amp; Category Finder →
          </Link>
        </div>

        {/* Related guides */}
        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Related Guides
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 40 }}>
          {articles.map(({ slug, label }) => (
            <Link
              key={slug}
              href={`/kdp-keyword-guide/${slug}`}
              style={{ fontSize: 15, color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}
            >
              {label}
            </Link>
          ))}
          <Link href="/kdp-keyword-guide" style={{ fontSize: 15, color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
            Full KDP Keyword Guide →
          </Link>
          <Link href="/epub-formatting-guide" style={{ fontSize: 15, color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
            KDP Formatting Guide →
          </Link>
          <Link href="/amazon-keyword-research" style={{ fontSize: 15, color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>
            Amazon Keyword Research for Books →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
