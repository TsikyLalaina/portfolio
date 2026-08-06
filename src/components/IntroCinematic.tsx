import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export function IntroCinematic() {
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = sessionStorage.getItem('introSeen')
      || new URLSearchParams(window.location.search).has('nointro')
    if (!seen) {
      setShow(true)
      // Cinematic beat, then hand over to the hero reveal
      const timer = setTimeout(() => dismiss(), 2400)
      return () => clearTimeout(timer)
    }
  }, [])

  const dismiss = () => {
    sessionStorage.setItem('introSeen', '1')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
          style={{
            position: 'fixed', inset: 0, background: 'var(--bg)',
            display: 'grid', placeItems: 'center', zIndex: 100, padding: 24,
          }}
        >
          <div style={{ textAlign: 'center', overflow: 'hidden' }}>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              style={{ fontSize: 12, letterSpacing: '0.4em', textTransform: 'uppercase', color: 'var(--gold)' }}
            >
              Portfolio
            </motion.p>
            <motion.div
              className="intro-title"
              initial={{ y: '105%' }}
              animate={{ y: 0 }}
              transition={{ duration: 1, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
              style={{ fontSize: 'clamp(40px, 10vw, 96px)', lineHeight: 1.05, marginTop: 12 }}
            >
              Tsiky <em style={{ color: 'var(--gold)' }}>Lalaina</em>
            </motion.div>
          </div>

          {/* Curtain sweep, then auto-dismiss */}
          <motion.div
            initial={{ scaleY: 0, originY: 1 }}
            animate={{ scaleY: 0 }}
            exit={{ scaleY: 1 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            style={{ position: 'absolute', inset: 0, background: 'var(--gold)', pointerEvents: 'none', opacity: 0.12 }}
          />
          <button
            onClick={dismiss}
            aria-label="Skip intro"
            style={{
              position: 'absolute', right: 20, bottom: 20,
              background: 'transparent', border: '1px solid var(--line)', color: 'var(--muted)',
              borderRadius: 999, padding: '8px 18px', fontSize: 12, letterSpacing: '0.14em',
              textTransform: 'uppercase', cursor: 'pointer', fontFamily: 'var(--font-body)',
            }}
          >
            Skip
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
