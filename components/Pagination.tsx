import Link from 'next-intl/link';
import { generatePagination } from '@/lib/pagination';

import styles from './Pagination.module.css';

type Props = {
  current: number;
  pages: number;
  link: {
    href: (page: number) => string;
    as: (page: number) => string;
  };
};

export default function Pagination({ current, pages, link }: Props) {
  const pagination = generatePagination(current, pages);

  return (
    <ul className={styles.pagination}>
      {pagination.map((it, i) => (
        <li key={i}>
          {it.excerpt ? (
            '...'
          ) : (
            <Link href={link.href(it.page)} as={link.as(it.page)} data-active={it.page === current}>
              {it.page}
            </Link>
          )}
        </li>
      ))}
    </ul>
  );
}
