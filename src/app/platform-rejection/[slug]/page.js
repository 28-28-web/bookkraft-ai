import { notFound } from 'next/navigation';
import Link from 'next/link';
import { PLATFORM_REJECTIONS, getRejectionBySlug } from '@/lib/platformRejections';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';

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
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Why {rejection.platform} Rejects Ebooks</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 24 }}>
          Why Does {rejection.platform} Reject Ebooks?
        </h1>

        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: rejection.intro }}
        />

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, color: 'var(--ink)' }}>
          Most common rejection reasons
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {rejection.topReasons.map((reason, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {rejection.faq.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--sage-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Validate your EPUB before submitting to {rejection.platform}
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator catches the structural, metadata, and navigation errors that {rejection.platform} flags — no signup required.
          </p>
          <Link
            href="/tools/epub-validator"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Validate Your EPUB Free →
          </Link>
        </div>

        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
          For a complete guide to EPUB structure and common errors, see the{' '}
          <Link href="/epub-formatting-guide" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>
          {' '}and the{' '}
          <Link href="/epub-errors" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
            EPUB errors reference
          </Link>.
        </p>

        {rejection.relatedErrors?.length > 0 && (
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7, marginTop: 8 }}>
            EPUB errors commonly linked to {rejection.platform} rejections:{' '}
            {rejection.relatedErrors.map((e, i, arr) => (
              <span key={e.slug}>
                <Link href={`/epub-errors/${e.slug}`} style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
                  {e.label}
                </Link>
                {i < arr.length - 1 ? ', ' : ''}
              </span>
            ))}
          </p>
        )}

      </main>
      <Footer />
    </>
  );
}
