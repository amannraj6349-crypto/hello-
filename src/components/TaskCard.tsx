import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, Lock, Heart, Sparkles, ArrowRight, MessageCircle, Mail, Gift } from 'lucide-react';
import { JourneyStage, WHATSAPP_NUMBER } from '../config';
import { soundEngine } from '../utils/audio';

interface TaskCardProps {
  stage: JourneyStage;
  isUnlocked: boolean;
  onCompleteTask: () => void;
  onNextStage: () => void;
  hasSentConfirmation: boolean;
  onMarkSent: () => void;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  stage,
  isUnlocked,
  onNextStage,
  hasSentConfirmation,
  onMarkSent,
}) => {
  const [isOpeningEnvelope, setIsOpeningEnvelope] = useState(false);

  const getWhatsAppLink = () => {
    const encodedText = encodeURIComponent(stage.whatsappMessage);
    const cleanNumber = WHATSAPP_NUMBER.replace(/[^0-9]/g, '');
    if (!cleanNumber || cleanNumber === 'PUT_MY_NUMBER_HERE') {
      return `https://wa.me/?text=${encodedText}`;
    }
    return `https://wa.me/${cleanNumber}?text=${encodedText}`;
  };

  const handleSendConfirmation = () => {
    setIsOpeningEnvelope(true);
    soundEngine.playHeartbeatEffect();

    // Heart burst celebration
    try {
      confetti({
        particleCount: 50,
        spread: 65,
        origin: { y: 0.65 },
        colors: ['#ff4d6d', '#ff758f', '#ffb3c1', '#ffffff', '#c9184a', '#ffd166'],
        shapes: ['circle'],
        scalar: 1.1,
      });
    } catch {
      // ignore
    }

    setTimeout(() => {
      onMarkSent();
      setIsOpeningEnvelope(false);
      soundEngine.playSparkleUnlock();
    }, 600);
  };

  const handleUnlockNext = () => {
    soundEngine.playSparkleUnlock();
    try {
      confetti({
        particleCount: 70,
        spread: 85,
        origin: { y: 0.5 },
        colors: ['#ff4d6d', '#ffd166', '#ffb3c1', '#ffffff', '#ff85a1'],
        ticks: 220,
      });
    } catch {
      // ignore
    }
    onNextStage();
  };

  if (!isUnlocked) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="romantic-glass-card rounded-3xl p-8 text-center max-w-sm mx-auto opacity-60 border border-white/10"
      >
        <div className="w-16 h-16 rounded-full bg-white/5 mx-auto flex items-center justify-center mb-4 text-rose-300">
          <Lock className="w-7 h-7 text-rose-400/80 animate-pulse" />
        </div>
        <h3 className="font-serif-romantic italic text-2xl text-rose-200 mb-2">
          Moment {stage.momentNumber}
        </h3>
        <p className="text-sm text-rose-200/60">
          Complete the current moment first to reveal what comes next. 💕
        </p>
      </motion.div>
    );
  }

  return (
    <div className="w-full max-w-md mx-auto px-4 py-2">
      <motion.div
        key={stage.id}
        initial={{ opacity: 0, y: 20, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: -20, scale: 0.96 }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        className={`romantic-glass-card rounded-[32px] p-6 sm:p-8 text-center relative overflow-hidden transition-all duration-500 ${
          hasSentConfirmation ? 'romantic-glass-card-bright border-rose-400/40' : ''
        }`}
      >
        {/* Subtle decorative glows */}
        <div className="absolute -top-16 -right-16 w-36 h-36 bg-rose-500/20 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute -bottom-16 -left-16 w-36 h-36 bg-pink-500/15 rounded-full blur-2xl pointer-events-none" />

        {/* Header Icon with glowing border */}
        <motion.div
          className="relative z-10 mb-4 inline-flex items-center justify-center"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-rose-900/70 to-pink-900/40 border border-rose-400/40 flex items-center justify-center shadow-[0_0_30px_rgba(255,77,109,0.4)]">
            <span className="text-4xl select-none filter drop-shadow-md">
              {stage.icon}
            </span>
          </div>
          {hasSentConfirmation && (
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', damping: 12, stiffness: 200 }}
              className="absolute -bottom-1 -right-1 bg-emerald-500 text-white rounded-full p-1.5 shadow-lg border-2 border-[#120105]"
            >
              <CheckCircle2 className="w-4 h-4" />
            </motion.div>
          )}
        </motion.div>

        {/* Stage Badge */}
        <div className="relative z-10 mb-1.5 flex items-center justify-center gap-1.5">
          <span className="text-[11px] uppercase tracking-widest text-rose-300 font-semibold px-3.5 py-0.5 rounded-full bg-rose-500/15 border border-rose-400/25 shadow-sm">
            Moment {stage.momentNumber} of 15
          </span>
        </div>

        {/* Title */}
        <h2 className="relative z-10 font-serif-romantic italic text-3xl sm:text-4xl text-white font-normal mb-4 tracking-tight drop-shadow-sm">
          {stage.title}
        </h2>

        <AnimatePresence mode="wait">
          {!hasSentConfirmation ? (
            /* Task Prompt & Action Buttons */
            <motion.div
              key="task-view"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="relative z-10 space-y-6"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-black/30 border border-white/10 backdrop-blur-md text-left space-y-2">
                <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold tracking-wide uppercase">
                  <Gift className="w-3.5 h-3.5 text-rose-400" />
                  <span>Your Little Challenge</span>
                </div>
                <p className="text-base sm:text-lg text-rose-50/95 leading-relaxed font-light">
                  {stage.taskInstruction}
                </p>
              </div>

              <div className="space-y-3 pt-2">
                {/* WhatsApp Button */}
                <a
                  href={getWhatsAppLink()}
                  target="_blank"
                  rel="noopener noreferrer"
                  id={`btn-whatsapp-${stage.id}`}
                  onClick={() => soundEngine.triggerHaptic(20)}
                  className="w-full py-3.5 px-5 rounded-full font-semibold text-sm sm:text-base flex items-center justify-center gap-2.5 bg-emerald-600/95 hover:bg-emerald-500 text-white shadow-[0_8px_20px_rgba(16,185,129,0.3)] border border-emerald-400/30 transition-all duration-200 active:scale-[0.98] group"
                >
                  <MessageCircle className="w-5 h-5 transition-transform group-hover:scale-110" />
                  <span>Send on WhatsApp 💌</span>
                </a>

                {/* I Sent It Button */}
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  onClick={handleSendConfirmation}
                  disabled={isOpeningEnvelope}
                  id={`btn-sent-${stage.id}`}
                  className="w-full py-4 px-6 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-600 via-rose-500 to-pink-500 text-white shadow-[0_10px_25px_rgba(255,77,109,0.5)] hover:shadow-[0_14px_35px_rgba(255,77,109,0.7)] border border-rose-300/40 transition-all duration-200 cursor-pointer disabled:opacity-75"
                >
                  {isOpeningEnvelope ? (
                    <>
                      <Sparkles className="w-5 h-5 text-white animate-spin" />
                      <span>Opening Secret Note... ✨</span>
                    </>
                  ) : (
                    <>
                      <Heart className="w-5 h-5 fill-white text-white animate-pulse" />
                      <span>I Sent It ❤️</span>
                    </>
                  )}
                </motion.button>
              </div>

              <p className="text-[11px] text-rose-300/60 italic">
                Tap "Send on WhatsApp" to message me, then press "I Sent It ❤️"
              </p>
            </motion.div>
          ) : (
            /* Romantic Reason Reveal & Unlock Next */
            <motion.div
              key="reason-view"
              initial={{ opacity: 0, scale: 0.92, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.5, ease: 'easeOut' }}
              className="relative z-10 space-y-6"
            >
              {/* Wax Seal Love Note Envelope aesthetic */}
              <div className="p-5 sm:p-6 rounded-2xl bg-gradient-to-b from-rose-950/60 via-[#1c0610] to-pink-950/40 border border-rose-400/40 backdrop-blur-md shadow-[0_10px_30px_rgba(0,0,0,0.5)] text-left relative overflow-hidden">
                {/* Decorative corner ribbon icon */}
                <div className="absolute top-3 right-3 text-rose-400/30">
                  <Mail className="w-5 h-5" />
                </div>

                <div className="flex items-center gap-2 text-rose-300 text-xs font-semibold uppercase tracking-wider mb-3">
                  <Sparkles className="w-4 h-4 text-rose-400 animate-spin" />
                  <span>Why You're So Special</span>
                </div>

                <p className="text-base sm:text-lg text-rose-50 font-normal leading-relaxed whitespace-pre-line font-serif-romantic italic pl-1 border-l-2 border-rose-400/50">
                  "{stage.romanticMessage}"
                </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.97 }}
                onClick={handleUnlockNext}
                id={`btn-unlock-${stage.id}`}
                className="w-full py-4 px-6 rounded-full font-bold text-base sm:text-lg flex items-center justify-center gap-2.5 bg-gradient-to-r from-rose-600 via-pink-600 to-rose-500 text-white shadow-[0_12px_30px_rgba(255,77,109,0.55)] hover:shadow-[0_16px_40px_rgba(255,77,109,0.75)] border border-pink-300/40 transition-all duration-200 cursor-pointer group"
              >
                <span>{stage.unlockButtonText || "Unlock Next ❤️"}</span>
                <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1.5" />
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
