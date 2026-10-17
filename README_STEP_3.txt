DRAFTFIT — STEP 3 COMPLETE

This package consolidates the whole current SEO/navigation step.

COPY:
Copy the contents of this ZIP over the ROOT of your draftfit-next project.
Choose Replace when Windows asks.

THIS PACKAGE DOES NOT REPLACE:
- IsoModule.jsx
- OringModule.jsx
- GdtModule.jsx
- ThreadsModule.jsx
- KeysModule.jsx
- calculator client wrappers
- globals.css

IT DOES REPLACE / ADD:
- src/components/DraftFitShell.tsx
- src/app/layout.tsx
- src/app/page.tsx
- src/app/calculators/page.tsx
- all five calculator page.tsx files
- src/app/sitemap.ts
- src/app/robots.ts
- src/app/manifest.ts
- src/lib/site.ts
- src/lib/calculators.ts
- src/lib/seo.ts
- .env.local.example

AFTER COPYING:
1. npm run lint
2. npm run build
3. npm run dev

CHECK:
http://localhost:3000
http://localhost:3000/calculators
http://localhost:3000/sitemap.xml
http://localhost:3000/robots.txt
http://localhost:3000/manifest.webmanifest

IMPORTANT:
On localhost, robots.txt intentionally blocks indexing.
When the final domain is known, set NEXT_PUBLIC_SITE_URL in Vercel.
robots.txt will then allow indexing and sitemap/canonical URLs will use the live domain.
