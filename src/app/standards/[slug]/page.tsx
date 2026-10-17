import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import ContentArticleShell, { ArticleSection } from '@/components/ContentArticleShell';
import { GUIDE_MAP, STANDARDS, getStandard } from '@/lib/content';
import { absoluteUrl, SITE_NAME } from '@/lib/site';
import { JsonLd } from '@/lib/seo';

export function generateStaticParams() {
  return STANDARDS.map((standard) => ({ slug: standard.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const standard = getStandard(slug);
  if (!standard) return {};

  return {
    title: standard.title,
    description: standard.description,
    alternates: { canonical: `/standards/${standard.slug}` },
    openGraph: {
      type: 'article',
      title: standard.title,
      description: standard.description,
      url: `/standards/${standard.slug}`,
      siteName: SITE_NAME,
    },
  };
}

export default async function StandardPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const standard = getStandard(slug);
  if (!standard) notFound();

  const relatedGuides = standard.guideSlugs
    .map((guideSlug) => GUIDE_MAP.get(guideSlug))
    .filter((item) => item !== undefined);

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'TechArticle',
    headline: standard.title,
    description: standard.description,
    url: absoluteUrl(`/standards/${standard.slug}`),
    author: { '@type': 'Organization', name: SITE_NAME },
    publisher: { '@type': 'Organization', name: SITE_NAME },
  };

  return (
    <>
      <JsonLd data={jsonLd} />
      <ContentArticleShell
        eyebrow="Standards reference"
        title={standard.title}
        intro={standard.description}
        backHref="/standards"
        backLabel="All standards"
      >
        <section className="mb-6 border border-orange-500/30 bg-orange-500/5 p-5 md:p-6">
          <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">Reference</p>
          <p className="mt-2 text-lg font-black">{standard.reference}</p>
          <p className="mt-3 text-sm leading-6 text-zinc-400">{standard.statusNote}</p>
        </section>

        {standard.sections.map((section) => (
          <ArticleSection key={section.heading} heading={section.heading}>
            {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
            {section.bullets ? (
              <ul className="list-disc space-y-2 pl-5">
                {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
              </ul>
            ) : null}
          </ArticleSection>
        ))}

        <section className="mb-6 grid gap-5 md:grid-cols-2">
          <div className="border border-zinc-800 bg-zinc-900/60 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">Calculator</p>
            <Link href={standard.calculatorHref} className="mt-2 inline-block text-lg font-black hover:text-orange-400">
              {standard.calculatorLabel} →
            </Link>
          </div>
          <div className="border border-zinc-800 bg-zinc-900/60 p-5 md:p-6">
            <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">Related guides</p>
            <div className="mt-3 space-y-2">
              {relatedGuides.map((guide) => (
                <Link key={guide.slug} href={`/guides/${guide.slug}`} className="block text-sm font-bold text-zinc-300 hover:text-orange-400">
                  {guide.title} →
                </Link>
              ))}
            </div>
          </div>
        </section>

        <p className="mb-8 text-xs leading-5 text-zinc-500">
          This page is an orientation aid, not a reproduction of the standard. Obtain and use the controlled standard required by your project.
        </p>
      </ContentArticleShell>
    </>
  );
}
