export const DEFAULT_LANGUAGE = 'en' as const;
export const SECONDARY_LANGUAGE = 'ro' as const;

export const SUPPORTED_LANGUAGES = [
  {
    id: 'en',
    label: 'English',
    shortLabel: 'EN',
    role: 'primary',
  },
  {
    id: 'ro',
    label: 'Română',
    shortLabel: 'RO',
    role: 'secondary',
  },
] as const;

export type DraftFitLanguage = (typeof SUPPORTED_LANGUAGES)[number]['id'];

export const STANDARD_SYSTEMS = [
  {
    id: 'iso-din',
    label: 'ISO / DIN',
    shortLabel: 'ISO/DIN',
    description:
      'Metric-first engineering references and standards used by the current core DraftFit calculators.',
  },
  {
    id: 'asme-ansi',
    label: 'ASME / ANSI',
    shortLabel: 'ASME/ANSI',
    description:
      'US engineering standards ecosystem reserved for dedicated implementations such as Unified threads and expanded ASME workflows.',
  },
] as const;

export type StandardSystem = (typeof STANDARD_SYSTEMS)[number]['id'];

export const DEFAULT_STANDARD_SYSTEM: StandardSystem = 'iso-din';

export function getStandardSystemFromReference(reference: string): StandardSystem {
  const normalized = reference.toUpperCase();

  if (
    normalized.includes('ASME') ||
    normalized.includes('ANSI') ||
    normalized.includes('AS568') ||
    normalized.includes('UNIFIED')
  ) {
    return 'asme-ansi';
  }

  return 'iso-din';
}
