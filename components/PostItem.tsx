import Link from 'next/link';
import { parseISO } from 'date-fns';
import DateDisplay from './DateDisplay';
import styles from '../styles/Post.module.css';

type Props = {
  post: PostContent;
};

export default function PostItem({ post }: Props) {
  return (
    <Link href={'/posts/' + post.slug} className={styles.item}>
      <DateDisplay date={parseISO(post.date)} />
      <h2>{post.title}</h2>
    </Link>
  );
}
