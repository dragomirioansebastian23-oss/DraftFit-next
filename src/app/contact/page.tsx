import type { Metadata } from 'next';

import ContactForm from '@/components/ContactForm';
import InfoPageShell, { InfoSection } from '@/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'Contact & Report an Engineering Issue',
  description:
    'Report calculation issues, bugs and feature requests for DraftFit engineering calculators.',
  alternates: {
    canonical: '/contact',
  },
};

export default function ContactPage() {
  const contactEmail =
    process.env.NEXT_PUBLIC_CONTACT_EMAIL?.trim() || null;

  return (
    <InfoPageShell
      eyebrow="Feedback & verification"
      title="Contact / Report an issue"
      intro="Found a suspicious result, a bug or an engineering case that needs review? Build a structured report here."
    >
      <InfoSection title="For calculation issues">
        <p>
          The most useful report includes the exact calculator, inputs, actual
          result, expected result and the standard, handbook or independent
          calculation used as a reference.
        </p>
        <p>
          Do not include confidential drawings, customer data or proprietary
          project information unless you have permission to share it.
        </p>
      </InfoSection>

      <ContactForm contactEmail={contactEmail} />
    </InfoPageShell>
  );
}
