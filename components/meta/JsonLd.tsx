import { jsonLdScriptProps } from 'react-schemaorg';
import { BlogPosting } from 'schema-dts';
import { formatISO } from 'date-fns';
import config from '@/lib/config';

type Props = {
  url: string;
  title: string;
  keywords?: string[];
  date: Date;
  author?: string;
  image?: string;
  description?: string;
};

export default function JsonLd({ url, title, keywords, date, author, image, description }: Props) {
  return (
    <script
      {...jsonLdScriptProps<BlogPosting>({
        '@context': 'https://schema.org',
        '@type': 'BlogPosting',
        mainEntityOfPage: config.base_url + url,
        headline: title,
        keywords: keywords ? keywords.join(',') : undefined,
        datePublished: formatISO(date),
        author: [{ '@type': 'Person', name: author, url: config.base_url }],
        image: image || `${config.base_url}/og_image.png`,
        description: description,
      })}
    />
  );
}
