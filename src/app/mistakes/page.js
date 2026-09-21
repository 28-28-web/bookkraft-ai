import Link from 'next/link';
import { MISTAKES } from '@/lib/mistakes';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'EPUB & KDP Formatting Mistakes — BookKraft AI',
  description: 'The most common ebook formatting mistakes that get books rejected on KDP, Apple Books, and Kobo — with the fix for each one before you upload.',
  alternates: { canonical: 'https://bookkraftai.com/mistakes' },
  robots: 'index, follow',
};

export default function MistakesIndexPage() {
  return (
    <>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>

        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Formatting Mistakes</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 12 }}>
          EPUB &amp; KDP Formatting Mistakes
        </h1>
        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 32 }}>
          Most ebook rejections trace back to the same handful of formatting mistakes — problems that survive conversion tools, look fine in preview apps, and only surface as a rejection email after upload. Each guide below breaks down what goes wrong and how to fix it before you submit.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {MISTAKES.map((m) => (
            <Link
              key={m.slug}
              href={`/mistakes/${m.slug}`}
              style={{ display: 'block', textDecoration: 'none', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', color: 'inherit' }}
            >
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{m.title}</p>
              <p style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.55, marginBottom: 8 }}>
                {m.mistakes.length} common mistakes, each with the fix and a link to the full guide.
              </p>
              <span style={{ fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Read guide →</span>
            </Link>
          ))}
        </div>

        <div style={{ marginTop: 48, marginBottom: 8, padding: '24px', background: 'var(--cream, #f7f3ec)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Catch mistakes before you upload</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 8 }}>
            The free{' '}
            <Link href="/tools/epub-validator" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
              EPUB Validator
            </Link>{' '}
            flags the structural, metadata, and navigation errors behind most of these mistakes — no signup required.
          </p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 0 }}>
            Building a new ebook from scratch? The{' '}
            <Link href="/epub-formatting-guide" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
              EPUB formatting guide
            </Link>{' '}
            and the{' '}
            <Link href="/epub-errors" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
              EPUB errors reference
            </Link>{' '}
            cover the full workflow.
          </p>
        </div>

      </main>

      <Footer />
    </>
  );
}
