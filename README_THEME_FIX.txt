DraftFit — GLOBAL FOOTER ROUTE THEME FIX

Replace these files in the project:
- src/app/layout.tsx
- src/app/globals.css
- src/app/calculators/page.tsx
- src/components/InfoPageShell.tsx
- src/components/ContentArticleShell.tsx
- src/components/SiteFooter.tsx

What this fixes:
- Stored DraftFit theme is restored before first paint on hard reload.
- About / Methodology / Contact use the chosen Light/Dark theme.
- Guides and individual guide pages inherit the chosen theme through ContentArticleShell.
- Standards and standard articles inherit the chosen theme through ContentArticleShell.
- Search page inherits the chosen theme through ContentArticleShell.
- Calculators index is included in the same theme scope.
- Site footer border/text follows light theme.
- Global search dialog gets a light-theme surface too.

No calculator formulas or engineering data changed.
