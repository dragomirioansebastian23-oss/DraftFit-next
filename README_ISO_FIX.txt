DRAFTFIT ISO 286 PRE-LAUNCH FIX

This file is rebuilt from the current Point 42-44 ISO module, so it preserves:
- Metric / Imperial
- Quick / Advanced
- presets
- share links
- Copy Result
- engineering report hooks
- exported calculation helpers used by Vitest

It also includes the Fit Selection Assistant and result-first UX.

Replace:
src/components/calculators/IsoModule.jsx

Then run separately:
npm test
npm run lint
npm run build
npm run dev
