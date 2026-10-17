import { describe, expect, it } from 'vitest';

import {
  GDT_ELEMENTS,
  GDT_META,
  STANDARD_PROFILES,
} from '../../src/components/calculators/GdtModule.jsx';

describe('GD&T reference rules', () => {
  it('keeps ISO and ASME profiles separated', () => {
    expect(STANDARD_PROFILES.iso.unsupported).toEqual([]);
    expect(STANDARD_PROFILES.asme.unsupported).toContain('concentricity');
    expect(STANDARD_PROFILES.asme.unsupported).toContain('symmetry');
  });

  it('keeps form controls datum-independent in the reference model', () => {
    expect(GDT_META.flatness.datum).toBe('none');
    expect(GDT_META.circularity.datum).toBe('none');
    expect(GDT_META.cylindricity.datum).toBe('none');
  });

  it('contains the expected core controls', () => {
    const ids = GDT_ELEMENTS.map((item) => item.id);

    expect(ids).toContain('position');
    expect(ids).toContain('flatness');
    expect(ids).toContain('total_runout');
  });
});
