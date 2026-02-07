import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { FiTarget, FiLayout, FiCode, FiTrendingUp, FiTruck, FiLifeBuoy, FiCheck } from 'react-icons/fi'

const workflowSteps = [
  { number: '01', title: 'Discover', icon: FiTarget, desc: 'Deeply understand client needs and business objectives. Define scope, users, and success metrics.' },
  { number: '02', title: 'Design', icon: FiLayout, desc: 'Solutions‑focused UX. Mobile‑first responsive design. Prototype interactions and validate with realistic content.' },
  { number: '03', title: 'Build', icon: FiCode, desc: 'Implement with React 19 + TypeScript 5 and modern tooling (Vite). Robust forms (React Hook Form + Zod). Accessible, scalable code.' },
  { number: '04', title: 'Optimize', icon: FiTrendingUp, desc: 'Performance optimization for lightning‑fast load times, SEO improvements, and thoughtful motion/3D when it adds value.' },
  { number: '05', title: 'Deliver', icon: FiTruck, desc: 'Clear, consistent communication. On‑time delivery with QA, documentation, and handover.' },
  { number: '06', title: 'Support', icon: FiLifeBuoy, desc: 'Post‑launch support and maintenance. Roadmap planning, iteration, and continuous improvements.' },
]

export function Narrative() {
  const ref = useRef<HTMLDivElement>(null)
  const stepsRef = useRef<HTMLDivElement>(null)
  
  // Parallax for the whole section content or header
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const yHeader = useTransform(scrollYProgress, [0, 1], [50, -50])
  
  // Progress line for steps
  const { scrollYProgress: lineProgress } = useScroll({ 
    target: stepsRef, 
    offset: ['start center', 'end center'] 
  })
  
  return (
    <section ref={ref} style={{ position: 'relative', padding: 'clamp(var(--space-md), 10vw, var(--space-xl)) clamp(16px, 5vw, 24px)', maxWidth: 1200, margin: '0 auto' }}>
      <motion.div style={{ y: yHeader }} className="workflow-header">
        <span className="chip">How I work</span>
        <h2 className="workflow-title">Strategy → UX → Build → Optimize → Deliver → Support</h2>
        <p className="workflow-subtitle">Strategic, user‑centric, and performance‑driven from discovery to post‑launch.</p>
      </motion.div>

      <div className="workflow-steps" ref={stepsRef} style={{ position: 'relative' }}>
        {/* Animated Progress Line */}
        <div style={{ position: 'absolute', left: '16px', top: '30px', bottom: '30px', width: '2px', background: 'var(--panelBorder)', borderRadius: '2px' }} />
        <motion.div 
          style={{ 
            position: 'absolute', 
            left: '16px', 
            top: '30px', 
            bottom: '30px', 
            width: '2px', 
            background: 'linear-gradient(to bottom, var(--orange), var(--brand))',
            borderRadius: '2px',
            originY: 0,
            scaleY: lineProgress
          }} 
        />

        {workflowSteps.map((step, index) => {
          const Icon = step.icon
          return (
            <motion.div 
              key={step.number} 
              className="workflow-step"
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-10%" }}
              transition={{ duration: 0.6, delay: index * 0.1, ease: "easeOut" }}
              whileHover={{ x: 10, transition: { duration: 0.2 } }}
            >
              <div className="workflow-step-header">
                <span className="workflow-step-number">{step.number}</span>
                <span className="workflow-step-icon"><Icon /></span>
                <h3 className="workflow-step-title">{step.title}</h3>
              </div>
              <p className="workflow-step-desc">{step.desc}</p>
            </motion.div>
          )
        })}
      </div>

      <div className="workflow-info-grid">
        <motion.div 
          className="workflow-info-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
        >
          <h4 className="workflow-info-title">Commitments</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Clear, consistent communication',
              'Adherence to deadlines and efficient delivery',
              'Post‑launch support and maintenance',
              'Code quality and best practices as standard'
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>
                <FiCheck style={{ color: 'var(--brand)', marginTop: 4, minWidth: 16 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
        <motion.div 
          className="workflow-info-card"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
        >
          <h4 className="workflow-info-title">Tooling</h4>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {[
              'Vite, TypeScript, ESLint',
              'React Hook Form & Zod',
              'Git & GitHub',
              'Agile development practices'
            ].map(item => (
              <div key={item} style={{ display: 'flex', gap: 10, alignItems: 'flex-start', color: 'var(--muted)', fontSize: '15px', lineHeight: 1.5 }}>
                <FiCheck style={{ color: 'var(--brand)', marginTop: 4, minWidth: 16 }} />
                <span>{item}</span>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}


