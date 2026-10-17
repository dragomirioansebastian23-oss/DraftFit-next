import { describe, expect, it } from 'vitest';

import {
  calculateFit,
  getIT,
  getLimits,
} from '../../src/components/calculators/IsoModule.jsx';

describe('ISO 286 engine reference cases', () => {
  it('matches the Ø25 H7/g6 reference fit', () => {
    const hole = getLimits(25, 'hole', 'H', 7);
    const shaft = getLimits(25, 'shaft', 'g', 6);
    const fit = calculateFit(hole, shaft);

    expect(getIT(25, 7)).toBe(21);
    expect(getIT(25, 6)).toBe(13);

    expect(hole.lowerDeviation).toBe(0);
    expect(hole.upperDeviation).toBe(21);
    expect(hole.min).toBeCloseTo(25.000, 9);
    expect(hole.max).toBeCloseTo(25.021, 9);

    expect(shaft.lowerDeviation).toBe(-20);
    expect(shaft.upperDeviation).toBe(-7);
    expect(shaft.min).toBeCloseTo(24.980, 9);
    expect(shaft.max).toBeCloseTo(24.993, 9);

    expect(fit.type).toBe('clearance');
    expect(fit.minClearance).toBeCloseTo(0.007, 9);
    expect(fit.maxClearance).toBeCloseTo(0.041, 9);
  });

  it('keeps the dimensional-band boundary behavior', () => {
    expect(getIT(30, 7)).toBe(21);
    expect(getIT(30.01, 7)).toBe(25);
  });
});
