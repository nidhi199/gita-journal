import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ArrowLeft, 
  X, 
  Play, 
  Pause, 
  RotateCcw, 
  CheckCircle2, 
  Compass, 
  BookOpen, 
  Volume2, 
  History, 
  Flame, 
  ShieldCheck,
  LogIn,
  Minimize2,
  Maximize2
} from 'lucide-react';
import { JournalEntry } from '../types';
import { DEMO_ENTRIES, SAMPLE_DEMO_PROMPTS } from '../data/demoEntries';

export interface TourStep {
  id: string;
  title: string;
  subtitle: string;
  view: 'editor' | 'history' | 'vault';
  badge: string;
  icon: React.ReactNode;
  description: string;
  keyHighlight: string;
  actionLabel?: string;
  onAction?: () => void;
}

interface InteractiveTourGuideProps {
  currentStepIndex: number;
  onStepChange: (index: number) => void;
  onCloseTour: () => void;
  onExitDemo: () => void;
  onSelectEntry: (entry: JournalEntry) => void;
  onSwitchView: (view: 'editor' | 'history' | 'vault') => void;
  onOpenLibrary: () => void;
  onOpenSecurity: () => void;
  onLoadPrompt: (title: string, content: string, theme: string) => void;
}

export const InteractiveTourGuide: React.FC<InteractiveTourGuideProps> = ({
  currentStepIndex,
  onStepChange,
  onCloseTour,
  onExitDemo,
  onSelectEntry,
  onSwitchView,
  onOpenLibrary,
  onOpenSecurity,
  onLoadPrompt
}) => {
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isMinimized, setIsMinimized] = useState<boolean>(false);
  const [autoPlayTimer, setAutoPlayTimer] = useState<number>(0);

  const steps: TourStep[] = [
    {
      id: 'step-editor',
      title: '1. The Contemplation Sanctuary',
      subtitle: 'Write Raw Dilemmas Freely',
      view: 'editor',
      badge: 'Step 1 of 6: Reflection Canvas',
      icon: <Compass className="h-4 w-4 text-amber-400" />,
      description: 'Pour out uncensored anxieties, career dilemmas, or moral dilemmas without feeling pressured to sound spiritual. You can use text, voice dictation, or tag your physical sanctuary.',
      keyHighlight: 'Try clicking "Load Sample Dilemma" below to fill the canvas with a realistic workplace overwhelm reflection.',
      actionLabel: 'Load Sample Dilemma',
      onAction: () => {
        const p = SAMPLE_DEMO_PROMPTS[0];
        onLoadPrompt(p.title, p.content, p.theme);
        onSwitchView('editor');
      }
    },
    {
      id: 'step-socratic',
      title: '2. The Socratic Pause',
      subtitle: 'Clarifying Before Prescribing',
      view: 'editor',
      badge: 'Step 2 of 6: Socratic Inquiry',
      icon: <Sparkles className="h-4 w-4 text-amber-400" />,
      description: 'The app avoids giving rapid, shallow advice. Instead, it pauses to ask ONE deep clarifying question to illuminate underlying expectations, fears, or attachments.',
      keyHighlight: 'Question: "What would your work feel like tomorrow if your inherent dignity was already safe and whole, independent of this single project?"',
      actionLabel: 'View Socratic Reflection',
      onAction: () => {
        onSelectEntry(DEMO_ENTRIES[0]);
        onSwitchView('editor');
      }
    },
    {
      id: 'step-verse',
      title: '3. 100% Grounded Gita Wisdom',
      subtitle: 'Verified Canon & Sanskrit Audio',
      view: 'editor',
      badge: 'Step 3 of 6: Scriptural Rigor',
      icon: <BookOpen className="h-4 w-4 text-amber-400" />,
      description: 'Every reflection is anchored strictly in an authentic, verified verse—never hallucinated. Notice Chapter 2, Verse 47 with Sanskrit text, audio chanting, and philosophical translation.',
      keyHighlight: 'Karma-Yoga: "You have a right to your prescribed duty alone, but never to its fruits."',
      actionLabel: 'Inspect Gita 2.47 Entry',
      onAction: () => {
        onSelectEntry(DEMO_ENTRIES[0]);
        onSwitchView('editor');
      }
    },
    {
      id: 'step-history',
      title: '4. Sacred History & Leaf-Through',
      subtitle: 'Explore Past Contemplations',
      view: 'history',
      badge: 'Step 4 of 6: Timeline & Reader',
      icon: <History className="h-4 w-4 text-amber-400" />,
      description: 'Browse your contemplative journey chronologically. Filter by philosophical theme, search by keyword, or switch to "Parchment Mode" to leaf through entries like an ancient manuscript.',
      keyHighlight: 'Three pre-loaded reflections are available to inspect, compare, and study in this demo.',
      actionLabel: 'Go to Sacred History',
      onAction: () => {
        onSwitchView('history');
      }
    },
    {
      id: 'step-vault',
      title: '5. Emotional Vault & Guna Balance',
      subtitle: 'Visualizing Inner Equilibrium',
      view: 'vault',
      badge: 'Step 5 of 6: Guna Analytics',
      icon: <Flame className="h-4 w-4 text-amber-400" />,
      description: 'Observe mental qualities over time: Sattva (peace/clarity), Rajas (passion/stress), and Tamas (heaviness/fatigue), alongside mood ratings and thematic distribution.',
      keyHighlight: 'See real-time radar charts and Guna proportions derived from your authentic reflections.',
      actionLabel: 'Open Emotional Vault',
      onAction: () => {
        onSwitchView('vault');
      }
    },
    {
      id: 'step-privacy',
      title: '6. Complete Privacy & Full Canon',
      subtitle: 'Zero-Trust Security & All 700 Verses',
      view: 'editor',
      badge: 'Step 6 of 6: Ready to Begin',
      icon: <ShieldCheck className="h-4 w-4 text-emerald-400" />,
      description: 'Your private thoughts remain isolated strictly to your authenticated session and are never used for model training. Browse all 700 verses in the library anytime!',
      keyHighlight: 'Ready to cultivate your personal sanctuary? Sign in with Google to start your real private journal.',
      actionLabel: 'Browse All 700 Verses',
      onAction: () => {
        onOpenLibrary();
      }
    }
  ];

  const currentStep = steps[currentStepIndex] || steps[0];

  // Auto-play timer effect
  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setAutoPlayTimer((prev) => {
          if (prev >= 100) {
            goToNextStep();
            return 0;
          }
          return prev + 15;
        });
      }, 1000);
    } else {
      setAutoPlayTimer(0);
    }
    return () => clearInterval(interval);
  }, [isPlaying, currentStepIndex]);

  const goToNextStep = () => {
    const nextIdx = (currentStepIndex + 1) % steps.length;
    goToStep(nextIdx);
  };

  const goToPrevStep = () => {
    const prevIdx = (currentStepIndex - 1 + steps.length) % steps.length;
    goToStep(prevIdx);
  };

  const goToStep = (idx: number) => {
    onStepChange(idx);
    setAutoPlayTimer(0);
    const targetStep = steps[idx];
    if (targetStep) {
      if (targetStep.onAction) {
        targetStep.onAction();
      } else {
        onSwitchView(targetStep.view);
      }
    }
  };

  if (isMinimized) {
    return (
      <aside 
        aria-label="Interactive demo walkthrough minimized"
        className="fixed bottom-4 right-4 z-50 flex items-center space-x-2 rounded-full border border-amber-500/50 bg-[#121316]/95 px-4 py-2 text-xs text-amber-200 shadow-2xl backdrop-blur-md animate-in slide-in-from-bottom-2"
      >
        <span className="flex h-2 w-2 rounded-full bg-amber-400 animate-ping" />
        <span className="font-semibold text-amber-300">Tour: Step {currentStepIndex + 1}/6</span>
        <button
          onClick={() => setIsMinimized(false)}
          className="ml-2 rounded-full p-1 text-zinc-400 hover:bg-zinc-800 hover:text-amber-200 transition-colors cursor-pointer"
          title="Expand interactive tour guide"
        >
          <Maximize2 className="h-3.5 w-3.5" />
        </button>
      </aside>
    );
  }

  return (
    <aside 
      id="interactive-tour-guide-card"
      aria-label="Interactive demo walkthrough"
      className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-xl rounded-2xl border border-amber-500/40 bg-[#121316]/95 text-zinc-100 shadow-2xl shadow-black/80 backdrop-blur-md overflow-hidden animate-in slide-in-from-bottom-3 duration-300"
    >
      {/* Top progress bar for auto-play */}
      {isPlaying && (
        <div className="h-1 w-full bg-zinc-800">
          <div 
            className="h-full bg-amber-500 transition-all duration-300 ease-linear"
            style={{ width: `${autoPlayTimer}%` }}
          />
        </div>
      )}

      {/* Card Header */}
      <div className="flex items-center justify-between border-b border-zinc-800/80 bg-gradient-to-r from-amber-950/40 via-zinc-900/60 to-zinc-900/40 px-4 py-2.5">
        <div className="flex items-center space-x-2">
          <div className="flex h-6 w-6 items-center justify-center rounded-md bg-amber-500/20 text-amber-300 border border-amber-500/30">
            {currentStep.icon}
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-amber-400">
              Interactive Tour
            </span>
            <span className="text-zinc-500 mx-1.5">•</span>
            <span className="text-[11px] text-zinc-300">
              Step {currentStepIndex + 1} of {steps.length}
            </span>
          </div>
        </div>

        {/* Action icons */}
        <div className="flex items-center space-x-1 text-zinc-400">
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            title={isPlaying ? 'Pause auto-play' : 'Auto-play walkthrough'}
            className={`rounded-md p-1.5 transition-colors cursor-pointer ${
              isPlaying ? 'text-amber-400 bg-amber-950/40' : 'hover:bg-zinc-800 hover:text-zinc-200'
            }`}
          >
            {isPlaying ? <Pause className="h-3.5 w-3.5" /> : <Play className="h-3.5 w-3.5" />}
          </button>
          <button
            onClick={() => setIsMinimized(true)}
            title="Minimize tour card"
            className="rounded-md p-1.5 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <Minimize2 className="h-3.5 w-3.5" />
          </button>
          <button
            onClick={onCloseTour}
            title="Close walkthrough"
            className="rounded-md p-1.5 hover:bg-zinc-800 hover:text-zinc-200 transition-colors cursor-pointer"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>

      {/* Step Content */}
      <div className="p-4 space-y-3 font-sans">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-semibold text-sm sm:text-base text-zinc-100 flex items-center gap-2">
              <span>{currentStep.title}</span>
            </h3>
            <p className="text-xs text-amber-300 font-medium mt-0.5">
              {currentStep.subtitle}
            </p>
          </div>

          {currentStep.actionLabel && currentStep.onAction && (
            <button
              onClick={currentStep.onAction}
              className="shrink-0 inline-flex items-center space-x-1.5 rounded-lg border border-amber-500/50 bg-amber-950/40 px-2.5 py-1 text-xs font-semibold text-amber-200 hover:bg-amber-900/50 hover:border-amber-400 transition-all cursor-pointer"
            >
              <Sparkles className="h-3 w-3 text-amber-400" />
              <span>{currentStep.actionLabel}</span>
            </button>
          )}
        </div>

        <p className="text-xs text-zinc-300 leading-relaxed">
          {currentStep.description}
        </p>

        {/* Key Highlight Callout */}
        <div className="rounded-lg border border-amber-500/20 bg-amber-950/20 px-3 py-2 text-xs text-amber-200/90 font-serif-journal italic">
          {currentStep.keyHighlight}
        </div>

        {/* Step Indicators */}
        <div className="flex items-center justify-between pt-1 border-t border-zinc-800/80">
          <div className="flex items-center space-x-1.5">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => goToStep(i)}
                className={`h-2 rounded-full transition-all cursor-pointer ${
                  i === currentStepIndex
                    ? 'w-6 bg-amber-400'
                    : 'w-2 bg-zinc-700 hover:bg-zinc-600'
                }`}
                title={`Jump to step ${i + 1}`}
                aria-label={`Jump to step ${i + 1}`}
              />
            ))}
          </div>

          {/* Navigation Controls */}
          <div className="flex items-center space-x-2">
            <button
              onClick={goToPrevStep}
              className="inline-flex items-center space-x-1 rounded-md border border-zinc-700 bg-zinc-800/80 px-2.5 py-1 text-xs text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 transition-colors cursor-pointer"
            >
              <ArrowLeft className="h-3 w-3" />
              <span>Back</span>
            </button>

            {currentStepIndex < steps.length - 1 ? (
              <button
                onClick={goToNextStep}
                className="inline-flex items-center space-x-1 rounded-md border border-amber-500/50 bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-1 text-xs font-semibold text-zinc-950 shadow-xs hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer"
              >
                <span>Next Step</span>
                <ArrowRight className="h-3 w-3" />
              </button>
            ) : (
              <button
                onClick={onExitDemo}
                className="inline-flex items-center space-x-1 rounded-md border border-amber-500/50 bg-gradient-to-r from-amber-600 to-amber-500 px-3 py-1 text-xs font-semibold text-zinc-950 shadow-xs hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer"
              >
                <LogIn className="h-3 w-3" />
                <span>Begin Real Journal</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </aside>
  );
};
