import React, { useRef } from 'react';
import { ChevronLeft, ChevronRight, Cpu, Github, ExternalLink, Package } from 'lucide-react';
import { PORTFOLIO_DATA, GenAIProject } from '../data/portfolio';
import { sound } from '../utils/sound';

interface GenAIProjectsProps {
  onSelectProject: (project: GenAIProject) => void;
}

export const GenAIProjects: React.FC<GenAIProjectsProps> = ({ onSelectProject }) => {
  const scrollContainerRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    sound.tick();
    if (scrollContainerRef.current) {
      const offset = direction === 'left' ? -460 : 460;
      scrollContainerRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section id="projects" className="w-full py-20 md:py-32 border-b border-neutral-200 overflow-hidden">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        {/* Header & Controls */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12">
          <div className="max-w-xl">
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              <Cpu className="w-3.5 h-3.5 text-indigo-500" />
              <span>Prototypes & Systems</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-neutral-900">
              Projects
            </h2>
            <p className="mt-4 text-neutral-600 text-base md:text-lg leading-relaxed">
              From autonomous LLM agents and semantic RAG to high-throughput gRPC microservices and open-source libraries, explore key engineering prototypes and backend systems.
            </p>
          </div>

          {/* Joined Hairline Arrow Buttons */}
          <div className="flex border border-neutral-300 rounded-none self-start md:self-end">
            <button
              onClick={() => scroll('left')}
              className="w-14 h-11 flex items-center justify-center liquid-button hover:bg-neutral-900 text-neutral-800 transition-colors cursor-pointer border-r border-neutral-300"
              aria-label="Previous project"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button
              onClick={() => scroll('right')}
              className="w-14 h-11 flex items-center justify-center liquid-button hover:bg-neutral-900 text-neutral-800 transition-colors cursor-pointer"
              aria-label="Next project"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Draggable Horizontal Track */}
        <div
          ref={scrollContainerRef}
          className="flex gap-8 overflow-x-auto no-scrollbar scroll-smooth pb-8 -mx-6 px-6 md:-mx-12 md:px-12"
        >
          {PORTFOLIO_DATA.genAIProjects.map((item, idx) => (
            <div
              key={item.id}
              onClick={() => {
                sound.whoosh();
                onSelectProject(item);
              }}
              className="flex-none w-[320px] sm:w-[400px] md:w-[436px] flex flex-col group cursor-pointer"
            >
              {/* Media Card */}
              <div className="relative aspect-[436/540] rounded-2xl overflow-hidden bg-neutral-900 mb-6 shadow-sm group-hover:shadow-xl transition-all duration-500 group-hover:-translate-y-1">
                {/* Generative Visual Canvas / Gradient */}
                <div className={`absolute inset-0 bg-gradient-to-tr ${item.gradient} opacity-80 group-hover:opacity-95 transition-opacity duration-500`}></div>

                {/* Decorative Pattern & Badge */}
                <div className="absolute inset-0 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px] opacity-20"></div>

                <div className="absolute top-6 left-6 right-6 flex items-center justify-between">
                  <span className="text-xs font-mono uppercase px-3 py-1 rounded-full bg-black/40 text-white/90 backdrop-blur-md border border-white/20">
                    {item.tag}
                  </span>
                  <span className="text-xs font-mono text-white/80">
                    0{idx + 1}
                  </span>
                </div>

                <div className="absolute bottom-6 left-6 right-6 p-5 rounded-xl bg-black/40 backdrop-blur-md border border-white/10 text-white">
                  <div className="text-xs font-mono uppercase text-emerald-400 mb-1">
                    {item.metrics}
                  </div>
                  <h3 className="text-xl font-medium tracking-tight">
                    {item.title}
                  </h3>
                  <p className="mt-2 text-xs text-white/80 line-clamp-2 leading-relaxed">
                    {item.summary}
                  </p>

                  <div className="mt-4 flex items-center justify-between pt-3 border-t border-white/10">
                    <div className="flex items-center gap-1.5 text-xs text-white/70 group-hover:text-white transition-colors">
                      <span>View Prototype</span>
                      <span>→</span>
                    </div>

                    <div className="flex items-center gap-2" onClick={(e) => e.stopPropagation()}>
                      {item.github && (
                        <a
                          href={item.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.drop(800)}
                          className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                          title="View on GitHub"
                        >
                          <Github className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {item.npm && (
                        <a
                          href={item.npm}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.drop(800)}
                          className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                          title="View on NPM"
                        >
                          <Package className="w-3.5 h-3.5" />
                        </a>
                      )}
                      {item.live && (
                        <a
                          href={item.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => sound.drop(800)}
                          className="p-1.5 rounded-full hover:bg-white/20 transition-colors text-white/80 hover:text-white"
                          title="View Live App"
                        >
                          <ExternalLink className="w-3.5 h-3.5" />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
