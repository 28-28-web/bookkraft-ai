import Link from 'next/link';

export const metadata = {
    title: 'Kindle Format Fixer — Fix Smart Quotes & Encoding Errors Free | BookKraft AI',
    description: 'Free online tool to fix smart quotes, em dashes, encoding errors, and double spaces from Word or Google Docs exports. Format your manuscript for Kindle KDP or EPUB instantly.',
    keywords: 'kindle format fixer, fix smart quotes, word export encoding errors, fix em dash word, kdp formatting tool, fix double spaces manuscript, google docs export formatting',
    openGraph: {
        title: 'Kindle Format Fixer — Fix Word Export Errors Instantly',
        description: 'Fixes smart quotes, em dashes, encoding artifacts, double spaces, and line breaks from Word and Google Docs exports. Free, no signup.',
        url: 'https://bookkraftai.com/kindle-format-fixer',
    },
    alternates: {
        canonical: 'https://bookkraftai.com/kindle-format-fixer',
    },
};

export default function KindleFormatFixerPage() {
    return (
        <>
            {/* Hero */}
            <section style={{
                background: 'var(--ink)', padding: 'var(--space-24) 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <div className="hero-badge" style={{ justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
                        <span className="hero-badge-dot" /> Instant logic tool — no credits
                    </div>
                    <h1 style={{ color: 'var(--cream)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>
                        Kindle Format Fixer<br />
                        <em style={{ color: 'var(--gold)', fontWeight: 400 }}>Fix Word Export Mess in Seconds.</em>
                    </h1>
                    <p style={{ color: 'rgba(247,243,236,.65)', fontSize: '18px', maxWidth: 560, margin: '0 auto var(--space-8)' }}>
                        Paste your manuscript and instantly fix smart quotes, em dashes, double spaces,
                        and encoding artifacts left behind by Word or Google Docs exports.
                    </p>
                    <Link href="/tools/kindle-format-fixer" className="btn btn-gold" style={{ textDecoration: 'none', fontSize: '18px', padding: '14px 32px' }}>
                        Open Kindle Format Fixer — Free
                    </Link>
                </div>
            </section>

            {/* What it checks */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <h2 style={{ textAlign: 'center', marginBottom: 'var(--space-10)' }}>8 Formatting Fixes — Instant Results</h2>
                    <div style={{
                        display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                        gap: 'var(--space-4)',
                    }}>
                        {[
                            { check: 'Smart Quotes', desc: 'Converts straight quotes and apostrophes into proper curly typographic quotes' },
                            { check: 'Em Dashes', desc: 'Fixes double-hyphen and stray-hyphen patterns into correct em dash characters' },
                            { check: 'Double Spaces', desc: 'Collapses accidental double spacing left over from old typing habits' },
                            { check: 'Tab Indents', desc: 'Converts tab characters into clean, consistent paragraph indentation' },
                            { check: 'Line Breaks', desc: 'Normalizes Windows, Mac, and Unix line endings into one consistent format' },
                            { check: 'Blank Lines', desc: 'Removes excessive blank lines left by copy-pasting between documents' },
                            { check: 'HTML Tags', desc: 'Strips leftover HTML tags pasted in from Google Docs or web sources' },
                            { check: 'Encoding Artifacts', desc: 'Fixes garbled accented characters and broken Unicode from export errors' },
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
                        <Link href="/tools/kindle-format-fixer" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Fix My Manuscript Now
                        </Link>
                    </div>
                </div>
            </section>

            {/* Platform compatibility */}
            <section style={{ padding: 'var(--space-12) 0', background: 'var(--cream)', borderTop: '1px solid var(--border)', borderBottom: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto', textAlign: 'center' }}>
                    <p style={{ fontWeight: 700, fontSize: '16px', color: 'var(--ink)', marginBottom: 'var(--space-6)' }}>
                        Output is clean for every major platform
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

                    <h2>What Does a Kindle Format Fixer Do?</h2>
                    <p>When you write a manuscript in Word or Google Docs and export it, the file often carries hidden formatting problems: straight quotes instead of curly ones, double hyphens instead of proper em dashes, doubled-up spaces from old typing habits, and garbled characters from encoding mismatches. None of these show up clearly when you're writing. They show up after you upload to KDP, when your book looks unprofessional or triggers a formatting warning.</p>
                    <p>This free tool scans your pasted text and fixes all of these issues at once, instantly, in your browser.</p>

                    <h2>Why Smart Quotes and Em Dashes Matter</h2>
                    <p>Straight quotes (&quot;like this&quot;) read as amateur to readers used to professionally typeset books. Curly quotes (&ldquo;like this&rdquo;) are the standard in every published book. The same goes for em dashes — a double hyphen (--) looks like a typo, while a proper em dash (—) reads as intentional, polished prose. These are small details, but they're exactly the kind of detail that separates a manuscript that looks self-published from one that looks professionally produced.</p>

                    <h2>How to Use the Kindle Format Fixer</h2>
                    <p>Paste your manuscript text into the input box. The tool fixes smart quotes, em dashes, double spaces, tab indents, line breaks, blank lines, stray HTML, and encoding artifacts automatically, all toggleable individually if you only want some fixes applied. Copy the result or download it as a .txt file. No signup, no upload limit, no software install.</p>

                    <h2>Common Word Export Errors This Tool Catches</h2>
                    <p>The most frequent issues found in manuscripts exported from Word or Google Docs are: straight quotes left unconverted, double-hyphen dashes instead of em dashes, doubled spaces between sentences, tab characters instead of proper paragraph indents, inconsistent line endings between Windows and Mac systems, three or more blank lines stacked together from copy-paste, leftover HTML tags from web-based editors, and mojibake — garbled accented characters caused by encoding mismatches between systems.</p>

                    <h2>Manual Cleanup vs. Automated Fixing</h2>
                    <p>Fixing these issues manually with Find & Replace in Word works, but it's slow and easy to miss instances, especially in a full-length manuscript. This tool runs all eight fixes in a single pass and shows you exactly what was changed and how many instances of each issue were found, so you can verify the cleanup before publishing.</p>

                    <h2>Who This Tool Is For</h2>
                    <p>Self-publishing authors preparing a manuscript for KDP upload, anyone converting a Word or Google Docs file to EPUB, freelance editors doing a final formatting pass before delivery, and writers who paste text between multiple tools and pick up stray formatting along the way. Works in any browser, on Windows, Mac, or Linux.</p>

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
                                        "name": "Is the Kindle Format Fixer free?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes, completely free. No signup, no credit card, no account required. Unlimited use."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Does my manuscript get uploaded to a server?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "No. The tool runs entirely in your browser. Your text never leaves your device."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "What formatting errors does this tool fix?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "It fixes eight common issues: smart quotes, em dashes, double spaces, tab indents, inconsistent line breaks, excessive blank lines, stray HTML tags, and encoding artifacts from Word or Google Docs exports."
                                        }
                                    },
                                    {
                                        "@type": "Question",
                                        "name": "Will this work for both Kindle and EPUB formatting?",
                                        "acceptedAnswer": {
                                            "@type": "Answer",
                                            "text": "Yes. The fixes apply to plain text and carry over cleanly whether you're formatting for Kindle KDP, EPUB, or any other ebook platform."
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
                        <h3 style={{ color: 'var(--cream)', marginBottom: 'var(--space-3)' }}>Ready to clean up your manuscript?</h3>
                        <p style={{ color: 'rgba(247,243,236,.65)', maxWidth: 440, margin: '0 auto var(--space-6)', fontSize: 'var(--text-sm)' }}>
                            Free, instant, no signup. Paste your text and get a clean result in seconds.
                        </p>
                        <Link href="/tools/kindle-format-fixer" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                            Open Free Kindle Format Fixer
                        </Link>
                    </div>
                </div>
            </section>
        </>
    );
}