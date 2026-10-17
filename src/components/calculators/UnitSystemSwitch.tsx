"use client";

import { useCallback, useSyncExternalStore } from 'react';
import { safeStorageGet, safeStorageSet } from '@/lib/browserStorage';
import type { UnitSystem } from '@/lib/units';

const STORAGE_KEY = 'draftfit-unit-system';
const DEFAULT_UNITS: UnitSystem = 'metric';
const listeners = new Set<() => void>();

function isUnitSystem(value: string | null): value is UnitSystem {
  return value === 'metric' || value === 'imperial';
}

function readUnitSystem(): UnitSystem {
  if (typeof window === 'undefined') return DEFAULT_UNITS;

  const params = new URLSearchParams(window.location.search);
  const shared = params.get('units');

  if (params.get('share') === '1' && isUnitSystem(shared)) {
    return shared;
  }

  const stored = safeStorageGet(STORAGE_KEY);
  return isUnitSystem(stored) ? stored : DEFAULT_UNITS;
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
  url.searchParams.delete('units');
  window.history.replaceState(window.history.state, '', `${url.pathname}${url.search}${url.hash}`);
}

export function useUnitSystem() {
  const unitSystem = useSyncExternalStore(
    subscribe,
    readUnitSystem,
    () => DEFAULT_UNITS,
  );

  const setUnitSystem = useCallback((nextSystem: UnitSystem) => {
    clearShareOverride();
    safeStorageSet(STORAGE_KEY, nextSystem);
    notify();
  }, []);

  return [unitSystem, setUnitSystem] as const;
}

export default function UnitSystemSwitch({
  unitSystem,
  setUnitSystem,
  isDark,
  lang,
  unitNeutral = false,
}: {
  unitSystem: UnitSystem;
  setUnitSystem: (system: UnitSystem) => void;
  isDark: boolean;
  lang: 'en' | 'ro';
  unitNeutral?: boolean;
}) {
  const copy = lang === 'ro'
    ? {
        label: 'Sistem de unități',
        metric: 'Metric',
        imperial: 'Imperial',
        metricText: 'Dimensiuni în mm, tensiuni în MPa și cuplu în N·m.',
        imperialText: 'Dimensiuni în inch, tensiuni în ksi și cuplu în lbf·ft. Standardele metrice rămân calculate intern în unitățile lor native.',
        neutralText: 'Referința GD&T este în principal independentă de unități; selectorul este păstrat pentru consistență între instrumente.',
      }
    : {
        label: 'Unit system',
        metric: 'Metric',
        imperial: 'Imperial',
        metricText: 'Dimensions in mm, stress in MPa and torque in N·m.',
        imperialText: 'Dimensions in inches, stress in ksi and torque in lbf·ft. Metric standards remain internally calculated in their native units.',
        neutralText: 'The GD&T reference is mostly unit-neutral; the selector is kept consistent across the toolkit.',
      };

  const shell = isDark
    ? 'border-zinc-800 bg-zinc-900'
    : 'border-zinc-200 bg-white shadow-sm';
  const inactive = isDark
    ? 'text-zinc-400 hover:text-white'
    : 'text-zinc-600 hover:text-zinc-950';
  const description = isDark ? 'text-zinc-400' : 'text-zinc-600';

  return (
    <section className={`mb-0 border border-l-4 border-l-sky-500 p-2 sm:p-4 print:hidden ${shell}`}>
      <div className="flex flex-col gap-1.5 sm:gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <div className="text-[9px] font-black uppercase sm:text-[10px] tracking-[0.18em] text-sky-500">
            {copy.label}
          </div>
          <p className={`mt-1 hidden max-w-3xl text-xs leading-5 sm:block ${description}`}>
            {unitNeutral
              ? copy.neutralText
              : unitSystem === 'metric'
                ? copy.metricText
                : copy.imperialText}
          </p>
        </div>

        <div role="group" aria-label={copy.label} className={`flex w-full shrink-0 border p-1 sm:w-auto ${isDark ? 'border-zinc-700 bg-zinc-950' : 'border-zinc-300 bg-zinc-100'}`}>
          <button
            type="button"
            onClick={() => setUnitSystem('metric')}
            aria-pressed={unitSystem === 'metric'}
            className={`min-w-0 flex-1 cursor-pointer min-h-10 px-2 py-1.5 text-[11px] sm:min-h-11 sm:flex-none sm:px-3 sm:py-2 sm:text-xs font-black uppercase tracking-wider transition-colors ${
              unitSystem === 'metric' ? 'bg-sky-600 text-white' : inactive
            }`}
          >
            {copy.metric}
          </button>
          <button
            type="button"
            onClick={() => setUnitSystem('imperial')}
            aria-pressed={unitSystem === 'imperial'}
            className={`min-w-0 flex-1 cursor-pointer min-h-10 px-2 py-1.5 text-[11px] sm:min-h-11 sm:flex-none sm:px-3 sm:py-2 sm:text-xs font-black uppercase tracking-wider transition-colors ${
              unitSystem === 'imperial' ? 'bg-sky-600 text-white' : inactive
            }`}
          >
            {copy.imperial}
          </button>
        </div>
      </div>
    </section>
  );
}
