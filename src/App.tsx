import React, { useState, useEffect } from 'react';
import { FloatingHearts } from './components/FloatingHearts';
import { InteractiveSparkles } from './components/InteractiveSparkles';
import { MusicPlayer } from './components/MusicPlayer';
import { ProgressBar } from './components/ProgressBar';
import { TaskCard } from './components/TaskCard';
import { FinalSurprise } from './components/FinalSurprise';
import { LandingPage } from './components/LandingPage';
import { SettingsModal } from './components/SettingsModal';
import { JOURNEY_STAGES } from './config';

const STORAGE_KEY = 'our_romantic_journey_stage_v2';
const SENT_STORAGE_KEY = 'our_romantic_journey_sent_status_v2';

export default function App() {
  // stage: 0 = Landing, 1-14 = Tasks 1-14, 15 = Final Surprise
  const [currentStage, setCurrentStage] = useState<number>(0);
  const [savedStage, setSavedStage] = useState<number>(1);
  const [hasSentConfirmation, setHasSentConfirmation] = useState<boolean>(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(false);

  // Load saved progress from localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      const storedSent = localStorage.getItem(SENT_STORAGE_KEY);
      if (stored) {
        const num = parseInt(stored, 10);
        if (num >= 1 && num <= 15) {
          setSavedStage(num);
        }
      }
      if (storedSent === 'true') {
        setHasSentConfirmation(true);
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  // Save progress changes
  const saveProgress = (stageNum: number, sentStatus: boolean) => {
    try {
      localStorage.setItem(STORAGE_KEY, stageNum.toString());
      localStorage.setItem(SENT_STORAGE_KEY, sentStatus ? 'true' : 'false');
    } catch {
      // ignore
    }
  };

  const handleStartJourney = () => {
    setCurrentStage(1);
    setSavedStage(1);
    setHasSentConfirmation(false);
    saveProgress(1, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleContinueJourney = () => {
    setCurrentStage(savedStage);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleMarkSent = () => {
    setHasSentConfirmation(true);
    saveProgress(currentStage, true);
  };

  const handleNextStage = () => {
    const next = currentStage + 1;
    setHasSentConfirmation(false);
    setCurrentStage(next);
    setSavedStage(next);
    saveProgress(next, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleJumpToStage = (stageNum: number) => {
    setHasSentConfirmation(false);
    setCurrentStage(stageNum);
    setSavedStage(Math.max(savedStage, stageNum));
    saveProgress(stageNum, false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleResetJourney = () => {
    try {
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(SENT_STORAGE_KEY);
    } catch {
      // ignore
    }
    setCurrentStage(0);
    setSavedStage(1);
    setHasSentConfirmation(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentTaskData = JOURNEY_STAGES.find((s) => s.momentNumber === currentStage);

  return (
    <main className="min-h-screen bg-[#120105] text-rose-100 flex flex-col items-center justify-between relative overflow-x-hidden select-none font-sans">
      {/* Ambient Radial Spotlight Glows */}
      <div className="bg-glow-pink -top-24 -left-24 sm:top-10 sm:left-1/4" />
      <div className="bg-glow-purple -bottom-24 -right-24 sm:bottom-10 sm:right-1/4" />

      {/* Floating Ambient Animated Hearts Background */}
      <FloatingHearts />

      {/* Touch/Tap Sparkles Effect */}
      <InteractiveSparkles />

      {/* Music Player Toggle */}
      <MusicPlayer />

      {/* Settings / Options Modal */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onReset={handleResetJourney}
        onJumpToStage={handleJumpToStage}
        completedStages={
          currentStage === 0
            ? Math.max(0, savedStage - 1)
            : Math.max(0, currentStage - (hasSentConfirmation ? 0 : 1))
        }
      />

      {/* Top Header / Progress Bar */}
      {currentStage >= 1 && (
        <div className="w-full pt-2">
          <ProgressBar
            currentStage={currentStage}
            totalStages={15}
            onOpenSettings={() => setIsSettingsOpen(true)}
          />
        </div>
      )}

      {/* Main Content Area */}
      <div className="w-full flex-1 flex flex-col justify-center items-center relative z-10 py-4 max-w-lg mx-auto">
        {currentStage === 0 && (
          <LandingPage
            onStart={handleStartJourney}
            savedStage={savedStage}
            onContinue={handleContinueJourney}
          />
        )}

        {currentStage >= 1 && currentStage <= 14 && currentTaskData && (
          <TaskCard
            key={currentStage}
            stage={currentTaskData}
            isUnlocked={true}
            onCompleteTask={handleNextStage}
            onNextStage={handleNextStage}
            hasSentConfirmation={hasSentConfirmation}
            onMarkSent={handleMarkSent}
          />
        )}

        {currentStage === 15 && (
          <FinalSurprise onReplay={handleResetJourney} />
        )}
      </div>

      {/* Subtle Mobile-First Footer Branding */}
      <footer className="w-full py-4 text-center text-[10px] uppercase tracking-[0.2em] text-rose-300/35 relative z-10">
        <span>Our Private Journey • Made Personally With Love ❤️</span>
      </footer>
    </main>
  );
}
