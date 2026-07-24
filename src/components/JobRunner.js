'use client';

import { useEffect, useRef, useState } from 'react';

/**
 * Drives the estimate → confirm → chunked-run flow for the long-manuscript
 * tools (manuscript-cleanup, print-to-digital, style-sheet-auditor).
 *
 * Props:
 *  - toolSlug: string
 *  - text: string — the manuscript text that will be chunked
 *  - buildRequestBody: () => object — extra per-tool fields merged with { text }
 *  - disabled: boolean
 *  - runLabel: string — button label before an estimate exists
 *  - onResult: (mergedResult, { status, creditsCharged, wordCount }) => void
 */
export default function JobRunner({ toolSlug, text, buildRequestBody, disabled, runLabel = 'Analyze Manuscript', onResult }) {
    const [phase, setPhase] = useState('idle'); // idle | estimating | confirm | running | error
    const [estimate, setEstimate] = useState(null);
    const [progress, setProgress] = useState({ completedChunks: 0, totalChunks: 0 });
    const [error, setError] = useState('');
    const sourceRef = useRef(null);

    useEffect(() => () => sourceRef.current?.close(), []);

    const requestEstimate = async () => {
        setError('');
        setPhase('estimating');
        try {
            const res = await fetch(`/api/tools/${toolSlug}/estimate`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) {
                setError(data.message || 'Could not estimate cost. Try again.');
                setPhase('idle');
                return;
            }
            setEstimate(data);
            setPhase('confirm');
        } catch {
            setError('Network error. Try again.');
            setPhase('idle');
        }
    };

    const startRun = async () => {
        setError('');
        setPhase('running');
        setProgress({ completedChunks: 0, totalChunks: estimate?.chunkCount || 0 });

        try {
            const res = await fetch(`/api/tools/${toolSlug}/jobs`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text, ...(buildRequestBody ? buildRequestBody() : {}) }),
            });
            const data = await res.json();
            if (!res.ok || !data.ok) {
                setError(errorMessage(data));
                setPhase('idle');
                return;
            }
            subscribeToJob(data.jobId);
        } catch {
            setError('Network error. Try again.');
            setPhase('idle');
        }
    };

    const subscribeToJob = (jobId) => {
        const source = new EventSource(`/api/jobs/${jobId}/stream`);
        sourceRef.current = source;

        source.addEventListener('progress', (e) => {
            const data = JSON.parse(e.data);
            setProgress({ completedChunks: data.completedChunks, totalChunks: data.totalChunks });
        });

        source.addEventListener('job_done', (e) => {
            const data = JSON.parse(e.data);
            source.close();
            if (data.status === 'failed') {
                setError(data.error || 'The run failed. Credits were refunded.');
                setPhase('idle');
                return;
            }
            setPhase('idle');
            setEstimate(null);
            onResult?.(data.result, {
                status: data.status,
                creditsCharged: data.creditsCharged,
                wordCount: estimate?.wordCount,
            });
        });

        source.addEventListener('error', () => {
            // EventSource auto-reconnects on transient network drops; the
            // server-side stream is stateless (reads from the DB each tick),
            // so a fresh connection to the same jobId just resumes.
        });
    };

    if (phase === 'confirm' && estimate) {
        return (
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: 18, marginTop: 12 }}>
                <p style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: 4 }}>
                    {estimate.wordCount.toLocaleString()} words · {estimate.chunkCount} {estimate.chunkCount === 1 ? 'chunk' : 'chunks'}
                </p>
                <p style={{ color: '#6b7280', fontSize: '0.88rem', marginBottom: 14 }}>
                    This run will cost <strong>{estimate.estimatedCredits} credit{estimate.estimatedCredits === 1 ? '' : 's'}</strong>. Credits are only charged for chunks that finish successfully.
                </p>
                <div style={{ display: 'flex', gap: 8 }}>
                    <button className="btn btn-primary" onClick={startRun}>Confirm — Run for {estimate.estimatedCredits} credit{estimate.estimatedCredits === 1 ? '' : 's'}</button>
                    <button className="btn" onClick={() => { setPhase('idle'); setEstimate(null); }}>Cancel</button>
                </div>
            </div>
        );
    }

    if (phase === 'running') {
        const pct = progress.totalChunks > 0 ? Math.round((progress.completedChunks / progress.totalChunks) * 100) : 0;
        return (
            <div style={{ background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: 10, padding: 18, marginTop: 12 }}>
                <p style={{ fontWeight: 600, fontSize: '0.9rem', marginBottom: 8 }}>
                    Analyzing chunk {progress.completedChunks} of {progress.totalChunks || '…'}
                </p>
                <div style={{ background: '#e5e7eb', borderRadius: 6, height: 8, overflow: 'hidden' }}>
                    <div style={{ background: '#C9933A', height: '100%', width: `${pct}%`, transition: 'width 0.3s ease' }} />
                </div>
                <p style={{ color: '#9ca3af', fontSize: '0.78rem', marginTop: 8 }}>
                    You can close this tab — your progress is saved. Come back and this will pick up where it left off.
                </p>
            </div>
        );
    }

    return (
        <div style={{ marginTop: 12 }}>
            <button className="btn btn-primary generate-btn" onClick={requestEstimate} disabled={disabled || phase === 'estimating' || !text?.trim()}>
                {phase === 'estimating' ? 'Calculating cost…' : runLabel}
            </button>
            {error && <p className="auth-error" style={{ marginTop: '0.75rem' }}>{error}</p>}
        </div>
    );
}

function errorMessage(data) {
    switch (data.error) {
        case 'insufficient_credits':
            return `This run needs ${data.credits_needed} credits — you have ${data.credits_balance}.`;
        case 'concurrent_limit':
            return 'You already have 3 runs in progress. Wait for one to finish before starting another.';
        case 'daily_word_limit':
            return "You've hit the 500,000-word rolling 24-hour limit for this account.";
        case 'empty_input':
            return 'Add some manuscript text first.';
        default:
            return 'Something went wrong starting this run.';
    }
}
