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
        <link rel="manifest" href="/public/blog.webmanifest" />
        <link rel="apple-touch-icon" href="/public/icon256.png" />
        <meta name="theme-color" content="#fff" />
      </Head>
      <nav>
        <Navigation />
      </nav>
      <main>{children}</main>
    </div>
  );
}
