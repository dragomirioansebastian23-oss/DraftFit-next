"use client";

import { useEffect, useRef, useState } from 'react';

import {
  DEFAULT_LANGUAGE,
  DEFAULT_STANDARD_SYSTEM,
  STANDARD_SYSTEMS,
  SUPPORTED_LANGUAGES,
  type DraftFitLanguage,
  type StandardSystem,
} from '@/lib/internationalization';
import { safeStorageGet, safeStorageSet } from '@/lib/safeBrowserStorage';

export default function EngineeringPreferences() {
  const [language, setLanguage] = useState<DraftFitLanguage>(DEFAULT_LANGUAGE);
  const [standardSystem, setStandardSystem] = useState<StandardSystem>(
    DEFAULT_STANDARD_SYSTEM,
  );
  const loaded = useRef(false);

  useEffect(() => {
    const savedLanguage = safeStorageGet('draftfit-language');
    const savedStandardSystem = safeStorageGet(
      'draftfit-standard-system',
    );

    const frame = window.requestAnimationFrame(() => {
      if (savedLanguage === 'en' || savedLanguage === 'ro') {
        setLanguage(savedLanguage);
      }

      if (
        savedStandardSystem === 'iso-din' ||
        savedStandardSystem === 'asme-ansi'
      ) {
        setStandardSystem(savedStandardSystem);
      }

      loaded.current = true;
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  useEffect(() => {
    if (!loaded.current) return;

    safeStorageSet('draftfit-language', language);
    document.documentElement.lang = language;
  }, [language]);

  useEffect(() => {
    if (!loaded.current) return;

    safeStorageSet('draftfit-standard-system', standardSystem);
  }, [standardSystem]);

  return (
    <div className="grid gap-5 md:grid-cols-2">
      <section className="border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
          Language
        </p>
        <h2 className="mt-2 text-xl font-black">Interface language</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          English is DraftFit&apos;s primary international language. Romanian is
          retained as a secondary interface preference.
        </p>

        <div
          className="mt-5 flex flex-wrap gap-2"
          role="group"
          aria-label="DraftFit language preference"
        >
          {SUPPORTED_LANGUAGES.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={language === option.id}
              onClick={() => setLanguage(option.id)}
              className={`border px-4 py-2 text-xs font-black uppercase tracking-[0.14em] ${
                language === option.id
                  ? 'border-orange-500 bg-orange-600 text-white'
                  : 'border-zinc-700 text-zinc-300 hover:border-zinc-500'
              }`}
            >
              {option.shortLabel} — {option.label}
            </button>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5 text-zinc-500">
          The preference is stored in this browser. Existing bilingual calculator
          interfaces read the same DraftFit language preference.
        </p>
      </section>

      <section className="border border-zinc-800 bg-zinc-900/60 p-6">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
          Standards ecosystem
        </p>
        <h2 className="mt-2 text-xl font-black">Engineering system preference</h2>
        <p className="mt-3 text-sm leading-6 text-zinc-400">
          This preference prepares DraftFit for parallel ISO/DIN and ASME/ANSI
          workflows without silently converting one standard into another.
        </p>

        <div
          className="mt-5 grid gap-3"
          role="group"
          aria-label="Engineering standards ecosystem preference"
        >
          {STANDARD_SYSTEMS.map((option) => (
            <button
              key={option.id}
              type="button"
              aria-pressed={standardSystem === option.id}
              onClick={() => setStandardSystem(option.id)}
              className={`border p-4 text-left ${
                standardSystem === option.id
                  ? 'border-orange-500 bg-orange-500/10'
                  : 'border-zinc-700 hover:border-zinc-500'
              }`}
            >
              <span className="block text-sm font-black text-zinc-100">
                {option.label}
              </span>
              <span className="mt-2 block text-xs leading-5 text-zinc-400">
                {option.description}
              </span>
            </button>
          ))}
        </div>

        <p className="mt-5 text-xs leading-5 text-zinc-500">
          Important: changing this preference does not alter a calculation or
          substitute an ISO/DIN standard with an ASME/ANSI standard. Each
          calculator must explicitly support the selected standard before its
          engineering basis changes.
        </p>
      </section>
    </div>
  );
}
