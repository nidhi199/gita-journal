import React, { useState } from 'react';
import { Scroll, ShieldCheck, Compass, HeartHandshake, Sparkles, Lock, ArrowRight, HelpCircle, RefreshCw, Copy, Check } from 'lucide-react';
import { signInWithGoogle, signInWithGoogleRedirect, formatAuthError } from '../lib/firebase';

interface LandingViewProps {
  onSignInSuccess: () => void;
  onEnterDemo: () => void;
  onOpenWalkthrough: () => void;
}

export const LandingView: React.FC<LandingViewProps> = ({ 
  onSignInSuccess, 
  onEnterDemo,
  onOpenWalkthrough
}) => {
  const [loading, setLoading] = useState(false);
  const [redirectLoading, setRedirectLoading] = useState(false);
  const [authErrorInfo, setAuthErrorInfo] = useState<{ title: string; message: string; isDomainError: boolean } | null>(null);
  const [copiedDomain, setCopiedDomain] = useState(false);

  const currentHost = typeof window !== 'undefined' ? window.location.hostname : '';

  const handleSignIn = async () => {
    setLoading(true);
    setAuthErrorInfo(null);
    try {
      await signInWithGoogle();
      onSignInSuccess();
    } catch (err: any) {
      console.error('Sign in failed:', err);
      const formatted = formatAuthError(err);
      setAuthErrorInfo(formatted);
    } finally {
      setLoading(false);
    }
  };

  const handleSignInRedirect = async () => {
    setRedirectLoading(true);
    setAuthErrorInfo(null);
    try {
      await signInWithGoogleRedirect();
    } catch (err: any) {
      console.error('Redirect sign in failed:', err);
      const formatted = formatAuthError(err);
      setAuthErrorInfo(formatted);
      setRedirectLoading(false);
    }
  };

  const handleCopyHost = () => {
    navigator.clipboard.writeText(currentHost);
    setCopiedDomain(true);
    setTimeout(() => setCopiedDomain(false), 2000);
  };

  return (
    <div className="min-h-[calc(100vh-61px)] flex flex-col items-center justify-center px-4 py-8 sm:py-12 sm:px-6">
      <div className="w-full max-w-3xl text-center">
        
        {/* Emblem */}
        <div className="mx-auto mb-5 flex h-13 w-13 items-center justify-center rounded-2xl border border-amber-500/30 bg-amber-950/20 text-amber-300 shadow-lg shadow-amber-950/30">
          <Scroll className="h-6 w-6 sm:h-7 sm:w-7" />
        </div>

        {/* Title & Subheading */}
        <h1 className="font-classical text-3xl font-semibold tracking-wide text-zinc-100 sm:text-4xl md:text-5xl">
          Gita Journal
        </h1>
        <p className="font-serif-journal mx-auto mt-3 max-w-xl text-base italic text-zinc-400 sm:text-lg leading-relaxed">
          "The mind alone is one’s friend, and the mind alone is one’s adversary."
          <span className="block not-italic text-xs text-amber-400/80 mt-1 font-sans tracking-widest uppercase">
            — Bhagavad Gita 6.5
          </span>
        </p>

        <p className="mx-auto mt-4 sm:mt-5 max-w-lg text-xs sm:text-sm text-zinc-300 leading-relaxed font-normal">
          A calm, private sanctuary to write your honest thoughts and dilemmas. Guided by gentle Socratic inquiry and grounded in verified verses of the Bhagavad Gita.
        </p>

        {/* CTA Group: Google Sign In + Interactive Demo */}
        <div className="mt-7 flex flex-col items-center justify-center space-y-3 w-full">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full max-w-md">
            
            {/* Primary Google Sign In */}
            <button
              id="google-signin-btn"
              onClick={handleSignIn}
              disabled={loading}
              className="w-full sm:w-auto flex-1 group relative flex items-center justify-center space-x-2.5 rounded-xl border border-zinc-700 bg-zinc-900 px-5 py-3 text-sm font-medium text-zinc-100 transition-all hover:border-amber-500/50 hover:bg-zinc-800 hover:shadow-md hover:shadow-amber-950/20 disabled:opacity-50 cursor-pointer"
            >
              {loading ? (
                <div className="h-5 w-5 animate-spin rounded-full border-2 border-amber-400 border-t-transparent" />
              ) : (
                <>
                  <svg className="h-4 w-4 shrink-0" viewBox="0 0 24 24">
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
                  <span>Sign In with Google</span>
                </>
              )}
            </button>

            {/* Interactive Demo Button */}
            <button
              id="try-demo-btn"
              onClick={onEnterDemo}
              className="w-full sm:w-auto flex-1 group relative flex items-center justify-center space-x-2 rounded-xl border border-amber-500/50 bg-amber-950/40 px-5 py-3 text-sm font-medium text-amber-200 transition-all hover:bg-amber-900/50 hover:border-amber-400 hover:text-amber-100 hover:shadow-lg hover:shadow-amber-950/30 cursor-pointer"
            >
              <Sparkles className="h-4 w-4 text-amber-400 group-hover:scale-110 transition-transform" />
              <span>Explore Live Demo</span>
              <span className="rounded-full bg-amber-500/20 px-1.5 py-0.5 text-[10px] text-amber-300 font-mono">
                Sandbox
              </span>
            </button>
          </div>

          {/* How it works link */}
          <button
            id="see-how-it-works-btn"
            onClick={onOpenWalkthrough}
            className="inline-flex items-center space-x-1.5 text-xs text-zinc-400 hover:text-amber-300 transition-colors pt-1 cursor-pointer"
          >
            <HelpCircle className="h-3.5 w-3.5 text-amber-400/80" />
            <span>Curious how it works? See the 5-step interactive tour</span>
            <ArrowRight className="h-3 w-3" />
          </button>

          {/* Auth Error Banner with Fallback */}
          {authErrorInfo && (
            <div className="w-full max-w-md rounded-xl border border-amber-500/40 bg-zinc-900/90 p-4 text-left space-y-2.5 animate-fade-in shadow-xl">
              <div className="flex items-start justify-between">
                <div className="font-semibold text-xs text-amber-400">
                  {authErrorInfo.title}
                </div>
                <button
                  onClick={() => setAuthErrorInfo(null)}
                  className="text-zinc-500 hover:text-zinc-300 text-xs"
                >
                  Dismiss
                </button>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                {authErrorInfo.message}
              </p>

              {/* Action button on error */}
              <div className="pt-1">
                <button
                  onClick={handleSignInRedirect}
                  disabled={redirectLoading}
                  className="w-full inline-flex items-center justify-center space-x-1.5 rounded-lg border border-zinc-700 bg-zinc-800 px-3 py-2 text-xs font-medium text-zinc-200 hover:bg-zinc-700 transition-colors cursor-pointer"
                >
                  <RefreshCw className={`h-3.5 w-3.5 ${redirectLoading ? 'animate-spin' : ''}`} />
                  <span>Try Redirect Sign-In</span>
                </button>
              </div>

              {authErrorInfo.isDomainError && (
                <div className="pt-1 flex items-center justify-between border-t border-zinc-800 text-[11px] text-zinc-400">
                  <span className="font-mono text-[10px] text-zinc-400 truncate max-w-[220px]">
                    {currentHost}
                  </span>
                  <button
                    onClick={handleCopyHost}
                    className="text-amber-400 hover:underline inline-flex items-center space-x-1"
                  >
                    {copiedDomain ? <Check className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                    <span>{copiedDomain ? 'Copied' : 'Copy Domain'}</span>
                  </button>
                </div>
              )}
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
        <div className="mt-14 grid grid-cols-1 gap-5 text-left sm:grid-cols-3">
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

