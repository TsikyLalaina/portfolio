import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { useUIStore } from '../store/ui'
import { Link } from 'react-router-dom'
// removed icons from project cards per user request
import { projects } from '../data/projects'

function SectionWrapper({ id, children }: { id: string, children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-20% 0px -20% 0px' })
  return (
    <section id={id} ref={ref} style={{ padding: '96px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div
        initial={{ y: 24, opacity: 0 }}
        animate={inView ? { y: 0, opacity: 1 } : {}}
        transition={{ duration: 0.7, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </section>
  )
}

export function Projects() {
  const t = useI18n()
  return (
    <SectionWrapper id="projects">
      <h2 style={{ color: 'var(--fg)', marginBottom: 16 }}>{t('projects_title')}</h2>
      <p style={{ color: 'var(--muted)' }}>{t('projects_desc')}</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: 16, marginTop: 24 }}>
        {projects.map((p) => (
          <motion.div key={p.id} whileHover={{ y: -6, scale: 1.02 }} transition={{ type: 'spring', stiffness: 300, damping: 20 }}>
            <Link to={`/project/${p.id}`} style={{
              display: 'block',
              background: 'var(--panel)',
              border: '1px solid var(--panelBorder)',
              borderRadius: 12,
              padding: 16,
              color: 'var(--fg)',
              textDecoration: 'none'
            }}>
              {p.image ? (
                <img src={p.image} alt={`${p.title} preview`} style={{ width: '100%', height: 140, objectFit: 'cover', borderRadius: 8, marginBottom: 12 }} />
              ) : (
                <div style={{ height: 140, background: p.heroColor, borderRadius: 8, marginBottom: 12 }} />
              )}
              <div style={{ fontWeight: 600 }}>{p.title}</div>
              <div style={{ opacity: 0.75, fontSize: 14 }}>{p.tags.join(' • ')}</div>
              {p.tech && p.tech.length > 0 && (
                <div style={{ opacity: 0.65, fontSize: 13, marginTop: 4 }}>{p.tech.join(' • ')}</div>
              )}
            </Link>
          </motion.div>
        ))}
      </div>
    </SectionWrapper>
  )
}

export function About() {
  const t = useI18n()
  return (
    <SectionWrapper id="about">
      <h2 style={{ color: 'var(--fg)', marginBottom: 16 }}>{t('about_title')}</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', gap: 16, alignItems: 'start', maxWidth: 1000 }}>
        <img src={new URL('../assets/profile.JPEG', import.meta.url).toString()} alt="Profile photo" style={{ width: 160, height: 160, objectFit: 'cover', borderRadius: 16, border: '1px solid var(--panelBorder)' }} />
        <div>
          <p style={{ color: 'var(--muted)', maxWidth: 800 }}>
            I'm a passionate web developer with a Bachelor's degree from EMiT Fianarantsoa, specializing in building modern, scalable, and performance-driven web applications. I transform business challenges into elegant digital solutions that deliver measurable results.
          </p>
          <p style={{ color: 'var(--muted)', maxWidth: 800 }}>
            With expertise in cutting-edge technologies and a proven track record of creating sophisticated, user-centric platforms, I help businesses and entrepreneurs establish powerful digital presences that stand out in today's competitive landscape.
          </p>
          <p style={{ color: 'var(--muted)', maxWidth: 800 }}>
            📍 Based in Madagascar — Available worldwide.
          </p>
          <div style={{ display: 'flex', gap: 12, marginTop: 8 }}>
            <a href="mailto:tsikyloharanontsoa@gmail.com" className="chip">Email</a>
            <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" className="chip">GitHub</a>
            <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" className="chip">LinkedIn</a>
          </div>
        </div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: 16, marginTop: 24 }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Highlights</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            <li>3D Web with React Three Fiber</li>
            <li>Micro-interactions & motion design</li>
            <li>Performance and a11y focus</li>
          </ul>
        </div>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>Skills</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            <li>React, TypeScript, Zustand</li>
            <li>Framer Motion, GSAP</li>
            <li>Three.js, R3F, postprocessing</li>
          </ul>
        </div>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <div style={{ fontWeight: 700, marginBottom: 8 }}>What I Offer</div>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            <li>Strategic development aligned to business goals</li>
            <li>Performance optimization and responsive design</li>
            <li>Clear communication and post-launch support</li>
          </ul>
        </div>
      </div>
    </SectionWrapper>
  )
}

export function Contact() {
  const t = useI18n()
  const email = useUIStore((s) => s.placeholders.email)
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setValues({ ...values, [e.target.name]: e.target.value })
  }
  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.email || !values.message) {
      setStatus('error')
      return
    }
    setStatus('sending')
    const mailto = `mailto:${email}?subject=${encodeURIComponent('Portfolio contact from ' + values.name)}&body=${encodeURIComponent(values.message + '\n\nFrom: ' + values.email)}`
    window.location.href = mailto
    setTimeout(() => setStatus('sent'), 500)
  }
  return (
    <SectionWrapper id="contact">
      <h2 style={{ color: 'var(--fg)', marginBottom: 16 }}>{t('contact_title')}</h2>
      <p style={{ color: 'var(--muted)' }}>{t('contact_desc')}</p>
      <form onSubmit={onSubmit} style={{ display: 'grid', gap: 12, maxWidth: 560, marginTop: 16 }}>
        <input name="name" placeholder="Name" value={values.name} onChange={onChange} style={{
          background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 10, padding: '12px 14px', color: 'var(--fg)'
        }} />
        <input name="email" placeholder="Email" value={values.email} onChange={onChange} type="email" style={{
          background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 10, padding: '12px 14px', color: 'var(--fg)'
        }} />
        <textarea name="message" placeholder="Message" value={values.message} onChange={onChange} rows={5} style={{
          background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 10, padding: '12px 14px', color: 'var(--fg)', resize: 'vertical'
        }} />
        <button type="submit" disabled={status==='sending'} style={{
          background: 'var(--fg)', color: 'var(--bg)', borderRadius: 10, padding: '12px 16px', fontWeight: 700, border: 'none'
        }}>{t('contact_send')}</button>
        {status==='sent' && <div role="status" style={{ color: 'var(--muted)' }}>Message prepared in your mail client.</div>}
        {status==='error' && <div role="alert" style={{ color: '#ff6b6b' }}>Please provide a valid email and message.</div>}
      </form>
      <div style={{ display: 'flex', gap: 12, marginTop: 16 }}>
        <a href={`mailto:${email}`} className="chip">Email</a>
        <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" className="chip">GitHub</a>
        <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" className="chip">LinkedIn</a>
      </div>
    </SectionWrapper>
  )
}

export function Footer() {
  const t = useI18n()
  return (
    <footer style={{
      padding: '48px 24px',
      color: 'var(--muted)',
      textAlign: 'center',
      borderTop: '1px solid var(--panelBorder)'
    }}>
      <div style={{ marginBottom: 8 }}>
        <a href="mailto:tsikyloharanontsoa@gmail.com" className="chip" style={{ marginRight: 6 }}>Email</a>
        <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" className="chip" style={{ marginRight: 6 }}>GitHub</a>
        <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" className="chip">LinkedIn</a>
      </div>
      © {new Date().getFullYear()} Tsiky Lalaina. {t('footer_text')}
    </footer>
  )
}


