import { describe, expect, it } from 'vitest';

import {
  calculateCircumferentialStrain,
  calculateGlandFill,
  calculateOringArea,
  calculateSqueeze,
} from '../../src/components/calculators/OringModule.jsx';

describe('O-ring core equation reference cases', () => {
  it('calculates circular cross-sectional area', () => {
    expect(calculateOringArea(3.53)).toBeCloseTo(9.7867679743, 8);
  });

  it('calculates nominal squeeze', () => {
    expect(calculateSqueeze(3.53, 2.70)).toBeCloseTo(23.5127478754, 8);
  });

  it('calculates preliminary rectangular gland fill', () => {
    expect(calculateGlandFill(3.53, 4.80, 2.70)).toBeCloseTo(
      75.5151849867,
      8,
    );
  });

  it('calculates circumferential strain sign and magnitude', () => {
    expect(calculateCircumferentialStrain(25, 25.5)).toBeCloseTo(2, 10);
    expect(calculateCircumferentialStrain(25, 24.5)).toBeCloseTo(-2, 10);
  });
});
