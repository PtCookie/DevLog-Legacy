import Head from 'next/head';
import config from '@/lib/config';

export default function TwitterCardMeta() {
  return (
    <Head>
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:site" content={config.twitter_account} />
      <meta property="twitter:creator" content={config.twitter_account} />
    </Head>
  );
}
