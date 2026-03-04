'use client';

import { useAuth } from './AuthProvider';
import { useRouter, usePathname } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function Navbar() {
    const { user, signOut } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    const handleSignOut = async () => {
        await signOut();
        router.push('/');
    };

    // Don't show navbar on auth pages if they have their own
    const hideOn = ['/login', '/signup'];

    return (
        <nav id="main-nav">
            <div className="nav-inner">
                <Link href="/" className="nav-logo" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Image src="/logo.png" alt="BookKraft" width={32} height={32} />
                    Book<span>Kraft</span>
                </Link>
                {!user ? (
                    <div className="nav-links">
                        <Link href="/login" className="nav-btn nav-btn-ghost" style={{ textDecoration: 'none' }}>
                            Sign In
                        </Link>
                        <Link href="/signup" className="nav-btn nav-btn-primary" style={{ textDecoration: 'none' }}>
                            Start Free
                        </Link>
                    </div>
                ) : (
                    <div className="nav-links">
                        <Link href="/dashboard" className="nav-btn nav-btn-ghost" style={{ textDecoration: 'none' }}>
                            Dashboard
                        </Link>
                        <Link href="/upgrade" className="nav-btn nav-btn-ghost" style={{ textDecoration: 'none' }}>
                            Upgrade
                        </Link>
                        <div
                            className="nav-avatar"
                            onClick={() => router.push('/account')}
                            title="Account Settings"
                        >
                            {(user.email || 'U')[0].toUpperCase()}
                        </div>
                    </div>
                )}
            </div>
        </nav>
    );
}
