export const CALCULATORS = [
  {
    id: 'iso286',
    href: '/calculators/iso-286-fit-calculator',
    eyebrow: 'Fits & Tolerances',
    title: 'ISO 286 Fit Calculator',
    shortTitle: 'Fits',
    description:
      'Calculate hole and shaft limits, clearance, interference and transition fits using the implemented ISO 286 tolerance data.',
    standards: 'ISO 286-1 / ISO 286-2',
    accent: 'orange',
    keywords: [
      'ISO 286 fit calculator',
      'H7 g6 calculator',
      'shaft tolerance calculator',
      'hole tolerance calculator',
      'clearance fit calculator',
      'interference fit calculator',
    ],
  },
  {
    id: 'oring',
    href: '/calculators/o-ring-groove-calculator',
    eyebrow: 'Sealing',
    title: 'O-Ring Groove Calculator',
    shortTitle: 'O-Rings',
    description:
      'Estimate groove geometry, squeeze, gland fill and installation conditions for common O-ring sealing arrangements.',
    standards: 'ISO 3601 series',
    accent: 'red',
    keywords: [
      'O-ring groove calculator',
      'O-ring gland calculator',
      'O-ring squeeze calculator',
      'O-ring fill calculator',
      'O-ring groove dimensions',
    ],
  },
  {
    id: 'gdt',
    href: '/calculators/gdt-reference-calculator',
    eyebrow: 'GD&T',
    title: 'GD&T Reference & Calculator',
    shortTitle: 'GD&T',
    description:
      'Explore geometric tolerances, datum use, tolerance-zone concepts and inspection guidance for ISO and ASME workflows.',
    standards: 'ISO 1101 / ASME Y14.5',
    accent: 'blue',
    keywords: [
      'GD&T calculator',
      'GD&T reference',
      'geometric tolerancing',
      'ISO 1101',
      'ASME Y14.5',
      'true position reference',
    ],
  },
  {
    id: 'threads',
    href: '/calculators/metric-thread-bolt-calculator',
    eyebrow: 'Threads & Fasteners',
    title: 'Metric Thread & Bolt Calculator',
    shortTitle: 'Threads',
    description:
      'Calculate metric thread geometry, stress area, preload, tightening torque estimates, clearance holes and engagement checks.',
    standards: 'ISO 724 / ISO 273 / ISO 898-1 / ISO 3506-1',
    accent: 'cyan',
    keywords: [
      'metric thread calculator',
      'bolt torque calculator',
      'bolt preload calculator',
      'tap drill calculator',
      'thread engagement calculator',
      'ISO metric thread',
    ],
  },
  {
    id: 'keys',
    href: '/calculators/parallel-key-calculator',
    eyebrow: 'Shaft Connections',
    title: 'Parallel Key Calculator',
    shortTitle: 'Keys',
    description:
      'Select DIN parallel-key geometry and perform preliminary shear and bearing-pressure checks for keyed shaft connections.',
    standards: 'DIN 6885-1 / DIN 6892',
    accent: 'emerald',
    keywords: [
      'parallel key calculator',
      'DIN 6885 calculator',
      'shaft key calculator',
      'key shear stress calculator',
      'key bearing pressure calculator',
    ],
  },
] as const;

export type CalculatorId = (typeof CALCULATORS)[number]['id'];

export function getCalculator(id: CalculatorId) {
  const calculator = CALCULATORS.find((item) => item.id === id);

  if (!calculator) {
    throw new Error(`Unknown calculator: ${id}`);
  }

  return calculator;
}
