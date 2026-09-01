import { MoodArchetype } from '../types';

export const MOOD_ARCHETYPES: MoodArchetype[] = [
  {
    id: 'serene',
    label: 'Serene & Equanimous',
    sanskritTerm: 'Sthitaprajna / Shanti',
    guna: 'sattva',
    defaultRating: 9,
    icon: '🌿',
    color: '#34d399', // Emerald
    bgLight: 'rgba(16, 185, 129, 0.15)',
    description: 'Tranquil, balanced, unshakeable amidst praise or blame, centered in inner calm.'
  },
  {
    id: 'joyful',
    label: 'Joyful & Grateful',
    sanskritTerm: 'Ananda / Prasada',
    guna: 'sattva',
    defaultRating: 10,
    icon: '🌟',
    color: '#fbbf24', // Amber
    bgLight: 'rgba(245, 158, 11, 0.15)',
    description: 'Elevated, loving, deeply thankful, experiencing spontaneous bliss and connection.'
  },
  {
    id: 'reflective',
    label: 'Contemplative & Seeking',
    sanskritTerm: 'Jijnasu / Vichara',
    guna: 'sattva',
    defaultRating: 7,
    icon: '🪷',
    color: '#60a5fa', // Blue
    bgLight: 'rgba(59, 130, 246, 0.15)',
    description: 'Observant, questioning deeply, open to insight, seeking higher understanding.'
  },
  {
    id: 'resolute',
    label: 'Resolute & Focused',
    sanskritTerm: 'Vyavasayatmika Buddhi',
    guna: 'sattva',
    defaultRating: 8,
    icon: '⚡',
    color: '#a78bfa', // Purple
    bgLight: 'rgba(167, 139, 250, 0.15)',
    description: 'Clear in purpose, determined, disciplined, dedicating actions without hesitation.'
  },
  {
    id: 'restless',
    label: 'Restless & Anxious',
    sanskritTerm: 'Chanchala / Rajas',
    guna: 'rajas',
    defaultRating: 4,
    icon: '🌀',
    color: '#f97316', // Orange
    bgLight: 'rgba(249, 115, 22, 0.15)',
    description: 'Mind fluttering, racing thoughts, worrying about future results or timelines.'
  },
  {
    id: 'overwhelmed',
    label: 'Overwhelmed & Burdened',
    sanskritTerm: 'Kshobha / Ahamkara Bhara',
    guna: 'rajas',
    defaultRating: 3,
    icon: '🌪️',
    color: '#f43f5e', // Rose
    bgLight: 'rgba(244, 63, 94, 0.15)',
    description: 'Carrying too much, feeling like the sole doer, heavy pressure to succeed.'
  },
  {
    id: 'frustrated',
    label: 'Frustrated & Irritated',
    sanskritTerm: 'Krodha / Sammoha',
    guna: 'rajas',
    defaultRating: 3,
    icon: '🔥',
    color: '#ef4444', // Red
    bgLight: 'rgba(239, 68, 68, 0.15)',
    description: 'Blocked desires, friction with circumstances or people, impatience.'
  },
  {
    id: 'grieving',
    label: 'Sorrowful & Grieving',
    sanskritTerm: 'Vishada / Shoka',
    guna: 'tamas',
    defaultRating: 2,
    icon: '🌧️',
    color: '#818cf8', // Indigo
    bgLight: 'rgba(129, 140, 248, 0.15)',
    description: 'Heavy heart, sadness over loss or change, despondency like Arjuna before battle.'
  },
  {
    id: 'despairing',
    label: 'Deep Despair / Lowest',
    sanskritTerm: 'Kripaya Aavishtam',
    guna: 'tamas',
    defaultRating: 1,
    icon: '🌑',
    color: '#64748b', // Slate / Gray
    bgLight: 'rgba(100, 116, 139, 0.15)',
    description: 'Feeling completely drained, vulnerable, at rock bottom seeking an anchor.'
  }
];

export function getMoodArchetype(moodName?: string): MoodArchetype {
  if (!moodName) return MOOD_ARCHETYPES[2]; // Default: reflective
  const normalized = moodName.toLowerCase();
  
  const found = MOOD_ARCHETYPES.find(m => 
    normalized.includes(m.id) || 
    m.label.toLowerCase().includes(normalized) ||
    normalized.includes(m.guna)
  );

  return found || MOOD_ARCHETYPES[2];
}

export function getMoodRatingLabel(rating: number): string {
  if (rating <= 2) return 'Lowest / Deeply Challenging';
  if (rating <= 4) return 'Vulnerable / Heavy';
  if (rating <= 6) return 'Balanced / Inquiring';
  if (rating <= 8) return 'Centered / Peaceful';
  return 'Happiest / Sublime Equanimity';
}
