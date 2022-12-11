import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import BurgerButton from './BurgerButton';
import styles from '../styles/Components.module.css';

export default function Navigation() {
  const router = useRouter();
  const [active, setActive] = useState(false);

  return (
    <>
      <BurgerButton active={active} onClick={() => setActive(!active)} />
      <div className={styles.navigation} data-active={active}>
        <ul>
          <li>
            <Link href="/" className={router.pathname === '/' ? styles.current : undefined}>
              about
            </Link>
          </li>
          <li>
            <Link href="/posts" className={router.pathname.startsWith('/posts') ? styles.current : undefined}>
              blog
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
}
