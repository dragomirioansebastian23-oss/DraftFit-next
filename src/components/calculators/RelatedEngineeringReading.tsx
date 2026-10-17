"use client";

import Link from 'next/link';
import { useSyncExternalStore } from 'react';

type Language = 'en' | 'ro';
type Theme = 'dark' | 'light';
type CalculatorId = 'iso286' | 'oring' | 'gdt' | 'threads' | 'keys';

type ReadingItem = {
  href: string;
  en: string;
  ro: string;
};

const READING: Record<CalculatorId, ReadingItem[]> = {
  iso286: [
    { href: '/guides/h7-g6-fit-explained', en: 'H7/g6 fit explained', ro: 'Ajustajul H7/g6 explicat' },
    { href: '/guides/clearance-transition-interference-fits', en: 'Clearance vs transition vs interference', ro: 'Joc vs tranziție vs interferență' },
    { href: '/standards/iso-286', en: 'ISO 286 reference', ro: 'Referință ISO 286' },
  ],
  oring: [
    { href: '/guides/o-ring-squeeze-explained', en: 'O-ring squeeze explained', ro: 'Compresia O-ring explicată' },
    { href: '/guides/o-ring-groove-3-53-mm-guide', en: '3.53 mm groove guide', ro: 'Ghid canal pentru O-ring de 3,53 mm' },
    { href: '/standards/iso-3601', en: 'ISO 3601 reference', ro: 'Referință ISO 3601' },
  ],
  gdt: [
    { href: '/guides/gdt-position-vs-concentricity', en: 'Position vs concentricity', ro: 'Poziție vs concentricitate' },
    { href: '/standards/iso-1101', en: 'ISO 1101 reference', ro: 'Referință ISO 1101' },
    { href: '/standards/asme-y14-5', en: 'ASME Y14.5 reference', ro: 'Referință ASME Y14.5' },
  ],
  threads: [
    { href: '/guides/bolt-preload-vs-torque', en: 'Bolt preload vs torque', ro: 'Prestrângere șurub vs cuplu' },
    { href: '/guides/m10-bolt-torque-guide', en: 'M10 bolt torque guide', ro: 'Ghid cuplu de strângere M10' },
    { href: '/standards/iso-898-1', en: 'ISO 898-1 reference', ro: 'Referință ISO 898-1' },
    { href: '/standards/iso-273', en: 'ISO 273 reference', ro: 'Referință ISO 273' },
  ],
  keys: [
    { href: '/guides/parallel-key-shear-vs-bearing-pressure', en: 'Key shear vs bearing pressure', ro: 'Forfecare pană vs presiune de contact' },
    { href: '/guides/din-6885-key-size-35-mm-shaft', en: '35 mm shaft key size', ro: 'Dimensiune pană pentru arbore de 35 mm' },
    { href: '/standards/din-6885', en: 'DIN 6885 reference', ro: 'Referință DIN 6885' },
  ],
};

function getSnapshot(): string {
  if (typeof document === 'undefined') return 'en|dark';
  const lang: Language = document.documentElement.lang === 'ro' ? 'ro' : 'en';
  const theme: Theme = document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
  return `${lang}|${theme}`;
}

function subscribe(callback: () => void) {
  if (typeof document === 'undefined') return () => undefined;

  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ['lang', 'data-theme'],
  });

  return () => observer.disconnect();
}

export default function RelatedEngineeringReading({ calculator }: { calculator: CalculatorId }) {
  const snapshot = useSyncExternalStore(subscribe, getSnapshot, () => 'en|dark');
  const [langValue, themeValue] = snapshot.split('|') as [Language, Theme];
  const lang = langValue === 'ro' ? 'ro' : 'en';
  const isDark = themeValue !== 'light';

  const border = isDark ? 'border-zinc-800' : 'border-zinc-300';
  const heading = isDark ? 'text-zinc-100' : 'text-zinc-950';
  const linkStyle = isDark
    ? 'border-zinc-800 bg-zinc-900/60 text-zinc-300 hover:border-orange-500 hover:text-orange-400'
    : 'border-zinc-300 bg-white text-zinc-700 shadow-sm hover:border-orange-500 hover:text-orange-600';

  return (
    <section className="mx-auto max-w-7xl px-4 pb-10 sm:px-5 md:px-8 print:hidden">
      <div className={`border-t pt-6 transition-colors ${border}`}>
        <h2 className={`text-lg font-black transition-colors ${heading}`}>
          {lang === 'ro' ? 'Lecturi inginerești conexe' : 'Related engineering reading'}
        </h2>
        <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {READING[calculator].map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`border p-4 text-sm font-bold transition-colors ${linkStyle}`}
            >
              {item[lang]} →
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
