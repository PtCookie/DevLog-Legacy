import { GetStaticPaths, GetStaticProps } from 'next';
import config from '../../../lib/config';
import { countPosts, listPostContent } from '../../../lib/posts';
import { listTags } from '../../../lib/tags';
import DefaultLayout from '../../../layout/DefaultLayout';
import BasicMeta from '../../../components/meta/BasicMeta';
import OpenGraphMeta from '../../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../../components/meta/TwitterCardMeta';
import PostList from '../../../components/PostList';

type Props = {
  posts: PostContent[];
  tags: Tag[];
  page: number;
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Page({ posts, tags, pagination, page }: Props) {
  const url = `/posts/page/${page}`;
  const title = 'All posts';

  return (
    <DefaultLayout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta />
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </DefaultLayout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale, params }) => {
  const page = parseInt(params!.page as string);
  const posts = listPostContent(page, config.posts_per_page, locale as SupportedLocale);
  const tags = listTags();
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts(locale as SupportedLocale) / config.posts_per_page),
  };

  return {
    props: {
      page,
      posts,
      tags,
      pagination,
    },
  };
};

export const getStaticPaths: GetStaticPaths = async ({ locales }) => {
  const paths: Array<{ params: { page: string }; locale?: string }> = [];

  if (locales instanceof Array) {
    for (const locale of locales) {
      const pages = Math.ceil(countPosts(locale as SupportedLocale) / config.posts_per_page);
      const localePaths = Array.from({ length: pages - 1 }, (_, page) => {
        return { params: { page: (page + 2).toString() }, locale };
      });

      paths.push(...localePaths);
    }
  } else {
    const pages = Math.ceil(countPosts() / config.posts_per_page);
    const localePaths = Array.from({ length: pages - 1 }, (_, page) => {
      return { params: { page: (page + 2).toString() } };
    });

    paths.push(...localePaths);
  }

  return {
    paths: paths,
    fallback: false,
  };
};
