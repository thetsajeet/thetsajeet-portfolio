import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://thetsajeet.com'),
  title: 'Ajeet T S — Senior Software Engineer | UI, Backend & Agentic AI',
  description: 'Portfolio of Ajeet T S, Senior Software Engineer specializing in UI architecture, distributed backend systems, and Agentic AI.',
  authors: [{ name: 'Ajeet T S', url: 'https://thetsajeet.com' }],
  keywords: [
    'Ajeet T S',
    'Senior Software Engineer',
    'UI Architecture',
    'Distributed Backend',
    'Agentic AI',
    'Next.js',
    'React',
    'Spring Boot',
    'Go',
    'Citi',
    'NIT Trichy'
  ],
  alternates: {
    canonical: 'https://thetsajeet.com/',
  },
  openGraph: {
    type: 'profile',
    url: 'https://thetsajeet.com/',
    title: 'Ajeet T S — Senior Software Engineer | UI, Backend & Agentic AI',
    description: 'Portfolio of Ajeet T S, Senior Software Engineer specializing in UI architecture, distributed backend systems, and Agentic AI.',
    images: [{ url: '/assets/aistudio/image_b4d68d89.png' }],
    siteName: 'Ajeet T S Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ajeet T S — Senior Software Engineer | UI, Backend & Agentic AI',
    description: 'Portfolio of Ajeet T S, Senior Software Engineer specializing in UI architecture, distributed backend systems, and Agentic AI.',
    creator: '@iamtsajeet',
    images: ['/assets/aistudio/image_b4d68d89.png'],
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
};

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  name: 'Ajeet T S',
  alternateName: 'T S Ajeet',
  jobTitle: 'Senior Software Engineer',
  description: 'Senior Software Engineer working across UI, backend and Agentic AI.',
  url: 'https://thetsajeet.com/',
  image: 'https://thetsajeet.com/assets/aistudio/image_b4d68d89.png',
  sameAs: [
    'https://github.com/thetsajeet',
    'https://www.linkedin.com/in/thetsajeet',
    'https://x.com/iamtsajeet',
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'Citi',
  },
  alumniOf: {
    '@type': 'EducationalOrganization',
    name: 'National Institute of Technology (NIT) Trichy',
  },
  knowsAbout: [
    'UI Architecture',
    'Next.js',
    'React',
    'TypeScript',
    'Angular',
    'Spring Boot',
    'Microservices',
    'gRPC',
    'Agentic AI',
    'Distributed Systems',
    'Go',
    'PostgreSQL',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-white text-black antialiased selection:bg-neutral-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
