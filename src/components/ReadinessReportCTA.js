'use client';

import { track } from '@/lib/analytics';

// End-of-result cross-sell on every free tool: combine the four checks into
// one gated 0–100 report. Links to the auth-gated page, which sends logged-out
// visitors to /signup?redirect=/dashboard/readiness and back again.
export default function ReadinessReportCTA({ sourceTool }) {
    return (
        <div style={{
            marginTop: 16, padding: '18px 22px', borderRadius: 12,
            background: '#faf7f0', border: '1px solid #e5e0d8',
            display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap',
        }}>
            <span style={{ fontSize: 26, flexShrink: 0 }}>📊</span>
            <div style={{ flex: 1, minWidth: 200 }}>
                <p style={{ fontWeight: 700, fontSize: '0.95rem', margin: '0 0 2px' }}>
                    See your full Publishing Readiness score
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>
                    Combine EPUB, metadata, cover and manuscript checks into one 0–100 report.
                </p>
            </div>
            <a
                href="/dashboard/readiness"
                onClick={() => track('readiness_cta_click', { source: sourceTool })}
                style={{
                    display: 'inline-block', background: '#C9933A', color: '#fff',
                    padding: '10px 20px', borderRadius: 8, fontWeight: 700,
                    fontSize: '0.88rem', textDecoration: 'none', whiteSpace: 'nowrap', flexShrink: 0,
                }}
            >
                Get your Full Readiness Report — free account →
            </a>
        </div>
    );
}
