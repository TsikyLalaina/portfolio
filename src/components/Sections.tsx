import { motion, useInView, type Variants } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { useI18n } from '../i18n'
import { useUIStore } from '../store/ui'
import { Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { FiCheck } from 'react-icons/fi'

function SectionWrapper({ id, children }: { id: string, children: React.ReactNode }) {
  return (
    <section id={id} style={{ padding: 'clamp(var(--space-md), 10vw, var(--space-xl)) clamp(16px, 5vw, 24px)', maxWidth: 1200, margin: '0 auto', width: '100%' }}>
      {children}
    </section>
  )
}

const fadeInUp: Variants = {
  hidden: { y: 30, opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { duration: 0.6, ease: "easeOut" } }
}

const staggerContainer: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.1
    }
  }
}

export function Projects() {
  const t = useI18n()
  return (
    <SectionWrapper id="projects">
      <motion.div 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <h2 style={{ color: 'var(--fg)', marginBottom: 16 }}>{t('projects_title')}</h2>
        <p style={{ color: 'var(--muted)' }}>{t('projects_desc')}</p>
      </motion.div>
      
      <motion.div 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 20, marginTop: 24 }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        {projects.map((p) => (
          <motion.div key={p.id} variants={fadeInUp}>
            <Link to={`/project/${p.id}`} className="project-card">
              <div className="project-thumbnail-container">
                {p.image ? (
                  <>
                    <img src={p.image} alt={`${p.title} preview`} className="project-thumbnail" />
                    <div className="project-thumbnail-overlay" />
                  </>
                ) : (
                  <div className="project-thumbnail-placeholder" style={{ background: p.heroColor }} />
                )}
              </div>
              <div className="project-title">{p.title}</div>
              <div className="project-tags">{p.tags.join(' • ')}</div>
              {p.tech && p.tech.length > 0 && (
                <div className="tech-tags">
                  {p.tech.map((tech, index) => (
                    <span key={index} className="tech-tag">{tech}</span>
                  ))}
                </div>
              )}
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}

export function About() {
  const t = useI18n()
  return (
    <SectionWrapper id="about">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <h2 style={{ color: 'var(--fg)', marginBottom: 16 }}>{t('about_title')}</h2>
      </motion.div>
      
      <motion.div 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, alignItems: 'start', maxWidth: 1000 }}
        variants={fadeInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.img 
          src={new URL('../assets/profile.jpg', import.meta.url).toString()} 
          alt="Profile photo" 
          className="profile-photo"
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        />
        <div>
          <motion.div variants={staggerContainer} initial="hidden" whileInView="visible" viewport={{ once: true }}>
            <motion.p variants={fadeInUp} style={{ color: 'var(--muted)', maxWidth: 800 }}>
              I'm a passionate web developer with a Bachelor's degree from EMiT Fianarantsoa, specializing in building modern, scalable, and performance-driven web applications. I transform business challenges into elegant digital solutions that deliver measurable results.
            </motion.p>
            <motion.p variants={fadeInUp} style={{ color: 'var(--muted)', maxWidth: 800 }}>
              With expertise in cutting-edge technologies and a proven track record of creating sophisticated, user-centric platforms, I help businesses and entrepreneurs establish powerful digital presences that stand out in today's competitive landscape.
            </motion.p>
            <motion.p variants={fadeInUp} style={{ color: 'var(--muted)', maxWidth: 800 }}>
              📍 Based in Madagascar — Available worldwide.
            </motion.p>
          </motion.div>
          <motion.div 
            style={{ display: 'flex', gap: 12, marginTop: 8, flexWrap: 'wrap' }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4 }}
          >
            <a href="mailto:tsikyloharanontsoa@ala-mg.com" className="chip">Email</a>
            <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" className="chip">GitHub</a>
            <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" className="chip">LinkedIn</a>
          </motion.div>
        </div>
      </motion.div>

      <motion.div 
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: 16, marginTop: 24 }}
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
      >
        <motion.div className="about-card" variants={fadeInUp} whileHover={{ y: -6 }}>
          <div className="about-card-title">Highlights</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              '3D Web with React Three Fiber',
              'Micro-interactions & motion design',
              'Performance and a11y focus'
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--muted)', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.5 }}>
                <FiCheck style={{ color: 'var(--brand)', marginTop: 4, minWidth: 16 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div className="about-card" variants={fadeInUp} whileHover={{ y: -6 }}>
          <div className="about-card-title">Skills</div>
          <div className="tech-tags" style={{ marginTop: 0 }}>
            {['React', 'TypeScript', 'Zustand', 'Framer Motion', 'GSAP', 'Three.js', 'R3F', 'Postprocessing'].map(skill => (
              <span key={skill} className="tech-tag" style={{ fontSize: 13 }}>{skill}</span>
            ))}
          </div>
        </motion.div>
        <motion.div className="about-card" variants={fadeInUp} whileHover={{ y: -6 }}>
          <div className="about-card-title">What I Offer</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Strategic development aligned to business goals',
              'Performance optimization and responsive design',
              'Clear communication and post-launch support'
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--muted)', fontSize: 'clamp(14px, 2vw, 16px)', lineHeight: 1.5 }}>
                <FiCheck style={{ color: 'var(--brand)', marginTop: 4, minWidth: 16 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </motion.div>
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
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10%" }}
        variants={fadeInUp}
      >
        <h2 style={{ color: 'var(--fg)', marginBottom: 16 }}>{t('contact_title')}</h2>
        <p style={{ color: 'var(--muted)' }}>{t('contact_desc')}</p>
      </motion.div>
      
      <motion.form 
        onSubmit={onSubmit} 
        className="contact-form"
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <motion.input 
          variants={fadeInUp}
          name="name" 
          placeholder="Name" 
          value={values.name} 
          onChange={onChange} 
          className="form-input"
        />
        <motion.input 
          variants={fadeInUp}
          name="email" 
          placeholder="Email" 
          value={values.email} 
          onChange={onChange} 
          type="email" 
          className="form-input"
        />
        <motion.textarea 
          variants={fadeInUp}
          name="message" 
          placeholder="Message" 
          value={values.message} 
          onChange={onChange} 
          rows={5} 
          className="form-input form-textarea"
        />
        <motion.button 
          variants={fadeInUp}
          type="submit" 
          disabled={status==='sending'} 
          className="submit-btn"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.98 }}
        >
          {status === 'sending' ? (
            <span className="submit-btn-loading">
              <span className="submit-btn-spinner" />
              Sending...
            </span>
          ) : (
            t('contact_send')
          )}
        </motion.button>
        {status==='sent' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" className="form-status form-status-success">
            ✓ Message prepared in your mail client.
          </motion.div>
        )}
        {status==='error' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} role="status" className="form-status form-status-error">
            ✕ Please provide a valid email and message.
          </motion.div>
        )}
      </motion.form>
      
      <motion.div 
        className="contact-links"
        initial={{ opacity: 0, x: -20 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4 }}
      >
        <a href={`mailto:${email}`} className="contact-link">📧 Email</a>
        <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" className="contact-link">💻 GitHub</a>
        <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" className="contact-link">💼 LinkedIn</a>
      </motion.div>
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
        <a href="mailto:tsikyloharanontsoa@ala-mg.com" className="chip" style={{ marginRight: 6 }}>Email</a>
        <a href="https://github.com/TsikyLalaina" target="_blank" rel="noreferrer" className="chip" style={{ marginRight: 6 }}>GitHub</a>
        <a href="https://www.linkedin.com/in/tsiky-loharanontsoa-7111b2272/" target="_blank" rel="noreferrer" className="chip">LinkedIn</a>
      </div>
      © {new Date().getFullYear()} Tsiky Lalaina. {t('footer_text')}
    </footer>
  )
}


