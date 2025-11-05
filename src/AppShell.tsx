import { Outlet, useLocation } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Navbar } from './components/Navbar'
import { useLenis } from './hooks/useLenis'
import { useEffect } from 'react'
import { useUIStore } from './store/ui'
import { IntroCinematic } from './components/IntroCinematic'

export default function AppShell() {
  useLenis()
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

  const location = useLocation()

  return (
    <div style={{ background: 'var(--bg)', minHeight: '100vh', color: 'var(--fg)' }}>
      <IntroCinematic />
      <Navbar />
      <AnimatePresence mode="wait">
        <motion.div key={location.pathname}
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -24 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          style={{ position: 'relative' }}
        >
          <motion.div
            aria-hidden
            initial={{ scaleX: 1, originX: 0, opacity: 0.1 }}
            animate={{ scaleX: 0, opacity: 0 }}
            exit={{ scaleX: 1, originX: 1, opacity: 0.15 }}
            transition={{ duration: 0.6, ease: 'anticipate' }}
            style={{
              position: 'fixed', inset: 0, background: 'radial-gradient(1200px 600px at 50% -10%, var(--brand), transparent)',
              pointerEvents: 'none', zIndex: 40,
            }}
          />
          <Outlet />
        </motion.div>
      </AnimatePresence>
    </div>
  )
}


