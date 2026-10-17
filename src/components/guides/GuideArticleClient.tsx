'use client';

import Link from 'next/link';

import ContentArticleShell, { ArticleSection } from '@/components/ContentArticleShell';
import { useDraftFitPreferences } from '@/hooks/useDraftFitPreferences';
import type { GuideEntry } from '@/lib/content';
import { GUIDES_RO } from '@/lib/guides.ro';

const UI = {
  en: {
    back: 'All guides',
    useTool: 'Use the calculation tool',
    related: 'Related standards',
    disclaimer:
      'DraftFit guides are engineering educational content and do not replace the controlled standard, project specification or responsible-engineer review.',
  },
  ro: {
    back: 'Toate ghidurile',
    useTool: 'Folosește instrumentul de calcul',
    related: 'Standarde asociate',
    disclaimer:
      'Ghidurile DraftFit sunt materiale educaționale de inginerie și nu înlocuiesc standardul controlat, specificația proiectului sau verificarea inginerului responsabil.',
  },
} as const;

type RelatedStandard = {
  slug: string;
  reference: string;
};

export default function GuideArticleClient({
  guide,
  relatedStandards,
}: {
  guide: GuideEntry;
  relatedStandards: RelatedStandard[];
}) {
  const { lang, isDark } = useDraftFitPreferences();
  const t = UI[lang];
  const translated = lang === 'ro' ? GUIDES_RO[guide.slug] : undefined;

  const title = translated?.title ?? guide.title;
  const description = translated?.description ?? guide.description;
  const eyebrow = translated?.eyebrow ?? guide.eyebrow;
  const calculatorLabel = translated?.calculatorLabel ?? guide.calculatorLabel;
  const sections = translated?.sections ?? guide.sections;

  return (
    <ContentArticleShell
      eyebrow={eyebrow}
      title={title}
      intro={description}
      backHref="/guides"
      backLabel={t.back}
      isDark={isDark}
      lang={lang}
    >
      <div className={`mb-6 border border-orange-500/30 p-5 md:p-6 ${isDark ? 'bg-orange-500/5' : 'bg-orange-50'}`}>
        <p className="text-xs font-black uppercase tracking-[0.16em] text-orange-500">{t.useTool}</p>
        <Link
          href={guide.calculatorHref}
          className={`mt-2 inline-block text-lg font-black hover:text-orange-500 ${isDark ? 'text-white' : 'text-zinc-950'}`}
        >
          {calculatorLabel} →
        </Link>
      </div>

      {sections.map((section) => (
        <ArticleSection key={section.heading} heading={section.heading} isDark={isDark}>
          {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          {section.bullets ? (
            <ul className={`list-disc space-y-2 pl-5 ${isDark ? 'text-zinc-300' : 'text-zinc-700'}`}>
              {section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}
            </ul>
          ) : null}
        </ArticleSection>
      ))}

      <section className={`mb-6 border p-5 md:p-8 ${
        isDark ? 'border-zinc-800 bg-zinc-900/60' : 'border-zinc-200 bg-white shadow-sm'
      }`}>
        <h2 className="text-xl font-black">{t.related}</h2>
        <div className="mt-4 flex flex-wrap gap-3">
          {relatedStandards.map((standard) => (
            <Link
              key={standard.slug}
              href={`/standards/${standard.slug}`}
              className={`border px-3 py-2 text-sm font-bold hover:border-orange-500 hover:text-orange-500 ${
                isDark ? 'border-zinc-700 text-zinc-300' : 'border-zinc-300 text-zinc-700'
              }`}
            >
              {standard.reference}
            </Link>
          ))}
        </div>
      </section>

      <p className={`mb-8 text-xs leading-5 ${isDark ? 'text-zinc-500' : 'text-zinc-600'}`}>
        {t.disclaimer}
      </p>
    </ContentArticleShell>
  );
}
