export const PLATFORM_REJECTIONS = [
  {
    slug: 'amazon-kdp',
    platform: 'Amazon KDP',
    metaTitle: 'Why Amazon KDP Rejects Ebooks — Most Common Reasons',
    metaDescription: "KDP rejected your ebook? Here are the most common reasons Amazon KDP rejects EPUB and DOCX files — from validation errors and metadata issues to content policy flags — and how to fix each one.",
    intro: '<p>Amazon KDP is the most common upload destination for self-published authors, and its rejection system catches problems ranging from technical file errors to content policy issues. Some rejections arrive as automated upload errors; others come as emails from the KDP content review team after a book is queued for review. Knowing which category applies to your rejection determines where to look first.</p>',
    topReasons: [
      {
        title: 'EPUB validation failures',
        description: "KDP runs a version of EPUBCheck on uploaded files. Critical errors — missing spine items, broken manifest references, corrupted font files — will block the upload entirely. KDP's error messages are often less descriptive than EPUBCheck's own output, so running your file through EPUBCheck directly before uploading gives you the cleaner diagnosis.",
      },
      {
        title: 'Oversized or unsupported images',
        description: "KDP enforces a total file size limit. Images larger than their display size waste space and push files over the limit. KDP requires images to be JPG or GIF inside the EPUB — PNG images work on most platforms but can occasionally trigger processing errors in KDP's conversion pipeline.",
      },
      {
        title: 'Missing or incomplete metadata',
        description: 'The dc:title and dc:creator fields in content.opf must be present and non-empty. A book title that exactly matches an existing title on Amazon can trigger a duplicate content review. The language attribute must be a valid BCP 47 language code (e.g., "en", "en-US").',
      },
      {
        title: 'NCX or TOC structure errors',
        description: "KDP's conversion pipeline reads the NCX to build the Kindle's chapter navigation. A missing NCX, broken navPoint references, or an NCX listing chapters not in the spine causes the Kindle version to have a broken or empty table of contents — KDP may reject this or produce a file that fails Quality Review.",
      },
      {
        title: 'Content policy flags',
        description: "KDP scans uploaded content against its content guidelines. Books with prohibited content categories, titles or descriptions that trigger keyword filters, or covers that violate content policies are flagged for human review. AI-generated content declarations are now required in some categories.",
      },
      {
        title: 'Duplicate content',
        description: "Uploading a book with the same or very similar content to an existing ASIN — including your own — can trigger a quality flag. This is common when authors upload a second edition without clearly differentiating the title and content, or when a free preview is uploaded separately as a full book.",
      },
    ],
    howToFix: "<ol><li>Validate your EPUB with EPUBCheck or BookKraft's free EPUB Validator before uploading — fix all Critical and Error-level issues, not just warnings.</li><li>Run your file through the Kindle Previewer desktop app after upload to confirm the converted Kindle version renders correctly before publishing.</li><li>Check all metadata fields in content.opf: dc:title, dc:creator, dc:language (BCP 47 code), and dc:identifier (ISBN or unique ID).</li><li>If blocked by a content policy flag, check the rejection email for the specific guideline reference and review the KDP Content Guidelines before resubmitting.</li></ol>",
    faq: [
      {
        q: 'Does KDP accept EPUB 3 files?',
        a: 'Yes, KDP accepts EPUB 3, EPUB 2, and DOCX. EPUB 3 is the preferred format. KDP converts all uploaded files to Kindle Format (KFX/MOBI8) before delivery, so the EPUB you upload is the source, not the delivered format.',
      },
      {
        q: 'How long does KDP take to review a flagged book?',
        a: 'Automated upload rejections are immediate. Content policy reviews typically take 1–5 business days. If your book has been in review for more than 7 days, KDP support can provide a status update.',
      },
      {
        q: 'Can I upload a DOCX instead of EPUB to avoid validation errors?',
        a: "Yes, but the trade-off is less control over the final output. KDP's DOCX-to-Kindle conversion handles basic formatting well but can produce inconsistent results with complex layouts, custom fonts, or tables. A validated EPUB gives you more predictable output.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'epub-error', slug: 'broken-spine-order', label: 'Broken spine order errors' },
      { type: 'alternative', slug: 'scrivener-alternative', label: 'Scrivener alternative for ebook production' },
    ],
  },
  {
    slug: 'apple-books',
    platform: 'Apple Books',
    metaTitle: 'Why Apple Books Rejects Ebooks — Common Rejection Reasons',
    metaDescription: "Apple Books rejected your EPUB? Apple's validation is stricter than most platforms. Here are the most common Apple Books rejection reasons and how to fix them before resubmitting.",
    intro: "<p>Apple Books (distributed through Apple Books Connect) has the strictest EPUB validation requirements of any major ebook platform. Apple runs a full EPUBCheck pass and additionally validates against Apple-specific schema rules. A file that passes KDP upload can still fail Apple Books validation — and Apple's rejection emails often include specific EPUBCheck error codes, which makes diagnosis more straightforward than on other platforms.</p>",
    topReasons: [
      {
        title: 'Strict EPUB validation (EPUBCheck failures)',
        description: "Apple Books runs EPUBCheck validation and rejects files with any Critical or Error-level issue. Apple is one of the only major platforms to reject on warnings in some cases. Any structural defect — broken spine, missing manifest resource, invalid OPF attribute — will block the upload. Apple also checks HTML validity inside content files, not just OPF structure.",
      },
      {
        title: 'Missing or invalid ISBN',
        description: "For paid books distributed through Apple Books Connect, a valid ISBN-13 is required as the primary identifier. It must be declared in content.opf as a dc:identifier with the correct scheme attribute. Paid books without a valid ISBN are rejected at submission.",
      },
      {
        title: 'Image DPI and color profile issues',
        description: "Apple Books requires cover images to be at minimum 1400×2100 pixels, RGB color mode, sRGB color profile. CMYK images — common when covers are designed for print — are rejected. Images embedded in the book body must be in web-safe formats (JPG, PNG, GIF) with correct MIME types declared in the manifest.",
      },
      {
        title: 'Fixed-layout EPUB errors',
        description: "Fixed-layout EPUBs (used for picture books, comics, and heavily designed books) require specific OPF metadata and spine properties. Missing rendition metadata, incorrect viewport declarations, or spine items without the correct properties attribute causes Apple to reject the file.",
      },
      {
        title: 'Missing nav.xhtml (EPUB 3)',
        description: "EPUB 3 files must include a navigation document (nav.xhtml) with a valid toc nav element. Apple requires this even when an NCX is also present. The nav.xhtml must be listed in the manifest with the nav property and must contain a correctly structured ordered list of chapter links.",
      },
      {
        title: 'Content and rights issues',
        description: "Apple Books has content guidelines covering explicit content, depictions of minors, and specific content categories. Books must also include accurate rights and territory declarations. Submitting a book for worldwide distribution when rights are territory-limited causes a rights conflict rejection.",
      },
    ],
    howToFix: '<ol><li>Validate your EPUB with EPUBCheck 5.x and fix every error — Apple does not accept EPUBs with unresolved errors.</li><li>Confirm your ISBN is entered correctly in content.opf as a dc:identifier element with scheme="ISBN".</li><li>Check your cover image: export as JPG or PNG in RGB/sRGB color mode at minimum 1400×2100px before embedding.</li><li>For EPUB 3 files, verify nav.xhtml exists, is listed in the manifest with properties="nav", and contains a valid <code>&lt;nav epub:type="toc"&gt;</code> element.</li><li>Re-submit through Apple Books Connect — the rejection email includes specific error codes traceable to EPUBCheck documentation.</li></ol>',
    faq: [
      {
        q: 'Does Apple Books accept EPUB 2?',
        a: "Yes, but Apple strongly recommends EPUB 3 and applies stricter requirements to EPUB 2 submissions. EPUB 3 gives you the most predictable validation outcome.",
      },
      {
        q: 'My file passed EPUBCheck but Apple still rejected it — why?',
        a: "Apple validates against some Apple-specific schema rules beyond EPUBCheck, particularly for fixed-layout books and accessibility metadata. The rejection email should include the specific error Apple's system flagged.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'duplicate-id-epub', label: 'Duplicate ID attribute errors' },
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'alternative', slug: 'jutoh-alternative', label: 'Jutoh alternative for EPUB formatting' },
    ],
  },
  {
    slug: 'draft2digital',
    platform: 'Draft2Digital',
    metaTitle: 'Why Draft2Digital Rejects Ebooks — Common Reasons and Fixes',
    metaDescription: "Draft2Digital rejected your file? D2D distributes to 40+ retailers and has its own validation step. Here are the most common Draft2Digital rejection reasons and how to resolve them.",
    intro: "<p>Draft2Digital (D2D) is a distribution aggregator that converts your source file and delivers it to 40+ retailers including Barnes &amp; Noble, Kobo, Apple Books, and Scribd. Because D2D handles conversion for multiple destinations, its acceptance requirements are tighter than a single-retailer upload — a file that would pass KDP direct upload might fail D2D's pre-conversion checks, since D2D needs a clean source file to produce clean output across all its downstream partners.</p>",
    topReasons: [
      {
        title: 'Unsupported file format',
        description: "D2D accepts EPUB, DOCX, and RTF. It does not accept PDF, MOBI, AZW, or KFX files. Uploading a PDF is the most common rejected format — authors often assume PDF is universal, but D2D cannot reflow PDF content into the format required by ebook retailers.",
      },
      {
        title: 'EPUB validation failures',
        description: "D2D runs validation on uploaded EPUBs before conversion. Structural errors — missing spine items, corrupted manifest, invalid NCX — block the upload. D2D's error messages are generally clearer than KDP's, often citing the specific file and element causing the issue.",
      },
      {
        title: 'Missing required metadata',
        description: "D2D requires a book title, author name, and at least one category selection before submission. These can be entered in D2D's interface even if missing from the EPUB itself, but the content.opf dc:title and dc:creator fields are also validated and must be present in submitted EPUBs.",
      },
      {
        title: 'Content policy violations',
        description: "D2D distributes to retailers with their own content guidelines. Books with content that violates the policies of any of D2D's distribution partners are flagged during D2D's pre-review. D2D publishes a content policy specifying categories accepted with restrictions and categories not accepted at all.",
      },
      {
        title: 'Image file issues',
        description: "D2D's conversion pipeline requires cover images to be submitted separately as a high-resolution JPG (minimum 1400px on the shortest side). Images embedded in the book body must be in standard web formats (JPG, PNG, GIF) — unusual image types or missing MIME type declarations in the manifest cause conversion failures.",
      },
    ],
    howToFix: "<ol><li>Confirm your file format is EPUB, DOCX, or RTF — if you have a PDF, convert to DOCX first using Word or Google Docs.</li><li>Validate your EPUB with EPUBCheck before uploading — D2D's validator is less descriptive than EPUBCheck itself, so getting the full error list in advance saves time.</li><li>Prepare your cover image separately: JPG format, minimum 1400px on the short side, RGB color mode.</li><li>Complete all required fields in D2D's metadata interface (title, author, categories, description) before attempting submission.</li><li>If rejected for content reasons, review D2D's current content policy and contact D2D support for clarification on which guideline was triggered.</li></ol>",
    faq: [
      {
        q: 'Can Draft2Digital convert a DOCX better than an EPUB?',
        a: "For straightforward prose books, D2D's DOCX conversion is often cleaner than converting a poorly-built EPUB. For books with custom fonts, complex layouts, or fixed formatting requirements, a well-built EPUB gives you more control.",
      },
      {
        q: 'Does D2D check for duplicate content?',
        a: "D2D doesn't actively scan for duplicates across its catalog, but downstream retailers (particularly Apple Books) do. If a book submitted through D2D triggers a duplicate content flag at a retailer level, D2D may contact you to clarify.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'broken-spine-order', label: 'Broken spine order errors' },
      { type: 'epub-error', slug: 'invalid-opf-manifest-reference', label: 'OPF manifest references a missing file' },
      { type: 'alternative', slug: 'jutoh-alternative', label: 'Jutoh alternative for EPUB formatting' },
    ],
  },
];

export function getRejectionBySlug(slug) {
  return PLATFORM_REJECTIONS.find(r => r.slug === slug) ?? null;
}
