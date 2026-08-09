import Link from 'next/link';

export const metadata = {
  title: 'EPUB Formatting Guide for Self-Publishers — BookKraft AI',
  description: 'Complete EPUB formatting guide: manuscript cleanup, TOC, front matter, EPUB 3.0 generation, validation, and metadata for KDP, Apple Books, and IngramSpark.',
  alternates: {
    canonical: 'https://bookkraftai.com/epub-formatting-guide',
  },
};

const faqs = [
  {
    q: 'What is EPUB 3.0 and why does it matter for self-publishing?',
    a: 'EPUB 3.0 is the current international standard for ebook files. Apple Books requires EPUB 3; KDP accepts both EPUB 2 and EPUB 3 but converts your file internally anyway. Building EPUB 3.0 from the start satisfies every major store and avoids compatibility issues that cause silent quality flags after upload.',
  },
  {
    q: 'Do I need to know coding to format an EPUB?',
    a: 'No. EPUB files are ZIP archives containing HTML and CSS, but you do not need to write any code yourself. The tools on this page generate valid EPUB 3.0 files, clickable tables of contents, and EPUB-safe CSS from plain text or manuscript files — no coding or command-line access required.',
  },
  {
    q: 'How long does it take to format an ebook from scratch?',
    a: 'A typical novel formatted using automated tools takes 30 to 90 minutes from raw manuscript to validated EPUB file. The steps that take longest by hand — TOC creation, front/back matter writing, CSS formatting, and validation — each take a few minutes when automated.',
  },
  {
    q: 'What is the difference between EPUB 2 and EPUB 3?',
    a: 'EPUB 2 uses toc.ncx for navigation; EPUB 3 uses nav.xhtml and supports HTML5, CSS3, and accessibility features. Apple Books requires EPUB 3 and rejects EPUB 2 files. KDP accepts both but converts to its own internal format. Distributing to multiple stores means EPUB 3 is the right choice.',
  },
  {
    q: 'What causes EPUB validation errors?',
    a: 'The most common causes are a missing or malformed container.xml, files referenced in the OPF manifest that do not exist in the archive, missing required metadata fields (title, language, identifier), incorrect cover image declarations, and navigation files that point to non-existent content. A validator pinpoints which check failed and where.',
  },
  {
    q: 'Can I use a Word document to create an ebook?',
    a: 'Yes, but Word documents carry hidden formatting artifacts — smart quotes that encode incorrectly, double spaces, stacked blank paragraphs, and encoding issues — that cause problems after EPUB conversion. Running a cleanup pass before converting removes these artifacts. Word documents can be converted directly to EPUB 3.0 with the EPUB Formatter or Full Manuscript Mode tools.',
  },
  {
    q: 'Which store has the strictest EPUB requirements?',
    a: 'Apple Books is the strictest. It requires EPUB 3, rejects files with invalid XML, and checks image quality and font embedding. KDP is the most lenient — it accepts EPUB 2 and EPUB 3, tolerates some malformed XML, and sometimes auto-corrects minor issues. IngramSpark sits between them, requiring standard EPUB 3 compliance but providing clearer rejection messages than KDP.',
  },
];

const steps = [
  {
    title: 'Start with a clean manuscript',
    body: 'Word documents and Google Docs carry artifacts that cause problems after EPUB conversion: smart quotes that encode as garbled characters, double spaces that persist through formatting, em dashes inserted as separate characters, and encoding issues introduced by copy-paste. Running a cleanup pass before any formatting step removes these at the source. Issues left in at this stage compound through every subsequent step.',
    tools: [
      { name: 'Manuscript Cleanup', href: '/tools/manuscript-cleanup' },
      { name: 'Word Cleanup Checker', href: '/tools/word-cleanup' },
    ],
  },
  {
    title: 'Build a clickable Table of Contents',
    body: 'KDP requires a properly structured, clickable TOC for Kindle books. EPUB 3 uses a nav.xhtml navigation document; EPUB 2 uses toc.ncx. Getting either wrong is one of the most common reasons books fail quality review, and the error is not always surfaced during upload — it shows up later in the reading experience or in reader complaints about broken navigation.',
    tools: [
      { name: 'TOC Generator', href: '/tools/toc-generator' },
    ],
  },
  {
    title: 'Design your chapter and paragraph styles',
    body: 'EPUB CSS has constraints that print CSS does not. Properties that work in browsers fail silently on e-readers; font declarations that look correct on screen get stripped on some devices. The CSS Snippet Generator produces tested, device-safe CSS for chapter headings, paragraph indentation, drop caps, scene breaks, and block quotes — without requiring any CSS knowledge.',
    tools: [
      { name: 'CSS Snippet Generator', href: '/tools/css-snippet-generator' },
    ],
  },
  {
    title: 'Write your front matter and back matter',
    body: 'Front matter — title page, copyright page, dedication, and epigraph — sets reader expectations before chapter one and is required by most stores for professional listings. Back matter — author bio, Also By section, and mailing list CTA — directly affects reader retention and series discoverability. Both also affect how your book appears in store previews.',
    tools: [
      { name: 'Front Matter Generator', href: '/tools/front-matter-generator' },
      { name: 'Back Matter Generator', href: '/tools/back-matter-generator' },
    ],
  },
  {
    title: 'Generate a valid EPUB 3.0 file',
    body: 'EPUB is the format Apple Books, IngramSpark, Kobo, and most other distributors require. Building a clean EPUB 3.0 from the start — with correct chapter structure, embedded metadata, a properly declared cover image, and a valid OPF manifest — is more reliable than letting any store handle conversion. Files built correctly at this stage pass validation without manual fixes.',
    tools: [
      { name: 'EPUB Formatter', href: '/tools/epub-formatter' },
    ],
  },
  {
    title: 'Validate before you upload to any store',
    body: 'An EPUB can open fine on your computer and still fail store submission. Stores run automated validation on upload, and rejection messages are often vague. Running validation yourself first gives you the specific error, its location inside the file, and time to fix it before any store sees it. Apple Books rejects files KDP quietly accepts.',
    tools: [
      { name: 'EPUB Validator', href: '/tools/epub-validator' },
      { name: 'EPUB Validator Pro', href: '/tools/epub-validator-premium' },
    ],
  },
  {
    title: 'Complete your metadata and keyword strategy',
    body: 'Metadata fields differ by platform: KDP wants a specific keyword format, IngramSpark formats categories differently, and EPUB OPF files use yet another structure. Keywords and BISAC categories determine whether readers find your book in store search and browse. Missing or misformatted metadata fields can slow down approval and affect discoverability after publishing.',
    tools: [
      { name: 'Metadata Builder', href: '/tools/metadata-builder' },
      { name: 'KDP Keyword & Category Finder', href: '/tools/kdp-keyword-finder' },
    ],
  },
  {
    title: 'Audit for style consistency across chapters',
    body: 'Character names spelled differently across chapters, capitalization that drifts between scenes, dialogue punctuation that changes style partway through — these are the kinds of issues that cost professional editors hours to catch. A style audit finds them in seconds before readers do. Especially valuable after revisions, where edits in one section often introduce inconsistencies with unchanged sections.',
    tools: [
      { name: 'Style Sheet Auditor', href: '/tools/style-sheet-auditor' },
    ],
  },
];

const checklist = [
  'Manuscript cleaned — no double spaces, straight quotes, or encoding artifacts',
  'Table of Contents present, correctly structured, and clickable',
  'Front matter complete: title page, copyright page, dedication',
  'Back matter complete: author bio, Also By page, mailing list CTA',
  'EPUB 3.0 file generated with correct OPF manifest and cover declaration',
  'EPUB validates with zero structural errors',
  'Cover image meets all platform dimension and file size requirements',
  'Metadata complete: title, author, language, BISAC category, 7 keywords, description',
  'Spine and navigation files reference valid content files',
  'Style sheet audited for consistency across all chapters',
];

export default function Page() {
  return (
    <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>

      {/* Hero */}
      <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
        EPUB Formatting Guide for Self-Publishers
      </h1>
      <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 16, opacity: 0.9 }}>
        Formatting an ebook involves more than converting a Word file. A publishable EPUB requires a clean manuscript, a valid table of contents, working CSS, complete front and back matter, a correct OPF manifest, and metadata formatted for each store. This guide covers every step, with a tool for each one.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 56, opacity: 0.85 }}>
        The workflow below applies to KDP, Apple Books, and IngramSpark. Each platform has different validation strictness —{' '}
        <a href="#store-requirements" style={{ color: '#9c7f35', textDecoration: 'none' }}>see the store comparison below</a>
        {' '}— but a file that passes the full checklist passes everywhere.
      </p>

      {/* 8-step card grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(360px, 1fr))', gap: 'var(--space-6, 24px)', marginBottom: 64 }}>
        {steps.map((s, i) => (
          <div
            key={i}
            style={{
              background: 'var(--cream, #f7f3ec)',
              border: '1px solid var(--border, rgba(0,0,0,0.1))',
              borderRadius: 'var(--radius, 12px)',
              padding: '24px',
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Badge + title row */}
            <div style={{ display: 'flex', alignItems: 'flex-start', gap: 12, marginBottom: 12 }}>
              <div style={{
                width: 36, height: 36, borderRadius: '50%',
                background: 'var(--gold, #c9a84c)',
                color: '#fff',
                fontWeight: 700, fontSize: 15,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}>
                {i + 1}
              </div>
              <h2 style={{ fontSize: 17, fontWeight: 700, lineHeight: 1.35, color: 'var(--ink, #1a1a1a)', margin: 0 }}>
                {s.title}
              </h2>
            </div>

            {/* Body */}
            <p style={{ fontSize: 14, lineHeight: 1.7, color: 'var(--mid, #555)', marginBottom: 20, flexGrow: 1 }}>
              {s.body}
            </p>

            {/* Tool links */}
            <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
              {s.tools.map((t) => (
                <Link
                  key={t.href}
                  href={t.href}
                  style={{
                    display: 'inline-block',
                    padding: '7px 14px',
                    border: '1px solid rgba(201,168,76,0.4)',
                    borderRadius: 8,
                    color: '#9c7f35',
                    fontWeight: 600,
                    fontSize: 13,
                    textDecoration: 'none',
                    background: 'var(--white, #fff)',
                  }}
                >
                  {t.name} →
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Print-to-digital callout */}
      <div
        style={{
          padding: '28px 32px',
          background: 'rgba(201,168,76,0.07)',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: 12,
          marginBottom: 56,
        }}
      >
        <h2 style={{ fontSize: 22, fontWeight: 700, marginBottom: 12 }}>
          Starting from a print book?
        </h2>
        <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88, marginBottom: 16 }}>
          Print books use fixed layout: fixed margins, page numbers, widow and orphan control, running headers, and print-specific spacing. All of these need to be removed or converted before a file works as a reflowable ebook. Pasting a print-layout document into EPUB conversion produces heading artifacts, inconsistent indentation, page breaks in the wrong places, and broken spacing.
        </p>
        <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88, marginBottom: 20 }}>
          The Print-to-Digital converter strips print-specific formatting automatically and outputs a clean manuscript ready for the EPUB formatting workflow above.
        </p>
        <Link
          href="/tools/print-to-digital"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: 8,
            color: '#9c7f35',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Print-to-Digital Converter →
        </Link>
      </div>

      {/* Store requirements */}
      <h2 id="store-requirements" style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Store requirements: KDP vs. Apple Books vs. IngramSpark
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
        Each platform runs its own automated validation on upload. A file can pass KDP and fail Apple Books. Understanding where each store sits on the strictness scale saves a rejection-and-resubmit cycle that can cost days.
      </p>

      <div style={{ overflowX: 'auto', marginBottom: 40 }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 15 }}>
          <thead>
            <tr style={{ borderBottom: '2px solid rgba(201,168,76,0.4)' }}>
              <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 700, width: '18%' }}>Store</th>
              <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 700 }}>EPUB version</th>
              <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 700 }}>Validation strictness</th>
              <th style={{ textAlign: 'left', padding: '10px 16px', fontWeight: 700 }}>Error messages</th>
            </tr>
          </thead>
          <tbody>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)' }}>
              <td style={{ padding: '12px 16px', fontWeight: 600 }}>Amazon KDP</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>EPUB 2 or EPUB 3</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>Most lenient — tolerates some malformed XML, auto-corrects minor issues</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>Generic (&ldquo;We found issues&rdquo;) — often doesn&apos;t specify what failed</td>
            </tr>
            <tr style={{ borderBottom: '1px solid rgba(0,0,0,0.07)', background: 'rgba(0,0,0,0.02)' }}>
              <td style={{ padding: '12px 16px', fontWeight: 600 }}>Apple Books</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>EPUB 3 required</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>Strictest — rejects invalid XML, checks image quality and font embedding</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>Specific rejection reasons provided</td>
            </tr>
            <tr>
              <td style={{ padding: '12px 16px', fontWeight: 600 }}>IngramSpark</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>EPUB 3</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>Between KDP and Apple Books — standard EPUB 3 compliance required</td>
              <td style={{ padding: '12px 16px', lineHeight: 1.5 }}>Clearer rejection messages than KDP</td>
            </tr>
          </tbody>
        </table>
      </div>

      <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 56, opacity: 0.85 }}>
        The safest approach: build EPUB 3, validate to zero errors, then upload the same file to all three stores. A file that passes validation after step 6 above passes all three.
      </p>

      {/* EPUB errors section */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Common EPUB formatting errors
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        Most store rejections come from the same handful of structural errors. These are not bugs in your writing — they are technical issues in the EPUB file structure that a validator catches before submission.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        <strong>Missing manifest resource.</strong> A file is referenced in the OPF manifest but does not exist inside the archive, or exists but is not declared. Fix: open your .opf file and add the missing item with the correct media type, or remove the declaration if the file was deleted.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        <strong>Broken font or image reference.</strong> An <code>img</code> tag or CSS <code>@font-face</code> references a file path that does not exist inside the archive. Paths are case-sensitive on some platforms. Fix: verify the exact path and confirm the file exists in the archive with that exact capitalization.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        <strong>Invalid cover declaration.</strong> EPUB 3 needs a manifest item with <code>properties=&quot;cover-image&quot;</code>. EPUB 2 needs a <code>meta name=&quot;cover&quot;</code> element pointing to the cover image manifest ID. Missing either causes KDP&apos;s cover check to fail even when the image is physically present in the archive.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 24, opacity: 0.9 }}>
        <strong>EMF or WMF image in the file.</strong> Images in Windows-only EMF or WMF format fail validation on every store. Fix: re-save those images from your original Word file as PNG or JPG, replace them, and re-export.
      </p>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.85 }}>
        For a complete list of EPUB errors with specific fixes, see the{' '}
        <Link href="/epub-errors" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          EPUB error reference
        </Link>
        . Each error page includes the exact cause, where it appears in the file, and the fix.
      </p>

      <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 56, opacity: 0.85 }}>
        Publishing to Amazon specifically? The{' '}
        <Link href="/kdp-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
          KDP formatting guide
        </Link>{' '}
        covers Amazon-specific steps: Kindle TOC requirements, KDP cover dimensions, and the keyword and category system.
      </p>

      {/* Checklist */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Pre-upload checklist
      </h2>
      <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
        Before uploading to any store, run through this list:
      </p>
      <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 56px' }}>
        {checklist.map((item, i) => (
          <li
            key={i}
            style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.88 }}
          >
            <input type="checkbox" disabled style={{ marginTop: 4, flexShrink: 0, accentColor: '#c9a84c' }} />
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* FAQ */}
      <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 16 }}>
        Frequently asked questions
      </h2>
      {faqs.map((f, i) => (
        <div key={i} style={{ marginBottom: 24 }}>
          <h3 style={{ fontSize: 19, fontWeight: 600, marginBottom: 8 }}>{f.q}</h3>
          <p style={{ fontSize: 16, lineHeight: 1.6, opacity: 0.85 }}>{f.a}</p>
        </div>
      ))}

      {/* EPUB errors CTA */}
      <div
        style={{
          marginTop: 48,
          marginBottom: 32,
          padding: '24px',
          border: '1px solid rgba(201,168,76,0.3)',
          borderRadius: 12,
        }}
      >
        <p style={{ fontSize: 17, fontWeight: 600, marginBottom: 8 }}>Got a specific EPUB error?</p>
        <p style={{ fontSize: 15, lineHeight: 1.6, marginBottom: 16, opacity: 0.85 }}>
          The EPUB error reference covers every common validation failure with the exact cause and fix.
        </p>
        <Link
          href="/epub-errors"
          style={{
            display: 'inline-block',
            padding: '10px 20px',
            border: '1px solid rgba(201,168,76,0.4)',
            borderRadius: 8,
            color: '#9c7f35',
            fontWeight: 600,
            fontSize: 15,
            textDecoration: 'none',
          }}
        >
          Browse EPUB Errors →
        </Link>
      </div>

      {/* Bottom CTA */}
      <div style={{ padding: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
        <p style={{ fontSize: 18, marginBottom: 16 }}>Start with the free EPUB Validator — no signup needed.</p>
        <Link
          href="/free-tools"
          style={{
            display: 'inline-block',
            padding: '12px 28px',
            background: '#c9a84c',
            color: '#1a1a1a',
            borderRadius: 8,
            fontWeight: 600,
            textDecoration: 'none',
          }}
        >
          Start Free →
        </Link>
      </div>

    </main>
  );
}
