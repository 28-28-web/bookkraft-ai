import * as SibApiV3Sdk from '@getbrevo/brevo';

const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();
apiInstance.authentications['apiKey'].apiKey = process.env.BREVO_API_KEY;

export async function POST(req) {
    try {
        const { email, name, results } = await req.json();

        const failedChecks = results.checks.filter(c => c.status === 'fail');
        const issueCount = results.total - results.passCount;

        const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();
        sendSmtpEmail.to = [{ email }];
        sendSmtpEmail.sender = { email: 'hello@bookkraftai.com', name: 'BookKraft' };
        sendSmtpEmail.subject = `Your EPUB has ${issueCount} issue${issueCount !== 1 ? 's' : ''} (fix inside)`;
        sendSmtpEmail.textContent = `Hi ${name || 'there'},

Your EPUB failed ${issueCount} out of ${results.total} KDP checks:

${failedChecks.map(c => `- ${c.name}: ${c.detail}`).join('\n')}

The good news? BookKraft Pro fixes all of these automatically.

Start Free Trial: https://bookkraftai.com/signup?plan=pro

Or read the guide: https://bookkraftai.com/blog/why-kdp-rejects-epub`;

        await apiInstance.sendTransacEmail(sendSmtpEmail);

        return Response.json({ ok: true });

    } catch (err) {
        console.error('Brevo error:', err);
        return Response.json({ ok: false, error: err.message }, { status: 500 });
    }
}