import React from 'react';
import { X, Download, ExternalLink, Briefcase, GraduationCap, Award, Code2 } from 'lucide-react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { sound } from '../utils/sound';

interface ResumeModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const ResumeModal: React.FC<ResumeModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 md:p-10 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-white rounded-3xl shadow-2xl border border-neutral-200 overflow-hidden my-auto max-h-[92vh] flex flex-col">
        {/* Sticky Header */}
        <div className="flex items-center justify-between px-6 sm:px-8 py-5 border-b border-neutral-200 bg-white/95 sticky top-0 z-20">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
              Curriculum Vitae
            </span>
            <h3 className="text-xl font-bold tracking-tight text-neutral-900">
              {PORTFOLIO_DATA.profile.name} · {PORTFOLIO_DATA.profile.role}
            </h3>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={PORTFOLIO_DATA.profile.resumeUrl}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => sound.chime()}
              className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider flex items-center gap-1.5 hover:bg-black transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </a>
            <button
              onClick={() => {
                sound.tick();
                onClose();
              }}
              className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Resume Content Body */}
        <div className="overflow-y-auto p-6 sm:p-10 space-y-10 text-neutral-800">
          {/* Executive Summary */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-2">
              Summary
            </h4>
            <p className="text-neutral-700 leading-relaxed text-base sm:text-lg">
              {PORTFOLIO_DATA.profile.bio}
            </p>
          </div>

          {/* Work Experience */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-6 flex items-center gap-2">
              <Briefcase className="w-4 h-4 text-neutral-900" />
              <span>Experience</span>
            </h4>

            <div className="space-y-8 border-l-2 border-neutral-200 pl-6 ml-2">
              {PORTFOLIO_DATA.workExperience.map((job, idx) => (
                <div key={idx} className="relative">
                  <div
                    className={`absolute -left-[31px] top-1.5 w-3 h-3 rounded-full ${
                      idx === 0 ? 'bg-neutral-900' : 'bg-neutral-400'
                    }`}
                  ></div>
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between text-sm">
                    <strong className="text-base font-semibold text-neutral-900">
                      {job.role}
                    </strong>
                    <span className="font-mono text-neutral-500 text-xs">
                      {job.period}
                    </span>
                  </div>
                  <div className="text-xs font-medium text-indigo-600 mt-0.5">
                    {job.company} · {job.location}
                  </div>
                  <ul className="mt-3 space-y-1.5 text-sm text-neutral-600 list-disc list-inside">
                    {job.highlights.map((h, hi) => (
                      <li key={hi} className="leading-relaxed">
                        {h}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-4 flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-neutral-900" />
              <span>Education</span>
            </h4>

            <div className="p-5 rounded-2xl bg-neutral-50 border border-neutral-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between">
                <span className="font-semibold text-neutral-900 text-base">
                  {PORTFOLIO_DATA.education.institution}
                </span>
                <span className="text-xs font-mono text-neutral-500">
                  {PORTFOLIO_DATA.education.period}
                </span>
              </div>
              <div className="text-sm font-medium text-neutral-700 mt-0.5">
                {PORTFOLIO_DATA.education.degree}
              </div>
              <ul className="mt-3 space-y-1 text-sm text-neutral-600 list-disc list-inside">
                {PORTFOLIO_DATA.education.highlights.map((eh, ei) => (
                  <li key={ei}>{eh}</li>
                ))}
              </ul>
            </div>
          </div>

          {/* Technical Skills */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
              <Code2 className="w-4 h-4 text-neutral-900" />
              <span>Skills & Technologies</span>
            </h4>

            <div className="flex flex-wrap gap-2">
              {PORTFOLIO_DATA.skills.map((s, si) => (
                <span
                  key={si}
                  className="px-3 py-1 text-xs rounded-full bg-neutral-100 text-neutral-800 border border-neutral-200 font-mono"
                >
                  {s}
                </span>
              ))}
            </div>
          </div>

          {/* Honors & Awards */}
          <div>
            <h4 className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 flex items-center gap-2">
              <Award className="w-4 h-4 text-neutral-900" />
              <span>Honors & Awards</span>
            </h4>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {PORTFOLIO_DATA.awards.map((a, ai) => (
                <div key={ai} className="p-3.5 rounded-xl bg-neutral-50 border border-neutral-200 text-xs">
                  <div className="font-semibold text-neutral-900">{a.title}</div>
                  <div className="text-neutral-500 mt-0.5 font-mono">{a.year} · {a.organization}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Modal Footer */}
        <div className="p-5 border-t border-neutral-200 bg-neutral-50 flex items-center justify-between">
          <a
            href={PORTFOLIO_DATA.profile.resumeUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs font-mono text-indigo-600 hover:underline flex items-center gap-1"
          >
            <span>Open raw PDF in new tab</span>
            <ExternalLink className="w-3 h-3" />
          </a>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="px-5 py-2 rounded-full bg-neutral-900 text-white text-xs font-mono uppercase tracking-wider hover:bg-black transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};
