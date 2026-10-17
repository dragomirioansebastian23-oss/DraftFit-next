import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'DraftFit — Mechanical Engineering Calculators',
    short_name: 'DraftFit',
    description:
      'Mechanical engineering calculators and design tools.',
    start_url: '/',
    display: 'standalone',
    background_color: '#09090b',
    theme_color: '#ea580c',
    icons: [
      {
        src: '/favicon.ico',
        sizes: 'any',
        type: 'image/x-icon',
      },
    ],
    categories: [
      'engineering',
      'education',
      'productivity',
      'utilities',
    ],
  };
}
