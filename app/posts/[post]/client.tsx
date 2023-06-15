'use client';

import { useEffect } from 'react';
import { parseISO } from 'date-fns';
import { MDXRemote, MDXRemoteSerializeResult } from 'next-mdx-remote';
import highlight from 'highlight.js';
import PostLayout from '@/components/layout/PostLayout';

import 'highlight.js/styles/base16/tomorrow-night.css';

type Props = {
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
