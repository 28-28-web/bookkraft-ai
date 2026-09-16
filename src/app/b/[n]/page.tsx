import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import blocksData from '@/content/blocks-data.json';
import BlockGate from './BlockGate';

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
        alternates: { canonical: `https://bookkraftai.com/b/${n}` },
        openGraph: {
            title: `${block.title} — BookKraft AI`,
            description: block.social,
            url: `https://bookkraftai.com/b/${n}`,
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
        <main style={{ background: 'var(--ink)', minHeight: '100vh' }}>
            {/* Hero — always visible */}
            <section style={{ padding: '64px 24px 32px', maxWidth: 680, margin: '0 auto' }}>
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
                    margin: 0,
                }}>
                    {block.title}
                </h1>
            </section>

            {/* Gated: audio, blockquote, form, CTA, nav, footer */}
            <BlockGate
                blockId={block.id}
                blockLabel={blockLabel}
                audioUrl={block.audioUrl}
                social={block.social}
                prevId={block.id > 1 ? block.id - 1 : null}
                nextId={block.id < blocksData.length ? block.id + 1 : null}
            />
        </main>
    );
}
