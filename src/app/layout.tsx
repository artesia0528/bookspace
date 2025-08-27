'use client';

import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { useStore } from '@/store/useStore';
import { useEffect } from 'react';

const inter = Inter({ subsets: ['latin'] });

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isDarkMode } = useStore();
  
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);
  
  return (
    <html lang="en">
      <body className={`${inter.className} ${isDarkMode ? 'dark' : ''}`}>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
          <Header />
          <main>{children}</main>
        </div>
      </body>
    </html>
  );
}
