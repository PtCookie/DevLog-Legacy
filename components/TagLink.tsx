import Link from 'next/link';

type Props = {
  tag: Tag;
};

export default function TagLink({ tag }: Props) {
  return (
    <Link href={'/posts/tags/[[...slug]]'} as={`/posts/tags/${tag.slug}`}>
      {'#' + tag.name}
    </Link>
  );
}
