import { ThemeProvider } from '@/components/context/ThemeProvider';
import config from '@/lib/config';
import { sansSerif } from '@/lib/fonts';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@csstools/normalize.css';
import '@/assets/globals.css';

type Props = {
  children: ReactNode;
};

export const metadata: Metadata = {
  title: {
    default: config.site_title,
    template: `%s | ${config.site_title}`,
  },
  icons: {
    icon: '/favicon.ico',
    apple: '/icon256.png',
  },
  themeColor: '#182d27',
  manifest: '/blog.webmanifest',
};

export default function AppLayout({ children }: Props) {
  // TODO Get html lang from locale
  return (
    <html lang="ko">
      <body style={sansSerif.style}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
