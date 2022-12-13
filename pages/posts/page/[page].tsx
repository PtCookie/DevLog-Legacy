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

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const page = parseInt(params!.page as string);
  const posts = listPostContent(page, config.posts_per_page);
  const tags = listTags();
  const pagination = {
    current: page,
    pages: Math.ceil(countPosts() / config.posts_per_page),
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

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = Math.ceil(countPosts() / config.posts_per_page);
  const paths = Array.from(Array(pages - 1).keys()).map((it) => ({
    params: { page: (it + 2).toString() },
  }));

  return {
    paths: paths,
    fallback: false,
  };
};
