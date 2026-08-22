export const EPUB_ERRORS = [
  {
    slug: 'emf-image-fallback',
    metaTitle: 'EPUB Error: Fallback Must Be Provided for Foreign Resources (EMF Images)',
    metaDescription: 'Getting "fallback must be provided for foreign resources" in EPUBCheck? Here\'s what it means and how to fix the EMF/WMF image error before uploading to KDP or Apple Books.',
    title: 'EPUB Error: Fallback Must Be Provided for Foreign Resources (EMF Images)',
    errorMessage: 'fallback must be provided for foreign resources, but found none for resource "images/image.emf" of type "image/emf"',
    cause: '<p>This happens when a Word document is converted to EPUB and one or more images were saved internally as EMF (Windows Metafile) format instead of a standard web image format. EPUB readers can\'t display EMF files, and the spec requires a fallback image when a foreign (non-standard) resource type is used. Since no fallback was included, the file fails validation.</p>',
    fixSteps: '<ol><li>Open your original Word document and find the images causing the error (often charts, pasted screenshots, or clip art).</li><li>Right-click each image and save it as a PNG or JPG file directly, instead of relying on Word\'s export to convert it.</li><li>Replace the image in your document with the re-saved PNG/JPG version.</li><li>Re-export or re-convert to EPUB — this replaces the EMF reference with a standard image format the EPUB spec supports.</li><li>Re-validate the file to confirm the fallback error is gone.</li></ol>',
    faq: [
      {
        q: 'What is an EMF image and why does EPUB reject it?',
        a: 'EMF (Enhanced Metafile) is a Windows-only vector image format. EPUB is built on web standards (like HTML and CSS), which don\'t recognize EMF as a valid image type. When an EMF image has no fallback, validators reject the file.',
      },
      {
        q: 'Which images are usually affected?',
        a: 'Charts, graphs, and images pasted directly from other Windows applications are the most common source of EMF images inside Word-to-EPUB conversions.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'font-link-validation',
    metaTitle: 'EPUB Error: Font Link Validation Failed — How to Fix It',
    metaDescription: 'Font link validation error stopping your EPUB upload? Here\'s why embedded fonts fail validation and how to fix it for KDP, Apple Books, and IngramSpark.',
    title: 'EPUB Error: Font Link Validation Failed',
    errorMessage: 'font-related validation error: embedded or referenced font could not be validated',
    cause: '<p>This error occurs when your EPUB references a font file in its CSS or manifest, but the actual font file is missing, corrupted, or blocked from embedding due to its font license. Some commercial fonts explicitly disallow embedding in distributed files, which causes validators and platforms like KDP to reject the EPUB.</p>',
    fixSteps: '<ol><li>Check whether the font causing the error is a licensed commercial font (many fonts, including some default Windows fonts, restrict embedding).</li><li>If it\'s non-embeddable, replace it with a free, embedding-permitted font such as Google Fonts (Open Sans, Merriweather, etc.).</li><li>If the font file itself is missing from your EPUB package, re-add it to the correct folder and confirm the CSS @font-face path matches exactly.</li><li>Remove any font references in your CSS that you\'re not actually using, since unused broken references can still trigger this error.</li><li>Re-validate to confirm the font error is resolved.</li></ol>',
    faq: [
      {
        q: 'Can I use any font in my EPUB?',
        a: 'No. Only fonts with an embedding-permitted license can be included in a distributed EPUB file. Most free fonts (like Google Fonts) allow this, but many commercial fonts do not.',
      },
      {
        q: 'Do I need to embed fonts at all?',
        a: "No — if you don't embed custom fonts, the reader's device will use its own default font, which is the safest and simplest option for most self-published ebooks.",
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'missing-manifest-resource',
    metaTitle: 'EPUB Error: Missing Manifest Resource — How to Fix It',
    metaDescription: 'EPUB file referenced but not declared in the OPF manifest? This guide explains exactly why it happens and how to fix missing manifest resource errors before uploading.',
    title: 'EPUB Error: Missing Manifest Resource',
    errorMessage: 'epub missing manifest resource — file referenced but not declared in the OPF manifest',
    cause: '<p>Every file inside an EPUB (images, fonts, stylesheets, HTML chapters) must be explicitly listed in the OPF manifest. This error means a file exists inside the EPUB package (or is referenced by your content) but was never added to that manifest list — usually because a conversion tool generated the file without updating the manifest, or a file was renamed after the manifest was created.</p>',
    fixSteps: '<ol><li>Open your EPUB\'s .opf file (usually inside the OEBPS or OPS folder) in a text editor.</li><li>Compare the list of files in the manifest section against the actual files in your EPUB package folder.</li><li>Add a manifest entry for any file that\'s missing, matching the format of existing entries (id, href, media-type).</li><li>If a referenced file no longer exists or was renamed, either restore it or remove the broken reference from your HTML/CSS.</li><li>Re-validate to confirm all resources are properly declared.</li></ol>',
    faq: [
      {
        q: 'Why does a file need to be in the manifest if it\'s already in the EPUB folder?',
        a: 'The EPUB spec requires every resource to be explicitly declared so reading systems know what files exist and how to handle them. A file sitting in the folder without a manifest entry is technically invisible to compliant readers.',
      },
      {
        q: 'What usually causes files to go missing from the manifest?',
        a: 'This most often happens during manual editing in Sigil or Calibre, or when a conversion tool generates supporting files (like a new stylesheet or image) without registering them in the OPF.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'opf-role-attribute-not-allowed',
    metaTitle: 'EPUB Error: opf:role Attribute Not Allowed (RSC-005) — How to Fix It',
    metaDescription: 'Getting RSC-005 "attribute opf:role not allowed here" in EPUBCheck? Here\'s why it happens and how to fix the EPUB 2 vs EPUB 3 metadata conflict before uploading.',
    title: 'EPUB Error: opf:role Attribute Not Allowed (RSC-005)',
    errorMessage: 'RSC-005: /oebps/content.opf: error while parsing file: attribute "opf:role" not allowed here; expected attribute "dir", "id" or "xml:lang"',
    cause: '<p>This happens when an outdated EPUB 2 attribute (opf:role) is used on an element in an EPUB 3 file. EPUB 3 replaced this attribute with a different metadata structure, so validators reject it as invalid on elements that don\'t support it in the newer spec.</p>',
    fixSteps: '<ol><li>Open your content.opf file and locate the line number mentioned in the error.</li><li>Find the element using opf:role and check whether it\'s a metadata <code>&lt;dc:creator&gt;</code> or <code>&lt;dc:contributor&gt;</code> tag.</li><li>If your conversion tool generated this automatically, re-export using a tool that supports EPUB 3 metadata syntax rather than EPUB 2.</li><li>If editing manually, remove the opf:role attribute or replace it with the EPUB 3 equivalent metadata structure for author roles.</li><li>Re-validate to confirm the error clears.</li></ol>',
    faq: [
      {
        q: 'Why does this happen with EPUB 3 files specifically?',
        a: 'EPUB 2 and EPUB 3 handle certain metadata attributes differently. A file built with EPUB 2 conventions but declared as EPUB 3 will fail this kind of attribute check.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'invalid-font-file-corrupted',
    metaTitle: 'EPUB Error: Not a Valid Font (Corrupted Font File) — How to Fix It',
    metaDescription: 'Getting "not a valid font: unpack_from requires a buffer" in EPUBCheck? The embedded font file is corrupted. Here\'s how to identify and replace it.',
    title: 'EPUB Error: Not a Valid Font (Corrupted Font File)',
    errorMessage: 'not a valid font: unpack_from requires a buffer of at least 22412 bytes for unpacking 16 bytes at offset 22396',
    cause: '<p>This error means the font file embedded in your EPUB is corrupted or incomplete — usually because it was only partially downloaded, damaged during a file transfer, or improperly extracted from another format. The validator can\'t read the font\'s internal structure because bytes are missing from the file.</p>',
    fixSteps: '<ol><li>Locate the font file causing the error inside your EPUB package (usually in a /fonts folder).</li><li>Re-download the original font file from its source rather than reusing the copy in your project.</li><li>Replace the corrupted file with the fresh copy, keeping the same filename.</li><li>If the problem persists, try a different font entirely — some free font files from third-party sites are pre-corrupted at the source.</li><li>Re-validate to confirm the font loads correctly.</li></ol>',
    faq: [
      {
        q: 'How does a font file get corrupted?',
        a: 'Most often this happens during an interrupted download, a bad copy-paste between file systems, or when a font is extracted from a ZIP archive incorrectly.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'title-tag-empty-kobo',
    metaTitle: 'EPUB Error: [title] Tag Is Empty (Kobo) — How to Fix It',
    metaDescription: 'Getting "[title] tag is empty" from Kobo? Your content.opf is missing a book title in its metadata. Here\'s exactly how to find and fix it.',
    title: 'EPUB Error: [title] Tag Is Empty (Kobo)',
    errorMessage: '[title] tag is empty. in content.opf, line 7',
    cause: '<p>Every EPUB requires a non-empty title element in the metadata section of content.opf. This error occurs when the title field was left blank during conversion, or when a template placeholder for the title was never filled in before export.</p>',
    fixSteps: '<ol><li>Open content.opf and locate line 7 (or the line number in your specific error).</li><li>Find the <code>&lt;dc:title&gt;&lt;/dc:title&gt;</code> tag — if it\'s empty, add your book\'s title between the tags.</li><li>If you\'re using conversion software, check the book details/metadata screen before exporting to make sure the title field is filled in.</li><li>Re-export or re-save and re-validate.</li></ol>',
    faq: [
      {
        q: 'Why does Kobo specifically flag this?',
        a: 'Kobo\'s validation is generally stricter about required metadata fields than some other platforms, which is why an empty title might pass elsewhere but fail specifically on Kobo\'s check.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'missing-ncx-navigation',
    metaTitle: 'EPUB Error: Missing NCX Navigation Table — How to Fix It',
    metaDescription: "NCX navigation file missing from your EPUB? Here's why EPUBCheck requires toc.ncx and how to regenerate it for KDP, Apple Books, and Kobo.",
    title: 'EPUB Error: Missing NCX Navigation Table',
    errorMessage: 'EPUB/OEBPS/toc.ncx — referenced in the OPF file but not found in the ZIP archive',
    cause: '<p>EPUB 2 requires an NCX file (toc.ncx) — a structured table of contents that lets reading systems and platforms provide chapter navigation. This error means the OPF file references toc.ncx, but the actual file is absent from the EPUB archive. It usually happens when a conversion tool generates the OPF manifest pointing to a navigation file it then fails to create, or when the NCX was manually deleted from the package.</p>',
    fixSteps: '<ol><li>Open your EPUB in a tool like Sigil or Calibre and confirm whether a toc.ncx file exists in the OEBPS (or OPS) folder.</li><li>If missing, use your conversion tool\'s "Generate Table of Contents" or "Generate NCX" function — Calibre, Sigil, and most EPUB editors can rebuild the NCX from your chapter headings automatically.</li><li>Confirm the generated toc.ncx is referenced in your OPF manifest and that the spine\'s toc attribute points to its manifest ID.</li><li>In Calibre, Edit Book → Tools → Table of Contents will regenerate a correct NCX.</li><li>Re-validate to confirm the NCX is present and well-formed.</li></ol>',
    faq: [
      {
        q: 'Do EPUB 3 files need an NCX file?',
        a: 'Not strictly — EPUB 3 uses a navigation document (nav.xhtml) instead of toc.ncx. However, many distribution platforms still require a legacy NCX for backwards compatibility with older reading systems. If your EPUB 3 file is rejected for a missing NCX, adding one alongside nav.xhtml usually fixes it.',
      },
      {
        q: 'Can I just add any toc.ncx to fix the error?',
        a: "No — the NCX must match your actual content structure. Each navPoint references a specific chapter file, so a placeholder or copied NCX from another book will point to wrong files and can cause further validation errors or navigation failures.",
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'invalid-opf-manifest-reference',
    metaTitle: "EPUB Error: OPF Manifest References a File That Doesn't Exist",
    metaDescription: "OPF manifest declares a file that's missing from the package? Here's why this error happens and how to clean up broken manifest references.",
    title: 'EPUB Error: OPF Manifest References a Missing File',
    errorMessage: 'RSC-007: The referenced resource "/OEBPS/chapter03.xhtml" could not be found.',
    cause: '<p>Every item in the OPF manifest must correspond to an actual file inside the EPUB ZIP package. This error means the manifest lists a file path that doesn\'t exist in the archive — the file was deleted, renamed, or never generated. This is the opposite of a missing-manifest error: the declaration exists but the file doesn\'t. It happens most often after manual editing sessions where files are removed without updating the OPF, or when a conversion tool generates chapter references for content cut before export.</p>',
    fixSteps: '<ol><li>Open your .opf file and locate the manifest item for the missing file (the error message includes its href path).</li><li>Check whether the file was renamed — if so, update the manifest href to match the new filename.</li><li>If the file was intentionally removed, delete the manifest item entry and also remove any spine itemref pointing to it.</li><li>If the file was accidentally deleted, restore it from a backup or regenerate it from your source manuscript.</li><li>Re-validate to confirm no dangling manifest references remain.</li></ol>',
    faq: [
      {
        q: 'How is this different from a missing-manifest-resource error?',
        a: "A missing-manifest-resource error means a file exists in the package but isn't listed in the OPF. This error is the reverse: the manifest declares a file, but the file itself is absent from the package.",
      },
      {
        q: 'Will this error cause the book not to load?',
        a: 'Yes. A spine item referencing a missing chapter means the reader hits a dead page at that point. Most platforms reject the file outright during upload validation.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'duplicate-id-epub',
    metaTitle: 'EPUB Error: Duplicate ID Attribute — How to Fix It',
    metaDescription: "EPUBCheck flagging duplicate id attributes in your EPUB? Here's why id values must be unique per document and how to find and fix every duplicate.",
    title: 'EPUB Error: Duplicate ID Attribute in EPUB',
    errorMessage: 'RSC-005: attribute "id" must be unique within a document — value "section1" already used at line 14',
    cause: '<p>HTML requires every id attribute value to be unique within a single document. When conversion tools generate EPUB chapters from a template, they often copy the same structural id values (like "header", "section1", "content") into every chapter file. Each individual file fails validation because the same id appears more than once within that document. This also breaks anchor-link navigation: if two elements share an id, a link to #section1 is ambiguous.</p>',
    fixSteps: '<ol><li>Run EPUBCheck or BookKraft\'s EPUB Validator to get a list of all files and lines with duplicate IDs.</li><li>In each flagged file, locate the duplicate id attributes — chapter templates often repeat ids like "header", "nav-bar", or "content".</li><li>Rename each duplicate so it\'s unique within the file — a reliable pattern is chapter-specific prefixes: "ch01-header", "ch02-header", etc.</li><li>If any internal anchor links use these ids (href="#section1"), update them to match the new renamed ids.</li><li>Re-validate to confirm all id values are unique within each document.</li></ol>',
    faq: [
      {
        q: 'Do id values need to be unique across the whole EPUB or just within one file?',
        a: 'Within one file only — EPUB chapters are separate HTML documents, so the same id value can appear in chapter01.xhtml and chapter02.xhtml without conflict. The error only fires when the same id appears twice inside a single file.',
      },
      {
        q: 'Why do conversion tools create duplicate IDs?',
        a: 'Most tools generate chapters from a shared template with hard-coded structural ids. When the template is applied to every chapter without renaming those ids, each resulting file fails HTML uniqueness requirements.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'broken-spine-order',
    metaTitle: 'EPUB Error: Broken Spine — Missing or Duplicate idref — How to Fix It',
    metaDescription: "EPUB spine has a broken or duplicate idref? Here's what the OPF spine does and how to fix reading order errors before uploading to KDP or Apple Books.",
    title: 'EPUB Error: Broken Spine Order (Duplicate or Missing idref)',
    errorMessage: 'OPF-054: Spine item references a manifest item that is not declared: "chapter04"',
    cause: '<p>The OPF spine defines the reading order of your EPUB by listing manifest item IDs in sequence. A broken spine happens when a spine itemref points to a manifest ID that doesn\'t exist (usually because a chapter was deleted from the manifest without removing its spine entry), or when the same ID appears in the spine twice. Both conditions fail EPUBCheck because a broken spine means the reader can\'t determine the correct chapter sequence.</p>',
    fixSteps: '<ol><li>Open content.opf and find the <code>&lt;spine&gt;</code> section — it lists <code>&lt;itemref idref="..."&gt;</code> entries.</li><li>Compare each idref value against the id attributes in the manifest section. Every idref must match exactly one manifest item id.</li><li>Remove any itemref entries pointing to manifest IDs that no longer exist.</li><li>If any idref appears twice in the spine, remove the duplicate.</li><li>Re-validate and open the EPUB in a reader to confirm chapters appear in the correct order.</li></ol>',
    faq: [
      {
        q: 'What happens to readers if the spine is broken?',
        a: 'Reading apps handle it inconsistently — some skip missing chapters silently, some show a blank page, some refuse to open the file. Distribution platforms (KDP, Apple Books) typically reject the upload outright when EPUBCheck detects spine errors.',
      },
      {
        q: 'How does the spine differ from the table of contents?',
        a: 'The spine defines the sequential reading order used when a reader pages through the book continuously. The TOC (NCX or nav.xhtml) defines the navigational structure users see when jumping between chapters. Both can be out of sync.',
      },
    ],
    relatedTool: 'epub-validator',
  },
  {
    slug: 'ghost-spacing-epub',
    metaTitle: 'EPUB Formatting: Ghost Spacing (Extra Blank Lines Between Paragraphs)',
    metaDescription: "Extra blank lines in your EPUB on Kindle or Kobo? Ghost spacing is caused by empty paragraph tags or CSS margin conflicts. Here's how to fix it.",
    title: 'EPUB Formatting: Ghost Spacing (Extra Blank Lines in E-Reader Preview)',
    errorMessage: 'Extra blank lines appear between paragraphs or section breaks when previewed on Kindle, Kobo, or Apple Books',
    cause: '<p>Ghost spacing is a common formatting problem, not a strict validation error: blank-looking lines appear between paragraphs or chapters in e-reader previews that weren\'t in your original manuscript. The two most common causes are (1) empty <code>&lt;p&gt;&lt;/p&gt;</code> or <code>&lt;p&gt;&amp;nbsp;&lt;/p&gt;</code> tags used as visual spacers during Word-to-EPUB conversion, which render as full paragraph-height gaps on e-readers, and (2) CSS margin conflicts where both the top margin of one paragraph and the bottom margin of the previous one stack, doubling the visible gap. Some conversion tools also insert zero-width space characters (U+200B) that are invisible in editors but create rendering artifacts in certain readers.</p>',
    fixSteps: '<ol><li>Open your EPUB HTML chapter files and search for empty <code>&lt;p&gt;</code> tags: <code>&lt;p&gt;&lt;/p&gt;</code>, <code>&lt;p&gt; &lt;/p&gt;</code>, or <code>&lt;p&gt;&amp;nbsp;&lt;/p&gt;</code> — delete them and use CSS margin instead of empty tags for spacing.</li><li>Check your stylesheet for CSS like <code>p { margin-top: 1em; margin-bottom: 1em; }</code> — this doubles gaps between paragraphs. Use either top OR bottom margin, not both: <code>p { margin: 0; text-indent: 1.5em; }</code> is the standard for ebook body text.</li><li>Search for zero-width space characters (Unicode U+200B) using find-and-replace in Sigil or Calibre — replace with nothing.</li><li>After changes, re-open in Kindle Previewer and Kobo desktop app to verify spacing looks correct on both.</li><li>Re-validate your EPUB to confirm no new errors were introduced during editing.</li></ol>',
    faq: [
      {
        q: 'Why does spacing look fine in my Word document but wrong in the EPUB?',
        a: 'Word uses page-based layout where blank lines have a fixed height. EPUB uses CSS on a reflowing canvas — a blank paragraph tag renders differently on each e-reader based on its default line height and font size. Something that looked like a small gap in Word can become a full blank screen-height gap on Kindle.',
      },
      {
        q: 'Is ghost spacing the same as chapter break spacing?',
        a: "No — chapter break spacing is intentional and usually comes from a CSS page-break rule or a large top margin on the chapter heading. Ghost spacing is unintentional: it appears within the body text or at the start/end of chapters where you didn't add space deliberately.",
      },
    ],
    relatedTool: 'epub-formatter',
  },
];

export function getErrorBySlug(slug) {
  return EPUB_ERRORS.find(e => e.slug === slug) ?? null;
}
