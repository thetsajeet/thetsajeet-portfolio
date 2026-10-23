import React from 'react';
import { Layers, Server, BrainCircuit, Sparkles, Layout, Cpu } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { sound } from '../utils/sound';

export const Pillars: React.FC = () => {
  const getIcon = (id: string) => {
    switch (id) {
      case 'ui-architecture':
        return <Layout className="w-6 h-6 text-neutral-900" />;
      case 'backend-distributed':
        return <Server className="w-6 h-6 text-neutral-900" />;
      case 'agentic-ai':
        return <BrainCircuit className="w-6 h-6 text-neutral-900" />;
      default:
        return <Cpu className="w-6 h-6 text-neutral-900" />;
    }
  };

  return (
    <section className="w-full border-b border-neutral-200 py-16 md:py-20">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-neutral-200">
          {PORTFOLIO_DATA.pillars.map((pillar, idx) => (
            <div
              key={pillar.id}
              onMouseEnter={() => sound.tick()}
              className={`flex flex-col gap-5 pt-8 md:pt-0 ${
                idx > 0 ? 'md:pl-10' : ''
              } ${idx < 2 ? 'md:pr-10' : ''} group`}
            >
              <div className="flex items-center justify-between">
                <div className="w-14 h-14 rounded-2xl bg-[#ebebeb] flex items-center justify-center group-hover:scale-105 group-hover:bg-neutral-200 transition-all duration-300">
                  {getIcon(pillar.id)}
                </div>
                <span className="text-xs font-mono font-medium text-neutral-400 uppercase tracking-widest">
                  {pillar.badge}
                </span>
              </div>

              <h2 className="text-2xl font-medium tracking-tight text-neutral-900 group-hover:translate-x-1 transition-transform duration-300">
                {pillar.title}
              </h2>

              <p className="text-neutral-600 text-base leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
