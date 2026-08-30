import React, { useState } from 'react';
import { Scroll, Search, BookOpen, X, Check, Tag } from 'lucide-react';
import { GITA_VERSES, THEME_CATEGORIES, ThemeCategory, GitaVerse } from '../data/gitaVerses';

interface GitaLibraryModalProps {
  onClose: () => void;
  onSelectVerseForInspiration?: (verse: GitaVerse) => void;
}

export const GitaLibraryModal: React.FC<GitaLibraryModalProps> = ({
  onClose,
  onSelectVerseForInspiration
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChapter, setSelectedChapter] = useState<number | 'all'>('all');
  const [selectedTheme, setSelectedTheme] = useState<ThemeCategory | 'all'>('all');

  const filteredVerses = GITA_VERSES.filter(v => {
    const matchesSearch = 
      v.citation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.theme.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.translation.toLowerCase().includes(searchTerm.toLowerCase()) ||
      v.keywords.some(k => k.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (v.subThemes && v.subThemes.some(st => st.toLowerCase().includes(searchTerm.toLowerCase())));

    const matchesChapter = selectedChapter === 'all' || v.chapter === selectedChapter;
    const matchesTheme = selectedTheme === 'all' || v.category === selectedTheme || v.additionalCategories?.includes(selectedTheme);
    return matchesSearch && matchesChapter && matchesTheme;
  });

  const uniqueChapters = Array.from(new Set(GITA_VERSES.map(v => v.chapter))).sort((a, b) => a - b);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 p-4 backdrop-blur-xs">
      <div className="relative flex max-h-[90vh] w-full max-w-4xl flex-col rounded-2xl border border-zinc-800 bg-[#111215] shadow-2xl">
        
        {/* Modal Header */}
        <div className="flex items-center justify-between border-b border-zinc-800 p-5">
          <div className="flex items-center space-x-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-950/30 text-amber-300">
              <Scroll className="h-5 w-5" />
            </div>
            <div>
              <h2 className="font-classical text-lg font-semibold text-zinc-100">
                Verified Bhagavad Gita Canon ({GITA_VERSES.length} Verses)
              </h2>
              <p className="text-xs text-zinc-400">
                A developer-curated dataset mapped across 16 thematic categories.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Filter controls */}
        <div className="flex flex-col gap-3 border-b border-zinc-800/80 bg-zinc-950/40 p-4">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search by keyword, theme, or citation (e.g. fear, 2.47, grief, anger)..."
                className="w-full rounded-lg border border-zinc-800 bg-zinc-900 py-2 pl-9 pr-4 text-xs text-zinc-200 placeholder:text-zinc-400 focus:border-amber-500/50 focus:outline-none"
              />
            </div>

            {/* Chapter Filter */}
            <div className="flex items-center space-x-1.5 overflow-x-auto text-xs">
              <span className="text-zinc-400 mr-1 text-[11px]">Chapter:</span>
              <button
                onClick={() => setSelectedChapter('all')}
                className={`rounded px-2.5 py-1 text-[11px] font-medium ${
                  selectedChapter === 'all'
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                All
              </button>
              {uniqueChapters.map(ch => (
                <button
                  key={ch}
                  onClick={() => setSelectedChapter(ch)}
                  className={`rounded px-2.5 py-1 text-[11px] font-medium ${
                    selectedChapter === ch
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  Ch. {ch}
                </button>
              ))}
            </div>
          </div>

          {/* Theme Category Filter Pills */}
          <div className="flex items-center space-x-1.5 overflow-x-auto text-xs pt-1 pb-0.5 no-scrollbar">
            <span className="text-zinc-400 mr-1 text-[11px] shrink-0">Theme:</span>
            <button
              onClick={() => setSelectedTheme('all')}
              className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                selectedTheme === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              All Categories ({GITA_VERSES.length})
            </button>
            {THEME_CATEGORIES.map(tc => {
              const count = GITA_VERSES.filter(v => v.category === tc.category || v.additionalCategories?.includes(tc.category)).length;
              return (
                <button
                  key={tc.category}
                  onClick={() => setSelectedTheme(tc.category)}
                  className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-medium transition-colors ${
                    selectedTheme === tc.category
                      ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                      : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                  }`}
                >
                  {tc.displayName} ({count})
                </button>
              );
            })}
          </div>
        </div>

        {/* Verses List */}
        <div className="flex-1 overflow-y-auto p-5 space-y-4">
          {filteredVerses.map(v => (
            <div
              key={v.id}
              className="rounded-xl border border-zinc-800/90 bg-[#141418] p-5 transition-all hover:border-amber-500/30"
            >
              <div className="flex flex-wrap items-center justify-between border-b border-zinc-800/60 pb-2.5 mb-3 gap-2">
                <span className="font-classical text-xs font-semibold tracking-wider text-amber-300">
                  {v.citation}
                </span>
                <div className="flex items-center space-x-2">
                  <span className="rounded-full bg-amber-950/40 border border-amber-500/20 px-2.5 py-0.5 text-[10px] text-amber-300/90">
                    {v.theme}
                  </span>
                  <span className="rounded-full bg-zinc-800/60 border border-zinc-700/50 px-2 py-0.5 text-[9px] text-zinc-400 font-mono">
                    {v.category}
                  </span>
                </div>
              </div>

              <p className="font-serif text-sm font-medium text-amber-100/90 whitespace-pre-line leading-relaxed">
                {v.sanskrit}
              </p>
              
              <p className="mt-1.5 text-xs italic text-zinc-400">
                {v.transliteration}
              </p>

              <div className="mt-3 rounded-lg bg-zinc-900/80 p-3 border border-zinc-800">
                <p className="font-serif-journal text-xs leading-relaxed text-zinc-200">
                  "{v.translation}"
                </p>
              </div>

              <div className="mt-3 flex flex-wrap items-center justify-between gap-2 text-[11px] text-zinc-400 pt-2 border-t border-zinc-800/40">
                <span>
                  <strong className="text-zinc-300">Essence: </strong>
                  {v.philosophicalEssence}
                </span>

                {onSelectVerseForInspiration && (
                  <button
                    onClick={() => {
                      onSelectVerseForInspiration(v);
                      onClose();
                    }}
                    className="flex items-center space-x-1 text-amber-400 hover:text-amber-300 font-medium"
                  >
                    <span>Use for Journaling</span>
                    <Check className="h-3.5 w-3.5" />
                  </button>
                )}
              </div>
            </div>
          ))}

          {filteredVerses.length === 0 && (
            <div className="py-12 text-center text-xs text-zinc-400">
              No verses found matching your criteria.
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="border-t border-zinc-800 p-4 text-center text-[11px] text-zinc-400 bg-zinc-950/50">
          All verses are verified against authentic traditional translations and organized across 16 thematic categories.
        </div>
      </div>
    </div>
  );
};

