/**
 * Physics and Crystallography Engine for Cellulose X-Ray Diffraction
 * Covers Bragg's Law, Segal Crystallinity Index, Crystallinity Ratio, and Diffractogram Synthesis
 */

export interface DiffractogramPoint {
  twoTheta: number; // 2θ angle in degrees (e.g. 10.0° to 40.0°)
  intensity: number; // Arbitrary intensity units (a.u.)
  dSpacingAngstrom: number; // Lattice spacing d = λ / (2 * sin(θ))
}

export interface DiffractogramProfile {
  dataPoints: DiffractogramPoint[];
  iMax: number;
  iMaxTwoTheta: number;
  iMin: number;
  iMinTwoTheta: number;
  crystallinityIndex: number; // CI
  crystallinityRatio: number; // CR
  calcitePeakPresent: boolean;
  calcitePeakIntensity: number;
  sampleDescription: string;
}

export const X_RAY_WAVELENGTH_ANGSTROM = 1.5418; // Cu-Kα radiation (0.15418 nm)

/**
 * Computes d-spacing using Bragg's Law: nλ = 2d sin(θ)
 */
export function calculateDSpacing(twoThetaDeg: number, wavelengthAngstrom: number = X_RAY_WAVELENGTH_ANGSTROM): number {
  const thetaRad = ((twoThetaDeg / 2) * Math.PI) / 180;
  return wavelengthAngstrom / (2 * Math.sin(thetaRad));
}

/**
 * Calculates Segal Crystallinity Index: CI = (I_max - I_min) / I_max
 */
export function calculateCI(iMax: number, iMin: number): number {
  if (iMax <= 0) return 0;
  return Math.max(0, Math.min(1, (iMax - iMin) / iMax));
}

/**
 * Calculates Crystallinity Ratio: CR = 1 - (I_min / (I_max - I_min))
 */
export function calculateCR(iMax: number, iMin: number): number {
  const diff = iMax - iMin;
  if (diff <= 0) return 0;
  return Math.max(0, Math.min(1, 1 - (iMin / diff)));
}

/**
 * Generates an accurate synthetic XRD diffractogram (Intensity vs 2θ)
 * Grounded in experimental Wide-Angle X-Ray Diffraction (WAXD) profiles of Cellulose I
 */
export function generateSyntheticDiffractogram(
  paperType: 'old' | 'new',
  treatment: 'untreated' | 'washed' | 'caoh' | 'mghco3',
  aged: boolean
): DiffractogramProfile {
  // Base intensity parameters tailored to match experimental report data
  let targetCI = 0.664; // Default unaged untreated old rag paper
  let hasCalcite = false;

  if (paperType === 'old') {
    if (!aged) {
      if (treatment === 'untreated') targetCI = 0.664;
      else if (treatment === 'washed') targetCI = 0.671;
      else if (treatment === 'caoh') { targetCI = 0.678; hasCalcite = true; }
      else if (treatment === 'mghco3') targetCI = 0.619;
    } else {
      // Artificially Aged Old Paper
      if (treatment === 'untreated') targetCI = 0.718; // Large surge
      else if (treatment === 'washed') targetCI = 0.674;
      else if (treatment === 'caoh') { targetCI = 0.671; hasCalcite = true; } // Stable!
      else if (treatment === 'mghco3') targetCI = 0.687;
    }
  } else {
    // New Whatman Cotton Paper
    if (!aged) {
      if (treatment === 'untreated') targetCI = 0.723;
      else if (treatment === 'washed') targetCI = 0.725;
      else if (treatment === 'caoh') { targetCI = 0.731; hasCalcite = true; }
      else if (treatment === 'mghco3') targetCI = 0.722;
    } else {
      // Artificially Aged New Paper
      if (treatment === 'untreated') targetCI = 0.743;
      else if (treatment === 'washed') targetCI = 0.740;
      else if (treatment === 'caoh') { targetCI = 0.742; hasCalcite = true; }
      else if (treatment === 'mghco3') targetCI = 0.739;
    }
  }

  // Define I_max at 2θ = 22.6° (cellulose (200) reflection)
  const iMax = 1000;
  // Calculate I_min at 2θ = 18.0° such that (iMax - iMin) / iMax = targetCI
  const iMin = Math.round(iMax * (1 - targetCI));

  const dataPoints: DiffractogramPoint[] = [];

  // Helper Gaussian peak generator: y = H * exp(-0.5 * ((x - x0) / sigma)^2)
  const gaussian = (x: number, x0: number, height: number, fwhm: number) => {
    const sigma = fwhm / 2.3548;
    return height * Math.exp(-0.5 * Math.pow((x - x0) / sigma, 2));
  };

  // Generate curve from 2θ = 10.0° to 40.0° at 0.25° intervals
  for (let twoTheta = 10.0; twoTheta <= 40.0; twoTheta += 0.25) {
    // 1. Amorphous broad halo centered around 2θ = 19.5°
    const amorphousHalo = gaussian(twoTheta, 19.5, iMin * 1.05, 7.5);
    const instrumentBaseline = 60 + Math.pow(twoTheta - 25, 2) * 0.08;

    // 2. Crystalline Cellulose I Peaks:
    // (101) peak @ 14.8°
    const peak101 = gaussian(twoTheta, 14.8, (iMax - iMin) * 0.35, 1.8);
    // (10-1) peak @ 16.5°
    const peak101bar = gaussian(twoTheta, 16.5, (iMax - iMin) * 0.42, 1.9);
    // Main (200) crystalline peak @ 22.6°
    const peak200 = gaussian(twoTheta, 22.6, (iMax - iMin) * 1.00, 2.2);
    // (040) peak @ 34.5°
    const peak040 = gaussian(twoTheta, 34.5, (iMax - iMin) * 0.18, 2.8);

    // 3. Calcite (CaCO3) (104) sharp reflection @ 2θ = 29.4° if Ca(OH)2 treated
    let calcitePeak = 0;
    if (hasCalcite) {
      calcitePeak = gaussian(twoTheta, 29.4, 280, 0.45); // Sharp crystalline mineral peak
    }

    const totalIntensity = instrumentBaseline + amorphousHalo + peak101 + peak101bar + peak200 + peak040 + calcitePeak;
    const dSpacing = calculateDSpacing(twoTheta);

    dataPoints.push({
      twoTheta: parseFloat(twoTheta.toFixed(2)),
      intensity: parseFloat(totalIntensity.toFixed(1)),
      dSpacingAngstrom: parseFloat(dSpacing.toFixed(3))
    });
  }

  const calculatedCI = calculateCI(iMax, iMin);
  const calculatedCR = calculateCR(iMax, iMin);

  return {
    dataPoints,
    iMax,
    iMaxTwoTheta: 22.6,
    iMin,
    iMinTwoTheta: 18.0,
    crystallinityIndex: parseFloat(calculatedCI.toFixed(3)),
    crystallinityRatio: parseFloat(calculatedCR.toFixed(3)),
    calcitePeakPresent: hasCalcite,
    calcitePeakIntensity: hasCalcite ? 280 : 0,
    sampleDescription: `${paperType === 'old' ? '1831 Old Flax Rag Paper' : 'Whatman No. 1 Cotton Paper'} - ${treatment.toUpperCase()} (${aged ? 'Aged 80°C/65% RH' : 'Unaged'})`
  };
}
