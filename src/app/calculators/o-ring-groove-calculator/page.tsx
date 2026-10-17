import OringCalculatorClient from '@/components/calculators/OringCalculatorClient';
import RelatedEngineeringReading from '@/components/calculators/RelatedEngineeringReading';

import {
  buildCalculatorMetadata,
  calculatorBreadcrumbJsonLd,
  calculatorJsonLd,
  JsonLd,
} from '@/lib/seo';

export const metadata =
  buildCalculatorMetadata('oring');

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={calculatorJsonLd('oring')}
      />

      <JsonLd
        data={calculatorBreadcrumbJsonLd('oring')}
      />

      <OringCalculatorClient />

      <RelatedEngineeringReading calculator="oring" />
    </>
  );
}
