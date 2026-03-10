'use client';

/**
 * WordCounter — Live word counter with colour states
 * Under 80%: neutral (--mid)
 * 80-99%: amber (#B45309) + 'Approaching limit'
 * At/over: red (#DC2626) — submit should be disabled
 */
export function countWords(text) {
    return text.trim() === '' ? 0 : text.trim().split(/\s+/).length;
}

export default function WordCounter({ text, limit }) {
    const wc = countWords(text);
    const pct = limit ? (wc / limit) * 100 : 0;

    let color = 'var(--mid)';
    let label = '';

    if (limit) {
        if (pct >= 100) {
            color = '#DC2626';
            label = ` — ${wc - limit} words over limit`;
        } else if (pct >= 80) {
            color = '#B45309';
            label = ' — Approaching limit';
        }
    }

    return (
        <div className="word-counter" style={{ color, fontSize: 'var(--text-sm)', marginTop: 'var(--space-2)' }}>
            {wc.toLocaleString()}{limit ? ` / ${limit.toLocaleString()} words` : ' words'}{label}
        </div>
    );
}

/**
 * Check if text exceeds word limit. Returns error message or null.
 */
export function getWordLimitError(text, limit) {
    const wc = countWords(text);
    if (wc > limit) {
        return `Text is ${wc - limit} words over the ${limit.toLocaleString()}-word limit. Process one chapter at a time.`;
    }
    return null;
}
