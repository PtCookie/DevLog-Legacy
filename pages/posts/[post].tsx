import { GetStaticPaths, GetStaticProps } from 'next';
import { useEffect } from 'react';
import { readFileSync } from 'node:fs';
import { parseISO } from 'date-fns';
import matter from 'gray-matter';
import yaml from 'js-yaml';
import { serialize } from 'next-mdx-remote/serialize';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import highlight from 'highlight.js';
import config from '../../lib/config';
import { fetchPostContent } from '../../lib/posts';
import PostLayout from '../../layout/PostLayout';
import 'highlight.js/styles/base16/tomorrow-night.css';

export type Props = {
  title: string;
  dateString: string;
  slug: string;
  tags: string[];
  author: string;
  description?: string;
  source: MDXRemoteSerializeResult;
};

export default function Post({ title, dateString, slug, tags, author, description = '', source }: Props) {
  useEffect(() => {
    highlight.configure({
      ignoreUnescapedHTML: true,
    });
    highlight.highlightAll();
  }, []);

  return (
    <PostLayout
      title={title}
      date={parseISO(dateString)}
      slug={slug}
      tags={tags}
      author={author}
      description={description}
    >
      <MDXRemote {...source} />
    </PostLayout>
  );
}

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<{ params: { post: string }; locale?: string }> = [];

  if (locales instanceof Array) {
    for (const locale of locales) {
      const postPath = fetchPostContent(locale as SupportedLocale).map((post) => {
        return { params: { post: post.slug }, locale };
      });

      paths.push(...postPath);
    }
  } else {
    const postPath = fetchPostContent().map((post) => {
      return { params: { post: '/posts/' + post.slug } };
    });

    paths.push(...postPath);
  }

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const slug = params!.post as string;
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
    props: {
      title: data.title,
      dateString: data.date,
      slug: data.slug,
      tags: data.tags,
      author: data.author,
      description: data.description || config.site_description,
      source: mdxSource,
    },
  };
};
