import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { FcHome, FcReading } from 'react-icons/fc';
import BurgerButton from './BurgerButton';
import LocaleSelector from './LocaleSelector';
import styles from '../styles/Navigation.module.css';

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  return (
    <nav className={styles.container} data-active={active}>
      <BurgerButton active={active} onClick={() => setActive(!active)} />
      <div className={styles.title} data-active={router.pathname === '/' ? true : active}>
        PtCookie<span>.</span>DevLog
      </div>
      <div className={styles.content} data-active={active}>
        <ul>
          <li>
            <Link href="/" className={router.pathname === '/' ? styles.link : undefined}>
              home
            </Link>
            <FcHome className={styles.icon} />
          </li>
          <li>
            <Link href="/posts" className={router.pathname.startsWith('/posts') ? styles.link : undefined}>
              posts
            </Link>
            <FcReading className={styles.icon} />
          </li>
        </ul>
      </div>
      <LocaleSelector active={active} />
    </nav>
  );
}
