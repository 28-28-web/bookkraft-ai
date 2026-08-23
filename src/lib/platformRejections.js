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
      { type: 'checklist', slug: 'kdp-pre-launch-checklist', label: 'KDP pre-launch checklist' },
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
      { type: 'checklist', slug: 'apple-books-submission-checklist', label: 'Apple Books submission checklist' },
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
      { type: 'platform-rejection', slug: 'smashwords', label: 'Why Smashwords rejects ebooks' },
      { type: 'alternative', slug: 'draft2digital-alternative', label: "D2D's Book Builder as a formatting tool" },
    ],
  },
  {
    slug: 'kobo',
    platform: 'Kobo',
    metaTitle: 'Why Kobo Rejects Ebooks — Kobo Writing Life Rejection Causes',
    metaDescription: "Kobo Writing Life rejected your ebook? Here are the most common Kobo-specific causes — KEPUB conversion stalls, Nickel CSS incompatibilities, 100MB file limit — and how to fix each one.",
    intro: "<p>Kobo Writing Life (KWL) is both an upload portal and a conversion pipeline — every EPUB you submit is converted to Kobo's proprietary KEPUB format before it appears on any Kobo device or app. This two-stage process (upload → convert → list) means Kobo can reject your file at either stage: the initial upload check, or the KEPUB conversion that follows. Many Kobo-specific failures produce no visible error message at all — the book simply stays in \"Processing\" until you contact KWL support to find out what failed.</p>",
    topReasons: [
      {
        title: 'KEPUB conversion stalls silently',
        description: "Kobo converts every uploaded EPUB to its own KEPUB format before listing. Structural issues that EPUBCheck doesn't flag — deeply nested block elements, XPointer-style fragment identifiers in internal links, or invalid UTF-8 byte sequences outside the Basic Multilingual Plane — cause the KEPUB conversion process to hang indefinitely. The KWL dashboard shows \"Processing\" without advancing to \"Live.\" This is the most common source of Kobo-specific failures on files that pass full EPUBCheck validation.",
      },
      {
        title: 'Nickel CSS rendering incompatibilities',
        description: "Kobo's Nickel rendering engine does not support position: fixed, vw/vh viewport units, CSS3 transitions or animations, or some calc() expressions. A file that renders correctly in Kindle Previewer and Calibre can show blank pages, text overlap, or broken layout sections on Kobo devices. These are not validation errors — they are rendering incompatibilities discovered only when the file is previewed on a Kobo device or in the Kobo desktop app.",
      },
      {
        title: '100MB file size ceiling',
        description: "Kobo Writing Life enforces a 100MB maximum upload size, significantly stricter than KDP's 650MB or Apple Books' 2GB limit. Illustrated non-fiction, children's picture books, graphic novels, and books with many embedded photographs commonly exceed this. Images that pass other platforms can push a file over Kobo's limit — resize all body images to their actual display dimensions and target an EPUB size under 80MB to give a margin below the ceiling.",
      },
      {
        title: "BCP 47 language code not in Kobo's catalog allowlist",
        description: "Kobo's catalog system validates the dc:language field against a specific internal allowlist of BCP 47 codes. Uncommon regional variants — en-IN (English, India), pt-AO (Portuguese, Angola), fr-BE (French, Belgium) — may not appear in Kobo's recognized list, causing catalog processing to fail even when EPUBCheck accepts the language code as valid. Using the primary language subtag (en, pt, fr) without a regional variant resolves most of these.",
      },
      {
        title: 'Adult content two-tier distribution blocking',
        description: "Kobo separates 'listed on Kobo store' from 'distributed to retail partners.' Books with explicit sexual content can pass initial upload and appear in the Kobo store, then be blocked from distribution to retail partners (OverDrive, Indigo, Walmart) without removing the Kobo listing. Authors discover this when their book shows as Live on KWL but never appears at partner retailers.",
      },
      {
        title: 'ISBN conflicts from parallel submissions',
        description: "Authors who distribute to Kobo via both KWL directly and through an aggregator (Draft2Digital or Smashwords) can create duplicate listings under the same ISBN. Kobo flags the conflict and blocks one version — typically the aggregator's — until the duplicate is withdrawn. Resolving this requires contacting both KWL support and the aggregator to identify and remove the non-primary submission.",
      },
    ],
    howToFix: "<ol><li>If your book is stuck in \"Processing,\" contact KWL support directly — include your book title and KWL account email. Request the KEPUB conversion log to identify the specific structural element causing the stall.</li><li>Preview your EPUB on a physical Kobo device or the Kobo desktop app before submitting, not just in Kindle Previewer or Calibre. Nickel-specific rendering issues only appear on Kobo's own renderer.</li><li>Validate with EPUBCheck before upload. While EPUBCheck won't catch Nickel CSS issues, it catches structural problems that compound with Kobo's KEPUB conversion pipeline.</li><li>Resize all body images to their actual display dimensions — target under 1MP per image and keep total EPUB size under 80MB to give a margin below Kobo's 100MB limit.</li><li>Use the primary BCP 47 language subtag (en, fr, pt) rather than regional variants unless you've confirmed the regional code is in Kobo's allowlist.</li><li>Choose one submission channel for Kobo — either direct via KWL or via an aggregator — not both. Parallel submissions create ISBN conflicts that require manual intervention to resolve.</li></ol>",
    faq: [
      {
        q: 'Does Kobo accept EPUB 3?',
        a: "Yes — EPUB 3 is Kobo's preferred format and generally produces cleaner KEPUB conversion output than EPUB 2. EPUB 2 files are also accepted but may produce a KEPUB with fewer enhanced features.",
      },
      {
        q: 'How is KEPUB different from EPUB?',
        a: "KEPUB is Kobo's proprietary reading format. It adds Kobo-specific features (chapter progress indicators, Reading Life statistics) and uses a different rendering pipeline. You never interact with KEPUB directly — it's the delivery format used internally by all Kobo apps and devices after your EPUB is converted during the KWL upload process.",
      },
      {
        q: 'Why does my book show as Processing for several days?',
        a: "Extended processing almost always means the KEPUB conversion stalled on a structural element in your EPUB. Kobo's system doesn't automatically notify you of conversion failures — it just stops processing. Contact KWL support if a book has been in Processing status for more than 72 hours and request the conversion error log.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'title-tag-empty-kobo', label: 'Empty title tag (Kobo metadata error)' },
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing in e-reader previews' },
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
    ],
  },
  {
    slug: 'google-play-books',
    platform: 'Google Play Books',
    metaTitle: 'Why Google Play Books Rejects Ebooks — Partner Center Requirements',
    metaDescription: "Google Play Books rejected your ebook? Google has the strictest content policy of any major platform and ISBN requirements that differ from KDP. Here's what to check and fix before resubmitting.",
    intro: "<p>Google Play Books Partner Center has the strictest content policy of any major ebook retailer and applies validation and pricing rules that differ from every other platform. Unlike KDP, which reviews contested content and sometimes approves it after human evaluation, Google Play rejections in restricted content categories are typically final with no appeal route. The ISBN requirement, price-matching behavior, and Google-specific EPUB validation also catch authors who've published to KDP and Apple Books without issue.</p>",
    topReasons: [
      {
        title: 'Strictest content policy of any major ebook platform',
        description: "Google Play Books rejects content categories that KDP, Apple Books, and Kobo accept — including explicit sexual content of any kind (there is no adult-opt-in process as there is on KDP), certain dark fiction sub-genres, and content that triggers Google's automated moderation classifiers. If your content falls into a restricted category, resubmission produces the same outcome. Google Play is simply not a viable distribution channel for those content types.",
      },
      {
        title: 'Price-match enforcement creates first-submission surprises',
        description: "Google automatically matches the lowest price your book appears at elsewhere. If your book is permafree on Smashwords, your own website, or Patreon, Google lists it at zero and may block relisting at a paid price. This is not a validation rejection — it is a pricing policy applied at listing time that authors encounter for the first time when their new listing appears at $0.00 without explanation.",
      },
      {
        title: 'ISBN required for all paid books',
        description: "Unlike KDP, which accepts EPUB without an ISBN and generates its own ASIN, Google Play Partner Center requires a valid ISBN-13 for every paid book. Books without a properly formatted ISBN in the OPF content.opf file — or with an ISBN in the file but missing from the Partner Center metadata form — are rejected at intake.",
      },
      {
        title: 'Google-specific EPUB validation beyond EPUBCheck',
        description: "Google's processing pipeline applies validation checks beyond standard EPUBCheck. Common Google-specific failures: NCX playOrder attribute values that are non-sequential or contain gaps, internal hyperlinks with unencoded special characters in href attributes (spaces, ampersands that should be %20 and %26), and OPF attribute combinations Google's parser doesn't recognize. Rejection emails cite Google system codes rather than EPUBCheck codes, making cross-referencing against standard documentation difficult.",
      },
      {
        title: 'Copyright scanning flags stock images and near-duplicate content',
        description: "Google scans uploaded book content and covers against its image rights database and Google Books scan index more aggressively than other platforms. Covers using stock images without embedded licensing metadata, images matching existing Google Books scans, and content with large portions matching publicly available text trigger rights holds requiring manual verification — a process that can take weeks to resolve.",
      },
    ],
    howToFix: "<ol><li>Review Google Play Books' content policies before submitting — if your content touches restricted categories, resubmission will not produce a different outcome.</li><li>Confirm your book's lowest price across all platforms before submitting to Google Play. If it's free anywhere, expect Google to match that price automatically.</li><li>Add a valid ISBN-13 to content.opf as a dc:identifier element and enter the same ISBN in Partner Center's metadata form — both must be present and match.</li><li>Review your NCX playOrder values — they must be sequential integers with no gaps. Regenerate your TOC in Calibre or Sigil if the NCX was manually edited.</li><li>Check all internal href attributes for unencoded characters — spaces must be %20, ampersands must be %26.</li><li>If held for image rights review, submit license documentation for any stock images through Partner Center's rights dispute form.</li></ol>",
    faq: [
      {
        q: 'Can I appeal a Google Play Books content rejection?',
        a: "In most cases, no. Content rejections in restricted categories are applied by policy, not by case-by-case review. An appeal path exists mainly for books incorrectly flagged by automated moderation — not for content that genuinely falls in a restricted category.",
      },
      {
        q: 'Does Google Play Books require an ISBN for free books?',
        a: "No — Google generates its own identifier for free books. The ISBN requirement applies specifically to paid books submitted through Partner Center.",
      },
      {
        q: 'Why did Google lower the price of my book without asking?',
        a: "Google's Partner Center terms include a price-matching clause. Google monitors book prices on major retail sites and adjusts its listing price to match the lowest available price elsewhere. To maintain a paid price on Google Play, your book must not be free on any platform Google monitors.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'unique-identifier-not-found', label: 'Unique identifier not found (OPF-048)' },
      { type: 'epub-error', slug: 'unescaped-ampersand-xhtml', label: 'Unescaped ampersand in XHTML' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
    ],
  },
  {
    slug: 'smashwords',
    platform: 'Smashwords',
    metaTitle: 'Why Smashwords Rejects Ebooks — Meatgrinder and Premium Catalog',
    metaDescription: "Smashwords rejected your book or blocked it from retail distribution? The Meatgrinder DOCX requirements, Premium Catalog gate, and D2D merger transition cause most Smashwords-specific issues. Here's how to fix them.",
    intro: "<p>Smashwords is unique among major ebook distributors in using a DOCX-first conversion pipeline called Meatgrinder, which converts your Word document into multiple formats simultaneously. This means Smashwords-specific rejection causes are almost entirely about Word document formatting, not EPUB structure — a file that passes EPUBCheck validation can still fail Smashwords' auto-vetter if the source Word document doesn't follow the Smashwords Style Guide. Since merging with Draft2Digital in 2022, Smashwords shares distribution infrastructure with D2D, but the Meatgrinder pipeline and the Premium Catalog gate remain operational and continue to be the source of most Smashwords-specific author problems.</p>",
    topReasons: [
      {
        title: 'Meatgrinder DOCX formatting requirements',
        description: "Meatgrinder requires Word documents that conform strictly to the Smashwords Style Guide. The auto-vetter blocks conversion when it detects: tracked changes (Accept All Changes before submitting), Word comments, field codes (which produce auto-generated TOCs, page numbers, or cross-references in Word), or section breaks. These elements appear invisible in the finished document but cause conversion errors Meatgrinder can't recover from. Smashwords calls the full manual cleanup process the 'Nuclear Option' — a complete style reset in Word before submission.",
      },
      {
        title: 'Table of contents format not recognized by the auto-vetter',
        description: "Smashwords requires a specific manually built table of contents using Word bookmarks — not Word's built-in Insert → Table of Contents feature. A TOC generated with Word's auto-TOC function contains field codes that the auto-vetter flags as conversion-blocking. The correct method (per the Smashwords Style Guide) is a manually typed TOC with each chapter title hyperlinked to a named bookmark at the start of that chapter.",
      },
      {
        title: 'Premium Catalog gate: accepted to the store ≠ distributed to retailers',
        description: "Uploading successfully to Smashwords does not guarantee inclusion in the Premium Catalog, which controls distribution to Barnes & Noble, OverDrive, Scribd, and other retail partners. Premium rejection reasons include: missing or invalid ISBN, cover image under 1400px on the short side, non-standard metadata, and content flags specific to individual retailer partners. Books accepted to the Smashwords store but blocked from Premium appear on Smashwords.com only — no retailer listings appear.",
      },
      {
        title: 'Adult content distribution controls',
        description: "Smashwords allows explicit sexual content on its own store but withholds distribution to Apple Books, Barnes & Noble, and library channels for books marked adult. Authors who mark their book as adult and expect full retail distribution are often surprised to find it blocked from the majority of distribution partners. Smashwords provides a per-retailer opt-in checklist for adult titles in the account dashboard, but the behavior at individual retailers changes when partners update their content policies.",
      },
      {
        title: 'D2D merger transition: dual-submission ISBN conflicts',
        description: "Since Smashwords merged with Draft2Digital (2022), authors who previously used both platforms have had books submitted through both the legacy Smashwords system and D2D's system simultaneously. Retailers receive duplicate deliveries under the same ISBN. Smashwords (sharing infrastructure with D2D) blocks one version — typically the lower-priority submission — without clearly notifying the author. Resolving this requires identifying which system holds the active ISBN and withdrawing from the other.",
      },
    ],
    howToFix: "<ol><li>Before submitting, run the 'Nuclear Option' cleanup from the Smashwords Style Guide: accept all tracked changes, delete all comments, convert all auto-generated field codes to plain text, and reset paragraph styles to Normal before reapplying heading styles manually.</li><li>Replace any Word auto-generated TOC with a manually typed one using Word bookmarks — each chapter title linked to a bookmark at the first paragraph of that chapter.</li><li>Check your Premium Catalog status in the dashboard after upload. If listed as 'Pending' for more than 5 business days, review the Premium requirements checklist and resubmit with the corrected file.</li><li>For adult content, review the distribution opt-in dashboard and confirm which retailer channels accept your content category before expecting retailer listings to appear.</li><li>If you've used both Smashwords and Draft2Digital previously, check both dashboards for active submissions under the same ISBN and withdraw from the non-primary channel to resolve the conflict.</li></ol>",
    faq: [
      {
        q: 'Can I submit an EPUB to Smashwords instead of a DOCX?',
        a: "Yes — since the D2D merger, Smashwords accepts EPUB submissions, which bypass the Meatgrinder pipeline entirely. EPUBs go through a lighter processing path. However, you still need to meet all Premium Catalog requirements (ISBN, cover size, metadata) when submitting EPUB, and the EPUB must pass Smashwords' basic validation.",
      },
      {
        q: "What's the 'Nuclear Option' in the Smashwords Style Guide?",
        a: "It's a manual formatting reset for Word documents — select all text, clear all formatting, then reapply styles from scratch. The goal is to eliminate hidden formatting artifacts (field codes, embedded styles, autoformatting) that Meatgrinder can't process. The Style Guide walks through the exact steps required.",
      },
      {
        q: 'How is Smashwords different from Draft2Digital now that they have merged?',
        a: "Smashwords operates as a distinct brand with its own storefront (Smashwords.com) and the Meatgrinder DOCX pipeline. D2D operates as the distribution network backend that both platforms share. From a submission standpoint, they remain separate dashboards with different interfaces and different requirements — but their retail distribution network is now the same infrastructure.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'platform-rejection', slug: 'draft2digital', label: 'Why Draft2Digital rejects ebooks' },
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing from empty paragraph tags' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
    ],
  },
];

export function getRejectionBySlug(slug) {
  return PLATFORM_REJECTIONS.find(r => r.slug === slug) ?? null;
}
