// app/api/send-epub-report/route.js
export async function POST(req) {
    const { email, name, results } = await req.json();

    const failedChecks = results.checks.filter(c => c.status === 'fail');
    const issueCount = results.total - results.passCount;

    const subject = `Your EPUB has ${issueCount} issue${issueCount !== 1 ? 's' : ''} (fix inside)`;

    const body = `
Hi ${name || 'there'},

Your EPUB failed ${issueCount} out of ${results.total} KDP checks:

${failedChecks.map(c => `- ${c.name}: ${c.detail}`).join('\n')}

The good news? BookKraft Pro fixes all of these automatically.

👉 Start Free Trial — Fix in 2 Minutes
https://yourdomain.com/signup?plan=pro

Or read our guide on fixing these manually:
https://yourdomain.com/blog/why-kdp-rejects-epub
    `;

    // Send with your email provider (Resend, SendGrid, etc.)
    await resend.emails.send({ from: 'you@yourdomain.com', to: email, subject, text: body });

    return Response.json({ ok: true });
}