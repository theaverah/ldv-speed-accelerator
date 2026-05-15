'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { Container } from '@/components/ui/Container'

gsap.registerPlugin(ScrollTrigger)

const SEGMENTS: { text: string; color: string }[] = [
  { text: 'Nobody wakes up and buys a car.', color: 'var(--color-50)' },
  { text: ' They wake up and feel like their life needs more room. A couple debating over dinner.', color: 'var(--color-700)' },
  { text: " That's the moment the idea takes hold.", color: 'var(--color-50)' },
  { text: " That's where brands are won.", color: 'var(--color-700)' },
]

export function KaraokeText() {
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const ctx = gsap.context(() => {
      const chars = gsap.utils.toArray<HTMLElement>('.karaoke-char', section)

      gsap.set(chars, { opacity: 0.15 })

      gsap.to(chars, {
        opacity: 1,
        stagger: 1,
        duration: 0.5,
        ease: 'none',
        scrollTrigger: {
          trigger: section,
          start: 'top 55%',
          end: 'center 35%',
          scrub: true,
        },
      })
    }, section)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      id="karaoke"
      className="flex items-center justify-center min-h-screen"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <Container>
        <div className="p-8">
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 400,
              fontSize: '36px',
              lineHeight: '48px',
            }}
          >
            {SEGMENTS.map((seg, si) =>
              [...seg.text].map((char, ci) => (
                <span
                  key={`${si}-${ci}`}
                  className="karaoke-char"
                  style={{ color: seg.color }}
                >
                  {char}
                </span>
              ))
            )}
          </p>
        </div>
      </Container>
    </section>
  )
}

export default KaraokeText
