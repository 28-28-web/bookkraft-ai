import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'KDP Category Keywords: How to Choose the Right Keywords & Categories | BookKraft AI',
  description: 'KDP categories and keywords work together to place your book on Amazon. Here is how to choose your 3 categories and your 7 keyword phrases, based on what KDP\'s help pages actually say.',
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
          text: 'KDP categories control browse placement — the digital shelves readers navigate on Amazon when browsing by genre. KDP keywords are up to seven keywords or short phrases you add to help readers find your book in search. KDP says categories, along with your keywords, tell Amazon where to "shelve" your book, so the two work together.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can KDP keywords affect which categories your book appears in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'KDP says that if you are not finding a specific category for your book, you can use keywords to help Amazon determine how it "shelves" your book in the store. KDP does not publish a list of keywords that unlock particular categories.',
        },
      },
      {
        '@type': 'Question',
        name: 'How many KDP categories can a book be in?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "KDP's Categories help page says you can select 3 categories when creating a book in KDP. Its current help pages do not describe a way to add more by contacting KDP support.",
        },
      },
      {
        '@type': 'Question',
        name: 'What is a KDP ghost category?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "\"Ghost category\" is an author-community term for a category path you can see on Amazon that doesn't appear in KDP's category list. KDP's current help pages describe no way to request one. KDP suggests picking the closest matching category available, and using keywords when you can't find a specific category.",
        },
      },
      {
        '@type': 'Question',
        name: 'Should I optimize KDP keywords or categories first?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Both at the same time, since KDP says they work together to tell Amazon where to shelve your book. Research your target categories first, then write keyword phrases that match the same genre and audience.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find the right KDP categories for my book?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: "KDP's first tip is to research your genre: see where similar books are categorized and decide whether your book fits there. Open comparable books' product pages, read the categories in their Best Sellers Rank section, then choose your 3 from KDP's list — or the closest match it offers.",
        },
      },
    ],
  };

  const articleSchema = {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: 'KDP Category Keywords: How to Choose the Right Keywords & Categories',
    description: 'KDP categories and keywords work together to place your book on Amazon. This guide covers how each works, how to choose your 3 categories and 7 keyword phrases, and what to do when a category is not in KDP\'s list.',
    url: 'https://bookkraftai.com/kdp-category-keywords',
    publisher: { '@type': 'Organization', name: 'BookKraft AI', url: 'https://bookkraftai.com' },
  };

  const articles = [
    { slug: 'why-kdp-keywords-arent-ranking', label: '5 KDP keyword mistakes killing your ranking →' },
    { slug: 'kdp-keyword-banned-terms', label: 'What KDP says to avoid in keywords →' },
    { slug: 'how-to-find-amazon-ghost-categories', label: 'Amazon ghost categories — what KDP\'s 3-category rule means →' },
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
          Keywords help readers find your book when they search. Categories place your book on the browse shelves
          readers navigate. KDP&apos;s{' '}
          <a href="https://kdp.amazon.com/en_US/help/topic/G200652170" target="_blank" rel="noopener nofollow" style={{ color: 'var(--gold)' }}>Categories help page</a>{' '}
          says categories, &ldquo;along with keywords you select, tell Amazon where to &lsquo;shelve&rsquo; your
          book,&rdquo; and that if you can&apos;t find a specific category, keywords can help Amazon decide how to
          shelve it. So choose both together, and make them describe the same book.
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '32px 0' }} />

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          KDP Categories vs Keywords — What&apos;s the Difference
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 12 }}>
          <strong>KDP categories</strong> are browse paths — the hierarchical lists of genres and sub-genres
          readers navigate on Amazon when they are not searching, just browsing. KDP says you can select
          3 categories when creating a book in KDP. Your placement in a category generates a BSR
          (Best Sellers Rank) for that category — a different number per category, all from the same underlying sales data.
        </p>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 24 }}>
          <strong>KDP keywords</strong> are backend search fields — up to seven keywords or short phrases, each
          within the character limit KDP shows in the field. These are the phrases you send directly to Amazon&apos;s search algorithm to determine which reader
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
          Amazon lists the category paths each book currently ranks in. This is KDP&apos;s own first tip:
          &ldquo;See where similar books are categorized and determine if your book fits there.&rdquo;
        </p>
        <ul style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', paddingLeft: 20, marginBottom: 12 }}>
          <li style={{ marginBottom: 8 }}><strong>Pick accurate categories.</strong> KDP says to choose categories that describe your book, and that it may remove or change a category that isn&apos;t related to the book&apos;s content.</li>
          <li style={{ marginBottom: 8 }}><strong>Balance reach and winnability.</strong> KDP&apos;s advice is to aim for categories &ldquo;popular enough to have reader interest, but not so broad (or specific) that your book gets lost.&rdquo; In practice, a large category is harder to rank in, while a smaller category that fits well may be reachable at a much lower BSR.</li>
          <li style={{ marginBottom: 8 }}><strong>Choose your 3 from KDP&apos;s list.</strong> If a path you found on Amazon isn&apos;t offered in KDP, KDP suggests picking the closest matching category available — and putting the specific angle in your keywords instead.</li>
          <li style={{ marginBottom: 8 }}><strong>Check your primary marketplace and format.</strong> KDP notes that some categories aren&apos;t available for every format, and that categories differ between marketplaces.</li>
        </ul>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 24 }}>
          Full walkthrough: <Link href="/kdp-keyword-guide/kdp-category-limit" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>KDP category limit — how many can you choose →</Link>
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          How to Choose the Right KDP Keywords
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 12 }}>
          KDP asks for up to seven keywords or short phrases and tells you to keep an eye on the character
          limit in the text field. KDP&apos;s guidance: specific words work better than general ones, and combine
          words in the most logical order — customers search &ldquo;military science fiction,&rdquo; not &ldquo;fiction
          science military.&rdquo; Amazon&apos;s autocomplete suggestions can be a starting point for research.
        </p>
        <ul style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', paddingLeft: 20, marginBottom: 12 }}>
          <li style={{ marginBottom: 8 }}><strong>Don&apos;t repeat your title.</strong> Amazon indexes your title and subtitle automatically. Keyword slots are for angles your title doesn&apos;t cover.</li>
          <li style={{ marginBottom: 8 }}><strong>Avoid terms KDP lists.</strong> KDP&apos;s keyword guidelines say to avoid subjective claims (&ldquo;best novel ever&rdquo;), time-sensitive words (&ldquo;new,&rdquo; &ldquo;on sale&rdquo;), words already in your categories, names of authors not associated with your book, brands you don&apos;t own, and Amazon program names.</li>
          <li style={{ marginBottom: 8 }}><strong>Match your genre&apos;s search pattern.</strong> Fiction readers search by trope and experience. Nonfiction readers search by problem and outcome. Using the wrong pattern reduces how well your phrases match real buyer queries.</li>
          <li style={{ marginBottom: 8 }}><strong>Review from time to time.</strong> New competing titles and seasonal trends can change how well your keywords work.</li>
        </ul>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginBottom: 24 }}>
          <Link href="/kdp-keyword-guide/why-kdp-keywords-arent-ranking" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>5 KDP keyword mistakes killing your ranking →</Link>
          <Link href="/kdp-keyword-guide/kdp-keyword-banned-terms" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>What KDP says to avoid in keywords →</Link>
          <Link href="/kdp-keyword-guide/backend-keywords-vs-search-terms" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: 15 }}>Backend keywords vs Amazon search terms →</Link>
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          Ghost Categories
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 24 }}>
          &ldquo;Ghost categories&rdquo; is an author-community term for category paths you can see on Amazon
          but can&apos;t pick in KDP. Older advice said to email KDP support to be placed in them; KDP&apos;s current
          help pages describe no such route. When the category you want isn&apos;t offered, KDP suggests picking the
          closest matching category available, and using keywords to help Amazon shelve your book.{' '}
          <Link href="/kdp-keyword-guide/how-to-find-amazon-ghost-categories" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>What KDP&apos;s 3-category rule means for ghost categories →</Link>
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 14 }}>
          Category Limit
        </h2>
        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 32 }}>
          KDP&apos;s{' '}
          <a href="https://kdp.amazon.com/en_US/help/topic/G200652170" target="_blank" rel="noopener nofollow" style={{ color: 'var(--gold)' }}>Categories help page</a>{' '}
          says you can select 3 categories when creating a book in KDP. You may still see older advice about
          picking 2 and requesting 8 more from KDP support for a total of 10 — KDP&apos;s current help pages
          don&apos;t describe that process. You can change your 3 categories later from Edit details; KDP says new
          categories can take up to 72 hours to display.{' '}
          <Link href="/kdp-keyword-guide/kdp-category-limit" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600 }}>KDP category limit — the full breakdown →</Link>
        </p>

        <hr style={{ border: 'none', borderTop: '1px solid var(--border)', margin: '0 0 32px' }} />

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
          Frequently Asked Questions
        </h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>What is the difference between KDP categories and KDP keywords?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>Categories control browse placement — the digital shelves on Amazon that show your book to browsing readers. Keywords are up to seven keywords or short phrases that help readers find your book in search. KDP says the two together tell Amazon where to &ldquo;shelve&rdquo; your book.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>Can KDP keywords affect which categories your book appears in?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>KDP says that if you aren&apos;t finding a specific category for your book, you can use keywords to help Amazon determine how it shelves your book. KDP doesn&apos;t publish a list of keywords that unlock particular categories.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>How many KDP categories can a book be in?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>KDP&apos;s Categories help page says you can select 3 categories when creating a book in KDP. Its current help pages don&apos;t describe a way to add more by contacting KDP support.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>What is a KDP ghost category?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>&ldquo;Ghost category&rdquo; is an author-community term for a category path you can see on Amazon that doesn&apos;t appear in KDP&apos;s category list. KDP&apos;s current help pages describe no way to request one. KDP suggests picking the closest matching category available, and using keywords when you can&apos;t find a specific category.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>Should I optimize KDP keywords or categories first?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>Both at the same time, since KDP says they work together to tell Amazon where to shelve your book. Research your target categories first, then write keyword phrases that match the same genre and audience.</p>
          </div>

          <div>
            <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>How do I find the right KDP categories for my book?</p>
            <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)' }}>KDP&apos;s first tip is to research your genre: see where similar books are categorized and decide whether your book fits there. Open comparable books&apos; product pages, read the categories in their Best Sellers Rank section, then choose your 3 from KDP&apos;s list — or the closest match it offers.</p>
          </div>

        </div>

        {/* CTA */}
        <div style={{ marginBottom: 48, padding: '24px', background: 'var(--ink)', border: '1px solid var(--border)', borderRadius: 10, color: 'var(--cream)' }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--cream)', marginBottom: 8 }}>KDP Keyword &amp; Category Finder</p>
          <p style={{ fontSize: 14, lineHeight: 1.65, color: 'rgba(247,243,236,.7)', marginBottom: 16 }}>
            Generates 7 keyword phrases for your backend fields and suggested category paths to check against
            KDP&apos;s list, tailored to your genre, comparable titles, and target reader. 2 credits per run.
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
