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
    title: 'Clearance Fit vs Interference Fit: Differences, Transition Fits & ISO 286',
    description:
      'Learn the difference between clearance, transition and interference fits, how limit sizes determine the actual fit, and when each fit family is a useful design starting point.',
    eyebrow: 'Fits & tolerances',
    keywords: [
      'clearance fit vs interference fit',
      'clearance fit',
      'transition fit',
      'interference fit',
      'ISO 286 fit types',
      'hole shaft fit',
      'engineering fits',
    ],
    calculatorHref: '/calculators/iso-286-fit-calculator',
    calculatorLabel: 'Calculate clearance or interference with DraftFit',
    standardSlugs: ['iso-286'],
    sections: [
      {
        heading: 'Quick answer: the three fit families',
        paragraphs: [
          'A clearance fit guarantees space between the manufactured hole and shaft at the worst-case limits. A transition fit can result in either a small clearance or a small interference. An interference fit guarantees dimensional overlap at the worst-case limits.',
          'The fit family is determined by the limit dimensions, not by the nominal diameter alone. Always compare the smallest and largest permissible hole and shaft sizes for the actual nominal-size range.',
        ],
        bullets: [
          'Clearance fit: minimum clearance is greater than or equal to zero.',
          'Transition fit: the possible range crosses zero, so either clearance or interference can occur.',
          'Interference fit: even the loosest permissible combination still produces overlap.',
        ],
      },
      {
        heading: 'How to calculate the fit from limit sizes',
        paragraphs: [
          'Minimum clearance is the minimum hole size minus the maximum shaft size. Maximum clearance is the maximum hole size minus the minimum shaft size. If a calculated clearance becomes negative, that magnitude represents interference for that limit combination.',
          'This limit-based approach is more useful than memorizing labels because it immediately shows the worst-case assembly condition that manufacturing tolerances allow.',
        ],
      },
      {
        heading: 'When a clearance fit is a useful starting point',
        paragraphs: [
          'Clearance fits are natural starting points when parts must assemble freely or move relative to one another. Running fits, sliding fits and easily removable locating assemblies commonly need some positive dimensional clearance.',
          'The required clearance still depends on speed, lubrication, temperature, contamination, shaft deflection, surface finish and manufacturing capability. More clearance is not automatically better because excessive play can reduce positional accuracy and increase vibration or wear.',
        ],
      },
      {
        heading: 'When a transition fit is useful',
        paragraphs: [
          'Transition fits are used when accurate location matters but a guaranteed press fit is not required. Because the possible fit range crosses zero, one manufactured pair may assemble with light clearance while another pair at different tolerance limits may need light pressing.',
          'That variability is the key design characteristic. Assembly method, inspection strategy and service removal requirements should therefore be considered together with the tolerance designation.',
        ],
      },
      {
        heading: 'When an interference fit is useful',
        paragraphs: [
          'Interference fits are useful when the shaft and hub must transmit load or maintain a secure position without relying only on a separate fastener. Press fits and shrink fits are common examples.',
          'Once interference becomes functionally important, dimensional fit is only the beginning of the analysis. Contact pressure, hub wall thickness, material modulus and yield strength, friction, surface finish, assembly force and thermal installation conditions can all matter.',
        ],
      },
      {
        heading: 'Hole-basis selection and common H7 examples',
        paragraphs: [
          'In a hole-basis system, the H hole is held in a convenient standard tolerance zone and the shaft letter is changed to obtain different fit behavior. That is why combinations such as H7/g6, H7/h6, H7/k6 and H7/p6 are useful comparison points.',
          'The exact clearance or interference is diameter-dependent. Use the real nominal diameter in the DraftFit ISO 286 calculator rather than copying a result from another size range.',
        ],
        bullets: [
          'H7/g6 is a clearance-fit starting point in DraftFit’s supported data set.',
          'H7/h6 is a close clearance/location starting point and can reach zero theoretical minimum clearance.',
          'H7/k6 is a transition-fit starting point.',
          'H7/p6 is an interference-fit starting point in the supported range.',
        ],
      },
      {
        heading: 'Common selection mistakes',
        paragraphs: [
          'A frequent mistake is to choose a fit only from a familiar designation without checking the actual limit sizes. Another is to ignore temperature, coating thickness, plating, surface finish or the manufacturing process that must repeatedly hold the specified limits.',
          'For critical assemblies, fit selection should be tied to function: required movement, location accuracy, torque transfer, assembly method, serviceability and operating environment.',
        ],
      },
      {
        heading: 'FAQ: which fit type should I start with?',
        paragraphs: [
          'Start with a clearance fit when guaranteed free assembly or relative motion is required, a transition fit when accurate location with very small clearance or interference is acceptable, and an interference fit when positive dimensional overlap is part of the load-transfer or retention strategy.',
          'Then calculate the actual limits for the nominal diameter and verify the mechanical conditions that the fit designation alone does not cover.',
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
    title: 'Torque to Preload: Bolt Preload vs Tightening Torque Explained',
    description:
      'Learn how tightening torque creates bolt preload, how preload is estimated, and why friction can change the clamp force produced by the same torque.',
    eyebrow: 'Threads & fasteners',
    keywords: ['torque to preload', 'tightening torque to preload a bolt', 'bolt preload', 'bolt torque', 'tightening torque', 'preload vs torque'],
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
        heading: 'From target preload to tightening torque',
        paragraphs: [
          'A practical calculation usually starts with a target preload and then estimates the tightening torque required to create it. The torque model combines thread geometry, bearing geometry and friction assumptions, so the result is not a universal torque value for a bolt size.',
          'If friction is reduced while the target preload stays the same, the required tightening torque generally falls. If the same torque is applied after friction has been reduced, the resulting preload can rise substantially.',
        ],
      },
      {
        heading: 'Why torque and preload are not one-to-one',
        paragraphs: [
          'Two nominally identical bolts can reach different preload from the same applied torque when lubrication, coatings, surface finish, washer condition or bearing diameter differ. This scatter is why critical joints often need a validated tightening method rather than a generic torque number.',
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
    slug: 'metric-bolt-torque-8-8-vs-10-9-vs-12-9',
    title: 'Metric Bolt Torque: 8.8 vs 10.9 vs 12.9 + Calculator',
    description:
      'Compare metric bolt property classes 8.8, 10.9 and 12.9, understand why higher strength changes preload capacity, and calculate tightening torque with explicit friction inputs.',
    eyebrow: 'Threads & fasteners',
    keywords: [
      'metric bolt torque chart',
      '8.8 bolt torque',
      '10.9 bolt torque',
      '12.9 bolt torque',
      'bolt preload calculator',
      'ISO 898-1 bolt class',
    ],
    calculatorHref: '/calculators/metric-thread-bolt-calculator',
    calculatorLabel: 'Calculate metric bolt preload and torque',
    standardSlugs: ['iso-898-1'],
    sections: [
      {
        heading: 'Quick comparison: 8.8, 10.9 and 12.9',
        paragraphs: [
          'Property class describes bolt mechanical strength, not one universal tightening torque. In DraftFit’s ISO 898-1 reference inputs, class 8.8 uses Rm 800 MPa, Re 640 MPa and proof stress 580 MPa; 10.9 uses 1000, 900 and 830 MPa; and 12.9 uses 1200, 1080 and 970 MPa respectively.',
          'A stronger bolt can generally support a higher preload for the same threaded size, but the correct tightening torque also depends strongly on friction and the selected preload target.',
        ],
        bullets: [
          '8.8: common high-strength carbon-steel reference class.',
          '10.9: higher-strength alloy-steel reference class.',
          '12.9: very high-strength alloy-steel reference class.',
        ],
      },
      {
        heading: 'Why there is no single metric bolt torque chart',
        paragraphs: [
          'Torque tables often look precise, but tightening torque is an indirect way of generating clamp force. Thread friction and under-head or nut-bearing friction consume a large part of the applied torque, so lubrication, coatings, surface finish and bearing geometry can change the preload produced by the same torque.',
          'That is why DraftFit asks for friction-related inputs instead of treating an M10, M12 or M16 bolt as having one universally correct torque.',
        ],
      },
      {
        heading: 'Property class changes the allowable preload envelope',
        paragraphs: [
          'For the same thread geometry, moving from 8.8 to 10.9 or 12.9 increases the material-strength inputs used for preliminary stress checks. That can justify a higher target preload when the joint design, fastener product and applicable standard allow it.',
          'Do not automatically apply the higher torque of a stronger bolt to an existing joint. Female-thread strength, joint members, washers, coatings and service loads can become the limiting elements.',
        ],
      },
      {
        heading: 'A practical tightening workflow',
        paragraphs: [
          'Choose the actual metric thread and pitch, select the correct property class, define a target preload appropriate to the joint, then use realistic thread and bearing friction values. Review the resulting bolt stress together with the estimated torque.',
          'For production or safety-critical joints, validate the tightening method and friction assumptions with the actual fastener, lubricant, coating and joint stack-up.',
        ],
      },
      {
        heading: 'Dry vs lubricated torque',
        paragraphs: [
          'Lubrication usually reduces friction. If the target preload stays the same, lower friction generally means less torque is required. Applying a dry-joint torque value to a well-lubricated joint can therefore create substantially more preload than intended.',
          'This is one reason a generic online torque value should be treated as a starting estimate rather than a production tightening specification.',
        ],
      },
      {
        heading: 'FAQ: should I always choose 12.9 instead of 8.8?',
        paragraphs: [
          'No. Higher bolt strength does not automatically make the complete joint better. Cost, toughness, fatigue behavior, corrosion environment, mating-thread strength, assembly control and service requirements all affect the correct fastener choice.',
          'Use property class as one engineering input, then calculate preload and torque for the actual joint rather than selecting by strength number alone.',
        ],
      },
    ],
  },
  {
    slug: 'din-6885-parallel-key-size-chart-design-guide',
    title: 'DIN 6885 Parallel Key Size Chart + Design Guide',
    description:
      'Use shaft diameter to select a DIN 6885 parallel-key section, then check key length, shear stress and bearing pressure before finalizing the shaft-hub connection.',
    eyebrow: 'Shaft connections',
    keywords: [
      'DIN 6885 key size chart',
      'parallel key size chart',
      'shaft key dimensions',
      'keyway dimensions',
      'parallel key calculator',
    ],
    calculatorHref: '/calculators/parallel-key-calculator',
    calculatorLabel: 'Select and check a DIN 6885 parallel key',
    standardSlugs: ['din-6885'],
    sections: [
      {
        heading: 'Quick chart: representative implemented shaft ranges',
        paragraphs: [
          'DraftFit implements the DIN 6885-1 dimensional series for shaft diameters above 6 mm up to 130 mm. The calculator selects the nominal key width and height from the shaft-diameter range and then performs preliminary strength checks.',
          'Representative implemented ranges are shown below as quick orientation. Use the calculator for the complete implemented series and exact shaft diameter.',
        ],
        bullets: [
          'Over 12 to 17 mm shaft: 5 × 5 mm key section.',
          'Over 17 to 22 mm shaft: 6 × 6 mm key section.',
          'Over 22 to 30 mm shaft: 8 × 7 mm key section.',
          'Over 30 to 38 mm shaft: 10 × 8 mm key section.',
          'Over 38 to 44 mm shaft: 12 × 8 mm key section.',
          'Over 44 to 50 mm shaft: 14 × 9 mm key section.',
          'Over 50 to 58 mm shaft: 16 × 10 mm key section.',
        ],
      },
      {
        heading: 'Why shaft diameter selects the section but not the final design',
        paragraphs: [
          'The standard section gives a practical geometric starting point, but it does not prove that the connection can transmit the required torque. Key length, hub length, material strength and the allowable contact pressure can still govern the design.',
          'A 35 mm shaft, for example, falls in DraftFit’s implemented over-30-to-38 mm range and therefore starts with a 10 × 8 mm key section. The required length must still be checked against the transmitted torque.',
        ],
      },
      {
        heading: 'From torque to tangential force',
        paragraphs: [
          'A preliminary parallel-key calculation converts shaft torque into tangential force at the shaft radius. That force acts through the key and creates both shear stress and local bearing pressure at the contact surfaces.',
          'Because both failure modes depend on effective key length, increasing length can reduce calculated stress until other geometric or load-distribution limitations become important.',
        ],
      },
      {
        heading: 'Shear stress vs bearing pressure',
        paragraphs: [
          'The simplified shear check uses key width and effective length to estimate the area resisting tangential force. The bearing-pressure check uses the effective contact height and length between the key and mating component.',
          'Contact pressure often deserves as much attention as key shear because the shaft, key and hub can have different materials and allowable stresses.',
        ],
      },
      {
        heading: 'Keyway geometry and manufacturing matter',
        paragraphs: [
          'Keyway depth, corner geometry, fit, surface condition and machining tolerances influence assembly and local stress concentration. Standard dimensions should therefore be transferred to the drawing together with the correct tolerance and manufacturing requirements.',
          'The DraftFit strength result is a preliminary static screening calculation, not a complete DIN 6892 load-capacity assessment.',
        ],
      },
      {
        heading: 'FAQ: can I choose a larger key than the DIN 6885 size?',
        paragraphs: [
          'A larger key is not automatically a better design. Increasing keyway size removes more material from the shaft and hub and can change stress concentration and manufacturability. Start from the standardized section for the shaft range and solve the actual torque-capacity problem with length, materials and connection design.',
        ],
      },
    ],
  },
  {
    slug: 'o-ring-groove-dimensions-squeeze-stretch-fill',
    title: 'O-Ring Groove Dimensions: Squeeze, Stretch & Gland Fill Explained',
    description:
      'Design an O-ring groove by checking squeeze, stretch or compression, gland fill and application type instead of relying on one universal groove-depth table.',
    eyebrow: 'Sealing',
    keywords: [
      'O-ring groove dimensions',
      'O-ring gland dimensions',
      'O-ring squeeze',
      'O-ring stretch',
      'O-ring gland fill',
      'ISO 3601 groove calculator',
    ],
    calculatorHref: '/calculators/o-ring-groove-calculator',
    calculatorLabel: 'Calculate O-ring groove dimensions',
    standardSlugs: ['iso-3601'],
    sections: [
      {
        heading: 'Quick answer: groove depth is only one part of the gland',
        paragraphs: [
          'An O-ring groove cannot be selected safely from cross-section alone. The application type, squeeze direction, groove width, stretch or compression, gland fill, extrusion gap, pressure, material and tolerances all influence the final geometry.',
          'DraftFit therefore treats radial static, radial dynamic and face-seal situations separately and evaluates several geometry checks together.',
        ],
      },
      {
        heading: 'Squeeze: how much the cross-section is compressed',
        paragraphs: [
          'Squeeze compares the free O-ring cross-section with the installed space available in the compression direction. Enough squeeze is needed to create sealing contact, but excessive squeeze can increase friction, heat, compression set and assembly difficulty.',
          'The appropriate target depends on whether the application is static or dynamic and on the material, temperature and service conditions.',
        ],
      },
      {
        heading: 'Stretch and compression: what happens around the circumference',
        paragraphs: [
          'In radial glands the O-ring may be stretched over a piston or compressed into a bore groove. Circumferential deformation changes the installed cross-section and can influence both squeeze and gland fill.',
          'Avoid treating nominal O-ring inside diameter as independent from the hardware diameter. The installed geometry should be checked as a system.',
        ],
      },
      {
        heading: 'Gland fill: leave room for the seal',
        paragraphs: [
          'Gland fill compares the O-ring volume with the available groove volume. A groove that is too full can leave insufficient room for thermal expansion, material swell and dimensional tolerances.',
          'Groove width is therefore not just a packaging dimension. It works together with depth and O-ring cross-section to control available volume.',
        ],
      },
      {
        heading: 'Static vs dynamic grooves',
        paragraphs: [
          'Dynamic seals add friction and wear to the design problem. A groove suitable for a static radial seal should not automatically be reused for reciprocating or rotary motion.',
          'Application-specific squeeze targets, surface finish, lubrication, extrusion risk and speed need to be considered before finalizing a dynamic gland.',
        ],
      },
      {
        heading: 'Extrusion gap, pressure and backup rings',
        paragraphs: [
          'At higher pressure, the clearance gap between hardware components can allow elastomer extrusion. Material hardness, pressure, temperature and gap size influence whether a backup ring or tighter hardware clearance is required.',
          'The groove calculator provides preliminary geometry checks, but pressure capability still needs application-specific validation.',
        ],
      },
      {
        heading: 'FAQ: why do groove tables give different dimensions?',
        paragraphs: [
          'Different tables may target different application types, seal standards, squeeze ranges, tolerances or assumptions. Before comparing numbers, confirm that the same O-ring series, gland type and service condition are being compared.',
          'Use the calculator to make the assumptions explicit instead of copying one dimension without the rest of the gland design context.',
        ],
      },
    ],
  },
  {
    slug: 'gdt-position-tolerance-explained-examples',
    title: 'GD&T Position Tolerance Explained with Practical Examples',
    description:
      'Understand what position tolerance controls, how datums define the reference frame, why the tolerance zone is often diametrical, and how to read a practical feature-control frame.',
    eyebrow: 'GD&T',
    keywords: [
      'GD&T position tolerance',
      'true position explained',
      'position tolerance example',
      'feature control frame position',
      'datum position tolerance',
    ],
    calculatorHref: '/calculators/gdt-reference-calculator',
    calculatorLabel: 'Open the GD&T reference calculator',
    standardSlugs: ['iso-1101', 'asme-y14-5'],
    sections: [
      {
        heading: 'Quick answer: what position tolerance controls',
        paragraphs: [
          'Position tolerance controls the allowed location of a feature relative to theoretically exact dimensions and, when specified, a datum reference frame. It is commonly used for holes, pins, slots and patterns where assembly location matters.',
          'For a cylindrical feature, the tolerance zone is often a cylinder located at the basic position of the feature axis. The actual extracted or derived feature must satisfy the applicable standard definition and drawing requirements.',
        ],
      },
      {
        heading: 'Why datums matter',
        paragraphs: [
          'Datums establish the reference frame from which the feature location and orientation are evaluated. A primary datum constrains the first degrees of freedom, with secondary and tertiary datums completing the intended setup as required by the drawing.',
          'Without understanding the datum scheme, a position tolerance value by itself does not fully describe how the part should be set up or inspected.',
        ],
      },
      {
        heading: 'Reading a simple feature-control frame',
        paragraphs: [
          'A frame such as position | diameter 0.10 | A | B | C communicates the geometric characteristic, the size and shape of the tolerance zone, and the referenced datum sequence. The exact interpretation still depends on the governing drawing standard and any material-condition modifiers.',
          'The boxed or basic dimensions on the drawing establish the theoretically exact feature location; the position tolerance defines how far the actual feature may depart from that ideal location.',
        ],
      },
      {
        heading: 'Practical hole-pattern example',
        paragraphs: [
          'Consider a bolt-hole pattern located from datum surfaces A, B and C. Basic dimensions define the exact coordinates of each hole. The position callout then limits the allowed displacement of each controlled hole axis relative to that datum reference frame.',
          'This is functionally different from placing independent plus/minus coordinate tolerances on X and Y because a cylindrical position zone represents radial location error more directly.',
        ],
      },
      {
        heading: 'Position is not the same as concentricity or runout',
        paragraphs: [
          'Position, concentricity and runout control different geometric relationships. A feature that must locate an axis relative to datums may call for position, while rotating-surface behavior may be better represented by circular or total runout depending on the functional requirement.',
          'DraftFit keeps these controls separate and also reflects the fact that ASME Y14.5-2018 removed the concentricity and symmetry symbols from that edition.',
        ],
      },
      {
        heading: 'Inspection and measurement considerations',
        paragraphs: [
          'Position can be evaluated with coordinate measurement, functional gaging or other methods appropriate to the feature and specification. The inspection method should reproduce the datum reference framework and the applicable material-condition rules when those are part of the callout.',
          'For production drawings, make sure the selected control is both functionally meaningful and realistically inspectable.',
        ],
      },
      {
        heading: 'FAQ: is “true position” the same as position tolerance?',
        paragraphs: [
          '“True position” is widely used conversationally, especially in training material, but modern drawings should be read using the terminology and symbols of the stated governing standard. The key engineering idea is the allowable location of the controlled feature relative to its theoretically exact position and datum framework.',
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

  {
    slug: 'iso-273-clearance-hole-sizes',
    title: 'ISO 273 Clearance Hole Sizes for Metric Bolts: Chart & Guide',
    description:
      'Understand ISO 273 clearance-hole series for metric bolts and screws, when fine, medium or coarse clearance is appropriate, and how to use the DraftFit thread and bolt calculator.',
    eyebrow: 'Threads & fasteners',
    keywords: [
      'ISO 273',
      'ISO 273 clearance hole sizes',
      'metric bolt clearance hole chart',
      'bolt clearance hole size',
      'screw clearance hole',
    ],
    calculatorHref: '/calculators/metric-thread-bolt-calculator',
    calculatorLabel: 'Open the metric thread and bolt calculator',
    standardSlugs: ['iso-273'],
    sections: [
      {
        heading: 'Quick answer: what ISO 273 covers',
        paragraphs: [
          'ISO 273 provides general-purpose clearance-hole diameter series for metric bolts and screws. DraftFit exposes the fine, medium and coarse clearance-hole choices alongside the metric thread and bolt workflow so the hole can be selected from the fastener size rather than guessed from nominal diameter alone.',
          'A clearance hole is intentionally larger than the fastener shank or nominal thread diameter. The selected series determines how much assembly clearance is provided.',
        ],
        bullets: [
          'Fine series: smaller assembly clearance where alignment and location are more tightly controlled.',
          'Medium series: general-purpose starting point for many assemblies.',
          'Coarse series: more assembly allowance where alignment, coating or installation variation requires it.',
        ],
      },
      {
        heading: 'Why there is more than one clearance-hole series',
        paragraphs: [
          'One hole size cannot serve every assembly equally well. A tighter hole can improve positional control but leaves less room for manufacturing variation and assembly misalignment. A larger hole improves assembly freedom but reduces how closely the fastener locates the parts.',
          'The correct series therefore depends on the function of the joint, the tolerances of the parts, the installation method and whether the bolt is intended mainly to clamp or also to help locate components.',
        ],
      },
      {
        heading: 'Do not confuse clearance-hole size with tap-drill size',
        paragraphs: [
          'A clearance hole allows the bolt or screw to pass through without forming an internal thread. A tap-drill hole is smaller because material must remain for the internal thread. These are different design inputs even when they start from the same metric thread designation.',
          'Use the clearance-hole output when the fastener passes through a component and engages a nut or a threaded part elsewhere. Use a tap-drill estimate when the component itself will be internally threaded.',
        ],
      },
      {
        heading: 'Practical workflow in DraftFit',
        paragraphs: [
          'Select the metric thread size first, then review the available ISO 273 clearance-hole series together with the thread geometry, tap-drill estimate and bolt calculations. Keeping these values in one workflow helps avoid mixing a clearance-hole diameter with a thread-forming diameter.',
        ],
        bullets: [
          'Choose the actual metric fastener size.',
          'Select fine, medium or coarse clearance according to the assembly need.',
          'Check edge distance, washer or bearing area and surrounding part geometry separately.',
          'Do not treat a clearance-hole table as a complete joint-strength check.',
        ],
      },
      {
        heading: 'FAQ: should medium clearance always be the default?',
        paragraphs: [
          'Medium clearance is a useful general-purpose reference, but it is not automatically correct for every joint. Tight location requirements may favor a finer series, while assemblies with larger positional variation may require a coarser series.',
          'Use the standard series as a starting point, then confirm that the selected hole works with the real tolerances, washers, bearing surfaces and assembly process.',
        ],
      },
    ],
  },
  {
    slug: 'bolt-preload-calculation',
    title: 'Bolt Preload Calculation Explained: Formula, Stress & Calculator',
    description:
      'Learn what bolt preload is, how a target preload is estimated from bolt strength, how stress area matters, and how to check preload before estimating tightening torque.',
    eyebrow: 'Threads & fasteners',
    keywords: [
      'bolt preload calculation',
      'bolt preload calculator',
      'bolt preload formula',
      'bolt clamp force calculation',
      'preload from bolt strength',
    ],
    calculatorHref: '/calculators/metric-thread-bolt-calculator',
    calculatorLabel: 'Calculate bolt preload and tightening torque',
    standardSlugs: ['iso-898-1'],
    sections: [
      {
        heading: 'Quick answer: what bolt preload means',
        paragraphs: [
          'Bolt preload is the tensile force introduced into a fastener during tightening. That tensile force creates clamp force in the joint before external service loads are applied.',
          'For preliminary sizing, a target preload is often expressed as a chosen fraction of a strength-based force derived from the bolt stress area and an applicable material-strength value. The selected fraction is a design assumption, not a universal constant.',
        ],
      },
      {
        heading: 'Why tensile stress area matters',
        paragraphs: [
          'Threaded sections do not use the full nominal shank area for tensile calculations. A metric thread has a smaller tensile stress area that reflects the thread geometry, so preload and stress checks should use the appropriate threaded-area model rather than the circular area from nominal diameter alone.',
          'That is why two bolts with the same nominal diameter but different pitch can have different stress areas and therefore different calculated stress for the same preload.',
        ],
      },
      {
        heading: 'A practical preload calculation workflow',
        paragraphs: [
          'Start with the actual metric thread and pitch, identify the bolt property class or other verified material-strength input, calculate the tensile stress area, then choose a preload target appropriate to the joint. Divide the selected preload by the stress area to review the corresponding bolt stress.',
        ],
        bullets: [
          'Thread size and pitch define the stress area.',
          'Property class supplies strength inputs for the preliminary check.',
          'Target preload sets the intended clamp force.',
          'Bolt stress should be reviewed before converting preload into tightening torque.',
        ],
      },
      {
        heading: 'Preload is not the same as tightening torque',
        paragraphs: [
          'Preload is a force in the bolt and joint. Tightening torque is an installation input used to generate that force. Friction in the threads and under the head or nut means the same torque can produce different preload under different surface conditions.',
          'After choosing a reasonable preload target, use realistic friction assumptions to estimate torque rather than selecting preload from a generic torque table in reverse.',
        ],
      },
      {
        heading: 'What this calculation does not prove',
        paragraphs: [
          'A preload check alone does not validate the complete bolted joint. External load distribution, fatigue, separation, embedding, relaxation, temperature, thread stripping and the strength of the clamped parts can all control the design.',
          'Use DraftFit as a preliminary engineering calculator and validate critical joints with the applicable design method, material data and tightening procedure.',
        ],
      },
    ],
  },
  {
    slug: 'o-ring-size-calculator-guide',
    title: 'O-Ring Size Calculator Guide: ID, Cross Section, Stretch & Groove Fit',
    description:
      'Learn how O-ring inside diameter and cross section affect stretch, squeeze and groove fit, and how to use a groove calculator without treating nominal size as the whole design.',
    eyebrow: 'Sealing',
    keywords: [
      'o ring size calculator',
      'o-ring size calculator',
      'o ring calculation',
      'o ring ID calculator',
      'o ring cross section',
    ],
    calculatorHref: '/calculators/o-ring-groove-calculator',
    calculatorLabel: 'Open the O-Ring groove calculator',
    standardSlugs: ['iso-3601'],
    sections: [
      {
        heading: 'Quick answer: the two dimensions that define an O-ring size',
        paragraphs: [
          'An O-ring is primarily described by its inside diameter and cross-sectional diameter. Those two dimensions define the free ring, but they do not by themselves prove that the ring will work in a particular groove.',
          'Once installed, the design must also consider how much the ring stretches or compresses circumferentially, how much its cross section is squeezed, and how much of the available gland volume it occupies.',
        ],
      },
      {
        heading: 'Inside diameter controls circumferential fit',
        paragraphs: [
          'The free inside diameter determines how the O-ring fits around a piston, shaft or other locating diameter. If the installation diameter is larger than the free inside diameter, the ring is stretched. Other gland arrangements can place the ring in circumferential compression instead.',
          'Excessive stretch changes the installed cross section and can influence squeeze and gland fill, so size selection should not be separated from the groove calculation.',
        ],
      },
      {
        heading: 'Cross section controls squeeze and groove proportions',
        paragraphs: [
          'The cross-sectional diameter is the dimension compressed by the gland depth. It therefore has a direct effect on squeeze percentage and on the groove depth and width required to provide appropriate space for the installed seal.',
          'Two O-rings with similar inside diameter but different cross section are not interchangeable without reviewing the gland geometry.',
        ],
      },
      {
        heading: 'Use size, squeeze, stretch and gland fill together',
        paragraphs: [
          'A useful O-ring calculation checks the installed geometry as a system. Squeeze that looks reasonable in isolation can still be problematic if stretch is excessive or if the gland is too full to accommodate the seal, tolerances and thermal or fluid-related volume changes.',
        ],
        bullets: [
          'Start from the actual O-ring ID and cross section.',
          'Define the installation diameter and groove geometry.',
          'Review squeeze percentage.',
          'Review circumferential stretch or compression.',
          'Review gland fill and extrusion conditions separately.',
        ],
      },
      {
        heading: 'Metric and AS568 nominal sizes',
        paragraphs: [
          'Named metric or AS568 sizes are convenient starting points, but the engineering check still uses the actual nominal dimensions and the application geometry. A size designation does not replace tolerance, material, pressure and duty checks.',
        ],
      },
    ],
  },
  {
    slug: 'how-to-choose-o-ring-size',
    title: 'How to Choose an O-Ring Size for a Groove',
    description:
      'A practical workflow for choosing O-ring inside diameter and cross section from groove geometry, then checking squeeze, stretch, gland fill and application constraints.',
    eyebrow: 'Sealing',
    keywords: [
      'how to choose o ring size',
      'o ring sizing',
      'o ring groove size',
      'choose o ring for groove',
      'o ring size selection',
    ],
    calculatorHref: '/calculators/o-ring-groove-calculator',
    calculatorLabel: 'Check the selected O-Ring in the groove calculator',
    standardSlugs: ['iso-3601'],
    sections: [
      {
        heading: 'Start with the application, not only the O-ring catalogue',
        paragraphs: [
          'Choosing an O-ring begins with the sealing arrangement: radial or axial, static or dynamic, internal or external pressure, available hardware space and the diameters that locate the seal. Those conditions determine which ring dimensions can be installed with sensible squeeze and circumferential fit.',
          'A catalogue size that physically fits into the available space is only a candidate. The installed geometry still needs to be checked.',
        ],
      },
      {
        heading: 'Step 1: choose a practical cross section',
        paragraphs: [
          'Cross section strongly influences gland depth, groove width, squeeze tolerance and the amount of seal material that must fit inside the gland. Start with a section that is compatible with the available hardware envelope and the application type.',
          'Do not scale one groove proportion blindly to a different cross section because tolerances and application constraints do not always scale linearly.',
        ],
      },
      {
        heading: 'Step 2: choose inside diameter from the locating diameter',
        paragraphs: [
          'Select an inside diameter that produces an appropriate installed circumferential condition on the locating diameter. For many radial arrangements, this means checking the percentage stretch rather than simply choosing the nearest nominal ID.',
          'The installed ID also interacts with the effective cross section, so review the complete geometry after the ring is placed on the hardware.',
        ],
      },
      {
        heading: 'Step 3: calculate squeeze and gland fill',
        paragraphs: [
          'Use the groove depth to calculate nominal squeeze and the groove area to estimate gland fill. Both should be reviewed with tolerances because the worst-case assembled geometry can differ from the nominal result.',
          'A groove that produces a plausible squeeze percentage can still be unsuitable if gland fill is excessive or if there is insufficient allowance for tolerances and operating effects.',
        ],
      },
      {
        heading: 'Step 4: check the conditions the size calculator cannot decide for you',
        paragraphs: [
          'Pressure, extrusion gap, temperature, fluid compatibility, elastomer hardness, surface finish, lubrication and dynamic speed can all change the acceptable seal design. Backup rings may also be required in pressure conditions where extrusion risk is significant.',
          'Use the sizing calculation to screen the geometry, then validate the material and operating limits for the real application.',
        ],
      },
      {
        heading: 'FAQ: can I choose the nearest O-ring size and adjust the groove?',
        paragraphs: [
          'Sometimes the hardware is designed around a preferred standard O-ring, and sometimes the available groove geometry constrains the seal choice. Either workflow can be practical, but the final combination should still be checked for squeeze, circumferential fit, gland fill and operating conditions rather than accepted from nominal dimensions alone.',
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
    guideSlugs: ['h7-g6-vs-h7-h6-vs-h7-k6', 'clearance-transition-interference-fits', 'h7-g6-fit-explained'],
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
    guideSlugs: ['o-ring-groove-dimensions-squeeze-stretch-fill', 'o-ring-squeeze-explained', 'o-ring-groove-3-53-mm-guide'],
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
    guideSlugs: ['gdt-position-tolerance-explained-examples', 'gdt-position-vs-concentricity'],
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
    guideSlugs: ['iso-273-clearance-hole-sizes', 'metric-bolt-torque-8-8-vs-10-9-vs-12-9', 'bolt-preload-vs-torque', 'm10-bolt-torque-guide'],
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
    guideSlugs: ['metric-bolt-torque-8-8-vs-10-9-vs-12-9', 'bolt-preload-vs-torque', 'm10-bolt-torque-guide'],
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
    guideSlugs: ['din-6885-parallel-key-size-chart-design-guide', 'parallel-key-shear-vs-bearing-pressure', 'din-6885-key-size-35-mm-shaft'],
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
    guideSlugs: ['gdt-position-tolerance-explained-examples', 'gdt-position-vs-concentricity'],
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
