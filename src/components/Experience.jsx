import { BriefcaseBusiness, MapPin, ArrowUpRight } from 'lucide-react';
import { experience, profile } from '../data/portfolioData';
export default function Experience() {
    return <section id="experience" className="section shell experience-section">
  <div className="section-head"><div><span className="section-kicker">EXPERIENCE</span><h2>A journey across <em>engineering & education.</em></h2></div><p>Industry development and academic mentoring shaped the way I build: technically structured, user-conscious and easy to communicate.</p></div>
  <div className="experience-layout">
   <aside className="experience-summary reveal"><div className="sticky-panel"><BriefcaseBusiness /><span>CAREER SNAPSHOT</span><h3>From teaching fundamentals to building production interfaces.</h3><p>Each role added a different layer: communication, frontend architecture, product thinking, APIs and mentorship.</p><a href={profile.resume} target="_blank" rel="noreferrer">View full resume <ArrowUpRight size={16}/></a></div></aside>
   <div className="experience-list">{experience.map((e, i) => <article className={`experience-card ${e.current ? 'current' : ''}`} key={e.company}><div className="experience-index">{String(i + 1).padStart(2, '0')}</div><div className="company-mark">{e.short}</div><div className="experience-main"><div className="experience-title"><div><h3>{e.company}</h3><p>{e.role}</p></div>{e.current && <span className="current-pill">Current</span>}</div><ul>{e.points.map(p => <li key={p}>{p}</li>)}</ul><div className="experience-meta"><span>{e.period}</span><span><MapPin size={13}/>{e.location}</span></div></div></article>)}</div>
  </div>
 </section>;
}
