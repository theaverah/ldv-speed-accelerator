export interface JourneyStage {
  id: number
  name: string
  duration: string
  tabLabel: string
  emotional: number
  rational: number
  doing: string
  feeling: string
  barrier: string
  opportunity: string
}

export const journeyStages: JourneyStage[] = [
  {
    id: 1,
    name: 'THE ITCH',
    duration: '3–6 weeks',
    tabLabel: 'It starts with a feeling.',
    emotional: 55,
    rational: 30,
    doing: "Scrolling renovation content, noticing UTEs in the background. Their hatchback is starting to feel like a bottleneck — but they're not seriously looking yet.",
    feeling: '"Maybe we should look at something bigger next year?" Curious but not committed. It\'s a slow realisation, not a decision.',
    barrier: "No urgency. The segment doesn't feel like it's for them, and their partner isn't on board yet.",
    opportunity: 'Lifestyle-first content that lowers the cultural barrier. A first-time UTE buyer guide that meets them before they\'re even ready to look.',
  },
  {
    id: 2,
    name: 'WINDOW SHOPPING',
    duration: '~6 weeks',
    tabLabel: 'The browsing begins.',
    emotional: 70,
    rational: 40,
    doing: "Openly browsing now — saving photos, watching YouTube reviews over dinner, showing their partner. Forming preferences on looks without doing deep research yet.",
    feeling: '"This one looks cool." Running on gut instinct and daydreams about what the vehicle would unlock for them.',
    barrier: "Too many options. Their partner has different preferences. Trim-level hierarchies are confusing and no one's explaining them clearly.",
    opportunity: 'Visual configurators that let couples agree on a look together. Lifestyle imagery over spec sheets — show the life, not the vehicle.',
  },
  {
    id: 3,
    name: 'KICKING TYRES',
    duration: '~4 weeks',
    tabLabel: 'The dream meets the budget.',
    emotional: 50,
    rational: 75,
    doing: 'Booking test drives, reading owner reviews, shortlisting 2–3 models. The research is serious now and every detail matters.',
    feeling: '"Which one actually suits our life?" The excitement is still there but reality is setting in — and so is the stress of the decision.',
    barrier: 'Hidden costs are shifting the budget. Salespeople feel pushy. There\'s too much conflicting advice from too many directions.',
    opportunity: 'Transparent all-in pricing with no surprises. Low-pressure test drives — even an overnight option. Content that feels independent, not dealer-driven.',
  },
  {
    id: 4,
    name: 'SIGNING ON',
    duration: '~2 weeks',
    tabLabel: 'The point of no return.',
    emotional: 85,
    rational: 90,
    doing: 'Final negotiations, finance applications, accessory decisions. Everything moves fast after months of slow research.',
    feeling: '"Let\'s just get this done." Oscillating between euphoria and buyer\'s remorse — sometimes in the same afternoon.',
    barrier: 'Negotiation anxiety. Accessory choices feel rushed. The wait for delivery creates post-deposit doubt.',
    opportunity: 'Clear "next 30 days" comms right after the deposit is placed. A named support person they can actually contact during the wait.',
  },
  {
    id: 5,
    name: 'ROAD TESTING LIFE',
    duration: 'First 6 months',
    tabLabel: 'Was it the right call?',
    emotional: 75,
    rational: 60,
    doing: "Using it for every project they imagined. Learning its quirks, discovering features, comparing notes with friends. Quietly evaluating whether it was the right call.",
    feeling: "Mostly pride — with occasional doubt when something minor goes wrong. Eager to justify the choice to everyone around them.",
    barrier: 'Small issues feel huge in the honeymoon phase. Unexpected servicing costs erode trust fast.',
    opportunity: 'A welcome experience with feature tutorials. Proactive first-service engagement. Owner community programs that make them feel like they made the right call.',
  },
]
