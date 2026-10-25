import type { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  metadataBase: new URL('https://thetsajeet.com'),
  title: {
    default: 'Notes on software, AI, and the web',
    template: '%s | Ajeet’s Notes',
  },
  description: 'Practical notes and walkthroughs on software engineering, AI, and the web by T S Ajeet.',
  alternates: {
    canonical: '/blog/',
  },
  openGraph: {
    type: 'website',
    url: 'https://thetsajeet.com/blog/',
    siteName: 'Ajeet’s Notes',
    title: 'Notes on software, AI, and the web',
    description: 'Practical notes and walkthroughs on software engineering, AI, and the web by T S Ajeet.',
  },
};

export default function BlogLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <div className="blog-shell">
      <header className="blog-header">
        <Link className="blog-wordmark" href="/blog">
          <span className="blog-wordmark-mark">A.</span>
          <span>Ajeet <span className="blog-wordmark-muted">/ notes</span></span>
        </Link>
        <nav aria-label="Main navigation" className="blog-nav">
          <Link href="/blog">Writing</Link>
          <a href="https://thetsajeet.com/">Portfolio <span aria-hidden="true">↗</span></a>
        </nav>
      </header>
      {children}
      <footer className="blog-footer">
        <span>Thoughts on building for the web.</span>
        <span>© {new Date().getFullYear()} T S Ajeet</span>
      </footer>
    </div>
  );
}
