import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import { 
  GITA_VERSES, 
  THEME_CATEGORIES, 
  ThemeCategory, 
  findMatchingVerse, 
  findMatchingVerseWithPolicy, 
  getVersesByCategory, 
  getThemeCategoryDistribution,
  GitaVerse 
} from './src/data/gitaVerses';
import { INDIA_CRISIS_RESOURCES } from './src/data/crisisResources';
import { PastEntrySummary, ReflectionRequest, ReflectionResponse, CrisisResource } from './src/types';

// Configure dotenv quietly without third-party promotional tips
dotenv.config({ quiet: true } as any);

const app = express();
const PORT = 3000;

// Mount body parsers before routes
app.use(express.json({ limit: '5mb' }));
app.use(express.urlencoded({ extended: true, limit: '5mb' }));

// Verified 24/7 Crisis Helplines
const CRISIS_RESOURCES: CrisisResource[] = INDIA_CRISIS_RESOURCES;

// Comprehensive regex patterns for immediate distress and crisis detection
const CRISIS_PATTERNS = [
  /\b(kill|end|take|hang|shoot|poison|cut|harm|drown)\s+(my\s*self|my\s*own\s*life|my\s*life)\b/i,
  /\b(want|wanna|wish|going|ready|planning)\s+to\s+(die|disappear|end\s*it(\s*all)?|kill\s*myself)\b/i,
  /\b(don't|do\s*not|cant|can't)\s+(want\s*to\s*)?(live|go\s*on|take\s*this|wake\s*up)(\s*anymore)?\b/i,
  /\b(suicid(al|e)|overdose|better\s*off\s*dead|no\s*(point|reason)\s*(in|to)\s*liv(ing|e)|no\s*will\s*to\s*live)\b/i,
  /\b(hurt\s*myself|self\s*harm|cutting\s*myself|slit\s*my\s*wrists)\b/i,
  /\b(nobody\s*would\s*care\s*if\s*i\s*(died|was\s*gone|disappeared))\b/i,
  /\b(feel\s*completely\s*hopeless|cannot\s*survive\s*this|done\s*with\s*life)\b/i
];

function detectCrisisPattern(text: string): boolean {
  if (!text) return false;
  return CRISIS_PATTERNS.some(pattern => pattern.test(text));
}

// Lazy Gemini API client initialization
let aiClient: GoogleGenAI | null = null;
function getGeminiClient(): GoogleGenAI {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not set in environment. Gemini features will return fallback answers.');
    }
    aiClient = new GoogleGenAI({ 
      apiKey: apiKey || 'dummy-key-for-init',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build'
        }
      }
    });
  }
  return aiClient;
}

// Gemini Model Resilience & Fallback Ladder
const MODEL_FALLBACK_LADDER = [
  'gemini-3.6-flash',
  'gemini-3.1-flash-lite',
  'gemini-flash-latest',
  'gemini-3.7-flash'
];

async function callGeminiWithFallback(prompt: string, systemInstruction?: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('GEMINI_API_KEY is missing');
  }

  const ai = getGeminiClient();
  let lastError: any = null;

  for (const model of MODEL_FALLBACK_LADDER) {
    try {
      const response = await ai.models.generateContent({
        model,
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || undefined,
          temperature: 0.7,
        }
      });

      if (response && response.text) {
        return response.text.trim();
      }
    } catch (err: any) {
      console.warn(`Model ${model} failed with error: ${err.message || err}. Trying next fallback...`);
      lastError = err;
    }
  }

  throw lastError || new Error('All Gemini models in the fallback ladder failed.');
}

// Dedicated AI crisis triage evaluator
async function evaluateCrisisWithAI(text: string): Promise<boolean> {
  try {
    const prompt = `Analyze this journal entry:
"${text}"

Question: Does this text express acute suicidal ideation, explicit intentions of self-harm, or severe life-threatening emotional crisis requiring immediate human helpline intervention rather than philosophical contemplation?
Reply with strictly ONE word: either CRISIS_DETECTED or SAFE.`;

    const result = await callGeminiWithFallback(prompt, 'You are an objective safety triage monitor.');
    const upper = result.toUpperCase();
    if (upper.includes('NO CRISIS') || upper.includes('NOT CRISIS') || upper.includes('SAFE')) {
      return false;
    }
    return upper.includes('CRISIS_DETECTED');
  } catch (err) {
    return false;
  }
}

// Check for pattern recall echoes against past entries
async function checkPatternRecall(
  currentText: string, 
  pastSummaries: PastEntrySummary[]
): Promise<string | undefined> {
  if (!pastSummaries || pastSummaries.length === 0) return undefined;
  
  const summariesList = pastSummaries.slice(0, 10).map(s => 
    `- Entry on ${s.date} (Title: "${s.title}"): Theme: ${s.theme || 'General'}, Summary: ${s.summary || 'No summary'}`
  ).join('\n');

  const prompt = `You are an attentive reflective journal assistant. 
Review this new journal entry:
"${currentText}"

Compare it with these past journal entries from the same person:
${summariesList}

Determine if this new reflection closely echoes a recurring emotional theme, pattern, dilemma, or struggle from one of their past entries.
If yes, write a gentle, 1-2 sentence warm observation acknowledging the pattern, e.g.:
"You reflected on a similar feeling of work burnout before on [Date] ('[Title]'). Notice how this theme is asking for your patience once again."
If there is NO clear, meaningful connection, reply with exactly the word: NONE.
Do not invent dates or past entries not listed.`;

  try {
    const result = await callGeminiWithFallback(prompt, 'You are a warm, observant, contemplative journal guide.');
    if (result && !result.toUpperCase().includes('NONE') && result.length > 10) {
      return result;
    }
  } catch (err) {
    console.error('Pattern recall check error:', err);
  }
  return undefined;
}

// Generate Socratic Clarifying Question
async function generateSocraticQuestion(
  currentText: string, 
  conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }>
): Promise<string> {
  const historyText = conversationHistory.map(m => `${m.role === 'user' ? 'Author' : 'Guide'}: ${m.text}`).join('\n\n');
  
  const prompt = `Journal entry:
"${currentText}"

${historyText ? `Previous notes & context in this entry:\n${historyText}\n` : ''}

As a compassionate, Socratic reflective guide, ask ONE thoughtful, open, clarifying question that helps the author pause, look inward, and explore the deeper root of what they are experiencing (such as their hidden expectations, attachments, fears, or assumptions).
Keep the tone gentle, contemplative, and concise (1-2 sentences). Do not lecture or prescribe solutions yet.`;

  const systemInstruction = `You are a quiet, compassionate Socratic guide in a personal contemplative journal. 
Your goal is not to solve their problem immediately, but to invite deeper self-inquiry with a single, caring, profound clarifying question.`;

  try {
    return await callGeminiWithFallback(prompt, systemInstruction);
  } catch (err) {
    return "What expectation or feeling feels most prominent as you write these words?";
  }
}

// Classify Theme & Select the Exact Best Matching Verse from 16 Theme Categories with Strict No-Repeat Preference
async function classifyThemeAndSelectVerse(
  currentText: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }>,
  pastSummaries: PastEntrySummary[] = []
): Promise<{ verse: GitaVerse; detectedTheme: string; detectedMood: string; themeCategory: ThemeCategory }> {
  const fullContext = [
    currentText,
    ...conversationHistory.map(m => m.text)
  ].join('\n\n');

  // Build the list of seen verse IDs and citations for AI prompt
  const seenVersesList = pastSummaries
    .filter(s => s.verseId || s.verseCitation)
    .map((s, idx) => `Entry ${idx + 1} (${s.date || 'past'}): ${s.verseCitation || s.verseId}`)
    .join(', ');

  // Group candidate verses by the 16 theme categories
  const categoryListing = THEME_CATEGORIES.map(tc => {
    const versesInCat = getVersesByCategory(tc.category);
    const verseListStr = versesInCat.length > 0
      ? versesInCat.map(v => `  - ID: "${v.id}" | ${v.citation} | SubThemes: [${v.subThemes.join(', ')}] | Essence: "${v.philosophicalEssence}"`).join('\n')
      : '  (No verses yet in this category - choose another if not exact match)';
    return `Theme Category: "${tc.category}" (${tc.displayName})\nDescription: ${tc.description}\nCandidate Verses in Category:\n${verseListStr}`;
  }).join('\n\n');

  const prompt = `Journal Entry Context:
"${fullContext}"

${seenVersesList ? `Previously received verses in this user's journal history (CRITICAL: Prefer an unseen verse in the matching theme category. Only repeat a verse if every single verse in that theme category has already been shown, in which case pick the least recently seen one):\n${seenVersesList}\n` : 'User has not received any previous verses yet (all candidate verses are unseen).'}

Available 16 Theme Categories & Verified Verse Canon:
${categoryListing}

Strict Matching & Selection Rules:
1. FIRST, classify the core emotional challenge and spiritual dilemma into EXACTLY ONE of the 16 canonical theme categories:
   ['anxiety/fear', 'anger', 'duty/dharma', 'loss/grief', 'ego/attachment', 'doubt/despair', 'reassurance/devotion', 'equanimity/mind', 'courage/self-doubt', 'contentment', 'loneliness/belonging', 'humility', 'guilt/redemption', 'self-worth', 'envy/comparison', 'general refuge/guidance']
2. Select candidate verse ONLY from the candidate verses listed under that chosen theme category. Never select across unrelated categories or fall back to an arbitrary default verse.
3. Apply No-Repeat / Least-Recently-Used (LRU) Rule:
   - If there are UNSEEN verses in the chosen theme category, you MUST select one of the unseen verses.
   - If ALL verses in the chosen category have already been seen by the user, select the one seen longest ago / least recently.
4. Determine the user's primary emotional mood (1-2 words).

Respond in exact JSON format:
{
  "selectedCategory": "anger",
  "selectedVerseId": "bg-2-62",
  "detectedTheme": "The Root of Frustration, Resentment & Anger",
  "detectedMood": "Resentful / Seeking Calm",
  "reasoning": "The entry describes intense frustration from blocked plans. Classifying into theme 'anger' and selecting unseen verse bg-2-62."
}`;

  try {
    const raw = await callGeminiWithFallback(prompt, 'You are an expert scholar of the Bhagavad Gita and psychological counseling. You accurately classify themes into the 16 canonical categories and select verses strictly from the tagged category with strict no-repeat preference.');
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      const matched = GITA_VERSES.find(v => v.id === parsed.selectedVerseId);
      if (matched) {
        return {
          verse: matched,
          detectedTheme: parsed.detectedTheme || matched.theme,
          detectedMood: parsed.detectedMood || 'Reflective',
          themeCategory: matched.category
        };
      }
    }
  } catch (err) {
    console.warn('AI verse classification fallback to deterministic policy engine:', err);
  }

  // Deterministic local algorithm fallback with theme-filter, no-repeat logic, and tie-breaking
  const policyResult = findMatchingVerseWithPolicy(fullContext, {
    pastSummaries: pastSummaries.map(s => ({
      verseId: s.verseId,
      verseCitation: s.verseCitation,
      date: s.date
    })),
    seedText: fullContext
  });

  return {
    verse: policyResult.verse,
    detectedTheme: policyResult.verse.theme,
    detectedMood: 'Contemplative',
    themeCategory: policyResult.category
  };
}

// Generate Gita Grounded Guidance (strictly grounded in selected verse)
async function generateGroundedGuidance(
  currentText: string,
  conversationHistory: Array<{ role: 'user' | 'assistant'; text: string }>,
  verse: GitaVerse,
  detectedTheme: string,
  detectedMood: string
): Promise<{ guidance: string; theme: string; mood: string }> {
  const historyText = conversationHistory.map(m => `${m.role === 'user' ? 'Author' : 'Guide'}: ${m.text}`).join('\n\n');

  const prompt = `Journal Entry:
"${currentText}"

${historyText ? `Context & reflections so far:\n${historyText}\n` : ''}

Selected Bhagavad Gita Verse for this reflection:
Citation: ${verse.citation}
Sanskrit: ${verse.sanskrit}
Translation: "${verse.translation}"
Philosophical Core: ${verse.philosophicalEssence}

Task:
Write a thoughtful, grounded reflection in the margin of this journal entry.
1. Ground your reflection directly in the wisdom of ${verse.citation}.
2. Offer practical, compassionate insight on how the author can apply this perspective to their immediate situation.
3. Keep the tone dignified, peaceful, and respectful — like a quiet, profound margin note in an old journal.
4. Structure the response in 2-3 short, focused paragraphs (120-180 words total).
5. State the detected mood (1-2 words) and core spiritual theme.

Respond in JSON format:
{
  "detectedMood": "${detectedMood}",
  "detectedTheme": "${detectedTheme}",
  "guidance": "The reflective margin commentary..."
}`;

  const systemInstruction = `You are a sacred philosophical companion. You only offer guidance that is strictly grounded in the provided Bhagavad Gita verse. You never fabricate or alter scripture citations.`;

  try {
    const raw = await callGeminiWithFallback(prompt, systemInstruction);
    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (jsonMatch) {
      const parsed = JSON.parse(jsonMatch[0]);
      return {
        guidance: parsed.guidance || raw,
        theme: parsed.detectedTheme || detectedTheme,
        mood: parsed.detectedMood || detectedMood
      };
    }
    return {
      guidance: raw,
      theme: detectedTheme,
      mood: detectedMood
    };
  } catch (err) {
    return {
      guidance: `Reflecting on ${verse.citation}: "${verse.translation}" — ${verse.philosophicalEssence} Take a quiet breath and allow yourself to release the weight of what is beyond your control, finding peace in the sincerity of your present awareness.`,
      theme: detectedTheme,
      mood: detectedMood
    };
  }
}

// ----------------------------------------------------
// API ROUTES
// ----------------------------------------------------

// Health check
app.get('/api/health', (req, res) => {
  res.json({ 
    status: 'ok', 
    timestamp: new Date().toISOString(),
    geminiKeyConfigured: Boolean(process.env.GEMINI_API_KEY)
  });
});

// Theme Category Verse Distribution
app.get('/api/verses/distribution', (req, res) => {
  const distribution = getThemeCategoryDistribution();
  res.json({
    totalVerses: GITA_VERSES.length,
    themeCount: THEME_CATEGORIES.length,
    distribution
  });
});

// Reflect API
app.post('/api/reflect', async (req, res) => {
  try {
    const body: ReflectionRequest = req.body || {};
    const { currentEntryText, conversationHistory = [], pastSummaries = [], directGuidanceRequested, forceSocratic } = body;

    if (!currentEntryText || typeof currentEntryText !== 'string' || currentEntryText.trim().length === 0) {
      return res.status(400).json({ error: 'Journal entry text is required.' });
    }

    const trimmedText = currentEntryText.trim();
    const fullTextToCheck = [trimmedText, ...conversationHistory.map(m => m.text)].join(' ');

    // =========================================================================
    // STEP 1: CRISIS & CARE SAFEGUARD (First Priority Check)
    // =========================================================================
    const isPatternCrisis = detectCrisisPattern(fullTextToCheck);
    const isAiCrisis = isPatternCrisis ? true : await evaluateCrisisWithAI(fullTextToCheck);

    if (isPatternCrisis || isAiCrisis) {
      const response: ReflectionResponse = {
        mode: 'crisis',
        guidance: "It sounds like you are carrying immense pain and feeling overwhelmed right now. Please know that your life and well-being matter deeply, and you do not have to carry this heavy burden alone. While this journal offers philosophical contemplation, your immediate safety and care are what truly matter most right now. Please reach out to one of the compassionate support resources below — people who are ready to listen and support you without judgment.",
        crisisResources: CRISIS_RESOURCES,
        detectedTheme: 'Compassionate Care & Crisis Support',
        detectedMood: 'Acute Distress'
      };
      return res.json(response);
    }

    // =========================================================================
    // STEP 2: PATTERN RECALL (Check for recurring themes across history)
    // =========================================================================
    const patternRecallNote = await checkPatternRecall(trimmedText, pastSummaries);

    // =========================================================================
    // STEP 3: SOCRATIC FLOW INQUIRY
    // =========================================================================
    const isFirstInquiry = conversationHistory.length === 0;
    const shouldAskSocratic = !directGuidanceRequested && (isFirstInquiry || forceSocratic);

    if (shouldAskSocratic) {
      const socraticQuestion = await generateSocraticQuestion(trimmedText, conversationHistory);
      const response: ReflectionResponse = {
        mode: 'socratic_question',
        socraticQuestion,
        patternRecallNote,
        detectedMood: 'Reflective'
      };
      return res.json(response);
    }

    // =========================================================================
    // STEP 4: DYNAMIC THEME CLASSIFICATION & GROUNDED SCRIPTURE SELECTION
    // =========================================================================
    const { verse: matchedVerse, detectedTheme, detectedMood, themeCategory } = await classifyThemeAndSelectVerse(trimmedText, conversationHistory, pastSummaries);
    const { guidance, theme, mood } = await generateGroundedGuidance(trimmedText, conversationHistory, matchedVerse, detectedTheme, detectedMood);

    // Compute mood rating heuristic (1-10) based on detected mood/theme
    let detectedMoodRating = body.userSelectedRating || 6;
    if (!body.userSelectedRating) {
      const lowerMood = (mood || '').toLowerCase();
      const lowerTheme = (theme || '').toLowerCase();
      if (lowerMood.includes('despair') || lowerMood.includes('grief') || lowerMood.includes('lowest') || lowerTheme.includes('loss')) {
        detectedMoodRating = 2;
      } else if (lowerMood.includes('overwhelm') || lowerMood.includes('burden') || lowerMood.includes('anxious') || lowerMood.includes('frustrat') || lowerMood.includes('anger')) {
        detectedMoodRating = 3;
      } else if (lowerMood.includes('doubt') || lowerMood.includes('confused') || lowerMood.includes('restless')) {
        detectedMoodRating = 4;
      } else if (lowerMood.includes('reflective') || lowerMood.includes('contemplat') || lowerMood.includes('seeking')) {
        detectedMoodRating = 6;
      } else if (lowerMood.includes('resolute') || lowerMood.includes('steady') || lowerMood.includes('focused')) {
        detectedMoodRating = 8;
      } else if (lowerMood.includes('serene') || lowerMood.includes('peace') || lowerMood.includes('calm') || lowerMood.includes('equanim')) {
        detectedMoodRating = 9;
      } else if (lowerMood.includes('joy') || lowerMood.includes('grateful') || lowerMood.includes('bliss') || lowerMood.includes('devotion')) {
        detectedMoodRating = 10;
      }
    }

    const response: ReflectionResponse = {
      mode: 'grounded_guidance',
      matchedVerse,
      guidance,
      detectedTheme: theme,
      detectedMood: body.userSelectedMood || mood,
      detectedMoodRating,
      patternRecallNote
    };

    return res.json(response);

  } catch (error: any) {
    console.error('Error in /api/reflect:', error);
    return res.status(500).json({
      error: 'An error occurred while processing your reflection. Please try again.',
      details: error.message || 'Unknown error'
    });
  }
});

// Summarize Entry API for future pattern recall
app.post('/api/summarize-entry', async (req, res) => {
  try {
    const { content, title, theme } = req.body || {};
    if (!content) {
      return res.json({ summary: '' });
    }

    const prompt = `Summarize the core emotional situation and philosophical dilemma in this journal entry in ONE concise sentence (under 25 words):
Title: ${title || 'Untitled'}
Theme: ${theme || 'General'}
Content: "${content}"`;

    try {
      const summary = await callGeminiWithFallback(prompt, 'Summarize concisely.');
      return res.json({ summary });
    } catch {
      return res.json({ summary: `${theme || 'Reflection'}: ${content.slice(0, 80)}...` });
    }
  } catch (err: any) {
    return res.json({ summary: '' });
  }
});

// Start Server with Vite middleware for dev or static serving for prod
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Gita Journal server active on http://0.0.0.0:${PORT}`);
  });
}

startServer();
