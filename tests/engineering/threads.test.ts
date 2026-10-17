import { describe, expect, it } from 'vitest';

import {
  calculateBasicThreadGeometry,
  calculateBoltStress,
  calculatePreload,
  calculateTapDrillEstimate,
  calculateThreadStripping,
  calculateTighteningTorque,
} from '../../src/components/calculators/ThreadsModule.jsx';

describe('Metric thread and bolt engine reference cases', () => {
  it('matches the M10 × 1.5 basic geometry equations', () => {
    const geometry = calculateBasicThreadGeometry(10, 1.5);

    if (!geometry) {
      throw new Error('Expected valid M10 × 1.5 thread geometry.');
    }

    expect(geometry.d2).toBeCloseTo(9.025721425, 9);
    expect(geometry.d3).toBeCloseTo(8.1596965, 9);
    expect(geometry.As).toBeCloseTo(57.9894754253, 8);
    expect(calculateTapDrillEstimate(10, 1.5)).toBeCloseTo(8.5, 10);
  });

  it('keeps preload, torque and tightening stress linked consistently', () => {
    const geometry = calculateBasicThreadGeometry(10, 1.5);

    if (!geometry) {
      throw new Error('Expected valid M10 × 1.5 thread geometry.');
    }

    const preload = calculatePreload(600, geometry.As, 0.75);

    if (!preload) {
      throw new Error('Expected a valid preload result.');
    }

    expect(preload.targetPreload).toBeCloseTo(26095.2639414, 6);

    const torque = calculateTighteningTorque({
      preload: preload.targetPreload,
      P: 1.5,
      d2: geometry.d2,
      muG: 0.14,
      muK: 0.14,
      Dkm: 15,
    });

    if (!torque) {
      throw new Error('Expected a valid tightening torque result.');
    }

    expect(torque.totalTorque).toBeCloseTo(52.8853058794, 7);

    const stress = calculateBoltStress({
      preload: preload.targetPreload,
      As: geometry.As,
      d3: geometry.d3,
      threadTorqueNm: torque.threadTorque,
      Re: 900,
    });

    if (!stress) {
      throw new Error('Expected a valid bolt stress result.');
    }

    expect(stress.sigma).toBeCloseTo(450, 8);
    expect(stress.sigmaVM).toBeCloseTo(611.3398816078, 6);
    expect(stress.utilisation).toBeCloseTo(0.6792665351, 8);
  });

  it('returns a positive preliminary stripping capacity', () => {
    const result = calculateThreadStripping({
      d2: 9.025721425,
      engagement: 10,
      tauAllow: 100,
      P: 1.5,
    });

    if (!result) {
      throw new Error('Expected a valid thread stripping result.');
    }

    expect(result.shearArea).toBeGreaterThan(0);
    expect(result.capacity).toBeGreaterThan(0);
    expect(result.engagedThreads).toBeCloseTo(6.6666666667, 8);
  });
});
