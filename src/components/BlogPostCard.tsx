import Link from 'next/link';
import { ArrowUpRight, Clock3 } from 'lucide-react';
import type { BlogPost } from '@/data/blog';
import { BlogCoverArt } from './BlogCoverArt';

export function BlogPostCard({ post, featured = false }: { post: BlogPost; featured?: boolean }) {
  return (
    <Link
      className={`blog-feature${featured ? '' : ' blog-feature-secondary'}`}
      href={`/blog/${post.slug}`}
    >
      <BlogCoverArt
        category={post.category}
        order={post.order}
        coverImage={post.coverImage}
        coverAlt={post.coverAlt}
        compact
      />
      <div className="blog-feature-copy">
        <div className="blog-post-meta">
          <span>{post.category}</span>
          <span>{new Date(`${post.publishedAt}T12:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
        </div>
        <h3>{post.title}</h3>
        <p>{post.excerpt}</p>
        <div className="blog-feature-bottom">
          <span className="blog-reading-time"><Clock3 size={14} /> {post.readingTime}</span>
          <span className="blog-read-link">Read article <ArrowUpRight size={16} /></span>
        </div>
      </div>
    </Link>
  );
}
