DraftFit — theme/build TypeScript compatibility fix

Replace these files:
- src/components/ContentArticleShell.tsx
- src/components/SiteFooter.tsx

Fixes:
- ContentArticleShell accepts optional isDark and lang again.
- ArticleSection accepts optional isDark again.
- SiteFooter accepts optional isDark/lang and keeps RO/EN copy.
- Keeps draftfit-content-page / draftfit-site-footer class hooks for the global persisted-theme CSS.
- Resolves TS2322 errors from GuideArticleClient.tsx and GuidesPageClient.tsx.

Then run separately:
  npm run lint
  npm run build
  npm start -- -H 0.0.0.0

Only run npm start after npm run build completes successfully.
