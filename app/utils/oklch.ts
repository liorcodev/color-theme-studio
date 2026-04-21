/**
 * OKLCH-based color shade generator.
 *
 * Conversion path: hex ↔ sRGB ↔ linear RGB ↔ LMS ↔ Oklab ↔ OKLCH
 * All math follows the Björn Ottosson Oklab spec (2020).
 */

function clamp(v: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, v));
}

function linearize(c: number): number {
  return c <= 0.04045 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4);
}

function delinearize(c: number): number {
  return c <= 0.0031308 ? 12.92 * c : 1.055 * Math.pow(c, 1 / 2.4) - 0.055;
}

export interface Oklch {
  L: number;
  C: number;
  H: number;
}

export function hexToOklch(hex: string): Oklch {
  const h = hex.replace('#', '');
  const r = parseInt(h.slice(0, 2), 16) / 255;
  const g = parseInt(h.slice(2, 4), 16) / 255;
  const b = parseInt(h.slice(4, 6), 16) / 255;

  const rl = linearize(r);
  const gl = linearize(g);
  const bl = linearize(b);

  const lms_l = 0.4122214708 * rl + 0.5363325363 * gl + 0.0514459929 * bl;
  const lms_m = 0.2119034982 * rl + 0.6806995451 * gl + 0.1073969566 * bl;
  const lms_s = 0.0883024619 * rl + 0.2817188376 * gl + 0.6299787005 * bl;

  const l = Math.cbrt(lms_l);
  const m = Math.cbrt(lms_m);
  const s = Math.cbrt(lms_s);

  const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
  const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
  const bv = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;

  const C = Math.sqrt(a * a + bv * bv);
  const H = (Math.atan2(bv, a) * 180) / Math.PI;
  const Hn = H < 0 ? H + 360 : H;

  return { L, C, H: Hn };
}

export function oklchToHex(L: number, C: number, H: number): string {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);

  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;

  const lc = l_ * l_ * l_;
  const mc = m_ * m_ * m_;
  const sc = s_ * s_ * s_;

  const rl = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const gl = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const bl = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;

  const toU8 = (c: number) => Math.round(clamp(delinearize(c), 0, 1) * 255);
  const R = toU8(rl);
  const G = toU8(gl);
  const B = toU8(bl);

  return `#${R.toString(16).padStart(2, '0')}${G.toString(16).padStart(2, '0')}${B.toString(16).padStart(2, '0')}`;
}

// Returns true when all linear-RGB channels are within sRGB [0,1] (±ε).
function isInGamut(L: number, C: number, H: number): boolean {
  const hRad = (H * Math.PI) / 180;
  const a = C * Math.cos(hRad);
  const b = C * Math.sin(hRad);
  const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
  const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
  const s_ = L - 0.0894841775 * a - 1.291485548 * b;
  const lc = l_ * l_ * l_;
  const mc = m_ * m_ * m_;
  const sc = s_ * s_ * s_;
  const rl = +4.0767416621 * lc - 3.3077115913 * mc + 0.2309699292 * sc;
  const gl = -1.2684380046 * lc + 2.6097574011 * mc - 0.3413193965 * sc;
  const bl = -0.0041960863 * lc - 0.7034186147 * mc + 1.707614701 * sc;
  const eps = 5e-4;
  return rl >= -eps && rl <= 1 + eps && gl >= -eps && gl <= 1 + eps && bl >= -eps && bl <= 1 + eps;
}

// Binary-search for the largest chroma ≤ C that stays inside sRGB gamut.
// Prevents hue-shifting artefacts that occur when RGB channels are hard-clamped.
function clampChromaToGamut(L: number, C: number, H: number): number {
  if (isInGamut(L, C, H)) return C;
  let lo = 0;
  let hi = C;
  for (let i = 0; i < 24; i++) {
    const mid = (lo + hi) / 2;
    if (isInGamut(L, mid, H)) lo = mid;
    else hi = mid;
  }
  return lo;
}

// L targets are calibrated so that, for a mid-tone 500 (L≈0.59, like Tailwind blue),
// the generated scale matches Tailwind's perceptual distribution exactly.
const L_LIGHTEST = 0.975;
const L_DARKEST = 0.175; // raised from 0.16 - 950 should still look like the colour

// Fraction of the L gap [L_LIGHTEST → baseL] each light shade sits at.
const LIGHT_POS: Record<string, number> = {
  '50': 0,
  '100': 0.09,
  '200': 0.22,
  '300': 0.48,
  '400': 0.74
};

// Fraction of the L gap [baseL → L_DARKEST] each dark shade sits at.
const DARK_POS: Record<string, number> = {
  '600': 0.24,
  '700': 0.47,
  '800': 0.69,
  '900': 0.88,
  '950': 1.0
};

// Chroma scale factors relative to the 500 shade.
// Values are derived from Tailwind v3 palette chroma ratios and intentionally
// kept high - gamut mapping will reduce them where the sRGB cube is narrow
// (e.g. very light shades), so shades always carry as much colour as possible.
const SHADE_C_SCALE: Record<string, number> = {
  '50': 0.28,
  '100': 0.45,
  '200': 0.6,
  '300': 0.76,
  '400': 0.92,
  '500': 1.0,
  '600': 0.92,
  '700': 0.83,
  '800': 0.71,
  '900': 0.57,
  '950': 0.45
};

const SHADES = [
  '50',
  '100',
  '200',
  '300',
  '400',
  '500',
  '600',
  '700',
  '800',
  '900',
  '950'
] as const;

export function generateShades(hex: string): Record<string, string> {
  const { L, C, H } = hexToOklch(hex);
  // Wider clamp so dark or very light base colours still spread evenly.
  const baseL = clamp(L, 0.22, 0.84);

  const result: Record<string, string> = {};
  for (const shade of SHADES) {
    let targetL: number;
    if (shade === '500') {
      targetL = baseL;
    } else if (shade in LIGHT_POS) {
      targetL = L_LIGHTEST + (baseL - L_LIGHTEST) * LIGHT_POS[shade]!;
    } else {
      targetL = baseL + (L_DARKEST - baseL) * DARK_POS[shade]!;
    }
    // Request scaled chroma, then clamp to gamut to prevent hue shifts.
    const targetC = clampChromaToGamut(targetL, C * SHADE_C_SCALE[shade]!, H);
    result[shade] = oklchToHex(targetL, targetC, H);
  }
  return result;
}
