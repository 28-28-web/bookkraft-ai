import { REJECTED_BOOK } from '@/lib/bookDownloads';

export default function RejectedBookCard() {
    return (
        <div style={{
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
            gap: 'var(--space-4)', padding: 'var(--space-4)',
            marginBottom: 'var(--space-6)', background: 'var(--cream)',
            border: '1px solid var(--border)', borderRadius: 'var(--radius)',
            flexWrap: 'wrap',
        }}>
            <div style={{ flex: '1 1 280px' }}>
                <h2 style={{ fontSize: 'var(--text-base)', fontWeight: 700, margin: '0 0 4px' }}>
                    {REJECTED_BOOK.title}
                </h2>
                <p style={{ margin: 0, fontSize: 'var(--text-sm)', color: 'var(--mid)' }}>
                    Available on Amazon Kindle
                </p>
            </div>
            <div>
                <a
                    href="https://www.amazon.com/dp/B0HJ11BGQV"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-gold btn-sm"
                    style={{ textDecoration: 'none', whiteSpace: 'nowrap' }}
                >
                    Buy on Amazon →
                </a>
            </div>
        </div>
    );
}
