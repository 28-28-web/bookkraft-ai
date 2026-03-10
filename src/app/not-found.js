import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Page Not Found — BookKraft AI',
    description: 'The page you are looking for does not exist.',
};

export default function NotFound() {
    return (
        <>
            <div style={{
                minHeight: '60vh', display: 'flex', flexDirection: 'column',
                alignItems: 'center', justifyContent: 'center',
                textAlign: 'center', padding: 'var(--space-16) var(--space-6)',
            }}>
                <h1 style={{ fontSize: 'var(--text-6xl)', color: 'var(--gold)', marginBottom: 'var(--space-4)' }}>404</h1>
                <h2 style={{ marginBottom: 'var(--space-4)' }}>Page Not Found</h2>
                <p style={{ color: 'var(--mid)', maxWidth: '400px', marginBottom: 'var(--space-8)' }}>
                    The page you&apos;re looking for doesn&apos;t exist or has been moved. Let us help you find your way.
                </p>
                <div style={{ display: 'flex', gap: 'var(--space-4)' }}>
                    <Link href="/" className="btn btn-gold" style={{ textDecoration: 'none' }}>
                        Go to Homepage
                    </Link>
                    <Link href="/free-tools" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                        Try Free Tools
                    </Link>
                </div>
            </div>
            <Footer />
        </>
    );
}
