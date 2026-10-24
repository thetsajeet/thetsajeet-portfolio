import { HomePageClient } from './HomePageClient';

interface HomePageProps {
  searchParams: Promise<{ autostart?: string | string[] }>;
}

export default async function HomePage({ searchParams }: HomePageProps) {
  const { autostart } = await searchParams;

  return <HomePageClient initialHasEntered={autostart === '1'} />;
}
