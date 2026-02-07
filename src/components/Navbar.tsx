import { motion } from 'framer-motion'
import { useUIStore } from '../store/ui'
import { useI18n } from '../i18n'
import { Logo } from '../assets/Logo'
import { FaGithub, FaLinkedin } from 'react-icons/fa'
import { useState } from 'react'

export function Navbar() {
  const t = useI18n()
  const theme = useUIStore((s) => s.theme)
  const toggleTheme = useUIStore((s) => s.toggleTheme)
  const locale = useUIStore((s) => s.locale)
  const setLocale = useUIStore((s) => s.setLocale)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <motion.nav
      initial={{ y: -20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        minHeight: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '12px 16px',
        backdropFilter: 'blur(8px)',
        background: 'color-mix(in oklab, var(--bg) 60%, transparent)',
        borderBottom: '1px solid var(--panelBorder)',
        zIndex: 50,
      }}
    >
      <a href="#home" style={{ color: 'var(--fg)', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 8, fontSize: 'clamp(14px, 4vw, 16px)' }}>
        <Logo size={32} />
        <span className="navbar-brand-text">Tsiky Lalaina</span>
      </a>

      {/* Desktop Navigation */}
      <div className="desktop-nav" style={{ display: 'none', gap: 16, alignItems: 'center' }}>
        <a href="#projects" className="nav-link">{t('nav_projects')}</a>
        <a href="#about" className="nav-link">{t('nav_about')}</a>
        <a href="#contact" className="nav-link">{t('nav_contact')}</a>
        <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
          <FaLinkedin />
        </a>
        <button onClick={toggleTheme} aria-label="Toggle theme" className="theme-toggle">{theme === 'dark' ? '🌙' : '☀️'}</button>
        <select value={locale} onChange={(e) => setLocale(e.target.value as any)} aria-label="Language" className="lang-select">
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
      </div>

      {/* Mobile Controls */}
      <div style={{ display: 'flex', gap: 8, alignItems: 'center' }} className="mobile-controls">
        <button onClick={toggleTheme} aria-label="Toggle theme" className="theme-toggle" style={{ fontSize: 14 }}>{theme === 'dark' ? '🌙' : '☀️'}</button>
        <select value={locale} onChange={(e) => setLocale(e.target.value as any)} aria-label="Language" className="lang-select" style={{ fontSize: 12 }}>
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} aria-label="Toggle menu" style={{
          background: 'var(--panel)', borderRadius: 8, border: '1px solid var(--panelBorder)', color: 'var(--fg)', padding: '6px 10px', cursor: 'pointer', display: 'none'
        }} className="menu-toggle">☰</button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          style={{
            position: 'absolute',
            top: 64,
            left: 0,
            right: 0,
            background: 'color-mix(in oklab, var(--bg) 95%, transparent)',
            borderBottom: '1px solid var(--panelBorder)',
            padding: '12px 16px',
            display: 'flex',
            flexDirection: 'column',
            gap: 12,
            zIndex: 40,
          }}
        >
          <a href="#projects" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('nav_projects')}</a>
          <a href="#about" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('nav_about')}</a>
          <a href="#contact" onClick={() => setMobileMenuOpen(false)} className="nav-link">{t('nav_contact')}</a>
          <div style={{ display: 'flex', gap: 12 }}>
            <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" aria-label="GitHub" className="social-icon">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" aria-label="LinkedIn" className="social-icon">
              <FaLinkedin />
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  )
}


