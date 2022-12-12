import { format, formatISO } from 'date-fns';
import { ko, enUS } from 'date-fns/locale';
import styles from '../styles/Components.module.css';

type Props = {
  date: Date;
  locale?: SupportedLocale;
};

export default function DateDisplay({ date, locale = 'ko' }: Props) {
  const renderLocale = locale === 'ko' ? ko : enUS;

  return (
    <time dateTime={formatISO(date)}>
      <span className={styles.date}>{format(date, 'LLL do, yyyy', { locale: renderLocale })}</span>
    </time>
  );
}
