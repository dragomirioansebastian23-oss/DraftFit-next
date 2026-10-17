"use client";

import { useState } from 'react';

const TEXT = {
  en: {
    title: 'Copy result',
    body: 'Copy a compact engineering summary for email, Teams, notes or reports.',
    action: 'Copy result',
    copied: 'Copied',
    failed: 'Copy failed',
  },
  ro: {
    title: 'Copiază rezultatul',
    body: 'Copiază un rezumat tehnic compact pentru email, Teams, notițe sau rapoarte.',
    action: 'Copiază rezultatul',
    copied: 'Copiat',
    failed: 'Copiere eșuată',
  },
} as const;

type Props = {
  text: string;
  isDark: boolean;
  lang: 'en' | 'ro';
  accentClass?: string;
};

export default function CopyResultButton({
  text,
  isDark,
  lang,
  accentClass = 'text-orange-500',
}: Props) {
  const [status, setStatus] = useState<'idle' | 'copied' | 'failed'>('idle');
  const t = TEXT[lang];

  async function copyResult() {
    try {
      await navigator.clipboard.writeText(text);
      setStatus('copied');
      window.setTimeout(() => setStatus('idle'), 1800);
    } catch {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = text;
        textarea.style.position = 'fixed';
        textarea.style.opacity = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        const ok = document.execCommand('copy');
        document.body.removeChild(textarea);
        setStatus(ok ? 'copied' : 'failed');
      } catch {
        setStatus('failed');
      }
      window.setTimeout(() => setStatus('idle'), 1800);
    }
  }

  return (
    <div
      className={`border p-4 ${
        isDark
          ? 'border-zinc-800 bg-zinc-900'
          : 'border-zinc-200 bg-white shadow-sm'
      }`}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <p className={`text-[10px] font-black uppercase tracking-[0.18em] ${accentClass}`}>
            {t.title}
          </p>
          <p className={`mt-1 text-xs ${isDark ? 'text-zinc-400' : 'text-zinc-600'}`}>
            {t.body}
          </p>
        </div>

        <button
          type="button"
          onClick={copyResult}
          className={`cursor-pointer border px-4 py-2 text-xs font-black uppercase tracking-[0.12em] transition-colors ${
            isDark
              ? 'border-zinc-700 bg-zinc-950 text-zinc-100 hover:border-zinc-500'
              : 'border-zinc-300 bg-zinc-50 text-zinc-900 hover:border-zinc-500'
          }`}
        >
          {status === 'copied'
            ? `✓ ${t.copied}`
            : status === 'failed'
              ? t.failed
              : t.action}
        </button>
      </div>
    </div>
  );
}
