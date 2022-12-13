import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BurgerButton from './BurgerButton';
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
              about
            </Link>
          </li>
          <li>
            <Link href="/posts" className={router.pathname.startsWith('/posts') ? styles.link : undefined}>
              blog
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}
