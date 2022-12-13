import Head from 'next/head';
import React from 'react';
import Navigation from '../Navigation';
import styles from '../../styles/Layout.module.css';

type Props = {
  children: React.ReactNode;
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
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
    </div>
  );
}
