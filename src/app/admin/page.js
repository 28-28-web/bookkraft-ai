'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';

export default function AdminPage() {
    const { profile, supabase, loading: authLoading } = useAuth();
    const router = useRouter();
    const [stats, setStats] = useState({
        totalUsers: '—', totalRevenue: '—', fullAccessUsers: '—',
        creditsSold: '—', creditsSpent: '—',
    });
    const [purchases, setPurchases] = useState([]);
    const [creditTxns, setCreditTxns] = useState([]);
    const [users, setUsers] = useState([]);
    const [tab, setTab] = useState('overview');

    useEffect(() => {
        if (!authLoading) {
            if (!profile?.is_admin) { router.push('/dashboard'); return; }
            loadAdminData();
        }
    }, [authLoading, profile]);

    const loadAdminData = async () => {
        try {
            // Users
            const { data: allUsers, count: userCount } = await supabase
                .from('users').select('*', { count: 'exact' })
                .order('created_at', { ascending: false }).limit(50);

            // Purchases
            const { data: allPurchases } = await supabase
                .from('purchases').select('*')
                .order('created_at', { ascending: false }).limit(50);

            // Credit transactions
            const { data: allTxns } = await supabase
                .from('credit_transactions').select('*')
                .order('created_at', { ascending: false }).limit(50);

            const totalRevenue = (allPurchases || []).reduce((s, p) => s + Number(p.amount_paid || 0), 0);
            const fullAccessCount = (allUsers || []).filter(u => u.has_full_access).length;
            const creditsSold = (allTxns || []).filter(t => t.type === 'purchase').reduce((s, t) => s + t.credits, 0);
            const creditsSpent = (allTxns || []).filter(t => t.type === 'spend').reduce((s, t) => s + Math.abs(t.credits), 0);

            setStats({
                totalUsers: (userCount || (allUsers || []).length).toLocaleString(),
                totalRevenue: `$${totalRevenue.toFixed(2)}`,
                fullAccessUsers: fullAccessCount.toString(),
                creditsSold: creditsSold.toLocaleString(),
                creditsSpent: creditsSpent.toLocaleString(),
            });
            setUsers((allUsers || []).slice(0, 30));
            setPurchases((allPurchases || []).slice(0, 20));
            setCreditTxns((allTxns || []).slice(0, 30));
        } catch (err) {
            console.error('Admin data error:', err);
        }
    };

    const tabs = [
        { id: 'overview', label: 'Overview' },
        { id: 'users', label: 'Users' },
        { id: 'purchases', label: 'Purchases' },
        { id: 'credits', label: 'Credit Transactions' },
    ];

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <h1 style={{ fontSize: '1.75rem', marginBottom: 'var(--space-6)' }}>Admin Panel</h1>

                {/* 5 KPI Cards */}
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
                    <div className="stat-card">
                        <div className="stat-val">{stats.creditsSpent}</div>
                        <div className="stat-label">Credits Spent</div>
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

                {/* Credit Transactions Table */}
                {tab === 'credits' && (
                    <div style={{ marginTop: 'var(--space-6)' }}>
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Credit Transactions</h3>
                        <div className="admin-table">
                            <div className="admin-table-row header">
                                <span>Type</span><span>Credits</span><span>Tool</span><span>Date</span>
                            </div>
                            {creditTxns.map((t, i) => (
                                <div className="admin-table-row" key={i}>
                                    <span style={{
                                        fontSize: 'var(--text-sm)',
                                        color: t.type === 'purchase' ? 'var(--sage)' : t.type === 'refund' ? 'var(--gold)' : 'var(--rust)',
                                        fontWeight: 600,
                                    }}>{t.type}</span>
                                    <span style={{ fontWeight: 600, color: t.credits > 0 ? 'var(--sage)' : 'var(--rust)' }}>
                                        {t.credits > 0 ? '+' : ''}{t.credits}
                                    </span>
                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>{t.tool_slug || '—'}</span>
                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>
                                        {new Date(t.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                            {creditTxns.length === 0 && <p style={{ padding: 'var(--space-4)', color: 'var(--mid)' }}>No transactions yet.</p>}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
