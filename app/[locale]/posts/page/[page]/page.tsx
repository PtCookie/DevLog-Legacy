import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import { countPosts, listPostContent } from '@/lib/posts';
import config from '@/lib/config';
import { i18n } from '@/lib/i18n';
import { listTags } from '@/lib/tags';
import Page from './client';

import type { Metadata } from 'next';

const dynamicParams = false;

type Props = {
  params: {
    locale: string;
    page: string;
  };
};

export default async function PagePage({ params: { locale, page } }: Props) {
  const paginationData = await getPage(locale, parseInt(page));

  return <Page {...paginationData} />;
}

export async function generateMetadata({ params: { page } }: Props): Promise<Metadata> {
  const url = `/posts/page/${page}`;
  const title = 'All posts';

  return generateBaseMetadata({ title, url });
}

export async function generateStaticParams({ params: { locale } }: Props) {
  const { locales } = i18n;
  const paths: Array<{ page: string; locale: string }> = [];

  for (const locale of locales) {
    const pages = Math.ceil(countPosts(locale as SupportedLocale) / config.posts_per_page);
    const localePaths = Array.from({ length: pages - 1 }, (_, page) => {
      return { page: (page + 2).toString(), locale };
    });

    paths.push(...localePaths);
  }

  return paths;
}

async function getPage(locale: string, page: number) {
  const posts = listPostContent(page, config.posts_per_page, locale as SupportedLocale);
  const tags = listTags();
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts(locale as SupportedLocale) / config.posts_per_page),
  };

  return {
    posts,
    tags,
    pagination,
  };
}

export { dynamicParams };
