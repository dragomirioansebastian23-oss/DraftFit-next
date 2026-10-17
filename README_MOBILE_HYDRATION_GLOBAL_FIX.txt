DRAFTFIT — MOBILE HYDRATION GLOBAL FIX + DIAGNOSTICS

This package addresses the remaining mobile-only interaction failure at the client-shell level.

Files changed:
- src/components/DraftFitShell.tsx
- src/components/EngineeringPreferences.tsx
- src/components/calculators/IsoCalculatorClient.tsx
- src/components/calculators/OringCalculatorClient.tsx
- src/components/calculators/GdtCalculatorClient.tsx
- src/components/calculators/ThreadsCalculatorClient.tsx
- src/components/calculators/KeysCalculatorClient.tsx

Files added:
- src/lib/safeBrowserStorage.ts
- src/components/MobileDiagnosticsClient.tsx
- src/app/mobile-diagnostics/page.tsx

What changed:
- All direct localStorage get/set calls in these client wrappers now go through safe try/catch helpers.
- A browser that blocks or throws on storage can no longer crash the client component tree.
- Calculator formulas are untouched.
- Quick/Advanced and Metric/Imperial switch files are not replaced by this package; keep the latest MOBILE_STATE_LINT_FIX versions already installed.

Install:
1. Stop dev server.
2. Copy ZIP contents over project root.
3. Delete .next.
4. Run:
   npm test
   npm run lint
   npm run build
   npm run dev -- -H 0.0.0.0

Mobile diagnostic:
Open:
http://YOUR-PC-IP:3000/mobile-diagnostics

Expected:
- Client mounted: YES
- React button increments 0 -> 1 -> 2
- native input accepts typing
- native select opens
- localStorage can be either available OR blocked/unavailable; both should now be safe

Interpretation:
A) Diagnostics React button works, calculators don't:
   -> React hydration is healthy; remaining bug is calculator/switch-specific.
B) Client mounted stays NO and React button does nothing:
   -> mobile browser is not hydrating the Next.js client bundle.
C) Diagnostics fully works and calculators work:
   -> blocker fixed.
