'use client';

import { useState } from 'react';

/**
 * DevicePreview — Phone | Tablet | E-Ink (Kindle) mockup
 * Appears on ALL logic tool output panels.
 */
const DEVICES = {
    phone: {
        label: 'Phone',
        width: 280,
        height: 500,
        borderRadius: 24,
        borderColor: '#1a1a1a',
        borderWidth: 3,
        bg: '#ffffff',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '14px',
        padding: '24px 16px',
    },
    tablet: {
        label: 'Tablet',
        width: 480,
        height: 640,
        borderRadius: 16,
        borderColor: '#9a9a9a',
        borderWidth: 2,
        bg: '#ffffff',
        fontFamily: "'DM Sans', sans-serif",
        fontSize: '16px',
        padding: '32px 24px',
    },
    eink: {
        label: 'E-Ink',
        width: 360,
        height: 480,
        borderRadius: 4,
        borderColor: '#d4cfc7',
        borderWidth: 2,
        bg: '#F0EBE1',
        fontFamily: "Georgia, 'Times New Roman', serif",
        fontSize: '15px',
        padding: '28px 20px',
    },
};

export default function DevicePreview({ content, format = 'html' }) {
    const [device, setDevice] = useState('phone');
    const d = DEVICES[device];

    // Format content for display
    const displayContent = format === 'html'
        ? content
        : `<pre style="white-space:pre-wrap;word-wrap:break-word;font-family:inherit;font-size:inherit;margin:0;">${escapeHtml(content || '')}</pre>`;

    return (
        <div className="device-preview-container" style={{ marginTop: 'var(--space-4)' }}>
            {/* Toggle bar */}
            <div style={{
                display: 'flex',
                gap: 'var(--space-2)',
                marginBottom: 'var(--space-3)',
                justifyContent: 'center',
            }}>
                {Object.entries(DEVICES).map(([key, val]) => (
                    <button
                        key={key}
                        onClick={() => setDevice(key)}
                        className={`btn btn-sm ${device === key ? 'btn-primary' : 'btn-outline'}`}
                        style={{ fontSize: '12px', height: '32px', padding: '0 14px' }}
                    >
                        {val.label}
                    </button>
                ))}
            </div>

            {/* Device frame */}
            <div style={{
                display: 'flex',
                justifyContent: 'center',
            }}>
                <div style={{
                    width: d.width,
                    height: d.height,
                    border: `${d.borderWidth}px solid ${d.borderColor}`,
                    borderRadius: d.borderRadius,
                    background: d.bg,
                    overflow: 'hidden',
                    boxShadow: '0 8px 32px rgba(15,14,12,0.12)',
                    position: 'relative',
                }}>
                    <div
                        style={{
                            width: '100%',
                            height: '100%',
                            overflow: 'auto',
                            padding: d.padding,
                            fontFamily: d.fontFamily,
                            fontSize: d.fontSize,
                            lineHeight: '1.7',
                            color: device === 'eink' ? '#2a2a2a' : 'var(--ink)',
                        }}
                        dangerouslySetInnerHTML={{ __html: displayContent || '<p style="color:#999;text-align:center;margin-top:40%">Preview will appear here</p>' }}
                    />
                </div>
            </div>
        </div>
    );
}

function escapeHtml(text) {
    return text
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/\n/g, '<br>');
}
