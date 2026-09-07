import React from 'react';
import { PenLine, History, Heart, BookOpen, Smartphone } from 'lucide-react';

interface MobileBottomNavProps {
  activeView: 'editor' | 'history' | 'library' | 'vault';
  setActiveView: (view: 'editor' | 'history' | 'library' | 'vault') => void;
  entriesCount: number;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  activeView,
  setActiveView,
  entriesCount
}) => {
  return (
    <nav 
      id="mobile-bottom-navigation"
      aria-label="Mobile Bottom Navigation"
      className="md:hidden fixed bottom-0 inset-x-0 z-40 border-t border-zinc-800/90 bg-[#0e0e11]/95 backdrop-blur-xl px-2 pt-1 pb-[calc(env(safe-area-inset-bottom)+0.4rem)] shadow-2xl transition-all"
    >
      <div className="flex items-center justify-around max-w-md mx-auto">
        
        {/* Sanctuary / Write */}
        <button
          id="mobile-nav-write-btn"
          onClick={() => setActiveView('editor')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
            activeView === 'editor'
              ? 'text-amber-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className={`flex items-center justify-center h-7 w-7 rounded-lg transition-transform ${
            activeView === 'editor' ? 'bg-amber-500/20 scale-110' : ''
          }`}>
            <PenLine className="h-4 w-4" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Sanctuary</span>
        </button>

        {/* Sacred History / Journal */}
        <button
          id="mobile-nav-history-btn"
          onClick={() => setActiveView('history')}
          className={`relative flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
            activeView === 'history'
              ? 'text-amber-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className={`relative flex items-center justify-center h-7 w-7 rounded-lg transition-transform ${
            activeView === 'history' ? 'bg-amber-500/20 scale-110' : ''
          }`}>
            <History className="h-4 w-4" />
            {entriesCount > 0 && (
              <span className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-amber-500 px-1 text-[9px] font-bold text-black">
                {entriesCount}
              </span>
            )}
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Journal</span>
        </button>

        {/* Feelings Vault */}
        <button
          id="mobile-nav-vault-btn"
          onClick={() => setActiveView('vault')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
            activeView === 'vault'
              ? 'text-rose-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className={`flex items-center justify-center h-7 w-7 rounded-lg transition-transform ${
            activeView === 'vault' ? 'bg-rose-500/20 scale-110' : ''
          }`}>
            <Heart className="h-4 w-4" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Vault</span>
        </button>

        {/* 700 Verses Library */}
        <button
          id="mobile-nav-library-btn"
          onClick={() => setActiveView('library')}
          className={`flex flex-col items-center justify-center min-h-[44px] min-w-[56px] px-2 py-1 rounded-xl transition-all cursor-pointer ${
            activeView === 'library'
              ? 'text-amber-400 font-semibold'
              : 'text-zinc-400 hover:text-zinc-200'
          }`}
        >
          <div className="flex items-center justify-center h-7 w-7 rounded-lg">
            <BookOpen className="h-4 w-4" />
          </div>
          <span className="text-[10px] tracking-tight mt-0.5">Verses</span>
        </button>

      </div>
    </nav>
  );
};
