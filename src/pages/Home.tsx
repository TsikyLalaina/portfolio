import { Hero } from '../components/Hero'
import { Marquee, Works, Process, About, Contact } from '../components/Sections'

export default function Home() {
  return (
    <main>
      <section id="home">
        <Hero />
      </section>
      <Marquee />
      <Works />
      <Process />
      <About />
      <Contact />
    </main>
  )
}
