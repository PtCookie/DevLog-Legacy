declare module '*.yml' {
  const value: any;
  export default value;
}

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
