import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PLATFORM_REJECTIONS, getRejectionBySlug } from '@/lib/platformRejections';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';
import RelatedLinks from '@/components/RelatedLinks';

export const dynamicParams = false;

export async function generateStaticParams() {
  return PLATFORM_REJECTIONS.map(r => ({ slug: r.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const rejection = getRejectionBySlug(slug);
  if (!rejection) return {};
  return {
    title: rejection.metaTitle,
    description: rejection.metaDescription,
    alternates: { canonical: `https://bookkraftai.com/platform-rejection/${slug}` },
    robots: 'index, follow',
  };
}

export default async function PlatformRejectionPage({ params }) {
  const { slug } = await params;
  const rejection = getRejectionBySlug(slug);
  if (!rejection) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'Platform Rejection', url: 'https://bookkraftai.com/platform-rejection' },
    { name: rejection.platform, url: `https://bookkraftai.com/platform-rejection/${slug}` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: rejection.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <main className="content-page">

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" className="link-mid">Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Why {rejection.platform} Rejects Ebooks</span>
        </nav>

        <h1 className="content-h1">
          Why Does {rejection.platform} Reject Ebooks?
        </h1>

        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: rejection.intro }}
        />

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, color: 'var(--ink)' }}>
          Most common rejection reasons
        </h2>
        <div className="content-list">
          {rejection.topReasons.map((reason, i) => (
            <div key={i} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>
                {i + 1}. {reason.title}
              </p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>
                {reason.description}
              </p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12, color: 'var(--ink)' }}>
          How to fix it before resubmitting
        </h2>
        <div
          style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: rejection.howToFix }}
        />

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>Common questions</h2>
        <div className="content-list">
          {rejection.faq.map(({ q, a }, i) => (
            <div key={i} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div className="info-card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Validate your EPUB before submitting to {rejection.platform}
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator catches the structural, metadata, and navigation errors that {rejection.platform} flags — no signup required.
          </p>
          <Link href="/tools/epub-validator" className="btn btn-gold btn-cta">
            Validate Your EPUB Free →
          </Link>
        </div>

        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
          For a complete guide to EPUB structure and common errors, see the{' '}
          <Link href="/epub-formatting-guide" className="link-gold">
            EPUB formatting guide
          </Link>
          {' '}and the{' '}
          <Link href="/epub-errors" className="link-gold">
            EPUB errors reference
          </Link>.
        </p>

        <RelatedLinks related={rejection.related} />

      </main>
      <Footer />
    </>
  );
}
