import React, { useState } from 'react';
import { 
  Layers, 
  Atom, 
  ShieldCheck, 
  AlertTriangle, 
  Sparkles, 
  Zap, 
  HelpCircle,
  ArrowRight,
  Droplets,
  CheckCircle2,
  FileCheck
} from 'lucide-react';
import { MathView } from './MathView';

export const ConservationMechanismViewer: React.FC = () => {
  const [activeStage, setActiveStage] = useState<'untreated' | 'hydrolysis' | 'caoh' | 'mghco3'>('hydrolysis');

  return (
    <section className="py-12 bg-slate-950/70 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="max-w-3xl mb-8">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs font-mono font-medium mb-3">
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>NANOSCALE POLYMER CHEMISTRY</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
            Degradation Mechanisms & Calcite Buffer Formation
          </h2>
          <p className="text-slate-400 text-sm sm:text-base mt-2">
            Why does paper ageing increase the measured Crystallinity Index (<MathView math="CI" />)? And how does calcium hydroxide deacidification impart an indestructible mineral shield on flax fibers?
          </p>
        </div>

        {/* Mechanism Selector Tabs */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
          <button
            onClick={() => setActiveStage('untreated')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeStage === 'untreated'
                ? 'bg-slate-800 border-sky-400 text-white shadow-lg shadow-sky-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-mono text-sky-400 uppercase font-bold">Phase 1: Architecture</div>
            <div className="text-sm font-bold mt-1 text-white">Cellulose Dual Nature</div>
            <div className="text-xs text-slate-400 mt-1">Crystalline vs amorphous zones</div>
          </button>

          <button
            onClick={() => setActiveStage('hydrolysis')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeStage === 'hydrolysis'
                ? 'bg-slate-800 border-rose-500 text-white shadow-lg shadow-rose-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-mono text-rose-400 uppercase font-bold">Phase 2: Ageing Attack</div>
            <div className="text-sm font-bold mt-1 text-white">Acid Hydrolysis Surge</div>
            <div className="text-xs text-slate-400 mt-1">Why CI spikes to 0.718</div>
          </button>

          <button
            onClick={() => setActiveStage('caoh')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeStage === 'caoh'
                ? 'bg-slate-800 border-emerald-500 text-white shadow-lg shadow-emerald-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-mono text-emerald-400 uppercase font-bold">Phase 3: Stabilization</div>
            <div className="text-sm font-bold mt-1 text-white">Ca(OH)₂ & Calcite Reserve</div>
            <div className="text-xs text-slate-400 mt-1">XRD peak at 2θ ≈ 29.4°</div>
          </button>

          <button
            onClick={() => setActiveStage('mghco3')}
            className={`p-4 rounded-2xl border text-left transition-all ${
              activeStage === 'mghco3'
                ? 'bg-slate-800 border-purple-500 text-white shadow-lg shadow-purple-500/10'
                : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            <div className="text-[10px] font-mono text-purple-400 uppercase font-bold">Phase 4: Comparison</div>
            <div className="text-sm font-bold mt-1 text-white">Mg(HCO₃)₂ Behavior</div>
            <div className="text-xs text-slate-400 mt-1">Why spread is greater</div>
          </button>
        </div>

        {/* Dynamic Detail Card Based on Active Phase */}
        <div className="bg-slate-900/90 rounded-2xl border border-slate-800 p-6 md:p-8 mb-10 shadow-2xl">
          {activeStage === 'untreated' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-2.5 py-1 rounded bg-sky-500/20 text-sky-300 font-mono text-xs font-bold border border-sky-500/40">
                  CELLULOSE I MICROFIBRIL ARCHITECTURE
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-3">
                  Two Distinct Nanoscale Domains in Paper Fibers
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mt-3">
                  Paper fibers (from flax rags or cotton linters) consist of <MathView math="\beta-(1\to4)\text{-D-glucopyranose}" /> polymeric chains assembled into microfibrils. Within each microfibril, two co-existing structural domains determine mechanical and physical properties:
                </p>

                <div className="space-y-3 mt-4">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-bold text-sky-400 font-mono">1. Crystalline Domains (Order)</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Chains are packed in tight, parallel registers stabilized by extensive inter- and intra-molecular hydrogen bonding. Dense and impervious to water or acid ingress. Produces the sharp Bragg reflections at <MathView math="2\theta = 22.6^\circ" /> (plane (200)).
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-bold text-amber-400 font-mono">2. Amorphous Domains (Disorder)</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Kinked, disordered chain segments where hydrogen bonding is incomplete. Porous and readily accessible to water molecules, acid vapors (<MathView math="\text{H}^+" />), and atmospheric oxygen. Gives paper its initial flexibility and fold endurance. Produces the broad halo centered around <MathView math="18^\circ" />.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                <div className="inline-block p-4 rounded-xl bg-slate-900 border border-slate-800 mb-4">
                  <Atom className="w-16 h-16 text-sky-400 mx-auto animate-spin" style={{ animationDuration: '25s' }} />
                </div>
                <div className="text-sm font-bold text-white font-heading">
                  Historic 1831 Flax vs Modern Whatman Cotton
                </div>
                <div className="text-xs text-slate-400 mt-2 max-w-md mx-auto">
                  Flax fibers in the 1831 rag paper possessed a baseline CI of <b>0.664</b> (more disordered amorphous regions), while Whatman No. 1 cotton exhibited a baseline CI of <b>0.723</b> (inherently higher crystalline content).
                </div>
              </div>
            </div>
          )}

          {activeStage === 'hydrolysis' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-2.5 py-1 rounded bg-rose-500/20 text-rose-300 font-mono text-xs font-bold border border-rose-500/40">
                  CRITICAL PARADOX EXPLAINED
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-3">
                  Why Artificial Ageing Increases Crystallinity (+8.1%)
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mt-3">
                  In untreated 1831 rag paper subjected to accelerated ageing (80°C, 65% RH for 2 weeks), the Segal Crystallinity Index (<MathView math="CI" />) surged dramatically from <b>0.664 to 0.718</b>. Why does decaying paper become "more crystalline"?
                </p>

                <div className="mt-4 p-4 rounded-xl bg-rose-950/20 border border-rose-500/30 text-xs text-rose-200 space-y-2">
                  <div className="font-bold font-mono text-rose-400">The Hydrolytic Cleavage Pathway:</div>
                  <p>
                    1. Thermal heat and moisture generate hydronium ions (<MathView math="\text{H}_3\text{O}^+" />) that selectively penetrate the accessible, disordered <b>amorphous domains</b>.
                  </p>
                  <p>
                    2. Acid hydrolysis scissions the <MathView math="\beta-(1\to4)" /> glucosidic bonds of these flexible amorphous chains.
                  </p>
                  <p>
                    3. Cleaved chains either decompose into volatile fragments or acquire sufficient rotational mobility to align with adjacent crystalline domains (strain-induced crystallization).
                  </p>
                  <p>
                    4. As a result, the amorphous denominator (<MathView math="I_{\text{am}}" /> at 18°) drops sharply relative to the crystalline peak, producing a misleadingly high mathematical <MathView math="CI" />.
                  </p>
                </div>

                <div className="mt-3 text-xs text-slate-400 font-mono">
                  🚨 Consequence: The paper loses tensile flexibility, becomes brittle, yellowed, and prone to catastrophic cracking on mechanical handling.
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-4 inline-block">
                  <AlertTriangle className="w-14 h-14 text-rose-500 mx-auto" />
                </div>
                <div className="text-sm font-bold text-white font-heading">
                  Hydrolysis Reaction Equation
                </div>
                <div className="my-3 p-3 rounded-lg bg-slate-900 text-rose-300 text-xs font-mono">
                  <MathView math="(\text{C}_6\text{H}_{10}\text{O}_5)_n + \text{H}_2\text{O} \xrightarrow{\text{H}^+, \Delta} (\text{C}_6\text{H}_{10}\text{O}_5)_{n-x} + \text{Acid Fragments}" />
                </div>
                <div className="text-xs text-slate-400">
                  Preferential destruction of amorphous cellulose leaves an isolated, brittle crystalline skeleton.
                </div>
              </div>
            </div>
          )}

          {activeStage === 'caoh' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-2.5 py-1 rounded bg-emerald-500/20 text-emerald-300 font-mono text-xs font-bold border border-emerald-500/40">
                  OPTIMAL CONSERVATION TREATMENT
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-3">
                  Calcium Hydroxide Deacidification & Calcite Buffer
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mt-3">
                  Immersion in 0.02M <MathView math="\text{Ca(OH)}_2" /> for 30 minutes achieved remarkable stabilization in the 1831 rag paper. When aged, the crystallinity remained flat and stable at <b>0.671</b> (identical to washed unaged paper), completely inhibiting the brittleness spike!
                </p>

                <div className="mt-4 p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/30 text-xs text-emerald-200 space-y-2">
                  <div className="font-bold font-mono text-emerald-400">Dual Protective Mechanism:</div>
                  <p>
                    <b>1. Immediate Acid Neutralization:</b> Hydroxide ions neutralize endogenous acidic species in the fiber matrix:
                    <br />
                    <span className="font-mono text-emerald-300">
                      Ca(OH)₂ + 2H⁺ → Ca²⁺ + 2H₂O
                    </span>
                  </p>
                  <p>
                    <b>2. Carbonation & Calcite Deposition:</b> Upon drying and contact with air, excess calcium hydroxide reacts with atmospheric carbon dioxide:
                    <br />
                    <span className="font-mono text-emerald-300">
                      Ca(OH)₂ + CO₂ → CaCO₃ (Calcite) ↓ + H₂O
                    </span>
                  </p>
                </div>

                <div className="mt-3 text-xs text-slate-300 font-mono flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>
                    XRD Evidence: Produces the sharp crystalline reflection at <MathView math="2\theta \approx 29.4^\circ" /> (<MathView math="d = 3.03\,\text{Å}" />).
                  </span>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                <img 
                  src="/figures/fig_calcite_diffractogram.png" 
                  alt="Calcite reflection in XRD pattern" 
                  className="max-h-52 mx-auto rounded object-contain mb-3"
                />
                <div className="text-xs font-bold text-emerald-400 font-mono">
                  Calcite Reflection Verified at 2θ ≈ 29.4°
                </div>
                <div className="text-[11px] text-slate-400 mt-1 max-w-xs mx-auto">
                  Cardiff University WAXD instrument detected the calcite mineral deposit, proving the presence of an active alkaline reserve.
                </div>
              </div>
            </div>
          )}

          {activeStage === 'mghco3' && (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <span className="px-2.5 py-1 rounded bg-purple-500/20 text-purple-300 font-mono text-xs font-bold border border-purple-500/40">
                  MAGNESIUM DEACIDIFICATION COMPARISON
                </span>
                <h3 className="text-2xl font-bold text-white font-heading mt-3">
                  0.04M Magnesium Hydrogen Carbonate Performance
                </h3>
                <p className="text-slate-300 text-sm leading-relaxed mt-3">
                  While <MathView math="\text{Mg(HCO}_3)_2" /> is also widely employed in paper conservation, XRD analysis revealed significant differences in stabilization compared to calcium hydroxide:
                </p>

                <div className="space-y-3 mt-4">
                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-bold text-purple-400 font-mono">Higher Experimental Spread</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Unaged old paper treated with magnesium exhibited an average CI of <b>0.619</b> with a substantial standard deviation (<MathView math="\sigma = 0.046" />), reflecting non-uniform interaction with flax fibers.
                    </p>
                  </div>

                  <div className="p-3.5 rounded-xl bg-slate-950/80 border border-slate-800">
                    <div className="text-xs font-bold text-purple-400 font-mono">Absence of Distinct Mineral Reflection</div>
                    <p className="text-xs text-slate-400 mt-1">
                      Unlike <MathView math="\text{Ca(OH)}_2" />, which forms well-crystallized calcite (<MathView math="\text{CaCO}_3" />), magnesium carbonation products did not produce sharp diffraction peaks in the WAXD diffractograms, suggesting an amorphous or sub-crystalline deposit.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-slate-950 p-6 rounded-2xl border border-slate-800 text-center">
                <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 mb-4 inline-block">
                  <Droplets className="w-14 h-14 text-purple-400 mx-auto" />
                </div>
                <div className="text-sm font-bold text-white font-heading">
                  Magnesium Reaction Pathway
                </div>
                <div className="my-3 p-3 rounded-lg bg-slate-900 text-purple-300 text-xs font-mono">
                  <MathView math="\text{Mg(HCO}_3)_2 + 2\text{H}^+ \to \text{Mg}^{2+} + 2\text{CO}_2 \uparrow + 2\text{H}_2\text{O}" />
                </div>
                <div className="text-xs text-slate-400">
                  Effective neutralizer, but less uniform crystallographic stabilization than calcium hydroxide.
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3 Conservation Takeaways Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-slate-900/60 p-5 rounded-2xl border border-slate-800">
            <div className="w-10 h-10 rounded-xl bg-sky-500/20 border border-sky-500/40 text-sky-400 flex items-center justify-center mb-3">
              <Droplets className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm font-heading">1. Washing Alone is Beneficial</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Deionized Millipore water washing leaches unbound water-soluble acidic compounds and stops autocatalytic decay, reducing the aged CI surge from +8.1% down to +0.4%.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-emerald-500/40">
            <div className="w-10 h-10 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm font-heading">2. Ca(OH)₂ Provides Calcite Shield</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Calcium hydroxide neutralizes existing acids and deposits a permanent, crystalline calcite alkaline reserve that completely shields fibers during thermal ageing.
            </p>
          </div>

          <div className="bg-slate-900/60 p-5 rounded-2xl border border-purple-500/40">
            <div className="w-10 h-10 rounded-xl bg-purple-500/20 border border-purple-500/40 text-purple-400 flex items-center justify-center mb-3">
              <Sparkles className="w-5 h-5" />
            </div>
            <h4 className="text-white font-bold text-sm font-heading">3. WAXD is Non-Destructive</h4>
            <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
              Wide-Angle X-Ray Diffraction provides quantitative molecular metrics without consuming or altering rare historic artifacts, making it indispensable for museum conservation.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
};
