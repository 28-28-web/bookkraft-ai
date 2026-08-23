import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CHECKLISTS, getChecklistBySlug } from '@/lib/checklists';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';
import RelatedLinks from '@/components/RelatedLinks';

export const dynamicParams = false;

export async function generateStaticParams() {
  return CHECKLISTS.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) return {};
  return {
    title: checklist.metaTitle,
    description: checklist.metaDescription,
    alternates: { canonical: `https://bookkraftai.com/checklist/${slug}` },
    robots: 'index, follow',
  };
}

export default async function ChecklistPage({ params }) {
  const { slug } = await params;
  const checklist = getChecklistBySlug(slug);
  if (!checklist) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'Publishing Checklists', url: 'https://bookkraftai.com/checklist' },
    { name: checklist.title, url: `https://bookkraftai.com/checklist/${slug}` },
  ]);

  let position = 1;
  const itemListElement = [];
  for (const section of checklist.sections) {
    for (const item of section.items) {
      itemListElement.push({ '@type': 'ListItem', position: position++, name: item });
    }
  }
  const itemListSchema = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: checklist.title,
    numberOfItems: itemListElement.length,
    itemListElement,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Publishing Checklists</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 24 }}>
          {checklist.title}
        </h1>

        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: checklist.intro }}
        />

        {checklist.sections.map((section, si) => (
          <div key={si} style={{ marginBottom: 36 }}>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 14, color: 'var(--ink)' }}>
              {section.heading}
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
              {section.items.map((item, ii) => (
                <div
                  key={ii}
                  style={{
                    display: 'flex',
                    gap: 12,
                    alignItems: 'flex-start',
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: 'var(--ink)',
                    borderTop: ii === 0 ? '1px solid var(--border)' : 'none',
                    paddingTop: ii === 0 ? 14 : 0,
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      flexShrink: 0,
                      width: 18,
                      height: 18,
                      marginTop: 2,
                      border: '1.5px solid var(--border)',
                      borderRadius: 4,
                      display: 'inline-block',
                    }}
                  />
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        ))}

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)', marginTop: 8 }}>Common questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {checklist.faq.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--sage-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Validate your EPUB before uploading
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator catches structural, metadata, and navigation errors — the same issues this checklist covers — before they become platform rejections. No signup required.
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

        <RelatedLinks related={checklist.related} />

      </main>
      <Footer />
    </>
  );
}
