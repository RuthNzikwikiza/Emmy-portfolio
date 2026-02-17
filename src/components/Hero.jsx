import { useEffect, useState } from 'react'
import '../styles/components.css'

export default function Hero() {
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const t = setTimeout(() => setLoaded(true), 100)
    return () => clearTimeout(t)
  }, [])

  const cls = loaded ? 'visible' : 'hidden'

  return (
    <section className="hero">
      <div className={`hero-bg ${loaded ? 'loaded' : ''}`} />
      <div className="hero-grain" />

      <div className="hero-content">
        <p className={`hero-tag ${cls}`}>
          PHOTOGRAPHER · MUSANZE, RWANDA
        </p>

        <h1 className={`hero-h1 ${cls}`}>
          Every love<br />
          <em>deserves</em><br />
          to be seen.
        </h1>

        <p className={`hero-desc ${cls}`}>
          Based in Musanze, Rwanda. Capturing your most precious moments —
          weddings, love stories, and celebrations — with warmth and artistry.
        </p>

        <div className={`hero-cta ${cls}`}>
          <a href="#work" data-hover>View Work</a>
          <div className="divider" />
        </div>
      </div>

      <div className={`hero-scroll ${cls}`}>
        <span>SCROLL</span>
        <div className="line" />
      </div>
    </section>
  )
}