import { motion } from 'framer-motion'
import { useUIStore } from '../store/ui'
import { useI18n } from '../i18n'
import { Logo } from '../assets/Logo'
import { FaGithub, FaLinkedin } from 'react-icons/fa'

export function Navbar() {
  const t = useI18n()
  const theme = useUIStore((s) => s.theme)
  const toggleTheme = useUIStore((s) => s.toggleTheme)
  const locale = useUIStore((s) => s.locale)
  const setLocale = useUIStore((s) => s.setLocale)
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
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '0 24px',
        backdropFilter: 'blur(8px)',
        background: 'color-mix(in oklab, var(--bg) 60%, transparent)',
        borderBottom: '1px solid var(--panelBorder)',
        zIndex: 50,
      }}
    >
      <a href="#home" style={{ color: 'var(--fg)', textDecoration: 'none', fontWeight: 700, display: 'flex', alignItems: 'center', gap: 10 }}>
        <Logo size={40} />
        <span>Tsiky Lalaina</span>
      </a>
      <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
        <a href="#projects" style={{ color: 'var(--fg)', opacity: 0.8 }}>{t('nav_projects')}</a>
        <a href="#about" style={{ color: 'var(--fg)', opacity: 0.8 }}>{t('nav_about')}</a>
        <a href="#contact" style={{ color: 'var(--fg)', opacity: 0.8 }}>{t('nav_contact')}</a>
        <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" aria-label="GitHub" style={{ color: 'var(--fg)', opacity: 0.9, display: 'grid', placeItems: 'center' }}>
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" aria-label="LinkedIn" style={{ color: 'var(--fg)', opacity: 0.9, display: 'grid', placeItems: 'center' }}>
          <FaLinkedin />
        </a>
        <button onClick={toggleTheme} aria-label="Toggle theme" style={{
          background: 'var(--panel)', borderRadius: 8, border: '1px solid var(--panelBorder)', color: 'var(--fg)', padding: '6px 10px'
        }}>{theme === 'dark' ? '🌙' : '☀️'}</button>
        <select value={locale} onChange={(e) => setLocale(e.target.value as any)} aria-label="Language" style={{
          background: 'var(--panel)', borderRadius: 8, border: '1px solid var(--panelBorder)', color: 'var(--fg)', padding: '6px 10px'
        }}>
          <option value="en">EN</option>
          <option value="fr">FR</option>
        </select>
      </div>
    </motion.nav>
  )
}


