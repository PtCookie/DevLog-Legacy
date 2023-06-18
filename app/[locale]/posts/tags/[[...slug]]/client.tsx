'use client';

import DefaultLayout from '@/components/layout/DefaultLayout';
import TagPostList from '@/components/TagPostList';

type Props = {
  posts: PostContent[];
  tag: Tag;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Index({ posts, tag, pagination }: Props) {
  return (
    <DefaultLayout>
      <TagPostList posts={posts} tag={tag} pagination={pagination} />
    </DefaultLayout>
  );
}
