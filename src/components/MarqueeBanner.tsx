import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';

export const MarqueeBanner: React.FC = () => {
  const words = PORTFOLIO_DATA.marqueeWords;

  return (
    <div className="w-full border-b border-neutral-200 overflow-hidden py-8 md:py-10 bg-white select-none">
      <div className="flex w-max animate-marquee">
        {/* Track duplicate for infinite seamless loop */}
        {[...Array(3)].map((_, rep) => (
          <div key={rep} className="flex items-center gap-12 sm:gap-16 pr-12 sm:pr-16">
            {words.map((word, i) => (
              <div key={i} className="flex items-center gap-12 sm:gap-16">
                <span className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-neutral-900 font-mono whitespace-nowrap hover:text-neutral-500 transition-colors">
                  {word}
                </span>
                <span className="text-2xl sm:text-4xl text-neutral-300 font-bold select-none">
                  +
                </span>
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};
