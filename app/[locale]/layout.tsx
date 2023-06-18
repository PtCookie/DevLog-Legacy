import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/components/context/ThemeProvider';
import config from '@/lib/config';
import { sansSerif } from '@/lib/fonts';
import { i18n } from '@/lib/i18n';

import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@csstools/normalize.css';
import '@/assets/globals.css';

type Props = {
  children: ReactNode;
  params: {
    locale: SupportedLocale;
  };
};

export default function AppLayout({ children, params: { locale } }: Props) {
  return (
    <html lang={locale}>
      <body style={sansSerif.style}>
        <NextIntlClientProvider locale={locale}>
          <ThemeProvider>{children}</ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}

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

export async function generateStaticParams() {
  return i18n.locales.map((locale) => ({ locale }));
}
