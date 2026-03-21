'use client';

import Link from 'next/link';
import { PRICING, TOOL_CREDIT_COSTS, FAQS } from '@/lib/constants';
import { useState } from 'react';
import { usePaddle } from '@/app/hooks/usePaddle';
import { createClient } from '@/lib/supabase/client';

const PRICE_IDS = {
    essentials:      'pri_01km8xdbmr77kqwr88bmvs7nz1',
    credits_starter: 'pri_01km8xxbsb8wdt7tnj0bypka9s',
    credits_pro:     'pri_01km8y324atecypjrc2nzm6qnq',
    full:            'pri_01km8y8h8e3b5tm3yvbqkdx6d3',
    lifetime:        'pri_01km8ymm2eyk4tyjgm3p5x6bar',
};

function CheckoutButton({ purchaseType, className, children }) {
    const paddle = usePaddle();
    const [loading, setLoading] = useState(false);

    const handleClick = async () => {
        setLoading(true);
        try {
            const supabase = createClient();
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                window.location.href = '/signup?plan=' + purchaseType;
                return;
            }

            paddle.Checkout.open({
                items: [{ priceId: PRICE_IDS[purchaseType], quantity: 1 }],
                customData: {
                    userId: user.id,
                    purchaseType: purchaseType,
                },
            });
        } catch (err) {
            console.error('Checkout error:', err);
        } finally {
            setLoading(false);
        }
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading || !paddle}
            className={className}
            style={{ cursor: loading ? 'wait' : 'pointer', width: '100%' }}
        >
            {loading ? 'Loading...' : children}
        </button>
    );
}

export default function PricingPage() {
    return (
        <>
            {/* Hero */}
            <section style={{
                background: 'var(--ink)', padding: 'var(--space-20) 0',
                textAlign: 'center',
            }}>
                <div className="container">
                    <h1 style={{ color: 'var(--cream)', fontSize: 'var(--text-5xl)', marginBottom: 'var(--space-4)' }}>
                        Simple Pricing.<br /><em style={{ color: 'var(--gold)', fontWeight: 400 }}>No Subscriptions.</em>
                    </h1>
                    <p style={{ color: 'rgba(247,243,236,.65)', fontSize: '18px', maxWidth: 520, margin: '0 auto' }}>
                        Buy once, own forever. Credits never expire. No monthly fees.
                    </p>
                </div>
            </section>

            {/* Main pricing grid */}
            <section style={{ padding: 'var(--space-16) 0' }}>
                <div className="container">

                    {/* Section: Logic Tools */}
                    <div style={{ marginBottom: 'var(--space-16)' }}>
                        <p className="eyebrow" style={{ textAlign: 'center' }}>LOGIC TOOLS</p>
                        <h2 className="section-heading center">Essentials Bundle</h2>
                        <p className="section-sub center" style={{ marginBottom: 'var(--space-8)' }}>
                            5 instant-result formatting tools. No AI, no credits needed. Buy once, use forever.
                        </p>

                        <div className="pricing-grid" style={{ maxWidth: 640, margin: '0 auto' }}>
                            <div className="price-card featured" id="essentials">
                                <p className="price-plan">{PRICING.essentials.name}</p>
                                <div className="price-amount">{PRICING.essentials.label}<span> one-time</span></div>
                                <p className="price-desc">{PRICING.essentials.desc}</p>
                                <ul className="price-features">
                                    {PRICING.essentials.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="essentials" className="btn btn-gold btn-full">
                                    Get Essentials Bundle
                                </CheckoutButton>
                            </div>
                        </div>
                    </div>

                    {/* Section: AI Credits */}
                    <div id="credits" style={{ marginBottom: 'var(--space-16)' }}>
                        <p className="eyebrow" style={{ textAlign: 'center' }}>AI CREDITS</p>
                        <h2 className="section-heading center">Credit Packs</h2>
                        <p className="section-sub center" style={{ marginBottom: 'var(--space-8)' }}>
                            Credits power AI tools. Buy a pack, use them whenever — they never expire.
                        </p>

                        <div className="pricing-grid" style={{ maxWidth: 700, margin: '0 auto' }}>
                            <div className="price-card">
                                <p className="price-plan">{PRICING.starterCredits.name}</p>
                                <div className="price-amount">{PRICING.starterCredits.label}</div>
                                <p className="price-desc">{PRICING.starterCredits.desc}</p>
                                <ul className="price-features">
                                    {PRICING.starterCredits.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="credits_starter" className="btn btn-outline btn-full">
                                    Buy Starter Pack
                                </CheckoutButton>
                            </div>
                            <div className="price-card featured">
                                <p className="price-plan">{PRICING.authorPro.name}</p>
                                <div className="price-amount">{PRICING.authorPro.label}</div>
                                <p className="price-desc">{PRICING.authorPro.desc}</p>
                                <ul className="price-features">
                                    {PRICING.authorPro.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="credits_pro" className="btn btn-gold btn-full">
                                    Buy Pro Pack
                                </CheckoutButton>
                            </div>
                        </div>

                        {/* Credit cost table */}
                        <div style={{ marginTop: 'var(--space-8)', maxWidth: 480, margin: 'var(--space-8) auto 0' }}>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid var(--border)' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 0' }}>AI Tool</th>
                                        <th style={{ textAlign: 'right', padding: '8px 0' }}>Credits/Run</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(TOOL_CREDIT_COSTS)
                                        .sort(([, a], [, b]) => a - b)
                                        .map(([slug, cost], i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid var(--border)' }}>
                                                <td style={{ padding: '8px 0' }}>{slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</td>
                                                <td style={{ textAlign: 'right', padding: '8px 0', color: 'var(--gold)', fontWeight: 600 }}>{cost}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    {/* Section: Full Access + Lifetime */}
                    <div>
                        <p className="eyebrow" style={{ textAlign: 'center' }}>BEST VALUE</p>
                        <h2 className="section-heading center">Complete Packages</h2>
                        <p className="section-sub center" style={{ marginBottom: 'var(--space-8)' }}>
                            Get everything. Logic tools + AI credits in one bundle.
                        </p>

                        <div className="pricing-grid" style={{ maxWidth: 700, margin: '0 auto' }}>
                            <div className="price-card featured">
                                <p className="price-plan">{PRICING.full.name}</p>
                                <div className="price-amount">{PRICING.full.label}<span> one-time</span></div>
                                <p className="price-desc">{PRICING.full.desc}</p>
                                <ul className="price-features">
                                    {PRICING.full.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="full" className="btn btn-gold btn-full">
                                    Get Full Access
                                </CheckoutButton>
                            </div>
                            <div className="price-card lifetime-card">
                                <p className="price-plan">{PRICING.lifetime.name}</p>
                                <div className="price-amount">{PRICING.lifetime.label}<span> one-time</span></div>
                                <p className="price-desc">{PRICING.lifetime.desc}</p>
                                <ul className="price-features">
                                    {PRICING.lifetime.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="lifetime" className="btn btn-gold btn-full">
                                    Get Lifetime Deal
                                </CheckoutButton>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <PricingFAQ />
        </>
    );
}

function PricingFAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const pricingFaqs = FAQS.filter(f =>
        f.q.toLowerCase().includes('credit') || f.q.toLowerCase().includes('pay') ||
        f.q.toLowerCase().includes('refund') || f.q.toLowerCase().includes('worth') ||
        f.q.toLowerCase().includes('free') || f.q.toLowerCase().includes('subscription') ||
        f.q.toLowerCase().includes('access') || f.q.toLowerCase().includes('account') ||
        f.q.toLowerCase().includes('monthly') || f.q.toLowerCase().includes('essentials') ||
        f.q.toLowerCase().includes('buy')
    );

    if (pricingFaqs.length === 0) return null;

    return (
        <section className="faq-section" style={{ paddingBottom: 'var(--space-16)' }}>
            <div className="container">
                <h2 className="section-heading center">Pricing FAQ</h2>
                <div className="faq-list">
                    {pricingFaqs.map((f, i) => (
                        <div className={`faq-item ${openIndex === i ? 'open' : ''}`} key={i}>
                            <div className="faq-q" onClick={() => setOpenIndex(openIndex === i ? null : i)}>
                                {f.q}
                                <span className="faq-chevron">▼</span>
                            </div>
                            <div className="faq-a"><p>{f.a}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}