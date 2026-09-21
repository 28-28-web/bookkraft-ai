export const MISTAKES = [
  {
    slug: 'epub-formatting-mistakes',
    metaTitle: '10 EPUB Formatting Mistakes That Get Books Rejected — BookKraft AI',
    metaDescription: "These 10 EPUB formatting mistakes are behind most platform rejections. Each one is common, often invisible in preview apps, and fixable before you upload — here's what to look for.",
    title: '10 EPUB Formatting Mistakes That Get Books Rejected',
    intro: '<p>Most EPUB rejections aren\'t caused by unusual edge cases — they\'re caused by the same ten mistakes, over and over, across thousands of submissions. These problems survive conversion tools, look fine in Calibre and reading app previews, and only surface as a rejection email or a reader complaint after the book is live. Each one below maps to a deeper guide where the full technical fix lives.</p>',
    mistakes: [
      {
        title: 'Using empty paragraph tags for spacing',
        description: "<p>Many authors add blank lines in their manuscript editor expecting them to become spacing in the final ebook. EPUB readers handle empty <code>&lt;p&gt;&lt;/p&gt;</code> tags inconsistently — what looks right in Calibre can render as random blank gaps on Kindle and Kobo devices. Paragraph spacing belongs in CSS <code>margin-bottom</code> on the paragraph style, not in blank lines in the manuscript text.</p>",
        link: { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing in e-reader previews — full guide' },
      },
      {
        title: 'Duplicate ID attributes across chapter files',
        description: "<p>Most EPUB converters build each chapter from the same structural template and copy heading and section IDs into every chapter file. EPUB requires every <code>id</code> attribute to be unique across the entire publication — duplicate IDs cause EPUBCheck errors and Apple Books rejections. The error is almost never visible in reading-app previews, which is why it makes it past authors who do preview their files.</p>",
        link: { type: 'epub-error', slug: 'duplicate-id-epub', label: 'Duplicate ID attribute errors — full guide' },
      },
      {
        title: 'Missing or broken NCX navigation table',
        description: "<p>The NCX file (toc.ncx) provides chapter-level navigation to reading systems and is required even when your converter claims to produce EPUB 3. When it's missing or references the wrong chapter anchors, KDP and Apple Books lose the ability to provide in-reader chapter navigation — and some distribution pipelines reject the file entirely on submission rather than listing it with broken navigation.</p>",
        link: { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table — full guide' },
      },
      {
        title: 'Cover image declared in the manifest without the cover-image property',
        description: "<p>EPUBCheck passes files where the cover image is listed in the manifest without <code>properties=\"cover-image\"</code>. Platforms don't. Amazon KDP and Apple Books use this property to identify which image to display as the storefront thumbnail. A missing property means your cover either doesn't appear in the store or appears as a blank gray box — even though the file itself uploaded without error.</p>",
        link: { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest — full guide' },
      },
      {
        title: 'Spine order that does not match reading order',
        description: "<p>The OPF spine controls the order chapter files are presented to reading systems. If the spine order diverges from the intended reading order — usually because chapters were reordered after export without updating the spine — the resulting ebook reads the wrong chapters in the wrong sequence. The cover and TOC look correct; the problem only appears when a reader navigates chapter-by-chapter.</p>",
        link: { type: 'epub-error', slug: 'broken-spine-order', label: 'Broken spine order errors — full guide' },
      },
      {
        title: 'Manifest entries pointing to files that no longer exist',
        description: "<p>Changing a chapter filename after the OPF manifest is generated leaves a manifest item pointing to a file that no longer exists. EPUBCheck flags this as RSC-007. It happens most often when chapters are reorganized after a first export, or when a converter generates chapter files with different names than it registers in the manifest. It's invisible on a quick look at the final EPUB but blocks Apple Books submission.</p>",
        link: { type: 'epub-error', slug: 'invalid-opf-manifest-reference', label: 'OPF manifest file reference errors — full guide' },
      },
      {
        title: 'Mixing EPUB 2 metadata attributes into an EPUB 3 file',
        description: "<p>Tools like older Calibre versions and some Word converters output EPUB 3 files with EPUB 2 metadata attributes (<code>opf:role</code>, <code>opf:file-as</code>) on metadata elements that no longer support them. The file declares EPUB 3, EPUBCheck validates against EPUB 3 rules, and the mismatch throws RSC-005 errors — errors that weren't present in the original EPUB 2 source the author shipped fine from in a previous edition.</p>",
        link: { type: 'epub-error', slug: 'opf-role-attribute-not-allowed', label: 'opf:role attribute not allowed (RSC-005) — full guide' },
      },
      {
        title: 'Literal ampersands in XHTML chapter files',
        description: "<p>EPUB chapter files are XHTML, not HTML — the <code>&amp;</code> character must be written as <code>&amp;amp;</code> in all contexts. A literal <code>&amp;</code> in a title, heading, or book description embedded in XHTML causes a parse failure at the XML level. This is one of the most common errors in files converted from DOCX, where ampersands appear naturally in text and converters don't always escape them correctly.</p>",
        link: { type: 'epub-error', slug: 'unescaped-ampersand-xhtml', label: 'Unescaped ampersand in XHTML — full guide' },
      },
      {
        title: 'Void elements left unclosed in XHTML',
        description: "<p>XHTML requires all elements to be explicitly closed. Void elements like <code>&lt;img&gt;</code> and <code>&lt;br&gt;</code> need a self-closing slash (<code>&lt;img /&gt;</code>, <code>&lt;br /&gt;</code>). HTML5 allows these to be left open, so files hand-edited with web development habits — or pasted from blog HTML — frequently fail XHTML validation in ways that EPUBCheck catches but browser-based preview tools don't surface.</p>",
        link: { type: 'epub-error', slug: 'malformed-xhtml-unclosed-tag', label: 'Malformed XHTML unclosed tags — full guide' },
      },
      {
        title: 'Unique identifier cross-reference broken in OPF',
        description: "<p>Every EPUB requires a <code>dc:identifier</code> element, and the OPF <code>&lt;package&gt;</code> element's <code>unique-identifier</code> attribute must point to that element's id by name. When they don't match — usually because a template was edited or an identifier element was moved — EPUBCheck throws OPF-048. Apple Books rejects the file outright; KDP accepts it but may show metadata warnings in the dashboard.</p>",
        link: { type: 'epub-error', slug: 'unique-identifier-not-found', label: 'Unique identifier not found (OPF-048) — full guide' },
      },
    ],
    faq: [
      {
        q: 'Do all of these mistakes get caught by EPUBCheck?',
        a: "Most do, but not all. EPUBCheck catches structural and metadata errors (items 2–10), but won't flag ghost spacing (item 1) because empty paragraph tags are technically valid XHTML — they're a rendering quality problem, not a spec violation. Running EPUBCheck removes most of the list; previewing on actual e-reader apps catches the remainder.",
      },
      {
        q: 'Which of these are most likely to cause outright rejection vs. just a bad reader experience?',
        a: "Items 3 (missing NCX), 4 (cover property missing), 8 (unescaped ampersand), 9 (unclosed tags), and 10 (broken unique identifier) are the ones most likely to block submission entirely. Items 1 (ghost spacing), 5 (spine order), and 6 (dangling manifest references) more often produce a poor reader experience without hard-blocking upload.",
      },
      {
        q: 'Should I fix all of these before submitting even if I am only uploading to one platform?',
        a: "Yes — the structural errors here (items 2–10) are EPUBCheck-flagged issues that every major platform checks on submission. Fixing them once produces a clean file that uploads to KDP, Apple Books, Kobo, and Draft2Digital without platform-specific rework.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing in e-reader previews' },
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
    ],
  },
  {
    slug: 'kdp-formatting-mistakes',
    metaTitle: '7 KDP Formatting Mistakes Indie Authors Make — BookKraft AI',
    metaDescription: "KDP processes hundreds of thousands of ebook uploads. These 7 mistakes are the ones that get through initial validation and only surface as a rejection, a processing failure, or a reader complaint.",
    title: '7 KDP Formatting Mistakes Indie Authors Make',
    intro: "<p>KDP's upload flow is frictionless enough that many formatting problems never announce themselves until after the book is live. These seven mistakes are the ones that get through the initial processing pipeline and show up later — as a book with no store cover, a Kindle navigation menu that jumps to the wrong chapter, or a reader review mentioning that chapter three appeared twice. Each is preventable before you hit Publish.</p>",
    mistakes: [
      {
        title: 'Letting the Kindle TOC navigation get out of sync with chapter files',
        description: "<p>Authors who reorder chapters after first export often update the in-text table of contents but leave the NCX navPoints pointing to the original chapter sequence. Kindle devices use the NCX to power the in-reader \"Go To → Table of Contents\" menu. When navPoints reference the wrong anchors, readers navigate to the wrong place — and KDP's content review sometimes catches the mismatch before the book goes live, triggering a rejection with a non-obvious error message.</p>",
        link: { type: 'epub-error', slug: 'toc-ncx-navpoint-mismatch', label: 'NCX navPoint mismatch — full guide' },
      },
      {
        title: 'Cover image uploaded without the cover-image manifest declaration',
        description: "<p>Every author knows the cover matters for conversion rates. Fewer know that the cover image file also needs <code>properties=\"cover-image\"</code> in the OPF manifest entry for KDP to identify it as the storefront thumbnail. An EPUB with a beautiful cover but a missing manifest property uploads successfully — and the book appears with no cover image in both the KDP dashboard and the store listing, with no upload error to indicate why.</p>",
        link: { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image manifest property — full guide' },
      },
      {
        title: 'Spine order that disagrees with the book\'s actual reading sequence',
        description: "<p>This one trips up authors who reorganize chapters after the initial EPUB export. The OPF spine is the authoritative reading order for Kindle devices, and a spine that doesn't match the actual chapter sequence produces an ebook where hitting \"next chapter\" lands in the wrong place. The cover, TOC, and individual chapters all look correct when opened directly — the problem only appears when reading sequentially.</p>",
        link: { type: 'epub-error', slug: 'broken-spine-order', label: 'Broken spine order errors — full guide' },
      },
      {
        title: 'Filling keyword slots with single words instead of reader search phrases',
        description: "<p>KDP gives each title seven keyword slots. Authors who fill them with single words — \"mystery,\" \"thriller,\" \"romance\" — are competing against every title in those broad terms with no qualifier to match reader intent. The same slots filled with three-to-five-word search phrases — \"cozy mystery small town amateur sleuth\" — match how readers actually search and surface the book in a much narrower, more relevant set of results. Same KDP account, same upload, entirely different discoverability outcome.</p>",
        link: { type: 'platform-rejection', slug: 'amazon-kdp', label: 'KDP submission requirements — full guide' },
      },
      {
        title: 'Submitting without a Kindle Previewer check',
        description: "<p>KDP converts your EPUB to Kindle Format internally before distributing to Kindle devices. That conversion sometimes produces different output than what you see in Calibre, Adobe Digital Editions, or the KDP online previewer. The Kindle Previewer desktop app downloads the KFX output KDP will actually deliver — not a simulation of it. Running through Previewer is the only step that catches rendering issues specific to the Kindle conversion pipeline before your readers do.</p>",
        link: { type: 'checklist', slug: 'kdp-pre-launch-checklist', label: 'KDP pre-launch checklist — Previewer step' },
      },
      {
        title: 'Enrolling in KDP Select while still listed on Draft2Digital or Smashwords',
        description: "<p>KDP Select requires 90-day exclusivity to Amazon for ebook distribution. Authors who enroll in KDP Select but leave the same title active on Draft2Digital or Smashwords are in violation of the Select agreement from day one. Amazon periodically checks for active listings elsewhere and can terminate the KDP Select enrollment, remove the title's Select benefits retroactively, or in repeat cases take action on the broader account.</p>",
        link: { type: 'platform-rejection', slug: 'amazon-kdp', label: 'KDP submission requirements — full guide' },
      },
      {
        title: 'Ghost spacing from blank lines in Word or Scrivener exports',
        description: "<p>The most consistent EPUB structural issue in KDP submissions is ghost spacing: empty <code>&lt;p&gt;&lt;/p&gt;</code> tags that survive the DOCX-to-EPUB conversion from Word or Scrivener. On Kindle devices, these render as inconsistent gaps between paragraphs that weren't in the original manuscript. KDP's auto-conversion process doesn't strip empty paragraph tags — what goes in comes out, rendered differently on every Kindle model.</p>",
        link: { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing fix — full guide' },
      },
    ],
    faq: [
      {
        q: 'Will any of these mistakes cause KDP to reject my file outright?',
        a: "Items 2 (missing cover property) and 3 (broken spine order) are most likely to produce an error during KDP's processing pipeline. Items 1 and 7 (NCX mismatch, ghost spacing) usually let the file through but produce a poor reader experience. Items 4 and 6 (keywords, KDP Select conflict) don't trigger upload rejection but affect discoverability or account standing in ways that show up later.",
      },
      {
        q: "Does KDP have a stricter validator than EPUBCheck?",
        a: "KDP's validation is generally more lenient than Apple Books' — it accepts some files with EPUBCheck errors that Apple Books rejects. But KDP runs its own Kindle conversion on upload, which can surface issues EPUBCheck doesn't flag, particularly around NCX structure and spine order. A file that passes EPUBCheck can still produce a broken Kindle navigation experience.",
      },
      {
        q: "What's the fastest pre-upload check for KDP?",
        a: "Two steps: validate with EPUBCheck via BookKraft's free EPUB Validator to catch structural errors, then preview the converted file in the Kindle Previewer desktop app to catch rendering issues that survive validation. Both take under 10 minutes and between them catch the vast majority of KDP-specific problems before submission.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
      { type: 'checklist', slug: 'kdp-pre-launch-checklist', label: 'KDP pre-launch checklist' },
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing in e-reader previews' },
      { type: 'epub-error', slug: 'toc-ncx-navpoint-mismatch', label: 'NCX navPoint mismatch errors' },
    ],
  },
  {
    slug: 'word-scrivener-export-mistakes',
    metaTitle: '7 Formatting Mistakes Word and Scrivener Authors Make Before Converting to EPUB — BookKraft AI',
    metaDescription: "Most EPUB errors aren't created in the EPUB — they're created in the manuscript source and survive conversion intact. These 7 Word and Scrivener habits produce predictable problems downstream.",
    title: '7 Formatting Mistakes Word and Scrivener Authors Make Before Converting to EPUB',
    intro: '<p>Most EPUB errors aren\'t created in the EPUB — they\'re created in the manuscript source and survive the conversion process intact. Authors working in Microsoft Word or Scrivener bring a set of document habits that reliably produce the same downstream problems. Fixing them in the EPUB after export is possible but slower than removing them from the source before you convert. These are the seven that appear most consistently in Word-to-EPUB and Scrivener-to-EPUB conversion outputs.</p>',
    mistakes: [
      {
        title: 'Spacing paragraphs and sections with blank lines instead of paragraph styles',
        description: "<p>In Word and Scrivener, pressing Enter twice to add a visual gap between sections produces blank paragraphs in the document. When exported to EPUB, those blank lines become empty <code>&lt;p&gt;&lt;/p&gt;</code> tags that render inconsistently across e-reader devices — some show no gap, others show a large blank space that wasn't in the original manuscript. Paragraph and section spacing belongs in CSS <code>margin-bottom</code> on a defined paragraph style, applied at export time, not in blank lines inside the manuscript text.</p>",
        link: { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing from empty tags — full guide' },
      },
      {
        title: 'Scrivener chapter templates that copy duplicate ID attributes into every chapter',
        description: "<p>Scrivener's compile system uses a structural template for each chapter, then copies that template for every section. If the template contains <code>id</code> attributes on heading or structural elements, Scrivener copies those IDs into every chapter — producing duplicate IDs across the whole EPUB. The compile preview looks correct, Scrivener's own export validation passes, and EPUBCheck catches it as OPF-030 on the first platform submission.</p>",
        link: { type: 'epub-error', slug: 'duplicate-id-epub', label: 'Duplicate ID attribute errors — full guide' },
      },
      {
        title: 'Pasting charts or diagrams from Excel or PowerPoint into Word',
        description: "<p>When you paste a chart from Excel or a diagram from PowerPoint into a Word document, it embeds as an EMF (Enhanced Metafile) vector image internally — a Windows-only format that web standards and EPUB don't recognize. EPUB converters either skip EMF images silently or flag a validation error requiring a fallback. Re-saving the chart as a PNG before pasting into Word prevents this from reaching the EPUB at all.</p>",
        link: { type: 'epub-error', slug: 'emf-image-fallback', label: 'EMF image fallback errors — full guide' },
      },
      {
        title: 'Embedding commercially licensed fonts from Word or Scrivener',
        description: "<p>Adding a custom font in Word or Scrivener and exporting to EPUB embeds the font file in the EPUB package. Most commercial fonts — including many default Windows fonts like Cambria and Calibri — prohibit redistribution in embedded files. The converter includes the font because it's in the document; EPUBCheck flags it because the font's license doesn't allow embedding in a distributed file. Switching to a free, embedding-permitted font (any Google Font) before export prevents this class of error entirely.</p>",
        link: { type: 'epub-error', slug: 'font-link-validation', label: 'Font embedding license errors — full guide' },
      },
      {
        title: 'Leaving Scrivener\'s compile output set to EPUB 2 for EPUB 3 distribution',
        description: "<p>Scrivener's compile settings include an EPUB version toggle that defaults to EPUB 2 in older project templates. Authors who leave it on EPUB 2 and submit to platforms running EPUB 3 validation see <code>opf:role</code> attribute errors — an EPUB 2 metadata format that EPUBCheck 5.x flags as invalid in files declaring EPUB 3. Switching the Scrivener compile target to EPUB 3 removes this entire class of error, and Scrivener's EPUB 3 output is generally cleaner for current platform requirements.</p>",
        link: { type: 'epub-error', slug: 'opf-role-attribute-not-allowed', label: 'opf:role attribute errors — full guide' },
      },
      {
        title: 'Renaming exported EPUB chapter files without updating the OPF manifest',
        description: "<p>Authors who rename their exported EPUB's chapter files for organization — \"chapter-01.xhtml\" to \"part-1-opening.xhtml\" — without updating the OPF manifest leave dangling references. The manifest declares the original filename; the file now has a different name; EPUBCheck reports RSC-007. If you need to rename files inside your EPUB package, update the OPF manifest item's <code>href</code> to match the new filename before repackaging.</p>",
        link: { type: 'epub-error', slug: 'invalid-opf-manifest-reference', label: 'OPF manifest reference errors — full guide' },
      },
      {
        title: 'Uploading the exported EPUB to a platform without any validation step',
        description: "<p>Word and Scrivener both produce EPUB output that looks correct in their own preview panes. Neither tool runs EPUBCheck before export, and neither one tells you whether the resulting file will pass Apple Books Connect's ingestion, Kobo Writing Life's KEPUB conversion, or KDP's manifest checks. The gap between \"looks right in Scrivener's compile preview\" and \"passes platform validation\" is where most export-workflow rejections originate. Running the exported EPUB through EPUBCheck before submitting to any platform catches the structural issues that source-tool previews don't surface.</p>",
        link: { type: 'alternative', slug: 'scrivener-alternative', label: "Scrivener EPUB output — what BookKraft fixes" },
      },
    ],
    faq: [
      {
        q: 'Do these mistakes apply to both Word and Scrivener, or just one of them?',
        a: "Both, but differently. Items 1 (blank-line spacing), 3 (pasted EMF images), and 4 (embedded commercial fonts) are primarily Word habits that survive DOCX-to-EPUB conversion. Items 2 (duplicate IDs from chapter template) and 5 (EPUB 2 vs. EPUB 3 compile setting) are Scrivener-specific. Items 6 and 7 apply to any export workflow where the EPUB is handled or submitted without validation.",
      },
      {
        q: 'Should I fix these in Word or Scrivener, or correct them in the EPUB after export?',
        a: "Items 1, 3, and 4 are most efficiently fixed in the source document before export — correcting empty paragraph spacing, EMF images, or font embedding in the EPUB requires editing XHTML directly. Items 2 and 5 are fixed in Scrivener's compile settings, not in the EPUB itself. Item 6 is fixed after export in the EPUB file structure. Item 7 is resolved by adding a validation step — there's nothing to fix in the source, only a step missing from the workflow.",
      },
      {
        q: 'Does running EPUBCheck catch all of these mistakes?',
        a: "Items 2, 5, and 6 — yes: EPUBCheck flags duplicate IDs (OPF-030), opf:role misuse (RSC-005), and dangling manifest references (RSC-007). Items 3 and 4 — yes: EPUBCheck flags missing EMF fallbacks and font embedding issues. Item 1 (ghost spacing) — no: empty paragraph tags are technically valid XHTML, so EPUBCheck passes them. Item 7 is the validation step itself, not something EPUBCheck catches.",
      },
    ],
    relatedTool: 'epub-validator',
    related: [
      { type: 'alternative', slug: 'scrivener-alternative', label: 'Scrivener alternative for ebook production' },
      { type: 'epub-error', slug: 'ghost-spacing-epub', label: 'Ghost spacing from empty paragraph tags' },
      { type: 'epub-error', slug: 'duplicate-id-epub', label: 'Duplicate ID attribute errors' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
    ],
  },
  {
    slug: 'book-metadata-mistakes',
    metaTitle: '6 Book Metadata Mistakes That Hurt Discoverability — BookKraft AI',
    metaDescription: 'Metadata is how readers and stores find your book. These 6 metadata mistakes — mismatched titles, empty identifier fields, and weak keywords — quietly cost sales and cause rejections.',
    title: '6 Book Metadata Mistakes That Hurt Discoverability',
    intro: "<p>Metadata is the invisible layer that tells stores and readers what your book is and who it's for. When it's wrong, the book either fails to upload, displays incorrectly, or never surfaces in the searches its readers actually run. These six metadata mistakes are the ones that quietly cost authors sales and, in some cases, trigger outright rejection.</p>",
    mistakes: [
      {
        title: 'Cover title and metadata title that do not match',
        description: "<p>KDP compares the title printed on your cover with the title typed into the publishing form. A missing subtitle word or a different word order is enough for KDP to hold the book during review. The two must match exactly, word for word, including series name and edition.</p>",
        link: { type: 'platform-rejection', slug: 'amazon-kdp', label: 'KDP submission requirements — full guide' },
      },
      {
        title: 'Empty or invalid dc:identifier',
        description: "<p>Every EPUB needs a unique identifier in the <code>dc:identifier</code> field — a valid ISBN-13 or a UUID. When it is empty, or the package's unique-identifier attribute points at the wrong id, EPUBCheck throws OPF-048 and Apple Books rejects the file. A UUID is perfectly valid if you don't have an ISBN.</p>",
        link: { type: 'epub-error', slug: 'unique-identifier-not-found', label: 'Unique identifier not found (OPF-048) — full guide' },
      },
      {
        title: 'Missing dc:language or an invalid language code',
        description: "<p>The <code>dc:language</code> field must contain a valid BCP 47 code such as <code>en</code> or <code>en-US</code>. A missing or malformed language tag causes validation warnings and can affect how stores categorize and display the book in regional storefronts.</p>",
        link: { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB metadata checklist items' },
      },
      {
        title: 'Filling keyword slots with single broad words',
        description: "<p>KDP gives seven keyword slots. Filling them with single words like \"mystery\" or \"romance\" puts the book in competition with every title in those terms. Long-tail phrases of three to five words match how readers actually search and place the book in a narrower, more relevant result set.</p>",
        link: { type: 'platform-rejection', slug: 'amazon-kdp', label: 'KDP keyword and category requirements' },
      },
      {
        title: 'Cover image not declared as the cover in the manifest',
        description: "<p>An embedded cover that lacks <code>properties=\"cover-image\"</code> in the OPF manifest uploads without error but appears as a gray box on the store page. The platform can't identify which image is the cover unless the manifest says so.</p>",
        link: { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest — full guide' },
      },
    ],
    faq: [
      {
        q: 'Do I need an ISBN to publish an ebook on KDP?',
        a: 'No. KDP assigns a free ASIN to every Kindle ebook, and a UUID satisfies the EPUB spec\'s identifier requirement. An ISBN is only required for print books on some distribution channels. Use a UUID as urn:uuid: in dc:identifier if you don\'t have an ISBN.',
      },
      {
        q: 'Why does my book not appear when I search its title on Amazon?',
        a: 'New titles can take 24–72 hours to be indexed for search after going live. If the book still doesn\'t appear after that, check that the title metadata matches the cover, the categories are set, and the keywords reflect terms readers actually use.',
      },
      {
        q: 'Can I change my metadata after publishing?',
        a: 'Yes. Title, description, keywords, and categories can be edited in the KDP dashboard after publication, and changes typically propagate within a few hours. The cover title, however, must always continue to match the metadata title.',
      },
    ],
    related: [
      { type: 'epub-error', slug: 'unique-identifier-not-found', label: 'Unique identifier not found (OPF-048)' },
      { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest' },
      { type: 'checklist', slug: 'kdp-pre-launch-checklist', label: 'KDP pre-launch checklist' },
      { type: 'mistake', slug: 'kdp-formatting-mistakes', label: '7 KDP formatting mistakes indie authors make' },
    ],
  },
  {
    slug: 'kindle-toc-mistakes',
    metaTitle: '5 Kindle Table of Contents Mistakes That Break Navigation — BookKraft AI',
    metaDescription: 'A broken Kindle TOC gets books flagged at upload and frustrates readers. These 5 table of contents mistakes — hand-styled headings, stale NCX, page-number links — are the usual causes.',
    title: '5 Kindle Table of Contents Mistakes That Break Navigation',
    intro: "<p>A Kindle book has two tables of contents: the inline page readers see near the front, and the navigation TOC the device uses for its Go To menu. When either breaks, KDP can flag the file at upload and readers land in the wrong chapter. These five mistakes account for nearly every broken Kindle TOC.</p>",
    mistakes: [
      {
        title: 'Chapter titles styled by hand instead of as headings',
        description: "<p>Making a chapter title large and bold doesn't make it a heading. Kindle builds its navigation from real Heading 1 styles, not from text that merely looks like a heading. Without proper heading styles, the device has nothing to build a TOC from.</p>",
        link: { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table — full guide' },
      },
      {
        title: 'NCX navPoints out of sync with chapter files',
        description: "<p>Reordering chapters after export without regenerating the NCX leaves navPoints pointing at the old sequence. The Go To menu then jumps readers to the wrong place, and KDP's review sometimes rejects the mismatch.</p>",
        link: { type: 'epub-error', slug: 'toc-ncx-navpoint-mismatch', label: 'NCX navPoint mismatch — full guide' },
      },
      {
        title: 'Inline TOC links pointing at page numbers',
        description: "<p>Reflowable Kindle books have no fixed pages. An inline contents page that links to page numbers instead of chapter bookmarks does nothing when tapped. Every entry must link to a heading anchor.</p>",
        link: { type: 'checklist', slug: 'epub-formatting-checklist', label: 'Structure & navigation checklist items' },
      },
      {
        title: 'Duplicate heading ids across chapter files',
        description: "<p>EPUB requires every id attribute to be unique across the whole book. When a converter copies the same heading id into every chapter, navigation links collide and resolve to the wrong target — and EPUBCheck flags the duplicates.</p>",
        link: { type: 'epub-error', slug: 'duplicate-id-epub', label: 'Duplicate ID attribute errors — full guide' },
      },
      {
        title: 'No nav.xhtml in an EPUB 3 file',
        description: "<p>EPUB 3 files need a nav.xhtml document with a valid <code>&lt;nav epub:type=\"toc\"&gt;</code> element in addition to the NCX. Files that declare EPUB 3 but omit the nav document fail validation and can lose in-reader navigation.</p>",
        link: { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Navigation document requirements — full guide' },
      },
    ],
    faq: [
      {
        q: 'Why does KDP say "No TOC Found" when my book has a contents page?',
        a: 'A visible contents page is the inline TOC. KDP\'s warning is about the navigation TOC — the NCX or nav.xhtml the device uses. You can have a perfect-looking contents page and still trigger the warning if the navigation file is missing or built from hand-styled headings rather than real Heading 1 styles.',
      },
      {
        q: 'Do I need both an NCX and a nav.xhtml?',
        a: 'For maximum compatibility, yes. EPUB 3 uses nav.xhtml, but including an NCX keeps older reading systems working. Most modern conversion tools generate both automatically when your headings are correctly styled.',
      },
      {
        q: 'How do I test that my TOC works before uploading?',
        a: 'Open the file in Kindle Previewer, tap Go To, and confirm every chapter jumps to the right place. Then tap each entry on the inline contents page. Running the file through an EPUB validator first clears duplicate ids and broken anchors that would break navigation.',
      },
    ],
    related: [
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'epub-error', slug: 'toc-ncx-navpoint-mismatch', label: 'NCX navPoint mismatch' },
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
      { type: 'mistake', slug: 'epub-formatting-mistakes', label: '10 EPUB formatting mistakes that cause rejection' },
    ],
  },
  {
    slug: 'ebook-cover-mistakes',
    metaTitle: '5 Ebook Cover Mistakes That Get Files Rejected — BookKraft AI',
    metaDescription: 'CMYK color, below-minimum dimensions, and missing manifest properties are the ebook cover mistakes that cause rejection or a gray placeholder on the store page. Here is how to avoid each.',
    title: '5 Ebook Cover Mistakes That Get Files Rejected',
    intro: "<p>A cover can be beautifully designed and still fail technical validation. Ebook cover problems are almost always about color mode, dimensions, or how the image is declared inside the file — not about the artwork. These five mistakes cause most cover rejections and gray-box store listings.</p>",
    mistakes: [
      {
        title: 'Using a CMYK print cover for the ebook',
        description: "<p>Print covers are built in CMYK at 300 DPI. Ebook platforms expect RGB and reject CMYK images — KDP's processor and Apple Books both fail on it. Export a separate RGB JPEG for the ebook rather than reusing the print file.</p>",
        link: { type: 'platform-rejection', slug: 'apple-books', label: 'Why Apple Books rejects ebooks — full guide' },
      },
      {
        title: 'Cover below the minimum dimensions',
        description: "<p>The old 500px minimum is outdated. KDP now requires at least 625×1000px, and Apple Books requires 1400×2100px. A cover sized for one store can fail another. Work at 1600×2560px to satisfy every major platform.</p>",
        link: { type: 'checklist', slug: 'epub-formatting-checklist', label: 'Cover & images checklist items' },
      },
      {
        title: 'Wrong aspect ratio',
        description: "<p>A square or landscape cover gets stretched or letterboxed by a store's display templates. Ebook covers use a 1.6:1 height-to-width ratio (2:3 shape). Start from a canvas with that ratio so the cover fills the frame without distortion.</p>",
        link: { type: 'platform-rejection', slug: 'amazon-kdp', label: 'KDP cover requirements — full guide' },
      },
      {
        title: 'Cover image not declared with the cover-image property',
        description: "<p>An embedded cover missing <code>properties=\"cover-image\"</code> in the OPF manifest uploads cleanly but appears as a gray box on the product page. The platform can't identify the cover without the manifest declaration.</p>",
        link: { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest — full guide' },
      },
      {
        title: 'Missing sRGB color profile',
        description: "<p>Apple Books validates color profiles at the byte level. Saving as RGB is not the same as embedding an sRGB profile — export explicitly with sRGB IEC 61966-2.1, or the file can be rejected even though it looks correct on screen.</p>",
        link: { type: 'platform-rejection', slug: 'apple-books', label: 'Apple Books cover validation — full guide' },
      },
    ],
    faq: [
      {
        q: 'Can I use the same cover for KDP and Apple Books?',
        a: 'Only if it already meets Apple\'s stricter requirements: at least 1400×2100px in RGB with an sRGB profile. A cover that passes KDP\'s 625×1000px minimum may fail Apple Books. Export once at 1600×2560px in sRGB and it works for both.',
      },
      {
        q: 'My cover looks fine in Previewer but shows as gray on the product page — why?',
        a: 'The image is embedded in the EPUB but not declared with properties="cover-image" in the OPF manifest. The file is physically present; the platform just can\'t identify it as the cover. Regenerate the EPUB with the cover correctly flagged.',
      },
      {
        q: 'Does DPI matter for an ebook cover?',
        a: 'No. DPI is a print concept with no meaning for screen images. What matters is the pixel dimension. A 1600×2560px image at 72 DPI contains exactly the same data as one at 300 DPI.',
      },
    ],
    related: [
      { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest' },
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
      { type: 'platform-rejection', slug: 'apple-books', label: 'Why Apple Books rejects ebooks' },
      { type: 'mistake', slug: 'kdp-formatting-mistakes', label: '7 KDP formatting mistakes indie authors make' },
    ],
  },
  {
    slug: 'print-formatting-mistakes',
    metaTitle: '5 Print Book Formatting Mistakes That Get Covers Rejected — BookKraft AI',
    metaDescription: 'Print book formatting is not ebook formatting. These 5 mistakes — RGB PDFs, wrong spine width, missing bleed, subsetted fonts — cause IngramSpark and KDP Print preflight failures.',
    title: '5 Print Book Formatting Mistakes That Get Covers Rejected',
    intro: "<p>Print formatting follows completely different rules from ebooks. A file that publishes fine as a Kindle book will fail print preflight, because print needs fixed pages, CMYK color, bleed, and a spine width calculated to the millimeter. These five mistakes cause most print cover and interior rejections.</p>",
    mistakes: [
      {
        title: 'Submitting an RGB or standard PDF',
        description: "<p>IngramSpark requires PDF/X-1a in CMYK; a standard RGB PDF fails preflight. Convert all colors to CMYK and export specifically as PDF/X-1a, not a general-purpose PDF, before submitting a print cover or interior.</p>",
        link: { type: 'platform-rejection', slug: 'ingram-spark', label: 'Why IngramSpark rejects books — full guide' },
      },
      {
        title: 'Incorrect spine width',
        description: "<p>Spine width is calculated from page count and paper stock. Adding or removing pages after generating the template changes the spine, and a stale width causes a hard rejection. Regenerate the cover template with your final page count.</p>",
        link: { type: 'checklist', slug: 'kdp-pre-launch-checklist', label: 'Print preparation checklist items' },
      },
      {
        title: 'Missing bleed on a full-wrap cover',
        description: "<p>Print covers need 0.125 inch of bleed on every outer edge so trimming doesn't leave a white sliver. A cover built to exact trim size with no bleed will be rejected or printed with visible edges.</p>",
        link: { type: 'platform-rejection', slug: 'ingram-spark', label: 'IngramSpark cover requirements — full guide' },
      },
      {
        title: 'Fonts subsetted instead of fully embedded',
        description: "<p>PDF/X-1a requires all fonts fully embedded, not subsetted. Subsetting embeds only the characters used, which is fine for screen PDFs but rejected by print preflight. Set font embedding to embed all in your export settings.</p>",
        link: { type: 'checklist', slug: 'kdp-pre-launch-checklist', label: 'File preparation checklist items' },
      },
      {
        title: 'Reusing the ebook cover as a print cover',
        description: "<p>An ebook cover is a single RGB image of the front only. A print cover is a full-wrap CMYK PDF containing back cover, spine, and front with bleed and a barcode area. They are different deliverables and can't be swapped.</p>",
        link: { type: 'platform-rejection', slug: 'ingram-spark', label: 'IngramSpark print cover specs — full guide' },
      },
    ],
    faq: [
      {
        q: 'Can I use a Canva PDF for my IngramSpark print cover?',
        a: 'Only if it exports as PDF/X-1a with CMYK colors and fully embedded fonts. Most online tools export standard RGB PDFs, which fail preflight. Use a tool with a PDF/X-1a export option, or convert the file before submitting.',
      },
      {
        q: 'How do I calculate my spine width?',
        a: 'Use the print platform\'s cover template generator. Enter trim size, final page count, and paper stock, and it produces a template with the correct spine position marked. Download a fresh template any time the page count changes.',
      },
      {
        q: 'Does KDP Print use the same requirements as IngramSpark?',
        a: 'They are similar but not identical. Both need CMYK, bleed, and a correctly calculated spine, but KDP Print is more forgiving about PDF flavor while IngramSpark strictly requires PDF/X-1a. Prepare to IngramSpark\'s stricter standard and the file will also pass KDP Print.',
      },
    ],
    related: [
      { type: 'cover-requirement', slug: 'ingramspark-print', label: 'IngramSpark print book cover requirements' },
      { type: 'platform-rejection', slug: 'ingram-spark', label: 'Why IngramSpark rejects books' },
      { type: 'checklist', slug: 'kdp-pre-launch-checklist', label: 'KDP pre-launch checklist' },
      { type: 'mistake', slug: 'ebook-cover-mistakes', label: '5 ebook cover mistakes that get files rejected' },
    ],
  },
  {
    slug: 'ebook-accessibility-mistakes',
    metaTitle: '5 Ebook Accessibility Mistakes to Avoid — BookKraft AI',
    metaDescription: 'EU accessibility rules for ebooks took effect in 2025 and KDP now asks about it. These 5 accessibility mistakes — missing alt text, no language tag, image-only text — are the ones to fix.',
    title: '5 Ebook Accessibility Mistakes to Avoid',
    intro: "<p>Accessibility is no longer optional. The European Accessibility Act's requirements for ebooks took effect in June 2025, and KDP now asks whether your images are accessible when you publish. Beyond compliance, accessible formatting means more readers can actually use your book. These five mistakes are the most common — and the most fixable.</p>",
    mistakes: [
      {
        title: 'Images with no alt text',
        description: "<p>Screen readers speak alt text aloud for readers who can't see an image. An informative image with no alt text is invisible to those readers, and stores increasingly flag it. Write one clear sentence describing what each meaningful image conveys.</p>",
        link: { type: 'checklist', slug: 'epub-formatting-checklist', label: 'Cover & images checklist items' },
      },
      {
        title: 'Decorative images without an empty alt attribute',
        description: "<p>Purely decorative images should have an empty alt (<code>alt=\"\"</code>) so screen readers skip them. Leaving the attribute off entirely makes assistive tools announce the filename instead, which is noise for the reader.</p>",
        link: { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'EPUB structure requirements — full guide' },
      },
      {
        title: 'Text baked into images',
        description: "<p>Chapter headings or quotes saved as image files can't be resized, searched, selected, or read aloud. Keep text as real text and use CSS for styling, so it remains accessible and reflowable on every device.</p>",
        link: { type: 'mistake', slug: 'epub-formatting-mistakes', label: 'EPUB formatting mistakes — full guide' },
      },
      {
        title: 'Missing or wrong language declaration',
        description: "<p>The <code>dc:language</code> field and the <code>lang</code> attribute tell screen readers which pronunciation rules to use. A missing or incorrect language tag makes assistive technology mispronounce the entire book.</p>",
        link: { type: 'checklist', slug: 'epub-formatting-checklist', label: 'Metadata checklist items' },
      },
      {
        title: 'Heading levels used for visual size, not structure',
        description: "<p>Screen reader users navigate by heading level. Skipping from Heading 1 to Heading 4 for a bigger look, or using headings for non-heading text, breaks that navigation. Use heading levels to reflect real document structure and style them with CSS.</p>",
        link: { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Navigation and structure — full guide' },
      },
    ],
    faq: [
      {
        q: 'Do I legally have to make my ebook accessible?',
        a: 'If you sell to readers in the European Union, the European Accessibility Act\'s ebook requirements apply as of June 2025. Even where it is not legally required, KDP asks about image accessibility at publication, and accessible formatting expands your potential readership.',
      },
      {
        q: 'What is the difference between decorative and informative images for alt text?',
        a: 'An informative image conveys content the reader needs — a chart, a diagram, a photo that carries meaning — and needs descriptive alt text. A decorative image is purely visual, like a chapter ornament, and should have an empty alt so screen readers skip it.',
      },
      {
        q: 'Does accessible formatting affect how my book looks to sighted readers?',
        a: 'No. Alt text, language tags, and proper heading structure are invisible to sighted readers. Keeping text as real text rather than images actually improves the experience for everyone, since it reflows and resizes correctly.',
      },
    ],
    related: [
      { type: 'checklist', slug: 'epub-formatting-checklist', label: 'EPUB formatting pre-upload checklist' },
      { type: 'mistake', slug: 'epub-formatting-mistakes', label: '10 EPUB formatting mistakes that cause rejection' },
      { type: 'epub-error', slug: 'missing-ncx-navigation', label: 'Missing NCX navigation table' },
      { type: 'platform-rejection', slug: 'apple-books', label: 'Why Apple Books rejects ebooks' },
    ],
  },
];

export function getMistakeBySlug(slug) {
  return MISTAKES.find((m) => m.slug === slug) ?? null;
}
