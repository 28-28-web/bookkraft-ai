import Link from 'next/link';
import Sidebar from '@/components/Sidebar';

export const metadata = {
  title: 'Tool Not Found | BookKraft AI',
};

export default function NotFound() {
  return (
    <div className="app-layout">
      <Sidebar />
      <main className="main-content">
        <div className="empty-state">
          <div className="empty-state-icon">🔍</div>
          <h3>Tool not found</h3>
          <p>This tool doesn&apos;t exist.</p>
          <Link href="/dashboard" className="btn btn-primary" style={{ textDecoration: 'none', marginTop: '1rem', display: 'inline-flex' }}>
            Back to Dashboard
          </Link>
        </div>
      </main>
    </div>
  );
}
