import { Menu, Send, X } from 'lucide-react'
import { useState } from 'react'
import { profile } from '../data/portfolioData'

export default function Navbar() {
  const [open, setOpen] = useState(false)

  const links = [
    ['Home', 'home'],
    ['About', 'about'],
    ['Projects', 'work'],
    ['Experience', 'experience'],
    ['Skills', 'skills'],
    ['Certificates', 'certificates'],
    ['Testimonials', 'reviews'],
    ['Contact', 'contact']
  ]

  const handleNavClick = (event, id) => {
    event.preventDefault()
    setOpen(false)

    const section = document.getElementById(id)
    if (!section) return

    const navbar = document.querySelector('.nav-wrap')
    const navbarHeight = navbar?.offsetHeight || 0
    const sectionTop = section.getBoundingClientRect().top + window.scrollY
    const sectionPaddingTop = parseFloat(window.getComputedStyle(section).paddingTop) || 0
    const target = sectionTop + sectionPaddingTop - navbarHeight - 8

    if (window.lenis) {
      window.lenis.scrollTo(target, { immediate: true })
    } else {
      window.scrollTo({ top: target, behavior: 'auto' })
    }

    window.history.replaceState(null, '', `#${id}`)
  }

  return (
    <header className="nav-wrap">
      <nav className="nav shell">
        <a
          href="#home"
          className="brand"
          onClick={(event) => handleNavClick(event, 'home')}
        >
          <span className="brand-mark">A</span>
          <div>
            <strong>{profile.name}</strong>
            <small>Full Stack Developer</small>
          </div>
        </a>

        <div id="mobile-navigation" className={`nav-links ${open ? 'open' : ''}`}>
          {links.map(([label, id]) => (
            <a
              href={`#${id}`}
              key={id}
              onClick={(event) => handleNavClick(event, id)}
            >
              {label}
            </a>
          ))}

          <a
            href="#contact"
            className="nav-cta"
            onClick={(event) => handleNavClick(event, 'contact')}
          >
            <Send size={14} /> Let’s Talk
          </a>
        </div>
        <button className="menu-btn" onClick={() => setOpen((value) => !value)}
        aria-label={open ? 'Close navigation menu' : 'Open navigation menu'}
        aria-expanded={open}
        aria-controls="mobile-navigation">
  {open ? <X size={19} /> : <Menu size={19} />}
</button>
      </nav>
    </header>
  )
}
