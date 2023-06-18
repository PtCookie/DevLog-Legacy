import { usePathname } from 'next/navigation';
import { usePathname as useBasePath } from 'next-intl/client';
import Link from 'next-intl/link';
import { RxGlobe } from 'react-icons/rx';
import { i18n } from '@/lib/i18n';

import styles from './LocaleSelector.module.css';

type Props = {
  active: boolean;
};

export default function LocaleSelector({ active }: Props) {
  const pathname = usePathname();
  const basePath = useBasePath();

  const currentLocale = pathname.split('/')?.[1];
  const { locales } = i18n;

  return (
    <ul className={styles.locale} data-active={active}>
      <RxGlobe />
      {locales?.map((locale) => (
        <li key={locale} data-active={locale === currentLocale}>
          <Link href={basePath} locale={locale}>
            {locale}
          </Link>
        </li>
      ))}
    </ul>
  );
}
