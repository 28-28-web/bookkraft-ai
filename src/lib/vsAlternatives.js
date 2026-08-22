export const VS_ALTERNATIVES = [
  {
    slug: 'sigil-alternative',
    tool: 'Sigil',
    metaTitle: 'Best Sigil Alternative for Indie Authors — BookKraft AI',
    metaDescription: "Looking for a Sigil alternative? BookKraft AI gives you browser-based EPUB validation, formatting, and cleanup without Sigil's steep learning curve or manual OPF editing. No install required.",
    intro: "<p>Sigil is a powerful open-source EPUB editor, but it assumes you're comfortable editing raw HTML, CSS, and OPF files by hand. For most indie authors who just want clean, validated EPUB output ready for KDP and Apple Books, Sigil's workflow is several steps deeper than necessary. BookKraft AI covers the same outcomes — EPUB validation, formatting fixes, and metadata — in a browser, with no installation and no manual XML editing.</p>",
    whySwitch: [
      {
        title: 'No installation required',
        description: "Sigil is a desktop application that requires installation and a matching Qt runtime. BookKraft AI tools run entirely in the browser — upload your file, get results, download the fixed version. No Java, no Qt, no version conflicts.",
      },
      {
        title: 'Validation against the current spec',
        description: "Sigil ships with FlightCrew for validation, an older tool that misses errors EPUBCheck 5.x catches. BookKraft's EPUB Validator runs the current EPUBCheck specification and surfaces errors in plain English rather than raw XML schema messages.",
      },
      {
        title: 'Automated fixes instead of manual edits',
        description: "Fixing a duplicate ID or broken manifest reference in Sigil means opening the raw code view, finding the line, and editing XML manually. BookKraft's tools identify and fix structural issues automatically, without requiring you to understand OPF schema.",
      },
      {
        title: 'Manuscript-first workflow',
        description: "Sigil starts from an existing EPUB — it has no document import. BookKraft includes a DOCX-to-EPUB converter and manuscript cleanup tool, so you can go from a Word document to a validated EPUB in one workflow without switching between applications.",
      },
    ],
    comparison: [
      { feature: 'Platform', them: 'Desktop (Windows, Mac, Linux)', us: 'Browser (any device)' },
      { feature: 'Installation', them: 'Required (Qt runtime)', us: 'None' },
      { feature: 'EPUB validation', them: 'FlightCrew (older spec)', us: 'EPUBCheck 5.x (current)' },
      { feature: 'Manual OPF editing', them: 'Yes — required for many fixes', us: 'Automated' },
      { feature: 'DOCX import', them: 'No', us: 'Yes (EPUB Formatter)' },
      { feature: 'Price', them: 'Free (open source)', us: 'Free tools + paid AI tools' },
    ],
    faq: [
      {
        q: 'Is BookKraft AI fully replacing Sigil, or just for certain tasks?',
        a: "For most indie authors producing reflowable EPUB novels or non-fiction, BookKraft covers the main tasks: validation, metadata, formatting fixes, and DOCX conversion. Sigil remains the better choice if you need to edit raw HTML and CSS at a granular level or build custom fixed-layout EPUBs with precise code control.",
      },
      {
        q: 'Does BookKraft AI work offline?',
        a: "No — it's a browser-based tool that requires an internet connection. Sigil works offline once installed. If you regularly work without internet access, Sigil or Calibre is a better fit for offline editing.",
      },
      {
        q: 'Can I validate EPUB 3 files with BookKraft?',
        a: 'Yes — the EPUB Validator handles both EPUB 2 and EPUB 3 against the current EPUBCheck specification.',
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing in e-reader previews' },
      { type: 'epub-error', slug: 'invalid-opf-manifest-reference', label: 'OPF manifest references a missing file' },
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
    ],
  },
  {
    slug: 'jutoh-alternative',
    tool: 'Jutoh',
    metaTitle: 'Best Jutoh Alternative for EPUB Formatting — BookKraft AI',
    metaDescription: "Considering a Jutoh alternative? BookKraft AI offers browser-based EPUB formatting, validation, and metadata tools with no purchase, no license key, and no desktop install required.",
    intro: "<p>Jutoh is a paid desktop application for converting manuscripts to EPUB, MOBI, and other ebook formats. It has deep formatting controls but requires a one-time license purchase, a desktop installation, and a configuration workflow that takes time to learn. BookKraft AI provides the same core outcomes — EPUB generation, formatting cleanup, validation — as a browser-based tool with free entry-level access and no purchase required before you see results.</p>",
    whySwitch: [
      {
        title: 'No upfront purchase',
        description: "Jutoh requires a license purchase (£35–£44 depending on version) before you can export a full EPUB. BookKraft's free tools — EPUB Validator, Manuscript Cleanup, Metadata Builder — work without payment or signup. Paid AI tools require credits, but the core validation and formatting tools are free.",
      },
      {
        title: 'No project file system',
        description: "Jutoh organizes work into Jutoh project files (.juth) that need to be maintained alongside your manuscript source. BookKraft works directly with your Word or EPUB file — no project files to manage or keep in sync.",
      },
      {
        title: 'Works on any device',
        description: "Jutoh is a Windows and Mac desktop application. BookKraft runs in any browser, including tablets and Chromebooks, without installation.",
      },
      {
        title: 'Simpler validation output',
        description: "Jutoh includes its own EPUB validation but surfaces errors in Jutoh's own format. BookKraft's validator provides EPUBCheck-standard error codes with plain-English explanations, making it easier to cross-reference against platform submission guidelines.",
      },
    ],
    comparison: [
      { feature: 'Platform', them: 'Desktop (Windows, Mac)', us: 'Browser (any device)' },
      { feature: 'Cost to start', them: '£35–44 license required', us: 'Free tools, no payment required' },
      { feature: 'Project files', them: 'Yes (.juth project system)', us: 'No — upload any file directly' },
      { feature: 'EPUB export', them: 'Yes', us: 'Yes (EPUB Formatter)' },
      { feature: 'EPUB validation', them: 'Built-in (proprietary)', us: 'EPUBCheck 5.x (industry standard)' },
      { feature: 'Kindle output', them: 'Yes (via KindleGen)', us: 'Via Kindle Format Fixer' },
    ],
    faq: [
      {
        q: 'Does BookKraft handle the same output formats as Jutoh?',
        a: "BookKraft focuses on EPUB — the industry standard format that KDP, Apple Books, Kobo, and D2D all accept directly. Jutoh generates additional formats (PDF for print, ODT). If you need print-ready PDF output, Jutoh or a dedicated print layout tool is still needed for that specific output.",
      },
      {
        q: 'I already own Jutoh. Is there a reason to also use BookKraft?',
        a: "The main complementary use is validation: BookKraft's EPUB Validator runs EPUBCheck 5.x against your Jutoh-generated EPUB to catch issues before you submit to platforms. Think of it as a pre-flight check regardless of what tool produced the EPUB.",
      },
    ],
    relatedTool: 'epub-formatter',
    related: [
      { type: 'epub-error', slug: 'invalid-opf-manifest-reference', label: 'OPF manifest references a missing file' },
      { type: 'platform-rejection', slug: 'draft2digital', label: 'Why Draft2Digital rejects ebooks' },
      { type: 'platform-rejection', slug: 'apple-books', label: 'Why Apple Books rejects ebooks' },
    ],
  },
  {
    slug: 'scrivener-alternative',
    tool: 'Scrivener',
    metaTitle: 'Best Scrivener Alternative for Ebook Authors — BookKraft AI',
    metaDescription: "Using Scrivener for ebook output but unhappy with the EPUB quality? BookKraft AI validates and fixes Scrivener-compiled EPUBs — or replaces the compile step entirely for formatting and upload.",
    intro: "<p>Scrivener is a writing and manuscript tool, not an EPUB production tool — and the difference shows in its compile output. Scrivener-compiled EPUBs frequently contain ghost spacing from empty paragraph tags, inconsistent CSS from the compile template, duplicate IDs across chapters, and NCX structure that fails Apple Books validation. BookKraft AI is designed to work after Scrivener: validate the compiled EPUB, fix structural errors automatically, and produce a clean file ready for direct upload to KDP, Apple Books, and Kobo — without requiring you to open Sigil or hand-edit XML.</p>",
    whySwitch: [
      {
        title: "Fix Scrivener's compile output without hand-editing XML",
        description: "Scrivener's EPUB compile is a general-purpose converter designed for manuscripts, not fine-tuned for ebook platform requirements. Common outputs include duplicate IDs, ghost spacing from empty paragraph tags, and CSS conflicts. BookKraft's tools identify and fix these automatically.",
      },
      {
        title: 'Validation against current platform requirements',
        description: "Scrivener doesn't validate its compile output against EPUBCheck. BookKraft's EPUB Validator runs EPUBCheck 5.x, matching what Apple Books, Kobo, and D2D run when you submit. Catching validation failures before upload saves rejection round-trips.",
      },
      {
        title: 'Metadata you control',
        description: "Scrivener embeds compile-time metadata in the EPUB but gives limited control over additional OPF fields like publisher, series, or subject. BookKraft's Metadata Builder lets you inspect and edit all OPF metadata fields directly.",
      },
      {
        title: 'Clean CSS from a formatting-first tool',
        description: "Scrivener's compile templates produce CSS designed for visual appearance in Scrivener's previewer, not for EPUB rendering across devices. BookKraft's EPUB Formatter produces CSS optimized for reflowable ebook rendering: consistent paragraph spacing, proper indent handling, and no compile-artifact styles.",
      },
    ],
    comparison: [
      { feature: 'Primary purpose', them: 'Writing & manuscript management', us: 'EPUB validation & formatting' },
      { feature: 'EPUB output quality', them: 'Variable (compile template dependent)', us: 'Validated against EPUBCheck 5.x' },
      { feature: 'EPUBCheck validation', them: 'None built-in', us: 'Yes (free, no signup)' },
      { feature: 'Ghost spacing fix', them: 'Manual (compile template edit)', us: 'Automated' },
      { feature: 'OPF metadata editing', them: 'Limited (compile panel only)', us: 'Full field access (Metadata Builder)' },
      { feature: 'Platform', them: 'Desktop (Mac, Windows)', us: 'Browser (any device)' },
    ],
    faq: [
      {
        q: 'Should I stop using Scrivener and switch to BookKraft?',
        a: "No — Scrivener is a writing tool; BookKraft is a production tool. They serve different stages. Keep using Scrivener for drafting and organizing your manuscript. Use BookKraft after Scrivener's compile step to validate the output and fix formatting or structural issues before uploading to platforms.",
      },
      {
        q: "What's the most common error in Scrivener-compiled EPUBs?",
        a: "Ghost spacing (empty paragraph tags) and duplicate IDs across chapters are the two most frequent issues. Scrivener's compile templates copy structural HTML from a template file into each chapter, which often duplicates id attributes that should be unique per-document.",
      },
      {
        q: 'Can BookKraft import a Scrivener project directly?',
        a: "No — BookKraft works with the compiled EPUB or DOCX output from Scrivener, not the .scriv project file. Compile from Scrivener to EPUB or DOCX, then upload that file to BookKraft.",
      },
    ],
    relatedTool: 'epub-formatter',
    related: [
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing from empty paragraph tags' },
      { type: 'epub-error', slug: 'duplicate-id-epub', label: 'Duplicate ID attribute errors' },
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
    ],
  },
];

export function getAlternativeBySlug(slug) {
  return VS_ALTERNATIVES.find(a => a.slug === slug) ?? null;
}
