DRAFTFIT — POINT 14
EXAMPLE PRESETS FOR ALL FIVE CALCULATORS

IMPLEMENTED

1. ISO 286 Fit Calculator
   - General clearance fit: Ø25 H7/g6
   - Transition fit: Ø40 H7/k6
   - Press fit: Ø35 H7/p6

2. O-Ring Groove Calculator
   - Static piston seal
   - Dynamic rod seal
   - Axial face seal

3. Metric Thread & Bolt Calculator
   - M8 general-purpose bolt
   - M12 high-strength joint
   - M10 into aluminum

4. Parallel Key Calculator
   - 35 mm motor shaft
   - 50 mm gear shaft
   - 25 mm light drive

5. GD&T Reference
   - Flatness — ISO
   - Position — ASME
   - Total runout — ISO

BEHAVIOR

- Each preset is a starting example only.
- Clicking a preset updates the relevant calculator inputs immediately.
- The user can edit every loaded value afterward.
- Presets work with the existing Quick / Advanced system.
- Presets work with the existing Metric / Imperial display system.
- Internal engineering calculation bases remain unchanged.
- No calculator formulas were replaced by this point.

INSTALL

1. Stop Next.js with Ctrl+C.
2. Copy the contents of this ZIP over:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next
3. Choose Replace.
4. Run:

   npm run lint
   npm run build
   npm run dev

VALIDATION BEFORE PACKAGING

- ESLint: passed
- TypeScript: tsc --noEmit passed

QUICK CHECK

Open every calculator and click all three cards under:
- Example presets
or
- Exemple presetate

Verify that the visible inputs/results change immediately.
