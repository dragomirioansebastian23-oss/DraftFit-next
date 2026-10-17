import type { Metadata } from 'next';
import Link from 'next/link';

import ContentArticleShell from '@/components/ContentArticleShell';
import { STANDARDS } from '@/lib/content';

export const metadata: Metadata = {
  title: 'Engineering Standards Reference',
  description: 'DraftFit reference pages for ISO, DIN and ASME standards used by the engineering calculators.',
  alternates: { canonical: '/standards' },
};

export default function StandardsPage() {
  return (
    <ContentArticleShell
      eyebrow="Standards reference"
      title="Engineering Standards"
      intro="Reference pages that explain which standards sit behind DraftFit tools, what each standard covers and where the calculator scope stops."
      backHref="/"
      backLabel="Home"
    >
      <section className="grid gap-5 md:grid-cols-2">
        {STANDARDS.map((standard) => (
          <Link key={standard.slug} href={`/standards/${standard.slug}`} className="group border border-zinc-800 bg-zinc-900/60 p-6 hover:border-zinc-600">
            <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">{standard.reference}</p>
            <h2 className="mt-3 text-xl font-black tracking-tight group-hover:text-orange-400">{standard.title}</h2>
            <p className="mt-3 text-sm leading-6 text-zinc-400">{standard.description}</p>
            <p className="mt-5 text-xs font-black uppercase tracking-[0.14em] text-orange-500">Open reference →</p>
          </Link>
        ))}
      </section>
    </ContentArticleShell>
  );
}
