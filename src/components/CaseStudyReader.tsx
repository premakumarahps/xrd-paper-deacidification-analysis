import React, { useState } from 'react';
import { 
  FileText, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  X, 
  BookOpen, 
  Layers, 
  Sparkles,
  ExternalLink,
  Award,
  Search
} from 'lucide-react';
import { CASE_STUDY_PAGES, CaseStudyPageData } from '../core/xrdData';

export const CaseStudyReader: React.FC = () => {
  const [currentPageIndex, setCurrentPageIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'reader' | 'grid'>('reader');

  const currentPage = CASE_STUDY_PAGES[currentPageIndex];

  const handlePrev = () => {
    setCurrentPageIndex((prev) => (prev > 0 ? prev - 1 : CASE_STUDY_PAGES.length - 1));
  };

  const handleNext = () => {
    setCurrentPageIndex((prev) => (prev < CASE_STUDY_PAGES.length - 1 ? prev + 1 : 0));
  };

  return (
    <section className="py-12 bg-slate-950/80 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30 text-emerald-300 text-xs font-mono font-medium mb-3">
              <FileText className="w-3.5 h-3.5 text-emerald-400" />
              <span>RESEARCH REPORT • 10 PAGES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Case Study & Academic Review Document
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Authored by <span className="text-amber-300 font-semibold">Premakumara H.P.S. (Index: 210494D)</span> under <span className="text-white font-semibold">Module MT3054: Characterization of Materials</span>, University of Moratuwa.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-slate-900 p-1 rounded-xl border border-slate-800 flex items-center text-xs">
              <button
                onClick={() => setViewMode('reader')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'reader' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                Page Reader
              </button>
              <button
                onClick={() => setViewMode('grid')}
                className={`px-3 py-1.5 rounded-lg transition-all ${
                  viewMode === 'grid' ? 'bg-emerald-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
                }`}
              >
                10-Page Grid
              </button>
            </div>

            <a
              href="/docs/XRD_CaseStudy_210494D.pdf"
              download="XRD_CaseStudy_210494D.pdf"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-slate-950 font-bold text-xs shadow-lg shadow-amber-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Download className="w-4 h-4" />
              <span>Download Report PDF</span>
            </a>
          </div>
        </div>

        {viewMode === 'reader' ? (
          <>
            {/* Single Page Reader View */}
            <div className="bg-slate-900/90 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-6">
              
              {/* Reader Sub-Bar */}
              <div className="px-6 py-3.5 bg-slate-950/80 border-b border-slate-800 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                    PAGE {currentPage.pageNumber} OF {CASE_STUDY_PAGES.length}
                  </span>
                  <span className="text-xs font-semibold text-slate-300 font-mono hidden sm:inline">
                    Section: {currentPage.section}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsFullscreen(true)}
                    className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                    title="Fullscreen Zoom"
                  >
                    <Maximize2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Page Display & Navigation */}
              <div className="relative group bg-slate-950 p-4 sm:p-8 flex items-center justify-center min-h-[550px]">
                <img 
                  src={currentPage.image} 
                  alt={currentPage.title} 
                  className="max-h-[750px] w-auto max-w-full object-contain rounded-lg shadow-2xl border border-slate-800/80"
                />

                {/* Prev Navigation Button */}
                <button
                  onClick={handlePrev}
                  className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-xl"
                  aria-label="Previous Page"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                {/* Next Navigation Button */}
                <button
                  onClick={handleNext}
                  className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-900/90 hover:bg-emerald-500 text-slate-200 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-xl"
                  aria-label="Next Page"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Page Chapter Summary Breakdown */}
              <div className="p-6 bg-slate-950/90 border-t border-slate-800">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div>
                    <span className="text-[11px] font-mono uppercase tracking-wider text-emerald-400 font-bold block">
                      {currentPage.section}
                    </span>
                    <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                      {currentPage.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                      {currentPage.summary}
                    </p>
                  </div>

                  <div className="flex items-center gap-2 shrink-0">
                    <button
                      onClick={handlePrev}
                      className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                    >
                      <ChevronLeft className="w-4 h-4" />
                      <span>Prev Page</span>
                    </button>
                    <button
                      onClick={handleNext}
                      className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-colors"
                    >
                      <span>Next Page</span>
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

            </div>

            {/* Bottom 10-Page Thumbnail Scrubber */}
            <div className="grid grid-cols-2 sm:grid-cols-5 lg:grid-cols-10 gap-2">
              {CASE_STUDY_PAGES.map((page, idx) => {
                const isSelected = idx === currentPageIndex;
                return (
                  <button
                    key={page.pageNumber}
                    onClick={() => setCurrentPageIndex(idx)}
                    className={`p-1.5 rounded-xl border text-center transition-all group ${
                      isSelected
                        ? 'bg-emerald-500/20 border-emerald-500 shadow-md'
                        : 'bg-slate-900/60 border-slate-800 hover:border-slate-700 opacity-70 hover:opacity-100'
                    }`}
                  >
                    <div className="aspect-[3/4] bg-slate-950 rounded overflow-hidden mb-1 relative border border-slate-800">
                      <img 
                        src={page.image} 
                        alt={page.title} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                      />
                      <span className="absolute bottom-1 right-1 px-1 py-0.2 rounded text-[8px] font-mono font-bold bg-black/80 text-white">
                        p.{page.pageNumber}
                      </span>
                    </div>
                    <div className="text-[10px] font-mono text-slate-300 truncate">
                      Pg {page.pageNumber}
                    </div>
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          /* Grid View Mode */
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {CASE_STUDY_PAGES.map((page, idx) => (
              <div 
                key={page.pageNumber}
                onClick={() => {
                  setCurrentPageIndex(idx);
                  setViewMode('reader');
                }}
                className="bg-slate-900/80 rounded-2xl border border-slate-800 hover:border-emerald-500/50 p-3 shadow-lg cursor-pointer group transition-all hover:scale-102"
              >
                <div className="aspect-[3/4] bg-slate-950 rounded-xl overflow-hidden mb-3 border border-slate-800 relative">
                  <img 
                    src={page.image} 
                    alt={page.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-mono font-bold bg-emerald-500/90 text-slate-950">
                    Page {page.pageNumber}
                  </span>
                </div>
                <div className="text-[10px] font-mono text-emerald-400 font-semibold truncate">
                  {page.section}
                </div>
                <h4 className="text-xs font-bold text-white font-heading mt-1 line-clamp-1">
                  {page.title}
                </h4>
                <p className="text-[11px] text-slate-400 mt-1 line-clamp-2 leading-tight">
                  {page.summary}
                </p>
              </div>
            ))}
          </div>
        )}

        {/* Fullscreen Modal View */}
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-emerald-400 font-mono font-bold text-sm">
                  Page {currentPage.pageNumber} of {CASE_STUDY_PAGES.length}:
                </span>
                <span className="text-white font-bold text-sm hidden sm:inline">
                  {currentPage.title}
                </span>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-2 overflow-auto">
              <img 
                src={currentPage.image} 
                alt={currentPage.title} 
                className="max-h-[85vh] w-auto object-contain rounded shadow-2xl"
              />
            </div>

            <div className="flex items-center justify-center gap-4 pt-3 border-t border-slate-800">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Page
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
              >
                Next Page
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
