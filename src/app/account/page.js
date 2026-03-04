'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import Sidebar from '@/components/Sidebar';
import Modal from '@/components/Modal';
import { PLAN_LIMITS } from '@/lib/constants';

export default function AccountPage() {
    const { user, profile, signOut, supabase } = useAuth();
    const { showToast } = useToast();
    const router = useRouter();
    const [newPassword, setNewPassword] = useState('');
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const plan = profile?.plan || 'free';
    const runs = profile?.runs_this_month || 0;
    const limit = PLAN_LIMITS[plan] || 10;
    const pct = Math.min((runs / limit) * 100, 100);

    const handleUpdatePassword = async () => {
        if (!newPassword) { showToast('Enter a new password first', 'error'); return; }
        if (newPassword.length < 8) { showToast('Password must be at least 8 characters', 'error'); return; }
        try {
            const { error } = await supabase.auth.updateUser({ password: newPassword });
            if (error) throw error;
            showToast('Password updated ✓');
            setNewPassword('');
        } catch (err) {
            showToast(err.message, 'error');
        }
    };

    const handleDeleteAccount = async () => {
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

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <h1 style={{ fontSize: '1.75rem', marginBottom: '.25rem' }}>Account Settings</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', fontSize: '.9rem' }}>Manage your profile and subscription.</p>
                <div className="account-grid">
                    <div className="account-section">
                        <h3>Profile</h3>
                        <div className="form-group">
                            <label className="form-label">Email</label>
                            <input className="form-input" type="email" value={user?.email || ''} readOnly />
                        </div>
                        <div className="form-group">
                            <label className="form-label">New Password</label>
                            <input
                                className="form-input"
                                type="password"
                                placeholder="Leave blank to keep current"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn btn-primary btn-sm" onClick={handleUpdatePassword}>Update Password</button>
                    </div>
                    <div className="account-section">
                        <h3>Subscription</h3>
                        <p style={{ fontSize: '.875rem', color: 'var(--muted)', marginBottom: '1rem' }}>Current plan</p>
                        <div className={`plan-badge plan-${plan}`}>{plan.charAt(0).toUpperCase() + plan.slice(1)}</div>
                        <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border)' }}>
                            <p style={{ fontSize: '.875rem', color: 'var(--muted)', marginBottom: '.5rem' }}>Runs this month</p>
                            <div className="usage-bar-wrap" style={{ border: 'none', padding: 0, marginBottom: '.5rem' }}>
                                <div className="usage-bar-track">
                                    <div className="usage-bar-fill" style={{ width: pct + '%' }}></div>
                                </div>
                                <span className="usage-text">{runs} / {limit}</span>
                            </div>
                        </div>
                        <Link href="/upgrade" className="btn btn-gold btn-sm" style={{ marginTop: '1rem', textDecoration: 'none' }}>
                            Manage Plan →
                        </Link>
                    </div>
                    <div className="account-section danger-zone">
                        <h3>Danger Zone</h3>
                        <p style={{ fontSize: '.875rem', color: 'var(--muted)', marginBottom: '1rem' }}>Permanently delete your account and all data.</p>
                        <button className="btn btn-sm" style={{ background: 'var(--rust)', color: 'white' }} onClick={() => setShowDeleteModal(true)}>
                            Delete Account
                        </button>
                    </div>
                    <div className="account-section">
                        <h3>Quick Actions</h3>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '.5rem' }}>
                            <button className="btn btn-outline btn-sm" onClick={handleSignOut}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>

            <Modal isOpen={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
                <h3>Delete your account?</h3>
                <p>This permanently deletes your account, all history, and cancels any active subscription. This cannot be undone.</p>
                <div className="modal-actions">
                    <button className="btn btn-outline btn-sm" onClick={() => setShowDeleteModal(false)}>Cancel</button>
                    <button className="btn btn-sm" style={{ background: 'var(--rust)', color: 'white' }} onClick={handleDeleteAccount}>Yes, Delete</button>
                </div>
            </Modal>
        </div>
    );
}
