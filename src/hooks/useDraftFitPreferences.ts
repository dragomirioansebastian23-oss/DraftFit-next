'use client';

import { useEffect, useState } from 'react';

import { safeStorageGet } from '@/lib/safeBrowserStorage';

export type DraftFitContentLanguage = 'en' | 'ro';
export type DraftFitContentTheme = 'dark' | 'light';

export function useDraftFitPreferences() {
  const [theme, setTheme] = useState<DraftFitContentTheme>('dark');
  const [lang, setLang] = useState<DraftFitContentLanguage>('en');
  useEffect(() => {
    const storedTheme = safeStorageGet('draftfit-theme');
    const storedLanguage = safeStorageGet('draftfit-language');

    const frame = window.requestAnimationFrame(() => {
      if (storedTheme === 'dark' || storedTheme === 'light') {
        setTheme(storedTheme);
        document.documentElement.dataset.theme = storedTheme;
      }

      if (storedLanguage === 'en' || storedLanguage === 'ro') {
        setLang(storedLanguage);
        document.documentElement.lang = storedLanguage;
      }

    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  return {
    theme,
    lang,
    isDark: theme === 'dark',
  } as const;
}
