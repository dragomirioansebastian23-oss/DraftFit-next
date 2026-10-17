import Link from 'next/link';
import type { ReactNode } from 'react';

import SiteFooter from '@/components/SiteFooter';

type ContentLanguage = 'en' | 'ro';

export default function ContentArticleShell({
  eyebrow,
  title,
  intro,
  backHref,
  backLabel,
  children,
  isDark = true,
  lang = 'en',
}: {
  eyebrow: string;
  title: string;
  intro: string;
  backHref: string;
  backLabel: string;
  children: ReactNode;
  isDark?: boolean;
  lang?: ContentLanguage;
}) {
  const page = isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-100 text-zinc-950';
  const headerBorder = isDark ? 'border-zinc-800' : 'border-zinc-300';
  const brandText = isDark ? 'text-zinc-400 hover:text-white' : 'text-zinc-600 hover:text-zinc-950';
  const backText = isDark ? 'text-zinc-500' : 'text-zinc-600';
  const introText = isDark ? 'text-zinc-400' : 'text-zinc-600';

  return (
    <main
      id="main-content"
      tabIndex={-1}
      className={`draftfit-content-page min-h-screen outline-none transition-colors ${page}`}
    >
      <div className="draftfit-safe-wrap mx-auto max-w-5xl px-4 py-8 sm:px-5 md:px-8 md:py-12">
        <header className={`mb-10 border-b pb-8 ${headerBorder}`}>
          <Link
            href="/"
            className={`mb-5 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] ${brandText}`}
          >
            <span className="h-6 w-1 bg-orange-600" />
            <span>
              Draft<span className="text-orange-500">Fit</span>
            </span>
          </Link>

          <div>
            <Link
              href={backHref}
              className={`text-xs font-black uppercase tracking-[0.16em] hover:text-orange-500 ${backText}`}
            >
              ← {backLabel}
            </Link>
          </div>

          <p className="mb-3 mt-7 text-xs font-black uppercase tracking-[0.22em] text-orange-500">
            {eyebrow}
          </p>
          <h1 className="max-w-4xl text-4xl font-black tracking-tight md:text-6xl">{title}</h1>
          <p className={`mt-5 max-w-3xl text-base leading-7 md:text-lg ${introText}`}>{intro}</p>
        </header>

        {children}
        <SiteFooter isDark={isDark} lang={lang} />
      </div>
    </main>
  );
}

export function ArticleSection({
  heading,
  children,
  isDark = true,
}: {
  heading: string;
  children: ReactNode;
  isDark?: boolean;
}) {
  return (
    <section
      className={`mb-6 border p-5 sm:p-6 md:p-8 ${
        isDark ? 'border-zinc-800 bg-zinc-900/60' : 'border-zinc-200 bg-white shadow-sm'
      }`}
    >
      <h2 className="text-xl font-black tracking-tight md:text-2xl">{heading}</h2>
      <div
        className={`mt-4 space-y-4 text-sm leading-7 md:text-base ${
          isDark ? 'text-zinc-300' : 'text-zinc-700'
        }`}
      >
        {children}
      </div>
    </section>
  );
}
