export interface SubPersona {
  name: string
  count: number
  snapshot: string
  barrier: string
  trigger: string
}

export interface Segment {
  id: number
  name: string
  count: number
  countLabel: string
  description: string
  lineRange: [number, number]
  subPersonas: SubPersona[]
}

export const segments: Segment[] = [
  {
    id: 1,
    name: 'UTE Intenders',
    count: 120000,
    countLabel: '120,000 Australians',
    description:
      "First-timers. They've never owned a UTE, but their current car is holding them back. The renovation project, the camping trip, the lifestyle block — it's all waiting on the right vehicle.",
    lineRange: [1, 16],
    subPersonas: [
      {
        name: 'The First-Home Renovator',
        count: 32000,
        snapshot:
          "A late-20s couple who just bought their first home. Weekends are swallowed by DIY projects, but their hatchback keeps getting in the way.",
        barrier: 'Feel intimidated by UTE culture. Unsure if it suits them long-term.',
        trigger: "The moment they calculate how much they've spent on hire vehicles, and realize the next big project needs a tray.",
      },
      {
        name: 'The Weekend Adventurer',
        count: 48000,
        snapshot:
          "Mid-30s mountain biker/surfer/camper. The gear keeps growing and the SUV can't fit it all.",
        barrier: "They don't want to become the cliché, and their partner is worried about fuel costs on the daily commute.",
        trigger: "A new hobby that needs bigger cargo, or a friend who started inviting them on way better trips.",
      },
      {
        name: 'The Hobby Farmer',
        count: 40000,
        snapshot:
          "Early 50s professional who just bought a lifestyle block 90 minutes from the city. Still figuring everything out, including what vehicle actually fits this life.",
        barrier: "Spec sheets and tow ratings feel overwhelming. Dealer service is a concern when they're city-based most of the week.",
        trigger: "Getting bogged in the paddock. Or a trusted rural neighbour pointing them in the right direction.",
      },
    ],
  },
  {
    id: 2,
    name: 'Large SUV Intenders',
    count: 180000,
    countLabel: '180,000 Australians',
    description:
      "The biggest segment, but not one type of family. A blended household packing for six. A couple planning a six-month road trip. A parent buying today knowing their teen drives it in three years. Same vehicle. Completely different lives.",
    lineRange: [17, 40],
    subPersonas: [
      {
        name: 'The Blended Household',
        count: 52000,
        snapshot:
          'Late 30s working parents, 4 kids from previous relationships. Need genuine 7-seater with real legroom and boot space.',
        barrier: 'Complex seating requirements. Negotiating one car between two drivers.',
        trigger: 'Teen refusing to fold legs in third row. Annual holiday requiring roof box.',
      },
      {
        name: 'The Road Trip Romantic',
        count: 38000,
        snapshot:
          "DINK couple in their 40s. Three big interstate drives in two years. Planning a six-month lap. Want comfort and reliability, not family features.",
        barrier: "Feel like the segment isn't made for them. Family SUV marketing misses them.",
        trigger: 'A bucket-list trip coming up. Feeling boxed-in by current sedan.',
      },
      {
        name: "The Teen Driver's Parent",
        count: 35000,
        snapshot:
          "Late 40s parents. Eldest turning 17. Buying now knowing it becomes the teen's first car. Safety and resale over luxury.",
        barrier: 'Split priorities between current and future driver needs.',
        trigger: "Teen passing learner's test. Shocking insurance quotes.",
      },
    ],
  },
  {
    id: 3,
    name: 'Van Intenders',
    count: 75000,
    countLabel: '75,000 Australians',
    description:
      "The smallest segment, but the most clear on what they need. These buyers aren't browsing. They know exactly what they want, and the right specs at the right price wins every time.",
    lineRange: [41, 50],
    subPersonas: [
      {
        name: 'The Creative Studio Operator',
        count: 18000,
        snapshot:
          "Freelance photographer/videographer in their 30s. Carries expensive equipment. Van is office, stockroom, and studio.",
        barrier: 'Equipment security. Image-conscious about client pickups.',
        trigger: "Bigger client contract. Colleague's gear theft from sedan.",
      },
      {
        name: 'The Community Support Provider',
        count: 22000,
        snapshot:
          '40s disability support worker. Visits 8-12 clients weekly. Needs to fit mobility equipment. Tight NDIS funding margins.',
        barrier: 'Budget constraints. Accessibility compliance requirements.',
        trigger: 'New client with heavier equipment. Current vehicle aging.',
      },
      {
        name: 'The Pop-Up Entrepreneur',
        count: 14000,
        snapshot:
          'Mid-30s running weekend market stalls or food van. Business growing. Packs up and rebuilds setup dozens of times yearly.',
        barrier: 'Variable cash flow. Setup time directly affects profitability.',
        trigger: 'More event invitations than vehicle allows. Small business grant.',
      },
    ],
  },
]
