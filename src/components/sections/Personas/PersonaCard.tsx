'use client'

import { useState } from 'react'
import type { Segment } from '@/data/personas'

interface PersonaCardProps {
  segment: Segment
  onOpen: (segment: Segment) => void
  onHover: (id: number | null) => void
  hasBorderLeft?: boolean
}

function ExpandIcon({ hovered }: { hovered: boolean }) {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ flexShrink: 0 }}
    >
      <path
        d="M2.96296 7.00008H1.77777V12.3334H7.1111V11.1482H2.96296V7.00008ZM7.1111 2.85193H11.2593V7.00008H12.4444V1.66675H7.1111V2.85193Z"
        fill={hovered ? '#FFFFFF' : '#5C5D5E'}
        style={{ transition: 'fill 200ms ease' }}
      />
    </svg>
  )
}

export function PersonaCard({ segment, onOpen, onHover, hasBorderLeft }: PersonaCardProps) {
  const [hovered, setHovered] = useState(false)

  return (
    <div
      onClick={() => onOpen(segment)}
      onMouseEnter={() => { setHovered(true); onHover(segment.id) }}
      onMouseLeave={() => { setHovered(false); onHover(null) }}
      className="cursor-pointer flex flex-col p-8"
      style={{
        gap: '24px',
        backgroundColor: hovered ? '#0D0E0F' : 'var(--color-bg)',
        borderRight: '1px solid rgba(255,255,255,0.06)',
        borderLeft: hasBorderLeft ? '1px solid rgba(255,255,255,0.06)' : undefined,
        transition: 'background-color 200ms ease',
      }}
    >
      {/* Name + count group */}
      <div className="flex flex-col" style={{ gap: '8px' }}>
        <div className="flex items-start justify-between gap-4">
          <span
            style={{
              fontFamily: 'var(--font-body)',
              fontWeight: 500,
              fontSize: '16px',
              lineHeight: 1.3,
              color: 'var(--color-50)',
            }}
          >
            {segment.name}
          </span>
          <ExpandIcon hovered={hovered} />
        </div>

        <span
          style={{
            fontFamily: 'var(--font-body)',
            fontWeight: 400,
            fontSize: '12px',
            color: 'var(--color-700)',
          }}
        >
          {segment.countLabel}
        </span>
      </div>

      {/* Graphic placeholder */}
      <div style={{ height: '200px' }} />

      {/* Description */}
      <p
        style={{
          fontFamily: 'var(--font-body)',
          fontWeight: 400,
          fontSize: '12px',
          lineHeight: '20px',
          color: 'var(--color-700)',
        }}
      >
        {segment.description}
      </p>
    </div>
  )
}

export default PersonaCard
