'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

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

export default function GlobalSearch() {
  const pathname = usePathname();

  return <GlobalSearchInner key={pathname} />;
}

function GlobalSearchInner() {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<SearchFilter>('all');
  const [activeIndex, setActiveIndex] = useState(0);

  const results = useMemo(
    () => searchDraftFit(query, filter, 8),
    [query, filter],
  );

  useEffect(() => {
    function handleOpenSearch() {
      setOpen(true);
    }

    window.addEventListener('draftfit:open-search', handleOpenSearch);
    return () => window.removeEventListener('draftfit:open-search', handleOpenSearch);
  }, []);

  useEffect(() => {
    function handleShortcut(event: KeyboardEvent) {
      if ((event.ctrlKey || event.metaKey) && event.key.toLowerCase() === 'k') {
        event.preventDefault();
        setOpen((current) => !current);
      }
    }

    window.addEventListener('keydown', handleShortcut);
    return () => window.removeEventListener('keydown', handleShortcut);
  }, []);

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.requestAnimationFrame(() => inputRef.current?.focus());

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  function closeSearch() {
    setOpen(false);
  }

  function submitFullSearch() {
    const trimmed = query.trim();
    if (!trimmed) return;

    router.push(`/search?q=${encodeURIComponent(trimmed)}`);
    closeSearch();
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Escape') {
      event.preventDefault();
      closeSearch();
      return;
    }

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setActiveIndex((current) =>
        Math.min(current + 1, Math.max(results.length - 1, 0)),
      );
      return;
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setActiveIndex((current) => Math.max(current - 1, 0));
      return;
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      const selected = results[activeIndex];

      if (selected) {
        router.push(selected.href);
        closeSearch();
      } else {
        submitFullSearch();
      }
    }
  }

  return (
    <>
      {open ? (
        <div
          className="draftfit-search-overlay print:hidden"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) closeSearch();
          }}
        >
          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="draftfit-search-title"
            className="draftfit-search-dialog"
          >
            <div className="flex items-start justify-between gap-4 border-b border-zinc-800 p-4 sm:p-5">
              <div>
                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-orange-500">
                  DraftFit knowledge search
                </p>
                <h2
                  id="draftfit-search-title"
                  className="mt-1 text-lg font-black text-white"
                >
                  Search calculators, guides and standards
                </h2>
              </div>

              <button
                type="button"
                onClick={closeSearch}
                className="border border-zinc-700 px-3 py-2 text-xs font-black text-zinc-300 hover:border-orange-500 hover:text-white"
                aria-label="Close search"
              >
                ESC
              </button>
            </div>

            <div className="p-4 sm:p-5">
              <label htmlFor="draftfit-global-search" className="sr-only">
                Search DraftFit
              </label>
              <div className="flex border border-zinc-700 bg-zinc-950 focus-within:border-orange-500">
                <span
                  aria-hidden="true"
                  className="flex items-center px-3 text-lg text-zinc-500"
                >
                  ⌕
                </span>
                <input
                  id="draftfit-global-search"
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    setActiveIndex(0);
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder="Try H7/g6, M10 torque, ISO 3601…"
                  autoComplete="off"
                  className="min-w-0 flex-1 bg-transparent px-1 py-3 text-base text-white outline-none placeholder:text-zinc-600"
                />
              </div>

              <div
                className="mt-4 flex gap-2 overflow-x-auto pb-1"
                role="group"
                aria-label="Search category"
              >
                {FILTERS.map((option) => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => {
                      setFilter(option.value);
                      setActiveIndex(0);
                    }}
                    aria-pressed={filter === option.value}
                    className={`shrink-0 border px-3 py-1.5 text-[10px] font-black uppercase tracking-[0.12em] ${
                      filter === option.value
                        ? 'border-orange-500 bg-orange-600/10 text-orange-400'
                        : 'border-zinc-800 text-zinc-500 hover:border-zinc-600 hover:text-zinc-300'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="mt-5" aria-live="polite">
                {!query.trim() ? (
                  <div className="border border-dashed border-zinc-800 p-5 text-sm leading-6 text-zinc-500">
                    Search the current DraftFit calculators, engineering guides,
                    standards references and utility pages. Keyboard shortcut:
                    <strong className="ml-1 text-zinc-300">Ctrl/⌘ + K</strong>.
                  </div>
                ) : results.length ? (
                  <div className="space-y-2">
                    {results.map((result, index) => (
                      <Link
                        key={result.id}
                        href={result.href}
                        onMouseEnter={() => setActiveIndex(index)}
                        className={`block border p-4 transition-colors ${
                          activeIndex === index
                            ? 'border-orange-500 bg-orange-500/5'
                            : 'border-zinc-800 bg-zinc-900/50 hover:border-zinc-600'
                        }`}
                      >
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[9px] font-black uppercase tracking-[0.16em] text-orange-500">
                            {SEARCH_CATEGORY_LABELS[result.category]}
                          </span>
                          <span className="text-[9px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                            {result.eyebrow}
                          </span>
                        </div>
                        <p className="mt-1 font-black text-white">
                          {result.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-xs leading-5 text-zinc-400">
                          {result.description}
                        </p>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <div className="border border-dashed border-zinc-800 p-5 text-sm text-zinc-500">
                    No DraftFit content matched “{query}”. Try a standard number,
                    calculator name or engineering term.
                  </div>
                )}
              </div>

              {query.trim() ? (
                <div className="mt-4 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800 pt-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-zinc-600">
                    ↑ ↓ navigate · Enter open · Esc close
                  </p>
                  <button
                    type="button"
                    onClick={submitFullSearch}
                    className="text-xs font-black uppercase tracking-[0.12em] text-orange-500 hover:text-orange-400"
                  >
                    View all results →
                  </button>
                </div>
              ) : null}
            </div>
          </section>
        </div>
      ) : null}
    </>
  );
}
