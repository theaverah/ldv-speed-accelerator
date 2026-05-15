'use client'

import { useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { Segment } from '@/data/personas'

interface PersonaModalProps {
  segment: Segment | null
  onClose: () => void
}

export function PersonaModal({ segment, onClose }: PersonaModalProps) {
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
          className="fixed inset-0 z-200 flex items-center justify-center"
          style={{ backgroundColor: 'rgba(0,0,0,0.8)' }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
        >
          <motion.div
            className="w-[90vw] max-w-300 p-12"
            style={{
              backgroundColor: 'var(--color-800)',
              border: '1px solid rgba(255,255,255,0.08)',
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.25 }}
            onClick={e => e.stopPropagation()}
          >
            {/* Modal header */}
            <div className="flex items-start justify-between mb-12">
              <div className="flex flex-col gap-2">
                <span
                  style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '11px',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    color: 'var(--color-700)',
                  }}
                >
                  {segment.name}
                </span>
                <h3
                  style={{
                    fontFamily: 'var(--font-heading)',
                    fontWeight: 400,
                    fontSize: '32px',
                    lineHeight: 1.2,
                    color: 'var(--color-50)',
                  }}
                >
                  3 sub-personas
                </h3>
              </div>
              <button
                onClick={onClose}
                style={{
                  background: 'none',
                  border: '1px solid rgba(255,255,255,0.08)',
                  color: 'var(--color-700)',
                  cursor: 'pointer',
                  padding: '8px 16px',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '11px',
                  letterSpacing: '0.1em',
                  textTransform: 'uppercase',
                }}
              >
                Close
              </button>
            </div>

            {/* 3-column sub-personas */}
            <div className="grid grid-cols-3 gap-8">
              {segment.subPersonas.map(sub => (
                <div
                  key={sub.name}
                  className="flex flex-col gap-6"
                  style={{ borderTop: '1px solid rgba(255,255,255,0.08)', paddingTop: '24px' }}
                >
                  <div className="flex flex-col gap-1">
                    <p
                      style={{
                        fontFamily: 'var(--font-heading)',
                        fontWeight: 400,
                        fontSize: '20px',
                        lineHeight: 1.3,
                        color: 'var(--color-50)',
                      }}
                    >
                      {sub.name}
                    </p>
                    <p
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '11px',
                        letterSpacing: '0.08em',
                        color: 'var(--color-700)',
                      }}
                    >
                      {sub.count.toLocaleString()} people
                    </p>
                  </div>

                  <div className="flex flex-col gap-4">
                    {[
                      { label: 'Snapshot', value: sub.snapshot },
                      { label: 'Barrier', value: sub.barrier },
                      { label: 'Trigger', value: sub.trigger },
                    ].map(({ label, value }) => (
                      <div key={label}>
                        <span
                          style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '10px',
                            letterSpacing: '0.12em',
                            textTransform: 'uppercase',
                            color: 'var(--color-700)',
                          }}
                        >
                          {label}
                        </span>
                        <p
                          style={{
                            fontFamily: 'var(--font-body)',
                            fontSize: '14px',
                            lineHeight: 1.6,
                            color: 'var(--color-600)',
                            marginTop: '4px',
                          }}
                        >
                          {value}
                        </p>
                      </div>
                    ))}
                  </div>
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
