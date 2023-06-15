import { readFileSync } from 'node:fs';
import { parseISO } from 'date-fns';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { serialize } from 'next-mdx-remote/serialize';
import { generateBaseMetadata } from '@/components/meta/generateBaseMetadata';
import JsonLd from '@/components/meta/JsonLd';
import config from '@/lib/config';
import { fetchPostContent } from '@/lib/posts';
import { getTag } from '@/lib/tags';
import { getAuthor } from '@/lib/authors';
import Post from './client';

import type { Metadata } from 'next';

const dynamicParams = false;

type PathProps = {
  params: {
    lang: string;
  };
};

type Props = {
  params: {
    post: string;
  };
};

export default async function PostPage({ params: { post } }: Props) {
  // TODO Get locale from params
  const locale = 'ko';
  const postData = await getPost(locale, post);
  const keywords: Array<string> = postData.tags.map((keyword: string) => getTag(keyword).name);
  const authorName = getAuthor(postData.author).name;

  return (
    <>
      <JsonLd
        url={`/posts/${postData.slug}`}
        title={postData.title}
        keywords={keywords}
        date={parseISO(postData.dateString)}
        author={authorName}
        description={postData.description}
      />
      <Post {...postData} />
    </>
  );
}

export async function generateMetadata({ params: { post } }: Props): Promise<Metadata> {
  // TODO Get locale from params
  const locale = 'ko';
  const slug = post;
  const { title, tags, description, author } = await getPost(locale, post);
  const url = `/posts/${slug}`;
  const keywords: Array<string> = tags.map((keyword: string) => getTag(keyword).name);

  return generateBaseMetadata({ title, description, keywords, url, author: getAuthor(author).name });
}

export async function generateStaticParams({}: PathProps) {
  // TODO Get locale from params
  const locale = 'ko';

  // const paths: Array<{ params: { post: string }; locale?: string }> = [];
  //
  // if (locales instanceof Array) {
  //   for (const locale of locales) {
  //     const postPath = fetchPostContent(locale as SupportedLocale).map((post) => {
  //       return { params: { post: post.slug }, locale };
  //     });
  //
  //     paths.push(...postPath);
  //   }
  // } else {
  //   const postPath = fetchPostContent().map((post) => {
  //     return { params: { post: '/posts/' + post.slug } };
  //   });
  //
  //   paths.push(...postPath);
  // }

  return fetchPostContent(locale as SupportedLocale).map((postData) => ({ post: postData.slug }));
}

async function getPost(locale: string, post: string) {
  const slug = post;
  const postContents = fetchPostContent(locale as SupportedLocale);
  const slugToPostContent: Record<string, PostContent> = {};

  for (const postContent of postContents) {
    slugToPostContent[postContent.slug] = postContent;
  }

  const source = readFileSync(slugToPostContent[slug].fullPath, 'utf-8');
  const { content, data } = matter(source, {
    engines: {
      yaml: (string) => yaml.load(string, { schema: yaml.JSON_SCHEMA }) as JSON,
    },
  });
  const mdxSource = await serialize(content, { scope: data });

  return {
    title: data.title,
    dateString: data.date,
    slug: data.slug,
    tags: data.tags,
    author: data.author,
    description: data.description || config.site_description,
    source: mdxSource,
  };
}

export { dynamicParams };
