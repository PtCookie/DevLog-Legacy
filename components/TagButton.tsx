import Link from 'next/link';

import styles from './TagButton.module.css';

type Props = {
  tag: Tag;
};

export default function TagButton({ tag }: Props) {
  return (
    <>
      <Link href={'/posts/tags/[[...slug]]'} className={styles.button} as={`/posts/tags/${tag.slug}`}>
        #{tag.name}
      </Link>
    </>
  );
}
