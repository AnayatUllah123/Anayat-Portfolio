import { Braces, BrainCircuit, GraduationCap, UsersRound, ArrowUpRight, Quote } from 'lucide-react';
import { profile } from '../data/portfolioData';
export default function About() {
    const traits = [['Clean Architecture', 'Readable, reusable and maintainable code.', Braces], ['Problem Solver', 'Structured thinking from problem to production.', BrainCircuit], ['Technical Educator', 'Complex ideas explained clearly and practically.', GraduationCap], ['Team Mindset', 'Communication, mentoring and collaboration.', UsersRound]];
    return <section id="about" className="section shell about-section">
   <div className="section-head"><div><span className="section-kicker">ABOUT ME</span><h2>Developer by craft.<br /><em>Educator by impact.</em></h2></div><p>I combine product engineering with years of teaching and mentoring, which helps me communicate clearly, reason systematically and build software around real people — not just requirements.</p></div>
   <div className="about-grid">
    <article className="about-photo-card reveal"><div className="about-photo-frame"><img src="/anayat-hero-portrait.jpg" alt="Anayat Ullah"/></div><div className="about-photo-meta"><span>Based in Islamabad, Pakistan</span><strong>Open to full-time, freelance & collaboration</strong></div></article>
    <article className="about-story reveal"><span className="eyebrow-chip">MY STORY</span><h3>A full stack developer who enjoys building, teaching and improving systems.</h3><p>{profile.about}</p><p>My experience spans product UI, reusable React/TypeScript components, state management, REST integrations, responsive design, debugging and mentoring. I care about software that is understandable to users and maintainable for teams.</p><a href={profile.linkedin} target="_blank" rel="noreferrer">Explore my professional journey <ArrowUpRight size={16}/></a></article>
    <div className="trait-stack">{traits.map(([title, text, Icon], i) => <article className="trait-card reveal" key={title}><span>{String(i + 1).padStart(2, '0')}</span><Icon /><div><h3>{title}</h3><p>{text}</p></div></article>)}</div>
    <blockquote className="quote-card reveal"><Quote /><p>“Good software is not just about code. It is about people, problems, clarity and possibilities.”</p><cite>— Anayat Ullah</cite></blockquote>
   </div>
 </section>;
}
