import { useParams, Link } from 'react-router-dom'
import { projects } from '../data/projects'
import { motion, AnimatePresence } from 'framer-motion'
import { FiAlertTriangle, FiTool, FiCheckCircle, FiList, FiBarChart2, FiUser, FiCode, FiExternalLink, FiMonitor } from 'react-icons/fi'
 

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
        
        <div className="project-preview-container">
          {project.url && (
            <div className="project-preview-banner">
              <FiMonitor className="project-preview-banner-icon" />
              <span className="project-preview-banner-text">Interactive Preview</span>
              <span className="project-preview-banner-note">— figures are forward-looking illustrations for demonstration</span>
            </div>
          )}
          {project.url ? (
            <div className="project-iframe-container">
              <iframe
                src={project.url}
                title={`${project.title} live preview`}
                className="project-iframe"
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
          <div className="project-preview-info">
            <div className="project-live-indicator">
              <span className="project-live-dot" />
              Live preview above
            </div>
            <a href={project.url} target="_blank" rel="noreferrer" className="btn-open-live" aria-label="Open live site in a new tab">
              <span>Open Live Site</span>
              <FiExternalLink className="btn-open-live-icon" />
            </a>
          </div>
        )}
        
        <div style={{ display: 'grid', gap: 12, marginTop: 16 }}>
          {project.content.map((para, i) => (
            <p key={i} style={{ color: 'var(--muted)', lineHeight: 1.7 }}>{para}</p>
          ))}
        </div>

        <div style={{
          display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', marginTop: 24
        }}>
          <div className="project-detail-card">
            <h3><FiAlertTriangle /> Problem</h3>
            <p>{project.problem}</p>
          </div>
          <div className="project-detail-card">
            <h3><FiTool /> Approach</h3>
            <p>{project.approach}</p>
          </div>
          <div className="project-detail-card">
            <h3><FiCheckCircle /> Outcome</h3>
            <p>{project.outcome}</p>
          </div>
        </div>

        <div style={{ display: 'grid', gap: 16, marginTop: 24 }}>
          {project.process && (
            <div className="project-detail-card">
              <h3><FiList /> Process</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {project.process.map((step, i) => (
                  <div key={i} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                    <span style={{ 
                      display: 'grid', 
                      placeItems: 'center', 
                      width: 24, 
                      height: 24, 
                      borderRadius: '50%', 
                      background: 'var(--panelBorder)', 
                      fontSize: 12, 
                      fontWeight: 700 
                    }}>{i + 1}</span>
                    <span style={{ color: 'var(--muted)' }}>{step}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
          <div style={{ display: 'grid', gap: 16, gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))' }}>
            {project.metrics && (
              <div className="project-detail-card">
                <h3><FiBarChart2 /> Metrics</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {project.metrics.map((m) => (
                    <div key={m.label} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--panelBorder)', paddingBottom: 4 }}>
                      <span style={{ color: 'var(--muted)', fontSize: 14 }}>{m.label}</span>
                      <span style={{ fontWeight: 600 }}>{m.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
            <div className="project-detail-card">
              <h3><FiUser /> Roles</h3>
              <p>{project.roles?.join(', ')}</p>
            </div>
            <div className="project-detail-card">
              <h3><FiCode /> Tech</h3>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.tech?.map(t => <span key={t} className="tech-tag">{t}</span>)}
              </div>
            </div>
          </div>
        </div>
      </motion.main>
    </AnimatePresence>
  )
}


