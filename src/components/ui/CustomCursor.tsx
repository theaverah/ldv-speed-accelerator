'use client'

import { useEffect, useRef } from 'react'

export function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    const move = (e: MouseEvent) => {
      cursor.style.transform = `translate(${e.clientX - 20}px, ${e.clientY - 20}px)`
    }

    const onEnterClickable = () => cursor.classList.add('cursor--active')
    const onLeaveClickable = () => cursor.classList.remove('cursor--active')

    const onDown = () => { if (cursor) cursor.style.background = 'rgba(255,255,255,0.32)' }
    const onUp = () => { if (cursor) cursor.style.background = 'rgba(255,255,255,0.48)' }

    const onLeave = () => { cursor.style.opacity = '0' }
    const onEnter = () => { cursor.style.opacity = '1' }

    window.addEventListener('mousemove', move)
    window.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseenter', onEnter)

    const clickables = document.querySelectorAll('a, button, [role="button"], [style*="cursor: pointer"]')
    clickables.forEach(el => {
      el.addEventListener('mouseenter', onEnterClickable)
      el.addEventListener('mouseleave', onLeaveClickable)
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseenter', onEnter)
      clickables.forEach(el => {
        el.removeEventListener('mouseenter', onEnterClickable)
        el.removeEventListener('mouseleave', onLeaveClickable)
      })
    }
  }, [])

  return (
    <div
      ref={cursorRef}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '40px',
        height: '40px',
        background: 'rgba(255,255,255,0.48)',
        border: '1px solid rgba(255,255,255,0.82)',
        borderRadius: '50%',
        pointerEvents: 'none',
        zIndex: 9999,
        boxShadow: '0 2px 12px rgba(0,0,0,0.4)',
        transition: 'transform 0.08s ease, opacity 0.25s ease',
        willChange: 'transform',
      }}
      className="custom-cursor"
    />
  )
}
