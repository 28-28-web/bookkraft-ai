import Link from 'next/link';

const faqs = [
  {
    q: 'Is BookKraft AI cheaper than Atticus?',
    a: 'Yes, for most authors. Atticus costs $147 one-time for lifetime access. BookKraft AI starts at $4.99 one-time for 5 formatting tools, or $9.99 for Full Access with AI tools included. Lifetime access to all 12 tools is $149, close to Atticus but with AI-powered manuscript cleanup included.',
  },
  {
    q: 'Does BookKraft AI replace my writing app like Atticus does?',
    a: 'No. Atticus combines writing and formatting in one app. BookKraft AI focuses only on formatting, validation, and metadata, so you keep writing in Word, Google Docs, or Scrivener and use BookKraft AI for the steps right before publishing.',
  },
  {
    q: 'Does BookKraft AI have AI-powered tools like manuscript cleanup?',
    a: 'Yes. BookKraft AI includes AI-powered Manuscript Cleanup, a Style Sheet Auditor, and a Print-to-Digital Adapter. Atticus does not currently offer AI-assisted editing tools.',
  },
  {
    q: 'Do I need to install Atticus or BookKraft AI?',
    a: 'Atticus runs in the browser with limited offline functionality. BookKraft AI runs entirely in the browser with no install at all, and two tools, EPUB Validator and Metadata Builder, are free with no signup required.',
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

export default function AtticusAlternativePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          Atticus Alternative for Indie Authors
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 32, opacity: 0.9 }}>
          Atticus bundles writing and formatting into one $147 app. If you already write in Word, Google Docs, or Scrivener and just need the formatting, validation, and metadata steps before publishing, BookKraft AI does that job alone, runs in any browser, and starts at $4.99 one-time.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Atticus vs BookKraft AI
        </h2>

        <div style={{ overflowX: 'auto', marginBottom: 40 }}>
          <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
            <thead>
              <tr style={{ borderBottom: '2px solid rgba(0,0,0,0.1)' }}>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}></th>
                <th style={{ textAlign: 'left', padding: '12px 8px' }}>Atticus</th>
                <th style={{ textAlign: 'left', padding: '12px 8px', color: '#c9a84c' }}>BookKraft AI</th>
              </tr>
            </thead>
            <tbody>
              {[
                ['Platform', 'Browser-based, limited offline mode', 'Browser-based, no install at all'],
                ['Price', '$147 one-time, lifetime, unlimited books', '$4.99 one-time, or $149 lifetime for all 12 tools'],
                ['What it replaces', 'Your writing app + formatting software', 'Just the formatting, validation, and metadata steps'],
                ['Built-in writing editor', 'Yes — write and format in one place', 'No — formats manuscripts written elsewhere'],
                ['AI manuscript cleanup', 'No', 'Yes — dialogue punctuation, repeated words, clichés'],
                ['EPUB validation before upload', 'No dedicated validator', 'Yes — free tool, no signup needed'],
                ['Free tier', 'No free tier', 'Yes — EPUB Validator and Metadata Builder, free forever'],
                ['Print PDF export', 'Yes', 'Not currently supported'],
              ].map(([label, atticus, bk], i) => (
                <tr key={i} style={{ borderBottom: '1px solid rgba(0,0,0,0.08)' }}>
                  <td style={{ padding: '12px 8px', fontWeight: 600, opacity: 0.85 }}>{label}</td>
                  <td style={{ padding: '12px 8px', opacity: 0.7 }}>{atticus}</td>
                  <td style={{ padding: '12px 8px' }}>{bk}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Why some authors look for an Atticus alternative
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Atticus is a genuinely good tool, cross-platform, one-time pricing, and a combined writing and formatting workflow. But that combination is also the catch: it asks you to move your manuscript into a new app and use it as your primary editor. Authors who already have a writing workflow they like, in Word, Google Docs, or Scrivener, often just want a formatting and validation step at the end, not a new place to write.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          BookKraft AI is built for that narrower job. Paste or upload your manuscript when it is ready, run it through formatting, validation, and metadata tools, and keep your writing process exactly as it is.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          What BookKraft AI includes
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          12 tools covering the full ebook formatting workflow: Kindle Format Fixer, EPUB Formatter, TOC Generator, Front Matter Generator, Back Matter Generator, CSS Snippet Generator, EPUB Validator, EPUB Validator Pro, Style Sheet Auditor, Metadata Builder, KDP Keyword Finder, and AI-powered Manuscript Cleanup. Two tools, EPUB Validator and Metadata Builder, are free with no signup required.
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