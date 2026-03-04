'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from './AuthProvider';

export default function Sidebar({ activeTool }) {
    const pathname = usePathname();
    const { profile } = useAuth();

    const toolPages = pathname.startsWith('/tools/');

    return (
        <div className="sidebar">
            {toolPages ? (
                <>
                    <div className="sidebar-section">
                        <p className="sidebar-label">Tools</p>
                        <Link href="/dashboard" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">⬅️</span> Back to Dashboard
                        </Link>
                    </div>
                    <div className="sidebar-section">
                        <p className="sidebar-label">Categories</p>
                        <Link href="/dashboard?cat=strategy" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">🎯</span> Strategy
                        </Link>
                        <Link href="/dashboard?cat=content" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">✍️</span> Content
                        </Link>
                        <Link href="/dashboard?cat=marketing" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">📢</span> Marketing
                        </Link>
                        <Link href="/dashboard?cat=structure" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">🏗️</span> Structure
                        </Link>
                    </div>
                    <div className="sidebar-section">
                        <Link href="/history" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">🕐</span> History
                        </Link>
                        <Link href="/account" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">👤</span> Account
                        </Link>
                    </div>
                </>
            ) : pathname === '/dashboard' ? (
                <>
                    <div className="sidebar-section">
                        <p className="sidebar-label">Tools</p>
                        <Link href="/dashboard" className={`sidebar-item ${pathname === '/dashboard' ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">⚡</span> All Tools
                        </Link>
                        <Link href="/dashboard?cat=strategy" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">🎯</span> Strategy
                        </Link>
                        <Link href="/dashboard?cat=content" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">✍️</span> Content
                        </Link>
                        <Link href="/dashboard?cat=marketing" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">📢</span> Marketing
                        </Link>
                        <Link href="/dashboard?cat=structure" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">🏗️</span> Structure
                        </Link>
                    </div>
                    <div className="sidebar-section">
                        <p className="sidebar-label">Account</p>
                        <Link href="/history" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">🕐</span> History
                        </Link>
                        <Link href="/account" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <span className="sidebar-item-icon">👤</span> Account
                        </Link>
                        {profile?.is_admin && (
                            <Link href="/admin" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                                <span className="sidebar-item-icon">⚙️</span> Admin
                            </Link>
                        )}
                    </div>
                    <div className="sidebar-upgrade">
                        <h4>Upgrade to Pro</h4>
                        <p>Unlock all 12 tools and 500 runs/month.</p>
                        <Link href="/upgrade" className="btn btn-gold btn-sm" style={{ width: '100%', justifyContent: 'center', textDecoration: 'none' }}>
                            Upgrade Now
                        </Link>
                    </div>
                </>
            ) : (
                <div className="sidebar-section">
                    <Link href="/dashboard" className="sidebar-item" style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="sidebar-item-icon">⬅️</span> Dashboard
                    </Link>
                    <Link href="/history" className={`sidebar-item ${pathname === '/history' ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="sidebar-item-icon">🕐</span> History
                    </Link>
                    <Link href="/account" className={`sidebar-item ${pathname === '/account' ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="sidebar-item-icon">👤</span> Account
                    </Link>
                    <Link href="/upgrade" className={`sidebar-item ${pathname === '/upgrade' ? 'active' : ''}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                        <span className="sidebar-item-icon">⭐</span> Upgrade
                    </Link>
                </div>
            )}
        </div>
    );
}
