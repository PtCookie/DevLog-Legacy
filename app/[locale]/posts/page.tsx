import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import { countPosts, listPostContent } from '@/lib/posts';
import config from '@/lib/config';
import { listTags } from '@/lib/tags';
import Posts from './client';

import type { Metadata } from 'next';

type Props = {
  params: {
    locale: string;
  };
};

export default async function PostsPage({ params: { locale } }: Props) {
  const posts = await getPosts(locale);

  return <Posts {...posts} />;
}

export async function generateMetadata(): Promise<Metadata> {
  const title = 'All posts';
  const url = '/posts';

  return generateBaseMetadata({ title, url });
}

async function getPosts(locale: string) {
  const posts = listPostContent(1, config.posts_per_page, locale as SupportedLocale);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts(locale as SupportedLocale) / config.posts_per_page),
  };

  return {
    posts,
    tags,
    pagination,
  };
}
