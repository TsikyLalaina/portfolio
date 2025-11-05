import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiTarget, FiLayout, FiCode, FiTrendingUp, FiTruck, FiLifeBuoy } from 'react-icons/fi'

export function Narrative() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y1 = useTransform(scrollYProgress, [0, 1], [50, -50])
  const y2 = useTransform(scrollYProgress, [0, 1], [80, -80])

  return (
    <section ref={ref} style={{ position: 'relative', padding: '120px 24px', maxWidth: 1200, margin: '0 auto' }}>
      <div style={{ textAlign: 'center', marginBottom: 24 }}>
        <span className="chip">How I work</span>
        <h2 style={{ marginTop: 12 }}>Strategy → UX → Build → Optimize → Deliver → Support</h2>
        <p style={{ color: 'var(--muted)' }}>Strategic, user‑centric, and performance‑driven from discovery to post‑launch.</p>
      </div>

      <div style={{ display: 'grid', gap: 24 }}>
        <motion.div style={{ y: y1, background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiTarget /> 01 — Discover</h3>
          <p style={{ color: 'var(--muted)' }}>Deeply understand client needs and business objectives. Define scope, users, and success metrics.</p>
        </motion.div>
        <motion.div style={{ y: y2, background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiLayout /> 02 — Design</h3>
          <p style={{ color: 'var(--muted)' }}>Solutions‑focused UX. Mobile‑first responsive design. Prototype interactions and validate with realistic content.</p>
        </motion.div>
        <motion.div style={{ y: y1, background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiCode /> 03 — Build</h3>
          <p style={{ color: 'var(--muted)' }}>Implement with React 19 + TypeScript 5 and modern tooling (Vite). Robust forms (React Hook Form + Zod). Accessible, scalable code.</p>
        </motion.div>
        <motion.div style={{ y: y2, background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiTrendingUp /> 04 — Optimize</h3>
          <p style={{ color: 'var(--muted)' }}>Performance optimization for lightning‑fast load times, SEO improvements, and thoughtful motion/3D when it adds value.</p>
        </motion.div>
        <motion.div style={{ y: y1, background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiTruck /> 05 — Deliver</h3>
          <p style={{ color: 'var(--muted)' }}>Clear, consistent communication. On‑time delivery with QA, documentation, and handover.</p>
        </motion.div>
        <motion.div style={{ y: y2, background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiLifeBuoy /> 06 — Support</h3>
          <p style={{ color: 'var(--muted)' }}>Post‑launch support and maintenance. Roadmap planning, iteration, and continuous improvements.</p>
        </motion.div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 16, marginTop: 24 }}>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h4>Commitments</h4>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            <li>Clear, consistent communication</li>
            <li>Adherence to deadlines and efficient delivery</li>
            <li>Post‑launch support and maintenance</li>
            <li>Code quality and best practices as standard</li>
          </ul>
        </div>
        <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
          <h4>Tooling</h4>
          <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
            <li>Vite, TypeScript, ESLint</li>
            <li>React Hook Form & Zod</li>
            <li>Git & GitHub</li>
            <li>Agile development practices</li>
          </ul>
        </div>
      </div>
    </section>
  )
}


