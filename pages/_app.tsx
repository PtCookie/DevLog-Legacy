import { sansSerif } from '../lib/fonts';
import '@csstools/normalize.css';
import '../styles/globals.css';

import type { AppProps } from 'next/app';

export default function App({ Component, pageProps }: AppProps) {
  return (
    <main style={sansSerif.style}>
      <Component {...pageProps} />
    </main>
  );
}
