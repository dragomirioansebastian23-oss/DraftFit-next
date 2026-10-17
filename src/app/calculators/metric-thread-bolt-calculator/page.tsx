import ThreadsCalculatorClient from '@/components/calculators/ThreadsCalculatorClient';
import RelatedEngineeringReading from '@/components/calculators/RelatedEngineeringReading';

import {
  buildCalculatorMetadata,
  calculatorBreadcrumbJsonLd,
  calculatorJsonLd,
  JsonLd,
} from '@/lib/seo';

export const metadata =
  buildCalculatorMetadata('threads');

export default function CalculatorPage() {
  return (
    <>
      <JsonLd
        data={calculatorJsonLd('threads')}
      />

      <JsonLd
        data={calculatorBreadcrumbJsonLd('threads')}
      />

      <ThreadsCalculatorClient />

      <RelatedEngineeringReading calculator="threads" />
    </>
  );
}
