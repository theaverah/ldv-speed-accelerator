'use client'

import { segments, type Segment } from '@/data/personas'

const BOUNDARY_LINES = new Set([1, 16, 40, 50])

const BOUNDARY_HEIGHT = 88
const REGULAR_HEIGHT = 72

const SEGMENT_RANGES: Record<number, [number, number]> = {
  1: [1, 16],
  2: [17, 40],
  3: [41, 50],
}

type LabelSide = 'left' | 'center' | 'right'

const LABEL_POSITIONS: { lineIdx: number; text: string; side: LabelSide }[] = [
  { lineIdx: 0,  text: '01',      side: 'center' },
  { lineIdx: 15, text: '120,000', side: 'center' },
  { lineIdx: 39, text: '300,000', side: 'center' },
  { lineIdx: 49, text: '375,000', side: 'center' },
]

// Invisible clickable zones — boundaries at midpoints between segments.
// Lines use justify-between (50 items), so line i sits at i/49 * 100%.
// Midpoint between index 15 and 16 = 15.5/49 ≈ 31.63%
// Midpoint between index 39 and 40 = 39.5/49 ≈ 80.61%
const HOVER_ZONES: { segmentId: number; left: string; width: string }[] = [
  { segmentId: 1, left: '0%',      width: '31.63%' },
  { segmentId: 2, left: '31.63%',  width: '48.98%' },
  { segmentId: 3, left: '80.61%',  width: '19.39%' },
]

interface LineGraphProps {
  activeSegment: number | null
  onHover: (id: number | null) => void
  onOpen: (segment: Segment) => void
}

const FADE_INSIDE = 2
const FADE_OUTSIDE = 3
const TOTAL_FADE = FADE_INSIDE + FADE_OUTSIDE

export function LineGraph({ activeSegment, onHover, onOpen }: LineGraphProps) {
  const getFadeOpacity = (lineNum: number): number | null => {
    if (activeSegment === null) return null
    const [start] = SEGMENT_RANGES[activeSegment]
    const pos = lineNum - start

    if (pos >= FADE_INSIDE) return null
    if (pos < -FADE_OUTSIDE) return null

    const step = FADE_OUTSIDE + pos + 1
    return step / TOTAL_FADE
  }

  const getLineStyle = (lineNum: number): { backgroundColor: string; opacity: number } => {
    if (activeSegment === null) return { backgroundColor: '#101113', opacity: 1 }
    const [start, end] = SEGMENT_RANGES[activeSegment]

    const fadeOpacity = getFadeOpacity(lineNum)

    if (lineNum >= start && lineNum <= end) {
      return { backgroundColor: '#5C5D5E', opacity: fadeOpacity ?? 1 }
    }

    if (fadeOpacity !== null) {
      return { backgroundColor: '#5C5D5E', opacity: fadeOpacity }
    }

    return { backgroundColor: '#101113', opacity: 1 }
  }

  const isHighlighted = (lineNum: number) => {
    if (activeSegment === null) return false
    const [start, end] = SEGMENT_RANGES[activeSegment]
    return lineNum >= start && lineNum <= end
  }

  return (
    <div
      className="w-full flex flex-col"
      style={{ gap: '4px', position: 'relative' }}
      onMouseLeave={() => onHover(null)}
    >
      {/* Lines */}
      <div className="flex justify-between items-start w-full">
        {Array.from({ length: 50 }, (_, i) => {
          const lineNum = i + 1
          const isBoundary = BOUNDARY_LINES.has(lineNum)
          const { backgroundColor, opacity } = getLineStyle(lineNum)
          return (
            <div
              key={i}
              style={{
                width: '1px',
                height: isBoundary ? `${BOUNDARY_HEIGHT}px` : `${REGULAR_HEIGHT}px`,
                backgroundColor,
                opacity,
                transition: 'background-color 200ms ease, opacity 200ms ease',
                flexShrink: 0,
              }}
            />
          )
        })}
      </div>

      {/* Labels */}
      <div className="relative w-full" style={{ height: '16px' }}>
        {LABEL_POSITIONS.map(({ lineIdx, text, side }) => {
          const pct = (lineIdx / 49) * 100
          const posStyle: React.CSSProperties =
            side === 'left'
              ? { left: 0 }
              : side === 'right'
              ? { right: 0 }
              : { left: `${pct}%`, transform: 'translateX(-50%)' }

          const lineNum = lineIdx + 1
          const highlighted = isHighlighted(lineNum)
          const fadeOpacity = getFadeOpacity(lineNum)

          let labelOpacity: number
          if (activeSegment === null) {
            labelOpacity = 1
          } else if (highlighted) {
            labelOpacity = 1
          } else if (fadeOpacity !== null) {
            labelOpacity = fadeOpacity
          } else {
            labelOpacity = 0
          }

          return (
            <span
              key={lineIdx}
              style={{
                position: 'absolute',
                top: 0,
                ...posStyle,
                fontFamily: 'var(--font-mono)',
                fontSize: '12px',
                letterSpacing: '0.04em',
                color: '#5C5D5E',
                opacity: labelOpacity,
                whiteSpace: 'nowrap',
                transition: 'opacity 200ms ease',
              }}
            >
              {text}
            </span>
          )
        })}
      </div>

      {/* Invisible clickable zones — one per segment, full height, on top of lines */}
      {HOVER_ZONES.map(({ segmentId, left, width }) => {
        const segment = segments.find(s => s.id === segmentId)!
        return (
          <div
            key={segmentId}
            onMouseEnter={() => onHover(segmentId)}
            onClick={() => onOpen(segment)}
            style={{
              position: 'absolute',
              top: 0,
              bottom: 0,
              left,
              width,
              cursor: 'pointer',
            }}
          />
        )
      })}
    </div>
  )
}

export default LineGraph
