import Link from 'next-intl/link';

import styles from './TagButton.module.css';

type Props = {
  tag: Tag;
};

export default function TagButton({ tag }: Props) {
  return (
    <Link href={'/posts/tags/[[...slug]]'} as={`/posts/tags/${tag.slug}`} className={styles.button}>
      #{tag.name}
    </Link>
  );
}
