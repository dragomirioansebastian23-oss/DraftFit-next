import { ImageResponse } from 'next/og';

export const alt = 'DraftFit — Mechanical Engineering Calculators';
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = 'image/png';

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#09090b',
          color: '#fafafa',
          padding: '72px 84px',
          fontFamily: 'Arial, sans-serif',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 18 }}>
          <div style={{ width: 10, height: 62, background: '#ea580c' }} />
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              fontSize: 62,
              fontWeight: 900,
              letterSpacing: -2,
            }}
          >
            <span>Draft</span>
            <span style={{ color: '#f97316' }}>Fit</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
          <div style={{ fontSize: 68, lineHeight: 1.05, fontWeight: 900, maxWidth: 980 }}>
            Mechanical engineering calculators for real design work.
          </div>
          <div style={{ fontSize: 30, color: '#a1a1aa' }}>
            ISO fits · O-rings · GD&amp;T · Threads &amp; bolts · Keys &amp; keyways
          </div>
        </div>

        <div style={{ fontSize: 22, color: '#71717a', letterSpacing: 1.5 }}>
          ENGINEERING AID · VERIFY AGAINST APPLICABLE STANDARDS
        </div>
      </div>
    ),
    size,
  );
}
