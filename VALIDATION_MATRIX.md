# DraftFit Engineering Validation Matrix — Points 24–25

## Purpose

This suite has two jobs:

1. Catch accidental changes in calculator behavior.
2. Keep a documented set of reference cases that can be re-run after formula,
   standards-data or UI changes.

## Current reference cases

### ISO 286 — Ø25 H7/g6

Expected:
- H7 hole: 25.000–25.021 mm
- g6 shaft: 24.980–24.993 mm
- minimum clearance: 0.007 mm
- maximum clearance: 0.041 mm
- classification: clearance fit

Independent public cross-checks used when this suite was created:
- https://mechsheet.com/fit/H7-g6/
- https://shopmath.org/calculators/iso-fit
- https://asdrawn.com/reference/fits

These public references agree on the Ø25 H7/g6 result.

### O-ring core equations

Reference cases are independent arithmetic checks of:
- circular cross-sectional area
- nominal squeeze
- preliminary rectangular gland fill
- circumferential strain

These tests validate the implemented equations. They do NOT certify every groove
preset as a complete ISO 3601-2 implementation.

### Metric thread / bolt

Reference case:
- M10 × 1.5
- basic pitch/root geometry
- tensile stress-area approximation
- tap-drill estimate
- preload from proof stress
- friction-based tightening torque
- von Mises tightening stress
- preliminary stripping-capacity behavior

The expected numbers are fixed hand-calculation baselines derived independently
from the equations documented in the production engine.

### Parallel key

Reference cases:
- DIN range boundary at 30 mm / 30.01 mm
- 100 N·m on a 25 mm shaft
- tangential force
- effective length
- simplified key shear stress
- simplified bearing pressure

These are hand-calculation baselines for the equations documented in the
production engine.

### GD&T

Reference checks ensure that:
- ISO and ASME profiles remain separated
- ASME mode excludes concentricity and symmetry in this DraftFit reference model
- form controls such as flatness/circularity/cylindricity remain datum-independent
  in the implemented metadata model

## Important validation boundary

Automated regression tests are not a substitute for access to controlled standards.
Where DraftFit explicitly labels a method as preliminary or simplified, the tests
confirm that the implemented method remains stable; they do not upgrade that method
into a certification calculation.

For production release, continue expanding this matrix with controlled-source
reference cases whenever licensed standards, manufacturer data or approved company
calculations are available.
