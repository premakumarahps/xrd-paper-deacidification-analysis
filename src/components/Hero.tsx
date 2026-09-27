import React from 'react';
import { 
  Atom, 
  Activity, 
  BarChart2, 
  ChevronRight, 
  FileText, 
  Sparkles, 
  Layers, 
  Sliders, 
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Award
} from 'lucide-react';
import { MathView } from './MathView';

interface HeroProps {
  setActiveTab: (tab: string) => void;
}

export const Hero: React.FC<HeroProps> = ({ setActiveTab }) => {
  return (
    <section className="relative pt-28 pb-16 md:pt-36 md:pb-24 overflow-hidden border-b border-slate-800/80">
      
      {/* Background Nanoscale Lattice Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] bg-gradient-to-tr from-sky-600/15 via-purple-600/15 to-amber-500/15 blur-[150px] rounded-full pointer-events-none -z-10" />
      <div className="absolute top-10 left-10 w-96 h-96 bg-sky-600/10 blur-[100px] rounded-full pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full pointer-events-none -z-10" />

      {/* Crystallographic Grid Coordinate Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#0284c70d_1px,transparent_1px),linear-gradient(to_bottom,#0284c70d_1px,transparent_1px)] bg-[size:3.5rem_3.5rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Badges & Academic Lineage */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-xs font-semibold shadow-inner">
            <span className="w-2 h-2 rounded-full bg-sky-400 animate-ping" />
            <span>Department of Mechanical Engineering</span>
            <span className="text-slate-600">•</span>
            <span>University of Moratuwa</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs font-mono font-medium">
            <Award className="w-3.5 h-3.5 text-amber-400" />
            <span>MODULE MT3054: CHARACTERIZATION OF MATERIALS</span>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium">
            <span>RESEARCH REVIEW & CASE STUDY</span>
          </div>
        </div>

        {/* Main Title & Hero Heading */}
        <div className="text-center max-w-4xl mx-auto space-y-4">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight font-heading text-white">
            X-Ray Diffraction Analysis of{' '}
            <span className="bg-gradient-to-r from-sky-400 via-purple-400 to-amber-300 bg-clip-text text-transparent">
              Cellulose Crystallinity
            </span>{' '}
            in Paper Conservation
          </h1>

          <p className="text-slate-300 text-base sm:text-lg max-w-3xl mx-auto leading-relaxed font-sans">
            Investigation into how aqueous washing, calcium/magnesium deacidification, and accelerated thermal ageing modify the nanostructural crystallinity index (<MathView math="CI" />) and ratio (<MathView math="CR" />) of historic 1831 rag paper vs. modern cotton cellulose.
          </p>
        </div>

        {/* Author Attribution Card (Premakumara H.P.S. Highlighted) */}
        <div className="mt-8 max-w-2xl mx-auto bg-slate-900/80 rounded-2xl border-2 border-amber-500/50 p-5 backdrop-blur-xl shadow-2xl shadow-amber-500/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-tr from-amber-500/20 via-slate-800 to-slate-800 border border-amber-500/40 text-amber-400 flex items-center justify-center shrink-0 shadow-lg">
              <Sparkles className="w-6 h-6" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase tracking-widest text-amber-400 font-bold block">
                Research Author & Presenter
              </span>
              <h3 className="text-lg font-bold text-white font-heading tracking-tight">
                Premakumara H.P.S.
              </h3>
              <p className="text-xs text-slate-400">
                Department of Mechanical Engineering • University of Moratuwa
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 shrink-0">
            <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Index Number</span>
              <span className="text-sm font-bold text-amber-300">210494D</span>
            </div>
            <div className="bg-slate-950 px-3.5 py-1.5 rounded-xl border border-slate-800 text-center font-mono">
              <span className="text-[10px] text-slate-500 uppercase block">Submission</span>
              <span className="text-sm font-bold text-slate-200">13/09/2024</span>
            </div>
          </div>
        </div>

        {/* Technical Key Figures Cards (4 Pillars) */}
        <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4 max-w-5xl mx-auto">
          {/* Card 1 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Specimens</span>
              <Atom className="w-4 h-4 text-sky-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-white font-heading">
              Flax vs Cotton
            </div>
            <p className="text-xs text-slate-400 mt-1">
              1831 Rag vs Whatman No. 1
            </p>
          </div>

          {/* Card 2 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Instrument</span>
              <Activity className="w-4 h-4 text-purple-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-purple-400 font-heading">
              WAXD System
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Bruker Kristalloflex 760 (Cardiff)
            </p>
          </div>

          {/* Card 3 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Thermal Ageing</span>
              <Layers className="w-4 h-4 text-amber-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-amber-400 font-heading">
              80°C / 65% RH
            </div>
            <p className="text-xs text-slate-400 mt-1">
              2 Weeks Simulated Degeneration
            </p>
          </div>

          {/* Card 4 */}
          <div className="bg-slate-900/70 p-4 rounded-2xl border border-slate-800/80 hover:border-slate-700 transition-colors">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-mono text-slate-400 uppercase">Key Discovery</span>
              <ShieldCheck className="w-4 h-4 text-emerald-400" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-emerald-400 font-heading">
              Calcite Buffer
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Ca(OH)₂ Restrains Crystallization
            </p>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <button
            onClick={() => setActiveTab('diffractometer')}
            className="flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gradient-to-r from-sky-500 via-sky-600 to-sky-500 hover:from-sky-400 hover:to-sky-500 text-slate-950 font-bold text-sm shadow-xl shadow-sky-500/25 transition-all hover:scale-105 active:scale-95"
          >
            <Activity className="w-4 h-4" />
            Launch Virtual Diffractometer
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => setActiveTab('crystallinity-matrix')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <BarChart2 className="w-4 h-4 text-amber-400" />
            CI & CR Comparison Matrix
          </button>

          <button
            onClick={() => setActiveTab('slides')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <Sliders className="w-4 h-4 text-purple-400" />
            6 Defense Presentation Slides
          </button>

          <button
            onClick={() => setActiveTab('case-study')}
            className="flex items-center gap-2 px-5 py-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-200 hover:text-white border border-slate-700 text-sm font-semibold transition-all hover:scale-105 shadow-lg"
          >
            <FileText className="w-4 h-4 text-emerald-400" />
            10-Page Case Study Report
          </button>
        </div>

      </div>
    </section>
  );
};
