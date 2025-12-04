import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useUIStore } from '../store/ui'

export function IntroCinematic() {
  const name = useUIStore((s) => s.placeholders.name)
  const [show, setShow] = useState(false)

  useEffect(() => {
    const seen = localStorage.getItem('introSeen')
    if (!seen) {
      setShow(true)
    }
  }, [])

  const dismiss = () => {
    localStorage.setItem('introSeen', '1')
    setShow(false)
  }

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            position: 'fixed', inset: 0, background: 'radial-gradient(1200px 600px at 50% -10%, var(--brand), var(--bg))',
            display: 'grid', placeItems: 'center', zIndex: 100,
          }}
        >
          <motion.div
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ textAlign: 'center' }}
          >
            <div style={{ fontSize: 16, letterSpacing: 6, textTransform: 'uppercase', opacity: 0.8 }}>Presenting</div>
            <div style={{ fontSize: 64, fontWeight: 800, marginTop: 8 }}>{name}</div>
            <motion.button
              onClick={dismiss}
              className="btn-primary"
              style={{ marginTop: 24 }}
              whileTap={{ scale: 0.98 }}
            >Enter</motion.button>
          </motion.div>
          <motion.div
            initial={{ scaleX: 1, originX: 0 }}
            animate={{ scaleX: 0 }}
            exit={{ scaleX: 1, originX: 1 }}
            transition={{ duration: 1.2, delay: 0.6, ease: 'anticipate' }}
            style={{ position: 'absolute', inset: 0, background: 'var(--bg)', pointerEvents: 'none' }}
            onAnimationComplete={() => { /* once sweep completes, auto-dismiss after a short delay */ setTimeout(dismiss, 400) }}
          />
          <button onClick={dismiss} aria-label="Skip intro" style={{
            position: 'absolute', right: 16, bottom: 16,
            background: 'var(--panel)', border: '1px solid var(--panelBorder)', color: 'var(--fg)', borderRadius: 10, padding: '8px 12px'
          }}>Skip</button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}


