import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import { countPosts, listPostContent } from '@/lib/posts';
import config from '@/lib/config';
import { listTags } from '@/lib/tags';
import Posts from './client';

import type { Metadata } from 'next';

export async function generateMetadata(): Promise<Metadata> {
  const title = 'All posts';
  const url = '/posts';

  return generateBaseMetadata({ title, url });
}

export default async function PostsPage() {
  // TODO Get locale from params
  const locale = 'ko';
  const posts = await getPosts(locale);

  return <Posts {...posts} />;
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
