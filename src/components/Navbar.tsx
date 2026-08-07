import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useUIStore } from '../store/ui'
import { useI18n } from '../i18n'
import { emails, githubAccounts, linkedin } from '../data/contacts'
import { Logo } from './Logo'

const navItems = [
  { key: 'nav_work', href: '#work' },
  { key: 'nav_about', href: '#about' },
  { key: 'nav_contact', href: '#contact' },
] as const

export function Navbar() {
  const t = useI18n()
  const locale = useUIStore((s) => s.locale)
  const setLocale = useUIStore((s) => s.setLocale)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Lock body scroll while the full-screen menu is open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  return (
    <>
      <motion.nav
        className={`navbar${scrolled ? ' scrolled' : ''}`}
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
      >
        <a href="/#home" className="nav-wordmark" aria-label="Home">
          <Logo size={34} />
        </a>

        <div className="nav-links">
          {navItems.map((item) => (
            <a key={item.key} href={`/${item.href}`} className="nav-link">{t(item.key)}</a>
          ))}
          <select value={locale} onChange={(e) => setLocale(e.target.value as 'en' | 'fr')} aria-label="Language" className="lang-select">
            <option value="en">EN</option>
            <option value="fr">FR</option>
          </select>
        </div>

        <div style={{ display: 'flex', gap: 10, alignItems: 'center' }} className="mobile-controls-wrap">
          <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}>
            {open ? 'Close' : 'Menu'}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: '-4%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-4%' }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            {navItems.map((item, i) => (
              <a key={item.key} href={`/${item.href}`} className="mobile-menu-link" onClick={() => setOpen(false)}>
                <span>0{i + 1}</span> {t(item.key)}
              </a>
            ))}
            <div className="mobile-menu-meta">
              {emails.map((e) => <a key={e.href} href={e.href}>{e.label}</a>)}
              {githubAccounts.map((g) => <a key={g.href} href={g.href} target="_blank" rel="noreferrer">{g.label}</a>)}
              <a href={linkedin.href} target="_blank" rel="noreferrer">{linkedin.label}</a>
              <div style={{ marginTop: 12 }}>
                <select value={locale} onChange={(e) => setLocale(e.target.value as 'en' | 'fr')} aria-label="Language" className="lang-select">
                  <option value="en">EN</option>
                  <option value="fr">FR</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
