import Link from 'next/link';

const faqs = [
  {
    q: 'Is there a Calibre alternative that works in the browser?',
    a: 'Yes. BookKraft AI runs entirely in your browser — no download or install needed. Works on Windows, Mac, Linux, and Chromebook.',
  },
  {
    q: 'How much does BookKraft AI cost compared to Calibre?',
    a: 'Calibre is free but requires installation and has a steep learning curve. BookKraft AI starts at $4.99 one-time for 5 tools, or $9.99 for AI-powered tools. Two tools — EPUB Validator and Metadata Builder — are completely free with no signup.',
  },
  {
    q: 'Can BookKraft AI convert ebook formats like Calibre?',
    a: 'BookKraft AI focuses on formatting, validating, and preparing EPUBs for KDP, Apple Books, and Kobo. It does not manage large ebook libraries or convert between formats the way Calibre does.',
  },
  {
    q: 'Does BookKraft AI work for KDP publishing?',
    a: 'Yes. Every tool is built specifically for indie authors publishing on KDP, Apple Books, Kobo, IngramSpark, and Draft2Digital.',
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

export default function CalibreAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Calibre Alternative for Indie Authors
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Calibre is powerful but built for readers managing large libraries — not for authors formatting a single book for KDP. BookKraft AI runs in any browser, no install needed, and is built specifically for indie authors publishing on Amazon, Apple Books, and Kobo.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Calibre vs BookKraft AI
        </h2>

        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}></th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>Calibre</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#c9a84c' }}>BookKraft AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Platform', 'Windows, Mac, Linux (desktop install)', 'Any browser — no install needed'],
                ['Price', 'Free', '$4.99 one-time, or free for 2 tools'],
                ['Setup time', '200MB+ download, steep learning curve', 'Open browser and start — no setup'],
                ['Built for', 'Managing large ebook libraries', 'Formatting single books for KDP/EPUB'],
                ['EPUB validation', 'Basic built-in check', 'Free dedicated validator — no signup'],
                ['Metadata builder', 'Manual editing interface', 'Form-based, outputs KDP/IngramSpark/EPUB OPF'],
                ['AI tools', 'No', 'Yes — manuscript cleanup, keyword finder, more'],
                ['KDP-specific guidance', 'No', 'Yes — every tool built for KDP/Apple Books/Kobo'],
              ].map(([label, calibre, bk], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600, opacity: 0.85 }}>{label}</td>
                  <td style={{ padding: '12px 8px', opacity: 0.7 }}>{calibre}</td>
                  <td style={{ padding: '12px 8px' }}>{bk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Why indie authors look for a Calibre alternative
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Calibre is genuinely excellent software — free, open-source, and actively maintained. But it was built for readers managing hundreds of books, not for authors formatting one manuscript for KDP. The interface is dense, the learning curve is real, and most of what it does is irrelevant if you just need to validate an EPUB or build metadata before uploading.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Most indie authors who switch aren't replacing Calibre entirely — they just want a faster, browser-based option for the specific tasks that happen right before submission.
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
