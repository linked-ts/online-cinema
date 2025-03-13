// src/app/layout.tsx
import { Inter } from 'next/font/google';
import './globals.css';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import Navbar from '@/components/Navbar';
import Footer from '@/components/layout/Footer';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Online Cinema',
  description: 'A Next.js app to browse movies and TV series',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-black text-white`}>
        {/* Fixed Navigation Bar */}
        <Navbar />
        {/* Main content with padding to account for fixed nav */}
        <main className="pt-16">{children}</main>
        <Footer />
      </body>
    </html>
  );
}