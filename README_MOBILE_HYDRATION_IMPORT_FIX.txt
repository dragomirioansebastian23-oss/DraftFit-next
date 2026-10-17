DRAFTFIT — MOBILE HYDRATION IMPORT FIX

This fixes the parser error introduced by the previous package:
'import' and 'export' cannot be used outside of module code.

Cause:
The safeBrowserStorage import was accidentally inserted at the bottom
of several client component files.

Fix:
The import is now placed correctly in the top import block for:
- DraftFitShell.tsx
- EngineeringPreferences.tsx
- IsoCalculatorClient.tsx
- OringCalculatorClient.tsx
- GdtCalculatorClient.tsx
- ThreadsCalculatorClient.tsx
- KeysCalculatorClient.tsx

The safeBrowserStorage helper and /mobile-diagnostics page are preserved.
No calculator formulas were changed.

After copying:
1. Stop server.
2. Delete .next.
3. npm test
4. npm run lint
5. npm run build
6. npm run dev -- -H 0.0.0.0
7. Open /mobile-diagnostics on the phone.
