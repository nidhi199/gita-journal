import { useState, useEffect, useRef, useCallback } from 'react';

interface UseSpeechRecognitionOptions {
  onTranscriptChange?: (newTranscript: string, isFinal: boolean) => void;
  lang?: string;
}

export function useSpeechRecognition({
  onTranscriptChange,
  lang = 'en-US'
}: UseSpeechRecognitionOptions = {}) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [isListening, setIsListening] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  
  const recognitionRef = useRef<any>(null);
  const isManuallyStoppedRef = useRef<boolean>(false);

  useEffect(() => {
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (SpeechRecognitionAPI) {
      setIsSupported(true);
    } else {
      setIsSupported(false);
    }
  }, []);

  const stopListening = useCallback(() => {
    isManuallyStoppedRef.current = true;
    if (recognitionRef.current) {
      try {
        recognitionRef.current.stop();
      } catch (err) {
        // ignore already stopped
      }
    }
    setIsListening(false);
  }, []);

  const startListening = useCallback(() => {
    setErrorMessage(null);
    const SpeechRecognitionAPI =
      (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

    if (!SpeechRecognitionAPI) {
      setErrorMessage('Speech recognition is not supported in this browser.');
      return;
    }

    try {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }

      const recognition = new SpeechRecognitionAPI();
      recognition.continuous = true;
      recognition.interimResults = true;
      recognition.lang = lang;

      isManuallyStoppedRef.current = false;

      recognition.onstart = () => {
        setIsListening(true);
        setErrorMessage(null);
      };

      recognition.onresult = (event: any) => {
        let interim = '';
        let final = '';

        for (let i = event.resultIndex; i < event.results.length; ++i) {
          const result = event.results[i];
          if (result.isFinal) {
            final += result[0].transcript;
          } else {
            interim += result[0].transcript;
          }
        }

        if (final && onTranscriptChange) {
          onTranscriptChange(final, true);
        } else if (interim && onTranscriptChange) {
          onTranscriptChange(interim, false);
        }
      };

      recognition.onerror = (event: any) => {
        console.warn('Speech recognition error event:', event.error);
        if (event.error === 'not-allowed' || event.error === 'service-not-allowed') {
          setErrorMessage('Microphone access was denied or is unavailable.');
          setIsListening(false);
        } else if (event.error === 'network') {
          setErrorMessage('Network error during speech transcription.');
        } else if (event.error !== 'no-speech') {
          setErrorMessage(`Voice input note: ${event.error}`);
        }
      };

      recognition.onend = () => {
        // If it stopped naturally and wasn't manually cancelled, we can keep the state updated
        if (isManuallyStoppedRef.current) {
          setIsListening(false);
        } else {
          // Some browsers auto-stop after brief pause in speech; we gracefully reflect stopped
          setIsListening(false);
        }
      };

      recognitionRef.current = recognition;
      recognition.start();
    } catch (err: any) {
      console.error('Failed to start speech recognition:', err);
      setErrorMessage(err.message || 'Could not start microphone.');
      setIsListening(false);
    }
  }, [lang, onTranscriptChange]);

  const toggleListening = useCallback(() => {
    if (isListening) {
      stopListening();
    } else {
      startListening();
    }
  }, [isListening, startListening, stopListening]);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      if (recognitionRef.current) {
        try {
          recognitionRef.current.abort();
        } catch {
          // ignore
        }
      }
    };
  }, []);

  return {
    isSupported,
    isListening,
    errorMessage,
    startListening,
    stopListening,
    toggleListening
  };
}
