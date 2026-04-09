import Link from 'next/link';

export default function Footer() {
    return (
        <footer style={{ background: '#0F0E0C', color: '#7a7068', padding: '64px 24px 32px' }}>
            <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
                    <div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '20px', fontWeight: 700, color: '#F7F3EC', marginBottom: '12px' }}>
                            BookKraft <span style={{ color: '#C9933A' }}>AI</span>
                        </div>
                        <p style={{ fontSize: '13px', color: '#7a7068', lineHeight: 1.6, marginBottom: '16px' }}>
                            Professional eBook formatting tools for indie authors. Format once, publish everywhere.
                        </p>
                        <div style={{ display: 'flex', gap: '16px' }}>
                            <a href="https://x.com/BookkraftTools" target="_blank" rel="noopener noreferrer" aria-label="X" style={{ color: '#7a7068' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                            </a>
                            <a href="https://www.facebook.com/bookkraftai" target="_blank" rel="noopener noreferrer" aria-label="Facebook" style={{ color: '#7a7068' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                            </a>
                            <a href="https://linkedin.com/in/book-kraft-ai-b49a34401" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" style={{ color: '#7a7068' }}>
                                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                                 <div style={{ marginTop: '12px' }}>
                                 <a href="https://www.shipit.buzz/products/book-kraft-ai?ref=badge" 
                                   target="_blank" 
                                     rel="noopener noreferrer">
                                     <img src="https://www.shipit.buzz/api/products/book-kraft-ai/badge?theme=dark" 
                                        alt="Featured on Shipit" 
                                       style={{ height: '40px', width: 'auto' }
                            </a>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#F7F3EC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Tools</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Link href="/tools/epub-validator" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>EPUB Validator</Link>
                            <Link href="/tools/metadata-builder" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Metadata Builder</Link>
                            <Link href="/tools/kindle-format-fixer" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Kindle Format Fixer</Link>
                            <Link href="/tools/toc-generator" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>TOC Generator</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#F7F3EC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Company</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Link href="/pricing" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Pricing</Link>
                            <a href="https://blog.bookkraftai.com" target="_blank" rel="noopener noreferrer" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Blog</a>
                            <Link href="/contact" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Contact</Link>
                            <Link href="/privacy" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Privacy Policy</Link>
                            <Link href="/terms" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Terms of Service</Link>
                        </div>
                    </div>

                    <div>
                        <h4 style={{ fontSize: '13px', fontWeight: 600, color: '#F7F3EC', textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '16px' }}>Get Started</h4>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                            <Link href="/free-tools" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Try Free Tools</Link>
                            <Link href="/signup" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>Create Account</Link>
                            <Link href="/pricing" style={{ fontSize: '13px', color: '#7a7068', textDecoration: 'none' }}>View Pricing</Link>
                        </div>
                    </div>
                </div>

                <div style={{ borderTop: '1px solid rgba(247,243,236,0.08)', paddingTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '8px' }}>
                    <span style={{ fontSize: '12px', color: '#7a7068' }}>&copy; {new Date().getFullYear()} BookKraft AI &middot; bookkraftai.com</span>
                    <span style={{ fontSize: '11px', color: '#7a7068' }}>Payments by Paddle</span>
                </div>
            </div>
        </footer>
    );
}