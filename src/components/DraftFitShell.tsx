"use client";

import Link from 'next/link';
import SiteFooter from '@/components/SiteFooter';
import ResponsiveSiteHeader from '@/components/ResponsiveSiteHeader';
import { useEffect, useId, useRef, useState } from 'react';
import { safeStorageGet, safeStorageSet } from '@/lib/safeBrowserStorage';

const TRANSLATIONS = {
  en: {
    brandTag: 'Engineering Toolkit',
    subtitle: 'Engineering Tools for Mechanical Design',
    nav: {
      iso286: '📐 Fits',
      oring: '⭕ O-Rings',
      gdt: '🎯 GD&T',
      threads: '🔩 Threads',
      keys: '🔑 Keys',
    },
    projectBar: {
      partName: 'Part Name',
      partPlaceholder: 'e.g. Shaft',
      drawingNo: 'Drawing No.',
      drawingPlaceholder: 'e.g. DRW-001',
      engineer: 'Engineer',
      engineerPlaceholder: 'Name',
    },
    heroEyebrow: 'DraftFit engineering platform',
    heroTitle: 'Mechanical engineering tools, rebuilt for the web.',
    heroText:
      'The Next.js foundation is ready. All five engineering calculators are now available on dedicated routes.',
    status: 'Calculators online',
    allCalculators: 'Browse all calculators',
  },
  ro: {
    brandTag: 'Engineering Toolkit',
    subtitle: 'Instrumente de calcul pentru proiectare mecanică',
    nav: {
      iso286: '📐 Ajustaje',
      oring: '⭕ O-Ringuri',
      gdt: '🎯 GD&T',
      threads: '🔩 Filete',
      keys: '🔑 Pene',
    },
    projectBar: {
      partName: 'Nume Reper',
      partPlaceholder: 'ex: Arbore',
      drawingNo: 'Nr. Desen',
      drawingPlaceholder: 'ex: DRW-01',
      engineer: 'Proiectant',
      engineerPlaceholder: 'Nume',
    },
    heroEyebrow: 'Platformă inginerească DraftFit',
    heroTitle: 'Instrumente de inginerie mecanică, reconstruite pentru web.',
    heroText:
      'Fundația Next.js este pregătită. Toate cele cinci calculatoare inginerești sunt acum disponibile pe rute dedicate.',
    status: 'Calculatoare active',
    allCalculators: 'Vezi toate calculatoarele',
  },
} as const;

type Language = keyof typeof TRANSLATIONS;
type Theme = 'dark' | 'light';

const MODULES = ['iso286', 'oring', 'gdt', 'threads', 'keys'] as const;

export default function DraftFitShell() {
  // IMPORTANT:
  // Server render and first client render must use the same values.
  // Saved browser preferences are restored only after hydration.
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('en');

  const preferencesLoaded = useRef(false);

  const [partName, setPartName] = useState('');
  const [drawingNo, setDrawingNo] = useState('');
  const [engineerName, setEngineerName] = useState('');

  useEffect(() => {
    const storedTheme = safeStorageGet('draftfit-theme');
    const storedLanguage = safeStorageGet('draftfit-language');

    const frame = window.requestAnimationFrame(() => {
      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
      }

      if (storedLanguage === 'ro' || storedLanguage === 'en') {
        setLang(storedLanguage);
      }

      preferencesLoaded.current = true;
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded.current) return;

    safeStorageSet('draftfit-theme', theme);
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  useEffect(() => {
    if (!preferencesLoaded.current) return;

    safeStorageSet('draftfit-language', lang);
    document.documentElement.lang = lang;
  }, [lang]);

  const isDark = theme === 'dark';
  const t = TRANSLATIONS[lang];

  const page =
    isDark
      ? 'bg-zinc-950 text-zinc-100'
      : 'bg-zinc-100 text-zinc-950';

  const card =
    isDark
      ? 'bg-zinc-900 border-zinc-800'
      : 'bg-white border-zinc-200 shadow-sm';

  const muted =
    isDark ? 'text-zinc-400' : 'text-zinc-600';

  const control =
    isDark
      ? 'bg-zinc-900 border-zinc-800'
      : 'bg-white border-zinc-300 shadow-sm';

  return (
    <main id="main-content" tabIndex={-1} className={`min-h-screen transition-colors ${page}`}>
      <div className="mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-6 md:px-8 md:py-8">

        <ResponsiveSiteHeader
          isDark={isDark}
          lang={lang}
          theme={theme}
          subtitle={t.subtitle}
          setLang={setLang}
          setTheme={setTheme}
        />

        <section
          className={`mb-4 grid grid-cols-2 gap-2 border p-2 sm:mb-6 sm:grid-cols-3 lg:grid-cols-5 ${control}`}
        >
          {MODULES.map((moduleId) => {
            const routes: Partial<Record<(typeof MODULES)[number], string>> = {
              iso286: '/calculators/iso-286-fit-calculator',
              oring: '/calculators/o-ring-groove-calculator',
              gdt: '/calculators/gdt-reference-calculator',
              threads: '/calculators/metric-thread-bolt-calculator',
              keys: '/calculators/parallel-key-calculator',
            };

            const href = routes[moduleId];

            return href ? (
              <Link
                key={moduleId}
                href={href}
                className="flex min-h-11 items-center justify-center bg-orange-600 px-3 py-2 text-center text-[11px] font-bold uppercase tracking-wider text-white hover:bg-orange-500"
              >
                {t.nav[moduleId]}
              </Link>
            ) : (
              <button
                type="button"
                key={moduleId}
                disabled
                className={`cursor-not-allowed px-3 py-2 text-xs font-bold uppercase tracking-wider opacity-55 ${muted}`}
                title="Calculator migration in progress"
              >
                {t.nav[moduleId]}
              </button>
            );
          })}
        </section>



        <section className={`overflow-hidden border ${card}`}>
          <div className="grid grid-cols-1 lg:min-h-[520px] lg:grid-cols-[1.1fr_0.9fr]">
            <div className="flex flex-col justify-center p-5 sm:p-8 md:p-12">
              <div className="mb-5 inline-flex w-fit items-center gap-2 border border-orange-500/30 bg-orange-500/10 px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
                <span className="h-2 w-2 bg-orange-500" />
                {t.status}
              </div>

              <p className={`mb-3 text-xs font-black uppercase tracking-[0.2em] ${muted}`}>
                {t.heroEyebrow}
              </p>

              <h2 className="max-w-3xl text-3xl font-black tracking-tight sm:text-4xl md:text-5xl">
                {t.heroTitle}
              </h2>

              <p className={`mt-3 max-w-2xl text-sm leading-6 sm:mt-5 sm:text-base sm:leading-7 ${muted}`}>
                {t.heroText}
              </p>


              <Link
                href="/calculators"
                className="mt-7 inline-flex w-fit items-center bg-orange-600 px-5 py-3 text-xs font-black uppercase tracking-[0.16em] text-white transition-colors hover:bg-orange-500"
              >
                {t.allCalculators} →
              </Link>
            </div>

            <div
              className={`relative hidden min-h-[260px] border-t sm:block lg:border-l lg:border-t-0 ${
                isDark ? 'border-zinc-800 bg-zinc-950' : 'border-zinc-200 bg-zinc-50'
              }`}
            >
              <EngineeringGrid isDark={isDark} />
            </div>
          </div>
        </section>

        <details className={`mt-5 border border-l-4 border-l-orange-500 ${card}`}>
          <summary className="cursor-pointer px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-orange-500">
            {lang === 'ro' ? 'Date proiect / raport' : 'Project / report details'}
          </summary>
          <div className="grid grid-cols-1 gap-4 border-t border-zinc-500/20 p-4 md:grid-cols-3">
            <ProjectInput
              label={t.projectBar.partName}
              placeholder={t.projectBar.partPlaceholder}
              value={partName}
              onChange={setPartName}
              muted={muted}
              isDark={isDark}
            />
            <ProjectInput
              label={t.projectBar.drawingNo}
              placeholder={t.projectBar.drawingPlaceholder}
              value={drawingNo}
              onChange={setDrawingNo}
              muted={muted}
              isDark={isDark}
              mono
            />
            <ProjectInput
              label={t.projectBar.engineer}
              placeholder={t.projectBar.engineerPlaceholder}
              value={engineerName}
              onChange={setEngineerName}
              muted={muted}
              isDark={isDark}
            />
          </div>
        </details>

        <SiteFooter />
      </div>
    </main>
  );
}

function ProjectInput({
  label,
  placeholder,
  value,
  onChange,
  muted,
  isDark,
  mono = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  muted: string;
  isDark: boolean;
  mono?: boolean;
}) {
  const inputId = useId();

  return (
    <div className="min-w-0">
      <label
        htmlFor={inputId}
        className={`mb-2 block text-[10px] font-bold uppercase tracking-widest ${muted}`}
      >
        {label}
      </label>

      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full border-x-0 border-t-0 border-b-2 bg-transparent px-3 py-2 text-sm focus:border-orange-500 focus:outline-none ${
          mono ? 'font-mono' : 'font-medium'
        } ${
          isDark
            ? 'border-zinc-700 text-white placeholder:text-zinc-600'
            : 'border-zinc-300 text-zinc-950 placeholder:text-zinc-400'
        }`}
      />
    </div>
  );
}

function EngineeringGrid({ isDark }: { isDark: boolean }) {
  const stroke = isDark ? '#3f3f46' : '#d4d4d8';
  const accent = '#ea580c';
  const text = isDark ? '#71717a' : '#a1a1aa';

  return (
    <svg
      viewBox="0 0 600 420"
      className="absolute inset-0 h-full w-full"
      aria-hidden="true"
    >
      <defs>
        <pattern id="grid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path
            d="M 24 0 L 0 0 0 24"
            fill="none"
            stroke={stroke}
            strokeWidth="0.7"
            opacity="0.5"
          />
        </pattern>
      </defs>

      <rect width="600" height="420" fill="url(#grid)" />

      <circle cx="300" cy="210" r="112" fill="none" stroke={stroke} strokeWidth="3" />
      <circle cx="300" cy="210" r="54" fill="none" stroke={accent} strokeWidth="4" />

      <line
        x1="120"
        y1="210"
        x2="480"
        y2="210"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="8 5"
      />

      <line
        x1="300"
        y1="55"
        x2="300"
        y2="365"
        stroke={stroke}
        strokeWidth="1.5"
        strokeDasharray="8 5"
      />

      <line x1="188" y1="92" x2="412" y2="92" stroke={accent} strokeWidth="2" />
      <line x1="188" y1="84" x2="188" y2="100" stroke={accent} strokeWidth="2" />
      <line x1="412" y1="84" x2="412" y2="100" stroke={accent} strokeWidth="2" />

      <text
        x="300"
        y="78"
        fill={accent}
        textAnchor="middle"
        fontSize="17"
        fontFamily="monospace"
        fontWeight="700"
      >
        Ø DRAFTFIT
      </text>

      <text
        x="300"
        y="395"
        fill={text}
        textAnchor="middle"
        fontSize="12"
        fontFamily="monospace"
      >
        ENGINEERING CALCULATION PLATFORM
      </text>
    </svg>
  );
}
