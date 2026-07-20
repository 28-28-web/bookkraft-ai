import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer-v2" aria-label="Site footer">
            <div className="footer-v2-inner">
                <div className="footer-v2-grid">
                    <div>
                        <div className="footer-logo-v2">BookKraft <span>AI</span></div>
                        <p className="footer-tagline">
                            Professional eBook formatting for indie authors. 12 tools that make
                            your manuscript publishable on any platform.
                        </p>
                        <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                            <a href="https://x.com/BookkraftTools" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>X / Twitter</a>
                            <a href="https://www.linkedin.com/in/book-kraft-ai-b49a34401/" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>LinkedIn</a>
                            <a href="https://www.facebook.com/profile.php?id=61570875517722" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>Facebook</a>
                            <a href="https://reddit.com/r/bookkraftai" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>Reddit</a>
                            <a href="https://www.quora.com/profile/Book-Kraft" className="footer-link" target="_blank" rel="noopener noreferrer" style={{ marginBottom: 0 }}>Quora</a>
                            <a href="mailto:hello@bookkraftai.com" className="footer-link" style={{ marginBottom: 0 }}>Email</a>
                        </div>
                    </div>
                    <div>
                        <p className="footer-col-title">Tools</p>
                        <Link href="/tools/epub-validator" className="footer-link">EPUB Validator</Link>
                        <Link href="/tools/metadata-builder" className="footer-link">Metadata Builder</Link>
                        <Link href="/tools/kindle-format-fixer" className="footer-link">Kindle Format Fixer</Link>
                        <Link href="/tools/toc-generator" className="footer-link">TOC Generator</Link>
                        <Link href="/tools/manuscript-cleanup" className="footer-link">Manuscript Cleanup</Link>
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
                    <div style={{ display: 'flex', gap: 12, alignItems: 'center', flexWrap: 'wrap' }}>
                        <a href="https://sellwithboost.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://sellwithboost.com/badge/listing.svg" alt="Listed on SellWithBoost" width="108" height="36" style={{ height: '36px', width: 'auto', opacity: 0.75 }} />
                        </a>
                        <a href="https://codetrendy.com" target="_blank" rel="noopener noreferrer">
                            <img src="https://codetrendy.com/api/badge?style=classic" alt="Listed on codetrendy.com" width="108" height="36" style={{ height: '36px', width: 'auto', opacity: 0.75 }} />
                        </a>
                        <a href="https://www.uneed.best/tool/bookkraft-ai" target="_blank" rel="noopener noreferrer">
                            <img src="https://www.uneed.best/EMBED3.png" alt="Launching on Uneed" width="108" height="36" style={{ height: '36px', width: 'auto', opacity: 0.75 }} />
                        </a>
                    </div>
                    <span style={{ fontSize: 12, color: 'rgba(247,243,236,0.3)' }}>Payments by Paddle</span>
                </div>
            </div>
        </footer>
    );
}
