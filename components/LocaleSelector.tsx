import { useRouter } from 'next/router';
import { RxGlobe } from 'react-icons/rx';

import styles from './LocaleSelector.module.css';

type Props = {
  active: boolean;
};

export default function LocaleSelector({ active }: Props) {
  const router = useRouter();
  const { pathname, asPath, query, locales, locale: currentLocale } = router;

  return (
    <ul className={styles.locale} data-active={active}>
      <RxGlobe />
      {locales?.map((locale) => (
        <li
          key={locale}
          onClick={() => {
            if (locale !== currentLocale)
              router.push({ pathname, query }, asPath, { locale }).finally(() => router.reload());
          }}
          data-active={locale === currentLocale}
        >
          {locale}
        </li>
      ))}
    </ul>
  );
}
