import { BrevoClient } from '@getbrevo/brevo';

const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

export async function POST(req) {
    try {
        const { email, name, checks, passCount, failCount } = await req.json();

        const issueChecks = checks.filter(c => c.status === 'fail' || c.status === 'warn');
        const issueCount = checks.length - passCount;

        await client.transactionalEmails.sendTransacEmail({
            to: [{ email }],
            sender: { email: 'hello@bookkraftai.com', name: 'BookKraft' },
            subject: `Your book metadata has ${issueCount} issue${issueCount !== 1 ? 's' : ''} (fix inside)`,
            htmlContent: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">
  <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Hi ${name || 'there'},</h2>
  <p style="color: #444; margin-bottom: 20px;">
    Your book metadata failed <strong>${issueCount} out of ${checks.length}</strong> checks:
  </p>

  <ul style="padding-left: 20px; margin-bottom: 24px; color: #444;">
    ${issueChecks.map(c => `
      <li style="margin-bottom: 8px;">
        <strong>${c.name}</strong>: ${c.detail}
        ${c.fixHint ? `<br/><span style="font-size: 13px; color: #b8860b;">→ ${c.fixHint}</span>` : ''}
      </li>
    `).join('')}
  </ul>

  <p style="color: #444; margin-bottom: 20px;">
    Strong metadata means better category placement, better search visibility, and more readers finding your book.
  </p>

  <a href="https://bookkraftai.com/signup?plan=pro"
     style="display: inline-block; background: #C9933A; color: #fff; padding: 12px 24px;
            border-radius: 8px; text-decoration: none; font-weight: 700; margin-bottom: 16px;">
    Fix All With BookKraft Pro →
  </a>

  <p style="margin-top: 16px;">
    <a href="https://bookkraftai.com/tools/toc-generator"
       style="color: #b8860b; text-decoration: none; font-size: 14px;">
      Next step: Generate your Table of Contents →
    </a>
  </p>

  <p style="margin-top: 8px;">
    <a href="https://bookkraftai.com/blog/book-metadata-guide"
       style="color: #b8860b; text-decoration: none; font-size: 14px;">
      Why does metadata matter for KDP? Read the guide →
    </a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
  <p style="font-size: 12px; color: #9ca3af;">
    You received this because you used the free Metadata Builder at bookkraftai.com.
  </p>
</div>`,
        });

        return Response.json({ ok: true });

    } catch (err) {
        console.error('Brevo error:', err);
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}