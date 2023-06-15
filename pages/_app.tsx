import { ThemeProvider } from '@/components/context/ThemeProvider';
import { sansSerif } from '@/lib/fonts';

import '@csstools/normalize.css';
import '@/assets/globals.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>
      <main style={sansSerif.style}>
        <Component {...pageProps} />
      </main>
    </ThemeProvider>
  );
}
