'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { Navbar } from '../components/Navbar';
import { Hero } from '../components/Hero';
import { Pillars } from '../components/Pillars';
import { MarqueeBanner } from '../components/MarqueeBanner';
import { SelectedWorks } from '../components/SelectedWorks';
import { GenAIProjects } from '../components/GenAIProjects';
import { AboutSection } from '../components/AboutSection';
import { AwardsBand } from '../components/AwardsBand';
import { ContactSection } from '../components/ContactSection';
import { Footer } from '../components/Footer';
import { TopLoader } from '../components/TopLoader';
import { Project, GenAIProject } from '../data/portfolio';
import { Droplets, ArrowUp } from 'lucide-react';
import { sound } from '../utils/sound';

// Code-split heavy interactive modals and entry animations to optimize Lighthouse performance
const WaterGateIntro = dynamic(
  () => import('../components/WaterGateIntro').then((mod) => mod.WaterGateIntro),
  { ssr: false }
);

const CaseStudyModal = dynamic(
  () => import('../components/CaseStudyModal').then((mod) => mod.CaseStudyModal),
  { ssr: false }
);

const GenAIModal = dynamic(
  () => import('../components/GenAIModal').then((mod) => mod.GenAIModal),
  { ssr: false }
);

const MemoryGameModal = dynamic(
  () => import('../components/MemoryGameModal').then((mod) => mod.MemoryGameModal),
  { ssr: false }
);

const ResumeModal = dynamic(
  () => import('../components/ResumeModal').then((mod) => mod.ResumeModal),
  { ssr: false }
);

export default function HomePage() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [mounted, setMounted] = useState<boolean>(false);
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedGenAI, setSelectedGenAI] = useState<GenAIProject | null>(null);
  const [gameModalOpen, setGameModalOpen] = useState(false);
  const [resumeModalOpen, setResumeModalOpen] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [isNavigating, setIsNavigating] = useState(false);

  // Check URL params after mount to ensure safe SSR hydration
  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      if (urlParams.get('autostart') === '1') {
        setHasEntered(true);
      }
    }
  }, []);

  const triggerNavigation = () => {
    setIsNavigating(true);
    setTimeout(() => setIsNavigating(false), 500);
  };

  // Track scroll percentage with RAF and cross-browser scroll metrics
  useEffect(() => {
    let ticking = false;

    const updateScrollProgress = () => {
      const scrollY =
        window.scrollY ??
        window.pageYOffset ??
        document.documentElement.scrollTop ??
        document.body.scrollTop ??
        0;

      const docHeight = Math.max(
        document.documentElement.scrollHeight,
        document.body.scrollHeight,
        document.documentElement.offsetHeight,
        document.body.offsetHeight
      );

      const winHeight =
        window.innerHeight ||
        document.documentElement.clientHeight ||
        document.body.clientHeight ||
        1;

      const totalHeight = docHeight - winHeight;

      if (totalHeight > 0) {
        const percent = Math.min(100, Math.max(0, Math.round((scrollY / totalHeight) * 100)));
        setScrollProgress(percent);
      } else {
        setScrollProgress(0);
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollProgress);
        ticking = true;
      }
    };

    // Calculate immediately on mount / enter transition
    updateScrollProgress();

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [hasEntered]);

  return (
    <div id="top" className="relative min-h-screen bg-white text-neutral-900 selection:bg-black selection:text-white">
      {/* Top Hairline Progress Indicator for Page & Section Navigation */}
      <TopLoader isLoading={isNavigating} />

      {/* Water Gate Interactive Intro */}
      {mounted && !hasEntered && (
        <WaterGateIntro onEnter={() => {
          triggerNavigation();
          setHasEntered(true);
        }} />
      )}


      {/* Right Edge Scroll Progress Tracker */}
      <aside
        className="fixed right-3 md:right-5 top-1/2 -translate-y-1/2 z-30 hidden sm:flex flex-col items-center gap-2 select-none pointer-events-none"
        aria-label={`Page scroll progress: ${scrollProgress}%`}
      >
        <span className="text-[11px] font-mono font-medium text-neutral-600 tabular-nums">
          {scrollProgress}%
        </span>
        <div className="w-[2px] h-24 bg-neutral-200 relative overflow-hidden rounded-full">
          <div
            className="w-full bg-black transition-[height] duration-75 ease-out"
            style={{ height: `${scrollProgress}%` }}
          ></div>
        </div>
      </aside>

      {/* Water Ripple Trigger Button (Floating re-trigger) */}
      <button
        onClick={() => {
          sound.bubble();
          setHasEntered(false);
        }}
        className="fixed bottom-6 left-6 z-30 hidden md:flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/80 hover:bg-white text-neutral-600 hover:text-black border border-neutral-200/80 shadow-md backdrop-blur-md text-xs font-mono transition-all hover:scale-105 cursor-pointer"
        title="Experience the shallow water entrance again"
      >
        <Droplets className="w-3.5 h-3.5 text-indigo-500" />
        <span>Water Surface</span>
      </button>

      {/* Persistent Back to Top Floating Button with Tooltip */}
      <div className="fixed bottom-6 right-6 z-40 group">
        <button
          onClick={() => {
            sound.drop(900);
            triggerNavigation();
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="w-12 h-12 rounded-full bg-black text-white hover:bg-neutral-800 flex items-center justify-center shadow-xl border border-neutral-700/80 hover:scale-105 active:scale-95 transition-all cursor-pointer"
          aria-label="Back to top"
          title="Back to top"
        >
          <ArrowUp className="w-5 h-5 group-hover:-translate-y-0.5 transition-transform" />
        </button>

        {/* Hover Tooltip */}
        <div className="pointer-events-none absolute bottom-full right-1/2 translate-x-1/2 mb-2 px-2.5 py-1 rounded bg-black text-white text-[10px] font-mono uppercase tracking-wider whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity shadow-md">
          Back to top
        </div>
      </div>

      {/* Main Website Structure */}
      <Navbar
        onOpenGame={() => setGameModalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onNavigate={triggerNavigation}
      />

      <main>
        <Hero />
        <Pillars />
        <MarqueeBanner />
        <SelectedWorks onSelectProject={(p) => {
          triggerNavigation();
          setSelectedProject(p);
        }} />
        <GenAIProjects onSelectProject={(p) => {
          triggerNavigation();
          setSelectedGenAI(p);
        }} />
        <AboutSection />
        <AwardsBand />
        {/* Testimonials section commented out - will be used at a later stage */}
        {/* <Testimonials /> */}
        <ContactSection onOpenResume={() => setResumeModalOpen(true)} />
      </main>

      <Footer
        onOpenGame={() => setGameModalOpen(true)}
        onOpenResume={() => setResumeModalOpen(true)}
        onNavigate={triggerNavigation}
      />

      {/* Dynamically Loaded Interactive Modals */}
      {selectedProject && (
        <CaseStudyModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {selectedGenAI && (
        <GenAIModal
          project={selectedGenAI}
          onClose={() => setSelectedGenAI(null)}
        />
      )}

      {gameModalOpen && (
        <MemoryGameModal
          isOpen={gameModalOpen}
          onClose={() => setGameModalOpen(false)}
        />
      )}

      {resumeModalOpen && (
        <ResumeModal
          isOpen={resumeModalOpen}
          onClose={() => setResumeModalOpen(false)}
        />
      )}
    </div>
  );
}
