import { BrevoClient } from '@getbrevo/brevo';

const client = new BrevoClient({ apiKey: process.env.BREVO_API_KEY });

export async function POST(req) {
    try {
        const { email, name, results } = await req.json();

        const failedChecks = results.checks.filter(c => c.status === 'fail');
        const issueCount = results.total - results.passCount;

        await client.transactionalEmails.sendTransacEmail({
            to: [{ email }],
            sender: { email: 'hello@bookkraftai.com', name: 'BookKraft' },
            subject: `Your EPUB has ${issueCount} issue${issueCount !== 1 ? 's' : ''} (fix inside)`,
            textContent: `Hi ${name || 'there'},

Your EPUB failed ${issueCount} out of ${results.total} KDP checks:

${failedChecks.map(c => `- ${c.name}: ${c.detail}`).join('\n')}

The good news? BookKraft Pro fixes all of these automatically.

Start Free Trial: https://bookkraftai.com/signup?plan=pro

Or read the guide: https://bookkraftai.com/blog/why-kdp-rejects-epub`,
        });

        return Response.json({ ok: true });

    } catch (err) {
        console.error('Brevo error:', err);
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}