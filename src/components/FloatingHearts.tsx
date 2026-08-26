import React, { useMemo } from 'react';

interface HeartParticle {
  id: number;
  left: number;
  size: number;
  duration: number;
  delay: number;
  opacity: number;
  symbol: string;
}

export const FloatingHearts: React.FC = () => {
  const hearts = useMemo<HeartParticle[]>(() => {
    const symbols = ['❤️', '💖', '💕', '✨', '🌸', '🤍', '💗'];
    return Array.from({ length: 18 }).map((_, i) => ({
      id: i,
      left: Math.floor(Math.random() * 96) + 2,
      size: Math.floor(Math.random() * 16) + 14,
      duration: Math.floor(Math.random() * 12) + 14,
      delay: Math.floor(Math.random() * 15),
      opacity: Math.random() * 0.35 + 0.15,
      symbol: symbols[Math.floor(Math.random() * symbols.length)],
    }));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      {hearts.map((h) => (
        <div
          key={h.id}
          className="absolute select-none transition-transform"
          style={{
            left: `${h.left}%`,
            bottom: '-40px',
            fontSize: `${h.size}px`,
            opacity: h.opacity,
            animation: `floatUpward ${h.duration}s infinite linear`,
            animationDelay: `${h.delay}s`,
          }}
        >
          {h.symbol}
        </div>
      ))}
      <style>{`
        @keyframes floatUpward {
          0% {
            transform: translateY(0) translateX(0) scale(0.8) rotate(0deg);
            opacity: 0;
          }
          10% {
            opacity: var(--tw-opacity, 0.4);
          }
          50% {
            transform: translateY(-50vh) translateX(${Math.random() > 0.5 ? '25px' : '-25px'}) scale(1.1) rotate(15deg);
          }
          90% {
            opacity: var(--tw-opacity, 0.4);
          }
          100% {
            transform: translateY(-110vh) translateX(${Math.random() > 0.5 ? '-30px' : '30px'}) scale(0.9) rotate(-15deg);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  );
};
