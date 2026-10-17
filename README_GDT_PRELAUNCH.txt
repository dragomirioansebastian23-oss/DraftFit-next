DRAFTFIT — GD&T PRE-LAUNCH UX / DECISION-AID PASS

Replace:
src/components/calculators/GdtModule.jsx

Implemented:
- GD&T Selection Assistant:
  * Shape / Form
  * Orientation
  * Location
  * Profile
  * Rotation / Runout
- Assistant presents controls to evaluate instead of forcing a user to already know the symbol.
- Very visible Datum status:
  * YES — required
  * NO
  * OPTIONAL
- Quick category / tolerance-zone summary.
- "When to use this" guidance for every current control.
- "Common confusion" guidance for the most frequently misunderstood controls.
- Related controls for fast comparison.
- ASME Y14.5-2018 callout explaining why Concentricity / Symmetry are hidden in DraftFit ASME mode.
- Mobile-friendly main card sizing and padding.
- Existing ISO/ASME filtering, presets, share, copy result and reference data are preserved.
- Existing test exports GDT_ELEMENTS / STANDARD_PROFILES / GDT_META are preserved.

Engineering boundary:
The assistant suggests CONTROL FAMILIES to evaluate.
It does not automatically choose:
- a tolerance value
- a datum reference frame
- material condition modifiers
- an inspection procedure
- a production drawing specification

Install:
1. Ctrl+C
2. Copy ZIP contents over the root of draftfit-next.
3. Replace GdtModule.jsx.
4. Run:
   npm test
   npm run lint
   npm run build
   npm run dev

Recommended checks:
- ISO -> Flatness: Datum NO
- ISO -> Parallelism: Datum YES
- ASME -> Position: Datum YES
- ASME: Concentricity and Symmetry should remain hidden
- Circular runout vs Total runout related controls
- Mobile width around 390 px
