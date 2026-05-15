'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { PersonaCard } from './PersonaCard'
import { PersonaModal } from './PersonaModal'
import { LineGraph } from './LineGraph'
import { segments, type Segment } from '@/data/personas'

const DIVIDER = { borderTop: '1px solid var(--color-800)' } as const

export function Personas() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [openSegment, setOpenSegment] = useState<Segment | null>(null)

  return (
    <>
      <section id="audience" style={{ backgroundColor: 'var(--color-bg)' }}>

        {/* Top divider */}
        <div style={DIVIDER} />

        {/* Label row — PERSONAS box at top-left, enclosed by dividers */}
        <Container>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              border: '1px solid var(--color-800)',
              padding: '12px 16px',
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              color: 'var(--color-700)',
            }}
          >
            Personas
          </div>
        </Container>

        {/* Divider below label */}
        <div style={DIVIDER} />

        <Container>
          <div className="flex flex-col gap-0">

            {/* Headline — 32px padding from all surrounding lines */}
            <h2
              className="p-8"
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '36px',
                lineHeight: 1.2,
                color: 'var(--color-50)',
              }}
            >
              Your market isn't one audience. It's nine.
            </h2>

            {/* Segment cards — flush with container edges, no gaps */}
            <div
              className="grid grid-cols-3"
              style={{
                borderTop: '1px solid rgba(255,255,255,0.06)',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
              }}
            >
              {segments.map((segment, i) => (
                <PersonaCard
                  key={segment.id}
                  segment={segment}
                  onOpen={setOpenSegment}
                  onHover={setHoveredCard}
                  hasBorderLeft={i === 0}
                />
              ))}
            </div>

            {/* Interactive line graph */}
            <div style={{ padding: '24px' }}>
              <LineGraph activeSegment={hoveredCard} />
            </div>

          </div>
        </Container>

        {/* Bottom divider */}
        <div style={DIVIDER} />

      </section>

      <PersonaModal segment={openSegment} onClose={() => setOpenSegment(null)} />
    </>
  )
}

export default Personas
