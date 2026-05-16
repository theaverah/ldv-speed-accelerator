'use client'

import { useState, useEffect, useRef } from 'react'
import { Container } from '@/components/ui/Container'
import { ScrambleText, useScramble } from '@/components/ui/ScrambleText'
import { Reveal } from '@/components/ui/Reveal'

const VERBS = ['find', 'choose', 'remember', 'discover']

function CyclingVerb() {
  const [displayIdx, setDisplayIdx] = useState(0)
  const [opacity, setOpacity] = useState(1)
  const idxRef = useRef(0)
  const containerRef = useRef<HTMLSpanElement>(null)
  const wordRef = useRef<HTMLSpanElement>(null)
  const measureRef = useRef<HTMLSpanElement>(null)

  // Set initial container width after mount
  useEffect(() => {
    if (wordRef.current && containerRef.current) {
      containerRef.current.style.width = `${wordRef.current.offsetWidth}px`
    }
  }, [])

  useEffect(() => {
    let swap: ReturnType<typeof setTimeout>
    let fadeIn: ReturnType<typeof setTimeout>

    const id = setInterval(() => {
      // Transition container width to next word's width while fading out
      if (measureRef.current && containerRef.current) {
        containerRef.current.style.width = `${measureRef.current.offsetWidth}px`
      }
      setOpacity(0)

      swap = setTimeout(() => {
        idxRef.current = (idxRef.current + 1) % VERBS.length
        setDisplayIdx(idxRef.current)
        fadeIn = setTimeout(() => setOpacity(1), 30)
      }, 300)
    }, 2500)

    return () => { clearInterval(id); clearTimeout(swap); clearTimeout(fadeIn) }
  }, [])

  return (
    <>
      <span
        ref={containerRef}
        style={{ display: 'inline-block', transition: 'width 0.3s ease' }}
      >
        <span
          ref={wordRef}
          style={{ display: 'inline-block', transition: 'opacity 0.25s ease', opacity, whiteSpace: 'nowrap' }}
        >
          {VERBS[displayIdx]}
        </span>
      </span>
      {/* position:fixed escapes all parent width/overflow constraints so offsetWidth measures true text width */}
      <span
        ref={measureRef}
        aria-hidden
        style={{
          position: 'fixed',
          top: '-9999px',
          left: '-9999px',
          visibility: 'hidden',
          whiteSpace: 'nowrap',
          pointerEvents: 'none',
          fontFamily: 'var(--font-heading)',
          fontWeight: 400,
          fontSize: 'clamp(28px, 5vw, 60px)',
        }}
      >
        {VERBS[(displayIdx + 1) % VERBS.length]}
      </span>
    </>
  )
}

export function Footer() {
  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })
  const [theaHovered, setTheaHovered] = useState(false)
  const { display, scramble } = useScramble('TO THE SURFACE')
  const { display: theaDisplay, scramble: theaScramble } = useScramble('Thea')
  const { display: agencyDisplay, scramble: agencyScramble } = useScramble('The Speed Agency')

  return (
    <footer style={{ backgroundColor: 'var(--color-bg)', borderTop: '1px solid var(--color-800)' }}>
      <Container>
        <div className="px-4 md:px-8 pt-16 md:pt-24 pb-12 md:pb-20">
          <div className="flex flex-col items-center text-center gap-10 md:gap-14">
            <div className="flex flex-col items-center gap-8">
              <Reveal>
                <h2
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    fontSize: 'clamp(28px, 5vw, 60px)',
                    lineHeight: 1.3,
                    color: 'var(--color-50)',
                    textAlign: 'center',
                  }}
                >
                  375,000 <em>people</em>
                  <span style={{ color: 'var(--color-700)' }}>
                    {' are'}
                    <br />
                    {'waiting to '}
                  </span>
                  <CyclingVerb />
                  <em> you.</em>
                </h2>
              </Reveal>
              <Reveal delay={0.15}>
                <p
                  style={{
                    fontFamily: 'var(--font-body)',
                    fontWeight: 400,
                    fontSize: '16px',
                    lineHeight: 1.5,
                    color: 'var(--color-700)',
                    textAlign: 'center',
                  }}
                >
                  Behind every data point is a real person with a real reason to choose you.
                  <br />
                  We exist to find them, understand them, and connect them to you.
                </p>
              </Reveal>
            </div>
            <Reveal delay={0.3}>
              <ScrambleText text="LET'S TALK" animateCorners noScramble />
            </Reveal>
          </div>
        </div>
      </Container>

      {/* Full-width separator */}
      <div style={{ borderTop: '1px solid var(--color-800)' }} />

      {/* Bottom bar */}
      <Container>
        <div
          className="px-4 md:px-8 py-6 flex flex-col items-center gap-3 md:flex-row md:gap-0 md:items-center md:justify-between"
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '12px',
            letterSpacing: '0.08em',
            textTransform: 'uppercase',
            color: 'var(--color-700)',
          }}
        >
          <span className="text-center md:text-left">
            Designed and built by{' '}
            <a
              href="https://theaverah.vercel.app/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={() => { setTheaHovered(true); theaScramble() }}
              style={{ color: theaHovered ? 'var(--color-50)' : 'inherit', textDecoration: 'none', cursor: 'pointer', transition: 'color 150ms, padding-right 150ms', paddingRight: theaHovered ? '12px' : '0px' }}
              onMouseLeave={() => setTheaHovered(false)}
            >
              <span style={{ position: 'relative' }}>
                {theaDisplay}
                <span style={{
                  position: 'absolute',
                  left: '100%',
                  top: 0,
                  paddingLeft: '2px',
                  opacity: theaHovered ? 1 : 0,
                  transform: theaHovered ? 'translate(1px, -1px)' : 'translate(0, 0)',
                  transition: 'opacity 150ms ease, transform 150ms ease',
                  fontSize: '12px',
                  pointerEvents: 'none',
                }}>↗</span>
              </span>
            </a>
            {' '}for{' '}
            <a
              href="https://thespeedagency.com/"
              target="_blank"
              rel="noopener noreferrer"
              onMouseEnter={agencyScramble}
              style={{ color: 'var(--color-brand)', textDecoration: 'none', cursor: 'pointer', whiteSpace: 'nowrap' }}
            >
              {agencyDisplay}
            </a>
          </span>
          <button
            onClick={scrollToTop}
            onMouseEnter={scramble}
            style={{ background: 'none', border: 'none', color: 'var(--color-50)', cursor: 'pointer', padding: 0, fontFamily: 'inherit', fontSize: 'inherit', letterSpacing: 'inherit', textTransform: 'inherit' }}
          >
            {display}
          </button>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
