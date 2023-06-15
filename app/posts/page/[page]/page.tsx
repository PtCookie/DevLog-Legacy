import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import { countPosts, listPostContent } from '@/lib/posts';
import config from '@/lib/config';
import { listTags } from '@/lib/tags';
import Page from './client';

import type { Metadata } from 'next';

const dynamicParams = false;

type PathProps = {
  params: {
    lang: string;
  };
};

type Props = {
  params: {
    page: string;
  };
};

export default async function PagePage({ params: { page } }: Props) {
  // TODO Get locale from params
  const locale = 'ko';
  const paginationData = await getPage(locale, parseInt(page));

  return <Page {...paginationData} />;
}

export async function generateMetadata({ params: { page } }: Props): Promise<Metadata> {
  const url = `/posts/page/${page}`;
  const title = 'All posts';

  return generateBaseMetadata({ title, url });
}

export async function generateStaticParams({}: PathProps) {
  // const paths: Array<{ params: { page: string }; locale?: string }> = [];
  //
  // if (locales instanceof Array) {
  //   for (const locale of locales) {
  //     const pages = Math.ceil(countPosts(locale as SupportedLocale) / config.posts_per_page);
  //     const localePaths = Array.from({ length: pages - 1 }, (_, page) => {
  //       return { params: { page: (page + 2).toString() }, locale };
  //     });
  //
  //     paths.push(...localePaths);
  //   }
  // } else {
  //   const pages = Math.ceil(countPosts() / config.posts_per_page);
  //   const localePaths = Array.from({ length: pages - 1 }, (_, page) => {
  //     return { params: { page: (page + 2).toString() } };
  //   });
  //
  //   paths.push(...localePaths);
  // }

  const pages = Math.ceil(countPosts() / config.posts_per_page);
  return Array.from({ length: pages - 1 }, (_, page) => {
    return { page: (page + 2).toString() };
  });
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
