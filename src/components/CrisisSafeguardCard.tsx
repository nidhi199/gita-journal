import React from 'react';
import { HeartHandshake, Phone, ExternalLink, ShieldAlert, Heart } from 'lucide-react';
import { CrisisResource } from '../types';
import { INDIA_CRISIS_RESOURCES } from '../data/crisisResources';
import { ListenButton } from './ListenButton';

interface CrisisSafeguardCardProps {
  guidanceText?: string | null;
  resources?: CrisisResource[];
  compact?: boolean;
}

export const CrisisSafeguardCard: React.FC<CrisisSafeguardCardProps> = ({
  guidanceText,
  resources = INDIA_CRISIS_RESOURCES,
  compact = false
}) => {
  const displayResources = resources && resources.length > 0 ? resources : INDIA_CRISIS_RESOURCES;
  const defaultCareMessage = "It sounds like you are carrying immense pain and feeling overwhelmed right now. Please know that your life and well-being matter deeply, and you do not have to carry this heavy burden alone. While this journal offers philosophical contemplation, your immediate safety and care are what truly matter most right now. Please reach out to one of the compassionate support resources below — people who are ready to listen and support you without judgment.";
  const messageToRead = guidanceText || defaultCareMessage;

  return (
    <div className="rounded-xl border border-rose-500/40 bg-gradient-to-b from-rose-950/40 to-[#181113] p-5 shadow-xl shadow-black/50 text-zinc-100">
      
      {/* Header */}
      <div className="flex items-center justify-between border-b border-rose-900/40 pb-2.5 mb-3">
        <div className="flex items-center space-x-2.5 text-rose-300 font-medium text-sm">
          <div className="rounded-full bg-rose-500/20 p-1.5 border border-rose-500/30">
            <HeartHandshake className="h-4 w-4 text-rose-400" />
          </div>
          <div>
            <span className="font-semibold text-rose-200">Compassionate Care & Crisis Support</span>
            <span className="text-[10px] text-rose-300/70 block">Available 24/7 • Confidential • Immediate Human Support</span>
          </div>
        </div>

        <ListenButton id="crisis-care-message" text={messageToRead} label="Listen" />
      </div>

      {/* Compassionate Message */}
      <p className="text-xs leading-relaxed text-zinc-200 font-sans mb-4 bg-black/20 p-3 rounded-lg border border-rose-900/30">
        {messageToRead}
      </p>

      {/* Helplines List - ALWAYS Rendered directly beneath the care message */}
      <div className="space-y-2.5 pt-1">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold text-rose-200/90 uppercase tracking-wider flex items-center space-x-1.5">
            <Phone className="h-3 w-3 text-rose-400" />
            <span>Verified Support Helplines (India):</span>
          </span>
          <span className="text-[10px] text-rose-300/60">Free & Confidential</span>
        </div>

        <div className="space-y-2">
          {displayResources.map((res, idx) => (
            <div 
              key={idx} 
              className="rounded-lg bg-[#141215] p-3 border border-rose-900/30 hover:border-rose-500/40 transition-colors shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div className="flex-1">
                  <div className="font-semibold text-xs text-zinc-100 flex items-center space-x-1.5">
                    <span>{res.name}</span>
                  </div>
                  
                  {/* Helpline Numbers Badge */}
                  <div className="mt-1.5 inline-flex items-center space-x-2 rounded-md bg-rose-950/60 border border-rose-500/30 px-2.5 py-1">
                    <Phone className="h-3 w-3 text-rose-400 shrink-0" />
                    <span className="font-mono text-xs font-bold text-rose-200 tracking-wide">
                      {res.contact}
                    </span>
                  </div>
                </div>

                {res.url && (
                  <a 
                    href={res.url} 
                    target="_blank" 
                    rel="noreferrer" 
                    className="shrink-0 text-[11px] text-rose-300 hover:text-rose-100 flex items-center space-x-1 bg-zinc-800/80 hover:bg-zinc-700/80 px-2 py-1 rounded border border-zinc-700/60 transition-colors"
                  >
                    <span>Website</span>
                    <ExternalLink className="h-3 w-3" />
                  </a>
                )}
              </div>

              <p className="mt-2 text-[11px] leading-relaxed text-zinc-300">
                {res.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-rose-900/30 text-[10px] text-zinc-400 text-center flex items-center justify-center space-x-1.5">
        <Heart className="h-3 w-3 text-rose-400" />
        <span>You are worthy of support, care, and peaceful healing. Please reach out to someone today.</span>
      </div>

    </div>
  );
};
