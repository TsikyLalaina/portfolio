import { motion, useScroll, useTransform, type Variants } from 'framer-motion'
import React, { useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useI18n } from '../i18n'
import { projects } from '../data/projects'
import { emails, githubAccounts, linkedin } from '../data/contacts'

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } },
}

function SectionHeader({ eyebrow, line1, line2 }: { eyebrow: string; line1: string; line2: string }) {
  return (
    <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-15%' }} variants={fadeUp}>
      <p className="eyebrow">{eyebrow}</p>
      <h2 className="display-title">
        {line1} <em>{line2}</em>
      </h2>
    </motion.div>
  )
}

/* ============ Marquee ============ */
const skills = [
  'React', 'Next.js', 'TypeScript', 'Three.js', 'Supabase', 'PostgreSQL',
  'tRPC', 'Prisma', 'Framer Motion', 'Tailwind CSS', 'Stripe', 'Mobile Money',
]

export function Marquee() {
  const items = [...skills, ...skills]
  return (
    <div className="marquee" aria-hidden>
      <div className="marquee-track">
        {items.map((s, i) => (
          <span key={i} className="marquee-item">{s}</span>
        ))}
      </div>
    </div>
  )
}

/* ============ Projects — editorial index ============ */
export function Works() {
  const t = useI18n()
  const navigate = useNavigate()
  const [hovered, setHovered] = useState<string | null>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  const onMove = (e: React.MouseEvent) => {
    const el = previewRef.current
    if (!el) return
    el.style.transform = `translate(${e.clientX + 28}px, ${e.clientY - el.offsetHeight / 2}px)`
  }

  const active = projects.find((p) => p.id === hovered)

  return (
    <section id="work" className="section" onMouseMove={onMove}>
      <SectionHeader eyebrow={t('work_eyebrow')} line1={t('work_title_1')} line2={t('work_title_2')} />

      <div className="works-list" onMouseLeave={() => setHovered(null)}>
        {projects.map((p, i) => (
          <motion.article
            key={p.id}
            className="work-row"
            onMouseEnter={() => setHovered(p.id)}
            onClick={() => navigate(`/project/${p.id}`)}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-8%' }}
            transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); navigate(`/project/${p.id}`) } }}
            aria-label={`${p.title} — ${p.summary}`}
          >
            <span className="work-index">{String(i + 1).padStart(2, '0')}</span>
            <h3 className="work-title">{p.title}</h3>
            <span className="work-tags">{p.tags.slice(0, 3).join(' · ')}</span>
            <p className="work-summary">{p.summary}</p>
            {p.image && (
              <div className="work-row-image">
                <img src={p.image} alt={`${p.title} preview`} loading="lazy" />
              </div>
            )}
          </motion.article>
        ))}
      </div>

      {/* Floating preview follows the cursor (desktop only) */}
      <div
        ref={previewRef}
        className="work-preview"
        style={{ opacity: active ? 1 : 0, transition: 'opacity 0.25s ease' }}
        aria-hidden
      >
        {active?.image
          ? <img src={active.image} alt="" />
          : <div className="fallback" style={{ background: active?.heroColor }} />}
      </div>
    </section>
  )
}

/* ============ Process ============ */
const steps = [
  { n: '01', name: 'Discover', desc: 'Understand the business, the users and what success looks like before a line of code.' },
  { n: '02', name: 'Design', desc: 'Mobile-first UX, prototyped interactions, validated with realistic content.' },
  { n: '03', name: 'Build', desc: 'React / Next.js + TypeScript, typed APIs, accessible and scalable by default.' },
  { n: '04', name: 'Ship & Support', desc: 'Performance passes, clean handover, post-launch iteration and maintenance.' },
]

export function Process() {
  const t = useI18n()
  return (
    <section className="section">
      <SectionHeader eyebrow={t('process_eyebrow')} line1={t('process_title_1')} line2={t('process_title_2')} />
      <motion.div
        className="process-grid"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
      >
        {steps.map((s) => (
          <motion.div key={s.n} className="process-cell" variants={fadeUp}>
            <span className="process-num">{s.n}</span>
            <h3 className="process-name">{s.name}</h3>
            <p className="process-desc">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}

/* ============ About ============ */
const stageWords = [
  { text: 'Full-Stack', cls: 'outline' },
  { text: 'Developer', cls: '' },
  { text: 'React · Next.js', cls: 'accent' },
  { text: 'Developer', cls: 'outline' },
  { text: 'Madagascar', cls: '' },
]

export function About() {
  const t = useI18n()
  const frameRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: frameRef, offset: ['start end', 'end start'] })
  // Word layers drift in alternating directions; the cutout rises slightly
  const xLeft = useTransform(scrollYProgress, [0, 1], ['-4%', '4%'])
  const xRight = useTransform(scrollYProgress, [0, 1], ['4%', '-4%'])
  const cutoutY = useTransform(scrollYProgress, [0, 1], ['3%', '-2%'])

  return (
    <section id="about" className="section">
      <SectionHeader eyebrow={t('about_eyebrow')} line1={t('about_title_1')} line2={t('about_title_2')} />

      <div className="about-grid">
        <motion.div
          ref={frameRef}
          className="about-stage"
          initial={{ opacity: 0, clipPath: 'inset(8% 8% 8% 8%)' }}
          whileInView={{ opacity: 1, clipPath: 'inset(0% 0% 0% 0%)' }}
          viewport={{ once: true, margin: '-12%' }}
          transition={{ duration: 1.1, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="stage-words" aria-hidden>
            {stageWords.map((w, i) => (
              <motion.span
                key={i}
                className={`stage-word ${w.cls}`}
                style={{ x: i % 2 === 0 ? xLeft : xRight }}
              >
                {w.text}
              </motion.span>
            ))}
          </div>
          <motion.img
            className="stage-cutout"
            src={new URL('../assets/profile-cutout.png', import.meta.url).toString()}
            alt="Tsiky Lalaina, full-stack developer"
            style={{ y: cutoutY, x: '-50%' }}
          />
          <span className="about-photo-caption">Antananarivo · Madagascar</span>
        </motion.div>

        <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-12%' }} variants={{ visible: { transition: { staggerChildren: 0.12 } }, hidden: {} }}>
          <motion.p className="about-lede" variants={fadeUp}>
            {t('about_lede').split('elegant').length > 1
              ? <>{t('about_lede').split('elegant')[0]}<em>elegant</em>{t('about_lede').split('elegant')[1]}</>
              : t('about_lede')}
          </motion.p>
          <motion.div className="about-body" variants={fadeUp}>
            <p>{t('about_p1')}</p>
            <p>{t('about_p2')}</p>
          </motion.div>
          <motion.div className="about-stats" variants={fadeUp}>
            <div className="about-stat"><b>{projects.length}+</b><span>{t('about_stat_projects')}</span></div>
            <div className="about-stat"><b>4+</b><span>{t('about_stat_years')}</span></div>
            <div className="about-stat"><b>3</b><span>{t('about_stat_langs')}</span></div>
          </motion.div>
          <motion.div className="about-links" variants={fadeUp}>
            {githubAccounts.map((g) => (
              <a key={g.href} href={g.href} target="_blank" rel="noreferrer" className="chip">{g.label}</a>
            ))}
            <a href={linkedin.href} target="_blank" rel="noreferrer" className="chip">LinkedIn</a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

/* ============ Contact ============ */
export function Contact() {
  const t = useI18n()
  const [values, setValues] = useState({ name: '', email: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')

  const onChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setValues({ ...values, [e.target.name]: e.target.value })

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!values.email || !values.message) { setStatus('error'); return }
    setStatus('sending')
    const mailto = `mailto:${emails[0].label}?subject=${encodeURIComponent('Portfolio contact from ' + values.name)}&body=${encodeURIComponent(values.message + '\n\nFrom: ' + values.email)}`
    window.location.href = mailto
    setTimeout(() => setStatus('sent'), 500)
  }

  return (
    <section id="contact" className="section contact-section">
      <motion.div initial="hidden" whileInView="visible" viewport={{ once: true, margin: '-15%' }} variants={fadeUp}>
        <p className="eyebrow">{t('contact_eyebrow')}</p>
        <a href={`mailto:${emails[0].label}`} className="contact-giant">
          {t('contact_line1')} <em>{t('contact_line2')}</em> <span className="arrow">↗</span>
        </a>
      </motion.div>

      <motion.div
        className="contact-cols"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-10%' }}
        variants={{ visible: { transition: { staggerChildren: 0.1 } }, hidden: {} }}
      >
        <motion.div className="contact-col" variants={fadeUp}>
          <p className="contact-col-label">{t('contact_emails')}</p>
          {emails.map((e) => <a key={e.href} href={e.href} className="contact-link">{e.label}</a>)}
        </motion.div>
        <motion.div className="contact-col" variants={fadeUp}>
          <p className="contact-col-label">{t('contact_github')}</p>
          {githubAccounts.map((g) => <a key={g.href} href={g.href} target="_blank" rel="noreferrer" className="contact-link">{g.label}</a>)}
        </motion.div>
        <motion.div className="contact-col" variants={fadeUp}>
          <p className="contact-col-label">{t('contact_social')}</p>
          <a href={linkedin.href} target="_blank" rel="noreferrer" className="contact-link">{linkedin.label}</a>
        </motion.div>
      </motion.div>

      <motion.form className="contact-form" onSubmit={onSubmit} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeUp}>
        <p className="contact-col-label">{t('contact_form_label')}</p>
        <input className="form-input" name="name" placeholder="Name" value={values.name} onChange={onChange} />
        <input className="form-input" name="email" type="email" placeholder="Email" value={values.email} onChange={onChange} />
        <textarea className="form-input form-textarea" name="message" placeholder="Message" rows={4} value={values.message} onChange={onChange} />
        <button className="submit-btn" type="submit" disabled={status === 'sending'}>
          {status === 'sent' ? '✓' : t('contact_send')}
        </button>
        {status === 'error' && <p style={{ marginTop: 12, color: 'var(--gold)' }}>Email and message are required.</p>}
      </motion.form>
    </section>
  )
}

/* ============ Footer ============ */
export function Footer() {
  const t = useI18n()
  return (
    <footer className="footer">
      <span>© {new Date().getFullYear()} Tsiky Lalaina</span>
      <div className="footer-links">
        {emails.map((e) => <a key={e.href} href={e.href}>{e.label}</a>)}
        {githubAccounts.map((g) => <a key={g.href} href={g.href} target="_blank" rel="noreferrer">{g.label}</a>)}
      </div>
      <span>{t('footer_text')}</span>
    </footer>
  )
}
