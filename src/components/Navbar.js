'use client';

import { useEffect, useState, useRef } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function Navbar() {
  const { user, profile } = useAuth();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const resourcesRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => { setMobileOpen(false); setResourcesOpen(false); }, [pathname]);

  // Close Resources dropdown on outside click
  useEffect(() => {
    function onClickOutside(e) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target)) {
        setResourcesOpen(false);
      }
    }
    document.addEventListener('mousedown', onClickOutside);
    return () => document.removeEventListener('mousedown', onClickOutside);
  }, []);

  const isToolRoute = pathname?.startsWith('/tools');
  const isAppRoute =
    pathname?.startsWith('/dashboard') ||
    pathname?.startsWith('/history') ||
    pathname?.startsWith('/account') ||
    pathname?.startsWith('/admin');

  const isDashboard = isAppRoute || (isToolRoute && !!user);

  const isResourcesActive =
    pathname === '/kdp-formatting-guide' ||
    pathname === '/alternatives' ||
    pathname === '/headshot';

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
              <img src="/bookkraft-logo.svg" alt="BookKraft AI logo" width="36" height="36" style={{width:"36px",height:"36px",borderRadius:"50%"}} />
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
                href="/free-tools"
                className={`nav-link nav-link-interactive ${pathname === '/free-tools' ? 'active' : ''}`}
              >
                Free Tools
              </Link>
              <Link
                href="/tools"
                className={`nav-link nav-link-interactive ${pathname === '/tools' ? 'active' : ''}`}
              >
                Paid Tools
              </Link>
              <Link
                href="/pricing"
                className={`nav-link nav-link-interactive ${pathname === '/pricing' ? 'active' : ''}`}
              >
                Pricing
              </Link>
              <Link
                href="/blog"
                className={`nav-link nav-link-interactive ${pathname === '/blog' ? 'active' : ''}`}
              >
                Blog
              </Link>

              {/* Resources dropdown */}
              <div ref={resourcesRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setResourcesOpen((v) => !v)}
                  className={`nav-link nav-link-interactive ${isResourcesActive ? 'active' : ''}`}
                  style={{
                    background: 'none',
                    border: 'none',
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    font: 'inherit',
                    color: 'inherit',
                  }}
                  aria-expanded={resourcesOpen}
                >
                  Resources
                  <span style={{ fontSize: '10px' }}>{resourcesOpen ? '▲' : '▼'}</span>
                </button>

                {resourcesOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 10px)',
                      left: 0,
                      background: 'var(--cream, #fff)',
                      border: '1px solid var(--border, rgba(0,0,0,0.1))',
                      borderRadius: 'var(--radius, 8px)',
                      boxShadow: '0 8px 24px rgba(0,0,0,0.08)',
                      minWidth: '200px',
                      padding: '6px',
                      zIndex: 50,
                    }}
                  >
                    <Link
                      href="/alternatives"
                      onClick={() => setResourcesOpen(false)}
                      style={{ display: 'block', padding: '10px 12px', borderRadius: '6px', textDecoration: 'none', color: 'var(--ink, #1a1a1a)', fontSize: '14px' }}
                    >
                      Alternatives
                    </Link>
                    <Link
                      href="/kdp-formatting-guide"
                      onClick={() => setResourcesOpen(false)}
                      style={{ display: 'block', padding: '10px 12px', borderRadius: '6px', textDecoration: 'none', color: 'var(--ink, #1a1a1a)', fontSize: '14px' }}
                    >
                      KDP Formatting Guide
                    </Link>
                    <a
                      href="https://bookkraft-ai.tolt.io"
                      onClick={() => setResourcesOpen(false)}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ display: 'block', padding: '10px 12px', borderRadius: '6px', textDecoration: 'none', color: 'var(--ink, #1a1a1a)', fontSize: '14px' }}
                    >
                      Affiliate Program
                    </a>
                    <Link
                      href="/headshot"
                      onClick={() => setResourcesOpen(false)}
                      style={{ display: 'block', padding: '10px 12px', borderRadius: '6px', textDecoration: 'none', color: 'var(--ink, #1a1a1a)', fontSize: '14px' }}
                    >
                      Author Headshot
                    </Link>
                  </div>
                )}
              </div>

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
          <Link href="/free-tools" className="nav-link">Free Tools</Link>
          <Link href="/tools" className="nav-link">Paid Tools</Link>
          <Link href="/pricing" className="nav-link">Pricing</Link>
          <Link href="/blog" className="nav-link">Blog</Link>
          <Link href="/alternatives" className="nav-link">Alternatives</Link>
          <Link href="/kdp-formatting-guide" className="nav-link">KDP Formatting Guide</Link>
          <a href="https://bookkraft-ai.tolt.io" className="nav-link" target="_blank" rel="noopener noreferrer">Affiliate Program</a>
          <Link href="/headshot" className="nav-link">Author Headshot</Link>
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