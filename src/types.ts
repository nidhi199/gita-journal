import { GitaVerse, ThemeCategory } from './data/gitaVerses';

export interface ConversationMessage {
  id: string;
  role: 'user' | 'assistant';
  text: string;
  timestamp: string;
  isClarifyingQuestion?: boolean;
}

export interface JournalLocation {
  latitude: number;
  longitude: number;
  placeName?: string;
  city?: string;
  region?: string;
  country?: string;
  accuracy?: number;
}

export interface JournalEntry {
  id: string;
  userId: string;
  title: string;
  content: string;
  createdAt: string; // ISO 8601 string
  updatedAt: string;
  mood?: string;
  moodRating?: number; // 1-10 scale (1 = lowest/distressed, 5 = balanced/reflective, 10 = happiest/sublime peace)
  theme?: string;
  themeCategory?: ThemeCategory;
  summary?: string;
  conversation: ConversationMessage[];
  verse?: GitaVerse | null;
  guidance?: string | null;
  patternRecallNote?: string | null;
  isCrisisDetected?: boolean;
  location?: JournalLocation | null;
  status: 'draft' | 'saved';
}

export interface ReminderSettings {
  enabled: boolean;
  time: string; // "07:00", "20:30" etc.
  browserNotificationsEnabled: boolean;
  customMessage?: string;
  lastNotifiedDate?: string; // YYYY-MM-DD
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
  mood?: string;
  moodRating?: number;
  location?: JournalLocation | null;
}

export interface ReflectionRequest {
  currentEntryText: string;
  conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }>;
  pastSummaries: PastEntrySummary[];
  directGuidanceRequested: boolean;
  forceSocratic?: boolean;
  userSelectedMood?: string;
  userSelectedRating?: number;
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
  detectedMoodRating?: number;
  patternRecallNote?: string;
  crisisResources?: CrisisResource[];
}

export interface MoodArchetype {
  id: string;
  label: string;
  sanskritTerm: string;
  guna: 'sattva' | 'rajas' | 'tamas';
  defaultRating: number;
  icon?: string;
  color: string;
  bgLight: string;
  description: string;
}
