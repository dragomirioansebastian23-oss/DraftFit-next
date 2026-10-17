DRAFTFIT — POINT 16
COPY RESULT

IMPLEMENTED

- Adds a common Copy Result / Copiază rezultatul control.
- Works on all five calculators.
- Copies a compact plain-text engineering summary suitable for:
  * email
  * Teams / Slack
  * engineering notes
  * Excel cells
  * preliminary reports

CALCULATORS

1. ISO 286 Fit Calculator
   Copies:
   - selected fit
   - fit classification
   - hole limits
   - shaft limits
   - minimum / maximum clearance
   - minimum / maximum interference
   - preliminary contact pressure and transmissible torque when applicable

2. O-Ring Groove Calculator
   Copies:
   - seal type and duty
   - O-ring size
   - groove depth / width / root diameter
   - squeeze
   - circumferential strain
   - gland fill
   - material
   - preliminary status

3. GD&T Reference
   Copies:
   - selected standard
   - selected geometric control
   - definition
   - tolerance-zone description
   - datum guidance
   - inspection guidance
   - caution

4. Metric Thread & Bolt Calculator
   Copies:
   - thread designation
   - tolerance classes
   - bolt class
   - d2 / d3
   - stress area
   - tap drill estimate
   - target preload
   - tightening torque
   - equivalent bolt stress
   - bolt stress / stripping check

5. Parallel Key Calculator
   Copies:
   - standard
   - shaft diameter
   - key size / length
   - tangential force
   - effective length
   - bearing pressure
   - shear stress
   - governing criterion
   - preliminary status

UNIT SYSTEM

The copied text follows the currently selected Metric / Imperial display mode.

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

Open each calculator.
Change some inputs.
Click "Copy result".
Paste into Notepad or a message and confirm the values match the calculator.

NOTE

The package is based directly on the Point 15 package that was confirmed working.
