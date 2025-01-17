import './globals.css';
import { Inter } from 'next/font/google';
import { Providers } from './providers';
import { BottomNav } from '../components/bottom-nav';
import { Metadata } from 'next';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Travel Course Builder',
  description: 'Create and share personalized travel itineraries',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          <main className='min-h-screen'>{children}</main>
          <BottomNav />
        </Providers>
      </body>
    </html>
  );
}
