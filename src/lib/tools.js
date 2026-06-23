// BookKraft AI v8.0 — 12 eBook Formatting Tool Definitions

export const TOOLS = [
    // ── FORMATTING CATEGORY ──────────────────────────────────────────────
    {
        slug: 'kindle-format-fixer',
        name: 'Kindle Format Fixer',
        category: 'formatting',
        desc: 'Fix smart quotes, em dashes, double spaces, and encoding errors from Word or Google Docs exports. Formats your manuscript for Kindle KDP or EPUB instantly. No software needed.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
        seoContent: `<h2>Kindle Format Fixer for KDP Authors</h2><p>When you copy text from Word or Google Docs into KDP, you get broken quotes, weird dashes, and encoding errors that make your book look unprofessional. This tool fixes all of it in seconds.</p><h2>What It Fixes</h2><p>Smart quotes converted to straight quotes or proper curly quotes. Em dashes fixed from double hyphens. Double spaces removed. Tab indents converted to paragraph indents. Line breaks normalized. Encoding artifacts like â€™ converted back to readable characters. HTML tags stripped from Word paste.</p><h2>Who This Is For</h2><p>Authors moving manuscripts from Word or Google Docs to KDP. Anyone who has uploaded a book and seen strange characters appear in the Kindle preview. Formatters who want to clean client manuscripts before delivery.</p><h2>How to Use It</h2><p>Paste your manuscript text, select your target format (Kindle, EPUB, or both), choose which fixes to apply, and get clean text back instantly. No software to install, no file uploads needed.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is the Kindle Format Fixer free?","acceptedAnswer":{"@type":"Answer","text":"It is a logic tool included in the Essentials Bundle and Full Access plans. No AI credits are used."}},{"@type":"Question","name":"What encoding errors does it fix?","acceptedAnswer":{"@type":"Answer","text":"It fixes smart quotes, em dashes, double spaces, tab indents, line breaks, and encoding artifacts left over from Word or Google Docs exports."}},{"@type":"Question","name":"Do I need to install any software?","acceptedAnswer":{"@type":"Answer","text":"No. Paste your manuscript text directly into the browser tool and get clean text back instantly."}}]}</script>`,
        upsell: { text: 'Text cleaned. Build your TOC →', tool: 'toc-generator' },
        fields: [
            { id: 'text', label: 'Paste your manuscript text here', type: 'textarea', placeholder: 'Paste your text...' },
            {
                id: 'target', label: 'Format target', type: 'radio',
                options: [
                    { label: 'Kindle (KDP)', value: 'kindle' },
                    { label: 'EPUB', value: 'epub' },
                    { label: 'Both', value: 'both' },
                ],
            },
            {
                id: 'fixes', label: 'Fixes to apply', type: 'checkboxes', defaults: true,
                options: [
                    { id: 'smartQuotes', label: 'Fix smart quotes (straight → curly)' },
                    { id: 'emDashes', label: 'Fix em dashes (-- → —)' },
                    { id: 'doubleSpaces', label: 'Remove double spaces' },
                    { id: 'tabIndents', label: 'Convert tab indents to paragraph indent' },
                    { id: 'lineBreaks', label: 'Normalize line breaks (CRLF/CR → LF)' },
                    { id: 'doubleBlankLines', label: 'Remove double blank lines' },
                    { id: 'stripHtml', label: 'Strip HTML tags (for Word paste)' },
                    { id: 'fixEncoding', label: 'Fix encoding artifacts (â€™ → \' etc.)' },
                ],
            },
        ],
    },
    {
        slug: 'epub-formatter',
        name: 'EPUB Formatter',
        category: 'formatting',
        desc: 'Generate a valid EPUB 3.0 file directly from your manuscript. Handles chapter breaks, metadata, cover image embedding, and file structure automatically. No software or coding needed.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
        seoContent: `<h2>EPUB Formatter for Indie Authors</h2><p>Creating a valid EPUB file from scratch requires coding knowledge most authors don't have. This tool takes your manuscript and generates a properly structured EPUB 3.0 file automatically.</p><h2>DOCX to EPUB Converter — No Sigil or Calibre Required</h2><p>Takes your manuscript text and converts it into a valid EPUB 3.0 file. Handles chapter detection, metadata, cover image embedding, and file structure automatically. No Sigil, no Calibre, no coding required.</p><h2>Who This Is For</h2><p>Authors publishing to Apple Books, Kobo, or Google Play where EPUB is the required format. Anyone who finds Calibre too complicated. Formatters who want to deliver EPUB files quickly without manual coding.</p><h2>Convert Your Manuscript to EPUB 3.0 in 3 Steps</h2><p>Paste your manuscript, enter your book title and author name, upload a cover image if you have one, and download your EPUB file. The tool handles chapter breaks based on your heading style.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is the EPUB Formatter free?","acceptedAnswer":{"@type":"Answer","text":"It is a logic tool included in the Essentials Bundle and Full Access plans. No AI credits are used."}},{"@type":"Question","name":"Do I need Calibre or Sigil to make an EPUB?","acceptedAnswer":{"@type":"Answer","text":"No. This tool generates a valid EPUB 3.0 file directly from your manuscript text without any external software."}},{"@type":"Question","name":"Does it handle chapter breaks automatically?","acceptedAnswer":{"@type":"Answer","text":"Yes. The tool detects chapter breaks based on your heading style and structures the EPUB accordingly."}},{"@type":"Question","name":"Can I add a cover image?","acceptedAnswer":{"@type":"Answer","text":"Yes. Upload a cover image during the process and it gets embedded directly into the EPUB file."}}]}</script>`,
        upsell: { text: 'Download complete. Validate before uploading →', tool: 'epub-validator' },
        fields: [
            { id: 'manuscript', label: 'Paste your manuscript (use # for chapter headings)', type: 'textarea', placeholder: 'Chapter 1: The Beginning\n\nYour text here...' },
            { id: 'title', label: 'Book title', type: 'text', placeholder: 'My Book', required: true },
            { id: 'author', label: 'Author name', type: 'text', placeholder: 'Jane Doe', required: true },
            {
                id: 'language', label: 'Language', type: 'select',
                options: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch'],
            },
            { id: 'isbn', label: 'ISBN (optional)', type: 'text', placeholder: 'Leave blank if you don\'t have one' },
            { id: 'cover', label: 'Cover image (optional, JPG/PNG, max 5MB)', type: 'file', accept: 'image/jpeg,image/png' },
            {
                id: 'headingDetection', label: 'Heading detection', type: 'radio',
                options: [
                    { label: 'Auto-detect headings', value: 'auto' },
                    { label: 'Lines starting with #', value: 'hash' },
                    { label: 'All-caps lines', value: 'caps' },
                ],
            },
        ],
    },
    {
        slug: 'toc-generator',
        name: 'TOC Generator',
        category: 'formatting',
        desc: 'Build a clickable, correctly formatted Table of Contents for Kindle, EPUB3, and NCX. Paste your chapter headings and get clean, publish-ready TOC code in seconds. No signup needed.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
        seoContent: `<h2>Table of Contents Generator for Kindle and EPUB</h2><p>KDP requires a specific TOC format for Kindle books. Get it wrong and your book fails quality review. This tool generates the correct code for Kindle HTML, EPUB3 nav.xhtml, and NCX formats.</p><h2>Kindle and EPUB3 Table of Contents Code, Auto-Generated</h2><p>Clickable TOC in Kindle HTML format ready to paste into your manuscript. EPUB3 nav.xhtml for Apple Books and Kobo. NCX XML for older EPUB readers. Plain text TOC for print editions. Supports H1, H2, and H3 heading levels.</p><h2>Who This Is For</h2><p>Authors formatting their own books for KDP without hiring a formatter. Anyone who has had a book rejected for TOC errors. Formatters who want to generate clean TOC code without hand-coding it.</p><h2>Build a Clickable TOC From Your Chapter Headings</h2><p>Paste your manuscript or just your chapter headings, select which heading levels to include, choose your output format, and copy the generated TOC code directly into your file.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Does this work for both Kindle and EPUB?","acceptedAnswer":{"@type":"Answer","text":"Yes. It generates Kindle HTML, EPUB3 nav.xhtml, NCX XML, and plain text formats from the same input."}},{"@type":"Question","name":"Why does KDP reject books for TOC errors?","acceptedAnswer":{"@type":"Answer","text":"KDP requires a specific clickable TOC structure. A malformed TOC fails quality review even if the rest of the book is fine."}},{"@type":"Question","name":"How many heading levels are supported?","acceptedAnswer":{"@type":"Answer","text":"H1, H2, and H3 heading levels are all supported and selectable."}}]}</script>`,
        upsell: { text: 'TOC ready. Now generate your front matter pages →', tool: 'front-matter-generator' },
        fields: [
            { id: 'text', label: 'Paste your manuscript or chapter headings (one per line)', type: 'textarea', placeholder: 'Chapter 1: Beginning\nChapter 2: The Journey\n...' },
            {
                id: 'levels', label: 'Heading levels to include', type: 'checkboxes', defaults: true,
                options: [
                    { id: 'h1', label: 'H1 (chapters)' },
                    { id: 'h2', label: 'H2 (sections)' },
                    { id: 'h3', label: 'H3 (subsections)' },
                ],
            },
            {
                id: 'format', label: 'Output format', type: 'tabs',
                options: ['Kindle HTML', 'EPUB3 nav.xhtml', 'NCX XML', 'Plain Text'],
            },
            {
                id: 'prefix', label: 'Prefix style', type: 'radio',
                options: [
                    { label: 'Chapter 1:', value: 'chapter' },
                    { label: 'Part I:', value: 'part' },
                    { label: 'None', value: 'none' },
                ],
            },
        ],
    },
    {
        slug: 'manuscript-cleanup',
        name: 'Manuscript Cleanup',
        category: 'formatting',
        desc: 'AI-powered manuscript cleanup that catches dialogue punctuation errors, repeated words, and clichés that basic spell checkers always miss. Works for fiction and non-fiction up to 3,000 words.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 3,
        free: false,
        hasSample: true,
        seoContent: `<h2>AI Manuscript Cleanup for Authors</h2><p>Spell checkers miss the errors that actually matter — repeated words, dialogue punctuation mistakes, and clichés that weaken your prose. This tool catches what basic tools don't.</p><h2>AI Manuscript Editing Software for Dialogue and Repetition Errors</h2><p>Repeated words used too close together. Clichés that weaken your writing. Dialogue punctuation errors like missing commas before dialogue tags. Paragraph spacing issues. Works for both fiction and non-fiction manuscripts.</p><h2>Who This Is For</h2><p>Authors who want a clean manuscript before sending to a human editor. Writers self-editing their first draft. Anyone who has had an editor return a manuscript full of the same repeated corrections.</p><h2>Self-Edit Your Manuscript Before Sending to a Human Editor</h2><p>Paste up to 3,000 words, choose light or deep cleanup mode, select your genre, and get a marked-up version showing every issue found with suggested fixes.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the word limit?","acceptedAnswer":{"@type":"Answer","text":"Up to 3,000 words per run. A free 500-word sample is available before using credits."}},{"@type":"Question","name":"Does it work for non-fiction?","acceptedAnswer":{"@type":"Answer","text":"Yes. It works for both fiction and non-fiction manuscripts."}},{"@type":"Question","name":"What does it catch that spell checkers miss?","acceptedAnswer":{"@type":"Answer","text":"Repeated words used too close together, weak clichés, dialogue punctuation errors, and paragraph spacing issues."}}]}</script>`,
        upsell: { text: 'Manuscript cleaned. Now check style consistency →', tool: 'style-sheet-auditor' },
        fields: [
            { id: 'text', label: 'Paste your chapter (up to 3,000 words)', type: 'textarea', placeholder: 'Paste your chapter text here...' },
            {
                id: 'mode', label: 'Cleanup mode', type: 'radio',
                options: [
                    { label: 'Light — formatting only', value: 'light' },
                    { label: 'Deep — formatting + prose issues', value: 'deep' },
                ],
            },
            {
                id: 'genre', label: 'Genre', type: 'radio',
                options: [
                    { label: 'Fiction', value: 'fiction' },
                    { label: 'Non-fiction', value: 'nonfiction' },
                ],
            },
            {
                id: 'checks', label: 'Checks to apply', type: 'checkboxes', defaults: true,
                options: [
                    { id: 'repeatedWords', label: 'Flag repeated words (within 200 words)' },
                    { id: 'cliches', label: 'Flag clichés' },
                    { id: 'dialoguePunct', label: 'Fix dialogue punctuation' },
                    { id: 'paragraphSpacing', label: 'Fix paragraph spacing' },
                ],
            },
        ],
        wordLimit: 3000,
    },
    {
        slug: 'print-to-digital',
        name: 'Print-to-Digital Adapter',
        category: 'formatting',
        desc: 'Convert print-specific elements like page references, footnotes, and running headers into eBook-ready format using AI. Works for KDP and EPUB in minutes. Supports up to 4,000 words.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 3,
        free: false,
        seoContent: `<h2>Print to Digital Converter for Authors</h2><p>Print books contain elements that break in eBook format — page references, footnotes, running headers, and fixed-width tables. Converting them manually takes hours. This tool handles it automatically.</p><h2>What It Converts</h2><p>Page references like "see page 42" converted to chapter references. Footnotes moved to endnotes or inline parentheticals. Running headers removed. Fixed-width table descriptions rewritten for reflowable text. Figure references updated for digital format.</p><h2>Who This Is For</h2><p>Authors converting an existing print book to eBook format. Publishers bringing backlist titles to digital. Formatters converting academic or non-fiction titles with heavy footnote usage.</p><h2>How to Use It</h2><p>Paste up to 4,000 words of print-formatted text, select which elements to convert, choose your footnote format, and get eBook-ready text back instantly.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the word limit?","acceptedAnswer":{"@type":"Answer","text":"Up to 4,000 words per run."}},{"@type":"Question","name":"What print elements does it convert?","acceptedAnswer":{"@type":"Answer","text":"Page references, footnotes, running headers, fixed-width tables, and figure references."}},{"@type":"Question","name":"Is this useful for academic or non-fiction books?","acceptedAnswer":{"@type":"Answer","text":"Yes. It is especially useful for titles with heavy footnote usage common in academic and non-fiction print books."}}]}</script>`,
        upsell: { text: 'Conversion complete. Validate your EPUB after formatting →', tool: 'epub-validator' },
        fields: [
            { id: 'text', label: 'Paste your print-format text (up to 4,000 words)', type: 'textarea', placeholder: 'Paste your print text here...' },
            {
                id: 'adaptations', label: 'Elements to adapt', type: 'checkboxes', defaults: true,
                options: [
                    { id: 'pageRefs', label: 'Page references ("see page X" → "see Chapter X")' },
                    { id: 'footnotes', label: 'Footnotes' },
                    { id: 'runningHeaders', label: 'Running headers' },
                    { id: 'tables', label: 'Fixed-width table descriptions' },
                    { id: 'figureRefs', label: '"See figure X" references' },
                ],
            },
            {
                id: 'footnoteFormat', label: 'Footnote format', type: 'radio',
                options: [
                    { label: 'Endnotes', value: 'endnotes' },
                    { label: 'Inline parenthetical', value: 'inline' },
                    { label: 'EPUB3 pop-ups', value: 'popup' },
                ],
            },
        ],
        wordLimit: 4000,
    },

    // ── STRUCTURE CATEGORY ──────────────────────────────────────────────
    {
        slug: 'front-matter-generator',
        name: 'Front Matter Generator',
        category: 'structure',
        desc: 'Generate a professional title page, copyright page, dedication, and disclaimer for your book. Fill out a simple form and get publish-ready front matter for KDP instantly.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
        seoContent: `<h2>Front Matter Generator for Books</h2><p>Front matter is the first thing a reader sees when they open your book. Done wrong, it looks unprofessional. Done right, it signals that you take your work seriously. This tool generates every front matter section in the correct format for KDP and other platforms.</p><h2>What This Tool Generates</h2><p>Title page with your book title, subtitle, and author name formatted correctly. Copyright page with the right legal language, your ISBN, publisher name, and edition. Dedication page ready to personalize. Disclaimer page for fiction, health, finance, or general nonfiction books. Each section follows standard publishing conventions.</p><h2>Why Front Matter Formatting Matters</h2><p>KDP has specific requirements for how front matter should be structured. A title page that looks off or a copyright page missing key details can make your book look self-published in the wrong way. Readers notice these things even when they don't realize it.</p><h2>Who This Is For</h2><p>First-time authors who don't know what goes in a copyright page. Experienced authors who want to stop writing the same boilerplate for every book. Editors who want to deliver complete manuscripts to clients without spending extra time on formatting.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is this tool free?","acceptedAnswer":{"@type":"Answer","text":"It is a logic tool included in the Essentials Bundle and Full Access plans. No AI credits are used."}},{"@type":"Question","name":"What sections does it generate?","acceptedAnswer":{"@type":"Answer","text":"Title page, copyright page, dedication page, and a disclaimer page suited to fiction, health, finance, or general nonfiction."}},{"@type":"Question","name":"Does it follow KDP formatting requirements?","acceptedAnswer":{"@type":"Answer","text":"Yes. Each section follows standard publishing conventions and KDP front matter expectations."}}]}</script>`,
        upsell: { text: 'Front matter done. Write back matter →', tool: 'back-matter-generator' },
        fields: [
            { id: 'title', label: 'Book title', type: 'text', placeholder: 'My Amazing Book' },
            { id: 'subtitle', label: 'Subtitle (optional)', type: 'text', placeholder: '' },
            { id: 'author', label: 'Author name', type: 'text', placeholder: 'Jane Doe' },
            { id: 'penName', label: 'Pen name (optional)', type: 'text', placeholder: 'Publishing under a different name?' },
            { id: 'year', label: 'Copyright year', type: 'text', placeholder: new Date().getFullYear().toString() },
            { id: 'publisher', label: 'Publisher name', type: 'text', placeholder: 'Self-Published' },
            { id: 'isbn', label: 'ISBN (optional)', type: 'text', placeholder: '' },
            {
                id: 'edition', label: 'Edition', type: 'select',
                options: ['First', 'Second', 'Third', 'Revised', 'Updated'],
            },
            { id: 'dedication', label: 'Dedication text (optional)', type: 'textarea', placeholder: 'To my family...' },
            {
                id: 'disclaimer', label: 'Disclaimer type', type: 'radio',
                options: [
                    { label: 'None', value: 'none' },
                    { label: 'Fiction', value: 'fiction' },
                    { label: 'Health', value: 'health' },
                    { label: 'Finance', value: 'finance' },
                    { label: 'General', value: 'general' },
                ],
            },
            {
                id: 'sections', label: 'Include sections', type: 'checkboxes', defaults: true,
                options: [
                    { id: 'titlePage', label: 'Title Page' },
                    { id: 'copyrightPage', label: 'Copyright Page' },
                    { id: 'dedicationPage', label: 'Dedication' },
                    { id: 'disclaimerPage', label: 'Disclaimer' },
                ],
            },
        ],
    },
    {
        slug: 'back-matter-generator',
        name: 'Back Matter Generator',
        category: 'structure',
        desc: 'AI writes your author bio, mailing list call-to-action, Also By section, and closing note. Professional back matter for indie authors done in minutes. No formatting experience needed.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 2,
        free: false,
        seoContent: `<h2>Back Matter Generator for Books</h2><p>Most authors spend hours on back matter. Writing the acknowledgments, formatting the author bio, setting up the also-by page — it's tedious work that comes right at the end when you're already exhausted. This tool handles all of it.</p><h2>What Gets Generated</h2><p>Author bio written professionally in the tone you choose. Also By section listing your other titles cleanly. Reader list call-to-action to grow your mailing list. A note from the author for a personal touch. Acknowledgements section. Connect page with your social handles. Each section follows standard publishing conventions.</p><h2>Who This Is For</h2><p>Self-publishing authors who want professional back matter without hiring a formatter. Freelance editors who deliver complete manuscripts to clients. Anyone publishing more than one book a year who wants to stop rewriting the same sections from scratch.</p><h2>How to Use It</h2><p>Enter your author details, book title, and choose which sections you need. Select your tone and the tool generates everything instantly. Copy and paste directly into your manuscript.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many credits does this cost?","acceptedAnswer":{"@type":"Answer","text":"2 AI credits per generation."}},{"@type":"Question","name":"What sections can it generate?","acceptedAnswer":{"@type":"Answer","text":"Author bio, Also By section, reader list call-to-action, a note from the author, acknowledgements, and a connect/socials page."}},{"@type":"Question","name":"Can I choose the tone?","acceptedAnswer":{"@type":"Answer","text":"Yes. Choose warm, professional, or humorous tone before generating."}}]}</script>`,
        upsell: { text: 'Back matter done. Format your full manuscript for Kindle →', tool: 'kindle-format-fixer' },
        fields: [
            { id: 'author', label: 'Author name', type: 'text', placeholder: 'Jane Doe' },
            { id: 'background', label: 'Author background (2-3 sentences)', type: 'textarea', placeholder: 'Tell us about yourself...' },
            { id: 'bookTitle', label: 'Book title', type: 'text', placeholder: 'My Book' },
            {
                id: 'genre', label: 'Genre', type: 'select',
                options: ['Romance', 'Thriller', 'Mystery', 'Fantasy', 'Sci-Fi', 'Literary Fiction', 'Self-Help', 'Business', 'Memoir', 'How-To', 'Health', 'Other'],
            },
            { id: 'otherBooks', label: 'Other books (one per line)', type: 'textarea', placeholder: 'Title - One-liner description' },
            { id: 'mailingListUrl', label: 'Mailing list URL', type: 'text', placeholder: 'https://...' },
            { id: 'readerMagnet', label: 'Reader magnet / offer (optional)', type: 'text', placeholder: 'Free short story for subscribers' },
            { id: 'socials', label: 'Social media handles (optional)', type: 'text', placeholder: '@handle on Twitter, Facebook, etc.' },
            {
                id: 'tone', label: 'Tone', type: 'radio',
                options: [
                    { label: 'Warm & personal', value: 'warm' },
                    { label: 'Professional', value: 'professional' },
                    { label: 'Slightly humorous', value: 'humorous' },
                ],
            },
            {
                id: 'sections', label: 'Sections to include', type: 'checkboxes', defaults: true,
                options: [
                    { id: 'authorBio', label: 'Author Bio (short + long)' },
                    { id: 'alsoBy', label: 'Also By This Author' },
                    { id: 'readerList', label: 'Join My Reader List' },
                    { id: 'connect', label: 'Connect With the Author' },
                    { id: 'noteFromAuthor', label: 'A Note From the Author' },
                    { id: 'acknowledgements', label: 'Acknowledgements' },
                ],
            },
        ],
        wordLimit: 500,
    },
    {
        slug: 'css-snippet-generator',
        name: 'CSS Snippet Generator',
        category: 'structure',
        desc: 'Get copy-paste CSS for drop caps, scene breaks, blockquotes, pull quotes, and more. Live preview included. Optimized for Kindle KFX and EPUB stylesheets. No coding experience needed.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
        seoContent: `<h2>CSS Snippet Generator for EPUB and Kindle</h2><p>Styling an EPUB file by hand means hunting for CSS that actually works across Kindle, Apple Books, and Kobo. Most generic CSS breaks on at least one platform. This tool generates tested snippets optimized for each.</p><h2>What It Generates</h2><p>Drop cap CSS for chapter openers. Scene break styles. Blockquote and pull quote formatting. First-line indent styles. No-indent after heading rules. Centered text. Poetry and verse formatting. Sidebar boxes. Letter and dialogue styles. Each snippet includes a live preview so you see exactly what it looks like before copying.</p><h2>Who This Is For</h2><p>Authors hand-coding their own EPUB files. Formatters who want reliable CSS without testing on every device. Anyone who has had drop caps break on Kindle after looking fine in Sigil.</p><h2>How to Use It</h2><p>Select the element you need, choose your platform target (Kindle, EPUB, or both), and copy the generated CSS directly into your stylesheet.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is this tool free?","acceptedAnswer":{"@type":"Answer","text":"It is a logic tool included in the Essentials Bundle and Full Access plans. No AI credits are used."}},{"@type":"Question","name":"Will the CSS work on Kindle?","acceptedAnswer":{"@type":"Answer","text":"Yes. Each snippet is tested and optimized specifically for Kindle KFX as well as standard EPUB readers."}},{"@type":"Question","name":"What elements can I style?","acceptedAnswer":{"@type":"Answer","text":"Drop caps, scene breaks, blockquotes, pull quotes, first-line indents, centered text, poetry formatting, sidebar boxes, and dialogue styles."}}]}</script>`,
        upsell: { text: 'CSS ready. Validate your EPUB structure before uploading →', tool: 'epub-validator' },
        fields: [
            {
                id: 'element', label: 'Element', type: 'element-picker',
                options: [
                    { id: 'drop-cap', label: 'Drop Cap' },
                    { id: 'scene-break', label: 'Scene Break' },
                    { id: 'blockquote', label: 'Blockquote' },
                    { id: 'pull-quote', label: 'Pull Quote' },
                    { id: 'first-line-indent', label: 'First-Line Indent' },
                    { id: 'no-indent-after-heading', label: 'No-Indent After Heading' },
                    { id: 'centered-text', label: 'Centered Text' },
                    { id: 'poetry', label: 'Poetry/Verse' },
                    { id: 'sidebar-box', label: 'Sidebar Box' },
                    { id: 'letter-dialogue', label: 'Letter/Dialogue' },
                ],
            },
            {
                id: 'platform', label: 'Platform target', type: 'radio',
                options: [
                    { label: 'Kindle (KFX)', value: 'kindle' },
                    { label: 'EPUB Generic', value: 'epub' },
                    { label: 'Both (safe subset)', value: 'both' },
                ],
            },
        ],
    },

    // ── QUALITY CATEGORY ──────────────────────────────────────────────
    {
        slug: 'epub-validator',
        name: 'EPUB Validator',
        category: 'quality',
        desc: 'Check your EPUB file for errors before uploading to KDP or IngramSpark. No Java required. Catches structure errors, missing metadata, and content issues instantly. Free, no signup needed.',
        type: 'logic',
        accessType: 'free',
        creditCost: 0,
        free: true,
        upsell: null,
        seoContent: `<h2>EPUB Validator for KDP and IngramSpark</h2><p>An EPUB file can look fine on your computer and still fail upload to KDP or get rejected by Apple Books. This tool checks the file structure before you submit it anywhere.</p><h2>What It Checks</h2><p>Structure errors that break navigation. Missing required metadata fields. Content issues that cause store rejections. No Java installation or desktop software required, runs entirely in the browser.</p><h2>Who This Is For</h2><p>Authors about to upload an EPUB to KDP, IngramSpark, Apple Books, or Kobo. Anyone who has had a file rejected without a clear reason. Formatters validating client files before delivery.</p><h2>How to Use It</h2><p>Upload your .epub file, choose Quick Check for structure only or Full Check for structure plus content, and get results in seconds.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is the EPUB Validator free?","acceptedAnswer":{"@type":"Answer","text":"Yes. It is completely free with no signup, account, or credit card required."}},{"@type":"Question","name":"Do I need Java or desktop software?","acceptedAnswer":{"@type":"Answer","text":"No. The validator runs entirely in your browser. No installation needed."}},{"@type":"Question","name":"What is the difference between Quick Check and Full Check?","acceptedAnswer":{"@type":"Answer","text":"Quick Check reviews file structure only. Full Check reviews structure plus content issues for a more thorough validation."}}]}</script>`,
        fields: [
            { id: 'file', label: 'Drop your .epub file here or click to browse', type: 'file', accept: '.epub' },
            {
                id: 'level', label: 'Validation level', type: 'radio',
                options: [
                    { label: 'Quick Check (structure)', value: 'quick' },
                    { label: 'Full Check (structure + content)', value: 'full' },
                ],
            },
        ],
    },
    {
        slug: 'epub-validator-premium',
        name: 'EPUB Validator Pro',
        category: 'quality',
        desc: 'Deep EPUB validation — ghost spacing detection, duplicate ID scan, OPF manifest check, cover dimensions, and store-specific pass/fail report for KDP, Apple Books, and Google Play.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 2,
        free: false,
        seoContent: `<h2>EPUB Validator Pro for KDP and Apple Books</h2><p>The free EPUB validator catches basic structure errors. This tool goes deeper — ghost spacing, duplicate IDs, OPF manifest issues, and cover dimension problems that cause rejections on KDP, Apple Books, and Google Play.</p><h2>What It Checks</h2><p>Ghost spacing that breaks reflowable text. Duplicate ID errors that cause navigation failures. OPF manifest completeness. Cover image dimensions against store requirements. Store-specific pass/fail report for KDP, Apple Books, and Google Play so you know exactly where your file will be accepted.</p><h2>Who This Is For</h2><p>Authors who have had an EPUB rejected by a store without a clear reason. Formatters delivering files to clients who publish across multiple platforms. Anyone uploading to Apple Books or Google Play where validation requirements are stricter than KDP.</p><h2>How to Use It</h2><p>Upload your EPUB file and get a detailed report with pass/fail status for each store and specific fixes for every issue found.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How is this different from the free EPUB Validator?","acceptedAnswer":{"@type":"Answer","text":"The free validator checks basic structure. This Pro version checks ghost spacing, duplicate IDs, OPF manifest completeness, and cover dimensions against specific store requirements."}},{"@type":"Question","name":"How many credits does this cost?","acceptedAnswer":{"@type":"Answer","text":"2 AI credits per validation."}},{"@type":"Question","name":"Which stores does it check against?","acceptedAnswer":{"@type":"Answer","text":"Amazon KDP, Apple Books, and Google Play, each with a separate pass/fail result."}}]}</script>`,
        upsell: { text: 'Validation complete. Fix your EPUB structure →', tool: 'epub-formatter' },
        fields: [
            { id: 'file', label: 'Drop your .epub file here or click to browse', type: 'file', accept: '.epub' },
        ],
    },
    {
        slug: 'style-sheet-auditor',
        name: 'Style Sheet Auditor',
        category: 'quality',
        desc: 'AI scans your manuscript for style inconsistencies — character names, capitalisation, hyphenation, dialogue punctuation — that human editors charge hundreds to catch. Works up to 5,000 words.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 3,
        free: false,
        hasSample: true,
        seoContent: `<h2>Style Sheet Auditor for Manuscripts</h2><p>Human editors charge hundreds of dollars to catch style inconsistencies across a full manuscript. This tool scans your text and finds them in seconds — character name variations, capitalization changes, hyphenation inconsistencies, and dialogue punctuation style drift.</p><h2>What It Catches</h2><p>Character names spelled differently across chapters. Capitalization rules applied inconsistently. Hyphenation used in some places but not others for the same word. Dialogue punctuation style changing mid-manuscript. Number formatting inconsistencies. POV drift within scenes.</p><h2>Who This Is For</h2><p>Authors self-editing before sending to a professional editor. Editors building a style sheet for a new client manuscript. Anyone who has been told by a reader that character names seemed to change.</p><h2>How to Use It</h2><p>Paste up to 5,000 words, add your existing style sheet rules if you have them, select which categories to check, and get a detailed inconsistency report with locations and suggested fixes.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"What is the word limit?","acceptedAnswer":{"@type":"Answer","text":"Up to 5,000 words per run. A free sample is available before using credits."}},{"@type":"Question","name":"What inconsistencies does it catch?","acceptedAnswer":{"@type":"Answer","text":"Character name variations, capitalization drift, hyphenation inconsistencies, dialogue punctuation style changes, number formatting, and POV drift."}},{"@type":"Question","name":"Can I use my own style sheet rules?","acceptedAnswer":{"@type":"Answer","text":"Yes. You can add your existing style sheet rules and the tool checks against them alongside its standard checks."}}]}</script>`,
        upsell: { text: 'Style audit complete. Ready to format for Kindle? →', tool: 'kindle-format-fixer' },
        fields: [
            { id: 'text', label: 'Paste your chapter(s) — up to 5,000 words', type: 'textarea', placeholder: 'Paste your text...' },
            { id: 'styleSheet', label: 'Known style rules (optional)', type: 'textarea', placeholder: 'Paste your existing style sheet, or leave blank for auto-detection...' },
            {
                id: 'categories', label: 'Check these categories', type: 'checkboxes', defaults: true,
                options: [
                    { id: 'charNames', label: 'Character name consistency' },
                    { id: 'capitalisation', label: 'Capitalisation rules' },
                    { id: 'hyphenation', label: 'Hyphenation consistency' },
                    { id: 'dialoguePunct', label: 'Dialogue punctuation style' },
                    { id: 'numberFormat', label: 'Number formatting (digits vs words)' },
                    { id: 'povConsistency', label: 'POV consistency' },
                ],
            },
        ],
        wordLimit: 5000,
    },

    // ── PUBLISHING CATEGORY ──────────────────────────────────────────────
    {
        slug: 'metadata-builder',
        name: 'Metadata Builder',
        category: 'publishing',
        desc: 'Build complete book metadata formatted for KDP, IngramSpark, Draft2Digital, and EPUB OPF files. Includes keywords, BISAC categories, and pricing fields. Free tool for indie authors. No account required.',
        type: 'logic',
        accessType: 'free',
        creditCost: 0,
        free: true,
        upsell: { text: 'Metadata ready. Find the best KDP keywords →', tool: 'kdp-keyword-finder' },
        seoContent: `<h2>Metadata Builder for KDP and IngramSpark</h2><p>Book metadata is scattered across different formats depending on where you publish. KDP wants one format, IngramSpark another, EPUB OPF files yet another. This tool builds all of it at once from a single form.</p><h2>What It Generates</h2><p>Complete metadata for KDP, IngramSpark, Draft2Digital, and EPUB OPF files. Includes title, subtitle, series info, BISAC categories, keywords, short and long descriptions, ISBN/ASIN, publication date, edition, language, and pricing in USD, GBP, EUR, and AUD.</p><h2>Who This Is For</h2><p>Authors publishing the same book across multiple platforms who don't want to re-enter metadata each time. First-time authors unsure what BISAC categories or keywords to use. Anyone preparing a new release for KDP and IngramSpark at the same time.</p><h2>How to Use It</h2><p>Fill in your book details, categories, keywords, and pricing once. The tool formats everything correctly for each platform, ready to copy and paste.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"Is the Metadata Builder free?","acceptedAnswer":{"@type":"Answer","text":"Yes. It is free with no account or signup required."}},{"@type":"Question","name":"Which platforms does it support?","acceptedAnswer":{"@type":"Answer","text":"KDP, IngramSpark, Draft2Digital, and EPUB OPF files."}},{"@type":"Question","name":"Does it help with BISAC categories and keywords?","acceptedAnswer":{"@type":"Answer","text":"Yes. The form includes dedicated fields for BISAC categories and up to seven keywords formatted correctly for each platform."}}]}</script>`,
        fields: [
            { id: 'title', label: 'Book title', type: 'text', placeholder: 'My Book' },
            { id: 'subtitle', label: 'Subtitle (optional)', type: 'text', placeholder: '' },
            { id: 'authors', label: 'Author name(s)', type: 'text', placeholder: 'Jane Doe' },
            { id: 'series', label: 'Series name (optional)', type: 'text', placeholder: '' },
            { id: 'seriesVolume', label: 'Volume number (optional)', type: 'text', placeholder: '' },
            { id: 'bisacCategory1', label: 'BISAC Category 1', type: 'text', placeholder: 'Search categories...' },
            { id: 'bisacCategory2', label: 'BISAC Category 2 (optional)', type: 'text', placeholder: 'Search categories...' },
            { id: 'kw1', label: 'Keyword 1', type: 'text', placeholder: '' },
            { id: 'kw2', label: 'Keyword 2', type: 'text', placeholder: '' },
            { id: 'kw3', label: 'Keyword 3', type: 'text', placeholder: '' },
            { id: 'kw4', label: 'Keyword 4', type: 'text', placeholder: '' },
            { id: 'kw5', label: 'Keyword 5', type: 'text', placeholder: '' },
            { id: 'kw6', label: 'Keyword 6', type: 'text', placeholder: '' },
            { id: 'kw7', label: 'Keyword 7', type: 'text', placeholder: '' },
            { id: 'shortDesc', label: 'Short description (150 words max)', type: 'textarea', placeholder: '' },
            { id: 'longDesc', label: 'Long description (400 words max / 4000 chars for KDP)', type: 'textarea', placeholder: '' },
            { id: 'isbn', label: 'ISBN (optional)', type: 'text', placeholder: '' },
            { id: 'asin', label: 'ASIN (optional)', type: 'text', placeholder: '' },
            { id: 'pubDate', label: 'Publication date', type: 'text', placeholder: 'YYYY-MM-DD' },
            {
                id: 'edition', label: 'Edition', type: 'select',
                options: ['First', 'Second', 'Third', 'Revised', 'Updated'],
            },
            {
                id: 'language', label: 'Language', type: 'select',
                options: ['English', 'Spanish', 'French', 'German', 'Portuguese', 'Italian', 'Dutch'],
            },
            { id: 'priceUSD', label: 'Price (USD)', type: 'text', placeholder: '9.99' },
            { id: 'priceGBP', label: 'Price (GBP)', type: 'text', placeholder: '' },
            { id: 'priceEUR', label: 'Price (EUR)', type: 'text', placeholder: '' },
            { id: 'priceAUD', label: 'Price (AUD)', type: 'text', placeholder: '' },
        ],
    },
    {
        slug: 'kdp-keyword-finder',
        name: 'KDP Keyword & Category Finder',
        category: 'publishing',
        desc: 'Generate long-tail KDP keywords and full Amazon category paths for your book using AI. Improve your discoverability and reach more readers on Amazon. Results ready in seconds.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 1,
        free: false,
        seoContent: `<h2>KDP Keyword and Category Finder for Amazon Authors</h2><p>Most authors pick keywords by guessing. The ones who sell pick keywords based on what readers actually search for. This tool uses AI to generate long-tail keywords and full Amazon category paths matched to your specific book.</p><h2>What It Generates</h2><p>Long-tail keyword phrases that match real Amazon search behavior. Full Amazon category paths so you know exactly where to list your book. Keywords matched to your genre, themes, and target reader — not generic suggestions that apply to every book.</p><h2>Who This Is For</h2><p>Authors publishing on KDP who want better discoverability without paying for keyword research tools. Anyone whose book isn't getting found despite good reviews. Writers launching a new title who want to start with the right categories from day one.</p><h2>How to Use It</h2><p>Enter your book title, genre, target reader description, comparable titles, and key themes. The tool generates keyword phrases and category paths ready to paste directly into your KDP dashboard.</p><script type="application/ld+json">{"@context":"https://schema.org","@type":"FAQPage","mainEntity":[{"@type":"Question","name":"How many credits does this cost?","acceptedAnswer":{"@type":"Answer","text":"1 AI credit per generation."}},{"@type":"Question","name":"Does this replace Publisher Rocket?","acceptedAnswer":{"@type":"Answer","text":"It serves a similar purpose using AI instead of search-volume databases, generating long-tail keywords and category paths matched to your book’s genre and themes."}},{"@type":"Question","name":"What do I get as output?","acceptedAnswer":{"@type":"Answer","text":"Long-tail keyword phrases matched to real Amazon search behavior, plus full Amazon category paths ready to paste into KDP."}}]}</script>`,
        upsell: null,
        fields: [
            { id: 'title', label: 'Book title', type: 'text', placeholder: 'My Book' },
            {
                id: 'genre', label: 'Genre', type: 'select',
                options: [
                    'Cozy Mystery', 'Thriller', 'Romance', 'Fantasy', 'Sci-Fi', 'Literary Fiction',
                    'Horror', 'Historical Fiction', 'Self-Help', 'Business', 'Memoir', 'How-To',
                    'Health & Wellness', 'Finance', 'Parenting', 'Travel', 'Cooking', 'Other',
                ],
            },
            { id: 'reader', label: 'Target reader (2-3 sentences)', type: 'textarea', placeholder: 'Who reads this book?' },
            { id: 'comps', label: 'Comparable titles/authors', type: 'text', placeholder: 'Top 3 similar books or authors' },
            { id: 'themes', label: 'Key themes/topics', type: 'textarea', placeholder: 'Tropes, settings, topics, outcomes...' },
        ],
        wordLimit: 500,
    },
];

// Helper: find tool by slug
export function getToolBySlug(slug) {
    return TOOLS.find((t) => t.slug === slug) || null;
}

// Helper: get tools by category
export function getToolsByCategory(category) {
    if (category === 'all') return TOOLS;
    return TOOLS.filter((t) => t.category === category);
}