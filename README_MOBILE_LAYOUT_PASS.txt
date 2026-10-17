DRAFTFIT — PRE-LAUNCH MOBILE LAYOUT PASS

Purpose:
Make the main task (calculate) reachable immediately on phones.

Changed:
- ResponsiveSiteHeader added.
- Mobile header = DraftFit + Search + hamburger.
- EN/RO, theme and calculator navigation moved into the mobile hamburger.
- GlobalSearch floating launcher is hidden on mobile; header opens the same search dialog.
- Homepage is calculator-first.
- Homepage project/report metadata moved below hero into a collapsed section.
- Calculator page title/intro is more compact on phones.
- Quick/Advanced and Metric/Imperial are compact and grouped.
- Their explanatory paragraphs are hidden on phones but remain on tablet/desktop.
- Advanced project/report metadata moved below each calculator and collapsed.
- Mobile outer padding reduced.
- Touch targets remain ~44px minimum.
- No engineering formulas changed.
- No presets/examples were moved in this package.

IMPORTANT NEXT CONTENT PASS:
Per product decision, examples and presets in every calculator will be moved below the primary calculator/result workflow in a separate pass. They should not block access to core inputs.

Testing:
Use production mode for phone testing:
  npm run build
  npm start -- -H 0.0.0.0

Check widths:
  390 / 430 / 768 / 1024 / 1440

Phone journey:
Home -> calculator -> Quick/Advanced -> Metric/Imperial -> first core input -> result -> assistant -> advanced/project details.

Then:
npm test
npm run lint
npm run build
