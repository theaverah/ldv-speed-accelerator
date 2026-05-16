'use client'

import { useRef, useEffect } from 'react'

interface Node {
  x: number; y: number
  vx: number; vy: number
  px: number; py: number
  r: number; phase: number; speed: number
}

const N = 9
const LINK_DIST = 200
const PULL_RANGE = 350
const PULL_MAX = 50
const LERP = 0.1
const X_MARGIN = 160
const Y_TOP = 88        // nav height + buffer
const MAX_SPEED = 1.0
const MIN_SPEED = 0.2   // nodes never fully stop
const BOUNCE_RETAIN = 0.65 // energy kept per wall bounce
const CONTENT_W = 750
const CONTENT_H = 400
const REPEL_BUFFER = 80
const REPEL_STRENGTH = 0.5

export function NodeCanvas() {
  const cvs = useRef<HTMLCanvasElement>(null)
  const mouse = useRef({ x: -9999, y: -9999 })
  const isDown = useRef(false)
  const nodes = useRef<Node[]>([])
  const raf = useRef<number | null>(null)

  useEffect(() => {
    const el = cvs.current
    if (!el) return
    const ctx = el.getContext('2d')!

    const resize = () => {
      el.width = el.offsetWidth
      el.height = el.offsetHeight
      nodes.current = Array.from({ length: N }, () => ({
        x: X_MARGIN + Math.random() * (el.width - X_MARGIN * 2),
        y: Y_TOP + Math.random() * (el.height - Y_TOP - 80),
        vx: (Math.random() - 0.5) * 0.6,
        vy: (Math.random() - 0.5) * 0.6,
        px: 0, py: 0,
        r: 3 + Math.random() * 2,
        phase: Math.random() * Math.PI * 2,
        speed: 0.5 + Math.random() * 0.5,
      }))
    }

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouse.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onDown = () => { isDown.current = true }
    const onUp = () => { isDown.current = false }

    const draw = (t: number) => {
      const w = el.width, h = el.height
      ctx.clearRect(0, 0, w, h)

      const ns = nodes.current
      const m = mouse.current
      const sec = t * 0.001

      const zone = {
        x1: w / 2 - CONTENT_W / 2,
        y1: h / 2 - CONTENT_H / 2,
        x2: w / 2 + CONTENT_W / 2,
        y2: h / 2 + CONTENT_H / 2,
      }

      for (const n of ns) {
        n.x += n.vx; n.y += n.vy

        // Wall bounce with energy loss — prevents sustained edge rattling
        if (n.x < X_MARGIN) { n.vx = Math.abs(n.vx) * BOUNCE_RETAIN; n.x = X_MARGIN }
        if (n.x > w - X_MARGIN) { n.vx = -Math.abs(n.vx) * BOUNCE_RETAIN; n.x = w - X_MARGIN }
        if (n.y < Y_TOP) { n.vy = Math.abs(n.vy) * BOUNCE_RETAIN; n.y = Y_TOP }
        if (n.y > h - 80) { n.vy = -Math.abs(n.vy) * BOUNCE_RETAIN; n.y = h - 80 }

        // Content zone repulsion
        const cx = Math.max(zone.x1, Math.min(zone.x2, n.x))
        const cy = Math.max(zone.y1, Math.min(zone.y2, n.y))
        const rdx = n.x - cx, rdy = n.y - cy
        const rd = Math.hypot(rdx, rdy)

        if (rd === 0) {
          const dists = [n.x - zone.x1, zone.x2 - n.x, n.y - zone.y1, zone.y2 - n.y]
          const min = Math.min(...dists)
          if (min === dists[0]) n.vx -= REPEL_STRENGTH * 2
          else if (min === dists[1]) n.vx += REPEL_STRENGTH * 2
          else if (min === dists[2]) n.vy -= REPEL_STRENGTH * 2
          else n.vy += REPEL_STRENGTH * 2
        } else if (rd < REPEL_BUFFER) {
          const f = (1 - rd / REPEL_BUFFER) * REPEL_STRENGTH
          n.vx += (rdx / rd) * f
          n.vy += (rdy / rd) * f
        }

        // Speed cap + minimum speed floor (nodes never go fully dead)
        const spd = Math.hypot(n.vx, n.vy)
        if (spd > MAX_SPEED) {
          n.vx = (n.vx / spd) * MAX_SPEED
          n.vy = (n.vy / spd) * MAX_SPEED
        } else if (spd < MIN_SPEED && spd > 0) {
          n.vx = (n.vx / spd) * MIN_SPEED
          n.vy = (n.vy / spd) * MIN_SPEED
        } else if (spd === 0) {
          n.vx = (Math.random() - 0.5) * MIN_SPEED
          n.vy = (Math.random() - 0.5) * MIN_SPEED
        }

        // Mouse: hover attracts, click+hold repels
        const dx = m.x - (n.x + n.px), dy = m.y - (n.y + n.py)
        const d = Math.hypot(dx, dy)
        const inRange = d < PULL_RANGE && d > 0
        const dir = isDown.current ? -1 : 1
        const tpx = inRange ? (dx / d) * (1 - d / PULL_RANGE) * PULL_MAX * dir : 0
        const tpy = inRange ? (dy / d) * (1 - d / PULL_RANGE) * PULL_MAX * dir : 0
        n.px += (tpx - n.px) * LERP
        n.py += (tpy - n.py) * LERP
      }

      const pos = ns.map(n => ({ x: n.x + n.px, y: n.y + n.py }))

      // Connecting lines
      for (let i = 0; i < ns.length; i++) {
        for (let j = i + 1; j < ns.length; j++) {
          const d = Math.hypot(pos[i].x - pos[j].x, pos[i].y - pos[j].y)
          if (d < LINK_DIST) {
            ctx.strokeStyle = `rgba(255,255,255,${(1 - d / LINK_DIST) * 0.08})`
            ctx.lineWidth = 1
            ctx.beginPath()
            ctx.moveTo(pos[i].x, pos[i].y)
            ctx.lineTo(pos[j].x, pos[j].y)
            ctx.stroke()
          }
        }
      }

      // Pulsing nodes
      for (let i = 0; i < ns.length; i++) {
        const n = ns[i]
        const r = n.r * (1 + Math.sin(sec * n.speed + n.phase) * 0.3)
        ctx.beginPath()
        ctx.arc(pos[i].x, pos[i].y, r, 0, Math.PI * 2)
        ctx.fillStyle = 'rgba(255,255,255,0.2)'
        ctx.fill()
      }

      raf.current = requestAnimationFrame(draw)
    }

    resize()
    window.addEventListener('resize', resize)
    el.addEventListener('mousemove', onMove)
    el.addEventListener('mousedown', onDown)
    window.addEventListener('mouseup', onUp)
    raf.current = requestAnimationFrame(draw)

    return () => {
      window.removeEventListener('resize', resize)
      el.removeEventListener('mousemove', onMove)
      el.removeEventListener('mousedown', onDown)
      window.removeEventListener('mouseup', onUp)
      if (raf.current !== null) cancelAnimationFrame(raf.current)
    }
  }, [])

  return <canvas ref={cvs} className="absolute inset-0 w-full h-full hidden md:block" aria-hidden />
}

export default NodeCanvas
