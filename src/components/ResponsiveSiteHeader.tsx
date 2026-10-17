"use client";

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';

type Language = 'en' | 'ro';
type Theme = 'dark' | 'light';

const calculatorLinks = {
  en: [
    ['Fits', '/calculators/iso-286-fit-calculator'],
    ['O-Rings', '/calculators/o-ring-groove-calculator'],
    ['GD&T', '/calculators/gdt-reference-calculator'],
    ['Threads', '/calculators/metric-thread-bolt-calculator'],
    ['Keys', '/calculators/parallel-key-calculator'],
  ],
  ro: [
    ['Ajustaje', '/calculators/iso-286-fit-calculator'],
    ['O-Ringuri', '/calculators/o-ring-groove-calculator'],
    ['GD&T', '/calculators/gdt-reference-calculator'],
    ['Filete', '/calculators/metric-thread-bolt-calculator'],
    ['Pene', '/calculators/parallel-key-calculator'],
  ],
} as const;

export default function ResponsiveSiteHeader({
  isDark,
  lang,
  theme,
  subtitle,
  setLang,
  setTheme,
}: {
  isDark: boolean;
  lang: Language;
  theme: Theme;
  subtitle: string;
  setLang: (lang: Language) => void;
  setTheme: (theme: Theme) => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const panelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!menuOpen) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMenuOpen(false);
    };

    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [menuOpen]);

  const border = isDark ? 'border-zinc-800' : 'border-zinc-300';
  const control = isDark
    ? 'border-zinc-800 bg-zinc-900'
    : 'border-zinc-300 bg-white shadow-sm';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';

  function openSearch() {
    setMenuOpen(false);
    window.dispatchEvent(new CustomEvent('draftfit:open-search'));
  }

  return (
    <header className={`relative mb-4 border-b pb-3 print:hidden sm:mb-6 sm:pb-5 ${border}`}>
      <div className="flex items-center justify-between gap-3">
        <Link href="/" className="flex min-w-0 items-center gap-2.5">
          <span className="h-9 w-1.5 shrink-0 bg-orange-600 sm:h-10" />
          <span className="min-w-0">
            <span className="block text-2xl font-black uppercase tracking-tight sm:text-3xl">
              Draft<span className="text-orange-600">Fit</span>
            </span>
            <span className={`hidden max-w-xl truncate text-[10px] font-bold uppercase tracking-[0.13em] sm:block ${muted}`}>
              {subtitle}
            </span>
          </span>
        </Link>

        {/* Desktop controls */}
        <div className="hidden items-center gap-2 sm:flex">
          <button
            type="button"
            onClick={openSearch}
            className={`min-h-11 border px-3 text-xs font-black uppercase tracking-wider ${control}`}
          >
            Search
          </button>

          <div className={`flex border p-1 ${control}`}>
            {(['en', 'ro'] as const).map((option) => (
              <button
                key={option}
                type="button"
                onClick={() => setLang(option)}
                aria-pressed={lang === option}
                className={`min-h-9 px-3 text-xs font-black ${
                  lang === option
                    ? 'bg-zinc-800 text-white'
                    : muted
                }`}
              >
                {option.toUpperCase()}
              </button>
            ))}
          </div>

          <div className={`flex border p-1 ${control}`}>
            <button
              type="button"
              onClick={() => setTheme('dark')}
              aria-pressed={theme === 'dark'}
              className={`min-h-9 min-w-10 px-2 text-sm ${
                theme === 'dark' ? 'bg-zinc-800 text-orange-400' : muted
              }`}
            >
              🌙
            </button>
            <button
              type="button"
              onClick={() => setTheme('light')}
              aria-pressed={theme === 'light'}
              className={`min-h-9 min-w-10 px-2 text-sm ${
                theme === 'light' ? 'bg-orange-400/20 text-orange-600' : muted
              }`}
            >
              ☀️
            </button>
          </div>
        </div>

        {/* Mobile controls */}
        <div className="flex items-center gap-2 sm:hidden">
          <button
            type="button"
            onClick={openSearch}
            className={`flex min-h-11 min-w-11 items-center justify-center border text-lg ${control}`}
            aria-label="Search DraftFit"
          >
            ⌕
          </button>
          <button
            type="button"
            onClick={() => setMenuOpen((current) => !current)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            className={`flex min-h-11 min-w-11 items-center justify-center border text-xl ${control}`}
          >
            {menuOpen ? '×' : '☰'}
          </button>
        </div>
      </div>

      {menuOpen ? (
        <div
          ref={panelRef}
          className={`absolute left-0 right-0 top-full z-50 mt-2 border p-3 shadow-xl sm:hidden ${control}`}
        >
          <div className="grid grid-cols-2 gap-2">
            {calculatorLinks[lang].map(([label, href]) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className="flex min-h-11 items-center justify-center bg-orange-600 px-3 text-center text-xs font-black uppercase tracking-wider text-white"
              >
                {label}
              </Link>
            ))}
          </div>

          <div className={`mt-3 border-t pt-3 ${border}`}>
            <div className="grid grid-cols-2 gap-2">
              <div className={`flex border p-1 ${control}`}>
                <button
                  type="button"
                  onClick={() => setLang('en')}
                  className={`min-h-10 flex-1 text-xs font-black ${lang === 'en' ? 'bg-zinc-800 text-white' : muted}`}
                >
                  EN
                </button>
                <button
                  type="button"
                  onClick={() => setLang('ro')}
                  className={`min-h-10 flex-1 text-xs font-black ${lang === 'ro' ? 'bg-zinc-800 text-white' : muted}`}
                >
                  RO
                </button>
              </div>

              <div className={`flex border p-1 ${control}`}>
                <button
                  type="button"
                  onClick={() => setTheme('dark')}
                  className={`min-h-10 flex-1 text-sm ${theme === 'dark' ? 'bg-zinc-800 text-orange-400' : muted}`}
                >
                  🌙
                </button>
                <button
                  type="button"
                  onClick={() => setTheme('light')}
                  className={`min-h-10 flex-1 text-sm ${theme === 'light' ? 'bg-orange-400/20 text-orange-600' : muted}`}
                >
                  ☀️
                </button>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
