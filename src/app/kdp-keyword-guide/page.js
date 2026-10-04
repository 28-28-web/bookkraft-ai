import Link from 'next/link';
import { KDP_GUIDE_ARTICLES } from '@/lib/kdpKeywordGuide';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'KDP Keyword Guide — Backend Keywords, Banned Terms & Categories | BookKraft AI',
  description:
    'Practical guides on KDP keyword research: how to write phrases that get found, how KDP\'s 3-category limit works, and how to diagnose why your keywords are underperforming.',
  alternates: { canonical: 'https://bookkraftai.com/kdp-keyword-guide' },
  robots: 'index, follow',
};

export default function KdpKeywordGuideIndexPage() {
  return (
    <>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>KDP Keyword Guide</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 12 }}>
          KDP Keyword Guide
        </h1>
        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 32 }}>
          Practical guides on Amazon KDP keyword research — how to write phrases that get your book found,
          how KDP&apos;s 3-category limit works, and how to diagnose why your current keywords are underperforming.
        </p>

        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, opacity: 0.9 }}>
          KDP lets you add up to seven keywords or short phrases to each book. Together with the
          categories you choose, they tell Amazon where to &ldquo;shelve&rdquo; your book in its store.
          Most authors fill the keyword boxes in quickly during upload and never revisit them, even though
          KDP lets you change keywords as often as you like.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 40, opacity: 0.9 }}>
          The guides below cover the mistakes that hold keywords back, how to research phrases that match
          what readers actually type, and how categories and keywords work together.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          What KDP&apos;s own help pages say
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          These are the official rules, each linked to the KDP Help Center page it comes from. KDP updates
          those pages from time to time, so the linked page is always the final word.
        </p>
        <ul style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, paddingLeft: 20, opacity: 0.9 }}>
          <li style={{ marginBottom: 12 }}>
            <strong>Up to seven keywords or short phrases.</strong> KDP asks you to &ldquo;keep an eye on
            the character limit in the text field&rdquo; rather than stating a number on its help page, so
            check the limit shown in the field itself. Source:{' '}
            <a href="https://kdp.amazon.com/en_US/help/topic/G201298500" target="_blank" rel="noopener nofollow" style={{ color: 'var(--gold)' }}>Make Your Book More Discoverable with Keywords</a>.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong>What to leave out.</strong> KDP lists information to avoid in keywords, including words
            already in your title or contributor names, subjective claims such as &ldquo;best novel
            ever,&rdquo; time-sensitive words such as &ldquo;new&rdquo; or &ldquo;on sale,&rdquo; Amazon
            program names such as &ldquo;Kindle Unlimited&rdquo; or &ldquo;KDP Select,&rdquo; author or
            brand names you aren&apos;t authorized to use, quotation marks, and HTML tags. Source:{' '}
            <a href="https://kdp.amazon.com/en_US/help/topic/G201298500" target="_blank" rel="noopener nofollow" style={{ color: 'var(--gold)' }}>Make Your Book More Discoverable with Keywords</a>.
          </li>
          <li style={{ marginBottom: 12 }}>
            <strong>Three categories.</strong> You can select 3 categories when you set up a book in KDP,
            and KDP says it does not tolerate selecting categories to mislead or manipulate customers.
            Sources:{' '}
            <a href="https://kdp.amazon.com/en_US/help/topic/G200652170" target="_blank" rel="noopener nofollow" style={{ color: 'var(--gold)' }}>KDP Categories</a>,{' '}
            <a href="https://kdp.amazon.com/en_US/help/topic/G201097560" target="_blank" rel="noopener nofollow" style={{ color: 'var(--gold)' }}>Metadata Guidelines for Books</a>.
          </li>
          <li>
            <strong>Changes take up to 72 hours.</strong> Keyword and category updates on an ebook can take
            72 hours to appear, and a new book can take up to 72 hours after it goes live to show in search
            results. Source:{' '}
            <a href="https://kdp.amazon.com/en_US/help/topic/G202173620" target="_blank" rel="noopener nofollow" style={{ color: 'var(--gold)' }}>Timelines</a>.
          </li>
        </ul>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 40, opacity: 0.9 }}>
          Everything else in these guides — how to research phrases, how to read a comparable book&apos;s
          listing, how to choose between two keywords — is our own practical advice, not official KDP policy.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Where to start
        </h2>
        <ul style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 40, paddingLeft: 20, opacity: 0.9 }}>
          <li style={{ marginBottom: 8 }}>
            <strong>Setting up a new book?</strong> Read{' '}
            <Link href="/kdp-keyword-guide/backend-keywords-vs-search-terms" style={{ color: 'var(--gold)', textDecoration: 'none' }}>backend keywords vs search terms</Link>{' '}
            first, so you know what the seven keyword boxes are for.
          </li>
          <li style={{ marginBottom: 8 }}>
            <strong>Not sure a phrase is allowed?</strong> Check it against the{' '}
            <Link href="/kdp-keyword-guide/kdp-keyword-banned-terms" style={{ color: 'var(--gold)', textDecoration: 'none' }}>KDP keyword banned terms</Link>{' '}
            list before you save it.
          </li>
          <li>
            <strong>Book live but hard to find?</strong> Work through{' '}
            <Link href="/kdp-keyword-guide/why-kdp-keywords-arent-ranking" style={{ color: 'var(--gold)', textDecoration: 'none' }}>why your KDP keywords aren&apos;t ranking</Link>.
          </li>
        </ul>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
          Guides
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {KDP_GUIDE_ARTICLES.map(article => (
            <Link
              key={article.slug}
              href={`/kdp-keyword-guide/${article.slug}`}
              style={{ display: 'block', textDecoration: 'none', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', color: 'inherit' }}
            >
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{article.title}</p>
              <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.55, margin: '0 0 10px' }}>{article.metaDescription}</p>
              <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Read guide →</span>
            </Link>
          ))}
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.75, color: 'var(--mid)', marginTop: 32, marginBottom: 40 }}>
          For choosing your 3 KDP categories and how they work with your keywords, see the{' '}
          <Link href="/kdp-category-keywords" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            KDP category keywords guide
          </Link>
          .
        </p>

        <div style={{ marginTop: 48, padding: '24px', background: 'var(--cream, #f7f3ec)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Get keywords for your specific book</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 16 }}>
            The KDP Keyword &amp; Category Finder generates 7 long-tail keyword phrases tailored to your
            genre, comparable titles, and target reader — plus category paths that fit your book.
          </p>
          <Link
            href="/tools/kdp-keyword-finder"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Find KDP Keywords →
          </Link>
        </div>

      </main>
      <Footer />
    </>
  );
}
