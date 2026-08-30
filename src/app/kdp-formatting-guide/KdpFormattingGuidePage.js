import Link from 'next/link';

const faqs = [
  {
    q: 'What file format does KDP require for ebooks?',
    a: 'KDP accepts EPUB and Word documents directly, and converts them internally. EPUB is the most reliable format because it is built for reflowable text across devices. PDFs are not recommended for ebooks since they use a fixed layout that does not adapt to different screen sizes.',
  },
  {
    q: 'Why does my manuscript look broken after pasting into KDP?',
    a: 'Pasting from Word or Google Docs often carries over smart quotes, double spaces, and hidden encoding artifacts that render incorrectly once converted. Running your text through a formatting tool before uploading catches most of these issues.',
  },
  {
    q: 'Do I need a Table of Contents for KDP?',
    a: 'Yes. KDP requires a clickable, properly structured Table of Contents for Kindle books. A missing or malformed TOC is one of the most common reasons books fail quality review.',
  },
  {
    q: 'What should I check before uploading my EPUB to KDP?',
    a: 'Validate the file structure, confirm metadata is complete, and preview how the file renders on different screen sizes. A free EPUB validator can catch structural errors before Amazon does.',
  },
];

const sections = [
  {
    title: '1. Clean up your manuscript first',
    body: 'Before any formatting happens, your manuscript needs a pass to remove the artifacts that come from writing in Word or Google Docs: smart quotes that convert inconsistently, double spaces, broken em dashes, and encoding errors that show up as strange characters. Skipping this step means every formatting issue downstream gets harder to spot.',
    tools: [{ name: 'Kindle Format Fixer', href: '/tools/kindle-format-fixer' }],
  },
  {
    title: '2. Build a clickable Table of Contents',
    body: 'KDP requires a properly structured, clickable TOC. The format differs slightly between Kindle, EPUB3, and older NCX-based readers. Getting this wrong is one of the most common reasons a book fails quality review.',
    tools: [{ name: 'TOC Generator', href: '/tools/toc-generator' }],
  },
  {
    title: '3. Write your front and back matter',
    body: 'A title page, copyright page, and dedication set reader expectations before chapter one. An author bio, an Also By page, and a call to join your mailing list do the same work after the last chapter. Both matter more than most authors think, especially for reviews and reader retention.',
    tools: [
      { name: 'Front Matter Generator', href: '/tools/front-matter-generator' },
      { name: 'Back Matter Generator', href: '/tools/back-matter-generator' },
    ],
  },
  {
    title: '4. Generate a valid EPUB file',
    body: 'EPUB is the format every major platform other than straight Kindle prefers, and it is what KDP converts your file into internally either way. Building a clean EPUB 3.0 file from the start, with correct chapter breaks, embedded metadata, and a properly structured cover, avoids a lot of downstream rejection issues.',
    tools: [{ name: 'EPUB Formatter', href: '/tools/epub-formatter' }],
  },
  {
    title: '5. Validate before you upload',
    body: 'An EPUB file can look fine on your screen and still fail upload or get flagged by Apple Books or Kobo, which have stricter validation than KDP. Checking structure, manifest completeness, and cover dimensions before you submit saves a rejection-and-resubmit cycle that can cost days.',
    tools: [
      { name: 'EPUB Validator', href: '/tools/epub-validator' },
      { name: 'EPUB Validator Pro', href: '/tools/epub-validator-premium' },
    ],
  },
  {
    title: '6. Build your metadata and keywords',
    body: 'Metadata is scattered across different fields depending on where you publish: KDP wants one format, IngramSpark another, EPUB OPF files yet another. Keywords and BISAC categories determine whether readers find your book at all. Getting both right before launch matters more than almost anything you do after publishing.',
    tools: [
      { name: 'Metadata Builder', href: '/tools/metadata-builder' },
      { name: 'KDP Keyword & Category Finder', href: '/tools/kdp-keyword-finder' },
    ],
  },
  {
    title: '7. Catch style inconsistencies before readers do',
    body: 'Character names spelled differently across chapters, capitalization that drifts, dialogue punctuation that changes style midway through, these are the kinds of issues human editors charge hundreds of dollars to catch. Running a style audit before publishing catches most of them in seconds.',
    tools: [
      { name: 'Manuscript Cleanup', href: '/tools/manuscript-cleanup' },
      { name: 'Style Sheet Auditor', href: '/tools/style-sheet-auditor' },
    ],
  },
];

export default function KdpFormattingGuidePage() {
  return (
    <>
      <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
        <h1 style={{ fontFamily: "'Playfair Display',serif", fontSize: 'clamp(36px,5vw,56px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 24 }}>
          The Complete Guide to KDP eBook Formatting
        </h1>

        <p style={{ fontSize: 19, lineHeight: 1.6, marginBottom: 48, opacity: 0.9 }}>
          Formatting a manuscript for Amazon KDP, Apple Books, and Kobo involves more steps than most authors expect: cleanup, structure, validation, metadata, and a handful of details that determine whether your book passes quality review on the first try. Here is the full process, step by step, with a tool for each one.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 0, marginBottom: 16 }}>
          Manuscript formatting basics
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Most manuscript formatting problems come from the same source: writing tools designed for print store text in ways that break when converted to reflowable ebook formats. Understanding four fundamentals before you start formatting prevents the most common upload failures.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Use paragraph styles, not manual spacing.</strong> Every paragraph should get its spacing from a named style — Body Text, First Paragraph, Chapter Opening. Adding blank lines between paragraphs or pressing Return twice creates extra space that EPUB converters interpret inconsistently.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>First-line indentation belongs in CSS, not in the document.</strong> Pressing Tab or using spacebar indentation looks correct in Word but produces double-indentation on some Kindle devices. Ebook-standard indentation is set via a CSS <code>text-indent</code> property applied to the paragraph style, not typed manually.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Remove double spaces.</strong> The practice of putting two spaces after a period is visible in some EPUB readers and can trigger KDP&apos;s automated quality review. A single cleanup pass removes all of them before they reach the converter.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Avoid character-level formatting overrides.</strong> Text bolded by selecting it and pressing Ctrl+B is stored as a character override. Text bolded through a paragraph style is stored as a style property. Both look identical in Word — but only style-based formatting survives EPUB conversion cleanly across all devices.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          None of these rules change the writing. They change how the writing is stored. Fixing them before converting to EPUB is the fastest way to reduce first-upload rejections. The{' '}
          <Link href="/tools/word-cleanup" style={{ color: '#9c7f35', textDecoration: 'none' }}>Word Manuscript Cleanup Checker</Link>{' '}
          catches all four automatically.
        </p>

        <div style={{ marginBottom: 48 }}>
          {sections.map((s, i) => (
            <div key={i} style={{ marginBottom: 40, paddingBottom: 32, borderBottom: i < sections.length - 1 ? '1px solid rgba(0,0,0,0.08)' : 'none' }}>
              <h2 style={{ fontSize: 26, fontWeight: 700, marginBottom: 12 }}>{s.title}</h2>
              <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88, marginBottom: 16 }}>{s.body}</p>
              <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
                {s.tools.map((t) => (
                  <Link
                    key={t.href}
                    href={t.href}
                    style={{
                      display: 'inline-block',
                      padding: '8px 16px',
                      border: '1px solid rgba(201,168,76,0.4)',
                      borderRadius: 8,
                      color: '#9c7f35',
                      fontWeight: 600,
                      fontSize: 14,
                      textDecoration: 'none',
                    }}
                  >
                    {t.name} →
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Chapter formatting conventions
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Drop caps, scene breaks, and chapter heading styles don&apos;t have a single correct format — but they need to be consistent across every chapter. Inconsistency is what readers and reviewers notice first.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Chapter headings.</strong> Use one heading style for every chapter opener — H1, H2, or a styled paragraph — and keep the format identical throughout. Mixing &ldquo;Chapter One&rdquo;, &ldquo;Chapter 1&rdquo;, and bare numerals across chapters creates inconsistency that reflects poorly in quality review and confuses automated TOC generators.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Drop caps.</strong> A drop cap on the first letter of each chapter is a common fiction convention. In EPUB, drop caps are set via CSS (<code>::first-letter</code> with <code>float: left</code> and a matching line-height). Not all readers render them identically, so test in Kindle Previewer before relying on them as a visual anchor.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Scene breaks.</strong> The standard for marking a scene break within a chapter is three asterisks (<code>***</code>), a hash (<code>#</code>), or a decorative ornament. Plain blank lines are unreliable — EPUB converters often collapse them or flag them as formatting errors. Whatever mark you choose, use it in every scene break in the book.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          <strong>Page breaks before chapter headings.</strong> Each new chapter should open on a fresh page, set via CSS (<code>break-before: page</code>), not by pressing Return multiple times. Stacked empty paragraphs collapse differently across devices and sometimes disappear entirely in conversion. The{' '}
          <Link href="/tools/manuscript-cleanup" style={{ color: '#9c7f35', textDecoration: 'none' }}>Manuscript Cleanup</Link>{' '}
          tool flags inconsistent heading formats and stacked paragraph breaks before they reach the converter.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Font selection for ebooks
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Font choice in ebooks works differently from print. Most EPUB readers — including Kindle — let users switch to their preferred reading font at any time. That makes font selection matter most for two things: the fallback rendering when no user override is active, and custom fonts you choose to embed in the EPUB file itself.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Safe system font stacks.</strong> If you don&apos;t embed a custom font, the reader&apos;s device uses its built-in default. Declaring an explicit <code>font-family</code> stack in your EPUB CSS makes the fallback intentional rather than accidental. Common stacks: <code>Georgia, &apos;Times New Roman&apos;, serif</code> for body text in fiction; <code>Helvetica, Arial, sans-serif</code> for non-fiction with heavy structure.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Serif vs sans-serif for body text.</strong> Long-form prose traditionally uses a serif face — the serifs assist horizontal tracking across lines on screen. Sans-serif works well for shorter text, callouts, and non-fiction that reads in chunks rather than linearly. Pick one for the body style and apply it consistently; mixing both within body paragraphs creates visual noise.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Embedding custom fonts.</strong> A font embedded in the EPUB package appears as &ldquo;Publisher Font&rdquo; in Kindle&apos;s font menu, giving readers the option to use your chosen typeface. Embedded fonts must be declared in the EPUB manifest and referenced via a CSS <code>@font-face</code> rule. Only embed fonts with a license that permits EPUB redistribution — most commercial font licenses do not include it without a separate ebook license.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          The{' '}
          <Link href="/tools/css-snippet-generator" style={{ color: '#9c7f35', textDecoration: 'none' }}>CSS Snippet Generator</Link>{' '}
          outputs ready-to-use <code>@font-face</code> declarations and body-text stacks formatted for EPUB stylesheets.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Paperback vs ebook differences
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Formatting for print and for ebooks are separate workflows — the same file rarely works for both without adjustment. The core difference is that print layout is fixed (every page has an exact physical size and position) while ebook layout is reflowable (text adapts to the reader&apos;s screen size and font settings).
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Page size and margins.</strong> A print book has a specific trim size — the physical dimensions of the finished page — and inside margins large enough to account for the binding. Ebooks have no fixed page size at all. For current print trim sizes, minimum inside margins based on page count, and bleed requirements, consult KDP&apos;s print book specifications directly, as these requirements are updated periodically.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Image resolution.</strong> Print images need 300 DPI at their printed size — the industry standard for commercial printing. Ebook images render on screen, where 72–96 DPI is sufficient; higher resolution adds file size without visible benefit on most devices. Images prepared for print are safe to reuse in ebooks; screen-resolution images used in print will appear noticeably soft.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Bleed.</strong> Print books with images or backgrounds that extend to the page edge require bleed — extra image area beyond the trim line that gets cut off during binding. Ebooks have no bleed because there is no physical cut. If you&apos;re building full-bleed interior pages or covers for print, check KDP&apos;s print formatting guidelines for the required bleed dimensions.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Font sizes.</strong> Print uses absolute point sizes because the page dimensions are fixed. Ebooks should use relative units (<code>em</code> or <code>rem</code>) so text scales correctly when readers adjust their preferred font size. A comfortable body text size in print often needs adjustment for ebook CSS.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          <strong>Covers are entirely separate files.</strong> A print cover wraps spine and back; its width depends on page count and paper type. An ebook cover is a single front-face image with no spine. Both have specific dimension and file requirements — use KDP&apos;s cover calculator for print and check KDP&apos;s ebook cover specifications for the current image requirements. The{' '}
          <Link href="/tools/cover-checker" style={{ color: '#9c7f35', textDecoration: 'none' }}>Cover Checker</Link>{' '}
          validates ebook cover dimensions before you upload.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Image and cover requirements
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Cover format and color mode.</strong> Ebook covers must be submitted as JPEG or PNG files in RGB color mode. CMYK images — typically prepared for offset printing — do not render correctly in ebook readers and produce washed-out or shifted colors. For print covers submitted through KDP Print, check KDP&apos;s current cover specifications for accepted color modes, as ebook and print workflows have different requirements.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Cover dimensions.</strong> KDP has specific minimum and maximum pixel requirements for ebook cover images, along with a recommended aspect ratio. These requirements have been updated over time — consult KDP&apos;s current cover image guidelines for the exact dimensions before preparing your file. The{' '}
          <Link href="/tools/cover-checker" style={{ color: '#9c7f35', textDecoration: 'none' }}>Cover Checker</Link>{' '}
          validates your cover against current platform requirements automatically.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Interior images.</strong> Images placed inside an ebook should also be RGB and saved as JPEG or PNG. KDP recompresses and resizes images during the internal conversion to KFX, so starting with the highest-resolution version you have gives the converter the most to work with. Images prepared at 300 DPI (for print use) are safe to include — they will be larger than strictly necessary for screen display but will not look worse.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          <strong>Transparency.</strong> PNG supports transparency; JPEG does not. Transparent PNG images may render with a black or white background depending on the reader&apos;s theme. Test any transparent images in Kindle Previewer before uploading — or flatten them to a white background first to avoid unpredictable rendering across devices.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Kindle-specific formatting
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Kindle books are delivered in Amazon&apos;s KFX format, which Kindle devices and apps render natively. You never submit KFX directly — KDP converts your uploaded EPUB or Word document internally. What you control is how clean that source file is before the conversion happens.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Reflowable vs fixed layout.</strong> Most ebooks use reflowable layout, where text adjusts to fit any screen size or font setting the reader chooses. Fixed layout locks the page design in place — useful for illustrated children&apos;s books, graphic novels, or books where the precise position of text and images matters. For prose fiction and most non-fiction, reflowable is the right choice; fixed layout breaks the reading experience on small screens and with large-text accessibility settings.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>MOBI format is deprecated.</strong> Amazon stopped accepting <code>.mobi</code> file uploads in 2022. Submit EPUB (preferred for control over formatting) or a Word document. KDP converts either format to KFX for delivery.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Enhanced Typesetting.</strong> Amazon applies Enhanced Typesetting automatically on supported devices when your book meets its formatting requirements. It improves hyphenation, kerning, and text justification. Books with clean, properly structured EPUB CSS are more likely to qualify; books with heavy inline styles or image-based text typically do not. Amazon determines eligibility automatically — there is no manual opt-in.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          <strong>Test with Kindle Previewer.</strong> Amazon&apos;s free Kindle Previewer simulates how your book renders across different Kindle devices and screen sizes before you upload. Testing here catches layout issues — particularly with images, tables, and drop caps — that don&apos;t show up in a standard EPUB reader. Running your file through the{' '}
          <Link href="/tools/epub-validator" style={{ color: '#9c7f35', textDecoration: 'none' }}>EPUB Validator</Link>{' '}
          first reduces the chance of Previewer surfacing structural errors.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Common mistakes before uploading to KDP
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Most rejections and quality flags come from the same handful of problems.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Skipping the cleanup pass.</strong> Double spaces, straight quotes, and stacked blank paragraphs don&apos;t stop Word from looking fine — but they show up in EPUB output and sometimes trigger KDP&apos;s quality review. Run the <Link href="/tools/word-cleanup" style={{ color: '#9c7f35', textDecoration: 'none' }}>Word Manuscript Cleanup Checker</Link> before converting.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Uploading without validating.</strong> KDP accepts your file, converts it internally, and doesn&apos;t always tell you what it changed or dropped. Apple Books and Kobo are stricter — they reject files KDP quietly accepts. Validate before uploading anywhere.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          <strong>Incomplete metadata.</strong> A missing language tag, a blank description, or mismatched title formatting between your EPUB and your KDP listing can slow down approval or affect how your book appears in search. The <Link href="/tools/metadata-builder" style={{ color: '#9c7f35', textDecoration: 'none' }}>Metadata Builder</Link> fills all required fields in one step.
        </p>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 40, opacity: 0.9 }}>
          <strong>Wrong category paths.</strong> Authors often pick the broadest category available. Narrower subcategories have less competition and make bestseller rank easier to reach. The <Link href="/tools/kdp-keyword-finder" style={{ color: '#9c7f35', textDecoration: 'none' }}>KDP Keyword &amp; Category Finder</Link> generates specific paths, including ghost categories you can request from KDP support.
        </p>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Pre-upload checklist
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Before you upload to KDP, Apple Books, or Kobo, run through this list:
        </p>
        <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 40px' }}>
          {[
            'Manuscript cleaned (no double spaces, straight quotes, or encoding artifacts)',
            'Clickable Table of Contents present and correctly structured',
            'Front matter complete (title page, copyright, dedication)',
            'Back matter complete (author bio, Also By, mailing list CTA)',
            'EPUB file validates with zero errors',
            'Cover image meets platform dimensions and file size requirements',
            'Metadata complete: title, author, description, language, BISAC category, 7 keywords',
            'Preview rendered correctly on at least one device or emulator',
          ].map((item, i) => (
            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 10, fontSize: 16, lineHeight: 1.6, opacity: 0.88 }}>
              <input type="checkbox" disabled style={{ marginTop: 4, flexShrink: 0, accentColor: '#c9a84c' }} />
              <span>{item}</span>
            </li>
          ))}
        </ul>

        <h2 style={{ fontSize: 28, fontWeight: 700, marginTop: 48, marginBottom: 16 }}>
          Considering an all-in-one app instead?
        </h2>
        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 16, opacity: 0.9 }}>
          Some authors prefer a single app that handles writing and formatting together. If that sounds like a better fit for your workflow, see how BookKraft AI compares to the most common all-in-one options.
        </p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 32 }}>
          <Link href="/alternatives" style={{ display: 'inline-block', padding: '10px 20px', border: '1px solid rgba(201,168,76,0.4)', borderRadius: 8, color: '#9c7f35', fontWeight: 600, fontSize: 15, textDecoration: 'none' }}>
            Compare All Alternatives →
          </Link>
        </div>

        <p style={{ fontSize: 17, lineHeight: 1.7, marginBottom: 48, opacity: 0.9 }}>
          Publishing to Apple Books or IngramSpark as well as KDP? The{' '}
          <Link href="/epub-formatting-guide" style={{ color: '#9c7f35', textDecoration: 'none' }}>
            EPUB formatting guide
          </Link>{' '}
          covers the full workflow for all three stores, including store-specific validation differences and a pre-upload checklist.
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