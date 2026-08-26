import React from 'react';
import { Sparkles, Heart } from 'lucide-react';

interface ProgressBarProps {
  currentStage: number;
  totalStages: number;
  onOpenSettings?: () => void;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  currentStage,
  totalStages,
  onOpenSettings,
}) => {
  const percentage = Math.min(100, Math.round(((currentStage - 1) / totalStages) * 100));

  return (
    <header className="w-full max-w-md mx-auto px-4 pt-3 pb-2 flex flex-col gap-2 relative z-30">
      <div className="flex items-center justify-between text-xs">
        <div className="flex items-center gap-1.5 text-rose-300 font-semibold tracking-wider uppercase">
          <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500 animate-pulse" />
          <span>Moment {Math.min(currentStage, totalStages)} / {totalStages}</span>
        </div>

        <div className="flex items-center gap-3">
          <span className="text-rose-200/60 font-medium text-[11px] flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-rose-400" />
            {percentage}% Completed
          </span>

          {onOpenSettings && (
            <button
              onClick={onOpenSettings}
              id="btn-open-settings"
              className="text-[11px] text-rose-300/70 hover:text-rose-200 px-2 py-0.5 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 transition-colors"
              title="Journey Options"
            >
              Options
            </button>
          )}
        </div>
      </div>

      {/* Track */}
      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden p-0.5 backdrop-blur-sm border border-white/10">
        <div
          className="h-full bg-gradient-to-r from-rose-600 via-rose-500 to-pink-400 rounded-full transition-all duration-700 ease-out shadow-[0_0_12px_rgba(255,77,109,0.8)]"
          style={{ width: `${Math.max(4, percentage)}%` }}
        />
      </div>
    </header>
  );
};
