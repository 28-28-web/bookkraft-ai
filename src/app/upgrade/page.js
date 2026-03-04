'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { useToast } from '@/components/Toast';
import Sidebar from '@/components/Sidebar';

export default function UpgradePage() {
    const { profile } = useAuth();
    const { showToast } = useToast();
    const plan = profile?.plan || 'free';

    const handleCheckout = (targetPlan) => {
        showToast(`${targetPlan} checkout coming soon — payment integration not yet connected.`, 'error');
    };

    return (
        <div className="app-layout">
            <Sidebar />
            <div className="main-content">
                <div className="upgrade-wrap">
                    <h1 style={{ fontSize: '1.75rem', marginBottom: '.5rem' }}>Choose your plan</h1>
                    <p style={{ color: 'var(--muted)', marginBottom: '1.5rem' }}>Unlock more tools and more runs.</p>
                    <div className="current-plan-banner">
                        <span>Current plan: <strong>{plan.charAt(0).toUpperCase() + plan.slice(1)}</strong></span>
                        <span style={{ color: 'var(--muted)', fontSize: '.875rem' }}>Payment integration coming soon.</span>
                    </div>
                    <div className="pricing-grid">
                        <div className="price-card">
                            <p className="price-plan">Free</p>
                            <div className="price-amount">$0<span>/mo</span></div>
                            <p className="price-desc">3 tools. 10 runs/month.</p>
                            <ul className="price-features">
                                <li>3 tools</li>
                                <li>10 runs/month</li>
                                <li className="no">All 12 tools</li>
                            </ul>
                            <button className="btn btn-outline btn-full" disabled={plan === 'free'}>
                                {plan === 'free' ? 'Current Free Plan' : 'Downgrade'}
                            </button>
                        </div>
                        <div className="price-card featured">
                            <p className="price-plan">Starter</p>
                            <div className="price-amount">$9<span>/mo</span></div>
                            <p className="price-desc">All 12 tools. 100 runs/month.</p>
                            <ul className="price-features">
                                <li>All 12 tools</li>
                                <li>100 runs/month</li>
                                <li>Full history</li>
                            </ul>
                            <button
                                className="btn btn-gold btn-full"
                                onClick={() => handleCheckout('starter')}
                                disabled={plan === 'starter'}
                            >
                                {plan === 'starter' ? 'Current Plan' : 'Upgrade to Starter'}
                            </button>
                        </div>
                        <div className="price-card">
                            <p className="price-plan">Pro</p>
                            <div className="price-amount">$29<span>/mo</span></div>
                            <p className="price-desc">All 12 tools. 500 runs/month.</p>
                            <ul className="price-features">
                                <li>All 12 tools</li>
                                <li>500 runs/month</li>
                                <li>Priority support</li>
                            </ul>
                            <button
                                className="btn btn-primary btn-full"
                                onClick={() => handleCheckout('pro')}
                                disabled={plan === 'pro'}
                            >
                                {plan === 'pro' ? 'Current Plan' : 'Upgrade to Pro'}
                            </button>
                        </div>
                        <div className="price-card lifetime-card">
                            <p className="price-plan">Lifetime</p>
                            <div className="price-amount">$149<span>once</span></div>
                            <p className="price-desc">Pay once. 1,000 runs/month forever.</p>
                            <ul className="price-features">
                                <li>Everything in Pro</li>
                                <li>1,000 runs/month</li>
                                <li>Lifetime updates</li>
                            </ul>
                            <button
                                className="btn btn-gold btn-full"
                                onClick={() => handleCheckout('lifetime')}
                                disabled={plan === 'lifetime'}
                            >
                                {plan === 'lifetime' ? 'Current Plan' : 'Get Lifetime Deal'}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
