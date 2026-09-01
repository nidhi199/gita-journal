import React, { useState, useMemo } from 'react';
import { 
  Heart, 
  Sparkles, 
  TrendingUp, 
  TrendingDown, 
  Activity, 
  Filter, 
  Calendar, 
  Scroll, 
  BookOpen, 
  PenLine, 
  ChevronRight, 
  Search, 
  Sun, 
  CloudRain, 
  Compass, 
  Flame, 
  Info,
  SlidersHorizontal,
  Volume2,
  MapPin
} from 'lucide-react';
import { JournalEntry } from '../types';
import { MOOD_ARCHETYPES, getMoodArchetype, getMoodRatingLabel } from '../data/moodArchetypes';
import { ListenButton } from './ListenButton';

interface EmotionalVaultProps {
  entries: JournalEntry[];
  onSelectEntry: (entry: JournalEntry) => void;
  onNewEntry: () => void;
}

export const EmotionalVault: React.FC<EmotionalVaultProps> = ({
  entries,
  onSelectEntry,
  onNewEntry
}) => {
  const [selectedGunaFilter, setSelectedGunaFilter] = useState<'all' | 'sattva' | 'rajas' | 'tamas'>('all');
  const [selectedMoodFilter, setSelectedMoodFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeMemoryModal, setActiveMemoryModal] = useState<JournalEntry | null>(null);

  // Compute entries with normalized mood rating (1-10)
  const enrichedEntries = useMemo(() => {
    return entries.map(e => {
      let rating = e.moodRating;
      if (!rating) {
        const archetype = getMoodArchetype(e.mood);
        rating = archetype.defaultRating;
      }
      return {
        ...e,
        computedRating: rating,
        archetype: getMoodArchetype(e.mood)
      };
    });
  }, [entries]);

  // Find Happiest (Highest Serenity) and Lowest (Deepest Challenge) moments
  const { happiestEntry, lowestEntry, avgRating, gunaDistribution } = useMemo(() => {
    if (enrichedEntries.length === 0) {
      return { happiestEntry: null, lowestEntry: null, avgRating: 0, gunaDistribution: { sattva: 0, rajas: 0, tamas: 0 } };
    }

    let highest = enrichedEntries[0];
    let lowest = enrichedEntries[0];
    let total = 0;
    const gunas = { sattva: 0, rajas: 0, tamas: 0 };

    for (const e of enrichedEntries) {
      total += e.computedRating;
      gunas[e.archetype.guna]++;

      if (e.computedRating > highest.computedRating) {
        highest = e;
      }
      if (e.computedRating < lowest.computedRating) {
        lowest = e;
      }
    }

    return {
      happiestEntry: highest,
      lowestEntry: lowest,
      avgRating: Math.round((total / enrichedEntries.length) * 10) / 10,
      gunaDistribution: gunas
    };
  }, [enrichedEntries]);

  // Filter memories
  const filteredMemories = useMemo(() => {
    return enrichedEntries.filter(e => {
      const matchesSearch = 
        (e.title || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.content || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.mood || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.theme || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.verse?.citation || '').toLowerCase().includes(searchQuery.toLowerCase()) ||
        (e.location?.placeName || '').toLowerCase().includes(searchQuery.toLowerCase());

      const matchesGuna = selectedGunaFilter === 'all' || e.archetype.guna === selectedGunaFilter;
      const matchesMood = selectedMoodFilter === 'all' || e.mood === selectedMoodFilter || e.archetype.id === selectedMoodFilter;

      return matchesSearch && matchesGuna && matchesMood;
    });
  }, [enrichedEntries, searchQuery, selectedGunaFilter, selectedMoodFilter]);

  // Unique moods present in entries
  const availableMoods = useMemo(() => {
    const set = new Set<string>();
    entries.forEach(e => {
      if (e.mood) set.add(e.mood);
    });
    return Array.from(set);
  }, [entries]);

  if (entries.length === 0) {
    return (
      <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-950/20 text-amber-300 mb-4">
          <Heart className="h-8 w-8" />
        </div>
        <h2 className="font-classical text-2xl font-semibold text-zinc-100 sm:text-3xl">
          Mind & Feelings Vault
        </h2>
        <p className="mx-auto mt-2 max-w-md text-xs text-zinc-400 leading-relaxed">
          Write your first journal entries to unlock emotional feeling analysis, mood memory timelines, and track where you felt lowest, happiest, and most tranquil.
        </p>
        <button
          id="vault-first-entry-btn"
          onClick={onNewEntry}
          className="mt-6 inline-flex items-center space-x-2 rounded-lg bg-amber-500/20 border border-amber-500/30 px-4 py-2 text-xs font-medium text-amber-200 hover:bg-amber-500/30 transition-all shadow-lg shadow-amber-950/20"
        >
          <PenLine className="h-4 w-4" />
          <span>Begin First Reflection</span>
        </button>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6 space-y-8">
      
      {/* Header Banner */}
      <div className="flex flex-col justify-between gap-4 border-b border-zinc-800 pb-6 sm:flex-row sm:items-center">
        <div>
          <div className="flex items-center space-x-2">
            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-rose-500/20 text-rose-300">
              <Heart className="h-3.5 w-3.5" />
            </span>
            <span className="text-xs uppercase tracking-widest text-amber-400 font-classical font-semibold">
              Inner Landscape & Memories
            </span>
          </div>
          <h1 className="mt-1 font-classical text-2xl font-semibold tracking-wide text-zinc-100 sm:text-3xl">
            Feeling Analysis & Emotional Vault
          </h1>
          <p className="mt-1 text-xs text-zinc-400">
            Mapping your mental states, recalling emotional peaks & valleys, and grounding feelings in Gita equanimity.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={onNewEntry}
            className="flex items-center space-x-1.5 rounded-lg bg-amber-500/20 border border-amber-500/30 px-3.5 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/30 transition-colors"
          >
            <PenLine className="h-3.5 w-3.5" />
            <span>New Reflection</span>
          </button>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 1. EMOTIONAL HIGHLIGHTS: LOWEST & HAPPIEST MEMORY VAULT CARDS */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
        
        {/* Happiest / Most Serene Memory Card */}
        {happiestEntry && (
          <div 
            onClick={() => onSelectEntry(happiestEntry)}
            className="group relative flex flex-col justify-between rounded-xl border border-emerald-500/30 bg-radial-[at_top_right] from-emerald-950/20 via-[#121415] to-[#0f1012] p-5 transition-all hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-950/20 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500/20 text-emerald-300">
                    <Sun className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-emerald-400">
                      Peak Serenity & Joy
                    </span>
                    <span className="block text-[11px] text-zinc-400">
                      {new Date(happiestEntry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 rounded-full border border-emerald-500/30 bg-emerald-950/40 px-2.5 py-1 text-xs font-semibold text-emerald-300">
                  <Sparkles className="h-3 w-3" />
                  <span>Rating: {happiestEntry.computedRating}/10</span>
                </div>
              </div>

              <h3 className="mt-4 font-serif-journal text-base font-semibold text-zinc-100 group-hover:text-emerald-200 transition-colors">
                {happiestEntry.title || 'Sublime Peace & Connection'}
              </h3>

              <div className="mt-2 flex items-center space-x-2">
                <span className="rounded-full bg-emerald-950/60 border border-emerald-500/20 px-2 py-0.5 text-[10px] text-emerald-300">
                  Mood: {happiestEntry.mood || 'Serene'}
                </span>
                {happiestEntry.theme && (
                  <span className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                    • {happiestEntry.theme}
                  </span>
                )}
              </div>

              <p className="mt-3 font-serif-journal text-xs leading-relaxed text-zinc-300 line-clamp-3 italic">
                "{happiestEntry.content}"
              </p>
            </div>

            {/* Verse anchor */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              {happiestEntry.verse ? (
                <span className="flex items-center space-x-1 text-emerald-400 font-mono text-[11px]">
                  <Scroll className="h-3 w-3" />
                  <span>{happiestEntry.verse.citation}</span>
                </span>
              ) : (
                <span className="text-zinc-500 text-[11px]">Memory preserved</span>
              )}
              <span className="flex items-center space-x-1 text-zinc-400 group-hover:text-emerald-300 text-[11px]">
                <span>Relive Memory</span>
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        )}

        {/* Lowest / Deepest Challenge Memory Card */}
        {lowestEntry && (
          <div 
            onClick={() => onSelectEntry(lowestEntry)}
            className="group relative flex flex-col justify-between rounded-xl border border-indigo-500/30 bg-radial-[at_top_right] from-indigo-950/20 via-[#121317] to-[#0f1012] p-5 transition-all hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-950/20 cursor-pointer"
          >
            <div>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-300">
                    <CloudRain className="h-4 w-4" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold tracking-wider text-indigo-300">
                      Deepest Challenge & Growth
                    </span>
                    <span className="block text-[11px] text-zinc-400">
                      {new Date(lowestEntry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </span>
                  </div>
                </div>

                <div className="flex items-center space-x-1.5 rounded-full border border-indigo-500/30 bg-indigo-950/40 px-2.5 py-1 text-xs font-semibold text-indigo-300">
                  <Activity className="h-3 w-3" />
                  <span>Rating: {lowestEntry.computedRating}/10</span>
                </div>
              </div>

              <h3 className="mt-4 font-serif-journal text-base font-semibold text-zinc-100 group-hover:text-indigo-200 transition-colors">
                {lowestEntry.title || 'Navigating the Valley'}
              </h3>

              <div className="mt-2 flex items-center space-x-2">
                <span className="rounded-full bg-indigo-950/60 border border-indigo-500/20 px-2 py-0.5 text-[10px] text-indigo-300">
                  Mood: {lowestEntry.mood || 'Challenged'}
                </span>
                {lowestEntry.theme && (
                  <span className="text-[11px] text-zinc-400 truncate max-w-[200px]">
                    • {lowestEntry.theme}
                  </span>
                )}
              </div>

              <p className="mt-3 font-serif-journal text-xs leading-relaxed text-zinc-300 line-clamp-3 italic">
                "{lowestEntry.content}"
              </p>
            </div>

            {/* Grounding verse applied */}
            <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
              {lowestEntry.verse ? (
                <span className="flex items-center space-x-1 text-amber-400 font-mono text-[11px]">
                  <Scroll className="h-3 w-3" />
                  <span>Grounding Verse: {lowestEntry.verse.citation}</span>
                </span>
              ) : (
                <span className="text-zinc-500 text-[11px]">Reflective journey</span>
              )}
              <span className="flex items-center space-x-1 text-zinc-400 group-hover:text-indigo-300 text-[11px]">
                <span>Review Wisdom</span>
                <ChevronRight className="h-3 w-3" />
              </span>
            </div>
          </div>
        )}

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 2. EMOTIONAL METRICS & GUNA DISTRIBUTION (Sattva/Rajas/Tamas) */}
      {/* ------------------------------------------------------------- */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        
        {/* Sattva Card */}
        <div className="rounded-xl border border-emerald-500/20 bg-emerald-950/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-emerald-400 flex items-center space-x-1.5">
              <Sun className="h-3.5 w-3.5" />
              <span>Sattva (Peace & Clarity)</span>
            </span>
            <span className="rounded bg-emerald-950/60 px-2 py-0.5 text-xs font-bold text-emerald-300">
              {gunaDistribution.sattva} {gunaDistribution.sattva === 1 ? 'entry' : 'entries'}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed">
            Reflections centered in equanimity, devotion, gratitude, and purposeful duty.
          </p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-emerald-500 transition-all duration-500" 
              style={{ width: `${(gunaDistribution.sattva / enrichedEntries.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Rajas Card */}
        <div className="rounded-xl border border-orange-500/20 bg-orange-950/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-orange-400 flex items-center space-x-1.5">
              <Flame className="h-3.5 w-3.5" />
              <span>Rajas (Restless & Burdened)</span>
            </span>
            <span className="rounded bg-orange-950/60 px-2 py-0.5 text-xs font-bold text-orange-300">
              {gunaDistribution.rajas} {gunaDistribution.rajas === 1 ? 'entry' : 'entries'}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed">
            Moments of active striving, racing thoughts, frustration, or feeling the sole doer.
          </p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-orange-500 transition-all duration-500" 
              style={{ width: `${(gunaDistribution.rajas / enrichedEntries.length) * 100}%` }}
            />
          </div>
        </div>

        {/* Tamas Card */}
        <div className="rounded-xl border border-indigo-500/20 bg-indigo-950/10 p-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-indigo-400 flex items-center space-x-1.5">
              <CloudRain className="h-3.5 w-3.5" />
              <span>Tamas (Sorrow & Overwhelm)</span>
            </span>
            <span className="rounded bg-indigo-950/60 px-2 py-0.5 text-xs font-bold text-indigo-300">
              {gunaDistribution.tamas} {gunaDistribution.tamas === 1 ? 'entry' : 'entries'}
            </span>
          </div>
          <p className="mt-2 text-[11px] text-zinc-400 leading-relaxed">
            Vulnerable moments of grief, despondency, and deep emotional surrender.
          </p>
          <div className="mt-3 h-1.5 w-full rounded-full bg-zinc-800 overflow-hidden">
            <div 
              className="h-full bg-indigo-500 transition-all duration-500" 
              style={{ width: `${(gunaDistribution.tamas / enrichedEntries.length) * 100}%` }}
            />
          </div>
        </div>

      </div>

      {/* ------------------------------------------------------------- */}
      {/* 3. EMOTIONAL TRAJECTORY & CHRONOLOGICAL MOOD TIMELINE GRAPH  */}
      {/* ------------------------------------------------------------- */}
      <div className="rounded-xl border border-zinc-800 bg-[#121316] p-5 sm:p-6 shadow-xl">
        <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-center mb-6">
          <div>
            <h3 className="font-classical text-base font-semibold text-zinc-100 flex items-center space-x-2">
              <Activity className="h-4 w-4 text-amber-400" />
              <span>Emotional Wave & Serenity Trajectory</span>
            </h3>
            <p className="text-xs text-zinc-400">
              Chronological rating (1 = Challenged Valley, 10 = Sublime Equanimity Peak)
            </p>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-zinc-400">Average Equanimity Score:</span>
            <span className="rounded-md border border-amber-500/30 bg-amber-950/40 px-2 py-0.5 font-bold text-amber-300">
              {avgRating} / 10
            </span>
          </div>
        </div>

        {/* Timeline Visualization */}
        <div className="relative h-44 w-full pt-4 pb-6 overflow-x-auto">
          <div className="flex items-end space-x-4 min-w-full h-32 px-2 border-b border-zinc-800">
            {enrichedEntries.slice().reverse().map((entry, idx) => {
              const heightPercent = Math.max(15, (entry.computedRating / 10) * 100);
              const isPeak = entry.id === happiestEntry?.id;
              const isValley = entry.id === lowestEntry?.id;
              
              let barColor = 'bg-blue-500/60 hover:bg-blue-400';
              if (entry.archetype.guna === 'sattva') barColor = 'bg-emerald-500/70 hover:bg-emerald-400';
              if (entry.archetype.guna === 'rajas') barColor = 'bg-orange-500/70 hover:bg-orange-400';
              if (entry.archetype.guna === 'tamas') barColor = 'bg-indigo-500/70 hover:bg-indigo-400';

              return (
                <div 
                  key={entry.id}
                  onClick={() => onSelectEntry(entry)}
                  className="group relative flex flex-col items-center flex-1 min-w-[36px] max-w-[60px] cursor-pointer"
                >
                  {/* Tooltip on hover */}
                  <div className="absolute -top-12 opacity-0 group-hover:opacity-100 transition-opacity z-20 pointer-events-none rounded bg-zinc-900 border border-zinc-700 px-2 py-1 text-[10px] text-zinc-200 whitespace-nowrap shadow-xl">
                    <span className="font-semibold">{entry.mood || 'Reflection'} ({entry.computedRating}/10)</span>
                    <span className="block text-zinc-400">{new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</span>
                  </div>

                  {/* Icon flag for peak or valley */}
                  {isPeak && (
                    <span className="absolute -top-5 text-amber-300 text-[10px] font-bold">
                      🌟
                    </span>
                  )}
                  {isValley && (
                    <span className="absolute -top-5 text-indigo-300 text-[10px] font-bold">
                      🌧️
                    </span>
                  )}

                  {/* Bar */}
                  <div 
                    className={`w-full rounded-t-md transition-all duration-300 ${barColor}`}
                    style={{ height: `${heightPercent}%` }}
                  />

                  {/* Date label */}
                  <span className="mt-2 text-[9px] text-zinc-400 truncate w-full text-center">
                    {new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'numeric', day: 'numeric' })}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ------------------------------------------------------------- */}
      {/* 4. FEELINGS & MEMORIES VAULT SEARCH & FILTER GALLERY          */}
      {/* ------------------------------------------------------------- */}
      <div className="space-y-4">
        
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <h2 className="font-classical text-lg font-semibold text-zinc-100 flex items-center space-x-2">
            <Compass className="h-4 w-4 text-amber-400" />
            <span>Memories Vault by Feeling ({filteredMemories.length})</span>
          </h2>

          {/* Search Bar */}
          <div className="relative w-full sm:w-72">
            <Search className="absolute left-3 top-2.5 h-3.5 w-3.5 text-zinc-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search memories by feeling, verse, thought..."
              className="w-full rounded-lg border border-zinc-800 bg-zinc-900/90 py-1.5 pl-8 pr-3 text-xs text-zinc-200 placeholder:text-zinc-500 focus:border-amber-500/50 focus:outline-none"
            />
          </div>
        </div>

        {/* Filter Chips by Guna & Mood */}
        <div className="flex flex-wrap items-center gap-2 border-y border-zinc-800/80 py-3">
          <span className="text-[11px] font-medium text-zinc-400 flex items-center space-x-1 mr-1">
            <Filter className="h-3 w-3" />
            <span>Filter:</span>
          </span>

          <button
            onClick={() => {
              setSelectedGunaFilter('all');
              setSelectedMoodFilter('all');
            }}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              selectedGunaFilter === 'all' && selectedMoodFilter === 'all'
                ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            All Feelings ({enrichedEntries.length})
          </button>

          <button
            onClick={() => setSelectedGunaFilter(selectedGunaFilter === 'sattva' ? 'all' : 'sattva')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              selectedGunaFilter === 'sattva'
                ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/30'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            🌱 Sattva (Peace & Joy)
          </button>

          <button
            onClick={() => setSelectedGunaFilter(selectedGunaFilter === 'rajas' ? 'all' : 'rajas')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              selectedGunaFilter === 'rajas'
                ? 'bg-orange-500/20 text-orange-300 border border-orange-500/30'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            🔥 Rajas (Restless & Striving)
          </button>

          <button
            onClick={() => setSelectedGunaFilter(selectedGunaFilter === 'tamas' ? 'all' : 'tamas')}
            className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
              selectedGunaFilter === 'tamas'
                ? 'bg-indigo-500/20 text-indigo-300 border border-indigo-500/30'
                : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
            }`}
          >
            🌧️ Tamas (Heavy & Grieving)
          </button>

          {/* Specific mood tags from user's history */}
          {availableMoods.map(m => (
            <button
              key={m}
              onClick={() => setSelectedMoodFilter(selectedMoodFilter === m ? 'all' : m)}
              className={`rounded-full px-2.5 py-1 text-[11px] font-medium transition-colors ${
                selectedMoodFilter === m
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-zinc-900 text-zinc-400 border border-zinc-800 hover:text-zinc-200'
              }`}
            >
              {m}
            </button>
          ))}
        </div>

        {/* Memories Grid */}
        {filteredMemories.length === 0 ? (
          <div className="rounded-xl border border-dashed border-zinc-800 p-8 text-center text-xs text-zinc-500">
            No memories match your current feeling filter or search keywords.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {filteredMemories.map(entry => {
              const isPeak = entry.id === happiestEntry?.id;
              const isValley = entry.id === lowestEntry?.id;

              return (
                <div
                  key={entry.id}
                  onClick={() => onSelectEntry(entry)}
                  className="group relative flex flex-col justify-between rounded-xl border border-zinc-800 bg-[#121316] p-4 transition-all hover:border-amber-500/40 hover:bg-[#141519] cursor-pointer"
                >
                  <div>
                    {/* Header with Mood Badge and Rating */}
                    <div className="flex items-center justify-between text-xs text-zinc-400 mb-2">
                      <div className="flex items-center space-x-1.5 truncate">
                        <span className="text-[11px]">
                          {new Date(entry.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                        </span>
                        {entry.location?.placeName && (
                          <span className="flex items-center space-x-0.5 text-[10px] text-emerald-400 truncate max-w-[85px]" title={entry.location.placeName}>
                            <MapPin className="h-2.5 w-2.5 shrink-0" />
                            <span className="truncate">{entry.location.placeName}</span>
                          </span>
                        )}
                      </div>

                      <div className="flex items-center space-x-1.5">
                        <span 
                          className="rounded-full px-2 py-0.5 text-[10px] font-medium border"
                          style={{
                            backgroundColor: entry.archetype.bgLight,
                            borderColor: `${entry.archetype.color}40`,
                            color: entry.archetype.color
                          }}
                        >
                          {entry.mood || entry.archetype.label.split('&')[0]}
                        </span>
                        
                        <span className="text-[10px] text-zinc-500 font-mono">
                          {entry.computedRating}/10
                        </span>
                      </div>
                    </div>

                    {/* Title */}
                    <h4 className="font-serif-journal text-sm font-semibold text-zinc-100 group-hover:text-amber-200 transition-colors line-clamp-1">
                      {isPeak && '🌟 '}
                      {isValley && '🌧️ '}
                      {entry.title || 'Untitled Journal Memory'}
                    </h4>

                    {/* Excerpt */}
                    <p className="mt-2 font-serif-journal text-xs text-zinc-400 line-clamp-3 leading-relaxed italic">
                      "{entry.content}"
                    </p>
                  </div>

                  {/* Footer with Verse link & Listen */}
                  <div className="mt-4 pt-3 border-t border-zinc-800/80 flex items-center justify-between text-xs">
                    {entry.verse ? (
                      <span className="flex items-center space-x-1 text-amber-400/90 text-[11px]">
                        <Scroll className="h-3 w-3" />
                        <span className="truncate max-w-[120px]">{entry.verse.citation}</span>
                      </span>
                    ) : (
                      <span className="text-zinc-500 text-[11px]">Personal reflection</span>
                    )}

                    <div className="flex items-center space-x-1 text-zinc-400 group-hover:text-amber-300 text-[11px]">
                      <span>Open Memory</span>
                      <ChevronRight className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
