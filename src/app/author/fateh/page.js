import Link from 'next/link';
import Footer from '@/components/Footer';
import { buildBreadcrumbSchema } from '@/lib/seo';

export const metadata = {
  title: 'Fateh — Author at BookKraft AI',
  description: 'Fateh is the founder of Fateh Consortium Ltd (FCLBD) and the person behind BookKraft AI. He writes about the technical side of ebook publishing: validation failures, platform requirements, and formatting mistakes to avoid.',
  alternates: {
    canonical: 'https://bookkraftai.com/author/fateh',
  },
};

export default function AuthorFatehPage() {
  const breadcrumbSchema = buildBreadcrumbSchema([
    { name: 'Home', url: 'https://bookkraftai.com/' },
    { name: 'Blog', url: 'https://bookkraftai.com/blog' },
    { name: 'Fateh', url: 'https://bookkraftai.com/author/fateh' },
  ]);

  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Fateh',
    jobTitle: 'Founder',
    worksFor: {
      '@type': 'Organization',
      name: 'Fateh Consortium Ltd',
      // TODO: add "url": "https://thefclbd.com" once thefclbd.com has real content —
      // linking to an empty placeholder page hurts E-E-A-T more than not linking at all.
    },
    description: 'Fateh is the founder of Fateh Consortium Ltd (FCLBD), and built BookKraft AI after seeing how many indie authors lose time (and sometimes book deals) to invisible EPUB formatting errors — broken metadata, rejected uploads, and inconsistent styling across KDP, Apple Books, and Kobo. He writes about the technical side of ebook publishing: what actually causes validation failures, how each platform\'s requirements differ, and how to avoid the most common formatting mistakes before they cost you a rejection.',
    url: 'https://bookkraftai.com/author/fateh',
    // image: "https://..." — add when author photo is available; no schema restructure needed
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <div style={{ maxWidth: '760px', margin: '0 auto', padding: '64px 24px', lineHeight: '1.8' }}>

        {/* Breadcrumb */}
        <nav aria-label="Breadcrumb" style={{ fontSize: '14px', color: 'var(--mid)', marginBottom: '32px' }}>
          <Link href="/" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Home</Link>
          <span style={{ margin: '0 6px' }} aria-hidden="true">›</span>
          <Link href="/blog" style={{ color: 'var(--mid)', textDecoration: 'none' }}>Blog</Link>
          <span style={{ margin: '0 6px' }} aria-hidden="true">›</span>
          <span style={{ color: 'var(--ink)' }}>Fateh</span>
        </nav>

        {/* Author header */}
        <div style={{ marginBottom: '40px' }}>
          {/* Placeholder avatar — replace src with real photo when available */}
          <div style={{
            width: 72, height: 72, borderRadius: '50%',
            background: 'var(--ink)', color: 'var(--gold)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '28px', fontWeight: 700, marginBottom: '20px',
          }} aria-hidden="true">
            F
          </div>
          <h1 style={{ marginBottom: '6px', fontSize: 'clamp(1.6rem, 4vw, 2.25rem)' }}>Fateh</h1>
          <p style={{ color: 'var(--mid)', fontSize: '15px', margin: 0 }}>
            Founder, Fateh Consortium Ltd (FCLBD)
          </p>
        </div>

        {/* Bio — verbatim as reviewed */}
        <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '20px', color: 'var(--ink)' }}>
          Fateh is the founder of Fateh Consortium Ltd (FCLBD), and built BookKraft AI after seeing how many indie authors lose time (and sometimes book deals) to invisible EPUB formatting errors — broken metadata, rejected uploads, and inconsistent styling across KDP, Apple Books, and Kobo.
        </p>
        <p style={{ fontSize: '17px', lineHeight: '1.8', marginBottom: '48px', color: 'var(--ink)' }}>
          He writes about the technical side of ebook publishing: what actually causes validation failures, how each platform&apos;s requirements differ, and how to avoid the most common formatting mistakes before they cost you a rejection.
        </p>

        {/* Articles link */}
        <div style={{
          borderTop: '1px solid var(--border)', paddingTop: '32px',
        }}>
          <p style={{ fontSize: '14px', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--mid)', marginBottom: '12px' }}>
            Articles by Fateh
          </p>
          <Link href="/blog" style={{ color: 'var(--gold)', textDecoration: 'none', fontWeight: 600, fontSize: '16px' }}>
            Browse the blog →
          </Link>
        </div>

      </div>
      <Footer />
    </>
  );
}
