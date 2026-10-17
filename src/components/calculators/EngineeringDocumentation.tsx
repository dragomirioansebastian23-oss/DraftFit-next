"use client";

import Link from 'next/link';
import { useState } from 'react';

type Language = 'en' | 'ro';
type UnitSystem = 'metric' | 'imperial';
type CalculatorKey = 'iso' | 'oring' | 'gdt' | 'threads' | 'keys';
type ReportMode = 'quick' | 'full';

type Content = {
  title: string;
  explainTitle: string;
  explain: string[];
  formulas: string[];
  basis: string[];
  assumptions: string[];
  warnings: string[];
};

const CONTENT: Record<CalculatorKey, Record<Language, Content>> = {
  iso: {
    en: {
      title: 'ISO 286 Fit Calculator',
      explainTitle: 'How to interpret this fit result',
      explain: [
        'Clearance fit means the smallest hole remains larger than the largest shaft. Transition fit means the tolerance zones overlap, so either clearance or interference can occur. Interference fit means the shaft remains larger than the hole over the calculated limit combination.',
        'Use the minimum and maximum clearance/interference values to understand the full worst-case assembly range, not only the nominal size.',
        'If interference-fit mechanics are shown, pressure, assembly force and transmissible torque are preliminary estimates and should be checked against the real geometry, material data, surface condition and duty cycle.'
      ],
      formulas: [
        'Hole lower/upper limit = nominal size + hole lower/upper deviation.',
        'Shaft lower/upper limit = nominal size + shaft lower/upper deviation.',
        'Minimum clearance Cmin = minimum hole − maximum shaft.',
        'Maximum clearance Cmax = maximum hole − minimum shaft.',
        'Interference is reported as the magnitude of negative clearance where the shaft is larger than the hole.'
      ],
      basis: [
        'Tolerance grades and the implemented fundamental-deviation subset are based on ISO 286-1 / ISO 286-2 methodology.',
        'The interference-fit mechanics section is a preliminary elastic cylindrical-contact estimator; it is not a complete DIN 7190 implementation.'
      ],
      assumptions: [
        'Nominal diameter is within the supported 1–500 mm range.',
        'Materials are treated as linear elastic for the preliminary press-fit mechanics.',
        'Geometry is idealized as axisymmetric and does not include local weakening from keyways, cross-holes, grooves or shoulders unless explicitly represented.'
      ],
      warnings: [
        'Verify the selected tolerance designation against the governing edition of the standard and the drawing requirements.',
        'For safety-critical or highly loaded interference fits, perform a dedicated fit/joint calculation including fatigue, temperature, roughness, assembly method and real hub/shaft geometry.'
      ]
    },
    ro: {
      title: 'Calculator Ajustaje ISO 286',
      explainTitle: 'Cum se interpretează rezultatul ajustajului',
      explain: [
        'Ajustajul cu joc înseamnă că alezajul minim rămâne mai mare decât arborele maxim. Ajustajul de tranziție înseamnă că zonele de toleranță se suprapun, deci poate apărea fie joc, fie interferență. Ajustajul cu interferență înseamnă că arborele rămâne mai mare decât alezajul pentru combinația de limite calculată.',
        'Folosește valorile minime și maxime ale jocului/interferenței pentru a înțelege domeniul real de asamblare în cazul cel mai nefavorabil, nu doar diametrul nominal.',
        'Dacă sunt afișate calcule mecanice pentru interferență, presiunea, forța de montaj și cuplul transmis sunt estimări preliminare.'
      ],
      formulas: [
        'Limita alezajului = dimensiunea nominală + abaterea alezajului.',
        'Limita arborelui = dimensiunea nominală + abaterea arborelui.',
        'Joc minim Cmin = alezaj minim − arbore maxim.',
        'Joc maxim Cmax = alezaj maxim − arbore minim.',
        'Interferența este raportată ca modulul jocului negativ atunci când arborele este mai mare decât alezajul.'
      ],
      basis: [
        'Treaptele de toleranță și subsetul de abateri fundamentale implementat urmează metodologia ISO 286-1 / ISO 286-2.',
        'Secțiunea mecanică pentru ajustaj cu interferență este un estimator elastic preliminar; nu reprezintă o implementare completă DIN 7190.'
      ],
      assumptions: [
        'Diametrul nominal este în domeniul suportat 1–500 mm.',
        'Materialele sunt considerate liniar elastice pentru estimarea preliminară.',
        'Geometria este idealizată axisimetric și nu include automat efectele canalelor de pană, găurilor, treptelor sau altor concentratori.'
      ],
      warnings: [
        'Verifică desemnarea toleranței în ediția standardului aplicabilă desenului tău.',
        'Pentru îmbinări critice sau foarte solicitate, este necesar un calcul dedicat care să includă oboseala, temperatura, rugozitatea, metoda de montaj și geometria reală.'
      ]
    }
  },
  oring: {
    en: {
      title: 'O-Ring Groove Calculator',
      explainTitle: 'How to interpret this sealing result',
      explain: [
        'Squeeze indicates how much the O-ring cross-section is compressed by the gland. Gland fill indicates how much of the available groove cross-sectional area is occupied by the O-ring.',
        'Circumferential strain indicates how much the O-ring is stretched or compressed around the hardware diameter. These three quantities should be reviewed together rather than independently.',
        'A passed preliminary status means the implemented checks are inside the tool limits; it does not guarantee leakage performance for every pressure, fluid, surface finish, motion or temperature condition.'
      ],
      formulas: [
        'Squeeze (%) = cross-section compression / free cross-section × 100.',
        'Gland fill (%) = O-ring cross-sectional area / effective groove area × 100.',
        'Circumferential strain (%) is derived from the installed circumference relative to the free O-ring circumference.',
        'Groove depth, width and root diameter are generated from seal type, duty, O-ring section and the implemented design rules.'
      ],
      basis: [
        'O-ring sizing and terminology are aligned with the ISO 3601 family; the calculator uses implemented engineering rules rather than reproducing the complete standards.',
        'Housing/gland dimensional guidance is referenced to ISO 3601-2 methodology, while O-ring sizes/material-related context is separated from the housing calculation.'
      ],
      assumptions: [
        'The O-ring behaves as a conventional elastomeric seal and the selected material is compatible with the actual fluid and temperature range.',
        'Hardware is sufficiently stiff and surface finish, lead-in geometry and tolerances are appropriate for the application.',
        'Pressure and extrusion checks are preliminary and do not model transient pressure, rapid gas decompression or detailed elastomer nonlinear behavior.'
      ],
      warnings: [
        'Confirm chemical compatibility, temperature capability, surface finish and extrusion-gap requirements with the seal/material supplier.',
        'Dynamic seals require additional review of lubrication, speed, friction, wear and heat generation.'
      ]
    },
    ro: {
      title: 'Calculator Canal O-Ring',
      explainTitle: 'Cum se interpretează rezultatul etanșării',
      explain: [
        'Squeeze arată cât este comprimată secțiunea O-ringului în canal. Gland fill arată cât din aria disponibilă a canalului este ocupată de O-ring.',
        'Deformația circumferențială arată cât este întins sau comprimat O-ringul pe diametrul de montaj. Aceste valori trebuie analizate împreună.',
        'Un status preliminar OK înseamnă doar că verificările implementate sunt în limitele instrumentului; nu garantează etanșarea în orice condiții reale.'
      ],
      formulas: [
        'Squeeze (%) = comprimarea secțiunii / secțiunea liberă × 100.',
        'Gland fill (%) = aria secțiunii O-ringului / aria efectivă a canalului × 100.',
        'Deformația circumferențială (%) rezultă din circumferința montată raportată la circumferința liberă.',
        'Adâncimea, lățimea și diametrul de fund al canalului sunt generate din tipul etanșării, regim, secțiune și regulile implementate.'
      ],
      basis: [
        'Dimensiunile și terminologia sunt aliniate familiei ISO 3601; calculatorul folosește reguli inginerești implementate și nu reproduce integral standardele.',
        'Ghidarea pentru locaș/canal urmărește metodologia ISO 3601-2.'
      ],
      assumptions: [
        'O-ringul este un elastomer convențional, iar materialul ales este compatibil cu fluidul și temperatura reale.',
        'Componentele metalice sunt suficient de rigide, iar rugozitatea, intrările și toleranțele sunt adecvate.',
        'Verificările la presiune/extrudare sunt preliminare și nu modelează toate efectele neliniare sau tranzitorii.'
      ],
      warnings: [
        'Confirmă compatibilitatea chimică, temperatura, rugozitatea și jocul de extrudare cu furnizorul etanșării/materialului.',
        'Pentru etanșări dinamice verifică separat ungerea, viteza, frecarea, uzura și încălzirea.'
      ]
    }
  },
  gdt: {
    en: {
      title: 'GD&T Reference & Calculator',
      explainTitle: 'How to interpret this GD&T result',
      explain: [
        'The selected control defines a geometric tolerance zone and the feature behavior that must remain inside that zone. Read the definition together with the zone shape, datum requirement and inspection guidance.',
        'A datum reference is not automatically required for every control. Form controls commonly apply without datums, while orientation, location and runout controls generally rely on a datum reference frame.',
        'The displayed example is a learning/reference aid; the exact feature-control frame on a production drawing must follow the governing standard and the design intent.'
      ],
      formulas: [
        'GD&T controls are primarily geometric requirements rather than one universal numerical formula.',
        'Evaluation depends on the defined tolerance zone, feature type, datum reference frame, material-condition modifiers and the applicable standard rules.',
        'Where a positional tolerance is specified as a diameter, the controlled axis or derived median line must remain within the cylindrical tolerance zone defined by the feature-control frame.'
      ],
      basis: [
        'ISO mode is organized around ISO 1101 concepts and related GPS practices.',
        'ASME mode is organized around ASME Y14.5-2018 concepts. Controls not present in that edition are not offered as current ASME controls in the tool.'
      ],
      assumptions: [
        'The reference assumes conventional drawing interpretation and does not replace the full set of cross-referenced GPS or ASME standards.',
        'Inspection guidance is representative and may not be the only valid verification method.'
      ],
      warnings: [
        'Do not copy an example feature-control frame blindly onto a production drawing; datum scheme and modifiers must match functional design intent.',
        'For contractual drawings, verify the exact standard edition stated on the drawing or company specification.'
      ]
    },
    ro: {
      title: 'Referință & Calculator GD&T',
      explainTitle: 'Cum se interpretează rezultatul GD&T',
      explain: [
        'Caracteristica selectată definește o zonă geometrică de toleranță și comportamentul elementului care trebuie să rămână în interiorul acesteia. Citește definiția împreună cu forma zonei, bazele de referință și metoda de control.',
        'Nu toate toleranțele necesită baze de referință. Toleranțele de formă se aplică frecvent fără baze, în timp ce orientarea, localizarea și bătaia folosesc de regulă un sistem de referință.',
        'Exemplul afișat este un ajutor de învățare/referință; cadrul real de toleranță de pe desen trebuie să urmeze standardul și intenția funcțională.'
      ],
      formulas: [
        'GD&T descrie în primul rând cerințe geometrice, nu o singură formulă numerică universală.',
        'Evaluarea depinde de zona de toleranță, tipul elementului, sistemul de baze, modificatorii de condiție de material și regulile standardului aplicabil.',
        'Pentru o toleranță de poziție diametrală, axa sau linia mediană derivată trebuie să rămână în zona cilindrică definită de cadrul de toleranță.'
      ],
      basis: [
        'Modul ISO este organizat în jurul conceptelor ISO 1101 și practicilor GPS asociate.',
        'Modul ASME este organizat în jurul ASME Y14.5-2018. Controalele care nu mai sunt prezente în acea ediție nu sunt oferite ca toleranțe ASME curente.'
      ],
      assumptions: [
        'Referința presupune interpretarea convențională a desenului și nu înlocuiește toate standardele GPS/ASME conexe.',
        'Ghidarea pentru inspecție este reprezentativă și poate să nu fie singura metodă validă.'
      ],
      warnings: [
        'Nu copia mecanic un exemplu de cadru de toleranță pe un desen de producție; schema de baze și modificatorii trebuie să reflecte funcția piesei.',
        'Pentru desene contractuale verifică ediția exactă a standardului indicată pe desen sau în specificația companiei.'
      ]
    }
  },
  threads: {
    en: {
      title: 'Metric Thread & Bolt Calculator',
      explainTitle: 'How to interpret this bolted-joint result',
      explain: [
        'The target preload is the intended initial bolt tension. The estimated tightening torque is the torque predicted from the selected thread/bearing friction assumptions to reach that preload.',
        'Bolt equivalent stress combines the axial and torsional effects used by the implemented preliminary model. The stripping check compares the estimated engaged-thread capacity with the selected loading basis.',
        'A green preliminary check does not remove the need to evaluate external joint loads, clamp loss, fatigue, embedding, temperature, lubrication scatter and tightening method.'
      ],
      formulas: [
        'ISO metric basic thread geometry is generated from nominal diameter and pitch using the implemented profile relationships.',
        'Tensile stress area is estimated from the effective thread diameter relationship used by the calculator.',
        'Target preload = selected utilization × the implemented bolt proof/load basis.',
        'Tightening torque = thread-friction torque + under-head/bearing friction torque.',
        'Thread stripping capacity is estimated from engagement length, thread geometry and allowable internal-thread shear stress.'
      ],
      basis: [
        'Metric thread geometry follows ISO metric thread concepts; clearance-hole guidance is based on ISO 273 series values implemented in the tool.',
        'Carbon/alloy steel bolt property classes use ISO 898-1 context, while stainless fastener context is separated under ISO 3506-1 where applicable.',
        'Torque/preload prediction is an engineering estimate; ISO 898-1 does not itself define a tightening-torque relationship.'
      ],
      assumptions: [
        'Friction coefficients are effective engineering inputs and are assumed representative of the real lubrication, coating and surface condition.',
        'The joint is treated as a conventional concentric bolted joint without a full joint-stiffness or external-load distribution model.',
        'Internal-thread shear capacity uses the selected allowable shear stress and engagement model.'
      ],
      warnings: [
        'Torque is an indirect and scatter-sensitive way of controlling preload. Critical joints may require torque-angle, yield-controlled or direct-tension methods.',
        'Check fatigue, separation/slip, bearing pressure, joint stiffness, relaxation and service temperature for production designs.'
      ]
    },
    ro: {
      title: 'Calculator Filet Metric & Șurub',
      explainTitle: 'Cum se interpretează rezultatul îmbinării cu șurub',
      explain: [
        'Prestrângerea țintă este tensiunea axială inițială dorită în șurub. Cuplul estimat este valoarea rezultată din ipotezele de frecare în filet și sub cap/piuliță pentru atingerea acelei prestrângeri.',
        'Tensiunea echivalentă combină efectele axiale și torsiunea din modelul preliminar. Verificarea la smulgerea filetului compară capacitatea estimată a filetelor angajate cu încărcarea selectată.',
        'Un rezultat preliminar OK nu elimină necesitatea verificării sarcinilor externe, oboselii, pierderii prestrângerii, temperaturii, tasării și metodei de strângere.'
      ],
      formulas: [
        'Geometria filetului metric ISO este generată din diametrul nominal și pas folosind relațiile de profil implementate.',
        'Aria rezistentă la tracțiune este estimată din diametrul efectiv al filetului folosit de calculator.',
        'Prestrângere țintă = grad de utilizare × baza de sarcină/proof implementată pentru clasa șurubului.',
        'Cuplu de strângere = componenta de frecare în filet + componenta de frecare sub cap/piuliță.',
        'Capacitatea la smulgerea filetului este estimată din lungimea de angajare, geometrie și tensiunea tangențială admisibilă a filetului interior.'
      ],
      basis: [
        'Geometria folosește concepte ale filetului metric ISO; găurile de trecere folosesc valorile ISO 273 implementate.',
        'Clasele de proprietăți pentru șuruburi din oțel folosesc context ISO 898-1, iar inoxul este tratat separat în context ISO 3506-1 unde este cazul.',
        'Relația cuplu/prestrângere este o estimare inginerească; ISO 898-1 nu definește în sine un model de cuplu de strângere.'
      ],
      assumptions: [
        'Coeficienții de frecare sunt considerați reprezentativi pentru ungerea, acoperirea și starea reală a suprafețelor.',
        'Îmbinarea este tratată ca una convențională și concentrică, fără un model complet de rigiditate și distribuție a sarcinilor externe.',
        'Capacitatea filetului interior folosește tensiunea tangențială admisibilă și modelul de angajare selectat.'
      ],
      warnings: [
        'Cuplul controlează indirect prestrângerea și are dispersie mare. Îmbinările critice pot necesita torque-angle, control la curgere sau măsurarea directă a tensiunii.',
        'Pentru proiectul final verifică oboseala, separarea/alunecarea, presiunea de contact, rigiditatea îmbinării, relaxarea și temperatura de serviciu.'
      ]
    }
  },
  keys: {
    en: {
      title: 'Parallel Key Calculator',
      explainTitle: 'How to interpret this keyed-joint result',
      explain: [
        'The transmitted torque is converted to tangential force at the shaft radius. That force produces both key shear stress and bearing/contact pressure on the loaded key face.',
        'The governing criterion is the utilization that is closest to its allowable value. A passing preliminary result means both implemented stress checks remain below the selected allowable values.',
        'Keyed joints can still fail by shaft/hub weakening, fretting, fatigue, keyway stress concentration or poor fit even when the simple key stresses pass.'
      ],
      formulas: [
        'Tangential force F = 2T / d.',
        'Effective length Le is the load-carrying length used by the selected key-end treatment/model.',
        'Average key shear stress τ = F / (b × Le).',
        'Average bearing pressure is calculated from tangential force divided by the implemented projected bearing area.',
        'Utilization = calculated stress / selected allowable stress.'
      ],
      basis: [
        'Key cross-sections and keyway dimensions use the implemented DIN 6885-1 geometry ranges.',
        'Strength checks are preliminary average-stress checks; detailed keyed-joint design may require DIN 6892 or another project-specific method.'
      ],
      assumptions: [
        'Torque is steady or represented by a suitable design value and is transmitted through one conventional parallel key.',
        'Load distribution is approximated as uniform over the effective length.',
        'Selected allowable bearing and shear stresses already include appropriate material, duty and safety considerations.'
      ],
      warnings: [
        'Check shaft and hub stresses at the keyways, fatigue and stress concentration separately for cyclic/high-load applications.',
        'Confirm the actual key length, end form, fit and hub geometry against the applicable drawing/standard.'
      ]
    },
    ro: {
      title: 'Calculator Pană Paralelă',
      explainTitle: 'Cum se interpretează rezultatul îmbinării cu pană',
      explain: [
        'Cuplul transmis este transformat în forță tangențială la raza arborelui. Această forță produce atât forfecare în pană, cât și presiune de contact pe fața încărcată.',
        'Criteriul determinant este utilizarea cea mai apropiată de valoarea admisibilă. Un rezultat preliminar OK înseamnă că ambele verificări implementate sunt sub valorile admisibile selectate.',
        'Îmbinarea poate totuși ceda prin slăbirea arborelui/butucului, fretting, oboseală, concentratori în canal sau ajustaj necorespunzător.'
      ],
      formulas: [
        'Forța tangențială F = 2T / d.',
        'Lungimea efectivă Le este lungimea portantă folosită de modelul pentru forma capetelor penei.',
        'Tensiunea medie de forfecare τ = F / (b × Le).',
        'Presiunea medie de contact rezultă din forța tangențială împărțită la aria portantă proiectată implementată.',
        'Grad de utilizare = tensiune calculată / tensiune admisibilă.'
      ],
      basis: [
        'Secțiunile penelor și dimensiunile canalelor folosesc domeniile geometrice DIN 6885-1 implementate.',
        'Verificările de rezistență sunt verificări preliminare cu tensiuni medii; proiectarea detaliată poate necesita DIN 6892 sau o metodă specifică proiectului.'
      ],
      assumptions: [
        'Cuplul este constant sau reprezentat de o valoare de calcul adecvată și este transmis printr-o singură pană paralelă convențională.',
        'Distribuția sarcinii este aproximată uniform pe lungimea efectivă.',
        'Valorile admisibile selectate includ deja considerente potrivite de material, regim și siguranță.'
      ],
      warnings: [
        'Pentru sarcini ciclice/ridicate verifică separat tensiunile din arbore și butuc la canale, oboseala și concentratorii.',
        'Confirmă lungimea reală, forma capetelor, ajustajul și geometria butucului în desen/standard.'
      ]
    }
  }
};

const UI = {
  en: {
    report: 'Engineering report',
    quick: 'Quick PDF',
    full: 'Full engineering report',
    saveHint: 'Your browser print dialog will open. Choose “Save as PDF”.',
    explain: 'Explain this result',
    hide: 'Hide explanation',
    formulas: 'Formulas & methodology',
    basis: 'Engineering basis & standards',
    assumptions: 'Assumptions',
    warnings: 'Warnings / limits',
    preliminary: 'Engineering aid — verify safety-critical designs against the governing standards and project requirements.',
    unitSystem: 'Unit system',
    metric: 'Metric',
    imperial: 'Imperial',
    part: 'Part',
    drawing: 'Drawing',
    engineer: 'Engineer',
    notSet: 'Not specified',
  },
  ro: {
    report: 'Raport tehnic',
    quick: 'PDF rapid',
    full: 'Raport tehnic complet',
    saveHint: 'Se va deschide fereastra de printare. Alege „Save as PDF”.',
    explain: 'Explică rezultatul',
    hide: 'Ascunde explicația',
    formulas: 'Formule & metodologie',
    basis: 'Bază inginerească & standarde',
    assumptions: 'Ipoteze',
    warnings: 'Avertismente / limite',
    preliminary: 'Instrument de calcul — verifică proiectele critice conform standardelor aplicabile și cerințelor proiectului.',
    unitSystem: 'Sistem de unități',
    metric: 'Metric',
    imperial: 'Imperial',
    part: 'Reper',
    drawing: 'Desen',
    engineer: 'Proiectant',
    notSet: 'Nespecificat',
  },
} as const;

function setReportMode(mode: ReportMode) {
  document.documentElement.dataset.draftfitReport = mode;
}

export function EngineeringReportHeader({
  calculator,
  lang,
  unitSystem,
  partName,
  drawingNo,
  engineerName,
}: {
  calculator: CalculatorKey;
  lang: Language;
  unitSystem: UnitSystem;
  partName?: string;
  drawingNo?: string;
  engineerName?: string;
}) {
  const content = CONTENT[calculator][lang];
  const ui = UI[lang];
  const fallback = ui.notSet;

  return (
    <section className="draftfit-report-header hidden print:block print:mb-6 print:border-b-2 print:border-black print:pb-4 print:text-black">
      <div className="flex items-end justify-between gap-4">
        <div>
          <p className="text-xs font-black uppercase tracking-[0.2em]">DraftFit</p>
          <h1 className="mt-1 text-2xl font-black">{content.title}</h1>
          <p className="mt-1 text-xs">{ui.preliminary}</p>
        </div>
        <div className="text-right text-xs">
          <div><strong>{ui.unitSystem}:</strong> {unitSystem === 'metric' ? ui.metric : ui.imperial}</div>
        </div>
      </div>
      <div className="mt-4 grid grid-cols-3 gap-4 text-xs">
        <div><strong>{ui.part}:</strong> {partName?.trim() || fallback}</div>
        <div><strong>{ui.drawing}:</strong> {drawingNo?.trim() || fallback}</div>
        <div><strong>{ui.engineer}:</strong> {engineerName?.trim() || fallback}</div>
      </div>
    </section>
  );
}

export default function EngineeringDocumentation({
  calculator,
  lang,
  isDark,
  onPrint,
}: {
  calculator: CalculatorKey;
  lang: Language;
  isDark: boolean;
  onPrint?: () => void;
}) {
  const [showExplanation, setShowExplanation] = useState(false);
  const content = CONTENT[calculator][lang];
  const ui = UI[lang];

  const card = isDark
    ? 'border-zinc-800 bg-zinc-900 text-zinc-100'
    : 'border-zinc-200 bg-white text-zinc-950';
  const muted = isDark ? 'text-zinc-400' : 'text-zinc-600';
  const subCard = isDark ? 'border-zinc-800 bg-zinc-950/50' : 'border-zinc-200 bg-zinc-50';

  const printReport = (mode: ReportMode) => {
    setReportMode(mode);
    window.requestAnimationFrame(() => {
      if (onPrint) onPrint();
      else window.print();
      window.setTimeout(() => {
        delete document.documentElement.dataset.draftfitReport;
      }, 500);
    });
  };

  return (
    <section className={`draftfit-engineering-docs draftfit-safe-wrap mt-8 border p-5 md:p-7 print:mt-6 print:border-black print:bg-white print:text-black ${card}`}>
      <div className="draftfit-report-actions mb-6 border-b border-current/15 pb-6 print:hidden">
        <p className="text-[10px] font-black uppercase tracking-[0.18em] text-orange-500">{ui.report}</p>
        <div className="mt-3 flex flex-wrap gap-3">
          <button type="button" onClick={() => printReport('quick')} className="cursor-pointer border border-orange-500 px-4 py-2 text-xs font-black uppercase tracking-wider text-orange-500 hover:bg-orange-500 hover:text-white">
            {ui.quick}
          </button>
          <button type="button" onClick={() => printReport('full')} className="cursor-pointer bg-orange-600 px-4 py-2 text-xs font-black uppercase tracking-wider text-white hover:bg-orange-500">
            {ui.full}
          </button>
        </div>
        <p className={`mt-2 text-xs ${muted}`}>{ui.saveHint}</p>
      </div>

      <div className="mb-6">
        <button
          type="button"
          onClick={() => setShowExplanation((value) => !value)}
          aria-expanded={showExplanation}
          aria-controls={`draftfit-explanation-${calculator}`}
          className="draftfit-explain-toggle cursor-pointer text-left text-lg font-black hover:text-orange-500 print:hidden"
        >
          {showExplanation ? '−' : '+'} {showExplanation ? ui.hide : ui.explain}
        </button>
        <div id={`draftfit-explanation-${calculator}`} className={`${showExplanation ? 'mt-4 block' : 'hidden'} draftfit-explanation print:mt-0 print:block`}>
          <h2 className="mb-3 hidden text-lg font-black print:block">{content.explainTitle}</h2>
          <BulletList items={content.explain} muted={muted} />
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2 print:grid-cols-2">
        <DocCard title={ui.formulas} items={content.formulas} className={subCard} muted={muted} />
        <DocCard title={ui.basis} items={content.basis} className={subCard} muted={muted} />
        <DocCard title={ui.assumptions} items={content.assumptions} className={subCard} muted={muted} />
        <DocCard title={ui.warnings} items={content.warnings} className={subCard} muted={muted} warning />
      </div>

      <div className="mt-6 border-t border-current/15 pt-5 print:hidden">
        <Link
          href={`/contact?type=calculation&calculator=${calculator}`}
          className="text-xs font-black uppercase tracking-[0.14em] text-orange-500 hover:text-orange-400"
        >
          {lang === 'ro'
            ? 'Raportează o problemă de calcul →'
            : 'Report calculation issue →'}
        </Link>
      </div>
    </section>
  );
}

function BulletList({ items, muted }: { items: string[]; muted: string }) {
  return (
    <ul className={`space-y-2 text-sm leading-6 print:text-[10pt] print:leading-5 ${muted} print:text-black`}>
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span aria-hidden="true">•</span>
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function DocCard({
  title,
  items,
  className,
  muted,
  warning = false,
}: {
  title: string;
  items: string[];
  className: string;
  muted: string;
  warning?: boolean;
}) {
  return (
    <article className={`border p-4 print:break-inside-avoid print:border-zinc-400 print:bg-white ${className}`}>
      <h2 className={`mb-3 text-sm font-black uppercase tracking-wider ${warning ? 'text-amber-500 print:text-black' : ''}`}>{title}</h2>
      <BulletList items={items} muted={muted} />
    </article>
  );
}
