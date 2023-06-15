import Head from 'next/head';
import { ReactNode } from 'react';
import Navigation from '@/components/Navigation';

import styles from './DefaultLayout.module.css';

type Props = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <div className={styles.default}>
      <Head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#182d27" />
        <link rel="manifest" href="/blog.webmanifest" />
        <link rel="apple-touch-icon" href="/icon256.png" />
      </Head>
      <Navigation />
      <section>{children}</section>
    </div>
  );
}
