
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

export default function AdminPage() {
    const { profile, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: '—', totalRevenue: '—', fullAccessUsers: '—', creditsSold: '—',
    });
    const [purchases, setPurchases] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState('overview');
    const [loadError, setLoadError] = useState('');

    useEffect(() => {
        if (!authLoading) {
            if (!profile?.is_admin) { router.push('/dashboard'); return; }
            loadAdminData();
        }
    }, [authLoading, profile]);

    // The real access control is server-side in /api/admin/data (verifies
    // is_admin before reading anything, over the direct Postgres
    // connection — never through a Supabase RLS policy reachable by any
    // authenticated client). The profile.is_admin redirect above is just
    // UX to avoid flashing the page at a non-admin; it is not what makes
    // this safe.
    const loadAdminData = async () => {
        try {
            const res = await fetch('/api/admin/data');
            if (!res.ok) {
                const body = await res.json().catch(() => ({}));
                throw new Error(body.error || `status ${res.status}`);
            }
            const data = await res.json();

            const allUsers = data.users || [];
            const allPurchases = data.purchases || [];
            const totalRevenue = allPurchases.reduce((s, p) => s + Number(p.amount_paid || 0), 0);
            const fullAccessCount = allUsers.filter(u => u.has_full_access).length;

            setStats({
                totalUsers: (data.totalUserCount ?? allUsers.length).toLocaleString(),
                totalRevenue: `$${totalRevenue.toFixed(2)}`,
                fullAccessUsers: fullAccessCount.toString(),
                creditsSold: (data.creditsSold ?? 0).toLocaleString(),
            });
            setUsers(allUsers.slice(0, 30));
            setPurchases(allPurchases.slice(0, 20));
        } catch (err) {
            console.error('Admin data error:', err.message || err);
            setLoadError(err.message || 'Failed to load admin data.');
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'users', label: 'Users' },
        { id: 'purchases', label: 'Purchases' },
    ];

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-6)' }}>Admin Panel</h1>

                {loadError && (
                    <p style={{ padding: 'var(--space-4)', color: 'var(--rust)', fontSize: 'var(--text-sm)' }}>
                        {loadError}
                    </p>
                )}

                {/* KPI Cards */}
                <div className="stats-grid">
                    <div className="stat-card">
                        <div className="stat-val">{stats.totalUsers}</div>
                        <div className="stat-label">Total Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-val">{stats.totalRevenue}</div>
                        <div className="stat-label">Total Revenue</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-val">{stats.fullAccessUsers}</div>
                        <div className="stat-label">Full Access Users</div>
                    </div>
                    <div className="stat-card">
                        <div className="stat-val">{stats.creditsSold}</div>
                        <div className="stat-label">Credits Sold</div>
                    </div>
                </div>

                {/* Tabs */}
                <div className="cat-filter" style={{ marginTop: 'var(--space-8)' }}>
                    {tabs.map(t => (
                        <button key={t.id} className={`cat-btn ${tab === t.id ? 'active' : ''}`}
                            onClick={() => setTab(t.id)}>{t.label}</button>
                    ))}
                </div>

                {/* Users Table */}
                {tab === 'overview' || tab === 'users' ? (
                    <div style={{ marginTop: 'var(--space-6)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Users</h3>
                        <div className="admin-table">
                            <div className="admin-table-row header">
                                <span>Email</span><span>Credits</span><span>Access</span><span>Joined</span>
                            </div>
                            {users.map((u, i) => (
                                <div className="admin-table-row" key={i}>
                                    <span style={{ fontSize: 'var(--text-sm)' }}>{u.email || 'Unknown'}</span>
                                    <span>{u.credits_balance || 0}</span>
                                    <span>
                                        {u.is_lifetime ? (
                                            <span className="badge" style={{ background: 'var(--gold)', color: 'var(--ink)', fontSize: '11px', padding: '2px 8px', borderRadius: '100px' }}>Lifetime</span>
                                        ) : u.has_full_access ? (
                                            <span className="badge" style={{ background: 'var(--gold-light)', color: 'var(--gold)', fontSize: '11px', padding: '2px 8px', borderRadius: '100px' }}>Full Access</span>
                                        ) : u.has_logic_bundle ? (
                                            <span className="badge" style={{ background: 'var(--sage-bg, #EDF5EC)', color: 'var(--sage)', fontSize: '11px', padding: '2px 8px', borderRadius: '100px' }}>Essentials</span>
                                        ) : (
                                            <span style={{ color: 'var(--mid)', fontSize: '11px' }}>Free</span>
                                        )}
                                    </span>
                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>
                                        {u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                ) : null}

                {/* Purchases Table */}
                {tab === 'purchases' && (
                    <div style={{ marginTop: 'var(--space-6)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Recent Purchases</h3>
                        <div className="admin-table">
                            <div className="admin-table-row header">
                                <span>Type</span><span>Amount</span><span>Credits</span><span>Date</span>
                            </div>
                            {purchases.map((p, i) => (
                                <div className="admin-table-row" key={i}>
                                    <span style={{ fontSize: 'var(--text-sm)' }}>{p.purchase_type}</span>
                                    <span>${Number(p.amount_paid || 0).toFixed(2)}</span>
                                    <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{p.credits_added || 0}</span>
                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>
                                        {new Date(p.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                            {purchases.length === 0 && <p style={{ padding: 'var(--space-4)', color: 'var(--mid)' }}>No purchases yet.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
