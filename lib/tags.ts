import tags from '../meta/tags.yml';

const tagMap: { [key: string]: Tag } = generateTagMap();

function generateTagMap(): { [key: string]: Tag } {
  const result: { [key: string]: Tag } = {};

  for (const tag of tags.tags) {
    result[tag.slug] = tag;
  }

  return result;
}

export function getTag(slug: string) {
  return tagMap[slug];
}

export function listTags(): Tag[] {
  return tags.tags;
}
