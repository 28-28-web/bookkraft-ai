import { notFound } from 'next/navigation';
import Link from 'next/link';
import { KDP_GUIDE_ARTICLES, getArticleBySlug } from '@/lib/kdpKeywordGuide';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';

export async function generateStaticParams() {
  return KDP_GUIDE_ARTICLES.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return {
    title: article.metaTitle,
    description: article.metaDescription,
    alternates: { canonical: `https://bookkraftai.com/kdp-keyword-guide/${slug}` },
    robots: 'index, follow',
  };
}

export default async function KdpKeywordGuideArticlePage({ params }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  if (!article) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'KDP Keyword Guide', url: 'https://bookkraftai.com/kdp-keyword-guide' },
    { name: article.title, url: `https://bookkraftai.com/kdp-keyword-guide/${slug}` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: article.faq.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main className="content-page">

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" className="link-mid">Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/kdp-keyword-guide" className="link-mid">KDP Keyword Guide</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>{article.title}</span>
        </nav>

        <h1 className="content-h1">{article.title}</h1>

        <div
          style={{ fontSize: 16, lineHeight: 1.8, color: 'var(--ink)', marginBottom: 40 }}
          dangerouslySetInnerHTML={{ __html: article.body }}
        />

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>
          Common questions
        </h2>
        <div className="content-list">
          {article.faq.map(({ q, a }, i) => (
            <div key={i} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div className="info-card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Find keywords for your specific book
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The KDP Keyword &amp; Category Finder generates 7 long-tail keyword phrases tailored to your
            genre, comparable titles, and target reader — plus ghost category paths with the exact text
            for a KDP support request. Requires the Starter plan, 2 credits per run.
          </p>
          <Link href="/tools/kdp-keyword-finder" className="btn btn-gold btn-cta">
            Find KDP Keywords →
          </Link>
        </div>

        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
          Back to the{' '}
          <Link href="/kdp-keyword-guide" className="link-gold">
            KDP Keyword Guide
          </Link>{' '}
          for more articles on Amazon keyword research and category strategy.
        </p>

      </main>
      <Footer />
    </>
  );
}
