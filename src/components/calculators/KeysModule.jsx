import React, { useMemo, useState } from 'react';

/*
  PARALLEL KEY / KEYWAY MODULE
  ===========================

  DIMENSIONAL PART:
  - Parallel-key nominal geometry based on the implemented
    DIN 6885-1 dimensional series.

  MECHANICAL PART:
  - Simplified engineering verification of:
      1. tangential force;
      2. key shear;
      3. flank/contact pressure.
  - This simplified verification is NOT a complete
    implementation of DIN 6892.

  IMPORTANT ENGINEERING NOTES:
  - DIN 6885 dimensional geometry and mechanical load-capacity
    verification must not be treated as the same calculation.
  - Actual permissible stresses/pressures depend on materials,
    load spectrum, operating conditions, hub/shaft geometry,
    manufacturing quality and the applicable design method.
*/


/* =========================================================
   DIN 6885-1 DIMENSIONAL SERIES — IMPLEMENTED RANGE
   ========================================================= */

const KEY_STANDARDS = [
  {
    dMin: 6,
    dMax: 8,
    b: 2,
    h: 2,
    t1: 1.2,
    t2: 1.0
  },
  {
    dMin: 8,
    dMax: 10,
    b: 3,
    h: 3,
    t1: 1.8,
    t2: 1.4
  },
  {
    dMin: 10,
    dMax: 12,
    b: 4,
    h: 4,
    t1: 2.5,
    t2: 1.8
  },
  {
    dMin: 12,
    dMax: 17,
    b: 5,
    h: 5,
    t1: 3.0,
    t2: 2.3
  },
  {
    dMin: 17,
    dMax: 22,
    b: 6,
    h: 6,
    t1: 3.5,
    t2: 2.8
  },
  {
    dMin: 22,
    dMax: 30,
    b: 8,
    h: 7,
    t1: 4.0,
    t2: 3.3
  },
  {
    dMin: 30,
    dMax: 38,
    b: 10,
    h: 8,
    t1: 5.0,
    t2: 3.3
  },
  {
    dMin: 38,
    dMax: 44,
    b: 12,
    h: 8,
    t1: 5.0,
    t2: 3.3
  },
  {
    dMin: 44,
    dMax: 50,
    b: 14,
    h: 9,
    t1: 5.5,
    t2: 3.8
  },
  {
    dMin: 50,
    dMax: 58,
    b: 16,
    h: 10,
    t1: 6.0,
    t2: 4.3
  },
  {
    dMin: 58,
    dMax: 65,
    b: 18,
    h: 11,
    t1: 7.0,
    t2: 4.4
  },
  {
    dMin: 65,
    dMax: 75,
    b: 20,
    h: 12,
    t1: 7.5,
    t2: 4.9
  },
  {
    dMin: 75,
    dMax: 85,
    b: 22,
    h: 14,
    t1: 9.0,
    t2: 5.4
  },
  {
    dMin: 85,
    dMax: 95,
    b: 25,
    h: 14,
    t1: 9.0,
    t2: 5.4
  },
  {
    dMin: 95,
    dMax: 110,
    b: 28,
    h: 16,
    t1: 10.0,
    t2: 6.4
  },
  {
    dMin: 110,
    dMax: 130,
    b: 32,
    h: 18,
    t1: 11.0,
    t2: 7.4
  }
];


/* =========================================================
   PREFERRED / STANDARD LENGTH SERIES

   Used only to propose the next available nominal length.

   The mechanical calculation itself uses effective load
   carrying length, not blindly the nominal key length.
   ========================================================= */

const STANDARD_LENGTHS = [
  6, 8, 10, 12, 14, 16, 18, 20,
  22, 25, 28, 32, 36, 40, 45, 50,
  56, 63, 70, 80, 90, 100, 110,
  125, 140, 160, 180, 200, 220,
  250, 280, 320, 360, 400, 450, 500
];


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const TRANSLATIONS = {
  en: {
    configTitle:
      '1. Shaft, Torque & Strength Parameters',

    shaftDia:
      'Shaft diameter d (mm)',

    torqueInput:
      'Transmitted torque T (N·m)',

    allowablePress:
      'Allowable contact pressure p_allow (MPa)',

    allowableShear:
      'Allowable key shear stress τ_allow (MPa)',

    actualLength:
      'Selected nominal key length L (mm)',

    resultsTitle:
      'Parallel Key Geometry & Preliminary Verification',

    keyDims:
      'Key section b × h',

    shaftSlot:
      'Shaft keyway depth t₁',

    hubSlot:
      'Hub keyway depth t₂',

    clearance:
      'Radial top clearance',

    tangentialForce:
      'Tangential force Fₜ',

    effectiveLength:
      'Effective bearing length',

    minLengthPressure:
      'Minimum effective length — pressure',

    minLengthShear:
      'Minimum effective length — shear',

    governingLength:
      'Governing minimum length',

    recommendedLength:
      'Recommended nominal length',

    pressureActual:
      'Calculated contact pressure',

    shearActual:
      'Calculated shear stress',

    pressureUtil:
      'Pressure utilization',

    shearUtil:
      'Shear utilization',

    governing:
      'Governing criterion',

    pressure:
      'Contact pressure',

    shear:
      'Key shear',

    safeTag:
      'PRELIMINARY OK',

    overloadTag:
      'NOT OK',

    invalid:
      'INVALID INPUT',

    outOfRange:
      'Shaft diameter is outside the implemented DIN 6885-1 range (6 < d ≤ 130 mm).',

    lengthTooShort:
      'Selected key length is shorter than the calculated minimum requirement.',

    svgTitle:
      '2D SHAFT–KEY–HUB CROSS-SECTION',

    exportBtn:
      'PRINT / EXPORT TECHNICAL SHEET',

    svgKey:
      'Key',

    mechanicalCheckTitle:
      'Preliminary Mechanical Verification',

    lengthSizingTitle:
      'Key Length Sizing',

    standardBasisTitle:
      'Engineering Basis',

    standardBasisText:
      'Nominal key and keyway geometry follows the implemented DIN 6885-1:2021-11 deep-pattern series. The load-capacity check below is a simplified static screening calculation and is not a complete DIN 6892:2025-10 calculation.',

    calcLabel:
      'CALC',

    allowLabel:
      'ALLOW',

    utilizationLabel:
      'Utilization',

    okLabel:
      'OK',

    notOkLabel:
      'NOT OK',

    engineeringNotes:
      'Engineering Notes',

    note1:
      'DIN 6885-1:2021-11 dimensional selection does not by itself verify the load capacity of the key connection.',

    note2:
      'The stress calculation shown here is a simplified static engineering check and is not a complete DIN 6892:2025-10 calculation.',

    note3:
      'Allowable pressure and shear stress must be selected from the actual key, shaft and hub materials and from the applicable design method.',

    note4:
      'For reversing, shock, fatigue or highly loaded drives, additional factors and shaft/hub fatigue checks are required.'
  },

  ro: {
    configTitle:
      '1. Parametri Arbore, Cuplu & Rezistență',

    shaftDia:
      'Diametru arbore d (mm)',

    torqueInput:
      'Moment transmis T (N·m)',

    allowablePress:
      'Presiune admisibilă de contact p_adm (MPa)',

    allowableShear:
      'Tensiune tangențială admisibilă pană τ_adm (MPa)',

    actualLength:
      'Lungime nominală pană aleasă L (mm)',

    resultsTitle:
      'Geometrie Pană Paralelă & Verificare Preliminară',

    keyDims:
      'Secțiune pană b × h',

    shaftSlot:
      'Adâncime canal arbore t₁',

    hubSlot:
      'Adâncime canal butuc t₂',

    clearance:
      'Joc radial la fundul canalului',

    tangentialForce:
      'Forță tangențială Fₜ',

    effectiveLength:
      'Lungime portantă efectivă',

    minLengthPressure:
      'Lungime efectivă minimă — presiune',

    minLengthShear:
      'Lungime efectivă minimă — forfecare',

    governingLength:
      'Lungime minimă determinantă',

    recommendedLength:
      'Lungime nominală recomandată',

    pressureActual:
      'Presiune de contact calculată',

    shearActual:
      'Tensiune de forfecare calculată',

    pressureUtil:
      'Grad utilizare la contact',

    shearUtil:
      'Grad utilizare la forfecare',

    governing:
      'Criteriu determinant',

    pressure:
      'Presiune de contact',

    shear:
      'Forfecare pană',

    safeTag:
      'PRELIMINAR ADMISIBIL',

    overloadTag:
      'NEADMISIBIL',

    invalid:
      'DATE INVALIDE',

    outOfRange:
      'Diametrul arborelui este în afara domeniului DIN 6885-1 implementat (6 < d ≤ 130 mm).',

    lengthTooShort:
      'Lungimea de pană selectată este mai mică decât necesarul calculat.',

    svgTitle:
      'SCHIȚĂ 2D ARBORE–PANĂ–BUTUC',

    exportBtn:
      'TIPĂREȘTE / EXPORTĂ FIȘĂ TEHNICĂ',

    svgKey:
      'Pană',

    mechanicalCheckTitle:
      'Verificare Mecanică Preliminară',

    lengthSizingTitle:
      'Dimensionarea Lungimii Penei',

    standardBasisTitle:
      'Bază Tehnică',

    standardBasisText:
      'Geometria nominală a penei și canalelor urmează seria implementată DIN 6885-1:2021-11, forma înaltă. Verificarea de capacitate portantă de mai jos este un screening static simplificat și nu reprezintă un calcul complet conform DIN 6892:2025-10.',

    calcLabel:
      'CALC',

    allowLabel:
      'ADM',

    utilizationLabel:
      'Grad utilizare',

    okLabel:
      'OK',

    notOkLabel:
      'NEADMISIBIL',

    engineeringNotes:
      'Observații inginerești',

    note1:
      'Alegerea dimensională conform DIN 6885-1:2021-11 nu verifică singură capacitatea portantă a îmbinării cu pană.',

    note2:
      'Calculul de rezistență prezentat este o verificare statică simplificată și nu reprezintă o implementare completă DIN 6892:2025-10.',

    note3:
      'Presiunea și tensiunea tangențială admisibile trebuie stabilite din materialele reale ale penei, arborelui și butucului și din metoda de calcul aplicabilă.',

    note4:
      'Pentru sarcini alternante, șocuri, oboseală sau transmisii puternic solicitate sunt necesari factori suplimentari și verificări de oboseală ale arborelui și butucului.'
  }
};


/* =========================================================
   ENGINEERING FUNCTIONS
   ========================================================= */


/*
  Select key geometry.

  IMPORTANT:
  DIN ranges are interpreted as:

      d > dMin && d <= dMax

  Example:

      d = 30 mm -> 8 × 7
      d = 30.01 mm -> 10 × 8

  We NEVER return an arbitrary default key for an
  unsupported diameter.
*/

export function findKey(d) {
  if (!Number.isFinite(d)) {
    return null;
  }

  return (
    KEY_STANDARDS.find(
      (item) =>
        d > item.dMin &&
        d <= item.dMax
    ) || null
  );
}


/*
  Tangential force at shaft surface:

            2T
      Ft = ----
             d

  T must be N·mm.

  Input torque is N·m -> ×1000.
*/

export function calculateTangentialForce(
  torqueNm,
  diameterMm
) {
  if (
    !Number.isFinite(torqueNm) ||
    !Number.isFinite(diameterMm) ||
    torqueNm < 0 ||
    diameterMm <= 0
  ) {
    return null;
  }

  return (
    2 *
    torqueNm *
    1000 /
    diameterMm
  );
}


/*
  Simplified effective contact height.

  For this preliminary model, the hub-side engagement
  depth t2 is used as the nominal bearing height.

  This is preferable to the old:

      h - t1

  expression because h - t1 also contains the top/back
  clearance contribution and is not automatically the
  actual loaded flank height.

  A complete DIN 6892 calculation requires the applicable
  standard geometry/factors rather than this simplified
  uniform-pressure model.
*/

export function getEffectiveBearingHeight(key) {
  if (!key) {
    return null;
  }

  return key.t2;
}


/*
  Approximate effective length.

  The complete nominal length does not necessarily carry
  load uniformly, particularly for rounded-end keys.

  Here we use:

      l_eff = L - b

  as a conservative simple approximation.

  It must not be interpreted as the complete DIN 6892
  effective-length definition.
*/

export function getEffectiveLength(
  nominalLength,
  keyWidth
) {
  if (
    !Number.isFinite(nominalLength) ||
    !Number.isFinite(keyWidth)
  ) {
    return null;
  }

  return Math.max(
    0,
    nominalLength - keyWidth
  );
}


/*
  Simplified shear stress:

             Ft
      τ = --------
           b·l_eff
*/

export function calculateShearStress(
  forceN,
  widthMm,
  effectiveLengthMm
) {
  if (
    forceN == null ||
    widthMm <= 0 ||
    effectiveLengthMm <= 0
  ) {
    return null;
  }

  return (
    forceN /
    (
      widthMm *
      effectiveLengthMm
    )
  );
}


/*
  Simplified flank/contact pressure:

             Ft
      p = ----------
           h_eff·l_eff

  MPa = N/mm²
*/

export function calculateContactPressure(
  forceN,
  effectiveHeightMm,
  effectiveLengthMm
) {
  if (
    forceN == null ||
    effectiveHeightMm <= 0 ||
    effectiveLengthMm <= 0
  ) {
    return null;
  }

  return (
    forceN /
    (
      effectiveHeightMm *
      effectiveLengthMm
    )
  );
}


/*
  Required EFFECTIVE length from pressure.
*/

function requiredLengthPressure(
  forceN,
  effectiveHeight,
  allowablePressure
) {
  if (
    forceN == null ||
    effectiveHeight <= 0 ||
    allowablePressure <= 0
  ) {
    return null;
  }

  return (
    forceN /
    (
      effectiveHeight *
      allowablePressure
    )
  );
}


/*
  Required EFFECTIVE length from key shear.
*/

function requiredLengthShear(
  forceN,
  keyWidth,
  allowableShear
) {
  if (
    forceN == null ||
    keyWidth <= 0 ||
    allowableShear <= 0
  ) {
    return null;
  }

  return (
    forceN /
    (
      keyWidth *
      allowableShear
    )
  );
}


/*
  Find next preferred nominal length.

  Because:

      l_eff ≈ L - b

  nominal requirement becomes:

      L_req ≈ l_eff_req + b
*/

function nextStandardLength(
  requiredNominalLength
) {
  if (
    !Number.isFinite(
      requiredNominalLength
    )
  ) {
    return null;
  }

  return (
    STANDARD_LENGTHS.find(
      (length) =>
        length >=
        requiredNominalLength
    ) || null
  );
}


/* =========================================================
   FORMATTERS
   ========================================================= */

function fmt(
  value,
  digits = 1
) {
  if (
    !Number.isFinite(value)
  ) {
    return '—';
  }

  return value.toFixed(digits);
}


function fmtPercent(value) {
  if (
    !Number.isFinite(value)
  ) {
    return '—';
  }

  return `${value.toFixed(0)} %`;
}



/* =========================================================
   PRE-LAUNCH SELECTION / WORKFLOW HELPERS
   ========================================================= */

const KEY_TASKS = {
  select: {
    en: {
      title: 'Select a standard starting key',
      description:
        'Start from shaft diameter and transmitted torque. DraftFit selects the implemented DIN 6885-1 nominal section and sizes a preliminary key length.'
    },
    ro: {
      title: 'Selectează o pană standard de pornire',
      description:
        'Pornește de la diametrul arborelui și momentul transmis. DraftFit selectează secțiunea nominală DIN 6885-1 implementată și dimensionează preliminar lungimea.'
    }
  },
  check: {
    en: {
      title: 'Check the selected key length',
      description:
        'Keep the DIN section selected from shaft diameter and verify the nominal length you intend to use against shear and contact pressure.'
    },
    ro: {
      title: 'Verifică lungimea de pană aleasă',
      description:
        'Păstrează secțiunea DIN selectată după diametrul arborelui și verifică lungimea nominală dorită la forfecare și presiune de contact.'
    }
  }
};

const STRENGTH_ASSUMPTIONS = {
  preliminarySteel: {
    pAdm: 90,
    tauAdm: 60,
    label: {
      en: 'Example steel / steel assumptions',
      ro: 'Ipoteze exemplu oțel / oțel'
    }
  },
  custom: {
    label: {
      en: 'Custom allowables',
      ro: 'Valori admisibile custom'
    }
  }
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function KeysModule({
  unitSystem = 'metric',
  experienceMode = 'quick',
  isDark,
  lang = 'ro',
  onPrint
}) {
  const t =
    TRANSLATIONS[lang] ||
    TRANSLATIONS.ro;


  /* -------------------------------------------------------
     INPUTS
     ------------------------------------------------------- */

  const [
    shaftD,
    setShaftD
  ] =
    useState(35);


  const [
    torque,
    setTorque
  ] =
    useState(250);


  const [
    pAdm,
    setPAdm
  ] =
    useState(90);


  const [
    tauAdm,
    setTauAdm
  ] =
    useState(60);


  const [
    selectedLength,
    setSelectedLength
  ] =
    useState(50);


  const [
    taskMode,
    setTaskMode
  ] =
    useState('select');


  const [
    strengthPreset,
    setStrengthPreset
  ] =
    useState('preliminarySteel');


  /* =======================================================
     CALCULATION
     ======================================================= */

  const calculation =
    useMemo(() => {

      const key =
        findKey(shaftD);


      if (!key) {
        return {
          valid: false,
          reason:
            'diameter'
        };
      }


      if (
        !Number.isFinite(torque) ||
        !Number.isFinite(pAdm) ||
        !Number.isFinite(tauAdm) ||
        !Number.isFinite(selectedLength) ||

        torque < 0 ||
        pAdm <= 0 ||
        tauAdm <= 0 ||
        selectedLength <= 0
      ) {
        return {
          valid: false,
          reason:
            'input',
          key
        };
      }


      const force =
        calculateTangentialForce(
          torque,
          shaftD
        );


      const bearingHeight =
        getEffectiveBearingHeight(
          key
        );


      /*
        Clearance at top/back:

        c = t1 + t2 - h

        Positive value means the groove depths provide
        clearance beyond the nominal key height.
      */
      const topClearance =
        key.t1 +
        key.t2 -
        key.h;


      /*
        Minimum effective lengths.
      */

      const minEffPressure =
        requiredLengthPressure(
          force,
          bearingHeight,
          pAdm
        );


      const minEffShear =
        requiredLengthShear(
          force,
          key.b,
          tauAdm
        );


      const governingEffLength =
        Math.max(
          minEffPressure,
          minEffShear
        );


      /*
        Convert required effective length into the simple
        nominal-length approximation used by this module.
      */

      const requiredNominalLength =
        governingEffLength +
        key.b;


      const recommendedLength =
        nextStandardLength(
          requiredNominalLength
        );


      /*
        Actual effective length based on selected nominal L.
      */

      const effectiveLength =
        getEffectiveLength(
          selectedLength,
          key.b
        );


      const shearStress =
        calculateShearStress(
          force,
          key.b,
          effectiveLength
        );


      const contactPressure =
        calculateContactPressure(
          force,
          bearingHeight,
          effectiveLength
        );


      const shearUtilization =
        shearStress != null
          ? (
              shearStress /
              tauAdm *
              100
            )
          : Infinity;


      const pressureUtilization =
        contactPressure != null
          ? (
              contactPressure /
              pAdm *
              100
            )
          : Infinity;


      const governingCriterion =
        pressureUtilization >=
        shearUtilization
          ? 'pressure'
          : 'shear';


      const safe =
        effectiveLength > 0 &&
        shearStress <= tauAdm &&
        contactPressure <= pAdm;


      return {
        valid: true,

        key,

        force,

        bearingHeight,

        topClearance,

        minEffPressure,
        minEffShear,

        governingEffLength,

        requiredNominalLength,

        recommendedLength,

        effectiveLength,

        shearStress,
        contactPressure,

        shearUtilization,
        pressureUtilization,

        governingCriterion,

        safe
      };

    }, [
      shaftD,
      torque,
      pAdm,
      tauAdm,
      selectedLength
    ]);


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
        ? 'bg-zinc-950 border-zinc-700 text-white focus:border-emerald-500'
        : 'bg-white border-zinc-300 text-zinc-900 focus:border-emerald-500',

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


  const key =
    calculation.key ||
    null;


  const taskCopy =
    KEY_TASKS[taskMode]?.[lang] ||
    KEY_TASKS[taskMode]?.en ||
    KEY_TASKS.select.en;


  const pressurePass =
    calculation.valid &&
    calculation.contactPressure <= pAdm;


  const shearPass =
    calculation.valid &&
    calculation.shearStress <= tauAdm;


  const lengthPass =
    calculation.valid &&
    selectedLength >= calculation.requiredNominalLength;


  const applyStrengthPreset =
    presetId => {
      setStrengthPreset(presetId);

      const preset =
        STRENGTH_ASSUMPTIONS[presetId];

      if (
        preset &&
        Number.isFinite(preset.pAdm) &&
        Number.isFinite(preset.tauAdm)
      ) {
        setPAdm(preset.pAdm);
        setTauAdm(preset.tauAdm);
      }
    };


  const useRecommendedLength = () => {
    if (
      calculation.valid &&
      calculation.recommendedLength
    ) {
      setSelectedLength(
        calculation.recommendedLength
      );
    }
  };


  /* =======================================================
     RENDER
     ======================================================= */

  return (
    <div
      data-unit-system={unitSystem}
      data-experience-mode={experienceMode}
      className="
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-7
      "
    >

      {/* ===================================================
          INPUT PANEL
          =================================================== */}

      <div
        className="
          lg:col-span-4
          space-y-6
          print:hidden
        "
      >

        <details className="draftfit-assistant-compact print:hidden lg:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea penei?' : 'Need help choosing a key?'}
          </summary>

        <section
          className={`
            overflow-hidden
            border
            border-emerald-500/25
            ${ui.card}
          `}
        >
          <div
            className="
              border-b
              border-emerald-500/20
              bg-emerald-500/5
              p-4
              sm:p-5
            "
          >
            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.18em]
                text-emerald-500
              "
            >
              {lang === 'ro'
                ? 'Asistent selecție pană'
                : 'Key Selection Assistant'}
            </span>

            <h2
              className={`
                mt-1
                text-lg
                font-black
                ${ui.titleText}
              `}
            >
              {lang === 'ro'
                ? 'Ce vrei să faci?'
                : 'What do you need?'}
            </h2>

            <p
              className={`
                mt-2
                text-xs
                leading-5
                ${ui.subText}
              `}
            >
              {taskCopy.description}
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-2
              p-4
              sm:grid-cols-2
              sm:p-5
            "
          >
            {Object.entries(KEY_TASKS).map(
              ([id, task]) => {
                const copy =
                  task[lang] || task.en;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setTaskMode(id)
                    }
                    className={`
                      min-h-16
                      border
                      p-3
                      text-left
                      transition
                      ${
                        taskMode === id
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : isDark
                            ? 'border-zinc-700 bg-zinc-950 hover:border-emerald-500/60'
                            : 'border-zinc-300 bg-white hover:border-emerald-500/60'
                      }
                    `}
                  >
                    <span
                      className={`
                        block
                        text-xs
                        font-black
                        ${
                          taskMode === id
                            ? 'text-emerald-500'
                            : ui.titleText
                        }
                      `}
                    >
                      {copy.title}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </section>


        </details>

        <div
          className={`
            p-4
            sm:p-6
            border
            border-l-4
            border-l-emerald-600
            space-y-6
            ${ui.card}
          `}
        >

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
                ${ui.titleText}
              `}
            >
              {t.configTitle}
            </h2>

          </div>


          <InputField
            label={
              t.shaftDia
            }

            value={
              shaftD
            }

            setValue={
              setShaftD
            }

            min="6.01"

            step="0.1"

            ui={ui}
          />


          <InputField
            label={
              t.torqueInput
            }

            value={
              torque
            }

            setValue={
              setTorque
            }

            min="0"

            step="1"

            ui={ui}
          />


          <div>
            <div
              className="
                mb-2
                flex
                flex-wrap
                items-center
                justify-between
                gap-2
              "
            >
              <span
                className={`
                  text-[10px]
                  font-bold
                  uppercase
                  tracking-widest
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Ipoteze de rezistență'
                  : 'Strength assumptions'}
              </span>

              <span
                className="
                  text-[9px]
                  font-black
                  uppercase
                  tracking-wider
                  text-amber-500
                "
              >
                {lang === 'ro'
                  ? 'Preliminar'
                  : 'Preliminary'}
              </span>
            </div>

            <div
              className="
                grid
                grid-cols-1
                gap-2
                sm:grid-cols-2
              "
            >
              {Object.entries(
                STRENGTH_ASSUMPTIONS
              ).map(([id, preset]) => (
                <button
                  key={id}
                  type="button"
                  onClick={() =>
                    applyStrengthPreset(id)
                  }
                  className={`
                    min-h-11
                    border
                    px-3
                    py-2
                    text-left
                    text-[10px]
                    font-bold
                    transition
                    ${
                      strengthPreset === id
                        ? 'border-amber-500 bg-amber-500/10 text-amber-500'
                        : isDark
                          ? 'border-zinc-700 bg-zinc-950 text-zinc-300'
                          : 'border-zinc-300 bg-white text-zinc-700'
                    }
                  `}
                >
                  {preset.label[lang] ||
                    preset.label.en}
                </button>
              ))}
            </div>

            <p
              className={`
                mt-2
                text-[10px]
                leading-4
                ${ui.subText}
              `}
            >
              {lang === 'ro'
                ? 'Presetul 90 / 60 MPa este doar ipoteza implicită DraftFit pentru screening. Pentru proiectare, introdu valorile admisibile stabilite pentru materialele reale și metoda de calcul aplicabilă.'
                : 'The 90 / 60 MPa preset is only the DraftFit default screening assumption. For design, enter allowables established for the real materials and applicable design method.'}
            </p>
          </div>


          <InputField
            label={
              t.allowablePress
            }

            value={
              pAdm
            }

            setValue={
              setPAdm
            }

            onValueChange={() =>
              setStrengthPreset('custom')
            }

            min="1"

            step="1"

            ui={ui}
          />


          <InputField
            label={
              t.allowableShear
            }

            value={
              tauAdm
            }

            setValue={
              setTauAdm
            }

            onValueChange={() =>
              setStrengthPreset('custom')
            }

            min="1"

            step="1"

            ui={ui}
          />


          <InputField
            label={
              t.actualLength
            }

            value={
              selectedLength
            }

            setValue={
              setSelectedLength
            }

            min="1"

            step="1"

            ui={ui}
          />


          {calculation.valid &&
            calculation.recommendedLength && (
              <button
                type="button"
                onClick={useRecommendedLength}
                className="
                  min-h-11
                  w-full
                  border
                  border-emerald-500/40
                  bg-emerald-500/10
                  px-3
                  py-2.5
                  text-xs
                  font-black
                  text-emerald-500
                  transition
                  hover:bg-emerald-500/15
                "
              >
                {lang === 'ro'
                  ? `Folosește lungimea nominală sugerată: ${calculation.recommendedLength} mm`
                  : `Use suggested nominal length: ${calculation.recommendedLength} mm`}
              </button>
            )}


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
              bg-emerald-700
              hover:bg-emerald-600
              text-white
              font-bold
              py-3
              uppercase
              tracking-widest
              text-xs
              transition-colors
              mt-2
            "
          >
            {t.exportBtn}
          </button>

        </div>

        <div className="hidden lg:block">
          <details className="draftfit-assistant-compact print:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea penei?' : 'Need help choosing a key?'}
          </summary>

        <section
          className={`
            overflow-hidden
            border
            border-emerald-500/25
            ${ui.card}
          `}
        >
          <div
            className="
              border-b
              border-emerald-500/20
              bg-emerald-500/5
              p-4
              sm:p-5
            "
          >
            <span
              className="
                text-[10px]
                font-black
                uppercase
                tracking-[0.18em]
                text-emerald-500
              "
            >
              {lang === 'ro'
                ? 'Asistent selecție pană'
                : 'Key Selection Assistant'}
            </span>

            <h2
              className={`
                mt-1
                text-lg
                font-black
                ${ui.titleText}
              `}
            >
              {lang === 'ro'
                ? 'Ce vrei să faci?'
                : 'What do you need?'}
            </h2>

            <p
              className={`
                mt-2
                text-xs
                leading-5
                ${ui.subText}
              `}
            >
              {taskCopy.description}
            </p>
          </div>

          <div
            className="
              grid
              grid-cols-1
              gap-2
              p-4
              sm:grid-cols-2
              sm:p-5
            "
          >
            {Object.entries(KEY_TASKS).map(
              ([id, task]) => {
                const copy =
                  task[lang] || task.en;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() =>
                      setTaskMode(id)
                    }
                    className={`
                      min-h-16
                      border
                      p-3
                      text-left
                      transition
                      ${
                        taskMode === id
                          ? 'border-emerald-500 bg-emerald-500/10'
                          : isDark
                            ? 'border-zinc-700 bg-zinc-950 hover:border-emerald-500/60'
                            : 'border-zinc-300 bg-white hover:border-emerald-500/60'
                      }
                    `}
                  >
                    <span
                      className={`
                        block
                        text-xs
                        font-black
                        ${
                          taskMode === id
                            ? 'text-emerald-500'
                            : ui.titleText
                        }
                      `}
                    >
                      {copy.title}
                    </span>
                  </button>
                );
              }
            )}
          </div>
        </section>


        </details>
        </div>

      </div>


      {/* ===================================================
          RESULTS
          =================================================== */}

      <div
        className="
          lg:col-span-8
          print:col-span-12
          space-y-6
        "
      >

        {/* Invalid diameter */}

        {!calculation.valid ? (

          <div
            className={`
              p-8
              border
              border-l-4
              border-l-rose-500
              ${ui.card}
            `}
          >

            <h3
              className="
                text-sm
                uppercase
                tracking-widest
                font-black
                text-rose-500
                mb-3
              "
            >
              {t.invalid}
            </h3>


            <p
              className={
                ui.subText
              }
            >
              {
                calculation.reason ===
                'diameter'
                  ? t.outOfRange
                  : t.invalid
              }
            </p>

          </div>

        ) : (

          <>

            {/* ===============================================
                PRIMARY KEY DECISION
                =============================================== */}

            <section
              className={`
                overflow-hidden
                border
                border-l-4
                ${
                  calculation.safe && lengthPass
                    ? 'border-l-emerald-500'
                    : 'border-l-amber-500'
                }
                ${ui.card}
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
                      {key.b} × {key.h} × {selectedLength} mm
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
                      {lang === 'ro'
                        ? `Secțiune nominală selectată după Ø${shaftD} mm. Lungime nominală minimă calculată: ${fmt(calculation.requiredNominalLength, 1)} mm; următoarea lungime preferată din lista DraftFit: ${calculation.recommendedLength || '> 500'} mm.`
                        : `Nominal section selected from Ø${shaftD} mm. Calculated minimum nominal length: ${fmt(calculation.requiredNominalLength, 1)} mm; next preferred DraftFit length: ${calculation.recommendedLength || '> 500'} mm.`}
                    </p>
                  </div>

                  <span
                    className={`
                      inline-flex
                      min-h-9
                      items-center
                      border
                      px-3
                      text-xs
                      font-black
                      uppercase
                      tracking-wider
                      ${
                        calculation.safe && lengthPass
                          ? 'border-emerald-500/30 bg-emerald-500/10 text-emerald-500'
                          : 'border-amber-500/30 bg-amber-500/10 text-amber-500'
                      }
                    `}
                  >
                    {calculation.safe && lengthPass
                      ? (lang === 'ro'
                          ? 'PRELIMINAR OK'
                          : 'PRELIMINARY OK')
                      : (lang === 'ro'
                          ? 'REVIZUIRE'
                          : 'REVIEW')}
                  </span>
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
                  <DecisionMetric
                    label={
                      lang === 'ro'
                        ? 'Lungime necesară'
                        : 'Required length'
                    }
                    value={`${fmt(
                      calculation.requiredNominalLength,
                      1
                    )} mm`}
                    status={lengthPass}
                    isDark={isDark}
                  />

                  <DecisionMetric
                    label={
                      lang === 'ro'
                        ? 'Forfecare'
                        : 'Shear'
                    }
                    value={fmtPercent(
                      calculation.shearUtilization
                    )}
                    status={shearPass}
                    isDark={isDark}
                  />

                  <DecisionMetric
                    label={
                      lang === 'ro'
                        ? 'Contact'
                        : 'Contact'
                    }
                    value={fmtPercent(
                      calculation.pressureUtilization
                    )}
                    status={pressurePass}
                    isDark={isDark}
                  />

                  <DecisionMetric
                    label={
                      lang === 'ro'
                        ? 'Criteriu determinant'
                        : 'Controlling mode'
                    }
                    value={
                      calculation.governingCriterion ===
                      'pressure'
                        ? t.pressure
                        : t.shear
                    }
                    status={
                      calculation.governingCriterion ===
                      'pressure'
                        ? pressurePass
                        : shearPass
                    }
                    isDark={isDark}
                  />
                </div>

                <div
                  className="
                    mt-5
                    border
                    border-amber-500/25
                    bg-amber-500/5
                    p-4
                    text-xs
                    leading-5
                    text-amber-500
                  "
                >
                  {lang === 'ro'
                    ? 'Un verdict bun pentru pană nu validează automat arborele sau butucul. Canalul de pană reduce secțiunea și introduce concentrații de tensiuni; pentru sarcini alternante, șoc, oboseală sau transmisii puternic solicitate sunt necesare verificări suplimentare.'
                    : 'A passing key check does not automatically validate the shaft or hub. The keyway reduces section and introduces stress concentration; reversing, shock, fatigue or highly loaded drives require additional checks.'}
                </div>
              </div>
            </section>


            {/* ===============================================
                MAIN RESULT
                =============================================== */}

            <div
              className={`
                p-5
                sm:p-8
                border
                print:border-zinc-300
                ${ui.card}
              `}
            >

              <div
                className={`
                  flex
                  flex-wrap
                  justify-between
                  items-center
                  border-b
                  pb-5
                  mb-6
                  gap-4
                  ${ui.divider}
                `}
              >

                <div>

                  <span
                    className="
                      block
                      text-4xl
                      font-black
                      font-mono
                      text-emerald-500
                      tracking-tight
                    "
                  >
                    DIN 6885-1:2021-11 — Ø{shaftD} mm
                  </span>


                  <span
                    className={`
                      block
                      mt-2
                      text-xs
                      font-mono
                      ${ui.subText}
                    `}
                  >
                    {key.b} × {key.h} × {selectedLength} mm
                  </span>

                </div>


                <span
                  className={`
                    text-xs
                    font-black
                    uppercase
                    tracking-widest
                    px-3
                    py-1.5
                    border

                    ${
                      calculation.safe

                        ? 'bg-emerald-500/10 text-emerald-500 border-emerald-500/30'

                        : 'bg-rose-500/10 text-rose-500 border-rose-500/30'
                    }
                  `}
                >
                  {
                    calculation.safe
                      ? t.safeTag
                      : t.overloadTag
                  }
                </span>

              </div>


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
                {t.resultsTitle}
              </h3>


              {/* Geometry */}

              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-4
                  gap-4
                "
              >

                <ResultBox
                  label={
                    t.keyDims
                  }

                  value={
                    `${key.b} × ${key.h} mm`
                  }

                  accent="emerald"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.shaftSlot
                  }

                  value={
                    `${key.t1} mm`
                  }

                  accent="cyan"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.hubSlot
                  }

                  value={
                    `${key.t2} mm`
                  }

                  accent="cyan"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.clearance
                  }

                  value={
                    `${fmt(
                      calculation.topClearance,
                      2
                    )} mm`
                  }

                  accent="amber"

                  ui={ui}
                />

              </div>

            </div>


            {/* ===============================================
                LOAD CALCULATION
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
                {t.mechanicalCheckTitle}
              </h3>


              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-3
                  gap-4
                "
              >

                <ResultBox
                  label={
                    t.tangentialForce
                  }

                  value={
                    `${fmt(
                      calculation.force /
                      1000,
                      2
                    )} kN`
                  }

                  accent="emerald"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.effectiveLength
                  }

                  value={
                    `${fmt(
                      calculation.effectiveLength,
                      1
                    )} mm`
                  }

                  accent="cyan"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.governing
                  }

                  value={
                    calculation.governingCriterion ===
                    'pressure'
                      ? t.pressure
                      : t.shear
                  }

                  accent="amber"

                  ui={ui}
                />

              </div>


              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-2
                  gap-5
                  mt-5
                "
              >

                {/* Pressure */}

                <VerificationCard
                  title={
                    t.pressure
                  }

                  actual={
                    `${fmt(
                      calculation.contactPressure,
                      1
                    )} MPa`
                  }

                  allowable={
                    `${fmt(
                      pAdm,
                      1
                    )} MPa`
                  }

                  utilization={
                    calculation.pressureUtilization
                  }

                  safe={
                    calculation.contactPressure <=
                    pAdm
                  }

                  isDark={
                    isDark
                  }

                  calcLabel={t.calcLabel}
                  allowLabel={t.allowLabel}
                  utilizationLabel={t.utilizationLabel}
                  okLabel={t.okLabel}
                  notOkLabel={t.notOkLabel}
                />


                {/* Shear */}

                <VerificationCard
                  title={
                    t.shear
                  }

                  actual={
                    `${fmt(
                      calculation.shearStress,
                      1
                    )} MPa`
                  }

                  allowable={
                    `${fmt(
                      tauAdm,
                      1
                    )} MPa`
                  }

                  utilization={
                    calculation.shearUtilization
                  }

                  safe={
                    calculation.shearStress <=
                    tauAdm
                  }

                  isDark={
                    isDark
                  }

                  calcLabel={t.calcLabel}
                  allowLabel={t.allowLabel}
                  utilizationLabel={t.utilizationLabel}
                  okLabel={t.okLabel}
                  notOkLabel={t.notOkLabel}
                />

              </div>

            </div>


            {/* ===============================================
                REQUIRED LENGTH
                =============================================== */}

            <div
              className={`
                p-5
                sm:p-8
                border
                border-l-4
                border-l-cyan-500
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
                {t.lengthSizingTitle}
              </h3>


              <div
                className="
                  grid
                  grid-cols-1
                  md:grid-cols-4
                  gap-4
                "
              >

                <ResultBox
                  label={
                    t.minLengthPressure
                  }

                  value={
                    `${fmt(
                      calculation.minEffPressure,
                      1
                    )} mm`
                  }

                  accent="amber"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.minLengthShear
                  }

                  value={
                    `${fmt(
                      calculation.minEffShear,
                      1
                    )} mm`
                  }

                  accent="amber"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.governingLength
                  }

                  value={
                    `${fmt(
                      calculation.requiredNominalLength,
                      1
                    )} mm`
                  }

                  accent="cyan"

                  ui={ui}
                />


                <ResultBox
                  label={
                    t.recommendedLength
                  }

                  value={
                    calculation.recommendedLength
                      ? `${calculation.recommendedLength} mm`
                      : '> 500 mm'
                  }

                  accent="emerald"

                  ui={ui}
                />

              </div>


              {selectedLength <
                calculation.requiredNominalLength && (

                <div
                  className="
                    mt-5
                    p-4
                    border
                    border-rose-500/30
                    bg-rose-500/10
                    text-rose-500
                    text-sm
                    font-bold
                  "
                >
                  {t.lengthTooShort}
                </div>
              )}

            </div>


            {/* ===============================================
                SVG
                =============================================== */}

            <div
              className={`
                p-5
                sm:p-8
                border
                print:border-zinc-300
                ${ui.card}
              `}
            >

              <h4
                className={`
                  text-[10px]
                  tracking-widest
                  font-bold
                  uppercase
                  mb-6
                  ${ui.subText}
                `}
              >
                {t.svgTitle}
              </h4>


              <div
                className="
                  flex
                  justify-center
                "
              >

                <div
                  className={`
                    p-5
                    border
                    ${ui.subCard}
                    w-full
                    max-w-lg
                  `}
                >

                  <KeyCrossSection
                    shaftD={
                      shaftD
                    }

                    keyData={
                      key
                    }

                    isDark={
                      isDark
                    }

                    label={
                      t.svgKey
                    }
                  />

                </div>

              </div>

            </div>


            {/* ===============================================
                ENGINEERING BASIS
                =============================================== */}

            <div
              className={`
                p-6
                border
                border-l-4
                border-l-sky-500
                ${ui.card}
              `}
            >
              <h4
                className="text-[10px] uppercase tracking-widest font-black text-sky-500 mb-3"
              >
                {t.standardBasisTitle}
              </h4>

              <p
                className={`text-sm leading-relaxed ${ui.subText}`}
              >
                {t.standardBasisText}
              </p>

              <div
                className="
                  mt-4
                  grid
                  grid-cols-1
                  gap-3
                  sm:grid-cols-2
                "
              >
                <div
                  className={`
                    border
                    p-3
                    ${ui.subCard}
                  `}
                >
                  <strong
                    className="
                      block
                      text-xs
                      text-sky-500
                    "
                  >
                    DIN 6885-1
                  </strong>

                  <span
                    className={`
                      mt-1
                      block
                      text-[11px]
                      leading-5
                      ${ui.subText}
                    `}
                  >
                    {lang === 'ro'
                      ? 'Folosit aici pentru seria dimensională nominală a penei și canalelor.'
                      : 'Used here for the implemented nominal key and keyway dimensional series.'}
                  </span>
                </div>

                <div
                  className={`
                    border
                    p-3
                    ${ui.subCard}
                  `}
                >
                  <strong
                    className="
                      block
                      text-xs
                      text-amber-500
                    "
                  >
                    DIN 6892
                  </strong>

                  <span
                    className={`
                      mt-1
                      block
                      text-[11px]
                      leading-5
                      ${ui.subText}
                    `}
                  >
                    {lang === 'ro'
                      ? 'DraftFit NU pretinde că screening-ul simplificat de shear/contact de aici este o implementare completă a calculului DIN 6892.'
                      : 'DraftFit does NOT represent the simplified shear/contact screening here as a complete DIN 6892 calculation.'}
                  </span>
                </div>
              </div>
            </div>


            {/* ===============================================
                ENGINEERING NOTES
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

              <h4
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
              </h4>


              <div
                className={`
                  space-y-3
                  text-sm
                  leading-relaxed
                  ${ui.subText}
                `}
              >

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

              </div>

            </div>

          </>
        )}

      </div>

    </div>
  );
}


/* =========================================================
   INPUT COMPONENT
   ========================================================= */

function InputField({
  label,
  value,
  setValue,
  min,
  step,
  ui,
  onValueChange
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
          ${ui.subText}
        `}
      >
        {label}
      </label>


      <input
        type="number"

        min={
          min
        }

        step={
          step
        }

        value={
          value
        }

        onChange={
          (event) => {
            const nextValue = Number(
              event.target.value
            );

            setValue(nextValue);

            if (onValueChange) {
              onValueChange(nextValue);
            }
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


/* =========================================================
   RESULT BOX
   ========================================================= */

function DecisionMetric({
  label,
  value,
  status,
  isDark
}) {
  return (
    <div
      className={`
        min-w-0
        border
        p-3
        ${
          status
            ? isDark
              ? 'border-emerald-500/25 bg-emerald-500/5'
              : 'border-emerald-200 bg-emerald-50'
            : isDark
              ? 'border-amber-500/25 bg-amber-500/5'
              : 'border-amber-200 bg-amber-50'
        }
      `}
    >
      <span
        className={`
          block
          text-[9px]
          font-black
          uppercase
          tracking-wider
          ${
            isDark
              ? 'text-zinc-500'
              : 'text-zinc-500'
          }
        `}
      >
        {label}
      </span>

      <strong
        className={`
          mt-1
          block
          break-words
          font-mono
          text-sm
          ${
            status
              ? 'text-emerald-500'
              : 'text-amber-500'
          }
        `}
      >
        {value}
      </strong>

      <span
        className={`
          mt-1
          block
          text-[9px]
          font-black
          uppercase
          tracking-wider
          ${
            status
              ? 'text-emerald-500'
              : 'text-amber-500'
          }
        `}
      >
        {status ? 'OK' : 'REVIEW'}
      </span>
    </div>
  );
}


function ResultBox({
  label,
  value,
  accent,
  ui
}) {
  const accentClass = {
    emerald:
      'border-l-emerald-500 text-emerald-500',

    cyan:
      'border-l-cyan-500 text-cyan-500',

    amber:
      'border-l-amber-500 text-amber-500',

    rose:
      'border-l-rose-500 text-rose-500'
  }[accent] ||
  'border-l-zinc-500 text-zinc-500';


  return (
    <div
      className={`
        p-5
        border
        border-l-4
        ${accentClass}
        ${ui.subCard}
      `}
    >

      <span
        className="
          text-[10px]
          uppercase
          tracking-widest
          font-bold
          block
          mb-2
        "
      >
        {label}
      </span>


      <div
        className={`
          text-xl
          font-black
          font-mono
          ${ui.titleText}
        `}
      >
        {value}
      </div>

    </div>
  );
}


/* =========================================================
   VERIFICATION CARD
   ========================================================= */

function VerificationCard({
  title,
  actual,
  allowable,
  utilization,
  safe,
  isDark,
  calcLabel,
  allowLabel,
  utilizationLabel,
  okLabel,
  notOkLabel
}) {
  return (
    <div
      className={`
        p-5
        border

        ${
          safe

            ? isDark
              ? 'border-emerald-500/30 bg-emerald-500/5'
              : 'border-emerald-200 bg-emerald-50'

            : isDark
              ? 'border-rose-500/30 bg-rose-500/5'
              : 'border-rose-200 bg-rose-50'
        }
      `}
    >

      <div
        className="
          flex
          justify-between
          items-center
          gap-3
          mb-4
        "
      >

        <span
          className="
            text-xs
            uppercase
            tracking-widest
            font-black
          "
        >
          {title}
        </span>


        <span
          className={`
            text-xs
            font-black

            ${
              safe
                ? 'text-emerald-500'
                : 'text-rose-500'
            }
          `}
        >
          {
            safe
              ? okLabel
              : notOkLabel
          }
        </span>

      </div>


      <div
        className="
          grid
          grid-cols-2
          gap-3
          text-sm
          font-mono
        "
      >

        <div>
          <span
            className="
              block
              text-[10px]
              opacity-60
              mb-1
            "
          >
            {calcLabel}
          </span>

          <strong>
            {actual}
          </strong>
        </div>


        <div>
          <span
            className="
              block
              text-[10px]
              opacity-60
              mb-1
            "
          >
            {allowLabel}
          </span>

          <strong>
            {allowable}
          </strong>
        </div>

      </div>


      <div
        className="
          mt-4
          text-xs
          font-mono
        "
      >
        {utilizationLabel}:{' '}
        <strong>
          {
            fmtPercent(
              utilization
            )
          }
        </strong>
      </div>

    </div>
  );
}


/* =========================================================
   TECHNICAL CROSS-SECTION SVG
   ========================================================= */

function KeyCrossSection({
  shaftD,
  keyData,
  isDark,
  label
}) {
  const shaftFill =
    isDark
      ? '#18181b'
      : '#f4f4f5';

  const normalStroke =
    isDark
      ? '#71717a'
      : '#71717a';

  const accent =
    '#10b981';

  const accentDark =
    '#047857';

  const textColor =
    isDark
      ? '#d4d4d8'
      : '#3f3f46';


  return (
    <svg
      viewBox="0 0 360 270"

      className="
        w-full
        h-64
      "
    >

      {/* Hub outside */}

      <circle
        cx="180"
        cy="140"
        r="112"

        fill="none"

        stroke={
          normalStroke
        }

        strokeWidth="2"
      />


      {/* Shaft */}

      <circle
        cx="180"
        cy="140"
        r="68"

        fill={
          shaftFill
        }

        stroke={
          accent
        }

        strokeWidth="2.5"
      />


      {/* Shaft keyway */}

      <rect
        x="166"
        y="72"
        width="28"
        height="22"

        fill={
          isDark
            ? '#09090b'
            : '#ffffff'
        }

        stroke={
          accent
        }

        strokeWidth="1.5"
      />


      {/* Key */}

      <rect
        x="167"
        y="62"
        width="26"
        height="30"

        fill={
          accent
        }

        fillOpacity="0.80"

        stroke={
          accentDark
        }

        strokeWidth="2"
      />


      {/* Hub keyway clearance */}

      <rect
        x="166"
        y="47"
        width="28"
        height="16"

        fill={
          isDark
            ? '#09090b'
            : '#ffffff'
        }

        stroke={
          normalStroke
        }

        strokeWidth="1.5"
      />


      {/* Center lines */}

      <line
        x1="95"
        y1="140"
        x2="265"
        y2="140"

        stroke={
          normalStroke
        }

        strokeWidth="1"

        strokeDasharray="7 5"
      />


      <line
        x1="180"
        y1="80"
        x2="180"
        y2="205"

        stroke={
          normalStroke
        }

        strokeWidth="1"

        strokeDasharray="7 5"
      />


      {/* Shaft diameter */}

      <text
        x="180"
        y="148"

        fill={
          accentDark
        }

        fontSize="15"

        textAnchor="middle"

        fontFamily="monospace"

        fontWeight="bold"
      >
        Ø{shaftD}
      </text>


      {/* Key callout */}

      <line
        x1="194"
        y1="70"
        x2="250"
        y2="52"

        stroke={
          accent
        }

        strokeWidth="1.5"
      />


      <text
        x="255"
        y="49"

        fill={
          accent
        }

        fontSize="12"

        fontFamily="monospace"

        fontWeight="bold"
      >
        {label}{' '}
        {keyData.b}×{keyData.h}
      </text>


      {/* t1 */}

      <text
        x="128"
        y="87"

        fill={
          textColor
        }

        fontSize="11"

        fontFamily="monospace"
      >
        t₁ = {keyData.t1}
      </text>


      {/* t2 */}

      <text
        x="205"
        y="70"

        fill={
          textColor
        }

        fontSize="11"

        fontFamily="monospace"
      >
        t₂ = {keyData.t2}
      </text>

    </svg>
  );
}