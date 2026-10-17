import Link from 'next/link';
import type { ReactNode } from 'react';

import SiteFooter from '@/components/SiteFooter';

export default function InfoPageShell({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children: ReactNode;
}) {
  return (
    <main id="main-content" tabIndex={-1} className="draftfit-content-page min-h-screen bg-zinc-950 text-zinc-100">
      <div className="draftfit-safe-wrap mx-auto max-w-5xl px-4 py-7 sm:px-5 md:px-8 md:py-12">
        <header className="mb-10 border-b border-zinc-800 pb-8">
          <Link
            href="/"
            className="mb-7 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-400 hover:text-white"
          >
            <span className="h-6 w-1 bg-orange-600" />
            <span>
              Draft<span className="text-orange-500">Fit</span>
            </span>
          </Link>

          <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-orange-500">
            {eyebrow}
          </p>

          <h1 className="text-4xl font-black tracking-tight md:text-6xl">
            {title}
          </h1>

          <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg">
            {intro}
          </p>
        </header>

        {children}

        <SiteFooter />
      </div>
    </main>
  );
}

export function InfoSection({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="mb-6 border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
      <h2 className="text-xl font-black tracking-tight">{title}</h2>
      <div className="mt-4 space-y-3 text-sm leading-7 text-zinc-300">
        {children}
      </div>
    </section>
  );
}
