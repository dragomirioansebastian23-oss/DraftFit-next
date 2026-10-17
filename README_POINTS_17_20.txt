DRAFTFIT — POINTS 17–20
ENGINEERING REPORT + EXPLANATION + METHODOLOGY + ENGINEERING BASIS

THIS PACKAGE COMPLETES

POINT 17 — Engineering Report / PDF export
POINT 18 — Explain This Result
POINT 19 — Formulas & Methodology
POINT 20 — Engineering Basis / Standards / Assumptions / Warnings

IMPLEMENTED FOR ALL FIVE CALCULATORS

- ISO 286 Fit Calculator
- O-Ring Groove Calculator
- GD&T Reference & Calculator
- Metric Thread & Bolt Calculator
- Parallel Key Calculator

POINT 17 — ENGINEERING REPORT

Each calculator now has:

- Quick PDF
  Prints the compact calculator/result report.

- Full Engineering Report
  Prints the calculator/result plus:
  * result interpretation
  * formulas & methodology
  * engineering basis / standards
  * assumptions
  * warnings / limitations

The browser print dialog opens.
Choose:
  Save as PDF

The report includes a print-only DraftFit report header with:
- calculator name
- part name
- drawing number
- engineer
- selected unit system
- engineering disclaimer

A4-oriented print styling was added.

POINT 18 — EXPLAIN THIS RESULT

Each calculator now contains:
  Explain this result / Explică rezultatul

This gives engineering interpretation of the displayed result:
- how to read the main result
- what the primary checks mean
- what a preliminary PASS / REVIEW means
- what still needs engineering verification

English and Romanian are both supported.

POINT 19 — FORMULAS & METHODOLOGY

Each calculator now has a dedicated section describing its main implemented equations
and calculation methodology.

Examples:
- ISO 286 limit dimensions and clearance equations
- O-ring squeeze / gland-fill concepts
- bolt preload / torque / stripping methodology
- key tangential force / shear / bearing checks
- GD&T tolerance-zone methodology

POINT 20 — ENGINEERING BASIS / STANDARDS / ASSUMPTIONS / WARNINGS

Each calculator now contains separate sections for:
- Engineering basis & standards
- Assumptions
- Warnings / limits

The wording explicitly distinguishes:
- standard-derived/reference information
- implemented engineering calculations
- preliminary estimators
- cases requiring project-specific verification

IMPORTANT

This update does NOT replace or rewrite the validated calculation engines.

The new sections explain and document the existing calculations.

REPORT BEHAVIOR

Quick PDF:
- compact engineering result
- engineering documentation section is hidden

Full Engineering Report:
- includes the engineering documentation sections

The existing calculator export/print buttons remain usable.

INSTALL

1. Stop Next.js:
   Ctrl+C

2. Copy the complete contents of this ZIP over:

   C:\Users\sebis\OneDrive\Desktop\draftfit-next

3. Choose Replace.

4. Run:

   npm run lint
   npm run build
   npm run dev

TEST

For each of the five calculators:

1. Open the calculator.
2. Scroll below the calculator/results.
3. Check:
   - Explain this result
   - Formulas & methodology
   - Engineering basis & standards
   - Assumptions
   - Warnings / limits
4. Click Quick PDF.
5. Cancel the print dialog.
6. Click Full Engineering Report.
7. Verify the additional documentation appears in the print preview.
8. Use Save as PDF if you want to inspect the resulting file.

VALIDATION PERFORMED BEFORE PACKAGING

- ESLint: passed
- TypeScript: tsc --noEmit passed

The final Next.js production build should be run on your Windows machine because
the uploaded dependency tree contains Windows platform binaries.
