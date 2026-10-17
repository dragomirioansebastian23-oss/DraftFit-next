'use client';

import Link from 'next/link';

import ContentArticleShell from '@/components/ContentArticleShell';
import { useDraftFitPreferences } from '@/hooks/useDraftFitPreferences';
import { GUIDES } from '@/lib/content';
import { GUIDES_RO } from '@/lib/guides.ro';

const UI = {
  en: {
    eyebrow: 'Engineering knowledge base',
    title: 'Mechanical Engineering Guides',
    intro: 'Practical explanations that connect DraftFit calculator results to the engineering decisions behind them.',
    back: 'Home',
    read: 'Read guide',
  },
  ro: {
    eyebrow: 'Bază de cunoștințe inginerească',
    title: 'Ghiduri de inginerie mecanică',
    intro: 'Explicații practice care leagă rezultatele calculatoarelor DraftFit de deciziile inginerești din spatele lor.',
    back: 'Acasă',
    read: 'Citește ghidul',
  },
} as const;

export default function GuidesPageClient() {
  const { lang, isDark } = useDraftFitPreferences();
  const t = UI[lang];

  return (
    <ContentArticleShell
      eyebrow={t.eyebrow}
      title={t.title}
      intro={t.intro}
      backHref="/"
      backLabel={t.back}
      isDark={isDark}
      lang={lang}
    >
      <section className="grid gap-5 md:grid-cols-2">
        {GUIDES.map((guide) => {
          const translated = lang === 'ro' ? GUIDES_RO[guide.slug] : undefined;
          const title = translated?.title ?? guide.title;
          const description = translated?.description ?? guide.description;
          const eyebrow = translated?.eyebrow ?? guide.eyebrow;

          return (
            <Link
              key={guide.slug}
              href={`/guides/${guide.slug}`}
              className={`group border p-6 transition-colors ${
                isDark
                  ? 'border-zinc-800 bg-zinc-900/60 hover:border-zinc-600'
                  : 'border-zinc-200 bg-white shadow-sm hover:border-orange-400'
              }`}
            >
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">{eyebrow}</p>
              <h2 className="mt-3 text-xl font-black tracking-tight group-hover:text-orange-500">{title}</h2>
              <p className={`mt-3 text-sm leading-6 ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>{description}</p>
              <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-orange-500">{t.read} →</p>
            </Link>
          );
        })}
      </section>
    </ContentArticleShell>
  );
}
