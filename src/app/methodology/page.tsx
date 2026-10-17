import type { Metadata } from 'next';

import InfoPageShell, { InfoSection } from '@/components/InfoPageShell';

export const metadata: Metadata = {
  title: 'Engineering Methodology',
  description:
    'How DraftFit handles engineering calculations, standards, units, assumptions, validation and limitations.',
  alternates: {
    canonical: '/methodology',
  },
};

export default function MethodologyPage() {
  return (
    <InfoPageShell
      eyebrow="Engineering transparency"
      title="Methodology"
      intro="How DraftFit turns engineering inputs into calculation results, and how those results should be interpreted."
    >
      <InfoSection title="1. Calculation philosophy">
        <p>
          DraftFit is built as an engineering aid: the calculator should expose
          the result quickly, but it should also make the calculation basis,
          assumptions and limitations visible.
        </p>
        <p>
          A result shown by DraftFit is not automatically a released design.
          Project-specific loading, tolerances, manufacturing capability,
          materials, temperature, fatigue, surface condition and the governing
          drawing or standard still control the final engineering decision.
        </p>
      </InfoSection>

      <InfoSection title="2. Standards and engineering references">
        <p>
          Standard-derived tables, terminology and design rules are separated
          conceptually from simplified engineering estimators. Each calculator
          identifies its engineering basis in the documentation displayed below
          the calculation.
        </p>
        <p>
          DraftFit does not reproduce complete standards. Where a calculation
          uses only a supported subset or a simplified model, that limitation is
          stated in the calculator.
        </p>
      </InfoSection>

      <InfoSection title="3. Units">
        <p>
          Calculations retain a stable internal engineering basis while the user
          can switch between Metric and Imperial display/input units where
          supported. Unit conversion must not silently change the selected
          engineering standard.
        </p>
        <p>
          Example: an ISO Metric thread remains an ISO Metric thread when the
          result is displayed in inches. Unified threads are a separate future
          implementation.
        </p>
      </InfoSection>

      <InfoSection title="4. Quick and Advanced modes">
        <p>
          Quick mode focuses on the minimum inputs and results needed for a fast
          engineering check. Advanced mode exposes additional project data,
          assumptions and calculation controls.
        </p>
        <p>
          Both modes use the same underlying calculator state; changing the user
          experience mode does not create a second, independent calculation
          engine.
        </p>
      </InfoSection>

      <InfoSection title="5. Result classification">
        <p>
          Labels such as PASS, REVIEW, preliminary, clearance, transition or
          interference describe the implemented checks only. They should be read
          together with the explanation and warning sections for that tool.
        </p>
        <p>
          A preliminary PASS does not certify a component, joint, seal or
          drawing.
        </p>
      </InfoSection>

      <InfoSection title="6. Verification and change control">
        <p>
          DraftFit uses regression tests and reference cases to reduce the risk
          of accidental calculation changes. When formulas or standard data are
          modified, the associated reference cases should be re-run and reviewed.
        </p>
        <p>
          Calculation issues can be reported through the Contact / Report issue
          page. A useful report includes the calculator, inputs, expected result,
          actual result and the reference used for comparison.
        </p>
      </InfoSection>

      <InfoSection title="Rezumat în română">
        <p>
          DraftFit este un instrument de calcul inginereasc, nu un înlocuitor
          pentru verificarea de proiect. Rezultatele trebuie analizate împreună
          cu standardul aplicabil, desenul, materialele, toleranțele și condițiile
          reale de funcționare.
        </p>
      </InfoSection>
    </InfoPageShell>
  );
}
