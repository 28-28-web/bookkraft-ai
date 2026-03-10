// BookKraft AI v8.0 — 12 eBook Formatting Tool Definitions

export const TOOLS = [
    // ── FORMATTING CATEGORY ──────────────────────────────────────────────
    {
        slug: 'kindle-format-fixer',
        name: 'Kindle Format Fixer',
        category: 'formatting',
        desc: 'Fix smart quotes, em dashes, double spaces, and encoding errors from Word/Docs export. Instant results.',
        type: 'logic',
        accessType: 'logic', // requires Essentials Bundle
        creditCost: 0,
        free: false,
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
        desc: 'Generate a valid EPUB 3.0 file from your manuscript. Handles chapters, metadata, and cover image.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
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
        desc: 'Build a clickable, correctly formatted Table of Contents for Kindle, EPUB3, and NCX.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
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
        desc: 'AI-powered cleanup that catches context-dependent issues regex misses — dialogue punctuation, repeated words, clichés.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 3,
        free: false,
        hasSample: true,
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
        desc: 'Convert print-specific elements (page refs, footnotes, headers) to eBook-ready format using AI.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 3,
        free: false,
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
        desc: 'Generate title page, copyright page, dedication, and disclaimer from a simple form.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
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
        desc: 'AI writes your author bio, mailing list CTA, Also By section, and closing note.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 2,
        free: false,
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
        desc: 'Copy-paste CSS for drop caps, scene breaks, blockquotes, and more. Live preview included.',
        type: 'logic',
        accessType: 'logic',
        creditCost: 0,
        free: false,
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
        desc: 'Check your EPUB for errors before uploading. No Java required. Free, no signup needed.',
        type: 'logic',
        accessType: 'free',
        creditCost: 0,
        free: true,
        upsell: null,
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
        slug: 'style-sheet-auditor',
        name: 'Style Sheet Auditor',
        category: 'quality',
        desc: 'AI finds style inconsistencies that human editors charge $500+ to catch — names, capitalisation, dialogue.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 3,
        free: false,
        hasSample: true,
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
        desc: 'Create master metadata formatted for KDP, IngramSpark, Draft2Digital, and EPUB OPF. Free.',
        type: 'logic',
        accessType: 'free',
        creditCost: 0,
        free: true,
        upsell: { text: 'Metadata ready. Find the best KDP keywords →', tool: 'kdp-keyword-finder' },
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
        desc: 'AI-generated long-tail keywords and full Amazon category paths for maximum discoverability.',
        type: 'ai',
        accessType: 'ai',
        creditCost: 1,
        free: false,
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
