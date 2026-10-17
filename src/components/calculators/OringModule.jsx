'use client';

import React, { useEffect, useMemo, useState } from 'react';
import ExamplePresets from '@/components/calculators/ExamplePresets';
import ShareCalculationButton from '@/components/calculators/ShareCalculationButton';
import CopyResultButton from '@/components/calculators/CopyResultButton';
import { convertUnitLabel, formatQuantity, fromDisplayValue, inputDisplayValue } from '@/lib/units';

/*
  O-RING ENGINEERING MODULE
  =========================

  PURPOSE
  -------
  Preliminary engineering evaluation of O-ring installations.

  REFERENCES / INTENT
  -------------------
  ISO 3601-1:2012:
    O-ring inside diameters, cross-sections, tolerances,
    designation codes.

  ISO 3601-2:2025:
    Housing / gland dimensions for general applications.

  ISO 3601-4:2008:
    Anti-extrusion / back-up ring dimensions and tolerances.

  IMPORTANT
  ---------
  This module is NOT a complete implementation of ISO 3601
  dimensional tables.

  The groove dimensions below are engineering presets based on
  the original application's dimensional dataset.

  Squeeze, stretch, gland fill and extrusion checks are
  preliminary engineering calculations.

  Final production design must consider:
    - O-ring dimensional tolerances;
    - groove machining tolerances;
    - bore / rod tolerances;
    - thermal expansion;
    - fluid compatibility;
    - elastomer swell;
    - compression set;
    - pressure cycling;
    - extrusion gap;
    - surface finish;
    - lubrication;
    - dynamic velocity;
    - manufacturer-specific compound data.
*/


/* =========================================================
   CROSS-SECTION / GROOVE PRESETS
   ========================================================= */

const ORING_CS_DATA = [
  {
    d2: 1.50,
    series: 'Common metric',
    radialStaticDepth: 1.10,
    radialDynamicDepth: 1.20,
    axialDepth: 1.10,
    width: 2.00,
    widthBackup1: 3.00,
    widthBackup2: 4.00,
    rBottom: 0.30,
    rEdge: 0.20,
    leadIn: 0.70
  },
  {
    d2: 1.78,
    series: 'Common nominal series',
    radialStaticDepth: 1.30,
    radialDynamicDepth: 1.45,
    axialDepth: 1.30,
    width: 2.40,
    widthBackup1: 3.80,
    widthBackup2: 5.20,
    rBottom: 0.40,
    rEdge: 0.20,
    leadIn: 0.80
  },
  {
    d2: 2.00,
    series: 'Common metric',
    radialStaticDepth: 1.50,
    radialDynamicDepth: 1.65,
    axialDepth: 1.50,
    width: 2.70,
    widthBackup1: 4.00,
    widthBackup2: 5.30,
    rBottom: 0.40,
    rEdge: 0.20,
    leadIn: 0.90
  },
  {
    d2: 2.50,
    series: 'Common metric',
    radialStaticDepth: 1.90,
    radialDynamicDepth: 2.10,
    axialDepth: 1.85,
    width: 3.40,
    widthBackup1: 4.80,
    widthBackup2: 6.20,
    rBottom: 0.60,
    rEdge: 0.20,
    leadIn: 1.00
  },
  {
    d2: 2.62,
    series: 'Common nominal series',
    radialStaticDepth: 2.00,
    radialDynamicDepth: 2.20,
    axialDepth: 1.95,
    width: 3.60,
    widthBackup1: 5.00,
    widthBackup2: 6.40,
    rBottom: 0.60,
    rEdge: 0.20,
    leadIn: 1.10
  },
  {
    d2: 3.00,
    series: 'Common metric',
    radialStaticDepth: 2.30,
    radialDynamicDepth: 2.50,
    axialDepth: 2.25,
    width: 4.00,
    widthBackup1: 5.50,
    widthBackup2: 7.00,
    rBottom: 0.60,
    rEdge: 0.20,
    leadIn: 1.20
  },
  {
    d2: 3.53,
    series: 'Common nominal series',
    radialStaticDepth: 2.70,
    radialDynamicDepth: 2.95,
    axialDepth: 2.65,
    width: 4.80,
    widthBackup1: 6.30,
    widthBackup2: 7.80,
    rBottom: 0.80,
    rEdge: 0.20,
    leadIn: 1.30
  },
  {
    d2: 4.00,
    series: 'Common metric',
    radialStaticDepth: 3.10,
    radialDynamicDepth: 3.35,
    axialDepth: 3.00,
    width: 5.20,
    widthBackup1: 6.80,
    widthBackup2: 8.40,
    rBottom: 0.80,
    rEdge: 0.20,
    leadIn: 1.40
  },
  {
    d2: 5.00,
    series: 'Common metric',
    radialStaticDepth: 3.90,
    radialDynamicDepth: 4.20,
    axialDepth: 3.80,
    width: 6.60,
    widthBackup1: 8.40,
    widthBackup2: 10.20,
    rBottom: 1.00,
    rEdge: 0.30,
    leadIn: 1.60
  },
  {
    d2: 5.33,
    series: 'Common nominal series',
    radialStaticDepth: 4.20,
    radialDynamicDepth: 4.50,
    axialDepth: 4.05,
    width: 7.10,
    widthBackup1: 9.10,
    widthBackup2: 11.10,
    rBottom: 1.20,
    rEdge: 0.30,
    leadIn: 1.70
  },
  {
    d2: 6.00,
    series: 'Common metric',
    radialStaticDepth: 4.70,
    radialDynamicDepth: 5.10,
    axialDepth: 4.60,
    width: 7.80,
    widthBackup1: 10.00,
    widthBackup2: 12.20,
    rBottom: 1.20,
    rEdge: 0.30,
    leadIn: 1.90
  },
  {
    d2: 6.99,
    series: 'Common nominal series',
    radialStaticDepth: 5.60,
    radialDynamicDepth: 5.95,
    axialDepth: 5.40,
    width: 9.50,
    widthBackup1: 12.00,
    widthBackup2: 14.50,
    rBottom: 1.60,
    rEdge: 0.40,
    leadIn: 2.20
  }
];


/* =========================================================
   ELASTOMER DATA
   =========================================================

   Temperature ranges are indicative engineering ranges,
   NOT universal material limits.

   Actual capability depends on compound formulation,
   medium, pressure and exposure time.
   ========================================================= */

const ELASTOMERS = [
  {
    id: 'NBR70',
    name: 'NBR 70 Shore A',
    family: 'NBR',
    hardness: 70,
    tempMin: -30,
    tempMax: 100
  },
  {
    id: 'NBR90',
    name: 'NBR 90 Shore A',
    family: 'NBR',
    hardness: 90,
    tempMin: -25,
    tempMax: 100
  },
  {
    id: 'FKM80',
    name: 'FKM 80 Shore A',
    family: 'FKM',
    hardness: 80,
    tempMin: -20,
    tempMax: 200
  },
  {
    id: 'EPDM70',
    name: 'EPDM 70 Shore A',
    family: 'EPDM',
    hardness: 70,
    tempMin: -45,
    tempMax: 130
  }
];


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const TRANSLATIONS = {
  ro: {
    configTitle: '1. Configurare Etanșare',
    sealType: 'Tip etanșare',

    piston: 'Radială — Piston',
    rod: 'Radială — Tijă',
    axial: 'Axială — Frontală',

    duty: 'Regim funcționare',
    staticDuty: 'Static',
    dynamicDuty: 'Dinamic — alternativ',

    pressureDirection: 'Direcția presiunii',
    internalPressure: 'Presiune din interior',
    externalPressure: 'Presiune din exterior',

    hardwareDia: 'Diametru hardware de referință (mm)',
    oringID: 'Diametru interior O-ring d₁ (mm)',
    crossSection: 'Secțiune O-ring d₂ (mm)',

    operatingPressure: 'Presiune de lucru (bar)',
    extrusionGap: 'Joc radial de extruziune (mm)',
    temperature: 'Temperatură de lucru (°C)',

    material: 'Material elastomer',
    backup: 'Configurație back-up ring',

    noBackup: 'Fără back-up ring',
    oneBackup: '1 back-up ring',
    twoBackup: '2 back-up rings',

    results: 'Rezultate Geometrice & Funcționale',

    oring: 'O-Ring',
    grooveDepth: 'Adâncime canal',
    grooveWidth: 'Lățime canal',
    grooveDia: 'Diametru fund canal',

    squeeze: 'Comprimare (squeeze)',
    stretch: 'Alungire circumferențială',
    compression: 'Compresie circumferențială',
    glandFill: 'Umplere canal',

    extrusion: 'Risc extruziune',
    temperatureCheck: 'Temperatură',
    backupRecommendation: 'Back-up ring',

    ok: 'OK',
    check: 'VERIFICĂ',
    warning: 'ATENȚIE',
    required: 'RECOMANDAT',
    notRequired: 'NU REZULTĂ NECESAR',

    preliminary: 'VERIFICARE PRELIMINARĂ',

    schematic: 'Schiță Tehnică Simplificată',

    engineeringNotes: 'Bază tehnică & Observații inginerești',

    standardsBasis:
      'Referințe: ISO 3601-1:2012 (dimensiuni/toleranțe O-ring), ISO 3601-2:2025 (housing/canale pentru aplicații generale), ISO 3601-4:2008 (inele anti-extruziune).',

    note1:
      'Valorile geometrice ale canalului din DraftFit sunt preseturi interne de proiectare, nu reproducerea tabelelor ISO. Pentru desen de execuție trebuie verificate dimensiunile și toleranțele aplicabile din ISO 3601-1:2012 și ISO 3601-2:2025.',

    note2:
      'Squeeze, stretch și gland fill trebuie verificate în cazurile limită rezultate din toleranțele O-ringului și ale componentelor.',

    note3:
      'Evaluarea riscului de extruziune este orientativă și nu reprezintă o limită de acceptare ISO. Limita reală depinde de presiune, joc, duritate, temperatură, compound și condițiile dinamice.',

    note4:
      'Compatibilitatea chimică nu poate fi determinată doar din familia NBR/FKM/EPDM. Este necesară verificarea compound-ului față de fluidul real.',

    note5:
      'Pentru aplicații dinamice trebuie verificate suplimentar viteza, lubrifierea, rugozitatea, uzura, frecarea și stick-slip. Dacă se folosesc back-up rings, geometria lor finală trebuie verificată separat conform ISO 3601-4:2008 sau documentației producătorului.',

    export: 'TIPĂREȘTE / EXPORTĂ FIȘA'
  },

  en: {
    configTitle: '1. Seal Configuration',
    sealType: 'Seal type',

    piston: 'Radial — Piston',
    rod: 'Radial — Rod',
    axial: 'Axial — Face',

    duty: 'Operating duty',
    staticDuty: 'Static',
    dynamicDuty: 'Dynamic — Reciprocating',

    pressureDirection: 'Pressure direction',
    internalPressure: 'Internal pressure',
    externalPressure: 'External pressure',

    hardwareDia: 'Reference hardware diameter (mm)',
    oringID: 'O-ring inside diameter d₁ (mm)',
    crossSection: 'O-ring cross-section d₂ (mm)',

    operatingPressure: 'Operating pressure (bar)',
    extrusionGap: 'Radial extrusion gap (mm)',
    temperature: 'Operating temperature (°C)',

    material: 'Elastomer material',
    backup: 'Back-up ring configuration',

    noBackup: 'No back-up ring',
    oneBackup: '1 back-up ring',
    twoBackup: '2 back-up rings',

    results: 'Geometrical & Functional Results',

    oring: 'O-Ring',
    grooveDepth: 'Groove depth',
    grooveWidth: 'Groove width',
    grooveDia: 'Groove root diameter',

    squeeze: 'Squeeze',
    stretch: 'Circumferential stretch',
    compression: 'Circumferential compression',
    glandFill: 'Gland fill',

    extrusion: 'Extrusion risk',
    temperatureCheck: 'Temperature',
    backupRecommendation: 'Back-up ring',

    ok: 'OK',
    check: 'CHECK',
    warning: 'WARNING',
    required: 'RECOMMENDED',
    notRequired: 'NOT INDICATED',

    preliminary: 'PRELIMINARY CHECK',

    schematic: 'Simplified Technical Schematic',

    engineeringNotes: 'Engineering Basis & Notes',

    standardsBasis:
      'References: ISO 3601-1:2012 (O-ring dimensions/tolerances), ISO 3601-2:2025 (general-application housings/glands), ISO 3601-4:2008 (anti-extrusion rings).',

    note1:
      'DraftFit groove dimensions are internal engineering presets, not a reproduction of ISO tables. Production dimensions and tolerances must be checked against the applicable ISO 3601-1:2012 and ISO 3601-2:2025 requirements.',

    note2:
      'Squeeze, stretch and gland fill should be verified at tolerance-stack extremes.',

    note3:
      'Extrusion-risk evaluation is indicative and is not an ISO acceptance limit. Actual limits depend on pressure, clearance, hardness, temperature, compound and dynamic conditions.',

    note4:
      'Chemical compatibility cannot be determined from NBR/FKM/EPDM family alone. The actual compound must be checked against the working fluid.',

    note5:
      'Dynamic applications also require verification of velocity, lubrication, surface finish, wear, friction and stick-slip. If back-up rings are used, their final geometry should be checked separately against ISO 3601-4:2008 or manufacturer data.',

    export: 'PRINT / EXPORT REPORT'
  }
};


/* =========================================================
   HELPERS
   ========================================================= */

function findExactCrossSection(d2) {
  return (
    ORING_CS_DATA.find(
      item =>
        Math.abs(item.d2 - Number(d2)) < 1e-9
    ) || null
  );
}


function interpolateCrossSectionPreset(d2) {
  const value = Number(d2);

  if (
    !Number.isFinite(value) ||
    value < ORING_CS_DATA[0].d2 ||
    value >
      ORING_CS_DATA[
        ORING_CS_DATA.length - 1
      ].d2
  ) {
    return null;
  }

  const exact =
    findExactCrossSection(value);

  if (exact) {
    return exact;
  }

  let lower = null;
  let upper = null;

  for (
    let index = 0;
    index < ORING_CS_DATA.length - 1;
    index += 1
  ) {
    const left =
      ORING_CS_DATA[index];

    const right =
      ORING_CS_DATA[index + 1];

    if (
      value > left.d2 &&
      value < right.d2
    ) {
      lower = left;
      upper = right;
      break;
    }
  }

  if (!lower || !upper) {
    return null;
  }

  const ratio =
    (value - lower.d2) /
    (upper.d2 - lower.d2);

  const interpolate =
    key =>
      lower[key] +
      (upper[key] - lower[key]) *
        ratio;

  return {
    d2: value,
    series:
      'Custom CS — interpolated preliminary groove',
    radialStaticDepth:
      interpolate('radialStaticDepth'),
    radialDynamicDepth:
      interpolate('radialDynamicDepth'),
    axialDepth:
      interpolate('axialDepth'),
    width:
      interpolate('width'),
    widthBackup1:
      interpolate('widthBackup1'),
    widthBackup2:
      interpolate('widthBackup2'),
    rBottom:
      interpolate('rBottom'),
    rEdge:
      interpolate('rEdge'),
    leadIn:
      interpolate('leadIn'),
    customInterpolated: true
  };
}


function findCrossSection(d2) {
  return (
    findExactCrossSection(d2) ||
    interpolateCrossSectionPreset(d2)
  );
}


function getElastomer(id) {
  return (
    ELASTOMERS.find(
      item => item.id === id
    ) || null
  );
}


function fmt(value, digits = 2) {
  if (!Number.isFinite(value)) {
    return '—';
  }

  return value.toFixed(digits);
}


/* =========================================================
   GEOMETRY FUNCTIONS
   ========================================================= */

function getGrooveDepth(
  cs,
  sealType,
  duty
) {
  if (!cs) return null;

  if (sealType === 'axial') {
    return cs.axialDepth;
  }

  return duty === 'dynamic'
    ? cs.radialDynamicDepth
    : cs.radialStaticDepth;
}


function getGrooveWidth(
  cs,
  backupCount
) {
  if (!cs) return null;

  if (backupCount === 1) {
    return cs.widthBackup1;
  }

  if (backupCount === 2) {
    return cs.widthBackup2;
  }

  return cs.width;
}


/*
  Cross-sectional O-ring area.

  A = π d₂² / 4
*/

export function calculateOringArea(d2) {
  return (
    Math.PI *
    d2 *
    d2 /
    4
  );
}


/*
  Simplified rectangular gland area.

  Ag = width × depth

  This ignores corner radii and back-up ring occupied area.
  Therefore gland fill is explicitly treated as a preliminary
  geometric estimate.
*/

function calculateGlandArea(
  width,
  depth
) {
  return width * depth;
}


/*
  Gland fill:

  Fill = A_O-ring / A_gland × 100
*/

export function calculateGlandFill(
  d2,
  width,
  depth
) {
  const oRingArea =
    calculateOringArea(d2);

  const glandArea =
    calculateGlandArea(
      width,
      depth
    );

  if (glandArea <= 0) {
    return null;
  }

  return (
    oRingArea /
    glandArea *
    100
  );
}


/*
  Radial / axial squeeze based on nominal geometry:

            d₂ - glandDepth
  squeeze = ---------------- × 100
                   d₂

  This is NOMINAL squeeze only.

  Correct production validation requires tolerance stack.
*/

export function calculateSqueeze(
  d2,
  depth
) {
  if (
    d2 <= 0 ||
    depth <= 0
  ) {
    return null;
  }

  return (
    (d2 - depth) /
    d2 *
    100
  );
}


/*
  O-ring stretch.

  For an O-ring fitted over a groove diameter:

          installed ID - free ID
  ε = -------------------------- × 100
                 free ID

  Positive = stretch
  Negative = circumferential compression
*/

export function calculateCircumferentialStrain(
  freeID,
  installedID
) {
  if (
    freeID <= 0 ||
    installedID <= 0
  ) {
    return null;
  }

  return (
    (installedID - freeID) /
    freeID *
    100
  );
}


/* =========================================================
   HARDWARE GEOMETRY
   =========================================================

   IMPORTANT:
   The meaning of hardwareDia differs by configuration.

   PISTON:
     hardwareDia = cylinder bore diameter.
     groove is on piston OD.

   ROD:
     hardwareDia = rod diameter.
     groove is in housing bore.

   AXIAL:
     hardwareDia = mean groove diameter.
     This module uses it for circumferential installation
     evaluation only.
   ========================================================= */

function calculateInstalledGeometry({
  sealType,
  hardwareDia,
  depth,
  d1,
  d2,
  axialDirection
}) {
  if (
    hardwareDia <= 0 ||
    depth <= 0 ||
    d1 <= 0 ||
    d2 <= 0
  ) {
    return null;
  }


  if (sealType === 'piston') {
    /*
      Groove root diameter on piston.

      Bore diameter minus two radial gland depths.
    */

    const grooveRootDia =
      hardwareDia -
      2 * depth;


    const installedID =
      grooveRootDia;


    return {
      grooveRootDia,
      installedID
    };
  }


  if (sealType === 'rod') {
    /*
      Groove root diameter in housing.

      Rod diameter + 2 × gland depth.

      Circumferential strain of a rod-seal O-ring is not
      represented by forcing its ID to equal the rod diameter.

      The free O-ring ID is compared here with the nominal
      rod diameter only as an installation indicator.
    */

    const grooveRootDia =
      hardwareDia +
      2 * depth;


    return {
      grooveRootDia,
      installedID:
        hardwareDia
    };
  }


  /*
    AXIAL / FACE SEAL

    The user supplies the mean groove diameter.

    Pressure direction matters for groove positioning:
    the O-ring should be pressure-energized against the
    appropriate groove wall.

    We do NOT fabricate an O-ring ID from D ± d₂.
  */

  const meanDia =
    hardwareDia;


  const installedID =
    axialDirection === 'internal'
      ? meanDia - d2
      : meanDia - d2;


  return {
    grooveRootDia:
      meanDia,

    installedID
  };
}


/* =========================================================
   ENGINEERING EVALUATION
   ========================================================= */

function evaluateSqueeze(
  squeeze,
  sealType,
  duty
) {
  if (!Number.isFinite(squeeze)) {
    return 'invalid';
  }

  /*
    These are design guidance bands,
    NOT ISO acceptance tolerances.

    Static applications generally tolerate more squeeze.
    Dynamic reciprocating seals are kept lower to reduce
    friction and heat generation.
  */

  if (sealType === 'axial') {
    if (
      squeeze >= 15 &&
      squeeze <= 30
    ) {
      return 'ok';
    }

    return 'check';
  }


  if (duty === 'dynamic') {
    if (
      squeeze >= 8 &&
      squeeze <= 20
    ) {
      return 'ok';
    }

    return 'check';
  }


  if (
    squeeze >= 12 &&
    squeeze <= 30
  ) {
    return 'ok';
  }

  return 'check';
}


function evaluateGlandFill(fill) {
  if (!Number.isFinite(fill)) {
    return 'invalid';
  }

  /*
    Typical engineering guidance:
    ~60...85 %.

    Keep void volume for:
      - thermal expansion;
      - fluid swell;
      - tolerance stack.
  */

  if (
    fill >= 60 &&
    fill <= 85
  ) {
    return 'ok';
  }

  return 'check';
}


function evaluateCircumferentialStrain(
  strain,
  sealType
) {
  if (!Number.isFinite(strain)) {
    return 'invalid';
  }


  /*
    Positive = stretch.

    >5% is flagged because high installed stretch generally
    accelerates aging and reduces cross-section.

    Negative strain means circumferential compression.
    Excessive compression may cause buckling / twisting.
  */

  if (strain >= 0) {
    if (strain <= 5) {
      return 'ok';
    }

    return 'check';
  }


  /*
    Compression is intentionally treated conservatively.
  */

  if (
    sealType === 'rod' &&
    strain >= -3
  ) {
    return 'ok';
  }


  if (
    sealType === 'axial' &&
    strain >= -3
  ) {
    return 'ok';
  }


  return 'check';
}


/* =========================================================
   EXTRUSION RISK
   =========================================================

   This is intentionally a qualitative preliminary model.

   It MUST NOT be interpreted as an ISO extrusion limit chart.

   Risk increases with:
     - pressure;
     - extrusion gap;
     - temperature;
     - lower hardness;
     - dynamic duty.

   Back-up rings are evaluated from this combination rather
   than from pressure alone.
   ========================================================= */

function evaluateExtrusionRisk({
  pressureBar,
  radialGap,
  hardness,
  temperature,
  duty
}) {
  let score = 0;


  /* Pressure contribution */

  if (pressureBar > 50) {
    score += 1;
  }

  if (pressureBar > 100) {
    score += 1;
  }

  if (pressureBar > 200) {
    score += 1;
  }

  if (pressureBar > 350) {
    score += 1;
  }


  /* Gap contribution */

  if (radialGap > 0.10) {
    score += 1;
  }

  if (radialGap > 0.20) {
    score += 1;
  }

  if (radialGap > 0.30) {
    score += 1;
  }


  /* Hardness */

  if (hardness < 80) {
    score += 1;
  }


  /* Temperature */

  if (temperature > 100) {
    score += 1;
  }


  /* Dynamic motion */

  if (duty === 'dynamic') {
    score += 1;
  }


  if (score <= 2) {
    return {
      level: 'low',
      score
    };
  }


  if (score <= 5) {
    return {
      level: 'medium',
      score
    };
  }


  return {
    level: 'high',
    score
  };
}


/* =========================================================
   BACK-UP RING RECOMMENDATION
   ========================================================= */

function evaluateBackupRequirement({
  extrusionRisk,
  pressureBar,
  backupCount,
  pressureDirection
}) {
  const recommended =
    extrusionRisk.level === 'high' ||
    (
      extrusionRisk.level === 'medium' &&
      pressureBar >= 100
    );


  let recommendedCount = 0;


  if (recommended) {
    /*
      Bidirectional pressure:
      protect both sides.

      In this UI, axialDirection is also used as pressure
      direction only for face seals, so radial applications
      default to one back-up when risk is significant.
    */

    recommendedCount =
      pressureDirection === 'bidirectional'
        ? 2
        : 1;
  }


  return {
    recommended,
    recommendedCount,

    adequate:
      !recommended ||
      backupCount >=
        recommendedCount
  };
}


/* =========================================================
   TEMPERATURE CHECK
   ========================================================= */

function evaluateTemperature(
  material,
  temperature
) {
  if (!material) {
    return false;
  }

  return (
    temperature >=
      material.tempMin &&
    temperature <=
      material.tempMax
  );
}


/* =========================================================
   MAIN CALCULATOR
   ========================================================= */

function calculateOring({
  sealType,
  duty,
  axialDirection,
  hardwareDia,
  d1,
  d2,
  backupCount,
  material,
  pressureBar,
  radialGap,
  temperature
}) {
  const cs =
    findCrossSection(d2);


  if (
    !cs ||
    !material ||
    !Number.isFinite(hardwareDia) ||
    !Number.isFinite(d1) ||
    !Number.isFinite(pressureBar) ||
    !Number.isFinite(radialGap) ||
    !Number.isFinite(temperature) ||
    hardwareDia <= 0 ||
    d1 <= 0 ||
    pressureBar < 0 ||
    radialGap < 0
  ) {
    return {
      valid: false
    };
  }


  const depth =
    getGrooveDepth(
      cs,
      sealType,
      duty
    );


  const width =
    getGrooveWidth(
      cs,
      backupCount
    );


  const geometry =
    calculateInstalledGeometry({
      sealType,
      hardwareDia,
      depth,
      d1,
      d2: cs.d2,
      axialDirection
    });


  if (!geometry) {
    return {
      valid: false
    };
  }


  const squeeze =
    calculateSqueeze(
      cs.d2,
      depth
    );


  const glandFill =
    calculateGlandFill(
      cs.d2,
      width,
      depth
    );


  const circumferentialStrain =
    calculateCircumferentialStrain(
      d1,
      geometry.installedID
    );


  const squeezeStatus =
    evaluateSqueeze(
      squeeze,
      sealType,
      duty
    );


  const fillStatus =
    evaluateGlandFill(
      glandFill
    );


  const strainStatus =
    evaluateCircumferentialStrain(
      circumferentialStrain,
      sealType
    );


  const extrusionRisk =
    evaluateExtrusionRisk({
      pressureBar,
      radialGap,
      hardness:
        material.hardness,
      temperature,
      duty
    });


  const backupEvaluation =
    evaluateBackupRequirement({
      extrusionRisk,
      pressureBar,
      backupCount,

      pressureDirection:
        sealType === 'axial'
          ? axialDirection
          : 'unidirectional'
    });


  const temperatureOK =
    evaluateTemperature(
      material,
      temperature
    );


  const overallOK =
    squeezeStatus === 'ok' &&
    fillStatus === 'ok' &&
    strainStatus === 'ok' &&
    temperatureOK &&
    backupEvaluation.adequate;


  return {
    valid: true,

    cs,

    material,

    depth,
    width,

    grooveRootDia:
      geometry.grooveRootDia,

    installedID:
      geometry.installedID,

    squeeze,
    glandFill,

    circumferentialStrain,

    squeezeStatus,
    fillStatus,
    strainStatus,

    extrusionRisk,
    backupEvaluation,

    temperatureOK,

    overallOK
  };
}




const ORING_EXAMPLE_PRESETS = [
  {
    id: 'static-piston',
    title: { en: 'Static piston seal', ro: 'Etanșare statică pe piston' },
    description: { en: '40 mm hardware, NBR 70, moderate pressure.', ro: 'Hardware 40 mm, NBR 70, presiune moderată.' }
  },
  {
    id: 'dynamic-rod',
    title: { en: 'Dynamic rod seal', ro: 'Etanșare dinamică pe tijă' },
    description: { en: '25 mm rod application with lower pressure and controlled gap.', ro: 'Aplicație pe tijă de 25 mm, presiune redusă și joc controlat.' }
  },
  {
    id: 'face-seal',
    title: { en: 'Axial face seal', ro: 'Etanșare axială' },
    description: { en: 'Static face seal example with internal pressure direction.', ro: 'Exemplu de etanșare frontală statică, cu presiune din interior.' }
  }
];



/* =========================================================
   SEAL SELECTION ASSISTANT
   =========================================================

   These are DraftFit workflow starting points only.

   They are intentionally NOT represented as ISO 3601
   recommendations or manufacturer-approved seal selections.

   The assistant helps a new user move from:
     application -> duty -> pressure context -> cross-section

   The resulting geometry must still pass the calculation checks
   below and be verified against the applicable controlled
   standard and compound/manufacturer data.
   ========================================================= */

const ASSISTANT_PRESSURE_BANDS = {
  low: {
    pressureBar: 10,
    label: {
      en: 'Low pressure',
      ro: 'Presiune redusă'
    }
  },
  medium: {
    pressureBar: 80,
    label: {
      en: 'Medium pressure',
      ro: 'Presiune medie'
    }
  },
  high: {
    pressureBar: 180,
    label: {
      en: 'High pressure',
      ro: 'Presiune ridicată'
    }
  }
};


function getAssistantCrossSections(hardwareDia) {
  const d = Number(hardwareDia);

  if (!Number.isFinite(d) || d <= 0) {
    return [2.62, 3.53, 5.33];
  }

  if (d <= 20) {
    return [1.78, 2.62, 3.53];
  }

  if (d <= 50) {
    return [2.62, 3.53, 5.33];
  }

  return [3.53, 5.33, 6.99];
}


function getAssistantFreeID({
  sealType,
  duty,
  hardwareDia,
  d2
}) {
  const cs =
    findCrossSection(d2);

  const depth =
    getGrooveDepth(
      cs,
      sealType,
      duty
    );

  const hardware =
    Number(hardwareDia);

  if (
    !cs ||
    !Number.isFinite(depth) ||
    !Number.isFinite(hardware) ||
    hardware <= 0
  ) {
    return null;
  }

  let installedID;

  if (sealType === 'piston') {
    installedID =
      hardware -
      2 * depth;

    /*
      DraftFit starting point:
      about 2% installed stretch.

      This is not an ISO selection rule.
    */
    return installedID / 1.02;
  }

  if (sealType === 'rod') {
    /*
      DraftFit starting point:
      about 1% installed stretch over the rod.

      This is only a convenient geometry starting point.
    */
    return hardware / 1.01;
  }

  /*
    Face seal:
    use the same installed-mean-diameter convention
    as the existing axial geometry model.
  */
  installedID =
    hardware -
    d2;

  return installedID;
}


function roundAssistantValue(value) {
  if (!Number.isFinite(value)) {
    return value;
  }

  return Math.round(value * 100) / 100;
}


/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function OringModule({
  unitSystem = 'metric',
  isDark,
  experienceMode = 'quick',
  lang = 'ro',
  onPrint
}) {
  const t =
    TRANSLATIONS[lang] ||
    TRANSLATIONS.ro;


  /* =======================================================
     INPUT STATE
     ======================================================= */

  const [
    sealType,
    setSealType
  ] = useState('piston');


  const [
    duty,
    setDuty
  ] = useState('static');


  const [
    axialDirection,
    setAxialDirection
  ] = useState('internal');


  const [
    hardwareDia,
    setHardwareDia
  ] = useState(40);


  const [
    d1,
    setD1
  ] = useState(32.92);


  const [
    d2,
    setD2
  ] = useState(3.53);


  const [
    backupCount,
    setBackupCount
  ] = useState(0);


  const [
    materialId,
    setMaterialId
  ] = useState('NBR70');


  const [
    pressureBar,
    setPressureBar
  ] = useState(50);


  const [
    radialGap,
    setRadialGap
  ] = useState(0.10);


  const [
    temperature,
    setTemperature
  ] = useState(60);


  const [
    assistantPressureBand,
    setAssistantPressureBand
  ] = useState('medium');



  /* =======================================================
     SHAREABLE URL — RESTORE INPUTS
     ======================================================= */

  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('share') !== '1') return;

      const type = params.get('type');
      if (['piston', 'rod', 'axial'].includes(type)) setSealType(type);

      const sharedDuty = params.get('duty');
      if (['static', 'dynamic'].includes(sharedDuty)) setDuty(sharedDuty);

      const direction = params.get('axial');
      if (['internal', 'external'].includes(direction)) setAxialDirection(direction);

      const material = params.get('mat');
      if (material && ELASTOMERS.some((item) => item.id === material)) setMaterialId(material);

      const numericSetters = [
        ['hw', setHardwareDia],
        ['d1', setD1],
        ['d2', setD2],
        ['backup', setBackupCount],
        ['p', setPressureBar],
        ['gap', setRadialGap],
        ['temp', setTemperature],
      ];

      numericSetters.forEach(([key, setter]) => {
        const raw = params.get(key);
        if (raw === null) return;
        const value = Number(raw);
        if (Number.isFinite(value)) setter(value);
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  /* =======================================================
     MATERIAL
     ======================================================= */

  const material =
    getElastomer(
      materialId
    );


  /* =======================================================
     CALCULATION
     ======================================================= */

  const result =
    useMemo(
      () =>
        calculateOring({
          sealType,
          duty,
          axialDirection,

          hardwareDia:
            Number(hardwareDia),

          d1:
            Number(d1),

          d2:
            Number(d2),

          backupCount,

          material,

          pressureBar:
            Number(pressureBar),

          radialGap:
            Number(radialGap),

          temperature:
            Number(temperature)
        }),

      [
        sealType,
        duty,
        axialDirection,
        hardwareDia,
        d1,
        d2,
        backupCount,
        material,
        pressureBar,
        radialGap,
        temperature
      ]
    );


  /* =======================================================
     UI
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
        ? 'bg-zinc-950 border-zinc-700 text-white focus:border-red-600'
        : 'bg-white border-zinc-300 text-zinc-900 focus:border-red-600',

    select:
      isDark
        ? 'bg-zinc-900 border-zinc-700 text-white'
        : 'bg-white border-zinc-300 text-zinc-900',

    divider:
      isDark
        ? 'border-zinc-800'
        : 'border-zinc-200',

    titleText:
      isDark
        ? 'text-white'
        : 'text-zinc-900',

    subText:
      isDark
        ? 'text-zinc-400'
        : 'text-zinc-500'
  };




  const loadExamplePreset =
    (presetId) => {
      if (presetId === 'static-piston') {
        setSealType('piston');
        setDuty('static');
        setHardwareDia(40);
        setD1(32.92);
        setD2(3.53);
        setBackupCount(0);
        setMaterialId('NBR70');
        setPressureBar(50);
        setRadialGap(0.10);
        setTemperature(60);
        return;
      }

      if (presetId === 'dynamic-rod') {
        setSealType('rod');
        setDuty('dynamic');
        setHardwareDia(25);
        setD1(20.22);
        setD2(2.62);
        setBackupCount(0);
        setMaterialId('NBR70');
        setPressureBar(10);
        setRadialGap(0.08);
        setTemperature(50);
        return;
      }

      setSealType('axial');
      setDuty('static');
      setAxialDirection('internal');
      setHardwareDia(50);
      setD1(44.17);
      setD2(3.53);
      setBackupCount(0);
      setMaterialId('NBR70');
      setPressureBar(20);
      setRadialGap(0.10);
      setTemperature(40);
    };



  const assistantCrossSections =
    useMemo(
      () =>
        getAssistantCrossSections(
          Number(hardwareDia)
        ),
      [hardwareDia]
    );


  const applyAssistantStartingPoint =
    (crossSection) => {
      const selected =
        Number(crossSection);

      const pressureProfile =
        ASSISTANT_PRESSURE_BANDS[
          assistantPressureBand
        ] ||
        ASSISTANT_PRESSURE_BANDS.medium;

      const startingID =
        getAssistantFreeID({
          sealType,
          duty:
            sealType === 'axial'
              ? 'static'
              : duty,
          hardwareDia:
            Number(hardwareDia),
          d2:
            selected
        });

      setD2(selected);

      if (
        Number.isFinite(startingID) &&
        startingID > 0
      ) {
        setD1(
          roundAssistantValue(
            startingID
          )
        );
      }

      setPressureBar(
        pressureProfile.pressureBar
      );

      /*
        Do not auto-add a back-up ring.

        The existing extrusion / backup logic should show
        whether the current pressure-gap-hardness combination
        needs further review.
      */
      setBackupCount(0);
    };


  const primaryResultMessage =
    result.valid
      ? (
          result.overallOK
            ? (
                lang === 'ro'
                  ? 'Geometria selectată trece verificările preliminare implementate.'
                  : 'The selected geometry passes the implemented preliminary checks.'
              )
            : (
                lang === 'ro'
                  ? 'Cel puțin o verificare necesită revizuire înainte de proiectarea finală.'
                  : 'At least one check requires review before final design.'
              )
        )
      : '';


  return (
    <div className={`draftfit-experience-${experienceMode} 
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-7
      `}
    >

      {/* ===================================================
          INPUTS
          =================================================== */}

      <div
        className="
          lg:col-span-4
          print:hidden
          space-y-6
        "
      >












        <div
          className={`
            p-4
            sm:p-6
            border
            border-l-4
            border-l-red-700
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
              ${ui.titleText}
            `}
          >
            {t.configTitle}
          </h2>


          {/* Seal type */}

          <ControlGroup
            label={t.sealType}
            ui={ui}
          >

            {[
              ['piston', t.piston],
              ['rod', t.rod],
              ['axial', t.axial]
            ].map(
              ([id, label]) => (

                <ChoiceButton
                  key={id}

                  active={
                    sealType === id
                  }

                  onClick={() =>
                    setSealType(id)
                  }

                  isDark={isDark}
                >
                  {label}
                </ChoiceButton>
              )
            )}

          </ControlGroup>


          {/* Duty */}

          {sealType !== 'axial' && (

            <ControlGroup
              label={t.duty}
              ui={ui}
            >

              <div
                className="
                  grid
                  grid-cols-2
                  gap-2
                "
              >

                <ChoiceButton
                  active={
                    duty === 'static'
                  }

                  onClick={() =>
                    setDuty('static')
                  }

                  isDark={isDark}
                >
                  {t.staticDuty}
                </ChoiceButton>


                <ChoiceButton
                  active={
                    duty === 'dynamic'
                  }

                  onClick={() =>
                    setDuty('dynamic')
                  }

                  isDark={isDark}
                >
                  {t.dynamicDuty}
                </ChoiceButton>

              </div>

            </ControlGroup>
          )}


          {/* Axial pressure direction */}

          {sealType === 'axial' && (

            <ControlGroup
              label={
                t.pressureDirection
              }

              ui={ui}
            >

              <ChoiceButton
                active={
                  axialDirection ===
                  'internal'
                }

                onClick={() =>
                  setAxialDirection(
                    'internal'
                  )
                }

                isDark={isDark}
              >
                {t.internalPressure}
              </ChoiceButton>


              <ChoiceButton
                active={
                  axialDirection ===
                  'external'
                }

                onClick={() =>
                  setAxialDirection(
                    'external'
                  )
                }

                isDark={isDark}
              >
                {t.externalPressure}
              </ChoiceButton>

            </ControlGroup>
          )}


          <NumberInput
            label={
              convertUnitLabel(t.hardwareDia, unitSystem)
            }
            quantity="length"
            unitSystem={unitSystem}

            value={
              hardwareDia
            }

            setValue={
              setHardwareDia
            }

            ui={ui}
          />


          <NumberInput
            label={
              convertUnitLabel(t.oringID, unitSystem)
            }
            quantity="length"
            unitSystem={unitSystem}

            value={
              d1
            }

            setValue={
              setD1
            }

            step="0.01"

            ui={ui}
          />


          {/* Cross section */}

          <ControlGroup
            label={convertUnitLabel(t.crossSection, unitSystem)}

            ui={ui}
          >

            <div className="space-y-3">
              <select
                value={
                  findExactCrossSection(d2)
                    ? String(d2)
                    : 'custom'
                }

                onChange={
                  event => {
                    if (
                      event.target.value ===
                      'custom'
                    ) {
                      if (
                        findExactCrossSection(d2)
                      ) {
                        setD2(3.2);
                      }

                      return;
                    }

                    setD2(
                      Number(
                        event.target.value
                      )
                    );
                  }
                }

                className={`
                  w-full
                  border
                  p-2.5
                  font-mono
                  font-bold
                  ${ui.select}
                `}
              >
                <optgroup
                  label={
                    lang === 'ro'
                      ? 'Serii nominale uzuale'
                      : 'Common nominal series'
                  }
                >
                  {ORING_CS_DATA
                    .filter(
                      item =>
                        item.series ===
                        'Common nominal series'
                    )
                    .map(
                      item => (
                        <option
                          key={item.d2}
                          value={item.d2}
                        >
                          d₂ = {formatQuantity(
                            item.d2,
                            'length',
                            unitSystem
                          )}
                        </option>
                      )
                    )}
                </optgroup>

                <optgroup
                  label={
                    lang === 'ro'
                      ? 'Secțiuni metrice uzuale'
                      : 'Common metric sections'
                  }
                >
                  {ORING_CS_DATA
                    .filter(
                      item =>
                        item.series ===
                        'Common metric'
                    )
                    .map(
                      item => (
                        <option
                          key={item.d2}
                          value={item.d2}
                        >
                          d₂ = {formatQuantity(
                            item.d2,
                            'length',
                            unitSystem
                          )}
                        </option>
                      )
                    )}
                </optgroup>

                <optgroup
                  label={
                    lang === 'ro'
                      ? 'Personalizat'
                      : 'Custom'
                  }
                >
                  <option value="custom">
                    {lang === 'ro'
                      ? 'Introdu secțiune custom...'
                      : 'Enter custom cross-section...'}
                  </option>
                </optgroup>
              </select>

              {!findExactCrossSection(d2) && (
                <div
                  className={`
                    border
                    border-amber-500/30
                    bg-amber-500/5
                    p-3
                  `}
                >
                  <NumberInput
                    label={
                      lang === 'ro'
                        ? `Secțiune custom d₂ (${convertUnitLabel('mm', unitSystem)})`
                        : `Custom cross-section d₂ (${convertUnitLabel('mm', unitSystem)})`
                    }
                    quantity="length"
                    unitSystem={unitSystem}
                    value={d2}
                    setValue={setD2}
                    step="0.01"
                    ui={ui}
                  />

                  <p
                    className="
                      mt-2
                      text-[10px]
                      leading-5
                      text-amber-500
                    "
                  >
                    {lang === 'ro'
                      ? 'Pentru secțiuni custom între 1.50 și 6.99 mm, DraftFit interpolează geometria de canal dintre preset-urile vecine. Este un punct de pornire preliminar, nu o dimensiune standardizată.'
                      : 'For custom sections between 1.50 and 6.99 mm, DraftFit interpolates groove geometry between the neighboring stored presets. This is a preliminary starting point, not a standardized groove dimension.'}
                  </p>
                </div>
              )}

              <p
                className={`
                  text-[10px]
                  leading-5
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Seriile nominale și secțiunile metrice sunt doar selecții rapide din setul DraftFit. Pentru producție, verifică dimensiunea exactă a O-ring-ului și canalul în standardul controlat sau catalogul producătorului.'
                  : 'Nominal and common metric entries are quick selections from the DraftFit dataset. For production, verify the exact O-ring size and groove against the controlled standard or manufacturer catalog.'}
              </p>
            </div>

          </ControlGroup>


<div className="draftfit-advanced-only contents">
          <NumberInput
            label={
              convertUnitLabel(t.operatingPressure, unitSystem)
            }
            quantity="pressureBar"
            unitSystem={unitSystem}

            value={
              pressureBar
            }

            setValue={
              setPressureBar
            }

            step="1"

            ui={ui}
          />


          <NumberInput
            label={
              convertUnitLabel(t.extrusionGap, unitSystem)
            }
            quantity="length"
            unitSystem={unitSystem}

            value={
              radialGap
            }

            setValue={
              setRadialGap
            }

            step="0.01"

            ui={ui}
          />


          <NumberInput
            label={
              convertUnitLabel(t.temperature, unitSystem)
            }
            quantity="temperature"
            unitSystem={unitSystem}

            value={
              temperature
            }

            setValue={
              setTemperature
            }

            step="1"

            ui={ui}
          />


          {/* Material */}

          <ControlGroup
            label={
              t.material
            }

            ui={ui}
          >

            <select
              value={
                materialId
              }

              onChange={
                event =>
                  setMaterialId(
                    event.target.value
                  )
              }

              className={`
                w-full
                border
                p-2.5
                text-xs
                font-semibold
                ${ui.select}
              `}
            >

              {ELASTOMERS.map(
                item => (

                  <option
                    key={
                      item.id
                    }

                    value={
                      item.id
                    }
                  >
                    {item.name}
                    {' | '}
                    {formatQuantity(item.tempMin, 'temperature', unitSystem)}...
                    {formatQuantity(item.tempMax, 'temperature', unitSystem)}
                  </option>
                )
              )}

            </select>

          </ControlGroup>


          {/* Back-up */}

          <ControlGroup
            label={
              t.backup
            }

            ui={ui}
          >

            <select
              value={
                backupCount
              }

              onChange={
                event =>
                  setBackupCount(
                    Number(
                      event.target.value
                    )
                  )
              }

              className={`
                w-full
                border
                p-2.5
                text-xs
                font-semibold
                ${ui.select}
              `}
            >

              <option value={0}>
                {t.noBackup}
              </option>

              <option value={1}>
                {t.oneBackup}
              </option>

              <option value={2}>
                {t.twoBackup}
              </option>

            </select>

          </ControlGroup>


</div>

                    <button
            type="button"
            onClick={() => {
              if (onPrint) {
                onPrint();
              } else {
                window.print();
              }
            }}

            className="
              w-full
              bg-red-700
              hover:bg-red-600
              text-white
              font-bold
              py-3
              uppercase
              tracking-widest
              text-xs
            "
          >
            {t.export}
          </button>


          {/* ===================================================
              DESKTOP EXAMPLES / ASSISTANT
              =================================================== */}

          <div className="hidden lg:block print:hidden">
            <section
              className={`
                mt-4
                border
                border-red-500/25
                ${ui.card}
                p-4
              `}
            >
              <div className="mb-3">
                <div className="text-[10px] font-black uppercase tracking-[0.16em] text-red-500">
                  {lang === 'ro' ? 'Exemple și preseturi' : 'Examples & presets'}
                </div>
                <p className={`mt-1 text-[10px] leading-5 ${ui.subText}`}>
                  {lang === 'ro'
                    ? 'Puncte de pornire rapide pentru configurarea canalului O-ring.'
                    : 'Quick starting points for O-ring groove setup.'}
                </p>
              </div>

<ExamplePresets
          presets={ORING_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-red-500"
        />
            </section>

            <div className="mt-3">
<details className="draftfit-assistant-compact print:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea etanșării?' : 'Need help choosing a seal?'}
          </summary>

        <section
          className={`
            border
            border-red-500/25
            ${ui.card}
            overflow-hidden
          `}
        >
          <div
            className="
              border-b
              border-red-500/20
              bg-red-500/5
              p-4
              sm:p-5
            "
          >
            <div
              className="
                flex
                flex-col
                gap-2
              "
            >
              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-red-500
                "
              >
                {lang === 'ro'
                  ? 'Asistent selecție etanșare'
                  : 'Seal Selection Assistant'}
              </span>

              <h2
                className={`
                  text-lg
                  font-black
                  ${ui.titleText}
                `}
              >
                {lang === 'ro'
                  ? 'Nu știi de unde să începi?'
                  : 'Not sure where to start?'}
              </h2>

              <p
                className={`
                  text-xs
                  leading-5
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Alege aplicația, regimul și contextul de presiune. DraftFit îți oferă secțiuni O-ring de pornire pentru evaluare — nu o recomandare automată ISO.'
                  : 'Choose the application, duty and pressure context. DraftFit gives you O-ring cross-section starting points to evaluate — not an automatic ISO recommendation.'}
              </p>
            </div>
          </div>

          <div
            className="
              space-y-5
              p-4
              sm:p-5
            "
          >
            <div>
              <span
                className={`
                  mb-2
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  ${ui.subText}
                `}
              >
                1. {lang === 'ro'
                  ? 'Ce etanșezi?'
                  : 'What are you sealing?'}
              </span>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2
                  sm:grid-cols-3
                "
              >
                {[
                  ['piston', lang === 'ro' ? 'Piston' : 'Piston'],
                  ['rod', lang === 'ro' ? 'Tijă' : 'Rod'],
                  ['axial', lang === 'ro' ? 'Față / Flanșă' : 'Face / Flange']
                ].map(
                  ([id, label]) => (
                    <ChoiceButton
                      key={id}
                      active={
                        sealType === id
                      }
                      onClick={() => {
                        setSealType(id);

                        if (id === 'axial') {
                          setDuty('static');
                        }
                      }}
                      isDark={isDark}
                    >
                      {label}
                    </ChoiceButton>
                  )
                )}
              </div>
            </div>

            {sealType !== 'axial' && (
              <div>
                <span
                  className={`
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wider
                    ${ui.subText}
                  `}
                >
                  2. {lang === 'ro'
                    ? 'Există mișcare relativă?'
                    : 'Is there relative motion?'}
                </span>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                  "
                >
                  <ChoiceButton
                    active={
                      duty === 'static'
                    }
                    onClick={() =>
                      setDuty('static')
                    }
                    isDark={isDark}
                  >
                    {lang === 'ro'
                      ? 'Static'
                      : 'Static'}
                  </ChoiceButton>

                  <ChoiceButton
                    active={
                      duty === 'dynamic'
                    }
                    onClick={() =>
                      setDuty('dynamic')
                    }
                    isDark={isDark}
                  >
                    {lang === 'ro'
                      ? 'Dinamic'
                      : 'Dynamic'}
                  </ChoiceButton>
                </div>

                {duty === 'dynamic' && (
                  <p
                    className="
                      mt-2
                      border-l-2
                      border-amber-500
                      pl-3
                      text-[11px]
                      leading-5
                      text-amber-500
                    "
                  >
                    {lang === 'ro'
                      ? 'Aplicațiile dinamice cer verificări suplimentare de rugozitate, lubrifiere, viteză, frecare, uzură și stick-slip.'
                      : 'Dynamic applications require additional checks for surface finish, lubrication, speed, friction, wear and stick-slip.'}
                  </p>
                )}
              </div>
            )}

            <div>
              <span
                className={`
                  mb-2
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  ${ui.subText}
                `}
              >
                {sealType === 'axial' ? '2' : '3'}. {lang === 'ro'
                  ? 'Context de presiune'
                  : 'Pressure context'}
              </span>

              <div
                className="
                  grid
                  grid-cols-3
                  gap-2
                "
              >
                {Object.entries(
                  ASSISTANT_PRESSURE_BANDS
                ).map(
                  ([id, profile]) => (
                    <ChoiceButton
                      key={id}
                      active={
                        assistantPressureBand === id
                      }
                      onClick={() =>
                        setAssistantPressureBand(id)
                      }
                      isDark={isDark}
                    >
                      {profile.label[lang] ||
                        profile.label.en}
                    </ChoiceButton>
                  )
                )}
              </div>
            </div>

            <div>
              <div
                className="
                  mb-2
                  flex
                  flex-wrap
                  items-end
                  justify-between
                  gap-2
                "
              >
                <span
                  className={`
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wider
                    ${ui.subText}
                  `}
                >
                  {sealType === 'axial' ? '3' : '4'}. {lang === 'ro'
                    ? 'Secțiuni de pornire pentru evaluare'
                    : 'Cross-section starting points to evaluate'}
                </span>

                <span
                  className={`
                    text-[10px]
                    font-mono
                    ${ui.subText}
                  `}
                >
                  {lang === 'ro'
                    ? 'Hardware'
                    : 'Hardware'}: {formatQuantity(
                      Number(hardwareDia),
                      'length',
                      unitSystem
                    )}
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2
                  sm:grid-cols-3
                "
              >
                {assistantCrossSections.map(
                  (crossSection) => (
                    <button
                      key={crossSection}
                      type="button"
                      onClick={() =>
                        applyAssistantStartingPoint(
                          crossSection
                        )
                      }
                      className={`
                        min-h-14
                        border
                        px-3
                        py-3
                        text-left
                        transition
                        ${
                          Math.abs(
                            Number(d2) -
                            crossSection
                          ) < 1e-9
                            ? 'border-red-500 bg-red-500/10 text-red-500'
                            : isDark
                              ? 'border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-red-500/60'
                              : 'border-zinc-300 bg-white text-zinc-800 hover:border-red-500/60'
                        }
                      `}
                    >
                      <span
                        className="
                          block
                          font-mono
                          text-sm
                          font-black
                        "
                      >
                        {formatQuantity(
                          crossSection,
                          'length',
                          unitSystem
                        )} CS
                      </span>

                      <span
                        className={`
                          mt-1
                          block
                          text-[10px]
                          leading-4
                          ${ui.subText}
                        `}
                      >
                        {lang === 'ro'
                          ? 'Încarcă punctul de pornire'
                          : 'Load starting point'}
                      </span>
                    </button>
                  )
                )}
              </div>

              <p
                className={`
                  mt-3
                  text-[10px]
                  leading-5
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Assistant-ul folosește euristici DraftFit pentru a crea o geometrie inițială coerentă și a porni verificările. Nu înlocuiește selecția din standard, catalogul producătorului sau analiza compatibilității fluidului.'
                  : 'The assistant uses DraftFit heuristics to create a coherent starting geometry and run the checks. It does not replace controlled-standard selection, manufacturer catalog data or fluid-compatibility review.'}
              </p>
            </div>
          </div>
        </section>

                </details>
            </div>
          </div>

        </div>

      </div>


      {/* ===================================================
          RESULTS
          =================================================== */}

      <div
        className="
          lg:col-span-8
          print:col-span-12
          space-y-7
        "
      >

        {!result.valid ? (

          <div
            className="
              p-6
              border
              border-rose-500/30
              bg-rose-500/10
              text-rose-500
              font-bold
            "
          >
            Date de intrare invalide.
          </div>

        ) : (

          <>

            {/* ===============================================
                PRIMARY DECISION RESULT
                =============================================== */}

            <section
              className={`
                border
                border-l-4
                ${
                  result.overallOK
                    ? 'border-l-emerald-500'
                    : 'border-l-amber-500'
                }
                ${ui.card}
                overflow-hidden
              `}
            >
              <div
                className="
                  p-5
                  sm:p-7
                "
              >
                <div
                  className="
                    flex
                    flex-col
                    gap-4
                    sm:flex-row
                    sm:items-start
                    sm:justify-between
                  "
                >
                  <div>
                    <span
                      className={`
                        block
                        text-[10px]
                        font-black
                        uppercase
                        tracking-[0.18em]
                        ${ui.subText}
                      `}
                    >
                      {lang === 'ro'
                        ? 'Rezultat principal'
                        : 'Primary result'}
                    </span>

                    <h2
                      className={`
                        mt-1
                        text-2xl
                        font-black
                        sm:text-3xl
                        ${ui.titleText}
                      `}
                    >
                      {result.overallOK
                        ? (
                            lang === 'ro'
                              ? 'VERIFICĂRI PRELIMINARE OK'
                              : 'PRELIMINARY CHECKS OK'
                          )
                        : (
                            lang === 'ro'
                              ? 'REVIZUIRE NECESARĂ'
                              : 'REVIEW REQUIRED'
                          )}
                    </h2>

                    <p
                      className={`
                        mt-2
                        max-w-2xl
                        text-sm
                        leading-6
                        ${ui.subText}
                      `}
                    >
                      {primaryResultMessage}
                    </p>
                  </div>

                  <StatusBadge
                    ok={
                      result.overallOK
                    }
                    okText="OK"
                    failText={
                      lang === 'ro'
                        ? 'REVIZUIRE'
                        : 'REVIEW'
                    }
                  />
                </div>

                <div
                  className="
                    mt-6
                    grid
                    grid-cols-2
                    gap-3
                    lg:grid-cols-4
                  "
                >
                  <EngineeringCheck
                    label={t.squeeze}
                    value={`${fmt(
                      result.squeeze,
                      1
                    )} %`}
                    status={
                      result.squeezeStatus
                    }
                    isDark={isDark}
                  />

                  <EngineeringCheck
                    label={t.glandFill}
                    value={`${fmt(
                      result.glandFill,
                      1
                    )} %`}
                    status={
                      result.fillStatus
                    }
                    isDark={isDark}
                  />

                  <EngineeringCheck
                    label={
                      result.circumferentialStrain >= 0
                        ? t.stretch
                        : t.compression
                    }
                    value={`${result.circumferentialStrain >= 0
                      ? '+'
                      : ''
                    }${fmt(
                      result.circumferentialStrain,
                      1
                    )} %`}
                    status={
                      result.strainStatus
                    }
                    isDark={isDark}
                  />

                  <ConditionCard
                    title={t.extrusion}
                    mainValue={
                      result.extrusionRisk.level.toUpperCase()
                    }
                    detail={
                      result.backupEvaluation.recommended
                        ? (
                            lang === 'ro'
                              ? 'Back-up: revizuiește'
                              : 'Back-up: review'
                          )
                        : (
                            lang === 'ro'
                              ? 'Screening preliminar'
                              : 'Preliminary screen'
                          )
                    }
                    status={
                      result.extrusionRisk.level === 'low'
                        ? 'ok'
                        : result.extrusionRisk.level === 'medium'
                          ? 'check'
                          : 'warning'
                    }
                    isDark={isDark}
                  />
                </div>

                {result.cs.customInterpolated && (
                  <div
                    className="
                      mt-5
                      border
                      border-amber-500/30
                      bg-amber-500/5
                      p-4
                      text-xs
                      leading-5
                      text-amber-500
                    "
                  >
                    {lang === 'ro'
                      ? 'Secțiune custom: dimensiunile de canal sunt interpolate între preset-urile DraftFit vecine. Verifică geometria finală în standardul controlat sau catalogul producătorului.'
                      : 'Custom cross-section: groove dimensions are interpolated between neighboring DraftFit presets. Verify the final geometry against the controlled standard or manufacturer catalog.'}
                  </div>
                )}

                {duty === 'dynamic' &&
                  sealType !== 'axial' && (
                    <div
                      className="
                        mt-5
                        border
                        border-amber-500/30
                        bg-amber-500/5
                        p-4
                        text-xs
                        leading-5
                        text-amber-500
                      "
                    >
                      {lang === 'ro'
                        ? 'Aplicație dinamică: rezultatele geometrice nu reprezintă o validare completă a etanșării. Verifică obligatoriu rugozitatea, lubrifierea, viteza, frecarea, uzura și stick-slip.'
                        : 'Dynamic application: the geometry results are not a complete seal validation. Surface finish, lubrication, speed, friction, wear and stick-slip must also be reviewed.'}
                    </div>
                  )}
              </div>
            </section>


            <div className="grid grid-cols-1 gap-2 sm:grid-cols-2 print:hidden">
<ShareCalculationButton
          params={{
            view: experienceMode,
            units: unitSystem,
            type: sealType,
            duty,
            axial: axialDirection,
            hw: hardwareDia,
            d1,
            d2,
            backup: backupCount,
            mat: materialId,
            p: pressureBar,
            gap: radialGap,
            temp: temperature,
          }}
          isDark={isDark}
          lang={lang}
          accentClass="text-red-500"
        />
<CopyResultButton
          text={
            result.valid
              ? [
                  'DraftFit — O-Ring Groove Calculator',
                  `Seal: ${sealType} / ${duty}`,
                  `O-Ring: Ø${formatQuantity(Number(d1), 'length', unitSystem)} × ${formatQuantity(result.cs.d2, 'length', unitSystem)}`,
                  `Groove depth: ${formatQuantity(result.depth, 'length', unitSystem)}`,
                  `Groove width: ${formatQuantity(result.width, 'length', unitSystem)}`,
                  `Groove root diameter: Ø${formatQuantity(result.grooveRootDia, 'length', unitSystem)}`,
                  `Squeeze: ${fmt(result.squeeze, 1)} %`,
                  `Circumferential strain: ${fmt(result.circumferentialStrain, 1)} %`,
                  `Gland fill: ${fmt(result.glandFill, 1)} %`,
                  `Material: ${result.material.name}`,
                  `Preliminary status: ${result.overallOK ? 'CHECK PASSED' : 'REVIEW REQUIRED'}`,
                ].join('\n')
              : 'DraftFit — O-Ring Groove Calculator\nInvalid or unsupported input combination.'
          }
          isDark={isDark}
          lang={lang}
          accentClass="text-red-500"
        />
            </div>


            {/* ===============================================
                HEADER / GEOMETRY
                =============================================== */}

            <div
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
                  items-start
                  gap-4
                  border-b
                  pb-5
                  mb-6
                  ${ui.divider}
                `}
              >

                <div>

                  <span
                    className={`
                      block
                      text-[10px]
                      uppercase
                      tracking-widest
                      font-bold
                      ${ui.subText}
                    `}
                  >
                    {t.results}
                  </span>


                  <span
                    className="
                      block
                      text-3xl
                      font-black
                      font-mono
                      text-red-600
                      mt-1
                    "
                  >
                    O-Ring Ø{formatQuantity(Number(d1), 'length', unitSystem)}
                    {' × '}
                    {formatQuantity(result.cs.d2, 'length', unitSystem)}
                  </span>

                </div>


                <StatusBadge
                  ok={
                    result.overallOK
                  }

                  okText={
                    t.preliminary
                  }

                  failText={
                    t.check
                  }
                />

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  lg:grid-cols-4
                  gap-4
                "
              >

                <Metric
                  label={
                    t.grooveDepth
                  }

                  value={
                    formatQuantity(result.depth, 'length', unitSystem)
                  }

                  ui={ui}
                />


                <Metric
                  label={
                    t.grooveWidth
                  }

                  value={
                    formatQuantity(result.width, 'length', unitSystem)
                  }

                  ui={ui}
                />


                <Metric
                  label={
                    t.grooveDia
                  }

                  value={
                    `Ø${formatQuantity(result.grooveRootDia, 'length', unitSystem)}`
                  }

                  ui={ui}
                />


                <Metric
                  label="Material"
                  value={
                    result.material.name
                  }
                  ui={ui}
                />

              </div>


              <div
                className={`
                  mt-4
                  p-3
                  border
                  text-xs
                  font-mono
                  ${ui.subCard}
                  ${ui.subText}
                `}
              >
                r₁ ≈ {formatQuantity(result.cs.rBottom, 'length', unitSystem)}
                {'   |   '}
                r₂ ≈ {formatQuantity(result.cs.rEdge, 'length', unitSystem)}
                {'   |   '}
                lead-in ≈ {formatQuantity(result.cs.leadIn, 'length', unitSystem)}
              </div>

            </div>


            {/* ===============================================
                SEAL GEOMETRY
                =============================================== */}

            <div
              className={`
                p-5
                sm:p-8
                border
                ${ui.card}
              `}
            >

              <h3
                className={`
                  text-[10px]
                  uppercase
                  tracking-widest
                  font-bold
                  mb-5
                  ${ui.titleText}
                `}
              >
                Seal Integrity Analytics
              </h3>


              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-5
                "
              >

                <EngineeringCheck
                  label={
                    t.squeeze
                  }

                  value={
                    `${fmt(
                      result.squeeze,
                      1
                    )} %`
                  }

                  status={
                    result.squeezeStatus
                  }

                  isDark={
                    isDark
                  }
                />


                <EngineeringCheck
                  label={
                    result.circumferentialStrain >= 0
                      ? t.stretch
                      : t.compression
                  }

                  value={
                    `${result.circumferentialStrain >= 0
                      ? '+'
                      : ''
                    }${fmt(
                      result.circumferentialStrain,
                      1
                    )} %`
                  }

                  status={
                    result.strainStatus
                  }

                  isDark={
                    isDark
                  }
                />


                <EngineeringCheck
                  label={
                    t.glandFill
                  }

                  value={
                    `${fmt(
                      result.glandFill,
                      1
                    )} %`
                  }

                  status={
                    result.fillStatus
                  }

                  isDark={
                    isDark
                  }
                />

              </div>

            </div>


            {/* ===============================================
                OPERATING CONDITIONS
                =============================================== */}

            <div
              className={`
                p-5
                sm:p-8
                border
                ${ui.card}
              `}
            >

              <h3
                className={`
                  text-[10px]
                  uppercase
                  tracking-widest
                  font-bold
                  mb-5
                  ${ui.titleText}
                `}
              >
                Operating Condition Checks
              </h3>


              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-5
                "
              >

                {/* Extrusion */}

                <ConditionCard
                  title={
                    t.extrusion
                  }

                  mainValue={
                    result.extrusionRisk.level.toUpperCase()
                  }

                  detail={
                    `${formatQuantity(Number(pressureBar), 'pressureBar', unitSystem)} | gap ${formatQuantity(Number(radialGap), 'length', unitSystem)}`
                  }

                  status={
                    result.extrusionRisk.level === 'low'
                      ? 'ok'
                      : result.extrusionRisk.level === 'medium'
                        ? 'check'
                        : 'warning'
                  }

                  isDark={
                    isDark
                  }
                />


                {/* Backup */}

                <ConditionCard
                  title={
                    t.backupRecommendation
                  }

                  mainValue={
                    result.backupEvaluation.recommended
                      ? t.required
                      : t.notRequired
                  }

                  detail={
                    result.backupEvaluation.recommended
                      ? `${result.backupEvaluation.recommendedCount} × back-up`
                      : '—'
                  }

                  status={
                    result.backupEvaluation.adequate
                      ? 'ok'
                      : 'warning'
                  }

                  isDark={
                    isDark
                  }
                />


                {/* Temperature */}

                <ConditionCard
                  title={
                    t.temperatureCheck
                  }

                  mainValue={
                    formatQuantity(Number(temperature), 'temperature', unitSystem)
                  }

                  detail={
                    `${formatQuantity(result.material.tempMin, 'temperature', unitSystem)} ... ${formatQuantity(result.material.tempMax, 'temperature', unitSystem)}`
                  }

                  status={
                    result.temperatureOK
                      ? 'ok'
                      : 'warning'
                  }

                  isDark={
                    isDark
                  }
                />

              </div>

            </div>


            {/* ===============================================
                TECHNICAL SCHEMATIC
                =============================================== */}

            <div
              className={`
                p-5
                sm:p-8
                border
                ${ui.card}
              `}
            >

              <h3
                className={`
                  text-[10px]
                  uppercase
                  tracking-widest
                  font-bold
                  mb-6
                  ${ui.titleText}
                `}
              >
                {t.schematic}
              </h3>


              <div
                className={`
                  p-5
                  border
                  ${ui.subCard}
                `}
              >

                {sealType === 'piston' && (

                  <PistonSchematic
                    unitSystem={unitSystem}

                    isDark={
                      isDark
                    }

                    d2={
                      result.cs.d2
                    }

                    depth={
                      result.depth
                    }

                    width={
                      result.width
                    }

                    gap={
                      radialGap
                    }

                    backupCount={
                      backupCount
                    }
                  />
                )}


                {sealType === 'rod' && (

                  <RodSchematic
                    unitSystem={unitSystem}

                    isDark={
                      isDark
                    }

                    d2={
                      result.cs.d2
                    }

                    depth={
                      result.depth
                    }

                    width={
                      result.width
                    }

                    gap={
                      radialGap
                    }

                    backupCount={
                      backupCount
                    }
                  />
                )}


                {sealType === 'axial' && (

                  <AxialSchematic
                    unitSystem={unitSystem}

                    isDark={
                      isDark
                    }

                    d2={
                      result.cs.d2
                    }

                    depth={
                      result.depth
                    }

                    width={
                      result.width
                    }

                    direction={
                      axialDirection
                    }

                    backupCount={
                      backupCount
                    }
                  />
                )}

              </div>

            </div>


            <section className={`border ${ui.card} p-4 sm:p-5 print:hidden lg:hidden`}>
              <div className="mb-4">
                <div className={`text-[10px] font-black uppercase tracking-[0.16em] ${ui.subText}`}>
                  {lang === 'ro' ? 'Ajutor opțional' : 'Optional guidance'}
                </div>
                <h3 className={`mt-1 text-lg font-black ${ui.titleText}`}>
                  {lang === 'ro' ? 'Ai nevoie de ajutor sau de un exemplu?' : 'Need help or an example?'}
                </h3>
                <p className={`mt-1 text-xs leading-5 ${ui.subText}`}>
                  {lang === 'ro'
                    ? 'Inputurile și rezultatul principal sunt deja mai sus. Deschide aceste opțiuni doar dacă ai nevoie de un punct de pornire.'
                    : 'The core inputs and primary result are already above. Open these options only when you need a starting point.'}
                </p>
              </div>

<details className="draftfit-assistant-compact print:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea etanșării?' : 'Need help choosing a seal?'}
          </summary>

        <section
          className={`
            border
            border-red-500/25
            ${ui.card}
            overflow-hidden
          `}
        >
          <div
            className="
              border-b
              border-red-500/20
              bg-red-500/5
              p-4
              sm:p-5
            "
          >
            <div
              className="
                flex
                flex-col
                gap-2
              "
            >
              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.18em]
                  text-red-500
                "
              >
                {lang === 'ro'
                  ? 'Asistent selecție etanșare'
                  : 'Seal Selection Assistant'}
              </span>

              <h2
                className={`
                  text-lg
                  font-black
                  ${ui.titleText}
                `}
              >
                {lang === 'ro'
                  ? 'Nu știi de unde să începi?'
                  : 'Not sure where to start?'}
              </h2>

              <p
                className={`
                  text-xs
                  leading-5
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Alege aplicația, regimul și contextul de presiune. DraftFit îți oferă secțiuni O-ring de pornire pentru evaluare — nu o recomandare automată ISO.'
                  : 'Choose the application, duty and pressure context. DraftFit gives you O-ring cross-section starting points to evaluate — not an automatic ISO recommendation.'}
              </p>
            </div>
          </div>

          <div
            className="
              space-y-5
              p-4
              sm:p-5
            "
          >
            <div>
              <span
                className={`
                  mb-2
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  ${ui.subText}
                `}
              >
                1. {lang === 'ro'
                  ? 'Ce etanșezi?'
                  : 'What are you sealing?'}
              </span>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2
                  sm:grid-cols-3
                "
              >
                {[
                  ['piston', lang === 'ro' ? 'Piston' : 'Piston'],
                  ['rod', lang === 'ro' ? 'Tijă' : 'Rod'],
                  ['axial', lang === 'ro' ? 'Față / Flanșă' : 'Face / Flange']
                ].map(
                  ([id, label]) => (
                    <ChoiceButton
                      key={id}
                      active={
                        sealType === id
                      }
                      onClick={() => {
                        setSealType(id);

                        if (id === 'axial') {
                          setDuty('static');
                        }
                      }}
                      isDark={isDark}
                    >
                      {label}
                    </ChoiceButton>
                  )
                )}
              </div>
            </div>

            {sealType !== 'axial' && (
              <div>
                <span
                  className={`
                    mb-2
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wider
                    ${ui.subText}
                  `}
                >
                  2. {lang === 'ro'
                    ? 'Există mișcare relativă?'
                    : 'Is there relative motion?'}
                </span>

                <div
                  className="
                    grid
                    grid-cols-2
                    gap-2
                  "
                >
                  <ChoiceButton
                    active={
                      duty === 'static'
                    }
                    onClick={() =>
                      setDuty('static')
                    }
                    isDark={isDark}
                  >
                    {lang === 'ro'
                      ? 'Static'
                      : 'Static'}
                  </ChoiceButton>

                  <ChoiceButton
                    active={
                      duty === 'dynamic'
                    }
                    onClick={() =>
                      setDuty('dynamic')
                    }
                    isDark={isDark}
                  >
                    {lang === 'ro'
                      ? 'Dinamic'
                      : 'Dynamic'}
                  </ChoiceButton>
                </div>

                {duty === 'dynamic' && (
                  <p
                    className="
                      mt-2
                      border-l-2
                      border-amber-500
                      pl-3
                      text-[11px]
                      leading-5
                      text-amber-500
                    "
                  >
                    {lang === 'ro'
                      ? 'Aplicațiile dinamice cer verificări suplimentare de rugozitate, lubrifiere, viteză, frecare, uzură și stick-slip.'
                      : 'Dynamic applications require additional checks for surface finish, lubrication, speed, friction, wear and stick-slip.'}
                  </p>
                )}
              </div>
            )}

            <div>
              <span
                className={`
                  mb-2
                  block
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  ${ui.subText}
                `}
              >
                {sealType === 'axial' ? '2' : '3'}. {lang === 'ro'
                  ? 'Context de presiune'
                  : 'Pressure context'}
              </span>

              <div
                className="
                  grid
                  grid-cols-3
                  gap-2
                "
              >
                {Object.entries(
                  ASSISTANT_PRESSURE_BANDS
                ).map(
                  ([id, profile]) => (
                    <ChoiceButton
                      key={id}
                      active={
                        assistantPressureBand === id
                      }
                      onClick={() =>
                        setAssistantPressureBand(id)
                      }
                      isDark={isDark}
                    >
                      {profile.label[lang] ||
                        profile.label.en}
                    </ChoiceButton>
                  )
                )}
              </div>
            </div>

            <div>
              <div
                className="
                  mb-2
                  flex
                  flex-wrap
                  items-end
                  justify-between
                  gap-2
                "
              >
                <span
                  className={`
                    block
                    text-[10px]
                    font-black
                    uppercase
                    tracking-wider
                    ${ui.subText}
                  `}
                >
                  {sealType === 'axial' ? '3' : '4'}. {lang === 'ro'
                    ? 'Secțiuni de pornire pentru evaluare'
                    : 'Cross-section starting points to evaluate'}
                </span>

                <span
                  className={`
                    text-[10px]
                    font-mono
                    ${ui.subText}
                  `}
                >
                  {lang === 'ro'
                    ? 'Hardware'
                    : 'Hardware'}: {formatQuantity(
                      Number(hardwareDia),
                      'length',
                      unitSystem
                    )}
                </span>
              </div>

              <div
                className="
                  grid
                  grid-cols-1
                  gap-2
                  sm:grid-cols-3
                "
              >
                {assistantCrossSections.map(
                  (crossSection) => (
                    <button
                      key={crossSection}
                      type="button"
                      onClick={() =>
                        applyAssistantStartingPoint(
                          crossSection
                        )
                      }
                      className={`
                        min-h-14
                        border
                        px-3
                        py-3
                        text-left
                        transition
                        ${
                          Math.abs(
                            Number(d2) -
                            crossSection
                          ) < 1e-9
                            ? 'border-red-500 bg-red-500/10 text-red-500'
                            : isDark
                              ? 'border-zinc-700 bg-zinc-950 text-zinc-200 hover:border-red-500/60'
                              : 'border-zinc-300 bg-white text-zinc-800 hover:border-red-500/60'
                        }
                      `}
                    >
                      <span
                        className="
                          block
                          font-mono
                          text-sm
                          font-black
                        "
                      >
                        {formatQuantity(
                          crossSection,
                          'length',
                          unitSystem
                        )} CS
                      </span>

                      <span
                        className={`
                          mt-1
                          block
                          text-[10px]
                          leading-4
                          ${ui.subText}
                        `}
                      >
                        {lang === 'ro'
                          ? 'Încarcă punctul de pornire'
                          : 'Load starting point'}
                      </span>
                    </button>
                  )
                )}
              </div>

              <p
                className={`
                  mt-3
                  text-[10px]
                  leading-5
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Assistant-ul folosește euristici DraftFit pentru a crea o geometrie inițială coerentă și a porni verificările. Nu înlocuiește selecția din standard, catalogul producătorului sau analiza compatibilității fluidului.'
                  : 'The assistant uses DraftFit heuristics to create a coherent starting geometry and run the checks. It does not replace controlled-standard selection, manufacturer catalog data or fluid-compatibility review.'}
              </p>
            </div>
          </div>
        </section>

                </details>

              <details className="mt-3 print:hidden">
                <summary className={`cursor-pointer border px-4 py-3 text-xs font-black uppercase tracking-wider ${ui.subCard}`}>
                  {lang === 'ro' ? 'Exemple și preseturi' : 'Examples & presets'}
                </summary>
                <div className="mt-3">
<ExamplePresets
          presets={ORING_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-red-500"
        />
                </div>
              </details>
            </section>


            {/* ===============================================
                NOTES
                =============================================== */}

            <div
              className={`
                p-5
                sm:p-8
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
                {t.engineeringNotes}
              </h3>


              <div
                className={`
                  space-y-3
                  text-sm
                  leading-relaxed
                  ${ui.subText}
                `}
              >

                <p
                  className={`
                    font-semibold
                    ${isDark ? 'text-zinc-300' : 'text-zinc-700'}
                  `}
                >
                  {t.standardsBasis}
                </p>

                <p>
                  • {t.note1}
                </p>

                <p>
                  • {t.note2}
                </p>

                <p>
                  • {t.note3}
                </p>

                <p>
                  • {t.note4}
                </p>

                <p>
                  • {t.note5}
                </p>

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}


/* =========================================================
   UI COMPONENTS
   ========================================================= */

function ControlGroup({
  label,
  children,
  ui
}) {
  return (
    <div>

      <label
        className={`
          block
          text-[10px]
          uppercase
          font-bold
          tracking-widest
          mb-2
          ${ui.subText}
        `}
      >
        {label}
      </label>

      <div className="space-y-2">
        {children}
      </div>

    </div>
  );
}


function ChoiceButton({
  active,
  onClick,
  children,
  isDark
}) {
  return (
    <button
      type="button"

      onClick={
        onClick
      }

      className={`
        w-full
        text-left
        p-2.5
        border
        text-xs
        font-bold
        transition-colors

        ${
          active
            ? 'bg-red-900/30 border-red-700 text-red-500'

            : isDark
              ? 'bg-zinc-900 border-zinc-800 text-zinc-300 hover:border-zinc-600'

              : 'bg-white border-zinc-200 text-zinc-700 hover:border-zinc-400'
        }
      `}
    >
      {children}
    </button>
  );
}


function NumberInput({
  label,
  value,
  setValue,
  step = 'any',
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
          uppercase
          font-bold
          tracking-widest
          mb-2
          ${ui.subText}
        `}
      >
        {label}
      </label>


      <input
        type="number"

        step={
          step
        }

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
          border-b-2
          border-t-0
          border-l-0
          border-r-0
          p-3
          text-xl
          font-bold
          font-mono
          text-center
          bg-transparent
          ${ui.input}
        `}
      />

    </div>
  );
}


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
        border-l-4
        border-l-red-600
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
          ${ui.subText}
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
          ${ui.titleText}
        `}
      >
        {value}
      </span>

    </div>
  );
}


function StatusBadge({
  ok,
  okText,
  failText
}) {
  return (
    <span
      className={`
        px-3
        py-1.5
        border
        text-[10px]
        uppercase
        tracking-widest
        font-black

        ${
          ok
            ? 'bg-emerald-500/10 border-emerald-500/30 text-emerald-500'
            : 'bg-amber-500/10 border-amber-500/30 text-amber-500'
        }
      `}
    >
      {ok
        ? okText
        : failText}
    </span>
  );
}


function EngineeringCheck({
  label,
  value,
  status,
  isDark
}) {
  const ok =
    status === 'ok';


  return (
    <div
      className={`
        p-5
        border

        ${
          ok
            ? isDark
              ? 'bg-emerald-500/5 border-emerald-500/30'
              : 'bg-emerald-50 border-emerald-200'

            : isDark
              ? 'bg-amber-500/5 border-amber-500/30'
              : 'bg-amber-50 border-amber-200'
        }
      `}
    >

      <span
        className="
          block
          text-[10px]
          uppercase
          tracking-widest
          font-bold
          opacity-70
          mb-2
        "
      >
        {label}
      </span>


      <span
        className={`
          text-2xl
          font-black
          font-mono

          ${
            ok
              ? 'text-emerald-500'
              : 'text-amber-500'
          }
        `}
      >
        {value}
      </span>


      <span
        className={`
          block
          mt-2
          text-[9px]
          uppercase
          font-black

          ${
            ok
              ? 'text-emerald-500'
              : 'text-amber-500'
          }
        `}
      >
        {ok
          ? 'OK'
          : 'CHECK'}
      </span>

    </div>
  );
}


function ConditionCard({
  title,
  mainValue,
  detail,
  status,
  isDark
}) {
  const className =
    status === 'ok'
      ? isDark
        ? 'border-emerald-500/30 bg-emerald-500/5'
        : 'border-emerald-200 bg-emerald-50'

      : status === 'warning'
        ? isDark
          ? 'border-rose-500/30 bg-rose-500/5'
          : 'border-rose-200 bg-rose-50'

        : isDark
          ? 'border-amber-500/30 bg-amber-500/5'
          : 'border-amber-200 bg-amber-50';


  return (
    <div
      className={`
        p-5
        border
        ${className}
      `}
    >

      <span
        className="
          block
          text-[9px]
          uppercase
          tracking-widest
          font-bold
          opacity-70
          mb-2
        "
      >
        {title}
      </span>


      <span
        className="
          block
          text-lg
          font-black
          font-mono
        "
      >
        {mainValue}
      </span>


      <span
        className="
          block
          mt-2
          text-[10px]
          font-mono
          opacity-70
        "
      >
        {detail}
      </span>

    </div>
  );
}


/* =========================================================
   SCHEMATICS
   ========================================================= */

function PistonSchematic({
  unitSystem,
  isDark,
  d2,
  depth,
  width,
  gap,
  backupCount
}) {
  const metal =
    isDark
      ? '#27272a'
      : '#e4e4e7';

  const stroke =
    isDark
      ? '#71717a'
      : '#71717a';


  return (
    <svg
      viewBox="0 0 620 250"
      className="w-full h-64"
    >

      {/* Cylinder */}

      <rect
        x="50"
        y="25"
        width="520"
        height="45"
        fill={metal}
        stroke={stroke}
        strokeWidth="2"
      />


      {/* Piston */}

      <path
        d="
          M 70 200
          L 70 90
          L 225 90
          L 225 145
          L 395 145
          L 395 90
          L 550 90
          L 550 200
          Z
        "
        fill={
          isDark
            ? '#18181b'
            : '#fafafa'
        }
        stroke={stroke}
        strokeWidth="2"
      />


      {/* O-ring */}

      <ellipse
        cx="310"
        cy="110"
        rx="55"
        ry="32"
        fill="#b91c1c"
        fillOpacity="0.78"
        stroke="#991b1b"
        strokeWidth="2"
      />


      {/* Backup rings */}

      {backupCount >= 1 && (
        <rect
          x="370"
          y="78"
          width="20"
          height="66"
          fill="#d97706"
          fillOpacity="0.85"
        />
      )}


      {backupCount >= 2 && (
        <rect
          x="230"
          y="78"
          width="20"
          height="66"
          fill="#d97706"
          fillOpacity="0.85"
        />
      )}


      <text
        x="310"
        y="115"
        fill="white"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="bold"
      >
        d₂ = {formatQuantity(d2, 'length', unitSystem)}
      </text>


      <text
        x="310"
        y="180"
        fill="#b91c1c"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        b = {formatQuantity(width, 'length', unitSystem)}
      </text>


      <text
        x="440"
        y="125"
        fill="#b91c1c"
        fontSize="12"
        fontFamily="monospace"
      >
        t = {formatQuantity(depth, 'length', unitSystem)}
      </text>


      <text
        x="440"
        y="145"
        fill="#d97706"
        fontSize="11"
        fontFamily="monospace"
      >
        gap = {formatQuantity(Number(gap), 'length', unitSystem)}
      </text>

    </svg>
  );
}


function RodSchematic({
  unitSystem,
  isDark,
  d2,
  depth,
  width,
  gap,
  backupCount
}) {
  const metal =
    isDark
      ? '#27272a'
      : '#e4e4e7';

  const stroke =
    isDark
      ? '#71717a'
      : '#71717a';


  return (
    <svg
      viewBox="0 0 620 250"
      className="w-full h-64"
    >

      {/* Housing */}

      <path
        d="
          M 50 30
          L 570 30
          L 570 210
          L 400 210
          L 400 155
          L 220 155
          L 220 210
          L 50 210
          Z
        "
        fill={metal}
        stroke={stroke}
        strokeWidth="2"
      />


      {/* Rod */}

      <rect
        x="70"
        y="95"
        width="480"
        height="55"
        fill={
          isDark
            ? '#18181b'
            : '#fafafa'
        }
        stroke={stroke}
        strokeWidth="2"
      />


      {/* O-ring */}

      <ellipse
        cx="310"
        cy="155"
        rx="55"
        ry="32"
        fill="#b91c1c"
        fillOpacity="0.78"
        stroke="#991b1b"
        strokeWidth="2"
      />


      {backupCount >= 1 && (
        <rect
          x="370"
          y="130"
          width="20"
          height="55"
          fill="#d97706"
        />
      )}


      {backupCount >= 2 && (
        <rect
          x="230"
          y="130"
          width="20"
          height="55"
          fill="#d97706"
        />
      )}


      <text
        x="310"
        y="160"
        fill="white"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="bold"
      >
        d₂ = {formatQuantity(d2, 'length', unitSystem)}
      </text>


      <text
        x="310"
        y="225"
        fill="#b91c1c"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        b = {formatQuantity(width, 'length', unitSystem)}
      </text>


      <text
        x="430"
        y="180"
        fill="#b91c1c"
        fontSize="12"
        fontFamily="monospace"
      >
        t = {formatQuantity(depth, 'length', unitSystem)}
      </text>


      <text
        x="430"
        y="198"
        fill="#d97706"
        fontSize="11"
        fontFamily="monospace"
      >
        gap = {formatQuantity(Number(gap), 'length', unitSystem)}
      </text>

    </svg>
  );
}


function AxialSchematic({
  unitSystem,
  isDark,
  d2,
  depth,
  width,
  direction,
  backupCount
}) {
  const metal =
    isDark
      ? '#27272a'
      : '#e4e4e7';

  const stroke =
    isDark
      ? '#71717a'
      : '#71717a';


  return (
    <svg
      viewBox="0 0 620 250"
      className="w-full h-64"
    >

      {/* Upper flange */}

      <rect
        x="70"
        y="35"
        width="480"
        height="55"
        fill={metal}
        stroke={stroke}
        strokeWidth="2"
      />


      {/* Lower flange */}

      <path
        d="
          M 70 205
          L 70 105
          L 230 105
          L 230 155
          L 390 155
          L 390 105
          L 550 105
          L 550 205
          Z
        "
        fill={
          isDark
            ? '#18181b'
            : '#fafafa'
        }
        stroke={stroke}
        strokeWidth="2"
      />


      {/* O-ring */}

      <ellipse
        cx="310"
        cy="115"
        rx="54"
        ry="31"
        fill="#b91c1c"
        fillOpacity="0.78"
        stroke="#991b1b"
        strokeWidth="2"
      />


      {backupCount >= 1 && (
        <rect
          x={
            direction === 'internal'
              ? 365
              : 235
          }
          y="92"
          width="18"
          height="58"
          fill="#d97706"
        />
      )}


      {backupCount >= 2 && (
        <>
          <rect
            x="365"
            y="92"
            width="18"
            height="58"
            fill="#d97706"
          />

          <rect
            x="235"
            y="92"
            width="18"
            height="58"
            fill="#d97706"
          />
        </>
      )}


      {/* Pressure arrow */}

      <line
        x1={
          direction === 'internal'
            ? 150
            : 470
        }
        y1="175"
        x2={
          direction === 'internal'
            ? 230
            : 390
        }
        y2="175"
        stroke="#2563eb"
        strokeWidth="3"
      />


      <polygon
        points={
          direction === 'internal'
            ? '230,175 216,168 216,182'
            : '390,175 404,168 404,182'
        }
        fill="#2563eb"
      />


      <text
        x="310"
        y="120"
        fill="white"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
        fontWeight="bold"
      >
        d₂ = {formatQuantity(d2, 'length', unitSystem)}
      </text>


      <text
        x="310"
        y="220"
        fill="#b91c1c"
        fontSize="12"
        textAnchor="middle"
        fontFamily="monospace"
      >
        b = {formatQuantity(width, 'length', unitSystem)} | t = {formatQuantity(depth, 'length', unitSystem)}
      </text>

    </svg>
  );
}