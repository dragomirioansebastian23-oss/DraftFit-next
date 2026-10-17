DRAFTFIT — ISO + O-RING CORE-FIRST LAYOUT PASS

Replace:
- src/components/calculators/IsoModule.jsx
- src/components/calculators/OringModule.jsx

Structural UX changes only:
- Removed assistant, presets/examples, Share and Copy from above the core calculator inputs.
- Core inputs are now encountered first.
- Share / Copy appear immediately after the primary result area.
- Assistant is moved below the calculation/detail workflow.
- Examples/presets are below the calculator and collapsed by default.
- ISO common fit presets are also moved out of the core input panel.
- Engineering notes / standards remain after optional guidance.
- Reduced some mobile result padding.

Target flow:
Core inputs -> Primary result -> Share/Copy -> Detailed results -> Assistant -> Examples/Presets -> Notes/Standards.

No engineering formulas, data tables, defaults, units or calculation logic were changed.

Run:
npm test
npm run lint
npm run build
npm start -- -H 0.0.0.0

Test on phone in production mode.
