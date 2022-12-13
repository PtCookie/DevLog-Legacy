import { GetStaticProps } from 'next';
import config from '../../lib/config';
import { countPosts, listPostContent } from '../../lib/posts';
import { listTags } from '../../lib/tags';
import Layout from '../../layout/DefaultLayout';
import BasicMeta from '../../components/meta/BasicMeta';
import OpenGraphMeta from '../../components/meta/OpenGraphMeta';
import TwitterCardMeta from '../../components/meta/TwitterCardMeta';
import PostList from '../../components/PostList';

type Props = {
  posts: PostContent[];
  tags: Tag[];
  pagination: {
    current: number;
    pages: number;
  };
};

export default function Posts({ posts, tags, pagination }: Props) {
  const url = '/posts';
  const title = 'All posts';

  return (
    <Layout>
      <BasicMeta url={url} title={title} />
      <OpenGraphMeta url={url} title={title} />
      <TwitterCardMeta />
      <PostList posts={posts} tags={tags} pagination={pagination} />
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  const posts = listPostContent(1, config.posts_per_page, locale as SupportedLocale);
  const tags = listTags();
  const pagination = {
    current: 1,
    pages: Math.ceil(countPosts(locale as SupportedLocale) / config.posts_per_page),
  };

  return {
    props: {
      posts,
      tags,
      pagination,
    },
  };
};
