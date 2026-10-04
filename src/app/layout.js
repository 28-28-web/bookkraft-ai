import './globals.css';
import Script from 'next/script';
import localFont from 'next/font/local';
import Navbar from '../components/Navbar';
import { AuthProvider } from '../components/AuthProvider';
import { ProjectProvider } from '../lib/ProjectContext';
import { ToastProvider } from '../components/Toast';
import CookieBanner from '../components/CookieBanner';
import ToltScript from '../components/ToltScript';
import DynamicComponents from '../components/DynamicComponents';
import { TOOLS } from '../lib/tools';
import { FREE_TOOLS } from '../lib/constants';

const TOOL_COUNT_DESC = `${TOOLS.length} eBook formatting tools. EPUB validation, Kindle formatting, metadata builder, style auditor, and more. ${FREE_TOOLS.length} free tools — no signup needed.`;

// Self-hosted (next/font/local) — woff2 in ./fonts, OFL licensed. Same weights,
// styles, CSS variable names, and display values as the previous next/font/google
// setup, so the rendered output is unchanged.
const playfair = localFont({
  src: [
    { path: './fonts/playfair-display-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/playfair-display-latin-700-normal.woff2', weight: '700', style: 'normal' },
    { path: './fonts/playfair-display-latin-400-italic.woff2', weight: '400', style: 'italic' },
  ],
  variable: '--font-playfair',
  display: 'swap',
  // Content page H1–H4 LCP font. No preload — Fraunces owns the single
  // preload slot on homepage; content pages benefit from swap over optional.
  preload: false,
  adjustFontFallback: 'Times New Roman',
});

const dmSans = localFont({
  src: [
    { path: './fonts/dm-sans-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/dm-sans-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/dm-sans-latin-700-normal.woff2', weight: '700', style: 'normal' },
  ],
  variable: '--font-dm-sans',
  display: 'swap',
  // Body text renders above the fold (hero paragraph, nav links), so preload
  // it to remove the CSS→font chain delay on FCP. Single instance keeps all
  // weights under one family (--font-dm-sans); splitting would break 500/700
  // fallback into faux-bold.
  preload: true,
});

const jetbrainsMono = localFont({
  src: [
    { path: './fonts/jetbrains-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/jetbrains-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
  ],
  variable: '--font-jetbrains',
  display: 'swap',
  preload: false,
});


const ibmPlexMono = localFont({
  src: [
    { path: './fonts/ibm-plex-mono-latin-400-normal.woff2', weight: '400', style: 'normal' },
    { path: './fonts/ibm-plex-mono-latin-500-normal.woff2', weight: '500', style: 'normal' },
    { path: './fonts/ibm-plex-mono-latin-600-normal.woff2', weight: '600', style: 'normal' },
  ],
  variable: '--font-ibm-mono',
  display: 'optional',
  preload: false,
});

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export const metadata = {
  metadataBase: new URL('https://bookkraftai.com'),
  title: 'BookKraft AI — EPUB & Kindle Tools for Indie Authors',
  description: TOOL_COUNT_DESC,
  keywords: 'ebook formatting, epub validator, kindle format, metadata builder, book publishing tools, kdp tools',

  openGraph: {
    title: 'BookKraft AI — EPUB & Kindle Tools for Indie Authors',
    description: TOOL_COUNT_DESC,
    siteName: 'BookKraft AI',
    type: 'website',
    url: 'https://bookkraftai.com',
    images: [{ url: 'https://bookkraftai.com/og-image.jpg', width: 1200, height: 630, alt: 'BookKraft AI – eBook Formatting Toolkit' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'BookKraft AI — EPUB & Kindle Tools for Indie Authors',
    description: TOOL_COUNT_DESC,
  },
  verification: {
    yandex: '654e985d96763e18',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${playfair.variable} ${dmSans.variable} ${jetbrainsMono.variable} ${ibmPlexMono.variable}`}>
      <head>

        {/* Fraunces is preloaded per page (/, /faq, /b/[n]), not here — most pages never use it. */}

        {/* ── GA4 Consent Mode v2 ── */}
        <script dangerouslySetInnerHTML={{ __html: `
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          // Default for all regions. No ads on this site, so ad_* stay denied
          // everywhere and are never updated on consent.
          gtag('consent', 'default', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
          });
          // EEA + UK + Switzerland: analytics denied until the user opts in.
          gtag('consent', 'default', {
            analytics_storage: 'denied',
            wait_for_update: 500,
            region: ['AT','BE','BG','HR','CY','CZ','DK','EE','FI','FR','DE','GR','HU','IE','IT','LV','LT','LU','MT','NL','PL','PT','RO','SK','SI','ES','SE','IS','LI','NO','GB','CH'],
          });
        `}} />
        {/* ── GA4 library + config (afterInteractive — loads after LCP paint) ── */}
        <Script id="ga4-loader" strategy="afterInteractive" src="https://www.googletagmanager.com/gtag/js?id=G-H0G0L2F9ZF" />
        <Script id="ga4-init" strategy="afterInteractive">{`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-H0G0L2F9ZF');
        `}</Script>

        {/* Tolt affiliate tracking: loaded only where needed, see components/ToltScript */}

        {/* Microsoft Clarity moved to CookieBanner — loads only after consent granted */}

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
                    "url": "https://bookkraftai.com/logo.png",
                    "width": 640,
                    "height": 640
                  },
                  "sameAs": [
                    "https://x.com/BookkraftTools",
                    "https://www.facebook.com/bookkraftai",
                    "https://www.linkedin.com/in/book-kraft-ai-b49a34401"
                  ],
                  "description": "Browser-based EPUB formatting, validation, and metadata tools for self-published authors. 5 free tools available without signup."
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
              <DynamicComponents />
              <CookieBanner />
              <ToltScript />
            </ToastProvider>
          </ProjectProvider>
        </AuthProvider>

      </body>
    </html>
  );
}