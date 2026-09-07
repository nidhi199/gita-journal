import React, { useState, useEffect } from 'react';
import { User } from 'firebase/auth';
import { auth, fetchUserEntries, deleteJournalEntry, fetchUserReminderSettings, saveUserReminderSettings, checkRedirectSignIn, logOut } from './lib/firebase';
import { onAuthStateChanged } from 'firebase/auth';
import { Navbar } from './components/Navbar';
import { LandingView } from './components/LandingView';
import { JournalEditor } from './components/JournalEditor';
import { JournalHistory } from './components/JournalHistory';
import { EmotionalVault } from './components/EmotionalVault';
import { ReminderModal } from './components/ReminderModal';
import { GitaLibraryModal } from './components/GitaLibraryModal';
import { ThreatSummaryModal } from './components/ThreatSummaryModal';
import { DemoWalkthroughModal } from './components/DemoWalkthroughModal';
import { DemoBanner } from './components/DemoBanner';
import { InteractiveTourGuide } from './components/InteractiveTourGuide';
import { MobileBottomNav } from './components/MobileBottomNav';
import { JournalEntry, PastEntrySummary, ReminderSettings } from './types';
import { DEFAULT_REMINDER_SETTINGS, calculateStreakStats } from './lib/reminders';
import { GitaVerse } from './data/gitaVerses';
import { DEMO_ENTRIES, SAMPLE_DEMO_PROMPTS } from './data/demoEntries';
import { Scroll } from 'lucide-react';
import { ThemeToggle } from './components/ThemeToggle';

// Mock user for sandbox demo mode
const createDemoUser = (): User => ({
  uid: 'demo-user',
  displayName: 'Seeker (Demo)',
  email: 'demo@gita.contemplation',
  emailVerified: true,
  isAnonymous: true,
  metadata: {} as any,
  providerData: [],
  refreshToken: '',
  tenantId: null,
  delete: async () => {},
  getIdToken: async () => 'demo-token',
  getIdTokenResult: async () => ({} as any),
  reload: async () => {},
  toJSON: () => ({}),
  phoneNumber: null,
  photoURL: null,
  providerId: 'demo'
});

export default function App() {
  const [user, setUser] = useState<User | null>(null);
  const [authLoading, setAuthLoading] = useState<boolean>(true);
  const [activeView, setActiveView] = useState<'editor' | 'history' | 'library' | 'vault'>('editor');
  
  // Demo Mode states
  const [isDemoMode, setIsDemoMode] = useState<boolean>(false);
  const [showWalkthrough, setShowWalkthrough] = useState<boolean>(false);
  const [isTourActive, setIsTourActive] = useState<boolean>(false);
  const [currentTourStep, setCurrentTourStep] = useState<number>(0);
  const [demoEntries, setDemoEntries] = useState<JournalEntry[]>(DEMO_ENTRIES);

  // Data state
  const [entries, setEntries] = useState<JournalEntry[]>([]);
  const [activeEntry, setActiveEntry] = useState<JournalEntry | null>(null);
  const [loadingEntries, setLoadingEntries] = useState<boolean>(false);
  const [reminderSettings, setReminderSettings] = useState<ReminderSettings>(() => {
    const saved = localStorage.getItem('gita_journal_reminders');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return DEFAULT_REMINDER_SETTINGS;
      }
    }
    return DEFAULT_REMINDER_SETTINGS;
  });
  
  // Modals
  const [showSecurityModal, setShowSecurityModal] = useState<boolean>(false);
  const [showLibraryModal, setShowLibraryModal] = useState<boolean>(false);
  const [showReminderModal, setShowReminderModal] = useState<boolean>(false);

  // Check mobile redirect sign in on load
  useEffect(() => {
    if (typeof window === 'undefined') return;

    checkRedirectSignIn()
      .then((redirectUser) => {
        if (redirectUser) {
          setUser(redirectUser);
        }
      })
      .catch((err) => console.warn('Redirect sign-in check failed:', err));
  }, []);

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);

      if (currentUser) {
        setIsDemoMode(false); // Switch out of demo if signed in
        await loadEntries(currentUser.uid);
        // Load cloud reminder settings
        try {
          const cloudSettings = await fetchUserReminderSettings(currentUser.uid);
          if (cloudSettings) {
            setReminderSettings(cloudSettings);
            localStorage.setItem('gita_journal_reminders', JSON.stringify(cloudSettings));
          }
        } catch (err) {
          console.error('Failed to load user reminder settings:', err);
        }
      } else {
        setEntries([]);
        setActiveEntry(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const loadEntries = async (uid: string) => {
    setLoadingEntries(true);
    try {
      const userEntries = await fetchUserEntries(uid);
      setEntries(userEntries);
    } catch (err) {
      console.error('Failed to load journal entries:', err);
    } finally {
      setLoadingEntries(false);
    }
  };

  const handleEnterDemo = () => {
    setIsDemoMode(true);
    setIsTourActive(true);
    setCurrentTourStep(0);
    setActiveView('editor');
    setDemoEntries([...DEMO_ENTRIES]);
    setActiveEntry(null);
  };

  const handleExitDemo = () => {
    setIsDemoMode(false);
    setIsTourActive(false);
    setActiveEntry(null);
    setActiveView('editor');
  };

  const handleLoadPrompt = (title: string, content: string, theme: string) => {
    setActiveEntry({
      id: `demo-${Date.now()}`,
      userId: 'demo-user',
      title,
      content,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      theme,
      conversation: [],
      status: 'draft',
      mood: 'Reflective',
      moodRating: 5
    });
    setActiveView('editor');
  };

  const handleNewEntry = () => {
    setActiveEntry(null);
    setActiveView('editor');
  };

  const handleSelectEntryFromHistory = (entry: JournalEntry) => {
    setActiveEntry(entry);
    setActiveView('editor');
  };

  const handleSaveSuccess = (savedEntry: JournalEntry) => {
    if (isDemoMode) {
      setDemoEntries((prev) => {
        const index = prev.findIndex((e) => e.id === savedEntry.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = savedEntry;
          return updated;
        }
        return [savedEntry, ...prev];
      });
      setActiveEntry(savedEntry);
      return;
    }

    setEntries((prev) => {
      const index = prev.findIndex((e) => e.id === savedEntry.id);
      if (index >= 0) {
        const updated = [...prev];
        updated[index] = savedEntry;
        return updated;
      }
      return [savedEntry, ...prev];
    });
    setActiveEntry(savedEntry);
  };

  const handleDeleteEntry = async (entryId: string) => {
    if (isDemoMode) {
      setDemoEntries((prev) => prev.filter((e) => e.id !== entryId));
      if (activeEntry?.id === entryId) {
        setActiveEntry(null);
      }
      return;
    }

    if (!user) return;
    await deleteJournalEntry(user.uid, entryId);
    setEntries((prev) => prev.filter((e) => e.id !== entryId));
    if (activeEntry?.id === entryId) {
      setActiveEntry(null);
    }
  };

  const handleSignOut = async () => {
    if (user) {
      await logOut();
    }
    setUser(null);
    setEntries([]);
    setActiveEntry(null);
  };

  const handleSaveReminderSettings = async (newSettings: ReminderSettings) => {
    setReminderSettings(newSettings);
    localStorage.setItem('gita_journal_reminders', JSON.stringify(newSettings));
    if (user && !isDemoMode) {
      await saveUserReminderSettings(user.uid, newSettings);
    }
  };

  // Determine current active user and entry collections
  const effectiveUser: User | null = isDemoMode ? createDemoUser() : user;

  const effectiveEntries = isDemoMode ? demoEntries : entries;

  // Convert past entries into summaries for Pattern Recall and No-Repeat Recency Tracking
  const pastSummaries: PastEntrySummary[] = effectiveEntries
    .filter((e) => e.id !== activeEntry?.id)
    .map((e) => ({
      id: e.id,
      date: new Date(e.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      title: e.title || 'Untitled',
      theme: e.theme,
      themeCategory: e.themeCategory,
      summary: e.summary || e.content.slice(0, 100),
      verseId: e.verse?.id,
      verseCitation: e.verse?.citation
    }));

  const streakStats = calculateStreakStats(effectiveEntries);

  const handleSelectVerseForInspiration = (v: GitaVerse) => {
    // Start a new entry with this verse
    const newEntryId = `entry-${Date.now()}`;
    const newEntry: JournalEntry = {
      id: newEntryId,
      userId: effectiveUser?.uid || '',
      title: `Reflection on ${v.citation}`,
      content: '',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      theme: v.theme,
      verse: v,
      guidance: `Reflecting on the wisdom of ${v.citation}: "${v.translation}" — ${v.philosophicalEssence}`,
      conversation: [],
      status: 'draft'
    };
    setActiveEntry(newEntry);
    setActiveView('editor');
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0c0d0e] text-zinc-400">
        <div className="flex flex-col items-center space-y-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-950/20 text-amber-400 animate-pulse">
            <Scroll className="h-6 w-6" />
          </div>
          <span className="font-classical text-xs tracking-widest text-zinc-400 uppercase">
            Opening Gita Journal...
          </span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-[#0c0d0e] text-[#e2e2e5]">
      
      {/* Navigation Bar */}
      <Navbar
        user={effectiveUser}
        activeView={activeView}
        setActiveView={(view) => {
          if (view === 'library') {
            setShowLibraryModal(true);
          } else {
            setActiveView(view);
          }
        }}
        onNewEntry={handleNewEntry}
        entriesCount={effectiveEntries.length}
        currentStreak={streakStats.currentStreak}
        onOpenSecurity={() => setShowSecurityModal(true)}
        onOpenReminders={() => setShowReminderModal(true)}
        onSignOut={handleSignOut}
        isDemoMode={isDemoMode}
        onExitDemo={handleExitDemo}
        onOpenWalkthrough={() => setShowWalkthrough(true)}
        onEnterDemo={handleEnterDemo}
      />

      {/* Main Content Area */}
      <main className="flex-1 pb-20 md:pb-6">
        {/* Persistent Demo Banner when in demo mode */}
        {isDemoMode && (
          <DemoBanner
            onOpenTour={() => {
              setIsTourActive(true);
              setCurrentTourStep(0);
            }}
            onStartTour={() => {
              setIsTourActive(true);
              setCurrentTourStep(0);
            }}
            onOpenWalkthrough={() => setShowWalkthrough(true)}
            onExitDemo={handleExitDemo}
            isTourActive={isTourActive}
            onLoadSamplePrompt={() => {
              const p = SAMPLE_DEMO_PROMPTS[0];
              handleLoadPrompt(p.title, p.content, p.theme);
            }}
            onLoadSampleDilemma={(prompt) => {
              const p = prompt || SAMPLE_DEMO_PROMPTS[0];
              handleLoadPrompt(p.title, p.content, p.theme);
            }}
          />
        )}

        {!effectiveUser ? (
          <LandingView 
            onSignInSuccess={() => setActiveView('editor')} 
            onEnterDemo={handleEnterDemo}
            onOpenWalkthrough={() => setShowWalkthrough(true)}
          />
        ) : (
          <>
            {activeView === 'editor' && (
              <JournalEditor
                userId={effectiveUser.uid}
                initialEntry={activeEntry}
                pastSummaries={pastSummaries}
                onSaveSuccess={handleSaveSuccess}
                onViewHistory={() => setActiveView('history')}
                onDeleteEntry={handleDeleteEntry}
                isDemoMode={isDemoMode}
              />
            )}

            {activeView === 'history' && (
              <JournalHistory
                entries={effectiveEntries}
                onSelectEntry={handleSelectEntryFromHistory}
                onDeleteEntry={handleDeleteEntry}
                onNewEntry={handleNewEntry}
              />
            )}

            {activeView === 'vault' && (
              <EmotionalVault
                entries={effectiveEntries}
                onSelectEntry={handleSelectEntryFromHistory}
                onNewEntry={handleNewEntry}
              />
            )}
          </>
        )}
      </main>

      {/* Mobile Bottom Navigation Bar (Visible on mobile screens when active) */}
      {effectiveUser && (
        <MobileBottomNav
          activeView={activeView}
          setActiveView={(view) => {
            if (view === 'library') {
              setShowLibraryModal(true);
            } else {
              setActiveView(view);
            }
          }}
          entriesCount={effectiveEntries.length}
        />
      )}

      {/* Footer */}
      <footer className="border-t border-zinc-800/80 bg-[#0e0e11] py-4 text-center text-xs text-zinc-400">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between px-4 sm:px-6">
          <div className="flex items-center space-x-2">
            <span className="font-classical text-[11px] tracking-wider text-zinc-400">
              Gita Journal
            </span>
            <span className="text-zinc-700">•</span>
            <span className="text-[11px]">Private Contemplative Practice</span>
            {isDemoMode && (
              <>
                <span className="text-zinc-700">•</span>
                <span className="text-amber-400 text-[11px] font-medium">Interactive Demo Mode</span>
              </>
            )}
          </div>

          <div className="flex items-center space-x-3 sm:space-x-4 text-[11px]">
            <button
              onClick={() => setShowWalkthrough(true)}
              className="text-amber-300 hover:text-amber-200 transition-colors cursor-pointer"
            >
              How It Works
            </button>
            <button
              onClick={() => setShowReminderModal(true)}
              className="text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Daily Reminders
            </button>
            <button
              onClick={() => setShowLibraryModal(true)}
              className="text-zinc-400 hover:text-amber-300 transition-colors cursor-pointer"
            >
              Verified Scripture Canon
            </button>
            <button
              onClick={() => setShowSecurityModal(true)}
              className="text-zinc-400 hover:text-emerald-300 transition-colors cursor-pointer"
            >
              Security & Privacy
            </button>
            <ThemeToggle compact />
          </div>
        </div>
      </footer>

      {/* Interactive Tour Guide in Demo Mode */}
      {isDemoMode && isTourActive && (
        <InteractiveTourGuide
          currentStepIndex={currentTourStep}
          onStepChange={setCurrentTourStep}
          onCloseTour={() => setIsTourActive(false)}
          onExitDemo={handleExitDemo}
          onSelectEntry={(entry) => {
            setActiveEntry(entry);
            setActiveView('editor');
          }}
          onSwitchView={(view) => setActiveView(view)}
          onOpenLibrary={() => setShowLibraryModal(true)}
          onOpenSecurity={() => setShowSecurityModal(true)}
          onLoadPrompt={handleLoadPrompt}
        />
      )}

      {/* Demo Walkthrough Modal */}
      <DemoWalkthroughModal
        isOpen={showWalkthrough}
        onClose={() => setShowWalkthrough(false)}
        onLaunchDemo={() => {
          handleEnterDemo();
          setShowWalkthrough(false);
        }}
        onStartDemo={() => {
          handleEnterDemo();
          setShowWalkthrough(false);
        }}
      />

      {/* Scripture Library Modal */}
      {showLibraryModal && (
        <GitaLibraryModal
          onClose={() => setShowLibraryModal(false)}
          onSelectVerseForInspiration={effectiveUser ? handleSelectVerseForInspiration : undefined}
        />
      )}

      {/* Threat Summary & Security Modal */}
      {showSecurityModal && (
        <ThreatSummaryModal onClose={() => setShowSecurityModal(false)} />
      )}

      {/* Daily Reminders Modal */}
      {showReminderModal && (
        <ReminderModal
          isOpen={showReminderModal}
          onClose={() => setShowReminderModal(false)}
          entries={effectiveEntries}
          settings={reminderSettings}
          onSaveSettings={handleSaveReminderSettings}
        />
      )}

    </div>
  );
}


