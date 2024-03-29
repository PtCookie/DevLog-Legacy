import React from 'react';
import Pagination from '@/components/Pagination';
import PostItem from '@/components/PostItem';

import styles from './TagPostList.module.css';

type Props = {
  posts: PostContent[];
  tag: Tag;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function TagPostList({ posts, tag, pagination }: Props) {
  return (
    <div className={styles.tag}>
      <h1>
        All posts / <span>{tag.name}</span>
      </h1>
      <ul>
        {posts.map((it, i) => (
          <li key={i}>
            <PostItem post={it} />
          </li>
        ))}
      </ul>
      <Pagination
        current={pagination.current}
        pages={pagination.pages}
        link={(page) => (page === 1 ? `/posts/tags/${tag.slug}` : `/posts/tags/${tag.slug}/${page}`)}
      />
    </div>
  );
}
