import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowDown, ArrowUpRight, Clock3 } from 'lucide-react';
import { BlogCoverArt } from '@/components/BlogCoverArt';
import { getBlogPosts } from '@/data/blog';

export const metadata: Metadata = {
  title: 'Notes on software, AI, and the web',
  description: 'Practical notes and walkthroughs on software engineering, AI, and the web by T S Ajeet.',
  alternates: {
    canonical: '/blog/',
  },
};

export default function BlogHomePage() {
  const blogPosts = getBlogPosts();
  const featuredPost = blogPosts[0];

  if (!featuredPost) {
    return (
      <main className="blog-home">
        <section className="blog-intro">
          <p className="blog-eyebrow"><span className="blog-status-dot" /> Field notes for curious builders</p>
          <h1>Ideas worth <span className="blog-serif">thinking</span> through.</h1>
          <div className="blog-intro-bottom">
            <p>Practical thoughts on software, AI, and the little details that make the web work better.</p>
          </div>
        </section>
        <section className="blog-writing" id="writing">
          <div className="blog-section-heading"><h2>The writing</h2><span>COMING SOON</span></div>
          <p className="blog-empty">The first field note is on its way.</p>
        </section>
      </main>
    );
  }

  return (
    <main className="blog-home">
      <section className="blog-intro">
        <p className="blog-eyebrow"><span className="blog-status-dot" /> Field notes for curious builders</p>
        <h1>Ideas worth <span className="blog-serif">thinking</span> through.</h1>
        <div className="blog-intro-bottom">
          <p>Practical thoughts on software, AI, and the little details that make the web work better.</p>
          <a className="blog-scroll-link" href="#writing">Explore the writing <ArrowDown size={15} /></a>
        </div>
        <div className="blog-hero-index" aria-hidden="true">001—∞</div>
      </section>

      <section className="blog-writing" id="writing" aria-labelledby="writing-heading">
        <div className="blog-section-heading">
          <h2 id="writing-heading">The writing</h2>
          <span>{String(blogPosts.length).padStart(2, '0')} {blogPosts.length === 1 ? 'ARTICLE' : 'ARTICLES'}</span>
        </div>
        <Link className="blog-feature" href={`/blog/${featuredPost.slug}`}>
          <BlogCoverArt
            category={featuredPost.category}
            order={featuredPost.order}
            coverImage={featuredPost.coverImage}
            coverAlt={featuredPost.coverAlt}
            compact
          />
          <div className="blog-feature-copy">
            <div className="blog-post-meta">
              <span>{featuredPost.category}</span>
              <span>{new Date(`${featuredPost.publishedAt}T12:00:00`).toLocaleDateString('en', { month: 'short', day: 'numeric', year: 'numeric' })}</span>
            </div>
            <h3>{featuredPost.title}</h3>
            <p>{featuredPost.excerpt}</p>
            <div className="blog-feature-bottom">
              <span className="blog-reading-time"><Clock3 size={14} /> {featuredPost.readingTime}</span>
              <span className="blog-read-link">Read article <ArrowUpRight size={16} /></span>
            </div>
          </div>
        </Link>
      </section>

      <section className="blog-note">
        <span className="blog-note-mark">“</span>
        <p>Good interfaces make the next step <span className="blog-serif">obvious.</span></p>
        <span className="blog-note-caption">A principle for people and agents alike</span>
      </section>
    </main>
  );
}
