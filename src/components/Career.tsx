import React from 'react';
import { MapPin } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';

const careerGradients = [
  'from-sky-500 via-blue-600 to-indigo-800',
  'from-emerald-400 via-teal-500 to-cyan-700',
  'from-violet-500 via-purple-600 to-indigo-800',
  'from-amber-400 via-orange-500 to-rose-600',
  'from-cyan-500 via-blue-600 to-slate-800'
];

export const Career: React.FC = () => {
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

        <div className="flex flex-col divide-y divide-neutral-200">
          {PORTFOLIO_DATA.workExperience.map((job, idx) => (
            <article
              key={`${job.company}-${job.role}-${idx}`}
              className="py-12 md:py-20"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-8 items-stretch">
                <div className="lg:col-span-4 flex flex-col justify-between gap-8">
                  <div>
                    <span className="text-xs font-mono uppercase text-neutral-400 tracking-wider">
                      0{idx + 1} / {job.company}
                    </span>
                    <h3 className="mt-3 text-2xl md:text-3xl font-medium tracking-tight text-neutral-900">
                      {job.project}
                    </h3>
                    <p className="mt-5 text-neutral-600 text-base leading-relaxed">
                      {job.highlights[0]}
                    </p>
                  </div>

                  <div className="pt-6 border-t border-neutral-100 flex flex-col gap-2 text-sm text-neutral-500">
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
                  <div className="relative w-full aspect-[4/5] rounded-3xl overflow-hidden bg-neutral-100 border border-neutral-200/80 shadow-sm">
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

                <div className="lg:col-span-3 flex flex-col justify-between gap-8 lg:pl-6 border-l lg:border-neutral-200 border-transparent">
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
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
