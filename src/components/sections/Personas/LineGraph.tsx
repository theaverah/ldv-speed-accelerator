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
  { lineIdx: 0,  text: '01',      side: 'left'   },
  { lineIdx: 15, text: '120,000', side: 'center' },
  { lineIdx: 39, text: '300,000', side: 'center' },
  { lineIdx: 49, text: '375,000', side: 'right'  },
]

interface LineGraphProps {
  activeSegment: number | null
}

export function LineGraph({ activeSegment }: LineGraphProps) {
  const isHighlighted = (lineNum: number) => {
    if (activeSegment === null) return false
    const [start, end] = SEGMENT_RANGES[activeSegment]
    return lineNum >= start && lineNum <= end
  }

  return (
    <div className="w-full flex flex-col" style={{ gap: '12px' }}>

      {/* Lines — top-aligned, no background masking */}
      <div className="flex justify-between items-start w-full">
        {Array.from({ length: 50 }, (_, i) => {
          const lineNum = i + 1
          const isBoundary = BOUNDARY_LINES.has(lineNum)
          const highlighted = isHighlighted(lineNum)
          return (
            <div
              key={i}
              style={{
                width: '1px',
                height: isBoundary ? `${BOUNDARY_HEIGHT}px` : `${REGULAR_HEIGHT}px`,
                backgroundColor: 'white',
                opacity: highlighted ? 1 : 0.12,
                transition: 'opacity 200ms ease',
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
                color: 'var(--color-700)',
                whiteSpace: 'nowrap',
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
