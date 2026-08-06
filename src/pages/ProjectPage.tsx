import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { projects } from '../data/projects'
import { FiExternalLink } from 'react-icons/fi'

const rise = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as const },
  }),
}

export function ProjectPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  const index = projects.findIndex((p) => p.id === id)
  const next = projects[(index + 1) % projects.length]

  if (!project) return <div style={{ padding: '160px 48px' }}>Not found</div>

  return (
    <main>
      <header className="pp-hero">
        <motion.div custom={0} variants={rise} initial="hidden" animate="visible">
          <Link to="/#work" className="pp-back">← Index</Link>
        </motion.div>
        <motion.h1 className="pp-title" custom={1} variants={rise} initial="hidden" animate="visible">
          {project.title}
        </motion.h1>
        <motion.div className="pp-meta" custom={2} variants={rise} initial="hidden" animate="visible">
          <div className="pp-meta-item">
            <b>Project</b>
            <span>{String(index + 1).padStart(2, '0')} / {String(projects.length).padStart(2, '0')}</span>
          </div>
          <div className="pp-meta-item">
            <b>Role</b>
            <span>{project.roles?.join(', ') ?? 'Fullstack'}</span>
          </div>
          <div className="pp-meta-item">
            <b>Focus</b>
            <span>{project.tags.join(' · ')}</span>
          </div>
          {project.github && (
            <div className="pp-meta-item">
              <b>Source</b>
              <span><a href={project.github} target="_blank" rel="noreferrer" className="pp-open-live">GitHub <FiExternalLink /></a></span>
            </div>
          )}
        </motion.div>
      </header>

      <div className="pp-body">
        <motion.div className="pp-frame" custom={3} variants={rise} initial="hidden" animate="visible">
          {project.url && (
            <div className="pp-live-bar">
              <span><span className="pp-live-dot" />Live preview</span>
              <a href={project.url} target="_blank" rel="noreferrer" className="pp-open-live">
                Open site <FiExternalLink />
              </a>
            </div>
          )}
          {project.url ? (
            <iframe
              src={project.url}
              title={`${project.title} live preview`}
              className="pp-iframe"
              sandbox="allow-same-origin allow-scripts allow-forms"
              loading="lazy"
            />
          ) : project.image ? (
            <img src={project.image} alt={`${project.title} preview`} style={{ width: '100%', display: 'block' }} />
          ) : (
            <div style={{ height: 320, background: project.heroColor }} />
          )}
        </motion.div>

        <div className="pp-columns">
          <div className="pp-narrative">
            <div>
              <p className="pp-section-label">The problem</p>
              <p>{project.problem}</p>
            </div>
            <div>
              <p className="pp-section-label">The approach</p>
              <p>{project.approach}</p>
            </div>
            {project.process && (
              <div>
                <p className="pp-section-label">Process</p>
                <div className="pp-list">
                  {project.process.map((step, i) => (
                    <div key={i} className="pp-list-item">
                      <span className="n">{String(i + 1).padStart(2, '0')}</span>
                      <span>{step}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div>
              <p className="pp-section-label">Outcome</p>
              <p>{project.outcome}</p>
            </div>
          </div>

          <aside className="pp-aside">
            <div>
              <p className="pp-section-label">Highlights</p>
              <div className="pp-list">
                {project.content.map((line, i) => (
                  <div key={i} className="pp-list-item">
                    <span className="n">✦</span>
                    <span>{line}</span>
                  </div>
                ))}
              </div>
            </div>
            {project.metrics && (
              <div>
                <p className="pp-section-label">Metrics</p>
                {project.metrics.map((m) => (
                  <div key={m.label} className="pp-metric">
                    <span>{m.label}</span>
                    <b>{m.value}</b>
                  </div>
                ))}
              </div>
            )}
            {project.tech && (
              <div>
                <p className="pp-section-label">Stack</p>
                <div className="pp-tech-tags">
                  {project.tech.map((t) => <span key={t} className="tech-tag">{t}</span>)}
                </div>
              </div>
            )}
          </aside>
        </div>

        <div style={{ marginTop: 'clamp(64px, 10vw, 120px)', borderTop: '1px solid var(--line)', paddingTop: 32 }}>
          <p className="pp-section-label">Next project</p>
          <Link to={`/project/${next.id}`} className="contact-giant" style={{ fontSize: 'clamp(36px, 6vw, 80px)' }}>
            {next.title} <span className="arrow">→</span>
          </Link>
        </div>
      </div>
    </main>
  )
}
