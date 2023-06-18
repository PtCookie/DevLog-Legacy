import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import { getTag, listTags } from '@/lib/tags';
import { countPosts, listPostContent } from '@/lib/posts';
import config from '@/lib/config';
import { i18n } from '@/lib/i18n';
import Index from './client';

import type { Metadata } from 'next';

const dynamicParams = false;

type Props = {
  params: {
    locale: string;
    slug: Array<string>;
  };
};

export default async function IndexPage({ params: { locale, slug } }: Props) {
  const paginationData = await getTags(locale, slug);

  return <Index {...paginationData} />;
}

export async function generateMetadata({ params: { slug: queries } }: Props): Promise<Metadata> {
  const [slug, page] = [queries[0], queries[1]];
  const tag = getTag(slug);
  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : '');
  const title = tag.name;

  return generateBaseMetadata({ title, url });
}

export async function generateStaticParams({ params: { locale } }: Props) {
  const { locales } = i18n;
  const paths: Array<{ slug: Array<string>; locale: string }> = [];

  for (const locale of locales) {
    const slugPath = listTags().flatMap((tag) => {
      const pages = Math.ceil(countPosts(locale as SupportedLocale, tag.slug) / config.posts_per_page);

      return Array.from({ length: pages }, (_, page) => {
        return page === 0 ? { slug: [tag.slug], locale } : { slug: [tag.slug, (page + 1).toString()], locale };
      });
    });

    paths.push(...slugPath);
  }

  return paths;
}

async function getTags(locale: string, queries: Array<string>) {
  const [slug, page] = [queries[0], queries[1]];
  const posts = listPostContent(
    page ? parseInt(page as string) : 1,
    config.posts_per_page,
    locale as SupportedLocale,
    slug,
  );
  const tag = getTag(slug);
  const pagination = {
    current: page ? parseInt(page as string) : 1,
    pages: Math.ceil(countPosts(locale as SupportedLocale, slug) / config.posts_per_page),
  };

  return {
    posts,
    tag,
    pagination,
  };
}

export { dynamicParams };
