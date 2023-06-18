'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import PostList from '@/components/PostList';

type Props = {
  posts: PostContent[];
  tags: Tag[];
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Posts({ posts, tags, pagination }: Props) {
  return (
    <DefaultLayout>
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </DefaultLayout>
  );
}
