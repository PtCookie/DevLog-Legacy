import config from '@/lib/config';

import type { Metadata } from 'next';

type Props = {
  title?: string;
  description?: string;
  keywords?: Array<string>;
  url?: string;
  author?: string;
};

export function generateBaseMetadata({ title, description, keywords, url, author }: Props): Metadata {
  return {
    ...(title ? { title } : {}),
    description: description ?? config.site_description,
    keywords: keywords ?? config.site_keywords,
    authors: [{ name: author }],
    metadataBase: new URL(config.base_url),
    alternates: {
      canonical: url,
    },
    openGraph: {
      title: title ? [title, config.site_title].join(' | ') : config.site_title,
      description: description ?? config.site_description,
      url: config.base_url + url,
      siteName: config.site_title,
      images: [
        {
          url: config.base_url + '/og_image.png',
          width: 1024,
          height: 512,
          alt: config.site_title,
        },
      ],
      type: 'article',
    },
    twitter: {
      card: 'summary_large_image',
      title: title ? [title, config.site_title].join(' | ') : config.site_title,
      description: description ?? config.site_description,
      site: config.twitter_account,
      creator: config.twitter_account,
      images: [
        {
          url: config.base_url + '/og_image.png',
          width: 1024,
          height: 512,
          alt: config.site_title,
        },
      ],
    },
  };
}
