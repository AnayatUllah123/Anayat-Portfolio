import { motion } from 'framer-motion';
import { ArrowRight, Code2, Database, Download, Github, GraduationCap, Linkedin, Mail, MapPin, Sparkles } from 'lucide-react';
import { metrics, profile } from '../data/portfolioData';
import Magnetic from './Magnetic';
const item = { hidden: { opacity: 0, y: 28 }, show: { opacity: 1, y: 0, transition: { duration: .56, ease: [.16, 1, .3, 1] } } };
export default function Hero() {
    return <section id="home" className="hero shell">
    <div className="hero-noise"/><div className="hero-grid"/><div className="hero-aurora hero-aurora-a"/><div className="hero-aurora hero-aurora-b"/>
    <div className="hero-layout">
      <motion.div className="hero-copy" initial="hidden" whileInView="show" viewport={{ once: false, amount: 0.35 }} transition={{ staggerChildren: .045 }}>
        <motion.div variants={item} className="availability"><span /> {profile.availability}</motion.div>
        <motion.p variants={item} className="hero-kicker">FULL STACK DEVELOPER <i /> EDUCATOR <i /> PROBLEM SOLVER</motion.p>
        <motion.h1 variants={item}>Hi, I’m<br /><span>Anayat Ullah</span></motion.h1>
        <motion.h2 variants={item}>Full Stack Developer <em>&</em> Educator</motion.h2>
        <motion.p variants={item} className="hero-lead">I design and build polished digital products across the stack — responsive interfaces, robust APIs, data-driven workflows and production-ready deployment.</motion.p>
        <motion.div variants={item} className="hero-actions">
          <Magnetic><a className="button button-primary" href="#work">View My Work <ArrowRight size={17}/></a></Magnetic>
          <a className="button button-ghost" href={profile.resume} download><Download size={17}/> Download Resume</a>
        </motion.div>
        <motion.div variants={item} className="hero-meta">
          <a href={profile.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github /></a>
          <a href={profile.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin /></a>
          <a href={profile.gmail} target="_blank" rel="noreferrer" aria-label="Open Gmail"><Mail /></a>
          <span><MapPin size={15}/> {profile.location}</span>
        </motion.div>
      </motion.div>

      <motion.div className="hero-visual" initial={{ opacity: 0, scale: .94, y: 26 }} whileInView={{ opacity: 1, scale: 1, y: 0 }} viewport={{ once: false, amount: 0.35 }} transition={{ duration: .68, delay: .06, ease: [.16, 1, .3, 1] }}>
        <div className="portrait-orbit portrait-orbit-a"/><div className="portrait-orbit portrait-orbit-b"/>
        <div className="hero-portrait-shell"><img src="/home.png" alt="Anayat Ullah" className="hero-portrait"/><div className="portrait-vignette"/></div>
        <div className="float-card fc-ideas"><Code2 /><span><b>Turning Ideas</b><small>Into Real Products</small></span></div>
        <div className="float-card fc-teaching"><GraduationCap /><span><b>4+ Years</b><small>Teaching Experience</small></span></div>
        <div className="float-card fc-stack"><Database /><span><b>Full Stack</b><small>Product Engineering</small></span></div>
        <div className="hero-script">Build.<br />Learn.<br />Teach.<br />Repeat.</div>
        <div className="hero-pulse"><Sparkles size={14}/> Available for impactful work</div>
      </motion.div>
    </div>

    <div className="metric-strip">
      {metrics.map((m, i) => <motion.div className="metric-card" key={m.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, amount: 0.7 }} transition={{ duration: .45, delay: .18 + i * .045 }}><span className="metric-icon">{['✦', '▦', '◉', '∞'][i]}</span><div><strong>{m.value}</strong><small>{m.label}</small></div></motion.div>)}
    </div>
  </section>;
}
