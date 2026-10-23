import React from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { MapPin, Code2 } from 'lucide-react';
import { sound } from '../utils/sound';

export const AboutSection: React.FC = () => {
  return (
    <section id="about" className="w-full py-20 md:py-32 border-b border-neutral-200">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Text Bio */}
          <div className="lg:col-span-7 flex flex-col justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3">
              Engineering Background & Craft
            </span>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900 mb-8">
              About Me
            </h2>

            <div className="text-lg md:text-xl text-neutral-700 leading-relaxed space-y-6">
              <p className="font-normal text-neutral-900">
                {PORTFOLIO_DATA.profile.bio}
              </p>
              {PORTFOLIO_DATA.profile.aboutParagraphs.map((para, i) => (
                <p key={i} className="text-base md:text-lg text-neutral-600">
                  {para}
                </p>
              ))}
            </div>

            {/* Quick Metrics */}
            <div className="mt-12 pt-8 border-t border-neutral-200 grid grid-cols-2 sm:grid-cols-4 gap-6">
              {PORTFOLIO_DATA.profile.stats.map((stat, i) => (
                <div key={i} className="flex flex-col">
                  <span className="text-2xl md:text-3xl font-bold font-mono text-neutral-900">
                    {stat.value}
                  </span>
                  <span className="text-xs text-neutral-500 mt-1 uppercase tracking-wide">
                    {stat.label}
                  </span>
                </div>
              ))}
            </div>

            {/* Technical Skills Pills */}
            <div className="mt-8 pt-6 border-t border-neutral-100">
              <span className="text-xs font-mono uppercase tracking-wider text-neutral-400 block mb-3">
                Core Technologies
              </span>
              <div className="flex flex-wrap gap-2">
                {PORTFOLIO_DATA.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    onMouseEnter={() => sound.tick()}
                    className="px-3 py-1 text-xs rounded-full bg-neutral-100 hover:bg-neutral-200 text-neutral-800 border border-neutral-200 transition-colors font-medium cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Status Pills */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-800 text-xs font-medium">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>{PORTFOLIO_DATA.profile.status}</span>
              </div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-neutral-100 border border-neutral-200 text-neutral-700 text-xs font-medium">
                <MapPin className="w-3.5 h-3.5 text-neutral-500" />
                <span>{PORTFOLIO_DATA.profile.location}</span>
              </div>
            </div>
          </div>

          {/* Right Portrait Showcase */}
          <div className="lg:col-span-5 relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200 shadow-md group">
              {/* Portrait of Ajeet T S */}
              <img
                src={PORTFOLIO_DATA.profile.profileImage || "/assets/aistudio/image_b4d68d89.png"}
                alt="Ajeet T S — Senior Software Engineer"
                className="w-full h-full object-cover group-hover:scale-105 transition-all duration-700 ease-out"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-90"></div>

              <div className="absolute bottom-6 left-6 right-6 text-white">
                <div className="text-xs font-mono uppercase tracking-widest text-neutral-300">
                  {PORTFOLIO_DATA.profile.role}
                </div>
                <div className="text-xl font-medium tracking-tight mt-1">
                  {PORTFOLIO_DATA.profile.name}
                </div>
                <div className="text-xs text-neutral-300 font-light mt-0.5">
                  {PORTFOLIO_DATA.profile.subtitle}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
