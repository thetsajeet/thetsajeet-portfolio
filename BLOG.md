# Blog

The blog is part of this Next.js project and lives at [`thetsajeet.com/blog`](https://thetsajeet.com/blog). It shares the portfolio's domain and Vercel deployment; no subdomain, separate project, or host-based routing is required.

## Writing a post

Create `content/blog/001-short-name.md`, `002-short-name.md`, and so on, using the next available number in release order. The numeric prefix is for organizing files and is omitted from the article URL: `001-short-name.md` becomes `/blog/short-name`. Keep the short name unique and stable so existing links continue to work. Use a unique positive `order` number to control the listing independently; lower numbers appear first.

```yaml
---
order: 1
title: "A useful title"
subtitle: "A short description for the article page."
category: "Engineering"
publishedAt: "2026-10-25"
excerpt: "A concise summary for the blog listing and search previews."
# Optional: store the image in public/blog/covers/ and use its public URL.
coverImage: "/blog/covers/my-post.webp"
coverAlt: "Describe the cover image for accessibility."
---
```

Write the article body in Markdown. GitHub Flavored Markdown is enabled, including tables, task lists, and strikethrough. Fenced code blocks are syntax-highlighted. Standard Markdown images work for images and GIFs.

The shared cover component reads the optional `coverImage` and `coverAlt` fields from frontmatter and displays the same image on the listing and article page. Keep cover images in `public/blog/covers/` (a 1200 × 630 WebP is a good default) and set meaningful alt text. Without a cover image, the site shows a neutral, category-based placeholder. No per-article CSS or component edits are needed.

Put other post media in `public/blog/<post-slug>/` and refer to it with its public URL, for example `![An architecture diagram](/blog/my-post/architecture.png)`. Native video and audio can be embedded with HTML:

```html
<video controls>
  <source src="/blog/my-post/walkthrough.mp4" type="video/mp4">
</video>
```

HTML is sanitized before rendering. The blog explicitly permits native video, source, and track elements; arbitrary embedded iframes and scripts are not rendered.

Posts are listed by `order` (lowest first), then by publication date for matching order values. Their reading time and table of contents are generated from the Markdown file, so no TypeScript changes are needed to publish another article.
