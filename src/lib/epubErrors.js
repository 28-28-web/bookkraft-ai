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
];

export function getErrorBySlug(slug) {
  return EPUB_ERRORS.find(e => e.slug === slug) ?? null;
}
