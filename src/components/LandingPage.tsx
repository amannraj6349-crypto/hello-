import React from 'react';
import { motion } from 'motion/react';
import { Heart, Sparkles, ArrowRight, Play } from 'lucide-react';
import { soundEngine } from '../utils/audio';

interface LandingPageProps {
  onStart: () => void;
  savedStage: number;
  onContinue: () => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onStart,
  savedStage,
  onContinue,
}) => {
  const handleStart = () => {
    soundEngine.playSparkleUnlock();
    onStart();
  };

  const handleContinue = () => {
    soundEngine.playHeartbeatEffect();
    onContinue();
  };

  return (
    <div className="w-full max-w-md mx-auto px-4 py-8 flex flex-col items-center justify-center text-center relative z-10 my-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="romantic-glass-card-bright rounded-[36px] p-8 sm:p-10 w-full relative overflow-hidden border border-rose-400/35 shadow-[0_25px_60px_rgba(255,77,109,0.35)]"
      >
        {/* Glow behind the icon */}
        <div className="absolute -top-16 -right-16 w-44 h-44 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-44 h-44 bg-pink-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Central Animated Heart Icon */}
        <motion.div
          className="relative z-10 mb-6 inline-flex"
          whileHover={{ scale: 1.08 }}
        >
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-600 via-rose-500 to-pink-500 flex items-center justify-center shadow-[0_0_40px_rgba(255,77,109,0.6)] animate-heartbeat">
            <Heart className="w-12 h-12 sm:w-14 sm:h-14 fill-white text-white" />
          </div>
        </motion.div>

        {/* Heading */}
        <div className="relative z-10 space-y-1 mb-4">
          <h1 className="font-serif-romantic italic text-4xl sm:text-5xl text-white font-normal tracking-tight drop-shadow-md">
            Hey Beautiful ❤️
          </h1>
          <p className="font-serif-romantic italic text-xl sm:text-2xl text-rose-200 font-light">
            I made a little journey for you...
          </p>
        </div>

        {/* Romantic intro lines */}
        <div className="relative z-10 p-5 rounded-2xl bg-black/30 border border-white/10 text-rose-100/90 text-sm sm:text-base leading-relaxed mb-8 backdrop-blur-md space-y-2">
          <p className="font-medium text-rose-200">15 little moments.</p>
          <p>15 reasons to remind you how special you are.</p>
          <p className="text-pink-200 font-medium pt-1">
            And one final surprise waiting at the end. 💕
          </p>
        </div>

        {/* Buttons */}
        <div className="relative z-10 space-y-3">
          {savedStage > 1 && savedStage <= 15 ? (
            <>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleContinue}
                id="btn-continue-journey"
                className="w-full py-4 px-6 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white shadow-[0_12px_30px_rgba(255,77,109,0.6)] hover:shadow-[0_15px_40px_rgba(255,77,109,0.8)] border border-pink-300/40 transition-all duration-200 cursor-pointer group"
              >
                <Play className="w-5 h-5 fill-white text-white" />
                <span>Continue Moment {savedStage} ❤️</span>
              </motion.button>

              <button
                onClick={handleStart}
                id="btn-start-over"
                className="w-full py-2.5 px-4 rounded-full text-xs text-rose-300/70 hover:text-rose-200 hover:bg-white/5 transition-colors cursor-pointer"
              >
                Start from beginning
              </button>
            </>
          ) : (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleStart}
              id="btn-start-journey"
              className="w-full py-4 px-6 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 text-white shadow-[0_12px_30px_rgba(255,77,109,0.55)] hover:shadow-[0_15px_40px_rgba(255,77,109,0.75)] border border-pink-300/40 transition-all duration-200 cursor-pointer group"
            >
              <span>Start Our Journey ❤️</span>
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            </motion.button>
          )}
        </div>

        {/* Small subtle footer note */}
        <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-center gap-2 text-rose-300/50 text-xs">
          <Sparkles className="w-3.5 h-3.5 text-rose-400" />
          <span>Made with all my love, just for you</span>
        </div>
      </motion.div>
    </div>
  );
};
