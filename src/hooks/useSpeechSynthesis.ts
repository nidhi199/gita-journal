import { useState, useEffect, useCallback, useRef } from 'react';

export function useSpeechSynthesis() {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [speakingId, setSpeakingId] = useState<string | null>(null);
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  const stop = useCallback(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
    }
    setSpeakingId(null);
    setIsPaused(false);
  }, []);

  const speak = useCallback((id: string, text: string) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;

    // Stop existing speech
    window.speechSynthesis.cancel();

    if (!text || text.trim().length === 0) {
      setSpeakingId(null);
      return;
    }

    // Clean text of markdown asterisks, hashes, etc. for cleaner speech
    const cleanText = text
      .replace(/[*#_~`>]/g, '')
      .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
      .trim();

    const utterance = new SpeechSynthesisUtterance(cleanText);
    utteranceRef.current = utterance;

    // Meditative, calm pacing for contemplative journal
    utterance.rate = 0.92;
    utterance.pitch = 0.96;

    // Attempt to select a clear natural voice if available
    const voices = window.speechSynthesis.getVoices();
    const naturalVoice = voices.find(
      v => (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Samantha') || v.lang.startsWith('en')) && !v.name.includes('Zira')
    );
    if (naturalVoice) {
      utterance.voice = naturalVoice;
    }

    utterance.onstart = () => {
      setSpeakingId(id);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setSpeakingId(null);
      setIsPaused(false);
    };

    utterance.onerror = (e) => {
      // If cancelled intentionally, don't show error
      if (e.error !== 'interrupted' && e.error !== 'canceled') {
        console.warn('Speech synthesis error:', e.error);
      }
      setSpeakingId(null);
      setIsPaused(false);
    };

    utterance.onpause = () => setIsPaused(true);
    utterance.onresume = () => setIsPaused(false);

    window.speechSynthesis.speak(utterance);
  }, []);

  const toggle = useCallback((id: string, text: string) => {
    if (speakingId === id) {
      stop();
    } else {
      speak(id, text);
    }
  }, [speakingId, speak, stop]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return {
    isSupported,
    speakingId,
    isPaused,
    speak,
    stop,
    toggle
  };
}
