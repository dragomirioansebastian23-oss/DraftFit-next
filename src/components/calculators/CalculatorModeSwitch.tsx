"use client";

import { useCallback, useSyncExternalStore } from 'react';
import { safeStorageGet, safeStorageSet } from '@/lib/browserStorage';

export type CalculatorExperienceMode = 'quick' | 'advanced';

const STORAGE_KEY = 'draftfit-calculator-mode';
const DEFAULT_MODE: CalculatorExperienceMode = 'quick';
const listeners = new Set<() => void>();

function isMode(value: string | null): value is CalculatorExperienceMode {
  return value === 'quick' || value === 'advanced';
}

function readMode(): CalculatorExperienceMode {
  if (typeof window === 'undefined') return DEFAULT_MODE;

  const params = new URLSearchParams(window.location.search);
  const shared = params.get('view');

  if (params.get('share') === '1' && isMode(shared)) {
    return shared;
  }

  const stored = safeStorageGet(STORAGE_KEY);
  return isMode(stored) ? stored : DEFAULT_MODE;
}

function subscribe(listener: () => void) {
  listeners.add(listener);

  const handleStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) listener();
  };

  const handleNavigation = () => listener();

  window.addEventListener('storage', handleStorage);
  window.addEventListener('popstate', handleNavigation);

  return () => {
    listeners.delete(listener);
    window.removeEventListener('storage', handleStorage);
    window.removeEventListener('popstate', handleNavigation);
  };
}

function notify() {
  listeners.forEach(listener => listener());
}

function clearShareOverride() {
  if (typeof window === 'undefined') return;

  const url = new URL(window.location.href);
  if (url.searchParams.get('share') !== '1') return;

  url.searchParams.delete('share');
  url.searchParams.delete('view');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}

export function useCalculatorExperienceMode() {
  const mode = useSyncExternalStore(
    subscribe,
    readMode,
    () => DEFAULT_MODE,
  );

  const setMode = useCallback((nextMode: CalculatorExperienceMode) => {
    clearShareOverride();
    safeStorageSet(STORAGE_KEY, nextMode);
    notify();
  }, []);

  return [mode, setMode] as const;
}

export default function CalculatorModeSwitch({
  mode,
  setMode,
  isDark,
  lang,
}: {
  mode: CalculatorExperienceMode;
  setMode: (mode: CalculatorExperienceMode) => void;
  isDark: boolean;
  lang: 'en' | 'ro';
}) {
  const copy = lang === 'ro'
    ? {
        label: 'Mod calculator',
        quick: 'Rapid',
        advanced: 'Avansat',
        quickText: 'Doar intrările esențiale. DraftFit folosește valorile implicite validate pentru opțiunile avansate.',
        advancedText: 'Afișează toate intrările tehnice, datele proiectului și controalele detaliate.',
      }
    : {
        label: 'Calculator mode',
        quick: 'Quick',
        advanced: 'Advanced',
        quickText: 'Essential inputs only. DraftFit keeps the validated defaults for advanced parameters.',
        advancedText: 'Shows all technical inputs, project metadata and detailed controls.',
      };

  const shell = isDark
    ? 'border-zinc-800 bg-zinc-900'
    : 'border-zinc-200 bg-white shadow-sm';
  const inactive = isDark
    ? 'text-zinc-400 hover:text-white'
    : 'text-zinc-600 hover:text-zinc-950';
  const description = isDark ? 'text-zinc-400' : 'text-zinc-600';

  return (
    <section className={`mb-0 border border-l-4 border-l-orange-500 p-2 sm:p-4 print:hidden ${shell}`}>
      <div className="flex flex-col gap-1.5 sm:gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[9px] font-black uppercase sm:text-[10px] tracking-[0.18em] text-orange-500">
            {copy.label}
          </div>
          <p className={`mt-1 hidden max-w-3xl text-xs leading-5 sm:block ${description}`}>
            {mode === 'quick' ? copy.quickText : copy.advancedText}
          </p>
        </div>

        <div role="group" aria-label={copy.label} className={`flex w-full shrink-0 border p-1 sm:w-auto ${isDark ? 'border-zinc-700 bg-zinc-950' : 'border-zinc-300 bg-zinc-100'}`}>
          <button
            type="button"
            onClick={() => setMode('quick')}
            aria-pressed={mode === 'quick'}
            className={`min-w-0 flex-1 cursor-pointer min-h-10 px-2 py-1.5 text-[11px] sm:min-h-11 sm:flex-none sm:px-3 sm:py-2 sm:text-xs font-black uppercase tracking-wider transition-colors ${
              mode === 'quick'
                ? 'bg-orange-600 text-white'
                : inactive
            }`}
          >
            {copy.quick}
          </button>
          <button
            type="button"
            onClick={() => setMode('advanced')}
            aria-pressed={mode === 'advanced'}
            className={`min-w-0 flex-1 cursor-pointer min-h-10 px-2 py-1.5 text-[11px] sm:min-h-11 sm:flex-none sm:px-3 sm:py-2 sm:text-xs font-black uppercase tracking-wider transition-colors ${
              mode === 'advanced'
                ? 'bg-orange-600 text-white'
                : inactive
            }`}
          >
            {copy.advanced}
          </button>
        </div>
      </div>
    </section>
  );
}
