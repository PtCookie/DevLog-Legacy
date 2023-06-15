'use client';

import { serif, monospace } from '@/lib/fonts';
import { getAuthor } from '@/lib/authors';
import { getTag } from '@/lib/tags';
import DefaultLayout from './DefaultLayout';
import Author from '@/components/Author';
import Copyright from '@/components/Copyright';
import DateDisplay from '@/components/DateDisplay';
import SocialAccounts from '@/components/SocialAccounts';
import TagButton from '@/components/TagButton';

import type { ReactNode } from 'react';

import styles from './PostLayout.module.css';

type Props = {
  title: string;
  date: Date;
  tags: string[];
  author: string;
  children: ReactNode;
};

export default function PostLayout({ title, date, author, tags, children }: Props) {
  // TODO Get locale from params
  const locale = 'ko';

  return (
    <DefaultLayout>
      <div className={styles.post}>
        <article className={[serif.variable, monospace.variable].join(' ')}>
          <header>
            <h1>{title}</h1>
            <div className={styles.metadata}>
              <div>
                <DateDisplay date={date} locale={locale as SupportedLocale} />
              </div>
              <div>
                <Author author={getAuthor(author)} />
              </div>
            </div>
          </header>
          <div className={styles.content}>{children}</div>
          <ul className={styles.tags}>
            {tags.map((tag, index) => (
              <li key={index}>
                <TagButton tag={getTag(tag)} />
              </li>
            ))}
          </ul>
        </article>
        <footer>
          <div className={styles.social}>
            <SocialAccounts />
          </div>
          <Copyright />
        </footer>
      </div>
    </DefaultLayout>
  );
}
