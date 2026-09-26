import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { OverviewSection } from './components/OverviewSection';
import { InteractiveDiffractometer } from './components/InteractiveDiffractometer';
import { CrystallinityComparisonMatrix } from './components/CrystallinityComparisonMatrix';
import { ConservationMechanismViewer } from './components/ConservationMechanismViewer';
import { PresentationSlidesViewer } from './components/PresentationSlidesViewer';
import { CaseStudyReader } from './components/CaseStudyReader';
import { Footer } from './components/Footer';

export function App() {
  const [activeTab, setActiveTab] = useState<string>('overview');

  // Trigger celebration confetti on defense view
  useEffect(() => {
    if (activeTab === 'slides') {
      confetti({
        particleCount: 45,
        spread: 70,
        origin: { y: 0.7 },
        colors: ['#38bdf8', '#fbbf24', '#a855f7', '#34d399']
      });
    }
  }, [activeTab]);

  return (
    <div className="min-h-screen bg-[#080d1a] text-slate-100 font-sans selection:bg-amber-500 selection:text-slate-950 flex flex-col">
      {/* Sticky Top Navbar */}
      <Navbar activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Main Content Sections */}
      <main className="flex-1">
        {activeTab === 'overview' && (
          <>
            <Hero setActiveTab={setActiveTab} />
            <OverviewSection setActiveTab={setActiveTab} />
            <InteractiveDiffractometer />
            <CrystallinityComparisonMatrix />
            <ConservationMechanismViewer />
          </>
        )}

        {activeTab === 'diffractometer' && (
          <div className="pt-20">
            <InteractiveDiffractometer />
          </div>
        )}

        {activeTab === 'crystallinity-matrix' && (
          <div className="pt-20">
            <CrystallinityComparisonMatrix />
          </div>
        )}

        {activeTab === 'conservation' && (
          <div className="pt-20">
            <ConservationMechanismViewer />
          </div>
        )}

        {activeTab === 'slides' && (
          <div className="pt-20">
            <PresentationSlidesViewer />
          </div>
        )}

        {activeTab === 'case-study' && (
          <div className="pt-20">
            <CaseStudyReader />
          </div>
        )}
      </main>

      {/* Academic Footer */}
      <Footer setActiveTab={setActiveTab} />
    </div>
  );
}

export default App;
