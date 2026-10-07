'use client';

import { useState, useCallback, useEffect } from 'react';
import UpsellBanner from '@/components/UpsellBanner';
import ReadinessReportCTA from '@/components/ReadinessReportCTA';
import ValidationBadge from './ValidationBadge';
import StickyUpgradeBanner from '@/components/StickyUpgradeBanner';
import { TOOLS } from '@/lib/tools';
import { useLoadingSteps } from '@/hooks/useLoadingSteps';
import { track } from '@/lib/analytics';
import { runEpubChecks } from '@/lib/epubChecks';
import FixLinks from '@/components/FixLinks';
import FixAllCta from '@/components/FixAllCta';
import ResultEmailCapture from '@/components/ResultEmailCapture';
import Link from 'next/link';
import { fixesFor, fixHref } from '@/lib/fixMap';

const TOOL = 'epub-validator';

const EPUB_VAL_STEPS = [
    { text: 'Reading EPUB...', ms: 1000 },
    { text: 'Checking structure...', ms: 1500 },
    { text: 'Checking metadata...', ms: 1500 },
    { text: 'Almost done...', ms: 0 },
];

export default function EpubValidator() {
    const [file, setFile] = useState(null);
    const [results, setResults] = useState(null);
    const [loading, setLoading] = useState(false);
    const [dragOver, setDragOver] = useState(false);
    const [fileError, setFileError] = useState(null);

    const stepText = useLoadingSteps(EPUB_VAL_STEPS, loading);

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'tool_view', { tool_name: 'epub_validator' });
        }
    }, []);

    useEffect(() => {
        if (!results) return;
        track('report_completed', {
            tool: TOOL,
            pass_count: results.passCount,
            total: results.total,
            issue_count: results.total - results.passCount,
        });
    }, [results]);

    const fileSizeRange = (bytes) => {
        if (!bytes) return 'unknown';
        if (bytes < 1024 * 1024) return '0-1MB';
        if (bytes < 5 * 1024 * 1024) return '1-5MB';
        if (bytes < 10 * 1024 * 1024) return '5-10MB';
        return '10MB+';
    };

    const validate = useCallback(async (epubFile) => {
        setLoading(true);
        setResults(null);
        setFileError(null);

        track('tool_start', { tool: TOOL, file_size_range: fileSizeRange(epubFile.size) });

        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'file_upload_start', { tool_name: 'epub_validator', file_type: 'epub', file_size_range: fileSizeRange(epubFile.size) });
        }

        try {
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(epubFile);
            const { checks, passCount, total } = await runEpubChecks(zip, epubFile.size);
            const sizeMB = (epubFile.size / 1024 / 1024).toFixed(1);

            track('file_processed', { tool: TOOL, issue_count: total - passCount, pass_count: passCount, total, file_type: 'epub', file_size_range: fileSizeRange(epubFile.size) });

            setResults({ checks, passCount, total, filename: epubFile.name, sizeMB, hasErrors: passCount < total });

        } catch (err) {
            console.error('EPUB parse error:', err);
            if (typeof window !== 'undefined' && window.gtag) {
                window.gtag('event', 'file_upload_failed', { tool_name: 'epub_validator', file_type: 'epub', error_type: 'parse', file_size_range: fileSizeRange(epubFile.size) });
            }
            setResults({
                checks: [{ name: 'File Parse', status: 'fail', detail: 'Could not read this file — it may be corrupted or not a valid .epub file.' }],
                passCount: 0, total: 1, filename: epubFile.name, hasErrors: true,
            });
        }

        setLoading(false);
    }, []);

    const handleFile = (f) => {
        if (!f) return;
        if (!f.name.toLowerCase().endsWith('.epub')) {
            setFileError(`"${f.name}" is not an EPUB file. Please upload a .epub file, or use our Word-to-EPUB converter first.`);
            setFile(null);
            setResults(null);
            return;
        }
        setFileError(null);
        setFile(f);
        validate(f);
    };

    // Endpoints for the email box; ResultEmailCapture validates and logs the events.
    const sendReport = async ({ email, name, company }) => {
        // Also add them to the newsletter list (welcome automation sends the
        // KDP Preflight Checklist). Runs alongside the report; never blocks it.
        fetch('/api/newsletter/subscribe', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source: 'validator-results', company }),
        }).catch(() => {});
        // Same flag NewsletterPopup checks, so the exit-intent popup never shows.
        try { localStorage.setItem('bk_newsletter_done', 'true'); } catch {}

        await fetch('/api/send-epub-report', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, name, results }),
        });

        fetch('/api/leads', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, source_tool: 'epub-validator', issue_count: failCount + warnCount }),
        }).catch(() => {});
    };

    const statusIcon = (s) => ({ pass: '✅', fail: '❌', warn: '⚠️', skip: '⏭️' }[s] || '❓');
    const statusClass = (s) => ({ pass: 'val-pass', fail: 'val-fail', warn: 'val-warn', skip: 'val-skip' }[s] || '');

    const failCount = results ? results.checks.filter(c => c.status === 'fail').length : 0;
    const warnCount = results ? results.checks.filter(c => c.status === 'warn').length : 0;
    const hasFails = results && results.checks.some(c => c.status === 'fail');
    const hasIssues = results && results.checks.some(c => c.status === 'fail' || c.status === 'warn');

    const fixChain = results
        ? results.checks
            .filter(c => c.status === 'fail' || c.status === 'warn')
            .map(c => ({ name: c.name, fix: fixesFor(TOOL, c.name)[0] }))
            .filter(x => x.fix)
            .reduce((acc, x) => {
                if (!acc.find(y => fixHref(y.fix, TOOL) === fixHref(x.fix, TOOL))) acc.push(x);
                return acc;
            }, [])
        : [];

    return (
        <div>
            {/* Upload section */}
            {!results && (
                <>
                    {/* Pro hint — visible before upload */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '8px' }}>
                        <p style={{ fontSize: '0.85rem', color: '#6b7280', margin: 0 }}>
                            Free scan checks 11 core issues.
                        </p>
                        <a
                            href="/tools/epub-validator-premium"
                            style={{ fontSize: '0.85rem', color: '#C9933A', fontWeight: 600, textDecoration: 'none' }}
                        >
                            Need ghost spacing + duplicate ID + store report? → Pro Scan
                        </a>
                    </div>

                    <div
                        className={`drop-zone ${dragOver ? 'drop-zone-active' : ''}`}
                        onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                        onDragLeave={() => setDragOver(false)}
                        onDrop={(e) => { e.preventDefault(); setDragOver(false); handleFile(e.dataTransfer.files[0]); }}
                        onClick={() => document.getElementById('epub-file-input').click()}
                    >
                        <input id="epub-file-input" type="file" accept=".epub" hidden onChange={(e) => handleFile(e.target.files[0])} />
                        <div className="drop-zone-icon">📥</div>
                        <p className="drop-zone-text">Drop your .epub file here or click to browse</p>
                        {file && <p className="drop-zone-file">{file.name} ({(file.size / 1024).toFixed(0)} KB)</p>}
                    </div>

                    {fileError && (
                        <div style={{ background: '#fff3f3', border: '1px solid #fca5a5', borderRadius: '8px', padding: '16px', marginTop: '20px', color: '#c53030' }}>
                            <strong>Wrong file type</strong>
                            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem' }}>{fileError}</p>
                        </div>
                    )}

                    {loading && <div className="loading-state"><div className="spinner" /> {stepText}</div>}
                </>
            )}

            {/* Full Report */}
            {results && (
                <>
                    <div className="validation-results">
                        <div className="val-summary">
                            <div className="val-score">
                                <span className="val-score-num">{results.passCount}</span>
                                <span className="val-score-denom">/{results.total}</span>
                            </div>
                            <p className="val-score-label">
                                {results.passCount === results.total
                                    ? 'All checks passed! ✨'
                                    : results.passCount >= results.total - 2
                                        ? 'Looking good — minor issues found.'
                                        : 'Some issues found. Review below.'}
                            </p>
                        </div>

                        <FixAllCta
                            tool={TOOL}
                            failedChecks={results.checks.filter(c => c.status === 'fail' || c.status === 'warn').map(c => c.name)}
                            eventExtra={{ fix_type: 'auto_fix_all' }}
                        />

                        {/* Email capture */}
                        <ResultEmailCapture
                            tool={TOOL}
                            issueCount={failCount + warnCount}
                            gtagParams={{ tool_name: 'epub_validator', source: 'validator-results' }}
                            heading="📬 Email me this report + the free KDP Preflight Checklist"
                            buttonLabel="Send report + checklist"
                            showName
                            honeypot
                            onSubmit={sendReport}
                            footnote={<>You&apos;ll also get one Kindle fix a week. Unsubscribe anytime.{' '}<Link href="/privacy" style={{ color: 'inherit', textDecoration: 'underline' }}>Privacy policy</Link></>}
                            renderSuccess={(email) => (
                                <>
                                    <p style={{ marginBottom: '8px' }}>📬 Report sent to <strong>{email}</strong> — check your inbox.</p>
                                    <p style={{ fontSize: '0.9rem', margin: 0, fontWeight: 400, color: '#1a1a1a' }}>
                                        No need to wait:{' '}
                                        <a href="/kdp-preflight-checklist.pdf" target="_blank" rel="noopener" style={{ color: '#b8860b', fontWeight: 600 }}>
                                            Download the KDP Preflight Checklist (PDF) →
                                        </a>
                                    </p>
                                </>
                            )}
                        />

                        {/* Issues block */}
                        {hasIssues && (
                            <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: '12px', padding: '24px', marginBottom: '20px' }}>
                                <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                                    {hasFails ? '❌ Your EPUB has issues likely to cause problems on KDP' : '⚠️ Your EPUB has warnings to review'}
                                </h3>
                                <p style={{ fontSize: '0.9rem', color: '#d1d5db', marginBottom: '20px' }}>
                                    {failCount > 0 && `${failCount} critical ${failCount === 1 ? 'issue' : 'issues'}`}
                                    {failCount > 0 && warnCount > 0 && ' + '}
                                    {warnCount > 0 && `${warnCount} ${warnCount === 1 ? 'warning' : 'warnings'}`}
                                    {' '}found. The steps below show where to fix each one.
                                </p>

                                {fixChain.length > 0 && (
                                    <>
                                        <p style={{ fontSize: '0.82rem', color: '#9ca3af', marginBottom: '10px' }}>Or fix step by step:</p>
                                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                                            {fixChain.map((item, i) => (
                                                <a key={i} href={fixHref(item.fix, TOOL)} onClick={() => track('fix_clicked', { tool: TOOL, fix_tool: item.fix.slug || item.fix.href, issue: item.name, check: item.name, fix_kind: item.fix.kind })} style={{ display: 'flex', alignItems: 'center', gap: '10px', background: 'rgba(255,255,255,0.07)', borderRadius: '7px', padding: '10px 14px', textDecoration: 'none', color: '#fff', fontSize: '0.88rem', fontWeight: 500 }}>
                                                    <span style={{ background: '#C9933A', borderRadius: '50%', width: '22px', height: '22px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</span>
                                                    {item.name} issue → <span style={{ color: '#C9933A', marginLeft: 'auto' }}>{item.fix.label} →</span>
                                                </a>
                                            ))}
                                        </div>
                                    </>
                                )}

                                <p style={{ fontSize: '0.78rem', color: '#6b7280', marginTop: '14px', textAlign: 'center' }}>
                                    <a href="/blog/common-epub-validation-errors" style={{ color: '#9ca3af' }}>Why is KDP rejecting my EPUB? Read the guide →</a>
                                </p>
                            </div>
                        )}

                        {/* All passed block */}
                        {!hasIssues && results.passCount === results.total && (
                            <div style={{ background: '#f0fdf4', border: '1px solid #86efac', borderRadius: '12px', padding: '24px', marginBottom: '20px', textAlign: 'center' }}>
                                <p style={{ fontSize: '0.95rem', color: '#166534', marginBottom: '20px' }}>Great job. Want to make sure your metadata and TOC are perfect too?</p>
                                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#166534', marginBottom: '8px' }}>✅ No common issues found</h3>
                                <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', flexWrap: 'wrap' }}>
                                    <a href="/tools/metadata-builder" onClick={() => track('cta_click', { from: window.location.pathname, to: '/tools/metadata-builder', cta: 'all_passed_metadata' })} style={{ display: 'inline-block', background: '#fff', color: '#166534', border: '1px solid #166534', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Check Metadata →</a>
                                    <a href="/signup?plan=starter" onClick={() => track('cta_click', { from: window.location.pathname, to: '/signup?plan=starter', cta: 'all_passed_starter' })} style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600 }}>Get All {TOOLS.length} Tools — $19</a>
                                </div>
                            </div>
                        )}
                        {!hasFails && (<ValidationBadge filename={results.filename} />)}

                        {/* Check list */}
                        <div className="val-checks">
                            {results.checks.map((c, i) => (
                                <div key={i} className={`val-check ${statusClass(c.status)}`}>
                                    <span className="val-check-icon">{statusIcon(c.status)}</span>
                                    <div style={{ flex: 1 }}>
                                        <strong>{c.name}</strong>
                                        <p>{c.detail}</p>
                                        {(c.status === 'fail' || c.status === 'warn') && <FixLinks tool={TOOL} check={c.name} eventExtra={{ issue: c.name }} />}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Pro Scan upsell — single, clean block */}
                    <div style={{ background: 'linear-gradient(135deg, #1a1a1a 0%, #2d2410 100%)', borderRadius: '12px', padding: '24px', marginTop: '16px', marginBottom: '16px' }}>
                        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '16px' }}>
                            <div style={{ fontSize: '2rem', flexShrink: 0 }}>🔬</div>
                            <div style={{ flex: 1 }}>
                                <h3 style={{ color: '#fff', fontSize: '1.05rem', fontWeight: 700, marginBottom: '6px' }}>
                                    Want a deeper scan?
                                </h3>
                                <p style={{ color: '#d1d5db', fontSize: '0.88rem', marginBottom: '8px', lineHeight: 1.5 }}>
                                    Pro scan checks ghost spacing, duplicate IDs, OPF manifest cross-check, and cover dimensions — plus a store-specific report for KDP, Apple Books, and Google Play.
                                </p>
                                <p style={{ color: '#9ca3af', fontSize: '0.82rem', marginBottom: '16px' }}>
                                    Costs 3 credits. Results download as a full HTML report.
                                </p>
                                <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
                                    <a href="/tools/epub-validator-premium" onClick={() => track('cta_click', { from: window.location.pathname, to: '/tools/epub-validator-premium', cta: 'pro_scan' })} style={{ display: 'inline-block', background: '#C9933A', color: '#fff', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Run Pro Scan — 3 Credits →
                                    </a>
                                    <a href="/pricing" onClick={() => track('cta_click', { from: window.location.pathname, to: '/pricing', cta: 'buy_credits' })} style={{ display: 'inline-block', background: 'transparent', color: '#C9933A', border: '1px solid #C9933A', padding: '10px 20px', borderRadius: '8px', textDecoration: 'none', fontWeight: 600, fontSize: '0.9rem' }}>
                                        Buy Credits
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>

                    <ReadinessReportCTA sourceTool="epub-validator" />
                    <UpsellBanner toolName="EPUB Validator" />
                </>
            )}

            <StickyUpgradeBanner />
        </div>
    );
}