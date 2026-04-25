'use client'
import { useState, useEffect } from 'react'

export default function CookieBanner() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem('bk_cookie_consent')
    if (!consent) {
      setShow(true)
    } else if (consent === 'granted') {
      updateConsent('granted')
    }
  }, [])

  const updateConsent = (value) => {
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('consent', 'update', {
        analytics_storage: value,
        ad_storage: value,
        ad_user_data: value,
        ad_personalization: value,
      })
    }
  }

  const handle = (value) => {
    localStorage.setItem('bk_cookie_consent', value)
    updateConsent(value)
    setShow(false)
  }

  if (!show) return null

  return (
    <div style={{
      position: 'fixed',
      bottom: '24px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 9999,
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