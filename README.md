# SPEED Accelerator Showcase — LDV Automotive

A client-facing interactive web presentation built by The Speed Agency for LDV Automotive. A speculative pitch that sits between a pitch deck and a data dashboard — demonstrating the agency's strategic and audience intelligence capabilities through a self-guided, explorable experience.

**Live:** [ldv-speed-accelerator.vercel.app](https://ldv-speed-accelerator.vercel.app/)

---

## About

The site tells a story in five sections: a provocative opening stat, a narrative karaoke scroll, audience personas with interactive data, a customer journey across five decision stages, and a closing CTA. LDV's marketing team can explore it independently — clicking into persona cards, hovering over the audience graph, stepping through the journey — without needing a guided walkthrough.

All data is fictional and provided as a structural reference. The focus is on how the data is presented, not the data itself.

---

## Tech Stack

| Category | Tool |
|---|---|
| Framework | Next.js 15 (App Router) |
| Language | TypeScript (strict mode) |
| Styling | Tailwind CSS v4 |
| Scroll animations | GSAP + ScrollTrigger |
| UI animations | Framer Motion |
| Data visualisation | Recharts |
| Utilities | clsx, tailwind-merge |

### Fonts

Served locally from `/public/fonts/`:

- **Arpona** — Hero headline, Journey section headline and stage names, footer headline (display weight, editorial)
- **Monorama** — Nav labels, section labels, metadata, button text (monospaced, uppercase)
- **DM Sans** — All other text: headings, body, card content (loaded via `next/font/google`)

---

## Running Locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Font loading, metadata, PageGrid
│   ├── page.tsx            # Single page — imports all sections
│   └── globals.css         # CSS variables, @theme tokens, base resets
├── components/
│   ├── layout/
│   │   ├── Nav.tsx         # Sticky nav, active section highlight
│   │   ├── Footer.tsx      # Cycling verb animation, CTA
│   │   └── PageGrid.tsx    # Two fixed vertical margin lines
│   ├── sections/
│   │   ├── Hero/           # NodeCanvas (pulsing nodes, mouse pull) + ScrambleText CTA
│   │   ├── KaraokeText.tsx # Scroll-triggered word-by-word reveal (GSAP)
│   │   ├── Personas/       # Segment cards, sub-persona modal, 50-line audience graph
│   │   └── Journey/        # 5-stage tab layout (desktop) + accordion (mobile), AnimatePresence transitions
│   └── ui/
│       ├── ScrambleText.tsx  # Letter-scramble button (used across all sections)
│       ├── Container.tsx     # Content width wrapper aligned to PageGrid
│       └── CountUp.tsx       # Animated number counter
└── data/
    ├── personas.ts         # 3 segments × 3 sub-personas, typed
    ├── journey.ts          # 5 journey stages with emotional + rational scores
    └── market.ts           # Stats, table rows, chart data, funnel allocations
```

---

## Design Decisions

### Dark, typographic, motion-forward

The design theme is premium automotive meets data science. Every decision is sharp and restrained: no border radius anywhere, no shadows, elevation communicated through colour difference only (`#08090A` base → `#121314` surfaces).

### PageGrid alignment system

Two fixed 1px vertical lines run the full page height, positioned at `max(160px, calc(50vw - 560px))` from each edge. The `Container` component uses the identical formula for its horizontal padding — so content edges always land exactly on these lines at every viewport width and browser font size. Sections that need breathing room add `p-8` (32px) inside the Container; sections that bleed to the margin lines do so intentionally.

### Three fonts, three jobs

Arpona (display weight) is reserved for the highest-weight editorial moments — the hero headline, the Journey section headline and stage names, and the footer headline. Monorama (monospaced, uppercase) carries all technical and metadata text: nav labels, section tags, counts, button labels. DM Sans handles everything else. Mixing within a single element is never done.

### Data separated from presentation

All content lives in `/src/data/` as typed TypeScript files. Components read from these — no hardcoded strings inside JSX. This means the fictional data can be swapped for real data without touching any component.

### Interaction as personality

Every button uses a letter-scramble on hover — characters shuffle randomly before resolving to the final text, giving the UI a consistent, slightly technical feel. The persona modal aligns sub-persona content into horizontal rows rather than independent columns, so Snapshot / Barrier / Trigger always start at the same vertical position regardless of text length. The Journey section uses tab navigation on desktop (AnimatePresence fade between content panels) and a height-animated accordion on mobile.

---

## AI Tools Used

- **[Claude Code](https://claude.ai/code)** — Primary development tool throughout the build. Used for implementation, debugging, architectural decisions, layout problem-solving, and iterative design refinement directly in the codebase.
- **[Claude.ai](https://claude.ai)** — Used for planning, content structuring, and thinking through design decisions before and during development.
- **[Figma MCP](https://www.figma.com/blog/figma-mcp/)** — Connected Claude Code directly to the Figma design file, enabling exact spacing, font sizes, colours, and layout values to be pulled into code without manual inspection.
- **[QuiverAI](https://quiver.art)** — Used to vectorise vehicle reference images, which were then cleaned up on Figma and built into the inline SVG illustrations on the persona cards.

---

## Built by

Thea Verah Sumagang for [The Speed Agency](https://thespeedagency.com.au)
