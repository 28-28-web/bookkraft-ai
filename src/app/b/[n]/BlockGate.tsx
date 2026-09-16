'use client';

import Link from 'next/link';
import { useAuth } from '@/components/AuthProvider';
import BlockLeadForm from './BlockLeadForm';
import Footer from '@/components/Footer';

type Props = {
    blockId: number;
    blockLabel: string;
    audioUrl: string;
    social: string;
    prevId: number | null;
    nextId: number | null;
};

export default function BlockGate({ blockId, blockLabel, audioUrl, social, prevId, nextId }: Props) {
    const { user, profile, loading } = useAuth() as {
        user: { id: string; created_at: string } | null;
        profile: { is_lifetime?: boolean; has_logic_bundle?: boolean; has_full_access?: boolean } | null;
        loading: boolean;
    };

    if (loading) {
        return (
            <>
                <div style={{ padding: '80px 24px', display: 'flex', justifyContent: 'center' }}>
                    <div className="spinner" />
                </div>
                <Footer />
            </>
        );
    }

    const hasPaidAccess = !!(profile?.is_lifetime || profile?.has_logic_bundle || profile?.has_full_access);
    const isB1 = blockId === 1;

    if (!user) {
        return (
            <>
                <GateLock
                    headline={`${blockLabel} is free — sign in to listen`}
                    body="Any BookKraft account unlocks B1. Starter or higher unlocks all 100 blocks."
                    primaryHref={`/login?redirect=/b/${blockId}`}
                    primaryLabel="Sign in free →"
                />
                <Footer />
            </>
        );
    }

    if (!isB1 && !hasPaidAccess) {
        return (
            <>
                <BlurGate audioUrl={audioUrl} social={social} blockId={blockId} />
                <Footer />
            </>
        );
    }

    return (
        <>
            {/* Audio player */}
            <section style={{ padding: '0 24px 40px', maxWidth: 680, margin: '0 auto' }}>
                <AudioCard audioUrl={audioUrl} />
            </section>

            {/* Social hook */}
            <section style={{ padding: '0 24px 48px', maxWidth: 680, margin: '0 auto' }}>
                <blockquote style={{ margin: 0, borderLeft: '3px solid var(--gold)', paddingLeft: 24 }}>
                    <p style={{
                        fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                        fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                        fontStyle: 'italic',
                        color: 'var(--cream)',
                        lineHeight: 1.6,
                        margin: 0,
                    }}>
                        &ldquo;{social}&rdquo;
                    </p>
                </blockquote>
            </section>

            {/* Email capture */}
            <section style={{
                background: 'var(--ink-soft)',
                borderTop: '1px solid var(--line)',
                borderBottom: '1px solid var(--line)',
                padding: '48px 24px',
            }}>
                <div style={{ maxWidth: 480, margin: '0 auto' }}>
                    <h2 style={{
                        fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                        fontSize: 'clamp(1.25rem, 3vw, 1.6rem)',
                        fontWeight: 700,
                        color: 'var(--cream)',
                        margin: '0 0 8px',
                    }}>
                        One block a week.
                    </h2>
                    <p style={{ fontSize: 14, color: 'rgba(247,243,236,0.55)', margin: '0 0 24px', lineHeight: 1.6 }}>
                        Each block is a single formatting truth. No newsletter noise — one idea, one audio, once a week.
                    </p>
                    <BlockLeadForm blockId={blockLabel} />
                </div>
            </section>

            {/* BookKraft CTA */}
            <section style={{ padding: '56px 24px', maxWidth: 680, margin: '0 auto' }}>
                <div style={{
                    background: 'linear-gradient(135deg, rgba(201,147,58,0.08) 0%, rgba(201,147,58,0.03) 100%)',
                    border: '1px solid rgba(201,147,58,0.2)',
                    borderRadius: 14,
                    padding: '36px 32px',
                    textAlign: 'center',
                }}>
                    <p style={{ fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)', margin: '0 0 12px' }}>
                        Fix your manuscript now
                    </p>
                    <h3 style={{
                        fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                        fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
                        fontWeight: 700,
                        color: 'var(--cream)',
                        margin: '0 0 10px',
                        lineHeight: 1.3,
                    }}>
                        BookKraft AI fixes everything in this block — automatically.
                    </h3>
                    <p style={{ fontSize: 14, color: 'rgba(247,243,236,0.55)', margin: '0 0 28px', lineHeight: 1.6 }}>
                        EPUB validator, Word-to-EPUB converter, metadata builder, cover checker. Five free tools, no signup for most.
                    </p>
                    <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                        <Link href="/free-tools" style={{
                            display: 'inline-block', background: 'var(--gold)', color: 'var(--white)',
                            fontWeight: 700, fontSize: 14, padding: '11px 22px', borderRadius: 8, textDecoration: 'none',
                        }}>
                            Try the free tools →
                        </Link>
                        <Link href="/pricing" style={{
                            display: 'inline-block', background: 'transparent', color: 'rgba(247,243,236,0.7)',
                            fontWeight: 600, fontSize: 14, padding: '11px 22px', borderRadius: 8, textDecoration: 'none',
                            border: '1px solid var(--line)',
                        }}>
                            See pricing
                        </Link>
                    </div>
                </div>

                {/* Block navigation */}
                <div style={{
                    display: 'flex', justifyContent: 'space-between',
                    marginTop: 40, paddingTop: 32, borderTop: '1px solid var(--line)',
                }}>
                    {prevId !== null ? (
                        <Link href={`/b/${prevId}`} style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                            ← B{prevId}
                        </Link>
                    ) : <span />}
                    {nextId !== null ? (
                        <Link href={`/b/${nextId}`} style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}>
                            B{nextId} →
                        </Link>
                    ) : <span />}
                </div>
            </section>

            <Footer />
        </>
    );
}

function AudioCard({ audioUrl }: { audioUrl: string }) {
    return (
        <div style={{
            background: 'var(--ink-soft)',
            border: '1px solid var(--line)',
            borderRadius: 12,
            padding: '20px 24px',
        }}>
            <p style={{ margin: '0 0 12px', fontSize: 12, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(247,243,236,0.4)' }}>
                Listen
            </p>
            {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
            <audio controls src={audioUrl} style={{ width: '100%', accentColor: 'var(--gold)' }} preload="metadata" />
        </div>
    );
}

function GateLock({ headline, body, primaryHref, primaryLabel, secondaryHref, secondaryLabel }: {
    headline: string;
    body: string;
    primaryHref: string;
    primaryLabel: string;
    secondaryHref?: string;
    secondaryLabel?: string;
}) {
    return (
        <section style={{ padding: '40px 24px 80px', maxWidth: 560, margin: '0 auto' }}>
            <div style={{
                background: 'var(--ink-soft)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                padding: '48px 32px',
                textAlign: 'center',
            }}>
                <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(201,147,58,0.12)',
                    border: '1px solid rgba(201,147,58,0.25)',
                    margin: '0 auto 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="3" y="8" width="12" height="9" rx="2" stroke="var(--gold)" strokeWidth="1.5" />
                        <path d="M6 8V5.5a3 3 0 0 1 6 0V8" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                    fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
                    fontWeight: 700,
                    color: 'var(--cream)',
                    margin: '0 0 10px',
                }}>
                    {headline}
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(247,243,236,0.55)', margin: '0 0 28px', lineHeight: 1.6 }}>
                    {body}
                </p>
                <Link href={primaryHref} style={{
                    display: 'inline-block', background: 'var(--gold)', color: 'var(--white)',
                    fontWeight: 700, fontSize: 14, padding: '11px 28px', borderRadius: 8, textDecoration: 'none',
                }}>
                    {primaryLabel}
                </Link>
                {secondaryHref && (
                    <div style={{ marginTop: 16 }}>
                        <Link href={secondaryHref} style={{ fontSize: 13, color: 'rgba(247,243,236,0.45)', textDecoration: 'none' }}>
                            {secondaryLabel}
                        </Link>
                    </div>
                )}
            </div>
        </section>
    );
}

function BlurGate({ audioUrl, social, blockId }: { audioUrl: string; social: string; blockId: number }) {
    return (
        <section style={{ padding: '0 24px 80px', maxWidth: 680, margin: '0 auto' }}>
            {/* Blurred preview */}
            <div style={{ position: 'relative', marginBottom: 32 }}>
                <div style={{ filter: 'blur(5px)', pointerEvents: 'none', userSelect: 'none', opacity: 0.6 }}>
                    <AudioCard audioUrl={audioUrl} />
                    <blockquote style={{ margin: '32px 0 0', borderLeft: '3px solid var(--gold)', paddingLeft: 24 }}>
                        <p style={{
                            fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                            fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                            fontStyle: 'italic',
                            color: 'var(--cream)',
                            lineHeight: 1.6,
                            margin: 0,
                        }}>
                            &ldquo;{social}&rdquo;
                        </p>
                    </blockquote>
                </div>
                {/* Gradient overlay fading to background */}
                <div style={{
                    position: 'absolute', bottom: 0, left: 0, right: 0, height: '60%',
                    background: 'linear-gradient(to bottom, transparent, var(--ink))',
                    pointerEvents: 'none',
                }} />
            </div>

            {/* Gate card */}
            <div style={{
                background: 'var(--ink-soft)',
                border: '1px solid var(--line)',
                borderRadius: 14,
                padding: '40px 32px',
                textAlign: 'center',
            }}>
                <div style={{
                    width: 44, height: 44, borderRadius: '50%',
                    background: 'rgba(201,147,58,0.12)',
                    border: '1px solid rgba(201,147,58,0.25)',
                    margin: '0 auto 20px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                        <rect x="3" y="8" width="12" height="9" rx="2" stroke="var(--gold)" strokeWidth="1.5" />
                        <path d="M6 8V5.5a3 3 0 0 1 6 0V8" stroke="var(--gold)" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                </div>
                <h2 style={{
                    fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                    fontSize: 'clamp(1.15rem, 3vw, 1.4rem)',
                    fontWeight: 700,
                    color: 'var(--cream)',
                    margin: '0 0 10px',
                }}>
                    Unlock all 100 blocks
                </h2>
                <p style={{ fontSize: 14, color: 'rgba(247,243,236,0.55)', margin: '0 0 28px', lineHeight: 1.6 }}>
                    Starter or higher unlocks every block, plus all formatting tools.
                </p>
                <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                    <Link href="/pricing" style={{
                        display: 'inline-block', background: 'var(--gold)', color: 'var(--white)',
                        fontWeight: 700, fontSize: 14, padding: '11px 28px', borderRadius: 8, textDecoration: 'none',
                    }}>
                        See plans →
                    </Link>
                    <Link href="/b/1" style={{
                        display: 'inline-block', background: 'transparent', color: 'rgba(247,243,236,0.6)',
                        fontWeight: 600, fontSize: 14, padding: '11px 22px', borderRadius: 8, textDecoration: 'none',
                        border: '1px solid var(--line)',
                    }}>
                        ← Back to B1 (free)
                    </Link>
                </div>
            </div>
        </section>
    );
}
