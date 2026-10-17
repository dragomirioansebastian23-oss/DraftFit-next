DRAFTFIT — BLOCK — POINTS 26–28
RESPONSIVE + ACCESSIBILITY + PERFORMANCE

POINT 26 — RESPONSIVE
- Improved mobile spacing on homepage, info pages and all calculator shells.
- Calculator mode and unit-system controls now use full available width on small screens.
- Long engineering content is protected against horizontal overflow.
- Inputs switch to mobile-safe 16 px text sizing on small screens to avoid unwanted browser zoom.
- Media and preformatted technical content are constrained to the viewport.
- Calculator headers wrap more safely on narrow screens.

POINT 27 — ACCESSIBILITY
- Adds a global "Skip to main content" keyboard link.
- Adds a focus target to every primary <main>.
- Adds clear global :focus-visible outlines.
- Language and theme buttons now expose accessible labels and pressed state.
- Project metadata labels are programmatically associated with their input fields.
- Quick / Advanced and Metric / Imperial controls are exposed as labelled button groups.
- "Explain this result" exposes aria-expanded and aria-controls.
- Contact-form copy status is announced through an aria-live status region.
- Reduced-motion preferences are respected.

POINT 28 — PERFORMANCE / CORE WEB VITALS PREPARATION
- Removes a potential hydration mismatch source in all five calculator shells:
  theme/language browser preferences are restored only after the first client hydration.
- Below-the-fold engineering documentation uses content-visibility on screen.
- Adds an intrinsic-size placeholder for that deferred documentation to reduce rendering work.
- Keeps print rendering unaffected.
- Avoids adding large runtime libraries or image payloads.

IMPORTANT
This block does NOT change the engineering formulas or standards data.

INSTALL
1. Stop the server with Ctrl+C.
2. Copy the complete contents of this ZIP over:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next
3. Choose Replace.
4. Run separately:
   npm test
   npm run lint
   npm run build
   npm run dev

MANUAL CHECK
- Resize browser to mobile width (around 390 px).
- Navigate using Tab only and confirm the orange focus ring is visible.
- Press Tab immediately after page load and test "Skip to main content".
- Test Quick/Advanced and Metric/Imperial at mobile width.
- Test English/Romanian and dark/light on a calculator.
- Test /contact on mobile.
- Open calculator engineering documentation and confirm print/PDF still works.
- Test normal browser and Incognito. Browser extensions may still inject attributes
  such as data-sharkid; those extension mutations are not DraftFit hydration defects.

VALIDATION BEFORE PACKAGING
- Production TypeScript source check: passed.
- Existing engineering test files are preserved unchanged.
- Full npm test / lint / Next production build should be run on the user's Windows project,
  where the installed Vitest and platform-specific Next.js binaries are available.
