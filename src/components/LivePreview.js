'use client';

import { useState } from 'react';

/**
 * LivePreview — Before/After comparison for AI tool output
 * Renders project raw_html and AI output as styled HTML.
 * Format toggle: Kindle | EPUB | Print
 */

const FORMAT_STYLES = {
    kindle: {
        fontFamily: "'Bookerly', Georgia, 'Times New Roman', serif",
        fontSize: '16px',
        lineHeight: '1.8',
        bg: '#ffffff',
        maxWidth: '600px',
    },
    epub: {
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: '15px',
        lineHeight: '1.7',
        bg: '#ffffff',
        maxWidth: '640px',
    },
    print: {
        fontFamily: "'Times New Roman', Times, serif",
        fontSize: '14px',
        lineHeight: '1.5',
        bg: '#fafafa',
        maxWidth: '500px',
    },
};

export default function LivePreview({ beforeHtml, afterHtml }) {
    const [format, setFormat] = useState('kindle');
    const [view, setView] = useState('after');
    const style = FORMAT_STYLES[format];

    const displayHtml = view === 'before' ? beforeHtml : afterHtml;

    return (
        <div style={{ marginTop: 'var(--space-4)' }}>
            {/* Controls */}
            <div style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 'var(--space-3)',
                flexWrap: 'wrap',
                gap: 'var(--space-2)',
            }}>
                {/* Before / After toggle */}
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {['before', 'after'].map((v) => (
                        <button
                            key={v}
                            onClick={() => setView(v)}
                            className={`btn btn-sm ${view === v ? 'btn-primary' : 'btn-outline'}`}
                            style={{ fontSize: '12px', height: '30px', padding: '0 12px', textTransform: 'capitalize' }}
                        >
                            {v}
                        </button>
                    ))}
                </div>

                {/* Format toggle */}
                <div style={{ display: 'flex', gap: 'var(--space-2)' }}>
                    {Object.keys(FORMAT_STYLES).map((f) => (
                        <button
                            key={f}
                            onClick={() => setFormat(f)}
                            className={`btn btn-sm ${format === f ? 'btn-gold' : 'btn-outline'}`}
                            style={{ fontSize: '11px', height: '28px', padding: '0 10px', textTransform: 'capitalize' }}
                        >
                            {f}
                        </button>
                    ))}
                </div>
            </div>

            {/* Preview pane */}
            <div style={{
                border: '1px solid var(--border)',
                borderRadius: 'var(--radius)',
                background: style.bg,
                maxHeight: '500px',
                overflow: 'auto',
                padding: '24px',
            }}>
                {displayHtml ? (
                    <div
                        style={{
                            fontFamily: style.fontFamily,
                            fontSize: style.fontSize,
                            lineHeight: style.lineHeight,
                            maxWidth: style.maxWidth,
                            margin: '0 auto',
                            color: 'var(--ink)',
                        }}
                        dangerouslySetInnerHTML={{ __html: displayHtml }}
                    />
                ) : (
                    <p style={{
                        color: 'var(--mid)',
                        textAlign: 'center',
                        padding: 'var(--space-16) 0',
                        fontSize: 'var(--text-sm)',
                    }}>
                        {view === 'before'
                            ? 'Upload a .docx or paste text to see the original here.'
                            : 'Run the tool to see AI-processed output here.'}
                    </p>
                )}
            </div>
        </div>
    );
}
