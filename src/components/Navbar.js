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

    const navStyle = {
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        background: scrolled ? 'rgba(15,14,12,0.97)' : 'rgba(15,14,12,0.85)',
        backdropFilter: 'blur(12px)',
        borderBottom: scrolled ? '1px solid rgba(247,243,236,0.08)' : '1px solid transparent',
        transition: 'all 0.2s ease',
    };

    const innerStyle = {
        maxWidth: '1280px', margin: '0 auto',
        padding: '0 24px', height: '64px',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    };

    const linkStyle = {
        fontSize: '14px', color: 'rgba(247,243,236,0.7)',
        textDecoration: 'none', transition: 'color 0.15s',
    };

    return (
        <nav style={navStyle}>
            <div style={innerStyle}>
                <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <Image src="/logo.png" width={36} height={36} alt="BookKraft AI Logo" style={{ borderRadius: '6px' }} priority />
                    <div>
                        <div style={{ fontFamily: 'Georgia, serif', fontSize: '16px', fontWeight: 700, color: '#F7F3EC', lineHeight: 1.2 }}>
                            BookKraft <span style={{ color: '#C9933A' }}>AI</span>
                        </div>
                        <div style={{ fontSize: '10px', color: 'rgba(247,243,236,0.45)', letterSpacing: '0.05em' }}>
                            eBook Formatting Toolkit
                        </div>
                    </div>
                </Link>

                {!isDashboard && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
                        <Link href="#tools-section" style={linkStyle}>Tools</Link>
                        <Link href="/pricing" style={linkStyle}>Pricing</Link>
                        <Link href="/free-tools" style={linkStyle}>Free Tools</Link>
                        <a href="https://blog.bookkraftai.com" style={linkStyle} target="_blank" rel="noopener noreferrer">Blog</a>
                    </div>
                )}

                <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                    {user ? (
                        <>
                            {profile && !profile.is_lifetime && (
                                <Link href="/pricing#credits" style={{
                                    display: 'inline-flex', alignItems: 'center', gap: '6px',
                                    padding: '4px 12px', borderRadius: '100px', fontSize: '12px',
                                    fontWeight: 600, background: 'rgba(201,147,58,0.12)',
                                    color: '#C9933A', textDecoration: 'none',
                                    border: '1px solid rgba(201,147,58,0.2)',
                                }}>
                                    <span style={{
                                        width: '7px', height: '7px', borderRadius: '50%',
                                        background: (profile.credits_balance || 0) > 0 ? '#7a9e7e' : '#c0614a',
                                    }} />
                                    {profile.credits_balance || 0} credits
                                </Link>
                            )}
                            {profile?.is_lifetime && (
                                <span style={{
                                    padding: '4px 10px', borderRadius: '100px', fontSize: '11px',
                                    fontWeight: 600, background: '#C9933A', color: '#0F0E0C',
                                }}>Lifetime</span>
                            )}
                            <Link href="/dashboard" style={linkStyle}>Dashboard</Link>
                            <Link href="/account" style={{ textDecoration: 'none' }}>
                                <div style={{
                                    width: '32px', height: '32px', borderRadius: '50%',
                                    background: '#C9933A', color: '#0F0E0C',
                                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                                    fontSize: '13px', fontWeight: 700, cursor: 'pointer',
                                }}>
                                    {user.email?.[0]?.toUpperCase() || 'U'}
                                </div>
                            </Link>
                        </>
                    ) : (
                        <>
                            <Link href="/login" style={linkStyle}>Sign In</Link>
                            <Link href="/signup" style={{
                                padding: '8px 18px', borderRadius: '8px',
                                background: '#C9933A', color: '#0F0E0C',
                                fontWeight: 600, fontSize: '13px', textDecoration: 'none',
                            }}>Get Started Free</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}