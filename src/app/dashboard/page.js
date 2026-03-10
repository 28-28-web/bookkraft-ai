'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { TOOLS } from '@/lib/tools';
import { TOOL_CATEGORIES, TOOL_CREDIT_COSTS } from '@/lib/constants';
import Sidebar from '@/components/Sidebar';

export default function DashboardPage() {
    const { user, profile, loading } = useAuth();
    const [activeCategory, setActiveCategory] = useState('all');
    const router = useRouter();

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [loading, user, router]);

    if (loading) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="loading-state"><div className="spinner" /> Loading...</div>
                </main>
            </div>
        );
    }

    if (!user) return null;

    const filteredTools = activeCategory === 'all'
        ? TOOLS
        : TOOLS.filter((t) => t.category === activeCategory);

    const getToolState = (tool) => {
        if (tool.free) return 'free';
        if (profile?.is_lifetime || profile?.has_full_access) return 'full_access';
        if (tool.accessType === 'logic') {
            return profile?.has_logic_bundle ? 'logic_owned' : 'logic_locked';
        }
        // AI tool
        const cost = TOOL_CREDIT_COSTS[tool.slug] || 0;
        const balance = profile?.credits_balance || 0;
        return balance >= cost ? 'ai_enough' : 'ai_short';
    };

    const getStateBadge = (state, tool) => {
        const cost = TOOL_CREDIT_COSTS[tool.slug] || 0;
        switch (state) {
            case 'free': return <span className="badge badge-free">FREE</span>;
            case 'full_access': return <span className="badge" style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>Unlocked</span>;
            case 'logic_owned': return <span className="badge" style={{ background: 'var(--gold-light)', color: 'var(--gold)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>Owned</span>;
            case 'logic_locked': return <span className="badge" style={{ background: 'var(--border)', color: 'var(--mid)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>$4.99 Bundle</span>;
            case 'ai_enough': return <span className="badge badge-ai">{cost} credit{cost !== 1 ? 's' : ''}</span>;
            case 'ai_short': return <span className="badge" style={{ background: '#FEF2F2', color: 'var(--rust)', fontSize: '10px', padding: '2px 8px', borderRadius: '100px' }}>Top Up</span>;
            default: return null;
        }
    };

    const hour = new Date().getHours();
    const greeting = hour < 12 ? 'Good morning' : hour < 18 ? 'Good afternoon' : 'Good evening';
    const name = user?.email?.split('@')[0] || 'there';

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                {/* Greeting + credit bar */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--space-6)' }}>
                    <div>
                        <h1 style={{ fontSize: '1.75rem', marginBottom: '4px' }}>{greeting}, {name}.</h1>
                        <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)' }}>
                            {profile?.is_lifetime
                                ? 'Lifetime Access — all tools unlocked.'
                                : profile?.has_full_access
                                    ? 'Full Access — all tools unlocked.'
                                    : 'Your eBook formatting toolkit.'}
                        </p>
                    </div>
                    {/* Credit widget */}
                    {!profile?.is_lifetime && (
                        <Link href="/pricing#credits" style={{
                            display: 'flex', alignItems: 'center', gap: '8px',
                            padding: '8px 16px', background: 'var(--gold-light)',
                            border: '1px solid var(--border)', borderRadius: 'var(--radius)',
                            textDecoration: 'none', color: 'var(--ink)',
                        }}>
                            <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: 'var(--text-lg)' }}>
                                {profile?.credits_balance || 0}
                            </span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>credits</span>
                            <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)', fontWeight: 600 }}>Top Up</span>
                        </Link>
                    )}
                </div>

                {/* Category filter */}
                <div className="cat-filter">
                    {TOOL_CATEGORIES.map((c) => (
                        <button key={c.id} className={`cat-btn ${activeCategory === c.id ? 'active' : ''}`}
                            onClick={() => setActiveCategory(c.id)}>{c.label}</button>
                    ))}
                </div>

                {/* Tool grid */}
                <div className="dash-tools-grid" style={{ marginTop: 'var(--space-6)' }}>
                    {filteredTools.map((tool) => {
                        const state = getToolState(tool);
                        const isLocked = state === 'logic_locked';
                        const href = tool.free || state === 'full_access' || state === 'logic_owned' || state === 'ai_enough' || state === 'ai_short'
                            ? `/tools/${tool.slug}`
                            : '/pricing';

                        return (
                            <Link href={href} key={tool.slug} style={{ textDecoration: 'none', color: 'inherit' }}>
                                <div className="tool-card" style={{
                                    opacity: isLocked ? 0.7 : 1,
                                    position: 'relative',
                                }}>
                                    <div className="tool-card-top" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        {getStateBadge(state, tool)}
                                    </div>
                                    <h3 style={{ fontSize: 'var(--text-base)', marginTop: 'var(--space-3)' }}>{tool.name}</h3>
                                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', lineHeight: 1.5, marginTop: 'var(--space-2)', flex: 1 }}>
                                        {tool.desc}
                                    </p>
                                    <div className="tool-card-bottom" style={{ marginTop: 'var(--space-4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                                        <span style={{ fontSize: 'var(--text-sm)', color: isLocked ? 'var(--mid)' : 'var(--gold)', fontWeight: 600 }}>
                                            {isLocked ? 'Locked' : 'Open'}
                                        </span>
                                        <span style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>&#8594;</span>
                                    </div>
                                </div>
                            </Link>
                        );
                    })}
                </div>
            </main>
        </div>
    );
}
