import { describe, expect, it } from 'vitest';

import {
  calculateContactPressure,
  calculateShearStress,
  calculateTangentialForce,
  findKey,
  getEffectiveBearingHeight,
  getEffectiveLength,
} from '../../src/components/calculators/KeysModule.jsx';

describe('Parallel key engine reference cases', () => {
  it('keeps DIN range boundaries deterministic', () => {
    const at30 = findKey(30);
    const above30 = findKey(30.01);

    if (!at30 || !above30) {
      throw new Error('Expected valid DIN key selections for the reference diameters.');
    }

    expect(at30.b).toBe(8);
    expect(at30.h).toBe(7);
    expect(above30.b).toBe(10);
    expect(above30.h).toBe(8);
  });

  it('matches hand calculations for force, shear and pressure', () => {
    const force = calculateTangentialForce(100, 25);
    const key = findKey(25);

    if (!key) {
      throw new Error('Expected a valid DIN key selection for a 25 mm shaft.');
    }

    const effectiveLength = getEffectiveLength(50, key.b);
    const effectiveHeight = getEffectiveBearingHeight(key);

    expect(force).toBeCloseTo(8000, 10);
    expect(effectiveLength).toBeCloseTo(42, 10);
    expect(effectiveHeight).toBeCloseTo(3.3, 10);
    expect(
      calculateShearStress(force, key.b, effectiveLength),
    ).toBeCloseTo(23.8095238095, 8);
    expect(
      calculateContactPressure(force, effectiveHeight, effectiveLength),
    ).toBeCloseTo(57.7200577201, 8);
  });
});
