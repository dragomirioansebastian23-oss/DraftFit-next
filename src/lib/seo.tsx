import type { Metadata } from 'next';

import {
  getCalculator,
  type CalculatorId,
  CALCULATORS,
} from '@/lib/calculators';

import {
  absoluteUrl,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
} from '@/lib/site';

export function buildCalculatorMetadata(
  id: CalculatorId,
): Metadata {
  const calculator = getCalculator(id);

  return {
    title: calculator.title,
    description: calculator.description,

    keywords: [...calculator.keywords],

    alternates: {
      canonical: calculator.href,
    },

    openGraph: {
      type: 'website',
      siteName: SITE_NAME,
      title: calculator.title,
      description: calculator.description,
      url: calculator.href,
    },

    twitter: {
      card: 'summary_large_image',
      title: calculator.title,
      description: calculator.description,
    },

    robots: {
      index: true,
      follow: true,
    },
  };
}

export function websiteJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: SITE_NAME,
    url: SITE_URL,
    description: SITE_DESCRIPTION,
    inLanguage: ['en', 'ro'],
  };
}

export function organizationJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: SITE_NAME,
    url: SITE_URL,
  };
}

export function calculatorsCollectionJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'CollectionPage',
    name: 'Mechanical Engineering Calculators',
    description:
      'Mechanical engineering calculators for fits, O-rings, GD&T, metric threads, bolts and parallel keys.',
    url: absoluteUrl('/calculators'),
    mainEntity: {
      '@type': 'ItemList',
      itemListElement: CALCULATORS.map((calculator, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: calculator.title,
        url: absoluteUrl(calculator.href),
      })),
    },
  };
}

export function calculatorJsonLd(id: CalculatorId) {
  const calculator = getCalculator(id);

  return {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: calculator.title,
    description: calculator.description,
    url: absoluteUrl(calculator.href),
    applicationCategory: 'EngineeringApplication',
    operatingSystem: 'Any',
    browserRequirements: 'Requires a modern web browser with JavaScript enabled.',
    isAccessibleForFree: true,
    publisher: {
      '@type': 'Organization',
      name: SITE_NAME,
      url: SITE_URL,
    },
  };
}

export function calculatorBreadcrumbJsonLd(
  id: CalculatorId,
) {
  const calculator = getCalculator(id);

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'DraftFit',
        item: absoluteUrl('/'),
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Calculators',
        item: absoluteUrl('/calculators'),
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: calculator.title,
        item: absoluteUrl(calculator.href),
      },
    ],
  };
}

export function JsonLd({
  data,
}: {
  data: unknown;
}) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data).replace(/</g, '\\u003c'),
      }}
    />
  );
}
