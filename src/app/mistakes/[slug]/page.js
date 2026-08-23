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
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Formatting Mistakes</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 24 }}>
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
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      minWidth: 26,
                      height: 26,
                      background: 'var(--gold)',
                      color: 'var(--ink)',
                      borderRadius: 6,
                      display: 'inline-flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 13,
                      fontWeight: 800,
                      marginTop: 1,
                    }}
                  >
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
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {mistake.faq.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--sage-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Validate your EPUB before submitting
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator catches the structural, metadata, and navigation errors covered above — before they become platform rejections. No signup required.
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

        <RelatedLinks related={mistake.related} />

      </main>
      <Footer />
    </>
  );
}
