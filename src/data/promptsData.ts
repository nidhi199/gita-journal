import { GitaVerse, GITA_VERSES } from './gitaVerses';

export interface ContemplationPrompt {
  id: string;
  theme: string;
  title: string;
  situation: string;
  verseCitation: string;
  promptQuestion: string;
  reflectionStarters: string[];
  suggestedMood: string;
}

export const TOPICAL_CHALLENGE_PROMPTS: ContemplationPrompt[] = [
  {
    id: 'imposter-syndrome',
    theme: 'courage/self-doubt',
    title: 'Imposter Syndrome & Doubt',
    situation: 'Feeling unqualified, fearing exposure, or second-guessing your capabilities.',
    verseCitation: 'BG 6.5',
    promptQuestion: 'In what ways are you acting as your own enemy through harsh self-judgment, and how can you elevate yourself with kindness today?',
    reflectionStarters: [
      'The self-critical story I am telling myself today is...',
      'If I viewed my efforts as sincere service rather than personal perfection...',
      'One step I can take to be a true friend to my own mind is...'
    ],
    suggestedMood: 'Resolute'
  },
  {
    id: 'outcome-anxiety',
    theme: 'duty/dharma',
    title: 'Anxiety Over Results & Timelines',
    situation: 'Fixated on whether an effort will succeed, receive praise, or bear fruit.',
    verseCitation: 'BG 2.47',
    promptQuestion: 'What portion of this situation is 100% within your effort, and what outcome are you trying to force that is beyond your control?',
    reflectionStarters: [
      'Right now, the result I am gripping most tightly is...',
      'When I release the obsession with the outcome and focus purely on the work itself...',
      'My sacred duty in this present hour is simply to...'
    ],
    suggestedMood: 'Serene'
  },
  {
    id: 'anger-friction',
    theme: 'anger',
    title: 'Interpersonal Friction & Heated Temper',
    situation: 'Feeling provoked by someone’s words, unfairness, or blocked desires.',
    verseCitation: 'BG 2.62',
    promptQuestion: 'What underlying expectation or attachment was challenged when anger arose, and what would choosing dignity over reaction look like?',
    reflectionStarters: [
      'The unmet desire underneath my irritation is...',
      'If I step back before reacting, the cloudiness in my thinking reveals...',
      'I choose to protect my inner peace by responding with...'
    ],
    suggestedMood: 'Contemplative'
  },
  {
    id: 'grief-transitions',
    theme: 'loss/grief',
    title: 'Navigating Loss & Change',
    situation: 'Mourning what was, dealing with separation, aging, or a closed chapter.',
    verseCitation: 'BG 2.13',
    promptQuestion: 'As forms and seasons naturally change, what eternal, untouched awareness remains within you?',
    reflectionStarters: [
      'The transition or loss that feels heavy on my heart today is...',
      'Allowing myself to feel grief while remembering the impermanent nature of forms...',
      'The love and essence that cannot be extinguished is...'
    ],
    suggestedMood: 'Grieving'
  },
  {
    id: 'comparison-trap',
    theme: 'envy/comparison',
    title: 'Comparison & Social Envy',
    situation: 'Measuring your path against others and feeling behind or envious.',
    verseCitation: 'BG 3.35',
    promptQuestion: 'How is trying to walk someone else’s journey obscuring the unique dharma only you can fulfill?',
    reflectionStarters: [
      'I found myself comparing my progress to...',
      'My own unique, authentic path—even with imperfections—calls me to...',
      'I celebrate another’s success while returning my energy to my own craft...'
    ],
    suggestedMood: 'Contemplative'
  },
  {
    id: 'burnout-exhaustion',
    theme: 'equanimity/mind',
    title: 'Burnout & Sensory Overwhelm',
    situation: 'Racing thoughts, emotional exhaustion, or feeling pulled in every direction.',
    verseCitation: 'BG 6.16',
    promptQuestion: 'Where has imbalance crept into your eating, resting, working, or recreation, and how can moderation restore you?',
    reflectionStarters: [
      'My mind and body are currently signaling exhaustion through...',
      'The boundary I need to set today for healthy moderation is...',
      'Returning to stillness for just a few moments allows me to...'
    ],
    suggestedMood: 'Overwhelmed'
  },
  {
    id: 'decision-paralysis',
    theme: 'doubt/despair',
    title: 'Paralysis of Choice & Crossroads',
    situation: 'Stuck between multiple paths, fearful of making the wrong choice.',
    verseCitation: 'BG 2.41',
    promptQuestion: 'If you strip away fear of public opinion, which direction aligns with single-pointed clarity and truth?',
    reflectionStarters: [
      'The multiple branches and conflicting thoughts confusing me are...',
      'The one guiding principle that cuts through all side distractions is...',
      'Taking one decisive, sincere step forward today looks like...'
    ],
    suggestedMood: 'Resolute'
  },
  {
    id: 'deep-gratitude',
    theme: 'contentment',
    title: 'Cultivating Sacred Contentment',
    situation: 'Acknowledging the abundance, beauty, and grace present in this moment.',
    verseCitation: 'BG 2.55',
    promptQuestion: 'What simple truth or presence in your life brings you joy completely independent of external acquisition?',
    reflectionStarters: [
      'Today, I find deep joy and quiet sufficiency in...',
      'Looking within rather than searching outward, my mind rests in...',
      'A silent offering of thanks for...'
    ],
    suggestedMood: 'Joyful'
  }
];

export function getDailyShloka(date: Date = new Date()): {
  verse: GitaVerse;
  prompt: string;
  themeTitle: string;
  dayNumber: number;
} {
  // Deterministic daily pick based on day of year
  const start = new Date(date.getFullYear(), 0, 0);
  const diff = (date.getTime() - start.getTime()) + ((start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000);
  const oneDay = 1000 * 60 * 60 * 24;
  const dayOfYear = Math.floor(diff / oneDay);

  const verseIndex = dayOfYear % GITA_VERSES.length;
  const verse = GITA_VERSES[verseIndex];

  // Specific prompts tailored by theme
  const promptMap: Record<string, string> = {
    'anxiety/fear': 'Where can you surrender fear of the unknown to the eternal sanctuary within today?',
    'anger': 'Where is a small pause needed before responding, replacing irritation with understanding?',
    'duty/dharma': 'What duty can you perform today with total sincerity, letting go of attachment to outcome?',
    'loss/grief': 'What part of you remains untouched and radiant despite the changes around you?',
    'ego/attachment': 'What are you holding onto tightly that would bring freedom if gently surrendered?',
    'doubt/despair': 'In what area of your life can single-minded conviction cut through endless questioning?',
    'reassurance/devotion': 'How can you remember that you are never walking this path alone?',
    'equanimity/mind': 'How can you cultivate equal stillness amidst both praise and critique today?',
    'courage/self-doubt': 'What brave, authentic action is your inner self asking you to take?',
    'contentment': 'What already feels complete and whole in your life right now?',
    'loneliness/belonging': 'How can you experience the sacred presence that resides in all beings and in you?',
    'humility': 'How can gentleness and non-judgment guide your interactions today?',
    'guilt/redemption': 'How can self-compassion and resolve to do good redeem your peace of mind?',
    'self-worth': 'How does knowing your unchangeable divine core quiet worldly self-criticism?',
    'envy/comparison': 'What is your authentic calling that makes comparing yourself to others unnecessary?',
    'general refuge/guidance': 'Where can you take refuge in higher wisdom today?'
  };

  const prompt = promptMap[verse.theme] || 'How does this sacred insight guide your heart and actions today?';

  return {
    verse,
    prompt,
    themeTitle: verse.theme.replace('/', ' & ').replace(/\b\w/g, c => c.toUpperCase()),
    dayNumber: dayOfYear
  };
}
