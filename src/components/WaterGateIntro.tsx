'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
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

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener('resize', handleResize);

    // Ripple simulation structure
    const ripples: Array<{
      x: number;
      y: number;
      radius: number;
      maxRadius: number;
      strength: number;
      speed: number;
    }> = [];

    const addRipple = (x: number, y: number, maxRadius = 140, strength = 0.45) => {
      ripples.push({
        x,
        y,
        radius: 0,
        maxRadius,
        strength,
        speed: 1.8 + Math.random() * 0.8,
      });
      if (ripples.length > 25) {
        ripples.shift();
      }
    };

    // Auto-create ambient gentle water drops
    let lastDropTime = performance.now();
    const render = (time: number) => {
      if (time - lastDropTime > 2200) {
        const randX = width * 0.2 + Math.random() * (width * 0.6);
        const randY = height * 0.25 + Math.random() * (height * 0.5);
        addRipple(randX, randY, 180, 0.25);
        lastDropTime = time;
      }

      ctx.clearRect(0, 0, width, height);

      // Subtle water shimmer gradient
      const grad = ctx.createRadialGradient(
        width / 2,
        height / 2,
        100,
        width / 2,
        height / 2,
        Math.max(width, height) * 0.7
      );
      grad.addColorStop(0, 'rgba(255, 255, 255, 0.95)');
      grad.addColorStop(1, 'rgba(245, 247, 250, 0.98)');
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, width, height);

      // Render concentric ripples
      for (let i = ripples.length - 1; i >= 0; i--) {
        const r = ripples[i];
        r.radius += r.speed;
        const progress = r.radius / r.maxRadius;
        const alpha = Math.max(0, (1 - progress) * r.strength);

        if (progress >= 1) {
          ripples.splice(i, 1);
          continue;
        }

        // Inner refracted ring
        ctx.beginPath();
        ctx.arc(r.x, r.y, r.radius, 0, Math.PI * 2);
        ctx.strokeStyle = `rgba(100, 116, 139, ${alpha * 0.5})`;
        ctx.lineWidth = 1.5;
        ctx.stroke();

        // Secondary subtle outer ring
        if (r.radius > 15) {
          ctx.beginPath();
          ctx.arc(r.x, r.y, r.radius - 10, 0, Math.PI * 2);
          ctx.strokeStyle = `rgba(148, 163, 184, ${alpha * 0.25})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    const handlePointerMove = (e: PointerEvent) => {
      if (Math.random() < 0.2) {
        addRipple(e.clientX, e.clientY, 80, 0.2);
      }
    };

    const handlePointerDown = (e: PointerEvent) => {
      addRipple(e.clientX, e.clientY, 200, 0.6);
      sound.drop(650 + Math.random() * 200);
    };

    canvas.addEventListener('pointermove', handlePointerMove);
    canvas.addEventListener('pointerdown', handlePointerDown);

    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationFrameId);
      canvas.removeEventListener('pointermove', handlePointerMove);
      canvas.removeEventListener('pointerdown', handlePointerDown);
    };
  }, [triggerEnter]);

  return (
    <div
      onClick={triggerEnter}
      className={`fixed inset-0 z-50 flex flex-col items-center justify-between bg-white text-neutral-800 select-none overflow-hidden cursor-pointer transition-all duration-600 ease-out ${
        isExiting ? 'opacity-0 -translate-y-8 blur-md pointer-events-none' : 'opacity-100 translate-y-0 blur-none'
      }`}
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
          <span>LIVE</span>
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

      </footer>
    </div>
  );
};
