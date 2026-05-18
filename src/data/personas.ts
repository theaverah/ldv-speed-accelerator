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
    name: 'UTE Seekers',
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
    name: 'Large SUV Seekers',
    count: 180000,
    countLabel: '180,000 Australians',
    description:
      "The biggest segment, but not one type of family. A couple planning a six-month road trip. A parent buying today knowing their teen drives it in three years. Same vehicle. Completely different lives.",
    lineRange: [17, 40],
    subPersonas: [
      {
        name: 'The Blended Household',
        count: 52000,
        snapshot:
          'Late 30s working parents with four kids from previous relationships. They need a genuine 7-seater with real legroom in every row and enough boot space to pack for six.',
        barrier: 'The requirements are complex: seating configurations, child seats, sports kit. And getting both drivers to agree on one car is half the battle.',
        trigger: 'A teenager who refuses to fold their legs in the third row. Or a holiday that needed a roof box last time.',
      },
      {
        name: 'The Road Trip Romantic',
        count: 38000,
        snapshot:
          "A DINK couple in their 40s who discovered long-distance road trips as their thing. Three big interstate drives in two years, and a six-month lap already being planned.",
        barrier: "Feels like the Family SUV marketing completely misses them. They don't need the space for kids, they need comfort over two-day drives.",
        trigger: 'A bucket-list trip coming up. Or feeling boxed-in by their current sedan.',
      },
      {
        name: "The Teen Driver's Parent",
        count: 35000,
        snapshot:
          "Late 40s parents whose eldest is about to get their learner's permit. They're buying now, knowing this car will eventually become their teen's first.",
        barrier: "They're balancing what works for the family today against what's safe and sensible for a new driver in three years.",
        trigger: "The learner's test date getting real. Or an insurance quote that made them rethink their current car entirely.",
      },
    ],
  },
  {
    id: 3,
    name: 'Van Seekers',
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
          "A freelance photographer or videographer in their 30s running a small creative business. The van is their office, stockroom, and studio — all in one.",
        barrier: "Gear security is a constant worry. And they don't want a vehicle that makes them look like a tradie when they pull up to a client shoot.",
        trigger: "Landing a bigger client that needs on-location equipment. Or a colleague getting gear stolen from their sedan.",
      },
      {
        name: 'The Community Support Provider',
        count: 22000,
        snapshot:
          'A disability support worker in their 40s visiting 8 to 12 clients across the suburbs every week. The vehicle needs to fit mobility equipment and keep running reliably on tight margins.',
        barrier: 'Funding constraints make every dollar count. Accessibility compliance adds another layer of complexity to the decision.',
        trigger: 'A new client with heavier mobility equipment. Or the current vehicle starting to show its age at the worst possible time.',
      },
      {
        name: 'The Pop-Up Entrepreneur',
        count: 14000,
        snapshot:
          "Mid-30s, running a weekend market stall or food van. The business is growing, but not enough for a permanent shopfront yet. They pack up and rebuild their whole setup dozens of times a year.",
        barrier: "Cash flow is unpredictable, which makes committing to a vehicle hard. And every minute of setup time comes directly out of their earnings.",
        trigger: "A market organiser offering them more events than their current car can handle. Or a small business grant that finally makes the numbers work.",
      },
    ],
  },
]
