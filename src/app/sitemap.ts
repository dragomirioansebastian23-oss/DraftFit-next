import type { MetadataRoute } from 'next';

import { CALCULATORS } from '@/lib/calculators';
import { GUIDES, STANDARDS } from '@/lib/content';
import { SHOULD_INDEX_SITE, SITE_URL } from '@/lib/site';

export default function sitemap(): MetadataRoute.Sitemap {
  if (!SHOULD_INDEX_SITE) {
    return [];
  }

  return [
    { url: SITE_URL, changeFrequency: 'weekly', priority: 1 },
    { url: `${SITE_URL}/calculators`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${SITE_URL}/guides`, changeFrequency: 'weekly', priority: 0.8 },
    { url: `${SITE_URL}/standards`, changeFrequency: 'monthly', priority: 0.75 },
    { url: `${SITE_URL}/methodology`, changeFrequency: 'monthly', priority: 0.7 },
    { url: `${SITE_URL}/about`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${SITE_URL}/contact`, changeFrequency: 'monthly', priority: 0.5 },
    { url: `${SITE_URL}/privacy`, changeFrequency: 'yearly', priority: 0.3 },
    { url: `${SITE_URL}/terms`, changeFrequency: 'yearly', priority: 0.3 },

    ...CALCULATORS.map((calculator) => ({
      url: `${SITE_URL}${calculator.href}`,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),

    ...GUIDES.map((guide) => ({
      url: `${SITE_URL}/guides/${guide.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    })),

    ...STANDARDS.map((standard) => ({
      url: `${SITE_URL}/standards/${standard.slug}`,
      changeFrequency: 'monthly' as const,
      priority: 0.65,
    })),
  ];
}
