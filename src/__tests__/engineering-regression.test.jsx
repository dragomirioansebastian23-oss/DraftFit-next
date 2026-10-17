import { describe, expect, it } from 'vitest';

import {
  calculateFit,
  getIT,
  getLimits,
} from '@/components/calculators/IsoModule';
import {
  calculateCircumferentialStrain,
  calculateGlandFill,
  calculateOringArea,
  calculateSqueeze,
} from '@/components/calculators/OringModule';
import {
  calculateBasicThreadGeometry,
  calculateBoltStress,
  calculatePreload,
  calculateTapDrillEstimate,
  calculateTighteningTorque,
} from '@/components/calculators/ThreadsModule';
import {
  calculateContactPressure,
  calculateShearStress,
  calculateTangentialForce,
  findKey,
  getEffectiveBearingHeight,
  getEffectiveLength,
} from '@/components/calculators/KeysModule';

describe('ISO 286 regression cases', () => {
  it('returns IT7 = 25 µm for 35 mm', () => {
    expect(getIT(35, 7)).toBe(25);
  });

  it('returns IT6 = 16 µm for 35 mm', () => {
    expect(getIT(35, 6)).toBe(16);
  });

  it('builds 35 H7 hole limits', () => {
    const hole = getLimits(35, 'hole', 'H', 7);
    expect(hole.min).toBeCloseTo(35.0, 6);
    expect(hole.max).toBeCloseTo(35.025, 6);
  });

  it('builds 35 g6 shaft limits', () => {
    const shaft = getLimits(35, 'shaft', 'g', 6);
    expect(shaft.min).toBeCloseTo(34.975, 6);
    expect(shaft.max).toBeCloseTo(34.991, 6);
  });

  it('classifies H7/g6 as clearance', () => {
    const result = calculateFit(
      getLimits(35, 'hole', 'H', 7),
      getLimits(35, 'shaft', 'g', 6),
    );
    expect(result.type).toBe('clearance');
    expect(result.cMin).toBeCloseTo(0.009, 6);
    expect(result.cMax).toBeCloseTo(0.05, 6);
  });

  it('classifies H7/k6 as transition', () => {
    const result = calculateFit(
      getLimits(35, 'hole', 'H', 7),
      getLimits(35, 'shaft', 'k', 6),
    );
    expect(result.type).toBe('transition');
    expect(result.cMin).toBeLessThan(0);
    expect(result.cMax).toBeGreaterThan(0);
  });

  it('classifies H7/p6 as interference', () => {
    const result = calculateFit(
      getLimits(35, 'hole', 'H', 7),
      getLimits(35, 'shaft', 'p', 6),
    );
    expect(result.type).toBe('interference');
    expect(result.cMax).toBeLessThan(0);
  });
});

describe('O-ring geometry regression cases', () => {
  it('calculates cross-sectional area', () => {
    expect(calculateOringArea(3.53)).toBeCloseTo(9.7868, 4);
  });

  it('calculates nominal squeeze', () => {
    expect(calculateSqueeze(3.53, 2.8)).toBeCloseTo(20.68, 2);
  });

  it('calculates gland fill', () => {
    expect(calculateGlandFill(3.53, 4.8, 2.8)).toBeCloseTo(72.818, 3);
  });

  it('calculates positive installed stretch', () => {
    expect(calculateCircumferentialStrain(20, 20.6)).toBeCloseTo(3, 6);
  });

  it('calculates circumferential compression as negative strain', () => {
    expect(calculateCircumferentialStrain(20, 19.6)).toBeCloseTo(-2, 6);
  });
});

describe('Metric thread and bolt regression cases', () => {
  it('calculates M10x1.5 basic pitch diameter', () => {
    const geometry = calculateBasicThreadGeometry(10, 1.5);
    expect(geometry.d2).toBeCloseTo(9.025721425, 8);
  });

  it('calculates M10x1.5 tensile stress area', () => {
    const geometry = calculateBasicThreadGeometry(10, 1.5);
    expect(geometry.As).toBeCloseTo(57.9895, 4);
  });

  it('uses d - P workshop tap-drill estimate', () => {
    expect(calculateTapDrillEstimate(10, 1.5)).toBeCloseTo(8.5, 8);
  });

  it('calculates proof load and target preload', () => {
    const result = calculatePreload(600, 58, 0.75);
    expect(result.proofLoad).toBeCloseTo(34800, 6);
    expect(result.targetPreload).toBeCloseTo(26100, 6);
  });

  it('calculates tightening torque components consistently', () => {
    const geometry = calculateBasicThreadGeometry(10, 1.5);
    const result = calculateTighteningTorque({
      preload: 26000,
      P: 1.5,
      d2: geometry.d2,
      muG: 0.14,
      muK: 0.14,
      Dkm: 14,
    });
    expect(result.totalTorque).toBeGreaterThan(result.threadTorque);
    expect(result.totalTorque).toBeGreaterThan(result.bearingTorque);
    expect(result.totalTorque).toBeGreaterThan(0);
  });

  it('returns a finite von Mises utilisation for a valid bolt state', () => {
    const geometry = calculateBasicThreadGeometry(10, 1.5);
    const torque = calculateTighteningTorque({
      preload: 26000,
      P: 1.5,
      d2: geometry.d2,
      muG: 0.14,
      muK: 0.14,
      Dkm: 14,
    });
    const stress = calculateBoltStress({
      preload: 26000,
      As: geometry.As,
      d3: geometry.d3,
      threadTorqueNm: torque.threadTorque,
      Re: 640,
    });
    expect(Number.isFinite(stress.sigmaVM)).toBe(true);
    expect(stress.utilisation).toBeGreaterThan(0);
  });
});

describe('Parallel key regression cases', () => {
  it('selects 8x7 key at exactly 30 mm shaft diameter', () => {
    const key = findKey(30);
    expect(key.b).toBe(8);
    expect(key.h).toBe(7);
  });

  it('selects 10x8 key immediately above 30 mm', () => {
    const key = findKey(30.01);
    expect(key.b).toBe(10);
    expect(key.h).toBe(8);
  });

  it('returns null outside the implemented low range', () => {
    expect(findKey(6)).toBeNull();
  });

  it('calculates tangential force from torque and shaft diameter', () => {
    expect(calculateTangentialForce(120, 30)).toBeCloseTo(8000, 6);
  });

  it('uses hub-side t2 as effective bearing height', () => {
    const key = findKey(30);
    expect(getEffectiveBearingHeight(key)).toBeCloseTo(3.3, 6);
  });

  it('uses L - b as preliminary effective length', () => {
    expect(getEffectiveLength(50, 8)).toBeCloseTo(42, 6);
  });

  it('calculates key shear stress', () => {
    expect(calculateShearStress(8000, 8, 42)).toBeCloseTo(23.8095, 4);
  });

  it('calculates key flank contact pressure', () => {
    expect(calculateContactPressure(8000, 3.3, 42)).toBeCloseTo(57.7201, 4);
  });
});
