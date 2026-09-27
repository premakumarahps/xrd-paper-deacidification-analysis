/**
 * XRD Analysis of Paper Samples - Research Data & Metadata
 * Academic Case Study & Review: MT3054 Characterization of Materials
 * Author: Premakumara H.P.S. (Index: 210494D)
 * Department of Mechanical Engineering, University of Moratuwa, Sri Lanka
 * 
 * Based on Research by:
 * Clark A. Maxwell, Craig J. Kennedy, Tim J. Wess (Cardiff University & Historic Scotland)
 * and Ulla Knuutinen (EVTEK University of Applied Sciences, Finland)
 */

export interface ExperimentalSampleData {
  id: string;
  paperType: 'Old Rag Paper (1831 - Flax)' | 'New Whatman No. 1 (Cotton)';
  treatment: 'Untreated Reference' | 'Washed in Deionized H2O' | 'Ca(OH)2 Deacidified' | 'Mg(HCO3)2 Deacidified';
  ageingState: 'Unaged' | 'Artificially Aged (80°C, 65% RH, 2 Wks)';
  ciMean: number;
  ciRange: [number, number];
  ciStdDev: number;
  crMean: number;
  crRange: [number, number];
  crStdDev: number;
  calciteDeposited: boolean;
  notes: string;
}

export const EXPERIMENTAL_SAMPLES: ExperimentalSampleData[] = [
  // 1. Old Rag Paper - Unaged
  {
    id: 'old_unaged_ref',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Untreated Reference',
    ageingState: 'Unaged',
    ciMean: 0.664,
    ciRange: [0.660, 0.668],
    ciStdDev: 0.0057,
    crMean: 0.494,
    crRange: [0.484, 0.504],
    crStdDev: 0.0141,
    calciteDeposited: false,
    notes: 'Historic 1831 rag paper composed of flax fibers. Baseline crystallinity before any aqueous intervention.'
  },
  {
    id: 'old_unaged_washed',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Washed in Deionized H2O',
    ageingState: 'Unaged',
    ciMean: 0.671,
    ciRange: [0.669, 0.672],
    ciStdDev: 0.0021,
    crMean: 0.509,
    crRange: [0.506, 0.512],
    crStdDev: 0.0042,
    calciteDeposited: false,
    notes: 'Slight increase in CI (+1.0%) due to leaching of water-soluble acidic degradation products and amorphous fragments.'
  },
  {
    id: 'old_unaged_caoh',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Ca(OH)2 Deacidified',
    ageingState: 'Unaged',
    ciMean: 0.678,
    ciRange: [0.667, 0.689],
    ciStdDev: 0.0156,
    crMean: 0.526,
    crRange: [0.502, 0.549],
    crStdDev: 0.0332,
    calciteDeposited: true,
    notes: '0.02M Ca(OH)2 treatment introduces calcium ions, forming a calcite (CaCO3) alkaline reserve evident as a distinct reflection in XRD.'
  },
  {
    id: 'old_unaged_mghco3',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Mg(HCO3)2 Deacidified',
    ageingState: 'Unaged',
    ciMean: 0.619,
    ciRange: [0.586, 0.651],
    ciStdDev: 0.0460,
    crMean: 0.378,
    crRange: [0.293, 0.463],
    crStdDev: 0.1202,
    calciteDeposited: false,
    notes: '0.04M Mg(HCO3)2 produced high variability and lower CI/CR, indicating less consistent fiber stabilization.'
  },

  // 2. Old Rag Paper - Artificially Aged (80°C, 65% RH, 2 Weeks)
  {
    id: 'old_aged_ref',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Untreated Reference',
    ageingState: 'Artificially Aged (80°C, 65% RH, 2 Wks)',
    ciMean: 0.718,
    ciRange: [0.714, 0.721],
    ciStdDev: 0.0049,
    crMean: 0.607,
    crRange: [0.600, 0.613],
    crStdDev: 0.0092,
    calciteDeposited: false,
    notes: 'Thermal ageing caused +8.1% surge in CI. Hydrolysis preferentially destroys amorphous cellulose, leaving brittle crystalline core.'
  },
  {
    id: 'old_aged_washed',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Washed in Deionized H2O',
    ageingState: 'Artificially Aged (80°C, 65% RH, 2 Wks)',
    ciMean: 0.674,
    ciRange: [0.671, 0.676],
    ciStdDev: 0.0035,
    crMean: 0.516,
    crRange: [0.510, 0.522],
    crStdDev: 0.0085,
    calciteDeposited: false,
    notes: 'Washing prevented the dramatic crystallization spike seen in untreated aged paper (CI restrained to 0.674 vs 0.718).'
  },
  {
    id: 'old_aged_caoh',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Ca(OH)2 Deacidified',
    ageingState: 'Artificially Aged (80°C, 65% RH, 2 Wks)',
    ciMean: 0.671,
    ciRange: [0.670, 0.671],
    ciStdDev: 0.0007,
    crMean: 0.509,
    crRange: [0.507, 0.510],
    crStdDev: 0.0021,
    calciteDeposited: true,
    notes: 'Remarkable protective effect: Ca(OH)2 maintained stable crystallinity (0.671), completely inhibiting ageing-induced embrittlement.'
  },
  {
    id: 'old_aged_mghco3',
    paperType: 'Old Rag Paper (1831 - Flax)',
    treatment: 'Mg(HCO3)2 Deacidified',
    ageingState: 'Artificially Aged (80°C, 65% RH, 2 Wks)',
    ciMean: 0.687,
    ciRange: [0.670, 0.704],
    ciStdDev: 0.0240,
    crMean: 0.544,
    crRange: [0.507, 0.580],
    crStdDev: 0.0516,
    calciteDeposited: false,
    notes: 'Mg(HCO3)2 showed partial buffering but higher spread in crystallinity compared to calcium hydroxide.'
  },

  // 3. New Whatman No. 1 Paper - Unaged
  {
    id: 'new_unaged_ref',
    paperType: 'New Whatman No. 1 (Cotton)',
    treatment: 'Untreated Reference',
    ageingState: 'Unaged',
    ciMean: 0.723,
    ciRange: [0.721, 0.725],
    ciStdDev: 0.0028,
    crMean: 0.617,
    crRange: [0.612, 0.621],
    crStdDev: 0.0064,
    calciteDeposited: false,
    notes: 'Modern pure cotton paper exhibits inherently higher baseline crystallinity than historic flax rag paper (0.723 vs 0.664).'
  },
  {
    id: 'new_unaged_caoh',
    paperType: 'New Whatman No. 1 (Cotton)',
    treatment: 'Ca(OH)2 Deacidified',
    ageingState: 'Unaged',
    ciMean: 0.731,
    ciRange: [0.729, 0.732],
    ciStdDev: 0.0021,
    crMean: 0.632,
    crRange: [0.629, 0.634],
    crStdDev: 0.0035,
    calciteDeposited: true,
    notes: 'Marginal increase in crystallinity. Modern cotton fibers are already highly organized, showing minimal treatment sensitivity.'
  },
  {
    id: 'new_unaged_mghco3',
    paperType: 'New Whatman No. 1 (Cotton)',
    treatment: 'Mg(HCO3)2 Deacidified',
    ageingState: 'Unaged',
    ciMean: 0.722,
    ciRange: [0.720, 0.723],
    ciStdDev: 0.0021,
    crMean: 0.615,
    crRange: [0.611, 0.618],
    crStdDev: 0.0049,
    calciteDeposited: false,
    notes: 'Virtually identical to untreated reference, confirming that deacidification has negligible impact on unaged modern paper.'
  },

  // 4. New Whatman No. 1 Paper - Artificially Aged
  {
    id: 'new_aged_ref',
    paperType: 'New Whatman No. 1 (Cotton)',
    treatment: 'Untreated Reference',
    ageingState: 'Artificially Aged (80°C, 65% RH, 2 Wks)',
    ciMean: 0.743,
    ciRange: [0.742, 0.744],
    ciStdDev: 0.0014,
    crMean: 0.654,
    crRange: [0.652, 0.655],
    crStdDev: 0.0021,
    calciteDeposited: false,
    notes: 'Ageing elevates cotton paper crystallinity to 0.743 due to degradation of remaining amorphous regions.'
  },
  {
    id: 'new_aged_caoh',
    paperType: 'New Whatman No. 1 (Cotton)',
    treatment: 'Ca(OH)2 Deacidified',
    ageingState: 'Artificially Aged (80°C, 65% RH, 2 Wks)',
    ciMean: 0.742,
    ciRange: [0.732, 0.751],
    ciStdDev: 0.0134,
    crMean: 0.652,
    crRange: [0.635, 0.668],
    crStdDev: 0.0233,
    calciteDeposited: true,
    notes: 'Calcite deposition provides alkali buffering with stable overall crystallinity under thermal ageing.'
  },
  {
    id: 'new_aged_mghco3',
    paperType: 'New Whatman No. 1 (Cotton)',
    treatment: 'Mg(HCO3)2 Deacidified',
    ageingState: 'Artificially Aged (80°C, 65% RH, 2 Wks)',
    ciMean: 0.739,
    ciRange: [0.735, 0.742],
    ciStdDev: 0.0049,
    crMean: 0.646,
    crRange: [0.639, 0.652],
    crStdDev: 0.0092,
    calciteDeposited: false,
    notes: 'Stable performance with mild protection against thermal degradation in cotton cellulose.'
  }
];

export interface PresentationSlideData {
  slideNumber: number;
  title: string;
  topic: string;
  summary: string;
  image: string;
}

export const PRESENTATION_SLIDES: PresentationSlideData[] = [
  {
    slideNumber: 1,
    title: 'X-Ray Diffraction Analysis of Paper Samples',
    topic: 'Title & Author Attribution',
    summary: 'Effects of Water, Deacidification, and Ageing on Cellulose Crystallinity. Authored by Premakumara H.P.S. (Index: 210494D) under Module MT3054: Characterization of Materials.',
    image: '/slides/slide_01.png'
  },
  {
    slideNumber: 2,
    title: 'Research Focus & Scientific Background',
    topic: 'Introduction & Rationale',
    summary: 'Investigation into how aqueous washing, deacidification (Ca(OH)2 & Mg(HCO3)2), and artificial ageing alter cellulose nanostructure and crystallinity in archival conservation.',
    image: '/slides/slide_02.png'
  },
  {
    slideNumber: 3,
    title: 'Materials, Treatments & XRD Formulations',
    topic: 'Experimental Methodology',
    summary: 'Analysis of 1831 old flax rag paper vs modern Whatman cotton paper. Application of Crystallinity Index (CI = (Imax - Imin) / Imax) and Crystallinity Ratio (CR = 1 - Imin / (Imax - Imin)).',
    image: '/slides/slide_03.png'
  },
  {
    slideNumber: 4,
    title: 'Experimental Results & XRD Diffractograms',
    topic: 'Quantitative Crystallinity Findings',
    summary: 'Tabulated CI and CR comparisons for old and new papers before and after ageing. Detection of calcite mineral reflections in calcium hydroxide treated specimens.',
    image: '/slides/slide_04.png'
  },
  {
    slideNumber: 5,
    title: 'Conclusions & Conservation Implications',
    topic: 'Conservation Impact & Future Work',
    summary: 'Artificial ageing increases crystallinity across all papers. Calcium hydroxide deacidification restrains excessive crystallization in aged historic paper, preserving ductility.',
    image: '/slides/slide_05.png'
  },
  {
    slideNumber: 6,
    title: 'Academic Acknowledgements & Closing',
    topic: 'Q&A and Defense Completion',
    summary: 'Closing acknowledgment of Cardiff University WAXD laboratory, EVTEK Institute of Art and Design, and University of Moratuwa Faculty of Mechanical Engineering.',
    image: '/slides/slide_06.png'
  }
];

export interface CaseStudyPageData {
  pageNumber: number;
  section: string;
  title: string;
  summary: string;
  image: string;
}

export const CASE_STUDY_PAGES: CaseStudyPageData[] = [
  { pageNumber: 1, section: 'Cover & Submission', title: 'Case Study Submission: MT3054', summary: 'Characterization of Materials submission by Premakumara H.P.S. (Index: 210494D), Department of Mechanical Engineering, University of Moratuwa.', image: '/case_study/case_page_01.png' },
  { pageNumber: 2, section: '1. Introduction', title: 'Archival Conservation & Nanostructure', summary: 'Context of historical document degradation and rationale for investigating molecular-level cellulose crystallinity beyond macroscopic pH and color changes.', image: '/case_study/case_page_02.png' },
  { pageNumber: 3, section: '2. Sample Preparation', title: '1831 Rag Paper, Whatman No. 1 & Treatments', summary: 'Preparation protocol: Millipore Elix III purified water wash, 0.02M Ca(OH)2, 0.04M Mg(HCO3)2, and artificial ageing at 80°C / 65% RH for 2 weeks.', image: '/case_study/case_page_03.png' },
  { pageNumber: 4, section: '3. XRD Justification', title: 'Wide-Angle X-Ray Diffraction (WAXD) System', summary: 'Technical setup: Bruker AXS Kristalloflex 760 X-ray generator at Cardiff University. Resolution down to 0.22 - 3.0 nm for non-destructive analysis.', image: '/case_study/case_page_04.png' },
  { pageNumber: 5, section: '4.1 Results: Old Paper', title: 'Crystallinity Index (CI) & Ratio (CR) of Rag Paper', summary: 'Detailed quantitative metrics for unaged old paper: Untreated CI 0.664, Washed CI 0.671, Ca(OH)2 CI 0.678, Mg(HCO3)2 CI 0.619.', image: '/case_study/case_page_05.png' },
  { pageNumber: 6, section: '4.1 Aged Old Paper', title: 'Calcite Mineral Deposit Detection', summary: 'Analysis of aged old paper (Untreated CI jumps to 0.718; Ca(OH)2 restrains to 0.671). Distinct calcite reflection identified at 2θ ≈ 29.4° in Ca(OH)2 specimens.', image: '/case_study/case_page_06.png' },
  { pageNumber: 7, section: '4.2 Results: New Paper', title: 'Whatman No. 1 Cotton Paper Analysis', summary: 'New paper metrics: Baseline CI 0.723, aged untreated CI 0.743. Cotton cellulose demonstrates inherently higher initial order than flax.', image: '/case_study/case_page_07.png' },
  { pageNumber: 8, section: '4.3 Discussion', title: 'Recrystallization vs Amorphous Degradation', summary: 'Mechanistic discussion on why ageing increases crystallinity (preferential scission of amorphous chains) and how calcite provides long-term alkaline buffering.', image: '/case_study/case_page_08.png' },
  { pageNumber: 9, section: '5. Conclusion', title: 'Final Conservation Takeaways', summary: 'Summary of findings: Ageing elevates crystallinity; Ca(OH)2 stabilizes historic rag paper against brittleness; XRD is validated as a superior non-destructive tool.', image: '/case_study/case_page_09.png' },
  { pageNumber: 10, section: '6. References', title: 'Citations & Bibliographic Grounding', summary: 'Primary citation: U. Knuutinen, C. J. Kennedy, T. J. Wess, A. C. Maxwell (2008) in EVTEK & Cardiff University collaboration.', image: '/case_study/case_page_10.png' }
];
