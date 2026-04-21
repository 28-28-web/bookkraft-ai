'use client';

import { useState, useEffect } from 'react';
import { useProject } from '@/lib/ProjectContext';
import FileUploader from '@/components/FileUploader';
import LivePreview from '@/components/LivePreview';

export default function StyleSheetAuditor() {
    const { currentProject, loadProjectText } = useProject();
    const [input, setInput] = useState('');
    const [styleSheet, setStyleSheet] = useState('');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');
    const [filter, setFilter] = useState('all');

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
        <>
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

                {/* LivePreview — Before/After */}
                {result && (
                    <LivePreview
                        beforeHtml={`<p>${input.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`}
                        afterHtml={result.generated_style_sheet ? `<pre>${result.generated_style_sheet}</pre>` : ''}
                    />
                )}
            </div>
</div>
        {/* SEO Content */}
        <div className="seo-content" style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
            <h2>Style Sheet Auditor for Authors and Editors</h2>
            <p>Inconsistency is one of the hardest things to catch in your own manuscript. You hyphenate a word one way in chapter three and a different way in chapter eleven. You capitalize a term early on and forget to later. By the time a reader notices, the damage is done. This tool catches those inconsistencies before your book goes out.</p>

            <h2>What This Tool Does</h2>
            <p>The Style Sheet Auditor works on two levels. On the writing style side, it checks for consistency across punctuation choices, capitalization patterns, hyphenation decisions, spelling variations, and terminology usage. On the document formatting side, it audits fonts, spacing, paragraph styles, indentation, and heading structure throughout your file.</p>

            <h2>What It Audits</h2>
            <p>Writing style checks include hyphenation consistency, capitalization of proper nouns and titles, punctuation patterns like Oxford comma and em dash usage, spelling variants between American and British English, and terminology consistency for character names and invented terms. Formatting checks cover font consistency, paragraph spacing, heading hierarchy, line spacing, and list formatting.</p>

            <h2>Who This Is For</h2>
            <p>Authors finishing a manuscript and wanting one final consistency check before sending to an editor or formatter. Freelance editors who maintain style sheets for client projects and need a reliable way to verify consistency across a full manuscript before delivery. Both groups benefit from having an objective tool check what the human eye naturally skips after reading the same document too many times.</p>

            <h2>How It Works</h2>
            <p>Upload your manuscript in any supported file format. The tool scans for writing style and formatting inconsistencies. Review a clear report of every flagged issue with its location in the document. Then make corrections directly or export the report to share with a client. The audit report tells you exactly where each inconsistency appears — not just that one exists.</p>

            <h2>The Problem With Manual Style Checks</h2>
            <p>Most editors and authors do style checks manually using ctrl+F and a running list of decisions. It works — but it's slow, and it's easy to miss things. An automated audit covers the entire manuscript in seconds and catches patterns a manual search wouldn't think to look for.</p>
        </div>
        </>
    );
}