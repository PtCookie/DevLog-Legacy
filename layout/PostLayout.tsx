import React from 'react';
import { serif, monospace } from '../lib/fonts';
import { getAuthor } from '../lib/authors';
import { getTag } from '../lib/tags';
import DefaultLayout from './DefaultLayout';
import BasicMeta from '../components/meta/BasicMeta';
import JsonLdMeta from '../components/meta/JsonLdMeta';
import OpenGraphMeta from '../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../components/meta/TwitterCardMeta';
import Author from '../components/Author';
import Copyright from '../components/Copyright';
import DateDisplay from '../components/DateDisplay';
import SocialAccounts from '../components/SocialAccounts';
import TagButton from '../components/TagButton';
import styles from '../styles/Layout.module.css';

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
                <DateDisplay date={date} />
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