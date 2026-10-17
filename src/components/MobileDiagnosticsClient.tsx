"use client";

import { useState, useSyncExternalStore } from 'react';
import { safeStorageGet } from '@/lib/safeBrowserStorage';

const subscribe = () => () => {};

export default function MobileDiagnosticsClient() {
  const [count, setCount] = useState(0);
  const mounted = useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );

  const storageStatus = mounted
    ? safeStorageGet('draftfit-mobile-diagnostic') !== null
      ? 'available'
      : 'available / empty or blocked'
    : 'checking';

  return (
    <main className="min-h-screen bg-zinc-950 px-5 py-8 text-zinc-100">
      <div className="mx-auto max-w-xl space-y-6">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.18em] text-orange-500">
            DraftFit mobile diagnostics
          </p>
          <h1 className="mt-2 text-3xl font-black">React hydration check</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-400">
            Minimal client-side interaction test.
          </p>
        </div>

        <section className="border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm">
            Client mounted:{' '}
            <strong className={mounted ? 'text-emerald-400' : 'text-rose-400'}>
              {mounted ? 'YES' : 'NO'}
            </strong>
          </p>
          <p className="mt-2 text-sm">
            localStorage: <strong className="text-cyan-400">{storageStatus}</strong>
          </p>
          <p className="mt-2 break-all text-xs text-zinc-500">
            {mounted ? navigator.userAgent : 'server'}
          </p>
        </section>

        <section className="border border-zinc-800 bg-zinc-900 p-5">
          <p className="text-sm font-bold">React button test</p>
          <p className="mt-2 text-4xl font-black text-orange-500">{count}</p>
          <button
            type="button"
            onClick={() => setCount((value) => value + 1)}
            className="mt-4 min-h-12 w-full bg-orange-600 px-4 py-3 font-black text-white"
          >
            TAP ME — COUNT +1
          </button>
        </section>

        <section className="border border-zinc-800 bg-zinc-900 p-5">
          <label className="block text-xs font-black uppercase tracking-wider text-zinc-400">
            Native input test
          </label>
          <input
            className="mt-3 min-h-12 w-full border border-zinc-700 bg-zinc-950 px-3 text-base"
            placeholder="Type here"
          />

          <label className="mt-5 block text-xs font-black uppercase tracking-wider text-zinc-400">
            Native select test
          </label>
          <select className="mt-3 min-h-12 w-full border border-zinc-700 bg-zinc-950 px-3 text-base">
            <option>Option A</option>
            <option>Option B</option>
          </select>
        </section>
      </div>
    </main>
  );
}
