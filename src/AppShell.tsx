import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { useEffect } from 'react'
import { Navbar } from './components/Navbar'
import { Cursor } from './components/Cursor'
import { Footer } from './components/Sections'
import { IntroCinematic } from './components/IntroCinematic'
import { useLenis } from './hooks/useLenis'

export default function AppShell() {
  const lenisRef = useLenis()
  const location = useLocation()

  // Land at the top of every route: without this, opening a project from far down
  // the home page keeps the old scroll offset and drops you at the page bottom.
  useEffect(() => {
    const lenis = lenisRef.current
    if (location.hash) {
      // React mounts after the browser's native anchor pass, so jump manually.
      const target = document.querySelector(location.hash)
      if (target) {
        if (lenis) lenis.scrollTo(target as HTMLElement, { immediate: true })
        else target.scrollIntoView()
      }
      return
    }
    if (lenis) lenis.scrollTo(0, { immediate: true })
    else window.scrollTo(0, 0)
  }, [location.pathname, location.hash, lenisRef])

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)' }}>
      <a href="#main-content" className="skip-link">Skip to content</a>
      <Cursor />
      <IntroCinematic />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div
          key={location.pathname}
          id="main-content"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ position: 'relative' }}
        >
          <Outlet />
        </motion.div>
      </AnimatePresence>
      <Footer />
    </div>
  )
}
