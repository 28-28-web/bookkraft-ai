'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import Sidebar from '@/components/Sidebar';
import Modal from '@/components/Modal';

export default function AccountPage() {
    const { user, profile, signOut, supabase, loading } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const [tab, setTab] = useState('profile');
    const [newPassword, setNewPassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState('');
    const [creditHistory, setCreditHistory] = useState([]);
    const [purchaseHistory, setPurchaseHistory] = useState([]);

    useEffect(() => {
        if (!loading && !user) router.replace('/login');
    }, [loading, user, router]);

    useEffect(() => {
        if (user && supabase) {
            loadHistory();
        }
    }, [user, supabase]);

    const loadHistory = async () => {
        const { data: txns } = await supabase
            .from('credit_transactions').select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false }).limit(30);
        setCreditHistory(txns || []);

        const { data: purchases } = await supabase
            .from('purchases').select('*')
            .eq('user_id', user.id)
            .order('created_at', { ascending: false }).limit(20);
        setPurchaseHistory(purchases || []);
    };

    const handleUpdatePassword = async () => {
        if (!newPassword) { showToast('Enter a new password first', 'error'); return; }
        if (newPassword.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            showToast('Password updated successfully');
            setNewPassword('');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const handleDeleteAccount = async () => {
        if (deleteConfirm !== 'DELETE') {
            showToast('Type DELETE to confirm', 'error');
            return;
        }
        setShowDeleteModal(false);
        await signOut();
        showToast('Account deleted. Sorry to see you go.');
        router.push('/');
    };

    const handleSignOut = async () => {
        await signOut();
        showToast('Signed out successfully.');
        router.push('/');
    };

    if (loading || !user) return (
        <div className="app-layout"><Sidebar /><main className="main-content">
            <div className="loading-state"><div className="spinner" /> Loading...</div>
        </main></div>
    );

    const tabs = [
        { id: 'profile', label: 'Profile' },
        { id: 'credits', label: 'My Tools & Credits' },
        { id: 'billing', label: 'Billing' },
        { id: 'danger', label: 'Danger Zone' },
    ];

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <h1 style={{ fontSize: '1.75rem', marginBottom: '.25rem' }}>Account Settings</h1>
                <p style={{ color: 'var(--mid)', marginBottom: 'var(--space-6)', fontSize: 'var(--text-sm)' }}>
                    Manage your profile, credits, and billing.
                </p>

                {/* Tab bar */}
                <div className="cat-filter" style={{ marginBottom: 'var(--space-6)' }}>
                    {tabs.map(t => (
                        <button key={t.id} className={`cat-btn ${tab === t.id ? 'active' : ''}`}
                            onClick={() => setTab(t.id)}>{t.label}</button>
                    ))}
                </div>

                {/* ── Profile Tab ── */}
                {tab === 'profile' && (
                    <div className="account-grid">
                        <div className="account-section">
                            <h3>Email</h3>
                            <input className="form-input" type="email" value={user?.email || ''} readOnly
                                style={{ background: 'var(--cream)', cursor: 'not-allowed' }} />
                        </div>
                        <div className="account-section">
                            <h3>Change Password</h3>
                            <input className="form-input" type="password" placeholder="New password (min 8 chars)"
                                value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
                            <button className="btn btn-outline btn-sm" style={{ marginTop: 'var(--space-3)' }}
                                onClick={handleUpdatePassword}>Update Password</button>
                        </div>
                        <div className="account-section">
                            <button className="btn btn-outline btn-sm" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                )}

                {/* ── My Tools & Credits Tab ── */}
                {tab === 'credits' && (
                    <div>
                        {/* Credit balance card */}
                        <div style={{
                            background: 'var(--gold-light)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', padding: 'var(--space-6)',
                            marginBottom: 'var(--space-6)', display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        }}>
                            <div>
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', marginBottom: '4px' }}>Credit Balance</p>
                                <p style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--gold)' }}>
                                    {profile?.credits_balance || 0} <span style={{ fontSize: 'var(--text-sm)', fontWeight: 400 }}>credits</span>
                                </p>
                            </div>
                            <Link href="/pricing#credits" className="btn btn-gold btn-sm" style={{ textDecoration: 'none' }}>
                                Top Up Credits
                            </Link>
                        </div>

                        {/* Access level */}
                        <div style={{
                            background: 'var(--white)', border: '1px solid var(--border)',
                            borderRadius: 'var(--radius)', padding: 'var(--space-6)',
                            marginBottom: 'var(--space-6)',
                        }}>
                            <h3 style={{ marginBottom: 'var(--space-3)' }}>Access Level</h3>
                            <p style={{ fontSize: 'var(--text-sm)' }}>
                                {profile?.is_lifetime ? (
                                    <span style={{ background: 'var(--gold)', color: 'var(--ink)', padding: '4px 12px', borderRadius: '100px', fontWeight: 600, fontSize: '12px' }}>Lifetime</span>
                                ) : profile?.has_full_access ? (
                                    <span style={{ background: 'var(--gold-light)', color: 'var(--gold)', padding: '4px 12px', borderRadius: '100px', fontWeight: 600, fontSize: '12px' }}>Full Access</span>
                                ) : profile?.has_logic_bundle ? (
                                    <span style={{ background: '#EDF5EC', color: 'var(--sage)', padding: '4px 12px', borderRadius: '100px', fontWeight: 600, fontSize: '12px' }}>Essentials Bundle</span>
                                ) : (
                                    <span style={{ color: 'var(--mid)' }}>Free — <Link href="/pricing" style={{ color: 'var(--gold)' }}>Upgrade</Link></span>
                                )}
                            </p>
                            {profile?.has_logic_bundle && (
                                <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', marginTop: 'var(--space-3)' }}>
                                    Logic tools: Kindle Format Fixer, EPUB Formatter, TOC Generator, Front Matter Generator, CSS Snippet Generator
                                </p>
                            )}
                        </div>

                        {/* Credit history */}
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Credit History</h3>
                        <div className="admin-table">
                            <div className="admin-table-row header">
                                <span>Type</span><span>Credits</span><span>Tool</span><span>Date</span>
                            </div>
                            {creditHistory.map((t, i) => (
                                <div className="admin-table-row" key={i}>
                                    <span style={{
                                        fontSize: 'var(--text-sm)', fontWeight: 600,
                                        color: t.type === 'purchase' ? 'var(--sage)' : 'var(--rust)',
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
                            {creditHistory.length === 0 && (
                                <p style={{ padding: 'var(--space-4)', color: 'var(--mid)', fontSize: 'var(--text-sm)' }}>
                                    No credit transactions yet. <Link href="/pricing#credits" style={{ color: 'var(--gold)' }}>Buy credits</Link>
                                </p>
                            )}
                        </div>
                    </div>
                )}

                {/* ── Billing Tab ── */}
                {tab === 'billing' && (
                    <div>
                        <h3 style={{ marginBottom: 'var(--space-4)' }}>Purchase History</h3>
                        <div className="admin-table">
                            <div className="admin-table-row header">
                                <span>Purchase</span><span>Amount</span><span>Credits</span><span>Date</span>
                            </div>
                            {purchaseHistory.map((p, i) => (
                                <div className="admin-table-row" key={i}>
                                    <span style={{ fontSize: 'var(--text-sm)' }}>{p.purchase_type}</span>
                                    <span>${Number(p.amount_paid || 0).toFixed(2)}</span>
                                    <span style={{ color: 'var(--gold)', fontWeight: 600 }}>{p.credits_added || 0}</span>
                                    <span style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>
                                        {new Date(p.created_at).toLocaleDateString()}
                                    </span>
                                </div>
                            ))}
                            {purchaseHistory.length === 0 && (
                                <p style={{ padding: 'var(--space-4)', color: 'var(--mid)', fontSize: 'var(--text-sm)' }}>
                                    No purchases yet. <Link href="/pricing" style={{ color: 'var(--gold)' }}>View pricing</Link>
                                </p>
                            )}
                        </div>
                        <p style={{ color: 'var(--mid)', fontSize: '12px', marginTop: 'var(--space-6)' }}>
                            Need a refund? Email hello@bookkraftai.com within 7 days of purchase. Payments processed by Paddle.
                        </p>
                    </div>
                )}

                {/* ── Danger Zone Tab ── */}
                {tab === 'danger' && (
                    <div className="account-section danger-zone" style={{
                        border: '1px solid var(--rust)', borderRadius: 'var(--radius)',
                        padding: 'var(--space-6)', background: '#FEF2F2',
                    }}>
                        <h3 style={{ color: 'var(--rust)' }}>Delete Account</h3>
                        <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', marginBottom: 'var(--space-4)' }}>
                            Permanently delete your account and all data. This cannot be undone. All credits, history, and purchases will be removed.
                        </p>
                        <button className="btn btn-sm" style={{ background: 'var(--rust)', color: 'white' }}
                            onClick={() => setShowDeleteModal(true)}>Delete My Account</button>
                    </div>
                )}
            </div>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <h3 style={{ color: 'var(--rust)' }}>Delete your account?</h3>
                <p style={{ margin: 'var(--space-4) 0' }}>
                    This permanently deletes your account, all history, credits, and purchases. This cannot be undone.
                </p>
                <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-3)' }}>
                    Type DELETE to confirm:
                </p>
                <input className="form-input" type="text" value={deleteConfirm}
                    onChange={(e) => setDeleteConfirm(e.target.value)} placeholder="Type DELETE" />
                <div className="modal-actions" style={{ marginTop: 'var(--space-4)' }}>
                    <button className="btn btn-outline btn-sm" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    <button className="btn btn-sm" style={{ background: 'var(--rust)', color: 'white' }}
                        onClick={handleDeleteAccount} disabled={deleteConfirm !== 'DELETE'}>Yes, Delete Forever</button>
                </div>
            </Modal>
        </div>
    );
}
