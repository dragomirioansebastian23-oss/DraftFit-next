import type { Metadata } from 'next';

import InfoPageShell, { InfoSection } from '@/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'Terms & Engineering Disclaimer',
  description:
    'Terms of use and engineering disclaimer for DraftFit calculators, guides and reference content.',
  alternates: {
    canonical: '/terms',
  },
};

export default function TermsPage() {
  return (
    <InfoPageShell
      eyebrow="Legal & engineering use"
      title="Terms & Engineering Disclaimer"
      intro="DraftFit is an engineering aid for preliminary calculation, comparison and reference. It is not a substitute for project-specific engineering verification."
    >
      <InfoSection title="Engineering responsibility">
        <p>
          Results must be checked against the applicable standard edition, drawing requirements, material certificates, tolerances, loading, environment, manufacturing process and your organization&apos;s design rules before release for production.
        </p>
        <p>
          Safety-critical, regulated or high-consequence applications require review by a qualified engineer and any additional validation required by the governing code, standard or authority.
        </p>
      </InfoSection>

      <InfoSection title="Scope and accuracy">
        <p>
          Some DraftFit tools intentionally implement a documented subset of a standard or a preliminary engineering model. Notes shown with each calculator describe important limitations and assumptions.
        </p>
        <p>
          Standards, material data and engineering practices can change. DraftFit does not guarantee that every result is suitable for every application or that every external reference remains current.
        </p>
      </InfoSection>

      <InfoSection title="No professional-client relationship">
        <p>
          Use of DraftFit does not create an engineering, consulting, certification or professional-client relationship. Guides and calculator outputs are informational engineering aids.
        </p>
      </InfoSection>

      <InfoSection title="Acceptable use">
        <p>
          You may use DraftFit for legitimate engineering, education and design work. Do not use the site to submit unlawful content, interfere with service operation or misrepresent DraftFit output as independently certified design approval.
        </p>
      </InfoSection>
    </InfoPageShell>
  );
}
