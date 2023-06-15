import Link from 'next/link';
import React from 'react';
import Pagination from '@/components/Pagination';
import PostItem from '@/components/PostItem';

import styles from './PostList.module.css';

type Props = {
  posts: Array<PostContent>;
  tags: Array<Tag>;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function PostList({ posts, tags, pagination }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {posts.map((content, index) => (
            <li key={index}>
              <PostItem post={content} />
            </li>
          ))}
        </ul>
        <Pagination
          current={pagination.current}
          pages={pagination.pages}
          link={{
            href: (page) => (page === 1 ? '/posts' : '/posts/page/[page]'),
            as: (page) => (page === 1 ? '' : '/posts/page/' + page),
          }}
        />
      </div>
      <ul className={styles.category}>
        {tags.map((tag, index) => (
          <li key={index}>
            <Link href={'/posts/tags/[[...slug]]'} as={`/posts/tags/${tag.slug}`}>
              {'#' + tag.name}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
