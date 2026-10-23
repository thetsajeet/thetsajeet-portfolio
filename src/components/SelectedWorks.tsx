import React from 'react';
import { ArrowUpRight, Github, ExternalLink } from 'lucide-react';
import { PORTFOLIO_DATA, Project } from '../data/portfolio';
import { sound } from '../utils/sound';

interface SelectedWorksProps {
  onSelectProject: (project: Project) => void;
}

export const SelectedWorks: React.FC<SelectedWorksProps> = ({ onSelectProject }) => {
  return (
    <section id="works" className="w-full py-20 md:py-32 border-b border-neutral-200">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        {/* Section Editorial Heading */}
        <div className="mb-16 md:mb-24 flex flex-col md:flex-row md:items-baseline justify-between gap-4">
          <h2 className="text-5xl md:text-7xl font-serif italic text-neutral-900 tracking-tight">
            Selected Works
          </h2>
          <p className="text-sm font-mono uppercase tracking-widest text-neutral-500">
            0{PORTFOLIO_DATA.selectedWorks.length} Shipped Systems & Case Studies · 2022 — Present
          </p>
        </div>

        {/* List of Case Studies in Hairline Grid Columns */}
        <div className="flex flex-col divide-y divide-neutral-200">
          {PORTFOLIO_DATA.selectedWorks.map((work, idx) => (
            <article
              key={work.id}
              onClick={() => {
                sound.whoosh();
                onSelectProject(work);
              }}
              className="py-16 md:py-24 group cursor-pointer"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
                {/* Column 1: Intro & Context */}
                <div className="lg:col-span-4 flex flex-col justify-between gap-8">
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      0{idx + 1} / {work.category}
                    </span>
                    <h3 className="mt-3 text-2xl md:text-3xl font-medium tracking-tight text-neutral-900 group-hover:text-indigo-600 transition-colors flex items-center gap-2">
                      <span>{work.title}</span>
                      <ArrowUpRight className="w-5 h-5 opacity-0 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all text-indigo-600" />
                    </h3>
                    <p className="mt-5 text-neutral-600 text-base leading-relaxed">
                      {work.description}
                    </p>
                  </div>

                  {/* Highlights / Timeline */}
                  <div className="pt-6 border-t border-neutral-100 flex flex-col gap-2 text-sm text-neutral-500">
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 font-mono text-xs uppercase">Timeline:</span>
                      <span className="font-medium text-neutral-800">{work.timeline}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-neutral-400 font-mono text-xs uppercase">Impact:</span>
                      <span className="text-emerald-600 font-medium">{work.previewQuote}</span>
                    </div>

                    <div className="mt-4 flex items-center gap-3">
                      <button
                        type="button"
                        className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-black group-hover:text-indigo-600 transition-colors"
                      >
                        <span>Deep Dive & Interactive Demo</span>
                        <span>→</span>
                      </button>

                      {work.links?.live && (
                        <a
                          href={work.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.drop(850);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-mono text-indigo-600 hover:text-indigo-800 hover:underline ml-auto"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                          <span>Live Site</span>
                        </a>
                      )}
                      {work.links?.github && (
                        <a
                          href={work.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => {
                            e.stopPropagation();
                            sound.drop(850);
                          }}
                          className="inline-flex items-center gap-1 text-xs font-mono text-neutral-600 hover:text-black hover:underline"
                        >
                          <Github className="w-3.5 h-3.5" />
                          <span>GitHub</span>
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                {/* Column 2: Center Visual Glass Card */}
                <div className="lg:col-span-5 relative flex items-center justify-center">
                  <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm group-hover:shadow-2xl transition-all duration-700 group-hover:-translate-y-1">
                    {/* Rich Fluid Gradient Surface */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${work.gradient} opacity-85 group-hover:opacity-95 transition-opacity duration-700`}></div>

                    {/* Glossy Overlay */}
                    <div className="absolute inset-0 bg-black/10 backdrop-blur-[2px]"></div>
                    <div className="absolute -top-24 -left-24 w-72 h-72 rounded-full bg-white/20 blur-3xl pointer-events-none"></div>

                    {/* Centered Big Typography Tagline */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-8 text-center text-white z-10">
                      <span className="text-xs uppercase tracking-widest font-mono text-white/80 mb-3 bg-black/20 backdrop-blur-md px-3 py-1 rounded-full border border-white/20">
                        {work.category}
                      </span>
                      <h4 className="text-3xl md:text-4xl font-semibold tracking-tight max-w-xs leading-snug drop-shadow-sm">
                        {work.tagline}
                      </h4>
                      <p className="mt-4 text-sm text-white/80 max-w-xs font-light">
                        {work.subtitle}
                      </p>

                      {/* Interactive pill cue */}
                      <div className="mt-8 px-4 py-2 rounded-full bg-white/25 hover:bg-white/40 text-xs font-medium tracking-wide uppercase backdrop-blur-md border border-white/30 transition-all">
                        Click to view architecture
                      </div>
                    </div>
                  </div>
                </div>

                {/* Column 3: Role & Tools */}
                <div className="lg:col-span-3 flex flex-col justify-between gap-8 lg:pl-6 border-l lg:border-neutral-200 border-transparent">
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      Role
                    </span>
                    <p className="mt-2 text-lg font-medium text-neutral-900">
                      {work.role}
                    </p>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      Key Metrics
                    </span>
                    <div className="mt-3 grid grid-cols-2 lg:grid-cols-1 gap-3">
                      {work.metrics.map((m, mi) => (
                        <div key={mi} className="p-3 rounded-xl bg-neutral-50 border border-neutral-100">
                          <div className="text-xl font-bold font-mono text-neutral-900">{m.value}</div>
                          <div className="text-xs text-neutral-500 mt-0.5">{m.label}</div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      Tools & Stack
                    </span>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {work.tools.map((tool, ti) => (
                        <span
                          key={ti}
                          className="px-2.5 py-1 text-xs rounded-md bg-neutral-100 text-neutral-700 border border-neutral-200"
                        >
                          {tool}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
