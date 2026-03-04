import Link from 'next/link';

export default function Footer() {
    return (
        <footer>
            <div className="footer-inner">
                <div className="footer-logo">📖 Book<span>Kraft</span></div>
                <div className="footer-links">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                    <a href="mailto:hello@bookkraftai.com">Contact</a>
                </div>
            </div>
            <div className="footer-inner">
                <p className="footer-copy">© 2026 BookKraft. Built for authors who are serious about their books.</p>
            </div>
        </footer>
    );
}
