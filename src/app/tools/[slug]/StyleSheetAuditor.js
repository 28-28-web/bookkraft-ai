'use client';

import { useState } from 'react';
import FileUploader from '@/components/FileUploader';

export default function StyleSheetAuditor() {
    const [input, setInput] = useState('');
    const [styleSheet, setStyleSheet] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

    const handleSubmit = async () => {
        if (!input.trim()) return;
        setLoading(true);
        setError('');
        setResult(null);

        try {
            const res = await fetch('/api/tools/style-sheet-auditor', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    text: input, styleSheet: styleSheet || null,
                    categories: { charNames: true, capitalisation: true, hyphenation: true, dialoguePunct: true, numberFormat: true, povConsistency: true },
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

    const violations = result?.violations || [];
    const filtered = filter === 'all' ? violations : violations.filter((v) => v.severity === filter);
    const critCount = violations.filter((v) => v.severity === 'critical').length;
    const warnCount = violations.filter((v) => v.severity === 'warning').length;
    const noteCount = violations.filter((v) => v.severity === 'notice').length;

    return (
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Input</h3>
                <FileUploader
                    onTextExtracted={(text) => setInput(text)}
                    label="Upload your manuscript (.docx or .txt)"
                />
                <textarea className="form-textarea" style={{ minHeight: '200px' }}
                    placeholder="Or paste your chapter(s) — up to 5,000 words..."
                    value={input} onChange={(e) => setInput(e.target.value)} />
                <p className="word-count">{input.split(/\s+/).filter(Boolean).length} / 5,000 words</p>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Known style rules (optional)</label>
                    <textarea className="form-textarea" style={{ minHeight: '80px' }}
                        placeholder="Paste your existing style sheet, or leave blank for auto-detection..."
                        value={styleSheet} onChange={(e) => setStyleSheet(e.target.value)} />
                </div>
                <button className="btn btn-primary generate-btn" onClick={handleSubmit} disabled={loading || !input.trim()}>
                    {loading ? <><div className="spinner" /> Auditing...</> : '🔍 Run Style Audit'}
                </button>
                {error && <p className="auth-error" style={{ marginTop: '1rem' }}>{error}</p>}
            </div>

            <div className="tool-output-card">
                <h3>Audit Results</h3>
                {!result && !loading && <div className="output-placeholder">Paste text and run the audit to see style inconsistencies.</div>}
                {loading && <div className="loading-state"><div className="spinner" /> AI is auditing your style...</div>}

                {result && (
                    <>
                        {/* Summary bar */}
                        <div className="audit-summary">
                            <span className="audit-count audit-critical">{critCount} critical</span>
                            <span className="audit-count audit-warning">{warnCount} warnings</span>
                            <span className="audit-count audit-notice">{noteCount} notices</span>
                        </div>

                        {/* Detection rules */}
                        {result.detected_rules?.length > 0 && (
                            <div className="detected-rules">
                                <h4>Detected Style Rules</h4>
                                {result.detected_rules.map((r, i) => (
                                    <div key={i} className="detected-rule">
                                        <span className="rule-category">{r.category}</span>
                                        <span>{r.rule}</span>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Filter */}
                        <div className="cat-filter" style={{ marginTop: '1rem' }}>
                            {['all', 'critical', 'warning', 'notice'].map((f) => (
                                <button key={f} className={`cat-btn ${filter === f ? 'active' : ''}`} onClick={() => setFilter(f)}>
                                    {f === 'all' ? 'All' : f.charAt(0).toUpperCase() + f.slice(1)}
                                </button>
                            ))}
                        </div>

                        {/* Violations table */}
                        <div className="violations-list">
                            {filtered.length > 0 ? filtered.map((v, i) => (
                                <div key={i} className={`violation-item violation-${v.severity}`}>
                                    <div className="violation-header">
                                        <span className={`violation-sev sev-${v.severity}`}>{v.severity}</span>
                                        <span className="violation-cat">{v.category}</span>
                                    </div>
                                    <p className="violation-quoted">&ldquo;{v.quoted_text}&rdquo;</p>
                                    <p className="violation-issue">{v.issue}</p>
                                    <p className="violation-fix">💡 {v.suggestion}</p>
                                </div>
                            )) : <p className="output-placeholder">No violations found at this severity level.</p>}
                        </div>

                        {/* Download style sheet */}
                        {result.generated_style_sheet && (
                            <div className="output-actions" style={{ marginTop: '1rem' }}>
                                <button className="btn btn-primary btn-sm" onClick={() => navigator.clipboard.writeText(result.generated_style_sheet)}>📋 Copy Style Sheet</button>
                                <button className="btn btn-outline btn-sm" onClick={() => {
                                    const blob = new Blob([result.generated_style_sheet], { type: 'text/plain' });
                                    const url = URL.createObjectURL(blob);
                                    const a = document.createElement('a'); a.href = url; a.download = 'style-sheet.txt'; a.click();
                                    URL.revokeObjectURL(url);
                                }}>⬇ Download Style Sheet</button>
                            </div>
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
