'use client'

import { useState, useRef, useCallback, useEffect } from 'react'
import { motion } from 'framer-motion'

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
  animateCorners?: boolean
  noScramble?: boolean
}

const S = 3 // square size in px
const CORNER_TRANSITION = { duration: 0.5, ease: [0.16, 1, 0.3, 1] as const }

export function ScrambleText({ text, className, onClick, animateCorners = false, noScramble = false }: ScrambleTextProps) {
  const { display, scramble } = useScramble(text)
  const [hovered, setHovered] = useState(false)
  const buttonRef = useRef<HTMLButtonElement>(null)
  const [btnSize, setBtnSize] = useState({ w: 0, h: 0 })

  useEffect(() => {
    if (!animateCorners || !buttonRef.current) return
    const { width, height } = buttonRef.current.getBoundingClientRect()
    setBtnSize({ w: width, h: height })
  }, [animateCorners])

  // Translation distance to reach the next corner (clockwise).
  // getBoundingClientRect includes border (1px each side).
  // Absolute children are positioned relative to the padding box.
  // Each square sits at -1px from its corner, so the travel distance is (dimension - squareSize).
  const dx = btnSize.w - S
  const dy = btnSize.h - S

  const squareBase: React.CSSProperties = {
    position: 'absolute',
    width: `${S}px`,
    height: `${S}px`,
    background: 'var(--color-600)',
  }

  return (
    <button
      ref={buttonRef}
      onClick={onClick}
      onMouseEnter={() => { setHovered(true); if (!noScramble) scramble() }}
      onMouseLeave={() => setHovered(false)}
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

      {/* TL → TR on hover */}
      <motion.span
        style={{ ...squareBase, top: '-1px', left: '-1px' }}
        animate={animateCorners ? { x: hovered ? dx : 0 } : {}}
        transition={CORNER_TRANSITION}
      />
      {/* TR → BR on hover */}
      <motion.span
        style={{ ...squareBase, top: '-1px', right: '-1px' }}
        animate={animateCorners ? { y: hovered ? dy : 0 } : {}}
        transition={CORNER_TRANSITION}
      />
      {/* BR → BL on hover */}
      <motion.span
        style={{ ...squareBase, bottom: '-1px', right: '-1px' }}
        animate={animateCorners ? { x: hovered ? -dx : 0 } : {}}
        transition={CORNER_TRANSITION}
      />
      {/* BL → TL on hover */}
      <motion.span
        style={{ ...squareBase, bottom: '-1px', left: '-1px' }}
        animate={animateCorners ? { y: hovered ? -dy : 0 } : {}}
        transition={CORNER_TRANSITION}
      />
    </button>
  )
}

export default ScrambleText
