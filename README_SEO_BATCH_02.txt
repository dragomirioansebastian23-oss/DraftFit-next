DraftFit SEO Batch 02

Replace these files:
- src/lib/content.ts
- src/lib/guides.ro.ts
- src/components/calculators/RelatedEngineeringReading.tsx

This package PRESERVES article #1:
- H7/g6 vs H7/h6 vs H7/k6: ISO 286 Fits Explained

This batch adds/upgrades 5 SEO content assets:
1) Expanded existing guide:
   /guides/clearance-transition-interference-fits
   Clearance vs Transition vs Interference Fits: ISO 286 Explained

2) New Threads guide:
   /guides/metric-bolt-torque-8-8-vs-10-9-vs-12-9
   Metric Bolt Torque: 8.8 vs 10.9 vs 12.9 + Calculator

3) New Keys guide:
   /guides/din-6885-parallel-key-size-chart-design-guide
   DIN 6885 Parallel Key Size Chart + Design Guide

4) New O-Ring guide:
   /guides/o-ring-groove-dimensions-squeeze-stretch-fill
   O-Ring Groove Dimensions: Squeeze, Stretch & Gland Fill Explained

5) New GD&T guide:
   /guides/gdt-position-tolerance-explained-examples
   GD&T Position Tolerance Explained with Practical Examples

Also updated:
- Romanian translations for every new/expanded guide.
- Related Engineering Reading links in calculator pages.
- Standard page guide cross-links.
- Search and sitemap require no direct edit because both are generated from GUIDES.

Validation in this environment:
- ESLint on modified files: PASS
- TypeScript tsc --noEmit: PASS
- Vitest cannot start here because the uploaded Windows node_modules does not include @rollup/rollup-linux-x64-gnu.

Run locally after merge:
npm run lint
npm test
npm run build

Then:
git add .
git commit -m "Add SEO content batch for engineering calculators"
git push
