'use client';

import React, { useEffect } from 'react';
import dynamic from 'next/dynamic';
import { captureReferral } from '@/lib/analytics';

const ChatAssistant = dynamic(() => import('./ChatAssistant'), { ssr: false });
const NewsletterPopup = dynamic(() => import('./NewsletterPopup'), { ssr: false });

export default function DynamicComponents() {
    // Mounts once per full page load (layout persists across client-side nav),
    // so the landing URL's ?ref is captured before any navigation.
    useEffect(() => { captureReferral(); }, []);

    return (
        <>
            <ChatAssistant />
            <NewsletterPopup />
        </>
    );
}
