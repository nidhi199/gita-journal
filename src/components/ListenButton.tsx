import React from 'react';
import { Volume2, VolumeX, Square, Play } from 'lucide-react';
import { useSpeechSynthesis } from '../hooks/useSpeechSynthesis';

interface ListenButtonProps {
  text: string;
  id: string;
  label?: string;
  className?: string;
  speechSynthesisState?: ReturnType<typeof useSpeechSynthesis>;
}

export const ListenButton: React.FC<ListenButtonProps> = ({
  text,
  id,
  label = 'Listen',
  className = '',
  speechSynthesisState
}) => {
  const defaultSynth = useSpeechSynthesis();
  const synth = speechSynthesisState || defaultSynth;

  if (!synth.isSupported || !text.trim()) {
    return null;
  }

  const isCurrentSpeaking = synth.speakingId === id;

  const handleClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    synth.toggle(id, text);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      id={`listen-btn-${id}`}
      title={isCurrentSpeaking ? 'Stop listening' : 'Listen to this response aloud'}
      className={`inline-flex items-center space-x-1.5 rounded-md px-2 py-1 text-xs font-medium transition-all ${
        isCurrentSpeaking
          ? 'bg-amber-500/30 text-amber-200 border border-amber-500/50 shadow-xs shadow-amber-500/20'
          : 'bg-zinc-800/80 text-zinc-300 hover:text-zinc-100 hover:bg-zinc-700/80 border border-zinc-700/60'
      } ${className}`}
    >
      {isCurrentSpeaking ? (
        <>
          <Square className="h-3 w-3 fill-amber-300 text-amber-300 shrink-0" />
          <span className="text-[11px] text-amber-200">Stop</span>
          <span className="flex items-center space-x-0.5 ml-1">
            <span className="h-2 w-0.5 bg-amber-400 animate-pulse" />
            <span className="h-3 w-0.5 bg-amber-300 animate-pulse delay-75" />
            <span className="h-2 w-0.5 bg-amber-400 animate-pulse delay-150" />
          </span>
        </>
      ) : (
        <>
          <Volume2 className="h-3.5 w-3.5 text-zinc-400 group-hover:text-zinc-200 shrink-0" />
          <span className="text-[11px]">{label}</span>
        </>
      )}
    </button>
  );
};
