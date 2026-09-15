import { useEffect, useState } from 'react'
import { ArrowUpRight, Award, BadgeCheck, Sparkles, X } from 'lucide-react'
import { certificates } from '../data/portfolioData'

export default function Credentials() {
  const [selected, setSelected] = useState(null)
  const loopCertificates = [...certificates, ...certificates]

  useEffect(() => {
    const onKeyDown = (event) => {
      if (event.key === 'Escape') setSelected(null)
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  return (
    <section id="certificates" className="section certificates-section horizontal-showcase-section">
      <div className="shell">
        <div className="section-row-head reveal">
          <div>
            <span>CREDENTIALS</span>
            <h2>Verified learning and professional milestones.</h2>
          </div>
          <div className="credential-count"><Award size={17} /> {certificates.length} credentials</div>
        </div>

        <div className="certificate-intro-panel reveal">
          <div>
            <span><Sparkles size={15} /> VERIFIED CREDENTIALS</span>
            <h3>Certificates glide across the screen without blocking your scroll.</h3>
          </div>
          <p>
            The credential rail advances automatically. Open any certificate for a larger view,
            or continue to the next portfolio section immediately.
          </p>
        </div>
      </div>

      <div className="auto-showcase certificate-auto-showcase" aria-label="Certificates carousel">
        <div className="auto-showcase-fade auto-showcase-fade-left" />
        <div className="auto-showcase-fade auto-showcase-fade-right" />
        <div className="auto-showcase-track certificate-auto-track">
          {loopCertificates.map((certificate, index) => (
            <article
              className="certificate-card auto-certificate-card"
              key={`${certificate.title}-${index}`}
              onClick={() => setSelected(certificate)}
              tabIndex={0}
              onKeyDown={(event) => {
                if (event.key === 'Enter' || event.key === ' ') {
                  event.preventDefault()
                  setSelected(certificate)
                }
              }}
            >
              <div className="certificate-image-shell">
                <img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" />
                <span><BadgeCheck size={14} /> Verified</span>
              </div>
              <div className="certificate-card-copy">
                <small>{String((index % certificates.length) + 1).padStart(2, '0')}</small>
                <strong>{certificate.issuer}</strong>
                <h3>{certificate.title}</h3>
                {certificate.description && <p>{certificate.description}</p>}
                <button className="certificate-view-link" type="button">
                  View certificate <ArrowUpRight size={15} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>

      {selected && (
        <div className="certificate-modal" role="dialog" aria-modal="true" aria-label={selected.title} onClick={() => setSelected(null)}>
          <div className="certificate-modal-inner" onClick={(event) => event.stopPropagation()}>
            <button className="certificate-modal-close" type="button" onClick={() => setSelected(null)} aria-label="Close certificate">
              <X />
            </button>
            <img src={selected.image} alt={`${selected.title} certificate`} />
            <div className="certificate-modal-copy">
              <span>{selected.issuer}</span>
              <h3>{selected.title}</h3>
              {selected.description && <p>{selected.description}</p>}
              {selected.pdf && <a className="button button-primary" href={selected.pdf} target="_blank" rel="noreferrer">Open PDF <ArrowUpRight size={16} /></a>}
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
