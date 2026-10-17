import IsoCalculatorClient from '@/components/calculators/IsoCalculatorClient';
import RelatedEngineeringReading from '@/components/calculators/RelatedEngineeringReading';

import {
  buildCalculatorMetadata,
  calculatorBreadcrumbJsonLd,
  calculatorJsonLd,
  JsonLd,
} from '@/lib/seo';

export const metadata =
  buildCalculatorMetadata('iso286');

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={calculatorJsonLd('iso286')}
      />

      <JsonLd
        data={calculatorBreadcrumbJsonLd('iso286')}
      />

      <IsoCalculatorClient />

      <RelatedEngineeringReading calculator="iso286" />
    </>
  );
}
