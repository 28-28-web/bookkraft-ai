'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

const STEP_LABELS = {
    tool_start: 'Tool started',
    file_processed: 'File processed',
    report_completed: 'Report shown',
    fix_clicked: 'Fix clicked',
    checkout_started: 'Checkout started',
    purchase: 'Purchase',
};

export default function AdminAnalyticsPage() {
    const { profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [data, setData] = useState(null);
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        if (!authLoading) {
            if (!profile?.is_admin) { router.push('/dashboard'); return; }
            load();
        }
    }, [authLoading, profile]);

    // Real access control is server-side in /api/admin/analytics (verifies
    // is_admin before reading, over the direct Postgres connection). The
    // redirect above is only UX to avoid flashing the page at a non-admin.
    const load = async () => {
        try {
            const res = await fetch('/api/admin/analytics');
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || `status ${res.status}`);
            }
            setData(await res.json());
        } catch (err) {
            console.error('Analytics load error:', err.message || err);
            setLoadError(err.message || 'Failed to load analytics.');
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-6)' }}>Funnel Analytics</h1>
                <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                    First-party events over the last 30 days (7-day column where shown).
                </p>

                {loadError && (
                    <p style={{ padding: 'var(--space-4)', color: 'var(--rust)', fontSize: 'var(--text-sm)' }}>{loadError}</p>
                )}
                {!data && !loadError && (
                    <p style={{ padding: 'var(--space-4)', color: 'var(--mid)' }}>Loading…</p>
                )}

                {data && (
                    <>
                        {/* Funnel */}
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Conversion funnel (30 days)</h3>
                        <div className="admin-table" style={{ marginBottom: 'var(--space-8)' }}>
                            <div className="admin-table-row header">
                                <span>Step</span><span>Count</span><span>% of previous</span><span>% of top</span>
                            </div>
                            {data.funnel.map((f) => (
                                <div className="admin-table-row" key={f.step}>
                                    <span style={{ fontSize: 'var(--text-sm)' }}>{STEP_LABELS[f.step] || f.step}</span>
                                    <span style={{ fontWeight: 600 }}>{f.count.toLocaleString()}</span>
                                    <span style={{ color: f.pctOfPrev < 50 && f.step !== 'tool_start' ? 'var(--rust)' : 'var(--ink)' }}>
                                        {f.step === 'tool_start' ? '—' : `${f.pctOfPrev}%`}
                                    </span>
                                    <span style={{ color: 'var(--mid)' }}>{f.pctOfTop}%</span>
                                </div>
                            ))}
                        </div>

                        {/* Email capture */}
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Email capture rate (30 days)</h3>
                        <div className="stats-grid" style={{ marginBottom: 'var(--space-8)' }}>
                            <div className="stat-card">
                                <div className="stat-val">{data.emailCapture.rate}%</div>
                                <div className="stat-label">email_report / report_completed</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-val">{data.emailCapture.emailN.toLocaleString()}</div>
                                <div className="stat-label">Emails captured</div>
                            </div>
                            <div className="stat-card">
                                <div className="stat-val">{data.emailCapture.reportN.toLocaleString()}</div>
                                <div className="stat-label">Reports shown</div>
                            </div>
                        </div>

                        {/* Top tools */}
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Top tools by starts (30 days)</h3>
                        <div className="admin-table" style={{ marginBottom: 'var(--space-8)' }}>
                            <div className="admin-table-row header">
                                <span>Tool</span><span>tool_start count</span>
                            </div>
                            {data.topTools.map((t, i) => (
                                <div className="admin-table-row" key={i}>
                                    <span style={{ fontSize: 'var(--text-sm)' }}>{t.tool}</span>
                                    <span style={{ fontWeight: 600 }}>{t.n.toLocaleString()}</span>
                                </div>
                            ))}
                            {data.topTools.length === 0 && (
                                <p style={{ padding: 'var(--space-4)', color: 'var(--mid)' }}>No tool_start events yet.</p>
                            )}
                        </div>

                        {/* All event counts */}
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Event counts</h3>
                        <div className="admin-table">
                            <div className="admin-table-row header">
                                <span>Event</span><span>Last 7 days</span><span>Last 30 days</span>
                            </div>
                            {data.counts.map((c, i) => (
                                <div className="admin-table-row" key={i}>
                                    <span style={{ fontSize: 'var(--text-sm)' }}>{c.event_name}</span>
                                    <span>{c.last_7d.toLocaleString()}</span>
                                    <span>{c.last_30d.toLocaleString()}</span>
                                </div>
                            ))}
                            {data.counts.length === 0 && (
                                <p style={{ padding: 'var(--space-4)', color: 'var(--mid)' }}>No events yet.</p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
