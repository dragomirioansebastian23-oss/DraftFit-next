"use client";

import Link from 'next/link';
import ResponsiveSiteHeader from '@/components/ResponsiveSiteHeader';
import { useEffect, useId, useRef, useState } from 'react';
import IsoModule from '@/components/calculators/IsoModule';
import CalculatorModeSwitch, {
  useCalculatorExperienceMode,
} from '@/components/calculators/CalculatorModeSwitch';
import UnitSystemSwitch, {
  useUnitSystem,
} from '@/components/calculators/UnitSystemSwitch';
import EngineeringDocumentation, { EngineeringReportHeader } from '@/components/calculators/EngineeringDocumentation';
import { safeStorageGet, safeStorageSet } from '@/lib/safeBrowserStorage';

type Language = 'en' | 'ro';
type Theme = 'dark' | 'light';

const TEXT = {
  en: {
    subtitle: 'Engineering Tools for Mechanical Design',
    back: '← All calculators',
    pageTitle: 'ISO 286 Fit Calculator',
    pageIntro:
      'Calculate hole and shaft limits, clearance or interference, and preliminary interference-fit mechanics.',
    partName: 'Part Name',
    partPlaceholder: 'e.g. Shaft',
    drawingNo: 'Drawing No.',
    drawingPlaceholder: 'e.g. DRW-001',
    engineer: 'Engineer',
    engineerPlaceholder: 'Name',
  },
  ro: {
    subtitle: 'Instrumente de calcul pentru proiectare mecanică',
    back: '← Toate calculatoarele',
    pageTitle: 'Calculator Ajustaje ISO 286',
    pageIntro:
      'Calculează limitele alezajului și arborelui, jocul sau strângerea și o estimare preliminară pentru ajustajele cu interferență.',
    partName: 'Nume Reper',
    partPlaceholder: 'ex: Arbore',
    drawingNo: 'Nr. Desen',
    drawingPlaceholder: 'ex: DRW-001',
    engineer: 'Proiectant',
    engineerPlaceholder: 'Nume',
  },
} as const;


export default function IsoCalculatorClient() {
  const [theme, setTheme] = useState<Theme>('dark');
  const [lang, setLang] = useState<Language>('en');
  const preferencesLoaded = useRef(false);
  const [partName, setPartName] = useState('');
  const [drawingNo, setDrawingNo] = useState('');
  const [engineerName, setEngineerName] = useState('');
  const [experienceMode, setExperienceMode] = useCalculatorExperienceMode();
  const [unitSystem, setUnitSystem] = useUnitSystem();

  useEffect(() => {
    const storedTheme = safeStorageGet('draftfit-theme');
    const storedLanguage = safeStorageGet('draftfit-language');

    const frame = window.requestAnimationFrame(() => {
      preferencesLoaded.current = true;

      if (storedTheme === 'light' || storedTheme === 'dark') {
        setTheme(storedTheme);
        document.documentElement.dataset.theme = storedTheme;
      }

      if (storedLanguage === 'ro' || storedLanguage === 'en') {
        setLang(storedLanguage);
        document.documentElement.lang = storedLanguage;
      }
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
  const t = TEXT[lang];

  const handlePrint = () => {
    const originalTitle = document.title;
    const safePartName = partName.trim()
      ? partName.trim().replace(/\\s+/g, '_').replace(/[^a-zA-Z0-9_ăâîșțĂÂÎȘȚ-]/g, '')
      : 'Part';
    const safeDrawingNo = drawingNo.trim()
      ? drawingNo.trim().replace(/\\s+/g, '_').replace(/[^a-zA-Z0-9_-]/g, '')
      : '00';

    document.title = `DraftFit_${safePartName}_${safeDrawingNo}`;
    window.print();
    window.setTimeout(() => {
      document.title = originalTitle;
    }, 1000);
  };

  const page = isDark ? 'bg-zinc-950 text-zinc-100' : 'bg-zinc-100 text-zinc-950';
  const card = isDark ? 'bg-zinc-900 border-zinc-800' : 'bg-white border-zinc-200 shadow-sm';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';

  return (
    <main id="main-content" tabIndex={-1} className={`min-h-screen ${page}`}>
      <div className="draftfit-safe-wrap mx-auto max-w-7xl px-3 py-3 sm:px-5 sm:py-6 md:px-8 md:py-8 print:max-w-full print:px-0 print:py-0">
        <ResponsiveSiteHeader
          isDark={isDark}
          lang={lang}
          theme={theme}
          subtitle={t.subtitle}
          setLang={setLang}
          setTheme={setTheme}
        />

        <div className="mb-3 print:hidden">
          <Link href="/" className={`text-xs font-bold uppercase tracking-widest hover:text-orange-500 ${muted}`}>{t.back}</Link>
          <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl md:text-4xl">{t.pageTitle}</h1>
          <p className={`mt-2 hidden max-w-3xl text-sm leading-6 sm:block ${muted}`}>{t.pageIntro}</p>
        </div>

        <div className="mb-4 grid grid-cols-1 gap-2 md:grid-cols-2 print:hidden">
          <CalculatorModeSwitch
          mode={experienceMode}
          setMode={setExperienceMode}
          isDark={isDark}
          lang={lang}
        />

        <UnitSystemSwitch
          unitSystem={unitSystem}
          setUnitSystem={setUnitSystem}
          isDark={isDark}
          lang={lang}
          
        />
        </div>



        <EngineeringReportHeader
          calculator="iso"
          lang={lang}
          unitSystem={unitSystem}
          partName={partName}
          drawingNo={drawingNo}
          engineerName={engineerName}
        />


        <IsoModule unitSystem={unitSystem} experienceMode={experienceMode} isDark={isDark} lang={lang} onPrint={handlePrint} />
        {experienceMode === 'advanced' && (
          <details className={`mt-5 border border-l-4 border-l-orange-500 print:hidden ${card}`}>
            <summary className="cursor-pointer px-4 py-3 text-xs font-black uppercase tracking-[0.14em] text-orange-500">
              {lang === 'ro' ? 'Date proiect / raport' : 'Project / report details'}
            </summary>
            <div className="grid grid-cols-1 gap-4 border-t border-zinc-500/20 p-4 md:grid-cols-3">

          <ProjectInput label={t.partName} placeholder={t.partPlaceholder} value={partName} onChange={setPartName} isDark={isDark} muted={muted} />
          <ProjectInput label={t.drawingNo} placeholder={t.drawingPlaceholder} value={drawingNo} onChange={setDrawingNo} isDark={isDark} muted={muted} mono />
          <ProjectInput label={t.engineer} placeholder={t.engineerPlaceholder} value={engineerName} onChange={setEngineerName} isDark={isDark} muted={muted} />
        
            </div>
          </details>
        )}


        <EngineeringDocumentation
          calculator="iso"
          lang={lang}
          isDark={isDark}
          onPrint={handlePrint}
        />

      </div>
    </main>
  );
}

function ProjectInput({
  label,
  placeholder,
  value,
  onChange,
  isDark,
  muted,
  mono = false,
}: {
  label: string;
  placeholder: string;
  value: string;
  onChange: (value: string) => void;
  isDark: boolean;
  muted: string;
  mono?: boolean;
}) {
  const inputId = useId();

  return (
    <div className="min-w-0">
      <label htmlFor={inputId} className={`mb-2 block text-[10px] font-bold uppercase tracking-widest ${muted}`}>{label}</label>
      <input
        id={inputId}
        type="text"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className={`w-full border-x-0 border-t-0 border-b-2 bg-transparent px-3 py-2 text-sm focus:border-orange-500 focus:outline-none ${mono ? 'font-mono' : 'font-medium'} ${isDark ? 'border-zinc-700 text-white placeholder:text-zinc-600' : 'border-zinc-300 text-zinc-950 placeholder:text-zinc-400'}`}
      />
    </div>
  );
}
