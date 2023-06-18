'use client';

import { ThemeProvider } from '@/components/context/ThemeProvider';
import DefaultLayout from '@/components/layout/DefaultLayout';

export default function ErrorPage({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <ThemeProvider>
      <DefaultLayout>
        <div>
          <h1>Oops!</h1>
          <h2>Something went wrong!</h2>
          <p onClick={() => reset()}>Try again</p>
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
