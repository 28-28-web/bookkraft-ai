'use client';

import { track } from '@/lib/analytics';
import ResultEmailCapture, { submitLead, TIPS_FOOTNOTE } from '@/components/ResultEmailCapture';

// Email sign-up + fix link box. The free checkers now use ResultEmailCapture
// and FixAllCta directly; this is kept for Manuscript Cleanup.
export default function ToolResultsCTA({ toolSlug, subjectNoun = 'file', issueCount, fixTool }) {
    const hasIssues = issueCount > 0;
    // /api/leads only saves the address; it does not email a report, so the
    // copy below must not promise one.
    const emailBox = (props) => (
        <ResultEmailCapture
            tool={toolSlug}
            issueCount={issueCount || 0}
            gtagParams={{ tool_name: toolSlug, issue_count: issueCount || 0 }}
            footnote={TIPS_FOOTNOTE}
            onSubmit={({ email }) => submitLead({ email, tool: toolSlug, issueCount: issueCount || 0 })}
            bare
            {...props}
        />
    );

    const fixHref = fixTool
        ? `/tools/${fixTool.slug}?ref=${toolSlug}&issues=${issueCount || 0}`
        : `/pricing?ref=${toolSlug}&issues=${issueCount || 0}`;
    const fixLabel = fixTool ? `Open ${fixTool.label} →` : 'See plans →';

    if (!hasIssues) {
        return (
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 12, padding: 24, marginTop: 24, textAlign: 'center' }}>
                <p style={{ fontWeight: 700, fontSize: '1rem', marginBottom: 6, color: '#166534' }}>✅ Your {subjectNoun} looks clean.</p>
                {emailBox({
                    heading: 'Want to know when we ship new free tools?',
                    subtext: 'Leave your email — no spam, unsubscribe anytime.',
                    buttonLabel: 'Notify Me',
                })}
            </div>
        );
    }

    return (
        <div style={{ background: '#1a1a1a', color: '#fff', borderRadius: 12, padding: 24, marginTop: 24 }}>
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: 20 }}>
                We found {issueCount} {issueCount === 1 ? 'issue' : 'issues'} in your {subjectNoun}
            </h3>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16 }}>
                <div style={{ background: 'rgba(255,255,255,0.06)', borderRadius: 10, padding: 18 }}>
                    {emailBox({
                        heading: '📬 Get publishing tips by email',
                        subtext: 'Occasional tips and product updates. No spam.',
                        buttonLabel: 'Sign up',
                        dark: true,
                    })}
                </div>

                <div style={{ background: 'rgba(201,147,58,0.12)', border: '1px solid rgba(201,147,58,0.35)', borderRadius: 10, padding: 18, display: 'flex', flexDirection: 'column' }}>
                    <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 4 }}>🔧 Fixing these</p>
                    <p style={{ color: '#d1b98a', fontSize: '0.82rem', marginBottom: 14, flex: 1 }}>
                        {fixTool
                            ? `${fixTool.label} can fix some of these issues.`
                            : 'See what the paid BookKraft tools do. One-time payment, no subscription.'}
                    </p>
                    <a href={fixHref} onClick={() => track('fix_clicked', { tool: toolSlug, fix_tool: fixTool?.slug || 'pricing', issue_count: issueCount || 0 })} style={{ display: 'block', textAlign: 'center', background: '#C9933A', color: '#1a1a1a', padding: '10px 16px', borderRadius: 8, fontWeight: 700, fontSize: '0.88rem', textDecoration: 'none' }}>
                        {fixLabel}
                    </a>
                </div>
            </div>
        </div>
    );
}
