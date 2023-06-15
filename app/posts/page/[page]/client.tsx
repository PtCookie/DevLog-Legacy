'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import PostList from '@/components/PostList';

type Props = {
  posts: PostContent[];
  tags: Tag[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Page({ posts, tags, pagination, page }: Props) {
  return (
    <DefaultLayout>
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </DefaultLayout>
  );
}
