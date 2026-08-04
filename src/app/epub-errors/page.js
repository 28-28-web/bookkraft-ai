import Link from 'next/link';
import { EPUB_ERRORS } from '@/lib/epubErrors';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'EPUB Error Reference — BookKraft AI',
  description: 'Plain-English explanations and step-by-step fixes for common EPUB validation errors from EPUBCheck, KDP, Apple Books, and IngramSpark.',
  alternates: { canonical: 'https://bookkraftai.com/epub-errors' },
  robots: 'index, follow',
};

export default function EpubErrorsIndexPage() {
  return (
    <>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>EPUB Errors</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 12 }}>
          EPUB Error Reference
        </h1>
        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 48 }}>
          Plain-English explanations and step-by-step fixes for the EPUB validation errors that cause rejections on KDP, Apple Books, Kobo, and IngramSpark.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {EPUB_ERRORS.map(error => (
            <Link
              key={error.slug}
              href={`/epub-errors/${error.slug}`}
              style={{ display: 'block', textDecoration: 'none', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', color: 'inherit' }}
            >
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{error.title}</p>
              <code style={{ fontSize: 12, color: 'var(--mid)', fontFamily: 'var(--font-jetbrains), monospace', display: 'block', marginBottom: 8, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                {error.errorMessage}
              </code>
              <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Read fix →</span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, paddingTop: 32, borderTop: '1px solid var(--border)' }}>
          <p style={{ fontSize: 14, color: 'var(--mid)', marginBottom: 16 }}>
            Not seeing your error? Run your EPUB through the validator — it flags the most common structural issues automatically.
          </p>
          <Link
            href="/tools/epub-validator"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Validate Your EPUB Free →
          </Link>
        </div>

      </main>

      <Footer />
    </>
  );
}
