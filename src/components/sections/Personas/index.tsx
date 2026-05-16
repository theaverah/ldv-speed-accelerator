'use client'

import { useState } from 'react'
import { Container } from '@/components/ui/Container'
import { PersonaCard } from './PersonaCard'
import { PersonaModal } from './PersonaModal'
import { LineGraph } from './LineGraph'
import { Reveal } from '@/components/ui/Reveal'
import { segments, type Segment } from '@/data/personas'

const DIVIDER = { borderTop: '1px solid var(--color-800)' } as const

export function Personas() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)
  const [openSegment, setOpenSegment] = useState<Segment | null>(null)

  return (
    <>
      <section id="personas" style={{ backgroundColor: 'var(--color-bg)', scrollMarginTop: '80px', overflowX: 'hidden' }}>

        {/* Label row — lines are static (no Reveal), label text lives inside */}
        <div style={{ borderTop: '1px solid var(--color-800)', borderBottom: '1px solid var(--color-800)', height: '80px' }}>
          <Container>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: '40px',
                borderLeft: '1px solid var(--color-800)',
                borderRight: '1px solid var(--color-800)',
                borderBottom: '1px solid var(--color-800)',
                padding: '0 16px',
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                color: 'var(--color-700)',
              }}
            >
              Your Audience
            </div>
          </Container>
        </div>

        <Container>
          <div className="flex flex-col gap-0 pb-16 md:pb-0">

            {/* Headline — 32px padding from all surrounding lines */}
            <Reveal delay={0.1}>
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
            </Reveal>

            {/* Segment cards — flush with container edges, no gaps */}
            <Reveal delay={0.2}>
              <div
                className="grid grid-cols-1 md:grid-cols-3 min-w-0"
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
                    isLast={i === segments.length - 1}
                    isActive={hoveredCard === segment.id}
                  />
                ))}
              </div>
            </Reveal>

            {/* Interactive line graph — hidden on mobile */}
            <div className="hidden md:block">
              <Reveal delay={0.15}>
                <div style={{ padding: '32px' }}>
                  <LineGraph
                    activeSegment={hoveredCard}
                    onHover={setHoveredCard}
                    onOpen={setOpenSegment}
                  />
                </div>
              </Reveal>
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
