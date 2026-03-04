'use client';

import { PLAN_LIMITS } from '@/lib/constants';

export default function UsageBar({ plan, runsUsed }) {
    const limit = PLAN_LIMITS[plan] || 10;
    const pct = Math.min((runsUsed / limit) * 100, 100);
    const planLabel = plan.charAt(0).toUpperCase() + plan.slice(1) + ' Plan';

    return (
        <div className="usage-bar-wrap">
            <span style={{ fontSize: '.875rem', fontWeight: 500 }}>{planLabel}</span>
            <div className="usage-bar-track">
                <div className="usage-bar-fill" style={{ width: pct + '%' }}></div>
            </div>
            <span className="usage-text">{runsUsed} / {limit} runs</span>
        </div>
    );
}
