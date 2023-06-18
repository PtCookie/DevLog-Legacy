import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FcHome, FcReading } from 'react-icons/fc';
import BurgerButton from './BurgerButton';
import LocaleSelector from './LocaleSelector';
import ThemeSwitch from './ThemeSwitch';

import styles from './Navigation.module.css';

export default function Navigation() {
  const pathname = usePathname();
  const [active, setActive] = useState<boolean>(false);

  return (
    <nav className={styles.container} data-active={active}>
      <BurgerButton active={active} onClick={() => setActive(!active)} />
      <div className={styles.title} data-active={pathname === '/' ? true : active}>
        PtCookie<span>.</span>DevLog
      </div>
      <div className={styles.content} data-active={active}>
        <ul>
          <li>
            <Link href="/" className={pathname === '/' ? styles.link : undefined}>
              home
            </Link>
            <FcHome className={styles.icon} />
          </li>
          <li>
            <Link href="/posts" className={pathname?.startsWith('/posts') ? styles.link : undefined}>
              posts
            </Link>
            <FcReading className={styles.icon} />
          </li>
        </ul>
      </div>
      <ThemeSwitch active={active} />
      <LocaleSelector active={active} />
    </nav>
  );
}
