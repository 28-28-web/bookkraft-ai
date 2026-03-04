'use client';

import { useState, useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import UsageBar from '@/components/UsageBar';
import ToolCard from '@/components/ToolCard';
import { TOOLS } from '@/lib/tools';
import Link from 'next/link';

function DashboardContent() {
    const { user, profile, loading } = useAuth();
    const router = useRouter();
    const searchParams = useSearchParams();
    const [activeCat, setActiveCat] = useState('all');

    useEffect(() => {
        const cat = searchParams.get('cat');
        if (cat) setActiveCat(cat);
    }, [searchParams]);

    if (loading) {
        return (
            <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                    <div className="loading-state"><div className="spinner"></div> Loading...</div>
                </div>
            </div>
        );
    }

    const plan = profile?.plan || 'free';
    const runs = profile?.runs_this_month || 0;
    const filtered = activeCat === 'all' ? TOOLS : TOOLS.filter((t) => t.category === activeCat);
    const userName = user?.email?.split('@')[0] || 'author';

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <UsageBar plan={plan} runsUsed={runs} />
                <div className="dash-welcome">
                    <h1>Welcome back, {userName} 👋</h1>
                    <p>Pick a tool below to continue working on your book.</p>
                </div>
                <div className="cat-filter">
                    {['all', 'strategy', 'content', 'marketing', 'structure'].map((cat) => (
                        <button
                            key={cat}
                            className={`cat-btn ${activeCat === cat ? 'active' : ''}`}
                            onClick={() => setActiveCat(cat)}
                        >
                            {cat === 'all' ? 'All Tools' : cat.charAt(0).toUpperCase() + cat.slice(1)}
                        </button>
                    ))}
                </div>
                <div className="dash-tools-grid">
                    {filtered.map((t) => (
                        <ToolCard key={t.id} tool={t} />
                    ))}
                </div>
            </div>
        </div>
    );
}

export default function DashboardPage() {
    return (
        <Suspense fallback={
            <div className="app-layout">
                <div className="main-content" style={{ marginLeft: 240 }}>
                    <div className="loading-state"><div className="spinner"></div> Loading...</div>
                </div>
            </div>
        }>
            <DashboardContent />
        </Suspense>
    );
}
