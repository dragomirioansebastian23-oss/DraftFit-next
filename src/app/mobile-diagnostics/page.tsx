import MobileDiagnosticsClient from '@/components/MobileDiagnosticsClient';

export const metadata = {
  title: 'Mobile Diagnostics | DraftFit',
  robots: {
    index: false,
    follow: false,
  },
};

export default function MobileDiagnosticsPage() {
  return <MobileDiagnosticsClient />;
}
