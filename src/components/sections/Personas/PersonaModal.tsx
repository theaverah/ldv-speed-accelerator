'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Segment } from '@/data/personas'
import { useScramble } from '@/components/ui/ScrambleText'

interface PersonaModalProps {
  segment: Segment | null
  onClose: () => void
}

export function PersonaModal({ segment, onClose }: PersonaModalProps) {
  const { display: closeDisplay, scramble: closeScramble } = useScramble('Close')

  useEffect(() => {
    if (!segment) return
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [segment, onClose])

  return (
    <AnimatePresence>
      {segment && (
        <motion.div
          className="fixed inset-0 z-200 flex items-center justify-center p-4 md:p-0"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="w-full md:w-[90vw] overflow-y-auto"
            style={{
              maxWidth: '1200px',
              maxHeight: '90vh',
              backgroundColor: 'var(--color-800)',
              border: '1px solid #252626',
              padding: '40px',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-start justify-between" style={{ marginBottom: '26px' }}>
              <div className="flex flex-col" style={{ gap: '8px' }}>
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '12px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-700)',
                  }}
                >
                  {segment.count.toLocaleString()} people
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    fontSize: 'clamp(20px, 3vw, 32px)',
                    lineHeight: 1.2,
                    color: 'var(--color-50)',
                  }}
                >
                  {segment.name}
                </h3>
              </div>
              <button
                onClick={onClose}
                onMouseEnter={closeScramble}
                style={{
                  background: 'none',
                  border: '1px solid #252626',
                  color: 'var(--color-700)',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                  flexShrink: 0,
                }}
              >
                {closeDisplay}
              </button>
            </div>

            {/* Mobile layout — one card per sub-persona, stacked */}
            <div className="flex flex-col gap-8 md:hidden">
              {segment.subPersonas.map((sub, i) => (
                <div key={sub.name} className="flex flex-col" style={{ gap: '20px' }}>
                  <div className="flex flex-col" style={{ gap: '4px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '18px', lineHeight: 1.3, color: 'var(--color-50)' }}>
                      {sub.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-700)' }}>
                      {sub.count.toLocaleString()} people
                    </p>
                  </div>
                  <div style={{ borderTop: '1px solid #252626' }} />
                  {(['snapshot', 'barrier', 'trigger'] as const).map(key => (
                    <div key={key} className="flex flex-col" style={{ gap: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-700)' }}>
                        {key}
                      </span>
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '13px', lineHeight: 1.6, color: 'var(--color-50)' }}>
                        {sub[key]}
                      </p>
                    </div>
                  ))}
                  {i < segment.subPersonas.length - 1 && (
                    <div style={{ borderTop: '1px solid #252626', marginTop: '4px' }} />
                  )}
                </div>
              ))}
            </div>

            {/* Desktop layout — horizontal rows per content type */}
            <div className="hidden md:block" style={{ paddingTop: '24px' }}>
              {/* Row: names + counts */}
              <div className="grid grid-cols-3" style={{ gap: '44px', marginBottom: '12px' }}>
                {segment.subPersonas.map(sub => (
                  <div key={sub.name} className="flex flex-col" style={{ gap: '4px' }}>
                    <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '18px', lineHeight: 1.3, color: 'var(--color-50)' }}>
                      {sub.name}
                    </p>
                    <p style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-700)' }}>
                      {sub.count.toLocaleString()} people
                    </p>
                  </div>
                ))}
              </div>

              {/* Row: dividers */}
              <div className="grid grid-cols-3" style={{ gap: '44px', marginBottom: '30px' }}>
                {segment.subPersonas.map(sub => (
                  <div key={sub.name} style={{ borderTop: '1px solid #252626' }} />
                ))}
              </div>

              {/* Rows: snapshot / barrier / trigger */}
              {(['snapshot', 'barrier', 'trigger'] as const).map((key, i) => (
                <div key={key} className="grid grid-cols-3" style={{ gap: '44px', marginBottom: i < 2 ? '20px' : 0 }}>
                  {segment.subPersonas.map(sub => (
                    <div key={sub.name} className="flex flex-col" style={{ gap: '4px' }}>
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '12px', letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--color-700)' }}>
                        {key}
                      </span>
                      <p style={{ fontFamily: 'var(--font-body)', fontWeight: 400, fontSize: '12px', lineHeight: 1.6, color: 'var(--color-50)' }}>
                        {sub[key]}
                      </p>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default PersonaModal
