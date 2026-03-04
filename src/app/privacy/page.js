import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Privacy Policy — BookKraft AI',
    description: 'BookKraft privacy policy — how we collect, use, and protect your information.',
};

export default function PrivacyPage() {
    return (
        <>
            <div className="legal-wrap">
                <h1>Privacy Policy</h1>
                <p className="legal-date">Last updated: February 2026</p>
                <p>BookKraft (&quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates bookkraftai.com. This policy explains how we collect, use, and protect your information.</p>
                <h2>What We Collect</h2>
                <ul>
                    <li>Email address and authentication credentials</li>
                    <li>Usage data (which tools you use, how many AI runs you make)</li>
                    <li>Content you input into our tools (stored temporarily to display your history)</li>
                    <li>Payment information (processed securely by our payment provider — we never store card details)</li>
                </ul>
                <h2>How We Use It</h2>
                <ul>
                    <li>To provide and improve the BookKraft service</li>
                    <li>To manage your subscription and billing</li>
                    <li>To enforce usage limits per your plan</li>
                    <li>To send important account and service emails</li>
                </ul>
                <h2>We Never Sell Your Data</h2>
                <p>We do not sell, trade, or rent your personal information to third parties. Ever.</p>
                <h2>Cookies</h2>
                <p>We use minimal cookies required for authentication (Supabase session) and payments. No advertising cookies are used.</p>
                <h2>Data Retention</h2>
                <p>Your output history is stored as long as your account is active. You can delete your history at any time. If you delete your account, all data is permanently removed within 30 days.</p>
                <h2>Contact</h2>
                <p>For any data requests or privacy questions, email us at <strong>privacy@bookkraftai.com</strong>.</p>
                <Link href="/" className="btn btn-outline btn-sm" style={{ marginTop: '1rem', textDecoration: 'none' }}>← Back to Home</Link>
            </div>
            <Footer />
        </>
    );
}
