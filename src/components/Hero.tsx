import React, { useState } from 'react';
import { Github, Mail } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { sound } from '../utils/sound';

export const Hero: React.FC = () => {
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);

  const displayName = (PORTFOLIO_DATA.profile.name || "T S AJEET").toUpperCase();
  const nameChars = displayName.split("");

  const handleCharHover = (index: number) => {
    setHoveredChar(index);
    sound.drop(500 + index * 40);
  };

  return (
    <section className="relative w-full pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 flex flex-col justify-between">
        {/* Hero Lede Statement & Sub-headline */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-[44px] leading-[1.25] font-normal tracking-[-0.02em] text-neutral-900">
            {PORTFOLIO_DATA.profile.headline}
          </h1>
          <p className="mt-4 text-lg md:text-xl text-neutral-600 font-normal leading-relaxed">
            {PORTFOLIO_DATA.profile.subheadline || "Specializing in resilient backends, modular UI architectures, and Agentic AI."}
          </p>
        </div>

        {/* Hero Meta Line */}
        <div className="mt-14 md:mt-20 flex flex-wrap items-center justify-end gap-4 sm:gap-8 text-xs md:text-sm font-medium tracking-[0.08em] uppercase text-neutral-800">
          <span>{PORTFOLIO_DATA.profile.role.toUpperCase()}</span>
          <span className="text-neutral-400 font-bold">+</span>
          <span>INDIA / REMOTE</span>
        </div>

        {/* Massive Pixel Art Typography Title */}
        <div className="relative mt-8 md:mt-12 select-none border-b border-neutral-200 pb-8">
          <div
            className="flex min-h-[clamp(5rem,18vw,15rem)] items-center overflow-hidden text-[clamp(40px,10.5vw,160px)] md:text-[clamp(40px,11.3vw,176px)] font-bold tracking-tight text-black leading-[1.1] font-mono"
            style={{
              fontFamily: "'Press Start 2P', 'Space Mono', monospace",
              letterSpacing: "-0.06em"
            }}
          >
            {nameChars.map((char, i) => (
              <span
                key={i}
                onMouseEnter={() => handleCharHover(i)}
                onMouseLeave={() => setHoveredChar(null)}
                className={`inline-block transition-all duration-300 cursor-default ${
                  char === " " ? "w-[0.3em] md:w-[0.35em]" : ""
                } ${
                  hoveredChar === i
                    ? "text-neutral-600 scale-105 -translate-y-2 filter drop-shadow-md"
                    : "hover:text-neutral-800"
                }`}
              >
                {char}
              </span>
            ))}
          </div>

          <div className="flex items-center gap-3 mt-6">
            <a
              href={PORTFOLIO_DATA.profile.links.github}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.drop(850)}
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 group"
              title="View GitHub (@thetsajeet)"
              aria-label="GitHub Profile"
            >
              <Github className="w-5 h-5 text-neutral-900 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href={PORTFOLIO_DATA.profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.drop(900)}
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 group"
              title="View LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <svg viewBox="0 0 24 24" className="w-5 h-5 fill-neutral-900 group-hover:scale-110 transition-transform">
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
            <a
              href={`mailto:${PORTFOLIO_DATA.profile.email}`}
              onClick={() => sound.chime()}
              className="flex items-center justify-center w-11 h-11 rounded-lg border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 shadow-sm transition-all duration-300 hover:-translate-y-0.5 group"
              title={`Send email to ${PORTFOLIO_DATA.profile.email}`}
              aria-label={`Send email to ${PORTFOLIO_DATA.profile.email}`}
            >
              <Mail className="w-5 h-5 text-neutral-900 group-hover:scale-110 transition-transform" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
