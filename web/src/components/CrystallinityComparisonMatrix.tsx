import React, { useState, useMemo } from 'react';
import { 
  BarChart2, 
  Layers, 
  ArrowUpDown, 
  CheckCircle2, 
  AlertTriangle, 
  ShieldCheck, 
  TrendingUp, 
  Filter, 
  Info,
  Maximize2
} from 'lucide-react';
import { EXPERIMENTAL_SAMPLES, ExperimentalSampleData } from '../core/xrdData';
import { MathView } from './MathView';

export const CrystallinityComparisonMatrix: React.FC = () => {
  const [filterType, setFilterType] = useState<'all' | 'old' | 'new'>('all');
  const [filterAgeing, setFilterAgeing] = useState<'all' | 'unaged' | 'aged'>('all');
  const [sampleAId, setSampleAId] = useState<string>('old_unaged_ref');
  const [sampleBId, setSampleBId] = useState<string>('old_aged_ref');

  // Filtered samples
  const filteredSamples = useMemo(() => {
    return EXPERIMENTAL_SAMPLES.filter(s => {
      const matchType = 
        filterType === 'all' || 
        (filterType === 'old' && s.paperType.includes('Old Rag')) ||
        (filterType === 'new' && s.paperType.includes('Whatman'));
      
      const matchAgeing = 
        filterAgeing === 'all' ||
        (filterAgeing === 'unaged' && s.ageingState.includes('Unaged')) ||
        (filterAgeing === 'aged' && s.ageingState.includes('Aged'));

      return matchType && matchAgeing;
    });
  }, [filterType, filterAgeing]);

  // Delta calculation between selected Sample A and Sample B
  const sampleA = useMemo(() => EXPERIMENTAL_SAMPLES.find(s => s.id === sampleAId) || EXPERIMENTAL_SAMPLES[0], [sampleAId]);
  const sampleB = useMemo(() => EXPERIMENTAL_SAMPLES.find(s => s.id === sampleBId) || EXPERIMENTAL_SAMPLES[4], [sampleBId]);

  const deltaCI = sampleB.ciMean - sampleA.ciMean;
  const pctChangeCI = ((deltaCI / sampleA.ciMean) * 100);
  const deltaCR = sampleB.crMean - sampleA.crMean;

  return (
    <section className="py-12 bg-slate-900/50 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Heading */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 text-xs font-mono font-medium mb-3">
              <BarChart2 className="w-3.5 h-3.5 text-amber-400" />
              <span>QUANTITATIVE METRICS • SEGAL CI & CR</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Crystallinity Analytics & Comparison Matrix
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Rigorous empirical comparison of Segal Crystallinity Index (<MathView math="CI" />) and Crystallinity Ratio (<MathView math="CR" />) across historic 1831 rag flax vs. modern Whatman cotton cellulose.
            </p>
          </div>

          {/* Quick Filter Buttons */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
              <button
                onClick={() => setFilterType('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === 'all' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All Papers
              </button>
              <button
                onClick={() => setFilterType('old')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === 'old' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                1831 Rag (Flax)
              </button>
              <button
                onClick={() => setFilterType('new')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterType === 'new' ? 'bg-amber-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Whatman (Cotton)
              </button>
            </div>

            <div className="bg-slate-950 p-1 rounded-xl border border-slate-800 flex items-center gap-1 text-xs">
              <button
                onClick={() => setFilterAgeing('all')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterAgeing === 'all' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                All States
              </button>
              <button
                onClick={() => setFilterAgeing('unaged')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterAgeing === 'unaged' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Unaged
              </button>
              <button
                onClick={() => setFilterAgeing('aged')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  filterAgeing === 'aged' ? 'bg-sky-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Aged 80°C
              </button>
            </div>
          </div>
        </div>

        {/* Visual Crystallinity Bar Comparison Chart (Responsive SVG) */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 p-6 mb-8 shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-6">
            <div>
              <h3 className="text-white font-bold text-base font-heading">
                Empirical Crystallinity Index (<MathView math="CI" />) Progression
              </h3>
              <p className="text-xs text-slate-400 mt-0.5">
                Notice the massive jump in untreated aged paper vs the stable, flat trajectory of <MathView math="\text{Ca(OH)}_2" /> deacidified paper.
              </p>
            </div>
            <div className="flex items-center gap-4 text-xs font-mono text-slate-400">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-sky-500 inline-block" />
                <span>Unaged</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-3 rounded bg-rose-500 inline-block" />
                <span>Aged (80°C / 65% RH)</span>
              </div>
            </div>
          </div>

          {/* SVG Bar Visualizer */}
          <div className="space-y-4">
            {/* 1831 Old Rag Paper Pairs */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-amber-400 font-mono">
                  1831 HISTORIC RAG PAPER (FLAX FIBERS)
                </span>
                <span className="text-[11px] text-slate-400">
                  Target for Archival Preservation
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                {/* Untreated Pair */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">Untreated Control</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Unaged</span>
                        <span className="text-sky-400 font-bold">0.664</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(0.664 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Aged</span>
                        <span className="text-rose-400 font-bold">0.718 (+8.1%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(0.718 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-rose-400/90 font-mono">
                    ⚠️ Severe embrittlement surge
                  </div>
                </div>

                {/* Washed Pair */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">Millipore H₂O Wash</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Unaged</span>
                        <span className="text-sky-400 font-bold">0.671</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(0.671 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Aged</span>
                        <span className="text-rose-400 font-bold">0.674 (+0.4%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(0.674 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-sky-400/90 font-mono">
                    ✓ Acid scission restrained
                  </div>
                </div>

                {/* Ca(OH)2 Pair */}
                <div className="bg-slate-950/80 p-3 rounded-xl border-2 border-emerald-500/50 shadow-lg shadow-emerald-500/5">
                  <div className="flex items-center justify-between mb-2">
                    <div className="text-xs font-bold text-emerald-400">0.02M Ca(OH)₂</div>
                    <span className="px-1.5 py-0.2 rounded text-[9px] font-mono bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                      OPTIMAL
                    </span>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Unaged</span>
                        <span className="text-sky-400 font-bold">0.678</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(0.678 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Aged</span>
                        <span className="text-emerald-400 font-bold">0.671 (-1.0%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(0.671 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-emerald-400 font-mono">
                    ★ Perfect structural stability & CaCO₃
                  </div>
                </div>

                {/* Mg(HCO3)2 Pair */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">0.04M Mg(HCO₃)₂</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Unaged</span>
                        <span className="text-purple-400 font-bold">0.619</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(0.619 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Aged</span>
                        <span className="text-rose-400 font-bold">0.687 (+11.0%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(0.687 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                  <div className="mt-2 text-[10px] text-amber-400 font-mono">
                    ⚠️ High variability (σ = 0.046)
                  </div>
                </div>

              </div>
            </div>

            {/* Whatman No. 1 Cotton Paper Pairs */}
            <div className="p-4 rounded-xl bg-slate-900/60 border border-slate-800/80">
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-bold text-sky-400 font-mono">
                  WHATMAN NO. 1 REFERENCE PAPER (COTTON FIBERS)
                </span>
                <span className="text-[11px] text-slate-400">
                  Modern High-Purity Standard
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Untreated Control */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">Untreated Control</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Unaged CI</span>
                        <span className="text-sky-400 font-bold">0.723</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(0.723 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Aged CI</span>
                        <span className="text-rose-400 font-bold">0.743 (+2.8%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-rose-500 h-full rounded-full" style={{ width: `${(0.743 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Ca(OH)2 */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">0.02M Ca(OH)₂</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Unaged CI</span>
                        <span className="text-sky-400 font-bold">0.731</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(0.731 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Aged CI</span>
                        <span className="text-emerald-400 font-bold">0.742 (+1.5%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-emerald-500 h-full rounded-full" style={{ width: `${(0.742 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mg(HCO3)2 */}
                <div className="bg-slate-950/80 p-3 rounded-xl border border-slate-800">
                  <div className="text-xs font-medium text-slate-300 mb-2">0.04M Mg(HCO₃)₂</div>
                  <div className="space-y-2">
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Unaged CI</span>
                        <span className="text-sky-400 font-bold">0.722</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-sky-500 h-full rounded-full" style={{ width: `${(0.722 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                    <div>
                      <div className="flex justify-between text-[11px] font-mono text-slate-400 mb-1">
                        <span>Aged CI</span>
                        <span className="text-purple-400 font-bold">0.739 (+2.4%)</span>
                      </div>
                      <div className="w-full bg-slate-800 h-2.5 rounded-full overflow-hidden">
                        <div className="bg-purple-500 h-full rounded-full" style={{ width: `${(0.739 / 0.8) * 100}%` }} />
                      </div>
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>

        {/* Interactive Delta & Conservation Calculator */}
        <div className="bg-slate-950/90 rounded-2xl border-2 border-amber-500/40 p-6 mb-8 shadow-2xl">
          <div className="flex items-center gap-2 mb-4">
            <span className="px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
              INTERACTIVE TOOL
            </span>
            <h3 className="text-white font-bold text-base font-heading">
              Specimen Delta & Conservation Impact Calculator
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-center">
            
            {/* Specimen A Selector */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <label className="text-xs font-mono text-slate-400 block mb-2 uppercase">
                Base Specimen (A):
              </label>
              <select
                value={sampleAId}
                onChange={(e) => setSampleAId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:border-amber-400 focus:outline-none"
              >
                {EXPERIMENTAL_SAMPLES.map(s => (
                  <option key={`a-${s.id}`} value={s.id}>
                    {s.paperType.includes('Old') ? 'Old Rag' : 'Whatman'} | {s.treatment} | {s.ageingState.includes('Unaged') ? 'Unaged' : 'Aged'}
                  </option>
                ))}
              </select>
              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">CI Mean: <b className="text-sky-400">{sampleA.ciMean.toFixed(3)}</b></span>
                <span className="text-slate-400">CR: <b className="text-amber-400">{sampleA.crMean.toFixed(3)}</b></span>
              </div>
            </div>

            {/* Specimen B Selector */}
            <div className="bg-slate-900/80 p-4 rounded-xl border border-slate-800">
              <label className="text-xs font-mono text-slate-400 block mb-2 uppercase">
                Comparison Specimen (B):
              </label>
              <select
                value={sampleBId}
                onChange={(e) => setSampleBId(e.target.value)}
                className="w-full p-2.5 rounded-lg bg-slate-950 border border-slate-700 text-white text-xs font-medium focus:border-amber-400 focus:outline-none"
              >
                {EXPERIMENTAL_SAMPLES.map(s => (
                  <option key={`b-${s.id}`} value={s.id}>
                    {s.paperType.includes('Old') ? 'Old Rag' : 'Whatman'} | {s.treatment} | {s.ageingState.includes('Unaged') ? 'Unaged' : 'Aged'}
                  </option>
                ))}
              </select>
              <div className="mt-3 flex items-center justify-between text-xs font-mono">
                <span className="text-slate-400">CI Mean: <b className="text-sky-400">{sampleB.ciMean.toFixed(3)}</b></span>
                <span className="text-slate-400">CR: <b className="text-amber-400">{sampleB.crMean.toFixed(3)}</b></span>
              </div>
            </div>

            {/* Delta Readout */}
            <div className="bg-gradient-to-tr from-slate-900 to-slate-950 p-4 rounded-xl border border-amber-500/30">
              <div className="text-[11px] font-mono text-amber-400 uppercase tracking-wider mb-1">
                Net Transformation (ΔB - A)
              </div>
              <div className="flex items-baseline gap-3">
                <div className={`text-2xl font-extrabold font-mono ${deltaCI > 0 ? 'text-rose-400' : deltaCI < 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                  {deltaCI > 0 ? `+${deltaCI.toFixed(3)}` : deltaCI.toFixed(3)}
                </div>
                <div className={`text-xs font-mono font-bold ${pctChangeCI > 0 ? 'text-rose-400' : pctChangeCI < 0 ? 'text-emerald-400' : 'text-slate-300'}`}>
                  ({pctChangeCI > 0 ? `+${pctChangeCI.toFixed(1)}%` : `${pctChangeCI.toFixed(1)}%`})
                </div>
              </div>
              <div className="mt-2 text-xs text-slate-300 leading-snug">
                {deltaCI > 0.03 ? (
                  <span className="text-rose-300">
                    ⚠️ Significant increase in crystallinity indicates amorphous cellulose cleavage and accelerated fiber brittleness.
                  </span>
                ) : Math.abs(deltaCI) <= 0.015 ? (
                  <span className="text-emerald-300">
                    ✓ High structural conservation! The nanostructural crystallinity remains remarkably preserved.
                  </span>
                ) : (
                  <span className="text-amber-300">
                    Moderate restructuring observed without critical polymer breakdown.
                  </span>
                )}
              </div>
            </div>

          </div>
        </div>

        {/* Complete Ground-Truth Experimental Data Table */}
        <div className="bg-slate-950/80 rounded-2xl border border-slate-800 overflow-hidden shadow-xl">
          <div className="p-4 bg-slate-900/80 border-b border-slate-800 flex items-center justify-between">
            <div>
              <h3 className="text-white font-bold text-sm font-heading">
                Master Research Data Table (Clark A. Maxwell, Cardiff WAXD Laboratory)
              </h3>
              <p className="text-xs text-slate-400">
                Extracted verbatim from academic review report and defense slides.
              </p>
            </div>
            <span className="px-2.5 py-1 rounded bg-slate-800 text-slate-300 font-mono text-xs">
              Showing {filteredSamples.length} of {EXPERIMENTAL_SAMPLES.length} Samples
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="bg-slate-900 text-slate-300 font-mono border-b border-slate-800">
                  <th className="py-3 px-4">Specimen Type</th>
                  <th className="py-3 px-3">Treatment Bath</th>
                  <th className="py-3 px-3">Condition</th>
                  <th className="py-3 px-3 text-right">CI (Mean)</th>
                  <th className="py-3 px-3 text-right">CI Range [Min, Max]</th>
                  <th className="py-3 px-3 text-right">CI Std Dev (σ)</th>
                  <th className="py-3 px-3 text-right">CR (Mean)</th>
                  <th className="py-3 px-3 text-right">CR Std Dev (σ)</th>
                  <th className="py-3 px-3 text-center">Calcite (CaCO₃)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60 font-sans">
                {filteredSamples.map((sample) => (
                  <tr 
                    key={sample.id}
                    className="hover:bg-slate-900/60 transition-colors"
                  >
                    <td className="py-3 px-4 font-medium text-white">
                      {sample.paperType}
                    </td>
                    <td className="py-3 px-3 text-slate-300 font-medium">
                      {sample.treatment}
                    </td>
                    <td className="py-3 px-3">
                      <span className={`px-2 py-0.5 rounded text-[10px] font-mono ${
                        sample.ageingState.includes('Unaged')
                          ? 'bg-sky-500/20 text-sky-300 border border-sky-500/30'
                          : 'bg-rose-500/20 text-rose-300 border border-rose-500/30'
                      }`}>
                        {sample.ageingState.includes('Unaged') ? 'Unaged' : 'Aged 80°C'}
                      </span>
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-sky-400">
                      {sample.ciMean.toFixed(3)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-400">
                      [{sample.ciRange[0].toFixed(3)}, {sample.ciRange[1].toFixed(3)}]
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-500">
                      ±{sample.ciStdDev.toFixed(4)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono font-bold text-amber-400">
                      {sample.crMean.toFixed(3)}
                    </td>
                    <td className="py-3 px-3 text-right font-mono text-slate-500">
                      ±{sample.crStdDev.toFixed(4)}
                    </td>
                    <td className="py-3 px-3 text-center">
                      {sample.calciteDeposited ? (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/40">
                          <CheckCircle2 className="w-3 h-3 text-emerald-400" />
                          Detected
                        </span>
                      ) : (
                        <span className="text-slate-600 font-mono">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="p-4 bg-slate-900/40 border-t border-slate-800 text-xs text-slate-400 flex flex-col sm:flex-row items-center justify-between gap-2">
            <span>
              <b>Note:</b> Segal Crystallinity Index (<MathView math="CI" />) calculated from ratio of <MathView math="I_{200}" /> crystalline intensity and <MathView math="I_{\text{am}}" /> amorphous trough.
            </span>
            <span className="font-mono text-slate-500">
              Dataset Reference: MT3054 Academic Review 2024
            </span>
          </div>
        </div>

      </div>
    </section>
  );
};
