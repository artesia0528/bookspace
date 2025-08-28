import { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Header from '@/components/Header';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'BookSpace',
  description: 'A modern web application for managing and discovering books',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute={"class"} defaultTheme="system" enableSystem >
          <Header />
          <main>{children}</main>
        </ThemeProvider>
      </body>
    </html>
  );
}
