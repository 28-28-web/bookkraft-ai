'use client';

import Link from 'next/link';
import TrackedLink from '@/components/TrackedLink';
import ChecklistOptin from '@/components/ChecklistOptin';
import RelatedLinks from '@/components/RelatedLinks';

const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
        {
            '@type': 'Question',
            name: 'What file format does KDP require for ebooks?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'KDP\'s suggested formats are EPUB, Word (DOC/DOCX) and KPF files from Kindle Create. KDP lists PDF only as an additional ebook format, for some languages. EPUB gives you full control over structure, styling, and metadata. KDP converts your upload internally to KFX for delivery. KDP no longer accepts MOBI: it ended MOBI support for reflowable ebooks on August 1, 2021 and for fixed-layout ebooks on March 18, 2025.',
            },
        },
        {
            '@type': 'Question',
            name: 'Do I need to validate my EPUB before uploading to KDP?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Yes. KDP accepts many structurally broken EPUBs and silently fixes or drops content during conversion — meaning your book can look fine in your editor and still render incorrectly on Kindle devices. Apple Books and IngramSpark can reject malformed files. Validating before submission catches errors before any store sees the file.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I create a clickable Table of Contents for Kindle?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'A Kindle-compatible TOC requires a nav.xhtml navigation document (EPUB3) and a toc.ncx file for older devices (EPUB2 fallback). Both must be declared in the OPF manifest. A proper navigation TOC is required, and Kindle uses it for navigation.',
            },
        },
        {
            '@type': 'Question',
            name: 'What metadata is required for KDP EPUB uploads?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The EPUB spec requires dc:title, dc:creator, dc:language (as a BCP 47 tag such as "en"), and dc:identifier. In the KDP dashboard you also add a book description and choose categories. KDP uses its own categories, not BISAC codes. Keywords are optional: you can add up to 7.',
            },
        },
        {
            '@type': 'Question',
            name: 'Why does my ebook look broken after converting from Word?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Word documents carry hidden formatting: straight quotes that convert inconsistently, double spaces, Tab-based indentation, encoding artifacts (â€™ instead of apostrophes), and stacked blank paragraphs used for spacing. EPUB converters interpret these literally, producing visible errors in the final file. Running a cleanup pass before converting removes most of these.',
            },
        },
        {
            '@type': 'Question',
            name: 'What is the difference between EPUB Formatter and Full Manuscript Mode?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'EPUB Formatter takes pasted text and generates a valid EPUB 3 — works for any source manuscript regardless of format. Full Manuscript Mode accepts .docx or .txt file uploads, runs automatic formatting fixes (smart quotes, em dashes, encoding artifacts) before building the EPUB. If you are uploading from Word, Full Manuscript Mode handles both the cleanup and the EPUB generation in one step.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I fix common EPUB errors before uploading to KDP?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'The most common fixable errors are: missing manifest resource (add the file to OPF manifest), cover image not declared (add properties="cover-image" in EPUB3, or meta name="cover" in EPUB2), missing NCX navigation (regenerate toc.ncx), malformed XHTML (find and close the unclosed tag), and duplicate IDs (rename one occurrence). Run your EPUB through a validator first to identify which errors are present.',
            },
        },
        {
            '@type': 'Question',
            name: 'How do I format images for Kindle ebooks?',
            acceptedAnswer: {
                '@type': 'Answer',
                text: 'Interior images must be JPEG or PNG in RGB color mode. CMYK images (prepared for print) produce washed-out colors on screen. KDP recompresses and resizes images during conversion to KFX, so start with the highest resolution available. For transparent PNG images, test in Kindle Previewer — some device themes render transparency as a black background. Ebook cover images must meet KDP pixel and ratio requirements; use a cover checker to confirm dimensions before uploading.',
            },
        },
    ],
};

const TOOL_LINKS = {
    wordCleanup: { href: '/tools/word-cleanup', label: 'Word Manuscript Cleanup Checker', note: 'free' },
    manuscriptCleanup: { href: '/tools/manuscript-cleanup', label: 'Manuscript Cleanup', note: '1 credit; free 500-word sample' },
    epubFormatter: { href: '/tools/epub-formatter', label: 'EPUB Formatter', note: 'Starter plan' },
    epubValidator: { href: '/tools/epub-validator', label: 'EPUB Validator', note: 'free' },
    epubValidatorPro: { href: '/tools/epub-validator-premium', label: 'EPUB Validator Pro', note: '3 credits' },
    manuscriptMode: { href: '/tools/manuscript-mode', label: 'Full Manuscript Mode', note: 'free' },
    kindleFormatFixer: { href: '/tools/kindle-format-fixer', label: 'Kindle Format Fixer', note: 'Starter plan' },
    tocGenerator: { href: '/tools/toc-generator', label: 'TOC Generator', note: 'Starter plan' },
    coverChecker: { href: '/tools/cover-checker', label: 'Cover Checker', note: 'free' },
    cssSnippet: { href: '/tools/css-snippet-generator', label: 'CSS Snippet Generator', note: 'Starter plan' },
    metadataBuilder: { href: '/tools/metadata-builder', label: 'Metadata Builder', note: 'free' },
    kdpKeywordFinder: { href: '/tools/kdp-keyword-finder', label: 'KDP Keyword & Category Finder', note: '2 credits' },
    frontMatter: { href: '/tools/front-matter-generator', label: 'Front Matter Generator', note: 'Starter plan' },
    backMatter: { href: '/tools/back-matter-generator', label: 'Back Matter Generator', note: '3 credits' },
    styleSheetAuditor: { href: '/tools/style-sheet-auditor', label: 'Style Sheet Auditor', note: '1 credit; free 500-word sample' },
};

const LINK_STYLE = { color: '#9c7f35', textDecoration: 'none', fontWeight: 600 };

function ToolCta({ tools }) {
    return (
        <div style={{ display: 'flex', gap: 10, flexWrap: 'wrap', marginTop: 16 }}>
            {tools.map((t) => (
                <TrackedLink
                    key={t.href}
                    href={t.href}
                    style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        padding: '8px 16px',
                        border: '1px solid rgba(201,168,76,0.45)',
                        borderRadius: 8,
                        color: '#9c7f35',
                        fontWeight: 600,
                        fontSize: 14,
                        textDecoration: 'none',
                        background: 'rgba(201,168,76,0.04)',
                    }}
                >
                    {t.label} →
                    {t.note && (
                        <span style={{ fontSize: 11, opacity: 0.7, fontWeight: 400 }}>({t.note})</span>
                    )}
                </TrackedLink>
            ))}
        </div>
    );
}

function Section({ number, h2, children, tools, last }) {
    return (
        <div style={{ marginBottom: 48, paddingBottom: 40, borderBottom: last ? 'none' : '1px solid rgba(0,0,0,0.07)' }}>
            <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 14, lineHeight: 1.25 }}>
                <span style={{ color: 'rgba(0,0,0,0.3)', fontSize: 14, fontWeight: 400, display: 'block', marginBottom: 4 }}>{number}</span>
                {h2}
            </h2>
            {children}
            {tools && <ToolCta tools={tools} />}
        </div>
    );
}

const faqs = [
    {
        q: 'What file format does KDP require for ebooks?',
        a: 'KDP\'s suggested formats are EPUB, Word (DOC/DOCX) and KPF files from Kindle Create. KDP lists PDF only as an additional ebook format, for some languages. EPUB gives you full control over structure, styling, and metadata. KDP converts your upload internally to KFX for delivery. KDP no longer accepts MOBI: it ended MOBI support for reflowable ebooks on August 1, 2021 and for fixed-layout ebooks on March 18, 2025.',
    },
    {
        q: 'Do I need to validate my EPUB before uploading to KDP?',
        a: 'Yes. KDP accepts many structurally broken EPUBs and silently fixes or drops content during conversion — meaning your book can look fine in your editor and still render incorrectly on Kindle devices. Apple Books and IngramSpark can reject malformed files. Validating before submission catches errors before any store sees the file.',
    },
    {
        q: 'How do I create a clickable Table of Contents for Kindle?',
        a: 'A Kindle-compatible TOC requires a nav.xhtml navigation document (EPUB3) and a toc.ncx file for older devices (EPUB2 fallback). Both must be declared in the OPF manifest. A proper navigation TOC is required, and Kindle uses it for navigation.',
    },
    {
        q: 'What metadata is required for KDP EPUB uploads?',
        a: 'The EPUB spec requires dc:title, dc:creator, dc:language (as a BCP 47 tag such as "en"), and dc:identifier. In the KDP dashboard you also add a book description and choose categories. KDP uses its own categories, not BISAC codes. Keywords are optional: you can add up to 7.',
    },
    {
        q: 'Why does my ebook look broken after converting from Word?',
        a: 'Word documents carry hidden formatting: straight quotes that convert inconsistently, double spaces, Tab-based indentation, encoding artifacts, and stacked blank paragraphs used for spacing. EPUB converters interpret these literally, producing visible errors in the final file. Running a cleanup pass before converting removes most of these.',
    },
    {
        q: 'What is the difference between EPUB Formatter and Full Manuscript Mode?',
        a: 'EPUB Formatter takes pasted text and generates a valid EPUB 3 — works for any source manuscript. Full Manuscript Mode accepts .docx or .txt file uploads, runs automatic formatting fixes before building the EPUB. If you are uploading from Word, Full Manuscript Mode handles both cleanup and EPUB generation in one step.',
    },
    {
        q: 'How do I fix common EPUB errors before uploading to KDP?',
        a: 'The most common fixable errors are: missing manifest resource (add the file to OPF manifest), cover image not declared (add properties="cover-image" in EPUB3), missing NCX navigation (regenerate toc.ncx), malformed XHTML (close the unclosed tag), and duplicate IDs (rename one occurrence). Run your EPUB through a validator first to identify which errors are present.',
    },
    {
        q: 'How do I format images for Kindle ebooks?',
        a: 'Interior images must be JPEG or PNG in RGB color mode. CMYK images produce washed-out colors on screen. KDP recompresses images during conversion to KFX, so start with the highest resolution available. For transparent PNGs, test in Kindle Previewer — some device themes render transparency as a black background.',
    },
];

export default function KdpFormattingGuidePage() {
    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
            />
            <main style={{ maxWidth: 880, margin: '0 auto', padding: '64px 20px', color: 'var(--ink, #1a1a1a)' }}>
                <h1 style={{ fontFamily: "var(--font-playfair),serif", fontSize: 'clamp(32px,5vw,52px)', fontWeight: 700, lineHeight: 1.1, marginBottom: 20 }}>
                    KDP Formatting Guide for Kindle &amp; eBooks
                </h1>

                <p style={{ fontSize: 18, lineHeight: 1.65, marginBottom: 48, opacity: 0.88 }}>
                    This KDP formatting guide shows you how to format your book for Kindle, one step at a time. It covers manuscript preparation, headings, paragraphs, chapter breaks, the table of contents, images, EPUB, validation and a final upload checklist. Each step links to a tool that does the job. New to the platform? Start with <Link href="/blog/what-is-amazon-kdp-guide-for-new-authors" style={LINK_STYLE}>what Amazon KDP is</Link> for how publishing and royalties work first.
                </p>

                {/* ── 1. OVERVIEW ── */}
                <Section number="Section 1" h2="KDP formatting — what the process actually involves">
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Most authors expect to write a book, convert it to EPUB, and upload it. The actual process has more steps — and the ones that get skipped are the ones that cause rejections. KDP enforces structural rules that are invisible in Word or Google Docs but become critical once the file is converted and delivered to a reader.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        The formatting workflow has four phases: <strong>prepare</strong> (clean the manuscript, build TOC and front/back matter), <strong>build</strong> (generate a valid EPUB file), <strong>validate</strong> (confirm the file passes structural checks), and <strong>publish</strong> (complete metadata, categories, and keyword fields before submitting). Skipping any phase means fixing problems after KDP or Apple Books rejects the file — which takes longer than getting it right before upload.
                    </p>
                </Section>

                <ChecklistOptin source="checklist-kdp-formatting-guide" />

                {/* ── 2. MANUSCRIPT PREPARATION ── */}
                <Section
                    number="Section 2"
                    h2="Manuscript preparation — clean up before you convert"
                    tools={[TOOL_LINKS.wordCleanup, TOOL_LINKS.manuscriptCleanup, TOOL_LINKS.frontMatter]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Word and Google Docs store text in ways that break when converted to reflowable ebook formats. The problems are invisible in your editor but show up in the final EPUB: straight quotes instead of curly typographic quotes, double spaces after periods, Tab-based paragraph indentation that produces double-indentation on some Kindle devices, encoding artifacts (<code>â€™</code> instead of an apostrophe), and stacked blank paragraphs used as visual spacing that EPUB converters interpret inconsistently.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Two rules matter before you convert. Indents and spacing have their own section below.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>Remove double spaces</strong> — they look bad in some EPUB readers.</li>
                        <li><strong>Avoid character-level formatting overrides</strong> — formatting applied via Ctrl+B is stored differently from style-based formatting and may not survive EPUB conversion cleanly on all devices.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        The <Link href="/tools/word-cleanup" style={LINK_STYLE}>Word Manuscript Cleanup Checker</Link> scans your .docx for double spaces, straight quotes, stacked blank paragraphs, and stray formatting — free, no signup. For prose-level cleanup (dialogue punctuation errors, repeated words, clichés), the <Link href="/tools/manuscript-cleanup" style={LINK_STYLE}>Manuscript Cleanup</Link> tool runs AI analysis on any length manuscript, with a free 500-word sample run available first.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        Add your front matter before you convert, too. The <Link href="/tools/front-matter-generator" style={LINK_STYLE}>Front Matter Generator</Link> builds the title page, copyright page, dedication and disclaimer. For spacing, indentation and font standards, see the <Link href="/manuscript-format" style={LINK_STYLE}>ebook manuscript format guide</Link>.
                    </p>
                </Section>

                {/* ── 3. HEADINGS ── */}
                <Section
                    number="Section 3"
                    h2="Headings — how to format chapter titles for Kindle"
                    tools={[TOOL_LINKS.tocGenerator]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Kindle formatting starts with headings. Converters and TOC tools find your chapters by their heading style. If a chapter title is not styled as a heading, it can be missed.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>Use real heading styles.</strong> In Word, apply Heading 1 to every chapter title. Use Heading 2 for sections inside a chapter. Do not fake a heading with bold, large body text.</li>
                        <li><strong>Consistent heading style.</strong> Use one heading style for every chapter opener — H1, H2, or a styled paragraph — and keep the format identical throughout. Mixing &ldquo;Chapter One&rdquo;, &ldquo;Chapter 1&rdquo;, and bare numerals across chapters breaks automated TOC generators and looks inconsistent in quality review.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        Once your headings are set, the <Link href="/tools/toc-generator" style={LINK_STYLE}>TOC Generator</Link> can build the table of contents from them.
                    </p>
                </Section>

                {/* ── 4. PARAGRAPHS ── */}
                <Section
                    number="Section 4"
                    h2="Paragraphs — indents and spacing"
                    tools={[TOOL_LINKS.kindleFormatFixer]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Paragraph formatting is where most Word files go wrong. Set indents and spacing with styles. Never set them with the Tab key, the spacebar or extra Returns.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>Use paragraph styles for spacing</strong> — not blank lines between paragraphs or double Return presses. EPUB converters interpret stacked blank paragraphs as ghost spacing that creates inconsistent gaps across devices.</li>
                        <li><strong>Set first-line indentation in CSS</strong> — not with Tab or spacebar. Tab-indented paragraphs produce double-indentation on some Kindle models.</li>
                        <li><strong>First paragraph after a heading.</strong> Publishing convention is no indent on the first paragraph of a chapter (after the heading) and a first-line indent on all subsequent paragraphs. This is set in CSS (<code>{'p.first { text-indent: 0; }'}</code>), not by manually removing indentation in the document.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        The <Link href="/tools/kindle-format-fixer" style={LINK_STYLE}>Kindle Format Fixer</Link> converts tab indents to paragraph indents. It also removes double spaces and double blank lines in the same pass. Included in the Starter plan.
                    </p>
                </Section>

                {/* ── 5. CHAPTER BREAKS ── */}
                <Section
                    number="Section 5"
                    h2="Chapter breaks — new pages and scene breaks"
                    tools={[TOOL_LINKS.cssSnippet, TOOL_LINKS.manuscriptCleanup]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Chapter formatting does not have a single required format — but it must be consistent across every chapter. Inconsistency is what readers and quality reviewers notice first.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>Scene breaks.</strong> The standard for marking a scene break within a chapter is three asterisks (<code>***</code>), a hash (<code>#</code>), or a decorative ornament. Plain blank lines are unreliable — EPUB converters often collapse them or flag them as ghost spacing. Whatever marker you choose, use it in every scene break in the book.</li>
                        <li><strong>Page breaks via CSS, not blank lines.</strong> Each new chapter should open on a fresh page via CSS (<code>break-before: page</code>), not by pressing Return multiple times. Stacked empty paragraphs collapse differently across devices and sometimes disappear entirely in conversion.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        <Link href="/tools/css-snippet-generator" style={LINK_STYLE}>CSS Snippet Generator</Link> outputs page break rules, scene break styles, and drop cap CSS with live previews. <Link href="/tools/manuscript-cleanup" style={LINK_STYLE}>Manuscript Cleanup</Link> flags inconsistent heading formats and stacked paragraph breaks before they reach the converter — 1 credit per run, free 500-word sample. For how chapters map to files and the spine, see <Link href="/chapter-breaks-epub" style={LINK_STYLE}>chapter breaks in EPUB</Link>.
                    </p>
                </Section>

                {/* ── 6. TOC ── */}
                <Section
                    number="Section 6"
                    h2="Table of contents — KDP requirements and structure"
                    tools={[TOOL_LINKS.tocGenerator]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        A clickable, correctly structured Table of Contents is required for Kindle books. A missing or malformed TOC is one of the most consistent reasons books fail KDP quality review.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>EPUB3 nav.xhtml.</strong> The primary TOC lives in a navigation document marked with <code>epub:type=&quot;toc&quot;</code> on the <code>&lt;nav&gt;</code> element. Each entry points to a chapter heading via a relative link inside the EPUB package.</li>
                        <li><strong>NCX fallback.</strong> An NCX (<code>toc.ncx</code>) is optional in EPUB 3; some authors include one alongside the nav document for older EPUB 2 reading systems.</li>
                        <li><strong>Navigation TOC.</strong> A proper navigation TOC is required. Kindle uses it for navigation, so readers can jump between chapters. Declare nav.xhtml in the OPF manifest with <code>properties=&quot;nav&quot;</code>.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        <Link href="/tools/toc-generator" style={LINK_STYLE}>TOC Generator</Link> outputs correctly structured Kindle HTML, EPUB3 nav.xhtml, and NCX XML from your chapter headings — paste your manuscript or just your headings, select output format, and copy the result. Included in the Starter plan. For full nav.xhtml and toc.ncx examples, see the <Link href="/epub-toc-guide" style={LINK_STYLE}>EPUB table of contents guide</Link>.
                    </p>
                </Section>

                {/* ── 7. IMAGES ── */}
                <Section
                    number="Section 7"
                    h2="Image formatting and resolution requirements"
                    tools={[TOOL_LINKS.coverChecker]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Images in Kindle ebooks have different requirements from print. Getting the format and color mode wrong is a common source of rejections that is easy to prevent.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>RGB, not CMYK.</strong> Ebook cover images and interior images must be in RGB color mode. CMYK images — typically prepared for offset print — produce washed-out or shifted colors in ebook readers. KDP does not convert color modes automatically.</li>
                        <li><strong>Format: JPEG or PNG.</strong> These are the only image formats supported inside EPUB packages. Images in EMF or WMF (often embedded by Word) will trigger validation errors. Save any affected images as PNG or JPG from the original source before converting.</li>
                        <li><strong>Resolution.</strong> Print images require 300 DPI at printed size. Ebook images render on screen, where 72–96 DPI is sufficient. High-resolution images increase file size without improving screen quality. Images prepared for print are safe to include in an ebook — they will not look worse, just add file size.</li>
                        <li><strong>Cover dimensions.</strong> KDP has specific minimum pixel requirements and a recommended aspect ratio for ebook cover images. Consult KDP&apos;s current cover image guidelines for exact values — these have been updated over time.</li>
                        <li><strong>Transparency.</strong> PNG supports transparency; JPEG does not. Transparent PNGs may render with a black or white background depending on the reader&apos;s theme. Test in Kindle Previewer before uploading, or flatten to a white background to avoid unpredictable rendering.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        <Link href="/tools/cover-checker" style={LINK_STYLE}>Cover Checker</Link> validates your ebook cover against KDP and Apple Books dimension and format requirements before you upload — free, no signup.
                    </p>
                </Section>

                {/* ── 8. FONTS ── */}
                <Section
                    number="Section 8"
                    h2="Font selection and embedding for ebooks"
                    tools={[TOOL_LINKS.cssSnippet]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Font choice in ebooks is different from print. Most EPUB readers — including Kindle — let users switch to their preferred reading font at any time. Font selection matters most for the fallback when no user override is active, and for custom fonts you embed in the EPUB package.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>Safe system font stacks.</strong> If you do not embed a custom font, the device uses its built-in default. Declaring an explicit <code>font-family</code> stack makes the fallback intentional. Common stacks: <code>Georgia, &apos;Times New Roman&apos;, serif</code> for fiction body text; <code>Helvetica, Arial, sans-serif</code> for non-fiction with heavy structure.</li>
                        <li><strong>Serif vs sans-serif.</strong> Long-form prose traditionally uses a serif face — serifs assist horizontal tracking across lines on screen. Sans-serif works for shorter text, callouts, and non-fiction that reads in chunks. Pick one for body text and apply it consistently.</li>
                        <li><strong>Embedding custom fonts.</strong> A font embedded in the EPUB appears as &ldquo;Publisher Font&rdquo; in Kindle&apos;s font menu. Embedded fonts must be declared in the manifest and referenced via a CSS <code>@font-face</code> rule. Only embed fonts whose license permits EPUB redistribution — most commercial font licenses do not include it without a separate ebook license. Free fonts from Google Fonts generally permit embedding.</li>
                        <li><strong>Drop caps and chapter openers.</strong> Drop caps require <code>::first-letter</code> with <code>float: left</code> and matching line-height. Not all readers render them identically — test in Kindle Previewer before using them as a visual anchor in every chapter.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        <Link href="/tools/css-snippet-generator" style={LINK_STYLE}>CSS Snippet Generator</Link> outputs tested <code>@font-face</code> declarations, body-text stacks, drop cap styles, scene breaks, and blockquote formatting — each with a live preview, optimized for Kindle KFX and EPUB. Included in the Starter plan.
                    </p>
                </Section>

                {/* ── 9. EPUB ── */}
                <Section
                    number="Section 9"
                    h2="EPUB — format overview and why KDP depends on it"
                    tools={[TOOL_LINKS.epubFormatter, TOOL_LINKS.manuscriptMode, TOOL_LINKS.epubValidator]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        EPUB (Electronic Publication) is the standard container format for reflowable ebooks — used natively by Apple Books, Kobo, and Google Play. KDP also uses it internally: even if you upload a Word document, KDP converts it to EPUB before converting again to its proprietary KFX format for delivery. Uploading a clean, correctly structured EPUB gives you control over what that intermediate file looks like, reducing conversion errors.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        An EPUB file is a ZIP archive with a required internal structure:
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>mimetype</strong> — must be the first file in the archive, stored uncompressed, containing exactly <code>application/epub+zip</code>.</li>
                        <li><strong>META-INF/container.xml</strong> — declares the path to the OPF package document. Without it, no reading system can open the file.</li>
                        <li><strong>OPF package document</strong> — lists every file in the EPUB (manifest) and the reading order (spine).</li>
                        <li><strong>nav.xhtml</strong> — the EPUB3 navigation document, containing the table of contents. Declared in the manifest with <code>properties=&quot;nav&quot;</code>.</li>
                        <li><strong>Chapter XHTML files</strong> — each chapter as a separate .xhtml file, declared in the manifest and ordered in the spine.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        <Link href="/tools/epub-formatter" style={LINK_STYLE}>EPUB Formatter</Link> generates a valid EPUB 3 from pasted manuscript text — no Calibre, no Sigil, included in the Starter plan. <Link href="/tools/manuscript-mode" style={LINK_STYLE}>Full Manuscript Mode</Link> accepts .docx or .txt uploads and runs formatting fixes before building the EPUB (free, no signup). After generating, run the free <Link href="/tools/epub-validator" style={LINK_STYLE}>EPUB Validator</Link> to confirm all structural checks pass before uploading. Not sure which file to send? See <Link href="/kindle-epub-format" style={LINK_STYLE}>which file to upload to KDP</Link>.
                    </p>
                </Section>

                {/* ── 10. KINDLE ── */}
                <Section
                    number="Section 10"
                    h2="Kindle-specific formatting requirements"
                    tools={[TOOL_LINKS.kindleFormatFixer]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Kindle books are delivered in Amazon&apos;s KFX format. You never submit KFX directly — KDP converts your uploaded EPUB, Word or KPF file. What you control is how clean the source file is before conversion.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>Reflowable vs fixed layout.</strong> Reflowable lets text adapt to any screen size and font setting. Fixed layout locks the page design — useful for illustrated children&apos;s books but it breaks on small screens and large-text accessibility settings. For prose and most non-fiction, use reflowable.</li>
                        <li><strong>MOBI format is deprecated.</strong> KDP stopped accepting MOBI for reflowable ebooks on August 1, 2021 and for fixed-layout ebooks on March 18, 2025. KDP&apos;s suggested formats are EPUB, Word (DOC/DOCX) and KPF files from Kindle Create.</li>
                        <li><strong>Enhanced Typesetting.</strong> Amazon applies improved hyphenation, kerning, and justification automatically on supported devices when your book meets its requirements. Books with clean EPUB CSS are more likely to qualify; heavy inline styles or image-based text typically disqualify the book. Amazon determines eligibility — there is no manual opt-in.</li>
                        <li><strong>Test with Kindle Previewer.</strong> Amazon&apos;s free Kindle Previewer simulates how your book renders across Kindle devices before upload. Run your EPUB through validation first, then test in Previewer — Previewer surfaces layout issues that validators don&apos;t catch (images, tables, drop cap rendering on older firmware).</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        For the export settings themselves (TOC, cover, fonts, images, CSS and metadata), with what KDP&apos;s guidelines say about each, see <Link href="/kindle-epub-format#kindle-epub-settings" style={LINK_STYLE}>Kindle EPUB settings</Link>.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        The most common source of Kindle formatting problems is the Word export: straight quotes, double hyphens, double spaces, and encoding artifacts that render incorrectly after KDP&apos;s conversion. <Link href="/tools/kindle-format-fixer" style={LINK_STYLE}>Kindle Format Fixer</Link> catches and corrects all eight common Word export issues in a single pass, included in the Starter plan.
                    </p>
                </Section>

                {/* ── 11. METADATA ── */}
                <Section
                    number="Section 11"
                    h2="Metadata — what KDP requires and how to format it"
                    tools={[TOOL_LINKS.metadataBuilder, TOOL_LINKS.kdpKeywordFinder]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        The EPUB specification requires only three Dublin Core fields in the OPF document: dc:title, dc:identifier and dc:language. dc:creator is recommended, not required. These are EPUB spec rules — not just KDP rules.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>dc:title</strong> — the book title, matching the title on the cover and in the KDP listing.</li>
                        <li><strong>dc:creator</strong> — the author name. Multiple <code>dc:creator</code> elements are allowed for co-authored works. The <code>opf:role</code> attribute is the EPUB 2 form; in EPUB 3 the role is set with <code>&lt;meta refines=&quot;#id&quot; property=&quot;role&quot;&gt;</code>, using MARC relator codes.</li>
                        <li><strong>dc:language</strong> — the primary language as a BCP 47 tag: <code>en</code> for English, <code>en-US</code> for American English, <code>fr</code> for French. This affects how reading systems handle hyphenation, text-to-speech, and search indexing.</li>
                        <li><strong>dc:identifier</strong> — a unique identifier, typically the ISBN. Must match the identifier referenced by the package element&apos;s <code>unique-identifier</code> attribute, or the EPUB fails spec validation.</li>
                        <li><strong>BISAC subject codes.</strong> BISAC is a standard subject classification. Other retailers and distributors use it. KDP does not: you choose your categories in the KDP dashboard.</li>
                        <li><strong>7 KDP keyword fields.</strong> KDP lets you add up to 7 keywords or short phrases. KDP says specific words work better than general ones, and to combine them in the most logical order.</li>
                        <li><strong>Book description.</strong> The description field on your KDP product page accepts HTML formatting — bold, italic, lists, and headings. For the character limit, supported tags, and a copywriting structure, see the <Link href="/kdp-book-description" style={LINK_STYLE}>KDP book description guide</Link>.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        <Link href="/tools/metadata-builder" style={LINK_STYLE}>Metadata Builder</Link> fills the three required Dublin Core fields plus dc:creator and generates formatted output for KDP, IngramSpark, Draft2Digital, and EPUB OPF — free, no account required. <Link href="/tools/kdp-keyword-finder" style={LINK_STYLE}>KDP Keyword & Category Finder</Link> suggests 7 long-tail keyword phrases tailored to your genre and comparable titles, plus category paths to choose from — 2 credits per run. KDP lets you select up to 3 categories.
                    </p>
                </Section>

                {/* ── 12. VALIDATION ── */}
                <Section
                    number="Section 12"
                    h2="Validation — why it matters and what it checks"
                    tools={[TOOL_LINKS.epubValidator, TOOL_LINKS.epubValidatorPro]}
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        KDP&apos;s upload error messages are often vague. A file can be rejected with &ldquo;We found issues with your file&rdquo; and no further detail. Validating first finds structural problems — container structure, required metadata, spine order, cover image declaration — so you can fix them before any store sees the file.
                    </p>
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        The three major stores handle files differently:
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li><strong>KDP</strong> — accepts some structurally broken EPUBs and silently corrects or drops content. A file can upload successfully and still render incorrectly on Kindle devices.</li>
                        <li><strong>Apple Books</strong> — requires EPUB 3, rejects malformed XML, validates image quality and font embedding beyond what KDP checks. A file that uploads to KDP successfully can fail Apple Books submission.</li>
                        <li><strong>IngramSpark</strong> — gives clearer rejection messages than KDP.</li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        The free <Link href="/tools/epub-validator" style={LINK_STYLE}>online EPUB Validator</Link> runs 11 structural checks in your browser — mimetype, container, OPF package, required metadata, spine, manifest files, navigation, cover image, embedded fonts, EMF/WMF images and file size — with plain-English error messages and fix links. Free, no signup. It does not check the XML inside chapter files; for a full specification check, run EPUBCheck as well. For deeper checks (ghost spacing, duplicate IDs, OPF manifest completeness, store-specific pass/fail reports for KDP, Apple Books, and Google Play), <Link href="/tools/epub-validator-premium" style={LINK_STYLE}>EPUB Validator Pro</Link> runs a full scan — 3 credits per run.
                    </p>
                </Section>

                {/* ── 13. COMMON ERRORS ── */}
                <Section
                    number="Section 13"
                    h2="Common KDP formatting errors — and how to fix them"
                >
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 14, opacity: 0.88 }}>
                        Most EPUB rejections come from the same six errors. Each links to a step-by-step fix guide.
                    </p>
                    <ul style={{ margin: '0 0 14px', paddingLeft: 24, lineHeight: 1.7, fontSize: 16, opacity: 0.88 }}>
                        <li>
                            <strong><Link href="/epub-errors/missing-manifest-resource" style={LINK_STYLE}>Missing manifest resource</Link></strong> — A file exists in the EPUB archive but was never added to the OPF manifest, or a file declared in the manifest is absent from the archive. Usually caused by manual EPUB editing in Sigil or Calibre after the manifest was generated. Fix: open the OPF file, add or remove the corresponding <code>&lt;item&gt;</code> entry.
                        </li>
                        <li>
                            <strong><Link href="/epub-errors/cover-image-not-declared" style={LINK_STYLE}>Cover image not declared</Link></strong> — The cover image is physically present but not linked with the correct manifest properties. KDP checks this specifically; missing declaration causes the cover to appear blank in the store listing. Fix: add <code>properties=&quot;cover-image&quot;</code> to the cover image item (EPUB3), or <code>&lt;meta name=&quot;cover&quot; content=&quot;cover-id&quot; /&gt;</code> (EPUB2).
                        </li>
                        <li>
                            <strong><Link href="/epub-errors/missing-ncx-navigation" style={LINK_STYLE}>Missing NCX navigation (toc.ncx)</Link></strong> — The OPF references toc.ncx but the file is absent. Common with Scrivener and older Calibre exports that generate the OPF reference without creating the file. Fix: generate toc.ncx using the <Link href="/tools/toc-generator" style={LINK_STYLE}>TOC Generator</Link> or rebuild it in Sigil via Tools → Table of Contents.
                        </li>
                        <li>
                            <strong><Link href="/epub-errors/malformed-xhtml-unclosed-tag" style={LINK_STYLE}>Malformed XHTML (unclosed tag)</Link></strong> — EPUB content files must be valid XML. An unclosed tag causes Apple Books and strict validators to reject the file outright. Fix: open the flagged content file, locate the unclosed tag at the reported line number, add the matching closing tag.
                        </li>
                        <li>
                            <strong><Link href="/epub-errors/emf-image-fallback" style={LINK_STYLE}>EMF image without fallback</Link></strong> — Word-to-EPUB conversions sometimes embed images in Windows-only EMF format. EPUB readers cannot display them and no fallback is provided, causing validation failure. Fix: re-save the image as PNG or JPG in the original Word document, replace it, and re-export.
                        </li>
                        <li>
                            <strong><Link href="/epub-errors/duplicate-id-epub" style={LINK_STYLE}>Duplicate ID</Link></strong> — Two or more elements share the same <code>id</code> attribute. Causes navigation failures and Apple Books rejections. Fix: search the EPUB&apos;s HTML files for the duplicate id value and rename one occurrence to a unique string.
                        </li>
                    </ul>
                    <p style={{ fontSize: 16, lineHeight: 1.7, opacity: 0.88 }}>
                        See the full <Link href="/epub-errors" style={LINK_STYLE}>EPUB errors directory →</Link>
                    </p>
                </Section>

                {/* ── 14. KDP UPLOAD CHECKLIST ── */}
                <Section number="Section 14" h2="KDP upload checklist" last>
                    <p style={{ fontSize: 16, lineHeight: 1.7, marginBottom: 16, opacity: 0.88 }}>
                        Before uploading to KDP, Apple Books, or Kobo, confirm each item:
                    </p>
                    <ul style={{ listStyle: 'none', padding: 0, margin: '0 0 16px' }}>
                        {[
                            { text: 'Manuscript cleaned — no double spaces, straight quotes, Tab indents, or encoding artifacts', tool: TOOL_LINKS.wordCleanup },
                            { text: 'Prose consistency checked — dialogue punctuation, repeated words, style drift', tool: TOOL_LINKS.manuscriptCleanup },
                            { text: 'EPUB file generated with correct mimetype, container.xml, OPF, and chapter structure', tool: TOOL_LINKS.epubFormatter },
                            { text: 'Clickable Table of Contents present — nav.xhtml declared in the manifest, NCX fallback included', tool: TOOL_LINKS.tocGenerator },
                            { text: 'Front matter complete — title page, copyright page, dedication', tool: TOOL_LINKS.frontMatter },
                            { text: 'Back matter complete — author bio, Also By, mailing list CTA', tool: TOOL_LINKS.backMatter },
                            { text: 'EPUB validates with zero structural errors', tool: TOOL_LINKS.epubValidator },
                            { text: 'Cover image: JPEG or PNG, RGB color mode, dimensions meet KDP requirements', tool: TOOL_LINKS.coverChecker },
                            { text: 'Metadata complete: dc:title, dc:creator, dc:language, dc:identifier in the EPUB; description, categories and optional keywords (up to 7) in KDP', tool: TOOL_LINKS.metadataBuilder },
                            { text: 'KDP keywords: up to 7 phrases a reader would search for, following KDP keyword guidelines', tool: TOOL_LINKS.kdpKeywordFinder },
                            { text: 'File previewed in Kindle Previewer on at least one device size', tool: null },
                        ].map((item, i) => (
                            <li key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, marginBottom: 12, fontSize: 15, lineHeight: 1.55, opacity: 0.88 }}>
                                <input type="checkbox" readOnly style={{ marginTop: 3, flexShrink: 0, accentColor: '#c9a84c' }} />
                                <span>
                                    {item.text}
                                    {item.tool && (
                                        <> — <Link href={item.tool.href} style={LINK_STYLE}>{item.tool.label}</Link>{' '}
                                        <span style={{ fontSize: 12, opacity: 0.65 }}>({item.tool.note})</span></>
                                    )}
                                </span>
                            </li>
                        ))}
                    </ul>
                </Section>

                {/* ── FAQ ── */}
                <h2 style={{ fontSize: 26, fontWeight: 700, marginTop: 48, marginBottom: 20 }}>
                    Frequently asked questions
                </h2>
                {faqs.map((f, i) => (
                    <div key={i} style={{ marginBottom: 24, paddingBottom: 20, borderBottom: i < faqs.length - 1 ? '1px solid rgba(0,0,0,0.06)' : 'none' }}>
                        <h3 style={{ fontSize: 18, fontWeight: 600, marginBottom: 8, lineHeight: 1.3 }}>{f.q}</h3>
                        <p style={{ fontSize: 15, lineHeight: 1.65, opacity: 0.85, margin: 0 }}>{f.a}</p>
                    </div>
                ))}

                {/* ── CROSS-LINKS ── */}
                <p style={{ fontSize: 16, lineHeight: 1.75, marginTop: 40, marginBottom: 24, opacity: 0.88 }}>
                    This guide covers ebook (Kindle) formatting specifically. If you are also publishing a print edition — or deciding whether to publish both — see the{' '}
                    <Link href="/kdp-print-vs-digital" style={LINK_STYLE}>KDP print vs digital guide</Link>{' '}
                    for the file format, ISBN, royalty, and distribution differences between a Kindle ebook and a KDP paperback.
                </p>

                <RelatedLinks related={[
                    { type: 'guide', slug: 'book-front-matter', label: 'front matter and back matter, in order' },
                    { type: 'blog', slug: 'kindle-formatting-mistakes', label: 'Kindle formatting mistakes to fix in Word' },
                ]} />

                {/* ── CTA ── */}
                <div style={{ marginTop: 48, padding: '24px', border: '1px solid rgba(201,168,76,0.3)', borderRadius: 12, textAlign: 'center' }}>
                    <p style={{ fontSize: 17, marginBottom: 16, fontWeight: 500 }}>Start with the free EPUB Validator — no signup, no Java, runs in your browser.</p>
                    <TrackedLink href="/tools/epub-validator" style={{ display: 'inline-block', padding: '12px 28px', background: '#c9a84c', color: '#1a1a1a', borderRadius: 8, fontWeight: 600, textDecoration: 'none', fontSize: 16 }}>
                        Validate Your EPUB →
                    </TrackedLink>
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.7, marginTop: 32, opacity: 0.88 }}>
                    Want a step-by-step list to tick off before you upload? Use the{' '}
                    <Link href="/checklist/kdp-pre-launch-checklist" style={LINK_STYLE}>KDP preflight checklist</Link>.
                </p>
                <ChecklistOptin source="checklist-kdp-formatting-guide" variant="full" />
            </main>
        </>
    );
}
