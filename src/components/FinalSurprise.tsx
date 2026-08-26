import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { Heart, Sparkles, RotateCcw, Image as ImageIcon, Award, Gift, RefreshCw, Star } from 'lucide-react';
import { PHOTO_MEMORIES, FINAL_LOVE_LETTER, PARTNER_NAME, LOVE_JAR_NOTES, MemoryPhoto } from '../config';
import { soundEngine } from '../utils/audio';

interface FinalSurpriseProps {
  onReplay: () => void;
}

export const FinalSurprise: React.FC<FinalSurpriseProps> = ({ onReplay }) => {
  const [countdown, setCountdown] = useState<number | null>(null);
  const [isRevealed, setIsRevealed] = useState(false);
  const [flippedPhotoId, setFlippedPhotoId] = useState<string | null>(null);
  const [selectedPhoto, setSelectedPhoto] = useState<MemoryPhoto | null>(null);
  const [currentJarNoteIndex, setCurrentJarNoteIndex] = useState<number>(0);
  const [isJarNoteAnimating, setIsJarNoteAnimating] = useState(false);

  // Trigger countdown sequence
  const startCountdown = () => {
    setCountdown(3);
    soundEngine.playHeartbeatEffect();
  };

  const drawNextJarNote = () => {
    soundEngine.playSparkleUnlock();
    setIsJarNoteAnimating(true);
    setTimeout(() => {
      setCurrentJarNoteIndex((prev) => (prev + 1) % LOVE_JAR_NOTES.length);
      setIsJarNoteAnimating(false);
    }, 200);
  };

  useEffect(() => {
    if (countdown === null) return;

    if (countdown > 1) {
      const timer = setTimeout(() => {
        setCountdown((prev) => (prev !== null ? prev - 1 : null));
        soundEngine.playHeartbeatEffect();
      }, 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 1) {
      const timer = setTimeout(() => {
        setCountdown(0);
        setIsRevealed(true);
        soundEngine.playSparkleUnlock();

        // Big celebration confetti burst
        try {
          const end = Date.now() + 3500;
          const colors = ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#c9184a', '#ffd166', '#ff85a1'];

          (function frame() {
            confetti({
              particleCount: 6,
              angle: 60,
              spread: 60,
              origin: { x: 0 },
              colors: colors,
            });
            confetti({
              particleCount: 6,
              angle: 120,
              spread: 60,
              origin: { x: 1 },
              colors: colors,
            });

            if (Date.now() < end) {
              requestAnimationFrame(frame);
            }
          })();
        } catch {
          // ignore
        }
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // Phase 1: Dramatic Locked Teaser Screen
  if (!isRevealed) {
    return (
      <div className="w-full max-w-md mx-auto px-4 py-6 text-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          className="romantic-glass-card-bright rounded-[36px] p-8 sm:p-10 relative overflow-hidden border border-rose-400/40 shadow-[0_20px_60px_rgba(255,77,109,0.3)]"
        >
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-rose-500/25 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-20 -left-20 w-48 h-48 bg-purple-500/20 rounded-full blur-3xl pointer-events-none" />

          {countdown === null ? (
            <div className="space-y-6 relative z-10">
              <motion.div
                whileHover={{ scale: 1.05 }}
                className="inline-flex p-4 rounded-full bg-rose-500/20 border border-rose-400/40 text-rose-300 shadow-[0_0_30px_rgba(255,77,109,0.5)]"
              >
                <Heart className="w-12 h-12 fill-rose-500 text-rose-400 animate-pulse" />
              </motion.div>

              <div className="space-y-2">
                <span className="text-xs uppercase tracking-[0.3em] text-rose-300 font-bold px-3 py-1 rounded-full bg-rose-500/10 border border-rose-400/20">
                  The Grand Finale • Stage 15
                </span>
                <h2 className="font-serif-romantic italic text-3xl sm:text-4xl text-white font-medium tracking-tight">
                  ONE LAST THING...
                </h2>
              </div>

              <div className="p-5 rounded-2xl bg-black/30 border border-white/10 text-rose-100/90 leading-relaxed font-light text-base sm:text-lg space-y-3 backdrop-blur-md">
                <p>You've unlocked every little piece of this journey.</p>
                <p className="font-serif-romantic italic text-xl text-rose-200 font-normal">
                  "But I saved the most important thing for last. ❤️"
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={startCountdown}
                id="btn-reveal-final"
                className="w-full py-4 px-6 rounded-full font-bold text-lg flex items-center justify-center gap-3 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white shadow-[0_12px_35px_rgba(255,77,109,0.6)] hover:shadow-[0_15px_45px_rgba(255,77,109,0.8)] border border-pink-300/40 transition-all duration-300 cursor-pointer"
              >
                <Sparkles className="w-5 h-5 text-rose-200 animate-spin" />
                <span>Reveal The Final Surprise ❤️</span>
              </motion.button>
            </div>
          ) : (
            <div className="py-12 space-y-6 relative z-10 flex flex-col items-center justify-center">
              <span className="text-xs uppercase tracking-[0.25em] text-rose-300/80 font-medium">
                Opening your final surprise in...
              </span>

              <motion.div
                key={countdown}
                initial={{ scale: 1.6, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.5, opacity: 0 }}
                transition={{ duration: 0.4 }}
                className="w-28 h-28 rounded-full bg-rose-500/25 border-2 border-rose-400/60 flex items-center justify-center shadow-[0_0_50px_rgba(255,77,109,0.7)]"
              >
                <span className="font-serif-romantic italic text-6xl font-bold text-white drop-shadow-[0_0_15px_rgba(255,77,109,0.8)]">
                  {countdown}
                </span>
              </motion.div>

              <p className="text-sm text-rose-200/80 italic">
                Hold your breath... ❤️
              </p>
            </div>
          )}
        </motion.div>
      </div>
    );
  }

  // Phase 2: Grand Revealed Romantic Section
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-lg mx-auto px-4 py-4 space-y-8 pb-24"
    >
      {/* Grand Beating Heart Card */}
      <div className="romantic-glass-card-bright rounded-[36px] p-6 sm:p-10 text-center relative overflow-hidden border border-rose-400/50 shadow-[0_25px_70px_rgba(255,77,109,0.35)]">
        {/* Glow backdrop */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-rose-500/20 rounded-full blur-3xl pointer-events-none" />

        {/* Floating Heart Icon */}
        <div className="relative z-10 mb-4 inline-block">
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-gradient-to-tr from-rose-600 to-pink-500 flex items-center justify-center shadow-[0_0_50px_rgba(255,77,109,0.8)] animate-heartbeat">
            <Heart className="w-14 h-14 sm:w-16 sm:h-16 fill-white text-white" />
          </div>
        </div>

        <div className="relative z-10 space-y-2 mb-6">
          <span className="text-xs uppercase tracking-[0.25em] text-rose-300 font-semibold px-3.5 py-1 rounded-full bg-rose-500/15 border border-rose-400/30">
            Forever & Always
          </span>
          <h2 className="font-serif-romantic italic text-3xl sm:text-4xl text-white font-normal drop-shadow-md">
            For You, My {PARTNER_NAME} ❤️
          </h2>
        </div>

        {/* Personal Love Letter Card */}
        <div className="relative z-10 rounded-2xl bg-black/40 border border-rose-400/25 p-6 sm:p-8 text-left space-y-5 backdrop-blur-md shadow-inner">
          <p className="font-serif-romantic italic text-xl sm:text-2xl text-rose-100 leading-snug">
            "{FINAL_LOVE_LETTER.header}"
          </p>

          <p className="text-rose-200/90 text-base leading-relaxed font-light">
            {FINAL_LOVE_LETTER.intro}
          </p>

          <div className="py-2 border-y border-rose-400/20 space-y-2">
            <p className="text-sm font-medium text-rose-300">
              {FINAL_LOVE_LETTER.reasonsPrompt}
            </p>
            <ul className="space-y-1.5 pl-2">
              {FINAL_LOVE_LETTER.reasons.map((reason, index) => (
                <li
                  key={index}
                  className="flex items-center gap-2 text-rose-100 font-serif-romantic italic text-lg"
                >
                  <span className="text-rose-400 text-xs">❤️</span>
                  <span>{reason}</span>
                </li>
              ))}
            </ul>
            <p className="text-sm font-semibold text-rose-300/90 pt-1">
              {FINAL_LOVE_LETTER.conclusion}
            </p>
          </div>

          <p className="font-serif-romantic italic text-xl sm:text-2xl text-pink-200 leading-relaxed font-medium whitespace-pre-line">
            "{FINAL_LOVE_LETTER.promise}"
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-white/10 text-center">
          <p className="font-script text-2xl sm:text-3xl text-rose-200">
            {FINAL_LOVE_LETTER.footer}
          </p>
        </div>
      </div>

      {/* Interactive Little Jar of Love Reasons */}
      <div className="romantic-glass-card rounded-3xl p-6 border border-rose-400/30 text-center relative overflow-hidden">
        <div className="flex items-center justify-center gap-2 text-rose-300 text-xs uppercase tracking-widest font-semibold mb-1">
          <Gift className="w-4 h-4 text-rose-400" />
          <span>Little Love Jar</span>
        </div>
        <h3 className="font-serif-romantic italic text-2xl text-white mb-3">
          Reasons Why I Adore You 🍯💕
        </h3>

        <div className="min-h-[90px] flex items-center justify-center p-4 rounded-2xl bg-black/40 border border-rose-400/20 mb-4 backdrop-blur-md">
          <AnimatePresence mode="wait">
            <motion.p
              key={currentJarNoteIndex}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="text-base sm:text-lg text-rose-100 font-serif-romantic italic leading-relaxed"
            >
              "{LOVE_JAR_NOTES[currentJarNoteIndex]}"
            </motion.p>
          </AnimatePresence>
        </div>

        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={drawNextJarNote}
          id="btn-draw-love-reason"
          className="w-full py-3 px-4 rounded-full text-xs sm:text-sm font-semibold flex items-center justify-center gap-2 bg-rose-500/20 hover:bg-rose-500/30 text-rose-200 border border-rose-400/40 transition-colors"
        >
          <RefreshCw className={`w-3.5 h-3.5 ${isJarNoteAnimating ? 'animate-spin' : ''}`} />
          <span>Draw Another Secret Reason ❤️</span>
        </motion.button>
      </div>

      {/* Photo Polaroids / Memory Gallery with 3D Flip */}
      <div className="space-y-4">
        <div className="flex items-center justify-between px-2">
          <div className="flex items-center gap-2">
            <ImageIcon className="w-4 h-4 text-rose-400" />
            <h3 className="font-serif-romantic italic text-2xl text-white">
              Our Little Memories 📸
            </h3>
          </div>
          <span className="text-[11px] text-rose-300/70 italic">
            tap to flip note 🔄
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PHOTO_MEMORIES.map((photo) => {
            const isFlipped = flippedPhotoId === photo.id;
            return (
              <motion.div
                key={photo.id}
                whileHover={{ scale: 1.02 }}
                onClick={() => {
                  soundEngine.triggerHaptic(20);
                  setFlippedPhotoId(isFlipped ? null : photo.id);
                }}
                className="romantic-glass-card rounded-2xl p-3.5 cursor-pointer border border-white/15 transition-all duration-300 relative group select-none min-h-[260px] flex flex-col justify-between"
                style={{
                  transform: `rotate(${photo.rotation || 0}deg)`,
                }}
              >
                {!isFlipped ? (
                  <>
                    <div className="aspect-[4/3] rounded-xl overflow-hidden mb-2.5 relative bg-black/40">
                      <img
                        src={photo.url}
                        alt={photo.title}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-50" />
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full bg-black/60 backdrop-blur-sm text-[10px] text-rose-200 border border-white/20">
                        Tap to flip 🔄
                      </div>
                    </div>
                    <div className="px-1 text-left">
                      <h4 className="font-serif-romantic italic text-lg text-white font-medium">
                        {photo.title}
                      </h4>
                      <p className="text-xs text-rose-200/80 line-clamp-2 mt-0.5">
                        {photo.caption}
                      </p>
                      {photo.date && (
                        <span className="text-[10px] text-rose-300/60 block mt-1">
                          {photo.date}
                        </span>
                      )}
                    </div>
                  </>
                ) : (
                  <div className="p-3 text-left flex flex-col justify-between h-full space-y-3 bg-rose-950/40 rounded-xl border border-rose-400/30">
                    <div>
                      <div className="flex items-center justify-between text-xs text-rose-300 mb-2">
                        <span className="font-semibold">{photo.title}</span>
                        <span>{photo.date || 'Our Story'}</span>
                      </div>
                      <p className="text-xs sm:text-sm text-rose-100 font-serif-romantic italic leading-relaxed">
                        "{photo.backStory}"
                      </p>
                    </div>
                    <div className="pt-2 border-t border-rose-400/20 flex items-center justify-between text-[10px] text-rose-300/60">
                      <span>Forever my favorite memory ❤️</span>
                      <span>Tap to flip back</span>
                    </div>
                  </div>
                )}
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* Official Certificate of Love Badge */}
      <div className="romantic-glass-card-bright rounded-3xl p-6 border border-rose-400/40 text-center relative space-y-3">
        <div className="w-12 h-12 mx-auto rounded-full bg-rose-500/20 border border-rose-400/50 flex items-center justify-center text-rose-300 shadow-[0_0_20px_rgba(255,77,109,0.4)]">
          <Award className="w-6 h-6 text-rose-400" />
        </div>
        <div className="space-y-1">
          <span className="text-[10px] uppercase tracking-[0.25em] text-rose-300 font-bold">
            Official Love Certificate
          </span>
          <h4 className="font-serif-romantic italic text-2xl text-white">
            Awarded to {PARTNER_NAME}
          </h4>
        </div>
        <p className="text-xs text-rose-100/90 italic font-light px-2">
          For completing all 15 romantic stages, having the sweetest smile, and being the most loved person in the whole wide world. 💕
        </p>
        <div className="flex items-center justify-center gap-1 text-rose-400 text-xs">
          <Star className="w-3.5 h-3.5 fill-rose-400" />
          <Star className="w-3.5 h-3.5 fill-rose-400" />
          <Star className="w-3.5 h-3.5 fill-rose-400" />
          <Star className="w-3.5 h-3.5 fill-rose-400" />
          <Star className="w-3.5 h-3.5 fill-rose-400" />
        </div>
      </div>

      {/* Replay Button */}
      <div className="pt-2 text-center">
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          onClick={onReplay}
          id="btn-replay-journey"
          className="w-full py-4 px-6 rounded-full font-bold text-base flex items-center justify-center gap-2 bg-white/10 hover:bg-white/20 text-rose-100 border border-white/20 shadow-lg backdrop-blur-md transition-all duration-200 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4 text-rose-300" />
          <span>Replay Our Journey ❤️</span>
        </motion.button>
      </div>

      {/* Modal for Expanded Photo */}
      {selectedPhoto && (
        <div
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4"
          onClick={() => setSelectedPhoto(null)}
        >
          <div className="max-w-md w-full romantic-glass-card-bright p-3.5 rounded-3xl animate-fadeIn">
            <img
              src={selectedPhoto.url}
              alt={selectedPhoto.title}
              className="w-full rounded-2xl max-h-[75vh] object-contain"
            />
            <h4 className="text-center font-serif-romantic italic text-xl text-white pt-2">
              {selectedPhoto.title}
            </h4>
            <p className="text-center text-xs text-rose-200/80 pt-1 pb-2">
              {selectedPhoto.caption}
            </p>
          </div>
        </div>
      )}
    </motion.div>
  );
};
