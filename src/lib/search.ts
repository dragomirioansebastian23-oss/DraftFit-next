import { CALCULATORS } from '@/lib/calculators';
import { GUIDES, STANDARDS } from '@/lib/content';

export type SearchCategory =
  | 'calculator'
  | 'guide'
  | 'standard'
  | 'page';

export type SearchItem = {
  id: string;
  category: SearchCategory;
  title: string;
  description: string;
  href: string;
  eyebrow: string;
  keywords: string[];
  searchText: string;
};

const STATIC_PAGES: Omit<SearchItem, 'searchText'>[] = [
  {
    id: 'page-calculators',
    category: 'page',
    title: 'Mechanical Engineering Calculators',
    description:
      'Browse all DraftFit calculators for fits, O-rings, GD&T, metric threads, bolts and parallel keys.',
    href: '/calculators',
    eyebrow: 'Page',
    keywords: ['calculators', 'engineering tools', 'mechanical engineering'],
  },
  {
    id: 'page-guides',
    category: 'page',
    title: 'Mechanical Engineering Guides',
    description:
      'Browse practical DraftFit engineering guides and worked design explanations.',
    href: '/guides',
    eyebrow: 'Page',
    keywords: ['guides', 'articles', 'engineering knowledge'],
  },
  {
    id: 'page-standards',
    category: 'page',
    title: 'Engineering Standards Reference',
    description:
      'Browse DraftFit reference pages for ISO, DIN and ASME standards.',
    href: '/standards',
    eyebrow: 'Page',
    keywords: ['standards', 'ISO', 'DIN', 'ASME'],
  },
  {
    id: 'page-methodology',
    category: 'page',
    title: 'DraftFit Engineering Methodology',
    description:
      'How DraftFit handles calculations, assumptions, units, standards and verification.',
    href: '/methodology',
    eyebrow: 'Page',
    keywords: ['methodology', 'assumptions', 'verification', 'engineering basis'],
  },
  {
    id: 'page-about',
    category: 'page',
    title: 'About DraftFit',
    description:
      'What DraftFit is, who it is for and the engineering principles behind the toolkit.',
    href: '/about',
    eyebrow: 'Page',
    keywords: ['about', 'DraftFit', 'mechanical engineering toolkit'],
  },
  {
    id: 'page-contact',
    category: 'page',
    title: 'Contact / Report an Engineering Issue',
    description:
      'Report a calculation issue, website bug, feature request or new calculator idea.',
    href: '/contact',
    eyebrow: 'Page',
    keywords: ['contact', 'feedback', 'report issue', 'bug'],
  },
];

function buildSearchText(parts: Array<string | string[]>) {
  return parts
    .flatMap((part) => (Array.isArray(part) ? part : [part]))
    .join(' ')
    .toLocaleLowerCase('en-US');
}

const CALCULATOR_ITEMS: SearchItem[] = CALCULATORS.map((calculator) => ({
  id: `calculator-${calculator.id}`,
  category: 'calculator',
  title: calculator.title,
  description: calculator.description,
  href: calculator.href,
  eyebrow: calculator.eyebrow,
  keywords: [...calculator.keywords, calculator.standards, calculator.shortTitle],
  searchText: buildSearchText([
    calculator.title,
    calculator.shortTitle,
    calculator.description,
    calculator.eyebrow,
    calculator.standards,
    [...calculator.keywords],
  ]),
}));

const GUIDE_ITEMS: SearchItem[] = GUIDES.map((guide) => ({
  id: `guide-${guide.slug}`,
  category: 'guide',
  title: guide.title,
  description: guide.description,
  href: `/guides/${guide.slug}`,
  eyebrow: guide.eyebrow,
  keywords: guide.keywords,
  searchText: buildSearchText([
    guide.title,
    guide.description,
    guide.eyebrow,
    guide.keywords,
    guide.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ]),
}));

const STANDARD_ITEMS: SearchItem[] = STANDARDS.map((standard) => ({
  id: `standard-${standard.slug}`,
  category: 'standard',
  title: standard.title,
  description: standard.description,
  href: `/standards/${standard.slug}`,
  eyebrow: standard.reference,
  keywords: [standard.reference, standard.calculatorLabel],
  searchText: buildSearchText([
    standard.title,
    standard.description,
    standard.reference,
    standard.statusNote,
    standard.calculatorLabel,
    standard.sections.flatMap((section) => [
      section.heading,
      ...section.paragraphs,
      ...(section.bullets ?? []),
    ]),
  ]),
}));

const PAGE_ITEMS: SearchItem[] = STATIC_PAGES.map((page) => ({
  ...page,
  searchText: buildSearchText([
    page.title,
    page.description,
    page.eyebrow,
    page.keywords,
  ]),
}));

export const SEARCH_INDEX: SearchItem[] = [
  ...CALCULATOR_ITEMS,
  ...GUIDE_ITEMS,
  ...STANDARD_ITEMS,
  ...PAGE_ITEMS,
];

export const SEARCH_CATEGORY_LABELS: Record<SearchCategory, string> = {
  calculator: 'Calculator',
  guide: 'Guide',
  standard: 'Standard',
  page: 'Page',
};

export type SearchFilter = 'all' | SearchCategory;

function normalize(value: string) {
  return value
    .toLocaleLowerCase('en-US')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9.+/#-]+/g, ' ')
    .trim();
}

function scoreItem(item: SearchItem, query: string) {
  const normalizedQuery = normalize(query);
  if (!normalizedQuery) return 0;

  const title = normalize(item.title);
  const description = normalize(item.description);
  const eyebrow = normalize(item.eyebrow);
  const keywords = item.keywords.map(normalize);
  const haystack = normalize(item.searchText);
  const tokens = normalizedQuery.split(/\s+/).filter(Boolean);

  let score = 0;

  if (title === normalizedQuery) score += 120;
  if (title.startsWith(normalizedQuery)) score += 65;
  if (title.includes(normalizedQuery)) score += 45;
  if (eyebrow.includes(normalizedQuery)) score += 25;
  if (keywords.some((keyword) => keyword === normalizedQuery)) score += 55;
  if (keywords.some((keyword) => keyword.includes(normalizedQuery))) score += 30;
  if (description.includes(normalizedQuery)) score += 22;
  if (haystack.includes(normalizedQuery)) score += 15;

  for (const token of tokens) {
    if (title.includes(token)) score += 18;
    if (keywords.some((keyword) => keyword.includes(token))) score += 12;
    if (description.includes(token)) score += 7;
    if (haystack.includes(token)) score += 3;
  }

  if (tokens.every((token) => haystack.includes(token))) {
    score += 18;
  }

  return score;
}

export function searchDraftFit(
  query: string,
  filter: SearchFilter = 'all',
  limit?: number,
) {
  const normalizedQuery = normalize(query);

  if (!normalizedQuery) {
    return [];
  }

  const ranked = SEARCH_INDEX
    .filter((item) => filter === 'all' || item.category === filter)
    .map((item) => ({
      item,
      score: scoreItem(item, normalizedQuery),
    }))
    .filter((entry) => entry.score > 0)
    .sort((a, b) => {
      if (b.score !== a.score) return b.score - a.score;
      return a.item.title.localeCompare(b.item.title);
    })
    .map((entry) => entry.item);

  return typeof limit === 'number' ? ranked.slice(0, limit) : ranked;
}
