DRAFTFIT — KEYS / KEYWAYS PRE-LAUNCH ENGINEERING + UX PASS

Replace:
src/components/calculators/KeysModule.jsx

Implemented:
- Key Selection Assistant:
  * Select a standard starting key
  * Check the selected nominal key length
- Keeps the DIN 6885-1 section selection based on shaft diameter.
- Primary result now emphasizes:
  * b × h × L
  * calculated minimum nominal length
  * next preferred DraftFit nominal length
  * shear utilization
  * contact-pressure utilization
  * controlling criterion
- One-click "use suggested length" action.
- Strength assumptions are visible:
  * default DraftFit 90 MPa contact / 60 MPa shear screening values
  * custom allowables
- Explicit warning that a passing key check does NOT validate shaft/hub fatigue or keyway stress concentration.
- DIN 6885-1 dimensional role and DIN 6892 design-check role are visually separated.
- Existing simplified mechanical engine is preserved.
- Existing engineering test functions are exported by name.
- Mobile spacing improved.

Engineering boundary:
The module remains a preliminary static screening tool.
It does NOT implement a complete DIN 6892 design calculation and does not replace fatigue, shock/reversal, shaft, hub, material, manufacturing or full keyed-joint verification.

After replace:
npm test
npm run lint
npm run build
npm run dev

Manual checks:
- d = 30 mm should select 8 × 7 mm.
- d > 30 mm (e.g. 30.01) should select 10 × 8 mm.
- Increasing torque should increase required length/utilization.
- Reducing allowables should increase utilization and required length.
- "Use suggested nominal length" should set the current L to the recommended preferred length.
- Mobile width around 390 px should have no horizontal overflow.
