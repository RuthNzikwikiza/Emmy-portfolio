import { useEffect, useState } from 'react'
import '../styles/components.css'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <nav className={`nav ${scrolled ? 'scrolled' : ''}`}>
      <div className="nav-logo">
        <span className="name">EMMY</span>
        <span className="sub">001 PHOTOGRAPHY</span>
      </div>

      <div className="nav-links">
        {['Work', 'About', 'Contact'].map((l) => (
          <a key={l} href={`#${l.toLowerCase()}`} data-hover>
            {l}
          </a>
        ))}
      </div>
    </nav>
  )
}