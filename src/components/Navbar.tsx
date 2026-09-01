import React from 'react';
import { BookOpen, PenLine, History, LogOut, ShieldCheck, Scroll, Heart, Bell, Flame } from 'lucide-react';
import { User } from 'firebase/auth';
import { logOut } from '../lib/firebase';

interface NavbarProps {
  user: User | null;
  activeView: 'editor' | 'history' | 'library' | 'vault';
  setActiveView: (view: 'editor' | 'history' | 'library' | 'vault') => void;
  onNewEntry: () => void;
  entriesCount: number;
  currentStreak?: number;
  onOpenSecurity: () => void;
  onOpenReminders: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  user,
  activeView,
  setActiveView,
  onNewEntry,
  entriesCount,
  currentStreak = 0,
  onOpenSecurity,
  onOpenReminders
}) => {
  return (
    <header className="sticky top-0 z-40 border-b border-zinc-800/80 bg-[#0e0e11]/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
        {/* Brand / Title */}
        <div className="flex items-center space-x-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg border border-amber-500/20 bg-amber-500/10 text-amber-300">
            <Scroll className="h-5 w-5" />
          </div>
          <div>
            <span className="font-classical text-base font-semibold tracking-wider text-zinc-100 sm:text-lg">
              GITA JOURNAL
            </span>
            <span className="hidden text-xs text-zinc-400 sm:inline-block sm:ml-2 font-normal">
              Contemplative Wisdom & Inquiry
            </span>
          </div>
        </div>

        {/* Navigation Tabs */}
        {user && (
          <nav className="flex items-center space-x-1 sm:space-x-1.5">
            <button
              id="nav-new-entry-btn"
              onClick={onNewEntry}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeView === 'editor'
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <PenLine className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-amber-400" />
              <span>Write</span>
            </button>

            <button
              id="nav-vault-btn"
              onClick={() => setActiveView('vault')}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeView === 'vault'
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
              title="View your feeling analysis, emotional peaks & valleys"
            >
              <Heart className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-rose-400" />
              <span>Feelings Vault</span>
            </button>

            <button
              id="nav-history-btn"
              onClick={() => setActiveView('history')}
              className={`flex items-center space-x-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeView === 'history'
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <History className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-400" />
              <span>Journal ({entriesCount})</span>
            </button>

            <button
              id="nav-library-btn"
              onClick={() => setActiveView('library')}
              className={`hidden md:flex items-center space-x-1.5 rounded-md px-2.5 sm:px-3 py-1.5 text-xs sm:text-sm font-medium transition-all ${
                activeView === 'library'
                  ? 'bg-zinc-800 text-zinc-100 border border-zinc-700/60 shadow-xs'
                  : 'text-zinc-400 hover:bg-zinc-900 hover:text-zinc-200'
              }`}
            >
              <BookOpen className="h-3.5 w-3.5 sm:h-4 sm:w-4 text-zinc-400" />
              <span>Scripture</span>
            </button>
          </nav>
        )}

        {/* User profile & Controls */}
        <div className="flex items-center space-x-2 sm:space-x-2.5">
          {/* Daily Reminders & Streak Trigger */}
          {user && (
            <button
              id="nav-reminders-btn"
              onClick={onOpenReminders}
              title="Daily Contemplation Reminders & Streak"
              className="flex items-center space-x-1.5 rounded-md border border-amber-500/30 bg-amber-950/20 px-2 py-1 text-xs text-amber-300 hover:bg-amber-950/40 transition-colors"
            >
              {currentStreak > 0 ? (
                <span className="flex items-center space-x-1 font-bold text-amber-400 text-[11px]">
                  <Flame className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
                  <span>{currentStreak}d</span>
                </span>
              ) : (
                <Bell className="h-3.5 w-3.5 text-amber-400" />
              )}
              <span className="hidden sm:inline text-[11px]">Reminders</span>
            </button>
          )}

          <button
            id="security-threat-model-btn"
            onClick={onOpenSecurity}
            title="View Security & Threat Model Overview"
            className="flex items-center space-x-1 rounded-md border border-zinc-800 bg-zinc-900/60 px-2 py-1 text-xs text-zinc-400 hover:border-zinc-700 hover:text-zinc-300 transition-colors"
          >
            <ShieldCheck className="h-3.5 w-3.5 text-emerald-400" />
            <span className="hidden lg:inline">Security</span>
          </button>

          {user ? (
            <div className="flex items-center space-x-2 pl-1">
              <div className="hidden flex-col text-right xl:flex">
                <span className="text-xs font-medium text-zinc-200 max-w-[120px] truncate">
                  {user.displayName || user.email?.split('@')[0] || 'Seeker'}
                </span>
                <span className="text-[10px] text-zinc-400 truncate max-w-[120px]">
                  {user.email}
                </span>
              </div>
              
              {user.photoURL ? (
                <img
                  src={user.photoURL}
                  alt="User Avatar"
                  referrerPolicy="no-referrer"
                  className="h-7 w-7 sm:h-8 sm:w-8 rounded-full border border-zinc-700 object-cover"
                />
              ) : (
                <div className="flex h-7 w-7 sm:h-8 sm:w-8 items-center justify-center rounded-full border border-amber-500/30 bg-amber-950/40 text-xs font-medium text-amber-300">
                  {(user.displayName || user.email || 'S')[0].toUpperCase()}
                </div>
              )}

              <button
                id="sign-out-button"
                onClick={async () => {
                  await logOut();
                }}
                title="Sign out of journal"
                className="rounded-md p-1 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
              >
                <LogOut className="h-3.5 w-3.5" />
              </button>
            </div>
          ) : (
            <div className="text-xs text-zinc-400">
              Private Journaling
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
