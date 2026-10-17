import React, { useMemo, useState } from 'react';
import ExamplePresets from '@/components/calculators/ExamplePresets';
import { convertUnitLabel, formatQuantity, fromDisplayValue, inputDisplayValue, unitFor } from '@/lib/units';

/* ============================================================
   THREAD / BOLTED JOINT ENGINEERING MODULE
   ------------------------------------------------------------
   Scope:
   - ISO metric thread basic geometry
   - tensile stress area
   - tap-drill engineering estimate
   - ISO 273 clearance-hole dataset
   - bolt property classes
   - target preload
   - tightening torque estimate
   - thread / bearing torque split
   - bolt axial + torsional stress
   - von Mises stress during tightening
   - preliminary internal-thread stripping check
   - engagement guidance
   - friction sensitivity

   IMPORTANT
   ------------------------------------------------------------
   This is a PRELIMINARY engineering calculator.

   It is NOT a complete VDI 2230 joint analysis.

   A complete bolted-joint analysis may additionally require:
   - joint stiffness;
   - bolt stiffness;
   - external axial/transverse loads;
   - load introduction factor;
   - preload scatter;
   - embedding losses;
   - thermal effects;
   - fatigue;
   - eccentric loading;
   - separation/slip verification;
   - tightening method accuracy;
   - detailed thread stripping calculation;
   - bearing/contact verification.

   Units:
   geometry       mm
   stress         MPa = N/mm²
   force          N / kN
   torque         N·m
   ============================================================ */


/* ============================================================
   ISO METRIC THREAD DATASET
   ============================================================

   Dataset intentionally contains commonly used combinations.

   "coarse" identifies the normal/coarse pitch.
   Other listed pitches are commonly used fine-pitch variants.

   The calculator geometry itself is analytical and therefore
   can easily be extended with additional d/P combinations.
   ============================================================ */


const THREAD_EXAMPLE_PRESETS = [
  {
    id: 'm8-general',
    title: {
      en: 'M8 general-purpose bolt',
      ro: 'Șurub M8 uz general',
    },
    description: {
      en: 'M8 × 1.25, class 8.8, steel internal thread, normal friction.',
      ro: 'M8 × 1,25, clasa 8.8, filet interior din oțel, frecare normală.',
    },
  },
  {
    id: 'm12-high-strength',
    title: {
      en: 'M12 high-strength joint',
      ro: 'Îmbinare M12 de rezistență ridicată',
    },
    description: {
      en: 'M12 × 1.75, class 10.9, steel internal thread, 70% preload target.',
      ro: 'M12 × 1,75, clasa 10.9, filet interior din oțel, țintă de pretensionare 70%.',
    },
  },
  {
    id: 'm10-aluminum',
    title: {
      en: 'M10 into aluminum',
      ro: 'M10 în aluminiu',
    },
    description: {
      en: 'M10 × 1.5, class 8.8, aluminum internal thread, longer engagement.',
      ro: 'M10 × 1,5, clasa 8.8, filet interior din aluminiu, angajare mai lungă.',
    },
  },
];

const THREAD_SIZES = [
  {
    d: 3,
    pitches: [0.5, 0.35],
    coarse: 0.5,
    clear: [3.2, 3.4, 3.6]
  },
  {
    d: 4,
    pitches: [0.7, 0.5],
    coarse: 0.7,
    clear: [4.3, 4.5, 4.8]
  },
  {
    d: 5,
    pitches: [0.8, 0.5],
    coarse: 0.8,
    clear: [5.3, 5.5, 5.8]
  },
  {
    d: 6,
    pitches: [1.0, 0.75],
    coarse: 1.0,
    clear: [6.4, 6.6, 7.0]
  },
  {
    d: 8,
    pitches: [1.25, 1.0, 0.75],
    coarse: 1.25,
    clear: [8.4, 9.0, 10.0]
  },
  {
    d: 10,
    pitches: [1.5, 1.25, 1.0],
    coarse: 1.5,
    clear: [10.5, 11.0, 12.0]
  },
  {
    d: 12,
    pitches: [1.75, 1.5, 1.25, 1.0],
    coarse: 1.75,
    clear: [13.0, 13.5, 14.5]
  },
  {
    d: 14,
    pitches: [2.0, 1.5, 1.25],
    coarse: 2.0,
    clear: [15.0, 15.5, 16.5]
  },
  {
    d: 16,
    pitches: [2.0, 1.5, 1.0],
    coarse: 2.0,
    clear: [17.0, 17.5, 18.5]
  },
  {
    d: 18,
    pitches: [2.5, 2.0, 1.5],
    coarse: 2.5,
    clear: [19.0, 20.0, 21.0]
  },
  {
    d: 20,
    pitches: [2.5, 2.0, 1.5],
    coarse: 2.5,
    clear: [21.0, 22.0, 24.0]
  },
  {
    d: 22,
    pitches: [2.5, 2.0, 1.5],
    coarse: 2.5,
    clear: [23.0, 24.0, 26.0]
  },
  {
    d: 24,
    pitches: [3.0, 2.0, 1.5],
    coarse: 3.0,
    clear: [25.0, 26.0, 28.0]
  },
  {
    d: 27,
    pitches: [3.0, 2.0, 1.5],
    coarse: 3.0,
    clear: [28.0, 30.0, 32.0]
  },
  {
    d: 30,
    pitches: [3.5, 3.0, 2.0, 1.5],
    coarse: 3.5,
    clear: [31.0, 33.0, 35.0]
  },
  {
    d: 33,
    pitches: [3.5, 3.0, 2.0],
    coarse: 3.5,
    clear: [34.0, 36.0, 38.0]
  },
  {
    d: 36,
    pitches: [4.0, 3.0, 2.0],
    coarse: 4.0,
    clear: [37.0, 39.0, 42.0]
  },
  {
    d: 39,
    pitches: [4.0, 3.0, 2.0],
    coarse: 4.0,
    clear: [40.0, 42.0, 45.0]
  },
  {
    d: 42,
    pitches: [4.5, 4.0, 3.0, 2.0],
    coarse: 4.5,
    clear: [43.0, 45.0, 48.0]
  },
  {
    d: 48,
    pitches: [5.0, 4.0, 3.0, 2.0],
    coarse: 5.0,
    clear: [50.0, 52.0, 56.0]
  }
];


/* ============================================================
   FASTENER MATERIAL / PROPERTY DATA
   ============================================================

   Strength values here are engineering reference data used by
   this application. For carbon/alloy steel, Sp is treated as a
   proof-stress reference. For stainless classes, the stored Sp
   field is used numerically as an Rp0.2 reference for preload
   calculations and is labelled accordingly in the UI.

   Carbon/alloy steel property classes and stainless property
   classes are deliberately identified separately.

   For final certification / procurement, verify the applicable
   product standard, diameter range and actual fastener data.
   ============================================================ */

const BOLT_CLASSES = [
  {
    id: '4.6',
    standard: 'ISO 898-1',
    family: 'steel',
    name_ro: '4.6 — Oțel carbon',
    name_en: '4.6 — Carbon steel',
    Rm: 400,
    Re: 240,
    Sp: 225
  },
  {
    id: '5.8',
    standard: 'ISO 898-1',
    family: 'steel',
    name_ro: '5.8 — Oțel carbon',
    name_en: '5.8 — Carbon steel',
    Rm: 500,
    Re: 400,
    Sp: 380
  },
  {
    id: '8.8',
    standard: 'ISO 898-1',
    family: 'steel',
    name_ro: '8.8 — Oțel de înaltă rezistență',
    name_en: '8.8 — High-strength steel',
    Rm: 800,
    Re: 640,
    Sp: 580
  },
  {
    id: '10.9',
    standard: 'ISO 898-1',
    family: 'steel',
    name_ro: '10.9 — Oțel aliat',
    name_en: '10.9 — Alloy steel',
    Rm: 1000,
    Re: 900,
    Sp: 830
  },
  {
    id: '12.9',
    standard: 'ISO 898-1',
    family: 'steel',
    name_ro: '12.9 — Oțel aliat, rezistență foarte ridicată',
    name_en: '12.9 — Very high-strength alloy steel',
    Rm: 1200,
    Re: 1080,
    Sp: 970
  },
  {
    id: 'A2-70',
    standard: 'ISO 3506-1',
    family: 'stainless',
    name_ro: 'A2-70 — Inox austenitic',
    name_en: 'A2-70 — Austenitic stainless steel',
    Rm: 700,
    Re: 450,
    Sp: 450
  },
  {
    id: 'A4-70',
    standard: 'ISO 3506-1',
    family: 'stainless',
    name_ro: 'A4-70 — Inox austenitic',
    name_en: 'A4-70 — Austenitic stainless steel',
    Rm: 700,
    Re: 450,
    Sp: 450
  },
  {
    id: 'A4-80',
    standard: 'ISO 3506-1',
    family: 'stainless',
    name_ro: 'A4-80 — Inox austenitic, rezistență ridicată',
    name_en: 'A4-80 — High-strength austenitic stainless',
    Rm: 800,
    Re: 600,
    Sp: 600
  }
];


/* ============================================================
   INTERNAL THREAD MATERIALS
   ============================================================

   tauAllow is an editable engineering default for preliminary
   stripping evaluation.

   It is NOT a universal material allowable.
   ============================================================ */

const INTERNAL_MATERIALS = [
  {
    id: 'steel',
    name_ro: 'Oțel structural / carbon',
    name_en: 'Structural / carbon steel',
    tauAllow: 180,
    heuristic: 1.0
  },
  {
    id: 'castiron',
    name_ro: 'Fontă',
    name_en: 'Cast iron',
    tauAllow: 100,
    heuristic: 1.25
  },
  {
    id: 'aluminum',
    name_ro: 'Aluminiu structural',
    name_en: 'Structural aluminum',
    tauAllow: 80,
    heuristic: 2.0
  },
  {
    id: 'weakAluminum',
    name_ro: 'Aluminiu moale / turnat',
    name_en: 'Soft / cast aluminum',
    tauAllow: 55,
    heuristic: 2.0
  },
  {
    id: 'custom',
    name_ro: 'Personalizat',
    name_en: 'Custom',
    tauAllow: 100,
    heuristic: 1.0
  }
];


/* ============================================================
   FRICTION PRESETS
   ============================================================ */

const FRICTION_PRESETS = [
  {
    id: 'lubricated',
    muG: 0.10,
    muK: 0.10,
    ro: 'Lubrifiat — valoare orientativă',
    en: 'Lubricated — indicative value'
  },
  {
    id: 'normal',
    muG: 0.14,
    muK: 0.14,
    ro: 'Condiție normală — valoare orientativă',
    en: 'Normal condition — indicative value'
  },
  {
    id: 'dry',
    muG: 0.20,
    muK: 0.20,
    ro: 'Uscat / frecare ridicată — orientativ',
    en: 'Dry / high friction — indicative'
  },
  {
    id: 'custom',
    muG: null,
    muK: null,
    ro: 'Coeficienți personalizați',
    en: 'Custom coefficients'
  }
];


/* ============================================================
   TRANSLATIONS
   ============================================================ */

const TRANSLATIONS = {
  ro: {
    config: '1. Configurare Filet & Îmbinare',
    size: 'Dimensiune filet',
    pitch: 'Pas P',
    tolerance: 'Clasă toleranță',
    boltClass: 'Clasă / material șurub',

    preloadTitle: 'Prestrângere',
    preloadUtil: 'Țintă față de rezistența de probă',
    friction: 'Condiție de frecare',
    muG: 'μG — frecare filet',
    muK: 'μK — frecare sub cap/piuliță',
    bearingDia: 'Diametru mediu frecare Dkm',

    internalTitle: 'Filet interior',
    internalMaterial: 'Material piesă filetată',
    shearAllow: 'Tensiune tangențială admisibilă',
    engagement: 'Lungime reală de angajare Le',

    export: 'EXPORTĂ FIȘA TEHNICĂ',

    geometry: 'Geometrie Filet Metric ISO',
    machining: 'Prelucrare',
    preload: 'Prestrângere Șurub',
    tightening: 'Estimare Strângere',
    boltCheck: 'Solicitare Șurub în Timpul Strângerii',
    threadCheck: 'Verificare Preliminară Filet Interior',

    basicMajor: 'Diametru nominal d',
    pitchDia: 'Diametru de pas d₂',
    minorDia: 'Diametru minor d₃',
    stressArea: 'Arie rezistentă As',
    helixAngle: 'Unghi elice la d₂',

    tapDrill: 'Burghiu orientativ tarodare',
    tapNote: 'Estimare d − P; diametrul final se alege după tarod, material și procentul de filet.',
    clearance: 'Găuri de trecere — ISO 273',
    fine: 'Serie fină',
    medium: 'Serie medie',
    coarse: 'Serie largă',

    proofStress: 'Rezistență de probă Sp',
    proofLoad: 'Sarcină de probă Fp',
    targetPreload: 'Prestrângere țintă FM',

    threadTorque: 'Cuplu în filet MG',
    bearingTorque: 'Cuplu sub cap MK',
    totalTorque: 'Cuplu total MA',
    torqueCoefficient: 'Factor echivalent K',

    axialStress: 'Tensiune axială σ',
    torsion: 'Tensiune tangențială τ',
    vonMises: 'Tensiune echivalentă σVM',
    utilisation: 'Utilizare față de Re',

    engagementActual: 'Angajare disponibilă',
    heuristic: 'Reper orientativ',
    stripCapacity: 'Capacitate preliminară la smulgere',
    stripSafety: 'Factor preliminar față de FM',

    ok: 'OK',
    check: 'VERIFICĂ',
    invalid: 'DATE INVALIDE',

    sensitivity: 'Sensibilitate la Frecare',
    lowFriction: 'Frecare redusă',
    nominalFriction: 'Nominal',
    highFriction: 'Frecare ridicată',

    notes: 'Observații Inginerești',

    disclaimer:
      'Calcul preliminar. Nu reprezintă o analiză completă VDI 2230 și nu înlocuiește verificarea standardelor aplicabile, a toleranțelor, rigidităților, sarcinilor externe, oboselii și metodei reale de strângere.'
  },

  en: {
    config: '1. Thread & Joint Configuration',
    size: 'Thread size',
    pitch: 'Pitch P',
    tolerance: 'Tolerance class',
    boltClass: 'Bolt class / material',

    preloadTitle: 'Preload',
    preloadUtil: 'Target fraction of proof strength',
    friction: 'Friction condition',
    muG: 'μG — thread friction',
    muK: 'μK — under-head/nut friction',
    bearingDia: 'Mean bearing friction diameter Dkm',

    internalTitle: 'Internal thread',
    internalMaterial: 'Tapped-part material',
    shearAllow: 'Allowable shear stress',
    engagement: 'Actual engagement length Le',

    export: 'EXPORT TECHNICAL REPORT',

    geometry: 'ISO Metric Thread Geometry',
    machining: 'Machining',
    preload: 'Bolt Preload',
    tightening: 'Tightening Estimate',
    boltCheck: 'Bolt Stress During Tightening',
    threadCheck: 'Preliminary Internal Thread Check',

    basicMajor: 'Nominal diameter d',
    pitchDia: 'Pitch diameter d₂',
    minorDia: 'Minor diameter d₃',
    stressArea: 'Stress area As',
    helixAngle: 'Helix angle at d₂',

    tapDrill: 'Indicative tap drill',
    tapNote: 'd − P estimate; final drill depends on tap, material and target thread percentage.',
    clearance: 'Clearance holes — ISO 273',
    fine: 'Fine series',
    medium: 'Medium series',
    coarse: 'Large series',

    proofStress: 'Proof stress Sp',
    proofLoad: 'Proof load Fp',
    targetPreload: 'Target preload FM',

    threadTorque: 'Thread torque MG',
    bearingTorque: 'Bearing torque MK',
    totalTorque: 'Total torque MA',
    torqueCoefficient: 'Equivalent K factor',

    axialStress: 'Axial stress σ',
    torsion: 'Torsional stress τ',
    vonMises: 'Equivalent stress σVM',
    utilisation: 'Utilisation vs Re',

    engagementActual: 'Available engagement',
    heuristic: 'Rule-of-thumb reference',
    stripCapacity: 'Preliminary stripping capacity',
    stripSafety: 'Preliminary factor vs FM',

    ok: 'OK',
    check: 'CHECK',
    invalid: 'INVALID INPUT',

    sensitivity: 'Friction Sensitivity',
    lowFriction: 'Low friction',
    nominalFriction: 'Nominal',
    highFriction: 'High friction',

    notes: 'Engineering Notes',

    disclaimer:
      'Preliminary calculation only. This is not a complete VDI 2230 analysis and does not replace verification of applicable standards, tolerances, joint stiffness, external loads, fatigue and the actual tightening method.'
  }
};


/* ============================================================
   BASIC THREAD GEOMETRY
   ============================================================ */

export function calculateBasicThreadGeometry(d, P) {
  if (!(d > 0) || !(P > 0)) return null;

  /*
    ISO metric 60° thread basic geometry.

    Fundamental triangle:
      H = √3 / 2 × P

    Basic pitch diameter:
      d2 = d - 0.64951905 P

    Basic external minor/root diameter used by this
    preliminary calculator:
      d3 = d - 1.226869 P

    Tensile stress area approximation:
      As = π/4 × (d - 0.9382P)²

    This is the standard engineering approximation normally
    used for ISO metric tensile stress area.
  */

  const H = Math.sqrt(3) / 2 * P;

  const d2 =
    d - 0.64951905 * P;

  const d3 =
    d - 1.226869 * P;

  const tensileDia =
    d - 0.9382 * P;

  const As =
    Math.PI / 4 *
    tensileDia *
    tensileDia;

  const coreArea =
    Math.PI / 4 *
    d3 *
    d3;

  /*
    Helix angle at pitch diameter.

       tan φ = P / (π d2)

    Single-start thread assumed.
  */

  const helixAngle =
    Math.atan(
      P /
      (Math.PI * d2)
    );

  return {
    H,
    d2,
    d3,
    tensileDia,
    As,
    coreArea,
    helixAngle
  };
}


/* ============================================================
   TAP DRILL
   ============================================================ */

export function calculateTapDrillEstimate(d, P) {
  /*
    Common workshop approximation for cutting taps:

      drill ≈ d - P

    It is intentionally NOT presented as an ISO-prescribed
    drill diameter.
  */

  return d - P;
}


/* ============================================================
   PRELOAD
   ============================================================ */

export function calculatePreload(
  proofStress,
  As,
  utilisation
) {
  const proofLoad =
    proofStress * As;

  const targetPreload =
    proofLoad * utilisation;

  return {
    proofLoad,
    targetPreload
  };
}


/* ============================================================
   TIGHTENING TORQUE
   ============================================================ */

export function calculateTighteningTorque({
  preload,
  P,
  d2,
  muG,
  muK,
  Dkm
}) {
  if (
    preload <= 0 ||
    P <= 0 ||
    d2 <= 0 ||
    muG < 0 ||
    muK < 0 ||
    Dkm <= 0
  ) {
    return null;
  }

  /*
    Metric 60° thread.

    Flank half-angle:
      α = 30°

    Effective friction angle:
      tan ρ' = μG / cos α

    Thread lead angle:
      tan φ = P / (π d2)

    Thread torque:
      MG = FM × d2/2 × tan(φ + ρ')

    Bearing torque:
      MK = FM × μK × Dkm/2

    Values are initially N·mm and converted to N·m.
  */

  const alpha =
    30 * Math.PI / 180;

  const phi =
    Math.atan(
      P /
      (Math.PI * d2)
    );

  const rhoPrime =
    Math.atan(
      muG /
      Math.cos(alpha)
    );

  const threadTorqueNmm =
    preload *
    (d2 / 2) *
    Math.tan(
      phi + rhoPrime
    );

  const bearingTorqueNmm =
    preload *
    muK *
    Dkm /
    2;

  const totalTorqueNmm =
    threadTorqueNmm +
    bearingTorqueNmm;

  return {
    phi,
    rhoPrime,

    threadTorque:
      threadTorqueNmm / 1000,

    bearingTorque:
      bearingTorqueNmm / 1000,

    totalTorque:
      totalTorqueNmm / 1000,

    threadTorqueNmm
  };
}


/* ============================================================
   BOLT STRESS DURING TIGHTENING
   ============================================================ */

export function calculateBoltStress({
  preload,
  As,
  d3,
  threadTorqueNm,
  Re
}) {
  if (
    preload <= 0 ||
    As <= 0 ||
    d3 <= 0 ||
    Re <= 0
  ) {
    return null;
  }

  /*
    Axial stress:

      σ = FM / As


    Torsional stress:

      τ = 16 MG / (π d3³)

    where MG is the torque actually transmitted through the
    threaded section, NOT the total wrench torque.


    Equivalent von Mises:

      σVM = √(σ² + 3τ²)
  */

  const sigma =
    preload / As;

  const threadTorqueNmm =
    threadTorqueNm * 1000;

  const tau =
    16 *
    threadTorqueNmm /
    (
      Math.PI *
      Math.pow(d3, 3)
    );

  const sigmaVM =
    Math.sqrt(
      sigma * sigma +
      3 * tau * tau
    );

  const utilisation =
    sigmaVM / Re;

  return {
    sigma,
    tau,
    sigmaVM,
    utilisation
  };
}


/* ============================================================
   PRELIMINARY THREAD STRIPPING MODEL
   ============================================================ */

export function calculateThreadStripping({
  d2,
  engagement,
  tauAllow,
  P
}) {
  if (
    d2 <= 0 ||
    engagement <= 0 ||
    tauAllow <= 0 ||
    P <= 0
  ) {
    return null;
  }

  /*
    IMPORTANT:
    This is deliberately labelled PRELIMINARY.

    Thread stripping is more complex than:
      circumference × engagement × shear strength.

    Load distribution is not uniform along engaged threads.
    Male and female thread geometry and material strengths
    both matter.

    We therefore introduce a conservative effective shear
    fraction for an initial engineering screening.

    Approximate shear area:

      Aτ ≈ π d2 Le × C

    with:
      C = 0.50

    The 0.50 factor represents the approximate fraction of
    cylindrical engagement surface effective as thread shear
    area in this simplified model.

    DO NOT use this as a certification calculation.
  */

  const effectiveFactor =
    0.50;

  const shearArea =
    Math.PI *
    d2 *
    engagement *
    effectiveFactor;

  const capacity =
    shearArea *
    tauAllow;

  const engagedThreads =
    engagement / P;

  return {
    shearArea,
    capacity,
    engagedThreads
  };
}


/* ============================================================
   FRICTION SENSITIVITY
   ============================================================ */

function calculateSensitivity({
  preload,
  P,
  d2,
  Dkm,
  muG,
  muK
}) {
  const cases = [
    {
      id: 'low',
      factor: 0.8
    },
    {
      id: 'nominal',
      factor: 1.0
    },
    {
      id: 'high',
      factor: 1.2
    }
  ];

  return cases.map(item => {
    const result =
      calculateTighteningTorque({
        preload,
        P,
        d2,

        muG:
          Math.max(
            0.01,
            muG * item.factor
          ),

        muK:
          Math.max(
            0.01,
            muK * item.factor
          ),

        Dkm
      });

    return {
      ...item,
      torque:
        result
          ? result.totalTorque
          : null
    };
  });
}


/* ============================================================
   FORMAT HELPERS
   ============================================================ */

function fmt(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return '—';
  }

  return value.toFixed(digits);
}


function pct(value, digits = 0) {
  if (!Number.isFinite(value)) {
    return '—';
  }

  return `${(value * 100).toFixed(digits)} %`;
}


/* ============================================================
   MAIN COMPONENT
   ============================================================ */

export default function ThreadsModule({
  unitSystem = 'metric',
  isDark,
  experienceMode = 'quick',
  lang = 'ro',
  onPrint
}) {
  const t =
    TRANSLATIONS[lang] ||
    TRANSLATIONS.ro;


  /* ========================================================
     THREAD
     ======================================================== */

  const [
    threadD,
    setThreadD
  ] = useState(10);


  const [
    threadP,
    setThreadP
  ] = useState(1.5);


  const [
    toleranceExternal,
    setToleranceExternal
  ] = useState('6g');


  const [
    toleranceInternal,
    setToleranceInternal
  ] = useState('6H');


  /* ========================================================
     BOLT
     ======================================================== */

  const [
    boltClassId,
    setBoltClassId
  ] = useState('8.8');


  const [
    preloadUtil,
    setPreloadUtil
  ] = useState(0.70);


  /* ========================================================
     FRICTION
     ======================================================== */

  const [
    frictionPreset,
    setFrictionPreset
  ] = useState('normal');


  const [
    muG,
    setMuG
  ] = useState(0.14);


  const [
    muK,
    setMuK
  ] = useState(0.14);


  const [
    Dkm,
    setDkm
  ] = useState(13);


  /* ========================================================
     INTERNAL THREAD
     ======================================================== */

  const [
    internalMaterialId,
    setInternalMaterialId
  ] = useState('steel');


  const [
    tauAllow,
    setTauAllow
  ] = useState(180);


  const [
    engagement,
    setEngagement
  ] = useState(10);


  /* ========================================================
     SELECTED DATA
     ======================================================== */

  const selectedThread =
    THREAD_SIZES.find(
      item =>
        item.d === threadD
    );


  const boltClass =
    BOLT_CLASSES.find(
      item =>
        item.id === boltClassId
    ) ||
    BOLT_CLASSES[2];


  const internalMaterial =
    INTERNAL_MATERIALS.find(
      item =>
        item.id === internalMaterialId
    ) ||
    INTERNAL_MATERIALS[0];


  /* ========================================================
     CALCULATION
     ======================================================== */

  const result =
    useMemo(() => {
      const geometry =
        calculateBasicThreadGeometry(
          Number(threadD),
          Number(threadP)
        );

      if (!geometry) {
        return {
          valid: false
        };
      }


      const preload =
        calculatePreload(
          boltClass.Sp,
          geometry.As,
          Number(preloadUtil)
        );


      const tightening =
        calculateTighteningTorque({
          preload:
            preload.targetPreload,

          P:
            Number(threadP),

          d2:
            geometry.d2,

          muG:
            Number(muG),

          muK:
            Number(muK),

          Dkm:
            Number(Dkm)
        });


      if (!tightening) {
        return {
          valid: false
        };
      }


      const boltStress =
        calculateBoltStress({
          preload:
            preload.targetPreload,

          As:
            geometry.As,

          d3:
            geometry.d3,

          threadTorqueNm:
            tightening.threadTorque,

          Re:
            boltClass.Re
        });


      const stripping =
        calculateThreadStripping({
          d2:
            geometry.d2,

          engagement:
            Number(engagement),

          tauAllow:
            Number(tauAllow),

          P:
            Number(threadP)
        });


      const tapDrill =
        calculateTapDrillEstimate(
          Number(threadD),
          Number(threadP)
        );


      const heuristicEngagement =
        internalMaterial.heuristic *
        Number(threadD);


      const strippingSafety =
        stripping
          ? stripping.capacity /
            preload.targetPreload
          : null;


      const K =
        tightening.totalTorque /
        (
          preload.targetPreload *
          Number(threadD) /
          1000
        );


      const sensitivity =
        calculateSensitivity({
          preload:
            preload.targetPreload,

          P:
            Number(threadP),

          d2:
            geometry.d2,

          Dkm:
            Number(Dkm),

          muG:
            Number(muG),

          muK:
            Number(muK)
        });


      const clearance =
        selectedThread?.clear ||
        [
          threadD + 0.5,
          threadD + 1,
          threadD + 2
        ];


      const preloadOK =
        preloadUtil > 0 &&
        preloadUtil <= 0.9;


      const boltStressOK =
        boltStress &&
        boltStress.utilisation <= 0.90;


      const engagementHeuristicOK =
        Number(engagement) >=
        heuristicEngagement;


      const strippingOK =
        Number.isFinite(
          strippingSafety
        ) &&
        strippingSafety >= 1.5;


      const stainlessWarning =
        boltClass.family ===
        'stainless';


      const isCoarsePitch =
        selectedThread
          ? Number(threadP) ===
            Number(selectedThread.coarse)
          : false;


      const iso898ScopeOK =
        boltClass.family !== 'steel' ||
        (
          Number(threadD) <= 39 &&
          (
            isCoarsePitch ||
            (
              Number(threadD) >= 8 &&
              !(
                Number(threadD) === 8 &&
                Number(threadP) < 1
              )
            )
          )
        );


      return {
        valid: true,

        geometry,

        preload,

        tightening,

        boltStress,

        stripping,

        tapDrill,

        heuristicEngagement,

        strippingSafety,

        K,

        sensitivity,

        clearance,

        preloadOK,

        boltStressOK,

        engagementHeuristicOK,

        strippingOK,

        stainlessWarning,

        iso898ScopeOK,

        isCoarsePitch
      };
    }, [
      threadD,
      threadP,
      selectedThread,
      boltClass,
      preloadUtil,
      muG,
      muK,
      Dkm,
      engagement,
      tauAllow,
      internalMaterial
    ]);


  /* ========================================================
     UI
     ======================================================== */

  const ui = {
    card:
      isDark
        ? 'bg-zinc-900 border-zinc-800'
        : 'bg-white border-zinc-200 shadow-sm',

    subCard:
      isDark
        ? 'bg-zinc-950 border-zinc-800'
        : 'bg-zinc-50 border-zinc-200',

    miniBox:
      isDark
        ? 'bg-zinc-900 border-zinc-800'
        : 'bg-white border-zinc-200',

    input:
      isDark
        ? 'bg-zinc-950 border-zinc-700 text-white focus:border-cyan-500'
        : 'bg-white border-zinc-300 text-zinc-900 focus:border-cyan-500',

    select:
      isDark
        ? 'bg-zinc-900 border-zinc-700 text-white focus:border-cyan-500'
        : 'bg-white border-zinc-300 text-zinc-900 focus:border-cyan-500',

    divider:
      isDark
        ? 'border-zinc-800'
        : 'border-zinc-200',

    title:
      isDark
        ? 'text-white'
        : 'text-zinc-900',

    sub:
      isDark
        ? 'text-zinc-400'
        : 'text-zinc-500'
  };




  const loadExamplePreset =
    (presetId) => {
      if (presetId === 'm8-general') {
        setThreadD(8);
        setThreadP(1.25);
        setToleranceExternal('6g');
        setToleranceInternal('6H');
        setBoltClassId('8.8');
        setPreloadUtil(0.70);
        setFrictionPreset('normal');
        setMuG(0.14);
        setMuK(0.14);
        setDkm(10.5);
        setInternalMaterialId('steel');
        setTauAllow(180);
        setEngagement(8);
        return;
      }

      if (presetId === 'm12-high-strength') {
        setThreadD(12);
        setThreadP(1.75);
        setToleranceExternal('6g');
        setToleranceInternal('6H');
        setBoltClassId('10.9');
        setPreloadUtil(0.70);
        setFrictionPreset('normal');
        setMuG(0.14);
        setMuK(0.14);
        setDkm(15.5);
        setInternalMaterialId('steel');
        setTauAllow(180);
        setEngagement(12);
        return;
      }

      setThreadD(10);
      setThreadP(1.5);
      setToleranceExternal('6g');
      setToleranceInternal('6H');
      setBoltClassId('8.8');
      setPreloadUtil(0.65);
      setFrictionPreset('normal');
      setMuG(0.14);
      setMuK(0.14);
      setDkm(13);
      setInternalMaterialId('aluminum');
      setTauAllow(80);
      setEngagement(20);
    };


  /* ========================================================
     INVALID
     ======================================================== */

  if (!result.valid) {
    return (
      <div className={`draftfit-experience-${experienceMode} 
          p-6
          border
          border-rose-500/30
          bg-rose-500/10
          text-rose-500
          font-bold
        `}
      >
        {t.invalid}
      </div>
    );
  }


  /* ========================================================
     MAIN UI
     ======================================================== */

  return (
    <div
      className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-7
      "
    >

      {/* =====================================================
          INPUT PANEL
          ===================================================== */}

      <div
        className="
          lg:col-span-4
          print:hidden
          space-y-6
        "
      >

        <div className="lg:hidden">
        <ExamplePresets
          presets={THREAD_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-cyan-500"
        />
        </div>

        <div
          className={`
            p-6
            border
            border-l-4
            border-l-cyan-500
            space-y-6
            ${ui.card}
          `}
        >

          <h2
            className={`
              text-sm
              font-bold
              uppercase
              tracking-widest
              border-b
              pb-4
              ${ui.divider}
              ${ui.title}
            `}
          >
            {t.config}
          </h2>


          {/* Thread */}

          <SectionLabel
            text="THREAD"
          />


          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            <SelectInput
              label={t.size}
              value={threadD}
              setValue={
                value => {
                  const newD = Number(value);
                  const newThread = THREAD_SIZES.find(
                    item => item.d === newD
                  );

                  setThreadD(newD);

                  if (newThread) {
                    setThreadP(newThread.coarse);
                  }

                  setDkm(
                    Number((1.3 * newD).toFixed(2))
                  );

                  setEngagement(
                    Number(
                      (
                        internalMaterial.heuristic *
                        newD
                      ).toFixed(2)
                    )
                  );
                }
              }
              ui={ui}
            >
              {THREAD_SIZES.map(
                item => (
                  <option
                    key={item.d}
                    value={item.d}
                  >
                    M{item.d}
                  </option>
                )
              )}
            </SelectInput>


            <SelectInput
              label={t.pitch}
              value={threadP}
              setValue={
                value =>
                  setThreadP(
                    Number(value)
                  )
              }
              ui={ui}
            >
              {selectedThread?.pitches.map(
                pitch => (
                  <option
                    key={pitch}
                    value={pitch}
                  >
                    {pitch} mm
                    {
                      pitch ===
                      selectedThread.coarse
                        ? ' — coarse'
                        : ' — fine'
                    }
                  </option>
                )
              )}
            </SelectInput>

          </div>


<div className="draftfit-advanced-only contents">
          {/* Tolerance */}

          <div>

            <label
              className={`
                block
                text-[10px]
                font-bold
                uppercase
                tracking-widest
                mb-2
                ${ui.sub}
              `}
            >
              {t.tolerance}
            </label>


            <div
              className="
                grid
                grid-cols-2
                gap-3
              "
            >

              <select
                value={
                  toleranceExternal
                }

                onChange={
                  event =>
                    setToleranceExternal(
                      event.target.value
                    )
                }

                className={`
                  border
                  p-2
                  font-mono
                  text-sm
                  font-bold
                  ${ui.select}
                `}
              >
                <option value="6g">
                  External 6g
                </option>

                <option value="6h">
                  External 6h
                </option>
              </select>


              <select
                value={
                  toleranceInternal
                }

                onChange={
                  event =>
                    setToleranceInternal(
                      event.target.value
                    )
                }

                className={`
                  border
                  p-2
                  font-mono
                  text-sm
                  font-bold
                  ${ui.select}
                `}
              >
                <option value="6H">
                  Internal 6H
                </option>

                <option value="5H">
                  Internal 5H
                </option>

                <option value="7H">
                  Internal 7H
                </option>
              </select>

            </div>

          </div>


</div>

                    {/* Bolt */}

          <SelectInput
            label={t.boltClass}
            value={boltClassId}
            setValue={setBoltClassId}
            ui={ui}
          >
            {BOLT_CLASSES.map(
              item => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {
                    lang === 'en'
                      ? item.name_en
                      : item.name_ro
                  }
                </option>
              )
            )}
          </SelectInput>


          {/* Preload */}

          <SectionLabel
            text={t.preloadTitle}
          />


          <SelectInput
            label={t.preloadUtil}
            value={preloadUtil}
            setValue={
              value =>
                setPreloadUtil(
                  Number(value)
                )
            }
            ui={ui}
          >
            <option value={0.50}>
              50 %
            </option>

            <option value={0.60}>
              60 %
            </option>

            <option value={0.70}>
              70 %
            </option>

            <option value={0.75}>
              75 %
            </option>

            <option value={0.80}>
              80 %
            </option>

            <option value={0.90}>
              90 %
            </option>
          </SelectInput>


<div className="draftfit-advanced-only contents">
          {/* Friction */}

          <SectionLabel
            text="FRICTION / TIGHTENING"
          />


          <SelectInput
            label={t.friction}
            value={frictionPreset}
            setValue={
              value => {
                setFrictionPreset(value);

                const preset = FRICTION_PRESETS.find(
                  item => item.id === value
                );

                if (
                  preset &&
                  preset.id !== 'custom'
                ) {
                  setMuG(preset.muG);
                  setMuK(preset.muK);
                }
              }
            }
            ui={ui}
          >
            {FRICTION_PRESETS.map(
              item => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {
                    lang === 'en'
                      ? item.en
                      : item.ro
                  }
                </option>
              )
            )}
          </SelectInput>


          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            <NumberInput
              label={t.muG}
              value={muG}
              setValue={
                value => {
                  setMuG(value);
                  setFrictionPreset(
                    'custom'
                  );
                }
              }
              step="0.01"
              ui={ui}
            />


            <NumberInput
              label={t.muK}
              value={muK}
              setValue={
                value => {
                  setMuK(value);
                  setFrictionPreset(
                    'custom'
                  );
                }
              }
              step="0.01"
              ui={ui}
            />

          </div>


          <NumberInput
            label={convertUnitLabel(t.bearingDia, unitSystem)}
            quantity="length"
            unitSystem={unitSystem}
            value={Dkm}
            setValue={setDkm}
            step="0.1"
            suffix="mm"
            ui={ui}
          />


          {/* Internal thread */}

          <SectionLabel
            text={t.internalTitle}
          />


          <SelectInput
            label={t.internalMaterial}
            value={internalMaterialId}
            setValue={
              value => {
                setInternalMaterialId(value);

                const material = INTERNAL_MATERIALS.find(
                  item => item.id === value
                );

                if (material) {
                  setTauAllow(material.tauAllow);

                  setEngagement(
                    Number(
                      (
                        material.heuristic *
                        threadD
                      ).toFixed(2)
                    )
                  );
                }
              }
            }
            ui={ui}
          >
            {INTERNAL_MATERIALS.map(
              item => (
                <option
                  key={item.id}
                  value={item.id}
                >
                  {
                    lang === 'en'
                      ? item.name_en
                      : item.name_ro
                  }
                </option>
              )
            )}
          </SelectInput>


          <div
            className="
              grid
              grid-cols-2
              gap-3
            "
          >

            <NumberInput
              label={convertUnitLabel(t.shearAllow, unitSystem)}
              quantity="stress"
              unitSystem={unitSystem}
              value={tauAllow}
              setValue={setTauAllow}
              step="5"
              suffix="MPa"
              ui={ui}
            />


            <NumberInput
              label={convertUnitLabel(t.engagement, unitSystem)}
              quantity="length"
              unitSystem={unitSystem}
              value={engagement}
              setValue={setEngagement}
              step="0.5"
              suffix="mm"
              ui={ui}
            />

          </div>


</div>

                    <button
            onClick={() => {
              if (onPrint) {
                onPrint();
              } else {
                window.print();
              }
            }}
            className="
              w-full
              bg-cyan-600
              hover:bg-cyan-500
              text-white
              font-bold
              py-3
              uppercase
              tracking-widest
              text-xs
              transition-colors
            "
          >
            {t.export}
          </button>

        </div>

        <div className="hidden lg:block space-y-3">
          <ExamplePresets
          presets={THREAD_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-cyan-500"
        />

          <details className="draftfit-assistant-compact print:hidden">
            <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
              {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea filetului?' : 'Need help choosing a thread setup?'}
            </summary>
            <div className={`border border-cyan-500/25 p-4 text-xs leading-5 ${ui.card}`}>
              <p className={`font-black ${ui.title}`}>
                {lang === 'ro' ? 'Ghid rapid de alegere' : 'Quick selection guide'}
              </p>
              <div className={`mt-3 space-y-2 ${ui.sub}`}>
                <p>{lang === 'ro' ? '• Începe cu pasul grosier pentru aplicații generale; alege pas fin când ai nevoie de reglaj mai fin, perete subțire sau cerințe specifice.' : '• Start with coarse pitch for general use; choose a fine pitch when adjustment, thin-wall geometry or a specific requirement calls for it.'}</p>
                <p>{lang === 'ro' ? '• Clasa șurubului și frecarea influențează direct preîncărcarea și cuplul de strângere.' : '• Bolt class and friction directly affect preload and tightening torque.'}</p>
                <p>{lang === 'ro' ? '• Preseturile de mai sus sunt puncte de pornire; verifică materialul filetului interior și lungimea de angajare pentru aplicația reală.' : '• The presets above are starting points; verify internal-thread material and engagement length for the real application.'}</p>
              </div>
            </div>
          </details>
        </div>

      </div>


      {/* =====================================================
          RESULTS
          ===================================================== */}

      <div
        className="
          lg:col-span-8
          print:col-span-12
          space-y-6
        "
      >

        {/* ===================================================
            HEADER
            =================================================== */}

        <div
          className={`
            p-8
            border
            ${ui.card}
          `}
        >

          <div
            className={`
              flex
              flex-wrap
              justify-between
              items-start
              gap-4
              border-b
              pb-5
              mb-6
              ${ui.divider}
            `}
          >

            <div>

              <div
                className="
                  text-4xl
                  font-black
                  font-mono
                  text-cyan-500
                "
              >
                M{threadD} × {threadP}
              </div>


              <div
                className={`
                  text-xs
                  mt-2
                  font-mono
                  ${ui.sub}
                `}
              >
                {
                  toleranceExternal
                }
                {' / '}
                {
                  toleranceInternal
                }
                {' · '}
                {
                  boltClass.standard
                }
              </div>

            </div>


            <div
              className="
                text-right
              "
            >

              <div
                className="
                  inline-block
                  px-3
                  py-1.5
                  border
                  border-cyan-500/30
                  bg-cyan-500/10
                  text-cyan-500
                  text-xs
                  font-black
                  uppercase
                  tracking-widest
                "
              >
                {boltClass.id}
              </div>


              <div
                className={`
                  text-[10px]
                  mt-2
                  ${ui.sub}
                `}
              >
                Rp / Re = {formatQuantity(boltClass.Re, 'stress', unitSystem)}
              </div>

            </div>

          </div>


          {/* =================================================
              GEOMETRY
              ================================================= */}

          <ResultSectionTitle
            text={t.geometry}
            ui={ui}
          />


          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-5
              gap-3
            "
          >

            <Metric
              label={t.basicMajor}
              value={`Ø${formatQuantity(threadD, 'length', unitSystem)}`}
              unit=""
              ui={ui}
            />


            <Metric
              label={t.pitchDia}
              value={`Ø${formatQuantity(result.geometry.d2, 'length', unitSystem)}`}
              unit=""
              ui={ui}
            />


            <Metric
              label={t.minorDia}
              value={`Ø${formatQuantity(result.geometry.d3, 'length', unitSystem)}`}
              unit=""
              ui={ui}
            />


            <Metric
              label={t.stressArea}
              value={formatQuantity(result.geometry.As, 'area', unitSystem)}
              unit=""
              ui={ui}
            />


            <Metric
              label={t.helixAngle}
              value={fmt(
                result.geometry.helixAngle *
                180 /
                Math.PI,
                2
              )}
              unit="°"
              ui={ui}
            />

          </div>

        </div>


        {/* ===================================================
            MACHINING
            =================================================== */}

        <div
          className={`
            p-8
            border
            ${ui.card}
          `}
        >

          <ResultSectionTitle
            text={t.machining}
            ui={ui}
          />


          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-5
            "
          >

            <div
              className={`
                p-5
                border
                border-l-4
                border-l-cyan-500
                ${ui.subCard}
              `}
            >

              <span
                className="
                  block
                  text-[10px]
                  uppercase
                  tracking-widest
                  font-bold
                  text-cyan-500
                  mb-1
                "
              >
                {t.tapDrill}
              </span>


              <div
                className={`
                  text-3xl
                  font-black
                  font-mono
                  ${ui.title}
                `}
              >
                Ø{formatQuantity(result.tapDrill, 'length', unitSystem)}
              </div>


              <p
                className={`
                  text-[10px]
                  mt-2
                  leading-relaxed
                  ${ui.sub}
                `}
              >
                {t.tapNote}
              </p>

            </div>


            <div
              className={`
                p-5
                border
                ${ui.subCard}
              `}
            >

              <span
                className="
                  block
                  text-[10px]
                  uppercase
                  tracking-widest
                  font-bold
                  text-emerald-500
                  mb-3
                "
              >
                {t.clearance}
              </span>


              <div
                className="
                  grid
                  grid-cols-3
                  gap-2
                "
              >

                <MiniMetric
                  label={t.fine}
                  value={
                    `Ø${formatQuantity(Number(result.clearance[0]), 'length', unitSystem)}`
                  }
                  ui={ui}
                />


                <MiniMetric
                  label={t.medium}
                  value={
                    `Ø${formatQuantity(Number(result.clearance[1]), 'length', unitSystem)}`
                  }
                  highlight
                  ui={ui}
                />


                <MiniMetric
                  label={t.coarse}
                  value={
                    `Ø${formatQuantity(Number(result.clearance[2]), 'length', unitSystem)}`
                  }
                  ui={ui}
                />

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            PRELOAD + TORQUE
            =================================================== */}

        <div
          className={`
            p-8
            border
            ${ui.card}
          `}
        >

          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              gap-6
            "
          >

            {/* Preload */}

            <div>

              <ResultSectionTitle
                text={t.preload}
                ui={ui}
              />


              <div
                className="
                  space-y-3
                "
              >

                <ResultRow
                  label={
                    boltClass.family === 'stainless'
                      ? (lang === 'en'
                          ? 'Reference Rp0.2'
                          : 'Rp0,2 de referință')
                      : t.proofStress
                  }
                  value={formatQuantity(boltClass.Sp, 'stress', unitSystem)}
                  ui={ui}
                />


                <ResultRow
                  label={
                    boltClass.family === 'stainless'
                      ? (lang === 'en'
                          ? 'Reference load'
                          : 'Sarcină de referință')
                      : t.proofLoad
                  }
                  value={unitSystem === 'metric' ? formatQuantity(result.preload.proofLoad / 1000, 'forceKN', unitSystem) : formatQuantity(result.preload.proofLoad, 'forceN', unitSystem)}
                  ui={ui}
                />


                <ResultRow
                  label={t.targetPreload}
                  value={unitSystem === 'metric' ? formatQuantity(result.preload.targetPreload / 1000, 'forceKN', unitSystem) : formatQuantity(result.preload.targetPreload, 'forceN', unitSystem)}
                  strong
                  ui={ui}
                />


                <ResultRow
                  label="Target"
                  value={pct(preloadUtil)}
                  ui={ui}
                />

              </div>

            </div>


            {/* Torque */}

            <div>

              <ResultSectionTitle
                text={t.tightening}
                ui={ui}
              />


              <div
                className="
                  space-y-3
                "
              >

                <ResultRow
                  label={t.threadTorque}
                  value={formatQuantity(result.tightening.threadTorque, 'torque', unitSystem)}
                  ui={ui}
                />


                <ResultRow
                  label={t.bearingTorque}
                  value={formatQuantity(result.tightening.bearingTorque, 'torque', unitSystem)}
                  ui={ui}
                />


                <div
                  className="
                    p-4
                    border
                    border-amber-500/30
                    bg-amber-500/10
                  "
                >

                  <span
                    className="
                      block
                      text-[9px]
                      uppercase
                      tracking-widest
                      font-bold
                      text-amber-500
                    "
                  >
                    {t.totalTorque}
                  </span>


                  <span
                    className="
                      block
                      text-3xl
                      font-black
                      font-mono
                      text-amber-500
                      mt-1
                    "
                  >
                    {formatQuantity(result.tightening.totalTorque, 'torque', unitSystem)}
                  </span>

                </div>


                <ResultRow
                  label={t.torqueCoefficient}
                  value={fmt(result.K, 3)}
                  ui={ui}
                />

              </div>

            </div>

          </div>

        </div>


        {/* ===================================================
            BOLT STRESS
            =================================================== */}

        <div
          className={`
            p-8
            border
            ${ui.card}
          `}
        >

          <ResultSectionTitle
            text={t.boltCheck}
            ui={ui}
          />


          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
            "
          >

            <CheckMetric
              label={t.axialStress}
              value={formatQuantity(result.boltStress.sigma, 'stress', unitSystem)}
              ok
              ui={ui}
            />


            <CheckMetric
              label={t.torsion}
              value={formatQuantity(result.boltStress.tau, 'stress', unitSystem)}
              ok
              ui={ui}
            />


            <CheckMetric
              label={t.vonMises}
              value={formatQuantity(result.boltStress.sigmaVM, 'stress', unitSystem)}
              ok={
                result.boltStressOK
              }
              ui={ui}
            />


            <CheckMetric
              label={t.utilisation}
              value={pct(
                result.boltStress.utilisation
              )}
              ok={
                result.boltStressOK
              }
              ui={ui}
            />

          </div>


          <div
            className={`
              mt-4
              text-[10px]
              font-mono
              ${ui.sub}
            `}
          >
            σVM / Re = {
              fmt(
                result.boltStress.utilisation,
                3
              )
            }
            {' · '}
            torsion based on thread torque MG,
            not total wrench torque MA.
          </div>

        </div>


        {/* ===================================================
            THREAD ENGAGEMENT / STRIPPING
            =================================================== */}

        <div
          className={`
            p-8
            border
            ${ui.card}
          `}
        >

          <ResultSectionTitle
            text={t.threadCheck}
            ui={ui}
          />


          <div
            className="
              grid
              grid-cols-2
              md:grid-cols-4
              gap-4
            "
          >

            <CheckMetric
              label={t.engagementActual}
              value={formatQuantity(Number(engagement), 'length', unitSystem)}
              ok={
                result.engagementHeuristicOK
              }
              ui={ui}
            />


            <CheckMetric
              label={t.heuristic}
              value={formatQuantity(result.heuristicEngagement, 'length', unitSystem)}
              ok={
                result.engagementHeuristicOK
              }
              ui={ui}
            />


            <CheckMetric
              label={t.stripCapacity}
              value={unitSystem === 'metric' ? formatQuantity(result.stripping.capacity / 1000, 'forceKN', unitSystem) : formatQuantity(result.stripping.capacity, 'forceN', unitSystem)}
              ok={
                result.strippingOK
              }
              ui={ui}
            />


            <CheckMetric
              label={t.stripSafety}
              value={fmt(
                result.strippingSafety,
                2
              )}
              ok={
                result.strippingOK
              }
              ui={ui}
            />

          </div>


          <div
            className={`
              mt-4
              p-4
              border
              ${ui.subCard}
            `}
          >

            <div
              className="
                grid
                grid-cols-2
                md:grid-cols-4
                gap-4
                text-xs
              "
            >

              <DataPair
                label="τallow"
                value={formatQuantity(Number(tauAllow), 'stress', unitSystem)}
                ui={ui}
              />


              <DataPair
                label="Aτ approx."
                value={formatQuantity(result.stripping.shearArea, 'area', unitSystem)}
                ui={ui}
              />


              <DataPair
                label="Engaged threads"
                value={fmt(
                  result.stripping.engagedThreads,
                  1
                )}
                ui={ui}
              />


              <DataPair
                label="Material"
                value={
                  lang === 'en'
                    ? internalMaterial.name_en
                    : internalMaterial.name_ro
                }
                ui={ui}
              />

            </div>

          </div>


          <p
            className={`
              mt-4
              text-[10px]
              leading-relaxed
              ${ui.sub}
            `}
          >
            {
              lang === 'en'
                ? 'The stripping calculation is a preliminary screening model, not a complete normative thread-stripping calculation. Load distribution between engaged threads is non-uniform and both male and female thread strength must be considered in a final design.'
                : 'Calculul la smulgerea filetului este un model preliminar de screening, nu un calcul normativ complet. Sarcina nu se distribuie uniform între spirele angajate, iar proiectarea finală trebuie să considere rezistența ambelor filete și geometria reală.'
            }
          </p>

        </div>


        {/* ===================================================
            FRICTION SENSITIVITY
            =================================================== */}

        <div
          className={`
            p-8
            border
            ${ui.card}
          `}
        >

          <ResultSectionTitle
            text={t.sensitivity}
            ui={ui}
          />


          <div
            className="
              grid
              grid-cols-3
              gap-3
            "
          >

            {result.sensitivity.map(
              item => {

                const label =
                  item.id === 'low'
                    ? t.lowFriction
                    : item.id === 'high'
                      ? t.highFriction
                      : t.nominalFriction;


                return (
                  <div
                    key={item.id}
                    className={`
                      p-4
                      border
                      text-center

                      ${
                        item.id === 'nominal'
                          ? 'border-cyan-500/40 bg-cyan-500/10'
                          : ui.subCard
                      }
                    `}
                  >

                    <span
                      className={`
                        block
                        text-[9px]
                        uppercase
                        tracking-widest
                        font-bold
                        mb-2
                        ${ui.sub}
                      `}
                    >
                      {label}
                    </span>


                    <span
                      className={`
                        block
                        font-mono
                        font-black
                        text-xl

                        ${
                          item.id === 'nominal'
                            ? 'text-cyan-500'
                            : ui.title
                        }
                      `}
                    >
                      {formatQuantity(item.torque, 'torque', unitSystem)}
                    </span>

                  </div>
                );
              }
            )}

          </div>


          <p
            className={`
              mt-4
              text-[10px]
              leading-relaxed
              ${ui.sub}
            `}
          >
            {
              lang === 'en'
                ? 'Sensitivity shown for ±20% change in both friction coefficients while maintaining the same target preload. Real torque-controlled tightening also produces preload scatter.'
                : 'Sensibilitatea este afișată pentru o variație de ±20% a ambilor coeficienți de frecare, menținând aceeași prestrângere țintă. În realitate, strângerea controlată la cuplu produce și dispersie a prestrângerii.'
            }
          </p>

        </div>


        {/* ===================================================
            TECHNICAL SCHEMATIC
            =================================================== */}

        <div
          className={`
            p-8
            border
            ${ui.card}
          `}
        >

          <ResultSectionTitle
            text="2D THREADED JOINT"
            ui={ui}
          />


          <div
            className={`
              p-5
              border
              ${ui.subCard}
            `}
          >

            <ThreadSchematic
              unitSystem={unitSystem}
              isDark={isDark}

              d={threadD}

              P={threadP}

              d2={
                result.geometry.d2
              }

              d3={
                result.geometry.d3
              }

              engagement={
                Number(engagement)
              }

              clearance={
                result.clearance[1]
              }
            />

          </div>

        </div>


        {/* ===================================================
            WARNINGS / NOTES
            =================================================== */}

        <div
          className={`
            p-8
            border
            border-l-4
            border-l-amber-500
            ${ui.card}
          `}
        >

          <h3
            className="
              text-[10px]
              uppercase
              tracking-widest
              font-black
              text-amber-500
              mb-4
            "
          >
            {t.notes}
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
              • {t.disclaimer}
            </p>


            <p>
              • {
                lang === 'en'
                  ? 'The displayed tolerance classes identify the intended thread fit but this version does not calculate ISO 965 limit deviations and limit diameters.'
                  : 'Clasele de toleranță afișate identifică ajustajul dorit al filetului; această versiune nu calculează încă abaterile și diametrele limită ISO 965.'
              }
            </p>


            <p>
              • {
                lang === 'en'
                  ? 'The d − P tap-drill value is a workshop estimate, not a normative drill diameter.'
                  : 'Valoarea d − P pentru pregăurirea de tarodare este o aproximație de atelier, nu un diametru normativ obligatoriu.'
              }
            </p>


            <p>
              • {
                lang === 'en'
                  ? 'ISO 273 clearance-hole values are shown as fine, medium and coarse series. The calculator does not automatically assign H12/H13/H14 tolerance classes to those series.'
                  : 'Valorile găurilor de trecere ISO 273 sunt prezentate ca serii fină, medie și largă. Calculatorul nu atribuie automat acestor serii clase de toleranță H12/H13/H14.'
              }
            </p>


            <p>
              • {
                lang === 'en'
                  ? 'Dkm must be based on the real bearing geometry of the bolt head, nut or washer for a refined tightening calculation.'
                  : 'Pentru un calcul rafinat al cuplului, Dkm trebuie determinat din geometria reală a suprafeței de reazem a capului, piuliței sau șaibei.'
              }
            </p>


            <p>
              • {
                lang === 'en'
                  ? 'Friction coefficients are major uncertainty sources. Lubrication, coating, surface condition and repeated tightening can strongly change preload obtained from a given torque.'
                  : 'Coeficienții de frecare reprezintă o sursă majoră de incertitudine. Lubrifierea, acoperirea, starea suprafețelor și strângerile repetate pot modifica puternic prestrângerea obținută la același cuplu.'
              }
            </p>


            {
              boltClass.family === 'steel' &&
              !result.iso898ScopeOK && (
                <p
                  className="
                    text-rose-500
                    font-semibold
                  "
                >
                  • {
                    lang === 'en'
                      ? 'Selected steel fastener size/pitch is outside the stated applicability range of ISO 898-1:2013 used for these property classes. ISO 898-1:2013 covers coarse M1.6–M39 and fine M8×1–M39×3. Treat the strength values only as reference data and verify the applicable product standard.'
                      : 'Dimensiunea/pasul selectat pentru șurubul din oțel este în afara domeniului declarat al ISO 898-1:2013 folosit pentru aceste clase. ISO 898-1:2013 acoperă filete grosiere M1,6–M39 și filete fine M8×1–M39×3. Consideră valorile de rezistență doar ca date de referință și verifică standardul de produs aplicabil.'
                  }
                </p>
              )
            }


            {boltClass.family === 'stainless' && (
              <p>
                • {
                  lang === 'en'
                    ? 'For stainless property classes, the displayed Rp0.2 / strength values are reference inputs. Verify ISO 3506-1 applicability for the actual fastener type, size, manufacturing condition and purchased product.'
                    : 'Pentru clasele de inox, valorile Rp0,2 / rezistență afișate sunt date de referință. Verifică aplicabilitatea ISO 3506-1 pentru tipul, dimensiunea, starea de fabricație și produsul achiziționat.'
                }
              </p>
            )}


            <p>
              • {
                lang === 'en'
                  ? 'ISO 898-1 defines mechanical properties of steel fasteners; it does not specify torque/clamp-force performance. The tightening torque shown here is an engineering estimate based on geometry, target preload and friction.'
                  : 'ISO 898-1 definește proprietățile mecanice ale elementelor de asamblare din oțel; nu definește performanța cuplu/forță de strângere. Cuplul afișat aici este o estimare inginerească bazată pe geometrie, prestrângere țintă și frecare.'
              }
            </p>


            {result.stainlessWarning && (

              <p
                className="
                  text-amber-500
                  font-semibold
                "
              >
                • {
                  lang === 'en'
                    ? 'Stainless fastener selected: evaluate galling risk and use a suitable, validated lubrication / anti-seize strategy where appropriate.'
                    : 'Șurub inox selectat: verifică riscul de gripare (galling) și utilizează, unde este permis, o strategie validată de lubrifiere / anti-seize.'
                }
              </p>
            )}


            {!result.boltStressOK && (

              <p
                className="
                  text-rose-500
                  font-semibold
                "
              >
                • {
                  lang === 'en'
                    ? 'Combined bolt stress during tightening is high. Reduce target preload and/or review friction and tightening method.'
                    : 'Solicitarea combinată a șurubului în timpul strângerii este ridicată. Redu prestrângerea țintă și/sau verifică frecarea și metoda de strângere.'
                }
              </p>
            )}


            {!result.strippingOK && (

              <p
                className="
                  text-rose-500
                  font-semibold
                "
              >
                • {
                  lang === 'en'
                    ? 'Preliminary internal-thread stripping margin is low. Increase engagement, improve tapped-part material or perform a detailed thread-strength calculation.'
                    : 'Marja preliminară la smulgerea filetului interior este redusă. Mărește lungimea de angajare, îmbunătățește materialul piesei filetate sau efectuează un calcul detaliat al rezistenței filetului.'
                }
              </p>
            )}

          </div>

        </div>

      </div>

    </div>
  );
}


/* ============================================================
   SMALL UI COMPONENTS
   ============================================================ */

function SectionLabel({
  text
}) {
  return (
    <div
      className="
        text-[9px]
        uppercase
        tracking-[0.22em]
        font-black
        text-cyan-500
        pt-1
      "
    >
      {text}
    </div>
  );
}


function ResultSectionTitle({
  text,
  ui
}) {
  return (
    <h3
      className={`
        text-[10px]
        uppercase
        tracking-widest
        font-black
        mb-5
        ${ui.title}
      `}
    >
      {text}
    </h3>
  );
}


function SelectInput({
  label,
  value,
  setValue,
  children,
  ui
}) {
  return (
    <div>

      <label
        className={`
          block
          text-[10px]
          font-bold
          uppercase
          tracking-widest
          mb-2
          ${ui.sub}
        `}
      >
        {label}
      </label>


      <select
        value={value}

        onChange={
          event =>
            setValue(
              event.target.value
            )
        }

        className={`
          w-full
          border
          p-2.5
          font-mono
          text-xs
          font-bold
          ${ui.select}
        `}
      >
        {children}
      </select>

    </div>
  );
}


function NumberInput({
  label,
  value,
  setValue,
  step = 'any',
  suffix,
  ui,
  quantity = 'dimensionless',
  unitSystem = 'metric'
}) {
  return (
    <div>

      <label
        className={`
          block
          text-[10px]
          font-bold
          uppercase
          tracking-widest
          mb-2
          ${ui.sub}
        `}
      >
        {label}
      </label>


      <div
        className="
          relative
        "
      >

        <input
          type="number"

          step={step}

          value={inputDisplayValue(value, quantity, unitSystem)}

          onChange={
            event => {
              if (event.target.value === '') {
                setValue('');
                return;
              }
              setValue(
                String(fromDisplayValue(Number(event.target.value), quantity, unitSystem))
              );
            }
          }

          className={`
            w-full
            border
            p-2.5
            font-mono
            text-sm
            font-bold
            ${suffix ? 'pr-12' : ''}
            ${ui.input}
          `}
        />


        {(suffix || quantity !== 'dimensionless') && (

          <span
            className={`
              absolute
              right-3
              top-1/2
              -translate-y-1/2
              text-[9px]
              font-bold
              ${ui.sub}
            `}
          >
            {quantity !== 'dimensionless' ? unitFor(quantity, unitSystem) : suffix}
          </span>

        )}

      </div>

    </div>
  );
}


function Metric({
  label,
  value,
  unit,
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
          text-[9px]
          uppercase
          tracking-widest
          font-bold
          mb-2
          ${ui.sub}
        `}
      >
        {label}
      </span>


      <span
        className={`
          block
          font-mono
          font-black
          text-lg
          ${ui.title}
        `}
      >
        {value}
      </span>


      {unit && (

        <span
          className={`
            block
            text-[9px]
            mt-1
            ${ui.sub}
          `}
        >
          {unit}
        </span>

      )}

    </div>
  );
}


function MiniMetric({
  label,
  value,
  highlight,
  ui
}) {
  return (
    <div
      className={`
        p-3
        border
        text-center

        ${
          highlight
            ? 'border-emerald-500/30 bg-emerald-500/10'
            : ui.miniBox
        }
      `}
    >

      <span
        className={`
          block
          text-[8px]
          uppercase
          tracking-widest
          font-bold
          mb-1

          ${
            highlight
              ? 'text-emerald-500'
              : ui.sub
          }
        `}
      >
        {label}
      </span>


      <strong
        className={`
          font-mono
          text-sm

          ${
            highlight
              ? 'text-emerald-500'
              : ui.title
          }
        `}
      >
        {value}
      </strong>

    </div>
  );
}


function ResultRow({
  label,
  value,
  strong,
  ui
}) {
  return (
    <div
      className={`
        flex
        justify-between
        items-center
        gap-4
        p-3
        border
        ${ui.subCard}
      `}
    >

      <span
        className={`
          text-[10px]
          uppercase
          tracking-wider
          font-bold
          ${ui.sub}
        `}
      >
        {label}
      </span>


      <span
        className={`
          font-mono
          font-black

          ${
            strong
              ? 'text-cyan-500 text-lg'
              : ui.title
          }
        `}
      >
        {value}
      </span>

    </div>
  );
}


function CheckMetric({
  label,
  value,
  ok,
  ui
}) {
  return (
    <div
      className={`
        p-4
        border

        ${
          ok
            ? 'border-emerald-500/30 bg-emerald-500/5'
            : 'border-rose-500/30 bg-rose-500/5'
        }
      `}
    >

      <div
        className="
          flex
          justify-between
          gap-2
          items-start
          mb-2
        "
      >

        <span
          className={`
            text-[9px]
            uppercase
            tracking-widest
            font-bold
            ${ui.sub}
          `}
        >
          {label}
        </span>


        <span
          className={`
            text-[8px]
            font-black
            uppercase

            ${
              ok
                ? 'text-emerald-500'
                : 'text-rose-500'
            }
          `}
        >
          {
            ok
              ? 'OK'
              : 'CHECK'
          }
        </span>

      </div>


      <span
        className={`
          block
          font-mono
          font-black
          text-xl

          ${
            ok
              ? 'text-emerald-500'
              : 'text-rose-500'
          }
        `}
      >
        {value}
      </span>

    </div>
  );
}


function DataPair({
  label,
  value,
  ui
}) {
  return (
    <div>

      <span
        className={`
          block
          text-[8px]
          uppercase
          tracking-widest
          font-bold
          ${ui.sub}
        `}
      >
        {label}
      </span>


      <span
        className={`
          block
          mt-1
          font-mono
          font-bold
          ${ui.title}
        `}
      >
        {value}
      </span>

    </div>
  );
}


/* ============================================================
   TECHNICAL SCHEMATIC
   ============================================================ */

function ThreadSchematic({
  unitSystem,
  isDark,
  d,
  P,
  d2,
  d3,
  engagement,
  clearance
}) {
  const metal =
    isDark
      ? '#27272a'
      : '#e4e4e7';

  const darkMetal =
    isDark
      ? '#18181b'
      : '#fafafa';

  const stroke =
    isDark
      ? '#71717a'
      : '#71717a';

  const text =
    isDark
      ? '#d4d4d8'
      : '#3f3f46';


  return (
    <svg
      viewBox="0 0 700 330"
      className="
        w-full
        h-auto
        max-h-[340px]
      "
    >

      {/* =====================================================
          UPPER CLAMPED PART
          ===================================================== */}

      <rect
        x="80"
        y="55"
        width="540"
        height="80"
        fill={metal}
        stroke={stroke}
        strokeWidth="2"
      />


      {/* Clearance hole */}

      <rect
        x="318"
        y="55"
        width="64"
        height="80"
        fill={darkMetal}
      />


      {/* =====================================================
          TAPPED PART
          ===================================================== */}

      <rect
        x="80"
        y="135"
        width="540"
        height="150"
        fill={darkMetal}
        stroke={stroke}
        strokeWidth="2"
      />


      {/* Tapped hole */}

      <rect
        x="325"
        y="135"
        width="50"
        height="125"
        fill={
          isDark
            ? '#09090b'
            : '#ffffff'
        }
      />


      {/* =====================================================
          BOLT HEAD
          ===================================================== */}

      <path
        d="
          M 285 20
          L 415 20
          L 430 55
          L 270 55
          Z
        "
        fill="#0891b2"
        stroke="#0e7490"
        strokeWidth="2"
      />


      {/* Bolt shank */}

      <rect
        x="330"
        y="55"
        width="40"
        height="85"
        fill="#0891b2"
        stroke="#0e7490"
        strokeWidth="1.5"
      />


      {/* Threaded bolt portion */}

      <rect
        x="330"
        y="135"
        width="40"
        height="125"
        fill="#06b6d4"
        stroke="#0e7490"
        strokeWidth="1.5"
      />


      {/* =====================================================
          THREAD SYMBOL
          ===================================================== */}

      {Array.from({
        length: 10
      }).map((_, index) => {

        const y =
          142 +
          index * 11;

        return (
          <g key={index}>

            <line
              x1="325"
              y1={y}
              x2="337"
              y2={y + 6}
              stroke="#67e8f9"
              strokeWidth="1.5"
            />

            <line
              x1="375"
              y1={y}
              x2="363"
              y2={y + 6}
              stroke="#67e8f9"
              strokeWidth="1.5"
            />

          </g>
        );
      })}


      {/* =====================================================
          CENTER LINE
          ===================================================== */}

      <line
        x1="350"
        y1="5"
        x2="350"
        y2="310"
        stroke={stroke}
        strokeWidth="1"
        strokeDasharray="8 4 2 4"
      />


      {/* =====================================================
          CLEARANCE DIMENSION
          ===================================================== */}

      <line
        x1="318"
        y1="105"
        x2="382"
        y2="105"
        stroke="#10b981"
        strokeWidth="1.5"
      />


      <line
        x1="318"
        y1="98"
        x2="318"
        y2="112"
        stroke="#10b981"
      />


      <line
        x1="382"
        y1="98"
        x2="382"
        y2="112"
        stroke="#10b981"
      />


      <text
        x="405"
        y="110"
        fill="#10b981"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
      >
        Ø{fmt(Number(clearance), 1)}
      </text>


      {/* =====================================================
          THREAD LABEL
          ===================================================== */}

      <line
        x1="375"
        y1="175"
        x2="480"
        y2="175"
        stroke="#06b6d4"
        strokeWidth="1.5"
      />


      <text
        x="490"
        y="180"
        fill="#06b6d4"
        fontSize="13"
        fontFamily="monospace"
        fontWeight="bold"
      >
        M{d} × {P}
      </text>


      {/* =====================================================
          ENGAGEMENT DIMENSION
          ===================================================== */}

      <line
        x1="250"
        y1="135"
        x2="250"
        y2="260"
        stroke="#f59e0b"
        strokeWidth="1.5"
      />


      <line
        x1="242"
        y1="135"
        x2="258"
        y2="135"
        stroke="#f59e0b"
      />


      <line
        x1="242"
        y1="260"
        x2="258"
        y2="260"
        stroke="#f59e0b"
      />


      <text
        x="235"
        y="205"
        fill="#f59e0b"
        fontSize="12"
        fontFamily="monospace"
        fontWeight="bold"
        textAnchor="end"
      >
        Le = {formatQuantity(engagement, 'length', unitSystem)}
      </text>


      {/* =====================================================
          GEOMETRY INFO
          ===================================================== */}

      <text
        x="80"
        y="310"
        fill={text}
        fontSize="11"
        fontFamily="monospace"
      >
        d = {formatQuantity(d, 'length', unitSystem)} | d₂ = {formatQuantity(d2, 'length', unitSystem)} | d₃ = {formatQuantity(d3, 'length', unitSystem)}
      </text>

    </svg>
  );
}