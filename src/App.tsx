import './App.css'
import { Navbar } from './components/Navbar'
import { Hero3D } from './components/Hero3D'
import { Projects, About, Contact, Footer } from './components/Sections'
import { Narrative } from './components/Narrative'
import { useEffect } from 'react'
import { useUIStore } from './store/ui'

function App() {
  const theme = useUIStore((s) => s.theme)
  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') {
      root.style.setProperty('--bg', '#0a0b10')
      root.style.setProperty('--fg', '#ffffff')
      root.style.setProperty('--muted', 'rgba(255,255,255,0.65)')
      root.style.setProperty('--panel', 'rgba(255,255,255,0.08)')
      root.style.setProperty('--panelBorder', 'rgba(255,255,255,0.12)')
      document.body.style.background = 'var(--bg)'
      document.body.style.color = 'var(--fg)'
    } else {
      root.style.setProperty('--bg', '#f7f7fb')
      root.style.setProperty('--fg', '#111827')
      root.style.setProperty('--muted', 'rgba(0,0,0,0.65)')
      root.style.setProperty('--panel', 'rgba(0,0,0,0.06)')
      root.style.setProperty('--panelBorder', 'rgba(0,0,0,0.12)')
      document.body.style.background = 'var(--bg)'
      document.body.style.color = 'var(--fg)'
    }
  }, [theme])
  return (
    <div style={{ background: 'var(--bg)', color: 'var(--fg)' }}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Navbar />
      <main id="main-content">
        <section id="home">
          <Hero3D />
        </section>
        <Narrative />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
      </div>
  )
}

export default App
