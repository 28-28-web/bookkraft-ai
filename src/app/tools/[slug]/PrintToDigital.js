'use client';

import { useState, useEffect } from 'react';
import { useProject } from '@/lib/ProjectContext';
import FileUploader from '@/components/FileUploader';
import LivePreview from '@/components/LivePreview';

export default function PrintToDigital() {
    const { currentProject, loadProjectText } = useProject();
    const [input, setInput] = useState('');
    const [footnoteFormat, setFootnoteFormat] = useState('endnotes');
    const [loading, setLoading] = useState(false);
    const [result, setResult] = useState(null);
    const [error, setError] = useState('');

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
        <>
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

                {result && (
                    <LivePreview
                        beforeHtml={`<p>${input.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>`}
                        afterHtml={result.adapted_text ? `<p>${result.adapted_text.replace(/\n\n/g, '</p><p>').replace(/\n/g, '<br>')}</p>` : ''}
                    />
                )}
            </div>
        </div>

        {/* SEO Content */}
        <div className="seo-content" style={{ maxWidth: '800px', margin: '3rem auto', padding: '0 1rem' }}>
            <h2>Print to Digital Book Converter for Authors</h2>
            <p>You wrote the book for print. Now you need a digital version. But converting a print manuscript to ebook formats isn't as simple as saving a new file. Layouts break, fonts don't carry over, and formatting that looked perfect on a printed page falls apart on a screen. This tool handles the conversion properly.</p>

            <h2>What This Tool Does</h2>
            <p>Print to Digital converts your print manuscript into clean, properly formatted digital files ready for publishing on major ebook platforms. It accepts multiple input formats — print-ready PDFs, Word DOCX files, and others — so you don't need to prepare your manuscript in a specific way before you start.</p>

            <h2>Input and Output Formats</h2>
            <p>Upload from print-ready PDF, Microsoft Word DOCX, Rich Text Format, plain text, or InDesign exports. Output formats include EPUB for most ebook platforms, MOBI for Kindle and Amazon KDP, and PDF for digital distribution and review copies. Each output file is formatted to meet platform specifications.</p>

            <h2>Who This Is For</h2>
            <p>Authors with existing print books who want to expand into digital without starting their formatting from scratch. Self-publishers releasing in both print and digital simultaneously. Freelance editors and formatters who handle conversion as part of their client services and need a reliable, repeatable process.</p>

            <h2>How It Works</h2>
            <p>Upload your print manuscript in any supported format. Choose your output formats — EPUB, MOBI, PDF, or all three. The tool converts and formats your manuscript for digital publishing. Then download your finished digital files ready to upload to your platforms. The conversion takes minutes.</p>

            <h2>Why Conversion Goes Wrong Without the Right Tool</h2>
            <p>Print layouts are designed for fixed pages. Digital formats are designed for flexible screens. When you try to force one into the other manually, things break — chapter headings shift, images misalign, and text spacing becomes inconsistent. A proper conversion tool understands both formats and gets it right from the start.</p>
        </div>
        </>
    );
}