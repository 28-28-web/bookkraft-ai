'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import Sidebar from '@/components/Sidebar';
import { runEpubChecks } from '@/lib/epubChecks';
import { checkKDP, checkApple } from '@/lib/coverChecks';
import { buildMetadataChecks, extractMetadataFromZip } from '@/lib/metadataChecks';
import { scanDocx } from '@/lib/wordChecks';
import { sectionScore, overallScore, coverStatus, wordStatus, SECTION_WEIGHTS } from '@/lib/readinessScore';

const bandLabel = (s) => (s >= 85 ? 'Strong' : s >= 65 ? 'Nearly there' : 'Needs work');
const bandColor = (s) => (s >= 85 ? '#2D6A4F' : s >= 65 ? '#B5541A' : '#922B21');

const EPUB_ICON = { pass: '✅', fail: '❌', warn: '⚠️', skip: '⏭️' };

const DEFAULT_META = {
    title: '', authors: '', bisacCategory1: '',
    kw1: '', kw2: '', kw3: '', kw4: '', kw5: '', kw6: '', kw7: '',
    shortDesc: '', longDesc: '', isbn: '', asin: '',
};

const metaInput = { width: '100%', padding: '8px 10px', border: '1px solid #d1d5db', borderRadius: '6px', fontSize: '0.85rem', marginTop: '4px', boxSizing: 'border-box' };
const metaLabel = { fontSize: '0.8rem', fontWeight: 600, color: '#555' };

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

function SectionCard({ title, score, subtitle, children }) {
    return (
        <div style={{ background: '#fff', border: '1px solid #e5e0d8', borderRadius: '12px', padding: '20px 24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: subtitle ? '4px' : '8px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700 }}>{title}</h3>
                {score == null
                    ? <span style={{ fontSize: '0.8rem', color: '#aaa' }}>Not assessed</span>
                    : <span style={{ fontSize: '1.1rem', fontWeight: 800, color: bandColor(score) }}>{score}<span style={{ color: '#aaa', fontWeight: 400, fontSize: '0.9rem' }}>/100</span></span>}
            </div>
            {subtitle && <p style={{ fontSize: '0.82rem', color: '#888', margin: '0 0 12px' }}>{subtitle}</p>}
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
    const [meta, setMeta] = useState(DEFAULT_META); // KDP listing details form
    const [word, setWord] = useState(null); // scanDocx result
    const [docxName, setDocxName] = useState('');
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
            try {
                const m = await extractMetadataFromZip(zip);
                setMeta((f) => ({
                    ...f,
                    title: m.title || f.title,
                    authors: m.authors || f.authors,
                    bisacCategory1: m.bisacCategory1 || f.bisacCategory1,
                    shortDesc: m.shortDesc || f.shortDesc,
                    isbn: m.isbn || f.isbn,
                }));
            } catch { /* metadata auto-fill is best-effort; the form still works */ }
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

    const handleDocx = async (file) => {
        if (!file) return;
        if (!file.name.toLowerCase().endsWith('.docx')) { setError('Manuscript must be a .docx file.'); return; }
        setError('');
        setBusy(true);
        setDocxName(file.name);
        try {
            setWord(await scanDocx(file));
        } catch {
            setError('Could not read this .docx — try re-saving from Word or Google Docs.');
        }
        setBusy(false);
    };

    const updateMeta = (key, value) => setMeta((f) => ({ ...f, [key]: value }));

    const epubSectionScore = epub ? sectionScore(epub.checks.map((c) => c.status)) : null;
    const metaChecks = epub ? buildMetadataChecks(meta) : null;
    const metaSectionScore = metaChecks ? sectionScore(metaChecks.map((c) => c.status)) : null;
    const coverSectionScore = cover ? sectionScore(cover.checks.map(coverStatus)) : null;
    const wordSectionScore = word ? sectionScore(word.checks.map((c) => wordStatus(c.status))) : null;
    const overall = epub
        ? overallScore([
            { score: epubSectionScore, weight: SECTION_WEIGHTS.epub },
            { score: metaSectionScore, weight: SECTION_WEIGHTS.metadata },
            { score: coverSectionScore, weight: SECTION_WEIGHTS.cover },
            { score: wordSectionScore, weight: SECTION_WEIGHTS.word },
        ])
        : null;

    const presentSummary = ['EPUB structure', 'KDP listing details']
        .concat(cover ? ['cover'] : [])
        .concat(word ? ['manuscript'] : [])
        .join(' + ');

    return (
        <div className="app-layout">
            <Sidebar />
            <main className="main-content">
                <h1 style={{ fontSize: '1.6rem', marginBottom: '4px' }}>Publishing Readiness Report</h1>
                <p style={{ color: 'var(--mid)', fontSize: 'var(--text-sm)', marginBottom: 'var(--space-6)' }}>
                    Upload your EPUB (required), cover and manuscript (optional). Everything is checked in your browser — nothing is uploaded.
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
                    <label className="btn btn-outline btn-sm" style={{ cursor: epub ? 'pointer' : 'not-allowed', opacity: epub ? 1 : 0.5 }}>
                        {word ? 'Replace manuscript' : 'Add manuscript .docx (optional)'}
                        <input type="file" accept=".docx" hidden disabled={!epub} onChange={(e) => handleDocx(e.target.files[0])} />
                    </label>
                </div>

                {busy && <div className="loading-state"><div className="spinner" /> Checking...</div>}
                {error && <p style={{ color: 'var(--rust)', fontSize: '0.9rem', marginBottom: '16px' }}>{error}</p>}

                {overall != null && (
                    <>
                        {/* Overall gauge */}
                        <div style={{ background: bandColor(overall), color: '#fff', borderRadius: '12px', textAlign: 'center', padding: '32px 24px', marginBottom: '20px' }}>
                            <p style={{ fontSize: '11px', letterSpacing: '2px', textTransform: 'uppercase', opacity: 0.8, marginBottom: '8px' }}>Readiness Score</p>
                            <div style={{ fontSize: '72px', fontWeight: 900, lineHeight: 1 }}>{overall}</div>
                            <div style={{ opacity: 0.75, marginTop: '4px' }}>out of 100 · {bandLabel(overall)}</div>
                            <p style={{ fontSize: '0.8rem', opacity: 0.75, marginTop: '10px' }}>
                                Based on {presentSummary}. This is a readiness check, not a guarantee of acceptance.
                            </p>
                        </div>

                        {/* EPUB section */}
                        <SectionCard title="EPUB structure" score={epubSectionScore}>
                            {epub.checks.map((c, i) => (
                                <CheckRow key={i} icon={EPUB_ICON[c.status] || '❓'} name={c.name} detail={c.detail} fixLink={c.fixLink} fixTool={c.fixTool} />
                            ))}
                        </SectionCard>

                        {/* Metadata / KDP listing details section */}
                        <SectionCard
                            title="KDP listing details"
                            score={metaSectionScore}
                            subtitle="Keywords, categories and descriptions are entered in your KDP dashboard, not in the EPUB file. Fill them here to check your listing is complete."
                        >
                            <div style={{ display: 'grid', gap: '10px', marginBottom: '16px' }}>
                                <label style={metaLabel}>Book title
                                    <input style={metaInput} value={meta.title} onChange={(e) => updateMeta('title', e.target.value)} />
                                </label>
                                <label style={metaLabel}>Author name(s)
                                    <input style={metaInput} value={meta.authors} onChange={(e) => updateMeta('authors', e.target.value)} />
                                </label>
                                <label style={metaLabel}>BISAC category
                                    <input style={metaInput} value={meta.bisacCategory1} onChange={(e) => updateMeta('bisacCategory1', e.target.value)} />
                                </label>
                                <div>
                                    <span style={metaLabel}>Keywords (7 max)</span>
                                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '6px', marginTop: '4px' }}>
                                        {[1, 2, 3, 4, 5, 6, 7].map((n) => (
                                            <input key={n} style={{ ...metaInput, marginTop: 0 }} placeholder={`Keyword ${n}`} value={meta[`kw${n}`]} onChange={(e) => updateMeta(`kw${n}`, e.target.value)} />
                                        ))}
                                    </div>
                                </div>
                                <label style={metaLabel}>Short description
                                    <textarea style={{ ...metaInput, minHeight: '60px' }} value={meta.shortDesc} onChange={(e) => updateMeta('shortDesc', e.target.value)} />
                                </label>
                                <label style={metaLabel}>Long description
                                    <textarea style={{ ...metaInput, minHeight: '90px' }} value={meta.longDesc} onChange={(e) => updateMeta('longDesc', e.target.value)} />
                                </label>
                                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                                    <label style={metaLabel}>ISBN
                                        <input style={metaInput} value={meta.isbn} onChange={(e) => updateMeta('isbn', e.target.value)} />
                                    </label>
                                    <label style={metaLabel}>ASIN
                                        <input style={metaInput} value={meta.asin} onChange={(e) => updateMeta('asin', e.target.value)} />
                                    </label>
                                </div>
                            </div>
                            {metaChecks.map((c, i) => {
                                // Empty required field reads as "Not filled yet", not a hard red fail —
                                // scoring still treats it as a fail via metaSectionScore above.
                                const notFilled = c.status === 'fail';
                                return (
                                    <CheckRow
                                        key={i}
                                        icon={notFilled ? '⚪' : EPUB_ICON[c.status] || '❓'}
                                        name={c.name}
                                        detail={notFilled ? `Not filled yet — ${c.fixHint}` : c.detail}
                                        fixLink={c.status !== 'pass' ? '/tools/metadata-builder' : null}
                                        fixTool={c.status !== 'pass' ? 'Metadata Builder' : null}
                                    />
                                );
                            })}
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

                        {/* Manuscript hygiene section */}
                        <SectionCard title="Manuscript hygiene" score={wordSectionScore}>
                            {word ? word.checks.map((c, i) => {
                                const st = wordStatus(c.status);
                                const needsFix = st !== 'pass';
                                return (
                                    <CheckRow
                                        key={i}
                                        icon={EPUB_ICON[st] || '❓'}
                                        name={c.label}
                                        detail={c.detail}
                                        fixLink={needsFix ? '/tools/word-cleanup' : null}
                                        fixTool={needsFix ? 'Word Cleanup' : null}
                                    />
                                );
                            }) : (
                                <p style={{ fontSize: '0.85rem', color: '#888' }}>No manuscript uploaded — add a .docx above to check formatting hygiene. Optional.</p>
                            )}
                            {word && <p style={{ fontSize: '0.8rem', color: '#aaa', marginTop: '10px' }}>Scanned {docxName} — {word.wordCount.toLocaleString()} words. This scan reports issues only; it does not modify your file.</p>}
                        </SectionCard>
                    </>
                )}
            </main>
        </div>
    );
}
