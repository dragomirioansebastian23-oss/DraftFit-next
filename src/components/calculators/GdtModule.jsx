import React, { useEffect, useState } from 'react';
import ExamplePresets from '@/components/calculators/ExamplePresets';
import ShareCalculationButton from '@/components/calculators/ShareCalculationButton';
import CopyResultButton from '@/components/calculators/CopyResultButton';

/*
  GD&T EDUCATIONAL / METROLOGY MODULE
  ====================================

  Engineering intent:
  - Focus on tolerance-zone interpretation, not only ideal geometry.
  - Distinguish form, profile, orientation, location and runout controls.
  - Do not automatically assign datum references where they are not inherent.
  - Do not automatically use the diameter symbol unless the tolerance zone is
    actually cylindrical.
  - Separate "what is controlled" from "how it may be inspected".
  - Measurement methods shown here are representative methods, not universal
    inspection procedures.

  IMPORTANT:
  ISO 1101 and ASME Y14.5 are separate GPS/GD&T systems and must not be assumed
  to be interchangeable in every detail.

  The examples below are educational examples. A production drawing must be
  interpreted according to the standard explicitly invoked on that drawing.
*/


/* =========================================================
   GD&T ELEMENTS
   ========================================================= */

export const GDT_ELEMENTS = [
  {
    id: 'straightness',
    icon: '━',
    cat: 'form'
  },
  {
    id: 'flatness',
    icon: '▱',
    cat: 'form'
  },
  {
    id: 'circularity',
    icon: '◯',
    cat: 'form'
  },
  {
    id: 'cylindricity',
    icon: '⌭',
    cat: 'form'
  },

  {
    id: 'profile_line',
    icon: '⌒',
    cat: 'profile'
  },
  {
    id: 'profile_surface',
    icon: '⌓',
    cat: 'profile'
  },

  {
    id: 'parallelism',
    icon: '∥',
    cat: 'orientation'
  },
  {
    id: 'perpendicularity',
    icon: '⟂',
    cat: 'orientation'
  },
  {
    id: 'angularity',
    icon: '∠',
    cat: 'orientation'
  },

  {
    id: 'position',
    icon: '⌖',
    cat: 'location'
  },
  {
    id: 'concentricity',
    icon: '◎',
    cat: 'location'
  },
  {
    id: 'symmetry',
    icon: '⌯',
    cat: 'location'
  },

  {
    id: 'circular_runout',
    icon: '↗',
    cat: 'runout'
  },
  {
    id: 'total_runout',
    icon: '⌰',
    cat: 'runout'
  }
];


/* =========================================================
   STANDARD PROFILES
   ========================================================= */

export const STANDARD_PROFILES = {
  iso: {
    id: 'iso',
    label: 'ISO 1101:2017',
    shortLabel: 'ISO 1101',
    unsupported: []
  },
  asme: {
    id: 'asme',
    label: 'ASME Y14.5-2018',
    shortLabel: 'ASME Y14.5',
    unsupported: ['concentricity', 'symmetry']
  }
};


/* =========================================================
   ENGINEERING METADATA
   =========================================================

   toleranceZone:
     conceptual description of the tolerance zone.

   datum:
     none      -> datum not used for this control
     required  -> datum reference normally required
     optional  -> may be used depending on specification

   diameterZone:
     whether the EXAMPLE shown uses a cylindrical tolerance
     zone and therefore displays Ø.

   exampleDatums:
     datum references used in the educational FCF example.

   NOTE:
   These are example FCF configurations, not an automatic
   drawing-generation engine.
   ========================================================= */

export const GDT_META = {
  straightness: {
    datum: 'none',
    diameterZone: false,
    exampleDatums: [],
    toleranceZoneType: 'two-lines'
  },

  flatness: {
    datum: 'none',
    diameterZone: false,
    exampleDatums: [],
    toleranceZoneType: 'two-planes'
  },

  circularity: {
    datum: 'none',
    diameterZone: false,
    exampleDatums: [],
    toleranceZoneType: 'two-circles'
  },

  cylindricity: {
    datum: 'none',
    diameterZone: false,
    exampleDatums: [],
    toleranceZoneType: 'two-cylinders'
  },

  profile_line: {
    datum: 'optional',
    diameterZone: false,
    exampleDatums: [],
    toleranceZoneType: 'profile-band'
  },

  profile_surface: {
    datum: 'optional',
    diameterZone: false,
    exampleDatums: ['A', 'B'],
    toleranceZoneType: 'surface-envelope'
  },

  parallelism: {
    datum: 'required',
    diameterZone: false,
    exampleDatums: ['A'],
    toleranceZoneType: 'two-planes'
  },

  perpendicularity: {
    datum: 'required',
    diameterZone: false,
    exampleDatums: ['A'],
    toleranceZoneType: 'two-planes'
  },

  angularity: {
    datum: 'required',
    diameterZone: false,
    exampleDatums: ['A'],
    toleranceZoneType: 'two-planes'
  },

  position: {
    datum: 'required',
    diameterZone: true,
    exampleDatums: ['A', 'B', 'C'],
    toleranceZoneType: 'cylinder'
  },

  /*
    Concentricity is retained because it exists in legacy /
    standard-specific GD&T contexts.

    It must NOT be presented simply as coaxiality or runout.
  */
  concentricity: {
    datum: 'required',
    diameterZone: true,
    exampleDatums: ['A'],
    toleranceZoneType: 'cylinder'
  },

  symmetry: {
    datum: 'required',
    diameterZone: false,
    exampleDatums: ['A'],
    toleranceZoneType: 'two-planes'
  },

  circular_runout: {
    datum: 'required',
    diameterZone: false,
    exampleDatums: ['A'],
    toleranceZoneType: 'runout'
  },

  total_runout: {
    datum: 'required',
    diameterZone: false,
    exampleDatums: ['A'],
    toleranceZoneType: 'runout'
  }
};


/* =========================================================
   TRANSLATIONS
   ========================================================= */

const TRANSLATIONS = {
  en: {
    categories: {
      form: 'Form Tolerances',
      profile: 'Profile Tolerances',
      orientation: 'Orientation Tolerances',
      location: 'Location Tolerances',
      runout: 'Runout Tolerances'
    },

    items: {
      straightness: {
        name: 'Straightness',

        def:
          'Controls straightness of an individual line element of a surface. When applied to a derived median line or axis of a feature of size, the interpretation and tolerance-zone geometry depend on the specification.',

        zone:
          'For surface-line straightness, each controlled line element must lie between two parallel straight lines separated by the specified tolerance. An axis/median-line straightness specification may use a cylindrical tolerance zone when explicitly indicated.',

        datum:
          'Straightness is a form control and does not require a datum reference.',

        measure:
          'Surface-line straightness may be evaluated by tracing the selected line element with a suitable indicator or scanning system relative to a stable measurement setup. Axis/median-line straightness generally requires measurement of multiple cross-sections and derivation of the associated center or median line.',

        caution:
          'A simple indicator sweep measures the combined response of the part and setup. It is not automatically equivalent to the standardized straightness result unless the measurement strategy reproduces the specified tolerance evaluation.'
      },

      flatness: {
        name: 'Flatness',

        def:
          'Controls the form of an entire surface independently of any datum. Flatness limits how much the actual surface may depart from an ideal plane.',

        zone:
          'The complete controlled surface must lie between two parallel planes separated by the flatness tolerance.',

        datum:
          'Flatness does not require and is not referenced to a datum.',

        measure:
          'Typical inspection methods include CMM surface sampling, surface-plate methods, precision scanning or dedicated form-measuring equipment. The measured points are evaluated against two parallel planes defining the minimum or specified tolerance zone.',

        caution:
          'Simply placing the controlled surface directly on a surface plate can constrain or mask its natural form. The setup and support strategy must be appropriate for the inspection objective.'
      },

      circularity: {
        name: 'Circularity (Roundness)',

        def:
          'Controls the form of individual circular elements of a surface. It evaluates roundness independently of a datum axis.',

        zone:
          'In each evaluated section, the actual circular element must lie between two concentric circles whose radial separation equals the circularity tolerance.',

        datum:
          'Circularity is a form control and does not require a datum.',

        measure:
          'Preferred high-accuracy methods use a roundness instrument with a precision spindle. CMM section measurements may also be used when the measurement uncertainty and sampling strategy are suitable.',

        caution:
          'A V-block and indicator can be useful for comparative inspection, but the indicated variation depends on the number and phase of lobes and on the V-block angle. It is not universally equal to the circularity error.'
      },

      cylindricity: {
        name: 'Cylindricity',

        def:
          'Controls the form of an entire cylindrical surface, combining deviations that may include roundness, straightness of surface elements and variation of the cylindrical form.',

        zone:
          'The complete controlled surface must lie between two coaxial cylinders whose radial separation equals the cylindricity tolerance.',

        datum:
          'Cylindricity is a form control and does not require a datum reference.',

        measure:
          'Inspection generally requires a cylindricity/form measuring machine or a sufficiently capable CMM using multiple circumferential and axial traces with an appropriate evaluation algorithm.',

        caution:
          'Cylindricity is not simply a diameter tolerance and it is not a runout tolerance. A diameter measurement alone cannot establish cylindricity.'
      },

      profile_line: {
        name: 'Profile of a Line',

        def:
          'Controls the shape of individual line elements relative to the theoretically exact profile defined by basic dimensions, CAD geometry or other theoretically exact geometry.',

        zone:
          'The tolerance zone is bounded by two lines following the true profile. Unless otherwise specified, the tolerance is distributed according to the applicable profile specification rules.',

        datum:
          'A profile-of-a-line tolerance may be datum-independent when used only as a form control, or datum-related when orientation and/or location relative to a datum reference frame must also be controlled.',

        measure:
          'Inspection may use a CMM, contour measuring system, optical system or comparator. Measured points are compared with the theoretically exact profile using the datum reference frame when one is specified.',

        caution:
          'Profile does not inherently require a datum. Whether datums are needed depends on the intended degrees of freedom and the actual feature control frame.'
      },

      profile_surface: {
        name: 'Profile of a Surface',

        def:
          'Controls a three-dimensional surface relative to its theoretically exact geometry.',

        zone:
          'The tolerance zone consists of two boundary surfaces following the true profile and separated by the specified profile tolerance.',

        datum:
          'Profile of a surface may be used without datums as a form control or with datum references to additionally control orientation and location.',

        measure:
          'Typical methods include CMM probing or scanning and optical/3D scanning where measurement uncertainty is adequate. Actual measured points are evaluated relative to the theoretically exact surface and, when applicable, the datum reference frame.',

        caution:
          'Comparison to a CAD model is meaningful only when the alignment corresponds to the drawing datum scheme or to the specified datum-independent evaluation.'
      },

      parallelism: {
        name: 'Parallelism',

        def:
          'Controls the orientation of a surface, line or derived feature relative to a specified datum. It does not by itself establish the location of the controlled feature.',

        zone:
          'For a planar surface, the tolerance zone is typically two parallel planes separated by the tolerance value and oriented parallel to the referenced datum plane.',

        datum:
          'Parallelism is an orientation control and requires an appropriate datum reference.',

        measure:
          'Establish the datum reference in a controlled setup or CMM datum reference frame, then evaluate the controlled feature relative to the orientation imposed by that datum.',

        caution:
          'Parallelism is not simply a requirement for equal distance from the datum. The controlled feature must fit within the specified orientation tolerance zone.'
      },

      perpendicularity: {
        name: 'Perpendicularity',

        def:
          'Controls orientation at a theoretically exact 90° relationship to the referenced datum. The tolerance applies to a zone around that basic orientation, not to an impossible requirement of zero angular error.',

        zone:
          'For a planar surface, the tolerance zone is two parallel planes separated by the tolerance value and oriented exactly 90° to the referenced datum plane. For an axis, a cylindrical tolerance zone may be specified when appropriate.',

        datum:
          'Perpendicularity requires a datum reference that establishes the theoretically exact orientation.',

        measure:
          'Establish the datum reference, then measure the controlled surface or derived axis with a CMM, indicator setup or other suitable equipment. Evaluate the complete controlled feature against the specified tolerance-zone geometry.',

        caution:
          'A square and indicator can be useful for shop-floor verification, but setup error and reference quality must be included in the measurement uncertainty.'
      },

      angularity: {
        name: 'Angularity',

        def:
          'Controls orientation at a theoretically exact basic angle other than 0° or 90° relative to a datum reference.',

        zone:
          'For a planar surface, the tolerance zone is typically two parallel planes separated by the tolerance value and oriented at the specified basic angle relative to the datum.',

        datum:
          'Angularity requires a datum reference and a theoretically exact basic angle.',

        measure:
          'The datum reference and basic angle may be established using a CMM or a calibrated angular setup such as a sine bar, depending on geometry and required uncertainty.',

        caution:
          'The tolerance value is normally a linear tolerance-zone width, not a ± angular tolerance in degrees.'
      },

      position: {
        name: 'Position',

        def:
          'Controls the location of a feature of size relative to its theoretically exact position and, when specified, its orientation relative to a datum reference frame.',

        zone:
          'For a hole axis, a common specification uses a cylindrical tolerance zone of the stated diameter centered on the theoretically exact axis established by basic dimensions and the datum reference frame.',

        datum:
          'Position is commonly related to one or more datum references. The actual datum sequence and any material-boundary modifiers must come from the drawing specification.',

        measure:
          'A CMM can establish the datum reference frame, derive the actual feature axis or center and evaluate whether it lies within the specified positional tolerance zone. Functional gauges may also be applicable for appropriate specifications.',

        caution:
          'Position is not simply the X/Y distance between an actual center and a nominal coordinate. The result depends on the defined tolerance-zone geometry, datum reference frame and any applicable material condition modifiers.'
      },

      concentricity: {
        name: 'Concentricity',

        def:
          'Concentricity is a specialized median-point/median-element control in standards and revisions where it is defined. It should not be treated as a synonym for coaxiality, position or runout.',

        zone:
          'The derived median points of the controlled feature are evaluated relative to the datum axis within the tolerance-zone definition applicable to the invoked standard.',

        datum:
          'A datum axis is required for a concentricity specification.',

        measure:
          'Inspection requires sufficient measurement of opposed surface elements to derive median points or median elements. A suitable CMM strategy is generally more appropriate than a simple indicator reading.',

        caution:
          'Indicator runout does not directly measure concentricity. Runout includes surface form and eccentricity effects, whereas concentricity evaluates derived median information.'
      },

      symmetry: {
        name: 'Symmetry',

        def:
          'Symmetry is a median-plane/median-element control in standards and revisions where it is defined. It controls derived median information relative to a datum center plane.',

        zone:
          'The derived median plane or median points must lie within two parallel planes symmetrically disposed about the datum center plane, according to the applicable specification.',

        datum:
          'Symmetry requires an appropriate datum center plane.',

        measure:
          'Measurement generally requires opposed-point data from the controlled feature and derivation of median points or a median plane, typically using a CMM.',

        caution:
          'Checking only the two outside distances from a datum does not necessarily reproduce the standardized symmetry evaluation.'
      },

      circular_runout: {
        name: 'Circular Runout',

        def:
          'Controls the variation of individual circular elements of a surface as the part is rotated about the established datum axis.',

        zone:
          'At each evaluated circular section, the total indicator variation during one complete revolution must not exceed the specified circular runout tolerance.',

        datum:
          'Circular runout requires a datum axis or datum system that establishes the axis of rotation.',

        measure:
          'Establish the datum axis, place the indicator at one specified axial section and rotate the part through 360°. The full indicator movement at that section is evaluated.',

        caution:
          'Circular runout is evaluated section by section. It does not impose the same full-surface requirement as total runout.'
      },

      total_runout: {
        name: 'Total Runout',

        def:
          'Controls the cumulative variation of an entire surface while the part is rotated about the established datum axis and the probe is traversed over the controlled surface.',

        zone:
          'The complete controlled surface must satisfy the total runout requirement during simultaneous rotational and axial evaluation relative to the datum axis.',

        datum:
          'Total runout requires a datum axis or datum system that establishes the axis of rotation.',

        measure:
          'Establish the datum axis, rotate the part continuously and traverse the indicator or probe along the complete controlled surface. The total observed variation must remain within tolerance.',

        caution:
          'Total runout is more comprehensive than circular runout because the requirement applies over the entire controlled surface, not only individual cross-sections.'
      }
    },

    panelTitle:
      'Tolerance Details & Inspection Guide',

    definition:
      'Engineering Definition',

    toleranceZone:
      'Tolerance Zone',

    datumRequirement:
      'Datum Requirement',

    measurement:
      'Inspection / Measurement Method',

    caution:
      'Engineering Note',

    frameExample:
      'Example Feature Control Frame',

    exampleOnly:
      'Educational example only — the actual FCF must follow the drawing requirement.',

    standardsNote:
      'ISO 1101 and ASME Y14.5 are separate standards. Verify which standard and revision is invoked by the drawing.',

    standardSystem: 'Reference system',
    isoNote:
      'ISO mode uses ISO 1101:2017 as the reference framework for this educational guide.',
    asmeNote:
      'ASME mode uses ASME Y14.5-2018 as the reference framework. Concentricity and symmetry are not supported controls in the 2018 edition and are therefore hidden in this mode.',
    standardScope:
      'Educational reference only — always interpret the production drawing according to the explicitly invoked standard, revision and company requirements.',

    noDatum:
      'No datum reference',

    optionalDatum:
      'Datum optional / specification-dependent',

    requiredDatum:
      'Datum reference required'
  },


  ro: {
    categories: {
      form: 'Toleranțe de Formă',
      profile: 'Toleranțe de Profil',
      orientation: 'Toleranțe de Orientare',
      location: 'Toleranțe de Poziție',
      runout: 'Toleranțe de Bătaie'
    },

    items: {
      straightness: {
        name: 'Rectilinitate',

        def:
          'Controlează rectilinitatea unui element liniar al unei suprafețe. Atunci când se aplică unei linii mediane derivate sau axei unei caracteristici de mărime, interpretarea și geometria zonei de toleranță depind de specificația de pe desen.',

        zone:
          'Pentru rectilinitatea unui element liniar de suprafață, fiecare linie controlată trebuie să fie cuprinsă între două linii drepte paralele aflate la distanța egală cu toleranța. Pentru rectilinitatea unei axe/linii mediane poate fi utilizată o zonă cilindrică atunci când aceasta este indicată explicit.',

        datum:
          'Rectilinitatea este o toleranță de formă și nu necesită bază de referință (datum).',

        measure:
          'Rectilinitatea unei generatoare poate fi verificată prin trasarea elementului liniar cu comparatorul sau prin scanare într-un sistem de măsurare stabil. Pentru rectilinitatea unei axe/linii mediane sunt necesare, de regulă, măsurări în mai multe secțiuni și determinarea liniei derivate.',

        caution:
          'O simplă baleiere cu comparatorul conține și influența dispozitivului și a modului de sprijinire. Indicația comparatorului nu este automat egală cu abaterea de rectilinitate definită de standard.'
      },

      flatness: {
        name: 'Planeitate',

        def:
          'Controlează forma întregii suprafețe independent de orice bază de referință. Planeitatea limitează abaterea suprafeței reale față de o formă plană ideală.',

        zone:
          'Întreaga suprafață controlată trebuie să fie cuprinsă între două plane paralele separate prin valoarea toleranței de planeitate.',

        datum:
          'Planeitatea nu necesită și nu se raportează la un datum.',

        measure:
          'Metodele pot include măsurarea pe CMM, scanarea suprafeței, echipamente dedicate de formă sau metode corespunzătoare pe masă de granit. Punctele măsurate trebuie evaluate față de două plane paralele care definesc zona de toleranță.',

        caution:
          'Așezarea directă a suprafeței controlate pe masa de granit poate constrânge sau masca forma reală. Strategia de sprijinire trebuie aleasă în funcție de scopul măsurării.'
      },

      circularity: {
        name: 'Circularitate (Rotunjime)',

        def:
          'Controlează forma elementelor circulare individuale ale unei suprafețe. Circularitatea este o toleranță de formă și se evaluează independent de o axă datum.',

        zone:
          'În fiecare secțiune evaluată, elementul circular real trebuie să fie cuprins între două cercuri concentrice a căror separare radială este egală cu toleranța de circularitate.',

        datum:
          'Circularitatea nu necesită datum.',

        measure:
          'Pentru precizie ridicată se utilizează de preferință un aparat de măsurat rotunjimea cu ax de rotație de înaltă precizie. Se poate utiliza și CMM dacă strategia de eșantionare și incertitudinea sunt adecvate.',

        caution:
          'Prismele V și comparatorul pot fi utile pentru control comparativ, dar indicația depinde de numărul de lobi, faza acestora și unghiul prismei. Valoarea indicată nu este în mod universal egală cu abaterea de circularitate.'
      },

      cylindricity: {
        name: 'Cilindricitate',

        def:
          'Controlează forma întregii suprafețe cilindrice și include efecte de formă care pot proveni din rotunjime, rectilinitatea generatoarelor și variația formei cilindrice pe lungime.',

        zone:
          'Întreaga suprafață controlată trebuie să fie cuprinsă între doi cilindri coaxiali, separați radial prin valoarea toleranței de cilindricitate.',

        datum:
          'Cilindricitatea este o toleranță de formă și nu necesită datum.',

        measure:
          'Controlul riguros necesită de regulă un aparat de formă/cilindricitate sau un CMM suficient de capabil, cu măsurări circumferențiale și axiale multiple și cu o metodă de evaluare corespunzătoare.',

        caution:
          'Cilindricitatea nu este o toleranță de diametru și nici o toleranță de bătaie. Măsurarea diametrului în câteva secțiuni nu demonstrează singură conformitatea la cilindricitate.'
      },

      profile_line: {
        name: 'Profilul unei Linii',

        def:
          'Controlează forma elementelor liniare individuale față de profilul teoretic exact definit prin cote de bază, geometrie CAD sau alte elemente teoretic exacte.',

        zone:
          'Zona de toleranță este delimitată de două linii care urmăresc profilul teoretic exact, separate conform valorii toleranței și regulilor aplicabile specificației de profil.',

        datum:
          'Profilul unei linii poate fi independent de datum atunci când controlează numai forma sau poate fi raportat la datums atunci când trebuie controlate și orientarea și/sau poziția.',

        measure:
          'Se poate utiliza CMM, aparat de contur, sistem optic sau proiector de profile. Punctele măsurate se compară cu profilul teoretic exact și, dacă sunt specificate datums, cu sistemul de referință corespunzător.',

        caution:
          'Profilul nu necesită în mod inerent datum. Necesitatea bazelor de referință rezultă din funcția specificației și din FCF-ul real de pe desen.'
      },

      profile_surface: {
        name: 'Profilul unei Suprafețe',

        def:
          'Controlează o suprafață tridimensională față de geometria sa teoretic exactă.',

        zone:
          'Zona de toleranță este delimitată de două suprafețe care urmăresc profilul teoretic exact și sunt separate conform toleranței specificate.',

        datum:
          'Profilul unei suprafețe poate fi utilizat fără datum ca toleranță de formă sau cu datums pentru a controla suplimentar orientarea și poziția suprafeței.',

        measure:
          'Metodele uzuale includ palparea sau scanarea pe CMM și scanarea optică/3D atunci când incertitudinea este adecvată. Punctele măsurate se evaluează față de suprafața teoretic exactă și, dacă este cazul, față de sistemul de referință datum.',

        caution:
          'O simplă aliniere best-fit la modelul CAD poate elimina abateri pe care desenul intenționează să le controleze. Alinierea trebuie să respecte schema datum atunci când aceasta este specificată.'
      },

      parallelism: {
        name: 'Paralelism',

        def:
          'Controlează orientarea unei suprafețe, linii sau caracteristici derivate față de un datum specificat. Paralelismul nu stabilește singur poziția caracteristicii.',

        zone:
          'Pentru o suprafață plană, zona de toleranță este în mod uzual formată din două plane paralele separate prin valoarea toleranței și orientate paralel cu planul datum.',

        datum:
          'Paralelismul este o toleranță de orientare și necesită un datum corespunzător.',

        measure:
          'Se stabilește baza de referință în dispozitivul de măsurare sau sistemul de coordonate CMM, apoi se evaluează caracteristica controlată față de orientarea impusă de datum.',

        caution:
          'Paralelismul nu înseamnă simplu că suprafața trebuie să fie la distanță egală față de datum. Cerința este ca elementul controlat să încapă în zona de toleranță orientată corespunzător.'
      },

      perpendicularity: {
        name: 'Perpendicularitate',

        def:
          'Controlează orientarea la relația teoretic exactă de 90° față de datum. Toleranța definește o zonă în jurul acestei orientări de bază; nu impune o eroare unghiulară nulă.',

        zone:
          'Pentru o suprafață plană, zona este formată din două plane paralele separate prin valoarea toleranței și orientate exact la 90° față de datum. Pentru o axă poate exista o zonă cilindrică atunci când este specificată corespunzător.',

        datum:
          'Perpendicularitatea necesită un datum care stabilește orientarea teoretic exactă.',

        measure:
          'Se stabilește datum-ul, apoi se măsoară suprafața sau axa derivată cu CMM, comparator sau alt echipament adecvat. Caracteristica trebuie evaluată față de geometria completă a zonei de toleranță.',

        caution:
          'Echerul și comparatorul pot fi utile pentru control în atelier, dar eroarea dispozitivului, calitatea datum-ului și incertitudinea de măsurare trebuie luate în considerare.'
      },

      angularity: {
        name: 'Înclinare / Angularitate',

        def:
          'Controlează orientarea la un unghi de bază teoretic exact, diferit de 0° sau 90°, față de un datum.',

        zone:
          'Pentru o suprafață plană, zona este în mod uzual formată din două plane paralele separate prin valoarea toleranței și orientate la unghiul de bază specificat față de datum.',

        datum:
          'Angularitatea necesită un datum și un unghi de bază teoretic exact.',

        measure:
          'Datum-ul și unghiul teoretic pot fi stabilite cu CMM sau printr-un dispozitiv unghiular calibrat, de exemplu riglă sinus, în funcție de geometrie și de incertitudinea necesară.',

        caution:
          'Valoarea din cadrul de toleranță este în mod normal lățimea unei zone de toleranță liniare, nu o toleranță unghiulară de tip ± grade.'
      },

      position: {
        name: 'Poziție',

        def:
          'Controlează poziția unei caracteristici de mărime față de poziția sa teoretic exactă și, atunci când este specificat, orientarea acesteia față de sistemul de referință datum.',

        zone:
          'Pentru axa unui alezaj, o specificație uzuală utilizează o zonă cilindrică având diametrul indicat în FCF, centrată pe axa teoretic exactă definită prin cote de bază și sistemul datum.',

        datum:
          'Poziția este în mod uzual raportată la unul sau mai multe datums. Ordinea A-B-C și eventualele modificatoare de condiție de material trebuie preluate din specificația reală a desenului.',

        measure:
          'Pe CMM se stabilește sistemul de referință datum, se determină caracteristica asociată a alezajului/arborelui și se verifică dacă axa sau centrul derivat respectă zona de poziție specificată. Pentru anumite specificații pot fi utilizate și calibre funcționale.',

        caution:
          'Poziția nu este simpla distanță X/Y dintre centrul măsurat și coordonata nominală. Evaluarea depinde de geometria zonei de toleranță, de sistemul datum și de eventualele modificatoare de condiție de material.'
      },

      concentricity: {
        name: 'Concentricitate',

        def:
          'Concentricitatea este un control specializat al punctelor/elementelor mediane în standardele și edițiile în care este definită. Nu trebuie tratată ca sinonim pentru coaxialitate, poziție sau bătaie.',

        zone:
          'Punctele mediane derivate ale caracteristicii controlate sunt evaluate față de axa datum conform definiției zonei de toleranță din standardul aplicabil.',

        datum:
          'Concentricitatea necesită o axă datum.',

        measure:
          'Controlul necesită suficiente măsurări ale elementelor opuse ale suprafeței pentru determinarea punctelor sau elementelor mediane. În practică este adecvată o strategie CMM corespunzătoare.',

        caution:
          'Bătaia măsurată cu comparatorul nu reprezintă direct concentricitatea. Bătaia conține influențe ale formei suprafeței și excentricității, în timp ce concentricitatea evaluează informația mediană derivată.'
      },

      symmetry: {
        name: 'Simetrie',

        def:
          'Simetria este un control al planului/elementului median în standardele și edițiile în care este definită. Controlează informația mediană derivată față de un plan median datum.',

        zone:
          'Planul median derivat sau punctele mediane trebuie să se încadreze între două plane paralele dispuse simetric față de planul median datum, conform specificației aplicabile.',

        datum:
          'Simetria necesită un plan median datum corespunzător.',

        measure:
          'În general sunt necesare măsurări ale punctelor opuse ale caracteristicii și determinarea punctelor mediane sau a planului median, de regulă prin CMM.',

        caution:
          'Compararea simplă a două distanțe exterioare față de un datum nu reproduce neapărat evaluarea standardizată a simetriei.'
      },

      circular_runout: {
        name: 'Bătaie Circulară',

        def:
          'Controlează variația elementelor circulare individuale ale unei suprafețe în timpul rotirii piesei în jurul axei datum stabilite.',

        zone:
          'În fiecare secțiune circulară evaluată, variația totală indicată pe durata unei rotații complete nu trebuie să depășească toleranța de bătaie circulară.',

        datum:
          'Bătaia circulară necesită o axă datum sau un sistem datum care stabilește axa de rotație.',

        measure:
          'Se materializează sau se stabilește axa datum, comparatorul se poziționează într-o secțiune axială determinată, iar piesa se rotește 360°. Se evaluează variația totală a indicației în acea secțiune.',

        caution:
          'Bătaia circulară se verifică secțiune cu secțiune. Nu impune aceeași cerință asupra întregii suprafețe ca bătaia totală.'
      },

      total_runout: {
        name: 'Bătaie Totală',

        def:
          'Controlează variația cumulată a întregii suprafețe în timpul rotirii piesei în jurul axei datum și al deplasării palpatorului pe suprafața controlată.',

        zone:
          'Întreaga suprafață controlată trebuie să respecte cerința de bătaie totală în timpul evaluării combinate de rotație și deplasare axială față de axa datum.',

        datum:
          'Bătaia totală necesită o axă datum sau un sistem datum care stabilește axa de rotație.',

        measure:
          'Se stabilește axa datum, piesa se rotește continuu, iar comparatorul sau palpatorul este deplasat de-a lungul întregii suprafețe controlate. Variația totală observată trebuie să rămână în toleranță.',

        caution:
          'Bătaia totală este mai cuprinzătoare decât bătaia circulară deoarece cerința se aplică întregii suprafețe controlate, nu doar secțiunilor individuale.'
      }
    },

    panelTitle:
      'Detalii Toleranță & Ghid Metrologic',

    definition:
      'Definiție inginerească',

    toleranceZone:
      'Zona de toleranță',

    datumRequirement:
      'Cerință Datum',

    measurement:
      'Metodă de control / măsurare',

    caution:
      'Observație inginerească',

    frameExample:
      'Exemplu Feature Control Frame',

    exampleOnly:
      'Exemplu educațional — FCF-ul real trebuie stabilit conform cerinței desenului.',

    standardsNote:
      'ISO 1101 și ASME Y14.5 sunt standarde distincte. Verifică standardul și ediția invocate explicit pe desen.',

    standardSystem: 'Sistem de referință',
    isoNote:
      'Modul ISO folosește ISO 1101:2017 ca referință pentru terminologia și interpretarea educațională din acest ghid.',
    asmeNote:
      'Modul ASME folosește ASME Y14.5-2018 ca referință. Concentricitatea și simetria nu mai sunt controale suportate în ediția 2018 și sunt ascunse în acest mod.',
    standardScope:
      'Referință educațională — desenul de producție trebuie interpretat întotdeauna conform standardului, ediției și cerințelor companiei indicate explicit.',

    noDatum:
      'Nu necesită datum',

    optionalDatum:
      'Datum opțional / dependent de specificație',

    requiredDatum:
      'Necesită datum'
  }
};




const GDT_EXAMPLE_PRESETS = [
  {
    id: 'flatness-iso',
    title: { en: 'Flatness — ISO', ro: 'Planeitate — ISO' },
    description: { en: 'Form-control example without a datum reference.', ro: 'Exemplu de control al formei fără referință la datum.' }
  },
  {
    id: 'position-asme',
    title: { en: 'Position — ASME', ro: 'Poziție — ASME' },
    description: { en: 'Location-control example using the ASME Y14.5 profile.', ro: 'Exemplu de control al poziției folosind profilul ASME Y14.5.' }
  },
  {
    id: 'runout-iso',
    title: { en: 'Total runout — ISO', ro: 'Bătaie totală — ISO' },
    description: { en: 'Runout-control example for rotating features.', ro: 'Exemplu de control al bătăii pentru elemente rotative.' }
  }
];



/* =========================================================
   GD&T SELECTION ASSISTANT
   ========================================================= */

const ASSISTANT_CATEGORY_COPY = {
  form: {
    en: {
      title: 'Shape of one feature',
      description:
        'Use form controls when you want to limit the shape of a surface or feature without orienting or locating it to a datum.'
    },
    ro: {
      title: 'Forma unui singur element',
      description:
        'Folosește toleranțe de formă când vrei să limitezi forma unei suprafețe sau caracteristici fără s-o orientezi sau poziționezi față de un datum.'
    }
  },
  orientation: {
    en: {
      title: 'Orientation to another feature',
      description:
        'Use orientation controls when the feature must be parallel, perpendicular or at a basic angle relative to a datum.'
    },
    ro: {
      title: 'Orientare față de alt element',
      description:
        'Folosește toleranțe de orientare când elementul trebuie să fie paralel, perpendicular sau la un unghi de bază față de un datum.'
    }
  },
  location: {
    en: {
      title: 'Location of holes, axes or features',
      description:
        'Use location controls when the functional requirement is where a feature is located relative to theoretically exact geometry and a datum reference frame.'
    },
    ro: {
      title: 'Poziția găurilor, axelor sau elementelor',
      description:
        'Folosește toleranțe de poziție când cerința funcțională este localizarea unei caracteristici față de geometria teoretic exactă și un sistem de datum-uri.'
    }
  },
  profile: {
    en: {
      title: 'Complex line or surface shape',
      description:
        'Use profile when the true line or surface shape matters and the control may also include orientation and location when datums are referenced.'
    },
    ro: {
      title: 'Profil complex de linie sau suprafață',
      description:
        'Folosește profilul când contează forma teoretic exactă a liniei sau suprafeței și, dacă sunt indicate datum-uri, și orientarea sau poziția.'
    }
  },
  runout: {
    en: {
      title: 'Rotating surface behavior',
      description:
        'Use runout controls when a rotating surface must be evaluated relative to an established datum axis.'
    },
    ro: {
      title: 'Comportarea unei suprafețe la rotație',
      description:
        'Folosește toleranțele de bătaie când o suprafață rotativă trebuie evaluată față de o axă datum stabilită.'
    }
  }
};

const WHEN_TO_USE = {
  straightness: {
    en: 'Use it when one line element, or a specified derived axis/median line, must remain straight without locating it to another feature.',
    ro: 'Folosește-o când un element liniar, sau o axă/linie mediană derivată specificată, trebuie să rămână rectiliniu fără raportare la alt element.'
  },
  flatness: {
    en: 'Use it when an entire surface must be flat in itself, independent of another surface or datum.',
    ro: 'Folosește-o când întreaga suprafață trebuie să fie plană în sine, independent de altă suprafață sau datum.'
  },
  circularity: {
    en: 'Use it when each circular cross-section must remain round, without reference to a datum axis.',
    ro: 'Folosește-o când fiecare secțiune circulară trebuie să rămână rotundă, fără raportare la o axă datum.'
  },
  cylindricity: {
    en: 'Use it when the complete cylindrical surface form matters over both circumference and length.',
    ro: 'Folosește-o când contează forma întregii suprafețe cilindrice, atât circumferențial cât și pe lungime.'
  },
  profile_line: {
    en: 'Use it for a theoretically exact 2D line profile, especially on contoured geometry.',
    ro: 'Folosește-o pentru un profil liniar 2D teoretic exact, mai ales la geometrii conturate.'
  },
  profile_surface: {
    en: 'Use it for a theoretically exact 3D surface and when one control may need to manage form, orientation and location.',
    ro: 'Folosește-o pentru o suprafață 3D teoretic exactă și când un singur control trebuie să gestioneze forma, orientarea și poziția.'
  },
  parallelism: {
    en: 'Use it when a surface, line or derived feature must maintain orientation parallel to a datum.',
    ro: 'Folosește-o când o suprafață, linie sau caracteristică derivată trebuie să rămână orientată paralel cu un datum.'
  },
  perpendicularity: {
    en: 'Use it when a feature must maintain a 90° basic orientation to a datum.',
    ro: 'Folosește-o când o caracteristică trebuie să mențină orientarea de bază de 90° față de un datum.'
  },
  angularity: {
    en: 'Use it when a feature must maintain a basic angle other than 0° or 90° relative to a datum.',
    ro: 'Folosește-o când o caracteristică trebuie să mențină un unghi de bază diferit de 0° sau 90° față de un datum.'
  },
  position: {
    en: 'Use it primarily to locate features of size such as holes, pins, slots or patterns relative to basic dimensions and datums.',
    ro: 'Folosește-o în principal pentru localizarea caracteristicilor de mărime precum găuri, pini, canale sau grupuri de găuri față de cote de bază și datum-uri.'
  },
  concentricity: {
    en: 'Use only when the invoked standard/revision explicitly defines and requires this specialized median-element control.',
    ro: 'Folosește-o numai când standardul/ediția invocată definește și cere explicit acest control specializat al elementelor mediane.'
  },
  symmetry: {
    en: 'Use only when the invoked standard/revision explicitly defines and requires this specialized median-plane control.',
    ro: 'Folosește-o numai când standardul/ediția invocată definește și cere explicit acest control specializat al planului median.'
  },
  circular_runout: {
    en: 'Use it when variation of individual circular sections during rotation about a datum axis is the functional concern.',
    ro: 'Folosește-o când variația secțiunilor circulare individuale în timpul rotației față de o axă datum este cerința funcțională.'
  },
  total_runout: {
    en: 'Use it when the behavior of the entire rotating surface over its length must be controlled relative to a datum axis.',
    ro: 'Folosește-o când trebuie controlată întreaga suprafață rotativă pe lungime față de o axă datum.'
  }
};

const COMMON_CONFUSIONS = {
  flatness: {
    en: 'Flatness is not parallelism. Flatness does not reference a datum; parallelism does.',
    ro: 'Planeitatea nu este paralelism. Planeitatea nu se raportează la datum; paralelismul da.'
  },
  parallelism: {
    en: 'Parallelism does not make the surface flat by itself; it controls orientation to the datum.',
    ro: 'Paralelismul nu face singur suprafața plană; el controlează orientarea față de datum.'
  },
  perpendicularity: {
    en: 'The tolerance value is a zone width, not simply a ± angular error in degrees.',
    ro: 'Valoarea toleranței este lățimea unei zone, nu doar o eroare unghiulară ± exprimată în grade.'
  },
  position: {
    en: 'Position is not simply X/Y coordinate error. Datum references, zone shape and material modifiers can change the evaluation.',
    ro: 'Poziția nu este doar eroarea pe coordonate X/Y. Datum-urile, forma zonei și modificatorii de material pot schimba evaluarea.'
  },
  circular_runout: {
    en: 'Circular runout is checked section by section; it is not the same as total runout.',
    ro: 'Bătaia circulară se verifică secțiune cu secțiune; nu este același lucru cu bătaia totală.'
  },
  total_runout: {
    en: 'Total runout controls the complete surface during rotation and traverse, not only one circular section.',
    ro: 'Bătaia totală controlează întreaga suprafață în timpul rotației și deplasării palpatorului, nu doar o singură secțiune circulară.'
  },
  concentricity: {
    en: 'Concentricity is not equivalent to indicator runout or simple coaxiality.',
    ro: 'Concentricitatea nu este echivalentă cu bătaia măsurată cu comparatorul sau cu simpla coaxialitate.'
  },
  symmetry: {
    en: 'Symmetry is a derived-median control, not simply equal outside dimensions on both sides.',
    ro: 'Simetria este un control al elementelor mediane derivate, nu doar egalitatea a două dimensiuni exterioare.'
  }
};

const RELATED_CONTROLS = {
  straightness: ['flatness', 'cylindricity'],
  flatness: ['straightness', 'parallelism', 'profile_surface'],
  circularity: ['cylindricity', 'circular_runout'],
  cylindricity: ['circularity', 'total_runout'],
  profile_line: ['profile_surface', 'position'],
  profile_surface: ['profile_line', 'position'],
  parallelism: ['flatness', 'perpendicularity', 'angularity'],
  perpendicularity: ['parallelism', 'angularity', 'position'],
  angularity: ['parallelism', 'perpendicularity'],
  position: ['profile_surface', 'circular_runout'],
  concentricity: ['position', 'circular_runout', 'total_runout'],
  symmetry: ['position', 'profile_surface'],
  circular_runout: ['total_runout', 'circularity', 'position'],
  total_runout: ['circular_runout', 'cylindricity']
};

/* =========================================================
   MAIN COMPONENT
   ========================================================= */

export default function GdtModule({
  unitSystem = 'metric',
  isDark,
  experienceMode = 'quick',
  lang = 'ro',
  onPrint
}) {
  const t =
    TRANSLATIONS[lang] ||
    TRANSLATIONS.ro;

  const [
    selectedGdt,
    setSelectedGdt
  ] = useState('flatness');


  const [
    standardSystem,
    setStandardSystem
  ] = useState('iso');



  useEffect(() => {
    const timer = window.setTimeout(() => {
      const params = new URLSearchParams(window.location.search);
      if (params.get('share') !== '1') return;

      const standardId = params.get('standard');
      const elementId = params.get('control');

      if (standardId && Object.prototype.hasOwnProperty.call(STANDARD_PROFILES, standardId)) {
        setStandardSystem(standardId);
      }

      if (elementId && GDT_ELEMENTS.some((element) => element.id === elementId)) {
        const profile = STANDARD_PROFILES[standardId] || STANDARD_PROFILES.iso;
        setSelectedGdt(profile.unsupported.includes(elementId) ? 'flatness' : elementId);
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, []);

  const gdtObj =
    GDT_ELEMENTS.find(
      (element) =>
        element.id === selectedGdt
    );


  const gdtData =
    t.items[selectedGdt];


  const meta =
    GDT_META[selectedGdt];


  const standard =
    STANDARD_PROFILES[standardSystem];


  const availableElements =
    GDT_ELEMENTS.filter(
      (element) =>
        !standard.unsupported.includes(
          element.id
        )
    );


  const currentCategory =
    gdtObj?.cat || 'form';


  const currentCategoryCopy =
    ASSISTANT_CATEGORY_COPY[
      currentCategory
    ]?.[lang] ||
    ASSISTANT_CATEGORY_COPY[
      currentCategory
    ].en;


  const whenToUse =
    WHEN_TO_USE[
      selectedGdt
    ]?.[lang] ||
    WHEN_TO_USE[
      selectedGdt
    ]?.en ||
    '';


  const commonConfusion =
    COMMON_CONFUSIONS[
      selectedGdt
    ]?.[lang] ||
    COMMON_CONFUSIONS[
      selectedGdt
    ]?.en ||
    '';


  const relatedControls =
    (
      RELATED_CONTROLS[
        selectedGdt
      ] || []
    )
      .filter(
        id =>
          !standard.unsupported.includes(
            id
          )
      )
      .slice(0, 3);


  const chooseCategory =
    categoryId => {
      const firstControl =
        availableElements.find(
          element =>
            element.cat ===
            categoryId
        );

      if (firstControl) {
        setSelectedGdt(
          firstControl.id
        );
      }
    };


  const handleStandardChange =
    (nextStandard) => {
      const nextProfile =
        STANDARD_PROFILES[nextStandard];

      setStandardSystem(
        nextStandard
      );

      if (
        nextProfile.unsupported.includes(
          selectedGdt
        )
      ) {
        setSelectedGdt(
          'position'
        );
      }
    };


  /* =======================================================
     UI THEME
     ======================================================= */

  const ui = {
    card:
      isDark
        ? 'bg-slate-900/90 border-slate-800 shadow-xl'
        : 'bg-white border-slate-200 shadow-lg',

    subCard:
      isDark
        ? 'bg-slate-950 border-slate-800/90'
        : 'bg-slate-50 border-slate-200',

    titleText:
      isDark
        ? 'text-white'
        : 'text-slate-900',

    bodyText:
      isDark
        ? 'text-slate-300'
        : 'text-slate-700',

    subText:
      isDark
        ? 'text-slate-400'
        : 'text-slate-600',

    divider:
      isDark
        ? 'border-slate-800'
        : 'border-slate-200'
  };




  const loadExamplePreset =
    (presetId) => {
      if (presetId === 'flatness-iso') {
        setStandardSystem('iso');
        setSelectedGdt('flatness');
        return;
      }

      if (presetId === 'position-asme') {
        setStandardSystem('asme');
        setSelectedGdt('position');
        return;
      }

      setStandardSystem('iso');
      setSelectedGdt('total_runout');
    };


  /* =======================================================
     DATUM LABEL
     ======================================================= */

  const datumLabel = (() => {
    if (meta.datum === 'none') {
      return t.noDatum;
    }

    if (meta.datum === 'optional') {
      return t.optionalDatum;
    }

    return t.requiredDatum;
  })();


  return (
    <div data-unit-system={unitSystem} className={`draftfit-experience-${experienceMode} 
        grid
        grid-cols-1
        lg:grid-cols-12
        gap-7
      `}
    >

      {/* ===================================================
          LEFT COLUMN
          =================================================== */}

      <div
        className="
          lg:col-span-4
          print:hidden
          space-y-6
        "
      >


        <details className="draftfit-assistant-compact print:hidden lg:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea controlului GD&T?' : 'Need help choosing a GD&T control?'}
          </summary>

        <section
          className={`
            overflow-hidden
            rounded-2xl
            border
            border-blue-500/25
            ${ui.card}
          `}
        >
          <div
            className="
              border-b
              border-blue-500/20
              bg-blue-500/5
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
                text-blue-500
              "
            >
              {lang === 'ro'
                ? 'Asistent selecție GD&T'
                : 'GD&T Selection Assistant'}
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
                ? 'Ce vrei să controlezi?'
                : 'What do you want to control?'}
            </h2>

            <p
              className={`
                mt-2
                text-xs
                leading-5
                ${ui.subText}
              `}
            >
              {lang === 'ro'
                ? 'Alege intenția funcțională. DraftFit te duce la o familie de controale de evaluat — nu generează automat o toleranță de desen.'
                : 'Choose the functional intent. DraftFit takes you to a family of controls to evaluate — it does not automatically generate a drawing tolerance.'}
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
            {Object.keys(
              ASSISTANT_CATEGORY_COPY
            ).map(categoryId => {
              const copy =
                ASSISTANT_CATEGORY_COPY[
                  categoryId
                ][lang] ||
                ASSISTANT_CATEGORY_COPY[
                  categoryId
                ].en;

              const categoryAvailable =
                availableElements.some(
                  element =>
                    element.cat ===
                    categoryId
                );

              if (!categoryAvailable) {
                return null;
              }

              const active =
                currentCategory ===
                categoryId;

              return (
                <button
                  key={categoryId}
                  type="button"
                  onClick={() =>
                    chooseCategory(
                      categoryId
                    )
                  }
                  className={`
                    min-h-20
                    rounded-xl
                    border
                    p-3
                    text-left
                    transition
                    ${
                      active
                        ? 'border-blue-500 bg-blue-500/10'
                        : isDark
                          ? 'border-slate-800 bg-slate-950/60 hover:border-blue-500/50'
                          : 'border-slate-200 bg-slate-50 hover:border-blue-300'
                    }
                  `}
                >
                  <span
                    className={`
                      block
                      text-xs
                      font-black
                      ${active
                        ? 'text-blue-500'
                        : ui.titleText}
                    `}
                  >
                    {copy.title}
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
                    {copy.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`
              border-t
              p-4
              sm:p-5
              ${ui.divider}
            `}
          >
            <div
              className="
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
                  font-black
                  uppercase
                  tracking-wider
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Controale de evaluat'
                  : 'Controls to evaluate'}
              </span>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  text-blue-500
                "
              >
                {currentCategoryCopy.title}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {availableElements
                .filter(
                  element =>
                    element.cat ===
                    currentCategory
                )
                .map(element => (
                  <button
                    key={element.id}
                    type="button"
                    onClick={() =>
                      setSelectedGdt(
                        element.id
                      )
                    }
                    className={`
                      min-h-10
                      rounded-lg
                      border
                      px-3
                      py-2
                      text-xs
                      font-bold
                      transition
                      ${
                        selectedGdt === element.id
                          ? 'border-blue-500 bg-blue-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-blue-500/60'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'
                      }
                    `}
                  >
                    <span className="mr-2 font-mono text-base">
                      {element.icon}
                    </span>
                    {t.items[element.id].name}
                  </button>
                ))}
            </div>
          </div>
        </section>

                </details>

{standardSystem === 'asme' && (
          <div
            className="
              rounded-xl
              border
              border-amber-500/30
              bg-amber-500/5
              p-4
              text-xs
              leading-5
              text-amber-500
            "
          >
            <strong className="block font-black">
              {lang === 'ro'
                ? 'Cauți Concentricity sau Symmetry?'
                : 'Looking for Concentricity or Symmetry?'}
            </strong>

            <span>
              {lang === 'ro'
                ? 'În profilul DraftFit pentru ASME Y14.5-2018 aceste controale sunt ascunse. Evaluează Position, Runout sau Profile în funcție de intenția de proiectare.'
                : 'In the DraftFit ASME Y14.5-2018 profile these controls are hidden. Evaluate Position, Runout or Profile depending on the design intent.'}
            </span>
          </div>
        )}

        <div className="lg:hidden">
        <ExamplePresets
          presets={GDT_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-blue-500"
        />
        </div>

        <div className="lg:hidden">
        <ShareCalculationButton
          params={{
            view: experienceMode,
            units: unitSystem,
            standard: standardSystem,
            control: selectedGdt,
          }}
          isDark={isDark}
          lang={lang}
          accentClass="text-blue-500"
        />
        </div>

        <div className="lg:hidden">
        <CopyResultButton
          text={[
            'DraftFit — GD&T Reference',
            `Standard: ${standard.shortLabel}`,
            `Control: ${gdtData.name}`,
            `Definition: ${gdtData.def}`,
            `Tolerance zone: ${gdtData.zone}`,
            `Datum guidance: ${gdtData.datum}`,
            `Inspection guidance: ${gdtData.measure}`,
            `Caution: ${gdtData.caution}`,
          ].join('\n')}
          isDark={isDark}
          lang={lang}
          accentClass="text-blue-500"
        />
        </div>



        <div
          className={`
            p-6
            rounded-2xl
            border
            ${ui.card}
          `}
        >

          <div
            className={`
              mb-6
              pb-6
              border-b
              ${ui.divider}
            `}
          >
            <label
              className={`
                block
                text-[10px]
                uppercase
                font-bold
                tracking-widest
                mb-3
                ${ui.subText}
              `}
            >
              {t.standardSystem}
            </label>

            <div className="grid grid-cols-2 gap-2">
              {Object.values(STANDARD_PROFILES).map((profile) => (
                <button
                  key={profile.id}
                  type="button"
                  onClick={() => handleStandardChange(profile.id)}
                  className={`
                    px-3
                    py-2.5
                    border
                    rounded-lg
                    text-[11px]
                    font-black
                    cursor-pointer
                    transition-colors
                    ${
                      standardSystem === profile.id
                        ? 'bg-blue-600 border-blue-500 text-white'
                        : isDark
                          ? 'bg-slate-950 border-slate-800 text-slate-400 hover:text-white hover:border-blue-500/50'
                          : 'bg-slate-50 border-slate-200 text-slate-600 hover:text-slate-950 hover:border-blue-300'
                    }
                  `}
                >
                  {profile.shortLabel}
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-7">

            {Object.entries(
              t.categories
            ).map(
              ([
                catKey,
                catLabel
              ]) => {

                const items =
                  availableElements.filter(
                    (element) =>
                      element.cat ===
                      catKey
                  );


                if (
                  items.length === 0
                ) {
                  return null;
                }


                return (
                  <div
                    key={
                      catKey
                    }
                  >

                    <h3
                      className={`
                        text-xs
                        uppercase
                        font-bold
                        tracking-wider
                        mb-3
                        ${ui.subText}
                      `}
                    >
                      {catLabel}
                    </h3>


                    <div
                      className="
                        grid
                        grid-cols-2
                        gap-3
                      "
                    >

                      {items.map(
                        (item) => {

                          const active =
                            selectedGdt ===
                            item.id;


                          const itemData =
                            t.items[
                              item.id
                            ];


                          return (
                            <button
                              key={
                                item.id
                              }

                              type="button"

                              onClick={() =>
                                setSelectedGdt(
                                  item.id
                                )
                              }

                              className={`
                                p-3.5
                                rounded-xl
                                border
                                flex
                                flex-col
                                items-center
                                gap-2.5
                                transition-all
                                duration-300
                                cursor-pointer

                                ${
                                  active

                                    ? 'bg-blue-600 border-blue-500 text-white shadow-lg scale-105 z-10'

                                    : isDark

                                      ? 'bg-slate-950/50 border-slate-800 text-slate-300 hover:border-blue-500/50 hover:bg-slate-900'

                                      : 'bg-slate-50 border-slate-200 text-slate-700 hover:border-blue-300 hover:bg-white shadow-sm'
                                }
                              `}
                            >

                              <span
                                className="
                                  text-3xl
                                  font-mono
                                  leading-none
                                  drop-shadow-sm
                                "
                              >
                                {
                                  item.icon
                                }
                              </span>


                              <span
                                className={`
                                  text-[11px]
                                  font-bold
                                  text-center
                                  leading-tight
                                  tracking-wide

                                  ${
                                    active
                                      ? 'text-blue-100'
                                      : ''
                                  }
                                `}
                              >
                                {
                                  itemData.name
                                }
                              </span>

                            </button>
                          );
                        }
                      )}

                    </div>

                  </div>
                );
              }
            )}

          </div>

        </div>

        <div className="hidden lg:block space-y-3">
          <ShareCalculationButton
          params={{
            view: experienceMode,
            units: unitSystem,
            standard: standardSystem,
            control: selectedGdt,
          }}
          isDark={isDark}
          lang={lang}
          accentClass="text-blue-500"
        />

          <CopyResultButton
          text={[
            'DraftFit — GD&T Reference',
            `Standard: ${standard.shortLabel}`,
            `Control: ${gdtData.name}`,
            `Definition: ${gdtData.def}`,
            `Tolerance zone: ${gdtData.zone}`,
            `Datum guidance: ${gdtData.datum}`,
            `Inspection guidance: ${gdtData.measure}`,
            `Caution: ${gdtData.caution}`,
          ].join('\n')}
          isDark={isDark}
          lang={lang}
          accentClass="text-blue-500"
        />

          <button
            type="button"
            onClick={() => {
              if (onPrint) onPrint();
              else window.print();
            }}
            className="w-full rounded-lg bg-blue-600 px-4 py-3 text-xs font-black uppercase tracking-widest text-white transition hover:bg-blue-500"
          >
            {lang === 'ro' ? 'Tipărește / exportă fișa' : 'Print / export sheet'}
          </button>

          <ExamplePresets
          presets={GDT_EXAMPLE_PRESETS}
          onSelect={loadExamplePreset}
          isDark={isDark}
          lang={lang}
          accentClass="text-blue-500"
        />

          <details className="draftfit-assistant-compact print:hidden">
          <summary className={isDark ? 'bg-zinc-900 text-zinc-200 border-zinc-700' : 'bg-white text-zinc-800 border-zinc-300'}>
            {lang === 'ro' ? 'Ai nevoie de ajutor la alegerea controlului GD&T?' : 'Need help choosing a GD&T control?'}
          </summary>

        <section
          className={`
            overflow-hidden
            rounded-2xl
            border
            border-blue-500/25
            ${ui.card}
          `}
        >
          <div
            className="
              border-b
              border-blue-500/20
              bg-blue-500/5
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
                text-blue-500
              "
            >
              {lang === 'ro'
                ? 'Asistent selecție GD&T'
                : 'GD&T Selection Assistant'}
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
                ? 'Ce vrei să controlezi?'
                : 'What do you want to control?'}
            </h2>

            <p
              className={`
                mt-2
                text-xs
                leading-5
                ${ui.subText}
              `}
            >
              {lang === 'ro'
                ? 'Alege intenția funcțională. DraftFit te duce la o familie de controale de evaluat — nu generează automat o toleranță de desen.'
                : 'Choose the functional intent. DraftFit takes you to a family of controls to evaluate — it does not automatically generate a drawing tolerance.'}
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
            {Object.keys(
              ASSISTANT_CATEGORY_COPY
            ).map(categoryId => {
              const copy =
                ASSISTANT_CATEGORY_COPY[
                  categoryId
                ][lang] ||
                ASSISTANT_CATEGORY_COPY[
                  categoryId
                ].en;

              const categoryAvailable =
                availableElements.some(
                  element =>
                    element.cat ===
                    categoryId
                );

              if (!categoryAvailable) {
                return null;
              }

              const active =
                currentCategory ===
                categoryId;

              return (
                <button
                  key={categoryId}
                  type="button"
                  onClick={() =>
                    chooseCategory(
                      categoryId
                    )
                  }
                  className={`
                    min-h-20
                    rounded-xl
                    border
                    p-3
                    text-left
                    transition
                    ${
                      active
                        ? 'border-blue-500 bg-blue-500/10'
                        : isDark
                          ? 'border-slate-800 bg-slate-950/60 hover:border-blue-500/50'
                          : 'border-slate-200 bg-slate-50 hover:border-blue-300'
                    }
                  `}
                >
                  <span
                    className={`
                      block
                      text-xs
                      font-black
                      ${active
                        ? 'text-blue-500'
                        : ui.titleText}
                    `}
                  >
                    {copy.title}
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
                    {copy.description}
                  </span>
                </button>
              );
            })}
          </div>

          <div
            className={`
              border-t
              p-4
              sm:p-5
              ${ui.divider}
            `}
          >
            <div
              className="
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
                  font-black
                  uppercase
                  tracking-wider
                  ${ui.subText}
                `}
              >
                {lang === 'ro'
                  ? 'Controale de evaluat'
                  : 'Controls to evaluate'}
              </span>

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-wider
                  text-blue-500
                "
              >
                {currentCategoryCopy.title}
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {availableElements
                .filter(
                  element =>
                    element.cat ===
                    currentCategory
                )
                .map(element => (
                  <button
                    key={element.id}
                    type="button"
                    onClick={() =>
                      setSelectedGdt(
                        element.id
                      )
                    }
                    className={`
                      min-h-10
                      rounded-lg
                      border
                      px-3
                      py-2
                      text-xs
                      font-bold
                      transition
                      ${
                        selectedGdt === element.id
                          ? 'border-blue-500 bg-blue-600 text-white'
                          : isDark
                            ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-blue-500/60'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'
                      }
                    `}
                  >
                    <span className="mr-2 font-mono text-base">
                      {element.icon}
                    </span>
                    {t.items[element.id].name}
                  </button>
                ))}
            </div>
          </div>
        </section>

                </details>
        </div>

      </div>


      {/* ===================================================
          RIGHT COLUMN
          =================================================== */}

      <div
        className="
          lg:col-span-8
          space-y-6
        "
      >

        <div
          className={`
            p-4
            sm:p-6
            lg:p-8
            rounded-2xl
            border
            flex
            flex-col
            ${ui.card}
          `}
        >

          {/* =================================================
              HEADER
              ================================================= */}

          <div
            className={`
              flex
              flex-wrap
              items-center
              gap-6
              border-b
              pb-6
              ${ui.divider}
            `}
          >

            <div
              className="
                w-20
                h-20
                sm:w-24
                sm:h-24
                rounded-2xl
                bg-gradient-to-br
                from-blue-600/20
                to-blue-500/5
                border
                border-blue-500/30
                flex
                items-center
                justify-center
                text-blue-500
                text-5xl
                sm:text-6xl
                shadow-inner
              "
            >
              {gdtObj.icon}
            </div>


            <div
              className="
                flex-1
                min-w-[220px]
              "
            >

              <h2
                className={`
                  text-2xl
                  sm:text-3xl
                  font-black
                  tracking-tight
                  mb-2
                  ${ui.titleText}
                `}
              >
                {gdtData.name}
              </h2>


              <div
                className="
                  flex
                  flex-wrap
                  gap-2
                "
              >

                <span
                  className="
                    inline-flex
                    items-center
                    px-3
                    py-1
                    rounded-full
                    text-xs
                    font-bold
                    uppercase
                    tracking-wider
                    bg-blue-500/10
                    text-blue-500
                    border
                    border-blue-500/20
                  "
                >
                  {standard.label}
                </span>

              </div>

            </div>

          </div>


          {/* =================================================
              STANDARD WARNING
              ================================================= */}

          <div
            className={`
              mt-6
              p-4
              rounded-xl
              border
              ${
                isDark
                  ? 'bg-blue-500/5 border-blue-500/20 text-blue-200/80'
                  : 'bg-blue-50 border-blue-200 text-blue-900/80'
              }
            `}
          >
            <p
              className="
                text-xs
                font-medium
                leading-relaxed
              "
            >
              {
                standardSystem === 'iso'
                  ? t.isoNote
                  : t.asmeNote
              }
              {' '}
              {t.standardScope}
            </p>
          </div>



          {/* =================================================
              QUICK DECISION SUMMARY
              ================================================= */}

          <div
            className="
              mt-6
              grid
              grid-cols-1
              gap-3
              sm:grid-cols-3
            "
          >
            <div className={`rounded-xl border p-4 ${ui.subCard}`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${ui.subText}`}>
                {lang === 'ro' ? 'Categorie' : 'Category'}
              </span>
              <p className={`mt-1 text-sm font-black ${ui.titleText}`}>
                {t.categories[currentCategory]}
              </p>
            </div>

            <div
              className={`
                rounded-xl
                border
                p-4
                ${
                  meta.datum === 'required'
                    ? isDark
                      ? 'border-cyan-500/30 bg-cyan-500/5'
                      : 'border-cyan-200 bg-cyan-50'
                    : ui.subCard
                }
              `}
            >
              <span className={`text-[10px] font-black uppercase tracking-wider ${ui.subText}`}>
                Datum
              </span>
              <p
                className={`
                  mt-1
                  text-sm
                  font-black
                  ${meta.datum === 'required' ? 'text-cyan-500' : ui.titleText}
                `}
              >
                {meta.datum === 'required'
                  ? (lang === 'ro' ? 'DA — necesar' : 'YES — required')
                  : meta.datum === 'optional'
                    ? (lang === 'ro' ? 'OPȚIONAL' : 'OPTIONAL')
                    : (lang === 'ro' ? 'NU' : 'NO')}
              </p>
            </div>

            <div className={`rounded-xl border p-4 ${ui.subCard}`}>
              <span className={`text-[10px] font-black uppercase tracking-wider ${ui.subText}`}>
                {lang === 'ro' ? 'Zonă' : 'Zone'}
              </span>
              <p className={`mt-1 text-sm font-black ${ui.titleText}`}>
                {meta.toleranceZoneType}
              </p>
            </div>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 lg:grid-cols-2">
            <div
              className={`
                rounded-xl
                border
                border-emerald-500/20
                p-4
                ${isDark ? 'bg-emerald-500/5' : 'bg-emerald-50'}
              `}
            >
              <h3 className="text-[10px] font-black uppercase tracking-[0.16em] text-emerald-500">
                {lang === 'ro' ? 'Când îl folosești' : 'When to use this'}
              </h3>
              <p className={`mt-2 text-sm leading-6 ${ui.bodyText}`}>
                {whenToUse}
              </p>
            </div>

            {commonConfusion && (
              <div className="rounded-xl border border-amber-500/25 bg-amber-500/5 p-4">
                <h3 className="text-[10px] font-black uppercase tracking-[0.16em] text-amber-500">
                  {lang === 'ro' ? 'Confuzie frecventă' : 'Common confusion'}
                </h3>
                <p className={`mt-2 text-sm leading-6 ${ui.bodyText}`}>
                  {commonConfusion}
                </p>
              </div>
            )}
          </div>

          {/* =================================================
              ENGINEERING DETAILS
              ================================================= */}

          <div
            className="
              mt-8
              space-y-7
              flex-grow
            "
          >

            {/* Definition */}

            <InfoSection
              icon="📖"
              title={
                t.definition
              }
              text={
                gdtData.def
              }
              color="blue"
              isDark={isDark}
              ui={ui}
            />


            {/* Tolerance zone */}

            <InfoSection
              icon="▱"
              title={
                t.toleranceZone
              }
              text={
                gdtData.zone
              }
              color="violet"
              isDark={isDark}
              ui={ui}
            />


            {/* Datum */}

            <div
              className={`
                p-5
                rounded-xl
                border

                ${
                  meta.datum ===
                  'required'

                    ? isDark
                      ? 'bg-cyan-500/5 border-cyan-500/20'
                      : 'bg-cyan-50 border-cyan-200'

                    : isDark
                      ? 'bg-slate-950 border-slate-800'
                      : 'bg-slate-50 border-slate-200'
                }
              `}
            >

              <div
                className="
                  flex
                  flex-wrap
                  items-center
                  justify-between
                  gap-3
                "
              >

                <div>

                  <h4
                    className="
                      text-sm
                      font-bold
                      uppercase
                      tracking-widest
                      text-cyan-600
                      mb-2
                    "
                  >
                    ◈{' '}
                    {
                      t.datumRequirement
                    }
                  </h4>


                  <p
                    className={`
                      text-base
                      font-bold
                      ${ui.titleText}
                    `}
                  >
                    {datumLabel}
                  </p>

                </div>


                {meta.exampleDatums.length >
                  0 && (

                  <div
                    className="
                      flex
                      gap-2
                    "
                  >

                    {meta.exampleDatums.map(
                      (datum) => (
                        <span
                          key={
                            datum
                          }

                          className="
                            w-9
                            h-9
                            flex
                            items-center
                            justify-center
                            border
                            border-cyan-500/40
                            rounded
                            font-mono
                            font-black
                            text-cyan-500
                          "
                        >
                          {datum}
                        </span>
                      )
                    )}

                  </div>
                )}

              </div>


              <p
                className={`
                  text-sm
                  leading-relaxed
                  mt-3
                  ${ui.bodyText}
                `}
              >
                {gdtData.datum}
              </p>

            </div>


            {/* Measurement */}

            <div
              className={`
                draftfit-advanced-only
                p-6
                rounded-2xl
                border
                shadow-sm

                ${
                  isDark
                    ? 'bg-amber-500/5 border-amber-500/20'
                    : 'bg-amber-50 border-amber-200'
                }
              `}
            >

              <h4
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-widest
                  text-amber-600
                  mb-3
                  flex
                  items-center
                  gap-2
                "
              >
                <span className="text-lg">
                  📏
                </span>

                {t.measurement}
              </h4>


              <p
                className={`
                  text-base
                  font-medium
                  leading-relaxed

                  ${
                    isDark
                      ? 'text-amber-100/70'
                      : 'text-amber-900/80'
                  }
                `}
              >
                {
                  gdtData.measure
                }
              </p>

            </div>


            {/* Engineering caution */}

            <div
              className={`
                draftfit-advanced-only
                p-5
                rounded-xl
                border

                ${
                  isDark
                    ? 'bg-rose-500/5 border-rose-500/20'
                    : 'bg-rose-50 border-rose-200'
                }
              `}
            >

              <h4
                className="
                  text-sm
                  font-bold
                  uppercase
                  tracking-widest
                  text-rose-500
                  mb-3
                "
              >
                ⚠ {t.caution}
              </h4>


              <p
                className={`
                  text-sm
                  leading-relaxed

                  ${
                    isDark
                      ? 'text-rose-100/70'
                      : 'text-rose-900/80'
                  }
                `}
              >
                {
                  gdtData.caution
                }
              </p>

            </div>

          </div>



          {relatedControls.length > 0 && (
            <section className={`mt-8 rounded-xl border p-4 sm:p-5 ${ui.subCard}`}>
              <h3 className={`text-[10px] font-black uppercase tracking-[0.16em] ${ui.subText}`}>
                {lang === 'ro'
                  ? 'Controale înrudite de comparat'
                  : 'Related controls to compare'}
              </h3>

              <div className="mt-3 flex flex-wrap gap-2">
                {relatedControls.map(controlId => {
                  const element =
                    GDT_ELEMENTS.find(
                      item => item.id === controlId
                    );

                  if (!element) {
                    return null;
                  }

                  return (
                    <button
                      key={controlId}
                      type="button"
                      onClick={() => setSelectedGdt(controlId)}
                      className={`
                        min-h-10
                        rounded-lg
                        border
                        px-3
                        py-2
                        text-xs
                        font-bold
                        transition
                        ${
                          isDark
                            ? 'border-slate-700 bg-slate-950 text-slate-300 hover:border-blue-500/60'
                            : 'border-slate-300 bg-white text-slate-700 hover:border-blue-400'
                        }
                      `}
                    >
                      <span className="mr-2 font-mono">
                        {element.icon}
                      </span>
                      {t.items[controlId].name}
                    </button>
                  );
                })}
              </div>
            </section>
          )}

          {/* =================================================
              FEATURE CONTROL FRAME
              ================================================= */}

          <div
            className={`
              mt-8
              pt-8
              border-t
              ${ui.divider}
            `}
          >

            <h4
              className={`
                text-xs
                uppercase
                tracking-widest
                font-bold
                mb-5
                ${ui.subText}
              `}
            >
              {t.frameExample}
            </h4>


            <FeatureControlFrame
              gdtObj={gdtObj}
              meta={meta}
              isDark={isDark}
            />


            <p
              className={`
                text-[11px]
                font-mono
                mt-4
                text-center
                ${ui.subText}
              `}
            >
              * {t.exampleOnly}
            </p>

          </div>

        </div>

      </div>

    </div>
  );
}


/* =========================================================
   INFO SECTION
   ========================================================= */

function InfoSection({
  icon,
  title,
  text,
  color,
  ui
}) {
  const colorClass = {
    blue:
      'text-blue-500',

    violet:
      'text-violet-500',

    cyan:
      'text-cyan-500'
  }[color] || 'text-blue-500';


  return (
    <div>

      <h4
        className={`
          text-sm
          font-bold
          uppercase
          tracking-widest
          mb-3
          flex
          items-center
          gap-2
          ${colorClass}
        `}
      >
        <span
          className="
            text-lg
          "
        >
          {icon}
        </span>

        {title}
      </h4>


      <p
        className={`
          text-lg
          leading-relaxed
          font-medium
          ${ui.bodyText}
        `}
      >
        {text}
      </p>

    </div>
  );
}


/* =========================================================
   FEATURE CONTROL FRAME
   =========================================================

   The old implementation generated a frame from category
   alone. That is technically unsafe.

   This version generates the educational example from
   explicit metadata for each characteristic.

   IMPORTANT:
   It is still an EXAMPLE, not an automatic drawing-authoring
   system.
   ========================================================= */

function FeatureControlFrame({
  gdtObj,
  meta,
  isDark
}) {
  const stroke =
    isDark
      ? '#cbd5e1'
      : '#0f172a';

  const fill =
    isDark
      ? '#0f172a'
      : '#ffffff';

  const text =
    isDark
      ? '#f8fafc'
      : '#0f172a';

  const accent =
    isDark
      ? '#60a5fa'
      : '#2563eb';


  /*
    Cell dimensions.
  */
  const symbolWidth =
    60;

  const toleranceWidth =
    120;

  const datumWidth =
    50;

  const height =
    50;

  const startX =
    10;

  const startY =
    25;


  const datumCount =
    meta.exampleDatums.length;


  const totalWidth =
    symbolWidth +
    toleranceWidth +
    datumCount *
      datumWidth;


  /*
    Ø is used ONLY when this particular educational
    example intentionally represents a cylindrical
    tolerance zone.

    Therefore:
    - position -> yes in this example
    - circularity -> no
    - cylindricity -> no
    - runout -> no
  */
  const toleranceText =
    `${
      meta.diameterZone
        ? 'Ø '
        : ''
    }0.05`;


  return (
    <div
      className={`
        p-8
        rounded-2xl
        border
        flex
        justify-center
        items-center
        shadow-inner

        ${
          isDark
            ? 'bg-slate-950 border-slate-800/90'
            : 'bg-slate-50 border-slate-200'
        }
      `}
    >

      <svg
        viewBox="0 0 430 100"

        className="
          w-full
          max-w-lg
          h-28
          drop-shadow-lg
        "
      >

        {/* Main frame */}

        <rect
          x={startX}
          y={startY}

          width={
            totalWidth
          }

          height={
            height
          }

          fill={fill}

          stroke={stroke}

          strokeWidth="3"
        />


        {/* Symbol divider */}

        <line
          x1={
            startX +
            symbolWidth
          }

          y1={
            startY
          }

          x2={
            startX +
            symbolWidth
          }

          y2={
            startY +
            height
          }

          stroke={stroke}

          strokeWidth="3"
        />


        {/* Tolerance divider */}

        {datumCount > 0 && (
          <line
            x1={
              startX +
              symbolWidth +
              toleranceWidth
            }

            y1={
              startY
            }

            x2={
              startX +
              symbolWidth +
              toleranceWidth
            }

            y2={
              startY +
              height
            }

            stroke={stroke}

            strokeWidth="3"
          />
        )}


        {/* Datum dividers */}

        {meta.exampleDatums.map(
          (_, index) => {

            if (
              index ===
              datumCount - 1
            ) {
              return null;
            }


            const x =
              startX +
              symbolWidth +
              toleranceWidth +
              datumWidth *
                (
                  index +
                  1
                );


            return (
              <line
                key={
                  `divider-${index}`
                }

                x1={x}

                y1={
                  startY
                }

                x2={x}

                y2={
                  startY +
                  height
                }

                stroke={
                  stroke
                }

                strokeWidth="3"
              />
            );
          }
        )}


        {/* GD&T symbol */}

        <text
          x={
            startX +
            symbolWidth / 2
          }

          y="61"

          fill={accent}

          fontSize="32"

          textAnchor="middle"

          fontFamily="sans-serif"
        >
          {gdtObj.icon}
        </text>


        {/* Tolerance */}

        <text
          x={
            startX +
            symbolWidth +
            toleranceWidth / 2
          }

          y="58"

          fill={text}

          fontSize="22"

          textAnchor="middle"

          fontFamily="monospace"

          fontWeight="bold"
        >
          {toleranceText}
        </text>


        {/* Datums */}

        {meta.exampleDatums.map(
          (
            datum,
            index
          ) => {

            const x =
              startX +
              symbolWidth +
              toleranceWidth +
              datumWidth *
                index +
              datumWidth / 2;


            return (
              <text
                key={
                  datum
                }

                x={x}

                y="58"

                fill={text}

                fontSize="22"

                textAnchor="middle"

                fontFamily="sans-serif"

                fontWeight="bold"
              >
                {datum}
              </text>
            );
          }
        )}

      </svg>

    </div>
  );
}