import type { ContentSection, GuideEntry } from '@/lib/content';

type RomanianGuideTranslation = Pick<
  GuideEntry,
  'title' | 'description' | 'eyebrow' | 'calculatorLabel'
> & {
  sections: ContentSection[];
};

export const GUIDES_RO: Record<string, RomanianGuideTranslation> = {
  'h7-g6-fit-explained': {
    title: 'Ajustajul H7/g6 explicat: limite, joc și utilizări tipice',
    description:
      'Înțelege cum este construit un ajustaj ISO H7/g6 din câmpurile de toleranță ale alezajului și arborelui, cum se calculează jocul și când este util acest ajustaj.',
    eyebrow: 'Ajustaje și toleranțe',
    calculatorLabel: 'Deschide calculatorul de ajustaje ISO 286',
    sections: [
      {
        heading: 'Ce înseamnă H7/g6',
        paragraphs: [
          'H7/g6 combină un câmp de toleranță H7 pentru alezaj cu un câmp g6 pentru arbore. În sistemul ISO bazat pe alezaj, alezajul H are abaterea inferioară zero, iar arborele g este poziționat sub dimensiunea de bază.',
          'Această geometrie produce în mod normal un ajustaj cu joc. Jocul minim și maxim depind de diametrul nominal, deoarece lățimea toleranței ISO se modifică odată cu treapta dimensională.',
        ],
      },
      {
        heading: 'Cum se calculează jocul',
        paragraphs: [
          'Jocul minim este limita minimă a alezajului minus limita maximă a arborelui. Jocul maxim este limita maximă a alezajului minus limita minimă a arborelui.',
          'Pentru un diametru nominal concret, calculează mai întâi cele patru dimensiuni limită. Nu reutiliza o valoare de toleranță dintr-un alt domeniu de diametre.',
        ],
      },
      {
        heading: 'Când este util H7/g6',
        paragraphs: [
          'H7/g6 este luat frecvent în calcul atunci când se dorește un joc controlat pentru funcționare sau poziționare, fără interferență intenționată. Ajustajul corect depinde în continuare de sarcină, viteză, lubrifiere, temperatură, capabilitatea procesului și cerințele de montaj.',
        ],
        bullets: [
          'Folosește calculatorul pentru dimensiunea nominală exactă.',
          'Verifică dilatarea termică atunci când variațiile de temperatură sunt relevante.',
          'Tratează alegerea ajustajului ca pe o decizie de proiectare, nu doar ca pe o căutare într-un tabel.',
        ],
      },
    ],
  },
  'clearance-transition-interference-fits': {
    title: 'Ajustaje cu joc, de tranziție și cu strângere',
    description:
      'Ghid practic pentru ajustajele cu joc, de tranziție și cu strângere, inclusiv modul în care dimensiunile limită determină clasa reală a ajustajului.',
    eyebrow: 'Ajustaje și toleranțe',
    calculatorLabel: 'Calculează un ajustaj',
    sections: [
      {
        heading: 'Ajustaj cu joc',
        paragraphs: [
          'Un ajustaj cu joc garantează un joc pozitiv în situația limită cea mai nefavorabilă. Cel mai mic alezaj admis rămâne mai mare decât cel mai mare arbore admis.',
        ],
      },
      {
        heading: 'Ajustaj de tranziție',
        paragraphs: [
          'Un ajustaj de tranziție poate produce fie un joc mic, fie o strângere mică, în funcție de dimensiunile reale obținute în interiorul câmpurilor de toleranță.',
        ],
      },
      {
        heading: 'Ajustaj cu strângere',
        paragraphs: [
          'Un ajustaj cu strângere garantează suprapunerea dimensiunilor la limite. Forța de montaj, presiunea de contact, proprietățile materialelor, grosimea pereților, starea suprafețelor și temperatura pot deveni variabile importante de proiectare.',
        ],
      },
    ],
  },
  'o-ring-squeeze-explained': {
    title: 'Compresia O-ring explicată: ce înseamnă procentul',
    description:
      'Află ce înseamnă compresia unui O-ring, cum se calculează și de ce geometria canalului, regimul de lucru și tipul aplicației contează.',
    eyebrow: 'Etanșare',
    calculatorLabel: 'Deschide calculatorul pentru canal O-ring',
    sections: [
      {
        heading: 'Definiție',
        paragraphs: [
          'Compresia descrie cât de mult este deformată secțiunea transversală a O-ringului de geometria montată a locașului. O expresie nominală simplă compară secțiunea liberă cu adâncimea disponibilă a locașului pe direcția de compresie.',
        ],
      },
      {
        heading: 'De ce aceeași compresie nu se potrivește tuturor aplicațiilor',
        paragraphs: [
          'Aplicațiile statice, cu mișcare alternativă, rotative și etanșările frontale nu au aceleași constrângeri de proiectare. Frecarea, presiunea, materialul, temperatura, toleranțele și riscul de extrudare pot modifica geometria acceptabilă a locașului.',
        ],
      },
      {
        heading: 'Analizează compresia împreună cu umplerea locașului și întinderea',
        paragraphs: [
          'Compresia nu trebuie verificată separat. Gradul de umplere al locașului, întinderea sau compresia circumferențială, jocul de extrudare și necesitatea inelelor de sprijin pot influența dacă un canal este practic.',
        ],
      },
    ],
  },
  'bolt-preload-vs-torque': {
    title: 'Prestrângerea șurubului vs cuplul de strângere',
    description:
      'Înțelege de ce cuplul de strângere este doar o metodă indirectă de a crea prestrângerea șurubului și de ce frecarea domină multe estimări de cuplu.',
    eyebrow: 'Filete și elemente de asamblare',
    calculatorLabel: 'Deschide calculatorul pentru filete și șuruburi',
    sections: [
      {
        heading: 'Prestrângerea este mărimea urmărită în proiectare',
        paragraphs: [
          'Într-o îmbinare cu șurub prestrâns, mărimea importantă este de obicei forța de strângere. Cuplul de strângere este o mărime practică de montaj folosită pentru a genera acea prestrângere.',
        ],
      },
      {
        heading: 'De ce cuplul este incert',
        paragraphs: [
          'O mare parte din cuplul de strângere este consumată de frecarea din filet și de sub suprafața de reazem. Modificările de lubrifiere, acoperire, rugozitate și geometrie a șaibei pot schimba semnificativ prestrângerea chiar dacă se aplică același cuplu.',
        ],
      },
      {
        heading: 'Ce estimează DraftFit',
        paragraphs: [
          'Instrumentul DraftFit pentru șuruburi folosește un model inginereasc de cuplu cu intrări explicite pentru frecare. Tratează rezultatul ca pe o estimare dacă îmbinarea nu are o procedură de strângere validată și date de frecare confirmate.',
        ],
      },
    ],
  },
  'parallel-key-shear-vs-bearing-pressure': {
    title: 'Proiectarea unei pene paralele: forfecare vs presiune de contact',
    description:
      'Vezi cum momentul de torsiune generează forță tangențială într-o pană paralelă și de ce trebuie verificate atât forfecarea, cât și presiunea de contact.',
    eyebrow: 'Îmbinări arbore-butuc',
    calculatorLabel: 'Deschide calculatorul pentru pene paralele',
    sections: [
      {
        heading: 'De la moment la forță tangențială',
        paragraphs: [
          'Un calcul simplificat al penei transformă mai întâi momentul arborelui într-o forță tangențială la raza arborelui. Această forță este apoi folosită pentru verificările la forfecare și presiune de contact.',
        ],
      },
      {
        heading: 'Verificarea la forfecare',
        paragraphs: [
          'Modelul simplificat de forfecare distribuie forța tangențială pe o arie efectivă de forfecare determinată de lățimea penei și lungimea efectivă.',
        ],
      },
      {
        heading: 'Verificarea presiunii de contact',
        paragraphs: [
          'Presiunea de contact folosește o înălțime efectivă de contact și lungimea activă. În funcție de materiale și geometrie, criteriul presiunii de contact poate deveni critic înaintea forfecării penei.',
        ],
      },
    ],
  },
  'm10-bolt-torque-guide': {
    title: 'Cuplul pentru un șurub M10: de ce nu există o singură valoare corectă',
    description:
      'Ghid practic pentru cuplul de strângere al unui șurub M10, cu influența clasei de rezistență, prestrângerii, frecării și geometriei de reazem.',
    eyebrow: 'Ghid pentru căutări specifice',
    calculatorLabel: 'Calculează prestrângerea și cuplul pentru M10',
    sections: [
      {
        heading: 'De ce M10 nu este suficient',
        paragraphs: [
          'Notația M10 definește diametrul nominal al filetului, dar nu definește un singur cuplu universal de strângere. Pasul, clasa de rezistență, prestrângerea țintă, frecarea în filet, frecarea sub cap și diametrul de reazem influențează rezultatul.',
        ],
      },
      {
        heading: 'Un flux de lucru mai bun',
        paragraphs: [
          'Alege pasul real și clasa de rezistență, stabilește o prestrângere potrivită îmbinării, apoi folosește valori realiste ale frecării pentru condiția de montaj. Verifică tensiunea rezultată în șurub, nu doar cuplul.',
        ],
      },
      {
        heading: 'Nu copia orbește un tabel generic de cupluri',
        paragraphs: [
          'Tabelele generice pot fi puncte de pornire utile, dar pot presupune condiții de lubrifiere și frecare diferite de îmbinarea ta. Pentru ansambluri critice, folosește o specificație de strângere validată.',
        ],
      },
    ],
  },
  'o-ring-groove-3-53-mm-guide': {
    title: 'Canal pentru O-ring de 3,53 mm: ce trebuie definit înainte',
    description:
      'De ce un O-ring cu secțiune de 3,53 mm nu are o singură dimensiune universală de canal și ce date ale aplicației determină locașul.',
    eyebrow: 'Ghid pentru căutări specifice',
    calculatorLabel: 'Calculează un canal pentru O-ring de 3,53 mm',
    sections: [
      {
        heading: 'Secțiunea transversală este doar una dintre intrări',
        paragraphs: [
          'O secțiune de 3,53 mm nu determină în mod unic adâncimea și lățimea canalului. Locașul depinde de tipul etanșării, radială sau axială, statică sau dinamică, geometria componentelor, presiune, toleranțe și necesitatea inelelor de sprijin.',
        ],
      },
      {
        heading: 'Verifică mai mult decât adâncimea canalului',
        paragraphs: [
          'O analiză utilă a locașului include compresia, gradul de umplere, întinderea sau compresia circumferențială, jocul de extrudare și condițiile de funcționare. Aceste verificări explică de ce două aplicații cu aceeași secțiune de O-ring pot necesita carcase diferite.',
        ],
      },
    ],
  },
  'din-6885-key-size-35-mm-shaft': {
    title: 'Dimensiunea penei DIN 6885 pentru un arbore de 35 mm',
    description:
      'Cum alegi dimensiunea penei paralele DIN 6885 pentru un arbore de 35 mm și de ce lungimea și rezistența necesită în continuare verificări inginerești.',
    eyebrow: 'Ghid pentru căutări specifice',
    calculatorLabel: 'Selectează și verifică o pană',
    sections: [
      {
        heading: 'Alegerea dimensiunii standard este doar primul pas',
        paragraphs: [
          'DIN 6885-1 oferă dimensiuni standardizate pentru pene paralele și canale în funcție de domeniul diametrului arborelui. După alegerea secțiunii standard, trebuie verificate în continuare lungimea disponibilă a penei și momentul transmis.',
        ],
      },
      {
        heading: 'De ce contează lungimea penei',
        paragraphs: [
          'Același arbore și aceeași secțiune de pană pot transmite momente diferite în funcție de lungimea efectivă, presiunea de contact admisibilă și tensiunea de forfecare admisibilă. Geometria butucului poate limita și lungimea practică.',
        ],
      },
    ],
  },
  'gdt-position-vs-concentricity': {
    title: 'GD&T: poziție vs concentricitate — observații practice pentru alegere',
    description:
      'Înțelege de ce poziția și bătăile sunt adesea controale mai practice decât conceptele tradiționale de concentricitate, în special când lucrezi între convenții ISO și ASME.',
    eyebrow: 'GD&T',
    calculatorLabel: 'Deschide referința GD&T',
    sections: [
      {
        heading: 'Nu considera interschimbabile controalele care par similare',
        paragraphs: [
          'Poziția, bătaia și concentricitatea descriu concepte de toleranță diferite și au implicații diferite pentru inspecție. Controlul corect depinde de cerința funcțională și de standardul care guvernează desenul.',
        ],
      },
      {
        heading: 'Contextul ASME Y14.5-2018',
        paragraphs: [
          'DraftFit elimină intenționat concentricitatea și simetria din modul ASME Y14.5-2018 deoarece simbolurile acestor caracteristici au fost eliminate din acea ediție. Desenele vechi existente pot necesita în continuare interpretare conform ediției specificate pe desen.',
        ],
      },
    ],
  },
};
