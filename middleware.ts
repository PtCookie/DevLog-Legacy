import createIntlMiddleware from 'next-intl/middleware';
import { i18n } from '@/lib/i18n';

import type { NextRequest } from 'next/server';

export default async function middleware(request: NextRequest) {
  const { locales } = i18n;
  const defaultLocale = request.headers.get('x-default-locale') || i18n.defaultLocale;

  const handleI18nRouting = createIntlMiddleware({
    locales,
    defaultLocale,
    localePrefix: 'always',
    localeDetection: false,
  });
  const response = handleI18nRouting(request);

  response.headers.set('x-default-locale', defaultLocale);

  return response;
}

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)', '/'],
};
