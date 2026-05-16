'use client'

import { Container } from '@/components/ui/Container'
import { NodeCanvas } from './NodeCanvas'

export function Hero() {
  return (
    <section
      id="hero"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <NodeCanvas />

      <Container className="relative z-10">
        <div className="flex flex-col items-center text-center gap-14">

          {/* Headline + subtext */}
          <div className="flex flex-col items-center gap-4 p-8">
            <h1
              style={{
                fontFamily: 'var(--font-heading)',
                fontWeight: 400,
                fontSize: '64px',
                lineHeight: 1.3,
                letterSpacing: '0.01em',
                color: 'var(--color-700)',
              }}
            >
              Your next{' '}
              <span style={{ color: 'var(--color-50)' }}>375,000 customers</span>
              <br />
              already exist.
            </h1>
            <p
              style={{
                fontFamily: 'var(--font-body)',
                fontWeight: 400,
                fontSize: '16px',
                lineHeight: 1.4,
                letterSpacing: '-0.01em',
                color: 'var(--color-600)',
              }}
            >
              We know who they are, where they are, and what it takes to reach them.
            </p>
          </div>

        </div>
      </Container>

{/* Bottom divider lines — mirror the nav top/bottom at the section end */}
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-20"
        style={{ borderTop: '1px solid var(--color-800)' }}
      />
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0"
        style={{ borderTop: '1px solid var(--color-800)' }}
      />
    </section>
  )
}

export default Hero
