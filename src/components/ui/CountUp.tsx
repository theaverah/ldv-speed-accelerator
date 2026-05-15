'use client'

interface CountUpProps {
  end: number
  duration?: number
  suffix?: string
  prefix?: string
}

export function CountUp({ end, duration = 1500, suffix = '', prefix = '' }: CountUpProps) {
  return (
    <span>
      {prefix}{end}{suffix}
      {/* CountUp animation — to be implemented */}
    </span>
  )
}

export default CountUp
