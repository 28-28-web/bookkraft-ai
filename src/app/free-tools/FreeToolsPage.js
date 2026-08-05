'use client';

import Link from 'next/link';

export default function FreeToolsPage() {
    return (
        <>
            {/* Hero */}
            <section style={{
                background: 'var(--ink)', padding: 'var(--space-24) 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <div className="hero-badge" style={{ justifyContent: 'center', margin: '0 auto var(--space-6)' }}>
                        <span className="hero-badge-dot" /> Four need no account · One needs a free account
                    </div>
                    <h1 style={{ color: 'var(--cream)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>
                        Five Free Book Formatting Tools.<br /><em style={{ color: 'var(--gold)', fontWeight: 400 }}>No Subscription.</em>
                    </h1>
                    <p style={{ color: 'rgba(247,243,236,.65)', fontSize: '18px', maxWidth: 520, margin: '0 auto' }}>
                        EPUB Validator, Metadata Builder, Cover Checker, and Word Cleanup work immediately — no email, no account.
                        Full Manuscript Mode is also free with a free BookKraft account.
                    </p>
                </div>
            </section>

            {/* Tool Cards */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container" style={{ maxWidth: 800, margin: '0 auto' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: 'var(--space-8)' }}>

                        {/* EPUB Validator */}
                        <div style={{
                            background: 'var(--white)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', padding: 'var(--space-8)',
                        }}>
                            <span className="badge badge-free" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>FREE</span>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>EPUB Validator</h2>
                            <p style={{ color: 'var(--mid)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                                Upload any .epub file and get a full structural audit in seconds.
                                Checks mimetype, container.xml, OPF, spine, TOC, image refs, CSS, and accessibility.
                                Fix errors before uploading to KDP, Apple, or Kobo.
                            </p>
                            <ul style={{
                                listStyle: 'none', padding: 0, marginBottom: 'var(--space-6)',
                                display: 'grid', gap: 'var(--space-2)',
                            }}>
                                {['No Java required', 'Runs entirely in-browser', '9 validation checks', 'Traffic light severity', 'Unlimited use'].map((item, i) => (
                                    <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>✓ {item}</li>
                                ))}
                            </ul>
                               <Link href="/epub-validator" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>
                                Open EPUB Validator
                                 </Link>
                        </div>

                        {/* Metadata Builder */}
                        <div style={{
                            background: 'var(--white)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', padding: 'var(--space-8)',
                        }}>
                            <span className="badge badge-free" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>FREE</span>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>Metadata Builder</h2>
                            <p style={{ color: 'var(--mid)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                                Fill in one form, get perfectly formatted metadata for every platform.
                                KDP, IngramSpark, Draft2Digital, and EPUB OPF output — copy-paste ready.
                            </p>
                            <ul style={{
                                listStyle: 'none', padding: 0, marginBottom: 'var(--space-6)',
                                display: 'grid', gap: 'var(--space-2)',
                            }}>
                                {['4 platform outputs', '7 keyword slots', 'BISAC category support', 'Download as .txt', 'Unlimited use'].map((item, i) => (
                                    <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>✓ {item}</li>
                                ))}
                            </ul>
                            <Link href="/tools/metadata-builder" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>
                                Open Metadata Builder
                            </Link>
                        </div>

                        {/* Word Cleanup Checker */}
                        <div style={{
                            background: 'var(--white)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', padding: 'var(--space-8)',
                        }}>
                            <span className="badge badge-free" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>FREE</span>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>Word Manuscript Cleanup Checker</h2>
                            <p style={{ color: 'var(--mid)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                                Upload your .docx manuscript and instantly scan for double spaces, straight quotes,
                                stacked blank paragraphs, and stray bold/italic formatting before you publish.
                            </p>
                            <ul style={{
                                listStyle: 'none', padding: 0, marginBottom: 'var(--space-6)',
                                display: 'grid', gap: 'var(--space-2)',
                            }}>
                                {['No signup required', 'Runs entirely in-browser', '6 formatting checks', 'Read-only — never modifies your file', 'Unlimited use'].map((item, i) => (
                                    <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>✓ {item}</li>
                                ))}
                            </ul>
                            <Link href="/tools/word-cleanup" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>
                                Open Word Cleanup Checker
                            </Link>
                        </div>

                        {/* Cover Checker */}
                        <div style={{
                            background: 'var(--white)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', padding: 'var(--space-8)',
                        }}>
                            <span className="badge badge-free" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>FREE</span>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>Cover Checker</h2>
                            <p style={{ color: 'var(--mid)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                                Upload your cover and instantly check it against Amazon KDP and Apple Books pixel,
                                ratio, and format requirements before you upload it anywhere.
                            </p>
                            <ul style={{
                                listStyle: 'none', padding: 0, marginBottom: 'var(--space-6)',
                                display: 'grid', gap: 'var(--space-2)',
                            }}>
                                {['No signup required', 'Runs entirely in-browser', 'KDP + Apple Books checks', 'Measured locally — never uploaded', 'Unlimited use'].map((item, i) => (
                                    <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>✓ {item}</li>
                                ))}
                            </ul>
                            <Link href="/tools/cover-checker" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>
                                Open Cover Checker
                            </Link>
                        </div>

                        {/* Full Manuscript Mode */}
                        <div style={{
                            background: 'var(--white)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', padding: 'var(--space-8)',
                        }}>
                            <span className="badge badge-free" style={{ marginBottom: 'var(--space-4)', display: 'inline-flex' }}>FREE</span>
                            <h2 style={{ marginBottom: 'var(--space-3)' }}>Full Manuscript Mode</h2>
                            <p style={{ color: 'var(--mid)', lineHeight: 1.6, marginBottom: 'var(--space-6)' }}>
                                Upload your .docx or .txt manuscript and get a valid EPUB 3.0 file back in one step —
                                bold, italic, underline preserved, chapter detection, smart quotes, em dashes, and encoding fixes included.
                            </p>
                            <ul style={{
                                listStyle: 'none', padding: 0, marginBottom: 'var(--space-6)',
                                display: 'grid', gap: 'var(--space-2)',
                            }}>
                                {['Free BookKraft account required', 'Auto chapter detection', 'No Calibre or Sigil needed', 'Valid EPUB 3.0 output', 'Unlimited use'].map((item, i) => (
                                    <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>✓ {item}</li>
                                ))}
                            </ul>
                            <Link href="/tools/manuscript-mode" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>
                                Open Full Manuscript Mode
                            </Link>
                        </div>
                    </div>

                    {/* Platform compatibility */}
                    <section style={{
                        marginTop: 'var(--space-12)',
                        padding: 'var(--space-8)', background: 'var(--cream)',
                        border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                    }}>
                        <p style={{
                            textAlign: 'center', fontWeight: 700, fontSize: '16px',
                            color: 'var(--ink)', marginBottom: 'var(--space-6)',
                        }}>
                            Your formatted eBook works on every platform
                        </p>
                        <div style={{
                            display: 'flex', justifyContent: 'center', gap: 'var(--space-8)',
                            flexWrap: 'wrap', padding: '0 var(--space-4)',
                        }}>
                            {['Amazon KDP', 'Apple Books', 'Barnes & Noble', 'Kobo', 'Draft2Digital',
                              'Smashwords', 'OverDrive', 'Tolino', 'Scribd'].map((p, i) => (
                                <span key={i} style={{ color: 'var(--mid)', fontWeight: 600, fontSize: 'var(--text-base)' }}>{p}</span>
                            ))}
                        </div>
                        <p style={{
                            textAlign: 'center', color: 'var(--mid)', fontSize: 'var(--text-sm)',
                            marginTop: 'var(--space-6)', letterSpacing: '0.15em', textTransform: 'uppercase',
                        }}>
                            And more...
                        </p>
                    </section>

                    {/* Upsell */}
                    <div style={{
                        marginTop: 'var(--space-12)', textAlign: 'center',
                        padding: 'var(--space-8)', background: 'var(--ink)',
                        borderRadius: 'var(--radius)', color: 'var(--cream)',
                    }}>
                        <h3 style={{ color: 'var(--cream)', marginBottom: 'var(--space-3)' }}>Need more tools?</h3>
                        <p style={{ color: 'rgba(247,243,236,.65)', maxWidth: 440, margin: '0 auto var(--space-6)', fontSize: 'var(--text-sm)' }}>
                            Starter gets you all 5 logic tools + 40 AI credits for $19. Pro steps up to 200 credits for $49. One-time. Forever.
                        </p>
                        <Link href="/pricing" className="btn btn-gold" style={{ textDecoration: 'none' }}>View Pricing</Link>
                    </div>

                </div>
            </section>

            {/* SEO Content */}
            <section style={{ padding: 'var(--space-16) 0', borderTop: '1px solid var(--border)' }}>
                <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 1rem' }}>
                    <p>These five tools cover the most common technical tasks before publishing an ebook: validating your EPUB structure, building KDP-ready metadata, checking your cover dimensions, cleaning up your Word manuscript, and converting a .docx file to a valid EPUB. Four of them work right away — open the page and start, no email address needed. The fifth (Full Manuscript Mode) requires a free BookKraft account because the converted file needs somewhere to go.</p>

                    <h2>Free Book Formatting Tools for Self-Publishers</h2>
                    <p>Publishing a book takes more than just writing. The formatting, metadata, file validation, cover specs — it all adds up. These free book formatting tools handle the technical side so you can focus on the work that actually matters.</p>

                    <h2>EPUB Validator</h2>
                    <p>Before you upload your ebook to KDP, Apple Books, or Kobo, it needs to pass structural validation. The EPUB Validator checks your file for mimetype errors, container issues, OPF problems, spine errors, broken image references, CSS conflicts, and accessibility gaps. It runs entirely in your browser — no Java, no account, no upload limit. Fix errors before they cause rejections.</p>

                    <h2>Metadata Builder</h2>
                    <p>Good metadata helps readers find your book. Fill in one form and get perfectly formatted metadata output for Amazon KDP, IngramSpark, Draft2Digital, and EPUB OPF — all at once. Includes 7 keyword slots, BISAC category support, and a downloadable text file. No account needed. Unlimited use.</p>

                    <h2>DOCX to EPUB Converter</h2>
                    <p>Upload your .docx or .txt manuscript and get a valid EPUB 3.0 back in one step. Bold, italic, and underline are preserved. Chapter detection, smart quote fixes, em dash corrections, and encoding cleanup are all applied automatically. No Calibre, no Sigil, no desktop software. Free with a BookKraft account.</p>

                    <h2>Word Manuscript Cleanup Checker</h2>
                    <p>Before you send a manuscript to a formatter or upload it to KDP, run it through a quick technical scan. Upload your .docx file and the checker reports double spaces, straight quotes, stacked blank paragraphs, trailing spaces, double hyphens, and manually-applied formatting. It is read-only — your file is parsed in your browser and never modified or uploaded.</p>

                    <h2>Who These Tools Are For</h2>
                    <p>Self-publishing authors who want to handle book formatting without paying a formatting service. Freelance editors who want to deliver cleaner files faster. Anyone who needs the technical side of ebook formatting handled without expensive software or a monthly subscription. All five tools work immediately in any browser — no email, no credit card required (except the EPUB converter, which needs a free BookKraft account).</p>

                    <h2>Book Formatting Services vs. DIY</h2>
                    <p>A professional book formatting service typically charges $100–$400+ and takes several days to turn around. BookKraft's self-serve tools handle the same technical tasks in seconds — EPUB conversion, file validation, metadata prep, cover spec checks. The tradeoff: you are doing it yourself rather than handing it off to someone else.</p>

                    <h2>Frequently Asked Questions</h2>

                    <h3>What is book formatting for self-publishing?</h3>
                    <p>Book formatting prepares your manuscript for digital distribution — converting files to EPUB or PDF, fixing formatting errors, validating structure, and building metadata for each platform. For ebooks, it means producing a valid EPUB 3.0 that Amazon KDP, Apple Books, and Kobo will accept.</p>

                    <h3>How do these tools compare to a paid book formatting service?</h3>
                    <p>A book formatting service charges $100–$400+ for a human to format your manuscript. These tools are self-serve — the technical work is automated and you stay in control of your files and timeline.</p>

                    <h3>What ebook format does Amazon KDP require?</h3>
                    <p>KDP accepts EPUB and DOCX. The recommended format is EPUB 3.0 — use the <a href="/tools/manuscript-mode" style={{ color: 'var(--gold)' }}>DOCX to EPUB converter</a> to generate it and the <a href="/epub-validator" style={{ color: 'var(--gold)' }}>EPUB Validator</a> to check it before uploading.</p>

                    <h3>Can I format a book for self-publishing for free?</h3>
                    <p>Yes. All five tools on this page are free. No subscription, no credit card. The EPUB Converter requires a free BookKraft account; the other four need no account at all.</p>

                    <h3>Do I need Calibre or Sigil to format an ebook?</h3>
                    <p>No. These tools run in your browser — no desktop software to install. Upload your .docx or .epub file and get results immediately.</p>

                    <h3>Do I need to create an account to use these tools?</h3>
                    <p>Four of the five tools need no account — EPUB Validator, Metadata Builder, Cover Checker, and Word Manuscript Cleanup Checker work immediately in any browser. Full Manuscript Mode requires a free BookKraft account because your converted file needs somewhere to go. No credit card is required for any of the free tools.</p>

                    <h3>Are these tools really free, or is there a catch?</h3>
                    <p>No catch. The four no-account tools are free with no usage limit — run them as many times as you need. Full Manuscript Mode is also free; it just requires an account so we can deliver your converted file. We don&apos;t ask for payment to access any of the free tools.</p>

                    <h3>Do these tools work on Windows, Mac, and Linux?</h3>
                    <p>Yes. All five run in any modern browser on any operating system. There&apos;s nothing to download or install — if your browser can open a webpage, the tools work.</p>

                    <h2>Need More Tools?</h2>
                    <p>The free tools cover core ebook formatting tasks. For AI-powered manuscript cleanup, KDP keyword research, back matter generation, print-to-digital conversion, and more — explore the full <a href="/pricing" style={{ color: 'var(--gold)' }}>BookKraft AI toolkit</a>. One-time purchase, no monthly fees.</p>
                </div>
            </section>
        </>
    );
}