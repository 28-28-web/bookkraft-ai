import Link from 'next/link';

export const metadata = {
    title: 'Free EPUB Validator — Epub Checker Online | BookKraft AI',
    description: 'Free epub checker with 9 structural checks. Upload any .epub and get a plain-English pass/fail report for KDP, Apple Books, and Kobo in seconds. No Java, no signup.',
    keywords: 'epub validator, epub checker, validate epub, epubcheck, online epub validator, epub checker online, kdp epub validator, free epub checker, epub verify',
    openGraph: {
        title: 'Free EPUB Validator — Check Your Epub File Online',
        description: 'Instantly validate your EPUB file for KDP, Apple Books, and Kobo. 9 checks: mimetype, OPF, spine, TOC, images, CSS, accessibility. Free, no signup.',
        url: 'https://bookkraftai.com/epub-validator',
    },
    alternates: {
        canonical: 'https://bookkraftai.com/epub-validator',
    },
};

export default function EPUBValidatorPage() {
    const softwareSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebApplication',
        name: 'Free EPUB Validator',
        url: 'https://bookkraftai.com/tools/epub-validator',
        description: 'Free online epub checker. Upload your .epub file and get a structural audit — checks mimetype, container.xml, OPF, spine, TOC, image references, CSS, and accessibility. No Java, no signup.',
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
                name: 'Is this EPUB validator free?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes, completely free. No signup, no credit card, no account required. Unlimited use.',
                },
            },
            {
                '@type': 'Question',
                name: 'Does my EPUB file get uploaded to a server?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'No. The EPUB validator runs entirely in your browser. Your file never leaves your device.',
                },
            },
            {
                '@type': 'Question',
                name: 'What does this epub checker look for?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'It checks 9 structural elements: mimetype, container.xml, OPF file, spine, table of contents, image references, CSS files, accessibility attributes, and overall structure. Each check returns a plain-English result.',
                },
            },
            {
                '@type': 'Question',
                name: 'Does it work for KDP EPUB validation?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'Yes. The validator checks the structural requirements that Amazon KDP, Apple Books, Kobo, and other platforms use to accept or reject EPUB uploads.',
                },
            },
            {
                '@type': 'Question',
                name: 'What is the difference between this tool and EPUBCheck?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'EPUBCheck is the W3C\'s official validator — it requires Java and command-line access. This free epub checker runs the same structural checks in your browser with no setup. It focuses on the errors that cause platform rejections and returns results in plain English instead of raw XML error codes.',
                },
            },
            {
                '@type': 'Question',
                name: 'My EPUB passed this validator but KDP still rejected it — why?',
                acceptedAnswer: {
                    '@type': 'Answer',
                    text: 'KDP has additional content requirements beyond structural EPUB validation — image resolution, content policy, formatting guidelines. This tool checks your file\'s structure, not KDP\'s content policies. If your epub passes here but fails on KDP, check KDP\'s submission guidelines for content-specific requirements.',
                },
            },
        ],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(softwareSchema) }}
            />

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
                        Checks compatibility for every major ebook platform
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
                    <p>An EPUB validator — also called an epub checker — checks your ebook file for structural errors before you upload it to publishing platforms. When you submit a book to Amazon KDP, Apple Books, or Kobo, their systems run automated checks on your file. If your EPUB fails those checks, your book gets rejected — sometimes with vague error messages that are hard to diagnose.</p>
                    <p>This free online epub checker runs the same structural validation in your browser, before you upload anywhere. You see exactly what&apos;s wrong, what&apos;s fine, and what needs fixing — in plain English, not raw XML error codes.</p>

                    <h2>Why Validate Your EPUB Before Upload?</h2>
                    <p>EPUB errors cause upload rejections, formatting problems, and poor reading experiences. Common issues include broken image references, missing OPF metadata, incorrect spine ordering, and invalid container structure. Each platform has slightly different tolerance for these errors — what passes on Kobo might fail on Apple Books.</p>
                    <p>Running an epub verify before upload saves you the back-and-forth of rejection emails and re-uploads. Fix it once, publish everywhere.</p>

                    <h2>How to Use the Free EPUB Checker</h2>
                    <p>Open the tool, drag and drop your .epub file, and wait a few seconds. The epub checker runs 9 checks and returns a colour-coded report: green for pass, yellow for warning, red for fail. Each check includes a plain-English description of what was found so you know exactly what to fix.</p>
                    <p>No Java required. No account. No upload limit. The file never leaves your browser — everything runs locally on your device.</p>

                    <h2>Common EPUB Errors This Tool Catches</h2>
                    <p>The most frequent issues found when you validate EPUB files are: missing or malformed mimetype files, broken container.xml structure, OPF package documents with missing required fields, spine items that reference non-existent files, TOC entries pointing to missing anchors, image src attributes with incorrect paths, CSS files listed in the manifest but absent from the package, and images missing alt text required for accessibility compliance.</p>

                    <h2>EPUB Checker vs. EPUBCheck</h2>
                    <p>EPUBCheck is the official W3C validation tool, but it requires Java and command-line access. This free online epub checker runs entirely in your browser with no setup. It covers the most common structural checks that cause platform rejections and returns results in plain English — making it faster for authors who need to verify a file before publishing rather than debugging raw XML output.</p>

                    <h2>Who This Tool Is For</h2>
                    <p>Self-publishing authors who format their own ebooks, freelance editors delivering final files to clients, publishing assistants doing pre-submission checks, and anyone who needs to verify an EPUB file without installing software. The epub validator works on Windows, Mac, and Linux — any browser, any device. Already have your ebook in Word? Use the <Link href="/tools/manuscript-mode" style={{ color: 'var(--gold)' }}>DOCX to EPUB converter</Link> first, then validate here.</p>

                    <h2>Need Deeper Validation?</h2>
                    <p>This free epub checker catches structural errors that cause most platform rejections. For store-specific diagnostics — ghost spacing, duplicate ID errors, OPF manifest completeness, and cover dimension checks against KDP, Apple Books, and Google Play individually — <Link href="/tools/epub-validator-premium" style={{ color: 'var(--gold)' }}>EPUB Validator Pro</Link> runs a deeper pass and returns a per-store pass/fail report. Useful if you have had an EPUB rejected by a store without a clear reason.</p>

                    {/* FAQ */}
                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
                    />

                    <h2>Frequently Asked Questions</h2>

                    <h3>Is this EPUB validator free?</h3>
                    <p>Yes, completely free. No signup, no credit card, no account required. Unlimited use.</p>

                    <h3>Does my EPUB file get uploaded to a server?</h3>
                    <p>No. The epub checker runs entirely in your browser. Your file never leaves your device.</p>

                    <h3>What does this epub checker look for?</h3>
                    <p>It checks 9 structural elements: mimetype, container.xml, OPF file, spine, table of contents, image references, CSS files, accessibility attributes, and overall structure. Each returns a plain-English result.</p>

                    <h3>Does it work for KDP EPUB validation?</h3>
                    <p>Yes. The validator checks the structural requirements that Amazon KDP, Apple Books, Kobo, and other platforms use to accept or reject EPUB uploads.</p>

                    <h3>What is the difference between this tool and EPUBCheck?</h3>
                    <p>EPUBCheck is the W3C&apos;s official validator and requires Java and command-line access. This online epub checker runs the same structural checks in your browser with no installation. Results are in plain English, not raw XML error codes.</p>

                    <h3>My EPUB passed this checker but KDP still rejected it — why?</h3>
                    <p>KDP has additional content requirements beyond structural EPUB validation — image resolution, content policy, formatting guidelines. This tool checks your file&apos;s structure, not KDP&apos;s content policies. If your epub passes here but KDP rejects it, review KDP&apos;s submission guidelines for content-specific requirements.</p>

                    {/* CTA */}
                    <div style={{
                        marginTop: 'var(--space-12)', textAlign: 'center',
                        padding: 'var(--space-8)', background: 'var(--ink)',
                        borderRadius: 'var(--radius)', color: 'var(--cream)',
                    }}>
                        <h3 style={{ color: 'var(--cream)', marginBottom: 'var(--space-3)' }}>Ready to validate your EPUB?</h3>
                        <p style={{ color: 'rgba(247,243,236,.65)', maxWidth: 440, margin: '0 auto var(--space-6)', fontSize: 'var(--text-sm)' }}>
                            Free epub checker — no signup, no Java. Upload and get results in seconds.
                        </p>
                        <Link href="/tools/epub-validator" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Check My EPUB File Now
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}
