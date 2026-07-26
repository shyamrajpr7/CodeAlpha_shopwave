import type { Metadata } from 'next';
import './globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

export const metadata: Metadata = {
  title: 'ShopWave — Premium Tech & Peripherals',
  description: 'Curated tech peripherals for creators, coders, and power users. Shop the best in audio, peripherals, video, and more.',
  keywords: ['tech', 'peripherals', 'electronics', 'headphones', 'keyboard', 'webcam', 'shop'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen flex flex-col">
        <Toaster
          position="bottom-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: '#1a1a2e',
              color: '#fff',
              borderRadius: '12px',
              padding: '12px 16px',
              fontSize: '0.9rem',
            },
          }}
        />
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
