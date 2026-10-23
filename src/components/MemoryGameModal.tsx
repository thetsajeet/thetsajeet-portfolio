import React, { useState, useEffect } from 'react';
import { X, RotateCcw, Trophy, Sparkles } from 'lucide-react';
import confetti from 'canvas-confetti';
import { sound } from '../utils/sound';

interface CardItem {
  id: number;
  symbol: string;
  label: string;
  matched: boolean;
}

const SYMBOLS = [
  { symbol: '🎨', label: 'Design Tokens' },
  { symbol: '📐', label: 'Auto Layout' },
  { symbol: '✨', label: 'Motion Specs' },
  { symbol: '⚡', label: 'Performance' },
  { symbol: '🧩', label: 'Components' },
  { symbol: '🖋️', label: 'Bézier Curves' },
];

interface MemoryGameModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const MemoryGameModal: React.FC<MemoryGameModalProps> = ({ isOpen, onClose }) => {
  const [cards, setCards] = useState<CardItem[]>([]);
  const [flipped, setFlipped] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [isWon, setIsWon] = useState(false);

  const initGame = () => {
    const deck: CardItem[] = [];
    let id = 0;
    SYMBOLS.forEach((item) => {
      deck.push({ id: id++, symbol: item.symbol, label: item.label, matched: false });
      deck.push({ id: id++, symbol: item.symbol, label: item.label, matched: false });
    });
    // Shuffle
    const shuffled = deck.sort(() => Math.random() - 0.5);
    setCards(shuffled);
    setFlipped([]);
    setMoves(0);
    setIsWon(false);
  };

  useEffect(() => {
    if (isOpen) {
      initGame();
    }
  }, [isOpen]);

  const handleCardClick = (index: number) => {
    if (flipped.length === 2 || flipped.includes(index) || cards[index].matched) {
      return;
    }

    sound.tick();
    const newFlipped = [...flipped, index];
    setFlipped(newFlipped);

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      const [first, second] = newFlipped;
      if (cards[first].symbol === cards[second].symbol) {
        sound.drop(850);
        setTimeout(() => {
          sound.bubble();
          setCards(prev =>
            prev.map((card, i) =>
              i === first || i === second ? { ...card, matched: true } : card
            )
          );
          setFlipped([]);
        }, 500);
      } else {
        setTimeout(() => {
          setFlipped([]);
        }, 850);
      }
    }
  };

  // Check win condition
  useEffect(() => {
    if (cards.length > 0 && cards.every(c => c.matched)) {
      setIsWon(true);
      sound.chime();
      confetti({
        particleCount: 100,
        spread: 80,
        origin: { y: 0.6 }
      });
    }
  }, [cards]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg bg-white rounded-3xl shadow-2xl border border-neutral-200 p-6 sm:p-8 animate-in zoom-in-95 duration-300">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-neutral-200">
          <div>
            <span className="text-xs font-mono uppercase tracking-widest text-indigo-600 font-semibold">
              Designer Easter Egg
            </span>
            <h3 className="text-2xl font-bold tracking-tight text-neutral-900 mt-0.5">
              Design Systems Match
            </h3>
          </div>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="w-10 h-10 rounded-full hover:bg-neutral-100 flex items-center justify-center text-neutral-500 hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between py-4 text-xs font-mono uppercase text-neutral-500">
          <span>Moves: <strong className="text-neutral-900 font-bold">{moves}</strong></span>
          <button
            onClick={() => {
              sound.tick();
              initGame();
            }}
            className="flex items-center gap-1.5 text-neutral-600 hover:text-black transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Restart</span>
          </button>
        </div>

        {/* Victory state banner */}
        {isWon && (
          <div className="mb-6 p-4 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-between animate-in zoom-in-95 duration-300">
            <div className="flex items-center gap-3">
              <Trophy className="w-6 h-6 text-emerald-600" />
              <div>
                <div className="text-sm font-bold text-emerald-900">Perfection! All Pairs Matched</div>
                <div className="text-xs text-emerald-700">Completed in {moves} moves. You have an eye for systems!</div>
              </div>
            </div>
          </div>
        )}

        {/* Grid of Cards */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-3">
          {cards.map((card, idx) => {
            const isCardFlipped = flipped.includes(idx) || card.matched;

            return (
              <button
                key={card.id}
                onClick={() => handleCardClick(idx)}
                disabled={card.matched}
                className={`aspect-square rounded-2xl border flex flex-col items-center justify-center p-2 text-center transition-all duration-300 transform cursor-pointer ${
                  isCardFlipped
                    ? card.matched
                      ? 'bg-emerald-50 border-emerald-300 text-emerald-900 scale-95'
                      : 'bg-neutral-900 border-black text-white scale-100 shadow-md'
                    : 'bg-neutral-100 hover:bg-neutral-200 border-neutral-300 hover:scale-105'
                }`}
              >
                {isCardFlipped ? (
                  <>
                    <span className="text-2xl sm:text-3xl mb-1">{card.symbol}</span>
                    <span className="text-[10px] font-mono leading-tight uppercase font-medium">
                      {card.label}
                    </span>
                  </>
                ) : (
                  <span className="text-xs font-mono font-bold text-neutral-400">
                    ?
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Footer */}
        <div className="mt-6 pt-4 border-t border-neutral-100 flex items-center justify-between text-xs text-neutral-400 font-mono">
          <span>Match all tokens to win</span>
          <button
            onClick={() => {
              sound.tick();
              onClose();
            }}
            className="text-neutral-700 hover:text-black font-semibold"
          >
            Back to Portfolio
          </button>
        </div>
      </div>
    </div>
  );
};
