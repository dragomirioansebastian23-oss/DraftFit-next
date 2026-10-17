DRAFTFIT — POINT 13
METRIC / IMPERIAL UNIT SYSTEM

WHAT THIS PACKAGE DOES

- Adds a shared Metric / Imperial selector to all five calculator pages.
- Remembers the selected unit system in localStorage.
- Metric remains the default for new users.
- ISO 286:
  * basic size input can be entered in mm or inches
  * limit dimensions, deviations, clearance/interference and mechanics results follow the selected unit system
  * pressure/stress, force, torque and advanced mechanics inputs convert for display/input
- O-Ring:
  * hardware diameter, O-ring ID, section display, groove geometry and extrusion gap convert
  * operating pressure converts bar <-> psi
  * temperature converts C <-> F
  * schematic dimensions follow the selected unit system
- Metric Threads / Bolts:
  * the standard thread designation remains ISO Metric (M...)
  * dimensional results can display in inches
  * stress converts MPa <-> ksi
  * preload/force converts to lbf in Imperial mode
  * torque converts N.m <-> lbf.ft
  * engagement, bearing diameter, tap drill, clearance and schematic values convert
- Parallel Keys:
  * DIN 6885 selection remains standards-native internally
  * diameter/length inputs and geometry results convert mm <-> in
  * torque converts N.m <-> lbf.ft
  * stress converts MPa <-> ksi
  * force displays in lbf in Imperial mode
- GD&T:
  * keeps the common unit selector for consistency
  * the reference module itself is mostly unit-neutral

IMPORTANT ENGINEERING BEHAVIOR

Changing units does NOT change the engineering standard or calculation basis.
For example:
- ISO Metric threads remain ISO Metric threads in Imperial display mode.
- DIN/ISO standard tables are still evaluated using their native metric values internally.
- UNC/UNF/UNEF is a later roadmap item, not part of Point 13.

INSTALL

1. Stop Next.js with Ctrl+C.
2. Copy the entire contents of this ZIP over the ROOT of:
   C:\Users\sebis\OneDrive\Desktop\draftfit-next
3. Choose Replace when Windows asks.
4. Run:

   npm run lint
   npm run build
   npm run dev

CHECK

Open each calculator and switch Metric <-> Imperial.

Especially verify:
- ISO: 25.4 mm <-> 1 in
- O-ring: 25.4 mm <-> 1 in and 1 bar <-> about 14.5 psi
- Threads: geometry in/inches, MPa/ksi, N.m/lbf.ft
- Keys: shaft diameter and torque input conversion

VALIDATION PERFORMED BEFORE PACKAGING

- ESLint: passed with 0 errors / 0 warnings
- TypeScript: tsc --noEmit passed
- Full Next build could not be completed in the Linux packaging environment because
  the uploaded node_modules contains the Windows SWC binary. Run npm run build on Windows.
