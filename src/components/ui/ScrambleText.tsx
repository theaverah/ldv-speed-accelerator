'use client'

import { useState, useRef, useCallback, useEffect } from 'react'

const CHARS = '01'
const DURATION = 300
const SWAP_INTERVAL = 40 // ~25fps

export function useScramble(text: string) {
  const [display, setDisplay] = useState(text)
  const [isAnimating, setIsAnimating] = useState(false)
  const rafRef = useRef<number | null>(null)
  const resolveOrderRef = useRef<number[]>([])

  const scramble = useCallback(() => {
    if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)

    resolveOrderRef.current = [...text].map((_, i) => i).sort(() => Math.random() - 0.5)

    const start = performance.now()
    let lastSwap = start - SWAP_INTERVAL // ensure first frame updates immediately
    setIsAnimating(true)

    const tick = (now: number) => {
      const progress = Math.min((now - start) / DURATION, 1)

      // Only update displayed characters every SWAP_INTERVAL ms
      if (now - lastSwap >= SWAP_INTERVAL) {
        lastSwap = now

        // Scramble pure 0/1 for first 40%, then resolve chars back in random order
        const resolveProgress = Math.max(0, (progress - 0.4) / 0.6)
        const resolveCount = Math.floor(resolveProgress * text.length)
        const resolved = new Set(resolveOrderRef.current.slice(0, resolveCount))

        const next = [...text]
          .map((char, i) => (resolved.has(i) || !/[A-Z0-9]/i.test(char) ? char : CHARS[Math.floor(Math.random() * 2)]))
          .join('')

        setDisplay(next)
      }

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(tick)
      } else {
        setDisplay(text)
        setIsAnimating(false)
        rafRef.current = null
      }
    }

    rafRef.current = requestAnimationFrame(tick)
  }, [text])

  useEffect(
    () => () => {
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current)
    },
    []
  )

  return { display, scramble, isAnimating }
}

interface ScrambleTextProps {
  text: string
  className?: string
  onClick?: () => void
}

export function ScrambleText({ text, className, onClick }: ScrambleTextProps) {
  const { display, scramble } = useScramble(text)

  return (
    <button
      onClick={onClick}
      onMouseEnter={scramble}
      className={className}
      style={{
        position: 'relative',
        display: 'inline-grid',
        placeItems: 'center',
        fontFamily: 'var(--font-mono)',
        fontSize: '10px',
        letterSpacing: '0.1em',
        textTransform: 'uppercase',
        color: 'var(--color-50)',
        background: 'var(--color-bg)',
        border: '1px solid var(--color-800)',
        padding: '10px 22px',
        cursor: 'pointer',
      }}
    >
      {/* Hidden original text — solely determines button width */}
      <span style={{ visibility: 'hidden', whiteSpace: 'nowrap' }} aria-hidden>{text}</span>
      {/* Scrambled display — absolute so it never affects layout */}
      <span style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', whiteSpace: 'nowrap' }}>{display}</span>
      <span style={{ position: 'absolute', top: '-1px', left: '-1px', width: '4px', height: '4px', background: 'var(--color-50)' }} />
      <span style={{ position: 'absolute', top: '-1px', right: '-1px', width: '4px', height: '4px', background: 'var(--color-50)' }} />
      <span style={{ position: 'absolute', bottom: '-1px', left: '-1px', width: '4px', height: '4px', background: 'var(--color-50)' }} />
      <span style={{ position: 'absolute', bottom: '-1px', right: '-1px', width: '4px', height: '4px', background: 'var(--color-50)' }} />
    </button>
  )
}

export default ScrambleText
