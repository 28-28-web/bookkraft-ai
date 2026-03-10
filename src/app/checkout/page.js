'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { PRICING } from '@/lib/constants';
import Footer from '@/components/Footer';

export default function CheckoutPage() {
    return (
        <Suspense fallback={<div className="loading-state" style={{ paddingTop: '120px' }}><div className="spinner" /> Loading...</div>}>
            <CheckoutContent />
        </Suspense>
    );
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const { user } = useAuth();
    const plan = searchParams.get('plan') || 'full';

    // Map plan param to pricing config
    const planMap = {
        essentials: { ...PRICING.essentials, purchaseType: 'essentials', creditsToAdd: 0 },
        credits_starter: { ...PRICING.starterCredits, purchaseType: 'credits_starter', creditsToAdd: 15 },
        credits_pro: { ...PRICING.authorPro, purchaseType: 'credits_pro', creditsToAdd: 40 },
        full: { ...PRICING.full, purchaseType: 'full', creditsToAdd: 30 },
        lifetime: { ...PRICING.lifetime, purchaseType: 'lifetime', creditsToAdd: 0 },
    };

    const selected = planMap[plan] || planMap.full;

    const handleCheckout = () => {
        // Paddle checkout integration
        // In production, this opens the Paddle overlay
        if (typeof window !== 'undefined' && window.Paddle) {
            window.Paddle.Checkout.open({
                settings: { displayMode: 'overlay', theme: 'light', locale: 'en' },
                items: [{ priceId: selected.paddlePriceId || 'pri_xxx', quantity: 1 }],
                customData: {
                    userId: user?.id || '',
                    purchaseType: selected.purchaseType,
                    creditsToAdd: selected.creditsToAdd,
                },
                customer: user ? { email: user.email } : undefined,
            });
        } else {
            alert(`Paddle checkout would open for: ${selected.purchaseType}\nPrice: ${selected.label}\nConfigure PADDLE_SECRET_KEY and price IDs to enable.`);
        }
    };

    return (
        <>
            <div style={{
                maxWidth: 520, margin: '0 auto', padding: 'var(--space-24) var(--space-6) var(--space-16)',
            }}>
                <h1 style={{ textAlign: 'center', marginBottom: 'var(--space-2)' }}>Checkout</h1>
                <p style={{ textAlign: 'center', color: 'var(--mid)', marginBottom: 'var(--space-8)', fontSize: 'var(--text-sm)' }}>
                    One-time payment. No subscriptions. No surprises.
                </p>

                {/* Selected plan card */}
                <div style={{
                    background: 'var(--white)', border: '2px solid var(--gold)',
                    borderRadius: 'var(--radius)', padding: 'var(--space-8)',
                    marginBottom: 'var(--space-6)',
                }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                            <h3 style={{ marginBottom: 'var(--space-2)' }}>{selected.name}</h3>
                            <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)' }}>{selected.desc}</p>
                        </div>
                        <div style={{ fontSize: 'var(--text-3xl)', fontWeight: 700, color: 'var(--ink)', whiteSpace: 'nowrap' }}>
                            {selected.label}
                        </div>
                    </div>
                    <ul style={{ listStyle: 'none', padding: 0, marginTop: 'var(--space-4)', display: 'grid', gap: 'var(--space-2)' }}>
                        {(selected.features || []).map((f, i) => (
                            <li key={i} style={{ fontSize: 'var(--text-sm)', color: 'var(--ink)' }}>
                                <span style={{ color: 'var(--sage)', marginRight: '6px' }}>&#10003;</span> {f}
                            </li>
                        ))}
                    </ul>
                </div>

                {/* CTA */}
                <button className="btn btn-gold btn-full" style={{ fontSize: '16px', padding: '14px' }} onClick={handleCheckout}>
                    Pay {selected.label} — Unlock {selected.name}
                </button>

                {/* Trust signals */}
                <div style={{
                    marginTop: 'var(--space-6)', display: 'grid', gap: 'var(--space-3)',
                    textAlign: 'center', fontSize: 'var(--text-sm)', color: 'var(--mid)',
                }}>
                    <p>7-day money-back guarantee. No questions asked.</p>
                    <p>One-time payment. Credits never expire.</p>
                    <p style={{ fontSize: '12px' }}>Tax included where applicable. Payments by Paddle.</p>
                </div>

                {/* Other plans */}
                <div style={{
                    marginTop: 'var(--space-8)', padding: 'var(--space-6)',
                    background: 'var(--cream)', borderRadius: 'var(--radius)',
                    border: '1px solid var(--border)',
                }}>
                    <p style={{ fontSize: 'var(--text-sm)', fontWeight: 600, marginBottom: 'var(--space-4)' }}>Other options:</p>
                    <div style={{ display: 'grid', gap: 'var(--space-2)' }}>
                        {plan !== 'essentials' && (
                            <Link href="/checkout?plan=essentials" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Essentials Bundle — $4.99
                            </Link>
                        )}
                        {plan !== 'full' && (
                            <Link href="/checkout?plan=full" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Full Access — $9.99 (Best Value)
                            </Link>
                        )}
                        {plan !== 'credits_starter' && (
                            <Link href="/checkout?plan=credits_starter" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Starter Credits — $7.00 (15 credits)
                            </Link>
                        )}
                        {plan !== 'credits_pro' && (
                            <Link href="/checkout?plan=credits_pro" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Author Pro Credits — $15.00 (40 credits)
                            </Link>
                        )}
                        {plan !== 'lifetime' && (
                            <Link href="/checkout?plan=lifetime" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Lifetime — $149 (Unlimited)
                            </Link>
                        )}
                    </div>
                </div>

                <Link href={user ? '/dashboard' : '/'} style={{
                    display: 'block', textAlign: 'center', marginTop: 'var(--space-6)',
                    fontSize: 'var(--text-sm)', color: 'var(--mid)',
                }}>
                    &#8592; Back
                </Link>
            </div>
            <Footer />
        </>
    );
}
