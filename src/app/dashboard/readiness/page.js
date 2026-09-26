'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import { runEpubChecks } from '@/lib/epubChecks';
import { checkKDP, checkApple } from '@/lib/coverChecks';
import { sectionScore, overallScore, coverStatus, SECTION_WEIGHTS } from '@/lib/readinessScore';

const bandLabel = (s) => (s >= 85 ? 'Strong' : s >= 65 ? 'Nearly there' : 'Needs work');
const bandColor = (s) => (s >= 85 ? '#2D6A4F' : s >= 65 ? '#B5541A' : '#922B21');

const EPUB_ICON = { pass: '✅', fail: '❌', warn: '⚠️', skip: '⏭️' };

// A single fail/warn/pass row with an optional "Fix this" link.
function CheckRow({ icon, name, detail, fixLink, fixTool }) {
    return (
        <div style={{ display: 'flex', gap: '10px', padding: '12px 0', borderBottom: '1px solid #f0ece4' }}>
            <span style={{ flexShrink: 0 }}>{icon}</span>
            <div style={{ flex: 1 }}>
                <strong style={{ fontSize: '0.9rem' }}>{name}</strong>
                <p style={{ fontSize: '0.85rem', color: '#555', margin: '2px 0 0' }}>{detail}</p>
                {fixLink && (
                    <a href={fixLink} style={{ display: 'inline-block', marginTop: '6px', color: '#B5541A', fontSize: '0.82rem', fontWeight: 600, textDecoration: 'none' }}>
                        → Fix this{fixTool ? ` with ${fixTool}` : ''}
                    </a>
                )}
            </div>
        </div>
    );
}

function SectionCard({ title, score, children }) {
    return (
        <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: '12px', padding: '20px 24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</h3>
                {score == null
                    ? <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Not assessed</span>
                    : <span style={{ fontSize: '1.1rem', fontWeight: 800, color: bandColor(score) }}>{score}<span style={{ color: '#aaa', fontWeight: 400, fontSize: '0.9rem' }}>/100</span></span>}
            </div>
            {children}
        </div>
    );
}

export default function ReadinessReportPage() {
    const { user, loading } = useAuth();
    const router = useRouter();
    const [loadingTimedOut, setLoadingTimedOut] = useState(false);

    const [epub, setEpub] = useState(null); // { checks, passCount, total }
    const [cover, setCover] = useState(null); // { checks: [...kdp, ...apple] }
    const [busy, setBusy] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (!loading) return;
        const t = setTimeout(() => setLoadingTimedOut(true), 10_000);
        return () => clearTimeout(t);
    }, [loading]);

    // Gate: no free account → send to sign up.
    useEffect(() => {
        if ((!loading || loadingTimedOut) && !user) router.replace('/signup');
    }, [loading, loadingTimedOut, user, router]);

    if (loading && !loadingTimedOut) {
        return (
            <div className="app-layout"><Sidebar /><main className="main-content">
                <div className="loading-state"><div className="spinner" /> Loading...</div>
            </main></div>
        );
    }
    if (!user) return null;

    const handleEpub = async (file) => {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.epub')) { setError('Please upload a .epub file.'); return; }
        setError('');
        setBusy(true);
        try {
            const JSZip = (await import('jszip')).default;
            const zip = await JSZip.loadAsync(file);
            setEpub(await runEpubChecks(zip, file.size));
        } catch {
            setError('Could not read this EPUB — it may be corrupted.');
        }
        setBusy(false);
    };

    const handleCover = (file) => {
        if (!file) return;
        if (!file.type.startsWith('image/')) { setError('Cover must be an image file.'); return; }
        setError('');
        const url = URL.createObjectURL(file);
        const img = new window.Image();
        img.onload = () => {
            const mb = file.size / (1024 * 1024);
            const kdp = checkKDP(img.naturalWidth, img.naturalHeight, file.type, mb);
            const apple = checkApple(img.naturalWidth, img.naturalHeight);
            setCover({ checks: [...kdp.checks, ...apple.checks] });
            URL.revokeObjectURL(url);
        };
        img.onerror = () => { setError('Could not read this image.'); URL.revokeObjectURL(url); };
        img.src = url;
    };

    const epubSectionScore = epub ? sectionScore(epub.checks.map((c) => c.status)) : null;
    const coverSectionScore = cover ? sectionScore(cover.checks.map(coverStatus)) : null;
    const overall = epub
        ? overallScore([
            { score: epubSectionScore, weight: SECTION_WEIGHTS.epub },
            { score: coverSectionScore, weight: SECTION_WEIGHTS.cover },
        ])
        : null;

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <h1 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Publishing Readiness Report</h1>
                <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                    Upload your EPUB (required) and cover (optional). Everything is checked in your browser — nothing is uploaded.
                </p>

                {/* Uploads */}
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: 'var(--space-6)' }}>
                    <label className="btn btn-gold btn-sm" style={{ cursor: 'pointer' }}>
                        {epub ? 'Replace EPUB' : 'Upload EPUB'}
                        <input type="file" accept=".epub" hidden onChange={(e) => handleEpub(e.target.files[0])} />
                    </label>
                    <label className="btn btn-outline btn-sm" style={{ cursor: epub ? 'pointer' : 'not-allowed', opacity: epub ? 1 : 0.5 }}>
                        {cover ? 'Replace cover' : 'Add cover (optional)'}
                        <input type="file" accept="image/*" hidden disabled={!epub} onChange={(e) => handleCover(e.target.files[0])} />
                    </label>
                </div>

                {busy && <div className="loading-state"><div className="spinner" /> Checking EPUB...</div>}
                {error && <p style={{ color: 'var(--rust)', fontSize: '0.9rem', marginBottom: '16px' }}>{error}</p>}

                {overall != null && (
                    <>
                        {/* Overall gauge */}
                        <div style={{ background: bandColor(overall), color: '#fff', borderRadius: '12px', textAlign: 'center', padding: '32px 24px', marginBottom: '20px' }}>
                            <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '8px' }}>Readiness Score</p>
                            <div style={{ fontSize: '72px', fontWeight: 900, lineHeight: 1 }}>{overall}</div>
                            <div style={{ opacity: 0.75, marginTop: '4px' }}>out of 100 · {bandLabel(overall)}</div>
                            <p style={{ fontSize: '0.8rem', opacity: 0.75, marginTop: '10px' }}>
                                Based on {coverSectionScore == null ? 'EPUB structure' : 'EPUB structure + cover'}. This is a readiness check, not a guarantee of acceptance.
                            </p>
                        </div>

                        {/* EPUB section */}
                        <SectionCard title="EPUB structure" score={epubSectionScore}>
                            {epub.checks.map((c, i) => (
                                <CheckRow key={i} icon={EPUB_ICON[c.status] || '❓'} name={c.name} detail={c.detail} fixLink={c.fixLink} fixTool={c.fixTool} />
                            ))}
                        </SectionCard>

                        {/* Cover section */}
                        <SectionCard title="Cover" score={coverSectionScore}>
                            {cover ? cover.checks.map((c, i) => {
                                const st = coverStatus(c);
                                const needsFix = st !== 'pass';
                                return (
                                    <CheckRow
                                        key={i}
                                        icon={EPUB_ICON[st]}
                                        name={c.label}
                                        detail={c.detail}
                                        fixLink={needsFix ? '/tools/cover-checker' : null}
                                        fixTool={needsFix ? 'Cover Checker' : null}
                                    />
                                );
                            }) : (
                                <p style={{ fontSize: '0.85rem', color: '#888' }}>No cover uploaded — add one above to score cover dimensions.</p>
                            )}
                        </SectionCard>
                    </>
                )}
            </main>
        </div>
    );
}
