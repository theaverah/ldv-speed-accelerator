export interface StatCard {
  value: number
  suffix?: string
  prefix?: string
  label: string
  description: string
  visualType: 'age-shift' | 'circles' | 'dot-grid'
}

export interface MomentumRow {
  signal: string
  value2023: string
  value2026: string
  direction: 'up' | 'down'
  directionLabel: string
}

export interface ResearchChannel {
  label: string
  percentage: number
  change: number
}

export interface FunnelStage {
  name: string
  percentage: number
  channels: string
}

export const statCards: StatCard[] = [
  {
    value: 35,
    label: 'Average age of first-time ute buyer today',
    description: 'Was 42 in 2023',
    visualType: 'age-shift',
  },
  {
    value: 91,
    suffix: '%',
    label: 'Buyers who first research online',
    description: '9 in 10',
    visualType: 'circles',
  },
  {
    value: 67,
    suffix: '%',
    label: 'Open to non-legacy / challenger brands like LDV',
    description: "That's your window.",
    visualType: 'dot-grid',
  },
]

export const momentumRows: MomentumRow[] = [
  { signal: 'Average age of first-time buyers', value2023: '42', value2026: '35', direction: 'down', directionLabel: '↓ Younger' },
  { signal: 'Female-identifying intenders', value2023: '14%', value2026: '29%', direction: 'up', directionLabel: '↑ Growing fast' },
  { signal: 'Buyers who researched online first', value2023: '68%', value2026: '91%', direction: 'up', directionLabel: '↑ Digital-first' },
  { signal: 'Average research window (weeks)', value2023: '18', value2026: '11', direction: 'down', directionLabel: '↓ Shorter' },
  { signal: 'Intenders who test drove 1+ brand', value2023: '82%', value2026: '54%', direction: 'down', directionLabel: '↓ Brand-loyal earlier' },
  { signal: 'Metro vs regional intender mix', value2023: '58/42', value2026: '64/36', direction: 'up', directionLabel: '↑ More urban' },
  { signal: 'Open to non-legacy brands', value2023: '31%', value2026: '67%', direction: 'up', directionLabel: '↑ Open-minded' },
]

export const researchChannels: ResearchChannel[] = [
  { label: 'Long-form video (YouTube, CTV)', percentage: 34, change: 6 },
  { label: 'Short-form social (Reels, TikTok)', percentage: 19, change: 11 },
  { label: 'Brand-owned websites', percentage: 14, change: -3 },
  { label: 'Peer & community forums', percentage: 12, change: 2 },
  { label: 'Paid comparison sites', percentage: 9, change: -5 },
  { label: 'In-person dealer visits', percentage: 7, change: -8 },
  { label: 'Print & radio', percentage: 5, change: -3 },
]

export const funnelStages: FunnelStage[] = [
  { name: 'Top / Awareness', percentage: 35, channels: 'Long-form video, CTV, social' },
  { name: 'Mid / Consideration', percentage: 40, channels: 'Short-form social, influencer, search' },
  { name: 'Bottom / Conversion', percentage: 20, channels: 'Retargeting, comparison tools, dealer' },
  { name: 'Retention & Advocacy', percentage: 5, channels: 'Owner community, referral programs' },
]
