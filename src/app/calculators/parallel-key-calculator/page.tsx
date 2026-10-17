import KeysCalculatorClient from '@/components/calculators/KeysCalculatorClient';
import RelatedEngineeringReading from '@/components/calculators/RelatedEngineeringReading';

import {
  buildCalculatorMetadata,
  calculatorBreadcrumbJsonLd,
  calculatorJsonLd,
  JsonLd,
} from '@/lib/seo';

export const metadata =
  buildCalculatorMetadata('keys');

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={calculatorJsonLd('keys')}
      />

      <JsonLd
        data={calculatorBreadcrumbJsonLd('keys')}
      />

      <KeysCalculatorClient />

      <RelatedEngineeringReading calculator="keys" />
    </>
  );
}
