import React from 'react';
import { 
  X, 
  Sparkles, 
  Compass, 
  BookOpen, 
  HeartHandshake, 
  ShieldCheck, 
  Volume2, 
  MapPin, 
  ArrowRight,
  Flame,
  CheckCircle2,
  Scroll
} from 'lucide-react';

interface DemoWalkthroughModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLaunchDemo?: () => void;
  onStartDemo?: () => void;
  onSignIn?: () => void;
}

export const DemoWalkthroughModal: React.FC<DemoWalkthroughModalProps> = ({
  isOpen,
  onClose,
  onLaunchDemo,
  onStartDemo,
  onSignIn
}) => {
  if (!isOpen) return null;

  const handleLaunch = () => {
    if (onLaunchDemo) {
      onLaunchDemo();
    } else if (onStartDemo) {
      onStartDemo();
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/75 backdrop-blur-xs overflow-y-auto animate-in fade-in duration-200">
      <div 
        className="relative w-full max-w-2xl rounded-2xl border border-zinc-700/70 bg-[#121316] text-zinc-100 shadow-2xl shadow-black/60 overflow-hidden my-auto"
        role="dialog"
        aria-modal="true"
        aria-labelledby="walkthrough-title"
      >
        {/* Header with warm ambient glow */}
        <div className="relative border-b border-zinc-800/80 bg-gradient-to-r from-amber-950/30 via-zinc-900/60 to-zinc-900/40 p-5 sm:p-6">
          <button
            id="close-walkthrough-btn"
            onClick={onClose}
            className="absolute top-4 right-4 rounded-lg p-1.5 text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Close walkthrough"
          >
            <X className="h-5 w-5" />
          </button>

          <div className="flex items-center space-x-2.5 mb-2">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-amber-500/40 bg-amber-950/40 text-amber-300 shadow-xs">
              <Scroll className="h-4 w-4" />
            </span>
            <span className="text-xs font-semibold tracking-wider text-amber-400 uppercase">
              Interactive Guide
            </span>
          </div>

          <h2 id="walkthrough-title" className="font-classical text-xl sm:text-2xl font-semibold text-zinc-100 tracking-wide">
            How Gita Journal Works
          </h2>
          <p className="mt-1.5 text-xs sm:text-sm text-zinc-300 leading-relaxed font-sans">
            A private contemplative sanctuary that weaves ancient philosophical discernment with modern emotional reflection.
          </p>
        </div>

        {/* 5 Architectural Steps */}
        <div className="p-5 sm:p-6 space-y-4 max-h-[65vh] overflow-y-auto font-sans">
          
          {/* Step 1 */}
          <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700/80 hover:bg-zinc-900/80">
            <div className="flex items-start space-x-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-amber-300 text-xs font-bold border border-zinc-700/60">
                1
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <h3 className="text-sm font-semibold text-zinc-100">Write Raw Contemplations</h3>
                  <span className="rounded-full bg-zinc-800/80 border border-zinc-700/60 px-2 py-0.5 text-[10px] text-zinc-400">
                    Voice or Text
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                  Express dilemmas, fatigue, or moral conflicts freely without trying to sound spiritual. Use speech dictation, select mood ratings, and optionally attach your quiet <strong>Sanctuary GPS location</strong> (e.g. Home Balcony, Riverside Ghat).
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2 text-[11px] text-zinc-400">
                  <span className="inline-flex items-center space-x-1 rounded bg-zinc-950/60 px-2 py-0.5 border border-zinc-800/80">
                    <MapPin className="h-3 w-3 text-emerald-400" />
                    <span>Sanctuary Geotags</span>
                  </span>
                  <span className="inline-flex items-center space-x-1 rounded bg-zinc-950/60 px-2 py-0.5 border border-zinc-800/80">
                    <Flame className="h-3 w-3 text-amber-400" />
                    <span>Sattva / Rajas / Tamas</span>
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="group rounded-xl border border-amber-500/25 bg-amber-950/10 p-4 transition-all hover:border-amber-500/40 hover:bg-amber-950/15">
            <div className="flex items-start space-x-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-amber-950/50 text-amber-300 text-xs font-bold border border-amber-500/30">
                2
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Compass className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-amber-200">The Socratic Pause (Clarifying Inquiry)</h3>
                </div>
                <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                  Instead of generating shallow, rapid advice, the guide acts as a quiet companion—asking <strong>ONE thoughtful clarifying question</strong> to help you examine hidden expectations, attachments, or fears before offering scripture.
                </p>
                <div className="mt-2 rounded-lg border border-amber-500/20 bg-amber-950/25 p-2.5 text-xs italic text-amber-200/90 font-serif-journal">
                  "What expectation are you holding onto about how this outcome must unfold?"
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700/80 hover:bg-zinc-900/80">
            <div className="flex items-start space-x-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-amber-300 text-xs font-bold border border-zinc-700/60">
                3
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-zinc-100">100% Verified Scripture Canon</h3>
                  <span className="rounded-full bg-emerald-950/30 border border-emerald-500/30 px-2 py-0.5 text-[10px] text-emerald-300">
                    Zero Hallucinations
                  </span>
                </div>
                <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                  Guidance is anchored strictly in a curated dataset of authentic Bhagavad Gita verses categorized across 16 existential themes. Listen to authentic <strong>Sanskrit recitation</strong> chanting and read rigorous philosophical translations.
                </p>
                <div className="mt-2.5 flex items-center space-x-2 text-[11px] text-zinc-400">
                  <Volume2 className="h-3.5 w-3.5 text-amber-400" />
                  <span>Interactive Sanskrit audio playback & verse library browser</span>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700/80 hover:bg-zinc-900/80">
            <div className="flex items-start space-x-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-amber-300 text-xs font-bold border border-zinc-700/60">
                4
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <Flame className="h-4 w-4 text-amber-400" />
                  <h3 className="text-sm font-semibold text-zinc-100">Emotional Vault & Guna Balance</h3>
                </div>
                <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                  Review long-term trends across the three fundamental qualities: <strong>Sattva</strong> (clarity and peace), <strong>Rajas</strong> (passion, stress, action), and <strong>Tamas</strong> (heaviness and fatigue). Celebrate mindful habit streaks and recall past breakthroughs.
                </p>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="group rounded-xl border border-zinc-800/80 bg-zinc-900/50 p-4 transition-all hover:border-zinc-700/80 hover:bg-zinc-900/80">
            <div className="flex items-start space-x-3.5">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-zinc-800 text-emerald-400 text-xs font-bold border border-zinc-700/60">
                5
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center space-x-2">
                  <ShieldCheck className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-semibold text-zinc-100">Zero-Trust Privacy & Crisis Safeguards</h3>
                </div>
                <p className="mt-1 text-xs text-zinc-300 leading-relaxed">
                  Your reflections are isolated to your private account and never used to train public AI models. In moments of acute distress, the app immediately provides verified 24/7 human crisis support helplines.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Footer actions */}
        <div className="border-t border-zinc-800/80 bg-zinc-900/80 p-4 sm:p-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center space-x-2 text-xs text-zinc-400">
            <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0" />
            <span>Try everything risk-free in the interactive sandbox</span>
          </div>

          <div className="flex items-center space-x-3 w-full sm:w-auto">
            {onSignIn && (
              <button
                type="button"
                onClick={onSignIn}
                className="flex-1 sm:flex-none text-xs font-medium text-zinc-300 hover:text-zinc-100 py-2.5 px-3.5 rounded-lg border border-zinc-700/80 hover:bg-zinc-800 transition-colors"
              >
                Sign In With Google
              </button>
            )}
            <button
              id="launch-demo-sandbox-btn"
              type="button"
              onClick={handleLaunch}
              className="flex-1 sm:flex-none inline-flex items-center justify-center space-x-2 rounded-lg border border-amber-500/50 bg-gradient-to-r from-amber-600 to-amber-500 px-4 py-2.5 text-xs font-semibold text-zinc-950 shadow-md shadow-amber-950/30 hover:from-amber-500 hover:to-amber-400 transition-all cursor-pointer"
            >
              <Sparkles className="h-3.5 w-3.5" />
              <span>Launch Interactive Demo</span>
              <ArrowRight className="h-3.5 w-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
