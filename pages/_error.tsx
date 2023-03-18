import { ThemeProvider } from '../components/context/ThemeProvider';
import DefaultLayout from '../components/layout/DefaultLayout';
import styles from '../styles/Error.module.css';

import type { NextPage } from 'next';

type Props = {
  locale?: string;
  statusCode?: number;
};

const ErrorPage: NextPage<Props> = ({ locale, statusCode }) => {
  return (
    <ThemeProvider>
      <DefaultLayout>
        <div className={styles.container}>
          {statusCode === 404 && <h1>404</h1>}
          {locale === 'ko' ? <h1>페이지를 찾을 수 없습니다</h1> : <h1>Page not found</h1>}
        </div>
      </DefaultLayout>
    </ThemeProvider>
  );
};

ErrorPage.getInitialProps = ({ locale, res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { locale, statusCode };
};

export default ErrorPage;
