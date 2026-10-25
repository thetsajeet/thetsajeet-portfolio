import Image from 'next/image';

interface BlogCoverArtProps {
  category: string;
  order: number;
  coverImage?: string;
  coverAlt?: string;
  compact?: boolean;
}

export function BlogCoverArt({ category, order, coverImage, coverAlt, compact = false }: BlogCoverArtProps) {
  return (
    <div className={`blog-cover-art${compact ? ' blog-cover-art-compact' : ''}`}>
      {coverImage && coverAlt ? (
        <Image
          className="blog-cover-image"
          src={coverImage}
          alt={coverAlt}
          fill
          sizes={compact ? '(max-width: 700px) 100vw, 45vw' : '(max-width: 700px) 100vw, 1120px'}
        />
      ) : (
        <div className="blog-cover-placeholder" role="img" aria-label={`${category} article cover placeholder`}>
          <span className="blog-cover-placeholder-orbit" aria-hidden="true" />
          <span className="blog-cover-placeholder-letter" aria-hidden="true">{category.slice(0, 1).toUpperCase()}</span>
          <span className="blog-cover-placeholder-caption">{category} / ARTICLE {String(order).padStart(2, '0')}</span>
        </div>
      )}
    </div>
  );
}
