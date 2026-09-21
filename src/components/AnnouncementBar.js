'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export default function AnnouncementBar() {
    const pathname = usePathname();
    const [show, setShow] = useState(false);
    const barRef = useRef(null);

    useEffect(() => {
        if (pathname !== '/') return;
        let dismissed = false;
        try { dismissed = localStorage.getItem('bk_promo_bar_dismissed') === 'true'; } catch {}
        if (dismissed) return;
        setShow(true);
        document.body.classList.add('has-promo-bar');
        return () => document.body.classList.remove('has-promo-bar');
    }, [pathname]);

    // Keep the navbar's top offset equal to the bar's real height, even when
    // the message wraps to multiple lines on narrow screens.
    useEffect(() => {
        if (!show) return;
        const setHeight = () => {
            const h = barRef.current?.offsetHeight;
            if (h) document.documentElement.style.setProperty('--promo-bar-h', `${h}px`);
        };
        setHeight();
        window.addEventListener('resize', setHeight);
        return () => {
            window.removeEventListener('resize', setHeight);
            document.documentElement.style.removeProperty('--promo-bar-h');
        };
    }, [show]);

    function dismiss() {
        setShow(false);
        document.body.classList.remove('has-promo-bar');
        document.documentElement.style.removeProperty('--promo-bar-h');
        try { localStorage.setItem('bk_promo_bar_dismissed', 'true'); } catch {}
    }

    if (!show || pathname !== '/') return null;

    return (
        <div ref={barRef} className="promo-bar" role="region" aria-label="Special offer">
            <p className="promo-bar-text">
                📖 Buy <strong>One Page, One Fix</strong> on Amazon → Get BookKraft AI Starter <strong>FREE ($19 value)</strong>.{' '}
                <Link href="/pricing" className="promo-bar-cta">Claim offer →</Link>
            </p>
            <button onClick={dismiss} className="promo-bar-close" aria-label="Dismiss offer">✕</button>
        </div>
    );
}
