import React from 'react';
import { Trash2, AlertTriangle, X, Loader2 } from 'lucide-react';
import { JournalEntry } from '../types';

interface DeleteConfirmModalProps {
  entry: JournalEntry | null;
  isOpen: boolean;
  isDeleting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

export const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({
  entry,
  isOpen,
  isDeleting,
  onConfirm,
  onCancel
}) => {
  if (!isOpen || !entry) return null;

  const formattedDate = new Date(entry.createdAt).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-4 animate-in fade-in duration-150"
      onClick={(e) => {
        if (e.target === e.currentTarget && !isDeleting) onCancel();
      }}
    >
      <div 
        role="dialog"
        aria-modal="true"
        aria-labelledby="delete-dialog-title"
        className="w-full max-w-md rounded-2xl border border-red-500/30 bg-[#141418] p-6 shadow-2xl shadow-black/80 transition-all"
      >
        {/* Header */}
        <div className="flex items-start justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-red-500/30 bg-red-950/30 text-red-400">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <h3 id="delete-dialog-title" className="font-classical text-base font-semibold text-zinc-100">
                Delete Journal Entry?
              </h3>
              <p className="text-xs text-zinc-400">
                This action cannot be undone.
              </p>
            </div>
          </div>
          
          <button
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg p-1.5 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-200 disabled:opacity-50"
            title="Cancel"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        {/* Entry Preview Box */}
        <div className="my-4 rounded-xl border border-zinc-800 bg-zinc-900/80 p-3.5 text-xs">
          <div className="flex items-center justify-between text-zinc-400 text-[11px] mb-1">
            <span>{formattedDate}</span>
            {entry.theme && (
              <span className="rounded-full bg-zinc-800 px-2 py-0.5 text-zinc-300">
                {entry.theme}
              </span>
            )}
          </div>
          <p className="font-serif-journal font-semibold text-zinc-200 truncate">
            {entry.title || 'Untitled Journal Entry'}
          </p>
          <p className="mt-1 text-zinc-400 font-serif-journal line-clamp-2 leading-relaxed">
            {entry.content || '(Empty entry)'}
          </p>
          {entry.verse && (
            <p className="mt-2 text-[11px] text-amber-400/90 font-mono">
              Emerged Verse: {entry.verse.citation}
            </p>
          )}
        </div>

        {/* Warning Note */}
        <div className="flex items-center space-x-2 text-xs text-zinc-400 mb-6">
          <AlertTriangle className="h-4 w-4 text-amber-400 shrink-0" />
          <span>Permanently removes this reflection from your Firestore storage and Pattern Recall index.</span>
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end space-x-3">
          <button
            type="button"
            onClick={onCancel}
            disabled={isDeleting}
            className="rounded-lg border border-zinc-700 bg-zinc-800/80 px-4 py-2 text-xs font-medium text-zinc-300 hover:bg-zinc-700 hover:text-zinc-100 disabled:opacity-50 transition-colors"
          >
            Cancel
          </button>

          <button
            type="button"
            onClick={onConfirm}
            disabled={isDeleting}
            className="flex items-center space-x-1.5 rounded-lg border border-red-500/40 bg-red-600 px-4 py-2 text-xs font-medium text-white hover:bg-red-500 shadow-sm shadow-red-950 disabled:opacity-50 transition-colors"
          >
            {isDeleting ? (
              <>
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
                <span>Deleting...</span>
              </>
            ) : (
              <>
                <Trash2 className="h-3.5 w-3.5" />
                <span>Delete Entry</span>
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
};
