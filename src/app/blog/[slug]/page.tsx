import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ArrowLeft, Clock3 } from 'lucide-react';
import { BlogCoverArt } from '@/components/BlogCoverArt';
import { BlogMarkdown } from '@/components/BlogMarkdown';
import { getBlogPost, getBlogPosts } from '@/data/blog';
import { serializeJsonLd } from '@/utils/json-ld';

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return getBlogPosts().map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.excerpt,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: 'article',
      title: post.title,
      description: post.excerpt,
      publishedTime: new Date(`${post.publishedAt}T12:00:00Z`).toISOString(),
      authors: ['T S Ajeet'],
      url: `https://thetsajeet.com/blog/${post.slug}`,
    },
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getBlogPost(slug);

  if (!post) {
    notFound();
  }

  const postUrl = `https://thetsajeet.com/blog/${post.slug}`;
  const articleJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: post.title,
    description: post.excerpt,
    datePublished: new Date(`${post.publishedAt}T12:00:00Z`).toISOString(),
    author: {
      '@type': 'Person',
      name: 'T S Ajeet',
      url: 'https://thetsajeet.com/',
    },
    mainEntityOfPage: postUrl,
    url: postUrl,
  };

  return (
    <main className="blog-article">
      <Link className="blog-back-link" href="/blog">
        <ArrowLeft size={15} /> All writing
      </Link>
      <article>
        <header className="blog-article-header">
          <div className="blog-post-meta">
            <span>{post.category}</span>
            <span>{new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString('en', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
            <span className="blog-reading-time"><Clock3 size={14} /> {post.readingTime}</span>
          </div>
          <h1>{post.title}</h1>
          <p className="blog-article-subtitle">{post.subtitle}</p>
          <div className="blog-author">
            <span className="blog-author-avatar">A.</span>
            <span><strong>T S Ajeet</strong><small>Software engineer & curious builder</small></span>
          </div>
        </header>
        <BlogCoverArt
          category={post.category}
          order={post.order}
          coverImage={post.coverImage}
          coverAlt={post.coverAlt}
        />
        <div className="blog-article-layout">
          <aside className="blog-article-aside">
            <span>IN THIS ARTICLE</span>
            <ol>
              {post.headings.map((heading) => (
                <li className={heading.depth === 3 ? 'blog-toc-subheading' : undefined} key={heading.id}>
                  <a href={`#${heading.id}`}>{heading.text}</a>
                </li>
              ))}
            </ol>
          </aside>
          <div>
            <BlogMarkdown content={post.content} excerpt={post.excerpt} />
            <div className="blog-article-end">
              <span>END OF ARTICLE</span>
              <Link href="/blog">More writing <span aria-hidden="true">↗</span></Link>
            </div>
          </div>
        </div>
      </article>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: serializeJsonLd(articleJsonLd) }}
      />
    </main>
  );
}
