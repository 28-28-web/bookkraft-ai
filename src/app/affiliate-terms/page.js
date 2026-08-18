import Link from 'next/link';
import Footer from '@/components/Footer';

export const metadata = {
    title: 'Affiliate Program Terms — BookKraft AI',
    description: 'Affiliate Program Terms of Service for BookKraft AI. Commission rates, attribution rules, payout schedule, and prohibited promotion methods.',
    alternates: { canonical: 'https://bookkraftai.com/affiliate-terms' },
};

export default function AffiliateTermsPage() {
    return (
        <>
            <div className="legal-wrap">
                <h1>BookKraft AI Affiliate Program — Terms of Service</h1>
                <p className="legal-date">Last updated: August 2026</p>

                <h2>1. Eligibility</h2>
                <p>You must be at least 18 years old and have a valid PayPal or Wise account to receive payouts. BookKraft AI reserves the right to approve or reject any affiliate application at its discretion.</p>

                <h2>2. Commission</h2>
                <p>Affiliates earn 25% commission on the net sale amount (excluding Paddle&apos;s transaction fee and applicable tax) for each successful, completed purchase of Starter, Pro, or Lifetime access referred through their unique tracking link. Commissions do not apply to credit top-up purchases by existing customers.</p>

                <h2>3. Attribution</h2>
                <p>Commissions are attributed based on Tolt&apos;s tracking system. A referral is counted when a new customer completes a purchase after clicking your unique link. Attribution windows and rules are governed by Tolt&apos;s standard tracking policy.</p>

                <h2>4. Self-Referrals Prohibited</h2>
                <p>You may not use your own affiliate link to purchase BookKraft AI products for yourself, family members, or accounts you control. Self-referral commissions will be voided, and repeat violations may result in removal from the program.</p>

                <h2>5. Refunds and Chargebacks</h2>
                <p>If a referred customer requests a refund within our 7-day money-back guarantee, the associated commission will be reversed or deducted from your next payout.</p>

                <h2>6. Prohibited Promotion Methods</h2>
                <p>Affiliates may not:</p>
                <ul>
                    <li>Bid on &quot;BookKraft AI&quot; or close brand-variant terms in paid search ads</li>
                    <li>Use spam, unsolicited email, or misleading claims to promote BookKraft AI</li>
                    <li>Impersonate BookKraft AI or claim official affiliation beyond &quot;authorized affiliate&quot;</li>
                    <li>Post affiliate links in a way that violates the terms of the platform being used (e.g. undisclosed self-promotion on Reddit, Product Hunt, etc.)</li>
                </ul>

                <h2>7. Payouts</h2>
                <p>Payouts are made on a NET-15 basis via PayPal or Wise once your balance exceeds the minimum payout threshold. BookKraft AI is not responsible for delays caused by payment provider issues.</p>

                <h2>8. Program Changes</h2>
                <p>BookKraft AI may modify commission rates, terms, or discontinue the affiliate program at any time, with notice provided to active affiliates. Commissions earned prior to any change will be honored.</p>

                <h2>9. Termination</h2>
                <p>BookKraft AI reserves the right to terminate any affiliate&apos;s participation for violation of these terms, fraudulent activity, or promotion methods that harm the brand&apos;s reputation.</p>

                <h2>Contact</h2>
                <p>Questions? Email <strong>hello@bookkraftai.com</strong></p>

                <Link href="/" className="btn btn-outline btn-sm" style={{ marginTop: 'var(--space-6)', textDecoration: 'none' }}>&#8592; Back to Home</Link>
            </div>
            <Footer />
        </>
    );
}
