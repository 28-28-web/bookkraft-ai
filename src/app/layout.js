import './globals.css';
import Navbar from '@/components/Navbar';
import { AuthProvider } from '@/components/AuthProvider';
import { ToastProvider } from '@/components/Toast';

export const metadata = {
  title: 'BookKraft AI — Write Your Book With AI',
  description: '12 AI-powered tools built for authors. From blank page to back cover — write your non-fiction book faster than ever before.',
  keywords: 'book writing, AI tools, non-fiction, author tools, book creator',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <ToastProvider>
            <Navbar />
            {children}
          </ToastProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
