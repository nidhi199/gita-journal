import { JournalEntry } from '../types';
import { GITA_VERSES } from './gitaVerses';

// Retrieve verified verses directly from canon to guarantee 100% scriptural grounding
const verse247 = GITA_VERSES.find(v => v.id === 'bg-2-47')!;
const verse65 = GITA_VERSES.find(v => v.id === 'bg-6-5')!;
const verse262 = GITA_VERSES.find(v => v.id === 'bg-2-62')!;

export const SAMPLE_DEMO_PROMPTS = [
  {
    title: "Overwhelm & Fear of Failure at Work",
    content: "I have been staying up late dreading the quarterly review. Even though I worked hard, I feel sick with anxiety that my team will be disappointed or that my effort won't be acknowledged.",
    theme: "Duty & Dharma"
  },
  {
    title: "Restless Mind & Morning Distraction",
    content: "Sitting in morning silence today, my mind was racing with to-do lists and old arguments. I felt impatient and angry at myself for not having a quiet, peaceful mind.",
    theme: "Equanimity & Mind Restlessness"
  },
  {
    title: "Frustration Over Unspoken Expectations",
    content: "A close colleague didn't acknowledge the extra hours I put in to rescue their project. I feel a sharp bitterness inside, replaying the conversation again and again.",
    theme: "Anger & Frustration"
  }
];

export const DEMO_ENTRIES: JournalEntry[] = [
  {
    id: 'demo-entry-1',
    userId: 'demo-user',
    title: 'Anxiety Over Quarterly Results & The Fear of Judgment',
    content: 'For the last three days, my stomach has been in knots thinking about the upcoming product launch. I find myself constantly checking metrics and imagining catastrophic scenarios where leadership is disappointed in my work. It feels like my entire worth as a person is on the line with this one outcome.',
    createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 'Anxious / Seeking Equanimity',
    moodRating: 4,
    theme: 'Detachment from Outcomes & Pure Duty',
    themeCategory: 'duty/dharma',
    summary: 'Worrying about upcoming launch results and attaching personal worth to external evaluation.',
    location: {
      latitude: 28.6139,
      longitude: 77.2090,
      placeName: 'Home Sanctuary, Quiet Balcony',
      city: 'New Delhi',
      region: 'Delhi',
      country: 'India'
    },
    conversation: [
      {
        id: 'conv-1-1',
        role: 'assistant',
        text: 'What would your work feel like tomorrow if your inherent dignity was already safe and whole, completely independent of how this single project is received?',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
        isClarifyingQuestion: true
      },
      {
        id: 'conv-1-2',
        role: 'user',
        text: 'If my dignity felt safe, I think I would actually enjoy solving the problems instead of feeling like I am walking onto an execution platform. I am exhausting myself trying to guarantee the future.',
        timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 120000).toISOString()
      }
    ],
    verse: verse247,
    guidance: 'Bhagavad Gita 2.47 teaches that you have a sovereign claim to your sincere labor, but the fruits belong to the wider cosmos. Anxiety thrives when we try to own both the action and its final destination. Pour your craftsmanship into the task before you today, and gently hand the outcome over.',
    patternRecallNote: undefined,
    isCrisisDetected: false,
    status: 'saved'
  },
  {
    id: 'demo-entry-2',
    userId: 'demo-user',
    title: 'Morning Silence by the River: Befriending the Restless Mind',
    content: 'Sat on the river ghat at sunrise trying to meditate. Within five minutes, my thoughts scattered in ten directions—past mistakes, upcoming errands, random fears. I caught myself clenching my jaw in frustration, treating my own mind like an enemy that refused to obey me.',
    createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 'Restless / Contemplative',
    moodRating: 6,
    theme: 'Equanimity & Mind Restlessness',
    themeCategory: 'equanimity/mind',
    summary: 'Struggling with racing thoughts in morning meditation and fighting the restless mind with harshness.',
    location: {
      latitude: 30.0869,
      longitude: 78.2676,
      placeName: 'Triveni Ghat Sanctuary',
      city: 'Rishikesh',
      region: 'Uttarakhand',
      country: 'India'
    },
    conversation: [
      {
        id: 'conv-2-1',
        role: 'assistant',
        text: 'When your thoughts wander, what shifts if you view the mind not as a hostile adversary to be crushed, but as an untrained companion in need of patient friendship?',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
        isClarifyingQuestion: true
      },
      {
        id: 'conv-2-2',
        role: 'user',
        text: 'It softens the tension immediately. I realized I was bringing workplace aggression into my meditation practice.',
        timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000 + 120000).toISOString()
      }
    ],
    verse: verse65,
    guidance: 'In Bhagavad Gita 6.5, Sri Krishna reminds us that one must lift oneself by the mind, never degrading it—for the mind alone is one’s ally, and the mind alone can become one’s adversary. The art of inner stillness begins with kindness toward your own attention.',
    patternRecallNote: undefined,
    isCrisisDetected: false,
    status: 'saved'
  },
  {
    id: 'demo-entry-3',
    userId: 'demo-user',
    title: 'Tracing the Fire of Irritation Back to Unspoken Attachment',
    content: 'Felt a wave of resentment when a colleague dismissed an initiative I had spent weeks preparing. My immediate instinct was to react defensively and argue. Instead, I took a ten-minute walk in the garden to trace why that comment felt so poisonous.',
    createdAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    updatedAt: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000).toISOString(),
    mood: 'Resentful / Seeking Calm',
    moodRating: 5,
    theme: 'The Chain of Desire to Wrath',
    themeCategory: 'anger',
    summary: 'Dealing with defensive anger and irritation from a colleague criticizing an initiative.',
    location: {
      latitude: 18.5204,
      longitude: 73.8567,
      placeName: 'Empress Botanical Garden',
      city: 'Pune',
      region: 'Maharashtra',
      country: 'India'
    },
    conversation: [
      {
        id: 'conv-3-1',
        role: 'assistant',
        text: 'Behind this irritation, what unspoken expectation or silent agreement did you feel was violated?',
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000 + 60000).toISOString(),
        isClarifyingQuestion: true
      },
      {
        id: 'conv-3-2',
        role: 'user',
        text: 'I expected automatic validation for my effort. When it did not happen, my ego felt insulted.',
        timestamp: new Date(Date.now() - 9 * 24 * 60 * 60 * 1000 + 120000).toISOString()
      }
    ],
    verse: verse262,
    guidance: 'Bhagavad Gita 2.62 reveals the psychological cascade: contemplating external validation breeds attachment; from attachment arises longing, and thwarted longing explodes into anger. When you recognize the expectation, the heat dissolves back into clarity.',
    patternRecallNote: undefined,
    isCrisisDetected: false,
    status: 'saved'
  }
];
