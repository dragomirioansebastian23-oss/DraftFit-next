export const SITE_NAME = 'DraftFit';

export const SITE_DESCRIPTION =
  'Mechanical engineering calculators and design tools for fits, O-rings, GD&T, threads and shaft connections.';

function getConfiguredSiteUrl() {
  const raw = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (!raw) return null;

  try {
    const parsed = new URL(raw);

    if (parsed.protocol !== 'https:' && parsed.protocol !== 'http:') {
      return null;
    }

    return parsed.origin;
  } catch {
    return null;
  }
}

const configuredSiteUrl = getConfiguredSiteUrl();

export const HAS_PRODUCTION_SITE_URL = Boolean(configuredSiteUrl);

export const SITE_URL =
  configuredSiteUrl ||
  'http://localhost:3000';

export const IS_LOCAL_SITE =
  SITE_URL.includes('localhost') ||
  SITE_URL.includes('127.0.0.1');

export const SHOULD_INDEX_SITE =
  HAS_PRODUCTION_SITE_URL &&
  !IS_LOCAL_SITE &&
  SITE_URL.startsWith('https://');

export function absoluteUrl(path = '/') {
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  return `${SITE_URL}${normalizedPath}`;
}
