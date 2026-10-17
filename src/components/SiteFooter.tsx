import Link from 'next/link';

const COPY = {
  en: {
    search: 'Search',
    calculators: 'Calculators',
    guides: 'Guides',
    standards: 'Standards',
    methodology: 'Methodology',
    about: 'About',
    contact: 'Contact / Report issue',
    privacy: 'Privacy',
    terms: 'Terms & Disclaimer',
    disclaimer:
      'DraftFit is an engineering aid. Results must be verified against the applicable standards, drawing requirements, material data and project conditions before release for production or safety-critical use.',
  },
  ro: {
    search: 'Căutare',
    calculators: 'Calculatoare',
    guides: 'Ghiduri',
    standards: 'Standarde',
    methodology: 'Metodologie',
    about: 'Despre',
    contact: 'Contact / Raportează o problemă',
    privacy: 'Confidențialitate',
    terms: 'Termeni & Disclaimer',
    disclaimer:
      'DraftFit este un instrument de sprijin pentru inginerie. Rezultatele trebuie verificate în raport cu standardele aplicabile, cerințele desenului, datele materialelor și condițiile proiectului înainte de lansarea în producție sau utilizarea în aplicații critice pentru siguranță.',
  },
} as const;

export default function SiteFooter({
  isDark = true,
  lang = 'en',
}: {
  isDark?: boolean;
  lang?: keyof typeof COPY;
}) {
  const t = COPY[lang];

  return (
    <footer
      className={`draftfit-site-footer mt-12 border-t pt-6 text-sm print:hidden ${
        isDark ? 'border-zinc-800 text-zinc-500' : 'border-zinc-300 text-zinc-600'
      }`}
    >
      <div className="flex flex-wrap gap-x-5 gap-y-2">
        <Link className="hover:text-orange-500" href="/search">{t.search}</Link>
        <Link className="hover:text-orange-500" href="/calculators">{t.calculators}</Link>
        <Link className="hover:text-orange-500" href="/guides">{t.guides}</Link>
        <Link className="hover:text-orange-500" href="/standards">{t.standards}</Link>
        <Link className="hover:text-orange-500" href="/methodology">{t.methodology}</Link>
        <Link className="hover:text-orange-500" href="/about">{t.about}</Link>
        <Link className="hover:text-orange-500" href="/contact">{t.contact}</Link>
        <Link className="hover:text-orange-500" href="/privacy">{t.privacy}</Link>
        <Link className="hover:text-orange-500" href="/terms">{t.terms}</Link>
      </div>

      <p className="mt-4 max-w-4xl text-xs leading-5">{t.disclaimer}</p>
    </footer>
  );
}
