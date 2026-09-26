import React, { useState, useEffect } from 'react';
import { 
  Sliders, 
  ChevronLeft, 
  ChevronRight, 
  Download, 
  Maximize2, 
  X, 
  Sparkles, 
  Award,
  Layers,
  BookOpen
} from 'lucide-react';
import { PRESENTATION_SLIDES, PresentationSlideData } from '../core/xrdData';

export const PresentationSlidesViewer: React.FC = () => {
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentSlide = PRESENTATION_SLIDES[currentSlideIndex];

  const handlePrev = () => {
    setCurrentSlideIndex((prev) => (prev > 0 ? prev - 1 : PRESENTATION_SLIDES.length - 1));
  };

  const handleNext = () => {
    setCurrentSlideIndex((prev) => (prev < PRESENTATION_SLIDES.length - 1 ? prev + 1 : 0));
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'Escape') setIsFullscreen(false);
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  return (
    <section className="py-12 bg-slate-900/60 border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-mono font-medium mb-3">
              <Sliders className="w-3.5 h-3.5 text-purple-400" />
              <span>DEFENSE SLIDES • 6 KEYNOTES</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-heading tracking-tight">
              Academic Defense Presentation Slides
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-2xl mt-1">
              Presented for <span className="text-white font-semibold">MT3054: Characterization of Materials</span> by <span className="text-amber-300 font-semibold">Premakumara H.P.S. (Index: 210494D)</span>, Department of Mechanical Engineering, University of Moratuwa.
            </p>
          </div>

          <a
            href="/docs/210494D_Presentation_Slides.pdf"
            download="210494D_Presentation_Slides.pdf"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow-lg shadow-purple-600/20 transition-all hover:scale-105 active:scale-95"
          >
            <Download className="w-4 h-4" />
            <span>Download Presentation PDF</span>
          </a>
        </div>

        {/* Main Stage Slide Viewer */}
        <div className="bg-slate-950 rounded-2xl border border-slate-800 shadow-2xl overflow-hidden mb-6">
          
          {/* Top Bar */}
          <div className="px-6 py-3.5 bg-slate-900/90 border-b border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="px-2.5 py-1 rounded text-xs font-mono font-bold bg-amber-500/20 text-amber-300 border border-amber-500/30">
                SLIDE {currentSlide.slideNumber} / {PRESENTATION_SLIDES.length}
              </span>
              <span className="text-xs font-semibold text-slate-300 hidden sm:inline">
                {currentSlide.topic}
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsFullscreen(true)}
                className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                title="Fullscreen View"
              >
                <Maximize2 className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Slide Image Stage with Navigation Overlays */}
          <div className="relative group aspect-video bg-black flex items-center justify-center p-2 sm:p-4">
            <img 
              src={currentSlide.image} 
              alt={currentSlide.title} 
              className="max-h-full max-w-full object-contain rounded shadow-2xl transition-transform duration-200"
            />

            {/* Left Button */}
            <button
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/80 hover:bg-amber-500 text-slate-200 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-xl"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>

            {/* Right Button */}
            <button
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-slate-950/80 hover:bg-amber-500 text-slate-200 hover:text-slate-950 border border-slate-700 flex items-center justify-center transition-all opacity-80 group-hover:opacity-100 shadow-xl"
              aria-label="Next Slide"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>

          {/* Bottom Slide Info & Academic Context */}
          <div className="p-6 bg-slate-900/90 border-t border-slate-800">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div>
                <span className="text-[11px] font-mono uppercase tracking-wider text-amber-400 font-bold block">
                  {currentSlide.topic}
                </span>
                <h3 className="text-xl font-bold text-white font-heading mt-0.5">
                  {currentSlide.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 mt-2 max-w-3xl leading-relaxed">
                  {currentSlide.summary}
                </p>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  onClick={handlePrev}
                  className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center gap-1 transition-colors"
                >
                  <ChevronLeft className="w-4 h-4" />
                  <span>Prev</span>
                </button>
                <button
                  onClick={handleNext}
                  className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1 transition-colors"
                >
                  <span>Next</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>

        </div>

        {/* Thumbnail Carousel Scrubber */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
          {PRESENTATION_SLIDES.map((slide, idx) => {
            const isSelected = idx === currentSlideIndex;
            return (
              <button
                key={slide.slideNumber}
                onClick={() => setCurrentSlideIndex(idx)}
                className={`p-2 rounded-xl border text-left transition-all group ${
                  isSelected
                    ? 'bg-amber-500/15 border-amber-500 shadow-lg shadow-amber-500/10'
                    : 'bg-slate-950/70 border-slate-800 hover:border-slate-700 opacity-75 hover:opacity-100'
                }`}
              >
                <div className="aspect-video bg-black rounded overflow-hidden mb-2 relative">
                  <img 
                    src={slide.image} 
                    alt={slide.title} 
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                  />
                  <span className="absolute bottom-1 right-1 px-1.5 py-0.5 rounded text-[9px] font-mono font-bold bg-black/80 text-white">
                    #{slide.slideNumber}
                  </span>
                </div>
                <div className="text-[11px] font-semibold text-white truncate">
                  {slide.title}
                </div>
                <div className="text-[10px] text-slate-400 truncate mt-0.5">
                  {slide.topic}
                </div>
              </button>
            );
          })}
        </div>

        {/* Fullscreen Modal View */}
        {isFullscreen && (
          <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col p-4 sm:p-6 animate-in fade-in duration-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-3">
                <span className="text-amber-400 font-mono font-bold text-sm">
                  Slide {currentSlide.slideNumber} of {PRESENTATION_SLIDES.length}:
                </span>
                <span className="text-white font-bold text-sm hidden sm:inline">
                  {currentSlide.title}
                </span>
              </div>
              <button
                onClick={() => setIsFullscreen(false)}
                className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="flex-1 flex items-center justify-center p-2">
              <img 
                src={currentSlide.image} 
                alt={currentSlide.title} 
                className="max-h-[85vh] max-w-full object-contain rounded shadow-2xl"
              />
            </div>

            <div className="flex items-center justify-center gap-4 pt-3 border-t border-slate-800">
              <button
                onClick={handlePrev}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs font-semibold flex items-center gap-1.5"
              >
                <ChevronLeft className="w-4 h-4" />
                Previous Slide
              </button>
              <button
                onClick={handleNext}
                className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold flex items-center gap-1.5"
              >
                Next Slide
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

      </div>
    </section>
  );
};
