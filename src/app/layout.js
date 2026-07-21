import './globals.css';
import Script from 'next/script';
import { Playfair_Display, DM_Sans, JetBrains_Mono } from 'next/font/google';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../components/AuthProvider';
import { ProjectProvider } from '../lib/ProjectContext';
import { ToastProvider } from '../components/Toast';
import ChatAssistant from '../components/ChatAssistant';
import NewsletterPopup from '../components/NewsletterPopup';
import CookieBanner from '../components/CookieBanner';
import ExitIntentWrapper from '../components/ExitIntentWrapper';

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
  preload: true,
});

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
  preload: true,
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://bookkraftai.com'),
  title: 'BookKraft AI — EPUB & Kindle Tools for Indie Authors',
  description: '12 eBook formatting tools. EPUB validation, Kindle formatting, metadata builder, style auditor, and more. 2 free tools — no signup needed.',
  keywords: 'ebook formatting, epub validator, kindle format, metadata builder, book publishing tools, kdp tools',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
  openGraph: {
    title: 'BookKraft AI — EPUB & Kindle Tools for Indie Authors',
    description: '12 eBook formatting tools. EPUB validation, Kindle formatting, metadata builder, style auditor, and more. 2 free tools — no signup needed.',
    siteName: 'BookKraft AI',
    type: 'website',
    url: 'https://bookkraftai.com',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630, alt: 'BookKraft AI – eBook Formatting Toolkit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookKraft AI — EPUB & Kindle Tools for Indie Authors',
    description: '12 eBook formatting tools. EPUB validation, Kindle formatting, metadata builder, style auditor, and more. 2 free tools — no signup needed.',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable}`}>
      <head>

        {/* ── GA4 Consent Mode v2 — must fire BEFORE GA4 loads ── */}
        <Script id="consent-defaults" strategy="beforeInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('consent', 'default', {
              analytics_storage: 'granted',
              ad_storage: 'denied',
              ad_user_data: 'denied',
              ad_personalization: 'denied',
              wait_for_update: 500
            });
          `}
        </Script>

        {/* ── GA4 ── */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-761HQ6CWTZ"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-761HQ6CWTZ', {
              page_path: window.location.pathname
            });
          `}
        </Script>

        {/* ── Microsoft Clarity ── */}
        <Script id="microsoft-clarity" strategy="afterInteractive">
          {`
            (function(c,l,a,r,i,t,y){
                c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};
                t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i;
                y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);
            })(window, document, "clarity", "script", "x0dccfshyj");
          `}
        </Script>

      </head>

      <body>

        {/* ── Schema.org structured data ── */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@graph": [
                {
                  "@type": "Organization",
                  "@id": "https://bookkraftai.com/#organization",
                  "name": "BookKraft AI",
                  "url": "https://bookkraftai.com",
                  "logo": {
                    "@type": "ImageObject",
                    "url": "https://bookkraftai.com/favicon.png"
                  },
                  "sameAs": [
                    "https://x.com/BookkraftTools",
                    "https://www.facebook.com/bookkraftai",
                    "https://www.linkedin.com/in/book-kraft-ai-b49a34401"
                  ],
                  "description": "Professional eBook formatting tools for indie authors."
                },
                {
                  "@type": "WebSite",
                  "@id": "https://bookkraftai.com/#website",
                  "url": "https://bookkraftai.com",
                  "name": "BookKraft AI",
                  "publisher": { "@id": "https://bookkraftai.com/#organization" }
                }
              ]
            })
          }}
        />

        <AuthProvider>
          <ProjectProvider>
            <ToastProvider>
              <Navbar />
              {children}
              <ChatAssistant />
              <NewsletterPopup />
              <CookieBanner />
            </ToastProvider>
          </ProjectProvider>
        </AuthProvider>
        <ExitIntentWrapper />

      </body>
    </html>
  );
}