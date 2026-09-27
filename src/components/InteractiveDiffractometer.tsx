import React, { useState, useMemo } from 'react';
import { 
  Activity, 
  Info, 
  Sparkles, 
  Layers, 
  Sliders, 
  RefreshCw, 
  ShieldCheck, 
  AlertCircle,
  Eye,
  Crosshair,
  Compass,
  Zap
} from 'lucide-react';
import { 
  generateSyntheticDiffractogram, 
  calculateDSpacing, 
  X_RAY_WAVELENGTH_ANGSTROM 
} from '../core/xrdPhysics';
import { MathView } from './MathView';

export const InteractiveDiffractometer: React.FC = () => {
  const [paperType, setPaperType] = useState<'old' | 'new'>('old');
  const [treatment, setTreatment] = useState<'untreated' | 'washed' | 'caoh' | 'mghco3'>('untreated');
  const [isAged, setIsAged] = useState<boolean>(false);
  const [cursorTwoTheta, setCursorTwoTheta] = useState<number>(22.6);
  const [showRealFigure, setShowRealFigure] = useState<boolean>(false);

  // Compute profile
  const profile = useMemo(() => {
    return generateSyntheticDiffractogram(paperType, treatment, isAged);
  }, [paperType, treatment, isAged]);

  // Compute cursor data
  const cursorPoint = useMemo(() => {
    const pt = profile.dataPoints.reduce((prev, curr) => 
      Math.abs(curr.twoTheta - cursorTwoTheta) < Math.abs(prev.twoTheta - cursorTwoTheta) ? curr : prev
    );
    return pt;
  }, [profile, cursorTwoTheta]);

  // SVG Chart Dimensions
  const svgWidth = 800;
  const svgHeight = 360;
  const padding = { top: 30, right: 30, bottom: 50, left: 65 };
  const graphWidth = svgWidth - padding.left - padding.right;
  const graphHeight = svgHeight - padding.top - padding.bottom;

  // Min/Max for Scaling
  const minTwoTheta = 10;
  const maxTwoTheta = 40;
  const maxIntensity = 1100;
  const minIntensity = 0;

  const scaleX = (twoTheta: number) => 
    padding.left + ((twoTheta - minTwoTheta) / (maxTwoTheta - minTwoTheta)) * graphWidth;

  const scaleY = (intensity: number) => 
    padding.top + graphHeight - ((intensity - minIntensity) / (maxIntensity - minIntensity)) * graphHeight;

  // Generate SVG Path
  const pathD = useMemo(() => {
    if (profile.dataPoints.length === 0) return '';
    return profile.dataPoints.reduce((acc, pt, idx) => {
      const x = scaleX(pt.twoTheta);
      const y = scaleY(pt.intensity);
      return idx === 0 ? `M ${x} ${y}` : `${acc} L ${x} ${y}`;
    }, '');
  }, [profile]);

  // Area under curve path
  const areaD = useMemo(() => {
    if (profile.dataPoints.length === 0) return '';
    const firstX = scaleX(profile.dataPoints[0].twoTheta);
    const lastX = scaleX(profile.dataPoints[profile.dataPoints.length - 1].twoTheta);
    const bottomY = scaleY(0);
    return `${pathD} L ${lastX} ${bottomY} L ${firstX} ${bottomY} Z`;
  }, [pathD, profile]);

  return (
    <section className="py-12 bg-slate-950/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-400 text-xs font-mono font-medium mb-3">
              <Activity className="w-3.5 h-3.5 text-sky-400 animate-pulse" />
              <span>LAB SIMULATOR • Cu-Kα (λ = 1.5418 Å)</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Virtual Wide-Angle X-Ray Diffractometer
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Simulate experimental diffractograms based on the Cardiff University Bruker Kristalloflex 760 WAXD setup. Observe Cellulose I reflection peaks, amorphous baseline shifts, and calcite deposit precipitation.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setShowRealFigure(!showRealFigure)}
              className={`flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs font-semibold border transition-all ${
                showRealFigure
                  ? 'bg-amber-500/20 border-amber-500 text-amber-300 shadow-lg shadow-amber-500/10'
                  : 'bg-slate-900 border-slate-700 text-slate-300 hover:border-slate-600'
              }`}
            >
              <Eye className="w-4 h-4 text-amber-400" />
              <span>{showRealFigure ? 'Hide Archival Scan' : 'View Archival Scan'}</span>
            </button>

            <button
              onClick={() => {
                setPaperType('old');
                setTreatment('untreated');
                setIsAged(false);
                setCursorTwoTheta(22.6);
              }}
              className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-400 hover:text-slate-200 text-xs font-medium transition-all"
              title="Reset to 1831 Old Paper Unaged Baseline"
            >
              <RefreshCw className="w-3.5 h-3.5" />
              <span>Reset</span>
            </button>
          </div>
        </div>

        {/* Archival Real Scan Drawer */}
        {showRealFigure && (
          <div className="mb-8 p-5 rounded-2xl bg-slate-900/90 border border-amber-500/40 shadow-2xl animate-in fade-in duration-300">
            <div className="flex items-start justify-between gap-4 mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                    HISTORIC DISCOVERY
                  </span>
                  <h4 className="text-white font-bold text-sm">
                    Archival Diffractogram: Calcite Reflection & Cellulose Crystallinity
                  </h4>
                </div>
                <p className="text-xs text-slate-400 mt-1">
                  Extracted directly from the Cardiff University research paper: Notice the sharp peak at <MathView math="2\theta \approx 29.4^\circ" /> indicating crystalline calcium carbonate deposit on <MathView math="\text{Ca(OH)}_2" /> treated rag paper.
                </p>
              </div>
              <button
                onClick={() => setShowRealFigure(false)}
                className="text-slate-400 hover:text-white text-xs font-mono px-2 py-1 rounded bg-slate-800"
              >
                Close ✕
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                <img 
                  src="/figures/fig_calcite_diffractogram.png" 
                  alt="Calcite reflection in XRD pattern" 
                  className="max-h-64 mx-auto rounded object-contain"
                />
                <span className="text-[11px] font-mono text-slate-400 mt-2 block">
                  Figure 1: Ca(OH)₂ treated sample showing sharp Calcite (CaCO₃) peak at 29.4°
                </span>
              </div>
              <div className="bg-slate-950 p-2 rounded-xl border border-slate-800 text-center">
                <img 
                  src="/figures/fig_whatman_diffractogram.png" 
                  alt="Whatman No. 1 XRD pattern" 
                  className="max-h-64 mx-auto rounded object-contain"
                />
                <span className="text-[11px] font-mono text-slate-400 mt-2 block">
                  Figure 2: Whatman No. 1 pure cotton cellulose reference pattern
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Control Center */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
          
          {/* 1. Paper Type Selection */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
              1. Specimen Origin
            </span>
            <div className="grid grid-cols-2 gap-2.5">
              <button
                onClick={() => setPaperType('old')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  paperType === 'old'
                    ? 'bg-amber-500/15 border-amber-500/80 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-amber-400">1831 Rag Paper</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Historic Flax Fibers</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">Baseline CI: ~0.664</div>
              </button>

              <button
                onClick={() => setPaperType('new')}
                className={`p-3 rounded-xl text-left border transition-all ${
                  paperType === 'new'
                    ? 'bg-sky-500/15 border-sky-500/80 text-white shadow-md'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="text-xs font-bold text-sky-400">Whatman No. 1</div>
                <div className="text-[11px] text-slate-400 mt-0.5">Pure Cotton Cellulose</div>
                <div className="text-[10px] font-mono text-slate-500 mt-1">Baseline CI: ~0.723</div>
              </button>
            </div>
          </div>

          {/* 2. Deacidification Treatment */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-lg">
            <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
              2. Chemical Treatment
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                onClick={() => setTreatment('untreated')}
                className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                  treatment === 'untreated'
                    ? 'bg-slate-800 border-slate-600 text-white'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>Untreated Control</div>
                <div className="text-[10px] text-slate-500">No chemical bath</div>
              </button>

              <button
                onClick={() => setTreatment('washed')}
                className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                  treatment === 'washed'
                    ? 'bg-blue-500/20 border-blue-500 text-blue-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>Millipore H₂O Wash</div>
                <div className="text-[10px] text-slate-500">Deionized leach</div>
              </button>

              <button
                onClick={() => setTreatment('caoh')}
                className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all relative ${
                  treatment === 'caoh'
                    ? 'bg-emerald-500/20 border-emerald-500 text-emerald-300 shadow-md shadow-emerald-500/10'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span>0.02M Ca(OH)₂</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                </div>
                <div className="text-[10px] text-slate-500">Calcite reserve</div>
              </button>

              <button
                onClick={() => setTreatment('mghco3')}
                className={`p-2.5 rounded-xl text-left border text-xs font-medium transition-all ${
                  treatment === 'mghco3'
                    ? 'bg-purple-500/20 border-purple-500 text-purple-300'
                    : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                }`}
              >
                <div>0.04M Mg(HCO₃)₂</div>
                <div className="text-[10px] text-slate-500">Magnesium bath</div>
              </button>
            </div>
          </div>

          {/* 3. Ageing Chamber Condition */}
          <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800/80 shadow-lg flex flex-col justify-between">
            <div>
              <span className="text-xs font-mono uppercase tracking-wider text-slate-400 block mb-3 font-semibold">
                3. Environmental Ageing Chamber
              </span>
              <div className="grid grid-cols-2 gap-2.5">
                <button
                  onClick={() => setIsAged(false)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    !isAged
                      ? 'bg-teal-500/15 border-teal-500/80 text-white'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-teal-400">Unaged State</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Ambient Archival</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">20°C / 50% RH</div>
                </button>

                <button
                  onClick={() => setIsAged(true)}
                  className={`p-3 rounded-xl text-left border transition-all ${
                    isAged
                      ? 'bg-rose-500/15 border-rose-500/80 text-white shadow-md'
                      : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-slate-200'
                  }`}
                >
                  <div className="text-xs font-bold text-rose-400">Artificially Aged</div>
                  <div className="text-[11px] text-slate-400 mt-0.5">Accelerated Heat</div>
                  <div className="text-[10px] font-mono text-slate-500 mt-1">80°C / 65% RH • 2 Wks</div>
                </button>
              </div>
            </div>

            <div className="mt-3 pt-3 border-t border-slate-800 text-[11px] text-slate-400 flex items-center gap-1.5">
              <Zap className="w-3.5 h-3.5 text-amber-400" />
              <span>Simulates 25-50 years of natural archival degeneration.</span>
            </div>
          </div>

        </div>

        {/* Main Diffractometer Display & Graph */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800/80 p-5 shadow-2xl relative overflow-hidden mb-8">
          
          {/* Diffractometer Sub-Header */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-4 mb-4 border-b border-slate-800">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-mono uppercase text-sky-400 font-bold">
                  Active Diffractogram Profile
                </span>
                <span className="text-slate-600">•</span>
                <span className="text-xs font-semibold text-white">
                  {profile.sampleDescription}
                </span>
              </div>
            </div>

            {/* Calcite Indicator Pill */}
            {profile.calcitePeakPresent ? (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/15 border border-emerald-500/40 text-emerald-300 text-xs font-mono font-semibold animate-pulse">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Calcite Mineral Reflection Active (2θ = 29.4°)</span>
              </div>
            ) : (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800 border border-slate-700 text-slate-400 text-xs font-mono">
                <span>No Calcite Deposit Detected</span>
              </div>
            )}
          </div>

          {/* Diffractogram Chart (SVG) */}
          <div className="relative w-full overflow-x-auto">
            <svg 
              viewBox={`0 0 ${svgWidth} ${svgHeight}`} 
              className="w-full h-auto max-h-[420px] select-none font-sans"
            >
              <defs>
                {/* Gradient for area fill */}
                <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#0284c7" stopOpacity="0.45" />
                  <stop offset="60%" stopColor="#3b82f6" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#1e1b4b" stopOpacity="0.0" />
                </linearGradient>

                {/* Calcite Peak Highlight Gradient */}
                <radialGradient id="calciteGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#10b981" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
                </radialGradient>
              </defs>

              {/* Grid Lines */}
              {[200, 400, 600, 800, 1000].map((intVal) => (
                <g key={`grid-y-${intVal}`}>
                  <line 
                    x1={padding.left} 
                    y1={scaleY(intVal)} 
                    x2={svgWidth - padding.right} 
                    y2={scaleY(intVal)} 
                    stroke="#1e293b" 
                    strokeWidth="1" 
                    strokeDasharray="4 4"
                  />
                  <text 
                    x={padding.left - 10} 
                    y={scaleY(intVal) + 4} 
                    fill="#64748b" 
                    fontSize="10" 
                    fontFamily="monospace"
                    textAnchor="end"
                  >
                    {intVal}
                  </text>
                </g>
              ))}

              {[10, 15, 20, 25, 30, 35, 40].map((deg) => (
                <g key={`grid-x-${deg}`}>
                  <line 
                    x1={scaleX(deg)} 
                    y1={padding.top} 
                    x2={scaleX(deg)} 
                    y2={svgHeight - padding.bottom} 
                    stroke="#1e293b" 
                    strokeWidth="1" 
                  />
                  <text 
                    x={scaleX(deg)} 
                    y={svgHeight - padding.bottom + 20} 
                    fill="#94a3b8" 
                    fontSize="11" 
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    {deg}°
                  </text>
                </g>
              ))}

              {/* Axis Labels */}
              <text 
                x={svgWidth / 2} 
                y={svgHeight - 12} 
                fill="#cbd5e1" 
                fontSize="12" 
                fontWeight="600"
                textAnchor="middle"
              >
                Diffraction Angle 2θ (degrees) — Cu-Kα Radiation
              </text>

              <text 
                transform={`rotate(-90)`}
                x={-(svgHeight / 2)} 
                y={20} 
                fill="#cbd5e1" 
                fontSize="12" 
                fontWeight="600"
                textAnchor="middle"
              >
                Diffracted Intensity (Arbitrary Units)
              </text>

              {/* Area fill under curve */}
              <path d={areaD} fill="url(#areaGradient)" />

              {/* Diffractogram Profile Curve */}
              <path 
                d={pathD} 
                fill="none" 
                stroke="#38bdf8" 
                strokeWidth="2.5" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
              />

              {/* Peak Annotations */}
              {/* Cellulose (200) crystalline peak at 22.6° */}
              <g>
                <circle 
                  cx={scaleX(profile.iMaxTwoTheta)} 
                  cy={scaleY(profile.iMax)} 
                  r="5" 
                  fill="#38bdf8" 
                  stroke="#ffffff" 
                  strokeWidth="2"
                />
                <line 
                  x1={scaleX(profile.iMaxTwoTheta)} 
                  y1={scaleY(profile.iMax) - 6} 
                  x2={scaleX(profile.iMaxTwoTheta)} 
                  y2={scaleY(profile.iMax) - 24} 
                  stroke="#38bdf8" 
                  strokeWidth="1.5"
                />
                <text 
                  x={scaleX(profile.iMaxTwoTheta)} 
                  y={scaleY(profile.iMax) - 28} 
                  fill="#38bdf8" 
                  fontSize="11" 
                  fontWeight="bold" 
                  textAnchor="middle"
                >
                  (200) I_max = {profile.iMax}
                </text>
                <text 
                  x={scaleX(profile.iMaxTwoTheta)} 
                  y={scaleY(profile.iMax) - 15} 
                  fill="#94a3b8" 
                  fontSize="9" 
                  fontFamily="monospace"
                  textAnchor="middle"
                >
                  d = 3.93 Å
                </text>
              </g>

              {/* Amorphous Minimum Trough at 18.0° */}
              <g>
                <circle 
                  cx={scaleX(profile.iMinTwoTheta)} 
                  cy={scaleY(profile.iMin)} 
                  r="5" 
                  fill="#f43f5e" 
                  stroke="#ffffff" 
                  strokeWidth="2"
                />
                <line 
                  x1={scaleX(profile.iMinTwoTheta)} 
                  y1={scaleY(profile.iMin) + 6} 
                  x2={scaleX(profile.iMinTwoTheta)} 
                  y2={scaleY(profile.iMin) + 26} 
                  stroke="#f43f5e" 
                  strokeWidth="1.5"
                />
                <text 
                  x={scaleX(profile.iMinTwoTheta)} 
                  y={scaleY(profile.iMin) + 38} 
                  fill="#f43f5e" 
                  fontSize="11" 
                  fontWeight="bold" 
                  textAnchor="middle"
                >
                  Amorphous I_min = {profile.iMin}
                </text>
              </g>

              {/* Calcite Peak at 29.4° if present */}
              {profile.calcitePeakPresent && (
                <g>
                  <circle 
                    cx={scaleX(29.4)} 
                    cy={scaleY(340)} 
                    r="6" 
                    fill="#10b981" 
                    stroke="#ffffff" 
                    strokeWidth="2"
                    className="animate-ping"
                  />
                  <circle 
                    cx={scaleX(29.4)} 
                    cy={scaleY(340)} 
                    r="5" 
                    fill="#10b981" 
                    stroke="#ffffff" 
                    strokeWidth="2"
                  />
                  <line 
                    x1={scaleX(29.4)} 
                    y1={scaleY(340) - 6} 
                    x2={scaleX(29.4)} 
                    y2={scaleY(340) - 28} 
                    stroke="#10b981" 
                    strokeWidth="1.5"
                  />
                  <text 
                    x={scaleX(29.4)} 
                    y={scaleY(340) - 34} 
                    fill="#10b981" 
                    fontSize="11" 
                    fontWeight="bold" 
                    textAnchor="middle"
                  >
                    Calcite CaCO₃ (104)
                  </text>
                  <text 
                    x={scaleX(29.4)} 
                    y={scaleY(340) - 20} 
                    fill="#6ee7b7" 
                    fontSize="9" 
                    fontFamily="monospace"
                    textAnchor="middle"
                  >
                    2θ = 29.4° • d = 3.03 Å
                  </text>
                </g>
              )}

              {/* Cursor Point */}
              <g>
                <line 
                  x1={scaleX(cursorPoint.twoTheta)} 
                  y1={padding.top} 
                  x2={scaleX(cursorPoint.twoTheta)} 
                  y2={svgHeight - padding.bottom} 
                  stroke="#f59e0b" 
                  strokeWidth="1.5" 
                  strokeDasharray="3 3"
                />
                <circle 
                  cx={scaleX(cursorPoint.twoTheta)} 
                  cy={scaleY(cursorPoint.intensity)} 
                  r="6" 
                  fill="#f59e0b" 
                  stroke="#ffffff" 
                  strokeWidth="2"
                />
              </g>
            </svg>
          </div>

          {/* Interactive 2θ Angle Slider */}
          <div className="mt-4 pt-4 border-t border-slate-800">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <Compass className="w-4 h-4 text-amber-400" />
                <span className="text-xs font-mono text-slate-300 font-semibold">
                  Goniometer Scrubber (2θ Range 10.0° - 40.0°):
                </span>
                <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 font-mono font-bold text-xs">
                  {cursorTwoTheta.toFixed(2)}°
                </span>
              </div>

              <div className="flex items-center gap-2 text-xs font-mono text-slate-400">
                <span>Intensity: <b className="text-white">{cursorPoint.intensity} a.u.</b></span>
                <span>•</span>
                <span>d-spacing: <b className="text-sky-300">{cursorPoint.dSpacingAngstrom} Å</b></span>
              </div>
            </div>

            <input 
              type="range"
              min="10.0"
              max="40.0"
              step="0.25"
              value={cursorTwoTheta}
              onChange={(e) => setCursorTwoTheta(parseFloat(e.target.value))}
              className="w-full mt-3 h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-amber-400"
            />
          </div>
        </div>

        {/* Live Mathematical Telemetry Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          
          {/* Metric 1: Segal Crystallinity Index (CI) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Segal Crystallinity Index
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-sky-500/20 text-sky-300 border border-sky-500/40">
                CI Formula
              </span>
            </div>
            <div className="text-3xl font-extrabold text-white font-mono tracking-tight">
              {profile.crystallinityIndex.toFixed(3)}
            </div>
            <div className="mt-2 text-xs text-slate-400">
              <MathView math="CI = \frac{I_{200} - I_{\text{am}}}{I_{200}}" />
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              Ratio of crystalline reflection intensity over total diffraction.
            </div>
          </div>

          {/* Metric 2: Crystallinity Ratio (CR) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Crystallinity Ratio
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-amber-500/20 text-amber-300 border border-amber-500/40">
                CR Metric
              </span>
            </div>
            <div className="text-3xl font-extrabold text-amber-400 font-mono tracking-tight">
              {profile.crystallinityRatio.toFixed(3)}
            </div>
            <div className="mt-2 text-xs text-slate-400">
              <MathView math="CR = 1 - \frac{I_{\text{am}}}{I_{200} - I_{\text{am}}}" />
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              Alternative scale emphasizing crystalline domain purity.
            </div>
          </div>

          {/* Metric 3: Crystalline d-Spacing (Bragg's Law) */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                (200) Lattice d-Spacing
              </span>
              <span className="px-1.5 py-0.5 rounded text-[10px] font-mono bg-purple-500/20 text-purple-300 border border-purple-500/40">
                Bragg nλ=2d sinθ
              </span>
            </div>
            <div className="text-3xl font-extrabold text-purple-400 font-mono tracking-tight">
              3.93 <span className="text-lg font-normal text-slate-400">Å</span>
            </div>
            <div className="mt-2 text-xs text-slate-400">
              At <MathView math="2\theta = 22.6^\circ" />, interplanar distance of crystalline cellulose microfibrils.
            </div>
            <div className="mt-2 text-[11px] text-slate-500">
              Calculated using <MathView math="\lambda = 1.5418\,\text{Å}" />.
            </div>
          </div>

          {/* Metric 4: Conservation Diagnosis */}
          <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-5 shadow-lg relative overflow-hidden">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[11px] font-mono text-slate-400 uppercase tracking-wider font-semibold">
                Archival Health Diagnosis
              </span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-lg font-bold text-white font-heading mt-1">
              {isAged && treatment === 'untreated' && paperType === 'old' ? (
                <span className="text-rose-400">Severe Brittleness Risk</span>
              ) : isAged && treatment === 'caoh' && paperType === 'old' ? (
                <span className="text-emerald-400">Protected by Calcite Reserve</span>
              ) : !isAged ? (
                <span className="text-sky-300">Baseline Archival State</span>
              ) : (
                <span className="text-amber-300">Thermally Stressed</span>
              )}
            </div>
            <div className="mt-2 text-xs text-slate-400 leading-snug">
              {isAged && treatment === 'untreated' && paperType === 'old'
                ? 'Unchecked acid hydrolysis cleaved amorphous zones, spiking CI to 0.718 (+8.1%).'
                : isAged && treatment === 'caoh' && paperType === 'old'
                ? 'Ca(OH)₂ neutralized acidity and formed CaCO₃ buffer, maintaining CI at 0.671.'
                : 'Crystallinity stable within acceptable structural thresholds.'}
            </div>
          </div>

        </div>

      </div>
    </section>
  );
};
