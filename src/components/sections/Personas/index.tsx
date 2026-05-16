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
      <section id="personas" style={{ backgroundColor: 'var(--color-bg)', scrollMarginTop: '80px', overflowX: 'hidden' }}>

        {/* Label row — top and bottom borders are the dividers; label box has only side borders */}
        <div style={{ borderTop: '1px solid var(--color-800)', borderBottom: '1px solid var(--color-800)' }}>
          <Container>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                borderLeft: '1px solid var(--color-800)',
                borderRight: '1px solid var(--color-800)',
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
        </div>

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
              className="grid grid-cols-3 min-w-0"
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
            <div style={{ padding: '32px' }}>
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
