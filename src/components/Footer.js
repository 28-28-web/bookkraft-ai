import Link from 'next/link';
import { TOOLS } from '@/lib/tools';

export default function Footer() {
    return (
        <footer className="footer-v2" aria-label="Site footer">
            <div className="footer-v2-inner">
                <div className="footer-v2-grid">
                    <div>
                        <div className="footer-logo-v2">BookKraft <span>AI</span></div>
                        <p className="footer-tagline">
                            Professional eBook formatting for indie authors. {TOOLS.length} tools that make
                            your manuscript publishable on any platform.
                        </p>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <a href="https://x.com/BookkraftTools" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>X / Twitter</a>
                            <a href="https://www.linkedin.com/in/book-kraft-ai-b49a34401/" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>LinkedIn</a>
                            <a href="https://www.facebook.com/profile.php?id=61570875517722" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>Facebook</a>
                            <a href="https://reddit.com/r/bookkraftai" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>Reddit</a>
                            <a href="https://www.quora.com/profile/Book-Kraft" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>Quora</a>
                            <Link href="/contact" className="footer-link" style={{ marginBottom: 0 }}>Email</Link>
                        </div>
                    </div>
                    <div>
                        <p className="footer-col-title">Tools</p>
                        <Link href="/tools/epub-validator" className="footer-link">EPUB Validator</Link>
                        <Link href="/tools/metadata-builder" className="footer-link">Metadata Builder</Link>
                        <Link href="/tools/kindle-format-fixer" className="footer-link">Kindle Format Fixer</Link>
                        <Link href="/tools/toc-generator" className="footer-link">TOC Generator</Link>
                        <Link href="/tools/manuscript-cleanup" className="footer-link">Manuscript Cleanup</Link>
                        <Link href="/tools/style-sheet-auditor" className="footer-link">Style Sheet Auditor</Link>
                        <Link href="/tools/kdp-keyword-finder" className="footer-link">KDP Keyword Finder</Link>
                        <Link href="/tools/word-cleanup" className="footer-link">Word Cleanup Checker</Link>
                        <Link href="/tools/cover-checker" className="footer-link">Cover Checker</Link>
                        <Link href="/tools/manuscript-mode" className="footer-link">Full Manuscript Mode</Link>
                        <Link href="/free-tools" className="footer-link">All Free Tools</Link>
                    </div>
                    <div>
                        <p className="footer-col-title">Company</p>
                        <Link href="/pricing" className="footer-link">Pricing</Link>
                        <a href="https://blog.bookkraftai.com" className="footer-link" target="_blank" rel="noopener noreferrer">Blog</a>
                        <Link href="/contact" className="footer-link">Contact</Link>
                        <Link href="/privacy" className="footer-link">Privacy Policy</Link>
                        <Link href="/terms" className="footer-link">Terms of Service</Link>
                    </div>
                    <div>
                        <p className="footer-col-title">Get Started</p>
                        <Link href="/free-tools" className="footer-link">Try Free Tools</Link>
                        <Link href="/signup" className="footer-link">Create Account</Link>
                        <Link href="/pricing" className="footer-link">View Pricing</Link>
                    </div>
                </div>
                <div className="footer-v2-bottom">
                    <p className="footer-copy">© {new Date().getFullYear()} BookKraft AI · bookkraftai.com</p>
                    <p style={{ fontSize: 12, color: 'rgba(247,243,236,0.5)', width: '100%', textAlign: 'center', margin: '4px 0' }}>
                        BookKraft AI is a product of{' '}
                        <a href="https://thefclbd.com" target="_blank" rel="noopener noreferrer" style={{ color: 'rgba(247,243,236,0.6)', textDecoration: 'underline' }}>
                            Fateh Consortium Ltd (FCLBD)
                        </a>
                        , Bangladesh.
                    </p>
                    <p style={{ fontSize: 12, color: 'rgba(247,243,236,0.4)', width: '100%', textAlign: 'center', margin: '0 0 8px' }}>
                        🔒 Secure payments by Paddle &bull; 📧 hello@bookkraftai.com &bull; 🏢 Fateh Consortium Ltd, Bangladesh
                    </p>
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <a href="https://www.producthunt.com/products/book-kraft-ai?embed=true&utm_source=badge-featured&utm_medium=badge&utm_campaign=badge-bookkraft-ai" target="_blank" rel="noopener noreferrer">
                            <img alt="BookKraft AI - AI-powered EPUB and Kindle formatting for indie authors | Product Hunt" width={250} height={54} src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1220281&theme=dark&t=1786991332060" style={{ height: '36px', width: 'auto' }} />
                        </a>
                        <a
                            href="https://codetrendy.com/?utm_source=partner-site&utm_medium=badge"
                            target="_blank"
                            rel="nofollow noopener noreferrer"
                            style={{
                                display: 'inline-flex', alignItems: 'center',
                                gap: 8, height: '36px', padding: '0 12px',
                                fontSize: '13px',
                                border: '1px solid rgba(201,168,76,0.3)',
                                borderRadius: '6px', textDecoration: 'none',
                                background: 'rgba(255,255,255,0.03)',
                            }}
                        >
                            <img src="https://codetrendy.com/favicon.ico" alt="" width={14} height={14}
                                style={{ display: 'block', opacity: 0.8 }} />
                            <span style={{ color: 'rgba(247,243,236,0.45)', fontWeight: 500 }}>Listed on</span>
                            <span style={{ color: 'var(--gold)', fontWeight: 700 }}>CodeTrendy</span>
                        </a>
                    </div>
                    <span style={{ fontSize: 12, color: 'rgba(247,243,236,0.3)' }}>Payments by Paddle</span>
                </div>
            </div>
        </footer>
    );
}
