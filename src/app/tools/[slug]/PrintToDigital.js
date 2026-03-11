'use client';

import { useState, useEffect } from 'react';
import { useProject } from '@/lib/ProjectContext';
import FileUploader from '@/components/FileUploader';

export default function PrintToDigital() {
    const { currentProject, loadProjectText } = useProject();
    const [input, setInput] = useState('');
    const [footnoteFormat, setFootnoteFormat] = useState('endnotes');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

    // Pre-fill from active project
    useEffect(() => {
        if (currentProject?.id && !input) {
            loadProjectText(currentProject.id).then(text => {
                if (text) setInput(text);
            });
        }
    }, [currentProject?.id]);

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/tools/print-to-digital', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: input, footnoteFormat,
                    adaptations: { pageRefs: true, footnotes: true, runningHeaders: true, tables: true, figureRefs: true },
                }),
            });
            const data = await res.json();
            if (!res.ok) { setError(data.error || 'Something went wrong'); return; }
            setResult(data.data);
        } catch {
            setError('Network error. Try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Print Text</h3>
                <FileUploader
                    onTextExtracted={(text) => setInput(text)}
                    label="Upload your print manuscript (.docx or .txt)"
                />
                <textarea className="form-textarea" style={{ minHeight: '250px' }}
                    placeholder="Or paste your print-format text (up to 4,000 words)..."
                    value={input} onChange={(e) => setInput(e.target.value)} />
                <p className="word-count">{input.split(/\s+/).filter(Boolean).length} / 4,000 words</p>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Footnote format</label>
                    {['endnotes', 'inline', 'popup'].map((f) => (
                        <label key={f} className="fix-checkbox">
                            <input type="radio" checked={footnoteFormat === f} onChange={() => setFootnoteFormat(f)} />
                            <span>{{ endnotes: 'Endnotes', inline: 'Inline parenthetical', popup: 'EPUB3 pop-ups' }[f]}</span>
                        </label>
                    ))}
                </div>

                <button className="btn btn-primary generate-btn" onClick={handleSubmit} disabled={loading || !input.trim()}>
                    {loading ? <><div className="spinner" /> Converting...</> : '🔄 Convert to Digital'}
                </button>
                {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
            </div>

            <div className="tool-output-card">
                <h3>Digital-Ready Output</h3>
                {!result && !loading && <div className="output-placeholder">Paste print text and click Convert to see digital adaptation.</div>}
                {loading && <div className="loading-state"><div className="spinner" /> AI is converting your text...</div>}

                {result && (
                    <>
                        <textarea className="form-textarea" style={{ minHeight: '250px' }} value={result.adapted_text || ''} readOnly />

                        {/* Conversion summary */}
                        {result.conversions?.length > 0 && (
                            <div className="conversion-summary">
                                <h4>Conversions Applied</h4>
                                {result.conversions.map((c, i) => (
                                    <div key={i} className="conversion-item">
                                        <span className="conversion-type">{c.type}</span>
                                        <span className="conversion-count">{c.count}×</span>
                                        <span>{c.description}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Needs review */}
                        {result.needs_review?.length > 0 && (
                            <div className="needs-review">
                                <h4>⚠️ Needs Manual Review</h4>
                                {result.needs_review.map((r, i) => (
                                    <div key={i} className="review-item">
                                        <strong>{r.item}</strong>
                                        <p>{r.reason}</p>
                                    </div>
                                ))}
                            </div>
                        )}

                        <div className="output-actions" style={{ marginTop: '1rem' }}>
                            <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(result.adapted_text)}>📋 Copy</button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
