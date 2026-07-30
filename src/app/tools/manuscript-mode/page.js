import Link from 'next/link';
import ManuscriptModeClient from '@/components/ManuscriptModeClient';

export const metadata = {
    title: 'DOCX to EPUB Converter — Word to EPUB Free | BookKraft AI',
    description: 'Convert .docx or .txt to EPUB 3.0 in one step. Auto chapter detection, smart quote fixes, valid KDP output. No Calibre or Sigil needed. Free BookKraft account required.',
    keywords: 'docx to epub, word to epub, convert docx to epub, convert word to epub, convert doc to epub, word to epub converter',
    alternates: {
        canonical: 'https://bookkraftai.com/tools/manuscript-mode',
    },
};

export default function ManuscriptModePage() {
    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'DOCX to EPUB Converter — Full Manuscript Mode',
        url: 'https://bookkraftai.com/tools/manuscript-mode',
        description: 'Convert .docx or .txt manuscripts to valid EPUB 3.0. Automatic chapter detection, smart quote correction, em dash fixes, and encoding cleanup included. No Calibre or Sigil required.',
        applicationCategory: 'UtilitiesApplication',
        operatingSystem: 'Web',
        offers: {
            '@type': 'Offer',
            price: '0',
            priceCurrency: 'USD',
        },
    };

    const faqSchema = {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
            {
                '@type': 'Question',
                name: 'What file types can I convert to EPUB?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: '.docx (Microsoft Word) and .txt (plain text) files are supported. The converter extracts your text, detects chapters by heading pattern, and builds a valid EPUB 3.0 file.',
                },
            },
            {
                '@type': 'Question',
                name: 'Is the Word to EPUB conversion free?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Full Manuscript Mode is free. A free BookKraft AI account is required to use it.',
                },
            },
            {
                '@type': 'Question',
                name: 'Will bold and italic formatting from my Word document be preserved?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. Bold, italic, and underline formatting from your .docx file are preserved in the EPUB output. Word heading styles (Heading 1, 2, 3) also carry through as chapter markers. Images, tables, footnotes, and font-size changes are not carried over — the converter handles text content only.',
                },
            },
            {
                '@type': 'Question',
                name: 'How are chapters detected when converting DOCX to EPUB?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'For .docx files, Word heading styles (Heading 1, 2, 3) are detected as chapter breaks, as are paragraphs matching "Chapter N", "CHAPTER N", and "PART I/II/III". For .txt files, Markdown headings (# Title, ## Section) and the same text patterns are used.',
                },
            },
            {
                '@type': 'Question',
                name: 'Is the EPUB output compatible with Amazon KDP?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'The output is a valid EPUB 3.0 with correct mimetype, container.xml, OPF package, nav.xhtml, and toc.ncx — the structure KDP requires. We recommend running it through the free EPUB Validator at bookkraftai.com/epub-validator before submitting.',
                },
            },
            {
                '@type': 'Question',
                name: 'Do I need to install Calibre or Sigil to convert Word to EPUB?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. The conversion runs server-side — no desktop software required. Upload your .docx or .txt, fill in your title and author, and download the EPUB directly from your browser.',
                },
            },
        ],
    };

    return (
        <>
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

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

                    <h2>Who This Tool Is For</h2>
                    <p>Self-publishing authors who have a finished manuscript in Word and need a clean EPUB for KDP or other platforms. Freelance formatters who handle DOCX-to-EPUB conversion for clients. Writers switching from Word to EPUB without learning Calibre or Sigil. Anyone who needs to convert a .txt export from Scrivener, iA Writer, or any writing app to a distributable ebook.</p>

                    <h2>Convert DOCX to EPUB Without Calibre</h2>
                    <p>Calibre can convert Word files to EPUB, but it requires installation, has a steep learning curve, and produces inconsistent output from .docx files. This Word to EPUB converter runs server-side through your browser, applies targeted formatting fixes before building the file, and outputs a structurally valid EPUB 3.0 — without any software to install or configure.</p>

                    <h2>Word Formatting in the EPUB Output</h2>
                    <p>Bold, italic, and underline from your .docx file are preserved in the EPUB. Word heading styles (Heading 1, 2, 3) are detected as chapter breaks and appear as section headings. What is not carried over: images, tables, footnotes, and font-size or colour changes. The converter handles text content and inline character emphasis — not page layout.</p>

                    <h2>Validate After Converting</h2>
                    <p>After converting your doc to epub, run the file through the <Link href="/epub-validator" style={{ color: 'var(--gold)' }}>free EPUB Validator</Link> to confirm it passes structural checks before uploading to KDP or any other platform. The validator checks the same structural elements that publishing platforms test during submission.</p>

                    <h2>Frequently Asked Questions</h2>

                    <h3>What file types can I convert to EPUB?</h3>
                    <p>.docx (Microsoft Word) and .txt (plain text). The converter extracts text, detects chapters by heading pattern, and builds a valid EPUB 3.0.</p>

                    <h3>Is the Word to EPUB conversion free?</h3>
                    <p>Yes. Full Manuscript Mode is free with a BookKraft AI account.</p>

                    <h3>Will bold and italic from my Word file appear in the EPUB?</h3>
                    <p>Yes. Bold, italic, and underline are preserved. Word heading styles (Heading 1, 2, 3) carry through as chapter markers. Images, tables, footnotes, and font changes are not carried over.</p>

                    <h3>How are chapters detected?</h3>
                    <p>For .docx files: Word heading styles (Heading 1, 2, 3) create chapter breaks, as do paragraphs matching &ldquo;Chapter N&rdquo; or &ldquo;PART I/II/III&rdquo;. For .txt files: Markdown headings (# Title, ## Section) and the same text patterns are used.</p>

                    <h3>Is the EPUB output compatible with Amazon KDP?</h3>
                    <p>The output is a valid EPUB 3.0 with correct structure. Run it through the <Link href="/tools/epub-validator" style={{ color: 'var(--gold)' }}>EPUB checker</Link> before submitting to any platform.</p>

                    <h3>Do I need Calibre or Sigil to convert my Word doc to EPUB?</h3>
                    <p>No. The conversion runs server-side — no desktop software required. Upload your file, fill in your details, and download the EPUB.</p>

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
        </>
    );
}
