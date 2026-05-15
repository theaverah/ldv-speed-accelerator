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
          "Late 20s couple, first home in growth corridor suburb. Weekends consumed by DIY projects. Hatchback is a bottleneck.",
        barrier: 'Feel intimidated by ute culture. Unsure if it suits them long-term.',
        trigger: 'Calculating hire vehicle costs. Seeing renovation creators using utes.',
      },
      {
        name: 'The Weekend Adventurer',
        count: 48000,
        snapshot:
          "Mid-30s mountain biker/surfer/camper. Gear keeps expanding. Current SUV can't fit it all.",
        barrier: 'Partner worried about fuel economy. Fear of becoming a cliché.',
        trigger: "A new hobby that needs bigger cargo. Friends who've switched.",
      },
      {
        name: 'The Hobby Farmer',
        count: 40000,
        snapshot:
          'Early 50s professional with a 5-20 acre lifestyle block. First rural property. Everything is a learning curve.',
        barrier: 'Overwhelmed by spec sheets and tow ratings.',
        trigger: "Getting bogged in the paddock. Rural neighbour's recommendation.",
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
