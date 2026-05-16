@AGENTS.md

# SPEED Accelerator Showcase — Claude Code Project Guide

## Project Overview

This is a client-facing interactive web presentation called the **SPEED Accelerator Showcase**, built by The Speed Agency and presented to **LDV Automotive** (an Australian vehicle brand). It is a speculative pitch — Speed Agency is not yet LDV's agency, and this site demonstrates their strategic and analytical capabilities to win them as a client.

The site is a **single-page, self-guided interactive presentation** that sits between a pitch deck and a data dashboard. LDV's marketing team should be able to explore it independently — scrolling through sections, hovering over data points, clicking into persona cards — without anyone from the agency walking them through it.

All data is fictional and provided as a structural reference. The focus is on how the data is presented visually and interactively.

---

## Narrative Arc

The site tells a story in this order:

1. **Hero** — Wake-up call. One big provocative stat hooks LDV immediately.
2. **Karaoke Scroll Text** — Narrative bridge. Sets up the human story before personas.
3. **Audience Personas** — Meet the 375,000+ people. 3 segments, 9 sub-personas.
4. **Customer Journey** — Follow one person's decision journey across 5 stages.
5. **Footer** — Closing statement and call to action.

> **Note:** The Market Overview section was scoped out. Three sections (Personas, Journey, Footer) met the brief requirements. Market content lives in `src/data/market.ts` as a reference.

---

## Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript (strict mode)
- **Styling:** Tailwind CSS v4
- **Animations:** GSAP (scroll effects, karaoke text, counter animations, canvas interactions) + Framer Motion (card hover states, modal transitions, simple UI animations)
- **Data Visualization:** Recharts (charts and graphs in market overview)
- **Package Manager:** npm

---

## Design System

### Colors

```
--color-brand:       #CD1F00   /* Speed Agency red — accent only */
--color-bg:          #08090A   /* Main background */
--color-800:         #121314   /* Card backgrounds, elevated surfaces */
--color-700:         #5C5D5E   /* Secondary/muted text */
--color-600:         #D9D9D9   /* Body text, descriptions */
--color-50:          #FFFFFF   /* Primary text, headings */
```

### Typography

**Fonts are installed locally on the developer's Mac.** Before using fonts in code, run the following command to locate the font files:

```bash
find /Library/Fonts ~/Library/Fonts -name "*.ttf" -o -name "*.otf" -o -name "*.woff2" 2>/dev/null | grep -iE "arpona|monorama|dmsans|dm-sans"
```

Once located, copy the font files into `/public/fonts/` and load them using `next/font/local`.

Font roles:
- **Arpona** — Hero headline, Journey section headline and stage names, footer headline. Reserved for the highest-weight editorial moments.
- **Monorama** — Nav labels, section labels, metadata, tags, CTA button text, line graph numbers. Monospaced, uppercase, techy.
- **DM Sans** — Everything else: section headings, card titles, body text, descriptions, card content. The dominant font across the site.

### Grid & Spacing

- **Base unit:** 8px
- **All spacing must be multiples of 8** — 8, 16, 24, 32, 40, 48, 64, 80, 96...
- If a specific value is needed between multiples, use multiples of 4 as a fallback (4, 12, 20, 28...)
- **Never use arbitrary pixel values** that don't follow this system

### Border Radius

- **None.** All elements use `rounded-none` or `border-radius: 0`. Sharp edges throughout.

### Design Reference

The primary design peg is **unmoth.com** — dark, typographic, confident, motion-forward. Think premium automotive meets data science.

Figma file (reference for all design decisions):
- **Sections:** https://www.figma.com/design/rBu7rPktUK7IERvCiYhX6A/-TSA--Speed-Accelerator-Showcase?node-id=139-1107
- **Components:** https://www.figma.com/design/rBu7rPktUK7IERvCiYhX6A/-TSA--Speed-Accelerator-Showcase?node-id=64-65
- **Design System:** https://www.figma.com/design/rBu7rPktUK7IERvCiYhX6A/-TSA--Speed-Accelerator-Showcase?node-id=139-1108

**Always use Figma MCP to inspect components and pull exact values before implementing any section.** Do not guess spacing, font sizes, or layout from memory.

---

## File Structure

```
speed-accelerator/
├── public/
│   └── fonts/                        # Arpona + Monorama (local). DM Sans via next/font/google
├── src/
│   ├── app/
│   │   ├── layout.tsx                # Root layout — font loading, metadata
│   │   ├── page.tsx                  # Single page — imports all sections
│   │   ├── globals.css               # CSS variables, @theme tokens, base resets
│   │   └── favicon.ico
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Nav.tsx               # Sticky nav with active section highlight
│   │   │   └── Footer.tsx            # Footer with cycling verb animation
│   │   ├── sections/
│   │   │   ├── Hero/
│   │   │   │   ├── index.tsx         # Hero section root
│   │   │   │   └── NodeCanvas.tsx    # Canvas: pulsing nodes + mouse magnetic pull
│   │   │   ├── KaraokeText.tsx       # Scroll-triggered karaoke narrative (flat — simple)
│   │   │   ├── Personas/
│   │   │   │   ├── index.tsx         # Personas section root
│   │   │   │   ├── PersonaCard.tsx   # Segment card (click → modal)
│   │   │   │   ├── PersonaModal.tsx  # Modal with 3 sub-personas
│   │   │   │   └── LineGraph.tsx     # 50-line audience graph
│   │   │   ├── Journey/
│   │   │   │   └── index.tsx         # Journey section root (desktop tabs + mobile accordion)
│   │   │   └── Market/
│   │   │       └── index.tsx         # Market section root (stub — not implemented)
│   │   └── ui/                       # Reusable primitives only
│   │       ├── ScrambleText.tsx      # Letter scramble button (used across sections)
│   │       ├── Reveal.tsx            # Framer Motion scroll-triggered fade+rise animation
│   │       ├── Container.tsx         # Content width wrapper aligned to PageGrid
│   │       └── CountUp.tsx           # Animated number counter
│   ├── data/
│   │   ├── personas.ts               # Segment + sub-persona data + types
│   │   ├── journey.ts                # Journey stage data + types
│   │   └── market.ts                 # Stats, table, chart, funnel data + types
│   ├── hooks/
│   │   ├── useActiveSection.ts       # IntersectionObserver — highlights active nav item
│   │   └── useInView.ts              # Triggers scroll animations (GSAP entry point)
│   └── lib/
│       └── utils.ts                  # cn() helper (clsx + tailwind-merge)
```

---

## Section Content & Copy

### Nav

```
Left: SPEED logo/wordmark
Right: YOUR AUDIENCE · THEIR JOURNEY · THE OPPORTUNITY (coming soon)
Behavior: Sticky, fixed at top. Active section highlights on scroll.
Mobile: Logo scales down (h-5), font 10px, gap-1 between items, gap-4 min between logo and nav group.
```

### Hero

```
Headline:  Your next 375,000 customers are already looking.
Subtext:   Here's who they are and what it takes to reach them.
CTA:       SHOW ME (with letter scramble animation on hover)

Background: Subtle grid of 1px white lines at ~6% opacity.
            9 small pulsing nodes scattered asymmetrically.
            Thin connecting lines between nearby nodes at ~10% opacity.
            Mouse move: nodes shift slightly toward cursor (magnetic pull).
```

### Karaoke Scroll Text

```
Section label: PERSONAS (top left, Monorama, small, muted)

Full text (each phrase reveals word by word on scroll, opacity 15% → 100%):
"Nobody wakes up and decides to buy a car. They wake up and feel like
their life needs more room. A couple debating over dinner. A surfer with
too much gear. A first-time landowner figuring it out. That's the moment
the idea takes hold. That's where brands are won."
```

### Audience Personas

```
Section label: YOUR AUDIENCE
Headline: Your market isn't one audience. It's nine.

3 segment cards (click → opens modal):
Modal header shows total count (e.g. "120,000 people"), not "Sub-Personas".
Sub-persona counts displayed as "{n} people".

CARD 1 — UTE Seekers
Count: 120,000 Australians
Description: "First-timers. They've never owned a UTE, but their current
car is holding them back. The renovation project, the camping trip, the
lifestyle block — it's all waiting on the right vehicle."

CARD 2 — Large SUV Seekers
Count: 180,000 Australians
Description: "The biggest segment, but not one type of family. A blended
household packing for six. A couple planning a six-month road trip. A
parent buying today knowing their teen drives it in three years. Same
vehicle. Completely different lives."

CARD 3 — Van Seekers
Count: 75,000 Australians
Description: "The smallest segment, but the most clear on what they need.
These buyers aren't browsing. They know exactly what they want, and the
right specs at the right price wins every time."

Interactive line graph below cards (50 vertical lines):
- Line 16: label "UTE · 120,000" (boundary of ute segment)
- Line 40: label "SUV · 300,000" (cumulative after SUV segment)
- Line 50: label "VAN · 375,000+" (final total)
- Hover card 1: lines 1-16 highlight
- Hover card 2: lines 17-40 highlight
- Hover card 3: lines 41-50 highlight
- Default: all lines dim at ~15% opacity
- Highlighted: lines at 100% opacity, surrounding label lines slightly blurred
```

### Sub-Persona Modal Content (opens when card is clicked)

```
UTE SEEKERS — 3 sub-personas:

1. The First-Home Renovator (32,000)
   Snapshot: Late 20s couple, first home in growth corridor suburb.
             Weekends consumed by DIY projects. Hatchback is a bottleneck.
   Barrier:  Feel intimidated by ute culture. Unsure if it suits them long-term.
   Trigger:  Calculating hire vehicle costs. Seeing renovation creators using utes.

2. The Weekend Adventurer (48,000)
   Snapshot: Mid-30s mountain biker/surfer/camper. Gear keeps expanding.
             Current SUV can't fit it all.
   Barrier:  Partner worried about fuel economy. Fear of becoming a cliché.
   Trigger:  A new hobby that needs bigger cargo. Friends who've switched.

3. The Hobby Farmer (40,000)
   Snapshot: Early 50s professional with a 5-20 acre lifestyle block.
             First rural property. Everything is a learning curve.
   Barrier:  Overwhelmed by spec sheets and tow ratings.
   Trigger:  Getting bogged in the paddock. Rural neighbour's recommendation.

LARGE SUV SEEKERS — 3 sub-personas:

1. The Blended Household (52,000)
   Snapshot: Late 30s working parents, 4 kids from previous relationships.
             Need genuine 7-seater with real legroom and boot space.
   Barrier:  Complex seating requirements. Negotiating one car between two drivers.
   Trigger:  Teen refusing to fold legs in third row. Annual holiday requiring roof box.

2. The Road Trip Romantic (38,000)
   Snapshot: DINK couple in their 40s. Three big interstate drives in two years.
             Planning a six-month lap. Want comfort and reliability, not family features.
   Barrier:  Feel like the segment isn't made for them. Family SUV marketing misses them.
   Trigger:  A bucket-list trip coming up. Feeling boxed-in by current sedan.

3. The Teen Driver's Parent (35,000)
   Snapshot: Late 40s parents. Eldest turning 17. Buying now knowing it
             becomes the teen's first car. Safety and resale over luxury.
   Barrier:  Split priorities between current and future driver needs.
   Trigger:  Teen passing learner's test. Shocking insurance quotes.

VAN SEEKERS — 3 sub-personas:

1. The Creative Studio Operator (18,000)
   Snapshot: Freelance photographer/videographer in their 30s. Carries
             expensive equipment. Van is office, stockroom, and studio.
   Barrier:  Equipment security. Image-conscious about client pickups.
   Trigger:  Bigger client contract. Colleague's gear theft from sedan.

2. The Community Support Provider (22,000)
   Snapshot: 40s disability support worker. Visits 8-12 clients weekly.
             Needs to fit mobility equipment. Tight NDIS funding margins.
   Barrier:  Budget constraints. Accessibility compliance requirements.
   Trigger:  New client with heavier equipment. Current vehicle aging.

3. The Pop-Up Entrepreneur (14,000)
   Snapshot: Mid-30s running weekend market stalls or food van.
             Business growing. Packs up and rebuilds setup dozens of times yearly.
   Barrier:  Variable cash flow. Setup time directly affects profitability.
   Trigger:  More event invitations than vehicle allows. Small business grant.
```

### Customer Journey

```
Section label: THEIR JOURNEY
Headline: The decision happens long before the dealership.
Subtext: Every one of these people takes the same road to a decision. But the path
         is rarely straight, and it's never just about the car.

Implementation: Desktop — tab navigation, left column (5 tabs), right content panel
                (AnimatePresence fade on tab switch, fixed 480px height).
                Mobile — accordion, height-animated with AnimatePresence.
                Tab labels: "It starts with a feeling." / "The browsing begins." /
                "The dream meets the budget." / "The point of no return." / "Was it the right call?"

ContentPanel layout: Arpona stage name (sentence case) with Monorama duration above it,
                     then a 2×2 grid: Doing / Feeling / Barrier / Opportunity.

5 stages (tab/accordion items):

Stage 1 — THE ITCH (3-6 weeks)
Emotional: 55/100 | Rational: 30/100
Doing: Scrolling renovation content. Noticing utes in backgrounds. Casually browsing listings.
Feeling: "Maybe we should look at something bigger next year?" Curious, not committed.
Touchpoints: Instagram Reels, renovation podcasts, showroom yards, peer conversations.
Barrier: No urgency. Segment feels like it's not for them.
Opportunity: Lifestyle identity content. First-time ute buyer welcome guides.

Stage 2 — WINDOW SHOPPING (~6 weeks)
Emotional: 70/100 | Rational: 40/100
Doing: Openly browsing. Saving photos. Watching YouTube reviews over dinner.
Feeling: "This one looks cool." Running on gut instinct. Daydreaming.
Touchpoints: YouTube on smart TVs, brand Instagram, peer vehicles, hardware store car parks.
Barrier: Wide option set is paralysing. Partner has different preferences.
Opportunity: Visual configurators. Lifestyle imagery over technical specs.

Stage 3 — KICKING TYRES (~4 weeks)
Emotional: 50/100 | Rational: 75/100
Doing: Booking test drives. Reading owner reviews. Shortlisting 2-3 models.
Feeling: "Which one actually suits our life?" Shifting from dreaming to pragmatism.
Touchpoints: Dealer visits, owner forums, insurance calculators, mechanic friends.
Barrier: Hidden costs shifting budget. Feeling pressured by salespeople.
Opportunity: Transparent all-in pricing. Low-pressure overnight test drives.

Stage 4 — SIGNING ON (~2 weeks)
Emotional: 85/100 | Rational: 90/100
Doing: Final negotiations, finance applications, accessory decisions.
Feeling: "Let's just get this done." Oscillating between euphoria and buyer's remorse.
Touchpoints: Dealer, finance broker, insurance binders, family validation.
Barrier: Negotiation anxiety. Rushed accessory decisions. Delivery wait doubt.
Opportunity: Clear "next 30 days" onboarding comms. Named support person.

Stage 5 — ROAD TESTING LIFE (First 6 months)
Emotional: 75/100 | Rational: 60/100
Doing: Using it for every imagined project. Learning quirks. Comparing notes with peers.
Feeling: "Was this the right call?" Mostly pride, occasional doubt.
Touchpoints: Service visits, owner community apps, social media, dealer follow-up.
Barrier: Minor issues feel catastrophic. Servicing surprises erode trust.
Opportunity: Welcome app with feature tutorials. Owner community programs.

```

### Footer

```
Headline:  375,000 people are waiting to find you.
           (the verb "find" cycles through: find → choose → remember → discover)
Body:      Behind every data point is a real person with a real reason to choose LDV.
           Speed exists to find them, understand them, and connect them to you.
CTA:       Start the conversation →
           hello@thespeedagency.com.au
Links:     thespeedagency.com | LinkedIn
Copyright: © 2026 The Speed Agency. All Rights Reserved.
           Designed and built by Thea Sumagang for The Speed Agency.
```

---

## Animations & Interactions

### Global
- All scroll-triggered animations use GSAP ScrollTrigger
- Page load: fade in from black, subtle
- All buttons use letter scramble effect on hover (characters shuffle randomly ~1 second then resolve to final text)

### Hero
- Background: canvas animation with 9 pulsing nodes + connecting lines + mouse magnetic pull
- Grid: 1px white lines at 6% opacity
- Node pulse: scale 1 → 1.3 → 1 loop, staggered timing
- Mouse interaction: nodes shift max 20-30px toward cursor

### Karaoke Text
- Each word starts at 15% opacity
- As user scrolls, words animate to 100% opacity sequentially
- Use GSAP ScrollTrigger with scrub

### Personas Line Graph
- 50 vertical lines, default at 15% opacity
- Hover card → corresponding lines animate to 100% opacity
- Label numbers blur surrounding lines slightly for legibility

---

## Border System

All borders are `1px solid var(--color-800)`. The goal is exactly 1px per visible line — no adjacent borders.

### Vertical lines
Two fixed `PageGrid` lines run full page height at `max(160px, calc(50vw - 560px))` from each edge. Desktop only (`hidden md:block`). These are decorative and never owned by sections.

### Horizontal lines — section label pattern
Each section with a label uses an outer `div` with `height: 80px` and `borderBottom` only. Inside sits an inline-flex label tag with `borderLeft + borderRight + borderBottom`. This produces two full-width horizontal lines 80px apart at the top of the section:
- Line 1 = the previous section's bottom divider (shared — do NOT add `borderTop` to the section label div)
- Line 2 = the section label div's own `borderBottom` at 80px

Exception: the first labeled section after a section with no bottom divider (e.g. KaraokeText) must add its own `borderTop` to provide line 1.

### Section bottom dividers
Each section closes with `<div style={{ borderTop: '1px solid var(--color-800)' }} />`. This line doubles as the top line for the next section's label strip.

**Do not add a bottom divider** if the next section already provides a top border (e.g. Footer's own `borderTop`). One element owns each line.

---

## Coding Rules

- **Always use TypeScript.** No `any` types.
- **Tailwind for layout, inline styles for design tokens.** Use Tailwind for structural layout (flex, grid, sizing, responsive breakpoints). Use inline styles for borders, colors, typography — these reference CSS variables and are easier to read at a glance than arbitrary Tailwind classes.
- **Use CSS variables** for all colors (defined in globals.css). Never hardcode hex values in components.
- **Spacing must follow 8pt grid.** Use Tailwind spacing scale: `p-8` = 32px, `p-16` = 64px etc.
- **No border radius** anywhere. Use `rounded-none` explicitly.
- **Components must be small and focused.** If a component exceeds 150 lines, split it.
- **All data lives in `/src/data/`.** Never hardcode content inside components.
- **Use named exports** for all components.
- **Clean git commits.** One feature or fix per commit with a clear message.
- **Always check Figma MCP** before implementing any section for exact spacing, sizes, and layout.
- **Install packages freely** — no need to ask permission. Note what was installed in your response.
- **Use GSAP skills and React Best Practices skills** if available in your skills list.

---

## Claude Code Skills Available

The following skills are installed and should be used when relevant:
- Senior Frontend
- Senior Backend
- Code Reviewer
- Frontend Design
- UI UX Pro Max
- React Best Practices
- UI Design System
- Git Commit Helper
- Senior Prompt Engineer
- Clean Code
- Tailwind Patterns

---

## Responsive Design

- **Desktop first.** Design and build for 1440px wide viewport first.
- **Mobile breakpoint required:** `md` (768px) minimum.
- On mobile: single column layouts, stacked cards, simplified animations.
- Nav stays visible on mobile — no hamburger. Logo scales down (`h-5 → h-7`), font shrinks (`text-[10px] md:text-[12px]`), items allowed to wrap to 2 lines.
- Use `pb-16 md:pb-0` on section containers to add breathing room between stacked sections on mobile when visual separators (like the line graph) are hidden.

---

## Deliverables Checklist

- [ ] Figma design file with hifi mockups, clickable prototype, component library
- [ ] Live deployed URL (Vercel)
- [ ] GitHub repository with clean code and README.md

## README.md Must Include

- Tech stack overview
- How to run locally (`npm install` → `npm run dev`)
- Design decisions and rationale
- AI tools used and how (Claude, Claude Code, Figma MCP, etc.)
- Any known limitations or future improvements