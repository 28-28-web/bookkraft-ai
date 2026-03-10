import { NextResponse } from 'next/server';

export async function POST(request) {
    try {
        const { email } = await request.json();
        if (!email || !email.includes('@')) {
            return NextResponse.json({ success: false, message: 'Please enter a valid email address.' }, { status: 400 });
        }

        const apiKey = process.env.BREVO_API_KEY;
        const listId = parseInt(process.env.BREVO_LIST_ID || '0', 10);

        if (!apiKey || !listId) {
            console.warn('Brevo not configured — BREVO_API_KEY or BREVO_LIST_ID missing');
            // Still return success to not block the user
            return NextResponse.json({ success: true, message: 'Checklist sent to your inbox!' });
        }

        const res = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                listIds: [listId],
                updateEnabled: true,
            }),
        });

        if (res.status === 201) {
            return NextResponse.json({ success: true, message: 'Checklist sent to your inbox!' });
        }
        if (res.status === 400) {
            // Likely duplicate
            return NextResponse.json({ success: true, message: "You're already subscribed — resending the checklist!" });
        }

        const errBody = await res.text();
        console.error('Brevo API error:', res.status, errBody);
        return NextResponse.json({ success: false, message: 'Something went wrong. Try again.' }, { status: 500 });
    } catch (err) {
        console.error('Newsletter subscribe error:', err);
        return NextResponse.json({ success: false, message: 'Something went wrong. Try again.' }, { status: 500 });
    }
}
