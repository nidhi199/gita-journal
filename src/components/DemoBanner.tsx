import React, { useState } from 'react';
import { Sparkles, HelpCircle, ArrowRight, X, LogIn, BookOpen, PenLine, Compass } from 'lucide-react';

interface DemoBannerProps {
  onOpenTour?: () => void;
  onOpenWalkthrough?: () => void;
  onStartTour?: () => void;
  onExitDemo: () => void;
  onLoadSamplePrompt?: () => void;
  onLoadSampleDilemma?: (prompt: any) => void;
  onSwitchView?: (view: 'editor' | 'history' | 'vault') => void;
  isTourActive?: boolean;
}

export const DemoBanner: React.FC<DemoBannerProps> = ({
  onOpenTour,
  onOpenWalkthrough,
  onStartTour,
  onExitDemo,
  onLoadSamplePrompt,
  onLoadSampleDilemma,
  onSwitchView,
  isTourActive = false
}) => {
  const [isMinimized, setIsMinimized] = useState<boolean>(false);

  const handleTourClick = () => {
    if (onStartTour) {
      onStartTour();
    } else if (onOpenTour) {
      onOpenTour();
    } else if (onOpenWalkthrough) {
      onOpenWalkthrough();
    }
  };

  if (isMinimized) {
    return (
      <div className="bg-amber-950/40 border-b border-amber-500/25 px-3 py-1.5 flex items-center justify-between text-xs text-amber-200">
        <div className="flex items-center space-x-2">
          <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-pulse" />
          <span className="font-medium">Interactive Demo Mode Active</span>
        </div>
        <div className="flex items-center space-x-3">
          <button
            onClick={handleTourClick}
            className="text-[11px] underline text-amber-300 hover:text-amber-100 cursor-pointer"
          >
            Guided Tour
          </button>
          <button
            onClick={() => setIsMinimized(false)}
            className="text-[11px] underline text-zinc-300 hover:text-zinc-100 cursor-pointer"
          >
            Show Controls
          </button>
          <button
            onClick={onExitDemo}
            className="text-[11px] rounded bg-zinc-800 px-2 py-0.5 text-zinc-200 hover:bg-zinc-700 cursor-pointer"
          >
            Exit Demo
          </button>
        </div>
      </div>
    );
  }

  return (
    <div 
      id="demo-mode-banner"
      className="relative z-20 border-b border-amber-500/30 bg-gradient-to-r from-amber-950/70 via-zinc-900/90 to-amber-950/50 px-4 py-2.5 shadow-sm text-zinc-100"
    >
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2.5">
        
        {/* Left: Indicator & Description */}
        <div className="flex items-center space-x-2.5">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30 shrink-0">
            <Sparkles className="h-3.5 w-3.5" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-semibold tracking-wide text-amber-300">
                Interactive Demo Sandbox
              </span>
              <span className="hidden sm:inline-block rounded-full bg-amber-950/80 border border-amber-500/40 px-2 py-0.2 text-[10px] text-amber-200 font-medium">
                Active
              </span>
            </div>
            <p className="text-[11px] text-zinc-300 hidden md:block">
              Experience Socratic reflection, 100% verified Gita verses, and emotional Guna tracking risk-free.
            </p>
          </div>
        </div>

        {/* Right: Actions */}
        <div className="flex items-center flex-wrap gap-2 text-xs">
          <button
            id="demo-guided-tour-btn"
            onClick={handleTourClick}
            className="inline-flex items-center space-x-1.5 rounded-md border border-amber-500/40 bg-amber-950/40 px-2.5 py-1 text-amber-200 hover:bg-amber-900/50 transition-colors cursor-pointer"
          >
            <Compass className="h-3.5 w-3.5 text-amber-400" />
            <span>{isTourActive ? 'Resume Walkthrough' : 'Walkthrough Tour'}</span>
          </button>

          {(onLoadSamplePrompt || onLoadSampleDilemma) && (
            <button
              id="demo-sample-prompt-btn"
              onClick={() => {
                if (onLoadSamplePrompt) {
                  onLoadSamplePrompt();
                } else if (onLoadSampleDilemma) {
                  onLoadSampleDilemma(null);
                }
              }}
              className="hidden sm:inline-flex items-center space-x-1.5 rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-zinc-200 hover:border-amber-500/40 hover:text-amber-200 transition-colors cursor-pointer"
            >
              <PenLine className="h-3.5 w-3.5 text-amber-400" />
              <span>Sample Dilemma</span>
            </button>
          )}

          <button
            id="exit-demo-btn"
            onClick={onExitDemo}
            className="inline-flex items-center space-x-1.5 rounded-md border border-amber-500/50 bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-1 text-xs font-medium text-zinc-950 shadow-xs hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer"
          >
            <LogIn className="h-3.5 w-3.5" />
            <span>Sign In / Real Journal</span>
          </button>

          <button
            onClick={() => setIsMinimized(true)}
            className="p-1 text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
            title="Minimize demo banner"
            aria-label="Minimize demo banner"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

      </div>
    </div>
  );
};
