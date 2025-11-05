import { Hero3D } from '../components/Hero3D'
import { Narrative } from '../components/Narrative'
import { Projects, About, Contact } from '../components/Sections'

export default function Home() {
  return (
    <main>
      <section id="home">
        <Hero3D />
      </section>
      <Narrative />
      <Projects />
      <About />
      <Contact />
    </main>
  )
}


