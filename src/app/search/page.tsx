import type { Metadata } from 'next';

import ContentArticleShell from '@/components/ContentArticleShell';
import SearchPageClient from '@/components/SearchPageClient';

export const metadata: Metadata = {
  title: 'Search DraftFit',
  description:
    'Search DraftFit mechanical engineering calculators, guides and standards references.',
  robots: {
    index: false,
    follow: true,
  },
};

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string | string[] }>;
}) {
  const params = await searchParams;
  const rawQuery = Array.isArray(params.q) ? params.q[0] : params.q;
  const initialQuery = rawQuery?.slice(0, 160) ?? '';

  return (
    <ContentArticleShell
      eyebrow="Internal search"
      title="Search DraftFit"
      intro="Find calculators, practical engineering guides, standards references and DraftFit support pages."
      backHref="/"
      backLabel="Home"
    >
      <SearchPageClient initialQuery={initialQuery} />
    </ContentArticleShell>
  );
}
