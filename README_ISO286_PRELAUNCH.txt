DRAFTFIT — ISO 286 PRE-LAUNCH UX / ENGINEERING PASS

Replace:
src/components/calculators/IsoModule.jsx

Changes:
- Fit Selection Assistant for users who do not already know the fit code.
- Hole-basis starting points:
  H7/g6
  H7/h6
  H7/k6
  H7/m6
  H7/p6
  H7/s6
- Clear disclaimer that suggestions are starting points for evaluation, not automatic design recommendations.
- Primary result hero for clearance / transition / interference.
- Transition fit explicitly shows:
  maximum possible clearance
  maximum possible interference
- More conservative preset wording.
- Default example changed to Ø25 H7/g6.
- Mobile-friendly padding improvements.
- Boundary classification corrected:
  cMin >= 0 -> clearance
  cMax <= 0 -> interference
  transition only when the tolerance range genuinely crosses zero.

Engineering formulas and ISO data tables are otherwise preserved.

Install:
1. Stop server with Ctrl+C.
2. Copy the ZIP contents over the root of draftfit-next.
3. Replace the existing IsoModule.jsx.
4. Run:
   npm test
   npm run lint
   npm run build
   npm run dev

Then open:
http://localhost:3000/calculators/iso-286-fit-calculator

Recommended checks:
- Ø25 H7/g6 -> clearance
- Ø25 H7/h6 -> clearance with 0 theoretical minimum clearance
- Ø25 H7/k6 -> transition
- Ø25 H7/p6 -> interference
- Test at mobile width around 390 px
