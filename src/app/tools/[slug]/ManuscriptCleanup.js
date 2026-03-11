'use client';

import { useState } from 'react';
import { useAuth } from '@/components/AuthProvider';
import WordCounter, { countWords, getWordLimitError } from '@/components/WordCounter';
import CreditDisplay from '@/components/CreditDisplay';
import LivePreview from '@/components/LivePreview';
import FileUploader from '@/components/FileUploader';

export default function ManuscriptCleanup() {
    const { profile } = useAuth();
    const [input, setInput] = useState('');
    const [mode, setMode] = useState('deep');
    const [genre, setGenre] = useState('fiction');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [activeTab, setActiveTab] = useState(0);
    const [sampleMode, setSampleMode] = useState(false);
    const WORD_LIMIT = 3000;

    const handleSubmit = async () => {
        if (!input.trim()) return;

        // Frontend word limit check
        if (!sampleMode) {
            const wordError = getWordLimitError(input, WORD_LIMIT);
            if (wordError) { setError(wordError); return; }
        }

        setLoading(true);
        setError('');
        setResult(null);

        try {
            const endpoint = sampleMode
                ? '/api/tools/manuscript-cleanup/sample'
                : '/api/tools/manuscript-cleanup';

            const res = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: input, mode, genre,
                    checks: { repeatedWords: true, cliches: true, dialoguePunct: true, paragraphSpacing: true },
                }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data.message || data.error || 'Something went wrong');
                return;
            }
            setResult({ ...data.data, isSample: data.isSample, wordsProcessed: data.wordsProcessed });
        } catch {
            setError('Network error. Try again.');
        } finally {
            setLoading(false);
        }
    };

    const wc = countWords(input);
    const isOverLimit = !sampleMode && wc > WORD_LIMIT;
    const hasCredits = profile?.is_lifetime || (profile?.credits_balance || 0) >= 3;

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Input</h3>

                {/* Credit display for AI tool */}
                <CreditDisplay
                    toolSlug="manuscript-cleanup"
                    balance={profile?.credits_balance || 0}
                    isLifetime={profile?.is_lifetime}
                />

                <FileUploader
                    onTextExtracted={(text) => setInput(text)}
                    label="Upload your manuscript (.docx or .txt)"
                />

                <textarea className="form-textarea" style={{ minHeight: '250px' }}
                    placeholder="Or paste your chapter text here (up to 3,000 words)..."
                    value={input} onChange={(e) => setInput(e.target.value)} />

                <WordCounter text={input} limit={sampleMode ? 500 : WORD_LIMIT} />

                {/* Free Sample / Full Chapter toggle */}
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
                        <span>Full Chapter — up to 3,000 words — 3 credits</span>
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

                <button className="btn btn-primary generate-btn"
                    onClick={handleSubmit}
                    disabled={loading || !input.trim() || isOverLimit || (!sampleMode && !hasCredits)}>
                    {loading
                        ? <><div className="spinner" /> Cleaning...</>
                        : sampleMode
                            ? 'Run Free Sample'
                            : 'Clean Manuscript — 3 credits'}
                </button>
                {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
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
                                {' '}Process your full chapter for just 3 credits.
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

                        {/* LivePreview */}
                        <LivePreview
                            beforeHtml={`<p>${input.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`}
                            afterHtml={result.cleaned_text ? `<p>${result.cleaned_text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>` : ''}
                        />
                    </>
                )}
            </div>
        </div>
    );
}
