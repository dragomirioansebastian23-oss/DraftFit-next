import type { Metadata } from 'next';
import Link from 'next/link';

import SiteFooter from '@/components/SiteFooter';

import { CALCULATORS } from '@/lib/calculators';

import {
  calculatorsCollectionJsonLd,
  JsonLd,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: 'Mechanical Engineering Calculators',

  description:
    'Free mechanical engineering calculators for ISO fits, O-rings, GD&T, metric threads, bolt preload and parallel keys.',

  alternates: {
    canonical: '/calculators',
  },

  keywords: [
    'mechanical engineering calculators',
    'engineering design tools',
    'ISO fit calculator',
    'O-ring calculator',
    'GD&T calculator',
    'thread calculator',
    'parallel key calculator',
  ],

  openGraph: {
    type: 'website',
    title: 'Mechanical Engineering Calculators',
    description:
      'Engineering calculators for fits, seals, GD&T, threads, bolts and shaft connections.',
    url: '/calculators',
  },
};

const ACCENT_CLASSES = {
  orange: 'border-orange-500/35 text-orange-500',
  red: 'border-red-500/35 text-red-500',
  blue: 'border-blue-500/35 text-blue-500',
  cyan: 'border-cyan-500/35 text-cyan-500',
  emerald: 'border-emerald-500/35 text-emerald-500',
} as const;

export default function CalculatorsPage() {
  return (
    <>
      <JsonLd data={calculatorsCollectionJsonLd()} />

      <main id="main-content" tabIndex={-1} className="draftfit-content-page min-h-screen bg-zinc-950 text-zinc-100">
        <div className="draftfit-safe-wrap mx-auto max-w-7xl px-4 py-7 sm:px-5 md:px-8 md:py-12">
          <header className="mb-10 border-b border-zinc-800 pb-8">
            <Link
              href="/"
              className="mb-7 inline-flex items-center gap-3 text-sm font-black uppercase tracking-[0.18em] text-zinc-400 transition-colors hover:text-white"
            >
              <span className="h-6 w-1 bg-orange-600" />
              <span>
                Draft<span className="text-orange-500">Fit</span>
              </span>
            </Link>

            <p className="mb-3 text-xs font-black uppercase tracking-[0.22em] text-orange-500">
              Engineering toolkit
            </p>

            <h1 className="max-w-4xl text-3xl font-black tracking-tight sm:text-4xl md:text-6xl">
              Mechanical Engineering Calculators
            </h1>

            <p className="mt-5 max-w-3xl text-base leading-7 text-zinc-400 md:text-lg">
              Practical calculation tools for mechanical design, tolerancing,
              sealing, fasteners and shaft connections. Start with the result,
              then inspect the engineering basis and assumptions inside each tool.
            </p>
          </header>

          <section
            aria-label="Engineering calculators"
            className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {CALCULATORS.map((calculator) => {
              const accent =
                ACCENT_CLASSES[calculator.accent];

              return (
                <Link
                  key={calculator.id}
                  href={calculator.href}
                  className="group flex min-h-[260px] flex-col border border-zinc-800 bg-zinc-900 p-6 transition-colors hover:border-zinc-600 hover:bg-zinc-900/80"
                >
                  <div
                    className={`mb-5 w-fit border px-2.5 py-1 text-[10px] font-black uppercase tracking-[0.18em] ${accent}`}
                  >
                    {calculator.eyebrow}
                  </div>

                  <h2 className="text-2xl font-black tracking-tight text-white transition-colors group-hover:text-orange-400">
                    {calculator.title}
                  </h2>

                  <p className="mt-4 flex-1 text-sm leading-6 text-zinc-400">
                    {calculator.description}
                  </p>

                  <div className="mt-6 border-t border-zinc-800 pt-4">
                    <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                      Engineering basis
                    </p>

                    <p className="mt-1 text-xs font-semibold text-zinc-300">
                      {calculator.standards}
                    </p>
                  </div>

                  <div className="mt-5 text-xs font-black uppercase tracking-[0.16em] text-orange-500">
                    Open calculator →
                  </div>
                </Link>
              );
            })}
          </section>

          <section className="mt-10 border border-zinc-800 bg-zinc-900/60 p-6 md:p-8">
            <h2 className="text-lg font-black">
              Built for fast engineering work
            </h2>

            <p className="mt-3 max-w-4xl text-sm leading-6 text-zinc-400">
              DraftFit calculators are engineering aids. Standard-derived data,
              simplified estimates and assumptions are identified inside each tool.
              Safety-critical designs still require project-specific engineering
              verification and the applicable standards.
            </p>
          </section>

          <SiteFooter />
        </div>
      </main>
    </>
  );
}
