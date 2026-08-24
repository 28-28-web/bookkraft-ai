import { notFound } from 'next/navigation';
import Link from 'next/link';
import { COVER_REQUIREMENTS, getCoverRequirementBySlug } from '@/lib/coverRequirements';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';
import RelatedLinks from '@/components/RelatedLinks';

export const dynamicParams = false;

export async function generateStaticParams() {
  return COVER_REQUIREMENTS.map(c => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const req = getCoverRequirementBySlug(slug);
  if (!req) return {};
  return {
    title: req.metaTitle,
    description: req.metaDescription,
    alternates: { canonical: `https://bookkraftai.com/cover-requirements/${slug}` },
    robots: 'index, follow',
  };
}

export default async function CoverRequirementsPage({ params }) {
  const { slug } = await params;
  const req = getCoverRequirementBySlug(slug);
  if (!req) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'Cover Requirements', url: 'https://bookkraftai.com/cover-requirements' },
    { name: req.title, url: `https://bookkraftai.com/cover-requirements/${slug}` },
  ]);

  const techArticleSchema = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: req.metaTitle,
    description: req.metaDescription,
    datePublished: '2026-08-24',
    dateModified: '2026-08-24',
    author: {
      '@type': 'Organization',
      name: 'BookKraft AI',
      url: 'https://bookkraftai.com',
    },
    publisher: {
      '@type': 'Organization',
      name: 'BookKraft AI',
      url: 'https://bookkraftai.com',
    },
    mainEntityOfPage: {
      '@type': 'WebPage',
      '@id': `https://bookkraftai.com/cover-requirements/${slug}`,
    },
  };

  const faqSchema = req.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: req.faq.map(f => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(techArticleSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <main className="content-page">

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" className="link-mid">Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/cover-requirements" className="link-mid">Cover Requirements</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>{req.platform}</span>
        </nav>

        <h1 className="content-h1">{req.title}</h1>

        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 32, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: req.intro }}
        />

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12, color: 'var(--ink)' }}>
          Specifications at a glance
        </h2>
        <div style={{ border: '1px solid var(--border)', borderRadius: 8, overflow: 'hidden', marginBottom: 40 }}>
          {req.specs.map((spec, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                gap: 16,
                padding: '12px 18px',
                borderTop: i === 0 ? 'none' : '1px solid var(--border)',
                background: i % 2 === 0 ? 'var(--white)' : 'var(--cream)',
              }}
            >
              <span style={{ minWidth: 180, fontWeight: 600, fontSize: 14, color: 'var(--mid)', flexShrink: 0 }}>
                {spec.label}
              </span>
              <span style={{ fontSize: 14, color: 'var(--ink)', lineHeight: 1.5 }}>{spec.value}</span>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10, color: 'var(--ink)' }}>
          Detailed requirements
        </h2>
        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: req.details }}
        />

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>
          Common mistakes
        </h2>
        <div className="content-list" style={{ marginBottom: 40 }}>
          {req.commonMistakes.map((m, i) => (
            <div key={i} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{m.title}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{m.description}</p>
            </div>
          ))}
        </div>

        {req.faq?.length > 0 && (
          <>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>
              Common questions
            </h2>
            <div className="content-list" style={{ marginBottom: 40 }}>
              {req.faq.map(({ q, a }, i) => (
                <div key={i} className="section-divider">
                  <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
                  <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
                </div>
              ))}
            </div>
          </>
        )}

        <div className="info-card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Check your cover against {req.platform} requirements
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free Cover Checker validates dimensions, color mode, and file format against publishing platform requirements — no signup required.
          </p>
          <Link href="/tools/cover-checker" className="btn btn-gold btn-cta">
            Check Your Cover Free →
          </Link>
        </div>

        <RelatedLinks related={req.related} />

      </main>
      <Footer />
    </>
  );
}
