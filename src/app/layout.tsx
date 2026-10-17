import type {
  Metadata,
  Viewport,
} from 'next';

import './globals.css';

import GlobalSearch from '@/components/GlobalSearch';

import {
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_URL,
  SHOULD_INDEX_SITE,
} from '@/lib/site';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: `${SITE_NAME} — Mechanical Engineering Calculators`,
    template: `%s | ${SITE_NAME}`,
  },

  description: SITE_DESCRIPTION,

  applicationName: SITE_NAME,

  category: 'engineering',

  openGraph: {
    type: 'website',
    siteName: SITE_NAME,
    title: `${SITE_NAME} — Mechanical Engineering Calculators`,
    description: SITE_DESCRIPTION,
    url: '/',
    images: ['/opengraph-image'],
  },

  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} — Mechanical Engineering Calculators`,
    description: SITE_DESCRIPTION,
    images: ['/opengraph-image'],
  },

  robots: {
    index: SHOULD_INDEX_SITE,
    follow: SHOULD_INDEX_SITE,
  },

  manifest: '/manifest.webmanifest',
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  themeColor: [
    {
      media: '(prefers-color-scheme: dark)',
      color: '#09090b',
    },
    {
      media: '(prefers-color-scheme: light)',
      color: '#f4f4f5',
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
    >
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('draftfit-theme');var l=localStorage.getItem('draftfit-language');if(t==='light'||t==='dark'){document.documentElement.dataset.theme=t;}if(l==='en'||l==='ro'){document.documentElement.lang=l;}}catch(e){}})();`,
          }}
        />
      </head>
      <body suppressHydrationWarning>
        <a href="#main-content" className="draftfit-skip-link">
          Skip to main content
        </a>
        <GlobalSearch />
        {children}
      </body>
    </html>
  );
}
