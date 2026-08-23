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
];

export function getMistakeBySlug(slug) {
  return MISTAKES.find((m) => m.slug === slug) ?? null;
}
