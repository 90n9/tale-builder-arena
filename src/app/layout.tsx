import { Suspense } from 'react';
import type { Metadata, Viewport } from 'next';
import { Noto_Sans_Thai, Prompt } from 'next/font/google';
import './globals.css';
import { GoogleAnalytics } from '@/components/analytics/google-analytics';
import { Providers } from './providers';

const headingFont = Prompt({
  weight: ['400', '600'],
  subsets: ['latin', 'latin-ext', 'thai', 'vietnamese'],
  display: 'swap',
  variable: '--font-heading',
});

const notoSansThai = Noto_Sans_Thai({
  weight: ['400', '500', '600', '700'],
  subsets: ['latin', 'latin-ext', 'thai'],
  display: 'swap',
  variable: '--font-body',
});

export const metadata: Metadata = {
  title: 'TaleBuilder Arena',
  description: 'AI-driven text RPG with branching choices and rich achievements.',
  applicationName: 'TaleBuilder Arena',
  manifest: '/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
    shortcut: '/favicon.ico',
  },
};

export const viewport: Viewport = {
  themeColor: '#0e131b',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="th" className={`${headingFont.variable} ${notoSansThai.variable}`}>
      <body className="bg-background text-foreground">
        <Providers>{children}</Providers>
        <Suspense fallback={null}>
          <GoogleAnalytics />
        </Suspense>
      </body>
    </html>
  );
}
