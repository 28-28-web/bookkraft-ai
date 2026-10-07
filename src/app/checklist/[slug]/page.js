import { notFound } from 'next/navigation';
import Link from 'next/link';
import { CHECKLISTS, getChecklistBySlug } from '@/lib/checklists';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';
import RelatedLinks from '@/components/RelatedLinks';
import TrackedLink from '@/components/TrackedLink';
import ChecklistOptin from '@/components/ChecklistOptin';
import { TOOLS } from '@/lib/tools';
import { PRICING } from '@/lib/constants';
import { priceText } from '@/lib/fixMap';

const toolName = (slug) => TOOLS.find((t) => t.slug === slug)?.name || slug;
const ROW = { fontSize: 13, color: 'var(--mid)', lineHeight: 1.7, margin: '10px 0 0' };

// Optional per-section extras: free tools, guides, one optional paid tool and
// the KDP help pages the items are based on. Prices come from TOOLS/PRICING.
function SectionExtras({ section }) {
  const { tools, guides, paidTool, sources } = section;
  return (
    <>
      {tools?.length > 0 && (
        <p style={ROW}>
          <strong style={{ color: 'var(--ink)' }}>Free tool{tools.length > 1 ? 's' : ''}:</strong>{' '}
          {tools.map((t, i) => (
            <span key={t.slug}>
              {i > 0 && ' · '}
              <TrackedLink href={`/tools/${t.slug}`} className="link-gold">{toolName(t.slug)}</TrackedLink>
              {priceText(t.slug) && priceText(t.slug) !== 'free' && ` (${priceText(t.slug)})`}
            </span>
          ))}
        </p>
      )}
      {guides?.length > 0 && (
        <p style={ROW}>
          <strong style={{ color: 'var(--ink)' }}>Guide{guides.length > 1 ? 's' : ''}:</strong>{' '}
          {guides.map((g, i) => (
            <span key={g.href}>{i > 0 && ' · '}<TrackedLink href={g.href} className="link-gold">{g.label}</TrackedLink></span>
          ))}
        </p>
      )}
      {paidTool && (
        <p style={ROW}>
          <strong style={{ color: 'var(--ink)' }}>Optional paid tool:</strong>{' '}
          <TrackedLink href={`/tools/${paidTool.slug}`} className="link-gold">{toolName(paidTool.slug)}</TrackedLink>
          {' '}— {priceText(paidTool.slug)} per run; credits come with Starter ({PRICING.starter.label} one-time, {PRICING.starter.credits} credits).
        </p>
      )}
      {sources?.length > 0 && (
        <p style={{ ...ROW, fontSize: 12 }}>
          Based on:{' '}
          {sources.map((s, i) => (
            <span key={s.url}>{i > 0 && ' · '}<a href={s.url} target="_blank" rel="noopener nofollow" style={{ color: 'var(--mid)', textDecoration: 'underline' }}>{s.label}</a></span>
          ))}
        </p>
      )}
    </>
  );
}

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
  const faqSchema = checklist.faq?.length ? {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: checklist.faq.map(({ q, a }) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })),
  } : null;

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }} />
      {faqSchema && <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />}
      <main className="content-page">

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" className="link-mid">Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Publishing Checklists</span>
        </nav>

        <h1 className="content-h1">
          {checklist.title}
        </h1>

        {checklist.dateModified && (
          <p style={{ fontSize: 13, color: 'var(--mid)', margin: '-8px 0 20px' }}>
            Checked against KDP help pages: {new Date(`${checklist.dateModified}T00:00:00Z`).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' })}
          </p>
        )}

        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: checklist.intro }}
        />

        {checklist.optin && <ChecklistOptin source={`checklist-${slug}`} style={{ margin: '0 0 40px' }} />}

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
            <SectionExtras section={section} />
          </div>
        ))}

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)', marginTop: 8 }}>Common questions</h2>
        <div className="content-list">
          {checklist.faq.map(({ q, a }, i) => (
            <div key={i} className="section-divider">
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div className="info-card">
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Validate your EPUB before uploading
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator runs 11 structural checks in your browser — package, metadata, navigation, cover and more — so you can fix common problems before you upload. No signup required.
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

        <RelatedLinks related={checklist.related} />

      </main>
      <Footer />
    </>
  );
}
