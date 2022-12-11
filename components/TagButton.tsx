import Link from 'next/link';
import styles from '../styles/Components.module.css';

type Props = {
  tag: Tag;
};

export default function TagButton({ tag }: Props) {
  return (
    <>
      <Link href={'/posts/tags/[[...slug]]'} as={`/posts/tags/${tag.slug}`}>
        <a className={styles.button}>#{tag.name}</a>
      </Link>
    </>
  );
}
