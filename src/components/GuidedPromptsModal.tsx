import React, { useState } from 'react';
import { Sparkles, Sun, Compass, BookOpen, ChevronRight, X, ArrowRight, Lightbulb } from 'lucide-react';
import { ContemplationPrompt, TOPICAL_CHALLENGE_PROMPTS, getDailyShloka } from '../data/promptsData';
import { GitaVerse, GITA_VERSES } from '../data/gitaVerses';

interface GuidedPromptsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectPrompt: (prompt: {
    title: string;
    starterText: string;
    verseCitation?: string;
    verse?: GitaVerse;
    suggestedMood?: string;
  }) => void;
}

export const GuidedPromptsModal: React.FC<GuidedPromptsModalProps> = ({
  isOpen,
  onClose,
  onSelectPrompt
}) => {
  const [activeTab, setActiveTab] = useState<'daily' | 'topical'>('daily');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  if (!isOpen) return null;

  const dailyShloka = getDailyShloka();

  const handleApplyDaily = () => {
    onSelectPrompt({
      title: `Daily Contemplation: ${dailyShloka.verse.citation}`,
      starterText: `### Daily Contemplation — ${dailyShloka.verse.citation}\n\n**Sacred Verse:**\n> "${dailyShloka.verse.translation}"\n\n**Contemplation Question:**\n${dailyShloka.prompt}\n\n**My Reflection:**\n`,
      verseCitation: dailyShloka.verse.citation,
      verse: dailyShloka.verse,
      suggestedMood: 'Contemplative'
    });
    onClose();
  };

  const handleApplyTopical = (prompt: ContemplationPrompt) => {
    const matchedVerse = GITA_VERSES.find(v => v.citation === prompt.verseCitation);
    const startersList = prompt.reflectionStarters.map(s => `- ${s}`).join('\n');
    
    onSelectPrompt({
      title: prompt.title,
      starterText: `### ${prompt.title} (${prompt.verseCitation})\n\n**Life Situation:**\n${prompt.situation}\n\n**Core Inquiry:**\n${prompt.promptQuestion}\n\n**Reflection Anchors:**\n${startersList}\n\n**My Thoughts:**\n`,
      verseCitation: prompt.verseCitation,
      verse: matchedVerse,
      suggestedMood: prompt.suggestedMood
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 backdrop-blur-md p-4 animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl max-h-[88vh] flex flex-col rounded-2xl border border-amber-500/30 bg-[#121110] shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-5 sm:p-6 border-b border-zinc-800 bg-[#151413]">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-400">
              <Lightbulb className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-classical text-lg font-semibold text-zinc-100 tracking-wide">
                Contemplation Prompts & Daily Shloka
              </h2>
              <p className="text-xs text-zinc-400 font-serif-journal">
                Structured inquiry templates to start writing when words are elusive
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex border-b border-zinc-800 bg-zinc-900/50 px-6 pt-3">
          <button
            onClick={() => setActiveTab('daily')}
            className={`flex items-center space-x-2 pb-3 px-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'daily'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Sun className="h-4 w-4" />
            <span>Today's Daily Shloka</span>
          </button>

          <button
            onClick={() => setActiveTab('topical')}
            className={`flex items-center space-x-2 pb-3 px-3 text-xs font-semibold uppercase tracking-wider border-b-2 transition-all ${
              activeTab === 'topical'
                ? 'border-amber-400 text-amber-300'
                : 'border-transparent text-zinc-400 hover:text-zinc-200'
            }`}
          >
            <Compass className="h-4 w-4" />
            <span>Life Situations & Challenges</span>
          </button>
        </div>

        {/* Modal Body */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {activeTab === 'daily' && (
            <div className="space-y-6">
              {/* Daily Shloka Card */}
              <div className="rounded-2xl border border-amber-500/40 bg-[#171614] p-6 shadow-lg">
                <div className="flex items-center justify-between text-xs pb-3 border-b border-zinc-800">
                  <span className="flex items-center space-x-1.5 font-classical text-amber-400 uppercase tracking-wider">
                    <Sun className="h-4 w-4 text-amber-400" />
                    <span>Daily Wisdom #{dailyShloka.dayNumber}</span>
                  </span>
                  <span className="rounded-full bg-amber-950/60 border border-amber-500/30 px-2.5 py-0.5 font-mono text-[11px] text-amber-300">
                    {dailyShloka.verse.citation} • {dailyShloka.themeTitle}
                  </span>
                </div>

                <div className="mt-4 space-y-3">
                  <p className="font-classical text-sm text-amber-100/90 leading-relaxed italic bg-black/30 p-3 rounded-xl border border-zinc-800/80">
                    "{dailyShloka.verse.sanskrit}"
                  </p>
                  <p className="font-serif-journal text-sm text-zinc-200 leading-relaxed">
                    {dailyShloka.verse.translation}
                  </p>
                </div>

                {/* Socratic Daily Question */}
                <div className="mt-5 rounded-xl border border-amber-500/20 bg-amber-950/20 p-4">
                  <span className="text-[10px] uppercase font-semibold text-amber-400/90 tracking-wider">
                    Contemplation Question
                  </span>
                  <p className="font-serif-journal text-xs sm:text-sm text-amber-100 mt-1 italic leading-relaxed">
                    "{dailyShloka.prompt}"
                  </p>
                </div>

                <div className="mt-6 flex justify-end">
                  <button
                    id="apply-daily-shloka-btn"
                    onClick={handleApplyDaily}
                    className="flex items-center space-x-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-semibold text-zinc-950 hover:bg-amber-400 shadow-md transition-all cursor-pointer"
                  >
                    <span>Write on Today's Shloka</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'topical' && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {TOPICAL_CHALLENGE_PROMPTS.map((item) => (
                  <div
                    key={item.id}
                    className="flex flex-col justify-between rounded-xl border border-zinc-800 bg-zinc-900/40 p-4 hover:border-amber-500/40 hover:bg-zinc-900/70 transition-all group"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-classical text-xs font-semibold text-zinc-100 group-hover:text-amber-300 transition-colors">
                          {item.title}
                        </h4>
                        <span className="rounded-md bg-zinc-800 border border-zinc-700 px-2 py-0.5 text-[10px] font-mono text-amber-400">
                          {item.verseCitation}
                        </span>
                      </div>

                      <p className="text-[11px] text-zinc-400 font-serif-journal mb-3 leading-relaxed">
                        {item.situation}
                      </p>

                      <div className="rounded-lg bg-black/40 p-2.5 border border-zinc-800/80 mb-3">
                        <span className="text-[9px] uppercase font-semibold text-amber-400/80 block mb-0.5">
                          Inquiry:
                        </span>
                        <p className="font-serif-journal text-[11px] text-zinc-300 italic leading-relaxed">
                          "{item.promptQuestion}"
                        </p>
                      </div>
                    </div>

                    <button
                      onClick={() => handleApplyTopical(item)}
                      className="mt-2 flex items-center justify-between w-full rounded-lg bg-zinc-800 px-3 py-1.5 text-xs text-amber-300 hover:bg-amber-500/20 hover:border-amber-500/30 border border-transparent transition-all cursor-pointer"
                    >
                      <span>Use this Prompt</span>
                      <ChevronRight className="h-3.5 w-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
