DRAFTFIT — POINT 12 COMPLETE PACKAGE

Quick Mode / Advanced Mode for all five current calculators.

INSTALL
1. Stop npm run dev with Ctrl+C.
2. Copy EVERYTHING from this package over the root of draftfit-next.
3. Choose Replace when Windows asks.
4. Run:
   npm run lint
   npm run build
   npm run dev

BEHAVIOR
- Quick is the default for a new user.
- The Quick/Advanced preference is stored in localStorage and shared by all calculators.
- Advanced reveals project metadata and detailed engineering controls.
- Existing calculation engines/formulas are preserved.

QUICK MODE SIMPLIFICATION
- ISO 286: core fit controls remain; interference mechanics inputs are Advanced.
- O-Ring: geometry/core seal inputs remain; pressure, gap, temperature, material and backup-ring controls are Advanced.
- Threads/Bolts: size, pitch, bolt class and preload remain; tolerance, friction/tightening details and internal-thread checks are Advanced.
- Parallel Keys: shaft diameter, torque and selected length remain; allowable pressure/shear inputs are Advanced.
- GD&T: core reference stays visible; measurement/caution depth and project metadata are Advanced.

VALIDATION PERFORMED BEFORE PACKAGING
- ESLint: passed using the project's installed ESLint.
- TypeScript tsc --noEmit: passed.
- Full Next build could not be executed in the Linux sandbox because the uploaded Windows node_modules does not contain the Linux Next.js SWC binary and the sandbox has no internet access to download it. Run npm run build on your Windows machine as the final check.

FILES INCLUDED
- src/app/globals.css
- src/components/calculators/CalculatorModeSwitch.tsx
- src/components/calculators/GdtCalculatorClient.tsx
- src/components/calculators/GdtModule.jsx
- src/components/calculators/IsoCalculatorClient.tsx
- src/components/calculators/IsoModule.jsx
- src/components/calculators/KeysCalculatorClient.tsx
- src/components/calculators/KeysModule.jsx
- src/components/calculators/OringCalculatorClient.tsx
- src/components/calculators/OringModule.jsx
- src/components/calculators/ThreadsCalculatorClient.tsx
- src/components/calculators/ThreadsModule.jsx
