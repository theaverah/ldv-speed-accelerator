'use client'

import { Container } from '@/components/ui/Container'
import { NodeCanvas } from './NodeCanvas'
import { Reveal } from '@/components/ui/Reveal'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <NodeCanvas />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center gap-8 md:gap-14">

          {/* Headline + subtext */}
          <div className="flex flex-col items-center gap-8 p-8">
            <Reveal onLoad delay={0.2}>
              <h1
                style={{
                  fontFamily: 'var(--font-heading)',
                  fontWeight: 400,
                  fontSize: 'clamp(28px, 5vw, 60px)',
                  lineHeight: 1.15,
                  letterSpacing: '0.01em',
                  color: 'var(--color-700)',
                  textAlign: 'center',
                }}
              >
                Your next{' '}
                <span style={{ color: 'var(--color-50)' }}>375,000 customers</span>
                <br />
                are already looking.
              </h1>
            </Reveal>
            <Reveal onLoad delay={0.4}>
              <p
                style={{
                  fontFamily: 'var(--font-body)',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: 1.4,
                  letterSpacing: '-0.01em',
                  color: 'var(--color-600)',
                  textAlign: 'center',
                }}
              >
                We know who they are, where they are, and what it takes to reach them.
              </p>
            </Reveal>
          </div>

        </div>
      </Container>

{/* Bottom divider lines — mirror the nav top/bottom at the section end */}
      <div
        aria-hidden
        className="hidden md:block absolute left-0 right-0 bottom-20"
        style={{ borderTop: '1px solid var(--color-800)' }}
      />
      <div
        aria-hidden
        className="hidden md:block absolute left-0 right-0 bottom-0"
        style={{ borderTop: '1px solid var(--color-800)' }}
      />
    </section>
  )
}

export default Hero
