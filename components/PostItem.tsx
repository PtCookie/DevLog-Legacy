import Link from 'next-intl/link';
import { usePathname } from 'next/navigation';
import { parseISO } from 'date-fns';
import DateDisplay from '@/components/DateDisplay';

import styles from './PostItem.module.css';

type Props = {
  post: PostContent;
};

export default function PostItem({ post }: Props) {
  const pathname = usePathname();
  const locale = pathname.split('/')?.[1];

  return (
    <Link href={'/posts/' + post.slug} className={styles.item}>
      <DateDisplay date={parseISO(post.date)} locale={locale as SupportedLocale} />
      <h2>{post.title}</h2>
    </Link>
  );
}
