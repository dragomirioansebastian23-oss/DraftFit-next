import type { Metadata } from 'next';
import { notFound } from 'next/navigation';

import GuideArticleClient from '@/components/guides/GuideArticleClient';
import { GUIDES, STANDARD_MAP, getGuide } from '@/lib/content';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { JsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return GUIDES.map((guide) => ({ slug: guide.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) return {};

  return {
    title: guide.title,
    description: guide.description,
    keywords: guide.keywords,
    alternates: { canonical: `/guides/${guide.slug}` },
    openGraph: {
      type: 'article',
      title: guide.title,
      description: guide.description,
      url: `/guides/${guide.slug}`,
      siteName: SITE_NAME,
    },
  };
}

export default async function GuidePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const guide = getGuide(slug);
  if (!guide) notFound();

  const relatedStandards = guide.standardSlugs
    .map((standardSlug) => STANDARD_MAP.get(standardSlug))
    .filter((item) => item !== undefined)
    .map((standard) => ({ slug: standard.slug, reference: standard.reference }));

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: guide.title,
    description: guide.description,
    url: absoluteUrl(`/guides/${guide.slug}`),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
    mainEntityOfPage: absoluteUrl(`/guides/${guide.slug}`),
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <GuideArticleClient guide={guide} relatedStandards={relatedStandards} />
    </>
  );
}
