import { notFound } from 'next/navigation';
import Link from 'next/link';
import { MISTAKES, getMistakeBySlug } from '@/lib/mistakes';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';
import RelatedLinks from '@/components/RelatedLinks';

export const dynamicParams = false;

export async function generateStaticParams() {
  return MISTAKES.map((m) => ({ slug: m.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const mistake = getMistakeBySlug(slug);
  if (!mistake) return {};
  return {
    title: mistake.metaTitle,
    description: mistake.metaDescription,
    alternates: { canonical: `https://bookkraftai.com/mistakes/${slug}` },
    robots: 'index, follow',
  };
}

const TYPE_HREF = {
  'epub-error': (slug) => `/epub-errors/${slug}`,
  'platform-rejection': (slug) => `/platform-rejection/${slug}`,
  alternative: (slug) => `/alternatives/${slug}`,
  checklist: (slug) => `/checklist/${slug}`,
  mistake: (slug) => `/mistakes/${slug}`,
};

export default async function MistakePage({ params }) {
  const { slug } = await params;
  const mistake = getMistakeBySlug(slug);
  if (!mistake) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'Formatting Mistakes', url: 'https://bookkraftai.com/mistakes' },
    { name: mistake.title, url: `https://bookkraftai.com/mistakes/${slug}` },
  ]);

  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: mistake.title,
    numberOfItems: mistake.mistakes.length,
    itemListElement: mistake.mistakes.map((m, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: m.title,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <main className="content-page">

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" className="link-mid">Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Formatting Mistakes</span>
        </nav>

        <h1 className="content-h1">
          {mistake.title}
        </h1>

        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: mistake.intro }}
        />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {mistake.mistakes.map((item, i) => {
            const linkHref = TYPE_HREF[item.link?.type]?.(item.link?.slug);
            return (
              <div
                key={i}
                style={{
                  borderTop: '1px solid var(--border)',
                  paddingTop: 24,
                  paddingBottom: 24,
                }}
              >
                <h2 style={{ fontSize: '1.05rem', fontWeight: 700, color: 'var(--ink)', marginBottom: 10, display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                  <span aria-hidden="true" className="badge-num">
                    {i + 1}
                  </span>
                  <span>{item.title}</span>
                </h2>
                <div
                  style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)', marginLeft: 36 }}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                />
                {linkHref && (
                  <div style={{ marginLeft: 36, marginTop: 10 }}>
                    <Link
                      href={linkHref}
                      style={{ fontSize: 13, color: 'var(--gold, #c9a84c)', textDecoration: 'none', fontWeight: 600 }}
                    >
                      {item.link.label} →
                    </Link>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)', marginTop: 8, borderTop: '1px solid var(--border)', paddingTop: 24 }}>Common questions</h2>
        <div className="content-list">
          {mistake.faq.map(({ q, a }, i) => (
            <div key={i} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div className="info-card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Validate your EPUB before submitting
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator catches the structural, metadata, and navigation errors covered above — before they become platform rejections. No signup required.
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

        <RelatedLinks related={mistake.related} />

      </main>
      <Footer />
    </>
  );
}
