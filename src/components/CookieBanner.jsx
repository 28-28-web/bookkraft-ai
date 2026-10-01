'use client'
import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'

// Routes where the banner sits in the page flow instead of floating, so it
// can never cover content (the post-payment survey on /welcome).
const INLINE_ROUTES = new Set(['/welcome'])

const CLARITY_ID = 'x0dccfshyj'
function loadClarity() {
  if (typeof window === 'undefined' || window.clarity) return
  ;(function(c,l,a,r,i,t,y){
    c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
    t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
    y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
  })(window, document, "clarity", "script", CLARITY_ID)
}

export default function CookieBanner() {
  const [show, setShow] = useState(false)
  const inline = INLINE_ROUTES.has(usePathname())
  useEffect(() => {
    const consent = localStorage.getItem('bk_cookie_consent')
    if (!consent) {
      setShow(true)
    } else if (consent === 'granted') {
      updateConsent('granted')
      loadClarity()
      if (window.clarity) window.clarity('consent')
    } else {
      // returning 'denied' user — re-assert denial (analytics default is 'granted' outside EEA)
      updateConsent('denied')
    }
  }, [])

  useEffect(() => {
    if (show && !inline) {
      document.body.classList.add('cookie-consent-pending')
    } else {
      document.body.classList.remove('cookie-consent-pending')
    }
    return () => document.body.classList.remove('cookie-consent-pending')
  }, [show, inline])
  const updateConsent = (value) => {
    // No ads on this site, so only analytics_storage is ever toggled.
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: value,
      })
    }
  }
  const handle = (value) => {
    localStorage.setItem('bk_cookie_consent', value)
    updateConsent(value)
    if (value === 'granted') {
      loadClarity()
      if (window.clarity) window.clarity('consent')
    }
    setShow(false)
  }
  if (!show) return null
  return (
    <div style={{
      ...(inline
        ? { position: 'relative', margin: '24px auto 104px' } // bottom room so the chat button can't sit on Accept/Decline
        : { position: 'fixed', bottom: '24px', left: '50%', transform: 'translateX(-50%)', zIndex: 2147483647 }),
      background: '#1c1c1c',
      color: '#fff',
      padding: '14px 20px',
      borderRadius: '12px',
      display: 'flex',
      gap: '12px',
      alignItems: 'center',
      boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
      maxWidth: '90vw',
      flexWrap: 'wrap',
      border: '0.5px solid #333',
    }}>
      <span style={{
        fontSize: '13px',
        flex: '1',
        minWidth: '200px',
        lineHeight: '1.6',
      }}>
        BookKraft AI uses cookies to improve your experience and measure site usage.{' '}
        <a href="/privacy" style={{ color: '#B8962E', textDecoration: 'underline' }}>
          Learn more
        </a>
      </span>
      <button
        onClick={() => handle('granted')}
        style={{
          background: '#B8962E',
          color: '#fff',
          border: 'none',
          padding: '8px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          fontWeight: '500',
          whiteSpace: 'nowrap',
        }}
      >
        Accept
      </button>
      <button
        onClick={() => handle('denied')}
        style={{
          background: 'transparent',
          color: '#888',
          border: '0.5px solid #444',
          padding: '8px 20px',
          borderRadius: '6px',
          cursor: 'pointer',
          fontSize: '13px',
          whiteSpace: 'nowrap',
        }}
      >
        Decline
      </button>
    </div>
  )
}