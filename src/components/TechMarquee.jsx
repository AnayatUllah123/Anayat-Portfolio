import { techStack } from '../data/portfolioData';
const marks = { React: '⚛', 'Next.js': 'N', 'TypeScript': 'TS', 'JavaScript': 'JS', 'Node.js': '⬢', 'Express.js': 'ex', MongoDB: '◆', PostgreSQL: 'PG', MySQL: 'MY', 'Tailwind CSS': '≈', 'Redux Toolkit': '◉', AWS: 'aws', Docker: '◫', Git: '◆', 'REST APIs': 'API', 'Socket.io': '◌', Stripe: 'S', Vercel: '▲' };
export default function TechMarquee() {
    return <section className="tech-section shell">
  <div className="tech-heading"><div><span className="section-kicker">TECHNOLOGIES I WORK WITH</span><h2>Modern tools. <em>Practical engineering.</em></h2></div><p>Frontend polish, backend reliability, data systems and cloud delivery — built as one product experience.</p></div>
  <div className="tech-window"><div className="marquee">{[...techStack, ...techStack].map((t, i) => <div className="tech-chip" key={`${t}-${i}`}><b>{marks[t] || '●'}</b><span>{t}</span></div>)}</div></div>
  <div className="tech-capabilities">
   <article className="reveal"><span>01</span><b>Frontend Systems</b><p>Reusable React/Next.js interfaces, responsive UI, state management and interaction design.</p></article>
   <article className="reveal"><span>02</span><b>Backend & APIs</b><p>Node/Express workflows, REST integrations, authentication patterns and serverless functions.</p></article>
   <article className="reveal"><span>03</span><b>Data & Cloud</b><p>MongoDB, PostgreSQL, MySQL and AWS-oriented workflows for production delivery.</p></article>
   <article className="reveal"><span>04</span><b>Product Quality</b><p>Performance, accessibility, debugging, maintainable architecture and smooth motion.</p></article>
  </div>
 </section>;
}
