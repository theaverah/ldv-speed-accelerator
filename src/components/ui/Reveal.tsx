'use client'

import { motion } from 'framer-motion'

interface RevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
  onLoad?: boolean
}

const VARIANT = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export function Reveal({ children, delay = 0, className, style, onLoad }: RevealProps) {
  return (
    <motion.div
      className={className}
      style={style}
      variants={VARIANT}
      initial="hidden"
      animate={onLoad ? 'visible' : undefined}
      whileInView={!onLoad ? 'visible' : undefined}
      transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1], delay }}
      viewport={!onLoad ? { once: true, margin: '-60px' } : undefined}
    >
      {children}
    </motion.div>
  )
}

export default Reveal
