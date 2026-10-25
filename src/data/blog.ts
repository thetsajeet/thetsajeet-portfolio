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

function requiredDate(data: Record<string, unknown>, key: string, filePath: string) {
  const value = requiredString(data, key, filePath);

  if (!isValidPublishedAt(value)) {
    throw new Error(`Blog post "${filePath}" must define "${key}" as a valid YYYY-MM-DD date.`);
  }

  return value;
}

export function isValidPublishedAt(value: string) {
  const parsed = new Date(`${value}T00:00:00Z`);
  return /^\d{4}-\d{2}-\d{2}$/.test(value) &&
    !Number.isNaN(parsed.getTime()) &&
    parsed.toISOString().slice(0, 10) === value;
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

export function getHeadings(content: string): BlogHeading[] {
  const slugger = new GithubSlugger();
  const headings: BlogHeading[] = [];
  const lines = content.split('\n');
  const markdownLines: string[] = [];
  let fenceCharacter: '`' | '~' | undefined;
  let fenceLength = 0;

  for (const line of lines) {
    const fence = line.match(/^ {0,3}(`{3,}|~{3,})/);
    if (!fenceCharacter && fence) {
      fenceCharacter = fence[1][0] === '`' ? '`' : '~';
      fenceLength = fence[1].length;
      continue;
    }

    if (fenceCharacter) {
      const closingFence = line.match(/^ {0,3}(`+|~+)[ \t]*$/);
      if (closingFence && closingFence[1][0] === fenceCharacter && closingFence[1].length >= fenceLength) {
        fenceCharacter = undefined;
        fenceLength = 0;
      }
      continue;
    }

    markdownLines.push(line);
  }

  for (const match of markdownLines.join('\n').matchAll(headingPattern)) {
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
    publishedAt: requiredDate(data, 'publishedAt', fileName),
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
