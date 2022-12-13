import { useRouter } from 'next/router';
import React from 'react';
import { serif, monospace } from '../../lib/fonts';
import { getAuthor } from '../../lib/authors';
import { getTag } from '../../lib/tags';
import DefaultLayout from './DefaultLayout';
import BasicMeta from '../meta/BasicMeta';
import JsonLdMeta from '../meta/JsonLdMeta';
import OpenGraphMeta from '../meta/OpenGraphMeta';
import TwitterCardMeta from '../meta/TwitterCardMeta';
import Author from '../Author';
import Copyright from '../Copyright';
import DateDisplay from '../DateDisplay';
import SocialAccounts from '../SocialAccounts';
import TagButton from '../TagButton';
import styles from '../../styles/Layout.module.css';

type Props = {
  title: string;
  date: Date;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  children: React.ReactNode;
};

export default function PostLayout({ title, date, slug, author, tags, description = '', children }: Props) {
  const { locale } = useRouter();
  const keywords = tags.map((keyword) => getTag(keyword).name);
  const authorName = getAuthor(author).name;

  return (
    <DefaultLayout>
      <BasicMeta url={`/posts/${slug}`} title={title} keywords={keywords} description={description} />
      <JsonLdMeta
        url={`/posts/${slug}`}
        title={title}
        keywords={keywords}
        date={date}
        author={authorName}
        description={description}
      />
      <OpenGraphMeta url={`/posts/${slug}`} title={title} description={description} />
      <TwitterCardMeta />
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
