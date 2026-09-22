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
    details: '<p>Apple Books requires cover images to be at least 1400×2100 pixels, in RGB color mode with an sRGB color profile. The minimum is notably higher than KDP\'s 625×1000px floor — a cover that passes KDP\'s size check may still fail Apple Books. CMYK images are rejected; this is the most common reason print covers fail Apple\'s validation, since print designers typically work in CMYK and may not have a separate RGB/sRGB export.</p><p>Apple validates color profiles at the byte level — saving as RGB in some tools does not automatically embed an sRGB profile. When exporting your cover, explicitly set the color profile to sRGB in the export dialog rather than relying on the application default.</p><h3 style="font-size:1rem;font-weight:700;margin:24px 0 10px">How to export a compliant Apple Books cover</h3><ol style="padding-left:1.4em;line-height:1.8;font-size:15px"><li><strong>Set canvas size to at least 1400×2100px.</strong> Work at 2800×4200px (2×) if your design tool supports it — Apple Books scales down gracefully and the extra resolution gives you room if the image is ever reused elsewhere.</li><li><strong>Design in RGB color mode from the start.</strong> If the cover was built for print (CMYK), open it in Photoshop and go to Image → Mode → RGB Color before doing anything else. Converting late in the process reduces banding risk compared to converting the exported JPEG.</li><li><strong>Assign sRGB explicitly on export.</strong> In Photoshop: File → Export → Export As → Color Space → sRGB. In Affinity Photo: File → Export → JPEG → Color Space → sRGB IEC 61966-2.1. In Canva: download as PNG or JPEG — Canva exports sRGB by default. Do not rely on "Save for Web" with default settings; some versions omit the profile tag.</li><li><strong>Export as JPEG or PNG.</strong> JPEG at 90–100 quality is standard. PNG is accepted but produces larger files with no quality benefit for photographic covers. Avoid WebP, TIFF, or PDF — Apple Books does not accept these as the cover image file.</li><li><strong>Verify before embedding.</strong> Open the exported file in Preview (macOS) → Tools → Show Inspector → Color Model should read "RGB". On Windows, right-click → Properties → Details → Color representation. Run the file through BookKraft\'s Cover Checker to confirm dimensions, color mode, and format against Apple Books requirements before adding it to your EPUB.</li></ol>',
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
      {
        q: 'Can I use the same cover image for KDP and Apple Books?',
        a: 'Only if the image already meets Apple\'s stricter requirements. KDP accepts covers as small as 625×1000px and does not reject CMYK. Apple Books requires a minimum of 1400×2100px in sRGB color mode. If your KDP cover is at least 1400×2100px and was exported as sRGB, it will work for Apple Books. If it was exported from a print workflow in CMYK, it will not — you need a separate RGB/sRGB export.',
      },
      {
        q: 'Does Apple Books require a minimum DPI for cover images?',
        a: 'Apple Books does not enforce a DPI (dots per inch) requirement for ebook covers — DPI is a print concept and has no technical meaning for screen-displayed images. What matters is the pixel dimension: at least 1400×2100px. A 1400×2100px image at 72 DPI contains the same pixel data as one at 300 DPI; the DPI metadata tag does not affect acceptance.',
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
  {
    slug: 'kobo-ebook',
    platform: 'Kobo',
    metaTitle: 'Kobo Ebook Cover Requirements — Size, Format, and Color Specs',
    metaDescription: 'Kobo ebook cover requirements: minimum 1400px on the short side, ideal 1600 × 2560px, JPEG or PNG, RGB color mode. Covers below the minimum display poorly in the Kobo store.',
    title: 'Kobo Ebook Cover Requirements',
    intro: '<p>Kobo accepts ebook covers through its Kobo Writing Life platform and via aggregators like Draft2Digital. Its requirements sit between KDP\'s lenient floor and Apple\'s strict validation. The most common issues are covers below the recommended resolution and images carried over from a print CMYK workflow.</p>',
    specs: [
      { label: 'Minimum dimensions', value: '1400px on the shortest side' },
      { label: 'Ideal dimensions', value: '1600px wide × 2560px tall' },
      { label: 'Aspect ratio', value: '1.6:1 (height to width)' },
      { label: 'File formats', value: 'JPEG or PNG' },
      { label: 'Color mode', value: 'RGB' },
      { label: 'Maximum file size', value: '2MB recommended for store display' },
    ],
    details: '<p>Kobo Writing Life recommends a cover of at least 1400px on the shortest side, with 1600 × 2560px as the ideal for sharp display across Kobo e-readers and the Kobo app. Covers must be RGB — as with every ebook platform, CMYK images from a print workflow should be re-exported as RGB. Kobo displays covers at relatively small sizes in its store grid, so a keep the file well-optimized, but do not sacrifice the underlying resolution, since Kobo\'s reading apps display the cover full-screen.</p><p>Kobo accepts both JPEG and PNG. JPEG at high quality is the standard choice and produces smaller files. The same 1600 × 2560px RGB JPEG that meets KDP and Apple Books requirements will also satisfy Kobo, which makes a single well-prepared cover portable across all three stores.</p>',
    commonMistakes: [
      {
        title: 'Cover carried over from a CMYK print file',
        description: 'As with every ebook store, Kobo expects RGB. A cover extracted from a print-ready CMYK PDF can display with shifted colors or be rejected. Export a separate RGB JPEG for the ebook.',
      },
      {
        title: 'Low-resolution cover below 1400px',
        description: 'A cover under 1400px on the short side looks soft on modern Kobo devices and in the app\'s full-screen view. Work at 1600 × 2560px so the cover stays sharp everywhere it appears.',
      },
      {
        title: 'Wrong aspect ratio',
        description: 'A square or non-standard shape gets cropped or letterboxed in Kobo\'s store grid. Use the standard 1.6:1 height-to-width ratio so the cover displays as intended.',
      },
    ],
    faq: [
      {
        q: 'Can I use my KDP cover for Kobo?',
        a: 'Yes. A 1600 × 2560px RGB JPEG that meets KDP\'s requirements also satisfies Kobo. A single well-prepared RGB cover works across KDP, Apple Books, and Kobo, so you rarely need a Kobo-specific export.',
      },
      {
        q: 'Does Kobo accept PNG covers?',
        a: 'Yes. Kobo accepts both JPEG and PNG in RGB color mode. JPEG is more common and produces smaller files with no visible quality loss for photographic covers.',
      },
      {
        q: 'Do I upload to Kobo directly or through an aggregator?',
        a: 'Both are possible. Kobo Writing Life is Kobo\'s direct platform, and aggregators like Draft2Digital also distribute to Kobo. The cover requirements are the same either way — a compliant RGB cover works through any route.',
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'cover-requirement', slug: 'amazon-kdp-ebook', label: 'Amazon KDP ebook cover requirements' },
      { type: 'cover-requirement', slug: 'apple-books-ebook', label: 'Apple Books ebook cover requirements' },
      { type: 'cover-requirement', slug: 'google-play-ebook', label: 'Google Play Books cover requirements' },
    ],
  },
  {
    slug: 'google-play-ebook',
    platform: 'Google Play Books',
    metaTitle: 'Google Play Books Cover Requirements — Size, Format, and File Specs',
    metaDescription: 'Google Play Books cover requirements: minimum 1400px on the shortest side, JPEG or PNG, RGB color mode, under 2MB recommended. Google can also generate a cover from the EPUB if none is supplied.',
    title: 'Google Play Books Cover Requirements',
    intro: '<p>Google Play Books accepts ebook covers as a separate upload alongside the EPUB, and also reads the cover embedded inside the file. Its requirements are close to Kobo\'s, but Google\'s content pipeline is particular about image quality and will down-rank listings with low-resolution or distorted covers in its store.</p>',
    specs: [
      { label: 'Minimum dimensions', value: '1400px on the shortest side' },
      { label: 'Ideal dimensions', value: '1600px wide × 2400px tall' },
      { label: 'Aspect ratio', value: 'Between 1.5:1 and 1.6:1 (height to width)' },
      { label: 'File formats', value: 'JPEG or PNG' },
      { label: 'Color mode', value: 'RGB' },
      { label: 'Maximum file size', value: '2MB recommended' },
    ],
    details: '<p>Google Play Books recommends a cover at least 1400px on the shortest side, in RGB, as JPEG or PNG. Google accepts a slightly wider range of aspect ratios than Apple (roughly 1.5:1 to 1.6:1), but a standard 1600 × 2560px cover sits safely inside that range. Google\'s system re-processes cover images for its store, so a clean, high-resolution source produces the best result across the web reader, Android, and iOS apps.</p><p>If no cover image is supplied, Google Play Books can generate one from the first page of the EPUB — but an auto-generated cover is almost never what you want for a store listing. Always supply a proper cover. As with all ebook platforms, use RGB, not CMYK, and confirm the embedded EPUB cover is declared with properties="cover-image" so it displays correctly in the reader.</p>',
    commonMistakes: [
      {
        title: 'Relying on Google\'s auto-generated cover',
        description: 'If you don\'t supply a cover, Google may generate one from the EPUB\'s first page. This looks unprofessional in the store. Always upload a proper cover image.',
      },
      {
        title: 'CMYK color from a print workflow',
        description: 'Google Play Books expects RGB. A CMYK cover can display with shifted colors after Google\'s processing. Export a dedicated RGB JPEG for the ebook.',
      },
      {
        title: 'Cover not declared in the EPUB manifest',
        description: 'Even when you upload a separate cover, the embedded EPUB cover should be declared with properties="cover-image" so it renders inside the Google reader. A missing declaration shows a blank where the cover belongs.',
      },
    ],
    faq: [
      {
        q: 'Does Google Play Books really generate a cover if I don\'t provide one?',
        a: 'Yes, Google can auto-generate a placeholder cover from the EPUB\'s content, but it is not designed for marketing and looks generic in the store. Always supply your own cover image for a professional listing.',
      },
      {
        q: 'What aspect ratio does Google Play Books prefer?',
        a: 'Google accepts a range from roughly 1.5:1 to 1.6:1 height-to-width. A standard 1600 × 2560px cover (1.6:1) sits inside that range and also matches KDP, Apple Books, and Kobo, so one file works everywhere.',
      },
      {
        q: 'Can I use one cover for Google Play, KDP, Apple, and Kobo?',
        a: 'Yes. A 1600 × 2560px RGB JPEG meets the requirements of all four stores. Prepare one compliant cover and it uploads cleanly across every major platform.',
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'cover-requirement', slug: 'kobo-ebook', label: 'Kobo ebook cover requirements' },
      { type: 'cover-requirement', slug: 'amazon-kdp-ebook', label: 'Amazon KDP ebook cover requirements' },
      { type: 'cover-requirement', slug: 'apple-books-ebook', label: 'Apple Books ebook cover requirements' },
    ],
  },
  {
    slug: 'barnes-noble-press-ebook',
    platform: 'Barnes & Noble Press',
    metaTitle: 'Barnes & Noble Press (Nook) Ebook Cover Requirements — Size and Format',
    metaDescription: 'Barnes & Noble Press ebook cover requirements for Nook: minimum 1400px on the short side, ideal 1600 × 2560px, JPEG, RGB color mode. Covers must meet the minimum to pass B&N processing.',
    title: 'Barnes & Noble Press (Nook) Ebook Cover Requirements',
    intro: '<p>Barnes &amp; Noble Press distributes ebooks to the Nook store and the B&N reading apps. Its cover requirements are close to KDP\'s, but B&N processes cover images for its store grid and full-screen reader, so a low-resolution or wrongly shaped cover displays poorly. The most common issues are below-minimum resolution and CMYK color.</p>',
    specs: [
      { label: 'Minimum dimensions', value: '1400px on the shortest side' },
      { label: 'Ideal dimensions', value: '1600px wide × 2560px tall' },
      { label: 'Aspect ratio', value: '1.6:1 (height to width)' },
      { label: 'File format', value: 'JPEG' },
      { label: 'Color mode', value: 'RGB' },
      { label: 'Maximum file size', value: '5MB' },
    ],
    details: '<p>Barnes &amp; Noble Press recommends a cover of at least 1400px on the shortest side, with 1600 × 2560px as the ideal, in RGB, as a JPEG. The standard 1.6:1 height-to-width ratio applies — a square or landscape image is cropped or letterboxed in the Nook store. B&N accepts JPEG as the primary cover format; a high-quality JPEG keeps the file size reasonable while preserving detail for the full-screen view.</p><p>As with every ebook platform, the cover must be RGB, not CMYK. Authors who publish print through B&N or another service and reuse the print cover file often hit color problems. Export a separate RGB JPEG for the Nook ebook, and confirm the embedded EPUB cover carries properties="cover-image" so it renders inside the B&N reader.</p>',
    commonMistakes: [
      {
        title: 'Reusing a CMYK print cover',
        description: 'B&N ebook covers must be RGB. A CMYK file from a print workflow can display with wrong colors or fail processing. Export a dedicated RGB JPEG for the Nook edition.',
      },
      {
        title: 'Cover below 1400px on the short side',
        description: 'A low-resolution cover looks soft in the Nook full-screen reader and store grid. Work at 1600 × 2560px so the cover stays crisp everywhere B&N displays it.',
      },
      {
        title: 'Non-standard aspect ratio',
        description: 'A cover that is not 1.6:1 gets cropped or letterboxed in the B&N store. Start from a 1600 × 2560px canvas to match the required shape.',
      },
    ],
    faq: [
      {
        q: 'Does Barnes & Noble Press accept PNG covers?',
        a: 'JPEG is the recommended and most reliable cover format for B&N Press. If you have a PNG, export it as a high-quality RGB JPEG at 1600 × 2560px before uploading to avoid processing issues.',
      },
      {
        q: 'Can I use my KDP cover for the Nook edition?',
        a: 'Yes. A 1600 × 2560px RGB JPEG that meets KDP\'s requirements also satisfies Barnes & Noble Press. One well-prepared RGB cover works across KDP, Nook, Kobo, and Google Play.',
      },
      {
        q: 'Why does my cover look fine locally but blurry in the Nook store?',
        a: 'B&N re-processes cover images for its store display. Starting from a below-minimum or heavily compressed file produces a soft result after processing. Upload a sharp 1600 × 2560px source to get a clean store display.',
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'cover-requirement', slug: 'amazon-kdp-ebook', label: 'Amazon KDP ebook cover requirements' },
      { type: 'cover-requirement', slug: 'kobo-ebook', label: 'Kobo ebook cover requirements' },
      { type: 'cover-requirement', slug: 'google-play-ebook', label: 'Google Play Books cover requirements' },
    ],
  },
  {
    slug: 'kdp-print-cover',
    platform: 'Amazon KDP Print',
    metaTitle: 'Amazon KDP Print Cover Requirements — PDF, Bleed, Spine, and Color Specs',
    metaDescription: 'KDP Print paperback and hardcover cover requirements: single full-wrap PDF, CMYK or RGB, 300 DPI, 0.125in bleed, spine width from KDP\'s calculator, and barcode placeholder area.',
    title: 'Amazon KDP Print Cover Requirements',
    intro: '<p>KDP Print paperback and hardcover covers are full-wrap PDF files — back cover, spine, and front in a single document — and are prepared completely differently from the ebook cover image. The most common failures are an incorrect spine width, missing bleed, and reusing the ebook cover image. KDP provides a cover template and calculator that removes most of the guesswork.</p>',
    specs: [
      { label: 'File format', value: 'PDF (single full-wrap document)' },
      { label: 'Resolution', value: '300 DPI' },
      { label: 'Color mode', value: 'CMYK or RGB (CMYK recommended for print accuracy)' },
      { label: 'Bleed', value: '0.125in (3.175mm) on all outer edges' },
      { label: 'Spine width', value: 'From KDP\'s cover calculator, based on page count and paper' },
      { label: 'Spine text', value: 'Allowed only above ~100 pages, kept clear of the fold' },
      { label: 'Barcode area', value: 'Lower right of back cover left clear for KDP\'s barcode' },
    ],
    details: '<p>KDP Print requires a single PDF containing the entire wrap: back cover on the left, spine in the middle, and front cover on the right. The total canvas size depends on trim size, page count, and paper type — KDP\'s Cover Calculator produces the exact dimensions and a template with the spine and bleed marked. Building on that template is the most reliable way to pass processing on the first attempt.</p><p>KDP Print is more flexible than IngramSpark about color, accepting both CMYK and RGB, though CMYK gives the most predictable printed result. Bleed of 0.125in is required on all outer edges so trimming does not leave white slivers. Leave the lower-right area of the back cover clear for KDP\'s barcode, which it adds automatically. Spine text is only allowed once the page count is high enough (around 100 pages) for a spine wide enough to hold it — thinner books must leave the spine blank.</p>',
    commonMistakes: [
      {
        title: 'Reusing the ebook cover image',
        description: 'The ebook cover is a single front-only RGB image. KDP Print needs a full-wrap PDF with back cover, spine, and front, plus bleed and a barcode area. Build the print cover separately from KDP\'s template.',
      },
      {
        title: 'Incorrect spine width',
        description: 'Spine width depends on final page count and paper type. Generating the cover before the interior is finalized produces the wrong spine. Use KDP\'s Cover Calculator with the final page count, and regenerate if the count changes.',
      },
      {
        title: 'No bleed or text too close to the trim edge',
        description: 'Without 0.125in bleed, trimming can leave white edges. Keep important text and logos inside the safe margin, away from both the trim edge and the spine folds.',
      },
    ],
    faq: [
      {
        q: 'Does KDP Print require CMYK like IngramSpark?',
        a: 'No. KDP Print accepts both CMYK and RGB PDFs, which makes it more forgiving than IngramSpark\'s strict PDF/X-1a CMYK requirement. CMYK is still recommended for the most predictable printed color, but an RGB PDF will process.',
      },
      {
        q: 'When can I add text to the spine?',
        a: 'KDP allows spine text only when the book has enough pages for a spine wide enough to hold it — generally around 100 pages or more. Below that threshold the spine must be left blank, since thin spines cannot print text reliably.',
      },
      {
        q: 'How do I get the right cover dimensions for my book?',
        a: 'Use KDP\'s Cover Calculator. Enter your trim size, page count, and paper type, and it outputs the exact full-wrap dimensions plus a template with spine and bleed marked. Build your cover on that template and regenerate it if the page count changes.',
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'cover-requirement', slug: 'ingramspark-print', label: 'IngramSpark print book cover requirements' },
      { type: 'cover-requirement', slug: 'amazon-kdp-ebook', label: 'Amazon KDP ebook cover requirements' },
      { type: 'platform-rejection', slug: 'amazon-kdp', label: 'Why Amazon KDP rejects ebooks' },
    ],
  },
  {
    slug: 'draft2digital-ebook',
    platform: 'Draft2Digital',
    metaTitle: 'Draft2Digital Ebook Cover Requirements — Size, Format, and Distribution Specs',
    metaDescription: 'Draft2Digital ebook cover requirements: minimum 1400px on the short side, ideal 1600 × 2560px, JPEG or PNG, RGB. One compliant cover distributes to Apple, Kobo, B&N, and more.',
    title: 'Draft2Digital Ebook Cover Requirements',
    intro: '<p>Draft2Digital is an aggregator: you upload one file and it distributes to Apple Books, Kobo, Barnes &amp; Noble, and many other stores. Because your cover flows through to every one of those retailers, it has to meet the strictest requirement in the chain — effectively Apple Books\' standard. Getting the D2D cover right means it passes everywhere D2D sends it.</p>',
    specs: [
      { label: 'Minimum dimensions', value: '1400px on the shortest side' },
      { label: 'Ideal dimensions', value: '1600px wide × 2560px tall' },
      { label: 'Aspect ratio', value: '1.6:1 (height to width)' },
      { label: 'File formats', value: 'JPEG or PNG' },
      { label: 'Color mode', value: 'RGB with sRGB profile' },
      { label: 'Maximum file size', value: '5MB' },
    ],
    details: '<p>Draft2Digital recommends a cover of at least 1400px on the shortest side, with 1600 × 2560px ideal, in RGB. Because D2D forwards your cover to Apple Books — the strictest validator — prepare the cover to Apple\'s standard: RGB with an embedded sRGB profile, at least 1400 × 2100px, no CMYK. A cover that would pass Apple Books directly will pass through D2D to every store in its network.</p><p>D2D accepts JPEG and PNG. A high-quality sRGB JPEG at 1600 × 2560px is the safest single file. Since the same cover reaches Apple, Kobo, B&N, and others, there is no benefit to targeting D2D\'s minimum — build to the ideal so the cover looks sharp on every store\'s full-screen reader.</p>',
    commonMistakes: [
      {
        title: 'Building to D2D\'s minimum instead of Apple\'s standard',
        description: 'D2D forwards covers to Apple Books, which is stricter. A cover that just meets D2D\'s floor can still be rejected downstream by Apple. Prepare to Apple\'s standard: sRGB, at least 1400 × 2100px, no CMYK.',
      },
      {
        title: 'CMYK color mode',
        description: 'Every store in D2D\'s network expects RGB. A CMYK cover fails or displays with shifted colors. Export a dedicated RGB/sRGB file for distribution.',
      },
      {
        title: 'Missing sRGB profile',
        description: 'Saving as RGB is not the same as embedding sRGB. Apple validates the profile at the byte level, so export explicitly with sRGB IEC 61966-2.1 to avoid a downstream rejection.',
      },
    ],
    faq: [
      {
        q: 'Why should I build my D2D cover to Apple Books\' standard?',
        a: 'Draft2Digital distributes your cover to Apple Books among other stores, and Apple runs the strictest validation. If the cover meets Apple\'s requirements — sRGB, minimum 1400 × 2100px, no CMYK — it meets D2D\'s requirements for distribution to every retailer in the network.',
      },
      {
        q: 'Can one cover serve D2D and a direct KDP upload?',
        a: 'Yes. A 1600 × 2560px sRGB JPEG meets both Draft2Digital\'s distribution requirements and KDP\'s direct requirements. Prepare one compliant cover and use it for D2D distribution and your direct Amazon upload.',
      },
      {
        q: 'Does Draft2Digital accept PNG covers?',
        a: 'Yes, D2D accepts JPEG and PNG in RGB. A high-quality sRGB JPEG is the most portable choice since it satisfies every store in the network with a smaller file size.',
      },
    ],
    relatedTool: 'cover-checker',
    related: [
      { type: 'cover-requirement', slug: 'apple-books-ebook', label: 'Apple Books ebook cover requirements' },
      { type: 'cover-requirement', slug: 'kobo-ebook', label: 'Kobo ebook cover requirements' },
      { type: 'cover-requirement', slug: 'barnes-noble-press-ebook', label: 'Barnes & Noble Press ebook cover requirements' },
    ],
  },
];

export function getCoverRequirementBySlug(slug) {
  return COVER_REQUIREMENTS.find(c => c.slug === slug) ?? null;
}
