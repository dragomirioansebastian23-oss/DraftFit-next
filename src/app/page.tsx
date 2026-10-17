import type { Metadata } from 'next';

import DraftFitShell from '@/components/DraftFitShell';

import {
  JsonLd,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seo';

export const metadata: Metadata = {
  title: {
    absolute: 'DraftFit — Mechanical Engineering Calculators',
  },

  description:
    'Mechanical engineering calculators and design tools for ISO fits, O-rings, GD&T, metric threads, bolt calculations and parallel keys.',

  alternates: {
    canonical: '/',
  },

  keywords: [
    'mechanical engineering calculators',
    'engineering calculator',
    'ISO fit calculator',
    'O-ring calculator',
    'GD&T calculator',
    'bolt torque calculator',
    'parallel key calculator',
  ],
};

export default function HomePage() {
  return (
    <>
      <JsonLd data={websiteJsonLd()} />
      <JsonLd data={organizationJsonLd()} />
      <DraftFitShell />
    </>
  );
}
