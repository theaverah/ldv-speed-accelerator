'use client'

import type { JourneyStage } from '@/data/journey'

interface EmotionGraphProps {
  stages: JourneyStage[]
}

export function EmotionGraph({ stages }: EmotionGraphProps) {
  return (
    <div className="w-full">
      {/*
        Dual SVG line graph — emotional (--color-brand) + rational (--color-50)
        Draws itself left-to-right on scroll via GSAP stroke-dashoffset
        To be implemented
      */}
    </div>
  )
}

export default EmotionGraph
