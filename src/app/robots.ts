import type { MetadataRoute } from 'next';

import {
  SHOULD_INDEX_SITE,
  SITE_URL,
} from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      ...(SHOULD_INDEX_SITE
        ? { allow: '/' }
        : { disallow: '/' }),
    },

    sitemap: `${SITE_URL}/sitemap.xml`,

    ...(SHOULD_INDEX_SITE
      ? { host: SITE_URL }
      : {}),
  };
}
