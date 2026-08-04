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
];

export function getErrorBySlug(slug) {
  return EPUB_ERRORS.find(e => e.slug === slug) ?? null;
}
