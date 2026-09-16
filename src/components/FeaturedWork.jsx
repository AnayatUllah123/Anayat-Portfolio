import {
  ArrowUpRight,
  ExternalLink,
  Github,
  LockKeyhole,
  Sparkles
} from 'lucide-react'
import { featuredWork, profile } from '../data/portfolioData'

function MockVisual({ type }) {
  if (type === 'nuvano') {
    return <div className="mock-ui dashboard-mock"><aside /><main><header /><div className="mock-stats"><i /><i /><i /></div><div className="mock-chart" /><footer /></main></div>
  }
  if (type === 'portfolio') {
    return <div className="mock-ui portfolio-mock"><div className="mini-brand">A</div><div><small>FULL STACK DEVELOPER</small><strong>Build products<br />that feel alive.</strong><span /></div></div>
  }
  if (type === 'seo') {
    return <div className="mock-ui seo-mock"><header /><div className="seo-hero"><span /><b /><i /></div><div className="seo-panels"><i /><i /><i /></div></div>
  }
  return <div className="mock-ui resume-mock"><aside /><main><header /><div className="resume-fields"><i /><i /><i /><i /></div><div className="resume-sheet" /></main></div>
}

function ProjectVisual({ project, previewLive = true }) {
  if (project.url) {
    return (
      <div className="live-project-browser">
        <div className="browser-bar">
          <span className="browser-dots"><i /><i /><i /></span>
          <span className="browser-address">{project.url.replace(/^https?:\/\//, '')}</span>
          <ExternalLink size={14} />
        </div>
        <div className="live-preview-fallback">
          <span>{project.kicker}</span>
          <strong>{project.title}</strong>
          <small>Live production preview</small>
        </div>
        {previewLive && <iframe src={project.url} title={`${project.title} live preview`} loading="lazy" tabIndex="-1" aria-hidden="true" />}
      </div>
    )
  }
  return <MockVisual type={project.visual} />
}

export default function FeaturedWork() {
  const loopProjects = [...featuredWork, ...featuredWork]

  const openProject = (project) => {
    if (project.url) window.open(project.url, '_blank', 'noopener,noreferrer')
  }

  return (
    <section id="work" className="section work-section horizontal-showcase-section">
      <div className="shell">
        <div className="section-row-head reveal">
          <div>
            <span>FEATURED PROJECTS</span>
            <h2>Live work, presented like real products.</h2>
          </div>
          <a className="button button-small" href={profile.github} target="_blank" rel="noreferrer">View All Projects →</a>
        </div>

        <div className="project-intro-panel reveal">
          <div>
            <span><Sparkles size={15} /> SELECTED WORK</span>
            <h3>Projects move automatically — your page never gets trapped.</h3>
          </div>
          <p>
            The showcase glides horizontally on its own. You can keep scrolling vertically at any time,
            while every project stays available as a polished, clickable product card.
          </p>
        </div>
      </div>

      <div className="auto-showcase project-auto-showcase" aria-label="Featured projects carousel">
        <div className="auto-showcase-fade auto-showcase-fade-left" />
        <div className="auto-showcase-fade auto-showcase-fade-right" />
        <div className="auto-showcase-track project-auto-track">
          {loopProjects.map((project, index) => (
            <article
  className={`project-card auto-project-card${project.url ? ' project-card-live' : ''}`}
  key={`${project.title}-${index}`}
  role={project.url ? 'link' : undefined}
  tabIndex={project.url ? 0 : undefined}
  onClick={() => openProject(project)}
  onKeyDown={(event) => {
    if (project.url && (event.key === 'Enter' || event.key === ' ')) {
      event.preventDefault()
      openProject(project)
    }
  }}
>
  <div className="project-visual">
    <ProjectVisual
      project={project}
      previewLive={index < featuredWork.length}
    />

    <span className="project-badge">{project.type}</span>
  </div>

  <div className="project-copy">
    <div className="project-topline">
      <span className="project-number">{project.no}</span>
      <span className="project-kicker">{project.kicker}</span>
    </div>

    <h3>{project.title}</h3>

    <p>{project.description}</p>

    <div className="tag-row">
      {project.stack.slice(0, 3).map((item) => (
        <span key={item}>{item}</span>
      ))}
    </div>

    <div className="project-links">
      {project.url ? (
        <a
          href={project.url}
          target="_blank"
          rel="noreferrer"
          onClick={(event) => event.stopPropagation()}
        >
          Live Project
          <ArrowUpRight size={14} />
        </a>
      ) : (
        <span>
          <LockKeyhole size={14} />
          Private
        </span>
      )}

      <a
        href={profile.github}
        target="_blank"
        rel="noreferrer"
        onClick={(event) => event.stopPropagation()}
      >
        <Github size={15} />
        GitHub
      </a>
    </div>
  </div>
</article>
            // <article
            //   className={`project-card auto-project-card${project.url ? ' project-card-live' : ''}`}
            //   key={`${project.title}-${index}`}
            //   role={project.url ? 'link' : undefined}
            //   tabIndex={project.url ? 0 : undefined}
            //   onClick={() => openProject(project)}
            //   onKeyDown={(event) => {
            //     if (project.url && (event.key === 'Enter' || event.key === ' ')) {
            //       event.preventDefault()
            //       openProject(project)
            //     }
            //   }}
            // >
            //   <div className="project-visual">
            //     <ProjectVisual project={project} previewLive={index < featuredWork.length} />
            //     <span className="project-badge">{project.type}</span>
            //   </div>

            //   <div className="project-copy">
            //     <div className="project-number">{project.no}</div>
            //     <span className="project-kicker">{project.kicker}</span>
            //     <h3>{project.title}</h3>
            //     <p>{project.description}</p>

            //     {project.bullets?.length > 0 && (
            //       <ul className="project-points">
            //         {project.bullets.slice(0, 2).map((bullet) => <li key={bullet}>{bullet}</li>)}
            //       </ul>
            //     )}

            //     <div className="tag-row">
            //       {project.stack.slice(0, 4).map((item) => <span key={item}>{item}</span>)}
            //     </div>

            //     <div className="project-links">
            //       {project.url ? (
            //         <a href={project.url} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
            //           Open Live Project <ArrowUpRight size={15} />
            //         </a>
            //       ) : (
            //         <span><LockKeyhole size={15} /> Experience-backed</span>
            //       )}
            //       <a href={profile.github} target="_blank" rel="noreferrer" onClick={(event) => event.stopPropagation()}>
            //         GitHub <Github size={16} />
            //       </a>
            //     </div>
            //   </div>
            // </article>
          ))}
        </div>
      </div>
    </section>
  )
}
