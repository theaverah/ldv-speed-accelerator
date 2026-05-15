import type { Metadata } from 'next'
import localFont from 'next/font/local'
import { DM_Sans } from 'next/font/google'
import PageGrid from '@/components/layout/PageGrid'
import './globals.css'

const arpona = localFont({
  src: [
    { path: '../../public/fonts/Arpona-regular.otf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Arpona-semibold.otf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Arpona-bold.otf', weight: '700', style: 'normal' },
    { path: '../../public/fonts/Arpona-extrabold.otf', weight: '800', style: 'normal' },
  ],
  variable: '--font-arpona',
  display: 'swap',
})

const monorama = localFont({
  src: [
    { path: '../../public/fonts/Monorama-Regular.ttf', weight: '400', style: 'normal' },
    { path: '../../public/fonts/Monorama-Medium.ttf', weight: '500', style: 'normal' },
    { path: '../../public/fonts/Monorama-SemiBold.ttf', weight: '600', style: 'normal' },
    { path: '../../public/fonts/Monorama-Bold.ttf', weight: '700', style: 'normal' },
  ],
  variable: '--font-monorama',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

export const metadata: Metadata = {
  title: 'SPEED Accelerator - LDV Automotive',
  description: 'A strategic audience intelligence report prepared by The Speed Agency for LDV Automotive.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      className={`${arpona.variable} ${monorama.variable} ${dmSans.variable}`}
    >
      <body className="antialiased">
        <PageGrid />
        {children}
      </body>
    </html>
  )
}
