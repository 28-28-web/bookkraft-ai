import Link from 'next/link';

const faqs = [
  {
    q: 'Is there a Vellum alternative that works on Windows?',
    a: 'Yes. BookKraft AI runs entirely in your browser, so it works on Windows, Mac, Linux, and Chromebook. Vellum only runs on macOS.',
  },
  {
    q: 'How much cheaper is BookKraft AI than Vellum?',
    a: 'Vellum costs $250 for the ebook and print bundle. BookKraft AI starts at $4.99 one-time for 5 formatting tools, or $9.99 for AI-powered tools too. Lifetime access to all 12 tools is $149.',
  },
  {
    q: 'Does BookKraft AI produce the same output quality as Vellum?',
    a: 'BookKraft AI generates valid EPUB 3.0 files and Kindle-ready formatting that pass KDP, Apple Books, and Kobo validation. It is a different workflow than Vellum\u2019s visual theme-based editor, built around discrete tools (formatter, validator, TOC generator) rather than one all-in-one app.',
  },
  {
    q: 'Can I format a print book with BookKraft AI?',
    a: 'BookKraft AI focuses on ebook formatting (EPUB, Kindle/KFX, MOBI). It does not currently generate print-ready PDFs the way Vellum does.',
  },
];

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: faqs.map((f) => ({
    '@type': 'Question',
    name: f.q,
    acceptedAnswer: { '@type': 'Answer', text: f.a },
  })),
};

export default function VellumAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Vellum Alternative for Windows
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Vellum only runs on macOS and costs $250 for the ebook-and-print bundle. If you write on Windows, Linux, or Chromebook, you need a different tool. BookKraft AI runs in any browser, starts at $4.99 one-time, and adds AI-powered manuscript cleanup that Vellum doesn&apos;t offer.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Vellum vs BookKraft AI
        </h2>

        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(245,240,230,0.2)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}></th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>Vellum</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#c9a84c' }}>BookKraft AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Platform', 'Mac only', 'Any browser (Windows, Mac, Linux, Chromebook)'],
                ['Price', '$250 (ebook + print)', '$4.99 one-time, or $149 lifetime for all 12 tools'],
                ['Pricing model', 'One-time purchase', 'One-time purchase, no subscription'],
                ['EPUB export', 'Yes', 'Yes — EPUB 3.0, validated for KDP/Apple Books/Kobo'],
                ['Print PDF export', 'Yes', 'Not currently supported'],
                ['AI manuscript cleanup', 'No', 'Yes — dialogue punctuation, repeated words, clichés'],
                ['EPUB validation before upload', 'No', 'Yes — free tool, no signup needed'],
              ].map(([label, vellum, bk], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(245,240,230,0.1)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600, opacity: 0.85 }}>{label}</td>
                  <td style={{ padding: '12px 8px', opacity: 0.8 }}>{vellum}</td>
                  <td style={{ padding: '12px 8px' }}>{bk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Why Windows authors look for a Vellum alternative
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Vellum has been Mac-only since launch. Windows authors are usually pointed toward renting a Mac in the cloud or running macOS in a virtual machine, both of which add cost and complexity Mac users never deal with. A browser-based tool sidesteps the platform problem entirely.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI includes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          12 tools covering the full ebook formatting workflow: Kindle Format Fixer, EPUB Formatter, TOC Generator, Front Matter Generator, Back Matter Generator, CSS Snippet Generator, EPUB Validator, EPUB Validator Pro, Style Sheet Auditor, Metadata Builder, KDP Keyword Finder, and AI-powered Manuscript Cleanup. Two tools — EPUB Validator and Metadata Builder — are free with no signup required.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Frequently asked questions
        </h2>
        {faqs.map((f, i) => (
          <div key={i} style={{ marginBottom: 24 }}>
            <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
            <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
          </div>
        ))}

        <div style={{ marginTop: 48, padding: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
          <p style={{ fontSize: 18, marginBottom: 16 }}>Try the free EPUB Validator — no signup needed.</p>
          <Link href="/free-tools" style={{ display: 'inline-block', padding: '12px 28px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 600, textDecoration: 'none' }}>
            Start Free →
          </Link>
        </div>
      </main>
    </>
  );
}