'use client';

export default function GlobalError({ error, reset }) {
    return (
        <html lang="en">
            <body style={{ fontFamily: 'sans-serif', padding: '2rem', maxWidth: '600px', margin: '0 auto' }}>
                <h1 style={{ color: '#B45309', marginBottom: '1rem' }}>Something went wrong</h1>
                <pre style={{
                    background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: '6px',
                    padding: '1rem', fontSize: '13px', overflowX: 'auto', marginBottom: '1rem',
                    whiteSpace: 'pre-wrap',
                }}>
                    {error?.message || 'Unknown error'}
                    {error?.digest ? `\nDigest: ${error.digest}` : ''}
                </pre>
                <button
                    onClick={reset}
                    style={{
                        background: '#B45309', color: '#fff', border: 'none',
                        padding: '8px 20px', borderRadius: '6px', cursor: 'pointer', fontSize: '14px',
                    }}
                >
                    Try again
                </button>
            </body>
        </html>
    );
}
