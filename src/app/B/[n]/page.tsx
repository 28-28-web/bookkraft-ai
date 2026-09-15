import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import blocksData from '@/content/blocks-data.json';
import BlockLeadForm from './BlockLeadForm';
import Footer from '@/components/Footer';

type Props = { params: Promise<{ n: string }> };

export function generateStaticParams() {
    return blocksData.map(b => ({ n: String(b.id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { n } = await params;
    const block = blocksData.find(b => b.id === Number(n));
    if (!block) return {};
    return {
        title: `${block.title} — BookKraft AI`,
        description: block.social,
        alternates: { canonical: `https://bookkraftai.com/B/${n}` },
        openGraph: {
            title: `${block.title} — BookKraft AI`,
            description: block.social,
            url: `https://bookkraftai.com/B/${n}`,
            siteName: 'BookKraft AI',
            type: 'website',
        },
    };
}

export default async function BlockPage({ params }: Props) {
    const { n } = await params;
    const block = blocksData.find(b => b.id === Number(n));
    if (!block) notFound();

    const blockLabel = `B${block.id}`;

    return (
        <>
            <main style={{ background: 'var(--ink)', minHeight: '100vh' }}>
                {/* ── Hero ── */}
                <section style={{ padding: '64px 24px 48px', maxWidth: 680, margin: '0 auto' }}>
                    <span style={{
                        display: 'inline-block',
                        fontFamily: 'var(--font-jetbrains), monospace',
                        fontSize: 12,
                        fontWeight: 600,
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                        color: 'var(--gold)',
                        background: 'rgba(201,147,58,0.12)',
                        border: '1px solid rgba(201,147,58,0.25)',
                        borderRadius: 100,
                        padding: '4px 14px',
                        marginBottom: 24,
                    }}>
                        {blockLabel}
                    </span>

                    <h1 style={{
                        fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                        fontSize: 'clamp(2rem, 5vw, 3rem)',
                        fontWeight: 700,
                        color: 'var(--cream)',
                        lineHeight: 1.15,
                        margin: '0 0 32px',
                    }}>
                        {block.title}
                    </h1>

                    {/* ── Audio player ── */}
                    <div style={{
                        background: 'var(--ink-soft)',
                        border: '1px solid var(--line)',
                        borderRadius: 12,
                        padding: '20px 24px',
                        marginBottom: 40,
                    }}>
                        <p style={{
                            margin: '0 0 12px',
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'rgba(247,243,236,0.4)',
                        }}>
                            Listen
                        </p>
                        {/* eslint-disable-next-line jsx-a11y/media-has-caption */}
                        <audio
                            controls
                            src={block.audioUrl}
                            style={{ width: '100%', accentColor: 'var(--gold)' }}
                            preload="metadata"
                        />
                    </div>

                    {/* ── Social hook ── */}
                    <blockquote style={{
                        margin: '0 0 48px',
                        borderLeft: '3px solid var(--gold)',
                        paddingLeft: 24,
                    }}>
                        <p style={{
                            fontFamily: 'var(--font-fraunces), var(--font-playfair), serif',
                            fontSize: 'clamp(1.15rem, 2.5vw, 1.4rem)',
                            fontStyle: 'italic',
                            color: 'var(--cream)',
                            lineHeight: 1.6,
                            margin: 0,
                        }}>
                            &ldquo;{block.social}&rdquo;
                        </p>
                    </blockquote>
                </section>

                {/* ── Email capture ── */}
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
                        <p style={{
                            fontSize: 14,
                            color: 'rgba(247,243,236,0.55)',
                            margin: '0 0 24px',
                            lineHeight: 1.6,
                        }}>
                            Each block is a single formatting truth. No newsletter noise — one idea, one audio, once a week.
                        </p>
                        <BlockLeadForm blockId={blockLabel} />
                    </div>
                </section>

                {/* ── BookKraft CTA ── */}
                <section style={{ padding: '56px 24px', maxWidth: 680, margin: '0 auto' }}>
                    <div style={{
                        background: 'linear-gradient(135deg, rgba(201,147,58,0.08) 0%, rgba(201,147,58,0.03) 100%)',
                        border: '1px solid rgba(201,147,58,0.2)',
                        borderRadius: 14,
                        padding: '36px 32px',
                        textAlign: 'center',
                    }}>
                        <p style={{
                            fontSize: 12,
                            fontWeight: 700,
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--gold)',
                            margin: '0 0 12px',
                        }}>
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
                        <p style={{
                            fontSize: 14,
                            color: 'rgba(247,243,236,0.55)',
                            margin: '0 0 28px',
                            lineHeight: 1.6,
                        }}>
                            EPUB validator, Word-to-EPUB converter, metadata builder, cover checker. Five free tools, no signup for most.
                        </p>
                        <div style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
                            <Link
                                href="/free-tools"
                                style={{
                                    display: 'inline-block',
                                    background: 'var(--gold)',
                                    color: 'var(--white)',
                                    fontWeight: 700,
                                    fontSize: 14,
                                    padding: '11px 22px',
                                    borderRadius: 8,
                                    textDecoration: 'none',
                                }}
                            >
                                Try the free tools →
                            </Link>
                            <Link
                                href="/pricing"
                                style={{
                                    display: 'inline-block',
                                    background: 'transparent',
                                    color: 'rgba(247,243,236,0.7)',
                                    fontWeight: 600,
                                    fontSize: 14,
                                    padding: '11px 22px',
                                    borderRadius: 8,
                                    textDecoration: 'none',
                                    border: '1px solid var(--line)',
                                }}
                            >
                                See pricing
                            </Link>
                        </div>
                    </div>

                    {/* ── Block navigation ── */}
                    <div style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        marginTop: 40,
                        paddingTop: 32,
                        borderTop: '1px solid var(--line)',
                    }}>
                        {block.id > 1 ? (
                            <Link
                                href={`/B/${block.id - 1}`}
                                style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                            >
                                ← B{block.id - 1}
                            </Link>
                        ) : <span />}
                        {block.id < blocksData.length ? (
                            <Link
                                href={`/B/${block.id + 1}`}
                                style={{ color: 'var(--gold)', fontWeight: 600, fontSize: 14, textDecoration: 'none' }}
                            >
                                B{block.id + 1} →
                            </Link>
                        ) : <span />}
                    </div>
                </section>
            </main>
            <Footer />
        </>
    );
}
