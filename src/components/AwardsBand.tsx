import React from 'react';
import { Trophy, Award as AwardIcon, Star, Sparkles } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { sound } from '../utils/sound';

export const AwardsBand: React.FC = () => {
  return (
    <section className="w-full border-b border-neutral-200 py-12 md:py-16 bg-neutral-50/50">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {PORTFOLIO_DATA.awards.map((award, i) => (
            <div
              key={i}
              onMouseEnter={() => sound.tick()}
              className="flex items-center gap-5 p-4 rounded-xl hover:bg-white hover:shadow-sm transition-all duration-300 group cursor-default"
            >
              <div className="w-12 h-12 rounded-full bg-neutral-200 group-hover:bg-neutral-900 group-hover:text-white flex items-center justify-center flex-shrink-0 transition-colors duration-300">
                <Trophy className="w-5 h-5 text-neutral-800 group-hover:text-white transition-colors" />
              </div>
              <div className="flex flex-col">
                <span className="text-sm font-semibold text-neutral-900 leading-snug group-hover:text-black">
                  {award.title}
                </span>
                <span className="text-xs text-neutral-500 font-mono mt-1">
                  {award.year} · {award.organization}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
