import type { Metadata } from 'next';

import GuidesPageClient from '@/components/guides/GuidesPageClient';

export const metadata: Metadata = {
  title: 'Mechanical Engineering Guides',
  description: 'Practical mechanical engineering guides for fits, O-rings, GD&T, bolts, threads and shaft connections.',
  alternates: { canonical: '/guides' },
};

export default function GuidesPage() {
  return <GuidesPageClient />;
}
