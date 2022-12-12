import { describe, test } from 'mocha';
import { expect } from 'chai';
import fs from 'node:fs';
import path from 'node:path';
import { countPosts, fetchPostContent } from '../lib/posts';

describe('Post parsing', function () {
  test('parse post content from mdx', function () {
    const postContents = fetchPostContent();

    postContents.map((postContent) => {
      expect(postContent).to.have.property('slug');
      expect(postContent).to.have.property('title');
      expect(postContent).to.have.property('date');
      expect(postContent).to.have.property('author');
      expect(postContent).to.have.property('tags');
      expect(postContent).to.have.property('fullPath');
    });
  });

  test('count post content', function () {
    const locale = 'ko';
    const postCount = countPosts(locale);

    const postsDirectory = path.join(process.cwd(), 'assets', 'posts', locale);
    const fileCount = fs.readdirSync(postsDirectory).length;

    expect(postCount).to.equal(fileCount);
  });
});
