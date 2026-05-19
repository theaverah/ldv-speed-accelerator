'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '@/components/ui/Container'
import { Reveal } from '@/components/ui/Reveal'
import { journeyStages, type JourneyStage } from '@/data/journey'

const B = '1px solid var(--color-800)'

type ContentKey = 'doing' | 'feeling' | 'barrier' | 'opportunity'

const CONTENT_KEYS: { key: ContentKey; label: string }[] = [
  { key: 'doing', label: 'Doing' },
  { key: 'feeling', label: 'Feeling' },
  { key: 'barrier', label: 'Barrier' },
  { key: 'opportunity', label: 'Opportunity' },
]

function ContentPanel({ stage }: { stage: JourneyStage }) {
  return (
    <motion.div
      key={stage.id}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="flex flex-col h-full"
      style={{ gap: '24px' }}
    >
      {/* Duration (Monorama, above) + stage name (Arpona, sentence case, below) */}
      <div className="flex flex-col" style={{ gap: '12px' }}>
        <span style={{
          fontFamily: 'var(--font-mono)',
          fontSize: '12px',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color: 'var(--color-700)',
        }}>
          {stage.duration}
        </span>
        <h3 style={{
          fontFamily: 'var(--font-heading)',
          fontWeight: 400,
          fontSize: '26px',
          lineHeight: 1.15,
          color: 'var(--color-50)',
        }}>
          {stage.name.charAt(0) + stage.name.slice(1).toLowerCase()}
        </h3>
      </div>


      <div style={{ borderTop: B, marginTop: '-4px' }} />

      {/* 2×2 content grid — reduced row gap */}
      <div className="grid grid-cols-2" style={{ columnGap: '32px', rowGap: '32px', marginTop: '20px' }}>
        {CONTENT_KEYS.map(({ key, label }) => (
          <div key={key} className="flex flex-col" style={{ gap: '8px' }}>
            <span style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '12px',
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--color-700)',
            }}>
              {label}
            </span>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '14px',
              lineHeight: 1.7,
              color: 'var(--color-600)',
            }}>
              {stage[key]}
            </p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function Journey() {
  const [activeId, setActiveId] = useState(1)
  const [hoveredId, setHoveredId] = useState<number | null>(null)
  const activeStage = journeyStages.find(s => s.id === activeId)!

  return (
    <section
      id="journey"
      style={{ backgroundColor: 'var(--color-bg)', scrollMarginTop: '80px', overflowX: 'clip' }}
    >
      {/* Section label — lines are static (no Reveal), just like notebook rules */}
      <div style={{ borderBottom: B, height: '48px' }}>
        <Container>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            height: '48px',
            borderRight: B,
            padding: '0 16px',
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: 'var(--color-700)',
          }}>
            Their Journey
          </div>
        </Container>
      </div>

      <Container className="pb-16 md:pb-0">

        {/* Headline + description */}
        <Reveal delay={0.1}>
          <div className="p-8 flex flex-col" style={{ gap: '8px' }}>
            <h2 style={{
              fontFamily: 'var(--font-heading)',
              fontWeight: 400,
              fontSize: 'clamp(22px, 3vw, 36px)',
              lineHeight: 1.2,
              color: 'var(--color-50)',
            }}>
              The decision happens long before the dealership.
            </h2>
            <p style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '16px',
              lineHeight: 1.5,
              color: 'var(--color-700)',
            }}>
              Every one of these people takes the same road to a decision. But the path is rarely straight, and it's never just about the car.
            </p>
          </div>
        </Reveal>

        {/* Desktop two-column layout
            Border strategy: outer wrapper owns top/left/right edges.
            Each tab owns its borderRight (tab↔content divider) and borderBottom (row divider),
            except the last tab which omits borderBottom.
            Content panel has no border — outer wrapper provides all outer edges.
            The section's bottom <div borderTop> provides the bottom edge.
            Result: every visible line is exactly 1px, no adjacency doubling. */}
        <Reveal delay={0.2}>
          <div
            className="hidden md:flex"
            style={{ borderTop: B, borderLeft: B, borderRight: B, height: '480px' }}
          >
            {/* Left: tab navigation */}
            <div className="flex flex-col" style={{ width: '320px', flexShrink: 0 }}>
              {journeyStages.map((stage, i) => {
                const isActive = activeId === stage.id
                const isHovered = hoveredId === stage.id
                const lit = isActive || isHovered
                const isLast = i === journeyStages.length - 1
                return (
                  <button
                    key={stage.id}
                    onClick={() => setActiveId(stage.id)}
                    onMouseEnter={() => setHoveredId(stage.id)}
                    onMouseLeave={() => setHoveredId(null)}
                    style={{
                      flex: 1,
                      borderRight: B,
                      borderBottom: isLast ? undefined : B,
                      padding: '16px 32px',
                      backgroundColor: lit ? '#0D0E0F' : 'var(--color-bg)',
                      color: lit ? 'var(--color-50)' : 'var(--color-700)',
                      textAlign: 'left',
                      cursor: 'pointer',
                      fontFamily: 'var(--font-body)',
                      fontSize: '14px',
                      fontWeight: 400,
                      lineHeight: 1.4,
                      transition: 'background-color 200ms ease, color 200ms ease',
                      display: 'flex',
                      alignItems: 'center',
                    }}
                  >
                    {stage.tabLabel}
                  </button>
                )
              })}
            </div>

            {/* Right: content panel — no border, outer wrapper provides it */}
            <div style={{ flex: 1, padding: '40px', overflow: 'hidden', alignSelf: 'stretch' }}>
              <AnimatePresence mode="wait">
                <ContentPanel key={activeId} stage={activeStage} />
              </AnimatePresence>
            </div>

          </div>
        </Reveal>

        {/* Mobile accordion */}
        <div className="flex flex-col md:hidden">
          {journeyStages.map((stage, i) => {
            const isOpen = activeId === stage.id
            return (
              <div key={stage.id} style={{ borderTop: i === 0 ? B : undefined, borderBottom: B }}>
                <button
                  onClick={() => setActiveId(isOpen ? -1 : stage.id)}
                  className="w-full flex items-center justify-between"
                  style={{
                    padding: '20px 24px',
                    backgroundColor: isOpen ? '#0D0E0F' : 'var(--color-bg)',
                    color: isOpen ? 'var(--color-50)' : 'var(--color-700)',
                    fontFamily: 'var(--font-body)',
                    fontSize: '14px',
                    fontWeight: 400,
                    cursor: 'pointer',
                    textAlign: 'left',
                    transition: 'background-color 200ms ease, color 200ms ease',
                  }}
                >
                  <span>{stage.tabLabel}</span>
                  <span style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '14px',
                    color: 'var(--color-700)',
                    flexShrink: 0,
                    marginLeft: '16px',
                    transition: 'transform 250ms ease',
                    display: 'inline-block',
                    transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  }}>+</span>
                </button>

                <AnimatePresence>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                      style={{ overflow: 'hidden' }}
                    >
                      <div className="flex flex-col" style={{ padding: '24px', gap: '20px', borderTop: B }}>
                        <div className="flex flex-col" style={{ gap: '4px' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '11px',
                            letterSpacing: '0.1em',
                            textTransform: 'uppercase',
                            color: 'var(--color-700)',
                          }}>
                            {stage.duration}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-heading)',
                            fontWeight: 400,
                            fontSize: '20px',
                            lineHeight: 1.15,
                            color: 'var(--color-50)',
                          }}>
                            {stage.name.charAt(0) + stage.name.slice(1).toLowerCase()}
                          </span>
                        </div>
                        {CONTENT_KEYS.map(({ key, label }) => (
                          <div key={key} className="flex flex-col" style={{ gap: '6px' }}>
                            <span style={{
                              fontFamily: 'var(--font-mono)',
                              fontSize: '11px',
                              letterSpacing: '0.12em',
                              textTransform: 'uppercase',
                              color: 'var(--color-700)',
                            }}>
                              {label}
                            </span>
                            <p style={{
                              fontFamily: 'var(--font-body)',
                              fontWeight: 400,
                              fontSize: '13px',
                              lineHeight: 1.7,
                              color: 'var(--color-600)',
                            }}>
                              {stage[key]}
                            </p>
                          </div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )
          })}
        </div>

      </Container>

    </section>
  )
}

export default Journey
