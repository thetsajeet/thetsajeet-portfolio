import React from 'react';
import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import rehypeRaw from 'rehype-raw';
import rehypeSanitize, { defaultSchema } from 'rehype-sanitize';
import rehypeSlug from 'rehype-slug';
import remarkGfm from 'remark-gfm';
import { MermaidDiagram } from './MermaidDiagram';

const blogSchema = {
  ...defaultSchema,
  tagNames: [...(defaultSchema.tagNames ?? []), 'video', 'source', 'track'],
  attributes: {
    ...defaultSchema.attributes,
    video: ['controls', 'autoplay', 'loop', 'muted', 'playsInline', 'poster', 'src', 'width', 'height'],
    source: ['src', 'type', 'media'],
    track: ['kind', 'src', 'srcLang', 'label', 'default'],
  },
};

export function BlogMarkdown({ content, excerpt }: { content: string; excerpt: string }) {
  return (
    <div className="blog-article-body">
      <p className="blog-article-lede">{excerpt}</p>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        rehypePlugins={[
          rehypeRaw,
          [rehypeSanitize, blogSchema],
          rehypeSlug,
          rehypeHighlight,
        ]}
        components={{
          h2: ({ children, ...props }) => <h2 className="blog-article-section-heading" {...props}>{children}</h2>,
          h3: ({ children, ...props }) => <h3 className="blog-article-subheading" {...props}>{children}</h3>,
          pre: ({ children }) => {
            const codeElement = React.Children.only(children);
            if (
              React.isValidElement<{ className?: string; children?: React.ReactNode }>(codeElement) &&
              codeElement.props.className?.split(/\s+/).includes('language-mermaid')
            ) {
              const chart = React.Children.toArray(codeElement.props.children)
                .map((child) => typeof child === 'string' ? child : '')
                .join('');
              return <MermaidDiagram chart={chart.trimEnd()} />;
            }
            return <pre>{children}</pre>;
          },
          a: ({ href, children, ...props }) => (
            <a href={href} {...props} rel={href?.startsWith('http') ? 'noreferrer' : undefined} target={href?.startsWith('http') ? '_blank' : undefined}>
              {children}
            </a>
          ),
          video: ({ children, ...props }) => <video className="blog-article-video" controls preload="metadata" {...props}>{children}</video>,
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
