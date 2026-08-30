import React, { useState } from 'react';
import { Scroll, ShieldCheck, Compass, HeartHandshake, Sparkles, Lock, ArrowRight } from 'lucide-react';
import { signInWithGoogle } from '../lib/firebase';

interface LandingViewProps {
  onSignInSuccess: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ onSignInSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSignIn = async () => {
    setLoading(true);
    setError(null);
    try {
      await signInWithGoogle();
      onSignInSuccess();
    } catch (err: any) {
      console.error('Sign in failed:', err);
      setError(err.message || 'Unable to complete sign-in. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-61px)] flex flex-col items-center justify-center px-4 py-12 sm:px-6">
      <div className="w-full max-w-3xl text-center">
        
        {/* Emblem */}
        <div className="mx-auto mb-6 flex h-14 w-14 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-950/20 text-amber-300 shadow-lg shadow-amber-950/30">
          <Scroll className="h-7 w-7" />
        </div>

        {/* Title & Subheading */}
        <h1 className="font-classical text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl">
          Gita Journal
        </h1>
        <p className="font-serif-journal mx-auto mt-4 max-w-xl text-base italic text-zinc-400 sm:text-lg leading-relaxed">
          "The mind alone is one’s friend, and the mind alone is one’s adversary."
          <span className="block not-italic text-xs text-amber-400/80 mt-1 font-sans tracking-widest uppercase">
            — Bhagavad Gita 6.5
          </span>
        </p>

        <p className="mx-auto mt-6 max-w-lg text-sm text-zinc-300 leading-relaxed font-normal">
          A calm, private sanctuary to write your honest thoughts and dilemmas. Guided by gentle Socratic inquiry and grounded in verified verses of the Bhagavad Gita.
        </p>

        {/* Sign In CTA */}
        <div className="mt-8 flex flex-col items-center justify-center space-y-4">
          <button
            id="google-signin-btn"
            onClick={handleSignIn}
            disabled={loading}
            className="group relative flex items-center justify-center space-x-3 rounded-lg border border-zinc-700 bg-zinc-900 px-6 py-3.5 text-sm font-medium text-zinc-100 transition-all hover:border-amber-500/50 hover:bg-zinc-800 hover:shadow-md hover:shadow-amber-950/20 disabled:opacity-50"
          >
            {loading ? (
              <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
            ) : (
              <>
                <svg className="h-5 w-5" viewBox="0 0 24 24">
                  <path
                    fill="#EA4335"
                    d="M12 5c1.6 0 3 .6 4.1 1.6l3.1-3.1C17.3 1.8 14.8 1 12 1 7.5 1 3.7 3.6 1.9 7.3l3.7 2.9C6.5 7.3 9 5 12 5z"
                  />
                  <path
                    fill="#4285F4"
                    d="M23.5 12.3c0-.8-.1-1.6-.2-2.3H12v4.5h6.5c-.3 1.5-1.1 2.8-2.4 3.7l3.7 2.9c2.2-2 3.7-5 3.7-8.8z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.6 14.8c-.2-.7-.4-1.5-.4-2.3 0-.8.2-1.6.4-2.3L1.9 7.3C.7 9.7 0 12 0 14.5s.7 4.8 1.9 7.2l3.7-2.9z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23.5c3.2 0 6-1.1 8-3l-3.7-2.9c-1.1.7-2.5 1.2-4.3 1.2-3 0-5.5-2.3-6.4-5.2L1.9 16.5C3.7 20.2 7.5 23.5 12 23.5z"
                  />
                </svg>
                <span>Continue with Google Sign-In</span>
                <ArrowRight className="h-4 w-4 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-amber-300 transition-transform" />
              </>
            )}
          </button>

          {error && (
            <div className="rounded-md border border-red-800/40 bg-red-950/20 px-4 py-2 text-xs text-red-300">
              {error}
            </div>
          )}

          {/* Explicit Trust Line */}
          <div className="flex items-center space-x-2 text-xs text-zinc-400 max-w-md pt-2">
            <Lock className="h-3.5 w-3.5 text-emerald-400 shrink-0" />
            <span>
              Your entries are private, strictly isolated to your user account in Firestore, and never shared or used to train models.
            </span>
          </div>
        </div>

        {/* Feature Triad */}
        <div className="mt-16 grid grid-cols-1 gap-6 text-left sm:grid-cols-3">
          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xs">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-amber-300">
              <Compass className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-200">Socratic Inquiry</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Rather than dispensing shallow answers, the guide asks thoughtful clarifying questions to help you uncover the root of your dilemma.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xs">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-amber-300">
              <Scroll className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-200">Verified Scripture Only</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Every citation is matched from a developer-verified dataset of authentic Gita verses — never fabricated or misquoted.
            </p>
          </div>

          <div className="rounded-xl border border-zinc-800/80 bg-zinc-900/40 p-5 backdrop-blur-xs">
            <div className="mb-3 flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-800 text-amber-300">
              <HeartHandshake className="h-4 w-4" />
            </div>
            <h2 className="text-sm font-semibold text-zinc-200">Pattern Recall & Care</h2>
            <p className="mt-2 text-xs leading-relaxed text-zinc-400">
              Surfaces gentle echoes from your past reflections to track recurring themes, with instant compassionate crisis safeguards.
            </p>
          </div>
        </div>

      </div>
    </div>
  );
};
