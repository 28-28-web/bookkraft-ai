'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import { TOOLS } from '@/lib/tools';

export default function UpgradePage() {
    const { profile } = useAuth();
    const paidTools = TOOLS.filter((t) => !t.free);
    const hasFullAccess = profile?.has_full_access || false;

    if (hasFullAccess) {
        return (
            <div className="app-layout">
                <Sidebar />
                <div className="main-content">
                    <div className="empty-state" style={{ maxWidth: 400, margin: '3rem auto' }}>
                        <div className="empty-state-icon">✨</div>
                        <h3>{profile?.is_lifetime ? 'Lifetime Access' : 'Full Access'}</h3>
                        <p>You have access to all tools. Thank you for your purchase!</p>
                        <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-flex' }}>Back to Dashboard</Link>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <h1 style={{ fontSize: '1.75rem', marginBottom: '.25rem' }}>Upgrade</h1>
                <p style={{ color: 'var(--muted)', marginBottom: '1.75rem', fontSize: '.9rem' }}>Unlock more tools. Pay once, own forever.</p>


                <div className="pricing-grid" style={{ gap: '1rem' }}>
                    <div className="price-card">
                        <p className="price-plan">Single Tool</p>
                        <div className="price-amount">$1<span> each</span></div>
                        <p className="price-desc">Buy one tool at a time.</p>
                        <ul className="price-features">
                            <li>Any single paid tool</li>
                            <li>One-time, forever</li>
                            <li>Unlimited use</li>
                        </ul>
                        <Link href="/dashboard" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Browse Tools</Link>
                    </div>
                    <div className="price-card">
                        <p className="price-plan">Pick 5</p>
                        <div className="price-amount">$3<span> bundle</span></div>
                        <p className="price-desc">Choose any 5 paid tools.</p>
                        <ul className="price-features">
                            <li>Any 5 paid tools</li>
                            <li>Save 40%</li>
                            <li>Unlimited use</li>
                        </ul>
                        <Link href="/checkout?plan=bundle" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Pick 5 Tools</Link>
                    </div>
                    <div className="price-card featured">
                        <p className="price-plan">Full Access</p>
                        <div className="price-amount">$9.99<span> once</span></div>
                        <p className="price-desc">All {paidTools.length} paid tools.</p>
                        <ul className="price-features">
                            <li>All tools unlocked</li>
                            <li>Best value</li>
                            <li>Future updates</li>
                            <li>Priority support</li>
                        </ul>
                        <Link href="/checkout?plan=full" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Get Full Access</Link>
                    </div>
                    <div className="price-card lifetime-card">
                        <p className="price-plan">Lifetime</p>
                        <div className="price-amount">$149<span> once</span></div>
                        <p className="price-desc">All current + future tools.</p>
                        <ul className="price-features">
                            <li>Everything forever</li>
                            <li>Future tools included</li>
                            <li>Early access</li>
                        </ul>
                        <Link href="/checkout?plan=lifetime" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Get Lifetime</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
