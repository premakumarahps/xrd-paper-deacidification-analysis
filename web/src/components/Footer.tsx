import React from 'react';
import { 
  Atom, 
  ArrowUp, 
  Download, 
  Sliders, 
  FileText, 
  Sparkles, 
  Award,
  Layers,
  ExternalLink
} from 'lucide-react';
import { MathView } from './MathView';

interface FooterProps {
  setActiveTab: (tab: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-10">
          
          {/* Brand & Academic Identity */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-sky-500/20 via-purple-600/30 to-amber-500/20 border border-sky-400/30 flex items-center justify-center p-2">
                <img 
                  src="/xrd_logo.svg" 
                  alt="XRD Logo" 
                  className="w-full h-full object-contain" 
                />
              </div>
              <div>
                <span className="font-heading font-extrabold text-base tracking-wider text-white">
                  CELLULOSE XRD ANALYSIS
                </span>
                <span className="block text-[11px] text-sky-400 font-mono">
                  Module MT3054: Characterization of Materials
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              A comprehensive academic review and case study investigating the impacts of deacidification and thermal accelerated ageing on the crystallinity index (<MathView math="CI" />) of historic paper samples via Wide-Angle X-Ray Diffraction (WAXD).
            </p>

            <div className="p-3.5 rounded-xl bg-slate-900 border border-slate-800 inline-block">
              <span className="text-[10px] font-mono uppercase text-amber-400 font-bold block">
                Research Author & Presenter
              </span>
              <span className="text-sm font-bold text-white">
                Premakumara H.P.S. • Index: 210494D
              </span>
              <div className="text-[11px] text-slate-400 mt-0.5">
                Department of Mechanical Engineering, University of Moratuwa
              </div>
            </div>
          </div>

          {/* Quick Tab Links */}
          <div className="space-y-2">
            <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs">
              Interactive Modules
            </h4>
            <ul className="space-y-1.5 text-xs">
              <li>
                <button 
                  onClick={() => { setActiveTab('overview'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Overview & Theoretical Foundations
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('diffractometer'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Virtual X-Ray Diffractometer
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('crystallinity-matrix'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Crystallinity Index (CI & CR) Matrix
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('conservation'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Conservation Chemistry & Calcite
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('slides'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Defense Presentation (6 Slides)
                </button>
              </li>
              <li>
                <button 
                  onClick={() => { setActiveTab('case-study'); scrollToTop(); }}
                  className="hover:text-amber-400 transition-colors"
                >
                  Case Study Report (10 Pages)
                </button>
              </li>
            </ul>
          </div>

          {/* Documents & Downloads */}
          <div className="space-y-2">
            <h4 className="text-white font-mono font-bold uppercase tracking-wider text-xs">
              Academic Downloads
            </h4>
            <div className="flex flex-col gap-2">
              <a
                href="/docs/210494D_Presentation_Slides.pdf"
                download="210494D_Presentation_Slides.pdf"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <Sliders className="w-4 h-4 text-sky-400" />
                <div className="text-left">
                  <div className="font-semibold text-xs">Presentation Slides</div>
                  <div className="text-[10px] text-slate-500 font-mono">210494D_Presentation_Slides.pdf</div>
                </div>
              </a>

              <a
                href="/docs/XRD_CaseStudy_210494D.pdf"
                download="XRD_CaseStudy_210494D.pdf"
                className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-300 hover:text-white transition-all"
              >
                <FileText className="w-4 h-4 text-emerald-400" />
                <div className="text-left">
                  <div className="font-semibold text-xs">Case Study Report</div>
                  <div className="text-[10px] text-slate-500 font-mono">XRD_CaseStudy_210494D.pdf</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom Credits & Back to Top */}
        <div className="pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-[11px] text-slate-500 text-center sm:text-left">
            © 2024 Premakumara H.P.S. (Index: 210494D) • MT3054 Characterization of Materials • University of Moratuwa.
            <br />
            Grounded in research by Cardiff University & Historic Scotland (Clark A. Maxwell, Craig J. Kennedy, Tim J. Wess) & EVTEK (Ulla Knuutinen).
          </div>

          <button
            onClick={scrollToTop}
            className="flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-800 text-slate-300 hover:text-white transition-all text-xs font-medium"
          >
            <span>Back to top</span>
            <ArrowUp className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </footer>
  );
};
