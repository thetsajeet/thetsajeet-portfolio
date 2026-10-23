import React from 'react';

/**
 * Testimonials Section
 * NOTE: Commented out per user request; will be activated at a later stage.
 */

/*
import { useRef } from 'react';
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { sound } from '../utils/sound';

export const TestimonialsActive: React.FC = () => {
  const scrollRef = useRef<HTMLDivElement | null>(null);

  const scroll = (direction: 'left' | 'right') => {
    sound.tick();
    if (scrollRef.current) {
      const offset = direction === 'left' ? -480 : 480;
      scrollRef.current.scrollBy({ left: offset, behavior: 'smooth' });
    }
  };

  return (
    <section className="w-full py-20 md:py-32 border-b border-neutral-200 overflow-hidden bg-white">
      <div className="max-w-[1340px] mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-16">
          <div className="max-w-2xl">
            <span className="text-xs font-mono uppercase tracking-widest text-neutral-400 mb-3 block">
              Validation & Recommendations
            </span>
            <h2 className="text-3xl md:text-5xl font-medium tracking-tight text-neutral-900 leading-tight">
              What collaborators say
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
};
*/

export const Testimonials: React.FC = () => {
  // Commented out per user request - returns null until re-enabled
  return null;
};
