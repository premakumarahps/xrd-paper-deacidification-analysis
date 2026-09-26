import React from 'react';
import { 
  Atom, 
  Activity, 
  BarChart2, 
  Layers, 
  Sliders, 
  FileText, 
  ShieldCheck, 
  Award, 
  Sparkles, 
  CheckCircle2, 
  ArrowRight,
  Zap,
  HelpCircle,
  FlaskConical,
  Flame,
  Binary
} from 'lucide-react';
import { MathView } from './MathView';

interface OverviewSectionProps {
  setActiveTab: (tab: string) => void;
}

export const OverviewSection: React.FC<OverviewSectionProps> = ({ setActiveTab }) => {
  return (
    <section className="py-12 bg-slate-950/40 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        
        {/* Academic Context & Author Card */}
        <div className="bg-gradient-to-tr from-slate-900 via-slate-900 to-slate-950 rounded-3xl border border-slate-800 p-8 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-sky-500/5 blur-3xl pointer-events-none rounded-full" />
          
          <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
            <div className="space-y-3 max-w-3xl">
              <div className="flex flex-wrap items-center gap-2">
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
                  MT3054: CHARACTERIZATION OF MATERIALS
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/40">
                  CASE STUDY & DEFENSE
                </span>
                <span className="px-2.5 py-1 rounded text-xs font-mono text-slate-400 bg-slate-800 border border-slate-700">
                  SEMESTER 5
                </span>
              </div>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-heading tracking-tight">
                Cellulose Crystallinity in Archival Paper Conservation
              </h2>
              <p className="text-slate-300 text-sm leading-relaxed">
                This academic research review comprehensively evaluates the impact of aqueous deacidification treatments and artificial thermal ageing on the nanostructural order of historical flax rag paper versus modern cotton paper. Analysis is grounded in experimental Wide-Angle X-Ray Diffraction (WAXD) data collected at the Cardiff University laboratory.
              </p>
            </div>

            {/* Author Profile Badge */}
            <div className="bg-slate-950 p-5 rounded-2xl border-2 border-amber-500/50 shadow-xl shadow-amber-500/5 shrink-0 w-full sm:w-auto">
              <div className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold mb-1">
                Student Author & Presenter
              </div>
              <div className="text-lg font-bold text-white font-heading">
                Premakumara H.P.S.
              </div>
              <div className="flex items-center gap-2 mt-2 font-mono text-xs">
                <span className="px-2 py-0.5 rounded bg-slate-900 text-amber-300 border border-slate-800 font-bold">
                  Index: 210494D
                </span>
                <span className="text-slate-400">13/09/2024</span>
              </div>
              <div className="text-[11px] text-slate-400 mt-2">
                Dept. of Mechanical Engineering<br />University of Moratuwa
              </div>
            </div>
          </div>
        </div>

        {/* The 4 Core Research Pillars */}
        <div>
          <div className="text-center max-w-2xl mx-auto mb-10">
            <span className="text-xs font-mono uppercase tracking-widest text-sky-400 font-bold">
              SCIENTIFIC FOUNDATION
            </span>
            <h3 className="text-3xl font-extrabold text-white font-heading mt-2">
              Four Pillars of the Research Review
            </h3>
            <p className="text-slate-400 text-sm mt-2">
              Examining paper degradation from the macro scale to the sub-nanometer crystal lattice.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            
            {/* Pillar 1 */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-sky-500/10 border border-sky-500/30 text-sky-400 flex items-center justify-center mb-4">
                  <Atom className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-heading">
                  1. Dual Fiber Origins
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Comparing historic <b>1831 rag paper</b> (flax fibers, baseline CI ~0.664) with modern <b>Whatman No. 1</b> (pure cotton linters, baseline CI ~0.723). Flax contains higher initial amorphous fractions.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-sky-300">
                Flax (1831) vs Cotton (Modern)
              </div>
            </div>

            {/* Pillar 2 */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-purple-500/10 border border-purple-500/30 text-purple-400 flex items-center justify-center mb-4">
                  <FlaskConical className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-heading">
                  2. Chemical Deacidification
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Evaluating <b>Millipore Elix III</b> deionized water washing vs <b>0.02M Ca(OH)₂</b> vs <b>0.04M Mg(HCO₃)₂</b> baths. Ca(OH)₂ produces a lasting mineral deposit.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-purple-300">
                Aqueous Alkaline Baths
              </div>
            </div>

            {/* Pillar 3 */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-400 flex items-center justify-center mb-4">
                  <Flame className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-heading">
                  3. Accelerated Ageing
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Climate chamber simulation at <b>80°C and 65% RH for 2 weeks</b>, modeling decades of library shelf degeneration. Preferentially degrades vulnerable amorphous chains.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-rose-300">
                80°C / 65% RH • 2 Weeks
              </div>
            </div>

            {/* Pillar 4 */}
            <div className="bg-slate-900/70 rounded-2xl border border-slate-800 p-6 flex flex-col justify-between hover:border-slate-700 transition-all">
              <div>
                <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 flex items-center justify-center mb-4">
                  <Activity className="w-6 h-6" />
                </div>
                <h4 className="text-lg font-bold text-white font-heading">
                  4. Cardiff WAXD Rig
                </h4>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Bruker AXS Kristalloflex 760 X-ray generator (<MathView math="\text{Cu-K}\alpha" /> radiation, <MathView math="\lambda = 1.5418\,\text{Å}" />). Provides resolution down to 0.22 - 3.0 nm without specimen destruction.
                </p>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-800/80 text-[11px] font-mono text-emerald-300">
                Non-Destructive Diffraction
              </div>
            </div>

          </div>
        </div>

        {/* Theoretical Framework & Formulas */}
        <div className="bg-slate-900/90 rounded-3xl border border-slate-800 p-8 shadow-xl">
          <div className="flex items-center gap-2 mb-6">
            <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-sky-500/20 text-sky-300 border border-sky-500/40">
              MATHEMATICAL FORMULATIONS
            </span>
            <h3 className="text-white font-bold text-lg font-heading">
              Crystallography & Crystallinity Equations
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Equation 1: Bragg's Law */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono text-sky-400 uppercase font-bold mb-2">
                1. Bragg's Law
              </div>
              <div className="my-4 text-center text-lg font-mono text-white bg-slate-900/80 py-3 rounded-xl border border-slate-800">
                <MathView math="n\lambda = 2d \sin\theta" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Relates X-ray wavelength (<MathView math="\lambda = 1.5418\,\text{Å}" />) to diffraction angle <MathView math="\theta" /> and lattice interplanar spacing <MathView math="d" />. For cellulose (200), <MathView math="2\theta = 22.6^\circ \implies d = 3.93\,\text{Å}" />.
              </p>
            </div>

            {/* Equation 2: Segal Crystallinity Index */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono text-amber-400 uppercase font-bold mb-2">
                2. Segal Crystallinity Index (CI)
              </div>
              <div className="my-4 text-center text-lg font-mono text-white bg-slate-900/80 py-3 rounded-xl border border-slate-800">
                <MathView math="CI = \frac{I_{200} - I_{\text{am}}}{I_{200}}" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Empirical metric proposed by Segal (1959). <MathView math="I_{200}" /> is peak crystalline intensity at <MathView math="2\theta = 22.6^\circ" />, while <MathView math="I_{\text{am}}" /> is the amorphous trough at <MathView math="2\theta = 18.0^\circ" />.
              </p>
            </div>

            {/* Equation 3: Crystallinity Ratio */}
            <div className="bg-slate-950 p-5 rounded-2xl border border-slate-800">
              <div className="text-xs font-mono text-emerald-400 uppercase font-bold mb-2">
                3. Crystallinity Ratio (CR)
              </div>
              <div className="my-4 text-center text-lg font-mono text-white bg-slate-900/80 py-3 rounded-xl border border-slate-800">
                <MathView math="CR = 1 - \frac{I_{\text{am}}}{I_{200} - I_{\text{am}}}" />
              </div>
              <p className="text-xs text-slate-400 leading-relaxed">
                Alternative index emphasizing domain purity. Accentuates changes in the amorphous-to-crystalline phase ratio during chemical intervention and ageing.
              </p>
            </div>

          </div>
        </div>

        {/* Key Findings Matrix Banner */}
        <div className="bg-gradient-to-r from-sky-950/40 via-purple-950/40 to-amber-950/40 rounded-3xl border border-slate-800 p-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <span className="text-xs font-mono uppercase tracking-widest text-amber-400 font-bold">
              EXPERIMENTAL DISCOVERIES
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white font-heading mt-2">
              Three Landmark Conservation Discoveries
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-slate-900/80 p-5 rounded-2xl border border-slate-800">
              <div className="text-3xl font-extrabold font-mono text-rose-400">+8.1%</div>
              <div className="text-sm font-bold text-white mt-1">Untreated Ageing Surge</div>
              <p className="text-xs text-slate-400 mt-2">
                Untreated aged 1831 rag paper experienced a sharp increase in CI from 0.664 to 0.718 due to selective acid-catalyzed hydrolysis of amorphous chains.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-emerald-500/50">
              <div className="text-3xl font-extrabold font-mono text-emerald-400">0.671</div>
              <div className="text-sm font-bold text-white mt-1">Ca(OH)₂ Restraint & Stability</div>
              <p className="text-xs text-slate-400 mt-2">
                Calcium hydroxide completely halted the ageing surge, holding CI steady at 0.671 and preventing catastrophic fiber embrittlement.
              </p>
            </div>

            <div className="bg-slate-900/80 p-5 rounded-2xl border border-sky-500/50">
              <div className="text-3xl font-extrabold font-mono text-sky-400">29.4°</div>
              <div className="text-sm font-bold text-white mt-1">Calcite CaCO₃ Mineral Peak</div>
              <p className="text-xs text-slate-400 mt-2">
                XRD patterns detected sharp calcite (104) mineral reflections at 2θ ≈ 29.4°, proving permanent alkaline reserve formation on paper fibers.
              </p>
            </div>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setActiveTab('diffractometer')}
              className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 to-sky-600 hover:from-sky-400 hover:to-sky-500 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Activity className="w-4 h-4" />
              <span>Explore Virtual Diffractometer Simulator</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};
