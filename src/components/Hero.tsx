import React, { useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { sound } from '../utils/sound';

export const Hero: React.FC = () => {
  const [hoveredChar, setHoveredChar] = useState<number | null>(null);

  const displayName = (PORTFOLIO_DATA.profile.name || "AJEET T S").toUpperCase();
  const nameChars = displayName.split("");

  const handleCharHover = (index: number) => {
    setHoveredChar(index);
    sound.drop(500 + index * 40);
  };

  return (
    <section className="relative w-full pt-20 md:pt-28 pb-16 md:pb-24 overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12 flex flex-col justify-between">
        {/* Hero Lede Statement */}
        <div className="max-w-3xl">
          <h1 className="text-3xl sm:text-4xl md:text-[42px] leading-[1.3] font-normal tracking-[-0.02em] text-neutral-900">
            {PORTFOLIO_DATA.profile.headline}
          </h1>
        </div>

        {/* Hero Meta Line */}
        <div className="mt-16 md:mt-24 flex flex-wrap items-center justify-end gap-4 sm:gap-8 text-xs md:text-sm font-medium tracking-[0.08em] uppercase text-neutral-800">
          <span>{PORTFOLIO_DATA.profile.role.toUpperCase()}</span>
          <span className="text-neutral-400 font-bold">+</span>
          <span>{PORTFOLIO_DATA.profile.subtitle.toUpperCase()}</span>
          <span className="text-neutral-400 font-bold">+</span>
          <span>INDIA & REMOTE</span>
        </div>

        {/* Massive Pixel Art Typography Title */}
        <div className="relative mt-8 md:mt-12 select-none border-b border-neutral-200 pb-8">
          <div className="flex items-baseline justify-between overflow-x-hidden">
            <div
              className="flex items-center text-[clamp(28px,8.2vw,176px)] font-bold tracking-tight text-black leading-none font-mono"
              style={{
                fontFamily: "'Press Start 2P', 'Space Mono', monospace",
                letterSpacing: "-0.04em"
              }}
            >
              {nameChars.map((char, i) => (
                <span
                  key={i}
                  onMouseEnter={() => handleCharHover(i)}
                  onMouseLeave={() => setHoveredChar(null)}
                  className={`inline-block transition-all duration-300 cursor-default ${
                    char === " " ? "w-8 md:w-16" : ""
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

            {/* LinkedIn Badge Pill */}
            <a
              href={PORTFOLIO_DATA.profile.links.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.drop(900)}
              className="hidden lg:flex items-center justify-center w-12 h-12 rounded-lg border border-neutral-300 hover:border-black bg-white hover:bg-neutral-50 shadow-sm transition-all duration-300 hover:-translate-y-1 group"
              title="View LinkedIn Profile"
              aria-label="LinkedIn Profile"
            >
              <svg
                viewBox="0 0 24 24"
                className="w-6 h-6 fill-black group-hover:scale-110 transition-transform"
              >
                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
