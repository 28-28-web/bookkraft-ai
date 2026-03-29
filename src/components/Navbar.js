'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user, profile } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); }, [pathname]);

  const isDashboard =
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/tools') ||
    pathname?.startsWith('/history') ||
    pathname?.startsWith('/account') ||
    pathname?.startsWith('/admin');

  const credits = profile?.credits_balance || 0;
  const creditColor = credits > 0 ? 'var(--sage)' : 'var(--rust)';

  return (
    <>
      <nav
        className={`navbar navbar-interactive ${scrolled ? 'scrolled' : ''}`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="navbar-inner">
          {/* Logo */}
          <Link href="/" aria-label="BookKraft AI — Home">
            <div className="nav-logo" style={{display:"flex",alignItems:"center",gap:"10px"}}>
              <img src="/bookkraft-logo.svg" alt="BookKraft AI logo" style={{width:"36px",height:"36px",borderRadius:"50%"}} />
              <span className="nav-logo-text">
                BookKraft <span>AI</span>
              </span>
              <span className="nav-logo-tagline">eBook Formatting Toolkit</span>
            </div>
          </Link>

          {/* Desktop nav links */}
          {!isDashboard && (
            <div className="nav-links">
              <Link
                href="/#tools-section"
                className={`nav-link nav-link-interactive ${pathname === '/' ? 'active' : ''}`}
              >
                Tools
              </Link>
              <Link
                href="/pricing"
                className={`nav-link nav-link-interactive ${pathname === '/pricing' ? 'active' : ''}`}
              >
                Pricing
              </Link>
              <Link
                href="/free-tools"
                className={`nav-link nav-link-interactive ${pathname === '/free-tools' ? 'active' : ''}`}
              >
                Free Tools
              </Link>
              <a
                href="https://blog.bookkraftai.com"
                className="nav-link nav-link-interactive"
                target="_blank"
                rel="noopener noreferrer"
              >
                Blog
              </a>
            </div>
          )}

          {/* Right actions */}
          <div className="nav-actions">
            {user ? (
              <>
                {profile && !profile.is_lifetime && (
                  <Link href="/pricing#credits" className="credit-chip-v2">
                    <span
                      className="credit-chip-dot"
                      style={{ background: creditColor }}
                      aria-hidden="true"
                    />
                    ✦ {credits} credits
                  </Link>
                )}
                {profile?.is_lifetime && (
                  <span className="badge-v2 badge-v2-ai">Lifetime</span>
                )}
                <Link href="/dashboard" className="nav-link nav-link-interactive">
                  Dashboard
                </Link>
                <Link href="/account" aria-label="Account settings">
                  <div className="nav-avatar" title={user.email}>
                    {user.email?.[0]?.toUpperCase() || 'U'}
                  </div>
                </Link>
              </>
            ) : (
              <>
                <Link href="/login" className="nav-signin">
                  Sign In
                </Link>
                <Link href="/signup" className="btn btn-sm btn-gold hover-lift">
                  Get Started Free
                </Link>
              </>
            )}

            {/* Mobile hamburger */}
            {!isDashboard && (
              <button
                className="mobile-menu-btn"
                onClick={() => setMobileOpen((v) => !v)}
                aria-expanded={mobileOpen}
                aria-label="Toggle navigation menu"
              >
                <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : 'none' }} />
                <span style={{ opacity: mobileOpen ? 0 : 1 }} />
                <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : 'none' }} />
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* Mobile nav drawer */}
      {!isDashboard && (
        <div className={`mobile-nav ${mobileOpen ? 'open' : ''}`} aria-hidden={!mobileOpen}>
          <Link href="/#tools-section" className="nav-link">Tools</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/free-tools" className="nav-link">Free Tools</Link>
          <a href="https://blog.bookkraftai.com" className="nav-link" target="_blank" rel="noopener noreferrer">Blog</a>
          {!user && (
            <Link href="/signup" className="btn btn-gold" style={{ marginTop: 8 }}>
              Get Started Free
            </Link>
          )}
        </div>
      )}
    </>
  );
}