import type { ContentSection, GuideEntry } from '@/lib/content';

type RomanianGuideTranslation = Pick<
  GuideEntry,
  'title' | 'description' | 'eyebrow' | 'calculatorLabel'
> & {
  sections: ContentSection[];
};

export const GUIDES_RO: Record<string, RomanianGuideTranslation> = {
  'h7-g6-vs-h7-h6-vs-h7-k6': {
    title: 'H7/g6 vs H7/h6 vs H7/k6: ajustajele ISO 286 explicate',
    description:
      'Compară ajustajele H7/g6, H7/h6 și H7/k6, vezi cum poziția câmpurilor de toleranță schimbă jocul sau interferența și alege un punct de pornire mai bun pentru proiectarea alezaj-arbore.',
    eyebrow: 'Ajustaje și toleranțe',
    calculatorLabel: 'Compară ajustajele în calculatorul ISO 286',
    sections: [
      {
        heading: 'Răspuns rapid: ce se schimbă între g6, h6 și k6?',
        paragraphs: [
          'Cu un alezaj H7, schimbarea literei arborelui mută câmpul de toleranță al arborelui față de dimensiunea nominală. H7/g6 oferă joc sigur în setul de date ISO 286 implementat de DraftFit, H7/h6 ajunge la linia nominală și poate avea joc minim teoretic zero, iar H7/k6 intră în comportamentul unui ajustaj de tranziție.',
          'Și treptele numerice contează: H7 stabilește lățimea toleranței alezajului, iar 6 lățimea toleranței arborelui. Litera stabilește poziția câmpului de toleranță față de dimensiunea de bază.',
        ],
        bullets: [
          'H7/g6: punct de pornire cu joc pentru funcționare liberă sau glisare.',
          'H7/h6: punct de pornire pentru poziționare strânsă cu joc minim teoretic zero.',
          'H7/k6: punct de pornire de tranziție, cu posibil joc mic sau interferență mică.',
        ],
      },
      {
        heading: 'Cum se citesc H7/g6, H7/h6 și H7/k6',
        paragraphs: [
          'Primul cod aparține alezajului, iar al doilea arborelui. Litera mare H descrie deci câmpul de toleranță al alezajului, în timp ce literele mici g, h sau k descriu câmpul arborelui.',
          'În sistemul bazat pe alezaj folosit aici, alezajul H începe la dimensiunea nominală. Arborele g este sub nominal, arborele h se termină la nominal, iar câmpul k implementat începe ușor peste nominal. Această deplasare mută ajustajul de la joc sigur către comportament de tranziție.',
        ],
      },
      {
        heading: 'Comparație calculată la 35 mm',
        paragraphs: [
          'Pentru diametrul nominal de 35 mm, DraftFit folosește în setul său implementat un alezaj H7 de la 35,000 mm la 35,025 mm. Arborele g6 corespunzător este 34,975–34,991 mm, h6 este 34,984–35,000 mm, iar k6 este 35,002–35,018 mm.',
          'Aceste limite produc condiții de montaj foarte diferite chiar dacă diametrul nominal și treptele de toleranță rămân similare.',
        ],
        bullets: [
          '35 H7/g6: joc de 0,009–0,050 mm.',
          '35 H7/h6: joc de 0,000–0,041 mm.',
          '35 H7/k6: de la 0,018 mm interferență până la 0,023 mm joc, deci ajustaj de tranziție.',
        ],
      },
      {
        heading: 'Când H7/g6 este un punct de pornire mai bun',
        paragraphs: [
          'H7/g6 este util atunci când proiectarea are nevoie de joc dimensional garantat în limitele selectate. Este un punct de pornire rezonabil când mișcarea relativă, montajul ușor sau un joc controlat pentru poziționare contează mai mult decât o legătură foarte strânsă.',
          'Nu îl selecta doar după denumirea ajustajului. Viteza, lubrifierea, sarcina, temperatura, contaminarea, capabilitatea procesului și jocul funcțional necesar pot schimba alegerea corectă.',
        ],
      },
      {
        heading: 'Când H7/h6 este un punct de pornire mai bun',
        paragraphs: [
          'H7/h6 ridică zona arborelui până când dimensiunea maximă a arborelui ajunge la dimensiunea de bază. Rezultă o relație cu joc mult mai strâns decât H7/g6, fără interferență dimensională intenționată în calculul implementat.',
          'Poate fi util când poziționarea contează și se dorește un montaj apropiat, dar jocul minim teoretic zero înseamnă că variația reală de fabricație, starea suprafețelor și metoda de montaj trebuie luate în calcul.',
        ],
      },
      {
        heading: 'Când H7/k6 este un punct de pornire mai bun',
        paragraphs: [
          'H7/k6 este un ajustaj de tranziție în domeniul implementat de DraftFit. În funcție de dimensiunile reale obținute în câmpurile de toleranță, montajul poate avea fie un joc mic, fie o interferență mică.',
          'Aceasta îl face un punct de pornire pentru poziționare mai strâns decât cele două ajustaje cu joc, dar comportamentul la montaj este mai puțin previzibil doar din denumire. Verifică jocul și interferența maximă pentru diametrul nominal real.',
        ],
      },
      {
        heading: 'Nu reutiliza valorile unui diametru pentru alt diametru',
        paragraphs: [
          'Lățimile toleranțelor și abaterile ISO se modifică în funcție de treapta dimensională nominală. Intervalul calculat la 35 mm este deci un exemplu, nu o valoare care poate fi refolosită pentru orice H7/g6, H7/h6 sau H7/k6.',
          'Folosește calculatorul DraftFit la diametrul nominal real și verifică toate cele patru dimensiuni limită înainte de alegerea funcțională.',
        ],
      },
      {
        heading: 'FAQ: ce ajustaj ar trebui să aleg?',
        paragraphs: [
          'Alege H7/g6 când obiectivul dimensional principal este jocul garantat, H7/h6 când vrei o poziționare mai strânsă bazată în continuare pe joc și H7/k6 când este acceptabilă o tranziție între joc mic și interferență mică. Sunt puncte de pornire, nu reguli universale de aplicație.',
          'Pentru ansambluri solicitate sau sensibile la temperatură, alegerea ajustajului poate necesita și verificări pentru dilatarea materialelor, presiunea de contact, forța de montaj, lubrifiere și condițiile de funcționare. Doar codul toleranței nu validează funcția mecanică a îmbinării.',
        ],
      },
    ],
  },
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
    title: 'Ajustaje cu joc vs tranziție vs interferență — ISO 286 explicat',
    description:
      'Înțelege diferența dintre ajustajele cu joc, de tranziție și cu interferență, cum limitele dimensionale determină ajustajul real și când este utilă fiecare familie.',
    eyebrow: 'Ajustaje și toleranțe',
    calculatorLabel: 'Calculează jocul sau interferența cu DraftFit',
    sections: [
      {
        heading: 'Răspuns rapid: cele trei familii de ajustaje',
        paragraphs: [
          'Un ajustaj cu joc garantează spațiu între alezaj și arbore la combinația cea mai defavorabilă a limitelor. Un ajustaj de tranziție poate produce fie un joc mic, fie o interferență mică. Un ajustaj cu interferență garantează suprapunere dimensională chiar și la combinația cea mai puțin strânsă.',
          'Familia ajustajului este determinată de dimensiunile limită, nu doar de diametrul nominal. Compară întotdeauna dimensiunile minime și maxime admise ale alezajului și arborelui pentru domeniul dimensional real.',
        ],
        bullets: [
          'Ajustaj cu joc: jocul minim este mai mare sau egal cu zero.',
          'Ajustaj de tranziție: intervalul posibil trece prin zero, deci poate apărea fie joc, fie interferență.',
          'Ajustaj cu interferență: chiar și combinația cea mai lejeră produce suprapunere.',
        ],
      },
      {
        heading: 'Cum calculezi ajustajul din dimensiunile limită',
        paragraphs: [
          'Jocul minim este dimensiunea minimă a alezajului minus dimensiunea maximă a arborelui. Jocul maxim este dimensiunea maximă a alezajului minus dimensiunea minimă a arborelui. Dacă rezultatul devine negativ, modulul lui reprezintă interferența pentru combinația respectivă de limite.',
          'Această abordare pe limite este mai utilă decât memorarea etichetelor deoarece arată direct condiția de montaj în cel mai defavorabil caz permis de toleranțe.',
        ],
      },
      {
        heading: 'Când este util un ajustaj cu joc',
        paragraphs: [
          'Ajustajele cu joc sunt puncte de pornire naturale când piesele trebuie să se monteze liber sau să se miște una față de alta. Ajustajele de funcționare, alunecare și montajele ușor demontabile au frecvent nevoie de joc dimensional pozitiv.',
          'Jocul necesar depinde în continuare de viteză, lubrifiere, temperatură, contaminare, deformarea arborelui, finisaj și capabilitatea procesului. Un joc mai mare nu este automat mai bun deoarece poate reduce precizia de poziționare și poate crește vibrațiile sau uzura.',
        ],
      },
      {
        heading: 'Când este util un ajustaj de tranziție',
        paragraphs: [
          'Ajustajele de tranziție sunt folosite când poziționarea precisă contează, dar nu este necesară o presare garantată. Deoarece intervalul posibil trece prin zero, o pereche de piese poate avea joc mic, iar alta, produsă la alte limite, poate necesita o presare ușoară.',
          'Această variabilitate este caracteristica esențială. Metoda de montaj, strategia de inspecție și cerințele de demontare trebuie analizate împreună cu toleranța.',
        ],
      },
      {
        heading: 'Când este util un ajustaj cu interferență',
        paragraphs: [
          'Ajustajele cu interferență sunt utile când arborele și butucul trebuie să transmită sarcină sau să mențină poziția fără a se baza doar pe un element de fixare separat. Presarea și fretarea termică sunt exemple uzuale.',
          'Când interferența devine funcțională, ajustajul dimensional este doar începutul analizei. Presiunea de contact, grosimea butucului, modulul și limita de curgere a materialelor, frecarea, finisajul, forța de montaj și condițiile termice pot deveni importante.',
        ],
      },
      {
        heading: 'Sistemul alezaj unitar și exemple uzuale H7',
        paragraphs: [
          'În sistemul alezaj unitar, alezajul H este păstrat într-un câmp standard convenabil, iar litera arborelui se schimbă pentru a obține comportamentul dorit. De aceea combinații precum H7/g6, H7/h6, H7/k6 și H7/p6 sunt repere utile.',
          'Jocul sau interferența exactă depinde de diametru. Folosește diametrul nominal real în calculatorul ISO 286 DraftFit în loc să copiezi un rezultat din alt domeniu dimensional.',
        ],
        bullets: [
          'H7/g6: punct de pornire pentru ajustaj cu joc în setul de date implementat DraftFit.',
          'H7/h6: punct de pornire pentru poziționare cu joc strâns și poate ajunge la joc minim teoretic zero.',
          'H7/k6: punct de pornire pentru ajustaj de tranziție.',
          'H7/p6: punct de pornire pentru ajustaj cu interferență în domeniul implementat.',
        ],
      },
      {
        heading: 'Greșeli uzuale de selecție',
        paragraphs: [
          'O greșeală frecventă este alegerea ajustajului doar după o denumire familiară fără verificarea limitelor reale. O alta este ignorarea temperaturii, acoperirilor, finisajului sau procesului de fabricație care trebuie să mențină repetabil limitele specificate.',
          'Pentru montaje critice, alegerea trebuie legată de funcție: mișcare, precizie de poziționare, transmiterea momentului, metoda de montaj, mentenanță și mediul de funcționare.',
        ],
      },
      {
        heading: 'FAQ: cu ce tip de ajustaj ar trebui să încep?',
        paragraphs: [
          'Pornește de la un ajustaj cu joc când este necesar montajul liber sau mișcarea relativă, de la unul de tranziție când accepți joc sau interferență foarte mici pentru o poziționare precisă și de la unul cu interferență când suprapunerea dimensională face parte din strategia de retenție sau transmitere a sarcinii.',
          'Apoi calculează limitele reale pentru diametrul nominal și verifică separat condițiile mecanice pe care denumirea ajustajului nu le acoperă.',
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
  'metric-bolt-torque-8-8-vs-10-9-vs-12-9': {
    title: 'Cuplu pentru șuruburi metrice: 8.8 vs 10.9 vs 12.9 + calculator',
    description:
      'Compară clasele 8.8, 10.9 și 12.9, înțelege cum rezistența influențează prestrângerea și calculează cuplul cu intrări explicite pentru frecare.',
    eyebrow: 'Filete și elemente de asamblare',
    calculatorLabel: 'Calculează prestrângerea și cuplul șurubului',
    sections: [
      {
        heading: 'Comparație rapidă: 8.8, 10.9 și 12.9',
        paragraphs: [
          'Clasa de proprietăți descrie rezistența mecanică a șurubului, nu un cuplu universal. În datele de referință ISO 898-1 folosite de DraftFit, 8.8 are Rm 800 MPa, Re 640 MPa și tensiune de probă 580 MPa; 10.9 are 1000, 900 și 830 MPa; iar 12.9 are 1200, 1080 și 970 MPa.',
          'Un șurub mai rezistent poate susține în general o prestrângere mai mare pentru aceeași geometrie, dar cuplul corect depinde puternic de frecare și de prestrângerea țintă.',
        ],
        bullets: [
          '8.8: clasă de referință uzuală pentru oțel carbon de înaltă rezistență.',
          '10.9: clasă de referință cu rezistență mai mare, din oțel aliat.',
          '12.9: clasă de referință cu rezistență foarte ridicată.',
        ],
      },
      {
        heading: 'De ce nu există un singur tabel universal de cuplu',
        paragraphs: [
          'Tabelele de cuplu par precise, dar cuplul este doar o metodă indirectă de a genera forță de strângere. Frecarea din filet și de sub cap sau piuliță consumă o mare parte din cuplu, astfel încât lubrifierea, acoperirile, finisajul și geometria de reazem pot schimba mult prestrângerea.',
          'De aceea DraftFit cere intrări legate de frecare în loc să considere că un M10, M12 sau M16 are un singur cuplu corect.',
        ],
      },
      {
        heading: 'Clasa schimbă domeniul posibil de prestrângere',
        paragraphs: [
          'Pentru aceeași geometrie de filet, trecerea de la 8.8 la 10.9 sau 12.9 crește valorile de rezistență folosite în verificările preliminare. Acest lucru poate permite o prestrângere țintă mai mare dacă proiectul, produsul și standardul aplicabil o permit.',
          'Nu aplica automat cuplul mai mare al unei clase superioare unui ansamblu existent. Filetul interior, piesele strânse, șaibele, acoperirile și sarcinile de serviciu pot deveni elementele limitative.',
        ],
      },
      {
        heading: 'Flux practic de strângere',
        paragraphs: [
          'Alege filetul și pasul real, clasa corectă, o prestrângere potrivită îmbinării și valori realiste pentru frecarea în filet și la reazem. Verifică tensiunea rezultată în șurub împreună cu cuplul estimat.',
          'Pentru îmbinări critice sau de producție, validează metoda de strângere și ipotezele de frecare cu șurubul, lubrifiantul, acoperirea și ansamblul real.',
        ],
      },
      {
        heading: 'Uscat vs lubrifiat',
        paragraphs: [
          'Lubrifierea reduce de regulă frecarea. Dacă prestrângerea țintă rămâne aceeași, o frecare mai mică înseamnă în general un cuplu necesar mai mic. Aplicarea unei valori pentru montaj uscat pe o îmbinare bine lubrifiată poate produce o prestrângere mult mai mare decât cea intenționată.',
        ],
      },
      {
        heading: 'FAQ: ar trebui să aleg mereu 12.9 în loc de 8.8?',
        paragraphs: [
          'Nu. Rezistența mai mare a șurubului nu face automat îmbinarea completă mai bună. Costul, tenacitatea, oboseala, coroziunea, rezistența filetului conjugat, controlul montajului și condițiile de serviciu influențează alegerea corectă.',
        ],
      },
    ],
  },
  'din-6885-parallel-key-size-chart-design-guide': {
    title: 'Tabel dimensiuni pene paralele DIN 6885 + ghid de proiectare',
    description:
      'Folosește diametrul arborelui pentru a selecta secțiunea DIN 6885, apoi verifică lungimea, forfecarea și presiunea de contact înainte de finalizarea îmbinării.',
    eyebrow: 'Îmbinări arbore-butuc',
    calculatorLabel: 'Selectează și verifică o pană DIN 6885',
    sections: [
      {
        heading: 'Tabel rapid: domenii reprezentative implementate',
        paragraphs: [
          'DraftFit implementează seria dimensională DIN 6885-1 pentru arbori cu diametre peste 6 mm până la 130 mm. Calculatorul selectează lățimea și înălțimea nominală a penei după domeniul diametrului și apoi efectuează verificări preliminare de rezistență.',
          'Domeniile de mai jos sunt exemple reprezentative. Folosește calculatorul pentru seria implementată completă și diametrul exact.',
        ],
        bullets: [
          'Peste 12 până la 17 mm: pană 5 × 5 mm.',
          'Peste 17 până la 22 mm: pană 6 × 6 mm.',
          'Peste 22 până la 30 mm: pană 8 × 7 mm.',
          'Peste 30 până la 38 mm: pană 10 × 8 mm.',
          'Peste 38 până la 44 mm: pană 12 × 8 mm.',
          'Peste 44 până la 50 mm: pană 14 × 9 mm.',
          'Peste 50 până la 58 mm: pană 16 × 10 mm.',
        ],
      },
      {
        heading: 'Diametrul alege secțiunea, dar nu finalizează proiectarea',
        paragraphs: [
          'Secțiunea standard este un punct de pornire geometric, dar nu demonstrează că îmbinarea transmite momentul necesar. Lungimea penei, lungimea butucului, rezistența materialelor și presiunea de contact admisibilă pot guverna proiectarea.',
          'Un arbore de 35 mm, de exemplu, intră în domeniul implementat peste 30 până la 38 mm și pornește de la o pană 10 × 8 mm. Lungimea necesară trebuie verificată separat la momentul transmis.',
        ],
      },
      {
        heading: 'De la moment la forță tangențială',
        paragraphs: [
          'Calculul preliminar transformă momentul arborelui în forță tangențială la raza arborelui. Această forță produce atât tensiune de forfecare în pană, cât și presiune locală de contact.',
        ],
      },
      {
        heading: 'Forfecare vs presiune de contact',
        paragraphs: [
          'Verificarea simplificată la forfecare folosește lățimea și lungimea efectivă a penei. Verificarea presiunii de contact folosește înălțimea activă și lungimea de contact. Materialele arborelui, penei și butucului pot avea limite diferite.',
        ],
      },
      {
        heading: 'Geometria canalului și fabricația contează',
        paragraphs: [
          'Adâncimea canalului, colțurile, ajustajul, finisajul și toleranțele de prelucrare influențează montajul și concentrarea tensiunilor. Rezultatul DraftFit este un screening static preliminar, nu un calcul complet de capacitate conform DIN 6892.',
        ],
      },
      {
        heading: 'FAQ: pot alege pur și simplu o pană mai mare?',
        paragraphs: [
          'Nu automat. Un canal mai mare îndepărtează mai mult material din arbore și butuc și poate modifica concentrarea tensiunilor și fabricabilitatea. Pornește de la secțiunea standard a domeniului de arbore și rezolvă capacitatea prin lungime, materiale și proiectarea ansamblului.',
        ],
      },
    ],
  },
  'o-ring-groove-dimensions-squeeze-stretch-fill': {
    title: 'Dimensiuni canal O-ring: compresie, întindere și grad de umplere',
    description:
      'Proiectează canalul verificând compresia, întinderea sau comprimarea circumferențială, gradul de umplere și tipul aplicației, nu doar o adâncime din tabel.',
    eyebrow: 'Etanșări',
    calculatorLabel: 'Calculează dimensiunile canalului O-ring',
    sections: [
      {
        heading: 'Răspuns rapid: adâncimea este doar o parte din locaș',
        paragraphs: [
          'Un canal pentru O-ring nu poate fi ales corect doar din secțiunea transversală. Tipul aplicației, direcția compresiei, lățimea canalului, întinderea sau comprimarea, gradul de umplere, jocul de extrudare, presiunea, materialul și toleranțele influențează geometria finală.',
          'DraftFit tratează separat situațiile radiale statice, radiale dinamice și etanșările frontale și verifică mai mulți parametri geometrici împreună.',
        ],
      },
      {
        heading: 'Compresia: cât este deformată secțiunea',
        paragraphs: [
          'Compresia compară secțiunea liberă a O-ringului cu spațiul disponibil după montaj. Este necesar contact pentru etanșare, dar compresia excesivă poate crește frecarea, încălzirea, deformarea permanentă și dificultatea de montaj.',
        ],
      },
      {
        heading: 'Întinderea și comprimarea circumferențială',
        paragraphs: [
          'În locașurile radiale, O-ringul poate fi întins peste piston sau comprimat într-un canal interior. Deformarea circumferențială schimbă geometria instalată și poate influența compresia și gradul de umplere.',
        ],
      },
      {
        heading: 'Gradul de umplere: lasă volum disponibil',
        paragraphs: [
          'Gradul de umplere compară volumul O-ringului cu volumul disponibil al canalului. Un canal prea plin poate lăsa prea puțin spațiu pentru dilatare termică, umflarea materialului și toleranțe.',
        ],
      },
      {
        heading: 'Etanșări statice vs dinamice',
        paragraphs: [
          'Etanșările dinamice adaugă frecare și uzură. Un canal potrivit pentru o etanșare radială statică nu trebuie reutilizat automat pentru mișcare alternativă sau rotativă.',
        ],
      },
      {
        heading: 'Joc de extrudare, presiune și inele de sprijin',
        paragraphs: [
          'La presiuni mai mari, jocul dintre componente poate permite extrudarea elastomerului. Duritatea materialului, presiunea, temperatura și mărimea jocului influențează necesitatea unui inel de sprijin sau a unui joc mai mic.',
        ],
      },
      {
        heading: 'FAQ: de ce tabelele de canale dau valori diferite?',
        paragraphs: [
          'Tabele diferite pot viza tipuri de aplicații, serii de O-ringuri, intervale de compresie, toleranțe sau ipoteze diferite. Compară doar date care folosesc același context de etanșare și fă ipotezele explicite în calculator.',
        ],
      },
    ],
  },
  'gdt-position-tolerance-explained-examples': {
    title: 'Toleranța de poziție GD&T explicată cu exemple practice',
    description:
      'Înțelege ce controlează poziția, cum bazele definesc cadrul de referință, de ce zona este adesea diametrală și cum se citește un cadru de toleranță.',
    eyebrow: 'GD&T',
    calculatorLabel: 'Deschide referința GD&T',
    sections: [
      {
        heading: 'Răspuns rapid: ce controlează toleranța de poziție',
        paragraphs: [
          'Toleranța de poziție controlează localizarea admisă a unei caracteristici față de dimensiunile teoretic exacte și, când este specificat, față de un sistem de baze. Este folosită frecvent pentru găuri, pini, canale și modele de elemente unde poziția de montaj este importantă.',
          'Pentru o caracteristică cilindrică, zona de toleranță este adesea un cilindru amplasat în poziția de bază a axei. Interpretarea exactă depinde de standardul aplicabil și de cerințele desenului.',
        ],
      },
      {
        heading: 'De ce contează bazele',
        paragraphs: [
          'Bazele stabilesc cadrul de referință față de care se evaluează poziția și orientarea. Baza primară restrânge primele grade de libertate, iar bazele secundară și terțiară completează poziționarea conform intenției desenului.',
        ],
      },
      {
        heading: 'Citirea unui cadru simplu de control',
        paragraphs: [
          'Un cadru de tip poziție | diametru 0,10 | A | B | C comunică caracteristica geometrică, mărimea și forma zonei de toleranță și succesiunea bazelor. Interpretarea exactă depinde și de eventualii modificatori de condiție de material.',
          'Cotele de bază de pe desen stabilesc localizarea teoretic exactă, iar toleranța de poziție definește abaterea admisă față de această locație.',
        ],
      },
      {
        heading: 'Exemplu practic cu un model de găuri',
        paragraphs: [
          'Consideră un model de găuri pentru șuruburi localizat față de bazele A, B și C. Cotele de bază definesc coordonatele exacte, iar cadrul de poziție limitează deplasarea axei fiecărei găuri în raport cu sistemul de baze.',
          'Aceasta este funcțional diferită de două toleranțe independente plus/minus pe X și Y deoarece o zonă cilindrică de poziție reprezintă direct eroarea radială de localizare.',
        ],
      },
      {
        heading: 'Poziția nu este același lucru cu concentricitatea sau bătaia',
        paragraphs: [
          'Poziția, concentricitatea și bătaia controlează relații geometrice diferite. Când trebuie localizată o axă față de baze, poziția poate fi controlul potrivit; pentru comportamentul unei suprafețe în rotație, bătaia circulară sau totală poate fi mai relevantă funcțional.',
          'DraftFit păstrează controalele separate și reflectă și faptul că ASME Y14.5-2018 a eliminat simbolurile de concentricitate și simetrie din acea ediție.',
        ],
      },
      {
        heading: 'Considerații de inspecție',
        paragraphs: [
          'Poziția poate fi verificată prin măsurare în coordonate, calibre funcționale sau alte metode potrivite specificației. Metoda de inspecție trebuie să reproducă sistemul de baze și regulile aplicabile de condiție de material atunci când acestea fac parte din cerință.',
        ],
      },
      {
        heading: 'FAQ: „true position” este același lucru cu toleranța de poziție?',
        paragraphs: [
          'Expresia „true position” este folosită frecvent în conversații și materiale educaționale, dar desenele trebuie interpretate după terminologia și simbolurile standardului declarat. Ideea centrală rămâne localizarea admisă a caracteristicii față de poziția teoretic exactă și sistemul de baze.',
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
