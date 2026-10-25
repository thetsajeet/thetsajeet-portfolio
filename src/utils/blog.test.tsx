import assert from 'node:assert/strict';
import test from 'node:test';
import { renderToStaticMarkup } from 'react-dom/server';
import { BlogCoverArt } from '../components/BlogCoverArt';
import { BlogMarkdown } from '../components/BlogMarkdown';
import { getBlogPosts, getHeadings, isValidPublishedAt } from '../data/blog';
import { serializeJsonLd } from './json-ld';

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
  assert.ok(posts.every((current, index) => index === 0 || posts[index - 1].order <= current.order));
});

test('heading extraction skips fenced code while preserving heading slugs', () => {
  const headings = getHeadings('```md\n## Repeated heading\n```\n## Repeated heading\n\n~~~md\n### Hidden heading\n~~~\n### Visible heading');

  assert.deepEqual(headings.map(({ id, text }) => ({ id, text })), [
    { id: 'repeated-heading', text: 'Repeated heading' },
    { id: 'visible-heading', text: 'Visible heading' },
  ]);
});

test('publication dates must be real YYYY-MM-DD calendar dates', () => {
  assert.equal(isValidPublishedAt('2026-10-25'), true);
  assert.equal(isValidPublishedAt('2026-02-29'), false);
  assert.equal(isValidPublishedAt('2026-13-40'), false);
  assert.equal(isValidPublishedAt('2026-1-5'), false);
});

test('JSON-LD serialization escapes less-than characters', () => {
  const serialized = serializeJsonLd({ title: '</script><script>alert(1)</script>' });

  assert.doesNotMatch(serialized, /<\/script>/i);
  assert.match(serialized, /\\u003c\/script>/);
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
      content={'## Rendering test\n\n- [x] Markdown works\n\n```js\nconst answer = 42;\n```\n\n```mermaid\ngraph TD\n  A --> B\n```\n\n![Diagram](/blog/test/diagram.gif)\n\n<video controls><source src="/blog/test/demo.mp4" type="video/mp4" /></video>\n\n<pre>Plain raw text</pre>\n\n<pre><code>Raw code with trailing nodes</code>\n</pre>\n\n<img src="/image.png" onerror="alert(1)" />'}
    />
  );

  assert.match(markup, /id="rendering-test"/);
  assert.match(markup, /type="checkbox"/);
  assert.match(markup, /class="hljs/);
  assert.match(markup, /language-mermaid/);
  assert.match(markup, /alt="Diagram"/);
  assert.match(markup, /<video[^>]*controls/);
  assert.match(markup, /<source[^>]*demo\.mp4/);
  assert.match(markup, /Plain raw text/);
  assert.match(markup, /Raw code with trailing nodes/);
  assert.doesNotMatch(markup, /onerror|alert\(1\)/);
});
