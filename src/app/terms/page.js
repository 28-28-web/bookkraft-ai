import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Terms of Service — BookKraft AI',
    description: 'BookKraft terms of service — read our terms before using the service.',
};

export default function TermsPage() {
    return (
        <>
            <div className="legal-wrap">
                <h1>Terms of Service</h1>
                <p className="legal-date">Last updated: February 2026</p>
                <p>By using BookKraft you agree to these terms. Please read them carefully.</p>
                <h2>1. Acceptance</h2>
                <p>By creating an account or using any BookKraft tools, you agree to be bound by these Terms. If you disagree, do not use the service.</p>
                <h2>2. Subscriptions &amp; Refunds</h2>
                <p>Monthly subscriptions are billed in advance. We offer a 7-day money-back guarantee on your first payment. After 7 days, no refunds are issued for the current billing period. You may cancel at any time; cancellation takes effect at the end of your billing cycle.</p>
                <h2>3. AI Output Disclaimer</h2>
                <p>BookKraft uses AI (Claude by Anthropic) to generate content. Outputs are starting points and writing aids — not guaranteed publishable, legally accurate, or factually verified content. You are responsible for reviewing, editing, and verifying any AI-generated content before using it.</p>
                <h2>4. Prohibited Uses</h2>
                <ul>
                    <li>Using outputs to deceive, defraud, or harm others</li>
                    <li>Generating content that violates Anthropic&apos;s usage policies</li>
                    <li>Attempting to reverse-engineer or scrape the platform</li>
                    <li>Sharing account access across multiple users</li>
                </ul>
                <h2>5. Intellectual Property</h2>
                <p>Content you input remains yours. AI-generated output is provided to you for your personal and commercial use as part of your subscription.</p>
                <h2>6. Governing Law</h2>
                <p>These Terms are governed by the laws of the jurisdiction in which BookKraft operates. Any disputes will be resolved through binding arbitration.</p>
                <h2>7. Contact</h2>
                <p>Questions? Email <strong>legal@bookkraftai.com</strong>.</p>
                <Link href="/" className="btn btn-outline btn-sm" style={{ marginTop: '1rem', textDecoration: 'none' }}>← Back to Home</Link>
            </div>
            <Footer />
        </>
    );
}
