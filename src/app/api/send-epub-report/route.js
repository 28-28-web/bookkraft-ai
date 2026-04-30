import { BrevoClient } from '@getbrevo/brevo';

const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

export async function POST(req) {
    try {
        const { email, name, results } = await req.json();

        const issueChecks = results.checks.filter(c => c.status === 'fail' || c.status === 'warn');
        const issueCount = results.total - results.passCount;

        await client.transactionalEmails.sendTransacEmail({
            to: [{ email }],
            sender: { email: 'hello@bookkraftai.com', name: 'BookKraft' },
            subject: `Your EPUB has ${issueCount} issue${issueCount !== 1 ? 's' : ''} (fix inside)`,
            htmlContent: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Hi ${name || 'there'},</h2>
  <p style="color: #444; margin-bottom: 20px;">
    Your EPUB failed <strong>${issueCount} out of ${results.total}</strong> KDP checks:
  </p>

  <ul style="padding-left: 20px; margin-bottom: 24px; color: #444;">
    ${issueChecks.map(c => `
      <li style="margin-bottom: 8px;">
        <strong>${c.name}</strong>: ${c.detail}
      </li>
    `).join('')}
  </ul>

  <p style="color: #444; margin-bottom: 20px;">
    The good news? BookKraft Pro fixes all of these automatically.
  </p>

  <a href="https://bookkraftai.com/signup?plan=pro"
     style="display: inline-block; background: #C9933A; color: #fff; padding: 12px 24px;
            border-radius: 8px; text-decoration: none; font-weight: 700; margin-bottom: 16px;">
    Start Free Trial — Fix in 2 Minutes
  </a>

  <p style="margin-top: 16px;">
    <a href="https://bookkraftai.com/blog/why-kdp-rejects-epub"
       style="color: #b8860b; text-decoration: none; font-size: 14px;">
      Why is KDP rejecting my EPUB? Read the guide →
    </a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
  <p style="font-size: 12px; color: #9ca3af;">
    You received this because you used the free EPUB Validator at bookkraftai.com.
  </p>
</div>`,
        });

        return Response.json({ ok: true });

    } catch (err) {
        console.error('Brevo error:', err);
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}