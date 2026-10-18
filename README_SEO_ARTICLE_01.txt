DRAFTFIT — SEO ARTICLE #1 / ISO FITS

New guide slug:
/guides/h7-g6-vs-h7-h6-vs-h7-k6

Article:
H7/g6 vs H7/h6 vs H7/k6: ISO 286 Fits Explained

Modified files:
- src/lib/content.ts
- src/lib/guides.ro.ts
- src/components/calculators/RelatedEngineeringReading.tsx

What is included:
- Full English article.
- Full Romanian translation.
- 35 mm worked comparison based on DraftFit's implemented ISO 286 data set.
- CTA to ISO 286 Fit Calculator.
- New guide is automatically included by the existing Guides page.
- New guide is automatically added to the existing search index because search derives from GUIDES.
- New guide is automatically added to sitemap.xml because sitemap derives from GUIDES.
- ISO 286 standard page links to the new guide.
- ISO calculator Related Engineering Reading now points to the comparison article.

Engineering example at 35 mm used in the article:
- H7 hole: 35.000–35.025 mm
- g6 shaft: 34.975–34.991 mm => 0.009–0.050 mm clearance
- h6 shaft: 34.984–35.000 mm => 0.000–0.041 mm clearance
- k6 shaft: 35.002–35.018 mm => 0.018 mm interference to 0.023 mm clearance

Validation in the provided source:
- npm run lint: PASS
- npx tsc --noEmit: PASS
- npm test: could not start because the uploaded Windows node_modules lacks @rollup/rollup-linux-x64-gnu in this Linux environment.
- npm run build: Next tried to download @next/swc-linux-x64-gnu, but this environment has no npm network access.

Local verification after merge:
npm run lint
npm test
npm run build

git add .
git commit -m "Add ISO fits comparison SEO guide"
git push
