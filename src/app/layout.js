import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/components/AuthProvider';
import { ProjectProvider } from '@/lib/ProjectContext';
import { ToastProvider } from '@/components/Toast';
import ChatAssistant from '@/components/ChatAssistant';
import NewsletterPopup from '@/components/NewsletterPopup';

export const metadata = {
  title: 'BookKraft AI — Format Your eBook Like a Pro',
  description: '12 eBook formatting tools. EPUB validation, Kindle formatting, metadata builder, style auditor, and more. 2 free tools — no signup needed.',
  keywords: 'ebook formatting, epub validator, kindle format, metadata builder, book publishing tools, kdp tools',
  icons: {
    icon: '/favicon.png',
    apple: '/favicon.png',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ProjectProvider>
            <ToastProvider>
              <Navbar />
              {children}
              <ChatAssistant />
              <NewsletterPopup />
            </ToastProvider>
          </ProjectProvider>
        </AuthProvider>
      </body>
    </html>
  );
}

