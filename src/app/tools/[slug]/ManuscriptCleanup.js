'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useProject } from '@/lib/ProjectContext';
import WordCounter, { countWords, getWordLimitError } from '@/components/WordCounter';
import LivePreview from '@/components/LivePreview';
import FileUploader from '@/components/FileUploader';
import JobRunner from '@/components/JobRunner';

export default function ManuscriptCleanup() {
    const { profile, refreshProfile } = useAuth();
    const { currentProject, loadProjectText, updateLastTool } = useProject();
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('deep');
    const [genre, setGenre] = useState('fiction');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [sampleMode, setSampleMode] = useState(false);
    const SAMPLE_LIMIT = 500;

    useEffect(() => {
        if (typeof window !== 'undefined' && window.gtag) {
            window.gtag('event', 'tool_view', { tool_name: 'manuscript_cleanup' });
        }
    }, []);

    useEffect(() => {
        if (currentProject?.id && !input) {
            loadProjectText(currentProject.id).then(text => {
                if (text) setInput(text);
            });
        }
    }, [currentProject?.id]);

    const gtag = (...args) => {
        if (typeof window !== 'undefined' && window.gtag) window.gtag(...args);
    };

    const handleSampleSubmit = async () => {
        if (!input.trim()) return;

        gtag('event', 'tool_start', { tool_name: 'manuscript_cleanup', mode: 'sample' });

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/tools/manuscript-cleanup/sample', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: input, mode, genre,
                    checks: { repeatedWords: true, cliches: true, dialoguePunct: true, paragraphSpacing: true },
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || 'Something went wrong. Please try again.');
                return;
            }
            setResult({ ...data.data, isSample: data.isSample, wordsProcessed: data.wordsProcessed });
            gtag('event', 'tool_complete', { tool_name: 'manuscript_cleanup', mode: 'sample' });
            gtag('event', 'result_view', { tool_name: 'manuscript_cleanup', mode: 'sample' });
        } catch {
            setError('Could not reach the server — check your connection and try again.');
        } finally {
            setLoading(false);
        }
    };

    const handleFullResult = async (merged, meta) => {
        setResult({ ...merged, isSample: false, wordsProcessed: meta.wordCount, partial: meta.status === 'partial', creditsCharged: meta.creditsCharged });
        gtag('event', 'tool_complete', { tool_name: 'manuscript_cleanup', mode: 'full', words_processed: meta.wordCount });
        gtag('event', 'result_view', { tool_name: 'manuscript_cleanup', mode: 'full' });
        await refreshProfile();
    };

    const wc = countWords(input);
    const hasCredits = profile?.is_lifetime || (profile?.credits_balance || 0) >= 1;

    return (
        <>
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Input</h3>

                <FileUploader
                    onTextExtracted={(text) => setInput(text)}
                    label="Upload your manuscript (.docx or .txt) — any length"
                />

                <textarea className="form-textarea" style={{ minHeight: '250px' }}
                    placeholder="Or paste your manuscript here — a full novel works, no word cap..."
                    value={input} onChange={(e) => setInput(e.target.value)} />

                {sampleMode ? (
                    <WordCounter text={input} limit={SAMPLE_LIMIT} />
                ) : (
                    <p style={{ fontSize: 'var(--text-sm)', color: 'var(--mid)', marginTop: '4px' }}>
                        {wc.toLocaleString()} words
                    </p>
                )}

                <div style={{
                    display: 'flex', gap: 'var(--space-3)', marginTop: 'var(--space-4)',
                    padding: '12px', background: 'var(--cream)', border: '1px solid var(--border)',
                    borderRadius: 'var(--radius)',
                }}>
                    <label className="fix-checkbox" style={{ flex: 1 }}>
                        <input type="radio" checked={sampleMode} onChange={() => setSampleMode(true)} />
                        <span>Free Sample — first 500 words — 0 credits</span>
                    </label>
                    <label className="fix-checkbox" style={{ flex: 1, opacity: hasCredits ? 1 : 0.5 }}>
                        <input type="radio" checked={!sampleMode} onChange={() => setSampleMode(false)}
                            disabled={!hasCredits} />
                        <span>Full Manuscript — any length — cost scales with word count</span>
                    </label>
                </div>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Cleanup mode</label>
                    {['light', 'deep'].map((m) => (
                        <label key={m} className="fix-checkbox">
                            <input type="radio" checked={mode === m} onChange={() => setMode(m)} />
                            <span>{m === 'light' ? 'Light — formatting only' : 'Deep — formatting + prose issues'}</span>
                        </label>
                    ))}
                </div>
                <div className="form-group">
                    <label className="form-label">Genre</label>
                    {['fiction', 'nonfiction'].map((g) => (
                        <label key={g} className="fix-checkbox">
                            <input type="radio" checked={genre === g} onChange={() => setGenre(g)} />
                            <span>{g === 'fiction' ? 'Fiction' : 'Non-fiction'}</span>
                        </label>
                    ))}
                </div>

                {sampleMode ? (
                    <>
                        <button className="btn btn-primary generate-btn"
                            onClick={handleSampleSubmit}
                            disabled={loading || !input.trim()}>
                            {loading ? <><div className="spinner" /> Cleaning...</> : 'Run Free Sample'}
                        </button>
                        {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
                    </>
                ) : (
                    <JobRunner
                        toolSlug="manuscript-cleanup"
                        text={input}
                        disabled={!hasCredits}
                        runLabel="Get Cost Estimate"
                        buildRequestBody={() => ({
                            mode, genre,
                            checks: { repeatedWords: true, cliches: true, dialoguePunct: true, paragraphSpacing: true },
                        })}
                        onResult={handleFullResult}
                    />
                )}
            </div>

            <div className="tool-output-card">
                <h3>Output</h3>
                {!result && !loading && <div className="output-placeholder">Paste text and click to see results.</div>}
                {loading && <div className="loading-state"><div className="spinner" /> AI is analyzing your text...</div>}

                {result && (
                    <>
                        {result.isSample && (
                            <div style={{
                                padding: '12px 16px', background: 'var(--gold-light)',
                                borderLeft: '3px solid var(--gold)', borderRadius: 'var(--radius)',
                                marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)',
                            }}>
                                Free sample — {result.wordsProcessed} words processed.
                                {wc > 500 && ` Your full text has ${wc - 500} more words.`}
                                {' '}Run the full manuscript to process everything.
                            </div>
                        )}

                        {result.partial && (
                            <div style={{
                                padding: '12px 16px', background: '#fef3c7',
                                borderLeft: '3px solid #d97706', borderRadius: 'var(--radius)',
                                marginBottom: 'var(--space-4)', fontSize: 'var(--text-sm)',
                            }}>
                                Some sections of your manuscript failed to process and were skipped — you were only charged {result.creditsCharged} credit{result.creditsCharged === 1 ? '' : 's'} for the sections that completed.
                            </div>
                        )}

                        <div className="output-tabs">
                            {['Cleaned Text', 'Changes', 'Flags'].map((t, i) => (
                                <button key={i} className={`output-tab ${activeTab === i ? 'active' : ''}`} onClick={() => setActiveTab(i)}>{t}
                                    {i === 1 && result.changes?.length > 0 && <span className="tab-count">{result.changes.length}</span>}
                                    {i === 2 && result.flags?.length > 0 && <span className="tab-count">{result.flags.length}</span>}
                                </button>
                            ))}
                        </div>

                        {activeTab === 0 && (
                            <>
                                <textarea className="form-textarea" style={{ minHeight: '300px' }} value={result.cleaned_text || ''} readOnly />
                                <div className="output-actions">
                                    <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(result.cleaned_text)}>Copy</button>
                                </div>
                            </>
                        )}

                        {activeTab === 1 && (
                            <div className="changes-list">
                                {result.changes?.length > 0 ? result.changes.map((c, i) => (
                                    <div key={i} className="change-item">
                                        <span className="change-type">{c.type}</span>
                                        <p>{c.description}</p>
                                    </div>
                                )) : <p className="output-placeholder">No changes needed — your text is clean.</p>}
                            </div>
                        )}

                        {activeTab === 2 && (
                            <div className="flags-list">
                                {result.flags?.length > 0 ? result.flags.map((f, i) => (
                                    <div key={i} className="flag-item">
                                        <span className={`flag-type flag-${f.type}`}>{f.type}</span>
                                        <strong>&quot;{f.word}&quot;</strong> — {f.occurrences} times
                                        {f.suggestion && <p className="flag-context">{f.suggestion}</p>}
                                    </div>
                                )) : <p className="output-placeholder">No flags found.</p>}
                            </div>
                        )}

                        <LivePreview
                            beforeHtml={`<p>${input.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`}
                            afterHtml={result.cleaned_text ? `<p>${result.cleaned_text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>` : ''}
                        />
                    </>
                )}
            </div>
        </div>

</>
    );
}
