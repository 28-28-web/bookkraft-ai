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
        </>
    );
}
