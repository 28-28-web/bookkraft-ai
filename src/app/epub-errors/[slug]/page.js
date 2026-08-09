import { notFound } from 'next/navigation';
import Link from 'next/link';
import { EPUB_ERRORS, getErrorBySlug } from '@/lib/epubErrors';
import Footer from '@/components/Footer';

export async function generateStaticParams() {
  return EPUB_ERRORS.map(e => ({ slug: e.slug }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const error = getErrorBySlug(slug);
  if (!error) return {};
  return {
    title: error.metaTitle,
    description: error.metaDescription,
    alternates: { canonical: `https://bookkraftai.com/epub-errors/${slug}` },
    robots: 'index, follow',
  };
}

export default async function EpubErrorPage({ params }) {
  const { slug } = await params;
  const error = getErrorBySlug(slug);
  if (!error) notFound();

  return (
    <>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <Link href="/epub-errors" style={{ color: 'var(--mid)', textDecoration: 'none' }}>EPUB Errors</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>{error.title}</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 24 }}>
          {error.title}
        </h1>

        {/* Exact error string */}
        <div style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderLeft: '4px solid #e53e3e', borderRadius: 8, padding: '14px 18px', marginBottom: 32, fontFamily: 'var(--font-jetbrains), monospace', fontSize: 13, lineHeight: 1.7, color: 'var(--ink)', overflowX: 'auto', whiteSpace: 'pre-wrap', wordBreak: 'break-word' }}>
          {error.errorMessage}
        </div>

        {/* Cause */}
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 10, color: 'var(--ink)' }}>What causes this error?</h2>
        <div
          style={{ fontSize: 16, lineHeight: 1.75, marginBottom: 32, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: error.cause }}
        />

        {/* Fix steps */}
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 12, color: 'var(--ink)' }}>How to fix it</h2>
        <div
          style={{ fontSize: 15, lineHeight: 1.8, marginBottom: 40, color: 'var(--ink)' }}
          dangerouslySetInnerHTML={{ __html: error.fixSteps }}
        />

        {/* FAQ */}
        <h2 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: 16, color: 'var(--ink)' }}>Common questions</h2>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 20, marginBottom: 40 }}>
          {error.faq.map(({ q, a }, i) => (
            <div key={i} style={{ borderTop: '1px solid var(--border)', paddingTop: 16 }}>
              <p style={{ fontWeight: 700, fontSize: 15, marginBottom: 6, color: 'var(--ink)' }}>{q}</p>
              <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid)', margin: 0 }}>{a}</p>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div style={{ background: 'var(--sage-bg)', border: '1px solid var(--border)', borderRadius: 12, padding: '24px 28px', marginBottom: 16 }}>
          <p style={{ fontWeight: 700, fontSize: 16, marginBottom: 6, color: 'var(--ink)' }}>Check your EPUB before uploading</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16, lineHeight: 1.6 }}>
            The free EPUB Validator catches structure, metadata, and navigation errors — no signup, no Java, runs in the browser.
          </p>
          <Link
            href="/tools/epub-validator"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Validate Your EPUB Free →
          </Link>
        </div>

        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7 }}>
          Building your EPUB correctly from the start prevents most of these errors before they happen. See the{' '}
          <Link href="/epub-formatting-guide" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>{' '}
          for the full workflow: manuscript cleanup, TOC, front matter, EPUB 3.0 generation, and validation.
        </p>

      </main>

      <Footer />
    </>
  );
}
