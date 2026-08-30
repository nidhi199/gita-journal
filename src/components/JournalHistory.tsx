import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Search, 
  Trash2, 
  PenLine, 
  BookOpen, 
  Sparkles, 
  Scroll, 
  ChevronRight, 
  ChevronLeft, 
  Bookmark, 
  HeartHandshake,
  MessageSquareQuote,
  Eye,
  Filter
} from 'lucide-react';
import { JournalEntry } from '../types';
import { INDIA_CRISIS_RESOURCES } from '../data/crisisResources';
import { CrisisSafeguardCard } from './CrisisSafeguardCard';
import { ListenButton } from './ListenButton';
import { DeleteConfirmModal } from './DeleteConfirmModal';

interface JournalHistoryProps {
  entries: JournalEntry[];
  onSelectEntry: (entry: JournalEntry) => void;
  onDeleteEntry: (entryId: string) => Promise<void>;
  onNewEntry: () => void;
}

export const JournalHistory: React.FC<JournalHistoryProps> = ({
  entries,
  onSelectEntry,
  onDeleteEntry,
  onNewEntry
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTheme, setSelectedTheme] = useState<string>('all');
  const [activeEntryIndex, setActiveEntryIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'reader' | 'cards'>('reader');
  
  // Custom confirmation modal state (safe against iframe dialog blocks)
  const [entryPendingDelete, setEntryPendingDelete] = useState<JournalEntry | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);

  // Filter entries
  const filteredEntries = entries.filter(e => {
    const matchesSearch = 
      (e.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.guidance || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
      (e.verse?.citation || '').toLowerCase().includes(searchQuery.toLowerCase());

    const matchesTheme = selectedTheme === 'all' || e.theme === selectedTheme;
    return matchesSearch && matchesTheme;
  });

  // Extract unique themes for filtering
  const allThemes = Array.from(new Set(entries.map(e => e.theme).filter(Boolean))) as string[];

  const currentEntry = filteredEntries[activeEntryIndex] || null;

  const handleOpenDeleteModal = (e: React.MouseEvent, entry: JournalEntry) => {
    e.stopPropagation();
    setEntryPendingDelete(entry);
  };

  const handleConfirmDelete = async () => {
    if (!entryPendingDelete) return;
    
    setIsDeleting(true);
    try {
      await onDeleteEntry(entryPendingDelete.id);
      if (activeEntryIndex >= filteredEntries.length - 1 && activeEntryIndex > 0) {
        setActiveEntryIndex(activeEntryIndex - 1);
      }
      setEntryPendingDelete(null);
    } catch (err) {
      console.error('Delete failed:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      
      {/* Header & Controls */}
      <div className="mb-8 flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center">
        <div>
          <h1 className="font-classical text-2xl font-semibold tracking-wide text-zinc-100 sm:text-3xl">
            Journal Chronicle
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Flipping through your dated thoughts, inquiries, and emerged Gita wisdom.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <div className="flex rounded-lg border border-zinc-800 bg-zinc-900 p-1">
            <button
              onClick={() => setViewMode('reader')}
              className={`flex items-center space-x-1 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'reader'
                  ? 'bg-zinc-800 text-amber-300'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5" />
              <span>Leaf-Through</span>
            </button>
            <button
              onClick={() => setViewMode('cards')}
              className={`flex items-center space-x-1 rounded px-2.5 py-1 text-xs font-medium transition-colors ${
                viewMode === 'cards'
                  ? 'bg-zinc-800 text-amber-300'
                  : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Eye className="h-3.5 w-3.5" />
              <span>Index View</span>
            </button>
          </div>

          <button
            id="history-new-entry-btn"
            onClick={onNewEntry}
            className="flex items-center space-x-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/30 transition-colors"
          >
            <PenLine className="h-3.5 w-3.5" />
            <span>New Entry</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-2.5 h-4 w-4 text-zinc-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setActiveEntryIndex(0);
            }}
            placeholder="Search entries by thought, verse, or reflection..."
            className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 py-2 pl-9 pr-4 text-xs text-zinc-200 placeholder:text-zinc-400 focus:border-amber-500/50 focus:outline-none"
          />
        </div>

        {allThemes.length > 0 && (
          <div className="flex items-center space-x-2 overflow-x-auto pb-1 sm:pb-0">
            <Filter className="h-3.5 w-3.5 text-zinc-400 shrink-0" />
            <button
              onClick={() => {
                setSelectedTheme('all');
                setActiveEntryIndex(0);
              }}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-colors ${
                selectedTheme === 'all'
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              All Themes
            </button>
            {allThemes.map(th => (
              <button
                key={th}
                onClick={() => {
                  setSelectedTheme(th);
                  setActiveEntryIndex(0);
                }}
                className={`rounded-full px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-colors ${
                  selectedTheme === th
                    ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                    : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
                }`}
              >
                {th}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* No Entries Found State */}
      {filteredEntries.length === 0 && (
        <div className="rounded-xl border border-dashed border-zinc-800 bg-zinc-900/30 p-12 text-center">
          <BookOpen className="mx-auto h-8 w-8 text-zinc-600 mb-3" />
          <h3 className="font-serif-journal text-base font-semibold text-zinc-300">
            No journal reflections found
          </h3>
          <p className="mt-1 text-xs text-zinc-500">
            {searchQuery || selectedTheme !== 'all'
              ? 'Try changing your search keywords or active filter.'
              : 'Begin by writing your first contemplative reflection.'}
          </p>
          <button
            onClick={onNewEntry}
            className="mt-4 inline-flex items-center space-x-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/30"
          >
            <PenLine className="h-3.5 w-3.5" />
            <span>Write New Reflection</span>
          </button>
        </div>
      )}

      {/* --------------------------------------------------------------- */}
      {/* MODE 1: LEAF-THROUGH READER VIEW (Book / Journal Flipping Feel)  */}
      {/* --------------------------------------------------------------- */}
      {viewMode === 'reader' && currentEntry && (
        <div className="flex flex-col space-y-6">
          
          {/* Reader Pagination Toolbar */}
          <div className="flex items-center justify-between rounded-lg border border-zinc-800/80 bg-[#121316] px-4 py-2.5 text-xs text-zinc-400">
            <div className="flex items-center space-x-2">
              <span className="font-serif-journal text-zinc-300">
                Leaf {activeEntryIndex + 1} of {filteredEntries.length}
              </span>
            </div>

            <div className="flex items-center space-x-2">
              <button
                onClick={() => setActiveEntryIndex(Math.max(0, activeEntryIndex - 1))}
                disabled={activeEntryIndex === 0}
                className="flex items-center space-x-1 rounded p-1.5 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Previous Entry"
              >
                <ChevronLeft className="h-4 w-4" />
                <span className="hidden sm:inline">Previous</span>
              </button>

              <button
                onClick={() => setActiveEntryIndex(Math.min(filteredEntries.length - 1, activeEntryIndex + 1))}
                disabled={activeEntryIndex === filteredEntries.length - 1}
                className="flex items-center space-x-1 rounded p-1.5 hover:bg-zinc-800 disabled:opacity-30 disabled:hover:bg-transparent"
                title="Next Entry"
              >
                <span className="hidden sm:inline">Next</span>
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Active Journal Leaf */}
          <div className="rounded-xl border border-zinc-800 bg-[#121316] p-6 sm:p-8 shadow-xl shadow-black/40">
            
            {/* Entry Meta Bar */}
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-zinc-800/80 pb-4 text-xs text-zinc-400">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-1.5 text-zinc-200">
                  <Calendar className="h-3.5 w-3.5 text-amber-400" />
                  <span>
                    {new Date(currentEntry.createdAt).toLocaleDateString('en-US', {
                      weekday: 'long',
                      year: 'numeric',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                <span className="text-zinc-600">•</span>
                <div className="flex items-center space-x-1">
                  <Clock className="h-3.5 w-3.5 text-zinc-400" />
                  <span>
                    {new Date(currentEntry.createdAt).toLocaleTimeString('en-US', {
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {currentEntry.theme && (
                  <span className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                    currentEntry.isCrisisDetected 
                      ? 'border-rose-500/30 bg-rose-950/30 text-rose-300'
                      : 'border-amber-500/20 bg-amber-950/30 text-amber-300'
                  }`}>
                    {currentEntry.theme}
                  </span>
                )}

                <button
                  onClick={() => onSelectEntry(currentEntry)}
                  className="flex items-center space-x-1 rounded-md border border-zinc-700 bg-zinc-800 px-2.5 py-1 text-xs text-zinc-200 hover:bg-zinc-700"
                  title="Open and continue writing in this entry"
                >
                  <PenLine className="h-3 w-3 text-amber-400" />
                  <span>Open in Editor</span>
                </button>

                <button
                  id={`delete-entry-reader-${currentEntry.id}`}
                  onClick={(e) => handleOpenDeleteModal(e, currentEntry)}
                  className="flex items-center space-x-1 rounded-md border border-red-500/20 bg-red-950/20 px-2.5 py-1 text-xs text-red-300 hover:bg-red-900/40 hover:border-red-500/40 transition-colors"
                  title="Delete this journal entry"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                  <span>Delete</span>
                </button>
              </div>
            </div>

            {/* Entry Title */}
            <h2 className="mt-6 font-serif-journal text-2xl font-semibold text-zinc-100">
              {currentEntry.title || 'Untitled Journal Entry'}
            </h2>

            {/* Pattern Recall Note if present */}
            {currentEntry.patternRecallNote && !currentEntry.isCrisisDetected && (
              <div className="mt-4 rounded-lg border border-amber-500/20 bg-amber-950/20 p-3 text-xs italic text-zinc-300 font-serif-journal flex items-start justify-between gap-3">
                <div>
                  <span className="font-semibold text-amber-400 not-italic font-sans text-[11px] block mb-1">
                    Past Pattern Echo:
                  </span>
                  "{currentEntry.patternRecallNote}"
                </div>
                <ListenButton id={`history-pattern-${currentEntry.id}`} text={currentEntry.patternRecallNote} label="Listen" />
              </div>
            )}

            {/* Main Journal Content (Dated Journal Passage) */}
            <div className="mt-6 flex flex-col space-y-2">
              <div className="flex justify-end">
                <ListenButton id={`history-entry-${currentEntry.id}`} text={currentEntry.content} label="Listen to Entry" />
              </div>
              <div className="font-serif-journal text-base leading-relaxed text-zinc-200 whitespace-pre-line border-l-2 border-zinc-800 pl-4 py-1">
                {currentEntry.content}
              </div>
            </div>

            {/* Socratic Conversation Thread (Subtle, as margin reflections) */}
            {currentEntry.conversation && currentEntry.conversation.length > 0 && (
              <div className="mt-8 rounded-lg bg-zinc-900/60 p-4 border border-zinc-800">
                <span className="text-[11px] font-semibold tracking-wider uppercase text-zinc-400 flex items-center space-x-1.5 mb-3">
                  <MessageSquareQuote className="h-3.5 w-3.5 text-amber-400" />
                  <span>Inquiry & Reflections</span>
                </span>
                
                <div className="space-y-3">
                  {currentEntry.conversation.map((msg, i) => (
                    <div 
                      key={i} 
                      className={`text-xs p-3 rounded-md leading-relaxed ${
                        msg.role === 'assistant' 
                          ? 'bg-amber-950/20 border border-amber-500/20 text-zinc-200 font-serif-journal' 
                          : 'bg-zinc-800/60 border border-zinc-700/50 text-zinc-300'
                      }`}
                    >
                      <div className="flex items-center justify-between mb-1">
                        <span className="font-semibold text-[10px] uppercase tracking-wider text-zinc-400 font-sans">
                          {msg.role === 'assistant' ? 'Guide Note' : 'Your Reflection'}
                        </span>
                        {msg.role === 'assistant' && (
                          <ListenButton id={`history-msg-${currentEntry.id}-${i}`} text={msg.text} label="Listen" />
                        )}
                      </div>
                      {msg.text}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Crisis Safeguard Support Card (If Crisis Detected) */}
            {currentEntry.isCrisisDetected && (
              <div className="mt-8">
                <CrisisSafeguardCard 
                  guidanceText={currentEntry.guidance}
                  resources={INDIA_CRISIS_RESOURCES}
                />
              </div>
            )}

            {/* Emerged Gita Verse & Grounded Guidance Section */}
            {currentEntry.verse && !currentEntry.isCrisisDetected && (
              <div className="mt-8 rounded-xl border border-amber-500/30 bg-[#151413] p-5">
                
                <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                  <div className="flex items-center space-x-2">
                    <Scroll className="h-4 w-4 text-amber-400" />
                    <span className="font-classical text-xs font-semibold text-amber-200">
                      {currentEntry.verse.citation}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span className="text-[10px] text-amber-400 font-mono">
                      {currentEntry.verse.theme}
                    </span>
                    <ListenButton 
                      id={`history-verse-${currentEntry.id}`} 
                      text={`${currentEntry.verse.citation}. ${currentEntry.verse.translation}. Essence: ${currentEntry.verse.philosophicalEssence}`} 
                      label="Listen" 
                    />
                  </div>
                </div>

                <div className="mt-3">
                  <p className="font-serif text-sm font-medium text-amber-100/90 whitespace-pre-line leading-relaxed">
                    {currentEntry.verse.sanskrit}
                  </p>
                  <p className="mt-2 text-xs italic text-zinc-400">
                    "{currentEntry.verse.translation}"
                  </p>
                </div>

                {currentEntry.guidance && (
                  <div className="mt-4 pt-4 border-t border-zinc-800/80">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider text-amber-400 block">
                        Grounded Guidance
                      </span>
                      <ListenButton 
                        id={`history-guidance-${currentEntry.id}`} 
                        text={currentEntry.guidance} 
                        label="Listen" 
                      />
                    </div>
                    <div className="font-serif-journal text-xs sm:text-sm text-zinc-300 leading-relaxed space-y-2 whitespace-pre-line">
                      {currentEntry.guidance}
                    </div>
                  </div>
                )}

              </div>
            )}

          </div>
        </div>
      )}

      {/* --------------------------------------------------------------- */}
      {/* MODE 2: CARD / INDEX VIEW (Scannable Cards)                     */}
      {/* --------------------------------------------------------------- */}
      {viewMode === 'cards' && (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredEntries.map((entry, idx) => (
            <div
              key={entry.id}
              onClick={() => {
                setActiveEntryIndex(idx);
                setViewMode('reader');
              }}
              className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121316] p-5 transition-all hover:border-amber-500/40 hover:bg-[#141519] cursor-pointer"
            >
              <div>
                {/* Date & Theme & Delete */}
                <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                  <span>
                    {new Date(entry.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </span>
                  <div className="flex items-center space-x-1.5">
                    {entry.theme && (
                      <span className={`rounded-full border px-2 py-0.5 text-[10px] truncate max-w-[110px] ${
                        entry.isCrisisDetected 
                          ? 'bg-rose-950/40 border-rose-500/30 text-rose-300' 
                          : 'bg-amber-950/40 border-amber-500/20 text-amber-300'
                      }`}>
                        {entry.theme}
                      </span>
                    )}
                    <button
                      id={`delete-entry-card-${entry.id}`}
                      type="button"
                      onClick={(e) => handleOpenDeleteModal(e, entry)}
                      className="rounded p-1 text-zinc-400 hover:bg-red-950/50 hover:text-red-300 transition-colors"
                      title="Delete this entry"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                    </button>
                  </div>
                </div>

                {/* Title */}
                <h3 className="font-serif-journal text-base font-semibold text-zinc-100 group-hover:text-amber-200 transition-colors">
                  {entry.title || 'Untitled Journal Entry'}
                </h3>

                {/* Excerpt */}
                <p className="mt-2 font-serif-journal text-xs text-zinc-400 line-clamp-3 leading-relaxed">
                  {entry.content}
                </p>
              </div>

              {/* Bottom Verse or Crisis Indicator */}
              <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                {entry.isCrisisDetected ? (
                  <span className="flex items-center space-x-1 text-rose-400 text-[11px] font-medium">
                    <HeartHandshake className="h-3 w-3" />
                    <span>Crisis Care Support</span>
                  </span>
                ) : entry.verse ? (
                  <span className="flex items-center space-x-1 text-amber-400/90 text-[11px]">
                    <Scroll className="h-3 w-3" />
                    <span>{entry.verse.citation}</span>
                  </span>
                ) : (
                  <span className="text-zinc-400 text-[11px]">Reflective note</span>
                )}

                <div className="flex items-center space-x-1 text-zinc-400 group-hover:text-amber-300">
                  <span className="text-[11px]">Read</span>
                  <ChevronRight className="h-3 w-3" />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* In-App Delete Confirmation Dialog (Safe against iframe window.confirm blocks) */}
      <DeleteConfirmModal
        entry={entryPendingDelete}
        isOpen={Boolean(entryPendingDelete)}
        isDeleting={isDeleting}
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          if (!isDeleting) setEntryPendingDelete(null);
        }}
      />

    </div>
  );
};
