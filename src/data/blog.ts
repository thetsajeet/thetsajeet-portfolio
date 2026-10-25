import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import GithubSlugger from 'github-slugger';

export interface BlogHeading {
  depth: number;
  id: string;
  text: string;
}

export interface BlogPost {
  slug: string;
  order: number;
  title: string;
  subtitle: string;
  category: string;
  publishedAt: string;
  coverImage?: string;
  coverAlt?: string;
  readingTime: string;
  excerpt: string;
  content: string;
  headings: BlogHeading[];
}

const contentDirectory = path.join(process.cwd(), 'content', 'blog');
const headingPattern = /^(#{2,3})\s+(.+?)\s*#*\s*$/gm;

function requiredString(data: Record<string, unknown>, key: string, filePath: string) {
  const value = data[key];
  if (typeof value !== 'string' || value.trim() === '') {
    throw new Error(`Blog post "${filePath}" must define a non-empty "${key}" field in its frontmatter.`);
  }
  return value.trim();
}

function requiredOrder(data: Record<string, unknown>, filePath: string) {
  const order = data.order;
  if (typeof order !== 'number' || !Number.isInteger(order) || order < 1) {
    throw new Error(`Blog post "${filePath}" must define a positive integer "order" field in its frontmatter.`);
  }
  return order;
}

function getCoverDetails(data: Record<string, unknown>, filePath: string) {
  const coverImage = data.coverImage;
  const coverAlt = data.coverAlt;

  if (coverImage === undefined && coverAlt === undefined) {
    return {};
  }

  if (
    typeof coverImage !== 'string' ||
    !/^\/blog\/covers\/[a-zA-Z0-9/_-]+\.(?:avif|jpe?g|png|webp)$/i.test(coverImage) ||
    coverImage.includes('..')
  ) {
    throw new Error(`Blog post "${filePath}" must use a local image under "/blog/covers/" for "coverImage".`);
  }

  if (typeof coverAlt !== 'string' || coverAlt.trim() === '') {
    throw new Error(`Blog post "${filePath}" must define a non-empty "coverAlt" when "coverImage" is set.`);
  }

  return { coverImage, coverAlt: coverAlt.trim() };
}

function getHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];

  for (const match of content.matchAll(headingPattern)) {
    const text = match[2].replace(/`([^`]*)`/g, '$1').replace(/\[([^\]]+)\]\([^)]+\)/g, '$1');
    headings.push({
      depth: match[1].length,
      id: slugger.slug(text),
      text,
    });
  }

  return headings;
}

function readPost(fileName: string): BlogPost {
  const filePath = path.join(contentDirectory, fileName);
  const { data, content } = matter(readFileSync(filePath, 'utf8'));
  const slug = path.basename(fileName, '.md');
  const wordCount = content.trim().split(/\s+/).filter(Boolean).length;
  const coverDetails = getCoverDetails(data, fileName);

  return {
    slug,
    order: requiredOrder(data, fileName),
    title: requiredString(data, 'title', fileName),
    subtitle: requiredString(data, 'subtitle', fileName),
    category: requiredString(data, 'category', fileName),
    publishedAt: requiredString(data, 'publishedAt', fileName),
    ...coverDetails,
    excerpt: requiredString(data, 'excerpt', fileName),
    readingTime: `${Math.max(1, Math.ceil(wordCount / 200))} min read`,
    content: content.trim(),
    headings: getHeadings(content),
  };
}

export function getBlogPosts(): BlogPost[] {
  return readdirSync(contentDirectory)
    .filter((fileName) => fileName.endsWith('.md'))
    .map(readPost)
    .sort((first, second) => first.order - second.order || second.publishedAt.localeCompare(first.publishedAt) || first.slug.localeCompare(second.slug));
}

export function getBlogPost(slug: string) {
  return getBlogPosts().find((post) => post.slug === slug);
}
