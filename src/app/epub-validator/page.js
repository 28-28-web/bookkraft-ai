import Link from 'next/link';

export const metadata = {
    title: 'Free EPUB Validator — Check Your Ebook Before Upload | BookKraft AI',
    description: 'Free online EPUB validator. Upload your .epub file and instantly check for KDP, Apple Books, and Kobo errors. No Java, no signup, no limit. Fix ebook errors before rejection.',
    keywords: 'epub validator, epub checker, validate epub, online epub validator, epub checker online, kdp epub validator, free epub checker',
    openGraph: {
        title: 'Free EPUB Validator — Fix Ebook Errors Before Upload',
        description: 'Instantly validate your EPUB file for KDP, Apple Books, and Kobo. Checks mimetype, OPF, spine, TOC, images, CSS, and accessibility. Free, no signup.',
        url: 'https://bookkraftai.com/epub-validator',
    },
    alternates: {
        canonical: 'https://bookkraftai.com/epub-validator',
    },
};

export default function EPUBValidatorPage() {
    return (
        <>
            {/* Hero */}
            <section style={{
                background: 'var(--ink)', padding: 'var(--space-24) 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <div className="hero-badge" style={{ justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
                        <span className="hero-badge-dot" /> Free — No signup required
                    </div>
                    <h1 style={{ color: 'var(--cream)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>
                        Free EPUB Validator<br />
                        <em style={{ color: 'var(--gold)', fontWeight: 400 }}>Fix Errors Before They Cost You.</em>
                    </h1>
                    <p style={{ color: 'rgba(247,243,236,.65)', fontSize: '18px', maxWidth: 560, margin: '0 auto var(--space-8)' }}>
                        Upload any .epub file and get a full structural audit in seconds.
                        Catch errors before KDP, Apple Books, or Kobo rejects your upload.
                    </p>
                    <Link href="/tools/epub-validator" className="btn btn-gold" style={{ textDecoration: 'none', fontSize: '18px', padding: '14px 32px' }}>
                        Open EPUB Validator — Free
                    </Link>
                </div>
            </section>

            {/* What it checks */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>9 Validation Checks — Instant Results</h2>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 'var(--space-4)',
                    }}>
                        {[
                            { check: 'Mimetype', desc: 'Verifies the EPUB mimetype file exists and is correctly formatted' },
                            { check: 'container.xml', desc: 'Validates the META-INF container structure' },
                            { check: 'OPF File', desc: 'Checks the package document for errors and missing fields' },
                            { check: 'Spine', desc: 'Ensures all spine items are present and correctly ordered' },
                            { check: 'Table of Contents', desc: 'Validates NCX and Nav TOC structure' },
                            { check: 'Image References', desc: 'Finds broken or missing image links' },
                            { check: 'CSS Files', desc: 'Checks for missing or invalid stylesheets' },
                            { check: 'Accessibility', desc: 'Flags missing alt text and accessibility issues' },
                            { check: 'Overall Score', desc: 'Traffic light severity rating: Pass, Warning, or Fail' },
                        ].map((item, i) => (
                            <div key={i} style={{
                                background: 'var(--cream)', border: '1px solid var(--border)',
                                borderRadius: 'var(--radius)', padding: 'var(--space-5)',
                            }}>
                                <div style={{ fontWeight: 700, marginBottom: 'var(--space-2)', color: 'var(--ink)' }}>✓ {item.check}</div>
                                <div style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', lineHeight: 1.5 }}>{item.desc}</div>
                            </div>
                        ))}
                    </div>

                    <div style={{ textAlign: 'center', marginTop: 'var(--space-10)' }}>
                        <Link href="/tools/epub-validator" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Validate My EPUB Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Platform compatibility */}
            <section style={{ padding: 'var(--space-12) 0', background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: 'var(--space-6)' }}>
                        Checks compatibility for every major platform
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
                        {['Amazon KDP', 'Apple Books', 'Kobo', 'Barnes & Noble', 'Draft2Digital', 'IngramSpark', 'Smashwords'].map((p, i) => (
                            <span key={i} style={{ color: 'var(--mid)', fontWeight: 600, fontSize: 'var(--text-base)' }}>{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>

                    <h2>What is an EPUB Validator?</h2>
                    <p>An EPUB validator checks your ebook file for structural errors before you upload it to publishing platforms. When you submit a book to Amazon KDP, Apple Books, or Kobo, their systems run automated checks on your file. If your EPUB fails those checks, your book gets rejected — sometimes with vague error messages that are hard to diagnose.</p>
                    <p>This free EPUB validator runs the same structural checks in your browser, before you upload anywhere. You see exactly what's wrong, what's fine, and what needs fixing.</p>

                    <h2>Why Validate Your EPUB Before Upload?</h2>
                    <p>EPUB errors cause upload rejections, formatting problems, and poor reading experiences. Common issues include broken image references, missing OPF metadata, incorrect spine ordering, and invalid container structure. Each platform has slightly different tolerance for these errors — what passes on Kobo might fail on Apple Books.</p>
                    <p>Validating before upload saves you the back-and-forth of rejection emails and re-uploads. Fix it once, publish everywhere.</p>

                    <h2>How to Use the Free EPUB Validator</h2>
                    <p>Open the tool, drag and drop your .epub file, and wait a few seconds. The validator runs 9 checks and returns a colour-coded report: green for pass, yellow for warning, red for fail. Each check includes a description of what was found so you know exactly what to fix.</p>
                    <p>No Java required. No account. No upload limit. The file never leaves your browser — everything runs locally on your device.</p>

                    <h2>Common EPUB Errors This Tool Catches</h2>
                    <p>The most frequent issues found in EPUB files are: missing or malformed mimetype files, broken container.xml structure, OPF package documents with missing required fields, spine items that reference non-existent files, TOC entries pointing to missing anchors, image src attributes with incorrect paths, CSS files listed in the manifest but absent from the package, and images missing alt text attributes required for accessibility compliance.</p>

                    <h2>EPUB Validator vs. EPUBCheck</h2>
                    <p>EPUBCheck is the official W3C validation tool, but it requires Java and command-line access. This free online EPUB validator runs entirely in your browser with no setup required. It covers the most common structural checks that cause platform rejections, making it faster and more accessible for authors who just need to verify their file before publishing.</p>

                    <h2>Who This Tool Is For</h2>
                    <p>Self-publishing authors who format their own ebooks, freelance editors delivering final files to clients, publishing assistants doing pre-submission checks, and anyone who wants to verify an EPUB file without installing software. The tool works on Windows, Mac, and Linux — any browser, any device.</p>

                    {/* FAQ Schema */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                "@context": "https://schema.org",
                                "@type": "FAQPage",
                                "mainEntity": [
                                    {
                                        "@type": "Question",
                                        "name": "Is this EPUB validator free?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, completely free. No signup, no credit card, no account required. Unlimited use."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Does my EPUB file get uploaded to a server?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "No. The EPUB validator runs entirely in your browser. Your file never leaves your device."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What does the EPUB validator check?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "It checks 9 structural elements: mimetype, container.xml, OPF file, spine, table of contents, image references, CSS files, accessibility attributes, and overall structure."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Does it work for KDP epub validation?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. The validator checks the structural requirements that Amazon KDP, Apple Books, Kobo, and other platforms use to accept or reject EPUB uploads."
                                        }
                                    }
                                ]
                            })
                        }}
                    />

                    {/* CTA */}
                    <div style={{
                        marginTop: 'var(--space-12)', textAlign: 'center',
                        padding: 'var(--space-8)', background: 'var(--ink)',
                        borderRadius: 'var(--radius)', color: 'var(--cream)',
                    }}>
                        <h3 style={{ color: 'var(--cream)', marginBottom: 'var(--space-3)' }}>Ready to validate your EPUB?</h3>
                        <p style={{ color: 'rgba(247,243,236,.65)', maxWidth: 440, margin: '0 auto var(--space-6)', fontSize: 'var(--text-sm)' }}>
                            Free, instant, no signup. Upload your file and get results in seconds.
                        </p>
                        <Link href="/tools/epub-validator" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Open Free EPUB Validator
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}