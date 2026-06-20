import Link from 'next/link';

export const metadata = {
    title: 'Free Book Metadata Builder — KDP, IngramSpark, EPUB OPF | BookKraft AI',
    description: 'Free metadata builder for self-published books. Generate formatted metadata for Amazon KDP, IngramSpark, Draft2Digital, and EPUB OPF files. Auto-fills from your EPUB. No signup.',
    keywords: 'book metadata builder, kdp metadata, epub opf generator, bisac category finder, book metadata generator free, ingramspark metadata, draft2digital metadata',
    openGraph: {
        title: 'Free Book Metadata Builder — KDP, IngramSpark, EPUB OPF',
        description: 'Generate correctly formatted metadata for every major self-publishing platform. Upload your EPUB to auto-fill, or enter manually. Free, no signup.',
        url: 'https://bookkraftai.com/metadata-builder',
    },
    alternates: {
        canonical: 'https://bookkraftai.com/metadata-builder',
    },
};

export default function MetadataBuilderPage() {
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
                        Book Metadata Builder<br />
                        <em style={{ color: 'var(--gold)', fontWeight: 400 }}>One Form. Every Platform.</em>
                    </h1>
                    <p style={{ color: 'rgba(247,243,236,.65)', fontSize: '18px', maxWidth: 560, margin: '0 auto var(--space-8)' }}>
                        Upload your EPUB to auto-fill, or enter your book details manually.
                        Get correctly formatted metadata for KDP, IngramSpark, Draft2Digital, and EPUB OPF — instantly.
                    </p>
                    <Link href="/tools/metadata-builder" className="btn btn-gold" style={{ textDecoration: 'none', fontSize: '18px', padding: '14px 32px' }}>
                        Open Metadata Builder — Free
                    </Link>
                </div>
            </section>

            {/* What it checks */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>7 Metadata Checks — Built In</h2>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 'var(--space-4)',
                    }}>
                        {[
                            { check: 'Title & Author', desc: 'Confirms required fields are present before you upload anywhere' },
                            { check: 'BISAC Category', desc: 'Flags missing categories that cause Amazon to misplace your book' },
                            { check: 'Keywords', desc: 'Checks you are using enough of your 7 available KDP keyword slots' },
                            { check: 'Short Description', desc: 'Verifies your product-page blurb meets minimum length' },
                            { check: 'Long Description', desc: 'Checks your main sales copy is long enough to convert browsers' },
                            { check: 'ISBN / Identifier', desc: 'Flags missing identifiers needed for IngramSpark and wide distribution' },
                            { check: 'EPUB Auto-Extract', desc: 'Reads existing metadata straight out of your EPUB file automatically' },
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
                        <Link href="/tools/metadata-builder" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Build My Metadata Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Platform compatibility */}
            <section style={{ padding: 'var(--space-12) 0', background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: 'var(--space-6)' }}>
                        Exports formatted metadata for every major platform
                    </p>
                    <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--space-8)', flexWrap: 'wrap' }}>
                        {['Amazon KDP', 'IngramSpark', 'Draft2Digital', 'EPUB OPF', 'Apple Books', 'Kobo'].map((p, i) => (
                            <span key={i} style={{ color: 'var(--mid)', fontWeight: 600, fontSize: 'var(--text-base)' }}>{p}</span>
                        ))}
                    </div>
                </div>
            </section>

            {/* SEO Content */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>

                    <h2>What is a Book Metadata Builder?</h2>
                    <p>Book metadata is everything that describes your book to a platform: title, author, BISAC category, keywords, description, ISBN, price, and publication date. Each self-publishing platform wants this information in a slightly different format. KDP, IngramSpark, Draft2Digital, and EPUB OPF files all use different field names, different formatting rules, and different required fields. Getting metadata wrong is one of the most common reasons books get placed in the wrong category or rejected outright.</p>
                    <p>This free tool builds correctly formatted metadata for all four formats from one set of inputs, so you fill in your book details once instead of five times.</p>

                    <h2>Why Metadata Quality Matters</h2>
                    <p>Metadata is invisible to readers but it controls whether readers ever find your book. A missing BISAC category means Amazon can&apos;t place your book in the right genre shelf. Unused keyword slots mean you&apos;re leaving free discoverability on the table — KDP gives every book 7 keyword slots, and most authors use 2 or 3. A short product description hurts conversion on your book&apos;s sales page. None of these problems show up as an error message. They just quietly cost you sales.</p>

                    <h2>How to Use the Metadata Builder</h2>
                    <p>Drop your EPUB file into the tool and it automatically extracts your existing title, author, language, ISBN, description, and categories straight from the file. Review what was extracted, fill in any gaps, and the tool runs 7 checks against KDP&apos;s actual requirements. Export the result formatted for KDP, IngramSpark, Draft2Digital, or as a complete EPUB OPF file, ready to copy and paste.</p>

                    <h2>Common Metadata Mistakes This Tool Catches</h2>
                    <p>The most frequent issues found in self-published book metadata are: missing or incomplete BISAC categories, unused keyword slots (most authors fill only 2-3 of the available 7), short descriptions under 50 characters that don&apos;t sell the book, long descriptions under 200 characters that read as unfinished, and missing ISBN or ASIN identifiers required for wide distribution through IngramSpark.</p>

                    <h2>KDP vs. IngramSpark vs. Draft2Digital Metadata</h2>
                    <p>KDP uses its own field structure focused on keywords and a single primary category with an optional second. IngramSpark expects ONIX-style fields including contributor roles and multi-currency pricing, since it distributes to bookstores and libraries worldwide. Draft2Digital simplifies things for wide ebook distribution across multiple retailers at once. EPUB OPF is the technical metadata embedded directly in the file itself, read by every e-reader and storefront. This tool generates all four from the same inputs, formatted the way each platform expects.</p>

                    <h2>Who This Tool Is For</h2>
                    <p>First-time authors who don&apos;t know what a BISAC code is or why it matters. Authors publishing wide across multiple platforms who don&apos;t want to fill in the same fields five separate times. Anyone who has an EPUB file already and wants to extract and verify its metadata before final upload. The tool works in any browser, on Windows, Mac, or Linux, with no account required.</p>

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
                                        "name": "Is the Metadata Builder free?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, completely free. No signup, no credit card, no account required. Unlimited use."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Can it read metadata directly from my EPUB file?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. Drop your EPUB into the tool and it automatically extracts title, author, language, ISBN, description, and BISAC categories from the file's existing metadata."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Which platforms does this tool support?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "It generates formatted metadata for Amazon KDP, IngramSpark, Draft2Digital, and standalone EPUB OPF files."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What is a BISAC category and why does it matter?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "BISAC categories tell retailers which genre shelf your book belongs on. Missing or incorrect BISAC categories cause your book to be placed in the wrong category, making it harder for the right readers to find it."
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
                        <h3 style={{ color: 'var(--cream)', marginBottom: 'var(--space-3)' }}>Ready to build your book&apos;s metadata?</h3>
                        <p style={{ color: 'rgba(247,243,236,.65)', maxWidth: 440, margin: '0 auto var(--space-6)', fontSize: 'var(--text-sm)' }}>
                            Free, instant, no signup. Upload your EPUB or enter details manually.
                        </p>
                        <Link href="/tools/metadata-builder" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Open Free Metadata Builder
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}