DRAFTFIT — PRE-LAUNCH MOBILE INTERACTION FIX

Replace the files from this ZIP over the project root.

Included fixes:
1. Mobile native controls
   - input/select/textarea now use native touch-action:auto
   - button/link/summary keep touch-action:manipulation
   - coarse-pointer controls receive reliable pointer-events and >=44px touch targets
2. Decorative SVGs no longer intercept pointer/touch events.
3. Global search backdrop uses pointer events instead of mouse-only dismissal.
4. Selection assistants are compact <details> blocks, collapsed by default:
   - ISO Fit Selection Assistant
   - O-Ring Seal Selection Assistant
   - GD&T Selection Assistant
   - Keys Selection Assistant
   This keeps the calculator inputs immediately reachable on mobile.
5. Current pre-launch calculator modules are preserved in the package, including the latest engineering/UX changes.

Files included:
- src/app/globals.css
- src/components/DraftFitShell.tsx
- src/components/GlobalSearch.tsx
- src/components/calculators/IsoModule.jsx
- src/components/calculators/OringModule.jsx
- src/components/calculators/GdtModule.jsx
- src/components/calculators/ThreadsModule.jsx
- src/components/calculators/KeysModule.jsx

Validation performed here:
- JSX/TSX parse check: 0 syntax errors on all included JS/TS components.

After copying:
1. Stop dev server: Ctrl+C
2. Delete dev cache (recommended for the mobile hydration/touch retest):
   Remove-Item -Recurse -Force .next
3. npm test
4. npm run lint
5. npm run build
6. npm run dev -- -H 0.0.0.0

On the phone, open the Network URL shown by Next.js (NOT localhost).
Then hard-refresh/close-reopen the phone tab before testing.

Mobile acceptance test:
- home navigation works
- calculator route opens
- Quick / Advanced can be tapped
- Metric / Imperial can be tapped
- number/text input opens keyboard
- native select opens and changes value
- assistant summary expands/collapses
- assistant choice buttons work
- Copy Result / Share buttons work
- vertical scroll still works

If every item above works, the mobile interaction blocker is closed.
