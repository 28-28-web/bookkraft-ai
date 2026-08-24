export const COVER_REQUIREMENTS = [
  {
    slug: 'amazon-kdp-ebook',
    platform: 'Amazon KDP',
    metaTitle: 'Amazon KDP Ebook Cover Requirements — Size, Format, and File Specs',
    metaDescription: 'KDP ebook cover requirements: minimum 625 × 1000px, ideal 1600 × 2560px, JPEG or TIFF, RGB, max 50MB, 1.6:1 height-to-width ratio. Verified from official KDP documentation.',
    title: 'Amazon KDP Ebook Cover Requirements',
    intro: '<p>Amazon KDP requires a cover image inside every EPUB and MOBI file — separate from the cover image you upload to the KDP product listing. Both must meet KDP\'s size and format requirements. The most common cover rejection reasons are images below the minimum dimensions and CMYK color profiles that KDP\'s system cannot process.</p>',
    specs: [
      { label: 'Minimum dimensions', value: '625px wide × 1000px tall' },
      { label: 'Ideal dimensions', value: '1600px wide × 2560px tall' },
      { label: 'Maximum dimensions', value: '10,000px on either side' },
      { label: 'Aspect ratio', value: '1.6:1 (height to width)' },
      { label: 'File formats', value: 'JPEG or TIFF' },
      { label: 'Color mode', value: 'RGB' },
      { label: 'Maximum file size', value: '50MB' },
    ],
    details: '<p>KDP states a minimum of 625px wide by 1000px tall, but recommends the ideal of 1600px × 2560px for the sharpest display across Kindle devices and the Kindle app. The 1.6:1 height-to-width aspect ratio is required — covers with a significantly different ratio will be stretched or cropped to fit KDP\'s display templates. Images must be in RGB color mode; CMYK images are rejected by KDP\'s image processor even though CMYK is standard for print covers. The maximum file size is 50MB, though standard cover images are well under 5MB in practice.</p><p>KDP accepts JPEG and TIFF. PNG is not listed as an accepted format in the current official specification — authors using PNG covers from design tools should convert to JPEG before including the image in their EPUB package.</p>',
    commonMistakes: [
      {
        title: 'Using a print cover directly',
        description: 'Print covers are designed at 300 DPI in CMYK color mode. KDP rejects CMYK images. Always export a separate RGB JPEG at the correct pixel dimensions for the ebook cover — do not reuse the print-ready PDF or TIFF.',
      },
      {
        title: 'Dimensions below the minimum',
        description: 'The 500px minimum cited by some older tools and blog posts is outdated. KDP\'s current official minimum is 625px wide × 1000px tall. Covers below this threshold are rejected or display at poor quality on high-DPI screens.',
      },
      {
        title: 'Wrong aspect ratio',
        description: 'A 1:1 square cover or a landscape-oriented image will be stretched or letterboxed by KDP\'s display system. Start from a canvas with the correct 1.6:1 height-to-width ratio — 1600×2560px is the standard working size.',
      },
    ],
    faq: [
      {
        q: 'Does KDP accept PNG cover images?',
        a: 'PNG is not listed as an accepted cover format in the current KDP specification. Use JPEG or TIFF. Most design tools export covers as PNG by default — export as JPEG at maximum quality before including the image in your EPUB.',
      },
      {
        q: 'Can I use the same cover image inside the EPUB and for the KDP product listing upload?',
        a: 'Yes. KDP accepts the same JPEG for both the embedded EPUB cover and the separate product listing cover upload. The listing upload has slightly different display requirements (it shows in search results and the product page), but the same 1600×2560px JPEG works for both.',
      },
      {
        q: 'Why does my cover look fine in Kindle Previewer but appear as a gray placeholder on the product page?',
        a: 'A gray placeholder on the product page usually means the cover image is embedded in the EPUB but not declared with properties="cover-image" in the OPF manifest. The image is physically present but the platform cannot identify it as the cover.',
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
      { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest' },
      { type: 'cover-requirement', slug: 'apple-books-ebook', label: 'Apple Books ebook cover requirements' },
    ],
  },
  {
    slug: 'apple-books-ebook',
    platform: 'Apple Books',
    metaTitle: 'Apple Books Ebook Cover Requirements — Size, Format, and Color Specs',
    metaDescription: 'Apple Books cover requirements: minimum 1400 × 2100px, JPEG or PNG, RGB with sRGB color profile, no CMYK. Strict validation — non-compliant covers cause rejection at submission.',
    title: 'Apple Books Ebook Cover Requirements',
    intro: '<p>Apple Books has the strictest cover image requirements of any major ebook platform. Non-compliant covers — CMYK color mode, below-minimum dimensions, or missing sRGB profile — cause the entire EPUB submission to be rejected through Apple Books Connect. Unlike KDP, which sometimes accepts borderline images, Apple\'s validation is fully automated and returns specific error codes.</p>',
    specs: [
      { label: 'Minimum dimensions', value: '1400px wide × 2100px tall' },
      { label: 'File formats', value: 'JPEG or PNG' },
      { label: 'Color mode', value: 'RGB' },
      { label: 'Color profile', value: 'sRGB' },
      { label: 'CMYK', value: 'Not accepted — causes rejection' },
    ],
    details: '<p>Apple Books requires cover images to be at least 1400×2100 pixels, in RGB color mode with an sRGB color profile. The minimum is notably higher than KDP\'s 625×1000px floor — a cover that passes KDP\'s size check may still fail Apple Books. CMYK images are rejected; this is the most common reason print covers fail Apple\'s validation, since print designers typically work in CMYK and may not have a separate RGB/sRGB export.</p><p>Apple validates color profiles at the byte level — saving as RGB in some tools does not automatically embed an sRGB profile. When exporting your cover, explicitly set the color profile to sRGB in the export dialog rather than relying on the application default.</p>',
    commonMistakes: [
      {
        title: 'CMYK cover from print workflow',
        description: 'Print covers are designed in CMYK. Apple Books rejects CMYK images at the point of EPUB submission. Export a separate RGB/sRGB JPEG specifically for the ebook cover — do not extract the image from a print-ready PDF.',
      },
      {
        title: 'Missing sRGB color profile',
        description: 'Saving as RGB is not the same as embedding an sRGB profile. When exporting from Photoshop, InDesign, or Affinity Photo, explicitly choose sRGB IEC 61966-2.1 as the color profile in the export settings.',
      },
      {
        title: 'Cover below 1400×2100px',
        description: 'Apple\'s minimum is 1400×2100px — the same 2:3 aspect ratio as KDP but with a higher pixel floor. A 1000×1600px image that meets KDP\'s requirements will fail Apple Books validation.',
      },
    ],
    faq: [
      {
        q: 'Does Apple Books accept PNG covers?',
        a: 'Yes. Apple Books accepts both JPEG and PNG cover images, provided they are in RGB/sRGB color mode and meet the minimum dimensions. JPEG is more common and produces smaller file sizes.',
      },
      {
        q: 'My cover looks correct in Photoshop — why does Apple Books reject it as CMYK?',
        a: "Photoshop documents can be in RGB mode while still embedding a CMYK-derived profile from a previous color conversion. Open the image in Photoshop, go to Edit → Convert to Profile, select sRGB IEC 61966-2.1, and re-export. Use Image → Mode → RGB Color first if the document mode itself is CMYK.",
      },
      {
        q: 'Is there a maximum file size for Apple Books cover images?',
        a: 'Apple does not publish a specific cover image file size limit, but excessively large images (above ~20MB) can cause submission processing issues. A 1400×2100px JPEG at maximum quality is typically 2–4MB — well within safe limits.',
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'platform-rejection', slug: 'apple-books', label: 'Why Apple Books rejects ebooks' },
      { type: 'epub-error', slug: 'cover-image-not-declared', label: 'Cover image not declared in OPF manifest' },
      { type: 'cover-requirement', slug: 'amazon-kdp-ebook', label: 'Amazon KDP ebook cover requirements' },
    ],
  },
  {
    slug: 'ingramspark-print',
    platform: 'IngramSpark',
    metaTitle: 'IngramSpark Print Book Cover Requirements — PDF, CMYK, Bleed, and Spine Specs',
    metaDescription: 'IngramSpark print cover requirements: PDF/X-1a, CMYK, 300 DPI, 0.125″ bleed all sides, spine width from page count and paper stock, ISBN barcode on back cover lower right.',
    title: 'IngramSpark Print Book Cover Requirements',
    intro: '<p>IngramSpark print covers are fundamentally different from ebook cover images — they are full-wrap PDF files (front cover, spine, and back cover in a single document) and must be prepared in CMYK color mode, at print resolution, with bleed and a correctly calculated spine width. A design that works for KDP ebook covers requires a complete rebuild for IngramSpark print.</p>',
    specs: [
      { label: 'File format', value: 'PDF/X-1a' },
      { label: 'Color mode', value: 'CMYK (RGB rejected)' },
      { label: 'Resolution', value: '300 DPI minimum' },
      { label: 'Bleed', value: '0.125″ (3.175mm) all sides' },
      { label: 'Spine width', value: 'Calculated from page count and paper stock' },
      { label: 'Fonts', value: 'Fully embedded (subsetting not accepted)' },
      { label: 'ISBN barcode', value: 'Back cover, lower right, 100% scale' },
      { label: 'Spot colors / PMS', value: 'Not accepted — process CMYK only' },
    ],
    details: '<p>IngramSpark requires PDF/X-1a format — a PDF subset designed for print production that mandates CMYK color, embedded fonts, and no transparency. Submitting a standard PDF or a PDF/X-4 will fail IngramSpark\'s preflight check. RGB images inside the document must be converted to CMYK before flattening the PDF — IngramSpark\'s preflight will flag any remaining RGB objects.</p><p>The spine width is the most frequently miscalculated element. IngramSpark provides a template generator that calculates spine width from your page count, trim size, and selected paper stock (white standard, white premium, or cream). A spine that is too narrow or too wide causes IngramSpark to reject the cover PDF without proceeding to review. Download a fresh template after finalizing your interior page count — adding or removing pages changes the spine width.</p><p>The ISBN barcode must appear on the back cover, lower right, at 100% scale. IngramSpark will add a barcode during production if none is present, but the positioning may not match your design. Including the barcode at the correct position and scale in your submitted PDF gives you control over placement.</p>',
    commonMistakes: [
      {
        title: 'Submitting RGB or standard PDF',
        description: 'IngramSpark requires PDF/X-1a with CMYK color throughout. An RGB PDF or a standard PDF/X-4 will fail preflight. Check your PDF export settings: select PDF/X-1a and convert all colors to CMYK before flattening.',
      },
      {
        title: 'Incorrect spine width',
        description: 'The spine width is calculated from page count × paper stock thickness. Adding or removing pages after generating the template requires a new template download — the old spine width is no longer correct. Use IngramSpark\'s template generator with your final page count.',
      },
      {
        title: 'Fonts not fully embedded',
        description: 'PDF/X-1a requires all fonts to be fully embedded (not subsetted). Subsetting embeds only the characters used in the document, which is acceptable for screen PDFs but rejected by IngramSpark\'s preflight. Set font embedding to "embed all" in your export settings.',
      },
      {
        title: 'Using spot colors or PMS values',
        description: 'IngramSpark prints using CMYK process inks only. Spot colors, Pantone references, and PMS values are not supported. Convert all colors to CMYK process values before submitting.',
      },
    ],
    faq: [
      {
        q: 'How do I calculate the spine width for my IngramSpark book?',
        a: "Use IngramSpark's Cover Template Generator. Enter your trim size, page count, and paper stock (white standard, white premium, or cream). The generator produces a PDF template with the correct canvas size and spine position marked. Download a new template whenever your page count changes.",
      },
      {
        q: 'Does IngramSpark accept a PDF exported from Canva or Adobe Express?',
        a: "Only if the export is PDF/X-1a with CMYK colors and fully embedded fonts. Most online design tools export standard PDFs in RGB color mode — these will fail IngramSpark's preflight. Use Adobe InDesign, Affinity Publisher, or a tool with a PDF/X-1a export option.",
      },
      {
        q: 'Can I use a spot UV or foil finish on my IngramSpark cover?',
        a: "IngramSpark standard printing uses CMYK process inks only. Specialty finishes (spot UV, foil stamping, embossing) are not available through IngramSpark's standard distribution service. Some short-run print-on-demand providers offer specialty finishes for bulk orders.",
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'platform-rejection', slug: 'ingram-spark', label: 'Why IngramSpark rejects books' },
      { type: 'cover-requirement', slug: 'amazon-kdp-ebook', label: 'Amazon KDP ebook cover requirements' },
      { type: 'cover-requirement', slug: 'apple-books-ebook', label: 'Apple Books ebook cover requirements' },
    ],
  },
];

export function getCoverRequirementBySlug(slug) {
  return COVER_REQUIREMENTS.find(c => c.slug === slug) ?? null;
}
