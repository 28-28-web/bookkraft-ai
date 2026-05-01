import { BrevoClient } from '@getbrevo/brevo';

const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

export async function POST(req) {
    try {
        const { email, name, result } = await req.json();
        const { total, categories } = result;

        const label = total >= 85 ? 'Almost Publish-Ready' : total >= 65 ? 'Good Progress' : total >= 40 ? 'Needs Some Work' : 'Not Ready Yet';
        const color = total >= 85 ? '#2D6A4F' : total >= 65 ? '#52796F' : total >= 40 ? '#B5541A' : '#922B21';

        await client.transactionalEmails.sendTransacEmail({
            to: [{ email }],
            sender: { email: 'hello@bookkraftai.com', name: 'BookKraft' },
            subject: `Your publishing score: ${total}/100 — ${label}`,
            htmlContent: `
<div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px; color: #1a1a1a;">

  <h2 style="font-size: 20px; font-weight: 700; margin-bottom: 8px;">Hi ${name || 'there'},</h2>
  <p style="color: #444; margin-bottom: 24px;">Here's your publishing readiness report from BookKraft.</p>

  <div style="background: ${color}; color: #fff; border-radius: 12px; padding: 32px; text-align: center; margin-bottom: 24px;">
    <p style="font-size: 11px; letter-spacing: 2px; text-transform: uppercase; opacity: 0.8; margin-bottom: 8px;">Publishing Readiness Score</p>
    <div style="font-size: 64px; font-weight: 900; line-height: 1;">${total}</div>
    <div style="opacity: 0.7; margin-top: 4px;">out of 100</div>
    <div style="margin-top: 8px; font-size: 18px; font-weight: 600;">${label}</div>
  </div>

  <h3 style="font-size: 16px; font-weight: 700; margin-bottom: 12px;">Category Breakdown</h3>
  <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px;">
    ${categories.map(cat => `
    <tr style="border-bottom: 1px solid #f0f0f0;">
      <td style="padding: 10px 0; font-size: 14px; font-weight: 600; color: #1a1a1a;">${cat.name || cat.id}</td>
      <td style="padding: 10px 0; text-align: right; font-size: 14px; color: ${cat.score >= 70 ? '#2D6A4F' : cat.score >= 40 ? '#B5541A' : '#922B21'}; font-weight: 700;">${cat.score}/100</td>
    </tr>
    ${cat.feedback ? `<tr><td colspan="2" style="padding: 0 0 10px 0; font-size: 13px; color: #666;">${cat.feedback}</td></tr>` : ''}
    `).join('')}
  </table>

  <p style="color: #444; margin-bottom: 20px;">
    Fix every issue above and get your book to 100 — KDP-ready.
  </p>

  <a href="https://bookkraftai.com/signup?plan=pro"
     style="display: inline-block; background: #C9933A; color: #fff; padding: 12px 24px;
            border-radius: 8px; text-decoration: none; font-weight: 700; margin-bottom: 16px;">
    Fix All Issues — Start Free Trial
  </a>

  <p style="margin-top: 16px;">
    <a href="https://bookkraftai.com/tools/epub-validator"
       style="color: #2D6A4F; text-decoration: none; font-size: 14px;">
      Also validate your EPUB for KDP errors →
    </a>
  </p>

  <hr style="border: none; border-top: 1px solid #e5e7eb; margin: 24px 0;" />
  <p style="font-size: 12px; color: #9ca3af;">
    You received this because you used the free Publishing Score tool at bookkraftai.com.
  </p>
</div>`,
        });

        return Response.json({ ok: true });

    } catch (err) {
        console.error('Brevo error:', err);
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}