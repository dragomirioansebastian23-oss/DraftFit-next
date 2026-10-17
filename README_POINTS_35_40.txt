DRAFTFIT — BLOCK — POINTS 35–40
GUIDES + STANDARDS + LONG-TAIL SEO + INTERNAL LINKING

POINT 35 — /guides
- Adds a central engineering guides hub.
- Adds data-driven static guide pages with individual metadata and TechArticle JSON-LD.

POINT 36 — INITIAL TECHNICAL GUIDES
- H7/g6 Fit Explained
- Clearance vs Transition vs Interference Fits
- O-Ring Squeeze Explained
- Bolt Preload vs Tightening Torque
- Parallel Key: Shear vs Bearing Pressure
- GD&T Position vs Concentricity

POINT 37 — /standards
- Adds a central standards reference hub.

POINT 38 — STANDARD-SPECIFIC PAGES
- ISO 286
- ISO 3601
- ISO 1101
- ISO 273
- ISO 898-1
- DIN 6885-1
- ASME Y14.5

POINT 39 — LONG-TAIL SEARCH PAGES
- M10 Bolt Torque Guide
- 3.53 mm O-Ring Groove Dimensions Guide
- DIN 6885 Key Size for a 35 mm Shaft
- H7/g6 page also targets an important fit-specific search intent

The content intentionally avoids claiming one universal torque or groove dimension when the engineering answer depends on application assumptions.

POINT 40 — INTERNAL LINKING
- Calculator -> guide / standard links
- Guide -> calculator + related standards
- Standard -> calculator + related guides
- Footer -> Guides + Standards
- All new routes are added to sitemap.xml

SEO
- Individual page titles/descriptions/canonicals
- Open Graph metadata
- TechArticle structured data
- Static params for every content page

IMPORTANT COPYRIGHT / STANDARDS NOTE
These pages are original orientation and educational summaries. They do not reproduce standard tables or replace a controlled copy of a standard.

CURRENT STANDARD STATUS NOTES USED IN CONTENT
- ISO 286-1:2010 confirmed current in 2026
- ISO 3601-2:2025 current housing-dimensions edition
- ISO 1101:2017 current published edition
- ISO 273:1979 confirmed in 2024
- ISO 898-1:2013 confirmed in 2025; replacement work item under development
- DIN 6885-1:2021-11 listed current by DIN Media
- ASME Y14.5-2018 (R2024) currently in effect according to ASME

INSTALL
1. Stop server: Ctrl+C
2. Copy the entire ZIP over:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next
3. Choose Replace.
4. Run separately:
   npm test
   npm run lint
   npm run build
   npm run dev

CHECK
http://localhost:3000/guides
http://localhost:3000/standards
http://localhost:3000/guides/h7-g6-fit-explained
http://localhost:3000/guides/m10-bolt-torque-guide
http://localhost:3000/standards/iso-286
http://localhost:3000/standards/asme-y14-5
http://localhost:3000/sitemap.xml
