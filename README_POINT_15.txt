DRAFTFIT — POINT 15
SHAREABLE CALCULATION URLS

IMPLEMENTED

- Share Calculation button on all five calculators.
- Copies a URL containing the current calculation inputs.
- Opening the shared URL restores the calculation inputs automatically.
- Shared URLs also preserve:
  * Quick / Advanced mode
  * Metric / Imperial display mode

CALCULATORS COVERED

1. ISO 286 Fit Calculator
   - calculator mode
   - nominal diameter
   - hole letter / grade
   - shaft letter / grade
   - interference-fit mechanical inputs

2. O-Ring Groove Calculator
   - seal type
   - duty
   - axial direction
   - hardware diameter
   - O-ring dimensions
   - backup rings
   - material
   - pressure
   - radial gap
   - temperature

3. GD&T Reference
   - standard system
   - selected GD&T control

4. Metric Thread & Bolt Calculator
   - diameter and pitch
   - tolerance classes
   - bolt property class
   - preload utilization
   - friction settings
   - bearing diameter
   - internal material
   - allowable shear
   - engagement

5. Parallel Key Calculator
   - shaft diameter
   - torque
   - allowable bearing pressure
   - allowable shear
   - selected key length

NOT INCLUDED IN THE SHARE URL

Project metadata such as:
- Part Name
- Drawing No.
- Engineer

These are intentionally excluded because Point 15 is for sharing the engineering
calculation state itself.

INSTALL

1. Stop Next.js with Ctrl+C.
2. Copy the whole contents of this ZIP over:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next
3. Choose Replace.
4. Run:

   npm run lint
   npm run build
   npm run dev

TEST

1. Open any calculator.
2. Change several inputs.
3. Switch to Imperial and/or Advanced if desired.
4. Click "Copy share link".
5. Open the copied link in Incognito.
6. The same calculation inputs should load automatically.

VALIDATION BEFORE PACKAGING

- ESLint: passed
- TypeScript: tsc --noEmit passed

NOTE ABOUT BUILD

The packaging environment is Linux while the uploaded project dependencies contain
Windows binaries. Next.js attempted to download a Linux SWC package, but internet
access is disabled in the packaging environment. Run npm run build on your Windows PC.
