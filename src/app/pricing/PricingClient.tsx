'use client';

import GuaranteeBadge from '@/components/GuaranteeBadge';
import { PRICING, PADDLE_PRICE_IDS, TOOL_CREDIT_COSTS, FAQS, FREE_TOOLS } from '@/lib/constants';
import { useState, Suspense, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import { usePaddle } from '@/app/hooks/usePaddle';
import { useAuth } from '@/components/AuthProvider';

const CHECKOUT_WATCHDOG_MS = 5000;

function CheckoutButton({ purchaseType, discountCode, className, children }) {
    const { paddle } = usePaddle();
    const { user } = useAuth() as { user: { id: string; email: string } | null };
    const [loading, setLoading] = useState(false);

    const priceId = PADDLE_PRICE_IDS[purchaseType];
    const priceNotReady = !priceId || priceId.startsWith('TODO_');

    // The button is never permanently disabled waiting on Paddle — if the
    // SDK never becomes ready (or errors, or times out per usePaddle),
    // clicking falls back to the dedicated /checkout page, which does its
    // own fresh Paddle init attempt and still shows the real price either
    // way. A dead button loses the sale silently; this never does.
    //
    // `user` comes from the already-loaded AuthProvider context, not a
    // fresh supabase.auth.getUser() call here — getUser() does a network
    // round-trip to revalidate the token, and if that stalls (blocked,
    // dead connection, slow endpoint) it never rejects, so a try/catch
    // around it never fires and the button is stuck on "Opening
    // checkout..." forever with no console error. That was the bug.
    const handleClick = () => {
        if (priceNotReady) {
            console.error(`No Paddle price ID configured for "${purchaseType}" yet.`);
            return;
        }

        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'pricing_cta_click', { plan: purchaseType });
        }

        if (!user) {
            window.location.href = '/signup?plan=' + purchaseType;
            return;
        }

        const dc = discountCode ? `&dc=${encodeURIComponent(discountCode)}` : '';
        const fallbackUrl = `/checkout?plan=${purchaseType}${dc}`;

        if (!paddle) {
            window.location.href = fallbackUrl;
            return;
        }

        setLoading(true);

        // Checkout.open() doesn't return a promise that resolves once the
        // overlay is actually showing — there is nothing to await. This is
        // the hard backstop: if it hasn't produced an overlay within 5s
        // (blocked by an ad blocker, bad SDK state, whatever), reset the
        // button and fall back to the dedicated checkout page instead of
        // leaving it pending indefinitely.
        let settled = false;
        const watchdog = setTimeout(() => {
            if (settled) return;
            settled = true;
            console.error('Paddle Checkout.open produced no overlay within 5s, falling back to /checkout');
            setLoading(false);
            window.location.href = fallbackUrl;
        }, CHECKOUT_WATCHDOG_MS);

        const toltReferral = (window as any).tolt_referral;
        const payload = {
            items: [{ priceId, quantity: 1 }],
            ...(discountCode ? { discountCode } : {}),
            customData: {
                userId: user.id,
                purchaseType: purchaseType,
                ...(toltReferral ? { tolt_referral: toltReferral } : {}),
            },
            customer: { email: user.email },
        };
        console.log('Paddle Checkout.open payload:', payload);

        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'checkout_start', { plan: purchaseType });
        }

        try {
            paddle.Checkout.open(payload);
        } catch (err) {
            console.error('Checkout.open threw:', err);
            if (!settled) {
                settled = true;
                clearTimeout(watchdog);
                setLoading(false);
                window.location.href = fallbackUrl;
            }
            return;
        }

        settled = true;
        clearTimeout(watchdog);
        setLoading(false);
    };

    return (
        <button
            onClick={handleClick}
            disabled={loading || priceNotReady}
            className={className}
            style={{ cursor: loading ? 'wait' : 'pointer', width: '100%', opacity: loading ? 0.7 : 1 }}
        >
            {loading ? 'Opening checkout…' : children}
        </button>
    );
}

const TOOL_LABELS: Record<string, string> = {
    'manuscript-cleanup': 'Manuscript Cleanup',
    'print-to-digital': 'Print-to-Digital Converter',
    'back-matter-generator': 'Back Matter Generator',
    'epub-validator-premium': 'EPUB Validator Pro',
    'style-sheet-auditor': 'Style Sheet Auditor',
    'kdp-keyword-finder': 'KDP Keyword Finder',
};

function PricingContent() {
    const searchParams = useSearchParams();
    const ref = searchParams.get('ref') ?? searchParams.get('utm_source');
    const discountCode = ref?.toLowerCase() === 'producthunt' ? 'PHLAUNCH' : undefined;
    const [highlightedPlan, setHighlightedPlan] = useState<string | null>(null);
    const starterRef = useRef<HTMLDivElement>(null);
    const proRef = useRef<HTMLDivElement>(null);
    const lifetimeRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (typeof window !== 'undefined' && (window as any).gtag) {
            (window as any).gtag('event', 'pricing_view');
        }
    }, []);

    const highlightPlan = (plan: string) => {
        const refs: Record<string, React.RefObject<HTMLDivElement>> = {
            starter: starterRef, pro: proRef, lifetime: lifetimeRef,
        };
        setHighlightedPlan(plan);
        refs[plan]?.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });
        setTimeout(() => setHighlightedPlan(null), 2500);
    };

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

            {/* Free tier */}
            <section style={{ padding: 'var(--space-16) 0 0', background: 'var(--ink)' }}>
                <div className="container">
                    <p className="eyebrow" style={{ textAlign: 'center', color: 'var(--gold)' }}>ALWAYS FREE</p>
                    <h2 className="section-heading center" style={{ color: 'var(--cream)' }}>No Account Needed</h2>
                    <p className="section-sub center" style={{ marginBottom: 'var(--space-8)', color: 'rgba(247,243,236,0.65)' }}>
                        {FREE_TOOLS.length} tools work instantly, no signup required.
                    </p>
                    <div style={{
                        display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 'var(--space-4)',
                        maxWidth: 700, margin: '0 auto',
                    }}>
                        {['EPUB Validator', 'Metadata Builder', 'Cover Checker', 'Word Cleanup Checker', 'Full Manuscript Mode'].map((name) => (
                            <span key={name} style={{
                                padding: '10px 18px', border: '1px solid rgba(255,255,255,0.15)', borderRadius: 'var(--radius)',
                                fontSize: 'var(--text-sm)', fontWeight: 600, color: 'var(--cream)',
                            }}>
                                ✓ {name}
                            </span>
                        ))}
                    </div>
                </div>
            </section>

            {/* Main pricing grid */}
            <section style={{ padding: 'var(--space-16) 0', background: 'var(--ink)' }}>
                <div className="container">
                    <div>
                        <p className="eyebrow" style={{ textAlign: 'center', color: 'var(--gold)' }}>PAID TIERS</p>
                        <h2 className="section-heading center" style={{ color: 'var(--cream)' }}>Starter, Pro, or Lifetime</h2>
                        <p className="section-sub center" style={{ marginBottom: 'var(--space-6)', color: 'rgba(247,243,236,0.65)' }}>
                            All logic tools included in every paid tier. Credits power the AI tools.
                        </p>

                        {/* What do you need? */}
                        <div style={{ marginBottom: 'var(--space-8)', textAlign: 'center' }}>
                            <p style={{ color: 'rgba(247,243,236,0.4)', fontSize: '11px', marginBottom: '10px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                                What do you need?
                            </p>
                            <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                {([
                                    { label: 'One book to format', plan: 'starter', hint: 'Starter' },
                                    { label: 'Publishing multiple books', plan: 'pro', hint: 'Pro' },
                                    { label: 'Long-term, frequent publishing', plan: 'lifetime', hint: 'Lifetime' },
                                ] as const).map(({ label, plan, hint }) => (
                                    <button
                                        key={plan}
                                        onClick={() => highlightPlan(plan)}
                                        type="button"
                                        style={{
                                            background: highlightedPlan === plan ? 'rgba(201,147,58,0.15)' : 'rgba(255,255,255,0.06)',
                                            border: `1px solid ${highlightedPlan === plan ? 'var(--gold)' : 'rgba(255,255,255,0.14)'}`,
                                            borderRadius: 100,
                                            padding: '9px 16px',
                                            color: 'var(--cream)',
                                            fontSize: 'var(--text-sm)',
                                            cursor: 'pointer',
                                            display: 'inline-flex',
                                            alignItems: 'center',
                                            gap: '7px',
                                            transition: 'background 0.2s, border-color 0.2s',
                                        }}
                                    >
                                        {label}
                                        <span style={{ color: 'var(--gold)', fontWeight: 700, fontSize: '12px' }}>→ {hint}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="pricing-grid" style={{ maxWidth: 960, margin: '0 auto' }}>
                            <div
                                ref={starterRef}
                                className="price-card"
                                style={{
                                    borderRadius: 8,
                                    border: highlightedPlan === 'starter' ? '2px solid var(--gold)' : '1px solid rgba(0,0,0,0.1)',
                                    boxShadow: highlightedPlan === 'starter' ? '0 0 0 4px rgba(201,147,58,0.18)' : undefined,
                                    transition: 'border 0.3s, box-shadow 0.3s',
                                }}
                            >
                                <p className="price-plan">{PRICING.starter.name}</p>
                                <p style={{ fontSize: '12px', color: 'rgba(60,45,30,0.5)', margin: '-6px 0 8px', fontStyle: 'italic' }}>For your next book</p>
                                <div className="price-amount">{PRICING.starter.label}<span> one-time</span></div>
                                <p className="price-desc">{PRICING.starter.desc}</p>
                                <p style={{ fontSize: '12px', color: 'rgba(60,45,30,0.6)', margin: '-4px 0 14px', lineHeight: 1.45 }}>
                                    e.g. 20 EPUB Validator Pro scans, or 40 KDP keyword searches
                                </p>
                                <ul className="price-features">
                                    {PRICING.starter.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="starter" discountCode={discountCode} className="btn btn-white btn-full">
                                    Get Starter
                                </CheckoutButton>
                                <GuaranteeBadge />
                            </div>
                            <div
                                ref={proRef}
                                className="price-card featured"
                                style={{
                                    borderRadius: 8,
                                    background: 'var(--charcoal)',
                                    border: highlightedPlan === 'pro' ? '2px solid var(--gold)' : '1px solid rgba(201,147,58,0.35)',
                                    boxShadow: highlightedPlan === 'pro' ? '0 0 0 4px rgba(201,147,58,0.25)' : undefined,
                                    transition: 'border 0.3s, box-shadow 0.3s',
                                }}
                            >
                                <p className="price-plan">{PRICING.pro.name}</p>
                                <p style={{ fontSize: '12px', color: 'rgba(247,243,236,0.45)', margin: '-6px 0 8px', fontStyle: 'italic' }}>For authors publishing regularly</p>
                                <div className="price-amount">{PRICING.pro.label}<span> one-time</span></div>
                                <p className="price-desc">{PRICING.pro.desc}</p>
                                <p style={{ fontSize: '12px', color: 'rgba(247,243,236,0.5)', margin: '-4px 0 14px', lineHeight: 1.45 }}>
                                    e.g. 100 EPUB Validator Pro scans, or keyword research for a 10-book series
                                </p>
                                <ul className="price-features">
                                    {PRICING.pro.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="pro" discountCode={discountCode} className="btn btn-white btn-full">
                                    Get Pro
                                </CheckoutButton>
                                <GuaranteeBadge />
                            </div>
                            <div
                                ref={lifetimeRef}
                                className="price-card lifetime-card"
                                style={{
                                    borderRadius: 8,
                                    border: highlightedPlan === 'lifetime' ? '2px solid var(--gold)' : undefined,
                                    boxShadow: highlightedPlan === 'lifetime' ? '0 0 0 4px rgba(201,147,58,0.18)' : undefined,
                                    transition: 'border 0.3s, box-shadow 0.3s',
                                }}
                            >
                                <p className="price-plan">{PRICING.lifetime.name}</p>
                                <p style={{ fontSize: '12px', color: 'rgba(247,243,236,0.45)', margin: '-6px 0 8px', fontStyle: 'italic' }}>For serious authors, editors & frequent publishers</p>
                                <div className="price-amount">{PRICING.lifetime.label}<span> one-time</span></div>
                                <p className="price-desc">{PRICING.lifetime.desc}</p>
                                <p style={{ fontSize: '12px', color: 'rgba(247,243,236,0.5)', margin: '-4px 0 14px', lineHeight: 1.45 }}>
                                    No counting — unlimited AI runs on every tool, forever
                                </p>
                                <ul className="price-features">
                                    {PRICING.lifetime.features.map((f, i) => <li key={i}>{f}</li>)}
                                </ul>
                                <CheckoutButton purchaseType="lifetime" discountCode={discountCode} className="btn btn-white btn-full">
                                    Get Lifetime Deal
                                </CheckoutButton>
                                <GuaranteeBadge />
                            </div>
                        </div>

                        {/* How credits work */}
                        <div style={{ maxWidth: 480, margin: 'var(--space-12) auto 0' }}>
                            <h3 style={{ color: 'var(--cream)', fontSize: 'var(--text-base)', fontWeight: 700, marginBottom: 'var(--space-2)', textAlign: 'center' }}>
                                How credits work
                            </h3>
                            <p style={{ fontSize: 'var(--text-sm)', color: 'rgba(247,243,236,0.6)', marginBottom: 'var(--space-4)', textAlign: 'center', lineHeight: 1.5 }}>
                                Each AI tool costs a fixed number of credits per run. Longer manuscripts scale up — the exact cost is shown before any credits are spent.
                            </p>
                            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 'var(--text-sm)', color: 'var(--cream)' }}>
                                <thead>
                                    <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.12)' }}>
                                        <th style={{ textAlign: 'left', padding: '8px 0' }}>AI Tool</th>
                                        <th style={{ textAlign: 'right', padding: '8px 0' }}>Credits / Run</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Object.entries(TOOL_CREDIT_COSTS)
                                        .sort(([, a], [, b]) => a - b)
                                        .map(([slug, cost], i) => (
                                            <tr key={i} style={{ borderBottom: '1px solid rgba(255,255,255,0.07)' }}>
                                                <td style={{ padding: '8px 0' }}>{TOOL_LABELS[slug] ?? slug.split('-').map(w => w[0].toUpperCase() + w.slice(1)).join(' ')}</td>
                                                <td style={{ textAlign: 'right', padding: '8px 0', color: 'var(--gold)', fontWeight: 600 }}>{cost}</td>
                                            </tr>
                                        ))}
                                </tbody>
                            </table>
                            <p style={{ fontSize: 'var(--text-xs)', color: 'rgba(247,243,236,0.5)', marginTop: 'var(--space-3)' }}>
                                Credits never expire. Top-ups are available at any time from your account dashboard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            {/* FAQ */}
            <PricingFAQ />
        </>
    );
}

export default function PricingPage() {
    return (
        <Suspense fallback={null}>
            <PricingContent />
        </Suspense>
    );
}

const PRICING_FAQ_QUESTIONS = [
    'Do I need to pay monthly?',
    'Do the free tools actually work without signing up?',
    'How do credits work?',
    'Can I try the AI tools before buying credits?',
    'Can I get a refund?',
    'Do I need an account for the paid tools?',
];

function PricingFAQ() {
    const [openIndex, setOpenIndex] = useState(null);
    const pricingFaqs = PRICING_FAQ_QUESTIONS
        .map(q => FAQS.find(f => f.q === q))
        .filter(Boolean);

    if (pricingFaqs.length === 0) return null;

    return (
        <section className="faq-section" style={{ paddingBottom: 'var(--space-16)', background: 'var(--ink)' }}>
            <div className="container">
                <p className="section-eyebrow-v2" style={{ textAlign: 'center' }}>Common Questions</p>
                <h2 className="section-heading center" style={{ color: 'var(--cream)' }}>Pricing FAQ</h2>
                <div className="faq-list">
                    {pricingFaqs.map((f, i) => (
                        <div className={`faq-item${openIndex === i ? ' open' : ''}`} key={i}>
                            <button
                                type="button"
                                className="faq-question"
                                onClick={() => setOpenIndex(openIndex === i ? null : i)}
                            >
                                {f.q}
                                <span className="faq-chevron" aria-hidden="true">▾</span>
                            </button>
                            <div className="faq-answer"><p>{f.a}</p></div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
