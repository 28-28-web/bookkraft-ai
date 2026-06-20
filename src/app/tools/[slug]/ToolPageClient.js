'use client';

import { use } from 'react';
import { getToolBySlug } from '@/lib/tools';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

import KindleFormatFixer from './KindleFormatFixer';
import EpubFormatter from './EpubFormatter';
import TocGenerator from './TocGenerator';
import FrontMatterGenerator from './FrontMatterGenerator';
import CssSnippetGenerator from './CssSnippetGenerator';
import EpubValidator from './EpubValidator';
import EpubValidatorPremium from './EpubValidatorPremium';
import MetadataBuilder from './MetadataBuilder';
import ManuscriptCleanup from './ManuscriptCleanup';
import BackMatterGenerator from './BackMatterGenerator';
import StyleSheetAuditor from './StyleSheetAuditor';
import PrintToDigital from './PrintToDigital';
import KdpKeywordFinder from './KdpKeywordFinder';

const TOOL_COMPONENTS = {
    'kindle-format-fixer': KindleFormatFixer,
    'epub-formatter': EpubFormatter,
    'toc-generator': TocGenerator,
    'front-matter-generator': FrontMatterGenerator,
    'css-snippet-generator': CssSnippetGenerator,
    'epub-validator': EpubValidator,
    'epub-validator-premium': EpubValidatorPremium,
    'metadata-builder': MetadataBuilder,
    'manuscript-cleanup': ManuscriptCleanup,
    'back-matter-generator': BackMatterGenerator,
    'style-sheet-auditor': StyleSheetAuditor,
    'print-to-digital': PrintToDigital,
    'kdp-keyword-finder': KdpKeywordFinder,
};

// Shared SEO content block, rendered identically in every branch
function SeoContentBlock({ tool }) {
    if (!tool.seoContent) return null;
    return (
        <div
            className="seo-content"
            style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}
            dangerouslySetInnerHTML={{ __html: tool.seoContent }}
        />
    );
}

// Shared header block, rendered identically in every branch
function ToolHeader({ tool }) {
    return (
        <div className="tool-page-header">
            <Link href="/dashboard" className="back-btn">← Back to Dashboard</Link>
            <h1>{tool.icon} {tool.name}</h1>
            <p>{tool.desc}</p>
        </div>
    );
}

export default function ToolPage({ params }) {
    const resolvedParams = use(params);
    const slug = resolvedParams.slug;
    const tool = getToolBySlug(slug);
    const { user, checkToolAccess, loading } = useAuth();

    if (!tool) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="empty-state">
                        <div className="empty-state-icon">🔍</div>
                        <h3>Tool not found</h3>
                        <p>This tool doesn&apos;t exist.</p>
                        <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-flex' }}>
                            Back to Dashboard
                        </Link>
                    </div>
                </main>
            </div>
        );
    }

    const isFree = tool.free;
    const hasAccess = isFree || checkToolAccess(slug);

    // While auth resolves, show real content (header + SEO) instead of a blank spinner.
    // This is what crawlers and AI search bots will see if they hit the page
    // before JS finishes mounting, so it must never be empty.
    if (loading) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="tool-page-wrap">
                        <ToolHeader tool={tool} />
                        <div className="loading-state"><div className="spinner" /> Loading tool...</div>
                        <SeoContentBlock tool={tool} />
                    </div>
                </main>
            </div>
        );
    }

    if (!isFree && !hasAccess) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="tool-page-wrap">
                        <ToolHeader tool={tool} />
                        <div className="tool-locked-card">
                            <div className="tool-locked-icon">🔒</div>
                            <h3>This tool requires purchase</h3>
                            <p>Unlock {tool.name} for just ${tool.price} — use it forever, no limits.</p>
                            <div className="tool-locked-actions">
                                <Link href={`/checkout?tool=${slug}`} className="btn btn-gold" style={{ textDecoration: 'none' }}>
                                    Unlock for ${tool.price} →
                                </Link>
                                <Link href="/checkout?plan=full" className="btn btn-outline" style={{ textDecoration: 'none' }}>
                                    Get All Tools — $9.99
                                </Link>
                            </div>
                        </div>
                        <SeoContentBlock tool={tool} />
                    </div>
                </main>
            </div>
        );
    }

    const ToolComponent = TOOL_COMPONENTS[slug];
    if (!ToolComponent) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="empty-state">
                        <h3>Tool under construction</h3>
                        <p>This tool is being built. Check back soon.</p>
                    </div>
                </main>
            </div>
        );
    }

    return (
        <div className="app-layout">
            {!isFree && <Sidebar />}
            <main className={isFree ? 'main-content main-content-full' : 'main-content'}>
                <div className="tool-page-wrap">
                    <ToolHeader tool={tool} />
                    <ToolComponent tool={tool} />
                    <SeoContentBlock tool={tool} />
                </div>
            </main>
        </div>
    );
}
