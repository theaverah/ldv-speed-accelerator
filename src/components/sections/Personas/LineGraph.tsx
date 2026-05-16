'use client'

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

interface LineGraphProps {
  activeSegment: number | null
}

const FADE_INSIDE = 2   // lines inside active segment that fade in
const FADE_OUTSIDE = 3  // lines outside (prev segment) that also fade
const TOTAL_FADE = FADE_INSIDE + FADE_OUTSIDE

export function LineGraph({ activeSegment }: LineGraphProps) {
  const getFadeOpacity = (lineNum: number): number | null => {
    if (activeSegment === null) return null
    const [start] = SEGMENT_RANGES[activeSegment]
    const pos = lineNum - start // negative = before segment, 0+ = inside

    if (pos >= FADE_INSIDE) return null        // fully active, no fade needed
    if (pos < -FADE_OUTSIDE) return null       // fully inactive, out of fade zone

    const step = FADE_OUTSIDE + pos + 1        // 1 … TOTAL_FADE
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
    <div className="w-full flex flex-col" style={{ gap: '4px' }}>

      {/* Lines — top-aligned, no background masking */}
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

      {/* Labels — below lines, no background */}
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
    </div>
  )
}

export default LineGraph
