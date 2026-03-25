import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Privacy Policy — BookKraft AI',
    description: 'BookKraft AI privacy policy — how we collect, use, and protect your information.',
 alternates: { canonical: 'https://bookkraftai.com/privacy'}

};

export default function PrivacyPage() {
    return (
        <>
            <div className="legal-wrap">
                <h1>Privacy Policy</h1>
                <p className="legal-date">Last updated: March 2026</p>

                <h2>1. Introduction</h2>
                <p>BookKraft AI (&quot;BookKraft&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) operates the website bookkraftai.com. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our eBook formatting tools. By using BookKraft AI, you consent to the data practices described in this policy.</p>

                <h2>2. Information We Collect</h2>
                <h3>2.1 Account Information</h3>
                <ul>
                    <li>Email address (required for account creation)</li>
                    <li>Password (hashed, never stored in plain text)</li>
                    <li>Authentication tokens (for session management)</li>
                </ul>
                <h3>2.2 Usage Data</h3>
                <ul>
                    <li>Which tools you use and how frequently</li>
                    <li>Credit purchase and usage history</li>
                    <li>Tool run history (inputs and outputs, stored for your reference)</li>
                    <li>Word counts processed per tool run</li>
                </ul>
                <h3>2.3 Content You Provide</h3>
                <ul>
                    <li>Manuscript text you paste or upload into our tools</li>
                    <li>.docx files uploaded for processing (stored temporarily in Cloudflare R2 with a 24-hour TTL)</li>
                    <li>Metadata you enter (book title, author name, keywords, descriptions)</li>
                </ul>
                <h3>2.4 Payment Information</h3>
                <ul>
                    <li>Payment processing is handled entirely by Paddle.com. We never see, store, or process your credit card number, CVV, or full billing details.</li>
                    <li>We receive from Paddle: your email, the product purchased, the amount paid, and the transaction ID.</li>
                </ul>
                <h3>2.5 Automatically Collected Information</h3>
                <ul>
                    <li>IP address (for rate limiting and abuse prevention)</li>
                    <li>Browser type and version</li>
                    <li>Pages visited and time spent</li>
                </ul>

                <h2>3. How We Use Your Information</h2>
                <ul>
                    <li>To provide and operate the BookKraft AI formatting tools</li>
                    <li>To process your purchases, manage your credit balance, and track usage</li>
                    <li>To send important account and service emails (password resets, purchase confirmations)</li>
                    <li>To enforce word limits and rate limits per your access level</li>
                    <li>To improve our tools and user experience based on aggregated, anonymised usage patterns</li>
                    <li>To send our newsletter (only if you opt in — you can unsubscribe at any time)</li>
                    <li>To prevent fraud, abuse, and unauthorised access</li>
                </ul>

                <h2>4. Third-Party Services</h2>
                <p>We use the following third-party services to operate BookKraft AI:</p>
                <ul>
                    <li><strong>Supabase</strong> — Authentication and database hosting. Your email and account data are stored in our self-hosted Supabase instance.</li>
                    <li><strong>Anthropic (Claude AI)</strong> — AI tool processing. When you run an AI tool, your text is sent to Anthropic&apos;s API for processing. Anthropic does not train on your data. See <a href="https://www.anthropic.com/privacy" target="_blank" rel="noopener noreferrer">Anthropic&apos;s Privacy Policy</a>.</li>
                    <li><strong>Paddle</strong> — Payment processing. See <a href="https://www.paddle.com/legal/privacy" target="_blank" rel="noopener noreferrer">Paddle&apos;s Privacy Policy</a>.</li>
                    <li><strong>Brevo</strong> — Newsletter and transactional email delivery.</li>
                    <li><strong>Cloudflare</strong> — CDN, DNS, and R2 object storage for temporary file storage.</li>
                </ul>

                <h2>5. Data Retention</h2>
                <ul>
                    <li><strong>Account data:</strong> Retained as long as your account is active.</li>
                    <li><strong>Tool run history:</strong> Stored until you delete it or delete your account.</li>
                    <li><strong>Uploaded .docx files:</strong> Automatically deleted from R2 storage after 24 hours.</li>
                    <li><strong>Generated EPUB files:</strong> Automatically deleted after 7 days.</li>
                    <li><strong>Account deletion:</strong> When you delete your account, all associated data (history, credits, purchases, projects) is permanently removed via database cascade. This process is irreversible.</li>
                </ul>

                <h2>6. Data Security</h2>
                <p>We implement industry-standard security measures including:</p>
                <ul>
                    <li>HTTPS encryption on all connections</li>
                    <li>Row Level Security (RLS) on all database tables — you can only access your own data</li>
                    <li>Paddle webhook signature verification on all payment events</li>
                    <li>Rate limiting on all API endpoints to prevent abuse</li>
                    <li>Hashed passwords (via Supabase Auth — bcrypt)</li>
                    <li>R2 bucket is private — file access via signed URLs only</li>
                </ul>

                <h2>7. Cookies</h2>
                <p>We use minimal cookies required for authentication (Supabase session cookie). We do not use advertising cookies, tracking pixels, or any third-party analytics cookies.</p>

                <h2>8. Your Rights</h2>
                <p>You have the right to:</p>
                <ul>
                    <li><strong>Access</strong> your personal data (via your Account page)</li>
                    <li><strong>Delete</strong> your account and all associated data (via Account &gt; Danger Zone)</li>
                    <li><strong>Export</strong> your tool run history (via the History page)</li>
                    <li><strong>Unsubscribe</strong> from marketing emails at any time (one-click unsubscribe in every email)</li>
                    <li><strong>Request</strong> information about what data we hold — email us at the address below</li>
                </ul>

                <h2>9. Children&apos;s Privacy</h2>
                <p>BookKraft AI is not directed to individuals under the age of 16. We do not knowingly collect personal information from children. If you believe a child has provided us with personal data, please contact us immediately.</p>

                <h2>10. Changes to This Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the new policy on this page and updating the &quot;Last updated&quot; date. Your continued use of BookKraft AI after any changes constitutes acceptance of the new policy.</p>

                <h2>11. Contact</h2>
                <p>For any privacy questions, data requests, or concerns:</p>
                <ul>
                    <li>Email: <strong>hello@bookkraftai.com</strong></li>
                    <li>Website: <a href="https://bookkraftai.com/contact">bookkraftai.com/contact</a></li>
                </ul>

                <Link href="/" className="btn btn-outline btn-sm" style={{ marginTop: 'var(--space-6)', textDecoration: 'none' }}>&#8592; Back to Home</Link>
            </div>
            <Footer />
        </>
    );
}
