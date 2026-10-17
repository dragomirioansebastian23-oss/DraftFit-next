'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ExamplePresets from '@/components/calculators/ExamplePresets';
import ShareCalculationButton from '@/components/calculators/ShareCalculationButton';
import CopyResultButton from '@/components/calculators/CopyResultButton';
import { convertUnitLabel, formatQuantity, fromDisplayValue, inputDisplayValue } from '@/lib/units';

/*
  ISO 286 / INTERFERENCE-FIT CALCULATOR
  =====================================

  Scope:
  - ISO 286 tolerance-grade engine for 1...500 mm.
  - Explicit supported subset of fundamental deviations.
  - Limit dimensions.
  - Clearance / transition / interference classification.
  - Cmin / Cmax calculation.
  - Preliminary elastic cylindrical interference-fit calculation.
  - Separate shaft/hub E and Poisson ratio.
  - Contact pressure.
  - Approximate assembly force.
  - Approximate transmissible torque.
  - Preliminary stress / safety-factor check.

  IMPORTANT:
  The interference-fit section is an engineering PRELIMINARY ESTIMATOR.

  It is NOT a complete implementation of DIN 7190-1.

  A complete DIN 7190 implementation requires additional treatment of:
  - complete geometry;
  - hollow/solid shafts;
  - stepped hubs;
  - grooves / keyways / holes;
  - temperature;
  - surface roughness;
  - friction uncertainty;
  - local stress concentrations;
  - material nonlinearities;
  - operating loads;
  - fatigue;
  - required safety factors;
  - assembly method.
*/


/* =========================================================
   ISO 286 — NOMINAL SIZE STEPS
   ========================================================= */

const SIZE_STEPS = [
  [1, 3],
  [3, 6],
  [6, 10],
  [10, 18],
  [18, 30],
  [30, 50],
  [50, 80],
  [80, 120],
  [120, 180],
  [180, 250],
  [250, 315],
  [315, 400],
  [400, 500]
];


/* =========================================================
   ISO 286 — IT GRADES
   Values in µm.

   Supported:
   IT5 ... IT11
   ========================================================= */

const IT_TABLE = {
  5: [
    4, 5, 6, 8, 9, 11, 13,
    15, 18, 20, 23, 25, 27
  ],

  6: [
    6, 8, 9, 11, 13, 16, 19,
    22, 25, 29, 32, 36, 40
  ],

  7: [
    10, 12, 15, 18, 21, 25, 30,
    35, 40, 46, 52, 57, 63
  ],

  8: [
    14, 18, 22, 27, 33, 39, 46,
    54, 63, 72, 81, 89, 97
  ],

  9: [
    25, 30, 36, 43, 52, 62, 74,
    87, 100, 115, 130, 140, 155
  ],

  10: [
    40, 48, 58, 70, 84, 100, 120,
    140, 160, 185, 210, 230, 250
  ],

  11: [
    60, 75, 90, 110, 130, 160, 190,
    220, 250, 290, 320, 360, 400
  ]
};


/* =========================================================
   FUNDAMENTAL DEVIATIONS — SUPPORTED SUBSET
   =========================================================

   IMPORTANT:

   These tables represent the supported subset used by this
   calculator. They are NOT the complete ISO 286-2 catalogue.

   A production-grade full ISO 286-2 implementation should
   contain the complete tables and all applicable special
   grade/size rules.

   Values are in µm.
   ========================================================= */

const SHAFT_DEV = {
  d: [
    -20, -30, -40, -50, -65, -80, -100,
    -120, -145, -170, -190, -210, -230
  ],

  e: [
    -14, -20, -25, -32, -40, -50, -60,
    -72, -85, -100, -110, -125, -135
  ],

  f: [
    -6, -10, -13, -16, -20, -25, -30,
    -36, -43, -50, -56, -62, -68
  ],

  g: [
    -2, -4, -5, -6, -7, -9, -10,
    -12, -14, -15, -17, -18, -20
  ],

  h: [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],

  k: [
    0, 1, 1, 1, 2, 2, 2,
    3, 3, 4, 4, 4, 5
  ],

  m: [
    2, 4, 6, 7, 8, 9, 11,
    13, 15, 17, 20, 21, 23
  ],

  n: [
    4, 8, 10, 12, 15, 17, 20,
    23, 27, 31, 34, 37, 40
  ],

  p: [
    6, 12, 15, 18, 22, 26, 32,
    37, 43, 50, 56, 62, 68
  ],

  r: [
    10, 15, 19, 23, 28, 34, 41,
    48, 55, 63, 70, 77, 84
  ],

  s: [
    14, 19, 23, 28, 35, 43, 53,
    71, 93, 122, 158, 190, 232
  ]
};


const HOLE_DEV = {
  F: [
    6, 10, 13, 16, 20, 25, 30,
    36, 43, 50, 56, 62, 68
  ],

  G: [
    2, 4, 5, 6, 7, 9, 10,
    12, 14, 15, 17, 18, 20
  ],

  H: [
    0, 0, 0, 0, 0, 0, 0,
    0, 0, 0, 0, 0, 0
  ],

  K: [
    0, -1, -1, -1, -2, -2, -2,
    -3, -3, -4, -4, -4, -5
  ],

  M: [
    -2, -4, -6, -7, -8, -9, -11,
    -13, -15, -17, -20, -21, -23
  ],

  N: [
    -4, -8, -10, -12, -15, -17, -20,
    -23, -27, -31, -34, -37, -40
  ],

  P: [
    -6, -12, -15, -18, -22, -26, -32,
    -37, -43, -50, -56, -62, -68
  ]
};


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const translations = {
  ro: {
    modes: {
      fit: 'Ajustaj complet',
      shaft: 'Doar arbore',
      hole: 'Doar alezaj'
    },

    nominal: 'Diametru nominal (mm)',

    hole: 'Alezaj',
    shaft: 'Arbore',

    grade: 'Treaptă IT',

    deviation: 'Abatere',
    upper: 'Abatere superioară',
    lower: 'Abatere inferioară',

    limits: 'Limite dimensionale',

    midpoint:
      'Mijlocul câmpului de toleranță',

    fit: 'Ajustaj',

    clearance:
      'Ajustaj cu joc',

    transition:
      'Ajustaj intermediar',

    interference:
      'Ajustaj cu strângere',

    cmin: 'Joc minim Cmin',
    cmax: 'Joc maxim Cmax',

    imin:
      'Strângere minimă',

    imax:
      'Strângere maximă',

    supported:
      'Subset de clase implementat',

    moduleTitle:
      'ISO 286 — limite și ajustaje',

    rangeLabel:
      'Interval dimensional',

    fitResult:
      'Rezultatul ajustajului',

    safetyCheck:
      'Verificare FS',

    nonconforming:
      'NECONFORM',

    invalidNominal:
      'Introdu un diametru nominal între 1 și 500 mm.',

    standardBasis:
      'Bază tehnică',

    dimensionalBasis:
      'ISO 286-1:2010 + ISO 286-2:2010 — sistem dimensional de toleranțe și ajustaje.',

    scopeShort:
      '1–500 mm, IT5–IT11 și numai pozițiile de toleranță afișate.',

    scopeDetail:
      'Implementare curentă: 1–500 mm, IT5–IT11 și numai pozițiile de toleranță afișate în selector.',

    mechanicsBasis:
      'Secțiunea de ajustaj cu strângere este un model elastic preliminar și nu trebuie interpretată ca verificare DIN 7190-1 completă.',

    presets:
      'Ajustaje uzuale',

    press:
      'Estimare ajustaj cu strângere',

    disclaimer:
      'Estimare elastică preliminară — nu reprezintă implementarea completă DIN 7190-1.',

    length:
      'Lungime de contact L (mm)',

    hubOD:
      'Diametru exterior butuc D (mm)',

    shaftE:
      'E arbore (GPa)',

    hubE:
      'E butuc (GPa)',

    shaftNu:
      'ν arbore',

    hubNu:
      'ν butuc',

    friction:
      'Coeficient de frecare µ',

    yieldShaft:
      'Limită curgere arbore (MPa)',

    yieldHub:
      'Limită curgere butuc (MPa)',

    safety:
      'Factor minim de siguranță',

    pressure:
      'Presiune de contact',

    force:
      'Forță axială estimată',

    torque:
      'Cuplu transmisibil estimat',

    shaftStress:
      'σ echivalent arbore',

    hubStress:
      'σ echivalent butuc',

    safetyShaft:
      'FS arbore',

    safetyHub:
      'FS butuc',

    noInterference:
      'Nu există strângere pe limitele selectate; calculul mecanic nu este activ.',

    invalidGeometry:
      'Geometrie sau material invalid. Verifică D > d, L > 0, E > 0 și 0 < ν < 0.5.',

    invalidYield:
      'Introdu limite de curgere și un factor de siguranță pozitive.',

    export:
      'Tipărește / exportă fișa',

    notes:
      'Observații tehnice',

    note1:
      'ISO 286 definește relația dimensională dintre caracteristicile de mărime; nu validează singur funcția mecanică a ansamblului.',

    note2:
      'Alegerea ajustajului depinde de sarcină, temperatură, materiale, lungime de contact, suprafețe, lubrifiere și condițiile de montaj.',

    note3:
      'Pentru un calcul DIN 7190 complet trebuie modelate geometria, materialele și starea de solicitare conform domeniului de aplicare al standardului.'
  },

  en: {
    modes: {
      fit: 'Complete fit',
      shaft: 'Shaft only',
      hole: 'Hole only'
    },

    nominal:
      'Basic size (mm)',

    hole: 'Hole',
    shaft: 'Shaft',

    grade:
      'IT grade',

    deviation:
      'Deviation',

    upper:
      'Upper deviation',

    lower:
      'Lower deviation',

    limits:
      'Limit sizes',

    midpoint:
      'Tolerance-zone midpoint',

    fit:
      'Fit',

    clearance:
      'Clearance fit',

    transition:
      'Transition fit',

    interference:
      'Interference fit',

    cmin:
      'Minimum clearance Cmin',

    cmax:
      'Maximum clearance Cmax',

    imin:
      'Minimum interference',

    imax:
      'Maximum interference',

    supported:
      'Implemented class subset',

    moduleTitle:
      'ISO 286 — limits and fits',

    rangeLabel:
      'Basic-size range',

    fitResult:
      'Fit result',

    safetyCheck:
      'Safety-factor check',

    nonconforming:
      'NOT OK',

    invalidNominal:
      'Enter a basic size between 1 and 500 mm.',

    standardBasis:
      'Engineering basis',

    dimensionalBasis:
      'ISO 286-1:2010 + ISO 286-2:2010 — dimensional tolerance and fit system.',

    scopeShort:
      '1–500 mm, IT5–IT11 and only the displayed tolerance positions.',

    scopeDetail:
      'Current implementation: 1–500 mm, IT5–IT11 and only the tolerance positions shown in the selectors.',

    mechanicsBasis:
      'The interference-fit section is a preliminary elastic model and must not be interpreted as a complete DIN 7190-1 verification.',

    presets:
      'Common fits',

    press:
      'Interference-fit estimate',

    disclaimer:
      'Preliminary elastic estimate — not a complete DIN 7190-1 implementation.',

    length:
      'Contact length L (mm)',

    hubOD:
      'Hub outside diameter D (mm)',

    shaftE:
      'Shaft E (GPa)',

    hubE:
      'Hub E (GPa)',

    shaftNu:
      'Shaft ν',

    hubNu:
      'Hub ν',

    friction:
      'Friction coefficient µ',

    yieldShaft:
      'Shaft yield/proof limit (MPa)',

    yieldHub:
      'Hub yield/proof limit (MPa)',

    safety:
      'Minimum safety factor',

    pressure:
      'Contact pressure',

    force:
      'Estimated axial assembly force',

    torque:
      'Estimated transmissible torque',

    shaftStress:
      'Equivalent shaft stress',

    hubStress:
      'Equivalent hub stress',

    safetyShaft:
      'Shaft SF',

    safetyHub:
      'Hub SF',

    noInterference:
      'No interference exists for the selected limits; the mechanical calculation is inactive.',

    invalidGeometry:
      'Invalid geometry or material. Check D > d, L > 0, E > 0 and 0 < ν < 0.5.',

    invalidYield:
      'Enter positive yield/proof limits and safety factor.',

    export:
      'Print / export report',

    notes:
      'Technical notes',

    note1:
      'ISO 286 defines the dimensional relationship between features of size; it does not by itself validate the mechanical function of an assembly.',

    note2:
      'Fit selection depends on load, temperature, materials, contact length, surfaces, lubrication and assembly conditions.',

    note3:
      'A complete DIN 7190 calculation requires geometry, material and stress-state modelling within the scope of the standard.'
  }
};


/* =========================================================
   ISO 286 FUNCTIONS
   ========================================================= */

function getSizeIndex(d) {
  if (
    !Number.isFinite(d) ||
    d < 1 ||
    d > 500
  ) {
    return -1;
  }

  if (d === 1) {
    return 0;
  }

  return SIZE_STEPS.findIndex(
    ([lo, hi]) =>
      d > lo && d <= hi
  );
}


export function getIT(d, grade) {
  const index =
    getSizeIndex(d);

  if (
    index < 0 ||
    !IT_TABLE[grade]
  ) {
    return null;
  }

  return IT_TABLE[grade][index];
}


/*
  JS / js centered tolerance field.

  NOTE:
  This calculator preserves the requested IT width when the
  tolerance value is an odd number of micrometres.

  For strict production-standard implementation, the exact
  ISO 286-2 JS/js rules should be represented explicitly in
  the standard data layer.
*/
function centeredDeviation(IT) {
  const lower =
    -Math.floor(IT / 2);

  const upper =
    IT + lower;

  return {
    upper,
    lower
  };
}


function getFundamentalDeviation({
  feature,
  letter,
  grade,
  d
}) {
  const index =
    getSizeIndex(d);

  if (index < 0) {
    throw new Error(
      'Nominal size outside supported range.'
    );
  }

  /*
    Symmetrical tolerance zone.
  */
  if (
    letter === 'JS' ||
    letter === 'js'
  ) {
    const it =
      getIT(d, grade);

    if (it == null) {
      throw new Error(
        'Unsupported IT grade.'
      );
    }

    return centeredDeviation(it);
  }

  const table =
    feature === 'hole'
      ? HOLE_DEV
      : SHAFT_DEV;

  if (!table[letter]) {
    throw new Error(
      `Unsupported ${feature} deviation class: ${letter}`
    );
  }

  const fundamental =
    table[letter][index];

  const it =
    getIT(d, grade);

  if (it == null) {
    throw new Error(
      'Unsupported IT grade.'
    );
  }

  /*
    HOLES

    In this supported subset:

    F / G / H:
    fundamental value is treated as EI.

    K / M / N / P:
    fundamental value is treated as ES.

    This must NOT be generalized to the complete ISO 286-2
    catalogue without implementing the relevant standard rules.
  */
  if (feature === 'hole') {
    if (
      ['F', 'G', 'H'].includes(letter)
    ) {
      return {
        lower: fundamental,
        upper: fundamental + it
      };
    }

    return {
      upper: fundamental,
      lower: fundamental - it
    };
  }

  /*
    SHAFTS

    d / e / f / g / h:
    fundamental value is treated as es.

    k / m / n / p / r / s:
    fundamental value is treated as ei.
  */
  if (
    ['d', 'e', 'f', 'g', 'h'].includes(letter)
  ) {
    return {
      upper: fundamental,
      lower: fundamental - it
    };
  }

  return {
    lower: fundamental,
    upper: fundamental + it
  };
}


export function getLimits(
  d,
  feature,
  letter,
  grade
) {
  const it =
    getIT(d, grade);

  const dev =
    getFundamentalDeviation({
      feature,
      letter,
      grade,
      d
    });

  const min =
    d +
    dev.lower / 1000;

  const max =
    d +
    dev.upper / 1000;

  const midpoint =
    d +
    (
      dev.lower +
      dev.upper
    ) / 2000;

  return {
    it,

    upperDeviation:
      dev.upper,

    lowerDeviation:
      dev.lower,

    min,
    max,
    midpoint
  };
}


/* =========================================================
   FIT CALCULATION
   ========================================================= */

export function calculateFit(
  hole,
  shaft
) {
  /*
    Clearance definitions:

    Cmax =
      maximum hole
      -
      minimum shaft

    Cmin =
      minimum hole
      -
      maximum shaft
  */

  const cMax =
    hole.max -
    shaft.min;

  const cMin =
    hole.min -
    shaft.max;


  /*
    Pure clearance fit.
  */
  if (cMin >= 0) {
    return {
      type:
        'clearance',

      cMin,
      cMax,

      minClearance:
        cMin,

      maxClearance:
        cMax,

      minInterference:
        0,

      maxInterference:
        0
    };
  }


  /*
    Pure interference fit.
  */
  if (cMax <= 0) {
    return {
      type:
        'interference',

      cMin,
      cMax,

      minClearance:
        0,

      maxClearance:
        0,

      minInterference:
        -cMax,

      maxInterference:
        -cMin
    };
  }


  /*
    Transition fit.
  */
  return {
    type:
      'transition',

    cMin,
    cMax,

    minClearance:
      Math.max(
        cMin,
        0
      ),

    maxClearance:
      Math.max(
        cMax,
        0
      ),

    minInterference:
      Math.max(
        -cMax,
        0
      ),

    maxInterference:
      Math.max(
        -cMin,
        0
      )
  };
}


/* =========================================================
   INTERFERENCE FIT — PRELIMINARY ELASTIC MODEL
   ========================================================= */

/*
  ASSUMPTIONS:

  - solid shaft;
  - cylindrical hub;
  - uniform cylindrical contact;
  - linear elastic materials;
  - nominal contact diameter d;
  - hub outside diameter D;
  - no keyway;
  - no groove;
  - no step;
  - no local stress concentration;
  - no temperature differential;
  - no centrifugal effects;
  - no external service loads.

  Therefore:

  This is an engineering estimator, not a complete DIN 7190
  implementation.
*/

function calculateInterferenceMechanics({
  diameter,
  interferenceMm,
  hubOuterDiameter,
  length,

  shaftE,
  hubE,

  shaftNu,
  hubNu,

  friction,

  shaftYield,
  hubYield,

  safetyFactor
}) {
  if (!(interferenceMm > 0)) {
    return {
      active: false
    };
  }


  const d =
    diameter;

  const D =
    hubOuterDiameter;

  const L =
    length;


  /*
    Input E is GPa.

    Convert to MPa:

    1 GPa = 1000 MPa
  */
  const Es =
    shaftE * 1000;

  const Eh =
    hubE * 1000;


  /*
    Explicit validation.

    We DO NOT silently "repair" an invalid hub diameter.
  */
  if (
    !(
      d > 0 &&
      D > d &&
      L > 0 &&
      Es > 0 &&
      Eh > 0
    ) ||
    !(
      shaftNu > 0 &&
      shaftNu < 0.5 &&
      hubNu > 0 &&
      hubNu < 0.5
    )
  ) {
    return {
      active: true,
      valid: false,
      reason: 'geometry'
    };
  }


  if (
    !(
      shaftYield > 0 &&
      hubYield > 0 &&
      safetyFactor > 0
    )
  ) {
    return {
      active: true,
      valid: false,
      reason: 'yield'
    };
  }


  /*
    ISO 286 dimensional interference is diametral.

    Elastic radial expansion/contraction uses radial
    interference.

    Therefore:

    radial interference =
      diametral interference / 2
  */
  const radialInterference =
    interferenceMm / 2;


  /*
    Geometry.

    a = contact radius
    b = hub outer radius
  */
  const a =
    d / 2;

  const b =
    D / 2;


  /*
    Simplified radial compliance of the solid shaft.

    Units:
    mm / MPa
  */
  const shaftCompliance =
    (
      a *
      (1 - shaftNu)
    ) / Es;


  /*
    Simplified radial compliance of the thick-walled hub.

    Units:
    mm / MPa
  */
  const hubCompliance =
    (
      a / Eh
    ) *
    (
      (
        b * b +
        a * a
      ) /
      (
        b * b -
        a * a
      )
      +
      hubNu
    );


  /*
    Contact pressure.
  */
  const pressureMPa =
    radialInterference /
    (
      shaftCompliance +
      hubCompliance
    );


  /*
    Lamé stress at the hub bore.

    Hoop stress is tensile.
    Radial stress is compressive.
  */
  const hubHoop =
    pressureMPa *
    (
      b * b +
      a * a
    ) /
    (
      b * b -
      a * a
    );


  const hubRadial =
    -pressureMPa;


  /*
    Simplified surface stress state of the solid shaft
    under uniform external pressure.
  */
  const shaftHoop =
    -pressureMPa;

  const shaftRadial =
    -pressureMPa;


  /*
    2D von Mises estimate.
  */
  const vonMises =
    (s1, s2) =>
      Math.sqrt(
        s1 * s1 +
        s2 * s2 -
        s1 * s2
      );


  const shaftVM =
    vonMises(
      shaftHoop,
      shaftRadial
    );


  const hubVM =
    vonMises(
      hubHoop,
      hubRadial
    );


  /*
    Safety factors based on user-provided
    yield/proof limits.
  */
  const sfShaft =
    shaftYield /
    shaftVM;


  const sfHub =
    hubYield /
    hubVM;


  /*
    Approximate friction force:

    F = µ × p × contact area

    contact area =
      π × d × L

    Since:
      p = N/mm²
      d, L = mm

    result is N.
  */
  const axialForceN =
    friction *
    pressureMPa *
    Math.PI *
    d *
    L;


  /*
    Approximate friction torque capacity:

    T =
      µ × p × π × d × L × d/2

    =
      µ × p × π × d² × L / 2

    With p in N/mm² and geometry in mm,
    result is N·mm.

    Convert N·mm -> N·m by /1000.
  */
  const torqueNmm =
    friction *
    pressureMPa *
    Math.PI *
    d *
    d *
    L /
    2;


  const torqueNm =
    torqueNmm /
    1000;


  return {
    active: true,
    valid: true,

    pressureMPa,

    hubHoopMPa:
      hubHoop,

    hubRadialMPa:
      hubRadial,

    shaftVM,
    hubVM,

    sfShaft,
    sfHub,

    axialForceN,
    torqueNm,

    safetyOK:
      sfShaft >= safetyFactor &&
      sfHub >= safetyFactor
  };
}


/* =========================================================
   FORMATTERS
   ========================================================= */

function fmtMicron(x) {
  if (!Number.isFinite(x)) {
    return '—';
  }

  return `${
    x > 0
      ? '+'
      : ''
  }${Math.round(x)} µm`;
}


/* =========================================================
   PRESETS

   IMPORTANT:
   These are dimensional presets only.

   We intentionally do NOT claim that a given fit is always
   correct for bearings, gears, pulleys, sliding applications,
   etc.

   Functional selection depends on the application.
   ========================================================= */

const presets = [
  [
    'H',
    7,
    'g',
    6,
    'H7/g6'
  ],

  [
    'H',
    7,
    'h',
    6,
    'H7/h6'
  ],

  [
    'H',
    7,
    'k',
    6,
    'H7/k6'
  ],

  [
    'H',
    7,
    'p',
    6,
    'H7/p6'
  ],

  [
    'H',
    7,
    's',
    6,
    'H7/s6'
  ]
];




const FIT_SELECTION_OPTIONS = [
  {
    id: 'free',
    shaft: 'g',
    grade: 6,
    en: 'Free running / sliding',
    ro: 'Alunecare liberă / glisare',
    noteEn: 'Clearance-fit starting point. Evaluate actual min/max clearance for your function.',
    noteRo: 'Punct de pornire pentru ajustaj cu joc. Verifică jocul minim/maxim pentru funcția reală.'
  },
  {
    id: 'close-clearance',
    shaft: 'h',
    grade: 6,
    en: 'Close location with clearance',
    ro: 'Poziționare strânsă cu joc',
    noteEn: 'Very small theoretical minimum clearance. Manufacturing variation still matters.',
    noteRo: 'Joc minim teoretic foarte mic. Dispersia de fabricație rămâne importantă.'
  },
  {
    id: 'transition',
    shaft: 'k',
    grade: 6,
    en: 'Close location / transition',
    ro: 'Poziționare strânsă / intermediar',
    noteEn: 'May assemble with small clearance or small interference depending on actual sizes.',
    noteRo: 'Poate rezulta joc mic sau interferență mică, în funcție de dimensiunile reale.'
  },
  {
    id: 'transition-tight',
    shaft: 'm',
    grade: 6,
    en: 'Tighter transition',
    ro: 'Intermediar mai strâns',
    noteEn: 'Biases the fit further toward interference. Evaluate assembly behavior carefully.',
    noteRo: 'Deplasează ajustajul mai mult spre interferență. Verifică atent montajul.'
  },
  {
    id: 'press',
    shaft: 'p',
    grade: 6,
    en: 'Light / medium press-fit starting point',
    ro: 'Punct de pornire pentru ajustaj presat',
    noteEn: 'Interference-fit starting point. Mechanical checks become important.',
    noteRo: 'Punct de pornire pentru interferență. Verificările mecanice devin importante.'
  },
  {
    id: 'heavy',
    shaft: 's',
    grade: 6,
    en: 'Heavier interference starting point',
    ro: 'Punct de pornire pentru interferență mai mare',
    noteEn: 'More aggressive interference. Verify stresses, hub geometry and assembly method.',
    noteRo: 'Interferență mai agresivă. Verifică tensiunile, geometria butucului și montajul.'
  }
];


const ISO_EXAMPLE_PRESETS = [
  {
    id: 'clearance',
    title: { en: 'General clearance fit', ro: 'Ajustaj cu joc uzual' },
    description: { en: 'Ø25 H7/g6 — clearance-fit starting point to evaluate.', ro: 'Ø25 H7/g6 — punct de pornire pentru evaluarea unui ajustaj cu joc.' }
  },
  {
    id: 'transition',
    title: { en: 'Transition fit', ro: 'Ajustaj intermediar' },
    description: { en: 'Ø40 H7/k6 — close location with small clearance or interference.', ro: 'Ø40 H7/k6 — poziționare strânsă, cu joc sau interferență mică.' }
  },
  {
    id: 'press',
    title: { en: 'Press fit', ro: 'Ajustaj presat' },
    description: { en: 'Ø35 H7/p6 — interference fit with preliminary mechanics inputs.', ro: 'Ø35 H7/p6 — ajustaj cu interferență și parametri preliminari de montaj.' }
  }
];


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function IsoModule({
  unitSystem = 'metric',
  isDark,
  experienceMode = 'quick',
  lang = 'ro',
  onPrint
}) {
  const t =
    translations[lang] ||
    translations.ro;


  /* -------------------------------------------------------
     UI MODE
     ------------------------------------------------------- */

  const [
    mode,
    setMode
  ] =
    useState('fit');


  /* -------------------------------------------------------
     BASIC SIZE
     ------------------------------------------------------- */

  const [
    nominalInput,
    setNominalInput
  ] =
    useState('25');


  /* -------------------------------------------------------
     HOLE
     ------------------------------------------------------- */

  const [
    holeLetter,
    setHoleLetter
  ] =
    useState('H');


  const [
    holeGrade,
    setHoleGrade
  ] =
    useState(7);


  /* -------------------------------------------------------
     SHAFT
     ------------------------------------------------------- */

  const [
    shaftLetter,
    setShaftLetter
  ] =
    useState('g');


  const [
    shaftGrade,
    setShaftGrade
  ] =
    useState(6);


  /* -------------------------------------------------------
     INTERFERENCE-FIT PARAMETERS

     These values are initialized once.

     They are NOT automatically overwritten when nominal
     diameter changes.
     ------------------------------------------------------- */

  const [
    length,
    setLength
  ] =
    useState(40);


  const [
    hubOD,
    setHubOD
  ] =
    useState(75);


  const [
    shaftE,
    setShaftE
  ] =
    useState(210);


  const [
    hubE,
    setHubE
  ] =
    useState(210);


  const [
    shaftNu,
    setShaftNu
  ] =
    useState(0.30);


  const [
    hubNu,
    setHubNu
  ] =
    useState(0.30);


  const [
    friction,
    setFriction
  ] =
    useState(0.12);


  const [
    shaftYield,
    setShaftYield
  ] =
    useState(355);


  const [
    hubYield,
    setHubYield
  ] =
    useState(355);


  const [
    safetyFactor,
    setSafetyFactor
  ] =
    useState(1.5);



  /* -------------------------------------------------------
     SHAREABLE URL — RESTORE INPUTS
     ------------------------------------------------------- */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('share') !== '1') return;

      const sharedMode = params.get('calcMode');
      if (['fit', 'shaft', 'hole'].includes(sharedMode)) setMode(sharedMode);

      const d = params.get('d');
      if (d !== null) {
        const value = Number(d);
        if (Number.isFinite(value) && value >= 1 && value <= 500) setNominalInput(d);
      }

      const hLetter = params.get('hL');
      if (hLetter && Object.prototype.hasOwnProperty.call(HOLE_DEV, hLetter)) setHoleLetter(hLetter);

      const hGrade = Number(params.get('hG'));
      if (Number.isInteger(hGrade) && hGrade >= 5 && hGrade <= 11) setHoleGrade(hGrade);

      const sLetter = params.get('sL');
      if (sLetter && Object.prototype.hasOwnProperty.call(SHAFT_DEV, sLetter)) setShaftLetter(sLetter);

      const sGrade = Number(params.get('sG'));
      if (Number.isInteger(sGrade) && sGrade >= 5 && sGrade <= 11) setShaftGrade(sGrade);

      const numericSetters = [
        ['L', setLength, 0],
        ['hubOD', setHubOD, 0],
        ['Es', setShaftE, 0],
        ['Eh', setHubE, 0],
        ['nus', setShaftNu, 0],
        ['nuh', setHubNu, 0],
        ['mu', setFriction, 0],
        ['Sys', setShaftYield, 0],
        ['Syh', setHubYield, 0],
        ['SF', setSafetyFactor, 0],
      ];

      numericSetters.forEach(([key, setter, min]) => {
        const raw = params.get(key);
        if (raw === null) return;
        const value = Number(raw);
        if (Number.isFinite(value) && value >= min) setter(value);
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  /* -------------------------------------------------------
     BASIC SIZE NUMBER
     ------------------------------------------------------- */

  const nominal =
    Number.parseFloat(
      nominalInput
    );


  /* -------------------------------------------------------
     COMPLETE CALCULATION
     ------------------------------------------------------- */

  const calculation =
    useMemo(() => {
      const validNominal =
        Number.isFinite(nominal) &&
        nominal >= 1 &&
        nominal <= 500;


      if (!validNominal) {
        return {
          valid: false
        };
      }


      try {
        const hole =
          getLimits(
            nominal,
            'hole',
            holeLetter,
            holeGrade
          );


        const shaft =
          getLimits(
            nominal,
            'shaft',
            shaftLetter,
            shaftGrade
          );


        const fit =
          calculateFit(
            hole,
            shaft
          );


        let mechanics =
          null;


        /*
          Mechanical interference calculation is only useful
          if at least one possible assembly condition contains
          interference.
        */
        if (
          fit.type !==
          'clearance'
        ) {
          mechanics =
            calculateInterferenceMechanics({
              diameter:
                nominal,

              /*
                Conservative dimensional case for pressure:
                maximum possible interference.
              */
              interferenceMm:
                fit.maxInterference,

              hubOuterDiameter:
                hubOD,

              length,

              shaftE,
              hubE,

              shaftNu,
              hubNu,

              friction,

              shaftYield,
              hubYield,

              safetyFactor
            });
        }


        return {
          valid: true,

          range:
            SIZE_STEPS[
              getSizeIndex(
                nominal
              )
            ],

          hole,
          shaft,
          fit,
          mechanics,

          /*
            A transition fit can result in either clearance or
            interference depending on the actual manufactured sizes.
            When mechanics are shown for a transition fit, the
            preliminary calculation uses the maximum possible
            dimensional interference as a conservative screening case.
          */
          mechanicsUsesPossibleInterference:
            fit.type === 'transition'
        };
      }

      catch (error) {
        return {
          valid: false,

          error:
            error.message
        };
      }
    }, [
      nominal,

      holeLetter,
      holeGrade,

      shaftLetter,
      shaftGrade,

      hubOD,
      length,

      shaftE,
      hubE,

      shaftNu,
      hubNu,

      friction,

      shaftYield,
      hubYield,

      safetyFactor
    ]);


  /* =======================================================
     UI CLASSES
     ======================================================= */

  const ui = {
    card:
      isDark
        ? 'bg-zinc-900 border-zinc-800'
        : 'bg-white border-zinc-200 shadow-sm',

    subCard:
      isDark
        ? 'bg-zinc-950 border-zinc-800'
        : 'bg-zinc-50 border-zinc-200',

    input:
      isDark
        ? 'bg-zinc-950 border-zinc-700 text-white'
        : 'bg-white border-zinc-300 text-zinc-900',

    text:
      isDark
        ? 'text-white'
        : 'text-zinc-900',

    sub:
      isDark
        ? 'text-zinc-400'
        : 'text-zinc-500',

    divider:
      isDark
        ? 'border-zinc-800'
        : 'border-zinc-200'
  };


  const fitLabel =
    calculation.valid
      ? t[
          calculation.fit.type
        ]
      : '—';


  const applyPreset =
    (preset) => {
      setHoleLetter(
        preset[0]
      );

      setHoleGrade(
        preset[1]
      );

      setShaftLetter(
        preset[2]
      );

      setShaftGrade(
        preset[3]
      );
    };




  const loadExamplePreset =
    (presetId) => {
      if (presetId === 'clearance') {
        setMode('fit');
        setNominalInput('25');
        setHoleLetter('H');
        setHoleGrade(7);
        setShaftLetter('g');
        setShaftGrade(6);
        setLength(30);
        setHubOD(50);
        return;
      }

      if (presetId === 'transition') {
        setMode('fit');
        setNominalInput('40');
        setHoleLetter('H');
        setHoleGrade(7);
        setShaftLetter('k');
        setShaftGrade(6);
        setLength(45);
        setHubOD(80);
        return;
      }

      setMode('fit');
      setNominalInput('35');
      setHoleLetter('H');
      setHoleGrade(7);
      setShaftLetter('p');
      setShaftGrade(6);
      setLength(40);
      setHubOD(75);
      setShaftE(210);
      setHubE(210);
      setShaftNu(0.30);
      setHubNu(0.30);
      setFriction(0.12);
      setShaftYield(355);
      setHubYield(355);
      setSafetyFactor(1.5);
    };


  const applyFitSelection = (option) => {
    setMode('fit');
    setHoleLetter('H');
    setHoleGrade(7);
    setShaftLetter(option.shaft);
    setShaftGrade(option.grade);
  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div className={`draftfit-experience-${experienceMode} grid grid-cols-1 lg:grid-cols-12 gap-7`}>


      {/* ===================================================
          LEFT CONTROL PANEL
          =================================================== */}

      <aside className="lg:col-span-4 space-y-6 print:hidden">











        <div
          className={`
            p-6
            border
            border-l-4
            border-l-orange-500
            space-y-6
            ${ui.card}
          `}
        >

          {/* Header */}

          <div
            className={`
              border-b
              pb-4
              ${ui.divider}
            `}
          >
            <h2
              className={`
                text-sm
                font-bold
                uppercase
                tracking-widest
                ${ui.text}
              `}
            >
              {t.moduleTitle}
            </h2>

            <p
              className={`
                text-[10px]
                mt-2
                ${ui.sub}
              `}
            >
              {t.supported}: {t.scopeShort}
            </p>
          </div>


          {/* Mode */}

          <div
            className={`
              p-1
              border
              flex
              ${
                isDark
                  ? 'bg-zinc-950 border-zinc-800'
                  : 'bg-zinc-100 border-zinc-300'
              }
            `}
          >
            {[
              'fit',
              'shaft',
              'hole'
            ].map(
              (item) => (
                <button
                  key={item}
                  type="button"

                  onClick={() =>
                    setMode(
                      item
                    )
                  }

                  className={`
                    flex-1
                    py-2
                    text-[10px]
                    uppercase
                    tracking-widest
                    font-bold
                    cursor-pointer

                    ${
                      mode === item
                        ? 'bg-zinc-700 text-white'
                        : ui.sub
                    }
                  `}
                >
                  {
                    t.modes[
                      item
                    ]
                  }
                </button>
              )
            )}
          </div>


          {/* Basic size */}

          <div>
            <label
              className={`
                block
                text-[10px]
                uppercase
                font-bold
                tracking-widest
                mb-2
                ${ui.sub}
              `}
            >
              {convertUnitLabel(t.nominal, unitSystem)}
            </label>

            <input
              type="number"

              min={unitSystem === 'metric' ? '1' : '0.03937'}
              max={unitSystem === 'metric' ? '500' : '19.685'}

              step="any"

              value={inputDisplayValue(nominalInput, 'length', unitSystem)}

              onChange={
                (e) => {
                  if (e.target.value === '') {
                    setNominalInput('');
                    return;
                  }
                  setNominalInput(
                    String(fromDisplayValue(Number(e.target.value), 'length', unitSystem))
                  );
                }
              }

              className={`
                w-full
                border-b-2
                border-t-0
                border-l-0
                border-r-0
                p-3
                text-2xl
                font-bold
                font-mono
                text-center
                bg-transparent
                ${ui.input}
              `}
            />


            {calculation.valid && (
              <div
                className="
                  text-[10px]
                  font-mono
                  text-orange-500
                  mt-2
                  text-center
                "
              >
                {t.rangeLabel}:{' '}
                {formatQuantity(calculation.range[0], 'length', unitSystem)}
                {' < D ≤ '}
                {formatQuantity(calculation.range[1], 'length', unitSystem)}
              </div>
            )}
          </div>


          {/* Hole controls */}

          {(
            mode === 'fit' ||
            mode === 'hole'
          ) && (
            <div
              className={`
                p-4
                border
                ${ui.subCard}
              `}
            >

              <div
                className="
                  flex
                  justify-between
                  mb-3
                "
              >
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-widest
                    font-bold
                    text-sky-500
                  "
                >
                  {t.hole}
                </span>

                <span
                  className="
                    font-mono
                    text-xs
                  "
                >
                  Ø{nominalInput}{' '}
                  {holeLetter}
                  {holeGrade}
                </span>
              </div>


              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                <select
                  value={
                    holeLetter
                  }

                  onChange={
                    (e) =>
                      setHoleLetter(
                        e.target.value
                      )
                  }

                  className={`
                    border
                    p-2
                    font-mono
                    text-sm
                    ${ui.input}
                  `}
                >
                  {[
                    'F',
                    'G',
                    'H',
                    'JS',
                    'K',
                    'M',
                    'N',
                    'P'
                  ].map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>


                <select
                  value={
                    holeGrade
                  }

                  onChange={
                    (e) =>
                      setHoleGrade(
                        Number(
                          e.target.value
                        )
                      )
                  }

                  className={`
                    border
                    p-2
                    font-mono
                    text-sm
                    ${ui.input}
                  `}
                >
                  {[
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11
                  ].map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          )}


          {/* Shaft controls */}

          {(
            mode === 'fit' ||
            mode === 'shaft'
          ) && (
            <div
              className={`
                p-4
                border
                ${ui.subCard}
              `}
            >

              <div
                className="
                  flex
                  justify-between
                  mb-3
                "
              >
                <span
                  className="
                    text-[10px]
                    uppercase
                    tracking-widest
                    font-bold
                    text-emerald-600
                  "
                >
                  {t.shaft}
                </span>

                <span
                  className="
                    font-mono
                    text-xs
                  "
                >
                  Ø{nominalInput}{' '}
                  {shaftLetter}
                  {shaftGrade}
                </span>
              </div>


              <div
                className="
                  grid
                  grid-cols-2
                  gap-3
                "
              >
                <select
                  value={
                    shaftLetter
                  }

                  onChange={
                    (e) =>
                      setShaftLetter(
                        e.target.value
                      )
                  }

                  className={`
                    border
                    p-2
                    font-mono
                    text-sm
                    ${ui.input}
                  `}
                >
                  {[
                    'd',
                    'e',
                    'f',
                    'g',
                    'h',
                    'js',
                    'k',
                    'm',
                    'n',
                    'p',
                    'r',
                    's'
                  ].map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>


                <select
                  value={
                    shaftGrade
                  }

                  onChange={
                    (e) =>
                      setShaftGrade(
                        Number(
                          e.target.value
                        )
                      )
                  }

                  className={`
                    border
                    p-2
                    font-mono
                    text-sm
                    ${ui.input}
                  `}
                >
                  {[
                    5,
                    6,
                    7,
                    8,
                    9,
                    10,
                    11
                  ].map(
                    (item) => (
                      <option
                        key={item}
                        value={item}
                      >
                        {item}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          )}


          {/* Print */}

          <button
            type="button"
            onClick={() =>
              onPrint
                ? onPrint()
                : window.print()
            }

            className="
              w-full
              bg-orange-600
              hover:bg-orange-500
              text-white
              font-bold
              py-3
              uppercase
              tracking-widest
              text-xs
              cursor-pointer
            "
          >
            {t.export}
          </button>


          {/* ===================================================
              DESKTOP QUICK PRESETS / ASSISTANT
              =================================================== */}

          <div className="hidden lg:block print:hidden">
            <section
              className={`
                mt-4
                border
                border-orange-500/25
                ${ui.card}
                p-4
              `}
            >
              <div className="mb-3">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-orange-500">
                  {lang === 'ro' ? 'Ajustaje uzuale' : 'Common fit presets'}
                </div>
                <p className={`mt-1 text-[10px] leading-5 ${ui.sub}`}>
                  {lang === 'ro'
                    ? 'Puncte de pornire rapide. Rezultatul numeric trebuie verificat pentru aplicația reală.'
                    : 'Quick starting points. Verify the numerical result for the real application.'}
                </p>
              </div>

<div className="mt-3 space-y-3">
{/* Presets */}

          {mode === 'fit' && (
            <div
              className={`
                pt-4
                border-t
                ${ui.divider}
              `}
            >
              <span
                className={`
                  block
                  text-[10px]
                  uppercase
                  tracking-widest
                  font-bold
                  mb-3
                  ${ui.sub}
                `}
              >
                {t.presets}
              </span>


              <div className="space-y-2">

                {presets.map(
                  (preset) => {
                    const selected =
                      holeLetter ===
                        preset[0] &&

                      holeGrade ===
                        preset[1] &&

                      shaftLetter ===
                        preset[2] &&

                      shaftGrade ===
                        preset[3];


                    return (
                      <button
                        key={
                          preset[4]
                        }
                        type="button"

                        onClick={() =>
                          applyPreset(
                            preset
                          )
                        }

                        className={`
                          w-full
                          text-left
                          p-3
                          border
                          text-xs
                          cursor-pointer

                          ${
                            selected
                              ? 'border-orange-500 bg-orange-500/10 text-orange-600'
                              : ui.subCard
                          }
                        `}
                      >
                        <span
                          className="
                            font-mono
                            font-bold
                          "
                        >
                          {
                            preset[4]
                          }
                        </span>
                      </button>
                    );
                  }
                )}

              </div>
            </div>
          )}
<ExamplePresets
          presets={ISO_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-orange-500"
        />
                </div>
            </section>

            <div className="mt-3">
<details className="draftfit-assistant-compact print:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea ajustajului?' : 'Need help choosing a fit?'}
          </summary>

        <section
          className={`
            border
            border-orange-500/25
            ${ui.card}
            overflow-hidden
          `}
        >
          <div className="border-b border-orange-500/20 bg-orange-500/5 p-4 sm:p-5">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
              {lang === 'ro' ? 'Asistent selecție ajustaj' : 'Fit Selection Assistant'}
            </div>
            <h2 className={`mt-1 text-lg font-black ${ui.text}`}>
              {lang === 'ro' ? 'Știi funcția, dar nu știi încă H7/...?' : 'Know the function, but not the H7/... fit yet?'}
            </h2>
            <p className={`mt-2 text-xs leading-5 ${ui.sub}`}>
              {lang === 'ro'
                ? 'Alege comportamentul dorit. DraftFit îți încarcă un punct de pornire pe sistem alezaj unitar H7, apoi tu verifici numeric jocul sau interferența.'
                : 'Choose the behavior you want. DraftFit loads a hole-basis H7 starting point, then you evaluate the actual clearance or interference numerically.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 p-4 sm:p-5">
            {FIT_SELECTION_OPTIONS.map((option) => {
              const active = holeLetter === 'H' && holeGrade === 7 && shaftLetter === option.shaft && shaftGrade === option.grade;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => applyFitSelection(option)}
                  className={`
                    min-h-16 border px-4 py-3 text-left transition
                    ${active
                      ? 'border-orange-500 bg-orange-500/10'
                      : isDark
                        ? 'border-zinc-800 bg-zinc-950 hover:border-orange-500/60'
                        : 'border-zinc-300 bg-white hover:border-orange-500/60'}
                  `}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-sm font-black ${ui.text}`}>
                      {lang === 'ro' ? option.ro : option.en}
                    </span>
                    <span className="font-mono text-xs font-black text-orange-500">
                      H7/{option.shaft}{option.grade}
                    </span>
                  </div>
                  <p className={`mt-1 text-[11px] leading-5 ${ui.sub}`}>
                    {lang === 'ro' ? option.noteRo : option.noteEn}
                  </p>
                </button>
              );
            })}

            <p className={`mt-1 text-[10px] leading-5 ${ui.sub}`}>
              {lang === 'ro'
                ? 'Acestea sunt puncte de pornire pentru evaluare, nu recomandări automate de proiectare. Funcția, sarcina, montajul, materialele și procesul de fabricație decid ajustajul final.'
                : 'These are starting points to evaluate, not automatic design recommendations. Function, loading, assembly, materials and manufacturing process determine the final fit.'}
            </p>
          </div>
        </section>

                </details>
            </div>
          </div>

        </div>
      </aside>


      {/* ===================================================
          MAIN CONTENT
          =================================================== */}

      <main
        className="
          lg:col-span-8
          space-y-7
          print:col-span-12
        "
      >

        {!calculation.valid ? (

          <div
            className="
              p-6
              border
              border-rose-500/30
              bg-rose-500/10
              text-rose-600
              font-bold
            "
          >
            {
              calculation.error ||
              t.invalidNominal
            }
          </div>

        ) : (

          <>

            {mode === 'fit' && (
              <section
                className={`
                  border border-l-4
                  ${calculation.fit.type === 'clearance'
                    ? 'border-l-emerald-500'
                    : calculation.fit.type === 'transition'
                      ? 'border-l-amber-500'
                      : 'border-l-rose-500'}
                  ${ui.card}
                  p-5 sm:p-7
                `}
              >
                <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
                  <div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.18em] ${ui.sub}`}>
                      {lang === 'ro' ? 'Rezultat principal' : 'Primary result'}
                    </div>
                    <h2 className={`mt-1 text-2xl font-black sm:text-3xl ${ui.text}`}>
                      {fitLabel}
                    </h2>
                    <p className={`mt-2 max-w-2xl text-sm leading-6 ${ui.sub}`}>
                      {calculation.fit.type === 'clearance'
                        ? (lang === 'ro'
                            ? 'Chiar și în combinația dimensională cea mai strânsă rămâne joc.'
                            : 'Even the tightest dimensional combination retains clearance.')
                        : calculation.fit.type === 'interference'
                          ? (lang === 'ro'
                              ? 'Toate combinațiile dimensionale produc interferență; verifică montajul și mecanica îmbinării.'
                              : 'All dimensional combinations produce interference; review assembly and joint mechanics.')
                          : (lang === 'ro'
                              ? 'În funcție de dimensiunile efectiv fabricate, perechea poate avea joc mic sau interferență mică.'
                              : 'Depending on the actual manufactured sizes, the pair may have small clearance or small interference.')}
                    </p>
                  </div>
                  <div className="font-mono text-sm sm:text-right">
                    {calculation.fit.type === 'transition' ? (
                      <>
                        <div>{lang === 'ro' ? 'Joc maxim posibil' : 'Max possible clearance'}: {formatQuantity(calculation.fit.maxClearance, 'length', unitSystem)}</div>
                        <div>{lang === 'ro' ? 'Interferență maximă posibilă' : 'Max possible interference'}: {formatQuantity(calculation.fit.maxInterference, 'length', unitSystem)}</div>
                      </>
                    ) : (
                      <>
                        <div>{t.cmin}: {formatQuantity(calculation.fit.cMin, 'length', unitSystem)}</div>
                        <div>{t.cmax}: {formatQuantity(calculation.fit.cMax, 'length', unitSystem)}</div>
                      </>
                    )}
                  </div>
                </div>
              </section>
            )}


            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:hidden">
<ShareCalculationButton
          params={{
            view: experienceMode,
            units: unitSystem,
            calcMode: mode,
            d: nominalInput,
            hL: holeLetter,
            hG: holeGrade,
            sL: shaftLetter,
            sG: shaftGrade,
            L: length,
            hubOD,
            Es: shaftE,
            Eh: hubE,
            nus: shaftNu,
            nuh: hubNu,
            mu: friction,
            Sys: shaftYield,
            Syh: hubYield,
            SF: safetyFactor,
          }}
          isDark={isDark}
          lang={lang}
          accentClass="text-orange-500"
        />
<CopyResultButton
          text={
            calculation.valid
              ? [
                  'DraftFit — ISO 286 Fit Calculator',
                  `Fit: Ø${formatQuantity(nominal, 'length', unitSystem)} ${holeLetter}${holeGrade}/${shaftLetter}${shaftGrade}`,
                  `Classification: ${calculation.fit.type}`,
                  `Hole limits: ${formatQuantity(calculation.hole.min, 'length', unitSystem)} … ${formatQuantity(calculation.hole.max, 'length', unitSystem)}`,
                  `Shaft limits: ${formatQuantity(calculation.shaft.min, 'length', unitSystem)} … ${formatQuantity(calculation.shaft.max, 'length', unitSystem)}`,
                  `Minimum clearance: ${formatQuantity(calculation.fit.cMin, 'length', unitSystem)}`,
                  `Maximum clearance: ${formatQuantity(calculation.fit.cMax, 'length', unitSystem)}`,
                  `Minimum interference: ${formatQuantity(calculation.fit.minInterference, 'length', unitSystem)}`,
                  `Maximum interference: ${formatQuantity(calculation.fit.maxInterference, 'length', unitSystem)}`,
                  calculation.mechanics
                    ? `Estimated pressure: ${formatQuantity(calculation.mechanics.pressureMPa, 'stress', unitSystem)}`
                    : null,
                  calculation.mechanics
                    ? `Estimated transmissible torque: ${formatQuantity(calculation.mechanics.torqueNm, 'torque', unitSystem)}`
                    : null,
                ].filter(Boolean).join('\n')
              : 'DraftFit — ISO 286 Fit Calculator\nInvalid input or unsupported size.'
          }
          isDark={isDark}
          lang={lang}
          accentClass="text-orange-500"
        />
            </div>


            {/* ===============================================
                LIMIT DIMENSIONS
                =============================================== */}

            <section
              className={`
                p-5
                sm:p-8
                border
                ${ui.card}
              `}
            >

              <div
                className={`
                  flex
                  flex-wrap
                  justify-between
                  gap-4
                  items-center
                  border-b
                  pb-5
                  mb-6
                  ${ui.divider}
                `}
              >

                <div>

                  <div
                    className={`
                      text-4xl
                      font-black
                      font-mono
                      ${ui.text}
                    `}
                  >
                    Ø{formatQuantity(nominal, 'length', unitSystem)}{' '}

                    {
                      mode === 'fit'
                        ? `${holeLetter}${holeGrade}/${shaftLetter}${shaftGrade}`

                        : mode === 'hole'
                          ? `${holeLetter}${holeGrade}`

                          : `${shaftLetter}${shaftGrade}`
                    }
                  </div>


                  {mode === 'fit' && (
                    <div
                      className="
                        mt-2
                        text-xs
                        font-bold
                        uppercase
                        tracking-widest
                        text-orange-500
                      "
                    >
                      {t.fit}:{' '}
                      {fitLabel}
                    </div>
                  )}

                </div>


                {mode === 'fit' && (
                  <div
                    className="
                      text-right
                      font-mono
                      text-sm
                    "
                  >
                    <div>
                      {t.cmin}:{' '}
                      {
                        formatQuantity(calculation.fit.cMin, 'length', unitSystem)
                      }
                    </div>

                    <div>
                      {t.cmax}:{' '}
                      {
                        formatQuantity(calculation.fit.cMax, 'length', unitSystem)
                      }
                    </div>
                  </div>
                )}

              </div>


              <div
                className={`
                  grid
                  gap-6
                  ${
                    mode === 'fit'
                      ? 'md:grid-cols-2'
                      : ''
                  }
                `}
              >

                {(
                  mode === 'fit' ||
                  mode === 'hole'
                ) && (
                  <LimitCard
                    title={
                      `${t.hole} ${holeLetter}${holeGrade}`
                    }

                    color="sky"

                    data={
                      calculation.hole
                    }

                    t={t}

                    ui={ui}
                    unitSystem={unitSystem}
                  />
                )}


                {(
                  mode === 'fit' ||
                  mode === 'shaft'
                ) && (
                  <LimitCard
                    title={
                      `${t.shaft} ${shaftLetter}${shaftGrade}`
                    }

                    color="emerald"

                    data={
                      calculation.shaft
                    }

                    t={t}

                    ui={ui}
                    unitSystem={unitSystem}
                  />
                )}

              </div>

            </section>


            {/* ===============================================
                FIT RESULTS
                =============================================== */}

            {mode === 'fit' && (
              <>

                <section
                  className={`
                    p-8
                    border
                    ${ui.card}
                  `}
                >
                  <h3
                    className={`
                      text-xs
                      uppercase
                      tracking-widest
                      font-bold
                      mb-5
                      ${ui.sub}
                    `}
                  >
                    {t.fitResult}
                  </h3>


                  <div
                    className="
                      grid
                      md:grid-cols-4
                      gap-4
                    "
                  >

                    <Metric
                      label={
                        t.cmin
                      }

                      value={
                        formatQuantity(calculation.fit.cMin, 'length', unitSystem)
                      }

                      ui={ui}
                    />


                    <Metric
                      label={
                        t.cmax
                      }

                      value={
                        formatQuantity(calculation.fit.cMax, 'length', unitSystem)
                      }

                      ui={ui}
                    />


                    <Metric
                      label={
                        t.imin
                      }

                      value={
                        formatQuantity(calculation.fit.minInterference, 'length', unitSystem)
                      }

                      ui={ui}
                    />


                    <Metric
                      label={
                        t.imax
                      }

                      value={
                        formatQuantity(calculation.fit.maxInterference, 'length', unitSystem)
                      }

                      ui={ui}
                    />

                  </div>

                </section>


                {/* ===========================================
                    INTERFERENCE FIT
                    =========================================== */}

                <section
                  className={`
                    p-8
                    border
                    border-l-4
                    border-l-rose-500
                    ${ui.card}
                  `}
                >

                  <div
                    className="
                      flex
                      flex-wrap
                      justify-between
                      gap-3
                      items-center
                      mb-6
                    "
                  >

                    <div>

                      <h3
                        className="
                          text-xs
                          uppercase
                          tracking-widest
                          font-bold
                          text-rose-500
                        "
                      >
                        {t.press}
                      </h3>


                      <p
                        className={`
                          text-[10px]
                          mt-2
                          ${ui.sub}
                        `}
                      >
                        {t.disclaimer}
                      </p>

                    </div>

                  </div>


                  {calculation.fit.type ===
                  'clearance' ? (

                    <div
                      className={`
                        p-4
                        border
                        ${ui.subCard}
                        text-sm
                        ${ui.sub}
                      `}
                    >
                      {
                        t.noInterference
                      }
                    </div>

                  ) : (

                    <>

                      {calculation.mechanicsUsesPossibleInterference && (
                        <div
                          className="
                            mb-5
                            p-4
                            border
                            border-amber-500/40
                            bg-amber-500/10
                            text-amber-500
                            text-xs
                            font-semibold
                            leading-relaxed
                          "
                        >
                          {lang === 'ro'
                            ? 'Atenție: ajustajul selectat este intermediar. Calculul mecanic utilizează interferența maximă posibilă rezultată din limitele dimensionale. Interferența nu este garantată pentru fiecare piesă fabricată în toleranță.'
                            : 'Warning: the selected fit is a transition fit. The mechanical calculation uses the maximum possible interference from the dimensional limits. Interference is not guaranteed for every part manufactured within tolerance.'}
                        </div>
                      )}


                      {/* Inputs */}

                      <div
                        className="
                          draftfit-advanced-only
                          grid
                          md:grid-cols-3
                          gap-4
                          mb-6
                        "
                      >

                        <Field
                          label={
                            convertUnitLabel(t.length, unitSystem)
                          }

                          quantity="length"
                          unitSystem={unitSystem}

                          value={
                            length
                          }

                          setValue={
                            setLength
                          }

                          step="0.1"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.hubOD, unitSystem)
                          }

                          quantity="length"
                          unitSystem={unitSystem}

                          value={
                            hubOD
                          }

                          setValue={
                            setHubOD
                          }

                          step="0.1"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.friction, unitSystem)
                          }

                          quantity="dimensionless"
                          unitSystem={unitSystem}

                          value={
                            friction
                          }

                          setValue={
                            setFriction
                          }

                          step="0.01"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.shaftE, unitSystem)
                          }

                          quantity="modulusGPa"
                          unitSystem={unitSystem}

                          value={
                            shaftE
                          }

                          setValue={
                            setShaftE
                          }

                          step="1"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.hubE, unitSystem)
                          }

                          quantity="modulusGPa"
                          unitSystem={unitSystem}

                          value={
                            hubE
                          }

                          setValue={
                            setHubE
                          }

                          step="1"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.shaftNu, unitSystem)
                          }

                          quantity="dimensionless"
                          unitSystem={unitSystem}

                          value={
                            shaftNu
                          }

                          setValue={
                            setShaftNu
                          }

                          step="0.01"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.hubNu, unitSystem)
                          }

                          quantity="dimensionless"
                          unitSystem={unitSystem}

                          value={
                            hubNu
                          }

                          setValue={
                            setHubNu
                          }

                          step="0.01"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.yieldShaft, unitSystem)
                          }

                          quantity="stress"
                          unitSystem={unitSystem}

                          value={
                            shaftYield
                          }

                          setValue={
                            setShaftYield
                          }

                          step="1"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.yieldHub, unitSystem)
                          }

                          quantity="stress"
                          unitSystem={unitSystem}

                          value={
                            hubYield
                          }

                          setValue={
                            setHubYield
                          }

                          step="1"

                          ui={ui}
                        />


                        <Field
                          label={
                            convertUnitLabel(t.safety, unitSystem)
                          }

                          quantity="dimensionless"
                          unitSystem={unitSystem}

                          value={
                            safetyFactor
                          }

                          setValue={
                            setSafetyFactor
                          }

                          step="0.1"

                          ui={ui}
                        />

                      </div>


                      {/* Invalid mechanics */}

                      {!calculation
                        .mechanics
                        ?.valid ? (

                        <div
                          className="
                            p-4
                            border
                            border-rose-500/30
                            bg-rose-500/10
                            text-rose-600
                            text-sm
                            font-bold
                          "
                        >
                          {
                            calculation
                              .mechanics
                              ?.reason ===
                            'yield'

                              ? t.invalidYield

                              : t.invalidGeometry
                          }
                        </div>

                      ) : (

                        /* Results */

                        <div
                          className="
                            grid
                            md:grid-cols-4
                            gap-4
                          "
                        >

                          <Metric
                            label={
                              t.pressure
                            }

                            value={
                              formatQuantity(calculation.mechanics.pressureMPa, 'stress', unitSystem)
                            }

                            ui={ui}
                          />


                          <Metric
                            label={
                              t.force
                            }

                            value={
                              unitSystem === 'metric'
                                ? formatQuantity(calculation.mechanics.axialForceN / 1000, 'forceKN', unitSystem)
                                : formatQuantity(calculation.mechanics.axialForceN, 'forceN', unitSystem)
                            }

                            ui={ui}
                          />


                          <Metric
                            label={
                              t.torque
                            }

                            value={
                              formatQuantity(calculation.mechanics.torqueNm, 'torque', unitSystem)
                            }

                            ui={ui}
                          />


                          <Metric
                            label={
                              t.safetyCheck
                            }

                            value={
                              calculation
                                .mechanics
                                .safetyOK

                                ? 'OK'

                                : t.nonconforming
                            }

                            ui={ui}
                          />


                          <Metric
                            label={
                              t.shaftStress
                            }

                            value={
                              formatQuantity(calculation.mechanics.shaftVM, 'stress', unitSystem)
                            }

                            ui={ui}
                          />


                          <Metric
                            label={
                              t.hubStress
                            }

                            value={
                              formatQuantity(calculation.mechanics.hubVM, 'stress', unitSystem)
                            }

                            ui={ui}
                          />


                          <Metric
                            label={
                              t.safetyShaft
                            }

                            value={
                              calculation
                                .mechanics
                                .sfShaft
                                .toFixed(2)
                            }

                            ui={ui}
                          />


                          <Metric
                            label={
                              t.safetyHub
                            }

                            value={
                              calculation
                                .mechanics
                                .sfHub
                                .toFixed(2)
                            }

                            ui={ui}
                          />

                        </div>
                      )}

                    </>
                  )}

                </section>

              </>
            )}


            {/* ===============================================
                ENGINEERING BASIS
                =============================================== */}

            <section
              className={`
                p-5
                sm:p-8
                border
                border-l-4
                border-l-sky-500
                ${ui.card}
              `}
            >
              <h3
                className={`
                  text-xs
                  uppercase
                  tracking-widest
                  font-bold
                  mb-4
                  text-sky-500
                `}
              >
                {t.standardBasis}
              </h3>

              <div
                className={`
                  space-y-3
                  text-sm
                  leading-relaxed
                  ${ui.sub}
                `}
              >
                <p>
                  <strong className={ui.text}>
                    ISO 286
                  </strong>{' '}
                  — {t.dimensionalBasis}
                </p>

                <p>
                  {t.scopeDetail}
                </p>

                <p>
                  {t.mechanicsBasis}
                </p>
              </div>
            </section>


            <section className={`border ${ui.card} p-4 sm:p-5 print:hidden lg:hidden`}>
              <div className="mb-4">
                <div className={`text-[10px] font-black uppercase tracking-[0.16em] ${ui.sub}`}>
                  {lang === 'ro' ? 'Ajutor opțional' : 'Optional guidance'}
                </div>
                <h3 className={`mt-1 text-lg font-black ${ui.text}`}>
                  {lang === 'ro' ? 'Ai nevoie de ajutor sau de un exemplu?' : 'Need help or an example?'}
                </h3>
                <p className={`mt-1 text-xs leading-5 ${ui.sub}`}>
                  {lang === 'ro'
                    ? 'Calculatorul principal și rezultatele sunt deja mai sus. Folosește aceste opțiuni doar dacă vrei un punct de pornire.'
                    : 'The main calculator and results are already above. Use these options only when you want a starting point.'}
                </p>
              </div>

<details className="draftfit-assistant-compact print:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea ajustajului?' : 'Need help choosing a fit?'}
          </summary>

        <section
          className={`
            border
            border-orange-500/25
            ${ui.card}
            overflow-hidden
          `}
        >
          <div className="border-b border-orange-500/20 bg-orange-500/5 p-4 sm:p-5">
            <div className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">
              {lang === 'ro' ? 'Asistent selecție ajustaj' : 'Fit Selection Assistant'}
            </div>
            <h2 className={`mt-1 text-lg font-black ${ui.text}`}>
              {lang === 'ro' ? 'Știi funcția, dar nu știi încă H7/...?' : 'Know the function, but not the H7/... fit yet?'}
            </h2>
            <p className={`mt-2 text-xs leading-5 ${ui.sub}`}>
              {lang === 'ro'
                ? 'Alege comportamentul dorit. DraftFit îți încarcă un punct de pornire pe sistem alezaj unitar H7, apoi tu verifici numeric jocul sau interferența.'
                : 'Choose the behavior you want. DraftFit loads a hole-basis H7 starting point, then you evaluate the actual clearance or interference numerically.'}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-2 p-4 sm:p-5">
            {FIT_SELECTION_OPTIONS.map((option) => {
              const active = holeLetter === 'H' && holeGrade === 7 && shaftLetter === option.shaft && shaftGrade === option.grade;

              return (
                <button
                  key={option.id}
                  type="button"
                  onClick={() => applyFitSelection(option)}
                  className={`
                    min-h-16 border px-4 py-3 text-left transition
                    ${active
                      ? 'border-orange-500 bg-orange-500/10'
                      : isDark
                        ? 'border-zinc-800 bg-zinc-950 hover:border-orange-500/60'
                        : 'border-zinc-300 bg-white hover:border-orange-500/60'}
                  `}
                >
                  <div className="flex items-center justify-between gap-3">
                    <span className={`text-sm font-black ${ui.text}`}>
                      {lang === 'ro' ? option.ro : option.en}
                    </span>
                    <span className="font-mono text-xs font-black text-orange-500">
                      H7/{option.shaft}{option.grade}
                    </span>
                  </div>
                  <p className={`mt-1 text-[11px] leading-5 ${ui.sub}`}>
                    {lang === 'ro' ? option.noteRo : option.noteEn}
                  </p>
                </button>
              );
            })}

            <p className={`mt-1 text-[10px] leading-5 ${ui.sub}`}>
              {lang === 'ro'
                ? 'Acestea sunt puncte de pornire pentru evaluare, nu recomandări automate de proiectare. Funcția, sarcina, montajul, materialele și procesul de fabricație decid ajustajul final.'
                : 'These are starting points to evaluate, not automatic design recommendations. Function, loading, assembly, materials and manufacturing process determine the final fit.'}
            </p>
          </div>
        </section>

                </details>

              <details className="mt-3 print:hidden">
                <summary className={`cursor-pointer border px-4 py-3 text-xs font-black uppercase tracking-wider ${ui.subCard}`}>
                  {lang === 'ro' ? 'Ajustaje uzuale și exemple' : 'Common fits & examples'}
                </summary>
                <div className="mt-3 space-y-3">
{/* Presets */}

          {mode === 'fit' && (
            <div
              className={`
                pt-4
                border-t
                ${ui.divider}
              `}
            >
              <span
                className={`
                  block
                  text-[10px]
                  uppercase
                  tracking-widest
                  font-bold
                  mb-3
                  ${ui.sub}
                `}
              >
                {t.presets}
              </span>


              <div className="space-y-2">

                {presets.map(
                  (preset) => {
                    const selected =
                      holeLetter ===
                        preset[0] &&

                      holeGrade ===
                        preset[1] &&

                      shaftLetter ===
                        preset[2] &&

                      shaftGrade ===
                        preset[3];


                    return (
                      <button
                        key={
                          preset[4]
                        }
                        type="button"

                        onClick={() =>
                          applyPreset(
                            preset
                          )
                        }

                        className={`
                          w-full
                          text-left
                          p-3
                          border
                          text-xs
                          cursor-pointer

                          ${
                            selected
                              ? 'border-orange-500 bg-orange-500/10 text-orange-600'
                              : ui.subCard
                          }
                        `}
                      >
                        <span
                          className="
                            font-mono
                            font-bold
                          "
                        >
                          {
                            preset[4]
                          }
                        </span>
                      </button>
                    );
                  }
                )}

              </div>
            </div>
          )}
<ExamplePresets
          presets={ISO_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-orange-500"
        />
                </div>
              </details>
            </section>


            {/* ===============================================
                TECHNICAL NOTES
                =============================================== */}

            <section
              className={`
                p-5
                sm:p-8
                border
                ${ui.card}
              `}
            >

              <h3
                className={`
                  text-xs
                  uppercase
                  tracking-widest
                  font-bold
                  mb-4
                  ${ui.sub}
                `}
              >
                {t.notes}
              </h3>


              <ul
                className={`
                  space-y-2
                  text-sm
                  ${ui.sub}
                `}
              >

                <li>
                  • {t.note1}
                </li>

                <li>
                  • {t.note2}
                </li>

                <li>
                  • {t.note3}
                </li>

              </ul>

            </section>

          </>
        )}

      </main>

    </div>
  );
}


/* =========================================================
   LIMIT CARD
   ========================================================= */

function LimitCard({
  title,
  color,
  data,
  t,
  ui,
  unitSystem
}) {
  const accent =
    color === 'sky'
      ? 'text-sky-500'
      : 'text-emerald-600';


  const border =
    color === 'sky'
      ? 'border-l-sky-500'
      : 'border-l-emerald-500';


  return (
    <div
      className={`
        p-6
        border
        border-l-4
        ${border}
        ${ui.subCard}
      `}
    >

      <h3
        className={`
          text-xs
          uppercase
          tracking-widest
          font-bold
          mb-5
          ${accent}
        `}
      >
        {title}
      </h3>


      <div
        className="
          grid
          grid-cols-2
          gap-4
          mb-5
        "
      >

        <Metric
          label={
            t.upper
          }

          value={
            unitSystem === 'metric'
              ? fmtMicron(data.upperDeviation)
              : formatQuantity(data.upperDeviation / 1000, 'length', unitSystem)
          }

          ui={ui}
        />


        <Metric
          label={
            t.lower
          }

          value={
            unitSystem === 'metric'
              ? fmtMicron(data.lowerDeviation)
              : formatQuantity(data.lowerDeviation / 1000, 'length', unitSystem)
          }

          ui={ui}
        />

      </div>


      <div
        className={`
          border-t
          pt-4
          ${ui.divider}
        `}
      >

        <div
          className={`
            flex
            justify-between
            gap-4
            font-mono
            text-sm
            ${ui.sub}
          `}
        >

          <span>
            {t.limits}
          </span>

          <strong
            className={
              ui.text
            }
          >
            {
              formatQuantity(data.min, 'length', unitSystem)
            }
            {' — '}
            {
              formatQuantity(data.max, 'length', unitSystem)
            }
          </strong>

        </div>


        <div
          className={`
            flex
            justify-between
            gap-4
            font-mono
            text-sm
            mt-2
            ${ui.sub}
          `}
        >

          <span>
            {t.midpoint}
          </span>

          <strong
            className={
              accent
            }
          >
            {
              formatQuantity(data.midpoint, 'length', unitSystem)
            }
          </strong>

        </div>


        <div
          className={`
            flex
            justify-between
            gap-4
            font-mono
            text-sm
            mt-2
            ${ui.sub}
          `}
        >

          <span>
            IT
          </span>

          <strong>
            {unitSystem === 'metric'
              ? `${data.it} µm`
              : formatQuantity(data.it / 1000, 'length', unitSystem)}
          </strong>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   INPUT FIELD
   ========================================================= */

function Field({
  label,
  value,
  setValue,
  step,
  ui,
  quantity = 'dimensionless',
  unitSystem = 'metric'
}) {
  return (
    <label
      className="
        block
      "
    >

      <span
        className={`
          block
          text-[10px]
          uppercase
          tracking-widest
          font-bold
          mb-2
          ${ui.sub}
        `}
      >
        {label}
      </span>


      <input
        type="number"

        value={inputDisplayValue(value, quantity, unitSystem)}

        step={
          step
        }

        onChange={
          (e) =>
            setValue(
              fromDisplayValue(Number(e.target.value), quantity, unitSystem)
            )
        }

        className={`
          w-full
          border
          p-2
          font-mono
          bg-transparent
          ${ui.input}
        `}
      />

    </label>
  );
}


/* =========================================================
   METRIC CARD
   ========================================================= */

function Metric({
  label,
  value,
  ui
}) {
  return (
    <div
      className={`
        p-4
        border
        ${ui.subCard}
      `}
    >

      <span
        className={`
          block
          text-[10px]
          uppercase
          tracking-widest
          font-bold
          mb-2
          ${ui.sub}
        `}
      >
        {label}
      </span>


      <strong
        className={`
          font-mono
          text-lg
          ${ui.text}
        `}
      >
        {value}
      </strong>

    </div>
  );
}