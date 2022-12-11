import authors from '../meta/authors.yml';

const authorMap: { [key: string]: Author } = generateAuthorMap();

function generateAuthorMap(): { [key: string]: Author } {
  const result: { [key: string]: Author } = {};

  for (const author of authors.authors) {
    result[author.slug] = author;
  }

  return result;
}

export function getAuthor(slug: string) {
  return authorMap[slug];
}
