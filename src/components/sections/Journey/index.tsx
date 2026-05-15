'use client'

import { journeyStages } from '@/data/journey'
import EmotionGraph from './EmotionGraph'

export function Journey() {
  return (
    <section id="journey">
      <EmotionGraph stages={journeyStages} />
      {/* Stage cards — to be implemented */}
    </section>
  )
}

export default Journey
