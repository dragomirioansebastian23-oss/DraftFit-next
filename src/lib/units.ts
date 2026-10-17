export type UnitSystem = 'metric' | 'imperial';
export type QuantityKind =
  | 'length'
  | 'area'
  | 'stress'
  | 'pressureBar'
  | 'torque'
  | 'forceN'
  | 'forceKN'
  | 'temperature'
  | 'modulusGPa'
  | 'dimensionless';

const MM_PER_IN = 25.4;
const MM2_PER_IN2 = MM_PER_IN * MM_PER_IN;
const MPA_PER_KSI = 6.894757293168361;
const PSI_PER_BAR = 14.503773773;
const LBFFT_PER_NM = 0.7375621493;
const LBF_PER_N = 0.2248089431;
const KIP_PER_KN = 0.2248089431;
const MSI_PER_GPA = 0.1450377377;

export function toDisplayValue(value: number, kind: QuantityKind, system: UnitSystem) {
  if (system === 'metric' || kind === 'dimensionless') return value;

  switch (kind) {
    case 'length': return value / MM_PER_IN;
    case 'area': return value / MM2_PER_IN2;
    case 'stress': return value / MPA_PER_KSI;
    case 'pressureBar': return value * PSI_PER_BAR;
    case 'torque': return value * LBFFT_PER_NM;
    case 'forceN': return value * LBF_PER_N;
    case 'forceKN': return value * KIP_PER_KN;
    case 'temperature': return value * 9 / 5 + 32;
    case 'modulusGPa': return value * MSI_PER_GPA;
    default: return value;
  }
}

export function fromDisplayValue(value: number, kind: QuantityKind, system: UnitSystem) {
  if (system === 'metric' || kind === 'dimensionless') return value;

  switch (kind) {
    case 'length': return value * MM_PER_IN;
    case 'area': return value * MM2_PER_IN2;
    case 'stress': return value * MPA_PER_KSI;
    case 'pressureBar': return value / PSI_PER_BAR;
    case 'torque': return value / LBFFT_PER_NM;
    case 'forceN': return value / LBF_PER_N;
    case 'forceKN': return value / KIP_PER_KN;
    case 'temperature': return (value - 32) * 5 / 9;
    case 'modulusGPa': return value / MSI_PER_GPA;
    default: return value;
  }
}

export function unitFor(kind: QuantityKind, system: UnitSystem) {
  if (kind === 'dimensionless') return '';

  if (system === 'metric') {
    return {
      length: 'mm',
      area: 'mm²',
      stress: 'MPa',
      pressureBar: 'bar',
      torque: 'N·m',
      forceN: 'N',
      forceKN: 'kN',
      temperature: '°C',
      modulusGPa: 'GPa',
    }[kind];
  }

  return {
    length: 'in',
    area: 'in²',
    stress: 'ksi',
    pressureBar: 'psi',
    torque: 'lbf·ft',
    forceN: 'lbf',
    forceKN: 'kip',
    temperature: '°F',
    modulusGPa: 'Msi',
  }[kind];
}

function defaultDigits(kind: QuantityKind, system: UnitSystem) {
  if (system === 'metric') {
    if (kind === 'length') return 3;
    if (kind === 'area') return 2;
    if (kind === 'torque') return 2;
    if (kind === 'forceN' || kind === 'forceKN') return 2;
    return 2;
  }

  if (kind === 'length') return 5;
  if (kind === 'area') return 5;
  if (kind === 'stress') return 3;
  if (kind === 'pressureBar') return 1;
  if (kind === 'torque') return 2;
  if (kind === 'forceN') return 1;
  if (kind === 'forceKN') return 3;
  if (kind === 'temperature') return 1;
  if (kind === 'modulusGPa') return 3;
  return 3;
}

export function formatQuantity(
  value: number,
  kind: QuantityKind,
  system: UnitSystem,
  digits?: number,
) {
  if (!Number.isFinite(value)) return '—';
  const converted = toDisplayValue(value, kind, system);
  const places = digits ?? defaultDigits(kind, system);
  const formatted = converted.toLocaleString('en-US', {
    maximumFractionDigits: places,
    minimumFractionDigits: 0,
  });
  const unit = unitFor(kind, system);
  return unit ? `${formatted} ${unit}` : formatted;
}

export function inputDisplayValue(
  value: string | number,
  kind: QuantityKind,
  system: UnitSystem,
  digits = 6,
) {
  if (value === '' || value === null || value === undefined) return '';
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return value;
  if (system === 'metric' || kind === 'dimensionless') return value;
  return Number(toDisplayValue(numeric, kind, system).toFixed(digits));
}

export function inputMetricValue(
  value: string,
  kind: QuantityKind,
  system: UnitSystem,
  digits = 8,
) {
  if (value === '') return '';
  const numeric = Number(value);
  if (!Number.isFinite(numeric)) return value;
  if (system === 'metric' || kind === 'dimensionless') return value;
  return String(Number(fromDisplayValue(numeric, kind, system).toFixed(digits)));
}

export function convertUnitLabel(label: string, system: UnitSystem) {
  if (system === 'metric') return label;

  return label
    .replaceAll('(mm²)', '(in²)')
    .replaceAll('(mm)', '(in)')
    .replaceAll('(MPa)', '(ksi)')
    .replaceAll('(GPa)', '(Msi)')
    .replaceAll('(N·m)', '(lbf·ft)')
    .replaceAll('(Nm)', '(lbf·ft)')
    .replaceAll('(bar)', '(psi)')
    .replaceAll('(°C)', '(°F)');
}
