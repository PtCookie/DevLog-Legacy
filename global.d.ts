declare module '*.yml' {
  const value: any;
  export default value;
}

type SupportedLocale = 'ko' | 'en';

type Config = {
  readonly base_url: string;
  readonly site_title: string;
  readonly site_description: string;
  readonly site_keywords: Array<string>;
  readonly posts_per_page: number;
  readonly twitter_account: string;
  readonly github_account: string;
};

type Author = {
  readonly slug: string;
  readonly name: string;
  readonly introduction: string;
};

type Tag = {
  readonly slug: string;
  readonly name: string;
};

type Pagination = {
  page: number;
  current: boolean;
  excerpt: boolean;
};

type ParsedPostData = {
  slug: string;
  title: string;
  date: string;
  author: string;
  tags: string[];
  description: string;
  fullPath: string;
};

type PostContent = {
  readonly slug: string;
  readonly title: string;
  readonly date: string;
  readonly author: string;
  readonly tags?: string[];
  readonly description?: string;
  readonly fullPath: string;
};
