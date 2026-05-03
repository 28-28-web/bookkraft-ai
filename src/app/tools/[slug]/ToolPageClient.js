'use client';

import { use } from 'react';
import { getToolBySlug } from '@/lib/tools';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import Link from 'next/link';

// Tool components (lazy-loaded concept, but inline for simplicity)
import KindleFormatFixer from './KindleFormatFixer';
import EpubFormatter from './EpubFormatter';
import TocGenerator from './TocGenerator';
import FrontMatterGenerator from './FrontMatterGenerator';
import CssSnippetGenerator from './CssSnippetGenerator';
import EpubValidator from './EpubValidator';
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
    'metadata-builder': MetadataBuilder,
    'manuscript-cleanup': ManuscriptCleanup,
    'back-matter-generator': BackMatterGenerator,
    'style-sheet-auditor': StyleSheetAuditor,
    'print-to-digital': PrintToDigital,
    'kdp-keyword-finder': KdpKeywordFinder,
};

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

    // Free tools: no auth needed
    const isFree = tool.free;
    const hasAccess = isFree || checkToolAccess(slug);
    // If loading, show loading state
    if (loading) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="loading-state"><div className="spinner" /> Loading...</div>
                </main>
            </div>
        );
    }

    // If not free and no access, show purchase prompt
    if (!isFree && !hasAccess) {
        return (
            <div className="app-layout">
                <Sidebar />
                <main className="main-content">
                    <div className="tool-page-wrap">
                        <div className="tool-page-header">
                            <Link href="/dashboard" className="back-btn">← Back to Dashboard</Link>
                            <h1>{tool.icon} {tool.name}</h1>
                            <p>{tool.desc}</p>
                        </div>
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
                    </div>
                </main>
            </div>
        );
    }

    // Render tool component
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
                    <div className="tool-page-header">
                        <Link href="/dashboard" className="back-btn">← Back to Dashboard</Link>
                        <h1>{tool.icon} {tool.name}</h1>
                        <p>{tool.desc}</p>
                    </div>
                    <ToolComponent tool={tool} />
                </div>
            </main>
        </div>
    );
}
