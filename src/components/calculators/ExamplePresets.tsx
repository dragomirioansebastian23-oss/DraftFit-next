"use client";

type Language = 'en' | 'ro';

type ExamplePreset = {
  id: string;
  title: Record<Language, string>;
  description: Record<Language, string>;
};

type Props = {
  presets: readonly ExamplePreset[];
  onSelect: (id: string) => void;
  isDark: boolean;
  lang: Language;
  accentClass?: string;
};

const TEXT = {
  en: {
    title: 'Example presets',
    intro: 'Load a realistic starting point, then edit any input.',
    action: 'Load example',
  },
  ro: {
    title: 'Exemple presetate',
    intro: 'Încarcă un punct de pornire realist, apoi modifică orice valoare.',
    action: 'Încarcă exemplul',
  },
} as const;

export default function ExamplePresets({
  presets,
  onSelect,
  isDark,
  lang,
  accentClass = 'text-orange-500',
}: Props) {
  const t = TEXT[lang];
  const panel = isDark
    ? 'border-zinc-800 bg-zinc-900'
    : 'border-zinc-200 bg-white shadow-sm';
  const button = isDark
    ? 'border-zinc-700 bg-zinc-950 hover:border-zinc-500 hover:bg-zinc-900'
    : 'border-zinc-300 bg-zinc-50 hover:border-zinc-400 hover:bg-white';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';

  return (
    <section className={`border p-4 ${panel}`} aria-label={t.title}>
      <div className="mb-3">
        <h2 className="text-xs font-black uppercase tracking-[0.16em]">
          {t.title}
        </h2>
        <p className={`mt-1 text-xs leading-5 ${muted}`}>{t.intro}</p>
      </div>

      <div className="grid gap-2">
        {presets.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => onSelect(preset.id)}
            className={`cursor-pointer border px-3 py-3 text-left transition-colors ${button}`}
          >
            <span className="block text-sm font-black">{preset.title[lang]}</span>
            <span className={`mt-1 block text-xs leading-5 ${muted}`}>
              {preset.description[lang]}
            </span>
            <span className={`mt-2 block text-[10px] font-black uppercase tracking-[0.14em] ${accentClass}`}>
              {t.action} →
            </span>
          </button>
        ))}
      </div>
    </section>
  );
}
