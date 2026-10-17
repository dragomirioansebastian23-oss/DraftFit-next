DRAFTFIT — O-RING PRE-LAUNCH UX / ENGINEERING PASS

Replace:
src/components/calculators/OringModule.jsx

Implemented:
- Seal Selection Assistant:
  * Piston / Rod / Face
  * Static / Dynamic
  * Low / Medium / High pressure context
  * cross-section starting points based on hardware scale
- Assistant loads a coherent starting geometry for evaluation.
- Starting points are explicitly labelled as DraftFit heuristics, NOT ISO recommendations.
- No automatic back-up ring is forced; the existing extrusion/back-up evaluation remains authoritative for the preliminary screen.
- Stronger Primary Result:
  * preliminary OK / review required
  * squeeze
  * gland fill
  * circumferential stretch/compression
  * extrusion risk
- Dynamic-seal warning is much more visible.
- Mobile padding and control layout improved.
- Existing Quick/Advanced, Metric/Imperial, presets, share links and Copy Result are preserved.
- Existing engineering equations and O-ring/groove data are preserved.

Important engineering boundary:
This remains a preliminary geometry/design aid.
It does not replace:
- controlled ISO 3601 data
- manufacturer compound data
- fluid compatibility review
- surface finish / lubrication / velocity / wear review
- final extrusion and backup-ring design

Install:
1. Ctrl+C
2. Copy ZIP contents over the root of draftfit-next.
3. Replace OringModule.jsx.
4. Run:
   npm test
   npm run lint
   npm run build
   npm run dev

Recommended manual checks:
- Static piston, 40 mm hardware, 3.53 mm CS
- Dynamic rod, 25 mm hardware, 2.62 mm CS
- Face seal, 50 mm mean diameter, 3.53 mm CS
- High-pressure assistant context should make extrusion/back-up review visible where applicable
- Mobile width around 390 px
