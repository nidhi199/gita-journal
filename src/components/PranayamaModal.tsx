import React, { useState, useEffect, useRef } from 'react';
import { Wind, Play, Square, Volume2, VolumeX, Sparkles, X, CheckCircle2 } from 'lucide-react';

interface PranayamaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete?: () => void;
}

type BreathPhase = 'inhale' | 'hold-in' | 'exhale' | 'hold-out';

interface BreathPattern {
  name: string;
  sanskrit: string;
  description: string;
  inhale: number;
  holdIn: number;
  exhale: number;
  holdOut: number;
  rounds: number;
  gunaEffect: 'Sattva' | 'Shanti' | 'Balancing';
}

const BREATH_PATTERNS: BreathPattern[] = [
  {
    name: 'Sama Vritti (Equal Ratio)',
    sanskrit: 'समवृत्ति प्राणायाम',
    description: 'Equal, measured breathing to calm a turbulent, overthinking mind into steady equilibrium.',
    inhale: 4,
    holdIn: 4,
    exhale: 4,
    holdOut: 4,
    rounds: 4,
    gunaEffect: 'Sattva'
  },
  {
    name: 'Prana Shanti (Calm & Release)',
    sanskrit: 'शान्ति प्राणायाम',
    description: 'Extended exhalations designed to activate parasympathetic calm and wash away anxiety.',
    inhale: 4,
    holdIn: 2,
    exhale: 6,
    holdOut: 2,
    rounds: 4,
    gunaEffect: 'Shanti'
  },
  {
    name: 'Vichara Centering (Deep Pause)',
    sanskrit: 'विचार धारणा',
    description: 'Deep meditative pauses to create space between stimulus and conscious reaction.',
    inhale: 5,
    holdIn: 5,
    exhale: 5,
    holdOut: 0,
    rounds: 4,
    gunaEffect: 'Balancing'
  }
];

export const PranayamaModal: React.FC<PranayamaModalProps> = ({ isOpen, onClose, onComplete }) => {
  const [selectedPattern, setSelectedPattern] = useState<BreathPattern>(BREATH_PATTERNS[0]);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [currentRound, setCurrentRound] = useState<number>(1);
  const [currentPhase, setCurrentPhase] = useState<BreathPhase>('inhale');
  const [secondsRemaining, setSecondsRemaining] = useState<number>(BREATH_PATTERNS[0].inhale);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [isFinished, setIsFinished] = useState<boolean>(false);

  const audioCtxRef迷 = useRef<AudioContext | null>(null);

  // Initialize Web Audio API for gentle singing bowl tone
  const playTone = (freq: number = 432, duration: number = 0.8) => {
    if (!soundEnabled) return;
    try {
      if (!audioCtxRef迷.current) {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        audioCtxRef迷.current = new AudioCtx();
      }
      const ctx = audioCtxRef迷.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      
      // Soft ambient envelope
      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.08, ctx.currentTime + 0.1);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + duration);
    } catch {
      // Audio context might be restricted before interaction
    }
  };

  useEffect(() => {
    let timer: NodeJS.Timeout | null = null;

    if (isActive) {
      timer = setInterval(() => {
        setSecondsRemaining((prev) => {
          if (prev <= 1) {
            // Transition to next phase
            if (currentPhase === 'inhale') {
              if (selectedPattern.holdIn > 0) {
                setCurrentPhase('hold-in');
                playTone(528, 0.4);
                return selectedPattern.holdIn;
              } else {
                setCurrentPhase('exhale');
                playTone(396, 0.6);
                return selectedPattern.exhale;
              }
            } else if (currentPhase === 'hold-in') {
              setCurrentPhase('exhale');
              playTone(396, 0.6);
              return selectedPattern.exhale;
            } else if (currentPhase === 'exhale') {
              if (selectedPattern.holdOut > 0) {
                setCurrentPhase('hold-out');
                playTone(432, 0.4);
                return selectedPattern.holdOut;
              } else {
                // Next round
                if (currentRound >= selectedPattern.rounds) {
                  setIsActive(false);
                  setIsFinished(true);
                  playTone(639, 1.2);
                  return 0;
                }
                setCurrentRound((r) => r + 1);
                setCurrentPhase('inhale');
                playTone(528, 0.8);
                return selectedPattern.inhale;
              }
            } else if (currentPhase === 'hold-out') {
              if (currentRound >= selectedPattern.rounds) {
                setIsActive(false);
                setIsFinished(true);
                playTone(639, 1.2);
                return 0;
              }
              setCurrentRound((r) => r + 1);
              setCurrentPhase('inhale');
              playTone(528, 0.8);
              return selectedPattern.inhale;
            }
            return selectedPattern.inhale;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timer) clearInterval(timer);
    };
  }, [isActive, currentPhase, currentRound, selectedPattern, soundEnabled]);

  const handleStart = () => {
    setIsActive(true);
    setIsFinished(false);
    setCurrentRound(1);
    setCurrentPhase('inhale');
    setSecondsRemaining(selectedPattern.inhale);
    playTone(528, 0.8);
  };

  const handleStop = () => {
    setIsActive(false);
    setCurrentPhase('inhale');
    setSecondsRemaining(selectedPattern.inhale);
  };

  if (!isOpen) return null;

  const phaseInstruction = {
    'inhale': { label: 'Breathe In Gently', color: 'text-amber-300', scale: 'scale-115', ring: 'border-amber-400/80 shadow-[0_0_40px_rgba(245,158,11,0.25)]' },
    'hold-in': { label: 'Hold In Awareness', color: 'text-emerald-300', scale: 'scale-115', ring: 'border-emerald-400/80 shadow-[0_0_40px_rgba(52,211,153,0.25)]' },
    'exhale': { label: 'Release & Let Go', color: 'text-indigo-300', scale: 'scale-90', ring: 'border-indigo-400/80 shadow-[0_0_30px_rgba(129,140,248,0.2)]' },
    'hold-out': { label: 'Rest in Stillness', color: 'text-zinc-400', scale: 'scale-90', ring: 'border-zinc-600/80 shadow-[0_0_20px_rgba(161,161,170,0.15)]' }
  }[currentPhase];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-lg rounded-2xl border border-amber-500/30 bg-[#121110] p-6 sm:p-8 shadow-2xl">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
          <div className="flex items-center space-x-2.5">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Wind className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-classical text-base font-semibold text-zinc-100 tracking-wide">
                Pranayama Centering
              </h2>
              <p className="text-[11px] text-zinc-400 font-serif-journal">
                Settle the restless mind before entering sacred contemplation
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setSoundEnabled(!soundEnabled)}
              title={soundEnabled ? 'Mute Chimes' : 'Enable Chimes'}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            >
              {soundEnabled ? <Volume2 className="h-4 w-4 text-amber-400" /> : <VolumeX className="h-4 w-4" />}
            </button>
            <button
              onClick={onClose}
              className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Pattern Selection (when paused) */}
        {!isActive && !isFinished && (
          <div className="mt-5 space-y-3">
            <label className="text-[11px] font-semibold uppercase tracking-wider text-zinc-400">
              Select Breathwork Rhythm:
            </label>
            <div className="grid grid-cols-1 gap-2.5">
              {BREATH_PATTERNS.map((pat) => (
                <button
                  key={pat.name}
                  onClick={() => {
                    setSelectedPattern(pat);
                    setSecondsRemaining(pat.inhale);
                  }}
                  className={`flex flex-col text-left p-3 rounded-xl border transition-all ${
                    selectedPattern.name === pat.name
                      ? 'border-amber-500/60 bg-amber-950/25 shadow-sm'
                      : 'border-zinc-800/80 bg-zinc-900/40 hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-zinc-200">{pat.name}</span>
                    <span className="text-[10px] font-classical text-amber-400/90">{pat.sanskrit}</span>
                  </div>
                  <p className="text-[11px] text-zinc-400 mt-1 font-serif-journal leading-relaxed">
                    {pat.description}
                  </p>
                  <div className="mt-2 flex items-center space-x-2 text-[10px] text-zinc-400 font-mono">
                    <span>Ratio: {pat.inhale}s - {pat.holdIn}s - {pat.exhale}s {pat.holdOut > 0 ? `- ${pat.holdOut}s` : ''}</span>
                    <span>•</span>
                    <span>{pat.rounds} Cycles</span>
                  </div>
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Breathwork Visualizer Circle */}
        {(isActive || isFinished) && (
          <div className="my-8 flex flex-col items-center justify-center">
            {isFinished ? (
              <div className="text-center py-6 animate-in zoom-in-95 duration-300">
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 mb-3">
                  <CheckCircle2 className="h-8 w-8" />
                </div>
                <h3 className="font-classical text-lg text-emerald-300">Centered & Still</h3>
                <p className="text-xs text-zinc-300 mt-1 font-serif-journal max-w-xs mx-auto">
                  Your breath is balanced, and your mind is ready to reflect with clarity.
                </p>
              </div>
            ) : (
              <div className="relative flex items-center justify-center">
                {/* Expanding / Contracting Halo */}
                <div
                  className={`h-48 w-48 rounded-full border-2 transition-all duration-1000 ease-in-out flex flex-col items-center justify-center ${phaseInstruction.ring} ${phaseInstruction.scale}`}
                >
                  <span className={`text-3xl font-bold font-mono ${phaseInstruction.color}`}>
                    {secondsRemaining}
                  </span>
                  <span className="text-[11px] uppercase tracking-wider font-classical text-zinc-300 mt-1 text-center px-2">
                    {phaseInstruction.label}
                  </span>
                </div>

                {/* Outer guide ring */}
                <div className="absolute inset-0 -m-3 rounded-full border border-dashed border-zinc-800 pointer-events-none" />
              </div>
            )}

            {isActive && (
              <div className="mt-6 flex items-center space-x-3 text-xs text-zinc-400 font-mono">
                <span>Cycle {currentRound} of {selectedPattern.rounds}</span>
                <span>•</span>
                <span className="text-amber-300/80">{selectedPattern.gunaEffect} Centering</span>
              </div>
            )}
          </div>
        )}

        {/* Action Controls */}
        <div className="mt-6 flex items-center justify-between pt-4 border-t border-zinc-800">
          {!isActive && !isFinished && (
            <>
              <div className="flex items-center space-x-1.5 text-xs text-zinc-400 font-serif-journal italic">
                <Sparkles className="h-3.5 w-3.5 text-amber-400/70" />
                <span>Takes ~60 seconds</span>
              </div>

              <button
                id="start-breathwork-btn"
                onClick={handleStart}
                className="flex items-center space-x-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-amber-400 shadow-md transition-all cursor-pointer"
              >
                <Play className="h-3.5 w-3.5 fill-current" />
                <span>Begin Centering</span>
              </button>
            </>
          )}

          {isActive && (
            <>
              <button
                onClick={handleStop}
                className="flex items-center space-x-1.5 rounded-lg border border-zinc-700 bg-zinc-900 px-3.5 py-1.5 text-xs text-zinc-300 hover:bg-zinc-800 transition-colors"
              >
                <Square className="h-3.5 w-3.5" />
                <span>Pause</span>
              </button>

              <button
                onClick={() => {
                  handleStop();
                  onClose();
                }}
                className="text-xs text-zinc-400 hover:text-zinc-200"
              >
                Skip to Journal
              </button>
            </>
          )}

          {isFinished && (
            <div className="w-full flex justify-end">
              <button
                id="finish-breathwork-btn"
                onClick={() => {
                  if (onComplete) onComplete();
                  onClose();
                }}
                className="flex items-center space-x-2 rounded-xl bg-emerald-500 px-5 py-2 text-xs font-semibold text-zinc-950 hover:bg-emerald-400 shadow-md transition-all cursor-pointer"
              >
                <span>Enter Journaling</span>
                <Sparkles className="h-3.5 w-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
