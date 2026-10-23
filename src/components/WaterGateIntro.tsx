import React, { useEffect, useRef, useState, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { sound } from '../utils/sound';

interface WaterGateIntroProps {
  onEnter: () => void;
}

export const WaterGateIntro: React.FC<WaterGateIntroProps> = ({ onEnter }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isExiting, setIsExiting] = useState(false);

  const triggerEnter = useCallback(() => {
    if (isExiting) return;
    setIsExiting(true);
    sound.bubble();
    setTimeout(() => {
      sound.whoosh();
      onEnter();
    }, 550);
  }, [isExiting, onEnter]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Enter' || e.key === ' ') {
        triggerEnter();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [triggerEnter]);

  // Water Ripple and Caustics Canvas Simulation (pure aesthetic water physics, no drawing required)
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const ripples: Array<{ x: number; y: number; r: number; maxR: number; alpha: number }> = [];

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    const addRipple = (x: number, y: number) => {
      ripples.push({
        x,
        y,
        r: 6,
        maxR: 90 + Math.random() * 50,
        alpha: 0.38
      });
      if (ripples.length > 25) ripples.shift();
    };

    let time = 0;
    const render = () => {
      time += 0.02;
      ctx.clearRect(0, 0, width, height);

      // Subtle ambient caustic light on shallow water floor
      ctx.fillStyle = '#ffffff';
      ctx.fillRect(0, 0, width, height);

      // Render gentle caustic grid lines
      ctx.strokeStyle = 'rgba(235, 238, 242, 0.45)';
      ctx.lineWidth = 1;
      const step = 40;
      for (let x = 0; x < width; x += step) {
        ctx.beginPath();
        for (let y = 0; y < height; y += 20) {
          const waveX = x + Math.sin(y * 0.02 + time) * 8 + Math.cos(time * 0.5) * 4;
          if (y === 0) ctx.moveTo(waveX, y);
          else ctx.lineTo(waveX, y);
        }
        ctx.stroke();
      }

      // Render ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const rp = ripples[i];
        rp.r += 1.8;
        rp.alpha *= 0.96;

        ctx.save();
        ctx.strokeStyle = `rgba(180, 195, 210, ${rp.alpha})`;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, rp.r, 0, Math.PI * 2);
        ctx.stroke();

        ctx.strokeStyle = `rgba(200, 215, 230, ${rp.alpha * 0.5})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.arc(rp.x, rp.y, Math.max(0, rp.r - 12), 0, Math.PI * 2);
        ctx.stroke();
        ctx.restore();

        if (rp.alpha < 0.01 || rp.r > rp.maxR) {
          ripples.splice(i, 1);
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    const handlePointerMove = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      if (Math.random() < 0.3) {
        addRipple(x, y);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      addRipple(e.clientX - rect.left, e.clientY - rect.top);
      sound.drop(560 + Math.random() * 180);
      triggerEnter();
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('resize', handleResize);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [triggerEnter]);

  return (
    <AnimatePresence>
      {!isExiting && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            y: -40,
            filter: 'blur(10px)',
            transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] }
          }}
          onClick={triggerEnter}
          className="fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-neutral-800 select-none overflow-hidden cursor-pointer"
        >
          {/* Water Canvas */}
          <canvas
            ref={canvasRef}
            className="absolute inset-0 w-full h-full cursor-pointer"
          />

          {/* Top minimal status: "Portfolio" on left, "Indicator · Site Live" on right */}
          <header className="relative z-10 w-full max-w-6xl px-6 pt-10 flex justify-between items-center text-xs tracking-widest uppercase text-neutral-400 font-mono">
            <span>PORTFOLIO</span>
            <span className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              <span>INDICATOR · SITE LIVE</span>
            </span>
          </header>

          {/* Central Monogram "TS" Initials with Water Halo */}
          <div className="relative z-10 flex flex-col items-center justify-center group pointer-events-none">
            <div className="relative w-64 h-64 md:w-80 md:h-80 flex items-center justify-center">
              {/* Diffuse water glow behind initials */}
              <div className="absolute inset-0 bg-neutral-100/60 rounded-full blur-2xl group-hover:scale-110 transition-transform duration-700 ease-out"></div>

              {/* Monogram "TS" Initials */}
              <div className="relative flex items-center justify-center select-none">
                <span
                  className="text-7xl md:text-9xl font-bold tracking-tight text-neutral-300 font-mono transition-colors duration-500 filter drop-shadow-sm group-hover:text-neutral-500"
                  style={{ fontFamily: "'Press Start 2P', 'Space Mono', monospace" }}
                >
                  TS
                </span>
              </div>

              {/* Ambient circular water line */}
              <div className="absolute inset-0 border border-neutral-200/80 rounded-full scale-90 group-hover:scale-105 transition-all duration-700"></div>
            </div>
          </div>

          {/* Bottom Interactive Prompt */}
          <footer className="relative z-10 w-full max-w-6xl px-6 pb-12 flex flex-col items-center text-center gap-3">
            <p className="text-sm md:text-base font-normal tracking-wide text-neutral-600">
              Press <kbd className="px-2 py-0.5 rounded bg-neutral-100 border border-neutral-300 text-black font-mono text-xs shadow-xs">Enter</kbd> or click anywhere to explore
            </p>

            <button
              onClick={(e) => {
                e.stopPropagation();
                triggerEnter();
              }}
              className="mt-3 text-xs underline decoration-neutral-300 hover:decoration-black underline-offset-4 text-neutral-400 hover:text-black transition-colors cursor-pointer py-1"
            >
              Slow connection? Open the light version
            </button>
          </footer>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
