export type ThemeCategory = 
  | 'anxiety/fear'
  | 'anger'
  | 'duty/dharma'
  | 'loss/grief'
  | 'ego/attachment'
  | 'doubt/despair'
  | 'reassurance/devotion'
  | 'equanimity/mind'
  | 'courage/self-doubt'
  | 'contentment'
  | 'loneliness/belonging'
  | 'humility'
  | 'guilt/redemption'
  | 'self-worth'
  | 'envy/comparison'
  | 'general refuge/guidance';

export interface ThemeDefinition {
  category: ThemeCategory;
  displayName: string;
  description: string;
  keywords: string[];
}

export const THEME_CATEGORIES: ThemeDefinition[] = [
  {
    category: 'anxiety/fear',
    displayName: 'Anxiety & Fear',
    description: 'Fear of the future, dread, uncertainty, panic, overwhelm, financial/survival insecurity',
    keywords: ['anxiety', 'anxious', 'fear', 'afraid', 'panic', 'scared', 'dread', 'nervous', 'terrified', 'worry', 'worried', 'insecurity', 'future', 'scarcity', 'fearful']
  },
  {
    category: 'anger',
    displayName: 'Anger & Frustration',
    description: 'Irritation, resentment, rage, thwarted desires, conflict, bitterness, heated temper',
    keywords: ['anger', 'angry', 'mad', 'furious', 'rage', 'resentment', 'frustration', 'frustrated', 'irritated', 'temper', 'conflict', 'argument', 'screaming', 'bitter', 'grudge', 'fight']
  },
  {
    category: 'duty/dharma',
    displayName: 'Duty & Dharma',
    description: 'Work stress, performance anxiety, attachment to results, procrastination, fulfilling life responsibilities',
    keywords: ['duty', 'dharma', 'work', 'career', 'job', 'responsibility', 'obligation', 'results', 'outcome', 'karma', 'performance', 'procrastination', 'deadline', 'effort', 'burnout', 'tasks']
  },
  {
    category: 'loss/grief',
    displayName: 'Loss & Grief',
    description: 'Mourning, bereavement, death of loved ones, major life transitions, aging, letting go of the past',
    keywords: ['grief', 'loss', 'mourning', 'bereavement', 'death', 'died', 'passed away', 'sadness', 'heartbroken', 'transition', 'aging', 'letting go', 'goodbye', 'past', 'funeral', 'miss them']
  },
  {
    category: 'ego/attachment',
    displayName: 'Ego & Attachment',
    description: 'Clinging to control, pride, possessiveness, stubbornness, obsessing over outcomes or people',
    keywords: ['ego', 'pride', 'attachment', 'clinging', 'possessive', 'control', 'stubborn', 'status', 'craving', 'desire', 'obsession', 'reputation', 'mine', 'arrogance']
  },
  {
    category: 'doubt/despair',
    displayName: 'Doubt & Despair',
    description: 'Existential doubt, loss of meaning, paralysis of decision, skepticism, confusion about life direction',
    keywords: ['doubt', 'despair', 'hopeless', 'confusion', 'confused', 'uncertainty', 'indecisive', 'meaningless', 'lost', 'skeptical', 'questioning', 'what is the point', 'unclear', 'struggling to decide']
  },
  {
    category: 'reassurance/devotion',
    displayName: 'Reassurance & Devotion',
    description: 'Faith, seeking divine protection, surrender, spiritual connection, feeling held and cared for',
    keywords: ['devotion', 'bhakti', 'reassurance', 'faith', 'prayer', 'grace', 'protection', 'surrender', 'divine', 'god', 'krishna', 'shelter', 'trust in universe', 'held', 'safe']
  },
  {
    category: 'equanimity/mind',
    displayName: 'Equanimity & Mind Restlessness',
    description: 'Restless thoughts, mood swings, sensory overload, emotional balance, mindfulness, meditation struggles',
    keywords: ['equanimity', 'mind', 'restless', 'balance', 'calm', 'serenity', 'meditation', 'focus', 'distraction', 'overthinking', 'racing thoughts', 'unshaken', 'stillness', 'tolerance', 'sensory', 'noise']
  },
  {
    category: 'courage/self-doubt',
    displayName: 'Courage & Self-Doubt',
    description: 'Hesitation, feeling weak, fear of taking action, faint-heartedness, finding inner strength to stand up',
    keywords: ['courage', 'strength', 'faint-hearted', 'timid', 'weakness', 'hesitation', 'stand up', 'brave', 'face fears', 'rise', 'paralyzed', 'empowerment', 'cowardice', 'shaking', 'afraid to act']
  },
  {
    category: 'contentment',
    displayName: 'Contentment & Simplicity',
    description: 'Inner sufficiency, peace with what is, releasing insatiable craving, stillness within',
    keywords: ['contentment', 'satisfaction', 'peace', 'simplicity', 'enough', 'gratitude', 'fulfillment', 'serenity', 'seeking peace within', 'stillness', 'uncluttered', 'peace of mind']
  },
  {
    category: 'loneliness/belonging',
    displayName: 'Loneliness & Belonging',
    description: 'Feeling isolated, alienated, searching for connection, solitude as sacred sanctuary',
    keywords: ['lonely', 'loneliness', 'isolated', 'isolation', 'alone', 'alienated', 'belonging', 'connection', 'abandoned', 'solitude', 'inner presence', 'nobody understands', 'distant']
  },
  {
    category: 'humility',
    displayName: 'Humility & Goodwill',
    description: 'Freedom from arrogance, loving-kindness toward all beings, gentleness, empathy, forgiveness',
    keywords: ['humility', 'humble', 'gentleness', 'forgiveness', 'kindness', 'empathy', 'non-violence', 'compassion', 'goodwill', 'softness', 'releasing grudge', 'oneness', 'friendly']
  },
  {
    category: 'guilt/redemption',
    displayName: 'Guilt & Redemption',
    description: 'Regret over past mistakes, self-forgiveness, moral repair, starting afresh, releasing shame',
    keywords: ['guilt', 'regret', 'shame', 'remorse', 'mistake', 'redemption', 'forgive myself', 'sin', 'bad choice', 'starting over', 'clean slate', 'ashamed', 'moral failure']
  },
  {
    category: 'self-worth',
    displayName: 'Self-Worth & Inner Compassion',
    description: 'Inner critic, feelings of inadequacy, self-sabotage, befriending oneself, honoring inherent dignity',
    keywords: ['self-worth', 'worthless', 'inadequate', 'not good enough', 'inner critic', 'self-compassion', 'self-hate', 'befriend myself', 'dignity', 'valuable', 'harsh on myself', 'imposter']
  },
  {
    category: 'envy/comparison',
    displayName: 'Envy & Comparison',
    description: 'Comparing oneself to others, jealousy of peers, imposter syndrome, honoring one’s unique path (svadharma)',
    keywords: ['envy', 'jealousy', 'jealous', 'comparison', 'comparing', 'imposter syndrome', 'svadharma', 'peers', 'rivalry', 'behind in life', 'inferior', 'measuring myself', 'others success']
  },
  {
    category: 'general refuge/guidance',
    displayName: 'General Refuge & Guidance',
    description: 'Complete surrender in overwhelm, life crossroads, seeking profound spiritual shelter and wisdom',
    keywords: ['refuge', 'shelter', 'guidance', 'surrender', 'crossroads', 'overwhelmed', 'helpless', 'wisdom', 'path', 'direction', 'seeking help', 'spiritual guidance', 'sharanam']
  }
];

export interface GitaVerse {
  id: string;
  chapter: number;
  verse: number;
  citation: string;
  sanskrit: string;
  transliteration: string;
  translation: string;
  theme: string;
  category: ThemeCategory;
  additionalCategories?: ThemeCategory[];
  subThemes: string[];
  keywords: string[];
  philosophicalEssence: string;
}

export const GITA_VERSES: GitaVerse[] = [
  {
    id: "bg-2-11",
    chapter: 2,
    verse: 11,
    citation: "Bhagavad Gita 2.11",
    sanskrit: "अशोच्यानन्वशोचस्त्वं प्रज्ञावादांश्च भाषसे ।\nगतासूनगतासूंश्च नानुशोचन्ति पण्डिताः ॥",
    transliteration: "aśocyān anvaśocas tvaṁ prajñā-vādāṁś ca bhāṣase |\ngatāsūn agatāsūṁś ca nānuśocanti paṇḍitāḥ ||",
    translation: "You grieve for those who do not warrant grief, yet you speak words of apparent wisdom. Wise individuals mourn neither the living nor those who have passed.",
    theme: "mourning the inevitable",
    category: "loss/grief",
    additionalCategories: ["doubt/despair","equanimity/mind"],
    subThemes: ["mourning the inevitable","intellectualizing grief","wisdom beyond physical death","releasing attachment to form"],
    keywords: ["grief","mourning","loss","bereavement","death","sadness","intellectualizing","sorrow","letting go","unwise grief"],
    philosophicalEssence: "Wise discernment recognizes the eternal continuum of consciousness, releasing the futile agony of mourning the indestructible."
  },
  {
    id: "bg-2-13",
    chapter: 2,
    verse: 13,
    citation: "Bhagavad Gita 2.13",
    sanskrit: "देहिनोऽस्मिन्यथा देहे कौमारं यौवनं जरा ।\nतथा देहान्तरप्राप्तिर्धीरस्तत्र न मुह्यति ॥",
    transliteration: "dehino 'smin yathā dehe kaumāraṁ yauvanaṁ jarā |\ntathā dehāntara-prāptir dhīras tatra na muhyati ||",
    translation: "Just as the embodied soul continuously moves within this body through childhood, youth, and old age, so does it transition into another body. The steadfast are not bewildered by such changes.",
    theme: "inevitability of aging",
    category: "loss/grief",
    additionalCategories: ["equanimity/mind","anxiety/fear"],
    subThemes: ["inevitability of aging","bodily transition","steadfastness in change","soul continuity"],
    keywords: ["aging","change","transition","youth","childhood","old age","loss","impermanence","steadfast","continuity"],
    philosophicalEssence: "Change is the rhythmic nature of embodiment. Understanding that transitions do not touch your core essence brings unshakeable fortitude."
  },
  {
    id: "bg-2-14",
    chapter: 2,
    verse: 14,
    citation: "Bhagavad Gita 2.14",
    sanskrit: "मात्रास्पर्शास्तु कौन्तेय शीतोष्णसुखदुःखदाः ।\nआगमापायिनोऽनित्यास्तांस्तितिक्षस्व भारत ॥",
    transliteration: "mātrā-sparśās tu kaunteya śītoṣṇa-sukha-duḥkha-dāḥ |\nāgamāpāyino 'nityās tāṁs titikṣasva bhārata ||",
    translation: "The contact of the senses with external objects gives rise to cold and heat, pleasure and pain. These experiences come and go; they are temporary. Learn to endure them with fortitude.",
    theme: "sensory turbulence",
    category: "equanimity/mind",
    additionalCategories: ["anxiety/fear","contentment"],
    subThemes: ["sensory turbulence","emotional storms","impermanence of pleasure and pain","titiksha (forbearance)"],
    keywords: ["anxiety","impermanence","weathering emotions","heat and cold","pleasure and pain","forbearance","titiksha","temporary","patience"],
    philosophicalEssence: "All emotional and physical sensations are fleeting weather upon the sky of consciousness. Bear them with calm, knowing they will pass."
  },
  {
    id: "bg-2-20",
    chapter: 2,
    verse: 20,
    citation: "Bhagavad Gita 2.20",
    sanskrit: "न जायते म्रियते वा कदाचिन्नायं भूत्वा भविता वा न भूयः ।\nअजो नित्यः शाश्वतोऽयं पुराणो न हन्यते हन्यमाने शरीरे ॥",
    transliteration: "na jāyate mriyate vā kadācin nāyaṁ bhūtvā bhavitā vā na bhūyaḥ |\najo nityaḥ śāśvato 'yaṁ purāṇo na hanyate hanyamāne śarīre ||",
    translation: "The soul is never born, nor does it ever die; having once existed, it never ceases to be. Unborn, eternal, ageless, and ancient, it is not slain when the body is slain.",
    theme: "indestructible soul",
    category: "loss/grief",
    additionalCategories: ["reassurance/devotion","anxiety/fear"],
    subThemes: ["indestructible soul","transcending death","eternal existence","consolation in bereavement"],
    keywords: ["death","grief","immortal","unborn","eternal","soul","loss","bereavement","comfort","indestructible"],
    philosophicalEssence: "Your core reality was never born and cannot die. What you grieve is the outer vessel; the conscious essence remains whole and untouched."
  },
  {
    id: "bg-2-22",
    chapter: 2,
    verse: 22,
    citation: "Bhagavad Gita 2.22",
    sanskrit: "वासांसि जीर्णानि यथा विहाय नवानि गृह्णाति नरोऽपराणि ।\nतथा शरीराणि विहाय जीर्णान्यन्यानि संयाति नवानि देही ॥",
    transliteration: "vāsāṁsi jīrṇāni yathā vihāya navāni gṛhṇāti naro 'parāṇi |\ntathā śarīrāणि vihāya jīrṇāny anyāni saṁyāti navāni dehī ||",
    translation: "Just as a person casts off worn-out garments and puts on new ones, so the embodied self discards decayed bodies and enters into new ones.",
    theme: "garment metaphor",
    category: "loss/grief",
    additionalCategories: ["equanimity/mind"],
    subThemes: ["garment metaphor","transition of identity","releasing expired forms","peace with mortality"],
    keywords: ["garments","clothes","rebirth","transition","body","grief","mortality","renewal","letting go"],
    philosophicalEssence: "The physical vessel is worn and shed like clothing. Trust the natural migration and renewal of life across form."
  },
  {
    id: "bg-2-27",
    chapter: 2,
    verse: 27,
    citation: "Bhagavad Gita 2.27",
    sanskrit: "जातस्य हि ध्रुवो मृत्युर्ध्रुवं जन्म मृतस्य च ।\nतस्मादपरिहार्येऽर्थे न त्वं शोचितुमर्हसि ॥",
    transliteration: "jātasya hi dhruvo mṛtyur dhruvaṁ janma mṛtasya ca |\ntasmād aparihārye 'rthe na tvaṁ śocitum arhasi ||",
    translation: "Death is certain for one who is born, and birth is certain for one who dies. Therefore, over an inevitable truth, you ought not to grieve.",
    theme: "inevitability of death",
    category: "loss/grief",
    additionalCategories: ["equanimity/mind","doubt/despair"],
    subThemes: ["inevitability of death","cosmic cycle","acceptance of reality","releasing resistance"],
    keywords: ["inevitable","death","birth","cycle","grief","acceptance","loss","sorrow","fate","reality"],
    philosophicalEssence: "What is born must dissolve, and what dissolves returns. Meeting the inevitable with acceptance transforms sorrow into serenity."
  },
  {
    id: "bg-2-47",
    chapter: 2,
    verse: 47,
    citation: "Bhagavad Gita 2.47",
    sanskrit: "कर्मण्येवाधिकारस्ते मा फलेषु कदाचन ।\nमा कर्मफलहेतुर्भूर्मा ते सङ्गोऽस्त्वकर्मणि ॥",
    transliteration: "karmaṇy evādhikāras te mā phaleṣu kadācana |\nmā karma-phala-hetur bhūr mā te saṅgo 'stv akarmaṇi ||",
    translation: "You have a right to action alone, never to its fruits. Never let the fruits of action be your motive, nor be attached to inaction.",
    theme: "detachment from outcomes",
    category: "duty/dharma",
    additionalCategories: ["anxiety/fear","ego/attachment"],
    subThemes: ["detachment from outcomes","performance anxiety","pure action","overcoming procrastination"],
    keywords: ["duty","karma","action","results","fruits","outcome","anxiety","work","stress","performance","effort"],
    philosophicalEssence: "Focus entirely on the sincerity and craftsmanship of your current step; surrender anxiety about future outcomes to liberate creative power."
  },
  {
    id: "bg-2-48",
    chapter: 2,
    verse: 48,
    citation: "Bhagavad Gita 2.48",
    sanskrit: "योगस्थः कुरु कर्माणि सङ्गं त्यक्त्वा धनंजय ।\nसिद्ध्यसिद्ध्योः समो भूत्वा समत्वं योग उच्यते ॥",
    transliteration: "yoga-sthaḥ kuru karmāṇi saṅgaṁ tyaktvā dhanaṁjaya |\nsiddhy-asiddhyoḥ samo bhūtvā samatvaṁ yoga ucyate ||",
    translation: "Perform your duty established in Yoga, relinquishing attachment and remaining balanced in success and failure. Equanimity is called Yoga.",
    theme: "samatva (even-mindedness)",
    category: "equanimity/mind",
    additionalCategories: ["duty/dharma","envy/comparison"],
    subThemes: ["samatva (even-mindedness)","success and failure balance","unattached dedication","inner stability"],
    keywords: ["equanimity","yoga","balance","success","failure","samatva","attachment","duty","even-minded"],
    philosophicalEssence: "True mastery is not measured by external triumphs, but by the stillness of your heart in both victory and defeat."
  },
  {
    id: "bg-2-56",
    chapter: 2,
    verse: 56,
    citation: "Bhagavad Gita 2.56",
    sanskrit: "दुःखेष्वनुद्विग्नमनाः सुखेषु विगतस्पृहः ।\nवीतरागभयक्रोधः स्थितधीर्मुनिरुच्यते ॥",
    transliteration: "duḥkheṣv anudvigna-manāḥ sukheṣu vigata-spṛhaḥ |\nvīta-rāga-bhaya-krodhaḥ sthita-dhīr munir ucyate ||",
    translation: "One whose mind is unagitated amidst sorrow, who is free from longing amidst pleasure, and who has transcended passion, fear, and anger is called a sage of steady wisdom.",
    theme: "unagitated mind",
    category: "equanimity/mind",
    additionalCategories: ["anxiety/fear","anger","contentment"],
    subThemes: ["unagitated mind","freedom from craving","transcending fear and anger","sthita-prajna (sage of steady wisdom)"],
    keywords: ["sorrow","pleasure","unagitated","anger","fear","steady wisdom","sthita-prajna","calm","sage"],
    philosophicalEssence: "Inner peace is the sanctuary where sorrow cannot drown you and pleasure cannot intoxicate you, anchored in steady clarity."
  },
  {
    id: "bg-2-62",
    chapter: 2,
    verse: 62,
    citation: "Bhagavad Gita 2.62",
    sanskrit: "ध्यायतो विषयान्पुंसः सङ्गस्तेषूपजायते ।\nसङ्गात्संजायते कामः कामात्क्रोधोऽभिजायते ॥",
    transliteration: "dhyāyato viṣayān puṁsaḥ saṅgas teṣūpajāyate |\nsaṅgāt saṁjāyate kāmaḥ kāmāt krodho 'bhijāyate ||",
    translation: "Dwelling on sense objects breeds attachment to them; from attachment arises longing, and when longing is thwarted, anger is born.",
    theme: "chain of desire to wrath",
    category: "anger",
    additionalCategories: ["ego/attachment","equanimity/mind"],
    subThemes: ["chain of desire to wrath","obsessive rumination","thwarted expectations","root cause of irritation"],
    keywords: ["anger","attachment","desire","frustration","rumination","craving","rage","irritation","expectations"],
    philosophicalEssence: "Anger is thwarted desire. When you trace irritation back to the unspoken expectation behind it, the flame naturally subsides."
  },
  {
    id: "bg-2-63",
    chapter: 2,
    verse: 63,
    citation: "Bhagavad Gita 2.63",
    sanskrit: "क्रोधाद्भवति संमोहः संमोहात्स्मृतिविभ्रमः ।\nस्मृतिभ्रंशाद् बुद्धिनाशो बुद्धिनाशात्प्रणश्यति ॥",
    transliteration: "krodhād bhavati saṁmohaḥ saṁmohāt smṛti-vibhramaḥ |\nsmṛti-bhraṁśād buddhi-nāśo buddhi-nāśāt praṇaśyati ||",
    translation: "From anger arises delusion; from delusion comes confusion of memory; from lost memory comes the ruin of intellect; and from the ruin of intellect, a person is lost.",
    theme: "cascade of mental ruin",
    category: "anger",
    additionalCategories: ["equanimity/mind","doubt/despair"],
    subThemes: ["cascade of mental ruin","loss of discernment","delusion of fury","regaining intellect"],
    keywords: ["delusion","anger","ruin","intellect","memory loss","confusion","buddhi","blind rage","discernment"],
    philosophicalEssence: "Wrath blinds memory and shatters discernment. Pause before reacting, protecting your higher wisdom from the storm of rage."
  },
  {
    id: "bg-2-71",
    chapter: 2,
    verse: 71,
    citation: "Bhagavad Gita 2.71",
    sanskrit: "विहाय कामान्यः सर्वान्पुमांश्चरति निःस्पृहः ।\nनिर्ममो निरहंकारः स शान्तिमधिगच्छति ॥",
    transliteration: "vihāya kāmān yaḥ sarvān pumāṁś carati niḥspṛhaḥ |\nnirmamo nirahaṁkāraḥ sa śāntim adhigacchati ||",
    translation: "That person who abandons all desires and moves about free from longing, sense of ownership, and egoism attains lasting peace.",
    theme: "releasing 'I and Mine'",
    category: "ego/attachment",
    additionalCategories: ["contentment","humility"],
    subThemes: ["releasing 'I and Mine'","freedom from possessiveness","lightness of living","true shanti"],
    keywords: ["ego","attachment","ownership","mine","possessive","peace","shanti","desireless","freedom","unburdened"],
    philosophicalEssence: "Dropping the crushing baggage of 'I' and 'mine' releases life from tension, allowing profound peace to flow unobstructed."
  },
  {
    id: "bg-3-19",
    chapter: 3,
    verse: 19,
    citation: "Bhagavad Gita 3.19",
    sanskrit: "तस्मादसक्तः सततम् कार्यम् कर्म समाचर ।\nअसक्तो ह्याचरन्कर्म परमाप्नोति पूरुषः ॥",
    transliteration: "tasmād asaktaḥ satataṁ kāryaṁ karma samācara |\nasakto hy ācaran karma param āpnoti pūruṣaḥ ||",
    translation: "Therefore, constantly perform your obligatory duties without personal attachment, for by acting without attachment, one attains the Supreme.",
    theme: "unattached duty",
    category: "duty/dharma",
    additionalCategories: ["ego/attachment","courage/self-doubt"],
    subThemes: ["unattached duty","highest attainment through daily work","karma yoga","service without ego"],
    keywords: ["duty","dharma","work","unattached","supreme","career","responsibility","effort","service"],
    philosophicalEssence: "Your daily obligations are not obstacles to spiritual realization; when performed with dedication and non-clinging, work is your altar."
  },
  {
    id: "bg-3-27",
    chapter: 3,
    verse: 27,
    citation: "Bhagavad Gita 3.27",
    sanskrit: "प्रकृतेः क्रियमाणानि गुणैः कर्माणि सर्वशः ।\nअहंकारविमूढात्मा कर्ताहमिति मन्यते ॥",
    transliteration: "prakṛteḥ kriyamāṇāni guṇaiḥ karmāṇi sarvaśaḥ |\nahankāra-vimūḍhātmā kartāham iti manyate ||",
    translation: "All actions are carried out everywhere by the modes of nature. Yet one whose mind is deluded by ego imagines, 'I am the doer.'",
    theme: "illusion of doership",
    category: "ego/attachment",
    additionalCategories: ["humility","self-worth"],
    subThemes: ["illusion of doership","modes of nature (gunas)","humility in achievement","releasing false burden"],
    keywords: ["ego","doer","pride","control","gunas","nature","humility","illusion","arrogance","burdens"],
    philosophicalEssence: "The cosmic orchestra plays through nature's instruments. Relinquish the heavy delusion that you alone bear the world upon your shoulders."
  },
  {
    id: "bg-3-35",
    chapter: 3,
    verse: 35,
    citation: "Bhagavad Gita 3.35",
    sanskrit: "श्रेयान्स्वधर्मो विगुणः परधर्मात्स्वनुष्ठितात् ।\nस्वधर्मे निधनं श्रेयः परधर्मो भयावहः ॥",
    transliteration: "śreyān sva-dharmo viguṇaḥ para-dharmāt sv-anuṣṭhitāt |\nsva-dharme nidhanaṁ śreyaḥ para-dharmo bhayāvahaḥ ||",
    translation: "It is far better to perform one's own duty, even if imperfectly, than to perform another's duty perfectly. Even death in performing one's own duty is preferable; taking on another's path brings peril.",
    theme: "svadharma vs paradharma",
    category: "envy/comparison",
    additionalCategories: ["duty/dharma","doubt/despair","self-worth"],
    subThemes: ["svadharma vs paradharma","authenticity over imitation","embracing one's imperfect calling","resisting peer pressure"],
    keywords: ["svadharma","duty","comparison","imposter","authenticity","calling","envy","imitation","unique path"],
    philosophicalEssence: "Honor your authentic path even in its clumsy imperfection. Trying to live someone else's script alienates you from your true soul."
  },
  {
    id: "bg-4-7",
    chapter: 4,
    verse: 7,
    citation: "Bhagavad Gita 4.7",
    sanskrit: "यदा यदा हि धर्मस्य ग्लानिर्भवति भारत ।\nअभ्युत्थानमधर्मस्य तदात्मानं सृजाम्यहम् ॥",
    transliteration: "yadā yadā hi dharmasya glānir bhavati bhārata |\nabhyutthānam adharmasya tadātmānaṁ sṛjāmy aham ||",
    translation: "Whenever there is a decline of righteousness and a rise of unrighteousness, O descendant of Bharata, at that time I manifest myself.",
    theme: "divine intervention",
    category: "reassurance/devotion",
    additionalCategories: ["doubt/despair","general refuge/guidance"],
    subThemes: ["divine intervention","restoration of cosmic order","hope in dark times","moral reassurance"],
    keywords: ["avatar","righteousness","dharma","decline","hope","manifest","protection","moral crisis","reassurance"],
    philosophicalEssence: "When balance seems lost in the world or in your own life, know that cosmic intelligence continually acts to restore harmony and light."
  },
  {
    id: "bg-4-8",
    chapter: 4,
    verse: 8,
    citation: "Bhagavad Gita 4.8",
    sanskrit: "परित्राणाय साधूनां विनाशाय च दुष्कृताम् ।\nधर्मसंस्थापनार्थाय सम्भवामि युगे युगे ॥",
    transliteration: "paritrāṇāya sādhūnāṁ vināśāya ca duṣkṛtām |\ndharma-saṁsthāpanārthāya sambhavāmi yuge yuge ||",
    translation: "To protect the virtuous, to transform the unrighteous, and to re-establish the balance of righteousness, I appear age after age.",
    theme: "protection of the good",
    category: "reassurance/devotion",
    additionalCategories: ["anxiety/fear","courage/self-doubt"],
    subThemes: ["protection of the good","cosmic guardian","restoration of truth","eternal promise"],
    keywords: ["protection","virtue","goodness","dharma","reassurance","age after age","safeguard","trust","devotion"],
    philosophicalEssence: "Goodness is never abandoned. Sincere hearts that align with truth are held by eternal guardianship across all ages."
  },
  {
    id: "bg-4-10",
    chapter: 4,
    verse: 10,
    citation: "Bhagavad Gita 4.10",
    sanskrit: "वीतरागभयक्रोधा मन्मया मामुपाश्रिताः ।\nबहवो ज्ञानतपसा पूता मद्भावमागताः ॥",
    transliteration: "vīta-rāga-bhaya-krodhā man-mayā mām upāśritāḥ |\nbahavo jñāna-tapasā pūtā mad-bhāvam āgatāḥ ||",
    translation: "Freed from passion, fear, and anger, absorbed in me, and taking refuge in me, many, purified by the austerity of wisdom, have attained unity with me.",
    theme: "refuge from dread",
    category: "anxiety/fear",
    additionalCategories: ["anger","reassurance/devotion"],
    subThemes: ["refuge from dread","purification by wisdom","freedom from passion and fury","attaining divine oneness"],
    keywords: ["fear","refuge","anger","passion","purification","wisdom","shelter","unity","freedom from dread"],
    philosophicalEssence: "Taking refuge in sacred awareness burns away the twin shadows of fear and anger, opening the gateway to timeless serenity."
  },
  {
    id: "bg-4-40",
    chapter: 4,
    verse: 40,
    citation: "Bhagavad Gita 4.40",
    sanskrit: "अज्ञश्चाश्रद्दधानश्च संशयात्मा विनश्यति ।\nनायं लोकोऽस्ति न परो न सुखं संशयात्मनः ॥",
    transliteration: "ajñaś cāśraddadhānaś ca saṁśayātmā vinaśyati |\nnāyaṁ loko 'sti na paro na sukhaṁ saṁśayātmanaḥ ||",
    translation: "The ignorant, the faithless, and the doubting self are led to ruin. For the doubting soul, there is happiness neither in this world nor in the world beyond.",
    theme: "paralysis of cynicism",
    category: "doubt/despair",
    additionalCategories: ["courage/self-doubt","equanimity/mind"],
    subThemes: ["paralysis of cynicism","destructive chronic doubt","need for rooted faith","finding conviction"],
    keywords: ["doubt","faithless","paralysis","cynicism","unhappiness","skepticism","uncertainty","clarity","conviction"],
    philosophicalEssence: "Chronic, paralyzing skepticism erodes the capacity for joy. Anchor yourself in trusted principles and take courageous steps forward."
  },
  {
    id: "bg-5-10",
    chapter: 5,
    verse: 10,
    citation: "Bhagavad Gita 5.10",
    sanskrit: "ब्रह्मण्याधाय कर्माणि सङ्गं त्यक्त्वा करोति यः ।\nलिप्यते न स पापेन पद्मपत्रमिवाम्भसा ॥",
    transliteration: "brahmaṇy ādhāya karmāṇi saṅgaṁ tyaktvā karoti yaḥ |\nlipyate na sa pāpena padma-patram ivāmbhasā ||",
    translation: "One who performs action relinquishing attachment, offering all deeds to the Divine, is untouched by anxiety or flaw, just as a lotus leaf remains dry upon the water.",
    theme: "releasing attachment",
    category: "ego/attachment",
    additionalCategories: ["duty/dharma","contentment"],
    subThemes: ["releasing attachment","purity in action","lotus on water","untouched by anxiety","offering deeds"],
    keywords: ["lotus","attachment","ego","surrender","unattached","pure","untouched","clinging","letting go","freedom","peaceful action"],
    philosophicalEssence: "Live and act in the world with full engagement yet total non-clinging, floating serenely above anxiety like a lotus petal upon water."
  },
  {
    id: "bg-6-5",
    chapter: 6,
    verse: 5,
    citation: "Bhagavad Gita 6.5",
    sanskrit: "उद्धरेदात्मनात्मानं नात्मानमवसादयेत् ।\nआत्मैव ह्यात्मनो बन्धुरात्मैव रिपुरात्मनः ॥",
    transliteration: "uddhared ātmanātmānaṁ nātmānam avasādayet |\nātmaiva hy ātmano bandhur ātmaiva ripur ātmanaḥ ||",
    translation: "Elevate yourself through your own self; do not degrade yourself. For your self alone is your friend, and your self alone can be your enemy.",
    theme: "self-elevation",
    category: "courage/self-doubt",
    additionalCategories: ["self-worth","equanimity/mind"],
    subThemes: ["self-elevation","ending self-sabotage","the mind as ally or adversary","personal sovereignty"],
    keywords: ["elevate","friend","enemy","self-sabotage","inner critic","courage","uplift","mind","strength","dignity"],
    philosophicalEssence: "Stop degrading yourself with harsh inner judgment. Train your mind to be your closest ally, elevating your spirit from within."
  },
  {
    id: "bg-6-6",
    chapter: 6,
    verse: 6,
    citation: "Bhagavad Gita 6.6",
    sanskrit: "बन्धुरात्मात्मनस्तस्य येनात्मैवात्मना जितः ।\nअनात्मनस्तु शत्रुत्वे वर्तेतात्मैव शत्रुवत् ॥",
    transliteration: "bandhur ātmātmanas tasya yenātmaivātmanā jitaḥ |\nanātmanas tu śatrutve vartetātmaiva śatruvat ||",
    translation: "The self is a friend to one who has mastered the self by the higher mind. But for one who remains unmastered, the self acts as an external enemy.",
    theme: "befriending the inner self",
    category: "self-worth",
    additionalCategories: ["courage/self-doubt","equanimity/mind"],
    subThemes: ["befriending the inner self","mastering impulse","transforming internal conflict","self-compassion"],
    keywords: ["friend","enemy","inner critic","mastery","self-worth","self-control","befriend myself","peace within"],
    philosophicalEssence: "When you master your attention, your thoughts become gentle companions; unattended, they war against your peace."
  },
  {
    id: "bg-6-26",
    chapter: 6,
    verse: 26,
    citation: "Bhagavad Gita 6.26",
    sanskrit: "यतो यतो निश्चरति मनश्चञ्चलमस्थिरम् ।\nततस्ततो नियम्यैतदात्मन्येव वशं नयेत् ॥",
    transliteration: "yato yato niścarati manaś cañcalam asthiram |\ntatas tato niyamyaitad ātmany eva vaśaṁ nayet ||",
    translation: "From whatever direction the restless and unsteady mind wanders away, bring it back gently under the governance of the quiet self.",
    theme: "mindful attention",
    category: "equanimity/mind",
    additionalCategories: ["anxiety/fear","contentment"],
    subThemes: ["mindful attention","wandering thoughts","gentle redirection","meditative patience"],
    keywords: ["wandering","restless","mind","focus","meditation","gentle","calm","attention","distracted","anxious thoughts"],
    philosophicalEssence: "Do not fight the wandering mind with anger; patiently and tenderly guide your attention back home to stillness."
  },
  {
    id: "bg-6-35",
    chapter: 6,
    verse: 35,
    citation: "Bhagavad Gita 6.35",
    sanskrit: "असंशयं महाबाहो मनो दुर्निग्रहं चलम् ।\nअभ्यासेन तु कौन्तेय वैराग्येण च गृह्यते ॥",
    transliteration: "asaṁśayaṁ mahā-bāho mano durnigrahaṁ calam |\nabhyāsena tu kaunteya vairāgyeṇa ca gṛhyate ||",
    translation: "Without doubt, O mighty-armed, the mind is restless and difficult to restrain. But through persistent practice and non-attachment, it is brought to quietude.",
    theme: "abhyasa (persistent practice)",
    category: "equanimity/mind",
    additionalCategories: ["doubt/despair","duty/dharma"],
    subThemes: ["abhyasa (persistent practice)","vairagya (dispassion)","validating mental struggle","quieting turbulence"],
    keywords: ["restless","mind","practice","abhyasa","vairagya","detachment","restraint","focus","mastery","turbulent"],
    philosophicalEssence: "It is completely natural for the mind to feel turbulent. Mastery is built gently through the dual wings of consistent practice and release."
  },
  {
    id: "bg-9-22",
    chapter: 9,
    verse: 22,
    citation: "Bhagavad Gita 9.22",
    sanskrit: "अनन्याश्चिन्तयन्तो मां ये जनाः पर्युपासते ।\nतेषां नित्याभियुक्तानां योगक्षेमं वहाम्यहम् ॥",
    transliteration: "ananyāś cintayanto māṁ ye janāḥ paryupāsate |\nteṣāṁ nityābhiyuktānāṁ yoga-kṣemaṁ vahāmy aham ||",
    translation: "For those who focus on me with unwavering devotion, constantly absorbed in reflection, I personally preserve what they have and provide what they lack.",
    theme: "yoga-kshema (preservation and provision)",
    category: "reassurance/devotion",
    additionalCategories: ["anxiety/fear","loneliness/belonging"],
    subThemes: ["yoga-kshema (preservation and provision)","total protection","freedom from financial anxiety","divine care"],
    keywords: ["yoga-kshema","protection","security","anxiety","financial fear","devotion","provided for","held","trust","surrender"],
    philosophicalEssence: "Surrender scarcity mindset; trust that as you dedicate your heart sincerely, you are preserved and provided for by cosmic grace."
  },
  {
    id: "bg-12-13",
    chapter: 12,
    verse: 13,
    citation: "Bhagavad Gita 12.13",
    sanskrit: "अद्वेष्टा सर्वभूतानां मैत्रः करुण एव च ।\nनिर्ममो निरहंकारः समदुःखसुखः क्षमी ॥",
    transliteration: "adveṣṭā sarva-bhūtānāṁ maitraḥ karuṇa eva ca |\nnirmamo nirahaṁkāraḥ sama-duḥkha-sukhaḥ kṣamī ||",
    translation: "One who harbors no ill will toward any living being, who is friendly and compassionate, free from possessiveness and ego, equal in sorrow and joy, and forgiving—",
    theme: "universal goodwill",
    category: "humility",
    additionalCategories: ["anger","equanimity/mind"],
    subThemes: ["universal goodwill","forgiveness (kshama)","freedom from malice","compassion in adversity"],
    keywords: ["ill will","friendly","compassion","forgiveness","ego","possessiveness","sorrow and joy","kindness","gentle"],
    philosophicalEssence: "True strength radiates as universal kindness and radical forgiveness, completely devoid of resentment or pride."
  },
  {
    id: "bg-12-14",
    chapter: 12,
    verse: 14,
    citation: "Bhagavad Gita 12.14",
    sanskrit: "सन्तुष्टः सततं योगी यतात्मा दृढनिश्चयः ।\nमय्यर्पितमनोबुद्धिर्यो मद्भक्तः स मे प्रियः ॥",
    transliteration: "santuṣṭaḥ satataṁ yogī yatātmā dṛḍha-niścayaḥ |\nmayy arpita-mano-buddhir yo mad-bhaktaḥ sa me priyaḥ ||",
    translation: "—who is ever content, self-restrained, firm in conviction, with mind and intellect centered upon me—that seeker is dear to me.",
    theme: "perpetual contentment",
    category: "contentment",
    additionalCategories: ["reassurance/devotion","equanimity/mind"],
    subThemes: ["perpetual contentment","firm resolve","centered mind","divine belovedness"],
    keywords: ["content","satisfaction","firm conviction","centered","beloved","restraint","peaceful","unwavering"],
    philosophicalEssence: "Ever-content with whatever arrives, anchor your intellect in higher truth; such steady self-possession makes you profoundly dear to reality."
  },
  {
    id: "bg-12-15",
    chapter: 12,
    verse: 15,
    citation: "Bhagavad Gita 12.15",
    sanskrit: "यस्मान्नोद्विजते लोको लोकान्नोद्विजते च यः ।\nहर्षामर्षभयोद्वेगैर्मुक्तो यः स च मे प्रियः ॥",
    transliteration: "yasmān nodvijate loko lokān nodvijate ca yaḥ |\nharṣāmarṣa-bhayodvegair mukto yaḥ sa ca me priyaḥ ||",
    translation: "One by whom the world is not disturbed, and who is not disturbed by the world, free from agitation, fear, and impatience—that one is dear to me.",
    theme: "non-reactivity to drama",
    category: "equanimity/mind",
    additionalCategories: ["anxiety/fear","anger","humility"],
    subThemes: ["non-reactivity to drama","causing no distress to others","freedom from impatience and panic","gentle presence"],
    keywords: ["disturbed","agitation","impatience","drama","panic","serenity","peaceful presence","non-reactive","calm"],
    philosophicalEssence: "Neither disturb the world with your reactivity nor allow the world's chaos to disturb your stillness."
  },
  {
    id: "bg-15-5",
    chapter: 15,
    verse: 5,
    citation: "Bhagavad Gita 15.5",
    sanskrit: "निर्मानमोहा जितसङ्गदोषा अध्यात्मनित्या विनिवृत्तकामाः ।\nद्वन्द्वैर्विमुक्ताः सुखदुःखसंज्ञैर्गच्छन्त्यमूढाः पदमव्ययं तत् ॥",
    transliteration: "nirmāna-mohā jita-saṅga-doṣā adhyātma-nityā vinivṛtta-kāmāḥ |\ndvandvair vimuktāḥ sukha-duḥkha-saṁjñair gacchanty amūḍhāḥ padam avyayaṁ tat ||",
    translation: "Free from pride and delusion, victorious over the flaw of attachment, devoted to inner truth, their desires quieted, released from dualities like pleasure and pain—the unbewildered reach that eternal state.",
    theme: "freedom from pride",
    category: "ego/attachment",
    additionalCategories: ["contentment","equanimity/mind"],
    subThemes: ["freedom from pride","transcending opposites","abiding in the eternal","quieting craving"],
    keywords: ["pride","delusion","attachment","duality","eternal","pleasure and pain","liberation","truth","unbewildered"],
    philosophicalEssence: "When pride and false clingings drop away, you awaken from the dream of opposites into the unshakeable, eternal state."
  },
  {
    id: "bg-16-21",
    chapter: 16,
    verse: 21,
    citation: "Bhagavad Gita 16.21",
    sanskrit: "त्रिविधं नरकस्येदं द्वारं नाशनमात्मनः ।\nकामः क्रोधस्तथा लोभस्तस्मादेतत्त्रयं त्यजेत् ॥",
    transliteration: "tri-vidhaṁ narakasyedaṁ dvāraṁ nāśanam ātmanaḥ |\nkāmaḥ krodhas tathā lobhas tasmād etat trayaṁ tyajet ||",
    translation: "Three gates lead to self-ruin: lust, anger, and greed. Therefore, one should turn away from these three.",
    theme: "three toxic gates",
    category: "anger",
    additionalCategories: ["ego/attachment","guilt/redemption"],
    subThemes: ["three toxic gates","lust, anger, and greed","self-preservation","breaking destructive loops"],
    keywords: ["anger","greed","lust","ruin","destructive","toxic","gates","renounce","self-harm","temptation"],
    philosophicalEssence: "Craving, rage, and greed are insidious traps that degrade your peace. Recognize them early and step off their path."
  },
  {
    id: "bg-18-63",
    chapter: 18,
    verse: 63,
    citation: "Bhagavad Gita 18.63",
    sanskrit: "इति ते ज्ञानमाख्यातं गुह्याद्गुह्यतरं मया ।\nविमृश्यैतदशेषेण यथेच्छसि तथा कुरु ॥",
    transliteration: "iti te jñānam ākhyātaṁ guhyād guhyataraṁ mayā |\nvimṛśyaitad aśeṣeṇa yathecchasi tathā kuru ||",
    translation: "Thus has wisdom more profound than secret mystery been declared to you. Reflect upon it completely, and then act as you choose.",
    theme: "autonomy and free will",
    category: "doubt/despair",
    additionalCategories: ["duty/dharma","courage/self-doubt"],
    subThemes: ["autonomy and free will","deep reflection","sovereignty over decisions","dignity of choice"],
    keywords: ["free will","choice","reflection","wisdom","secret","decision","sovereign","choose","dignity","doubt"],
    philosophicalEssence: "Wisdom is never coerced. Contemplate deeply, honor your discernment, and step forward with conscious choice."
  },
  {
    id: "bg-18-66",
    chapter: 18,
    verse: 66,
    citation: "Bhagavad Gita 18.66",
    sanskrit: "सर्वधर्मान्परित्यज्य मामेकं शरणं व्रज ।\nअहं त्वा सर्वपापेभ्यो मोक्षयिष्यामि मा शुचः ॥",
    transliteration: "sarva-dharmān parityajya mām ekaṁ śaraṇaṁ vraja |\nahaṁ tvā sarva-pāpebhyo mokṣayiṣyāmi mā śucaḥ ||",
    translation: "Relinquish all fixed concepts of duty and take refuge in me alone. I shall deliver you from all burdens and fears; do not grieve.",
    theme: "ultimate surrender (sharanagati)",
    category: "general refuge/guidance",
    additionalCategories: ["reassurance/devotion","anxiety/fear","guilt/redemption"],
    subThemes: ["ultimate surrender (sharanagati)","release of all guilt","divine sanctuary","do not grieve"],
    keywords: ["surrender","refuge","sharanagati","grief","sin","guilt","release","protection","shelter","anxiety","peace"],
    philosophicalEssence: "When overwhelmed by conflicting rules and past regrets, surrender everything to the supreme presence. You are forgiven, protected, and free."
  },
  {
    id: "bg-2-3",
    chapter: 2,
    verse: 3,
    citation: "Bhagavad Gita 2.3",
    sanskrit: "क्लैब्यं मा स्म गमः पार्थ नैतत्त्वय्युपपद्यते ।\nक्षुद्रं हृदयदौर्बल्यं त्यक्त्वोत्तिष्ठ परंतप ॥",
    transliteration: "klaibyaṁ mā sma gamaḥ pārtha naitat tvayy upapadyate |\nkṣudraṁ hṛdaya-daurbalyaṁ tyaktvottiṣṭha paraṁtapa ||",
    translation: "Do not yield to unmanliness, O Arjuna; it does not become you. Shake off this trivial weakness of heart and stand up.",
    theme: "arousing inner fire",
    category: "courage/self-doubt",
    additionalCategories: ["duty/dharma","doubt/despair"],
    subThemes: ["arousing inner fire","overcoming faint-heartedness","standing tall against cowardice","call to action"],
    keywords: ["courage","weakness of heart","stand up","faint-hearted","strength","rise","self-doubt","paralyzed"],
    philosophicalEssence: "Shake off the paralyzing faint-heartedness that diminishes your power. You possess the inner nobility to rise and face this moment."
  },
  {
    id: "bg-2-38",
    chapter: 2,
    verse: 38,
    citation: "Bhagavad Gita 2.38",
    sanskrit: "सुखदुःखे समे कृत्वा लाभालाभौ जयाजयौ ।\nततो युद्धाय युज्यस्व नैवं पापमवाप्स्यसि ॥",
    transliteration: "sukha-duḥkhe same kṛtvā lābhālābhau jayājayau |\ntato yuddhāya yujyasva naivaṁ pāpam avāpsyasi ||",
    translation: "Treating pleasure and pain, gain and loss, victory and defeat as equal, engage in your duty. Acting thus, you incur no remorse.",
    theme: "equalizing dualities",
    category: "equanimity/mind",
    additionalCategories: ["duty/dharma","envy/comparison"],
    subThemes: ["equalizing dualities","gain and loss neutrality","clean conscience in action","courageous engagement"],
    keywords: ["gain and loss","victory and defeat","pleasure and pain","remorse","duty","equanimity","balance","action"],
    philosophicalEssence: "Engage fully with your challenges without craving victory or dreading loss; equanimity shields your soul from regret."
  },
  {
    id: "bg-2-40",
    chapter: 2,
    verse: 40,
    citation: "Bhagavad Gita 2.40",
    sanskrit: "नेहाभिक्रमनाशोऽस्ति प्रत्यवायो न विद्यते ।\nस्वल्पमप्यस्य धर्मस्य त्रायते महतो भयात् ॥",
    transliteration: "nehābhikrama-nāśo 'sti pratyavāyo na vidyate |\nsv-alpam apy asya dharmasya trāyate mahato bhayāt ||",
    translation: "On this path, no effort is lost, nor is any adverse consequence created. Even a little practice of this awareness protects one from great fear.",
    theme: "no wasted effort",
    category: "anxiety/fear",
    additionalCategories: ["courage/self-doubt","duty/dharma"],
    subThemes: ["no wasted effort","protection from fear","small progress counts","spiritual momentum"],
    keywords: ["effort","fear","anxiety","protection","progress","practice","starting","wasted time","safe","frightened","dread","small steps"],
    philosophicalEssence: "Every ounce of sincere effort and inner awareness leaves a permanent imprint. No step on this path is ever wasted or undone."
  },
  {
    id: "bg-2-55",
    chapter: 2,
    verse: 55,
    citation: "Bhagavad Gita 2.55",
    sanskrit: "प्रजहाति यदा कामान्सर्वान्पार्थ मनोगतान् ।\nआत्मन्येवात्मना तुष्टः स्थितप्रज्ञस्तदोच्यते ॥",
    transliteration: "prajahāti yadā kāmān sarvān pārtha mano-gatān |\nātmany evātmanā tuṣṭaḥ sthita-prajñas tadocyate ||",
    translation: "When one casts away all lingering desires of the mind and finds contentment within the self alone, one is called a person of settled wisdom.",
    theme: "content in the self",
    category: "contentment",
    additionalCategories: ["ego/attachment","equanimity/mind"],
    subThemes: ["content in the self","dropping mental cravings","settled wisdom","inner fullness"],
    keywords: ["contentment","desire","settled wisdom","inner joy","self-sufficient","satisfied","craving","peace"],
    philosophicalEssence: "Joy is not an external prize to hunt; it is the natural fragrance of a quiet mind discovering fullness in its own being."
  },
  {
    id: "bg-2-70",
    chapter: 2,
    verse: 70,
    citation: "Bhagavad Gita 2.70",
    sanskrit: "आपूर्यमाणमचलप्रतिष्ठं समुद्रमापः प्रविशन्ति यद्वत् ।\nतद्वत्कामा यं प्रविशन्ति सर्वे स शान्तिमप्नोति न कामकामी ॥",
    transliteration: "āpūryamāṇam acala-pratiṣṭhaṁ samudram āpaḥ praviśanti yadvat |\ntadvat kāmā yaṁ praviśanti sarve sa śāntim āpnoti na kāma-kāmī ||",
    translation: "Just as the ocean remains unmoved by the waters flowing into it, so does peace enter the mind untouched by incoming desires—unlike the seeker of cravings.",
    theme: "oceanic stillness",
    category: "contentment",
    additionalCategories: ["equanimity/mind","ego/attachment"],
    subThemes: ["oceanic stillness","absorbing desires without agitation","deep contentment","unshakeable peace"],
    keywords: ["ocean","waves","peace","unmoved","contentment","cravings","shanti","stillness","unshaken"],
    philosophicalEssence: "Be like the vast ocean, quietly receiving the rivers of circumstance without overflowing, grounded in immense inner depth."
  },
  {
    id: "bg-3-21",
    chapter: 3,
    verse: 21,
    citation: "Bhagavad Gita 3.21",
    sanskrit: "यद्यदाचरति श्रेष्ठस्तत्तदेवेतरौ जनः ।\nस यत्प्रमाणं कुरुते लोकस्तदनुवर्तते ॥",
    transliteration: "yad yad ācarati śreṣṭhas tat tad evetaro janaḥ |\nsa yat pramāṇaṁ kurute lokas tad anuvartate ||",
    translation: "Whatever standards exemplary leaders set, ordinary people follow; whatever baseline they establish, the world strives to adopt.",
    theme: "leading by example",
    category: "duty/dharma",
    additionalCategories: ["humility","courage/self-doubt"],
    subThemes: ["leading by example","integrity in conduct","responsibility to community","setting the standard"],
    keywords: ["leadership","example","standards","influence","role model","integrity","conduct","responsibility","duty"],
    philosophicalEssence: "Live your highest ideals with quiet consistency; your daily example lifts others far more powerfully than words."
  },
  {
    id: "bg-4-11",
    chapter: 4,
    verse: 11,
    citation: "Bhagavad Gita 4.11",
    sanskrit: "ये यथा मां प्रपद्यन्ते तांस्तथैव भजाम्यहम् ।\nमम वर्त्मानुवर्तन्ते मनुष्याः पार्थ सर्वशः ॥",
    transliteration: "ye yathā māṁ prapadyante tāṁs tathaiva bhajāmy aham |\nmama vartmānuvartante manuṣyāḥ pārtha sarvaśaḥ ||",
    translation: "In whatever way people seek or approach me, I respond to them accordingly. All human paths ultimately walk within my sphere.",
    theme: "divine reciprocity",
    category: "reassurance/devotion",
    additionalCategories: ["loneliness/belonging","humility"],
    subThemes: ["divine reciprocity","universal acceptance","meeting seekers where they are","no excluded paths"],
    keywords: ["reciprocity","welcome","approach","paths","belonging","reassurance","faith","acceptance","divine love"],
    philosophicalEssence: "No matter what road or form you bring to the sacred, you are met with exact reciprocity and unconditional grace."
  },
  {
    id: "bg-5-29",
    chapter: 5,
    verse: 29,
    citation: "Bhagavad Gita 5.29",
    sanskrit: "भोक्तारं यज्ञतपसां सर्वलोकमहेश्वरम् ।\nसुहृदं सर्वभूतानां ज्ञात्वा मां शान्तिमृच्छति ॥",
    transliteration: "bhoktāraṁ yajña-tapasāṁ sarva-loka-maheśvaram |\nsuhṛdaṁ sarva-bhūtānāṁ jñātvā māṁ śāntim ṛcchati ||",
    translation: "Knowing me as the beneficiary of quiet efforts, the sovereign presence of all worlds, and the true friend of every living soul, one finds peace.",
    theme: "divine friendship (suhridam)",
    category: "loneliness/belonging",
    additionalCategories: ["reassurance/devotion","contentment"],
    subThemes: ["divine friendship (suhridam)","feeling held","cosmic belonging","quiet effort","inner peace","never alone"],
    keywords: ["friend","peace","belonging","suhridam","companion","solace","held","trust","lonely","isolated","quiet effort","shelter"],
    philosophicalEssence: "You are eternally befriended and held by the supreme witness of all hearts. Knowing this friendship dissolves the ache of loneliness."
  },
  {
    id: "bg-6-16",
    chapter: 6,
    verse: 16,
    citation: "Bhagavad Gita 6.16",
    sanskrit: "नात्यश्नतस्तु योगोऽस्ति न चैकान्तमनश्नतः ।\nन चाति स्वप्नशीलस्य जाग्रतो नैव चार्जुन ॥",
    transliteration: "nāty-aśnatas tu yogo 'sti na caikāntam anaśnataḥ |\nna cāti svapna-śīlasya jāgrato naiva cārjuna ||",
    translation: "Yoga is not achieved by eating too much or fasting excessively, nor by sleeping too long or staying awake relentlessly.",
    theme: "the golden mean",
    category: "equanimity/mind",
    additionalCategories: ["duty/dharma","contentment"],
    subThemes: ["the golden mean","avoiding extremes","rhythm of rest and wakefulness","nourishing the body"],
    keywords: ["moderation","balance","sleep","eating","extremes","exhaustion","burnout","healthy rhythm","yoga"],
    philosophicalEssence: "Spiritual vitality thrives on harmonious moderation. Honor the body's natural rhythms without punishing extremes."
  },
  {
    id: "bg-6-30",
    chapter: 6,
    verse: 30,
    citation: "Bhagavad Gita 6.30",
    sanskrit: "यो मां पश्यति सर्वत्र सर्वं च मयि पश्यति ।\nतस्याहं न प्रणश्यामि स च मे न प्रणश्यति ॥",
    transliteration: "yo māṁ paśyati sarvatra sarvaṁ ca mayi paśyati |\ntasyāhaṁ na praṇaśyāmi sa ca me na praṇaśyati ||",
    translation: "For one who sees me in all things and sees all things in me, I am never lost, nor is that person ever lost to me.",
    theme: "omnipresent connection",
    category: "loneliness/belonging",
    additionalCategories: ["reassurance/devotion","humility"],
    subThemes: ["omnipresent connection","never lost or forsaken","seeing unity in diversity","eternal belonging"],
    keywords: ["never lost","all things","connection","loneliness","isolation","oneness","belonging","unbroken presence"],
    philosophicalEssence: "When you see the divine pulse alive in everything, isolation vanishes; you can never be severed from cosmic belonging."
  },
  {
    id: "bg-7-14",
    chapter: 7,
    verse: 14,
    citation: "Bhagavad Gita 7.14",
    sanskrit: "दैवी ह्येषा गुणमयी मम माया दुरत्यया ।\nमामेव ये प्रपद्यन्ते मायामेतां तरन्ति ते ॥",
    transliteration: "daivī hy eṣā guṇa-mayī mama māyā duratyayā |\nmām eva ye prapadyante māyām etāṁ taranti te ||",
    translation: "This cosmic illusion composed of nature's modes is difficult to cross. Yet those who take refuge in me alone easily pass beyond it.",
    theme: "crossing life's illusions (maya)",
    category: "doubt/despair",
    additionalCategories: ["reassurance/devotion","general refuge/guidance"],
    subThemes: ["crossing life's illusions (maya)","navigating overwhelming confusion","refuge in truth","transcending despair"],
    keywords: ["maya","illusion","despair","refuge","surrender","crossing over","hopeless","confusion","shelter"],
    philosophicalEssence: "The labyrinth of worldly confusion cannot be conquered by egoic struggle alone. Surrender to higher truth to cross over gently."
  },
  {
    id: "bg-8-7",
    chapter: 8,
    verse: 7,
    citation: "Bhagavad Gita 8.7",
    sanskrit: "तस्मात्सर्वेषु कालेषु मामनुस्मर युध्य च ।\nमय्यर्पितमनोबुद्धिर्मामेवैष्यस्यसंशयम् ॥",
    transliteration: "tasmāt sarveṣu kāleṣu mām anusmara yudhya ca |\nmayy arpita-mano-buddhir mām evaiṣyasy asaṁśayam ||",
    translation: "Therefore, remember me at all times and carry out your duties. With your mind and intellect dedicated to me, you will reach me without doubt.",
    theme: "simultaneous devotion and action",
    category: "duty/dharma",
    additionalCategories: ["anxiety/fear","courage/self-doubt"],
    subThemes: ["simultaneous devotion and action","remembering the sacred in the arena","unswerving focus","conquering hesitation"],
    keywords: ["remember","fight","duty","focus","mind and intellect","anxiety","action","arena","courage"],
    philosophicalEssence: "Do not compartmentalize your spiritual heart away from worldly duties. Fight your daily battles while keeping your soul anchored in remembrance."
  },
  {
    id: "bg-9-26",
    chapter: 9,
    verse: 26,
    citation: "Bhagavad Gita 9.26",
    sanskrit: "पत्रं पुष्पं फलं तोयं यो मे भक्त्या प्रयच्छति ।\nतदहं भक्त्युपहृतमश्नामि प्रयतात्मनः ॥",
    transliteration: "patraṁ puṣpaṁ phalaṁ toyaṁ yo me bhaktyā prayacchati |\ntad ahaṁ bhakty-upahṛtam aśnāmi prayatātmanaḥ ||",
    translation: "Whoever offers me with devotion a leaf, a flower, a fruit, or water—that humble offering made with a pure heart, I accept.",
    theme: "humble offerings",
    category: "humility",
    additionalCategories: ["contentment","reassurance/devotion"],
    subThemes: ["humble offerings","purity of heart over grandiosity","sacred simplicity","effortless devotion"],
    keywords: ["leaf","flower","fruit","water","humility","simplicity","pure heart","devotion","offering","modest"],
    philosophicalEssence: "The sacred is not bought with lavish displays. The simplest sincere gesture from a loving heart is cherished infinitely."
  },
  {
    id: "bg-9-30",
    chapter: 9,
    verse: 30,
    citation: "Bhagavad Gita 9.30",
    sanskrit: "अपि चेत्सुदुराचारो भजते मामनन्यभाक् ।\nसाधुरेव स मन्तव्यः सम्यग्व्यवसितो हि सः ॥",
    transliteration: "api cet su-durācāro bhajate mām ananya-bhāk |\nsādhur eva sa mantavyaḥ samyag vyavasito hi saḥ ||",
    translation: "Even if the most fallen person turns toward truth with focused resolve, that soul must be regarded as righteous, for they have chosen rightly.",
    theme: "redemption after moral failure",
    category: "guilt/redemption",
    additionalCategories: ["self-worth","reassurance/devotion"],
    subThemes: ["redemption after moral failure","releasing past shame","purity of new resolve","unconditional second chances"],
    keywords: ["fallen","guilt","regret","redemption","righteous","resolve","forgive myself","past mistakes","shame","turning around"],
    philosophicalEssence: "Your past missteps do not define your spiritual trajectory. The very moment you turn your resolve toward truth, you are made whole."
  },
  {
    id: "bg-10-4",
    chapter: 10,
    verse: 4,
    citation: "Bhagavad Gita 10.4",
    sanskrit: "बुद्धिर्ज्ञानमसंमोहः क्षमा सत्यं दमः शमः ।\nसुखं दुःखं भवोऽभावो भयं चाभयमेव च ॥",
    transliteration: "buddhir jñānam asaṁmohaḥ kṣamā satyaṁ damaḥ śamaḥ |\nsukhaṁ duḥkhaṁ bhavo 'bhāvo bhayaṁ cābhayam eva ca ||",
    translation: "Discernment, wisdom, clarity, forgiveness, truthfulness, self-restraint, tranquility, joy, pain, birth, death, fear, and fearlessness—all arise from me.",
    theme: "inherent divine qualities",
    category: "self-worth",
    additionalCategories: ["anxiety/fear","equanimity/mind"],
    subThemes: ["inherent divine qualities","all states of mind originated in the source","compassion for human complexity","inner dignity"],
    keywords: ["discernment","wisdom","forgiveness","truth","fear and fearlessness","joy and pain","self-worth","divine origin"],
    philosophicalEssence: "Both your radiant virtues and vulnerable fears belong to the unfolding tapestry of reality. Hold yourself with tender reverence."
  },
  {
    id: "bg-12-16",
    chapter: 12,
    verse: 16,
    citation: "Bhagavad Gita 12.16",
    sanskrit: "अनपेक्षः शुचिर्दक्ष उदासीनो गतव्यथः ।\nसर्वारम्भपरित्यागी यो मद्भक्तः स मे प्रियः ॥",
    transliteration: "anapekṣaḥ śucir dakṣa udāsīno gata-vyathaḥ |\nsarvārambha-parityāgī yo mad-bhaktaḥ sa me priyaḥ ||",
    translation: "One who wants nothing from external conditions, who is pure, capable, impartial, free from anxiety, and unattached to selfish results—that person is dear to me.",
    theme: "freedom from anxiety (gata-vyatha)",
    category: "contentment",
    additionalCategories: ["equanimity/mind","duty/dharma"],
    subThemes: ["freedom from anxiety (gata-vyatha)","impartiality","competence without clinging","inner purity"],
    keywords: ["unattached","pure","capable","free from anxiety","gata-vyatha","contentment","peaceful","beloved"],
    philosophicalEssence: "Cultivate competence in your hands while keeping your heart free from grasping anxiety; quiet self-reliance radiates true nobility."
  },
  {
    id: "bg-13-8",
    chapter: 13,
    verse: 8,
    citation: "Bhagavad Gita 13.8",
    sanskrit: "अमानित्वमदम्भित्वमहिंसा क्षान्तिरार्जवम् ।\nआचार्योपासनं शौचं स्थैर्यमात्मविनिग्रहः ॥",
    transliteration: "amānitvam adambhitvam ahiṁsā kṣāntir ārjavam |\nācāryopāsanaṁ śaucaṁ sthairyam ātma-vinigrahaḥ ||",
    translation: "Humility, unpretentiousness, non-violence, patience, honesty, reverence for teachers, inner purity, steadfastness, and self-control—these constitute true wisdom.",
    theme: "virtues of enlightenment (amanitva)",
    category: "humility",
    additionalCategories: ["equanimity/mind","self-worth"],
    subThemes: ["virtues of enlightenment (amanitva)","unpretentiousness","non-violence and patience","steadfast self-governance"],
    keywords: ["humility","unpretentious","non-violence","patience","honesty","steadfast","self-control","virtues","wisdom"],
    philosophicalEssence: "True wisdom is not intellectual exhibitionism; it is quiet humility, gentle patience, and honest alignment with your inner truth."
  },
  {
    id: "bg-14-24",
    chapter: 14,
    verse: 24,
    citation: "Bhagavad Gita 14.24",
    sanskrit: "समदुःखसुखः स्वस्थः समलोष्टाश्मकाञ्चनः ।\nतुल्यप्रियाप्रियो धीरस्तुल्यनिन्दात्मसंस्तुतिः ॥",
    transliteration: "sama-duḥkha-sukhaḥ sva-sthaḥ sama-loṣṭāśma-kāñcanaḥ |\ntulya-priyāpriyo dhīras tulya-nindātma-saṁstutiḥ ||",
    translation: "One who is grounded in the self, equal in pleasure and pain, regarding clay, stone, and gold alike; remaining calm amidst praise or blame—that seeker is steady.",
    theme: "sva-stha (rooted in the self)",
    category: "envy/comparison",
    additionalCategories: ["equanimity/mind","contentment"],
    subThemes: ["sva-stha (rooted in the self)","equanimity under praise and criticism","freedom from materialism and comparison","inner unshakeability"],
    keywords: ["grounded","praise and blame","comparison","gold and stone","envy","criticism","sva-stha","steady","unshaken"],
    philosophicalEssence: "Remain rooted in your own center (*sva-stha*). Praise cannot inflate your true essence, nor can criticism diminish it."
  },
  {
    id: "bg-16-1",
    chapter: 16,
    verse: 1,
    citation: "Bhagavad Gita 16.1",
    sanskrit: "अभयं सत्त्वसंशुद्धिर्ज्ञानयोगव्यवस्थितिः ।\nदानं दमश्च यज्ञश्च स्वाध्यायस्तप आर्जवम् ॥",
    transliteration: "abhayaṁ sattva-saṁśuddhir jñāna-yoga-vyavasthitiḥ |\ndānaṁ damaś ca yajñaś ca svādhyāyas tapa ārjavam ||",
    translation: "Fearlessness, purity of heart, steadfastness in knowledge, generosity, self-control, reflection, self-discipline, and straightforwardness belong to noble character.",
    theme: "abhaya (fearlessness as foundation)",
    category: "courage/self-doubt",
    additionalCategories: ["humility","self-worth"],
    subThemes: ["abhaya (fearlessness as foundation)","purity of intent","generosity and integrity","divine virtues"],
    keywords: ["fearlessness","abhaya","courage","purity of heart","generosity","integrity","strength","character","virtues"],
    philosophicalEssence: "Fearlessness is the first and foremost divine virtue. Step courageously with a clean heart and clear knowledge."
  },
  {
    id: "bg-18-58",
    chapter: 18,
    verse: 58,
    citation: "Bhagavad Gita 18.58",
    sanskrit: "मच्चित्तः सर्वदुर्गाणि मत्प्रसादात्तरिष्यसि ।\nअथ चेत्त्वमहंकारान्न श्रोष्यसि विनङ्क्ष्यसि ॥",
    transliteration: "mac-cittaḥ sarva-durgāṇi mat-prasādāt tariṣyasi |\natha cet tvam ahaṁkārān na śroṣyasi vinaṅkṣyasi ||",
    translation: "Fixing your mind on me, you will overcome all obstacles by inner grace. But if driven by ego you choose not to listen, you will lose your way.",
    theme: "overcoming insurmountable obstacles",
    category: "general refuge/guidance",
    additionalCategories: ["doubt/despair","ego/attachment"],
    subThemes: ["overcoming insurmountable obstacles","grace through mindfulness","dangers of stubborn ego","surrender of struggles"],
    keywords: ["obstacles","grace","ego","guidance","refuge","listen","overcoming","hardships","crisis","direction"],
    philosophicalEssence: "Anchor your attention beyond the fragile ego. By aligning with quiet inner grace, even the steepest mountains are surmounted."
  }
];

// Helper to tokenize and clean text for local matching
export function tokenize(text: string): string[] {
  return text
    .toLowerCase()
    .replace(/[^\w\s]/g, ' ')
    .split(/\s+/)
    .filter(w => w.length > 2);
}

// Stop words to exclude from weighting
export const STOP_WORDS = new Set([
  'the', 'and', 'for', 'that', 'this', 'with', 'from', 'have', 'are', 'was', 'were',
  'what', 'when', 'where', 'which', 'who', 'why', 'how', 'all', 'any', 'both', 'each',
  'few', 'more', 'most', 'other', 'some', 'such', 'than', 'too', 'very', 'can', 'will',
  'just', 'should', 'now', 'into', 'only', 'about', 'feel', 'feeling', 'today', 'really',
  'like', 'because', 'also', 'even', 'been', 'being', 'having', 'went', 'going'
]);

/**
 * Returns all verses that belong to a specific category (primary or additional).
 */
export function getVersesByCategory(category: ThemeCategory): GitaVerse[] {
  return GITA_VERSES.filter(v => v.category === category || v.additionalCategories?.includes(category));
}

/**
 * Returns the exact distribution count of verses per theme category in the current canon.
 */
export function getThemeCategoryDistribution(): Record<ThemeCategory, { primaryCount: number; totalCount: number; verseIds: string[] }> {
  const result = {} as Record<ThemeCategory, { primaryCount: number; totalCount: number; verseIds: string[] }>;
  
  for (const t of THEME_CATEGORIES) {
    const primary = GITA_VERSES.filter(v => v.category === t.category);
    const matching = GITA_VERSES.filter(v => v.category === t.category || v.additionalCategories?.includes(t.category));
    result[t.category] = {
      primaryCount: primary.length,
      totalCount: matching.length,
      verseIds: matching.map(v => v.citation)
    };
  }
  
  return result;
}

/**
 * Deterministic hash function for consistent tie-breaking without hardcoded first-element bias
 */
function simpleHash(str: string): number {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    const char = str.charCodeAt(i);
    hash = ((hash << 5) - hash) + char;
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash);
}

/**
 * 1. THEME CLASSIFICATION (Local Deterministic Classifier)
 * Classifies input text into one of the 16 ThemeCategory categories by scoring keywords,
 * subthemes, and thematic descriptions.
 */
export function classifyThemeCategory(text: string): {
  winningCategory: ThemeCategory;
  categoryDisplayName: string;
  categoryScores: Array<{ category: ThemeCategory; score: number }>;
} {
  const query = text.toLowerCase();
  const queryTokens = tokenize(query).filter(t => !STOP_WORDS.has(t));

  const scoredCategories = THEME_CATEGORIES.map(themeDef => {
    let score = 0;

    // 1. Direct Category Name & Keyword Matches
    for (const kw of themeDef.keywords) {
      if (kw.includes(' ') && query.includes(kw)) {
        score += 15;
      } else if (queryTokens.includes(kw)) {
        score += 6;
      }
    }

    // 2. Aggregate resonance from verses belonging to this category
    const associatedVerses = getVersesByCategory(themeDef.category);
    for (const v of associatedVerses) {
      for (const st of v.subThemes) {
        if (query.includes(st.toLowerCase())) score += 10;
        const stTokens = tokenize(st).filter(t => !STOP_WORDS.has(t));
        for (const stt of stTokens) {
          if (queryTokens.includes(stt)) score += 2;
        }
      }
      for (const kw of v.keywords) {
        if (kw.includes(' ') && query.includes(kw.toLowerCase())) {
          score += 8;
        } else if (queryTokens.includes(kw.toLowerCase())) {
          score += 3;
        }
      }
    }

    return {
      category: themeDef.category,
      score
    };
  });

  // Sort descending by score
  scoredCategories.sort((a, b) => b.score - a.score);

  // If no category matched with score > 0, default to general refuge or equanimity based on general inquiry
  const winningCategory = scoredCategories[0].score > 0 
    ? scoredCategories[0].category 
    : 'general refuge/guidance';

  const themeDef = THEME_CATEGORIES.find(t => t.category === winningCategory)!;

  return {
    winningCategory,
    categoryDisplayName: themeDef.displayName,
    categoryScores: scoredCategories
  };
}

export interface MatchingHistoryItem {
  verseId?: string;
  verseCitation?: string;
  date?: string;
}

export interface MatchingOptions {
  pastSummaries?: MatchingHistoryItem[];
  forcedCategory?: ThemeCategory;
  seedText?: string;
}

export interface ScoredCandidate {
  verse: GitaVerse;
  relevanceScore: number;
  timesSeen: number;
  mostRecentIndex: number; // 0 = most recent entry, 1 = one before, -1 = never seen
  isUnseen: boolean;
  tieBreakerHash: number;
  finalScore: number;
}

/**
 * 2. THEME-FILTERED & NO-REPEAT MATCHING ENGINE WITH MULTI-TIER TIE BREAKING
 */
export function findMatchingVerseWithPolicy(
  text: string,
  options: MatchingOptions = {}
): {
  verse: GitaVerse;
  category: ThemeCategory;
  categoryDisplayName: string;
  candidateCount: number;
  isRepeat: boolean;
  unseenCandidatesCount: number;
  explanation: string;
} {
  const query = text.toLowerCase();
  const queryTokens = tokenize(query).filter(t => !STOP_WORDS.has(t));
  const pastSummaries = options.pastSummaries || [];
  const seedText = options.seedText || text;

  // 1. Direct Citation Match (Explicit Request Override)
  for (const v of GITA_VERSES) {
    if (
      query.includes(v.citation.toLowerCase()) ||
      query.includes(`gita ${v.chapter}.${v.verse}`) ||
      query.includes(`chapter ${v.chapter} verse ${v.verse}`) ||
      query.includes(`bg ${v.chapter}.${v.verse}`) ||
      query.includes(`${v.chapter}.${v.verse}`)
    ) {
      const themeDef = THEME_CATEGORIES.find(t => t.category === v.category) || THEME_CATEGORIES[0];
      return {
        verse: v,
        category: v.category,
        categoryDisplayName: themeDef.displayName,
        candidateCount: 1,
        isRepeat: pastSummaries.some(p => p.verseId === v.id || p.verseCitation === v.citation),
        unseenCandidatesCount: 0,
        explanation: `Explicit direct citation requested for ${v.citation}.`
      };
    }
  }

  // 2. Classify Theme
  const categoryResult = options.forcedCategory 
    ? {
        winningCategory: options.forcedCategory,
        categoryDisplayName: THEME_CATEGORIES.find(t => t.category === options.forcedCategory)?.displayName || options.forcedCategory,
        categoryScores: []
      }
    : classifyThemeCategory(text);

  const selectedCategory = categoryResult.winningCategory;
  const themeDef = THEME_CATEGORIES.find(t => t.category === selectedCategory)!;

  // 3. Theme-Filtered Candidate Pool
  let candidates = getVersesByCategory(selectedCategory);
  if (candidates.length === 0) {
    for (const sc of categoryResult.categoryScores) {
      const fallbackCandidates = getVersesByCategory(sc.category);
      if (fallbackCandidates.length > 0) {
        candidates = fallbackCandidates;
        break;
      }
    }
    if (candidates.length === 0) {
      candidates = GITA_VERSES;
    }
  }

  // 4. Build Seen History Map for Candidate Verses
  const scoredCandidates: ScoredCandidate[] = candidates.map(v => {
    const timesSeen = pastSummaries.filter(s => s.verseId === v.id || s.verseCitation === v.citation).length;
    const mostRecentIndex = pastSummaries.findIndex(s => s.verseId === v.id || s.verseCitation === v.citation);
    const isUnseen = timesSeen === 0;

    // A. Subtheme & Keyword Relevance Score
    let relevanceScore = 0;
    
    // Subthemes
    for (const st of v.subThemes) {
      if (query.includes(st.toLowerCase())) {
        relevanceScore += 16;
      }
      const stTokens = tokenize(st).filter(t => !STOP_WORDS.has(t));
      for (const stt of stTokens) {
        if (queryTokens.includes(stt)) relevanceScore += 4;
      }
    }

    // Keywords
    for (const kw of v.keywords) {
      const kwLower = kw.toLowerCase();
      if (kwLower.includes(' ') && query.includes(kwLower)) {
        relevanceScore += 12;
      } else if (queryTokens.includes(kwLower)) {
        relevanceScore += 5;
      }
    }

    // Essence token overlap
    const essenceTokens = tokenize(v.philosophicalEssence).filter(t => !STOP_WORDS.has(t));
    for (const et of essenceTokens) {
      if (queryTokens.includes(et)) {
        relevanceScore += 1.5;
      }
    }

    // Primary category bonus
    if (v.category === selectedCategory) {
      relevanceScore += 10;
    }

    // B. Recency / Frequency Penalty
    let recencyPenalty = 0;
    if (!isUnseen) {
      recencyPenalty += (timesSeen * 20);
      if (mostRecentIndex >= 0) {
        const recencyDecay = Math.max(0, 30 - mostRecentIndex * 5);
        recencyPenalty += recencyDecay;
      }
    }

    // C. Deterministic Hash Tie-Breaker
    const tieBreakerHash = (simpleHash(`${v.id}:${seedText}`) % 1000) / 1000;

    const unseenBonus = isUnseen ? 1000 : 0;
    const finalScore = unseenBonus + relevanceScore - recencyPenalty + tieBreakerHash;

    return {
      verse: v,
      relevanceScore,
      timesSeen,
      mostRecentIndex,
      isUnseen,
      tieBreakerHash,
      finalScore
    };
  });

  scoredCandidates.sort((a, b) => b.finalScore - a.finalScore);

  const bestCandidate = scoredCandidates[0];
  const unseenCount = scoredCandidates.filter(c => c.isUnseen).length;

  return {
    verse: bestCandidate.verse,
    category: selectedCategory,
    categoryDisplayName: themeDef.displayName,
    candidateCount: candidates.length,
    isRepeat: !bestCandidate.isUnseen,
    unseenCandidatesCount: unseenCount,
    explanation: bestCandidate.isUnseen 
      ? `Selected unseen verse ${bestCandidate.verse.citation} from theme "${themeDef.displayName}" (relevance score: ${bestCandidate.relevanceScore.toFixed(1)}).`
      : `All ${candidates.length} verses in theme "${themeDef.displayName}" have already been seen. Selected least recently seen verse ${bestCandidate.verse.citation} (seen ${bestCandidate.timesSeen} time(s), recency index: ${bestCandidate.mostRecentIndex}).`
  };
}

export function findMatchingVerse(
  themeOrKeywords: string, 
  pastSummaries?: MatchingHistoryItem[]
): GitaVerse {
  return findMatchingVerseWithPolicy(themeOrKeywords, { pastSummaries }).verse;
}
