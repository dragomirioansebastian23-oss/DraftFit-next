import type { Metadata } from 'next';

import InfoPageShell, { InfoSection } from '@/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description:
    'Privacy information for DraftFit mechanical engineering calculators and website features.',
  alternates: {
    canonical: '/privacy',
  },
};

export default function PrivacyPage() {
  return (
    <InfoPageShell
      eyebrow="Legal"
      title="Privacy Policy"
      intro="A concise prelaunch privacy notice for DraftFit. Update this page if analytics, advertising, accounts or additional third-party services are added."
    >
      <InfoSection title="Information you provide">
        <p>
          DraftFit calculators are designed to work without requiring an account. Calculator inputs may be processed in your browser to produce results and shareable links.
        </p>
        <p>
          If you contact DraftFit, the information you choose to include in the report or email may be used to investigate the issue and respond to you.
        </p>
      </InfoSection>

      <InfoSection title="Local preferences and browser storage">
        <p>
          DraftFit may store interface preferences such as language, theme, calculator mode and unit system in browser storage so the site can remember your choices.
        </p>
        <p>
          Do not enter confidential, export-controlled or proprietary project information unless you are authorized to do so.
        </p>
      </InfoSection>

      <InfoSection title="Analytics, advertising and third parties">
        <p>
          This prelaunch version does not rely on this notice as consent for analytics or advertising. If analytics, advertising or other third-party tracking is introduced, this policy and any required consent controls must be updated before those services are enabled.
        </p>
      </InfoSection>

      <InfoSection title="Retention and contact">
        <p>
          Information submitted through external email or other future contact services may be retained as needed to handle the request, maintain engineering issue records and meet legal obligations.
        </p>
        <p>
          For privacy questions, use the Contact / Report issue page and the configured DraftFit contact address.
        </p>
      </InfoSection>
    </InfoPageShell>
  );
}
