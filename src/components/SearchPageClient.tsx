'use client';

import Link from 'next/link';
import { useMemo, useState } from 'react';

import {
  SEARCH_CATEGORY_LABELS,
  searchDraftFit,
  type SearchFilter,
} from '@/lib/search';

const FILTERS: Array<{ value: SearchFilter; label: string }> = [
  { value: 'all', label: 'All' },
  { value: 'calculator', label: 'Calculators' },
  { value: 'guide', label: 'Guides' },
  { value: 'standard', label: 'Standards' },
  { value: 'page', label: 'Pages' },
];

export default function SearchPageClient({ initialQuery }: { initialQuery: string }) {
  const [query, setQuery] = useState(initialQuery);
  const [filter, setFilter] = useState<SearchFilter>('all');

  const results = useMemo(
    () => searchDraftFit(query, filter),
    [query, filter],
  );

  return (
    <>
      <div className="border border-zinc-800 bg-zinc-900/60 p-4 sm:p-5">
        <label htmlFor="draftfit-search-page-input" className="text-xs font-black uppercase tracking-[0.14em] text-zinc-400">
          Search DraftFit
        </label>
        <input
          id="draftfit-search-page-input"
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="H7/g6, bolt preload, DIN 6885, O-ring…"
          autoComplete="off"
          className="mt-2 w-full border border-zinc-700 bg-zinc-950 px-4 py-3 text-base text-white outline-none placeholder:text-zinc-600 focus:border-orange-500"
        />

        <div className="mt-4 flex gap-2 overflow-x-auto pb-1" role="group" aria-label="Search category">
          {FILTERS.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setFilter(option.value)}
              aria-pressed={filter === option.value}
              className={`shrink-0 border px-3 py-2 text-[10px] font-black uppercase tracking-[0.12em] ${
                filter === option.value
                  ? 'border-orange-500 bg-orange-600/10 text-orange-400'
                  : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <section className="mt-6" aria-live="polite">
        <div className="mb-4 flex flex-wrap items-end justify-between gap-3">
          <h2 className="text-xl font-black">
            {query.trim() ? 'Search results' : 'Start typing to search'}
          </h2>
          {query.trim() ? (
            <p className="text-xs font-bold uppercase tracking-[0.12em] text-zinc-500">
              {results.length} result{results.length === 1 ? '' : 's'}
            </p>
          ) : null}
        </div>

        {query.trim() && results.length ? (
          <div className="grid gap-4 md:grid-cols-2">
            {results.map((result) => (
              <Link
                key={result.id}
                href={result.href}
                className="group border border-zinc-800 bg-zinc-900/60 p-5 hover:border-orange-500"
              >
                <div className="flex flex-wrap gap-2">
                  <span className="text-[9px] font-black uppercase tracking-[0.16em] text-orange-500">
                    {SEARCH_CATEGORY_LABELS[result.category]}
                  </span>
                  <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                    {result.eyebrow}
                  </span>
                </div>
                <h3 className="mt-2 text-lg font-black group-hover:text-orange-400">
                  {result.title}
                </h3>
                <p className="mt-2 text-sm leading-6 text-zinc-400">
                  {result.description}
                </p>
                <p className="mt-4 text-xs font-black uppercase tracking-[0.12em] text-orange-500">
                  Open →
                </p>
              </Link>
            ))}
          </div>
        ) : query.trim() ? (
          <div className="border border-dashed border-zinc-800 p-6 text-sm leading-6 text-zinc-500">
            No results found. Try a calculator name, standard number or a broader
            engineering term.
          </div>
        ) : (
          <div className="border border-dashed border-zinc-800 p-6 text-sm leading-6 text-zinc-500">
            Examples: “H7/g6”, “ISO 3601”, “M10 torque”, “parallel key”, “GD&amp;T position”.
          </div>
        )}
      </section>
    </>
  );
}
