import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://thetsajeet.com'),
  title: 'svg portfolio | ajeet',
  description: 'Portfolio of T S Ajeet, Senior Software Engineer specializing in resilient backends, modular UI architectures, and Agentic AI.',
  authors: [{ name: 'T S Ajeet', url: 'https://thetsajeet.com' }],
  creator: 'T S Ajeet',
  publisher: 'T S Ajeet',
  category: 'technology',
  classification: 'Software Engineering Portfolio',
  keywords: [
    'T S Ajeet',
    'Ajeet T S',
    'svg portfolio',
    'Senior Software Engineer',
    'Agentic AI',
    'Fullstack Engineer',
    'Distributed Systems',
    'UI Architecture',
    'Spring Boot',
    'Next.js',
    'React',
    'Go',
    'Golang',
    'gRPC',
    'Microservices',
    'Citi',
    'NIT Trichy'
  ],
  alternates: {
    canonical: 'https://thetsajeet.com/',
  },
  icons: {
    icon: [
      { url: '/favicon.svg', type: 'image/svg+xml' },
      { url: '/icon.svg', type: 'image/svg+xml' }
    ],
    shortcut: '/favicon.svg',
    apple: '/favicon.svg',
  },
  openGraph: {
    type: 'profile',
    url: 'https://thetsajeet.com/',
    title: 'svg portfolio | ajeet',
    description: 'Portfolio of T S Ajeet, Senior Software Engineer specializing in resilient backends, modular UI architectures, and Agentic AI.',
    siteName: 'T S Ajeet — svg portfolio',
    locale: 'en_US',
    images: [
      {
        url: 'https://thetsajeet.com/assets/aistudio/image_b4d68d89.png',
        secureUrl: 'https://thetsajeet.com/assets/aistudio/image_b4d68d89.png',
        width: 1200,
        height: 630,
        alt: 'T S Ajeet — Senior Software Engineer (Agentic AI & Fullstack)',
        type: 'image/png',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'svg portfolio | ajeet',
    description: 'Portfolio of T S Ajeet, Senior Software Engineer specializing in resilient backends, modular UI architectures, and Agentic AI.',
    site: '@iamtsajeet',
    creator: '@iamtsajeet',
    images: [
      {
        url: 'https://thetsajeet.com/assets/aistudio/image_b4d68d89.png',
        alt: 'T S Ajeet — Senior Software Engineer',
      },
    ],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: '#000000',
};

const jsonLdGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': 'https://thetsajeet.com/#person',
      name: 'T S Ajeet',
      alternateName: ['Ajeet T S', 'thetsajeet', 'Ajeet Tumuluru'],
      jobTitle: 'Senior Software Engineer',
      description: 'Senior Software Engineer specializing in resilient backends, modular UI architectures, Agentic AI, and distributed systems.',
      url: 'https://thetsajeet.com/',
      image: 'https://thetsajeet.com/assets/aistudio/image_b4d68d89.png',
      email: 'mailto:ajeet.tumuluru@gmail.com',
      sameAs: [
        'https://github.com/thetsajeet',
        'https://www.linkedin.com/in/thetsajeet',
        'https://x.com/iamtsajeet'
      ],
      worksFor: {
        '@type': 'Organization',
        name: 'Citi'
      },
      alumniOf: {
        '@type': 'EducationalOrganization',
        name: 'National Institute of Technology (NIT) Trichy'
      },
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Senior Software Engineer',
        occupationalCategory: '15-1252.00 - Software Developers'
      },
      award: [
        'Gold Award — Citi India Hackathon 2024',
        'Bronze Award — Leadership Excellence Citi 2023'
      ],
      knowsAbout: [
        'Agentic AI',
        'Autonomous LLM Agents',
        'Retrieval-Augmented Generation (RAG)',
        'Distributed Systems Architecture',
        'Modular UI Architecture',
        'Spring Boot',
        'Go (Golang)',
        'Node.js',
        'Next.js',
        'React',
        'TypeScript',
        'gRPC & Protocol Buffers',
        'PostgreSQL',
        'MongoDB',
        'Docker & Kubernetes'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': 'https://thetsajeet.com/#website',
      url: 'https://thetsajeet.com/',
      name: 'svg portfolio | ajeet',
      description: 'Portfolio of T S Ajeet, Senior Software Engineer specializing in resilient backends, modular UI architectures, and Agentic AI.',
      publisher: {
        '@id': 'https://thetsajeet.com/#person'
      },
      inLanguage: 'en-US'
    },
    {
      '@type': 'ProfilePage',
      '@id': 'https://thetsajeet.com/#profilepage',
      url: 'https://thetsajeet.com/',
      name: 'svg portfolio | ajeet',
      isPartOf: {
        '@id': 'https://thetsajeet.com/#website'
      },
      mainEntity: {
        '@id': 'https://thetsajeet.com/#person'
      },
      description: 'Executive software engineering portfolio showcasing high-scale distributed systems, modular UI architecture, and Agentic AI systems built by T S Ajeet.'
    },
    {
      '@type': 'ItemList',
      '@id': 'https://thetsajeet.com/#works',
      name: 'Featured Engineering Systems & Open Source Projects',
      itemListElement: [
        {
          '@type': 'SoftwareApplication',
          position: 1,
          name: 'Rege.ai — Agentic Resume & Career Engine',
          applicationCategory: 'BusinessApplication',
          operatingSystem: 'Web',
          url: 'https://regeai-eight.vercel.app/',
          description: 'Autonomous LLM agents that parse job descriptions and synthesize zero-hallucination CVs on the fly.'
        },
        {
          '@type': 'SoftwareApplication',
          position: 2,
          name: 'Citi Policies Portal & Smart Search',
          applicationCategory: 'EnterpriseApplication',
          operatingSystem: 'Web',
          description: 'Regulatory infrastructure powering 10,000+ Citi employees with modular UI architecture and sub-second filtering.'
        },
        {
          '@type': 'SoftwareSourceCode',
          position: 3,
          name: 'Spring Boot Database Validator',
          programmingLanguage: 'Java',
          codeRepository: 'https://github.com/thetsajeet/dbv-spring-boot-starter',
          description: 'Open-source Spring Boot auto-starter ensuring database schema integrity at boot.'
        },
        {
          '@type': 'SoftwareApplication',
          position: 4,
          name: 'Form Factory — Dynamic Schema Builder',
          applicationCategory: 'DeveloperApplication',
          operatingSystem: 'Web',
          url: 'https://form-factory-rosy.vercel.app/',
          description: 'Intuitive drag-and-drop form canvas with typed JSON schema export and reactive validation.'
        }
      ]
    }
  ]
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Instrument+Serif:ital@0;1&family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800&family=Press+Start+2P&family=Space+Grotesk:wght@400;500;600;700&family=Space+Mono:ital,wght@0,400;0,700;1,400&display=swap"
          rel="stylesheet"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdGraph) }}
        />
      </head>
      <body className="bg-white text-black antialiased selection:bg-neutral-900 selection:text-white">
        {children}
      </body>
    </html>
  );
}
