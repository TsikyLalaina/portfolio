import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertTriangle, FiTool, FiCheckCircle, FiList, FiBarChart2, FiUser, FiCode } from 'react-icons/fi'
 

export function ProjectPage() {
  const { id } = useParams()
  const project = projects.find((p) => p.id === id)
  if (!project) return <div style={{ padding: 24 }}>Not found</div>
  return (
    <AnimatePresence mode="wait">
      <motion.main
        key={project.id}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ padding: '96px 24px', maxWidth: 960, margin: '0 auto' }}
      >
        <Link to="/" style={{ textDecoration: 'none', color: 'var(--fg)' }}>← Back</Link>
        <h1 style={{ marginTop: 12 }}>{project.title}</h1>
        <div style={{ borderRadius: 12, margin: '16px 0', border: '1px solid var(--panelBorder)', overflow: 'hidden' }}>
          {project.url ? (
            <div style={{ position: 'relative', width: '100%', height: 420 }}>
              <iframe
                src={project.url}
                title={`${project.title} live preview`}
                style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', border: 0 }}
                sandbox="allow-same-origin allow-scripts allow-forms"
                scrolling="yes"
              />
            </div>
          ) : project.image ? (
            <img src={project.image} alt={`${project.title} preview`} style={{ width: '100%', height: 'auto', display: 'block' }} />
          ) : (
            <div style={{ height: 240, background: project.heroColor }} />
          )}
        </div>
        <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginBottom: 16 }}>
          {project.tags.map((t) => (
            <span key={t} className="chip">{t}</span>
          ))}
        </div>
        {project.url && (
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <div style={{ color: 'var(--muted)', fontSize: 14 }}>Live preview above</div>
            <a href={project.url} target="_blank" rel="noreferrer" className="btn-external" aria-label="Open live site in a new tab">
              <span>Open live site</span>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden>
                <path d="M7 17L17 7M17 7H9M17 7V15" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        )}
        
        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {project.content.map((para, i) => (
            <p key={i} style={{ color: 'var(--muted)' }}>{para}</p>
          ))}
        </div>

        <div style={{
          display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: 24
        }}>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiAlertTriangle /> Problem</h3>
            <p style={{ color: 'var(--muted)' }}>{project.problem}</p>
          </div>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiTool /> Approach</h3>
            <p style={{ color: 'var(--muted)' }}>{project.approach}</p>
          </div>
          <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
            <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiCheckCircle /> Outcome</h3>
            <p style={{ color: 'var(--muted)' }}>{project.outcome}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
          {project.process && (
            <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiList /> Process</h3>
              <ol style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
                {project.process.map((step, i) => <li key={i}>{step}</li>)}
              </ol>
            </div>
          )}
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {project.metrics && (
              <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
                <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiBarChart2 /> Metrics</h3>
                <ul style={{ margin: 0, paddingLeft: 18, color: 'var(--muted)' }}>
                  {project.metrics.map((m) => <li key={m.label}><strong>{m.label}:</strong> {m.value}</li>)}
                </ul>
              </div>
            )}
            <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiUser /> Roles</h3>
              <p style={{ color: 'var(--muted)' }}>{project.roles?.join(', ')}</p>
            </div>
            <div style={{ background: 'var(--panel)', border: '1px solid var(--panelBorder)', borderRadius: 12, padding: 16 }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: 8 }}><FiCode /> Tech</h3>
              <p style={{ color: 'var(--muted)' }}>{project.tech?.join(', ')}</p>
            </div>
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  )
}


