import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useSpring } from 'framer-motion';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import TechMarquee from './components/TechMarquee';
import About from './components/About';
import FeaturedWork from './components/FeaturedWork';
import Experience from './components/Experience';
import SkillsServices from './components/SkillsServices';
import GithubProjects from './components/GithubProjects';
import AchievementsProcess from './components/AchievementsProcess';
import Credentials from './components/Credentials';
import Reviews from './components/Reviews';
import ContactBooking from './components/ContactBooking';
import Footer from './components/Footer';
import Cursor from './components/Cursor';
import './styles.css';
gsap.registerPlugin(ScrollTrigger);
export default function App() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 32, restDelta: .001 });
    useEffect(() => {
        const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        let lenis, rafId;
        if (!reduced) {
            lenis = new Lenis({ duration: 0.78, smoothWheel: true, wheelMultiplier: 1, touchMultiplier: 1.05 });
            window.lenis = lenis;
            lenis.on('scroll', ScrollTrigger.update);
            const raf = t => { lenis.raf(t); rafId = requestAnimationFrame(raf); };
            rafId = requestAnimationFrame(raf);
        }
        const ctx = gsap.context(() => {
            if (reduced)
                return;
            gsap.utils.toArray('.reveal').forEach((el, i) => {
                gsap.fromTo(el, { opacity: 0, y: 38, filter: 'blur(8px)' }, { opacity: 1, y: 0, filter: 'blur(0px)', duration: .62, delay: (i % 4) * .012, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'restart reverse restart reverse' } });
            });
            gsap.utils.toArray('.section-kicker').forEach(el => gsap.fromTo(el, { letterSpacing: '.35em', opacity: .25 }, { letterSpacing: '.16em', opacity: 1, duration: .68, ease: 'power3.out', scrollTrigger: { trigger: el, start: 'top 92%', toggleActions: 'restart reverse restart reverse' } }));
            gsap.to('.marquee', { xPercent: -50, duration: 38, repeat: -1, ease: 'none' });
            gsap.to('.portrait-orbit-a', { rotate: 360, duration: 30, repeat: -1, ease: 'none' });
            gsap.to('.portrait-orbit-b', { rotate: -360, duration: 22, repeat: -1, ease: 'none' });
            gsap.utils.toArray('.float-card').forEach((el, i) => gsap.to(el, { y: i % 2 ? 10 : -12, rotate: i % 2 ? 1 : -1, duration: 2.15 + i * .24, repeat: -1, yoyo: true, ease: 'sine.inOut' }));
            gsap.utils.toArray('.experience-card').forEach((card, i) => {
                gsap.fromTo(card, { x: i % 2 ? -30 : 30, opacity: 0 }, { x: 0, opacity: 1, duration: .58, ease: 'power3.out', scrollTrigger: { trigger: card, start: 'top 86%', toggleActions: 'restart reverse restart reverse' } });
            });
            ScrollTrigger.refresh();
        });
        const move = e => {
            document.documentElement.style.setProperty('--mx', `${e.clientX}px`);
            document.documentElement.style.setProperty('--my', `${e.clientY}px`);
            if (reduced)
                return;
            const stage = document.querySelector('.hero-portrait-shell');
            if (stage) {
                const x = (e.clientX / window.innerWidth - .5) * 9, y = (e.clientY / window.innerHeight - .5) * 7;
                gsap.to(stage, { x, y, duration: .46, ease: 'power2.out' });
            }
        };
        window.addEventListener('mousemove', move, { passive: true });
        return () => { if (rafId)
            cancelAnimationFrame(rafId); lenis?.destroy(); delete window.lenis; ctx.revert(); window.removeEventListener('mousemove', move); };
    }, []);
    return <div className="app">
    <motion.div className="scroll-progress" style={{ scaleX }}/>
    <div className="ambient-pointer"/>
    <Cursor />
    <Navbar />
    <main>
      <Hero />
      <TechMarquee />
      <About />
      <FeaturedWork />
      <Experience />
      <SkillsServices />
      <GithubProjects />
      <AchievementsProcess />
      <Credentials />
      <Reviews />
      <ContactBooking />
    </main>
    <Footer />
  </div>;
}
