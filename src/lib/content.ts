export type ContentSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
};

export type GuideEntry = {
  slug: string;
  title: string;
  description: string;
  eyebrow: string;
  keywords: string[];
  calculatorHref: string;
  calculatorLabel: string;
  standardSlugs: string[];
  sections: ContentSection[];
};

export type StandardEntry = {
  slug: string;
  title: string;
  description: string;
  reference: string;
  statusNote: string;
  calculatorHref: string;
  calculatorLabel: string;
  guideSlugs: string[];
  sections: ContentSection[];
};

export const GUIDES: GuideEntry[] = [
  {
    slug: 'h7-g6-vs-h7-h6-vs-h7-k6',
    title: 'H7/g6 vs H7/h6 vs H7/k6: ISO 286 Fits Explained',
    description:
      'Compare H7/g6, H7/h6 and H7/k6 fits, see how their tolerance zones change clearance and interference, and choose a better starting point for shaft-hole design.',
    eyebrow: 'Fits & tolerances',
    keywords: [
      'H7 g6 vs H7 h6 vs H7 k6',
      'H7/g6 fit',
      'H7/h6 fit',
      'H7/k6 fit',
      'ISO 286 fits',
      'clearance fit',
      'transition fit',
    ],
    calculatorHref: '/calculators/iso-286-fit-calculator',
    calculatorLabel: 'Compare the fits in the ISO 286 calculator',
    standardSlugs: ['iso-286'],
    sections: [
      {
        heading: 'Quick answer: what changes between g6, h6 and k6?',
        paragraphs: [
          'With an H7 hole, changing the shaft letter moves the shaft tolerance zone relative to the nominal size. H7/g6 gives a definite clearance in DraftFit’s supported ISO 286 data set, H7/h6 reaches the nominal line and can have zero theoretical minimum clearance, while H7/k6 crosses into transition-fit behavior.',
          'The grade numbers still matter: H7 sets the hole tolerance width and 6 sets the shaft tolerance width. The letter controls where that tolerance zone sits relative to the basic size.',
        ],
        bullets: [
          'H7/g6: clearance-fit starting point for free-running or sliding behavior.',
          'H7/h6: close clearance/location starting point with zero theoretical minimum clearance.',
          'H7/k6: transition-fit starting point that can produce either small clearance or small interference.',
        ],
      },
      {
        heading: 'How to read H7/g6, H7/h6 and H7/k6',
        paragraphs: [
          'The first code belongs to the hole and the second to the shaft. Capital H therefore describes the hole tolerance zone, while lowercase g, h or k describes the shaft tolerance zone.',
          'In the hole-basis system used here, an H hole starts at the nominal size. A g shaft lies below nominal, an h shaft ends at nominal, and the supported k shaft zone begins slightly above nominal. That positional change is what moves the fit from definite clearance toward transition behavior.',
        ],
      },
      {
        heading: '35 mm worked comparison',
        paragraphs: [
          'For a nominal diameter of 35 mm, DraftFit uses an H7 hole from 35.000 mm to 35.025 mm in its supported data set. The corresponding g6 shaft is 34.975–34.991 mm, h6 is 34.984–35.000 mm, and k6 is 35.002–35.018 mm.',
          'Those limits produce very different worst-case assembly conditions even though the nominal diameter and tolerance grades remain similar.',
        ],
        bullets: [
          '35 H7/g6: 0.009–0.050 mm clearance.',
          '35 H7/h6: 0.000–0.041 mm clearance.',
          '35 H7/k6: from 0.018 mm interference to 0.023 mm clearance, so the fit is transitional.',
        ],
      },
      {
        heading: 'When H7/g6 is the better starting point',
        paragraphs: [
          'H7/g6 is useful when the design needs guaranteed dimensional clearance within the selected limits. It is a sensible starting point for applications where relative movement, easy assembly or controlled locating clearance matters more than a tight positional relationship.',
          'Do not select it from the fit label alone. Speed, lubrication, load, temperature, contamination, manufacturing capability and required running clearance can all change the correct choice.',
        ],
      },
      {
        heading: 'When H7/h6 is the better starting point',
        paragraphs: [
          'H7/h6 moves the shaft zone upward until its maximum size reaches the basic size. That gives a much tighter clearance relationship than H7/g6 while still avoiding intentional dimensional interference in the supported calculation.',
          'It can be useful when location matters and a close-fitting assembly is wanted, but the zero theoretical minimum clearance means real manufacturing variation, surface condition and assembly practice deserve attention.',
        ],
      },
      {
        heading: 'When H7/k6 is the better starting point',
        paragraphs: [
          'H7/k6 is a transition fit in DraftFit’s supported range. Depending on the actual hole and shaft sizes produced inside their tolerance zones, the assembly can have either a small clearance or a small interference.',
          'That makes it a stronger locating starting point than the two clearance fits, but it also means assembly behavior is less predictable from the nominal designation alone. Check the actual minimum and maximum fit values for the nominal diameter you are designing.',
        ],
      },
      {
        heading: 'Do not reuse one diameter’s numbers at another diameter',
        paragraphs: [
          'ISO tolerance widths and deviations change by nominal-size step. A clearance range calculated at 35 mm is therefore an example, not a reusable value for every H7/g6, H7/h6 or H7/k6 fit.',
          'Use the DraftFit calculator at the real nominal diameter and review all four limit dimensions before making a functional selection.',
        ],
      },
      {
        heading: 'FAQ: which fit should I choose?',
        paragraphs: [
          'Choose H7/g6 when guaranteed clearance is the main dimensional objective, H7/h6 when you want a closer clearance-based location, and H7/k6 when a small-clearance/small-interference transition is acceptable. These are starting points, not universal application rules.',
          'For loaded or temperature-sensitive assemblies, fit selection can also require checks for material expansion, contact stress, assembly force, lubrication and operating conditions. A tolerance designation alone does not validate the mechanical function of the joint.',
        ],
      },
    ],
  },
  {
    slug: 'h7-g6-fit-explained',
    title: 'H7/g6 Fit Explained: Limits, Clearance and Typical Use',
    description:
      'Understand how an H7/g6 ISO fit is built from hole and shaft tolerance zones, how clearance is calculated and when this fit is useful.',
    eyebrow: 'Fits & tolerances',
    keywords: ['H7 g6 fit', 'H7/g6 tolerance', 'H7 g6 clearance', 'ISO 286 fit'],
    calculatorHref: '/calculators/iso-286-fit-calculator',
    calculatorLabel: 'Open ISO 286 Fit Calculator',
    standardSlugs: ['iso-286'],
    sections: [
      {
        heading: 'What H7/g6 means',
        paragraphs: [
          'H7/g6 combines a hole tolerance zone H7 with a shaft tolerance zone g6. In the ISO hole-basis system, an H hole has zero lower deviation, while a g shaft sits below the basic size.',
          'That geometry normally produces a clearance fit. The actual minimum and maximum clearance depend on the nominal diameter because the ISO tolerance width changes with the dimensional step.',
        ],
      },
      {
        heading: 'How clearance is calculated',
        paragraphs: [
          'Minimum clearance is the smallest hole limit minus the largest shaft limit. Maximum clearance is the largest hole limit minus the smallest shaft limit.',
          'For a specific nominal diameter, calculate the four limit sizes first. Do not reuse a tolerance value from a different diameter range.',
        ],
      },
      {
        heading: 'When H7/g6 is useful',
        paragraphs: [
          'H7/g6 is commonly considered when a controlled running or locating clearance is wanted without intentional interference. The correct fit still depends on load, speed, lubrication, temperature, manufacturing capability and assembly requirements.',
        ],
        bullets: [
          'Use the calculator for the exact nominal size.',
          'Check thermal growth where temperature changes are meaningful.',
          'Treat fit selection as a design decision, not only a table lookup.',
        ],
      },
    ],
  },
  {
    slug: 'clearance-transition-interference-fits',
    title: 'Clearance vs Transition vs Interference Fits',
    description:
      'A practical guide to clearance, transition and interference fits, including how limit dimensions determine the actual fit class.',
    eyebrow: 'Fits & tolerances',
    keywords: ['clearance fit', 'transition fit', 'interference fit', 'fit types'],
    calculatorHref: '/calculators/iso-286-fit-calculator',
    calculatorLabel: 'Calculate a fit',
    standardSlugs: ['iso-286'],
    sections: [
      {
        heading: 'Clearance fit',
        paragraphs: [
          'A clearance fit guarantees positive clearance at the worst-case limits. The smallest permissible hole remains larger than the largest permissible shaft.',
        ],
      },
      {
        heading: 'Transition fit',
        paragraphs: [
          'A transition fit can produce either small clearance or small interference depending on the actual manufactured sizes within their tolerance zones.',
        ],
      },
      {
        heading: 'Interference fit',
        paragraphs: [
          'An interference fit guarantees overlap at the limit sizes. Assembly force, contact pressure, material properties, wall thickness, surface condition and temperature can become important design variables.',
        ],
      },
    ],
  },
  {
    slug: 'o-ring-squeeze-explained',
    title: 'O-Ring Squeeze Explained: What the Percentage Means',
    description:
      'Learn what O-ring squeeze means, how it is calculated and why groove geometry, duty and application type matter.',
    eyebrow: 'Sealing',
    keywords: ['O-ring squeeze', 'O-ring compression', 'O-ring groove calculator'],
    calculatorHref: '/calculators/o-ring-groove-calculator',
    calculatorLabel: 'Open O-Ring Groove Calculator',
    standardSlugs: ['iso-3601'],
    sections: [
      {
        heading: 'Definition',
        paragraphs: [
          'Squeeze describes how much the O-ring cross-section is compressed by the installed gland geometry. A simple nominal expression compares the free cross-section with the available gland depth in the squeeze direction.',
        ],
      },
      {
        heading: 'Why one squeeze target does not fit every application',
        paragraphs: [
          'Static, reciprocating, rotary and face-seal applications do not share identical design constraints. Friction, pressure, material, temperature, tolerances and extrusion risk can change the acceptable gland geometry.',
        ],
      },
      {
        heading: 'Use squeeze with gland fill and stretch',
        paragraphs: [
          'Squeeze should not be reviewed alone. Gland fill, circumferential stretch or compression, extrusion gap and backup-ring requirements can all influence whether a groove is practical.',
        ],
      },
    ],
  },
  {
    slug: 'bolt-preload-vs-torque',
    title: 'Bolt Preload vs Tightening Torque',
    description:
      'Understand why tightening torque is only an indirect way to create bolt preload and why friction dominates many torque estimates.',
    eyebrow: 'Threads & fasteners',
    keywords: ['bolt preload', 'bolt torque', 'tightening torque', 'preload vs torque'],
    calculatorHref: '/calculators/metric-thread-bolt-calculator',
    calculatorLabel: 'Open Thread & Bolt Calculator',
    standardSlugs: ['iso-898-1', 'iso-273'],
    sections: [
      {
        heading: 'Preload is the engineering target',
        paragraphs: [
          'In a preloaded bolted joint, the important quantity is usually clamp force. Tightening torque is a practical installation input used to create that preload.',
        ],
      },
      {
        heading: 'Why torque is uncertain',
        paragraphs: [
          'A large part of tightening torque is consumed by friction in the threads and under the bearing surface. Changes in lubrication, coating, surface finish and washer geometry can therefore change preload significantly even when the same torque is applied.',
        ],
      },
      {
        heading: 'What DraftFit estimates',
        paragraphs: [
          'The DraftFit bolt tool uses an engineering torque model with explicit friction inputs. Treat the result as an estimate unless the joint has a validated tightening procedure and friction data.',
        ],
      },
    ],
  },
  {
    slug: 'parallel-key-shear-vs-bearing-pressure',
    title: 'Parallel Key Design: Shear Stress vs Bearing Pressure',
    description:
      'See how torque creates tangential force in a parallel key and why both key shear and contact pressure should be checked.',
    eyebrow: 'Shaft connections',
    keywords: ['parallel key shear stress', 'key bearing pressure', 'DIN 6885 key'],
    calculatorHref: '/calculators/parallel-key-calculator',
    calculatorLabel: 'Open Parallel Key Calculator',
    standardSlugs: ['din-6885'],
    sections: [
      {
        heading: 'From torque to tangential force',
        paragraphs: [
          'A simplified key calculation first converts shaft torque into tangential force at the shaft radius. That force is then used for the shear and bearing-pressure checks.',
        ],
      },
      {
        heading: 'Shear check',
        paragraphs: [
          'The simplified shear model distributes tangential force over an effective shear area based on key width and effective length.',
        ],
      },
      {
        heading: 'Bearing-pressure check',
        paragraphs: [
          'Bearing pressure uses an effective contact height and length. Depending on materials and geometry, the contact-pressure criterion can govern before key shear.',
        ],
      },
    ],
  },
  {
    slug: 'm10-bolt-torque-guide',
    title: 'M10 Bolt Torque: Why There Is No Single Correct Value',
    description:
      'A practical M10 bolt torque guide explaining the influence of property class, preload target, friction and bearing geometry.',
    eyebrow: 'Search-intent guide',
    keywords: ['M10 bolt torque', 'M10 tightening torque', 'M10 torque calculator'],
    calculatorHref: '/calculators/metric-thread-bolt-calculator',
    calculatorLabel: 'Calculate M10 preload and torque',
    standardSlugs: ['iso-898-1'],
    sections: [
      {
        heading: 'Why M10 alone is not enough',
        paragraphs: [
          'The designation M10 defines nominal thread diameter, but it does not define one universal tightening torque. Pitch, bolt property class, target preload, thread friction, under-head friction and bearing diameter all affect the result.',
        ],
      },
      {
        heading: 'A better workflow',
        paragraphs: [
          'Choose the actual pitch and property class, define a preload target appropriate to the joint, then use realistic friction values for the installation condition. Review the resulting bolt stress as well as the torque.',
        ],
      },
      {
        heading: 'Do not copy a generic torque table blindly',
        paragraphs: [
          'Generic tables can be useful starting references, but they may assume lubrication and friction conditions that do not match your joint. For critical assemblies, use a validated tightening specification.',
        ],
      },
    ],
  },
  {
    slug: 'o-ring-groove-3-53-mm-guide',
    title: '3.53 mm O-Ring Groove Dimensions: What Must Be Defined First',
    description:
      'Why a 3.53 mm O-ring cross-section does not have one universal groove dimension and which application inputs determine the gland.',
    eyebrow: 'Search-intent guide',
    keywords: ['3.53 mm O-ring groove', 'O-ring groove dimensions 3.53', '3.53 O-ring gland'],
    calculatorHref: '/calculators/o-ring-groove-calculator',
    calculatorLabel: 'Calculate a 3.53 mm O-ring groove',
    standardSlugs: ['iso-3601'],
    sections: [
      {
        heading: 'Cross-section is only one input',
        paragraphs: [
          'A 3.53 mm cross-section does not uniquely determine groove depth and width. The gland depends on whether the seal is radial or axial, static or dynamic, the hardware geometry, pressure, tolerances and whether backup rings are needed.',
        ],
      },
      {
        heading: 'Check more than groove depth',
        paragraphs: [
          'A useful gland review includes squeeze, gland fill, stretch or compression, extrusion gap and operating conditions. Those checks explain why two applications using the same O-ring cross-section can require different housings.',
        ],
      },
    ],
  },
  {
    slug: 'din-6885-key-size-35-mm-shaft',
    title: 'DIN 6885 Key Size for a 35 mm Shaft',
    description:
      'How to select the DIN 6885 parallel-key size for a 35 mm shaft and why length and strength still require engineering checks.',
    eyebrow: 'Search-intent guide',
    keywords: ['35 mm shaft key size', 'DIN 6885 35 mm shaft', 'parallel key 35 mm shaft'],
    calculatorHref: '/calculators/parallel-key-calculator',
    calculatorLabel: 'Select and check a key',
    standardSlugs: ['din-6885'],
    sections: [
      {
        heading: 'Standard size selection is only the first step',
        paragraphs: [
          'DIN 6885-1 provides standardized parallel-key and keyway dimensions by shaft-diameter range. After selecting the standard section, the available key length and the transmitted torque still need to be checked.',
        ],
      },
      {
        heading: 'Why key length matters',
        paragraphs: [
          'The same shaft and key section can carry different torque depending on the effective key length, allowable contact pressure and allowable shear stress. Hub geometry can also limit the practical length.',
        ],
      },
    ],
  },
  {
    slug: 'gdt-position-vs-concentricity',
    title: 'GD&T Position vs Concentricity: Practical Selection Notes',
    description:
      'Understand why position and runout controls are often more practical than legacy concentricity concepts, especially when working across ISO and ASME conventions.',
    eyebrow: 'GD&T',
    keywords: ['position vs concentricity', 'GD&T concentricity', 'true position'],
    calculatorHref: '/calculators/gdt-reference-calculator',
    calculatorLabel: 'Open GD&T Reference',
    standardSlugs: ['iso-1101', 'asme-y14-5'],
    sections: [
      {
        heading: 'Do not treat similar-looking controls as interchangeable',
        paragraphs: [
          'Position, runout and concentricity describe different tolerance concepts and inspection implications. The correct control depends on the functional requirement and the governing drawing standard.',
        ],
      },
      {
        heading: 'ASME Y14.5-2018 context',
        paragraphs: [
          'DraftFit intentionally removes concentricity and symmetry from the ASME Y14.5-2018 mode because those characteristic symbols were removed from that edition. Existing legacy drawings can still require interpretation against the edition specified on the drawing.',
        ],
      },
    ],
  },
];

export const STANDARDS: StandardEntry[] = [
  {
    slug: 'iso-286',
    title: 'ISO 286 — Limits, Fits and Tolerance Classes',
    description:
      'DraftFit reference page for the ISO 286 tolerance-code system used for linear sizes, tolerance classes and fits.',
    reference: 'ISO 286-1:2010 / ISO 286-2:2010',
    statusNote:
      'ISO 286-1:2010 remains current and was confirmed in 2026. Always verify the edition required by your project.',
    calculatorHref: '/calculators/iso-286-fit-calculator',
    calculatorLabel: 'ISO 286 Fit Calculator',
    guideSlugs: ['h7-g6-vs-h7-h6-vs-h7-k6', 'h7-g6-fit-explained', 'clearance-transition-interference-fits'],
    sections: [
      {
        heading: 'What the standard system covers',
        paragraphs: [
          'ISO 286 defines the code system used to express tolerance classes and fits for linear sizes. Part 1 establishes the basis, terminology and principles of tolerances, deviations and fits; Part 2 provides tables of standard tolerance classes and limit deviations.',
        ],
      },
      {
        heading: 'How DraftFit uses it',
        paragraphs: [
          'The fit calculator combines a nominal size, hole tolerance zone and shaft tolerance zone to determine limit sizes and the resulting clearance/interference range for the implemented data set.',
        ],
      },
    ],
  },
  {
    slug: 'iso-3601',
    title: 'ISO 3601 — O-Rings and Housing Dimensions',
    description:
      'DraftFit reference page for the ISO 3601 series used around O-ring dimensions, quality and housing design.',
    reference: 'ISO 3601 series; ISO 3601-2:2025 for housing dimensions',
    statusNote:
      'ISO 3601-2:2025 is the current published housing-dimensions edition for general applications.',
    calculatorHref: '/calculators/o-ring-groove-calculator',
    calculatorLabel: 'O-Ring Groove Calculator',
    guideSlugs: ['o-ring-squeeze-explained', 'o-ring-groove-3-53-mm-guide'],
    sections: [
      {
        heading: 'What Part 2 addresses',
        paragraphs: [
          'ISO 3601-2:2025 specifies housing dimensions for general O-ring applications and addresses both O-ring-first and fixed-hardware design approaches. It covers general hydraulic and pneumatic applications with and without backup rings.',
        ],
      },
      {
        heading: 'DraftFit scope',
        paragraphs: [
          'DraftFit uses the ISO 3601 series as an engineering reference while also exposing simplified squeeze, fill, stretch/compression and extrusion-gap checks. The calculator documentation identifies where a result is preliminary rather than a complete reproduction of standard tables.',
        ],
      },
    ],
  },
  {
    slug: 'iso-1101',
    title: 'ISO 1101 — Geometrical Tolerancing',
    description:
      'DraftFit reference page for ISO 1101 geometrical tolerancing concepts, symbols and interpretation.',
    reference: 'ISO 1101:2017',
    statusNote:
      'ISO 1101:2017 remains the current published edition on the ISO catalogue. Check the edition specified on the drawing.',
    calculatorHref: '/calculators/gdt-reference-calculator',
    calculatorLabel: 'GD&T Reference',
    guideSlugs: ['gdt-position-vs-concentricity'],
    sections: [
      {
        heading: 'Role in GPS',
        paragraphs: [
          'ISO 1101 defines the symbol language and interpretation rules for geometrical specification of workpieces, covering form, orientation, location and run-out tolerances.',
        ],
      },
      {
        heading: 'Use with related standards',
        paragraphs: [
          'GD&T/GPS requirements rarely live in one document alone. Datum systems, modifiers, drawing practices and verification can involve additional standards, so the drawing and project specification should control the complete interpretation.',
        ],
      },
    ],
  },
  {
    slug: 'iso-273',
    title: 'ISO 273 — Clearance Holes for Bolts and Screws',
    description:
      'Reference overview of ISO 273 clearance-hole series and how DraftFit uses them in the metric thread and bolt tool.',
    reference: 'ISO 273:1979',
    statusNote:
      'ISO 273:1979 was reviewed and confirmed in 2024 and remains current.',
    calculatorHref: '/calculators/metric-thread-bolt-calculator',
    calculatorLabel: 'Metric Thread & Bolt Calculator',
    guideSlugs: ['bolt-preload-vs-torque', 'm10-bolt-torque-guide'],
    sections: [
      {
        heading: 'What it specifies',
        paragraphs: [
          'ISO 273 specifies general-purpose clearance-hole diameters for bolts and screws using fine, medium and coarse series across a broad range of metric thread sizes.',
        ],
      },
      {
        heading: 'DraftFit behavior',
        paragraphs: [
          'DraftFit treats fine, medium and coarse clearance-hole series as explicit selections rather than inventing unrelated tolerance grades for the hole diameter.',
        ],
      },
    ],
  },
  {
    slug: 'iso-898-1',
    title: 'ISO 898-1 — Mechanical Properties of Steel Bolts, Screws and Studs',
    description:
      'DraftFit reference page for ISO 898-1 property classes used in preliminary metric bolt calculations.',
    reference: 'ISO 898-1:2013',
    statusNote:
      'ISO 898-1:2013 was confirmed in 2025 and remains current while a replacement work item is under development.',
    calculatorHref: '/calculators/metric-thread-bolt-calculator',
    calculatorLabel: 'Metric Thread & Bolt Calculator',
    guideSlugs: ['bolt-preload-vs-torque', 'm10-bolt-torque-guide'],
    sections: [
      {
        heading: 'What the standard covers',
        paragraphs: [
          'ISO 898-1 specifies mechanical and physical properties for carbon-steel and alloy-steel bolts, screws and studs with defined property classes under its stated scope and test conditions.',
        ],
      },
      {
        heading: 'What it does not give DraftFit automatically',
        paragraphs: [
          'A bolt property class does not create one universal tightening torque. Joint geometry, friction, lubrication, preload target and tightening method still matter, which is why DraftFit exposes those assumptions separately.',
        ],
      },
    ],
  },
  {
    slug: 'din-6885',
    title: 'DIN 6885-1 — Parallel Keys and Keyways',
    description:
      'DraftFit reference page for DIN 6885-1 parallel-key and keyway dimensions used in shaft connections.',
    reference: 'DIN 6885-1:2021-11',
    statusNote:
      'DIN Media lists DIN 6885-1:2021-11 as the current edition.',
    calculatorHref: '/calculators/parallel-key-calculator',
    calculatorLabel: 'Parallel Key Calculator',
    guideSlugs: ['parallel-key-shear-vs-bearing-pressure', 'din-6885-key-size-35-mm-shaft'],
    sections: [
      {
        heading: 'What the standard provides',
        paragraphs: [
          'DIN 6885-1 standardizes dimensions, tolerances and related data for deep-pattern parallel keys and keyways across shaft-diameter ranges.',
        ],
      },
      {
        heading: 'Selection vs strength',
        paragraphs: [
          'Selecting the standardized key cross-section is not the same as proving the connection. Torque, key length, hub material, shaft material and allowable contact pressure can govern the final design.',
        ],
      },
    ],
  },
  {
    slug: 'asme-y14-5',
    title: 'ASME Y14.5 — Dimensioning and Tolerancing',
    description:
      'DraftFit reference page for ASME Y14.5 GD&T workflows and the differences users should watch when switching from ISO GPS conventions.',
    reference: 'ASME Y14.5-2018 (R2024)',
    statusNote:
      'ASME lists Y14.5-2018, reaffirmed in 2024, as the version currently in effect.',
    calculatorHref: '/calculators/gdt-reference-calculator',
    calculatorLabel: 'GD&T Reference',
    guideSlugs: ['gdt-position-vs-concentricity'],
    sections: [
      {
        heading: 'Why edition matters',
        paragraphs: [
          'The applicable drawing standard and edition control interpretation. DraftFit keeps an explicit ISO/ASME selector so that terminology and available controls are not silently mixed.',
        ],
      },
      {
        heading: '2018 characteristic changes',
        paragraphs: [
          'DraftFit excludes concentricity and symmetry from its ASME Y14.5-2018 profile. Legacy drawings can still contain those symbols and must be interpreted using the standard edition specified by the drawing.',
        ],
      },
    ],
  },
];

export const GUIDE_MAP = new Map(GUIDES.map((entry) => [entry.slug, entry]));
export const STANDARD_MAP = new Map(STANDARDS.map((entry) => [entry.slug, entry]));

export function getGuide(slug: string) {
  return GUIDE_MAP.get(slug);
}

export function getStandard(slug: string) {
  return STANDARD_MAP.get(slug);
}
