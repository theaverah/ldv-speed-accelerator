# DESIGN SYSTEM — SPEED Accelerator Showcase

This is the single source of truth for all visual decisions in the SPEED Accelerator Showcase project. Every component must follow these rules exactly. When in doubt, refer here first.

---

## Brand Identity

**Project:** SPEED Accelerator Showcase
**Presented by:** The Speed Agency
**Presented to:** LDV Automotive
**Design peg:** unmoth.com — dark, typographic, confident, motion-forward
**Vibe:** Premium automotive meets data science. Sharp, restrained, intentional.

---

## Colors

All colors are defined as CSS variables in `globals.css`. Never hardcode hex values in components. Always use the variable name.

```css
:root {
  --color-brand:   #CD1F00;   /* Speed Agency red — use sparingly as accent only */
  --color-bg:      #08090A;   /* Main page background */
  --color-800:     #121314;   /* Card backgrounds, elevated surfaces, nav bg */
  --color-700:     #5C5D5E;   /* Secondary text, muted labels, metadata */
  --color-600:     #D9D9D9;   /* Body text, descriptions, card content */
  --color-50:      #FFFFFF;   /* Primary text, headings, active states */
}
```

### Color Usage Rules

- **--color-brand** — accent only. Use for: active nav items, CTA buttons, key data highlights (e.g. the 67% dot grid), hover states on interactive elements. Never use as a background.
- **--color-bg** — always the page background. Never use a different background color.
- **--color-800** — card backgrounds, modal backgrounds, nav background. Slightly elevated from page bg.
- **--color-700** — muted/secondary text. Section labels, metadata, timestamps, placeholder text.
- **--color-600** — standard body text. Descriptions, card content, subtext.
- **--color-50** — primary text. All headings, hero text, active/highlighted elements.

### Tailwind Configuration

Add to `tailwind.config.ts`:

```ts
colors: {
  brand:  '#CD1F00',
  bg:     '#08090A',
  800:    '#121314',
  700:    '#5C5D5E',
  600:    '#D9D9D9',
  50:     '#FFFFFF',
}
```

---

## Typography

### Font Stack

All fonts are loaded locally from `/public/fonts/` using `next/font/local`.

| Font      | Role                                      | Style                        |
|-----------|-------------------------------------------|------------------------------|
| Arpona    | Headings, hero text, section titles       | Bold, large, display         |
| Monorama  | Subtext, nav, metadata, tags, buttons     | Monospaced, uppercase, techy |
| DM Sans   | Body text, descriptions, card content     | Clean, readable, humanist    |

### Font Loading (layout.tsx)

```tsx
import localFont from 'next/font/local'

const arpona = localFont({
  src: '../public/fonts/Arpona-Bold.otf', // adjust filename as needed
  variable: '--font-arpona',
})

const monorama = localFont({
  src: '../public/fonts/Monorama-Regular.otf', // adjust filename as needed
  variable: '--font-monorama',
})

const dmSans = localFont({
  src: '../public/fonts/DMSans-Regular.ttf', // adjust filename as needed
  variable: '--font-dm-sans',
})
```

### CSS Variables (globals.css)

```css
:root {
  --font-heading: var(--font-arpona);
  --font-mono:    var(--font-monorama);
  --font-body:    var(--font-dm-sans);
}
```

### Type Scale

All font sizes follow an 8pt base. Use Tailwind text scale.

| Token      | Size   | Font      | Usage                              |
|------------|--------|-----------|------------------------------------|
| display-xl | 96px   | Arpona    | Hero headline                      |
| display-lg | 72px   | Arpona    | Section headlines                  |
| display-md | 48px   | Arpona    | Sub-section titles                 |
| display-sm | 32px   | Arpona    | Card titles, modal headings        |
| mono-lg    | 14px   | Monorama  | Nav labels, section labels         |
| mono-md    | 12px   | Monorama  | Metadata, tags, button text        |
| mono-sm    | 10px   | Monorama  | Micro labels, timestamps           |
| body-lg    | 18px   | DM Sans   | Lead body text, card descriptions  |
| body-md    | 16px   | DM Sans   | Standard body text                 |
| body-sm    | 14px   | DM Sans   | Secondary body, captions           |

### Typography Rules

- **Headings (Arpona):** Always bold. Never italic. Letter spacing: tight (-0.02em).
- **Monorama:** Always uppercase. Letter spacing: wide (0.08em–0.12em). Never sentence case.
- **DM Sans:** Normal weight for body. Medium weight for emphasis within body text.
- **Line height:** Headings = 1.0–1.1. Body = 1.5–1.6.
- **Never mix fonts** within a single text element.

---

## Spacing

### Base Unit

**8px is the base unit.** All spacing must be multiples of 8.

```
8px   → Tailwind: p-2  / gap-2  / m-2
16px  → Tailwind: p-4  / gap-4  / m-4
24px  → Tailwind: p-6  / gap-6  / m-6
32px  → Tailwind: p-8  / gap-8  / m-8
40px  → Tailwind: p-10 / gap-10 / m-10
48px  → Tailwind: p-12 / gap-12 / m-12
64px  → Tailwind: p-16 / gap-16 / m-16
80px  → Tailwind: p-20 / gap-20 / m-20
96px  → Tailwind: p-24 / gap-24 / m-24
128px → Tailwind: p-32 / gap-32 / m-32
```

### Fallback

If a value between 8pt multiples is needed, use multiples of 4 (4, 12, 20, 28...). Never use arbitrary values.

### Section Spacing

- **Between sections:** 128px (p-32) minimum vertical padding
- **Section internal padding:** 96px (p-24) top/bottom, 80px (p-20) left/right
- **Card internal padding:** 32px (p-8)
- **Card gap:** 16px (gap-4)
- **Nav height:** 80px (h-20) — confirmed from Figma; supersedes earlier 64px value

---

## Border Radius

**None. Zero. Everywhere.**

```css
border-radius: 0;
```

In Tailwind: always use `rounded-none` explicitly on all elements. Do not rely on defaults. No exceptions.

---

## Borders & Lines

- **Borders:** 1px solid, color `--color-800` or `rgba(255,255,255,0.08)` for subtle dividers
- **Grid lines (hero background):** 1px, white at 6% opacity
- **Persona line graph:** 1px vertical lines, white at 15% opacity (dim) / 100% (active)
- **Dividers between sections:** optional, 1px horizontal line at 8% opacity

---

## Elevation & Surfaces

| Layer       | Color         | Usage                          |
|-------------|---------------|--------------------------------|
| Base        | --color-bg    | Page background                |
| Surface 1   | --color-800   | Cards, nav, modals             |
| Overlay     | rgba(0,0,0,0.6) | Modal backdrop               |

No shadows. Elevation is communicated through color difference only, consistent with the flat/sharp design language.

---

## Components

### Navigation (Nav.tsx)

```
Height:        80px (h-20) — confirmed from Figma
Background:    --color-bg (#08090A), solid, no blur, no transparency
Position:      fixed, top 0, full width, z-index 50
Border bottom: 1px solid --color-800 (#121314)
Left:          SPEED SVG wordmark, 94×32px, inline SVG
Right:         Section links — Monorama, uppercase, 16px, gap-8 (32px), letter-spacing 0.08em
               --color-700 default → --color-50 active (driven by useActiveSection hook)
Active state:  --color-50 text, aria-current="true", no underline, no indicator
Content area:  Container (max-w-360, px-40) + inner px-8 row
               → logo/links sit 32px inside the page grid lines (192px from viewport edge)
Grid lines:    PageGrid z-60 (above nav) renders lines at exactly 160px from each edge
               Lines pierce through nav background visually
```

### Page Grid (PageGrid.tsx)

```
Two fixed vertical lines, full page height
Position:      fixed, inset-0, z-60, pointer-events-none
Left line:     left: 160px, 1px, --color-800
Right line:    right: 160px, 1px, --color-800
z-60 ensures lines are visible above the nav (z-50) and all section content
```

### Container (ui/Container.tsx)

```
Reusable content wrapper — all sections and nav use this
max-w-360 (1440px) mx-auto w-full px-40 (160px each side)
Content outer edge aligns with PageGrid lines at viewports ≤ 1440px
Add px-8 inside for elements that need 32px breathing room from the lines
```

### Buttons (ScrambleText.tsx)

```
Font:         Monorama, uppercase, 12px, letter-spacing 0.1em
Color:        --color-50 text
Background:   transparent
Border:       1px solid --color-50
Padding:      16px 32px (p-4 px-8)
Border radius: 0 (rounded-none)
Corner detail: 4 small square dots at each corner (CSS pseudo-elements or SVG)
Hover:        Letter scramble animation (~1 second), then resolves to final text
              Background stays transparent — no fill on hover
```

### Cards (PersonaCard.tsx)

```
Background:   --color-800
Border:       1px solid rgba(255,255,255,0.08)
Border radius: 0 (rounded-none)
Padding:      32px (p-8)
Expand icon:  Top right corner, ↗ symbol in Monorama, --color-700
Hover:        Border brightens to rgba(255,255,255,0.2), subtle transition 200ms
Cursor:       pointer
```

### Modal (PersonaModal.tsx)

```
Backdrop:     rgba(0,0,0,0.7) full screen overlay
Container:    --color-800 background, no border radius
Width:        90vw max-width 1200px
Padding:      48px (p-12)
Close button: Top right, X in Monorama, --color-700
Animation:    Framer Motion — fade in + scale from 0.95 to 1.0, 200ms ease-out
Sub-personas: Horizontal layout, 3 columns side by side
```

### Section Labels

```
Font:         Monorama, uppercase, 12px, letter-spacing 0.12em
Color:        --color-700
Position:     Top left of section, above headline
Example:      "PERSONAS · 3 SEGMENTS · 9 PERSONAS"
Separator:    · (middle dot) with spaces
```

### Data Tags / Badges

```
Font:         Monorama, uppercase, 10px
Color:        --color-700
Background:   none
Border:       none
No border radius
Example:      "120,000 Australians"
```

---

## Animations & Motion

### Principles

- **Purposeful only.** Every animation must serve the narrative or UX — never decorative.
- **Restrained.** Inspired by unmoth.com — subtle, calm, alive but not flashy.
- **Performance first.** All animations must run at 60fps. No jank.

### Libraries

- **GSAP + ScrollTrigger** — scroll-triggered animations, karaoke text, counter animations, canvas effects
- **Framer Motion** — component-level transitions (modal open/close, card hover, page fade-in)

### Timing Tokens

```
duration-fast:   150ms   — micro interactions (hover states)
duration-base:   300ms   — standard transitions (card hover, fade)
duration-slow:   600ms   — section entrances, modal open
duration-crawl:  1000ms  — letter scramble, counter animations
```

### Easing

```
ease-default:  cubic-bezier(0.4, 0, 0.2, 1)   — standard
ease-out:      cubic-bezier(0, 0, 0.2, 1)      — entrances
ease-in:       cubic-bezier(0.4, 0, 1, 1)      — exits
ease-spring:   spring(1, 80, 10, 0)            — Framer Motion bouncy elements
```

### Specific Animations

#### Letter Scramble (all buttons)
- Trigger: hover
- Characters shuffle through random alphanumeric chars for ~800ms
- Then resolve to final text left to right
- Use `requestAnimationFrame` loop or GSAP ticker

#### Karaoke Scroll Text
- Each word starts at `opacity: 0.15`
- GSAP ScrollTrigger with `scrub: true`
- Words animate to `opacity: 1` sequentially as user scrolls
- Pin the section while text animates

#### Hero Node Graph (canvas)
- 9 nodes, default: white, 60% opacity, 6-8px diameter
- Pulse: scale 1 → 1.3 → 1, loop, staggered per node
- Connecting lines: white, 10% opacity, distance threshold ~200px
- Mouse move: nodes shift max 20-30px toward cursor (lerp smoothing)
- Grid: 1px white lines, 6% opacity

#### Persona Line Graph
- 50 vertical lines, 1px width
- Default: white at 15% opacity
- Active (on card hover): white at 100% opacity
- Transition: 200ms ease
- Labels appear at lines 16, 40, 50

#### Counter Animation (Market Overview)
- Start: 0
- End: target number
- Duration: 1500ms
- Easing: ease-out
- Trigger: IntersectionObserver on scroll into view

#### Journey Emotion Graph
- Dual line graph (emotional + rational scores)
- Draws itself left to right on scroll into view
- GSAP DrawSVG or SVG stroke-dashoffset animation
- Emotional line: --color-brand (warm)
- Rational line: --color-50 (cool/white)

#### Footer Cycling Verb
- The word "find" in "375,000 people are waiting to find you"
- Cycles through: find → choose → remember → discover → find
- Crossfade transition between words, 400ms
- Auto-plays on loop every 2.5 seconds

---

## Responsive Breakpoints

```
Mobile:  < 768px   (md breakpoint)
Desktop: ≥ 1440px  (primary design target)
```

### Mobile Rules

- All multi-column layouts → single column
- Hero headline: scale down to display-md (48px)
- Cards: full width, stacked vertically
- Nav: collapse to hamburger menu
- Animations: simplify or disable complex canvas animations
- Line graph: horizontal scroll or simplified version
- Modal: full screen on mobile

---

## Iconography

- No icon libraries. Use simple SVG inline icons only.
- Keep icons minimal — only use where absolutely necessary for UX clarity.
- Icon size: 16px or 24px only (multiples of 8).
- Icon color: always inherit from text color (currentColor).

---

## Do's and Don'ts

### Do
- Use CSS variables for all colors
- Follow 8pt grid for all spacing
- Use Monorama in uppercase only
- Keep animations subtle and purposeful
- Reference Figma MCP before implementing any component
- Keep components under 150 lines

### Don't
- Use border radius anywhere
- Hardcode hex values in components
- Use box shadows
- Use gradient backgrounds (exception: subtle radial gradient for text legibility in hero if needed)
- Mix fonts within a single text element
- Use animations purely for decoration
- Use arbitrary spacing values
