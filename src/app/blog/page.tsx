import type { Metadata } from 'next';
import { ArrowDown } from 'lucide-react';
import { BlogPostCard } from '@/components/BlogPostCard';
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
  const [featuredPost, ...remainingPosts] = blogPosts;

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
        <BlogPostCard post={featuredPost} featured />
        {remainingPosts.map((post) => <BlogPostCard key={post.slug} post={post} />)}
      </section>

      <section className="blog-note">
        <span className="blog-note-mark">“</span>
        <p>Good interfaces make the next step <span className="blog-serif">obvious.</span></p>
        <span className="blog-note-caption">A principle for people and agents alike</span>
      </section>
    </main>
  );
}
