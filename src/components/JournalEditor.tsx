import React, { useState, useEffect, useRef, useCallback } from 'react';
import { 
  Calendar, 
  Clock, 
  Sparkles, 
  Send, 
  BookOpen, 
  Compass, 
  Scroll, 
  CheckCircle2, 
  AlertCircle, 
  Info,
  RefreshCw,
  Save,
  Bookmark,
  HeartHandshake,
  Mic,
  MicOff,
  Radio
} from 'lucide-react';
import { JournalEntry, ConversationMessage, PastEntrySummary, ReflectionResponse } from '../types';
import { GitaVerse } from '../data/gitaVerses';
import { INDIA_CRISIS_RESOURCES } from '../data/crisisResources';
import { CrisisSafeguardCard } from './CrisisSafeguardCard';
import { ListenButton } from './ListenButton';
import { useSpeechRecognition } from '../hooks/useSpeechRecognition';
import { saveJournalEntry } from '../lib/firebase';
import { DeleteConfirmModal } from './DeleteConfirmModal';
import { Trash2 } from 'lucide-react';

interface JournalEditorProps {
  userId: string;
  initialEntry?: JournalEntry | null;
  pastSummaries: PastEntrySummary[];
  onSaveSuccess: (entry: JournalEntry) => void;
  onViewHistory: () => void;
  onDeleteEntry?: (entryId: string) => Promise<void>;
}

export const JournalEditor: React.FC<JournalEditorProps> = ({
  userId,
  initialEntry,
  pastSummaries,
  onSaveSuccess,
  onViewHistory,
  onDeleteEntry
}) => {
  const [entryId, setEntryId] = useState<string>(initialEntry?.id || `entry-${Date.now()}`);
  const [title, setTitle] = useState<string>(initialEntry?.title || '');
  const [content, setContent] = useState<string>(initialEntry?.content || '');
  const [createdAt, setCreatedAt] = useState<string>(initialEntry?.createdAt || new Date().toISOString());
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState<boolean>(false);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  
  // Margin note & reflective state
  const [conversation, setConversation] = useState<ConversationMessage[]>(initialEntry?.conversation || []);
  const [verse, setVerse] = useState<GitaVerse | null>(initialEntry?.verse || null);
  const [guidance, setGuidance] = useState<string | null>(initialEntry?.guidance || null);
  const [patternRecallNote, setPatternRecallNote] = useState<string | null>(initialEntry?.patternRecallNote || null);
  const [mood, setMood] = useState<string | undefined>(initialEntry?.mood);
  const [theme, setTheme] = useState<string | undefined>(initialEntry?.theme);
  const [isCrisisDetected, setIsCrisisDetected] = useState<boolean>(Boolean(initialEntry?.isCrisisDetected));
  
  // Interactive reflection states
  const [isReflecting, setIsReflecting] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [socraticAnswer, setSocraticAnswer] = useState<string>('');
  const [crisisInfo, setCrisisInfo] = useState<ReflectionResponse | null>(() => {
    if (initialEntry?.isCrisisDetected) {
      return {
        mode: 'crisis',
        guidance: initialEntry.guidance || undefined,
        crisisResources: INDIA_CRISIS_RESOURCES,
        detectedTheme: initialEntry.theme || 'Compassionate Care & Crisis Support',
        detectedMood: initialEntry.mood || 'Acute Distress'
      };
    }
    return null;
  });

  // Track base text before speech dictation starts to seamlessly append new spoken sentences
  const baseContentBeforeSpeechRef = useRef<string>('');
  const speechAccumulatedRef = useRef<string>('');

  // Handle incoming speech transcript chunks in real-time
  const handleTranscriptChange = useCallback((newTranscript: string, isFinal: boolean) => {
    const base = baseContentBeforeSpeechRef.current;
    const prefix = base.trim().length > 0 ? base.trim() + ' ' : '';
    
    if (isFinal) {
      speechAccumulatedRef.current = (speechAccumulatedRef.current + ' ' + newTranscript).trim();
      setContent(prefix + speechAccumulatedRef.current);
    } else {
      const combined = (speechAccumulatedRef.current + ' ' + newTranscript).trim();
      setContent(prefix + combined);
    }
  }, []);

  const {
    isSupported: isSpeechSupported,
    isListening,
    errorMessage: speechError,
    toggleListening
  } = useSpeechRecognition({
    onTranscriptChange: handleTranscriptChange
  });

  // When user toggles listening, initialize the base reference
  const handleMicToggle = () => {
    if (!isListening) {
      baseContentBeforeSpeechRef.current = content;
      speechAccumulatedRef.current = '';
    }
    toggleListening();
  };

  // Sync if initialEntry prop changes (e.g. when opened from history)
  useEffect(() => {
    if (initialEntry) {
      setEntryId(initialEntry.id);
      setTitle(initialEntry.title || '');
      setContent(initialEntry.content || '');
      setCreatedAt(initialEntry.createdAt);
      setConversation(initialEntry.conversation || []);
      setVerse(initialEntry.verse || null);
      setGuidance(initialEntry.guidance || null);
      setPatternRecallNote(initialEntry.patternRecallNote || null);
      setMood(initialEntry.mood);
      setTheme(initialEntry.theme);
      setIsCrisisDetected(Boolean(initialEntry.isCrisisDetected));
      
      if (initialEntry.isCrisisDetected) {
        setCrisisInfo({
          mode: 'crisis',
          guidance: initialEntry.guidance || undefined,
          crisisResources: INDIA_CRISIS_RESOURCES,
          detectedTheme: initialEntry.theme || 'Compassionate Care & Crisis Support',
          detectedMood: initialEntry.mood || 'Acute Distress'
        });
      } else {
        setCrisisInfo(null);
      }
    }
  }, [initialEntry]);

  // Format readable entry date
  const formattedDate = new Date(createdAt).toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = new Date(createdAt).toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  // Call server /api/reflect
  const handleReflect = async (directGuidance: boolean = false, additionalNote?: string) => {
    if (!content.trim()) {
      setErrorMessage('Please write or speak a thought or situation in your journal first.');
      return;
    }

    setIsReflecting(true);
    setErrorMessage(null);

    const updatedConversation = [...conversation];
    if (additionalNote && additionalNote.trim()) {
      updatedConversation.push({
        id: `msg-${Date.now()}`,
        role: 'user',
        text: additionalNote.trim(),
        timestamp: new Date().toISOString()
      });
      setConversation(updatedConversation);
      setSocraticAnswer('');
    }

    try {
      const response = await fetch('/api/reflect', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentEntryText: content,
          conversationHistory: updatedConversation.map(m => ({ role: m.role, text: m.text })),
          pastSummaries,
          directGuidanceRequested: directGuidance
        })
      });

      if (!response.ok) {
        const errJson = await response.json().catch(() => ({}));
        throw new Error(errJson.error || 'Reflection failed to generate.');
      }

      const data: ReflectionResponse = await response.json();

      if (data.patternRecallNote) {
        setPatternRecallNote(data.patternRecallNote);
      }

      if (data.mode === 'crisis') {
        setIsCrisisDetected(true);
        setCrisisInfo({
          ...data,
          crisisResources: data.crisisResources && data.crisisResources.length > 0 ? data.crisisResources : INDIA_CRISIS_RESOURCES
        });
        setGuidance(data.guidance || null);
        setVerse(null);
        setTheme('Compassionate Care & Crisis Support');
        setMood('Acute Distress');

        const newAssistantMsg: ConversationMessage = {
          id: `msg-crisis-${Date.now()}`,
          role: 'assistant',
          text: data.guidance || 'Please reach out to one of the compassionate support resources below.',
          timestamp: new Date().toISOString(),
          isClarifyingQuestion: false
        };
        setConversation(prev => [...prev, newAssistantMsg]);
      } else if (data.mode === 'socratic_question') {
        setIsCrisisDetected(false);
        setCrisisInfo(null);
        if (data.socraticQuestion) {
          const newAssistantMsg: ConversationMessage = {
            id: `msg-guide-${Date.now()}`,
            role: 'assistant',
            text: data.socraticQuestion,
            timestamp: new Date().toISOString(),
            isClarifyingQuestion: true
          };
          setConversation(prev => [...prev, newAssistantMsg]);
        }
      } else if (data.mode === 'grounded_guidance') {
        setIsCrisisDetected(false);
        setCrisisInfo(null);
        if (data.matchedVerse) setVerse(data.matchedVerse);
        if (data.guidance) setGuidance(data.guidance);
        if (data.detectedTheme) setTheme(data.detectedTheme);
        if (data.detectedMood) setMood(data.detectedMood);

        const newAssistantMsg: ConversationMessage = {
          id: `msg-guidance-${Date.now()}`,
          role: 'assistant',
          text: `Gita Insight (${data.matchedVerse?.citation}): ${data.guidance}`,
          timestamp: new Date().toISOString(),
          isClarifyingQuestion: false
        };
        setConversation(prev => [...prev, newAssistantMsg]);
      }

      // Auto-save progress
      await handleSaveInternal(false, data);
    } catch (err: any) {
      console.error('Reflection error:', err);
      setErrorMessage(err.message || 'Unable to connect to reflective guide.');
    } finally {
      setIsReflecting(false);
    }
  };

  // Save to Firestore
  const handleSaveInternal = async (
    explicitUserSave: boolean = true, 
    latestReflection?: ReflectionResponse
  ) => {
    if (!content.trim()) return;

    if (explicitUserSave) {
      setIsSaving(true);
      setSaveStatus('saving');
    }

    try {
      const activeVerse = latestReflection?.matchedVerse !== undefined ? latestReflection.matchedVerse : verse;
      const activeGuidance = latestReflection?.guidance !== undefined ? latestReflection.guidance : guidance;
      const activeTheme = latestReflection?.detectedTheme !== undefined ? latestReflection.detectedTheme : theme;
      const activeMood = latestReflection?.detectedMood !== undefined ? latestReflection.detectedMood : mood;
      const activePatternRecall = latestReflection?.patternRecallNote !== undefined ? latestReflection.patternRecallNote : patternRecallNote;
      const activeCrisis = latestReflection?.mode === 'crisis' ? true : isCrisisDetected;

      const entryToSave: JournalEntry = {
        id: entryId,
        userId,
        title: title.trim() || 'Untitled Journal Entry',
        content,
        createdAt,
        updatedAt: new Date().toISOString(),
        mood: activeMood,
        theme: activeTheme,
        summary: `${activeTheme || 'Reflection'}: ${content.slice(0, 100)}`,
        conversation,
        verse: activeVerse,
        guidance: activeGuidance,
        patternRecallNote: activePatternRecall,
        isCrisisDetected: activeCrisis,
        status: 'saved'
      };

      await saveJournalEntry(userId, entryToSave);
      onSaveSuccess(entryToSave);

      if (explicitUserSave) {
        setSaveStatus('saved');
        setTimeout(() => setSaveStatus('idle'), 3000);
      }
    } catch (err: any) {
      console.error('Save error:', err);
      if (explicitUserSave) {
        setSaveStatus('error');
        setErrorMessage('Failed to save to journal. Please try again.');
      }
    } finally {
      if (explicitUserSave) setIsSaving(false);
    }
  };

  // Find latest Socratic question if waiting for answer
  const latestSocraticMsg = [...conversation].reverse().find(m => m.isClarifyingQuestion);

  // Handle delete in editor
  const handleConfirmDeleteInEditor = async () => {
    if (!onDeleteEntry || !initialEntry) return;
    setIsDeleting(true);
    try {
      await onDeleteEntry(initialEntry.id);
      setIsDeleteDialogOpen(false);
      onViewHistory();
    } catch (err: any) {
      console.error('Delete failed:', err);
      setErrorMessage(err.message || 'Failed to delete entry.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      
      {/* Pattern Recall Gentle Banner if detected */}
      {patternRecallNote && !isCrisisDetected && (
        <div className="mb-6 rounded-lg border border-amber-500/20 bg-amber-950/20 p-4 text-xs text-amber-200/90 backdrop-blur-xs flex items-start justify-between gap-3">
          <div className="flex items-start space-x-3">
            <Info className="h-4 w-4 text-amber-400 mt-0.5 shrink-0" />
            <div>
              <span className="font-semibold text-amber-300">A gentle echo from your past entries:</span>
              <p className="mt-1 leading-relaxed text-zinc-300 italic font-serif-journal">{patternRecallNote}</p>
            </div>
          </div>
          <ListenButton id="pattern-recall-note" text={patternRecallNote} label="Listen" />
        </div>
      )}

      {/* Main Grid: Left side is Journal Entry (Visual Focus), Right side is Margin Notes & Guidance */}
      <div className="grid grid-cols-1 gap-8 lg:grid-cols-12">
        
        {/* ========================================================================= */}
        {/* LEFT COLUMN: THE JOURNAL ENTRY (Dominant Visual Focus, 7 cols on lg)     */}
        {/* ========================================================================= */}
        <div className="lg:col-span-7 flex flex-col space-y-4">
          
          {/* Dated Header & Entry Canvas */}
          <div className="rounded-xl border border-zinc-800 bg-[#121316] p-6 shadow-md shadow-black/40 relative">
            
            <div className="flex flex-wrap items-center justify-between gap-2 border-b border-zinc-800/80 pb-4 text-xs text-zinc-400">
              <div className="flex items-center space-x-2">
                <Calendar className="h-3.5 w-3.5 text-amber-400" />
                <span className="font-medium text-zinc-200">{formattedDate}</span>
                <span className="text-zinc-600">•</span>
                <Clock className="h-3.5 w-3.5 text-zinc-400" />
                <span>{formattedTime}</span>
              </div>

              <div className="flex items-center space-x-2">
                {theme && (
                  <div className={`flex items-center space-x-1.5 rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${
                    isCrisisDetected 
                      ? 'border-rose-500/30 bg-rose-950/30 text-rose-300'
                      : 'border-amber-500/20 bg-amber-950/30 text-amber-300'
                  }`}>
                    {isCrisisDetected ? <HeartHandshake className="h-3 w-3 text-rose-400" /> : <Bookmark className="h-3 w-3" />}
                    <span>{theme}</span>
                  </div>
                )}

                {/* Voice Dictation (Speech-to-Text) Button next to entry field - Gracefully rendered ONLY if supported */}
                {isSpeechSupported && (
                  <button
                    id="speech-recognition-toggle-btn"
                    type="button"
                    onClick={handleMicToggle}
                    title={isListening ? 'Stop voice transcription' : 'Dictate your journal entry using your microphone'}
                    className={`flex items-center space-x-1.5 rounded-lg px-2.5 py-1 text-xs font-medium transition-all ${
                      isListening
                        ? 'bg-rose-500/20 border border-rose-500/50 text-rose-200 shadow-sm shadow-rose-950 animate-pulse'
                        : 'bg-zinc-800/80 hover:bg-zinc-750 text-zinc-300 hover:text-zinc-100 border border-zinc-700/60'
                    }`}
                  >
                    {isListening ? (
                      <>
                        <MicOff className="h-3.5 w-3.5 text-rose-400" />
                        <span className="text-[11px] font-semibold text-rose-300">Listening...</span>
                        <span className="flex items-center space-x-0.5 ml-0.5">
                          <span className="h-2 w-0.5 bg-rose-400 animate-bounce" />
                          <span className="h-3 w-0.5 bg-rose-300 animate-bounce delay-100" />
                          <span className="h-2 w-0.5 bg-rose-400 animate-bounce delay-200" />
                        </span>
                      </>
                    ) : (
                      <>
                        <Mic className="h-3.5 w-3.5 text-amber-400" />
                        <span className="text-[11px]">Speak Entry</span>
                      </>
                    )}
                  </button>
                )}

                {/* Delete button if viewing an existing saved entry */}
                {initialEntry && onDeleteEntry && (
                  <button
                    id="editor-delete-entry-btn"
                    type="button"
                    onClick={() => setIsDeleteDialogOpen(true)}
                    className="flex items-center space-x-1 rounded-lg border border-red-500/20 bg-red-950/20 px-2.5 py-1 text-xs font-medium text-red-300 hover:bg-red-900/40 hover:border-red-500/40 transition-colors"
                    title="Delete this entry"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    <span className="hidden sm:inline">Delete</span>
                  </button>
                )}
              </div>
            </div>

            {/* Entry Title */}
            <div className="mt-4">
              <input
                id="journal-entry-title-input"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title this reflection (e.g. Weighing a heavy choice, An afternoon of fatigue)..."
                className="w-full bg-transparent text-lg font-serif-journal font-medium text-zinc-100 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            {/* Live Dictation Banner if actively listening */}
            {isListening && (
              <div className="mt-2 flex items-center justify-between rounded-md bg-rose-950/30 border border-rose-500/30 px-3 py-1.5 text-xs text-rose-200">
                <div className="flex items-center space-x-2">
                  <Radio className="h-3.5 w-3.5 text-rose-400 animate-pulse" />
                  <span>Microphone active — speaking will transcribe directly into your reflection in real time.</span>
                </div>
                <button
                  onClick={handleMicToggle}
                  className="text-[11px] font-semibold underline underline-offset-2 text-rose-300 hover:text-rose-100"
                >
                  Done Speaking
                </button>
              </div>
            )}

            {/* Entry Canvas */}
            <div className="mt-3">
              <textarea
                id="journal-entry-content-input"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                rows={12}
                placeholder="What is present in your heart and mind today? Write freely or click 'Speak Entry' to dictate your thoughts..."
                className="w-full resize-y bg-transparent font-serif-journal text-base leading-relaxed text-zinc-200 placeholder:text-zinc-400 focus:outline-none"
              />
            </div>

            {/* Action Bar */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-zinc-800/80 pt-4">
              
              <div className="flex items-center space-x-2">
                <button
                  id="socratic-reflect-btn"
                  onClick={() => handleReflect(false)}
                  disabled={isReflecting || !content.trim()}
                  className="flex items-center space-x-2 rounded-lg border border-amber-500/30 bg-amber-950/20 px-3.5 py-2 text-xs sm:text-sm font-medium text-amber-200 transition-all hover:bg-amber-950/40 hover:border-amber-500/50 disabled:opacity-50"
                  title="Invite the Socratic guide to reflect and ask an inquiry question"
                >
                  {isReflecting ? (
                    <RefreshCw className="h-4 w-4 animate-spin text-amber-300" />
                  ) : (
                    <Compass className="h-4 w-4 text-amber-300" />
                  )}
                  <span>Reflect & Inquire</span>
                </button>

                <button
                  id="direct-gita-guidance-btn"
                  onClick={() => handleReflect(true)}
                  disabled={isReflecting || !content.trim()}
                  className="flex items-center space-x-1.5 rounded-lg border border-zinc-700 bg-zinc-850 px-3 py-2 text-xs font-medium text-zinc-300 transition-colors hover:bg-zinc-800 hover:text-zinc-100 disabled:opacity-50"
                  title="Directly receive matching Bhagavad Gita verse and grounded insight"
                >
                  <BookOpen className="h-3.5 w-3.5 text-zinc-400" />
                  <span>Request Gita Guidance</span>
                </button>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  id="save-journal-entry-btn"
                  onClick={() => handleSaveInternal(true)}
                  disabled={isSaving || !content.trim()}
                  className="flex items-center space-x-1.5 rounded-lg bg-zinc-100 px-4 py-2 text-xs sm:text-sm font-medium text-zinc-900 shadow-sm transition-all hover:bg-white disabled:opacity-50"
                >
                  {isSaving ? (
                    <div className="h-3.5 w-3.5 animate-spin rounded-full border-2 border-zinc-900 border-t-transparent" />
                  ) : saveStatus === 'saved' ? (
                    <CheckCircle2 className="h-3.5 w-3.5 text-emerald-700" />
                  ) : (
                    <Save className="h-3.5 w-3.5" />
                  )}
                  <span>{saveStatus === 'saved' ? 'Saved' : 'Save Entry'}</span>
                </button>
              </div>

            </div>

            {(errorMessage || speechError) && (
              <div className="mt-3 flex items-center space-x-2 rounded-md border border-red-900/30 bg-red-950/20 px-3 py-2 text-xs text-red-300">
                <AlertCircle className="h-3.5 w-3.5 shrink-0" />
                <span>{errorMessage || speechError}</span>
              </div>
            )}

          </div>

          {/* Privacy Note Footnote */}
          <div className="px-2 text-[11px] text-zinc-400 flex items-center space-x-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500/70" />
            <span>Private & isolated entry. Saved to your encrypted personal collection.</span>
          </div>

        </div>

        {/* ========================================================================= */}
        {/* RIGHT COLUMN: MARGIN NOTES & SCRIPTURAL REFLECTIONS (5 cols on lg)        */}
        {/* ========================================================================= */}
        <div className="lg:col-span-5 flex flex-col space-y-5">
          
          {/* Header of Margin Space */}
          <div className="flex items-center justify-between text-xs tracking-wider uppercase text-zinc-400 font-medium px-1">
            <div className="flex items-center space-x-1.5">
              <Sparkles className="h-3.5 w-3.5 text-amber-400" />
              <span>Margin Reflections & Wisdom</span>
            </div>
            {verse && !isCrisisDetected && (
              <span className="text-[10px] text-amber-400/80 font-mono">
                {verse.citation}
              </span>
            )}
          </div>

          {/* 1. CRISIS SAFEGUARD NOTIFICATION & HELPLINES (ALWAYS RENDERED PROMINENTLY) */}
          {(isCrisisDetected || crisisInfo) && (
            <CrisisSafeguardCard 
              guidanceText={crisisInfo?.guidance || guidance}
              resources={crisisInfo?.crisisResources || INDIA_CRISIS_RESOURCES}
            />
          )}

          {/* 2. SOCRATIC CLARIFYING QUESTION (If active in margin) */}
          {latestSocraticMsg && !verse && !isCrisisDetected && !crisisInfo && (
            <div className="rounded-xl border border-amber-500/30 bg-[#141418] p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-amber-300 mb-2">
                <div className="flex items-center space-x-2">
                  <Compass className="h-4 w-4 text-amber-400" />
                  <span>Socratic Inquiry Note</span>
                </div>

                <ListenButton 
                  id="socratic-question-listen" 
                  text={latestSocraticMsg.text} 
                  label="Listen" 
                />
              </div>
              
              <p className="font-serif-journal text-sm leading-relaxed text-zinc-100 italic border-l-2 border-amber-500/50 pl-3 my-2">
                "{latestSocraticMsg.text}"
              </p>

              <p className="text-[11px] text-zinc-400 mt-2">
                Take a breath. You can reflect upon this question below to deepen your inquiry before receiving scriptural guidance.
              </p>

              {/* Inline Socratic Answer Input */}
              <div className="mt-4 flex flex-col space-y-2">
                <textarea
                  id="socratic-answer-input"
                  value={socraticAnswer}
                  onChange={(e) => setSocraticAnswer(e.target.value)}
                  rows={3}
                  placeholder="Note your inner answer or feelings on this question..."
                  className="w-full rounded-lg border border-zinc-700 bg-zinc-900/80 p-2.5 text-xs text-zinc-200 placeholder:text-zinc-400 focus:border-amber-500/50 focus:outline-none"
                />
                <div className="flex items-center justify-between">
                  <button
                    id="submit-socratic-reply-btn"
                    onClick={() => handleReflect(false, socraticAnswer)}
                    disabled={isReflecting || !socraticAnswer.trim()}
                    className="flex items-center space-x-1.5 rounded-md bg-amber-500/20 border border-amber-500/30 px-3 py-1.5 text-xs font-medium text-amber-200 hover:bg-amber-500/30 disabled:opacity-50"
                  >
                    <span>Send Reply</span>
                    <Send className="h-3 w-3" />
                  </button>

                  <button
                    id="skip-to-verse-btn"
                    onClick={() => handleReflect(true)}
                    disabled={isReflecting}
                    className="text-xs text-zinc-400 hover:text-zinc-200 underline underline-offset-2"
                  >
                    Proceed to Gita Verse & Guidance →
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* 3. GROUNDED BHAGAVAD GITA VERSE (When Grounded) */}
          {verse && !isCrisisDetected && !crisisInfo && (
            <div className="rounded-xl border border-amber-500/30 bg-[#141312] p-5 shadow-md">
              
              {/* Verse Header */}
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-3">
                <div className="flex items-center space-x-2">
                  <Scroll className="h-4 w-4 text-amber-400" />
                  <span className="font-classical text-xs font-semibold tracking-wider text-amber-200">
                    {verse.citation}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <span className="rounded-full bg-amber-950/60 px-2 py-0.5 text-[10px] text-amber-400/90 border border-amber-500/20">
                    Verified Scripture
                  </span>
                  <ListenButton 
                    id="gita-verse-listen" 
                    text={`${verse.citation}. ${verse.translation}. Essence: ${verse.philosophicalEssence}`} 
                    label="Listen" 
                  />
                </div>
              </div>

              {/* Sanskrit Text */}
              <div className="mt-3">
                <p className="font-serif text-sm font-medium text-amber-100/90 leading-relaxed whitespace-pre-line tracking-wide">
                  {verse.sanskrit}
                </p>
                <p className="mt-2 text-xs italic text-zinc-400 leading-relaxed">
                  {verse.transliteration}
                </p>
              </div>

              {/* Verified English Translation */}
              <div className="mt-4 rounded-lg bg-zinc-900/70 p-3.5 border border-zinc-800">
                <span className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 block mb-1">
                  Translation
                </span>
                <p className="font-serif-journal text-xs leading-relaxed text-zinc-200">
                  "{verse.translation}"
                </p>
              </div>

              {/* Philosophical Essence */}
              <div className="mt-3 text-[11px] text-amber-300/80 leading-relaxed">
                <span className="font-semibold text-amber-400">Core Essence: </span>
                {verse.philosophicalEssence}
              </div>

            </div>
          )}

          {/* 4. PRACTICAL MARGIN GUIDANCE (Grounded in the Verse) */}
          {guidance && !isCrisisDetected && !crisisInfo && (
            <div className="rounded-xl border border-zinc-800 bg-[#121316] p-5 shadow-sm">
              <div className="flex items-center justify-between text-xs font-semibold uppercase tracking-wider text-zinc-300 mb-3 border-b border-zinc-800 pb-2">
                <div className="flex items-center space-x-2">
                  <Sparkles className="h-3.5 w-3.5 text-amber-400" />
                  <span>Contemplative Guidance</span>
                </div>

                <ListenButton 
                  id="gita-guidance-listen" 
                  text={guidance} 
                  label="Listen" 
                />
              </div>

              <div className="font-serif-journal text-xs sm:text-sm leading-relaxed text-zinc-300 space-y-3 whitespace-pre-line">
                {guidance}
              </div>
            </div>
          )}

          {/* Default Empty State if no reflection requested yet */}
          {!conversation.length && !verse && !guidance && !isCrisisDetected && !crisisInfo && (
            <div className="rounded-xl border border-dashed border-zinc-800/80 bg-zinc-900/20 p-6 text-center text-xs text-zinc-400">
              <Compass className="mx-auto h-6 w-6 text-zinc-400 mb-2" />
              <p className="font-medium text-zinc-400">Your margin is open for reflection.</p>
              <p className="mt-1 text-zinc-400 leading-relaxed">
                Once you finish writing or dictating your thoughts, click <span className="text-amber-400">"Reflect & Inquire"</span> to receive Socratic questions, pattern connections, and authentic Gita wisdom.
              </p>
            </div>
          )}

        </div>

      </div>

      {/* In-App Delete Confirmation Dialog (Safe against iframe window.confirm blocks) */}
      {initialEntry && (
        <DeleteConfirmModal
          entry={initialEntry}
          isOpen={isDeleteDialogOpen}
          isDeleting={isDeleting}
          onConfirm={handleConfirmDeleteInEditor}
          onCancel={() => {
            if (!isDeleting) setIsDeleteDialogOpen(false);
          }}
        />
      )}

    </div>
  );
};
