import { notFound } from 'next/navigation';
import Link from 'next/link';
import { VS_ALTERNATIVES, getAlternativeBySlug } from '@/lib/vsAlternatives';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const dynamicParams = false;

export async function generateStaticParams() {
  return VS_ALTERNATIVES.map(a => ({ slug: a.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const alt = getAlternativeBySlug(slug);
  if (!alt) return {};
  return {
    title: alt.metaTitle,
    description: alt.metaDescription,
    alternates: { canonical: `https://bookkraftai.com/alternatives/${slug}` },
    robots: 'index, follow',
  };
}

export default async function AlternativePage({ params }) {
  const { slug } = await params;
  const alt = getAlternativeBySlug(slug);
  if (!alt) notFound();

  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'Alternatives', url: 'https://bookkraftai.com/alternatives' },
    { name: `${alt.tool} Alternative`, url: `https://bookkraftai.com/alternatives/${slug}` },
  ]);

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: alt.faq.map(f => ({
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
          <Link href="/alternatives" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Alternatives</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>{alt.tool} Alternative</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 24 }}>
          Best {alt.tool} Alternative for Indie Authors
        </h1>

        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: alt.intro }}
        />

        <h2 style={{ fontSize: '1.2rem', fontWeight: 700, marginBottom: 20, color: 'var(--ink)' }}>
          Why authors switch from {alt.tool}
        </h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {alt.whySwitch.map((reason, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{reason.title}</p>
              <p style={{ fontSize: 15, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{reason.description}</p>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>
          {alt.tool} vs BookKraft AI
        </h2>
        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid var(--border)' }}>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--ink)', fontWeight: 700 }}>Feature</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--mid)', fontWeight: 600 }}>{alt.tool}</th>
                <th style={{ textAlign: 'left', padding: '10px 12px', color: 'var(--ink)', fontWeight: 700 }}>BookKraft AI</th>
              </tr>
            </thead>
            <tbody>
              {alt.comparison.map(({ feature, them, us }, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border)', background: i % 2 === 0 ? 'transparent' : 'var(--paper-dim)' }}>
                  <td style={{ padding: '10px 12px', color: 'var(--ink)', fontWeight: 500 }}>{feature}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--mid)' }}>{them}</td>
                  <td style={{ padding: '10px 12px', color: 'var(--ink)' }}>{us}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>Common questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {alt.faq.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        <div style={{ background: 'var(--sage-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>
            Try BookKraft AI free — no account required
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            Validate your EPUB, clean up your manuscript, and fix formatting issues in the browser.
          </p>
          <Link
            href="/free-tools"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Try Free Tools →
          </Link>
        </div>

        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
          Also compare:{' '}
          {VS_ALTERNATIVES.filter(other => other.slug !== slug).map((other, i, arr) => (
            <span key={other.slug}>
              <Link href={`/alternatives/${other.slug}`} style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
                {other.tool} alternative
              </Link>
              {i < arr.length - 1 ? ', ' : ''}
            </span>
          ))}
        </p>

        {alt.relatedErrors?.length > 0 && (
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7, marginTop: 8 }}>
            Common EPUB errors switchers run into:{' '}
            {alt.relatedErrors.map((e, i, arr) => (
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
