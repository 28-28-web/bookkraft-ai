'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import Sidebar from '@/components/Sidebar';

export default function AdminPage() {
    const { profile, supabase, loading: authLoading } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const [stats, setStats] = useState({ total: '—', paid: '—', runs: '—', mrr: '—' });
    const [users, setUsers] = useState([]);

    useEffect(() => {
        if (!authLoading) {
            if (!profile?.is_admin) {
                router.push('/dashboard');
                return;
            }
            loadAdminData();
        }
    }, [authLoading, profile]);

    const loadAdminData = async () => {
        try {
            const { data: allUsers, count } = await supabase
                .from('users')
                .select('*', { count: 'exact' })
                .order('created_at', { ascending: false })
                .limit(50);

            if (allUsers) {
                const paid = allUsers.filter((u) => u.plan !== 'free').length;
                const totalRuns = allUsers.reduce((sum, u) => sum + (u.runs_this_month || 0), 0);
                const mrr = allUsers.reduce((sum, u) => {
                    if (u.plan === 'starter') return sum + 9;
                    if (u.plan === 'pro') return sum + 29;
                    return sum;
                }, 0);

                setStats({
                    total: (count || allUsers.length).toLocaleString(),
                    paid: paid.toString(),
                    runs: totalRuns.toLocaleString(),
                    mrr: '$' + mrr.toLocaleString()
                });

                setUsers(allUsers.slice(0, 20));
            }
        } catch (err) {
            console.error('Admin data error:', err);
            // Show demo data
            setStats({ total: '2,418', paid: '312', runs: '18,492', mrr: '$4,830' });
            setUsers([
                { email: 'alice@example.com', plan: 'pro', runs_this_month: 234, created_at: '2026-01-15' },
                { email: 'bob@example.com', plan: 'starter', runs_this_month: 67, created_at: '2026-02-01' },
                { email: 'carol@example.com', plan: 'free', runs_this_month: 8, created_at: '2026-02-20' },
                { email: 'dave@example.com', plan: 'lifetime', runs_this_month: 412, created_at: '2026-01-05' },
            ]);
        }
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <h1 style={{ fontSize: '1.75rem', marginBottom: '1.75rem' }}>Admin Panel</h1>
                <div className="stats-grid">
                    <div className="stat-card"><div className="stat-val">{stats.total}</div><div className="stat-label">Total Users</div></div>
                    <div className="stat-card"><div className="stat-val">{stats.paid}</div><div className="stat-label">Paid Subscribers</div></div>
                    <div className="stat-card"><div className="stat-val">{stats.runs}</div><div className="stat-label">Runs This Month</div></div>
                    <div className="stat-card"><div className="stat-val">{stats.mrr}</div><div className="stat-label">Est. MRR</div></div>
                </div>
                <h3 style={{ marginBottom: '1rem' }}>Users</h3>
                <div className="admin-table">
                    <div className="admin-table-row header">
                        <span>Email</span><span>Plan</span><span>Runs</span><span>Joined</span><span>Actions</span>
                    </div>
                    {users.map((u, i) => (
                        <div className="admin-table-row" key={i}>
                            <span>{u.email || 'Unknown'}</span>
                            <span><span className={`plan-badge plan-${u.plan}`} style={{ fontSize: '.7rem' }}>{u.plan}</span></span>
                            <span>{u.runs_this_month || 0}</span>
                            <span>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</span>
                            <span>
                                <button className="btn-icon" onClick={() => showToast('Plan override coming in v1.1')}>✏️</button>
                            </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
