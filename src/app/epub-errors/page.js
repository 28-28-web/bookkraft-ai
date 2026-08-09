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
        <p style={{ fontSize: 16, color: 'var(--mid)', lineHeight: 1.7, marginBottom: 32 }}>
          Plain-English explanations and step-by-step fixes for the EPUB validation errors that cause rejections on KDP, Apple Books, Kobo, and IngramSpark.
        </p>

        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, opacity: 0.9 }}>
          An EPUB file is a ZIP archive containing HTML content files, a CSS stylesheet, an OPF package document, a navigation file, and any images or fonts your book uses. Every layer has to conform to the EPUB specification — and every major store runs automated validation on upload to check it. When a check fails, the store rejects the file or flags it for quality review.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 20, opacity: 0.9 }}>
          Most EPUB errors come from three sources: conversion tools that generate structurally incomplete files, Word documents carrying embedded images or fonts in formats the EPUB spec does not allow, and mismatched metadata between what the file declares and what the store expects. The errors below are the ones that appear most often in EPUBCheck output and store rejection emails.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 40, opacity: 0.9 }}>
          If you are formatting a new ebook rather than fixing an existing file, building the EPUB correctly from the start prevents most of these errors before they happen. The{' '}
          <Link href="/epub-formatting-guide" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>{' '}
          covers the full workflow: manuscript cleanup, TOC, front matter, EPUB generation, and validation.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Error categories
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 48 }}>
          {[
            { label: 'Structural errors', desc: 'Missing or malformed container.xml, OPF manifest, spine, or navigation files. These block upload at every store.' },
            { label: 'Metadata errors', desc: 'Empty or missing title, language, or identifier fields in content.opf. Required by KDP, Apple Books, Kobo, and IngramSpark.' },
            { label: 'Font & image errors', desc: 'Non-embeddable fonts, corrupted font files, EMF/WMF images, or broken file references in the manifest.' },
          ].map((cat, i) => (
            <div key={i} style={{ background: 'var(--cream, #f7f3ec)', border: '1px solid var(--border)', borderRadius: 8, padding: '16px 18px' }}>
              <div style={{ fontWeight: 700, fontSize: 14, color: 'var(--ink)', marginBottom: 6 }}>{cat.label}</div>
              <div style={{ fontSize: 13, color: 'var(--mid)', lineHeight: 1.55 }}>{cat.desc}</div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 16 }}>
          Errors by store
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 16, opacity: 0.9 }}>
          KDP is the most lenient: it accepts some malformed XML and auto-corrects minor issues, but its rejection messages are often vague (&ldquo;We found issues with your file&rdquo;) without specifying which check failed. Apple Books is the strictest: it requires EPUB 3, rejects invalid XML, and checks font embedding and image quality. IngramSpark sits between them — it requires standard EPUB 3 compliance and provides clearer rejection messages than KDP.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.75, color: 'var(--ink)', marginBottom: 48, opacity: 0.9 }}>
          A file that passes validation passes all three stores. The errors below are the ones most likely to cause a rejection on at least one platform even when the others accepted the file.
        </p>

        <h2 style={{ fontSize: 20, fontWeight: 700, color: 'var(--ink)', marginBottom: 20 }}>
          Common errors
        </h2>
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

        <div style={{ marginTop: 48, marginBottom: 32, padding: '24px', background: 'var(--cream, #f7f3ec)', border: '1px solid var(--border)', borderRadius: 10 }}>
          <p style={{ fontSize: 15, fontWeight: 700, color: 'var(--ink)', marginBottom: 8 }}>Prevent errors on the next book</p>
          <p style={{ fontSize: 14, color: 'var(--mid)', lineHeight: 1.65, marginBottom: 0 }}>
            Most of the errors on this page are avoidable by building the EPUB correctly from the start. The{' '}
            <Link href="/epub-formatting-guide" style={{ color: 'var(--gold, #c9a84c)', textDecoration: 'none' }}>
              EPUB formatting guide
            </Link>{' '}
            walks through every step — manuscript cleanup, TOC generation, CSS, front matter, EPUB 3.0 generation, and validation — with a tool for each one.
          </p>
        </div>

        <div style={{ paddingTop: 32, borderTop: '1px solid var(--border)' }}>
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
