DraftFit — Guides Romanian + Light/Dark Fix

Includes:
- Guides index reads draftfit-language and draftfit-theme.
- All 9 guide articles have Romanian visible-content translations.
- Guide cards, article sections, CTA, related standards and footer support Light/Dark.
- English metadata / canonical routes remain unchanged for SEO.
- No calculator formulas or engineering engines changed.

Validation performed:
- ESLint: PASS on all modified files.
- TypeScript `tsc --noEmit`: PASS.

After merge:
  npm run lint
  npm test
  npm run build

For mobile QA use production mode:
  npm run build
  npm start -- -H 0.0.0.0
