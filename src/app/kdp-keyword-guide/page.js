import Link from 'next/link';
import { KDP_GUIDE_ARTICLES } from '@/lib/kdpKeywordGuide';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'KDP Keyword Guide — Amazon Keyword Strategy for Indie Authors | BookKraft AI',
  description:
    'Practical guides on KDP keyword research: how to write phrases that get found, how ghost categories work, and how to diagnose why your keywords are underperforming.',
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
          how ghost categories work, and how to diagnose why your current keywords are underperforming.
        </p>

        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, opacity: 0.9 }}>
          Amazon KDP gives every author 7 keyword fields, each up to 50 characters. Those fields are your
          primary signal to Amazon's search algorithm — the mechanism that determines which reader queries
          surface your book. Most authors fill them in quickly during upload and never revisit them. Most
          authors also wonder why organic discovery never comes.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 40, opacity: 0.9 }}>
          The guides below cover the specific mistakes that kill keyword performance, how to research phrases
          that actually match reader search behavior, and how Amazon's category system works beyond the
          2-category limit most authors accept by default.
        </p>

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
          For KDP browse category selection — including ghost categories and the keyword-category gating system — see the{' '}
          <Link href="/kdp-category-keywords" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            KDP category keywords guide
          </Link>
          .
        </p>

        <div style={{ marginTop: 48, padding: '24px', background: 'var(--cream, #f7f3ec)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Get keywords for your specific book</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 16 }}>
            The KDP Keyword &amp; Category Finder generates 7 long-tail keyword phrases tailored to your
            genre, comparable titles, and target reader — plus ghost category paths you can only access
            by emailing KDP support.
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
