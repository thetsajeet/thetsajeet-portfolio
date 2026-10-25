import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlogCoverArt } from '../components/BlogCoverArt';
import { BlogMarkdown } from '../components/BlogMarkdown';
import { getBlogPosts } from '../data/blog';

test('blog posts are loaded from Markdown with frontmatter and generated reading time', () => {
  const posts = getBlogPosts();
  const post = posts.find(({ slug }) => slug === 'java-multithreading');

  assert.ok(post);
  assert.equal(post.title, "Demystifying Java Multithreading: A Beginner's Guide to Doing More at Once");
  assert.equal(post.order, 10);
  assert.equal(post.category, 'Java');
  assert.ok(post.readingTime.endsWith('min read'));
  assert.ok(post.headings.some(({ text }) => text === 'The Core Concepts: Process vs. Thread'));
  assert.equal(post.coverImage, undefined);
  assert.deepEqual(posts.map(({ slug }) => slug), ['java-multithreading']);
});

test('blog cover displays a reusable category-based placeholder when no image is configured', () => {
  const markup = renderToStaticMarkup(<BlogCoverArt category="Java" order={10} />);

  assert.match(markup, /Java article cover placeholder/);
  assert.match(markup, />J</);
  assert.doesNotMatch(markup, /THREAD|PROCESS/);
});

test('Markdown renders GFM, code, images, and sanitized native video', () => {
  const markup = renderToStaticMarkup(
    <BlogMarkdown
      excerpt="A test article."
      content={'## Rendering test\n\n- [x] Markdown works\n\n```js\nconst answer = 42;\n```\n\n```mermaid\ngraph TD\n  A --> B\n```\n\n![Diagram](/blog/test/diagram.gif)\n\n<video controls><source src="/blog/test/demo.mp4" type="video/mp4" /></video>\n\n<img src="/image.png" onerror="alert(1)" />'}
    />
  );

  assert.match(markup, /id="rendering-test"/);
  assert.match(markup, /type="checkbox"/);
  assert.match(markup, /class="hljs/);
  assert.match(markup, /language-mermaid/);
  assert.match(markup, /alt="Diagram"/);
  assert.match(markup, /<video[^>]*controls/);
  assert.match(markup, /<source[^>]*demo\.mp4/);
  assert.doesNotMatch(markup, /onerror|alert\(1\)/);
});
