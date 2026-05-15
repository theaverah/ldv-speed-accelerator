'use client'

import { useState, useEffect, useCallback } from 'react'

const SECTION_IDS = ['hero', 'personas', 'journey', 'market'] as const
type SectionId = (typeof SECTION_IDS)[number]

export function useActiveSection(): [SectionId | null, (id: SectionId) => void] {
  const [active, setActive] = useState<SectionId | null>(null)

  useEffect(() => {
    const elements = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActive(entry.target.id as SectionId)
          }
        }
      },
      {
        // Top offset = nav height so sections don't trigger under the nav
        // Bottom offset = -50% so only the section occupying the upper half activates
        rootMargin: '-80px 0px -50% 0px',
        threshold: 0,
      }
    )

    elements.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
  }, [])

  const setActiveOnClick = useCallback((id: SectionId) => {
    setActive(id)
  }, [])

  return [active, setActiveOnClick]
}
