import Link from 'next/link';
import ManuscriptModeClient from '@/components/ManuscriptModeClient';

export const metadata = {
    title: 'Free DOCX to EPUB Converter — Word to EPUB 3.0 | BookKraft AI',
    description: 'Convert your Word manuscript to a valid EPUB 3.0 free — chapters auto-detected, smart quotes and encoding fixed. No Calibre or Sigil. Free BookKraft account.',
    keywords: 'docx to epub free, word to epub converter, convert docx to epub, manuscript to epub, word to epub 3.0, epub builder free, free epub converter, word to epub no calibre',
    alternates: {
        canonical: 'https://bookkraftai.com/tools/manuscript-mode',
    },
};

export default function ManuscriptModePage() {
    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'SoftwareApplication',
        name: 'Full Manuscript Mode',
        url: 'https://bookkraftai.com/tools/manuscript-mode',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web Browser',
        description: 'Free EPUB builder that accepts DOCX or TXT uploads, auto-detects chapters, cleans formatting, and outputs a complete EPUB 3 file in one step. Free BookKraft AI account required.',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />

            {/* Hero */}
            <section style={{ background: 'var(--ink)', padding: 'var(--space-24) 0', textAlign: 'center' }}>
                <div className="container">
                    <div className="hero-badge" style={{ justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
                        <span className="hero-badge-dot" /> Free — No Calibre or Sigil needed
                    </div>
                    <h1 style={{ color: 'var(--cream)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>
                        DOCX to EPUB Converter<br />
                        <em style={{ color: 'var(--gold)', fontWeight: 400 }}>Word to EPUB 3.0 in One Step.</em>
                    </h1>
                    <p style={{ color: 'rgba(247,243,236,.65)', fontSize: '18px', maxWidth: 560, margin: '0 auto var(--space-8)' }}>
                        Upload your .docx or .txt manuscript. Get a valid EPUB 3.0 — chapters detected,
                        smart quotes fixed, encoding cleaned. No desktop software required.
                    </p>
                    <Link href="/login?redirect=/tools/manuscript-mode" className="btn btn-gold" style={{ textDecoration: 'none', fontSize: '18px', padding: '14px 32px' }}>
                        Convert Word to EPUB — Free
                    </Link>
                </div>
            </section>

            {/* How it works */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>How It Works — 3 Steps</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--space-6)' }}>
                        {[
                            { step: '1', title: 'Upload your manuscript', desc: 'Drag and drop your .docx or .txt file. Up to 10 MB.' },
                            { step: '2', title: 'Enter book details', desc: 'Add your title, author name, and language. Select which formatting fixes to apply.' },
                            { step: '3', title: 'Download your EPUB', desc: 'Click Generate EPUB — download a valid EPUB 3.0 file ready for KDP, Apple Books, or Kobo.' },
                        ].map((s) => (
                            <div key={s.step} style={{ background: 'var(--cream)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 'var(--space-6)', textAlign: 'center' }}>
                                <div style={{ width: 36, height: 36, borderRadius: '50%', background: 'var(--gold)', color: '#fff', fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto var(--space-3)', fontSize: '15px' }}>{s.step}</div>
                                <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--ink)' }}>{s.title}</div>
                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', lineHeight: 1.5 }}>{s.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* What it fixes */}
            <section style={{ padding: 'var(--space-12) 0', background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-8)' }}>What the Converter Fixes</h2>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 'var(--space-4)' }}>
                        {[
                            { label: 'Smart quotes', desc: 'Curly quote characters replaced with straight quotes for EPUB compatibility' },
                            { label: 'Em dashes', desc: 'Double hyphens (--) converted to proper em dashes (—)' },
                            { label: 'Encoding artifacts', desc: 'Mojibake (â€™ → \') and stray control characters removed' },
                            { label: 'Double spaces', desc: 'Consecutive spaces, tabs, and excess blank lines cleaned up' },
                            { label: 'Chapter detection', desc: 'Markdown headings, "Chapter N", and "PART N" patterns split into separate EPUB chapters' },
                            { label: 'EPUB 3.0 structure', desc: 'Valid mimetype, container.xml, OPF, nav.xhtml, and toc.ncx — all generated automatically' },
                        ].map((item, i) => (
                            <div key={i} style={{ background: 'var(--white)', border: '1px solid var(--border)', borderRadius: 'var(--radius)', padding: 'var(--space-5)' }}>
                                <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--ink)' }}>✓ {item.label}</div>
                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', lineHeight: 1.5 }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Tool */}
            <ManuscriptModeClient />

            {/* SEO content */}
            <section style={{ padding: 'var(--space-16) 0', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>

                    <h2>What Full Manuscript Mode Does</h2>
                    <p>Full Manuscript Mode converts a .docx or .txt manuscript directly to a valid EPUB 3.0 file — no Calibre, no Sigil, no coding. The pipeline runs server-side:</p>
                    <ol>
                        <li><strong>Upload</strong> — accepts .docx (Word) or .txt files up to 10 MB.</li>
                        <li><strong>Format fixes</strong> — optional passes for smart quotes, em dashes, encoding artifacts, and double spaces.</li>
                        <li><strong>Chapter detection</strong> — Word heading styles (H1/H2/H3), &ldquo;Chapter N&rdquo;, &ldquo;PART N&rdquo;, and Markdown # headings each become a separate chapter file.</li>
                        <li><strong>EPUB build</strong> — generates a complete EPUB 3.0: mimetype, container.xml, OPF manifest, nav.xhtml, toc.ncx, and individual chapter XHTML files.</li>
                        <li><strong>Download</strong> — one .epub file, ready to upload to KDP, Apple Books, or Kobo.</li>
                    </ol>
                    <p>Bold, italic, and underline from your Word file carry through. What is not converted: images, tables, footnotes, and font-size or color changes.</p>

                    <h2>Common Manuscript Formatting Issues This Fixes</h2>
                    <p>Word and Google Docs exports leave formatting debris that breaks EPUB readers and KDP validation. All four fixes are optional toggles:</p>
                    <ul>
                        <li><strong>Smart quotes</strong> — Word sometimes exports straight quote marks (&quot; &apos;) instead of curly typographic ones. The fix converts them before the EPUB is built.</li>
                        <li><strong>Em dashes</strong> — double hyphens (--) from typed manuscripts convert to proper em dashes (—).</li>
                        <li><strong>Encoding artifacts (mojibake)</strong> — garbled characters like â€™ or Ã© from encoding mismatches are reversed automatically.</li>
                        <li><strong>Double spaces and blank lines</strong> — consecutive spaces, extra tabs, and stacked blank paragraphs are collapsed. Excess blank lines in EPUB output are a common cause of the <Link href="/epub-errors/ghost-spacing-epub" style={{ color: 'var(--gold)' }}>ghost-spacing-epub error</Link>.</li>
                    </ul>

                    <h2>How to Use Full Manuscript Mode</h2>
                    <ol>
                        <li><strong>Sign in</strong> — create a free BookKraft account (no credit card required). The tool is free.</li>
                        <li><strong>Upload your file</strong> — drag and drop your .docx or .txt file (max 10 MB). EPUB and PDF are not accepted as input.</li>
                        <li><strong>Enter book details</strong> — add title, author name, and language. ISBN is optional.</li>
                        <li><strong>Select formatting fixes</strong> — toggle smart quotes, em dashes, encoding fix, and double spaces. Leave all on for a full cleanup pass.</li>
                        <li><strong>Generate EPUB</strong> — click the button. Processing runs in seconds.</li>
                        <li><strong>Validate before uploading</strong> — run the output through the <Link href="/tools/epub-validator" style={{ color: 'var(--gold)' }}>free EPUB Validator</Link> to confirm it passes structural checks before submitting to KDP or any other platform.</li>
                    </ol>

                    <h2>Frequently Asked Questions</h2>

                    <h3>What file types does Full Manuscript Mode accept?</h3>
                    <p>.docx (Microsoft Word) and .txt (plain text), up to 10 MB. EPUB and PDF are not accepted as input. The converter extracts text, detects chapters, and builds a valid EPUB 3.0.</p>

                    <h3>Is Full Manuscript Mode free?</h3>
                    <p>Yes. Full Manuscript Mode is free with a BookKraft AI account — no credit card or paid plan required.</p>

                    <h3>Will bold and italic from my Word file appear in the EPUB?</h3>
                    <p>Yes. Bold, italic, and underline are preserved. Word heading styles (Heading 1, 2, 3) are detected as chapter breaks. Images, tables, footnotes, and font-size or color changes are not carried over.</p>

                    <h3>How does chapter detection work?</h3>
                    <p>For .docx files: Word heading styles (Heading 1, 2, 3) and paragraphs matching &ldquo;Chapter N&rdquo; or &ldquo;PART I/II/III&rdquo; create chapter breaks. For .txt files: Markdown headings (# Title, ## Section) and the same text patterns are used.</p>

                    <h3>Is the EPUB output compatible with Amazon KDP?</h3>
                    <p>The output is a valid EPUB 3.0 with correct structure. Run it through the <Link href="/tools/epub-validator" style={{ color: 'var(--gold)' }}>free EPUB Validator</Link> before submitting to any platform to confirm all structural checks pass.</p>

                    <h3>Do I need Calibre or Sigil to convert my Word file to EPUB?</h3>
                    <p>No. The conversion runs server-side — no desktop software to install or configure. Upload your file, fill in book details, and download the EPUB.</p>

                    <h2>Related BookKraft Tools</h2>
                    <ul>
                        <li><Link href="/tools/epub-validator" style={{ color: 'var(--gold)' }}><strong>EPUB Validator</strong></Link> — validate your converted EPUB before uploading to KDP or Apple Books. Free, no account needed.</li>
                        <li><Link href="/tools/kindle-format-fixer" style={{ color: 'var(--gold)' }}><strong>Kindle Format Fixer</strong></Link> — text-only formatting pass (smart quotes, em dashes, encoding) without building an EPUB. Included in Starter and Pro plans.</li>
                        <li><Link href="/epub-formatting-guide" style={{ color: 'var(--gold)' }}><strong>EPUB Formatting Guide</strong></Link> — full workflow from manuscript to store-ready EPUB, including TOC, front matter, and store-specific requirements.</li>
                        <li><Link href="/blog/best-ebook-formats-epub-vs-pdf-vs-mobi" style={{ color: 'var(--gold)' }}><strong>EPUB vs PDF vs MOBI — Which Format Should You Publish In?</strong></Link> — explains the real differences between ebook formats and which platforms accept which.</li>
                        <li>Prefer a dedicated desktop formatting app? See how BookKraft compares — <Link href="/vellum-alternative" style={{ color: 'var(--gold)' }}><strong>Vellum alternative</strong></Link> and <Link href="/atticus-alternative" style={{ color: 'var(--gold)' }}><strong>Atticus alternative</strong></Link>.</li>
                    </ul>

                    {/* CTA */}
                    <div style={{ marginTop: 'var(--space-12)', textAlign: 'center', padding: 'var(--space-8)', background: 'var(--ink)', borderRadius: 'var(--radius)', color: 'var(--cream)' }}>
                        <h3 style={{ color: 'var(--cream)', marginBottom: 'var(--space-3)' }}>Ready to convert your manuscript to EPUB?</h3>
                        <p style={{ color: 'rgba(247,243,236,.65)', maxWidth: 440, margin: '0 auto var(--space-6)', fontSize: 'var(--text-sm)' }}>
                            Free, no Calibre needed. Upload your .docx or .txt and download a valid EPUB 3.0.
                        </p>
                        <Link href="/login?redirect=/tools/manuscript-mode" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Convert DOCX to EPUB — Free
                        </Link>
                    </div>
                </div>
            </section>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
                '@context': 'https://schema.org',
                '@type': 'FAQPage',
                mainEntity: [
                    { '@type': 'Question', name: 'What file types does Full Manuscript Mode accept?', acceptedAnswer: { '@type': 'Answer', text: '.docx (Microsoft Word) and .txt (plain text), up to 10 MB. EPUB and PDF are not accepted as input. The converter extracts text, detects chapters by heading pattern, and builds a valid EPUB 3.0.' } },
                    { '@type': 'Question', name: 'Is Full Manuscript Mode free?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Full Manuscript Mode is free with a BookKraft AI account — no credit card or paid plan required.' } },
                    { '@type': 'Question', name: 'Will bold and italic from my Word file appear in the EPUB?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. Bold, italic, and underline are preserved. Word heading styles (Heading 1, 2, 3) are detected as chapter breaks. Images, tables, footnotes, and font-size or color changes are not carried over.' } },
                    { '@type': 'Question', name: 'How does chapter detection work?', acceptedAnswer: { '@type': 'Answer', text: "For .docx files: Word heading styles (Heading 1, 2, 3) and paragraphs matching 'Chapter N' or 'PART I/II/III' create chapter breaks. For .txt files: Markdown headings (# Title, ## Section) and the same text patterns are used." } },
                    { '@type': 'Question', name: 'Is the EPUB output compatible with Amazon KDP?', acceptedAnswer: { '@type': 'Answer', text: 'The output is a valid EPUB 3.0 with correct structure. Run it through the free EPUB Validator before submitting to any platform to confirm all structural checks pass.' } },
                    { '@type': 'Question', name: 'Do I need Calibre or Sigil to convert my Word file to EPUB?', acceptedAnswer: { '@type': 'Answer', text: 'No. The conversion runs server-side — no desktop software to install or configure. Upload your file, fill in book details, and download the EPUB.' } },
                ],
            }) }} />
        </>
    );
}
