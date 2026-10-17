"use client";

import { useState } from 'react';

type Language = 'en' | 'ro';
type ShareValue = string | number | boolean | null | undefined;

type Props = {
  params: Record<string, ShareValue>;
  isDark: boolean;
  lang: Language;
  accentClass?: string;
};

const COPY = {
  en: {
    title: 'Share calculation',
    intro: 'Copy a URL that restores the current calculation inputs.',
    action: 'Copy share link',
    copied: 'Link copied',
    failed: 'Select and copy the URL from the address bar.',
  },
  ro: {
    title: 'Distribuie calculul',
    intro: 'Copiază un URL care reîncarcă intrările curente ale calculului.',
    action: 'Copiază linkul',
    copied: 'Link copiat',
    failed: 'Selectează și copiază URL-ul din bara de adrese.',
  },
} as const;

function createShareUrl(params: Record<string, ShareValue>) {
  const url = new URL(window.location.href);
  url.search = '';
  url.hash = '';
  url.searchParams.set('share', '1');
  url.searchParams.set('v', '1');

  Object.entries(params).forEach(([key, value]) => {
    if (value === undefined || value === null || value === '') return;
    url.searchParams.set(key, String(value));
  });

  return url;
}

async function copyText(text: string) {
  if (navigator.clipboard?.writeText) {
    await navigator.clipboard.writeText(text);
    return;
  }

  const input = document.createElement('textarea');
  input.value = text;
  input.setAttribute('readonly', '');
  input.style.position = 'fixed';
  input.style.opacity = '0';
  document.body.appendChild(input);
  input.select();
  document.execCommand('copy');
  document.body.removeChild(input);
}

export default function ShareCalculationButton({
  params,
  isDark,
  lang,
  accentClass = 'text-orange-500',
}: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const t = COPY[lang];

  const shell = isDark
    ? 'border-zinc-800 bg-zinc-900'
    : 'border-zinc-200 bg-white shadow-sm';
  const button = isDark
    ? 'border-zinc-700 bg-zinc-950 hover:border-zinc-500 hover:bg-zinc-900'
    : 'border-zinc-300 bg-zinc-50 hover:border-zinc-400 hover:bg-white';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';

  const handleShare = async () => {
    const url = createShareUrl(params);
    window.history.replaceState(null, '', url);

    try {
      await copyText(url.toString());
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 2200);
    } catch {
      setStatus('failed');
      window.setTimeout(() => setStatus('idle'), 3200);
    }
  };

  return (
    <section className={`border p-4 print:hidden ${shell}`} aria-label={t.title}>
      <h2 className="text-xs font-black uppercase tracking-[0.16em]">
        {t.title}
      </h2>
      <p className={`mt-1 text-xs leading-5 ${muted}`}>{t.intro}</p>
      <button
        type="button"
        onClick={handleShare}
        className={`mt-3 w-full cursor-pointer border px-3 py-3 text-left transition-colors ${button}`}
      >
        <span className={`block text-[10px] font-black uppercase tracking-[0.14em] ${accentClass}`}>
          {status === 'copied'
            ? `✓ ${t.copied}`
            : status === 'failed'
              ? t.failed
              : `${t.action} →`}
        </span>
      </button>
    </section>
  );
}
