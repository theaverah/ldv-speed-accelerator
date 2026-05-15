export interface JourneyStage {
  id: number
  name: string
  duration: string
  emotional: number
  rational: number
  doing: string
  feeling: string
  touchpoints: string[]
  barrier: string
  opportunity: string
}

export const journeyStages: JourneyStage[] = [
  {
    id: 1,
    name: 'THE ITCH',
    duration: '3-6 weeks',
    emotional: 55,
    rational: 30,
    doing: 'Scrolling renovation content. Noticing utes in backgrounds. Casually browsing listings.',
    feeling: '"Maybe we should look at something bigger next year?" Curious, not committed.',
    touchpoints: ['Instagram Reels', 'renovation podcasts', 'showroom yards', 'peer conversations'],
    barrier: "No urgency. Segment feels like it's not for them.",
    opportunity: 'Lifestyle identity content. First-time ute buyer welcome guides.',
  },
  {
    id: 2,
    name: 'WINDOW SHOPPING',
    duration: '~6 weeks',
    emotional: 70,
    rational: 40,
    doing: 'Openly browsing. Saving photos. Watching YouTube reviews over dinner.',
    feeling: '"This one looks cool." Running on gut instinct. Daydreaming.',
    touchpoints: ['YouTube on smart TVs', 'brand Instagram', 'peer vehicles', 'hardware store car parks'],
    barrier: 'Wide option set is paralysing. Partner has different preferences.',
    opportunity: 'Visual configurators. Lifestyle imagery over technical specs.',
  },
  {
    id: 3,
    name: 'KICKING TYRES',
    duration: '~4 weeks',
    emotional: 50,
    rational: 75,
    doing: 'Booking test drives. Reading owner reviews. Shortlisting 2-3 models.',
    feeling: '"Which one actually suits our life?" Shifting from dreaming to pragmatism.',
    touchpoints: ['Dealer visits', 'owner forums', 'insurance calculators', 'mechanic friends'],
    barrier: 'Hidden costs shifting budget. Feeling pressured by salespeople.',
    opportunity: 'Transparent all-in pricing. Low-pressure overnight test drives.',
  },
  {
    id: 4,
    name: 'SIGNING ON',
    duration: '~2 weeks',
    emotional: 85,
    rational: 90,
    doing: 'Final negotiations, finance applications, accessory decisions.',
    feeling: '"Let\'s just get this done." Oscillating between euphoria and buyer\'s remorse.',
    touchpoints: ['Dealer', 'finance broker', 'insurance binders', 'family validation'],
    barrier: 'Negotiation anxiety. Rushed accessory decisions. Delivery wait doubt.',
    opportunity: '"Next 30 days" onboarding comms. Named support person.',
  },
  {
    id: 5,
    name: 'ROAD TESTING LIFE',
    duration: 'First 6 months',
    emotional: 75,
    rational: 60,
    doing: 'Using it for every imagined project. Learning quirks. Comparing notes with peers.',
    feeling: '"Was this the right call?" Mostly pride, occasional doubt.',
    touchpoints: ['Service visits', 'owner community apps', 'social media', 'dealer follow-up'],
    barrier: 'Minor issues feel catastrophic. Servicing surprises erode trust.',
    opportunity: 'Welcome app with feature tutorials. Owner community programs.',
  },
]
