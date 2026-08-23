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
      { type: 'mistake', slug: 'word-scrivener-export-mistakes', label: 'Word and Scrivener export mistakes guide' },
    ],
  },
  {
    slug: 'reedsy-alternative',
    tool: 'Reedsy Book Editor',
    metaTitle: 'Reedsy Book Editor Alternative — BookKraft AI',
    metaDescription: "Using Reedsy Book Editor but hitting validation errors or Apple Books rejections on export? BookKraft AI adds EPUBCheck validation, metadata control, and structural fixes that Reedsy's export doesn't provide.",
    intro: "<p>Reedsy Book Editor is a browser-based formatter designed to produce visually polished ebook and print outputs for fiction authors. It handles chapter organization, typographic styling, and simultaneous EPUB and PDF export well. What it doesn't provide is pre-upload technical validation: Reedsy's EPUB export is designed to look right in reading apps, not to satisfy EPUBCheck 5.x and the additional requirements of Apple Books Connect and Kobo Writing Life. BookKraft AI is the validation and structural-fix layer that Reedsy authors need before distributing — not a replacement for the formatting step Reedsy handles well.</p>",
    whySwitch: [
      {
        title: 'EPUBCheck validation before you upload',
        description: "Reedsy's Book Editor doesn't run EPUBCheck on its export. The EPUB it produces is designed for visual rendering, but Apple Books Connect and Kobo Writing Life run EPUBCheck validation on submission. A Reedsy-exported EPUB can fail platform validation on metadata fields, nav.xhtml structure, or attribute compliance that Reedsy's own preview doesn't expose. BookKraft's EPUB Validator runs the current EPUBCheck specification against any EPUB and surfaces issues in plain English before you hit the platform submission screen.",
      },
      {
        title: 'Metadata you can inspect and edit',
        description: "Reedsy manages EPUB metadata (title, author, ISBN) through its book setup form. You can't see or edit the raw OPF fields it generates — and Reedsy doesn't populate all OPF metadata that platforms like Apple Books and Google Play require. BookKraft's Metadata Builder lets you inspect every dc: field, add missing identifiers, set the correct unique-identifier cross-reference, and export a corrected OPF — all without touching XML by hand.",
      },
      {
        title: 'Fix structural issues in Reedsy-exported EPUBs',
        description: "Reedsy's export templates can introduce issues that appear fine in Reedsy's preview but fail platform validation: duplicate id attributes across chapters (Reedsy copies structural ids from a chapter template), empty paragraph tags used for section spacing, and CSS properties not supported by Nickel or older Kindle firmware. BookKraft's formatting tools identify and fix these automatically.",
      },
      {
        title: 'Not limited to fiction-style layouts',
        description: "Reedsy Book Editor is optimized for prose fiction — chapter-based reflowable ebooks with clean typographic styling. Non-fiction with complex structure (numbered lists, code blocks, comparison tables, call-out boxes) either renders inconsistently in Reedsy or requires workarounds. BookKraft's tools handle these structures through direct EPUB and DOCX manipulation rather than through a design-for-fiction formatter.",
      },
    ],
    comparison: [
      { feature: 'Primary purpose', them: 'Manuscript formatting (fiction-optimized)', us: 'EPUB validation & structural fixing' },
      { feature: 'EPUB export', them: 'Yes (from manuscript)', us: 'Yes (from DOCX) + fixes existing EPUBs' },
      { feature: 'EPUBCheck validation', them: 'Not included', us: 'Yes (free, EPUBCheck 5.x)' },
      { feature: 'OPF metadata editing', them: 'Via book setup form (limited fields)', us: 'Full field access (Metadata Builder)' },
      { feature: 'Platform', them: 'Browser (any device)', us: 'Browser (any device)' },
      { feature: 'Print PDF output', them: 'Yes', us: 'No' },
    ],
    faq: [
      {
        q: 'Should I stop using Reedsy and switch to BookKraft for formatting?',
        a: "Only if your workflow needs more than Reedsy's fiction-optimized formatter provides. For prose novels, Reedsy's output is clean and well-designed. The gap is validation and compliance, not visual quality — use Reedsy to format, then validate the exported EPUB in BookKraft before uploading to platforms.",
      },
      {
        q: 'Does BookKraft produce the same typographic quality as Reedsy?',
        a: "Reedsy's design-focused output is its main strength — drop caps, chapter headers, end-of-chapter ornaments, typeface pairing. BookKraft's EPUB output is optimized for technical compliance and cross-platform consistency, not decorative typography. They serve different priorities.",
      },
      {
        q: 'Can BookKraft fix a Reedsy-exported EPUB without me editing anything manually?',
        a: "Yes — upload the EPUB from Reedsy to BookKraft's EPUB Validator to see what issues exist, then use the EPUB Formatter to apply automated fixes. You get a corrected EPUB without opening a code editor.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing in e-reader previews' },
      { type: 'epub-error', slug: 'duplicate-id-epub', label: 'Duplicate ID attribute errors' },
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
    ],
  },
  {
    slug: 'draft2digital-alternative',
    tool: "Draft2Digital Book Builder",
    metaTitle: "Draft2Digital Book Builder Alternative — BookKraft AI",
    metaDescription: "D2D's Book Builder formats your DOCX for distribution but the intermediate EPUB is invisible. BookKraft AI validates before D2D converts, catching structural issues before they become retailer rejections.",
    intro: "<p>Draft2Digital's Book Builder is the built-in formatting tool available to every author distributing through D2D — upload a DOCX, and D2D converts it to retailer-ready formats for Apple Books, Kobo, B&N, and its other partners. The convenience is real, but so is the trade-off: D2D's conversion runs after you submit, and you don't see or validate the intermediate EPUB it creates. If the conversion introduces formatting issues, you discover them from a reader complaint or a post-delivery retailer flag, not from a pre-upload check. BookKraft covers the validation and pre-flight step that D2D Book Builder doesn't include — and lets you submit an EPUB to D2D directly if you want full control over the file D2D distributes.</p>",
    whySwitch: [
      {
        title: 'Validate before D2D converts',
        description: "When you upload a DOCX to D2D Book Builder, D2D's conversion runs on their servers after submission — you can't inspect or validate the EPUB D2D creates before it's delivered to retailers. BookKraft's workflow alternative: convert your DOCX to EPUB using BookKraft's EPUB Formatter, validate it against EPUBCheck, fix any issues, then upload the validated EPUB directly to D2D. This bypasses D2D's conversion entirely while keeping D2D as your distributor.",
      },
      {
        title: 'See and fix the output before distribution',
        description: "D2D Book Builder produces retailer-specific outputs that aren't available for download as a standalone EPUB before distribution. If D2D's conversion creates ghost spacing from empty paragraph tags, inconsistent chapter heading styles, or CSS that breaks on Kobo's Nickel renderer, there's no pre-distribution step to catch it. BookKraft produces an EPUB you can inspect, run through EPUBCheck, preview in Calibre and Kindle Previewer, and fix before any retailer receives it.",
      },
      {
        title: 'EPUBCheck compliance, not just rendering quality',
        description: "D2D Book Builder is optimized to produce output that looks correct in reading apps — it's not validated against EPUBCheck before distribution. Apple Books runs EPUBCheck on every submission and rejects files with structural errors. If D2D's conversion of your DOCX produces an EPUBCheck failure, Apple Books will reject the version D2D delivers, and you may not discover which structural issue caused it. BookKraft's EPUB Validator surfaces EPUBCheck issues in plain English before the file leaves your control.",
      },
      {
        title: 'Full metadata control',
        description: "D2D Book Builder generates OPF metadata from what you enter in D2D's book setup screens. You can't inspect the raw OPF it produces, verify the unique-identifier cross-reference, or add metadata fields D2D's form doesn't expose — series information, subject codes, dc:publisher. BookKraft's Metadata Builder provides direct access to all OPF fields and exports a corrected EPUB with complete metadata.",
      },
    ],
    comparison: [
      { feature: 'Workflow position', them: 'Integrated with D2D distribution', us: 'Pre-submission validation + formatting' },
      { feature: 'EPUB you can inspect', them: 'No — conversion is internal', us: 'Yes — download and review before upload' },
      { feature: 'EPUBCheck validation', them: 'Not run pre-distribution', us: 'Yes (free, current spec)' },
      { feature: 'Output visibility', them: 'Retailer-delivered only', us: 'Full EPUB download' },
      { feature: 'OPF metadata editing', them: 'Via D2D setup form', us: 'Full field access (Metadata Builder)' },
      { feature: 'Distribution network', them: 'Yes (40+ retailers)', us: 'No — use your existing distributor' },
    ],
    faq: [
      {
        q: 'If I validate with BookKraft first, can I still distribute through D2D?',
        a: "Yes — BookKraft and D2D are complementary, not competing. Format and validate with BookKraft, then upload the validated EPUB to D2D as a direct EPUB submission rather than a DOCX. D2D accepts EPUB directly and distributes it to retailers without additional conversion. You keep D2D's distribution network while gaining full control over the EPUB D2D delivers.",
      },
      {
        q: "What's the difference between this page and the D2D platform-rejection guide?",
        a: "The D2D rejection guide covers why D2D blocks files at submission — file format requirements, metadata checks, content policy. This page is about D2D as a formatting tool: the Book Builder DOCX conversion workflow, what it produces, and why you might want to validate or control the output before it reaches retailers.",
      },
      {
        q: "Does D2D Book Builder produce EPUBCheck-clean output?",
        a: "Generally yes for straightforward prose manuscripts. The risk area is complex DOCX formatting — tables, nested lists, images with captions, footnotes — where D2D's conversion makes assumptions about structure that may produce EPUBCheck warnings or Apple Books-specific validation failures.",
      },
    ],
    relatedTool: 'epub-formatter',
    related: [
      { type: 'platform-rejection', slug: 'draft2digital', label: 'Why Draft2Digital rejects ebooks' },
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing from empty paragraph tags' },
      { type: 'epub-error', slug: 'unique-identifier-not-found', label: 'OPF unique identifier not found (OPF-048)' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
    ],
  },
];

export function getAlternativeBySlug(slug) {
  return VS_ALTERNATIVES.find(a => a.slug === slug) ?? null;
}
