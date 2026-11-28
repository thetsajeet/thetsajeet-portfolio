'use client';

import React, { useEffect, useRef } from 'react';
import { Calendar, MapPin } from 'lucide-react';
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
    <section id="works" className="w-full py-20 md:py-32 border-b border-neutral-200">
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
                className="relative origin-top rounded-3xl md:rounded-[2rem] bg-white border border-neutral-200 shadow-[0_20px_50px_-20px_rgba(15,23,42,0.25)] p-5 md:p-8 lg:p-10 will-change-transform"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-5 lg:gap-y-8">
                  <header className="lg:col-span-9">
                    <span className="block text-[11px] md:text-xs font-mono uppercase text-neutral-500 tracking-wider">
                      0{idx + 1} / {job.company} / {job.role}
                    </span>
                    <h3 className="mt-2 md:mt-3 text-2xl md:text-4xl lg:text-[2.75rem] font-semibold tracking-tight leading-tight text-neutral-900">
                      {job.project}
                    </h3>
                  </header>

                  <div className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-8 flex flex-row flex-wrap lg:flex-col gap-x-6 gap-y-3 text-sm font-medium text-neutral-800">
                    {job.period && (
                      <div className="flex items-start gap-2.5">
                        <Calendar className="w-4 h-4 mt-0.5 shrink-0 text-indigo-600" aria-hidden="true" />
                        <span>{job.period}</span>
                      </div>
                    )}
                    {job.location && (
                      <div className="flex items-start gap-2.5">
                        <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-indigo-600" aria-hidden="true" />
                        <span>{job.location}</span>
                      </div>
                    )}
                  </div>

                  <div className="lg:col-span-9 relative overflow-hidden rounded-2xl md:rounded-3xl lg:min-h-[22rem] flex items-center">
                    <div className={`absolute inset-0 bg-gradient-to-br ${careerGradients[idx % careerGradients.length]}`} />
                    <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-3xl pointer-events-none" />
                    <ul className="relative w-full flex flex-col gap-4 p-6 md:p-10 lg:px-14 lg:py-12 text-sm md:text-base lg:text-lg leading-relaxed text-white">
                      {job.highlights.map((highlight) => (
                        <li key={highlight} className="flex gap-3">
                          <span className="mt-[0.6em] w-1.5 h-1.5 shrink-0 rounded-full bg-white" aria-hidden="true" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="lg:col-span-3 lg:border-l lg:border-neutral-200 lg:pl-8 flex items-end">
                    <ul className="flex flex-wrap gap-2" aria-label="Tech stack">
                      {job.focus.map((item) => (
                        <li
                          key={item}
                          className="px-3 py-1 text-xs rounded-full bg-neutral-50 text-neutral-700 border border-neutral-200"
                        >
                          {item}
                        </li>
                      ))}
                    </ul>
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
          <div aria-hidden="true" className="h-[15vh] md:h-[25vh]" />
        </div>
      </div>
    </section>
  );
};
