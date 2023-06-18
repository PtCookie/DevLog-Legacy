'use client';

import Link from 'next-intl/link';
import { ThemeProvider } from '@/components/context/ThemeProvider';
import DefaultLayout from '@/components/layout/DefaultLayout';

export default function NotFound() {
  return (
    <ThemeProvider>
      <DefaultLayout>
        <div>
          <h1>404</h1>
          <h2>Page not found</h2>
          <p>
            Back to <Link href="/">Home</Link>
          </p>
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
}
