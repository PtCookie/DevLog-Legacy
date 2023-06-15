'use client';

import Navigation from '@/components/Navigation';

import type { ReactNode } from 'react';

import styles from './DefaultLayout.module.css';

type Props = {
  children: ReactNode;
};

export default function DefaultLayout({ children }: Props) {
  return (
    <div className={styles.default}>
      <Navigation />
      <section>{children}</section>
    </div>
  );
}
