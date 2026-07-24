
'use client';

import { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import { PRICING, PADDLE_PRICE_IDS } from '@/lib/constants';
import Footer from '@/components/Footer';
import { usePaddle } from '@/app/hooks/usePaddle';

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
    const paddle = usePaddle();
    const plan = searchParams.get('plan') || 'pro';

    const planMap = {
        starter: {
            ...PRICING.starter,
            purchaseType: 'starter',
            creditsToAdd: PRICING.starter.credits,
            paddlePriceId: PADDLE_PRICE_IDS.starter,
        },
        pro: {
            ...PRICING.pro,
            purchaseType: 'pro',
            creditsToAdd: PRICING.pro.credits,
            paddlePriceId: PADDLE_PRICE_IDS.pro,
        },
        lifetime: {
            ...PRICING.lifetime,
            purchaseType: 'lifetime',
            creditsToAdd: 0,
            paddlePriceId: PADDLE_PRICE_IDS.lifetime,
        },
    };

    const selected = planMap[plan] || planMap.pro;
    const priceNotReady = !selected.paddlePriceId || selected.paddlePriceId.startsWith('TODO_');

    const handleCheckout = () => {
        if (!paddle || priceNotReady) return;

        if (!user) {
            window.location.href = '/login?redirect=/checkout?plan=' + plan;
            return;
        }

        paddle.Checkout.open({
            settings: { displayMode: 'overlay', theme: 'light', locale: 'en' },
            items: [{ priceId: selected.paddlePriceId, quantity: 1 }],
            customData: {
                userId: user.id,
                purchaseType: selected.purchaseType,
                creditsToAdd: selected.creditsToAdd,
            },
            customer: { email: user.email },
        });
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
                <button
                    className="btn btn-gold btn-full"
                    style={{ fontSize: '16px', padding: '14px', opacity: paddle && !priceNotReady ? 1 : 0.6 }}
                    onClick={handleCheckout}
                    disabled={!paddle || priceNotReady}
                >
                    {priceNotReady ? 'Not available yet' : paddle ? `Pay ${selected.label} — Unlock ${selected.name}` : 'Loading...'}
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
                        {plan !== 'starter' && (
                            <Link href="/checkout?plan=starter" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Starter — {PRICING.starter.label} (all logic tools + 40 credits)
                            </Link>
                        )}
                        {plan !== 'pro' && (
                            <Link href="/checkout?plan=pro" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Pro — {PRICING.pro.label} (all logic tools + 200 credits)
                            </Link>
                        )}
                        {plan !== 'lifetime' && (
                            <Link href="/checkout?plan=lifetime" style={{ fontSize: 'var(--text-sm)', color: 'var(--gold)' }}>
                                Lifetime — {PRICING.lifetime.label} (Unlimited)
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
