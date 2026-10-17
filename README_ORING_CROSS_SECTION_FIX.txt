DRAFTFIT — O-RING CROSS-SECTION UX FIX

Replace:
src/components/calculators/OringModule.jsx

Changes:
- Removed the ambiguous label "ISO / AS568 nominal series".
- Cross-section selector is grouped into:
  * Common nominal series
  * Common metric sections
  * Custom
- Added Custom cross-section input.
- Custom CS is supported from 1.50 to 6.99 mm.
- For a custom CS, DraftFit linearly interpolates the stored groove preset geometry
  between the two neighboring DraftFit cross-section presets.
- Custom interpolation is clearly marked as PRELIMINARY and NOT standardized.
- Existing squeeze, gland fill, stretch/compression and extrusion calculations remain.
- Existing assistant, Quick/Advanced, Metric/Imperial, presets, share and copy/report behavior remain.

Engineering note:
The stored DraftFit preset dataset is not represented as a complete ISO 3601 or AS568
catalog. Production geometry must be verified against the controlled standard or the
manufacturer's current catalog.

After replace:
npm test
npm run lint
npm run build
npm run dev
