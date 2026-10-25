import React, { useEffect, useState } from 'react';
import { PORTFOLIO_DATA } from '../data/portfolio';
import { ArrowUpRight } from 'lucide-react';
import { sound } from '../utils/sound';

interface FooterProps {
  onOpenGame?: () => void;
  onOpenResume?: () => void;
  onNavigate?: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onOpenGame, onOpenResume, onNavigate }) => {
  const [localTime, setLocalTime] = useState<string>('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const formatted = new Intl.DateTimeFormat('en-US', {
        timeZone: 'Asia/Kolkata',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      }).format(now);
      setLocalTime(formatted);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleLinkClick = () => {
    sound.tick();
    onNavigate?.();
  };

  return (
    <footer className="w-full pt-20 pb-12 bg-white text-neutral-900 border-t border-neutral-200">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        {/* Main Footer Sitemap Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 pb-16 border-b border-neutral-200">
          {/* Brand & Mission (Col 1-5) */}
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              {/* User SVG Logo */}
              <div className="mb-6">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 10 45 40.349998474121094"
                  data-asc="0.92"
                  width="45"
                  height="40.35"
                  className="w-12 h-11"
                  fill="#000000"
                >
                  <g fill="#000000">
                    <g transform="translate(0, 0)">
                      <path d="M5.90 50.35Q3.65 50.35 2.80 49.35Q1.95 48.35 1.95 46.80Q1.95 45.35 2.55 43.35Q3.15 41.35 3.80 39.50Q4.65 37.05 5.85 33.75Q7.05 30.45 8.43 26.85Q9.80 23.25 11.23 19.75Q12.65 16.25 14 13.40Q10.55 13.45 8.23 13.55Q5.90 13.65 4.05 13.82Q2.20 14 0 14.40Q0.15 12.70 1.75 11.75Q3.35 10.80 6.05 10.40Q8.75 10 12.20 10Q15.65 10 18.38 10.27Q21.10 10.55 23.50 10.80Q25.90 11.05 28.30 11.10Q26.60 12.65 24.40 13.05Q22.20 13.45 19.75 13.45Q19.20 13.45 18.60 13.42Q18.00 13.40 17.40 13.40Q16.80 13.40 16.20 13.40Q14.60 17.40 12.53 23.50Q10.45 29.60 8.35 37.25Q7.65 39.90 7.08 42Q6.50 44.10 6.17 45.85Q5.85 47.60 5.85 49.25Q5.85 49.50 5.85 49.80Q5.85 50.10 5.90 50.35ZM30.55 50.35Q27.85 50.35 25.45 49.38Q23.05 48.40 21.58 46.40Q20.10 44.40 20.10 41.40Q20.10 38.80 21.13 37.35Q22.15 35.90 23.65 35.30Q25.15 34.70 26.50 34.70Q25.15 36.15 24.45 37.90Q23.75 39.65 23.75 41.40Q23.75 43.25 24.58 44.85Q25.40 46.45 27.10 47.42Q28.80 48.40 31.40 48.40Q33.65 48.40 35.80 47.58T39.33 45.13Q40.70 43.50 40.70 41.10Q40.70 38.95 39.60 37.40Q38.50 35.85 36.78 34.65Q35.05 33.45 33.10 32.35Q31.15 31.25 29.43 30.02Q27.70 28.80 26.60 27.20Q25.50 25.60 25.50 23.35Q25.50 21.25 26.50 18.95Q27.50 16.65 29.38 14.60Q31.25 12.55 33.88 11.27Q36.50 10 39.75 10Q42.70 10 43.85 11.42Q45 12.85 45 15Q45 16.80 44.38 18.88Q43.75 20.95 42.85 22.82Q41.95 24.70 41.15 26Q40.25 25.80 39.88 25.22Q39.50 24.65 39.50 23.85Q39.50 22.80 39.95 21.45Q40.40 20.10 40.98 18.65Q41.55 17.20 42 15.82Q42.45 14.45 42.45 13.35Q42.45 12.35 41.85 11.77Q41.25 11.20 39.65 11.20Q37.30 11.20 35.30 12.30Q33.30 13.40 31.80 15.13Q30.30 16.85 29.48 18.75Q28.65 20.65 28.65 22.20Q28.65 24.05 29.73 25.38Q30.80 26.70 32.50 27.77Q34.20 28.85 36.13 29.93Q38.05 31 39.75 32.30Q41.45 33.60 42.53 35.38Q43.60 37.15 43.60 39.70Q43.60 42.30 42.45 44.27Q41.30 46.25 39.38 47.60Q37.45 48.95 35.15 49.65Q32.85 50.35 30.55 50.35Z" />
                      </g>
                    </g>
                  </svg>
                </div>
                <p className="text-neutral-600 text-sm max-w-sm leading-relaxed">
                  Senior Software Engineer working across UI, backend and Agentic AI.
                </p>
              </div>

              <div className="mt-8 flex items-center gap-2.5 text-xs font-mono uppercase tracking-wider text-neutral-500">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>INDIA · {localTime || '11:45 AM'} (IST)</span>
              </div>
            </div>

            {/* Sitemap (Col 6-8) */}
            <div className="lg:col-span-3 flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Sitemap
              </span>
              <ul className="space-y-3 text-sm text-neutral-700 font-medium">
                <li>
                  <a
                    href="#works"
                    onClick={handleLinkClick}
                    className="hover:text-black transition-colors"
                  >
                    Career
                  </a>
                </li>
                <li>
                  <a
                    href="#projects"
                    onClick={handleLinkClick}
                    className="hover:text-black transition-colors"
                  >
                    Projects
                  </a>
                </li>
                <li>
                  <a
                    href="#about"
                    onClick={handleLinkClick}
                    className="hover:text-black transition-colors"
                  >
                    About Me
                  </a>
                </li>
                <li>
                  <a
                    href="#contact"
                    onClick={handleLinkClick}
                    className="hover:text-black transition-colors"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Explore (Col 9-10) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Explore
              </span>
              <ul className="space-y-3 text-sm text-neutral-700 font-medium">
                <li>
                  <button
                    onClick={() => {
                      handleLinkClick();
                      onOpenGame?.();
                    }}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Play Game
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => {
                      handleLinkClick();
                      onOpenResume?.();
                    }}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Resume PDF
                  </button>
                </li>
                <li>
                  <a
                    href="#top"
                    onClick={handleLinkClick}
                    className="hover:text-black transition-colors"
                  >
                    Water Surface
                  </a>
                </li>
              </ul>
            </div>

            {/* Connect (Col 11-12) */}
            <div className="lg:col-span-2 flex flex-col gap-4">
              <span className="text-xs font-mono uppercase tracking-widest text-neutral-400">
                Connect
              </span>
              <ul className="space-y-3 text-sm text-neutral-700 font-medium">
                <li>
                  <a
                    href={PORTFOLIO_DATA.profile.links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>GitHub</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </li>
                <li>
                  <a
                    href={PORTFOLIO_DATA.profile.links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>LinkedIn</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </li>
                <li>
                  <a
                    href={PORTFOLIO_DATA.profile.links.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-black transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Twitter / X</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </li>
                <li>
                  <a
                    href={`mailto:${PORTFOLIO_DATA.profile.email}`}
                    className="hover:text-black transition-colors inline-flex items-center gap-1.5"
                  >
                    <span>Email</span>
                    <ArrowUpRight className="w-3.5 h-3.5 text-neutral-400" />
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Clean Copyright Bar strictly as requested */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs font-mono text-neutral-500">
            <div>
              © {new Date().getFullYear()} {PORTFOLIO_DATA.profile.copyrightName || "T S Ajeet"}
            </div>
          </div>
        </div>
      </footer>
  );
};
