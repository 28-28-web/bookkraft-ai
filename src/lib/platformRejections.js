export const PLATFORM_REJECTIONS = [
  {
    slug: 'amazon-kdp',
    platform: 'Amazon KDP',
    metaTitle: 'Why Amazon KDP Rejects Ebooks — Most Common Reasons',
    metaDescription: "KDP rejected your ebook? Here are the most common reasons Amazon KDP rejects EPUB and DOCX files — from validation errors and metadata issues to content policy flags — and how to fix each one.",
    intro: '<p>Amazon KDP rejects ebooks for two distinct reasons: structural EPUB errors that fail the automated upload check immediately, and content policy flags that trigger a human review queue with a 1–5 business day delay. Which category caught your submission determines where to look — EPUBCheck failures surface as upload errors the moment the file is submitted, while content flags arrive as review emails after the book is queued.</p>',
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
      { type: 'mistake', slug: 'kdp-formatting-mistakes', label: '7 KDP formatting mistakes indie authors make' },
      { type: 'cover-requirement', slug: 'amazon-kdp-ebook', label: 'Amazon KDP ebook cover size requirements' },
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
      { type: 'cover-requirement', slug: 'apple-books-ebook', label: 'Apple Books ebook cover size requirements' },
    ],
  },
  {
    slug: 'draft2digital',
    platform: 'Draft2Digital',
    metaTitle: 'Why Draft2Digital Rejects Ebooks — Common Reasons and Fixes',
    metaDescription: "Draft2Digital rejected your file? D2D distributes to 40+ retailers and has its own validation step. Here are the most common Draft2Digital rejection reasons and how to resolve them.",
    intro: "<p>Draft2Digital's acceptance requirements are stricter than a single-retailer upload because D2D converts your file and delivers it to 40+ retailers simultaneously — a file that passes KDP's upload can fail D2D's pre-conversion check if it would produce broken output for downstream partners. The most common D2D-specific failure categories are unsupported file formats (PDF is rejected; D2D requires EPUB, DOCX, or RTF), EPUB structural errors, and cover images below D2D's 1400px minimum.</p>",
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
      { type: 'platform-rejection', slug: 'overdrive', label: 'Why OverDrive rejects ebooks (library distribution)' },
    ],
  },
  {
    slug: 'kobo',
    platform: 'Kobo',
    metaTitle: 'Why Kobo Rejects Ebooks — Kobo Writing Life Rejection Causes',
    metaDescription: "Kobo Writing Life rejected your ebook? Here are the most common Kobo-specific causes — KEPUB conversion stalls, Nickel CSS incompatibilities, 100MB file limit — and how to fix each one.",
    intro: "<p>Kobo Writing Life can reject your EPUB at two separate stages: the initial upload check, and the KEPUB conversion that runs afterward. The conversion stage is where Kobo-specific failures occur — structural issues that pass EPUBCheck and upload to KDP without error can cause Kobo's KEPUB pipeline to stall silently, leaving the book stuck in \"Processing\" with no error message until you contact KWL support directly.</p>",
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
    intro: "<p>Smashwords rejections are almost entirely about Word document formatting, not EPUB structure — a file that passes EPUBCheck can fail Meatgrinder's auto-vetter if the source DOCX contains tracked changes, Word-generated TOC field codes, or style artifacts the pipeline can't process. Since the D2D merger (2022), Smashwords and Draft2Digital share distribution infrastructure, but Meatgrinder and the Premium Catalog gate that controls retailer distribution remain separate.</p>",
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
  {
    slug: 'ingram-spark',
    platform: 'IngramSpark',
    metaTitle: 'Why IngramSpark Rejects Books — Print PDF and Ebook Distribution Requirements',
    metaDescription: "IngramSpark rejected your file? IngramSpark's print PDF/X-1a specification is stricter than KDP's. Here are the most common print and ebook rejection causes — bleed, spine width, barcode, embedded fonts — and how to fix each one.",
    intro: "<p>IngramSpark has two independent rejection pipelines — one for print files and one for ebook distribution — and authors coming from KDP are most often caught by print requirements KDP doesn't enforce. The biggest blocker: both the interior PDF and cover PDF must be in PDF/X-1a format, a prepress standard requiring CMYK color, fully embedded fonts, and no transparency — requirements that consumer tools like Canva and Google Docs don't produce without extra steps.</p>",
    topReasons: [
      {
        title: 'Interior or cover PDF not in PDF/X-1a format',
        description: "IngramSpark requires both the interior PDF and the cover PDF to be in PDF/X-1a format — a prepress standard designed for consistent commercial print reproduction. Standard PDF, PDF/X-3, and PDF/X-4 are rejected at intake. PDF/X-1a requires CMYK or grayscale color (no RGB or ICC-based color profiles), embedded fonts (no font substitution), and no transparency. Most consumer PDF export tools — Canva, Google Docs, unoptimized InDesign exports — produce standard PDFs that fail this requirement without any visible error in the file itself.",
      },
      {
        title: 'Cover bleed not set or set incorrectly',
        description: "IngramSpark requires 0.125 inches of bleed on all four sides of the cover PDF — a printing margin that allows the press to cut to trim size without leaving white edges. A cover exported at exact trim size with no bleed, or with bleed on only some sides, is rejected before it reaches the printer. Canva and most consumer design tools produce covers at trim size with no bleed option, which is the primary reason first-time IngramSpark authors have their cover rejected while an identical cover file passes KDP's cover upload without issue.",
      },
      {
        title: 'Spine width mismatch between cover PDF and page count',
        description: "The spine width of the cover PDF must precisely match IngramSpark's calculation for your title's page count on your chosen paper stock. IngramSpark provides a cover template generator that outputs the exact spine width — but authors who design their cover early in the production process and revise the interior manuscript afterward end up with a cover built for the wrong page count. Even a difference of a few pages shifts the spine width enough to trigger a rejection, and Ingram cross-checks the submitted cover's spine dimensions against the interior page count on file.",
      },
      {
        title: 'Fonts not embedded in the interior PDF',
        description: "All fonts in the interior PDF must be fully embedded before submission. IngramSpark's print pipeline cannot substitute or download fonts at processing time — an unembedded font causes a processing failure that blocks both printing and wholesale distribution. This is most common in PDFs exported from word processors (Word, LibreOffice) without the embed-fonts option enabled, or from design software with subsetting settings that exclude some character ranges from the embedded font data.",
      },
      {
        title: 'ISBN barcode missing, misplaced, or not matching the registered ISBN',
        description: "IngramSpark requires the ISBN-13 barcode on the back cover of the printed book, placed in the lower right quadrant at 100% scale. The number in the barcode must exactly match the ISBN registered with IngramSpark for that title. Barcodes generated from a different ISBN, resized disproportionately, placed in a non-standard position, or printed at too small a scale for scanner readability are all rejected. Ingram also cross-references the barcode against the ISBN in their system — a cover with an ISBN registered to a different title or edition fails this cross-check.",
      },
      {
        title: 'Ebook distribution failures via the CoreSource pipeline',
        description: "IngramSpark distributes ebooks through CoreSource, which delivers to Apple Books, Kobo, Barnes & Noble, and other retail partners. A validation failure that IngramSpark's own intake passes can still cause a rejection at the CoreSource or destination-platform level, reported back through IngramSpark's dashboard with limited diagnostic detail. Apple Books' EPUBCheck strictness, Kobo's KEPUB conversion requirements, and retailer-specific metadata checks all apply to IngramSpark-distributed EPUBs — but the error message you receive from IngramSpark may not specify which downstream check failed or at which retailer.",
      },
    ],
    howToFix: "<ol><li>Use IngramSpark's cover template generator before starting your cover design — it outputs the exact spine width, bleed dimensions, and trim size for your page count and paper stock. Finalizing your interior page count before generating the template gives you the correct dimensions to design to.</li><li>Export your interior PDF with PDF/X-1a compliance. In Adobe InDesign: File → Export → PDF/X-1a:2001 preset. In Affinity Publisher: File → Export → PDF → PDF/X-1a. Microsoft Word does not support PDF/X-1a export — use a layout application or a PDF conversion service for your print interior.</li><li>Enable font embedding in your PDF export settings. In InDesign, font embedding is on by default. In Word, go to File → Options → Save → 'Embed fonts in the file' before exporting to PDF.</li><li>Generate your ISBN barcode from the ISBN registered with IngramSpark, at 100% scale, and place it in the lower right of the back cover within IngramSpark's safe zone. IngramSpark's own barcode generator or Bowker's barcode tool produce correctly formatted output.</li><li>For ebook distribution failures, run your EPUB through EPUBCheck before uploading and fix all Critical and Error-level issues. For Apple Books-specific failures reported through IngramSpark's dashboard, consult Apple Books' EPUB requirements directly — IngramSpark's error message may not name the specific downstream check that failed.</li></ol>",
    faq: [
      {
        q: 'Does IngramSpark accept the same EPUB format as KDP and Apple Books?',
        a: "IngramSpark accepts EPUB 2 and EPUB 3 for ebook distribution. The EPUB passes through IngramSpark's intake validation, then through the CoreSource pipeline to destination retailers. An EPUB that passes EPUBCheck should meet IngramSpark's ebook intake requirements, though destination-platform failures at Apple Books or Kobo may be reported back with limited diagnostic detail.",
      },
      {
        q: 'How do I calculate the correct spine width for my cover?',
        a: "Use IngramSpark's cover template generator, which calculates spine width from your exact page count and paper stock selection (white 60lb, white 80lb, cream 60lb, or color interior). Generate a fresh template after you finalize your page count — adding or removing pages changes the spine width calculation and invalidates an earlier template's dimensions.",
      },
      {
        q: "Is IngramSpark's content policy more or less restrictive than KDP's?",
        a: "IngramSpark's retail content policies are broadly comparable to KDP's for ebook distribution. For library channel distribution through OverDrive (which Ingram supplies), content is subject to OverDrive's additional standards — explicit sexual content that passes IngramSpark's retail channel may be filtered at the OverDrive library gate separately.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest' },
      { type: 'epub-error', slug: 'unique-identifier-not-found', label: 'Unique identifier not found (OPF-048)' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
      { type: 'mistake', slug: 'epub-formatting-mistakes', label: '10 EPUB formatting mistakes that cause rejection' },
      { type: 'alternative', slug: 'sigil-alternative', label: 'Sigil alternative for EPUB editing' },
    ],
  },
  {
    slug: 'overdrive',
    platform: 'OverDrive',
    metaTitle: 'Why OverDrive Rejects Ebooks — Library Distribution Requirements for Indie Authors',
    metaDescription: "OverDrive (Libby) distributes ebooks to public libraries worldwide. Getting into library catalogs requires ONIX metadata, no pre-applied DRM, an ISBN, and content that meets library standards — not just retail approval.",
    intro: "<p>There is no direct author submission path to OverDrive — every book in Libby's library catalogs reaches there through an aggregator (Draft2Digital, IngramSpark, PublishDrive) or a publisher account, not through a direct upload portal. What gets blocked isn't always the EPUB file itself: OverDrive rejections are more often caused by an incomplete ONIX metadata record from your aggregator, a pre-applied DRM that conflicts with OverDrive's own Adobe ADE licensing pipeline, or content that passes retail channel standards but falls outside library distribution requirements.</p>",
    topReasons: [
      {
        title: 'No direct author submission path',
        description: "OverDrive does not accept submissions from individual authors. Library catalog listing requires either an OverDrive publisher account (available to publishers with an established backlist; not designed for single-title indie authors) or distribution through an aggregator that has an OverDrive supply relationship — Draft2Digital, Smashwords, IngramSpark, PublishDrive, or StreetLib. Authors who expect a direct upload portal similar to KDP or Apple Books Connect will find no submission path. The aggregator handles ONIX delivery, DRM application, and the library account relationship on the author's behalf.",
      },
      {
        title: 'ONIX 3.0 metadata required for library catalog ingest',
        description: "OverDrive uses ONIX 3.0 records — not EPUB OPF metadata — to populate library catalog entries: the data that librarians review when acquiring titles and that patrons search when browsing Libby. When the ONIX record sent by your aggregator is incomplete — missing subject classifications, BISAC codes, audience codes, or territorial rights declarations — the title may be accepted by your aggregator but fail to ingest correctly into OverDrive's catalog, or appear only in limited library systems with reduced metadata. Fields that appear optional in your aggregator's metadata form are often required for full library catalog visibility.",
      },
      {
        title: "Pre-applied DRM conflicts with OverDrive's Adobe ADE licensing system",
        description: "OverDrive applies Adobe Digital Editions (ADE) DRM to every ebook it distributes to library systems. EPUBs that already have DRM applied — from a separate DRM provider, from a prior distribution arrangement, or from an author who applied their own file protection — cannot be processed by OverDrive's licensing pipeline, which expects a clean, DRM-free EPUB to wrap in ADE at ingest. Submit a DRM-free EPUB to your aggregator and let OverDrive apply its own DRM after ingest. This is not a content or quality rejection; it is a technical incompatibility between incoming DRM and OverDrive's own licensing system.",
      },
      {
        title: 'Library content standards block titles that passed retail channels',
        description: "Public library systems serve patrons of all ages and operate under community standards that differ from retail platforms. OverDrive applies content filtering beyond what D2D or IngramSpark require for retail distribution — explicit sexual content, graphic violence, and some dark fiction sub-genres are excluded from library catalog distribution even when the same title is available at retail. A title in D2D's Premium Catalog and distributed to Kobo and Apple Books may be separately blocked from OverDrive and Libby without notification from your aggregator unless you check your library channel distribution status explicitly in the dashboard.",
      },
      {
        title: 'ISBN required — no alternative identifier accepted for library catalogs',
        description: "Library catalog systems require an ISBN-13 for every listed title. Unlike KDP (which generates its own ASIN) or some retail platforms that accept a UUID-based identifier, OverDrive's catalog integration requires a valid ISBN in the ONIX record. Free ISBNs provided by aggregators (D2D, PublishDrive) are accepted, but the ISBN must be consistent across your ONIX record, your EPUB's OPF dc:identifier field, and your cover barcode. A mismatch between any of these causes catalog ingest failures that may not surface as an explicit error message in your aggregator dashboard.",
      },
    ],
    howToFix: "<ol><li>Choose an aggregator with an active OverDrive supply relationship and confirm library distribution is opted into for your title — Draft2Digital, IngramSpark, PublishDrive, and StreetLib all offer library channel distribution as a separate opt-in from retail distribution. Check your title's distribution settings explicitly; library opt-in is not automatic.</li><li>Complete every metadata field your aggregator's form offers, even optional ones. BISAC subject codes, audience age range, series information, and territorial rights declarations all contribute to the ONIX record OverDrive uses for library catalog ingest. An incomplete ONIX record results in reduced catalog visibility even when the title is technically accepted.</li><li>Submit a DRM-free EPUB to your aggregator. Do not apply your own DRM before submission — OverDrive applies Adobe ADE DRM after ingest, and an incoming DRM layer will cause a processing incompatibility.</li><li>Review your title's content against OverDrive's content guidelines before expecting library distribution. If your title contains content filtered by library standards, it will not receive library channel distribution regardless of retail approval status.</li><li>Ensure your ISBN-13 is present in content.opf as a dc:identifier element and matches the ISBN in your aggregator's title registration and on your cover barcode. All three must be consistent for correct catalog ingest.</li></ol>",
    faq: [
      {
        q: 'How do library patrons find and borrow my book?',
        a: "Patrons find your title in their public library's Libby app catalog. When a library system acquires your title through OverDrive, patrons place holds and borrow it for a fixed lending period, after which the digital copy expires automatically. You don't interact with patrons directly — the relationship is between the library and OverDrive, with your aggregator as the supply intermediary.",
      },
      {
        q: 'Do I get paid for library borrows?',
        a: "Yes — OverDrive pays a royalty per lending transaction, passed through your aggregator. The specific model (pay-per-borrow or metered access) and rate depend on how your aggregator has structured the OverDrive arrangement. D2D, IngramSpark, and PublishDrive each publish their library channel royalty terms in their help documentation.",
      },
      {
        q: "My book is on D2D and showing on retail channels — why isn't it appearing in library catalogs?",
        a: "Three common reasons: (1) library distribution was not opted into during D2D title setup — it is a separate distribution selection from retail and is not enabled by default; (2) your title's content category is filtered by OverDrive's library standards even though it passed D2D's retail distribution check; (3) your ONIX metadata record has incomplete subject classifications that prevent correct catalog ingest at OverDrive. Check your D2D distribution settings and ONIX metadata completeness before assuming a technical EPUB issue.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'epub-error', slug: 'unique-identifier-not-found', label: 'Unique identifier not found (OPF-048)' },
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'platform-rejection', slug: 'draft2digital', label: 'Why Draft2Digital rejects ebooks' },
      { type: 'platform-rejection', slug: 'smashwords', label: 'Why Smashwords rejects ebooks' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
    ],
  },
];

export function getRejectionBySlug(slug) {
  return PLATFORM_REJECTIONS.find(r => r.slug === slug) ?? null;
}
