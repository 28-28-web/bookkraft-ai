import Link from 'next/link';
import { COVER_REQUIREMENTS } from '@/lib/coverRequirements';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Book Cover Requirements by Platform — BookKraft AI',
  description: 'Cover image and cover file requirements for Amazon KDP, Apple Books, and IngramSpark. Dimensions, formats, color profiles, and common mistakes.',
  alternates: { canonical: 'https://bookkraftai.com/cover-requirements' },
  robots: 'index, follow',
};

export default function CoverRequirementsIndexPage() {
  return (
    <>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Cover Requirements</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 12 }}>
          Book Cover Requirements by Platform
        </h1>
        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 40 }}>
          Dimension, format, color mode, and file size requirements for each major publishing platform — from ebook cover images to full-wrap print cover PDFs.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {COVER_REQUIREMENTS.map(req => (
            <Link
              key={req.slug}
              href={`/cover-requirements/${req.slug}`}
              style={{ display: 'block', textDecoration: 'none', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', color: 'inherit' }}
            >
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{req.title}</p>
              <p style={{ fontSize: 13, color: 'var(--mid)', margin: 0, lineHeight: 1.5 }}>{req.metaDescription}</p>
              <span style={{ display: 'inline-block', marginTop: 10, fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>View requirements →</span>
            </Link>
          ))}
        </div>

        <div style={{ padding: '24px', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Check your cover before uploading</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 16 }}>
            The free Cover Checker validates your cover image against KDP, Apple Books, and Kobo requirements — minimum dimensions, color mode, and file format — in your browser, no signup required.
          </p>
          <Link
            href="/tools/cover-checker"
            style={{ display: 'inline-block', background: 'var(--gold)', color: 'var(--ink)', padding: '11px 24px', borderRadius: 8, fontWeight: 700, fontSize: 15, textDecoration: 'none' }}
          >
            Check Your Cover Free →
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
