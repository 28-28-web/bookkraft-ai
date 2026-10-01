import { NextResponse } from 'next/server';
import { logEvent } from '@/lib/events';
import { isValidEmail } from '@/lib/email';

export async function POST(request) {
    try {
        const body = await request.json();
        const email = typeof body.email === 'string' ? body.email.trim() : '';
        if (!isValidEmail(email)) {
            return NextResponse.json({ success: false, message: 'Please enter a valid email address, like name@example.com.' }, { status: 400 });
        }
        // Honeypot from ChecklistOptin: people never see the field, bots fill it.
        // Answer like a success so the bot learns nothing; add no contact.
        if (typeof body.company === 'string' && body.company.trim()) {
            return NextResponse.json({ success: true, isNew: false, message: "You're already subscribed. Here's your checklist:", checklistUrl: '/kdp-preflight-checklist.pdf' });
        }
        // Optional form id (e.g. "checklist-kdp-formatting-guide"), stored in
        // Brevo SOURCE_TOOL. Last touch: a later form overwrites it.
        const source = typeof body.source === 'string' && /^[a-z0-9-]{1,64}$/.test(body.source) ? body.source : null;

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
                ...(source ? { attributes: { SOURCE_TOOL: source } } : {}),
            }),
        });

        if (res.status === 201) {
            // New subscription only — 400 (duplicate) must not fire, or the
            // count inflates on repeat submits from the same person.
            logEvent({ eventName: 'lead_captured', eventData: { source: source || 'newsletter' } }).catch(() => {});
            return NextResponse.json({ success: true, isNew: true, message: 'Checklist sent to your inbox!' });
        }
        if (res.status === 204 || res.status === 400) {
            // 204 = existing contact updated (updateEnabled), 400 = likely
            // duplicate. Already on the list either way, no lead_captured event.
            // Brevo automation only fires on new list additions, so hand over
            // the checklist directly instead of promising an email.
            return NextResponse.json({
                success: true,
                isNew: false,
                message: "You're already subscribed. Here's your checklist:",
                checklistUrl: '/kdp-preflight-checklist.pdf',
            });
        }

        const errBody = await res.text();
        console.error('Brevo API error:', res.status, errBody);
        return NextResponse.json({ success: false, message: 'Something went wrong. Try again.' }, { status: 500 });
    } catch (err) {
        console.error('Newsletter subscribe error:', err);
        return NextResponse.json({ success: false, message: 'Something went wrong. Try again.' }, { status: 500 });
    }
}
