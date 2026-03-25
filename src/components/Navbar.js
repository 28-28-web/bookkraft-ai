'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
    const { user, profile } = useAuth();
    const pathname = usePathname();
    const [scrolled, setScrolled] = useState(false);

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener('scroll', onScroll);
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    const isDashboard = pathname?.startsWith('/dashboard') || pathname?.startsWith('/tools') ||
        pathname?.startsWith('/history') || pathname?.startsWith('/account') || pathname?.startsWith('/admin');

    return (
        <nav className={`navbar ${scrolled ? 'scrolled' : ''}`}>
            <div className="navbar-inner">
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
<Image
  src="/logo.png"
  width={40}
  height={40}
  alt="Logo"
  style={{ borderRadius: '6px' }}
  priority
/>
                    <div className="nav-logo">
                        <div className="nav-logo-text">BookKraft <span>AI</span></div>
                        <div className="nav-logo-tagline">eBook Formatting Toolkit</div>
                    </div>
                </Link>

                {!isDashboard && (
                    <div className="nav-links">
                        <Link href="#tools-section" className="nav-link">Tools</Link>
                        <Link href="/pricing" className="nav-link">Pricing</Link>
                        <Link href="/free-tools" className="nav-link">Free Tools</Link>
                        <a href="https://blog.bookkraftai.com" className="nav-link" target="_blank" rel="noopener noreferrer">Blog</a>
                    </div>
                )}

                <div className="nav-actions">
                    {user ? (
                        <>
                            {/* Credit chip — v8.0 */}
                            {profile && !profile.is_lifetime && (
                                <Link href="/pricing#credits" className="credit-chip" style={{
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    gap: '6px',
                                    padding: '4px 12px',
                                    borderRadius: '100px',
                                    fontSize: '12px',
                                    fontWeight: 600,
                                    background: 'var(--gold-light)',
                                    color: 'var(--gold)',
                                    textDecoration: 'none',
                                    border: '1px solid var(--border)',
                                    transition: 'all .15s',
                                }}>
                                    <span style={{
                                        width: '7px', height: '7px', borderRadius: '50%',
                                        background: (profile.credits_balance || 0) > 0 ? 'var(--sage)' : 'var(--rust)',
                                    }} />
                                    {profile.credits_balance || 0} credits
                                </Link>
                            )}
                            {profile?.is_lifetime && (
                                <span style={{
                                    padding: '4px 10px', borderRadius: '100px', fontSize: '11px',
                                    fontWeight: 600, background: 'var(--gold)', color: 'var(--ink)',
                                }}>
                                    Lifetime
                                </span>
                            )}
                            <Link href="/dashboard" className="nav-link" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            <Link href="/account" style={{ textDecoration: 'none' }}>
                                <div className="nav-avatar">{user.email?.[0]?.toUpperCase() || 'U'}</div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" className="nav-signin" style={{ textDecoration: 'none' }}>Sign In</Link>
                            <Link href="/signup" className="btn btn-gold btn-sm" style={{ textDecoration: 'none' }}>Get Started Free</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
