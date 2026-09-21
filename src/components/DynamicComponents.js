'use client';

import dynamic from 'next/dynamic';

const ChatAssistant = dynamic(() => import('./ChatAssistant'), { ssr: false });
const NewsletterPopup = dynamic(() => import('./NewsletterPopup'), { ssr: false });

export default function DynamicComponents() {
    return (
        <>
            <ChatAssistant />
            <NewsletterPopup />
        </>
    );
}
