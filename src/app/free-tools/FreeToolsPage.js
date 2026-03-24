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
                        <span className="hero-badge-dot" /> No account needed
                    </div>
                    <h1 style={{ color: 'var(--cream)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>
                        Two Free Tools.<br /><em style={{ color: 'var(--gold)', fontWeight: 400 }}>No Signup.</em>
                    </h1>
                    <p style={{ color: 'rgba(247,243,236,.65)', fontSize: '18px', maxWidth: 520, margin: '0 auto' }}>
                        EPUB Validator and Metadata Builder work immediately.
                        No email, no credit card, no account. Just open and use.
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
                            <Link href="/tools/epub-validator" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>
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
                            Get all 5 logic tools for $4.99, or the Full Access bundle with 30 AI credits for $9.99. One-time. Forever.
                        </p>
                        <Link href="/pricing" className="btn btn-gold" style={{ textDecoration: 'none' }}>View Pricing</Link>
                    </div>
                </div>
            </section>
        </>
    );
}
