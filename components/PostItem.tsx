import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseISO } from 'date-fns';
import DateDisplay from './DateDisplay';
import styles from '../styles/Post.module.css';

type Props = {
  post: PostContent;
};

export default function PostItem({ post }: Props) {
  const { locale } = useRouter();

  return (
    <Link href={'/posts/' + post.slug} className={styles.item}>
      <DateDisplay date={parseISO(post.date)} locale={locale as SupportedLocale} />
      <h2>{post.title}</h2>
    </Link>
  );
}
