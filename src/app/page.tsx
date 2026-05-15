import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import Hero from '@/components/sections/Hero'
import KaraokeText from '@/components/sections/KaraokeText'
import Personas from '@/components/sections/Personas'
import Journey from '@/components/sections/Journey'
import Market from '@/components/sections/Market'

export default function Home() {
  return (
    <main>
      <Nav />
      <Hero />
      <KaraokeText />
      <Personas />
      <Journey />
      <Market />
      <Footer />
    </main>
  )
}
