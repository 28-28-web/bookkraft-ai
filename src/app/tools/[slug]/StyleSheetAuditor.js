'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { useProject } from '@/lib/ProjectContext';
import FileUploader from '@/components/FileUploader';
import LivePreview from '@/components/LivePreview';
import JobRunner from '@/components/JobRunner';

export default function StyleSheetAuditor() {
    const { profile, refreshProfile } = useAuth();
    const { currentProject, loadProjectText } = useProject();
    const [input, setInput] = useState('');
    const [styleSheet, setStyleSheet] = useState('');
    const [result, setResult] = useState(null);
    const [filter, setFilter] = useState('all');
    const hasCredits = profile?.is_lifetime || (profile?.credits_balance || 0) >= 1;

    // Pre-fill from active project
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

    const violations = result?.violations || [];
    const filtered = filter === 'all' ? violations : violations.filter((v) => v.severity === filter);
    const critCount = violations.filter((v) => v.severity === 'critical').length;
    const warnCount = violations.filter((v) => v.severity === 'warning').length;
    const noteCount = violations.filter((v) => v.severity === 'notice').length;

    return (
        <>
        <div className="tool-layout">
            <div className="tool-input-card">
                <h3>Input</h3>
                <FileUploader
                    onTextExtracted={(text) => setInput(text)}
                    label="Upload your manuscript (.docx or .txt) — any length"
                />
                <textarea className="form-textarea" style={{ minHeight: '200px' }}
                    placeholder="Or paste your manuscript here — no word cap..."
                    value={input} onChange={(e) => setInput(e.target.value)} />
                <p className="word-count">{input.split(/\s+/).filter(Boolean).length.toLocaleString()} words</p>
                <div className="form-group" style={{ marginTop: '1rem' }}>
                    <label className="form-label">Known style rules (optional)</label>
                    <textarea className="form-textarea" style={{ minHeight: '80px' }}
                        placeholder="Paste your existing style sheet, or leave blank for auto-detection..."
                        value={styleSheet} onChange={(e) => setStyleSheet(e.target.value)} />
                </div>

                <JobRunner
                    toolSlug="style-sheet-auditor"
                    text={input}
                    disabled={!hasCredits}
                    runLabel="🔍 Get Cost Estimate"
                    buildRequestBody={() => ({
                        styleSheet: styleSheet || null,
                        categories: { charNames: true, capitalisation: true, hyphenation: true, dialoguePunct: true, numberFormat: true, povConsistency: true },
                    })}
                    onResult={handleResult}
                />
            </div>

            <div className="tool-output-card">
                <h3>Audit Results</h3>
                {!result && <div className="output-placeholder">Paste text and run the audit to see style inconsistencies.</div>}

                {result && (
                    <>
                        {result.partial && (
                            <div style={{
                                padding: '12px 16px', background: '#fef3c7',
                                borderLeft: '3px solid #d97706', borderRadius: '8px',
                                marginBottom: '1rem', fontSize: '0.9rem',
                            }}>
                                Some sections failed to audit and were skipped — you were only charged {result.creditsCharged} credit{result.creditsCharged === 1 ? '' : 's'} for the sections that completed.
                            </div>
                        )}

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

                        <LivePreview
                            beforeHtml={`<p>${input.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`}
                            afterHtml=""
                        />
                    </>
                )}
            </div>
</div>
</>
    );
}
