'use client';

/**
 * UploadError — friendly error banner for file upload failures.
 * Never receives or displays raw exception messages / stack traces.
 */
export default function UploadError({ message, onRetry, supportedFormats, maxSize }) {
    return (
        <div style={{
            marginTop: '8px', padding: '12px 14px',
            background: 'rgba(255,107,91,0.06)', border: '1px solid rgba(255,107,91,0.25)',
            borderRadius: '6px',
        }}>
            <p style={{ color: 'var(--rust)', fontSize: '13px', fontWeight: 600, margin: '0 0 4px' }}>
                We couldn&apos;t read this file
            </p>
            <p style={{ color: 'var(--rust)', fontSize: '13px', margin: '0 0 10px' }}>
                {message || 'The file may be corrupted, unsupported, or incorrectly formatted.'}
            </p>
            <div style={{ display: 'flex', gap: '10px', alignItems: 'center', flexWrap: 'wrap' }}>
                {onRetry && (
                    <button
                        onClick={onRetry}
                        style={{
                            fontSize: '12px', fontWeight: 600, color: 'var(--gold)',
                            background: 'none', border: '1px solid var(--gold)',
                            borderRadius: '4px', padding: '3px 10px', cursor: 'pointer',
                        }}
                    >
                        Try Again
                    </button>
                )}
                {supportedFormats && (
                    <span style={{ fontSize: '12px', color: 'var(--mid)' }}>
                        Supported: {supportedFormats}
                    </span>
                )}
                {maxSize && (
                    <span style={{ fontSize: '12px', color: 'var(--mid)' }}>
                        Max size: {maxSize}
                    </span>
                )}
            </div>
        </div>
    );
}
