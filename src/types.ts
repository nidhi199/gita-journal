import { GitaVerse, ThemeCategory } from './data/gitaVerses';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isClarifyingQuestion?: boolean;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string;
  mood?: string;
  theme?: string;
  themeCategory?: ThemeCategory;
  summary?: string;
  conversation: ConversationMessage[];
  verse?: GitaVerse | null;
  guidance?: string | null;
  patternRecallNote?: string | null;
  isCrisisDetected?: boolean;
  status: 'draft' | 'saved';
}

export interface PastEntrySummary {
  id: string;
  date: string;
  title: string;
  theme?: string;
  themeCategory?: ThemeCategory;
  summary?: string;
  verseId?: string;
  verseCitation?: string;
}

export interface ReflectionRequest {
  currentEntryText: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }>;
  pastSummaries: PastEntrySummary[];
  directGuidanceRequested: boolean;
}

export interface CrisisResource {
  name: string;
  contact: string;
  description: string;
  url?: string;
}

export interface ReflectionResponse {
  mode: 'crisis' | 'socratic_question' | 'grounded_guidance';
  socraticQuestion?: string;
  matchedVerse?: GitaVerse | null;
  guidance?: string;
  detectedTheme?: string;
  detectedMood?: string;
  patternRecallNote?: string;
  crisisResources?: CrisisResource[];
}
