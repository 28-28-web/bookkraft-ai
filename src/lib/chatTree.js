// BookKraft AI — Chat Assistant Decision Tree

export const CHAT_TREE = {
    root: {
        message: "Hi! I'll help you find the right tool in under a minute. What do you need?",
        options: [
            { label: "I need to format my eBook", next: "format_q1" },
            { label: "I want to check my eBook for errors", next: "check_q1" },
            { label: "I need help publishing on Amazon KDP", next: "kdp_q1" },
            { label: "I want to make my eBook look more professional", next: "design_q1" },
            { label: "I'm not sure where to start", next: "unsure_q1" },
        ],
    },

    // ── FORMAT BRANCH ──
    format_q1: {
        message: "What format do you need to produce?",
        options: [
            { label: "Kindle (KDP / Amazon)", next: "format_kindle_q2" },
            { label: "EPUB (Apple, Kobo, Everywhere)", next: "format_epub" },
            { label: "Both Kindle and EPUB", next: "format_both" },
            { label: "I'm not sure which format", next: "format_unsure" },
        ],
    },
    format_kindle_q2: {
        message: "Is your manuscript clean, or is it messy from Word / Google Docs export?",
        options: [
            { label: "Clean and ready to format", next: "format_kindle_ready" },
            { label: "Messy — Word export issues, weird characters", next: "format_kindle_messy" },
        ],
    },
    format_kindle_ready: {
        message: "Perfect. Kindle Format Fixer will clean and prepare your text for KDP instantly. No AI, just fast.",
        options: [
            { label: "Open Kindle Format Fixer ($1)", next: null, toolLink: "/tools/kindle-format-fixer", toolPrice: "$1" },
            { label: "Tell me more about this tool", next: "explain_kindle_fixer" },
            { label: "Show me all tools", next: "all_tools" },
        ],
    },
    format_kindle_messy: {
        message: "You need two tools: Manuscript Cleanup first to fix prose issues, then Kindle Format Fixer to prepare for KDP.",
        options: [
            { label: "Start with Manuscript Cleanup ($1)", next: null, toolLink: "/tools/manuscript-cleanup", toolPrice: "$1" },
            { label: "What does Manuscript Cleanup fix?", next: "explain_manuscript_cleanup" },
            { label: "Get both tools for $2", next: null, toolLink: "/checkout?tools=manuscript-cleanup,kindle-format-fixer" },
        ],
    },
    format_epub: {
        message: "The EPUB Formatter builds a valid EPUB 3.0 file from your manuscript. It handles chapter structure, metadata, and cover image automatically.",
        options: [
            { label: "Open EPUB Formatter ($1)", next: null, toolLink: "/tools/epub-formatter", toolPrice: "$1" },
            { label: "What's the difference between EPUB and Kindle?", next: "explain_formats" },
            { label: "Show me all tools", next: "all_tools" },
        ],
    },
    format_both: {
        message: "For both formats, start with Manuscript Cleanup to fix your text, then use Kindle Format Fixer for KDP and EPUB Formatter for EPUB.",
        options: [
            { label: "Get Full Access — all 11 tools ($9.99)", next: null, toolLink: "/checkout?plan=full", toolPrice: "$9.99" },
            { label: "Show me individual tools", next: "all_tools" },
        ],
    },
    format_unsure: {
        message: "Try the free EPUB Validator first — it checks your file and tells you exactly what format issues exist.",
        options: [
            { label: "Open Free EPUB Validator", next: null, toolLink: "/tools/epub-validator" },
            { label: "Explain the difference between EPUB and Kindle", next: "explain_formats" },
        ],
    },

    // ── CHECK BRANCH ──
    check_q1: {
        message: "What kind of errors are you worried about?",
        options: [
            { label: "File structure errors (will it upload?)", next: "check_structure" },
            { label: "Consistency errors (names, style, punctuation)", next: "check_consistency" },
            { label: "General formatting issues", next: "check_general" },
            { label: "I don't know — check everything", next: "check_all" },
        ],
    },
    check_structure: {
        message: "The free EPUB Validator checks your file structure, manifest, metadata, and chapter links. No signup needed.",
        options: [
            { label: "Open Free EPUB Validator", next: null, toolLink: "/tools/epub-validator" },
            { label: "What errors does it find?", next: "explain_epub_validator" },
            { label: "I also need to fix the errors", next: "check_fix_errors" },
        ],
    },
    check_fix_errors: {
        message: "The EPUB Formatter fixes structural errors. For prose and text issues, use Manuscript Cleanup. Or get both for $2.",
        options: [
            { label: "EPUB Formatter ($1)", next: null, toolLink: "/tools/epub-formatter", toolPrice: "$1" },
            { label: "Manuscript Cleanup ($1)", next: null, toolLink: "/tools/manuscript-cleanup", toolPrice: "$1" },
            { label: "Get both for $2", next: null, toolLink: "/checkout?tools=epub-formatter,manuscript-cleanup" },
        ],
    },
    check_consistency: {
        message: "The Style Sheet Auditor catches name spelling inconsistencies, capitalisation errors, dialogue punctuation — the things human editors charge $500+ to find.",
        options: [
            { label: "Open Style Sheet Auditor ($1)", next: null, toolLink: "/tools/style-sheet-auditor", toolPrice: "$1" },
            { label: "How does it work?", next: "explain_style_auditor" },
        ],
    },
    check_general: {
        message: "Start with Kindle Format Fixer for encoding and formatting fixes, then use Style Sheet Auditor for deeper analysis.",
        options: [
            { label: "Kindle Format Fixer ($1)", next: null, toolLink: "/tools/kindle-format-fixer", toolPrice: "$1" },
            { label: "Style Sheet Auditor ($1)", next: null, toolLink: "/tools/style-sheet-auditor", toolPrice: "$1" },
            { label: "Get Full Access ($9.99)", next: null, toolLink: "/checkout?plan=full", toolPrice: "$9.99" },
        ],
    },
    check_all: {
        message: "Start with the free EPUB Validator for structure. Then use Style Sheet Auditor for content consistency.",
        options: [
            { label: "Open Free EPUB Validator first", next: null, toolLink: "/tools/epub-validator" },
            { label: "Get Full Access — all tools ($9.99)", next: null, toolLink: "/checkout?plan=full", toolPrice: "$9.99" },
        ],
    },

    // ── KDP BRANCH ──
    kdp_q1: {
        message: "Which part of KDP do you need help with?",
        options: [
            { label: "Finding the right keywords", next: "kdp_keywords" },
            { label: "Writing my book description", next: "kdp_description" },
            { label: "Setting up categories", next: "kdp_keywords" },
            { label: "Calculating royalties", next: "kdp_royalties" },
        ],
    },
    kdp_keywords: {
        message: "The KDP Keyword & Category Finder gives you 7 optimised keyword phrases and the exact full category path — tailored to your specific genre and audience.",
        options: [
            { label: "Open KDP Keyword Finder ($1)", next: null, toolLink: "/tools/kdp-keyword-finder", toolPrice: "$1" },
            { label: "How do KDP keywords work?", next: "explain_kdp_keywords" },
        ],
    },
    kdp_description: {
        message: "I don't have a description writer tool yet — but it's coming soon. The Back Matter Generator writes your Amazon bio and CTA copy.",
        options: [
            { label: "Open Back Matter Generator ($1)", next: null, toolLink: "/tools/back-matter-generator", toolPrice: "$1" },
            { label: "Show me all tools", next: "all_tools" },
        ],
    },
    kdp_royalties: {
        message: "The free Metadata Builder includes pricing fields. It shows your metadata formatted for KDP, IngramSpark, and more.",
        options: [
            { label: "Open Free Metadata Builder", next: null, toolLink: "/tools/metadata-builder" },
        ],
    },

    // ── DESIGN BRANCH ──
    design_q1: {
        message: "Which aspect of the design are you working on?",
        options: [
            { label: "Interior — drop caps, scene breaks, fonts", next: "design_interior" },
            { label: "Front and back pages", next: "design_frontback" },
            { label: "Table of contents", next: "design_toc" },
        ],
    },
    design_interior: {
        message: "The CSS Snippet Generator gives you copy-paste CSS for drop caps, scene breaks, blockquotes, pull quotes, and more. Live preview included. No coding needed.",
        options: [
            { label: "Open CSS Snippet Generator ($1)", next: null, toolLink: "/tools/css-snippet-generator", toolPrice: "$1" },
            { label: "What's a drop cap?", next: "explain_drop_cap" },
        ],
    },
    design_frontback: {
        message: "Front Matter Generator builds your title page, copyright page, and dedication. Back Matter Generator writes your author bio, mailing list CTA, and Also By section.",
        options: [
            { label: "Front Matter Generator ($1)", next: null, toolLink: "/tools/front-matter-generator", toolPrice: "$1" },
            { label: "Back Matter Generator ($1)", next: null, toolLink: "/tools/back-matter-generator", toolPrice: "$1" },
            { label: "Get both for $2", next: null, toolLink: "/checkout?tools=front-matter-generator,back-matter-generator" },
        ],
    },
    design_toc: {
        message: "The TOC Generator detects your chapter headings and builds a properly linked, Kindle-compatible table of contents automatically.",
        options: [
            { label: "Open TOC Generator ($1)", next: null, toolLink: "/tools/toc-generator", toolPrice: "$1" },
            { label: "Why does my TOC matter?", next: "explain_toc" },
        ],
    },

    // ── UNSURE BRANCH ──
    unsure_q1: {
        message: "No problem. One question: where are you in the process?",
        options: [
            { label: "I just finished writing my manuscript", next: "unsure_finished" },
            { label: "I have a print book I want to convert", next: "unsure_print" },
            { label: "I already have an eBook file but it has problems", next: "check_q1" },
            { label: "I'm just exploring what's available", next: "all_tools" },
        ],
    },
    unsure_finished: {
        message: "Great. Here's the recommended workflow:\n1. Manuscript Cleanup\n2. Kindle Format Fixer (or EPUB Formatter)\n3. TOC Generator\n4. Front Matter Generator\n5. EPUB Validator (free)",
        options: [
            { label: "Get Full Access — all 11 tools ($9.99)", next: null, toolLink: "/checkout?plan=full", toolPrice: "$9.99" },
            { label: "Start with Manuscript Cleanup ($1)", next: null, toolLink: "/tools/manuscript-cleanup", toolPrice: "$1" },
            { label: "Show me all tools", next: "all_tools" },
        ],
    },
    unsure_print: {
        message: "The Print-to-Digital Adapter converts page references, footnotes, running headers, and print-specific formatting to digital-ready content.",
        options: [
            { label: "Open Print-to-Digital Adapter ($1)", next: null, toolLink: "/tools/print-to-digital", toolPrice: "$1" },
            { label: "What changes between print and digital?", next: "explain_print_digital" },
        ],
    },

    // ── ALL TOOLS ──
    all_tools: {
        message: "Here are all 12 tools. The best value is Full Access — all 11 paid tools for $9.99 one-time.",
        options: [
            { label: "Get Full Access ($9.99)", next: null, toolLink: "/checkout?plan=full", toolPrice: "$9.99" },
            { label: "Show me individual tool prices", next: null, toolLink: "/dashboard" },
            { label: "Start over", next: "root" },
        ],
    },

    // ── EXPLANATION NODES ──
    explain_kindle_fixer: {
        message: "Kindle Format Fixer runs entirely in your browser. It fixes: smart quotes, em dashes, double spaces, tab indents, line ending issues, and encoding errors from Word/Docs export. Instant results, no AI needed.",
        options: [
            { label: "Open Kindle Format Fixer ($1)", next: null, toolLink: "/tools/kindle-format-fixer", toolPrice: "$1" },
            { label: "Go back", next: "root" },
        ],
    },
    explain_epub_validator: {
        message: "The EPUB Validator checks: mimetype file, container.xml, OPF manifest, chapter file integrity, nav.xhtml, NCX file, cover image, and spine order. It gives you a plain-English report with severity levels.",
        options: [
            { label: "Open Free EPUB Validator", next: null, toolLink: "/tools/epub-validator" },
            { label: "Go back", next: "root" },
        ],
    },
    explain_formats: {
        message: "Kindle (MOBI/KFX) only works on Amazon devices and apps. EPUB works everywhere else — Apple Books, Kobo, Nook, libraries. If you're only on Amazon, use Kindle. If you want to be everywhere, you need both.",
        options: [
            { label: "I want Kindle only", next: "format_kindle_q2" },
            { label: "I want EPUB", next: "format_epub" },
            { label: "I want both", next: "format_both" },
        ],
    },
    explain_toc: {
        message: "On Kindle, readers can tap the TOC icon to jump between chapters. If your TOC links are broken or missing, you get 1-star reviews about navigation. KDP also uses the TOC to index your book.",
        options: [
            { label: "Open TOC Generator ($1)", next: null, toolLink: "/tools/toc-generator", toolPrice: "$1" },
            { label: "Go back", next: "root" },
        ],
    },
    explain_manuscript_cleanup: {
        message: "Manuscript Cleanup uses Claude AI to fix: dialogue punctuation inconsistencies, mixed quote styles, repeated words, orphaned formatting tags, and prose-level issues that regex can't catch. It shows you a before/after diff.",
        options: [
            { label: "Open Manuscript Cleanup ($1)", next: null, toolLink: "/tools/manuscript-cleanup", toolPrice: "$1" },
            { label: "Go back", next: "root" },
        ],
    },
    explain_drop_cap: {
        message: "A drop cap is a large decorative first letter at the start of a chapter — like you see in printed novels. The CSS Snippet Generator gives you the CSS code to create this effect in your eBook.",
        options: [
            { label: "Open CSS Snippet Generator ($1)", next: null, toolLink: "/tools/css-snippet-generator", toolPrice: "$1" },
            { label: "Go back", next: "root" },
        ],
    },
    explain_style_auditor: {
        message: "The Style Sheet Auditor uses AI to find: character name spelling changes, capitalisation inconsistencies, mixed dialogue punctuation, number formatting shifts (digits vs words), and POV slippage.",
        options: [
            { label: "Open Style Sheet Auditor ($1)", next: null, toolLink: "/tools/style-sheet-auditor", toolPrice: "$1" },
            { label: "Go back", next: "root" },
        ],
    },
    explain_kdp_keywords: {
        message: "KDP gives you 7 keyword slots. Most authors waste them on obvious terms. This tool finds long-tail keywords you can actually rank for, plus the exact Amazon category paths for maximum discoverability.",
        options: [
            { label: "Open KDP Keyword Finder ($1)", next: null, toolLink: "/tools/kdp-keyword-finder", toolPrice: "$1" },
            { label: "Go back", next: "root" },
        ],
    },
    explain_print_digital: {
        message: "Print books have page references ('see page 47'), footnotes, running headers, and fixed layouts. None of these work in eBooks. This tool converts them all to digital-friendly formats automatically.",
        options: [
            { label: "Open Print-to-Digital Adapter ($1)", next: null, toolLink: "/tools/print-to-digital", toolPrice: "$1" },
            { label: "Go back", next: "root" },
        ],
    },
};
