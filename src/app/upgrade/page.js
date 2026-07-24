
'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import { PRICING } from '@/lib/constants';

export default function UpgradePage() {
    const { profile } = useAuth();
    const hasFullAccess = profile?.has_full_access || profile?.is_lifetime || false;

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
                        <p className="price-plan">{PRICING.starter.name}</p>
                        <div className="price-amount">{PRICING.starter.label}<span> once</span></div>
                        <p className="price-desc">{PRICING.starter.desc}</p>
                        <ul className="price-features">
                            {PRICING.starter.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                        <Link href="/checkout?plan=starter" className="btn btn-outline btn-full" style={{ textDecoration: 'none' }}>Get Starter</Link>
                    </div>
                    <div className="price-card featured">
                        <p className="price-plan">{PRICING.pro.name}</p>
                        <div className="price-amount">{PRICING.pro.label}<span> once</span></div>
                        <p className="price-desc">{PRICING.pro.desc}</p>
                        <ul className="price-features">
                            {PRICING.pro.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                        <Link href="/checkout?plan=pro" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Get Pro</Link>
                    </div>
                    <div className="price-card lifetime-card">
                        <p className="price-plan">{PRICING.lifetime.name}</p>
                        <div className="price-amount">{PRICING.lifetime.label}<span> once</span></div>
                        <p className="price-desc">{PRICING.lifetime.desc}</p>
                        <ul className="price-features">
                            {PRICING.lifetime.features.map((f, i) => <li key={i}>{f}</li>)}
                        </ul>
                        <Link href="/checkout?plan=lifetime" className="btn btn-gold btn-full" style={{ textDecoration: 'none' }}>Get Lifetime</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
