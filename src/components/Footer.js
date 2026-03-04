import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
    return (
        <footer>
            <div className="footer-inner">
                <div className="footer-logo" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Image src="/logo.png" alt="BookKraft" width={28} height={28} />
                    Book<span>Kraft</span>
                </div>
                <div className="footer-links">
                    <Link href="/privacy">Privacy Policy</Link>
                    <Link href="/terms">Terms of Service</Link>
                    <Link href="/contact">Contact</Link>
                </div>
            </div>
            <div className="footer-inner">
                <p className="footer-copy">© 2026 BookKraft. Built for authors who are serious about their books.</p>
            </div>
        </footer>
    );
}
