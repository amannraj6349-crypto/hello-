import React, { useState, useEffect, useCallback } from 'react';

interface Sparkle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  size: number;
}

const EMOJIS = ['❤️', '💖', '✨', '💕', '🌸', '🤍', '💗'];

export const InteractiveSparkles: React.FC = () => {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  const addSparkle = useCallback((x: number, y: number) => {
    const newSparkles: Sparkle[] = Array.from({ length: 3 }).map((_, i) => ({
      id: Date.now() + Math.random() + i,
      x: x + (Math.random() * 30 - 15),
      y: y + (Math.random() * 20 - 10),
      emoji: EMOJIS[Math.floor(Math.random() * EMOJIS.length)],
      size: Math.floor(Math.random() * 10) + 14,
    }));

    setSparkles((prev) => [...prev.slice(-15), ...newSparkles]);
  }, []);

  useEffect(() => {
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      let clientX = 0;
      let clientY = 0;
      if ('touches' in e && e.touches.length > 0) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ('clientX' in e) {
        clientX = (e as MouseEvent).clientX;
        clientY = (e as MouseEvent).clientY;
      }
      if (clientX || clientY) {
        addSparkle(clientX, clientY);
      }
    };

    window.addEventListener('pointerdown', handlePointerDown);
    return () => window.removeEventListener('pointerdown', handlePointerDown);
  }, [addSparkle]);

  useEffect(() => {
    if (sparkles.length === 0) return;
    const timer = setTimeout(() => {
      setSparkles((prev) => prev.slice(1));
    }, 900);
    return () => clearTimeout(timer);
  }, [sparkles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {sparkles.map((s) => (
        <span
          key={s.id}
          className="absolute select-none pointer-events-none animate-sparkle-float transition-all"
          style={{
            left: `${s.x}px`,
            top: `${s.y}px`,
            fontSize: `${s.size}px`,
            transform: 'translate(-50%, -50%)',
          }}
        >
          {s.emoji}
        </span>
      ))}
      <style>{`
        @keyframes sparkleFloat {
          0% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(0.6) translateY(0);
          }
          50% {
            opacity: 0.9;
            transform: translate(-50%, -50%) scale(1.2) translateY(-25px);
          }
          100% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.8) translateY(-55px);
          }
        }
        .animate-sparkle-float {
          animation: sparkleFloat 0.9s ease-out forwards;
        }
      `}</style>
    </div>
  );
};
