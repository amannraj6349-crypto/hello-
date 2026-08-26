import React, { useState, useEffect } from 'react';
import { Volume2, VolumeX, Music } from 'lucide-react';
import { soundEngine } from '../utils/audio';
import { MUSIC_FILE } from '../config';

export const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    // Check status
    setIsPlaying(soundEngine.getIsPlaying());
  }, []);

  const handleToggle = () => {
    setHasInteracted(true);
    const newState = soundEngine.toggleMusic(MUSIC_FILE, (playing) => {
      setIsPlaying(playing);
    });
    setIsPlaying(newState);
  };

  return (
    <div className="fixed bottom-5 right-5 z-40 flex items-center gap-2">
      <button
        onClick={handleToggle}
        id="btn-music-toggle"
        aria-label={isPlaying ? 'Pause romantic song' : 'Play romantic song'}
        className={`group flex items-center gap-2 px-3.5 py-2.5 rounded-full backdrop-blur-md border transition-all duration-300 shadow-lg ${
          isPlaying
            ? 'bg-rose-500/20 border-rose-400/40 text-rose-200 shadow-rose-950/50 ring-2 ring-rose-500/30'
            : 'bg-white/10 border-white/15 text-rose-200/80 hover:bg-white/15 hover:text-white'
        }`}
      >
        <div className="relative flex items-center justify-center">
          {isPlaying ? (
            <div className="flex items-center gap-0.5 h-4">
              <span className="w-1 bg-rose-400 rounded-full animate-[bounce_1s_infinite_100ms] h-3.5"></span>
              <span className="w-1 bg-rose-300 rounded-full animate-[bounce_1s_infinite_300ms] h-4"></span>
              <span className="w-1 bg-rose-400 rounded-full animate-[bounce_1s_infinite_200ms] h-2.5"></span>
            </div>
          ) : (
            <Music className="w-4 h-4 text-rose-400 transition-transform group-hover:scale-110" />
          )}
        </div>

        <span className="text-xs font-medium tracking-wide">
          {isPlaying ? 'Playing Our Song' : '🎵 Play Our Song'}
        </span>

        {isPlaying ? (
          <Volume2 className="w-3.5 h-3.5 text-rose-300 opacity-80" />
        ) : (
          <VolumeX className="w-3.5 h-3.5 text-rose-300/60 opacity-70" />
        )}
      </button>

      {!hasInteracted && !isPlaying && (
        <span className="hidden sm:inline-block text-[11px] text-rose-300/60 animate-pulse italic">
          tap for music ✨
        </span>
      )}
    </div>
  );
};
