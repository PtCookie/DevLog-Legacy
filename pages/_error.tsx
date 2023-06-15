import { ThemeProvider } from '@/components/context/ThemeProvider';
import DefaultLayout from '@/components/layout/DefaultLayout';

import type { NextPage } from 'next';

type Props = {
  locale?: string;
  statusCode?: number;
};

const ErrorPage: NextPage<Props> = ({ locale, statusCode }) => {
  return (
    <ThemeProvider>
      <DefaultLayout>
        <div>
          {statusCode === 404 && <h1>404</h1>}
          {locale === 'ko' ? <h1>페이지를 찾을 수 없습니다</h1> : <h1>Page not found</h1>}
        </div>
        <style jsx>{`
          div {
            width: 100%;
            height: 80vh;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
          }
        `}</style>
      </DefaultLayout>
    </ThemeProvider>
  );
};

ErrorPage.getInitialProps = ({ locale, res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404;
  return { locale, statusCode };
};

export default ErrorPage;
