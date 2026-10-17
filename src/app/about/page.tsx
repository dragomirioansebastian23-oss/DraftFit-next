import type { Metadata } from 'next';

import InfoPageShell, { InfoSection } from '@/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'About DraftFit',
  description:
    'DraftFit is a web-based mechanical engineering toolkit for practical design calculations and reference workflows.',
  alternates: {
    canonical: '/about',
  },
};

export default function AboutPage() {
  return (
    <InfoPageShell
      eyebrow="About the project"
      title="About DraftFit"
      intro="A practical mechanical engineering toolkit designed to make common calculations faster, clearer and easier to review."
    >
      <InfoSection title="What DraftFit is">
        <p>
          DraftFit brings mechanical design calculators, engineering references
          and calculation documentation into one web interface.
        </p>
        <p>
          The current toolkit covers ISO fits, O-ring grooves, GD&amp;T reference,
          metric threads and bolts, and parallel keys. Each tool is designed to
          show both the numerical result and the engineering context behind it.
        </p>
      </InfoSection>

      <InfoSection title="Who it is for">
        <p>
          DraftFit is intended for mechanical engineers, designers, CAD users,
          manufacturing engineers, students and other technical users who need
          quick preliminary calculations during design work.
        </p>
      </InfoSection>

      <InfoSection title="Design principles">
        <p>
          The project prioritizes engineering correctness, transparent
          assumptions, readable results, unit flexibility, shareable
          calculations and clear links between a result and its methodology.
        </p>
        <p>
          The long-term direction is a broader engineering toolkit covering both
          ISO/DIN and US/ASME/ANSI workflows without mixing standards silently.
        </p>
      </InfoSection>

      <InfoSection title="What DraftFit is not">
        <p>
          DraftFit is not a certification authority, a substitute for the
          governing standard, or a replacement for project-specific design
          verification. Safety-critical decisions must be reviewed by the
          responsible engineer.
        </p>
      </InfoSection>

      <InfoSection title="Pe scurt, în română">
        <p>
          DraftFit este o platformă de calcul pentru proiectare mecanică. Scopul
          este să ofere calcule rapide, explicabile și ușor de verificat, fără să
          ascundă ipotezele și limitele metodei.
        </p>
      </InfoSection>
    </InfoPageShell>
  );
}
