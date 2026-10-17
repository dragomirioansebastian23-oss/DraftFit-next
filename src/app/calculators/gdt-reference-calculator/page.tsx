import GdtCalculatorClient from '@/components/calculators/GdtCalculatorClient';
import RelatedEngineeringReading from '@/components/calculators/RelatedEngineeringReading';

import {
  buildCalculatorMetadata,
  calculatorBreadcrumbJsonLd,
  calculatorJsonLd,
  JsonLd,
} from '@/lib/seo';

export const metadata =
  buildCalculatorMetadata('gdt');

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={calculatorJsonLd('gdt')}
      />

      <JsonLd
        data={calculatorBreadcrumbJsonLd('gdt')}
      />

      <GdtCalculatorClient />

      <RelatedEngineeringReading calculator="gdt" />
    </>
  );
}
