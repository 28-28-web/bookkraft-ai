export const COVER_REQUIREMENTS = [
  {
    slug: 'amazon-kdp-ebook',
    platform: 'Amazon KDP',
    kind: 'ebook',
    hubLabel: 'Kindle ebook (Amazon KDP)',
    source: { label: 'KDP Help: eBook cover criteria and Cover Image Guidelines', url: 'https://kdp.amazon.com/en_US/help/topic/G200645690' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'Amazon KDP Ebook Cover Requirements — Size, Format, and File Specs',
    metaDescription: 'Amazon KDP ebook cover requirements: ideal 1600 × 2560px, minimum 625 × 1000px, JPEG or TIFF, RGB, under 50MB, 1.6:1 ratio. From KDP\'s help pages.',
    title: 'Amazon KDP Ebook Cover Requirements',
    intro: '<p>Amazon KDP requires a cover image inside every EPUB file — separate from the cover image you upload to the KDP product listing. Both must meet KDP\'s size and format requirements. The most common cover rejection reasons are images below the minimum dimensions and CMYK color profiles that KDP\'s system cannot process.</p>',
    specs: [
      { key: 'min', verified: true, label: 'Minimum dimensions', value: '625px wide × 1000px tall' },
      { key: 'ideal', verified: true, label: 'Ideal dimensions', value: '1600px wide × 2560px tall' },
      { key: 'max', verified: true, label: 'Maximum dimensions', value: '10,000px on either side' },
      { key: 'ratio', verified: true, label: 'Aspect ratio', value: '1.6:1 (height to width)' },
      { key: 'format', verified: true, label: 'File formats', value: 'JPEG or TIFF' },
      { key: 'color', verified: true, label: 'Color mode', value: 'RGB' },
      { key: 'maxSize', verified: true, label: 'Maximum file size', value: '50MB' },
    ],
    details: '<p>KDP states a minimum of 625px wide by 1000px tall, but recommends the ideal of 1600px × 2560px for the sharpest display across Kindle devices and the Kindle app. The 1.6:1 height-to-width aspect ratio is required — covers with a significantly different ratio will be stretched or cropped to fit KDP\'s display templates. Images must be in RGB color mode; CMYK images are rejected by KDP\'s image processor even though CMYK is standard for print covers. The maximum file size is 50MB, though standard cover images are well under 5MB in practice.</p><p>KDP accepts JPEG and TIFF. PNG is not listed as an accepted format in the current official specification — authors using PNG covers from design tools should convert to JPEG before including the image in their EPUB package.</p><p>KDP\'s Cover Image Guidelines also note that covers with fewer than 500 pixels on the shortest side are not displayed on the Amazon website. Figures verified from KDP Help — <a href="https://kdp.amazon.com/en_US/help/topic/G200645690" target="_blank" rel="noopener nofollow">eBook cover criteria (G200645690)</a> and <a href="https://kdp.amazon.com/en_US/help/topic/G6GTK3T3NUHKLEFX" target="_blank" rel="noopener nofollow">Cover Image Guidelines</a>. Last verified September 27, 2026.</p>',
    commonMistakes: [
      {
        title: 'Using a print cover directly',
        description: 'Print covers are designed at 300 DPI in CMYK color mode. KDP rejects CMYK images. Always export a separate RGB JPEG at the correct pixel dimensions for the ebook cover — do not reuse the print-ready PDF or TIFF.',
      },
      {
        title: 'Dimensions below the minimum',
        description: 'KDP\'s official minimum is 625px wide × 1000px tall (KDP Help topic G200645690); the ideal is 1600 × 2560px. KDP\'s Cover Image Guidelines note that covers with fewer than 500 pixels on the shortest side are not displayed on the website. Design at 1600 × 2560px so the cover stays sharp on high-DPI screens.',
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
      { type: 'guide', slug: 'kdp-quality-issues', label: 'KDP quality issues and quality notices' },
      { type: 'mistake', slug: 'ebook-cover-mistakes', label: '5 ebook cover mistakes that get files rejected' },
    ],
  },
  {
    slug: 'apple-books-ebook',
    platform: 'Apple Books',
    kind: 'ebook',
    hubLabel: 'Apple Books',
    source: { label: 'Apple Books Asset Guide: Book Cover Art', url: 'https://help.apple.com/itc/booksassetguide/en.lproj/static.html' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'Apple Books Ebook Cover Requirements — Size, Format, and Color Specs',
    metaDescription: 'Apple Books cover requirements: RGB color mode, at least 1400px on the shorter side, JPEG or PNG. No CMYK, no upscaled images. Plus export steps.',
    title: 'Apple Books Ebook Cover Requirements',
    intro: '<p>Apple Books asks for cover art in RGB color mode, at least 1400 pixels along the shorter side, as a high-quality JPEG or PNG. Apple also warns that excessively blurry or pixelated images are rejected, so never upscale a small image to reach the minimum.</p>',
    specs: [
      { key: 'min', verified: true, label: 'Minimum dimensions', value: '1400px on the shorter side' },
      { key: 'format', verified: true, label: 'File formats', value: 'JPEG or PNG' },
      { key: 'color', verified: true, label: 'Color mode', value: 'RGB' },
      { verified: true, label: 'CMYK', value: 'Not accepted (Apple requires RGB)' },
    ],
    details: '<p>Apple Books says cover art must use RGB color mode and should be at least 1400 pixels along the shorter side. Apple\'s guide doesn\'t name a color profile; exporting in sRGB is a common choice. The minimum is notably higher than KDP\'s 625×1000px floor — a cover that passes KDP\'s size check may still fail Apple Books. CMYK images don\'t meet Apple\'s RGB rule, and print covers are often designed in CMYK, so export a separate RGB file for the ebook.</p><h3 style="font-size:1rem;font-weight:700;margin:24px 0 10px">How to export a compliant Apple Books cover</h3><ol style="padding-left:1.4em;line-height:1.8;font-size:15px"><li><strong>Make the shorter side at least 1400px.</strong> Work larger if your design tool supports it — Apple Books scales down gracefully and the extra resolution gives you room if the image is ever reused elsewhere.</li><li><strong>Design in RGB color mode from the start.</strong> If the cover was built for print (CMYK), open it in Photoshop and go to Image → Mode → RGB Color before doing anything else. Converting late in the process reduces banding risk compared to converting the exported JPEG.</li><li><strong>Assign sRGB explicitly on export.</strong> In Photoshop: File → Export → Export As → Color Space → sRGB. In Affinity Photo: File → Export → JPEG → Color Space → sRGB IEC 61966-2.1. In Canva: download as PNG or JPEG — Canva exports sRGB by default. Do not rely on "Save for Web" with default settings; some versions omit the profile tag.</li><li><strong>Export as JPEG or PNG.</strong> JPEG at 90–100 quality is standard. PNG is accepted but produces larger files with no quality benefit for photographic covers. Avoid WebP, TIFF, or PDF — Apple Books does not accept these as the cover image file.</li><li><strong>Verify before embedding.</strong> Open the exported file in Preview (macOS) → Tools → Show Inspector → Color Model should read "RGB". On Windows, right-click → Properties → Details → Color representation. Run the file through BookKraft\'s Cover Checker to confirm the shorter side is at least 1400px before adding it to your EPUB.</li></ol>',
    commonMistakes: [
      {
        title: 'CMYK cover from print workflow',
        description: 'Print covers are designed in CMYK. Apple Books requires RGB. Export a separate RGB JPEG specifically for the ebook cover — do not extract the image from a print-ready PDF.',
      },
      {
        title: 'Cover below 1400px on the shorter side',
        description: 'Apple asks for at least 1400px along the shorter side — a higher floor than KDP\'s 625px minimum width. A 1000×1600px image that meets KDP\'s requirements is too small for Apple Books.',
      },
    ],
    faq: [
      {
        q: 'Does Apple Books accept PNG covers?',
        a: 'Yes. Apple Books accepts both JPEG and PNG cover images, provided they are in RGB color mode and meet the minimum dimensions. JPEG is more common and produces smaller file sizes.',
      },
      {
        q: 'My cover looks correct in Photoshop — why does Apple Books reject it as CMYK?',
        a: "Photoshop documents can be in RGB mode while still embedding a CMYK-derived profile from a previous color conversion. Open the image in Photoshop, go to Edit → Convert to Profile, select sRGB IEC 61966-2.1, and re-export. Use Image → Mode → RGB Color first if the document mode itself is CMYK.",
      },
      {
        q: 'Can I use the same cover image for KDP and Apple Books?',
        a: 'Only if the image meets Apple\'s higher size floor. Both stores require RGB (Kindle does not support CMYK), but KDP accepts covers as small as 625×1000px, while Apple asks for at least 1400px on the shorter side. A 1600×2560px RGB cover works for both. A CMYK cover from a print workflow works for neither — export a separate RGB file.',
      },
      {
        q: 'Does Apple Books require a minimum DPI for cover images?',
        a: 'Apple Books does not enforce a DPI (dots per inch) requirement for ebook covers — DPI is a print concept and has no technical meaning for screen-displayed images. What matters is the pixel dimension: at least 1400px on the shorter side. A 1400×2100px image at 72 DPI contains the same pixel data as one at 300 DPI; the DPI metadata tag does not affect acceptance.',
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
    kind: 'print',
    hubLabel: 'IngramSpark (print)',
    source: { label: 'IngramSpark Help: Cover File Creation', url: 'https://help.ingramspark.com/hc/en-us/articles/35306346735245-Cover-File-Creation' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'IngramSpark Print Book Cover Requirements — PDF, CMYK, Bleed, and Spine Specs',
    metaDescription: 'IngramSpark print cover requirements: full-spread PDF (PDF/X-1a recommended), CMYK, 300ppi, 0.125″ bleed, spine from the template, barcode on the back.',
    title: 'IngramSpark Print Book Cover Requirements',
    intro: '<p>IngramSpark print covers are fundamentally different from ebook cover images — they are full-wrap PDF files (front cover, spine, and back cover in a single document) and must be prepared in CMYK color mode, at print resolution, with bleed and a correctly calculated spine width. A design that works for KDP ebook covers requires a complete rebuild for IngramSpark print.</p>',
    specs: [
      { key: 'format', verified: true, label: 'File format', value: 'PDF of the full spread; PDF/X-1a:2001 recommended' },
      { key: 'color', verified: true, label: 'Color mode', value: 'CMYK' },
      { key: 'resolution', verified: true, label: 'Resolution', value: '300ppi' },
      { key: 'bleed', verified: true, label: 'Bleed', value: '0.125″ (3mm) on all four sides (hardcovers use a 0.625″ wrap)' },
      { key: 'spine', verified: true, label: 'Spine width', value: 'From IngramSpark\'s free cover template (page count, trim size and paper)' },
      { verified: true, label: 'ISBN barcode', value: 'Required on the back cover, 100% black on a white box' },
      { verified: true, label: 'Spot colors / PMS', value: 'Convert to CMYK before exporting the PDF' },
    ],
    details: '<p>IngramSpark recommends exporting the cover as PDF/X-1a:2001 — a PDF standard for print production built around CMYK color and embedded fonts. Its cover guidelines list CMYK as the color space and 300ppi as the resolution, so convert RGB images to CMYK before exporting.</p><p>The spine width is the most frequently miscalculated element. IngramSpark provides a template generator that calculates spine width from your page count, trim size, and selected paper stock (white standard, white premium, or cream). A spine width that doesn\'t match your final page count can get the cover file rejected. Download a fresh template after finalizing your interior page count — adding or removing pages changes the spine width.</p><p>IngramSpark requires a barcode on the back of every cover, in 100% black on a white box. Its free cover template includes one: you can move it within the back cover area, but don\'t resize it. If you don\'t supply a barcode, IngramSpark places one for you.</p>',
    commonMistakes: [
      {
        title: 'Submitting an RGB cover',
        description: 'IngramSpark\'s cover color space is CMYK, and it recommends PDF/X-1a:2001 for export. Convert all colors to CMYK and choose PDF/X-1a in your export settings.',
      },
      {
        title: 'Incorrect spine width',
        description: 'The spine width is calculated from page count × paper stock thickness. Adding or removing pages after generating the template requires a new template download — the old spine width is no longer correct. Use IngramSpark\'s template generator with your final page count.',
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
        a: "Check the export first. IngramSpark asks for CMYK at 300ppi and recommends PDF/X-1a:2001, and many online design tools export RGB PDFs by default. A tool with a PDF/X-1a export option, such as Adobe InDesign or Affinity Publisher, is the safer route.",
      },
      {
        q: 'Can I use a spot UV or foil finish on my IngramSpark cover?',
        a: "IngramSpark's cover guidelines ask for CMYK and say to convert spot colors to CMYK before exporting. For finishes such as spot UV or foil, check IngramSpark's current print options before you design for one.",
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
    kind: 'ebook',
    hubLabel: 'Kobo',
    source: { label: 'Kobo Writing Life: Cover Image Tips', url: 'https://kobowritinglife.zendesk.com/hc/en-us/articles/360059385711-Cover-Image-Tips' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'Kobo Ebook Cover Requirements — Size, Format, and Color Specs',
    metaDescription: 'Kobo cover requirements from Kobo Writing Life: portrait JPG or PNG, up to 5MB, 3:4 width-to-height to match Kobo screens, 300 DPI for best results.',
    title: 'Kobo Ebook Cover Requirements',
    intro: '<p>Kobo accepts ebook covers through Kobo Writing Life and through aggregators like Draft2Digital. Kobo\'s own guidance is short: a portrait image, no larger than 5MB, ideally shaped 3:4 to match Kobo\'s screens.</p>',
    specs: [
      { key: 'ratio', verified: true, label: 'Aspect ratio', value: '3:4 width to height (portrait), matching Kobo screens' },
      { key: 'format', verified: true, label: 'File formats', value: 'JPG/JPEG works best; PNG accepted' },
      { key: 'maxSize', verified: true, label: 'Maximum file size', value: '5MB' },
    ],
    details: '<p>Kobo Writing Life\'s cover tips ask for a portrait image no larger than 5MB. Kobo\'s device screens have a 3:4 width-to-height ratio, so Kobo suggests making the cover\'s width three quarters of its height. A JPG or JPEG works best; PNG is also accepted, and other formats may be prone to corruption. For best results use 300 DPI, though files as low as 72 DPI are fine.</p><p>Kobo does not publish a minimum pixel size for its own store. Some Kobo partner sites, such as Bol, need at least 500 × 500px. A 1600 × 2560px cover built for KDP will upload to Kobo, but it is taller than Kobo\'s 3:4 screens, so expect some letterboxing on Kobo devices.</p>',
    commonMistakes: [
      {
        title: 'Wrong aspect ratio',
        description: 'Kobo asks for a portrait cover. Its screens are 3:4 width to height, so a cover close to that shape fills the screen best. A landscape cover suits neither Kobo\'s devices nor its apps.',
      },
    ],
    faq: [
      {
        q: 'Can I use my KDP cover for Kobo?',
        a: 'Usually, yes. A KDP cover is a portrait JPEG, which Kobo accepts as long as it is no larger than 5MB. Kobo suggests a 3:4 width-to-height shape to match its screens, so a taller KDP cover may show small bars on Kobo devices.',
      },
      {
        q: 'Does Kobo accept PNG covers?',
        a: 'Yes. Kobo says JPG or JPEG works best and PNG files are also perfectly acceptable. Other formats may be prone to corruption.',
      },
      {
        q: 'Do I upload to Kobo directly or through an aggregator?',
        a: 'Both are possible. Kobo Writing Life is Kobo\'s direct platform, and aggregators like Draft2Digital also distribute to Kobo.',
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
    kind: 'ebook',
    hubLabel: 'Google Play Books',
    source: { label: 'Google Play Books Partner Center: Book file guidelines', url: 'https://support.google.com/books/partner/answer/3424254' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'Google Play Books Cover Requirements — Size, Format, and File Specs',
    metaDescription: 'Google Play Books cover requirements: JPEG, PNG, TIFF or PDF, 640px to 7,200px. The EPUB must contain the front cover; a separate cover file is optional.',
    title: 'Google Play Books Cover Requirements',
    intro: '<p>Google Play Books reads the cover embedded inside your EPUB, and you can also upload the cover as a separate file, which Google uses for the store thumbnail. Its published limits are loose — a 640px minimum and a 7,200px maximum — so a cover built for KDP or Apple Books fits easily.</p>',
    specs: [
      { key: 'min', verified: true, label: 'Minimum dimensions', value: '640px' },
      { key: 'format', verified: true, label: 'File formats', value: 'JPEG, PNG, TIFF or PDF' },
      { key: 'maxSize', verified: true, label: 'Maximum file size', value: '2GB per file' },
    ],
    details: '<p>Google Play Books accepts ebook cover files in JPEG, PNG, TIFF or PDF. Cover files need a minimum resolution of 640 pixels, and the maximum height and width are 7,200 pixels. Each uploaded file, cover included, must be under 2GB.</p><p>The EPUB itself must contain the front cover image. You can also send the cover as a separate file, and Google uses that file for the book\'s thumbnail in the store. Declare the embedded cover with properties="cover-image" so it displays correctly in the reader.</p>',
    commonMistakes: [
      {
        title: 'EPUB without a front cover image',
        description: 'Google\'s file guidelines say the EPUB must contain the front cover image. A separate cover upload is optional, but it does not replace the cover inside the file.',
      },
      {
        title: 'Cover not declared in the EPUB manifest',
        description: 'Even when you upload a separate cover, the embedded EPUB cover should be declared with properties="cover-image" so it renders inside the Google reader. A missing declaration shows a blank where the cover belongs.',
      },
    ],
    faq: [
      {
        q: 'Do I need to upload a separate cover file to Google Play Books?',
        a: 'No, but you can. The EPUB must contain the front cover image. If you also send the cover as a separate file, Google uses it for the book\'s thumbnail in the store.',
      },
      {
        q: 'What aspect ratio does Google Play Books prefer?',
        a: 'Google\'s file guidelines do not set an aspect ratio for ebook covers — only a 640px minimum and a 7,200px maximum. A standard 1600 × 2560px portrait cover works well and matches KDP\'s ideal.',
      },
      {
        q: 'Can I use one cover for Google Play, KDP, Apple, and Kobo?',
        a: 'Usually, yes. A 1600 × 2560px RGB JPEG fits Google\'s, KDP\'s and Apple\'s size rules. Kobo suggests a 3:4 shape for its screens, so check how the cover looks there.',
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
    kind: 'ebook',
    hubLabel: 'Barnes & Noble Press',
    source: { label: 'B&N Press Help: ePub Formatting Guide for eBooks', url: 'https://help-press.barnesandnoble.com/hc/en-us/articles/46990297345691' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'Barnes & Noble Press (Nook) Ebook Cover Requirements — Size and Format',
    metaDescription: 'Barnes & Noble Press ebook cover requirements for Nook: B&N recommends cover images of at least 1400px on each side, as JPG or PNG. Plus common mistakes.',
    title: 'Barnes & Noble Press (Nook) Ebook Cover Requirements',
    intro: '<p>Barnes &amp; Noble Press distributes ebooks to the Nook store and the B&N reading apps. B&N\'s ePub formatting guide gives one cover rule: images of at least 1400 pixels on each side, as .png or .jpg.</p>',
    specs: [
      { key: 'min', verified: true, label: 'Minimum dimensions', value: 'At least 1400px on each side' },
      { key: 'format', verified: true, label: 'File format', value: 'JPG or PNG' },
    ],
    details: '<p>Barnes &amp; Noble Press\'s ePub formatting guide recommends cover images of at least 1400 pixels on each side, and says images can be .png or .jpg — the choice is a trade-off between image quality and file size. A 1600 × 2560px portrait cover meets that minimum comfortably and matches KDP\'s ideal, so the same file can serve both stores.</p><p>Confirm the embedded EPUB cover carries properties="cover-image" so it renders inside the B&N reader.</p>',
    commonMistakes: [
      {
        title: 'Cover below 1400px on the short side',
        description: 'A low-resolution cover looks soft in the Nook full-screen reader and store grid. Work at 1600 × 2560px so the cover stays crisp everywhere B&N displays it.',
      },
    ],
    faq: [
      {
        q: 'Does Barnes & Noble Press accept PNG covers?',
        a: 'Yes. B&N\'s ePub formatting guide says images can be .png or .jpg, and leaves the choice to you based on image quality and file size. A high-quality JPG is usually the smaller file.',
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
    kind: 'print',
    hubLabel: 'KDP paperback',
    source: { label: 'KDP Help: Create a Paperback Cover', url: 'https://kdp.amazon.com/en_US/help/topic/G201953020' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'KDP Cover Size & Requirements 2026 — Bleed, Spine & PDF Specs',
    metaDescription: 'KDP print cover size and requirements: one full-wrap PDF, 0.125in bleed, spine width from KDP\'s calculator, spine text at 79+ pages, 300 DPI, CMYK.',
    title: 'Amazon KDP Print Cover Requirements',
    intro: '<p>KDP paperback covers are full-wrap PDF files — back cover, spine, and front in a single document — and are prepared completely differently from the ebook cover image. The most common failures are an incorrect spine width, missing bleed, and reusing the ebook cover image. KDP provides a cover template and calculator that removes most of the guesswork. Hardcover covers follow a separate KDP spec that uses a wrap instead of bleed.</p>',
    specs: [
      { key: 'format', verified: true, label: 'File format', value: 'PDF (single full-wrap document)' },
      { key: 'resolution', verified: true, label: 'Resolution', value: '300 DPI' },
      { key: 'color', verified: true, label: 'Color mode', value: 'CMYK recommended by KDP; avoid mixing color spaces in one file' },
      { key: 'bleed', verified: true, label: 'Bleed', value: '0.125in (3.175mm) on all outer edges' },
      { key: 'spine', verified: true, label: 'Spine width', value: 'From KDP\'s cover calculator, based on page count and paper' },
      { verified: true, label: 'Spine text', value: 'Only on books with at least 79 pages, kept clear of the fold' },
      { verified: true, label: 'Barcode area', value: 'Lower right of back cover left clear for KDP\'s barcode' },
    ],
    details: '<p>KDP requires a single PDF containing the entire paperback wrap: back cover on the left, spine in the middle, and front cover on the right. The total canvas size depends on trim size, page count, and paper type — KDP\'s Cover Calculator produces the exact dimensions and a template with the spine and bleed marked. Building on that template is the most reliable way to pass processing on the first attempt.</p><p>KDP\'s cover guidelines ask for images in CMYK and recommend against mixing color spaces in one file. Bleed of 0.125in is required on all outer edges so trimming does not leave white slivers. Leave the lower-right area of the back cover clear for KDP\'s barcode, which it adds automatically. Spine text is only allowed once the page count is high enough (at least 79 pages) for a spine wide enough to hold it — thinner books must leave the spine blank.</p>',
    commonMistakes: [
      {
        title: 'Reusing the ebook cover image',
        description: 'The ebook cover is a single front-only RGB image. A KDP paperback needs a full-wrap PDF with back cover, spine, and front, plus bleed and a barcode area. Build the print cover separately from KDP\'s template.',
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
        a: 'KDP\'s cover guidelines say images should be in CMYK so the cover prints well, and recommend against mixing color spaces in one file. Unlike IngramSpark, KDP\'s cover help does not call for a PDF/X-1a file.',
      },
      {
        q: 'When can I add text to the spine?',
        a: 'KDP says spine text needs at least 79 pages, so the spine is wide enough to hold it. Below that, leave the spine text off.',
      },
      {
        q: 'How do I get the right cover dimensions for my book?',
        a: 'Use KDP\'s Cover Calculator. Enter your trim size, page count, and paper type, and it outputs the exact full-wrap dimensions plus a template with spine and bleed marked. Build your cover on that template and regenerate it if the page count changes.',
      },
    ],
    quickAnswer: [
      { label: 'Cover dimensions', value: 'Trim size plus spine and bleed. Width = 0.125in + back cover + spine + front cover + 0.125in; height = trim height + 0.25in. KDP\'s cover calculator gives the exact numbers.' },
      { label: 'Bleed', value: '0.125in (3.175mm) on all outer edges' },
      { label: 'Spine', value: 'Width from KDP\'s cover calculator (page count and paper type). Spine text only on books with at least 79 pages.' },
      { label: 'Resolution', value: '300 DPI' },
      { label: 'PDF', value: 'One PDF with back cover, spine and front cover' },
      { label: 'Color space', value: 'CMYK recommended; avoid mixing color spaces' },
    ],
    quickAnswerCta: { href: 'https://kdp.amazon.com/en_US/cover-calculator', label: 'Get your exact cover size from KDP\'s cover calculator' },
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
    kind: 'ebook',
    hubLabel: 'Draft2Digital',
    source: { label: 'Draft2Digital Knowledge Base (FAQ)', url: 'https://www.draft2digital.com/knowledge-base/' },
    checkedOn: '2026-10-05',
    dateModified: '2026-10-05',
    metaTitle: 'Draft2Digital Ebook Cover Requirements — Size, Format, and Distribution Specs',
    metaDescription: 'Draft2Digital cover requirements: a 1600 × 2400 JPEG is ideal, most image formats are accepted, and D2D resizes it for each store. Show title and author.',
    title: 'Draft2Digital Ebook Cover Requirements',
    intro: '<p>Draft2Digital is an aggregator: you upload one file and it distributes to Apple Books, Kobo, Barnes &amp; Noble, and many other stores. D2D asks for a 1600 × 2400 JPEG as the ideal and resizes your cover for each store.</p>',
    specs: [
      { key: 'ideal', verified: true, label: 'Ideal dimensions', value: '1600px wide × 2400px tall (JPEG)' },
      { key: 'ratio', verified: true, label: 'Aspect ratio', value: 'Any tall rectangle; D2D resizes the cover for each store' },
      { key: 'format', verified: true, label: 'File formats', value: 'JPEG preferred; most common image formats accepted' },
    ],
    details: '<p>Draft2Digital asks for a JPEG at 1600 × 2400 pixels for the ebook, but says all it really needs is a tall rectangle: it accepts most common image formats and resizes the upload to meet the requirements of each store you distribute to. The cover must include the book title and the author name.</p><p>Because D2D forwards your cover to Apple Books, it is worth meeting Apple\'s rules too: RGB, at least 1400px on the shorter side, no CMYK. A 1600 × 2400 RGB JPEG meets both. D2D also builds a wraparound print cover from your ebook art if you publish print through it.</p>',
    commonMistakes: [
      {
        title: 'Building to D2D\'s minimum instead of Apple\'s standard',
        description: 'D2D resizes whatever you upload, but it forwards the cover to Apple Books. Make sure the file also meets Apple\'s rules: RGB, at least 1400px on the shorter side, no CMYK.',
      },
    ],
    faq: [
      {
        q: 'Why should I build my D2D cover to Apple Books\' standard?',
        a: 'Draft2Digital distributes your cover to Apple Books among other stores. If the cover meets Apple\'s requirements — RGB, at least 1400px on the shorter side, no CMYK — it also suits D2D, which asks for a 1600 × 2400 JPEG.',
      },
      {
        q: 'Can one cover serve D2D and a direct KDP upload?',
        a: 'Yes. D2D asks for 1600 × 2400 but resizes any tall rectangle, so a 1600 × 2560px RGB JPEG built to KDP\'s ideal works for both your D2D distribution and your direct Amazon upload.',
      },
      {
        q: 'Does Draft2Digital accept PNG covers?',
        a: 'Yes. D2D says it accepts most common image formats and asks for a JPEG at 1600 × 2400. A high-quality JPEG is the simplest choice.',
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
