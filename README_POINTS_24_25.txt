DRAFTFIT — BLOCK B — POINTS 24–25
AUTOMATED TESTS + REFERENCE CASES

POINT 24 — AUTOMATED TEST INFRASTRUCTURE
- Adds Vitest.
- Adds npm test and npm run test:watch.
- Tests call exported helper functions from the actual production calculator modules.
- No duplicate fake calculator engine was created for the test suite.

POINT 25 — REFERENCE CASES
Initial reference matrix covers all five current modules:
- ISO 286: Ø25 H7/g6 external cross-check
- O-ring: equation-level arithmetic cases
- Threads/Bolts: M10 × 1.5 hand-calculation baseline
- Parallel Keys: range-boundary and hand-calculation baseline
- GD&T: ISO/ASME rule-profile regression cases

IMPORTANT
The validation matrix explicitly preserves the distinction between:
- regression/equation validation
- full controlled-standard certification

INSTALL
This Block B is based on Block A (Points 21–23).

1. Stop the server with Ctrl+C.
2. Copy the whole ZIP over:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next
3. Choose Replace.
4. Because Vitest is a new dev dependency, run ONCE:
   npm install
5. Then run:
   npm test
   npm run lint
   npm run build
   npm run dev

EXPECTED
npm test should run five test files:
- iso286.test.ts
- oring.test.ts
- threads.test.ts
- keys.test.ts
- gdt.test.ts

See VALIDATION_MATRIX.md for what each case proves and what remains a
controlled-standard responsibility.


FIX REVISION
- TypeScript nullability checks added to Keys and Threads reference tests.
- This fixes TS18047 errors during `next build`.
- Calculator engines and engineering formulas are unchanged.
