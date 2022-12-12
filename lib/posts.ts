import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import yaml from 'js-yaml';

let postCache: Record<SupportedLocale, PostContent[]> = {
  ko: [],
  en: [],
};

export function fetchPostContent(locale: SupportedLocale = 'ko'): PostContent[] {
  const postsDirectory = path.join(process.cwd(), 'assets', 'posts', locale);

  if (postCache[locale].length > 0) {
    return postCache[locale];
  }

  const fileNames = fs.readdirSync(postsDirectory);
  const allPostsData = fileNames
    .filter((file) => file.endsWith('.mdx'))
    .map((fileName) => {
      const fullPath = path.join(postsDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf-8');

      const parsedMatter = matter(fileContents, {
        engines: {
          yaml: (string) => yaml.load(string, { schema: yaml.JSON_SCHEMA }) as JSON,
        },
      });
      const matterData = parsedMatter.data as ParsedPostData;
      matterData.fullPath = fullPath;

      const slug = fileName.replace(/\.mdx$/, '');
      if (matterData.slug !== slug) {
        throw new Error('slug field not match with the path of its content source');
      }

      return matterData;
    });

  // Sort posts by date
  postCache[locale] = allPostsData.sort((a, b) => {
    if (a.date < b.date) {
      return 1;
    } else {
      return -1;
    }
  });

  return postCache[locale];
}

export function countPosts(locale?: SupportedLocale, tag?: string): number {
  return fetchPostContent(locale).filter((post) => !tag || (post.tags && post.tags.includes(tag))).length;
}

export function listPostContent(page: number, limit: number, locale?: SupportedLocale, tag?: string): PostContent[] {
  return fetchPostContent(locale)
    .filter((post) => !tag || (post.tags && post.tags.includes(tag)))
    .slice((page - 1) * limit, page * limit);
}
