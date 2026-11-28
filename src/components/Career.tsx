'use client';

import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const careerGradients = [
  'from-sky-500 via-blue-600 to-indigo-800',
  'from-emerald-400 via-teal-500 to-cyan-700',
  'from-violet-500 via-purple-600 to-indigo-800',
  'from-amber-400 via-orange-500 to-rose-600',
  'from-cyan-500 via-blue-600 to-slate-800'
];

const STACK_SCALE_STEP = 0.05;
const STACK_DIM_MAX = 0.12;
const STACK_VIEWPORT_MARGIN = 16;

const getStackTop = (idx: number, isDesktop: boolean, rem: number) =>
  isDesktop ? (6 + idx * 1.5) * rem : (5.5 + idx * 0.75) * rem;

export const Career: React.FC = () => {
  const wrapperRefs = useRef<HTMLDivElement[]>([]);
  const cardRefs = useRef<HTMLElement[]>([]);
  const dimRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const desktopQuery = window.matchMedia('(min-width: 768px)');
    const reducedMotionQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    let stickyTops: number[] = [];
    let heights: number[] = [];
    let ticking = false;

    // Cards taller than the viewport get a negative-leaning sticky top so their bottom stays reachable.
    const measure = () => {
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      const winHeight = window.innerHeight || document.documentElement.clientHeight || 1;
      const wrappers = wrapperRefs.current;
      heights = wrappers.map((wrapper) => wrapper.offsetHeight);
      stickyTops = wrappers.map((wrapper, idx) => {
        const base = getStackTop(idx, desktopQuery.matches, rem);
        const top = Math.min(base, winHeight - heights[idx] - STACK_VIEWPORT_MARGIN);
        wrapper.style.top = `${top}px`;
        return top;
      });
    };

    const update = () => {
      ticking = false;
      const wrappers = wrapperRefs.current;
      const cards = cardRefs.current;
      const dims = dimRefs.current;
      const reduceMotion = reducedMotionQuery.matches;

      cards.forEach((card, idx) => {
        const next = wrappers[idx + 1];
        let progress = 0;

        if (next && !reduceMotion) {
          const start = stickyTops[idx] + heights[idx];
          const end = stickyTops[idx + 1];
          const distance = start - end;
          const nextTop = next.getBoundingClientRect().top;
          progress = distance > 0 ? Math.min(1, Math.max(0, (start - nextTop) / distance)) : 0;
        }

        card.style.transform = progress > 0 ? `scale(${1 - progress * STACK_SCALE_STEP})` : '';
        const dim = dims[idx];
        if (dim) dim.style.opacity = progress > 0 ? `${progress * STACK_DIM_MAX}` : '0';
      });
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(update);
        ticking = true;
      }
    };

    const handleLayoutChange = () => {
      measure();
      handleScroll();
    };

    measure();
    update();

    const resizeObserver =
      typeof ResizeObserver !== 'undefined' ? new ResizeObserver(handleLayoutChange) : null;
    wrapperRefs.current.forEach((wrapper) => resizeObserver?.observe(wrapper));

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleLayoutChange, { passive: true });
    desktopQuery.addEventListener('change', handleLayoutChange);
    reducedMotionQuery.addEventListener('change', handleScroll);

    return () => {
      resizeObserver?.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleLayoutChange);
      desktopQuery.removeEventListener('change', handleLayoutChange);
      reducedMotionQuery.removeEventListener('change', handleScroll);
    };
  }, []);

  const jobCount = PORTFOLIO_DATA.workExperience.length;

  return (
    <section id="works" className="w-full pt-20 md:pt-32 pb-32 md:pb-48 border-b border-neutral-200">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h2 className="text-5xl md:text-7xl font-serif italic text-neutral-900 tracking-tight">
            Career
          </h2>
          <p className="text-sm font-mono uppercase tracking-widest text-neutral-500">
            {PORTFOLIO_DATA.workExperience.length} Roles · Citi & Finllect
          </p>
        </div>

        <div className="relative">
          {PORTFOLIO_DATA.workExperience.map((job, idx) => (
            <div
              key={`${job.company}-${job.role}-${idx}`}
              ref={(el) => {
                if (el) wrapperRefs.current[idx] = el;
              }}
              style={{ '--stack-index': idx } as React.CSSProperties}
              className={`sticky top-[calc(5.5rem+var(--stack-index)*0.75rem)] md:top-[calc(6rem+var(--stack-index)*1.5rem)] ${
                idx < jobCount - 1 ? 'mb-10 md:mb-[12vh]' : ''
              }`}
            >
              <article
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="relative min-h-[60vh] origin-top rounded-3xl md:rounded-[2rem] bg-white border border-neutral-200 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] p-5 md:p-10 lg:p-12 will-change-transform"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8 items-stretch">
                  <div className="lg:col-span-4 flex flex-col justify-between gap-5 lg:gap-8">
                    <div>
                      <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                        0{idx + 1} / {job.company}
                      </span>
                      <h3 className="mt-3 text-2xl md:text-3xl font-medium tracking-tight text-neutral-900">
                        {job.project}
                      </h3>
                      <p className="mt-3 lg:mt-5 text-neutral-600 text-base leading-relaxed">
                        {job.highlights[0]}
                      </p>
                    </div>

                    <div className="pt-4 lg:pt-6 border-t border-neutral-100 flex flex-col gap-2 text-sm text-neutral-500">
                      {job.period && (
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400 font-mono text-xs uppercase">Timeline:</span>
                          <span className="font-medium text-neutral-800">{job.period}</span>
                        </div>
                      )}
                      {job.location && (
                        <div className="flex items-center gap-2">
                          <span className="text-neutral-400 font-mono text-xs uppercase">Location:</span>
                          <span className="inline-flex items-center gap-1 font-medium text-neutral-800">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.location}
                          </span>
                        </div>
                      )}
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    <div className="relative w-full aspect-[16/9] sm:aspect-[4/3] lg:aspect-[4/5] lg:max-h-[62vh] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm">
                      <div className={`absolute inset-0 bg-gradient-to-br ${careerGradients[idx % careerGradients.length]} opacity-90`} />
                      <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]" />
                      <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-3xl pointer-events-none" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white">
                        <span className="text-xs uppercase tracking-widest font-mono text-white/80 mb-4 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                          {job.company}
                        </span>
                        <h4 className="text-xl md:text-2xl font-medium tracking-tight max-w-sm leading-relaxed drop-shadow-sm">
                          {job.highlights[1] || job.highlights[0]}
                        </h4>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-3 flex flex-col justify-between gap-5 lg:gap-8 lg:pl-6 border-l lg:border-neutral-200 border-transparent">
                    <div>
                      <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                        Role
                      </span>
                      <p className="mt-2 text-lg font-medium text-neutral-900">
                        {job.role}
                      </p>
                    </div>

                    <div>
                      <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                        Highlights
                      </span>
                      <div className="mt-3 flex flex-wrap gap-2">
                        {job.focus.map((item) => (
                          <span
                            key={item}
                            className="px-2.5 py-1 text-xs rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  ref={(el) => {
                    if (el) dimRefs.current[idx] = el;
                  }}
                  aria-hidden="true"
                  className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] bg-neutral-950 opacity-0"
                />
              </article>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
