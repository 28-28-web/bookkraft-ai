import Link from 'next/link';
import { PLATFORM_REJECTIONS } from '@/lib/platformRejections';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Why Platforms Reject Ebooks — Rejection Reasons by Platform | BookKraft AI',
  description: 'Common ebook rejection reasons for Amazon KDP, Apple Books, Draft2Digital, Kobo, Google Play Books, Smashwords, IngramSpark, and OverDrive — with fixes for each.',
  alternates: { canonical: 'https://bookkraftai.com/platform-rejection' },
  robots: 'index, follow',
};

export default function PlatformRejectionIndexPage() {
  return (
    <>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Platform Rejection</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 12 }}>
          Why Ebook Platforms Reject Files
        </h1>
        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 40 }}>
          Each publishing platform runs its own validation checks. A file that passes KDP upload can still be rejected by Apple Books or Kobo. Select your platform to see the most common rejection causes and how to fix each one.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {PLATFORM_REJECTIONS.map(r => (
            <Link
              key={r.slug}
              href={`/platform-rejection/${r.slug}`}
              style={{ display: 'block', textDecoration: 'none', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', color: 'inherit' }}
            >
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{r.platform}</p>
              <p style={{ fontSize: 13, color: 'var(--mid)', margin: 0, lineHeight: 1.5 }}>{r.metaDescription}</p>
              <span style={{ display: 'inline-block', marginTop: 10, fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>See rejection causes →</span>
            </Link>
          ))}
        </div>

        <div style={{ padding: '24px', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Catch errors before they cause a rejection</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 16 }}>
            The free EPUB Validator runs EPUBCheck and flags structural, metadata, and navigation errors that KDP, Apple Books, and Draft2Digital use as rejection triggers — before you upload.
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
