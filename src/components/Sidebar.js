'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { TOOLS } from '@/lib/tools';
import ProjectSelector from '@/components/ProjectSelector';

const SIDEBAR_SECTIONS = [
    { label: 'Formatting', slugs: ['kindle-format-fixer', 'epub-formatter', 'manuscript-cleanup', 'print-to-digital'] },
    { label: 'Structure', slugs: ['toc-generator', 'front-matter-generator', 'back-matter-generator', 'css-snippet-generator'] },
    { label: 'Quality', slugs: ['epub-validator', 'style-sheet-auditor'] },
    { label: 'Publishing', slugs: ['metadata-builder', 'kdp-keyword-finder'] },
];

export default function Sidebar() {
    const { user, profile } = useAuth();
    const pathname = usePathname();
    const hasFullAccess = profile?.has_full_access || profile?.is_lifetime;
    const balance = profile?.credits_balance || 0;

    const isToolLocked = (tool) => {
        if (tool.free) return false;
        if (hasFullAccess) return false;
        if (tool.accessType === 'logic') return !profile?.has_logic_bundle;
        return false; // AI tools are never "locked" — just cost credits
    };

    return (
        <aside className="sidebar">
            {user && (
                <div className="sidebar-user">
                    <div className="sidebar-user-avatar">{user.email?.[0]?.toUpperCase() || 'U'}</div>
                    <div className="sidebar-user-info">
                        <div className="sidebar-user-name">{user.email?.split('@')[0]}</div>
                        <div className="sidebar-user-email">{user.email}</div>
                    </div>
                </div>
            )}

            {/* Credit balance chip */}
            {user && !profile?.is_lifetime && (
                <Link href="/pricing#credits" style={{
                    display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                    padding: '10px 12px', margin: '0 12px 12px', borderRadius: 'var(--radius)',
                    background: 'var(--gold-light)', border: '1px solid var(--border)',
                    textDecoration: 'none', color: 'var(--ink)',
                }}>
                    <span style={{ fontSize: 'var(--text-sm)' }}>
                        <span style={{ color: 'var(--gold)', fontWeight: 700 }}>{balance}</span> credits
                    </span>
                    <span style={{ fontSize: '12px', color: 'var(--gold)', fontWeight: 600 }}>Top Up &#8594;</span>
                </Link>
            )}

            {user && profile?.is_lifetime && (
                <div style={{
                    padding: '10px 12px', margin: '0 12px 12px', borderRadius: 'var(--radius)',
                    background: 'var(--gold)', textAlign: 'center',
                    fontSize: '12px', fontWeight: 700, color: 'var(--ink)',
                }}>
                    Lifetime Access
                </div>
            )}

            {/* Book project selector */}
            {user && <ProjectSelector />}

            {SIDEBAR_SECTIONS.map((section) => (
                <div className="sidebar-section" key={section.label}>
                    <div className="sidebar-label">{section.label}</div>
                    {section.slugs.map((slug) => {
                        const tool = TOOLS.find((t) => t.slug === slug);
                        if (!tool) return null;
                        const isActive = pathname === `/tools/${slug}`;
                        const locked = isToolLocked(tool);
                        return (
                            <Link href={`/tools/${slug}`} key={slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className={`sidebar-item ${isActive ? 'active' : ''}`}>
                                    <span>{tool.name}</span>
                                    {tool.free && <span className="sidebar-free-badge">FREE</span>}
                                </div>
                            </Link>
                        );
                    })}
                </div>
            ))}

            {/* Upgrade card: show if no bundle and not full access */}
            {user && !hasFullAccess && !profile?.has_logic_bundle && (
                <Link href="/checkout?plan=full" className="sidebar-upgrade" style={{ textDecoration: 'none' }}>
                    <h4>Get Full Access</h4>
                    <p>All logic tools + 30 AI credits.</p>
                    <span className="btn btn-gold btn-sm btn-full">$9.99 one-time &#8594;</span>
                </Link>
            )}

            {/* Low credit card */}
            {user && !profile?.is_lifetime && balance < 3 && balance >= 0 && (
                <Link href="/pricing#credits" className="sidebar-upgrade" style={{
                    textDecoration: 'none', borderColor: '#B45309',
                }}>
                    <h4 style={{ fontSize: '13px' }}>Low on credits</h4>
                    <p style={{ fontSize: '12px' }}>Top up to use AI tools.</p>
                    <span className="btn btn-outline btn-sm btn-full" style={{ borderColor: 'var(--gold)', color: 'var(--gold)' }}>
                        From $7.00 &#8594;
                    </span>
                </Link>
            )}
        </aside>
    );
}
