import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import { getTag, listTags } from '@/lib/tags';
import { countPosts, listPostContent } from '@/lib/posts';
import config from '@/lib/config';
import Index from './client';

import type { Metadata } from 'next';

type Props = {
  params: {
    slug: Array<string>;
  };
};

export async function generateMetadata({ params: { slug: queries } }: Props): Promise<Metadata> {
  const [slug, page] = [queries[0], queries[1]];
  const tag = getTag(slug);
  const url = `/posts/tags/${tag.name}` + (page ? `/${page}` : '');
  const title = tag.name;

  return generateBaseMetadata({ title, url });
}

export default async function IndexPage({ params: { slug } }: Props) {
  // TODO Get locale from params
  const locale = 'ko';
  const paginationData = await getTags(locale, slug);

  return <Index {...paginationData} />;
}

export const dynamicParams = false;

type PathProps = {
  params: {
    lang: string;
  };
};

export async function generateStaticParams({}: PathProps) {
  // TODO Get locale from params
  const locale = 'ko';

  // const paths: Array<{ params: { slug: string[] }; locale?: string }> = [];
  //
  // if (locales instanceof Array) {
  //   for (const locale of locales) {
  //     const slugPath = listTags().flatMap((tag) => {
  //       const pages = Math.ceil(countPosts(locale as SupportedLocale, tag.slug) / config.posts_per_page);
  //
  //       return Array.from({ length: pages }, (_, page) => {
  //         return page === 0
  //           ? { params: { slug: [tag.slug] }, locale }
  //           : { params: { slug: [tag.slug, (page + 1).toString()] }, locale };
  //       });
  //     });
  //
  //     paths.push(...slugPath);
  //   }
  // } else {
  //   const slugPath = listTags().flatMap((tag) => {
  //     const pages = Math.ceil(countPosts(undefined, tag.slug) / config.posts_per_page);
  //
  //     return Array.from({ length: pages }, (_, page) => {
  //       return page === 0 ? { params: { slug: [tag.slug] } } : { params: { slug: [tag.slug, (page + 1).toString()] } };
  //     });
  //   });
  //
  //   paths.push(...slugPath);
  // }

  return listTags().flatMap((tag) => {
    const pages = Math.ceil(countPosts(undefined, tag.slug) / config.posts_per_page);

    return Array.from({ length: pages }, (_, page) => {
      return page === 0 ? { slug: [tag.slug] } : { slug: [tag.slug, (page + 1).toString()] };
    });
  });
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
