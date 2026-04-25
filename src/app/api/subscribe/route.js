// src/app/api/subscribe/route.js
// Connects exit intent popup email capture to Brevo

export async function POST(request) {
    try {
        const { email } = await request.json();

        if (!email || !email.includes('@')) {
            return Response.json({ error: 'Invalid email' }, { status: 400 });
        }

        const response = await fetch('https://api.brevo.com/v3/contacts', {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json',
                'api-key': process.env.BREVO_API_KEY,
            },
            body: JSON.stringify({
                email: email,
                listIds: [2], // Your Brevo list ID — change if needed
                updateEnabled: true,
                attributes: {
                    SOURCE: 'exit_intent_popup',
                },
            }),
        });

        if (response.status === 201 || response.status === 204) {
            return Response.json({ success: true });
        }

        const data = await response.json();

        // Contact already exists — still treat as success
        if (data.code === 'duplicate_parameter') {
            return Response.json({ success: true });
        }

        console.error('Brevo error:', data);
        return Response.json({ error: 'Subscription failed' }, { status: 500 });

    } catch (err) {
        console.error('Subscribe error:', err);
        return Response.json({ error: 'Server error' }, { status: 500 });
    }
}