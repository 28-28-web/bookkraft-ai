import Link from 'next/link';
import { CHECKLISTS } from '@/lib/checklists';
import Footer from '@/components/Footer';

export const metadata = {
  title: 'Ebook Publishing Checklists — Pre-Upload and Platform-Specific | BookKraft AI',
  description: 'Pre-upload EPUB formatting checklists for KDP, Apple Books, and Draft2Digital. Run through each point before submitting to avoid rejections.',
  alternates: { canonical: 'https://bookkraftai.com/checklist' },
  robots: 'index, follow',
};

export default function ChecklistIndexPage() {
  return (
    <>
      <main style={{ maxWidth: 700, margin: '0 auto', padding: '56px 24px 80px' }}>
        <nav aria-label="Breadcrumb" style={{ fontSize: 13, color: 'var(--mid)', marginBottom: 32 }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 8px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Publishing Checklists</span>
        </nav>

        <h1 style={{ fontSize: 'clamp(1.6rem, 4vw, 2.25rem)', fontWeight: 800, lineHeight: 1.2, color: 'var(--ink)', marginBottom: 12 }}>
          Ebook Publishing Checklists
        </h1>
        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 40 }}>
          Run through these checklists before submitting your ebook. Each one is platform-specific — KDP, Apple Books, and general EPUB — covering the points that cause rejections when missed.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 16, marginBottom: 48 }}>
          {CHECKLISTS.map(c => (
            <Link
              key={c.slug}
              href={`/checklist/${c.slug}`}
              style={{ display: 'block', textDecoration: 'none', background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 10, padding: '20px 24px', color: 'inherit' }}
            >
              <p style={{ fontWeight: 700, fontSize: 15, color: 'var(--ink)', marginBottom: 6 }}>{c.title}</p>
              <p style={{ fontSize: 13, color: 'var(--mid)', margin: 0, lineHeight: 1.5 }}>{c.metaDescription}</p>
              <span style={{ display: 'inline-block', marginTop: 10, fontSize: 13, color: 'var(--gold)', fontWeight: 600 }}>Open checklist →</span>
            </Link>
          ))}
        </div>

        <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 24 }}>
          For an overall publishing readiness check — metadata completeness, formatting quality, and store-specific compliance scored together — see the{' '}
          <Link href="/tools/publishing-score" style={{ color: 'var(--gold)', textDecoration: 'none' }}>
            Publishing Score tool
          </Link>
          .
        </p>

        <div style={{ padding: '24px', background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Validate before you check off</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 16 }}>
            The free EPUB Validator runs EPUBCheck and catches the structural errors these checklists cover — missing metadata, broken spine, nav.xhtml issues — before you upload to any platform.
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
