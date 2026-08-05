'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useProject } from '@/lib/ProjectContext';
import FileUploader from '@/components/FileUploader';
import LivePreview from '@/components/LivePreview';
import JobRunner from '@/components/JobRunner';

export default function PrintToDigital() {
    const { profile, refreshProfile } = useAuth();
    const { currentProject, loadProjectText } = useProject();
    const [input, setInput] = useState('');
    const [footnoteFormat, setFootnoteFormat] = useState('endnotes');
    const [result, setResult] = useState(null);
    const hasCredits = profile?.is_lifetime || (profile?.credits_balance || 0) >= 1;

    useEffect(() => {
        if (currentProject?.id && !input) {
            loadProjectText(currentProject.id).then(text => {
                if (text) setInput(text);
            });
        }
    }, [currentProject?.id]);

    const handleResult = async (merged, meta) => {
        setResult({ ...merged, partial: meta.status === 'partial', creditsCharged: meta.creditsCharged });
        await refreshProfile();
    };

    return (
        <>
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Print Text</h3>
                <FileUploader
                    onTextExtracted={(text) => setInput(text)}
                    label="Upload your print manuscript (.docx or .txt) — any length"
                />
                <textarea className="form-textarea" style={{ minHeight: '250px' }}
                    placeholder="Or paste your print-format text here — no word cap..."
                    value={input} onChange={(e) => setInput(e.target.value)} />
                <p className="word-count">{input.split(/\s+/).filter(Boolean).length.toLocaleString()} words</p>

                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Footnote format</label>
                    {['endnotes', 'inline', 'popup'].map((f) => (
                        <label key={f} className="fix-checkbox">
                            <input type="radio" checked={footnoteFormat === f} onChange={() => setFootnoteFormat(f)} />
                            <span>{{ endnotes: 'Endnotes', inline: 'Inline parenthetical', popup: 'EPUB3 pop-ups' }[f]}</span>
                        </label>
                    ))}
                </div>

                <JobRunner
                    toolSlug="print-to-digital"
                    text={input}
                    disabled={!hasCredits}
                    runLabel="🔄 Get Cost Estimate"
                    buildRequestBody={() => ({
                        footnoteFormat,
                        adaptations: { pageRefs: true, footnotes: true, runningHeaders: true, tables: true, figureRefs: true },
                    })}
                    onResult={handleResult}
                />
            </div>

            <div className="tool-output-card">
                <h3>Digital-Ready Output</h3>
                {!result && <div className="output-placeholder">Paste print text and run the converter to see digital adaptation.</div>}

                {result && (
                    <>
                        {result.partial && (
                            <div style={{
                                padding: '12px 16px', background: '#fef3c7',
                                borderLeft: '3px solid #d97706', borderRadius: '8px',
                                marginBottom: '1rem', fontSize: '0.9rem',
                            }}>
                                Some sections failed to convert and were skipped — you were only charged {result.creditsCharged} credit{result.creditsCharged === 1 ? '' : 's'} for the sections that completed.
                            </div>
                        )}

                        <textarea className="form-textarea" style={{ minHeight: '250px' }} value={result.adapted_text || ''} readOnly />

                        {result.conversions?.length > 0 && (
                            <div className="conversion-summary">
                                <h4>Conversions Applied</h4>
                                {result.conversions.map((c, i) => (
                                    <div key={i} className="conversion-item">
                                        <span className="conversion-type">{c.type}</span>
                                        <span>{c.original} → {c.replacement}</span>
                                    </div>
                                ))}
                            </div>
                        )}

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

                        <LivePreview
                            beforeHtml={`<p>${input.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`}
                            afterHtml={result.adapted_text ? `<p>${result.adapted_text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>` : ''}
                        />
                    </>
                )}
            </div>
        </div>

</>
    );
}
