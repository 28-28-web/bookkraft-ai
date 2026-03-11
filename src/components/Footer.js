import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="footer">
            <div className="footer-grid">
                <div>
                    <div className="footer-logo">BookKraft <span>AI</span></div>
                    <p className="footer-tagline">Professional eBook formatting tools for indie authors. Format once, publish everywhere.</p>
                    {/* Social links */}
                    <div style={{ display: 'flex', gap: 'var(--space-4)', marginTop: 'var(--space-4)' }}>
                        <a href="https://x.com/bookkraftai" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--mid)' }} aria-label="X">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </a>
                        <a href="https://www.facebook.com/bookkraftai" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--mid)' }} aria-label="Facebook">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </a>
                        <a href="https://www.reddit.com/r/bookkraftai" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--mid)' }} aria-label="Reddit">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0C5.373 0 0 5.373 0 12c0 6.627 5.373 12 12 12s12-5.373 12-12C24 5.373 18.627 0 12 0zm6.066 13.71c.149.375.226.77.226 1.166 0 2.267-2.636 4.112-5.882 4.112-3.246 0-5.882-1.845-5.882-4.112 0-.396.077-.791.226-1.166a1.405 1.405 0 01-.532-1.106c0-.779.633-1.412 1.412-1.412.374 0 .722.147.982.402 1.101-.756 2.579-1.225 4.18-1.28l.856-2.708 2.465.577c.132-.264.4-.446.713-.446a.808.808 0 11-.001 1.616.807.807 0 01-.712-.444l-2.168-.508-.727 2.303c1.538.071 2.953.542 4.016 1.288a1.4 1.4 0 01.981-.402c.779 0 1.412.633 1.412 1.412 0 .439-.2.832-.532 1.106zM9.268 14.629a.808.808 0 100-1.616.808.808 0 000 1.616zm5.464 0a.808.808 0 100-1.616.808.808 0 000 1.616zm-4.463 1.647c-.044-.044-.044-.117 0-.161.686.686 2.775.686 3.461 0 .044-.044.117-.044.161 0 .044.044.044.117 0 .161-.396.396-.965.594-1.811.594-.846 0-1.415-.198-1.811-.594z"/></svg>
                        </a>
                        <a href="https://www.linkedin.com/company/bookkraftai" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--mid)' }} aria-label="LinkedIn">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                        </a>
                        <a href="https://www.quora.com/profile/BookKraft-AI" target="_blank" rel="noopener noreferrer"
                            style={{ color: 'var(--mid)' }} aria-label="Quora">
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor"><path d="M12.738 17.625c-.684-1.291-1.504-2.587-2.944-2.587-.478 0-.947.159-1.282.467l-.758-.979c.655-.7 1.596-1.108 2.75-1.108 1.946 0 3.13 1.063 4.034 2.467.455-1.18.678-2.66.678-4.368 0-5.087-1.853-7.755-4.963-7.755-3.088 0-4.986 2.668-4.986 7.755 0 5.065 1.898 7.687 4.986 7.687.869 0 1.638-.18 2.316-.512l.169-.067zM12.253 24c-6.625 0-10.478-4.686-10.478-12.479C1.775 3.818 5.852 0 12.253 0 18.546 0 22.225 3.818 22.225 11.521c0 4.862-1.42 8.282-3.822 10.178.842 1.276 1.714 1.764 2.845 1.764.505 0 .964-.153 1.329-.365l.544 1.53c-.816.549-1.848.872-3.089.872-2.19 0-3.684-1.075-4.848-2.998-1.013.333-2.078.498-3.131.498z"/></svg>
                        </a>
                    </div>
                </div>
                <div>
                    <h4>Tools</h4>
                    <div className="footer-links">
                        <Link href="/tools/epub-validator">EPUB Validator</Link>
                        <Link href="/tools/metadata-builder">Metadata Builder</Link>
                        <Link href="/tools/kindle-format-fixer">Kindle Format Fixer</Link>
                        <Link href="/tools/toc-generator">TOC Generator</Link>
                    </div>
                </div>
                <div>
                    <h4>Company</h4>
                    <div className="footer-links">
                        <Link href="/pricing">Pricing</Link>
                        <a href="https://blog.bookkraftai.com" target="_blank" rel="noopener noreferrer">Blog</a>
                        <Link href="/contact">Contact</Link>
                        <Link href="/privacy">Privacy Policy</Link>
                        <Link href="/terms">Terms of Service</Link>
                    </div>
                </div>
                <div>
                    <h4>Get Started</h4>
                    <div className="footer-links">
                        <Link href="/free-tools">Try Free Tools</Link>
                        <Link href="/signup">Create Account</Link>
                        <Link href="/pricing">View Pricing</Link>
                    </div>
                </div>
            </div>
            <div className="footer-bottom">
                <span>&copy; {new Date().getFullYear()} BookKraft AI &middot; bookkraftai.com</span>
                <span style={{ fontSize: '11px', color: 'var(--mid)' }}>Payments by Paddle</span>
            </div>
        </footer>
    );
}
