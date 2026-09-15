import { useState } from 'react';
import { Code2, ServerCog, Database, CloudCog, Wrench, ArrowRight } from 'lucide-react';
import { skillGroups, services } from '../data/portfolioData';
const icons = { Frontend: Code2, Backend: ServerCog, Database, 'Cloud & DevOps': CloudCog, Tools: Wrench };
export default function SkillsServices() {
    const [active, setActive] = useState('Frontend');
    const group = skillGroups.find(g => g.title === active) || skillGroups[0];
    const Icon = icons[group.title] || Code2;
    return <section id="skills" className="section shell skills-section">
  <div className="section-head"><div><span className="section-kicker">SKILLS & SERVICES</span><h2>Built to work across <em>the full product stack.</em></h2></div><p>A professional portfolio should show more than a tool list. These are the capabilities I use to move from interface to integration and delivery.</p></div>
  <div className="skills-layout">
   <div className="skills-console reveal">
    <div className="skill-tabs">{skillGroups.map(g => { const G = icons[g.title] || Code2; return <button className={active === g.title ? 'active' : ''} onClick={() => setActive(g.title)} key={g.title}><G /><span><b>{g.title}</b><small>{g.subtitle}</small></span></button>; })}</div>
    <div className="skill-panel"><div className="skill-panel-head"><Icon /><div><small>ACTIVE CAPABILITY</small><h3>{group.title}</h3><p>{group.subtitle}</p></div></div><div className="skill-cells">{group.items.map((x, i) => <div className="skill-cell" key={x}><span>{String(i + 1).padStart(2, '0')}</span><b>{x}</b><i /></div>)}</div></div>
   </div>
   <div className="services-grid">{services.map((s, i) => <article className="service-card reveal" key={s.no}><span>{s.no}</span><h3>{s.title}</h3><p>{s.text}</p><div className="service-arrow"><ArrowRight /></div><div className="service-glow"/></article>)}</div>
  </div>
 </section>;
}
