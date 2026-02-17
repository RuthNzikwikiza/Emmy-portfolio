import { useState, useEffect, useRef } from 'react'
import '../styles/components.css'

const PHOTOS = [
  { id: 1, title: 'Forever Begins',  category: 'Wedding',     year: '2024', img: '/images/forever begins.jpeg',    span: 'tall' },
  { id: 2, title: 'Just Us Two',     category: 'Pre-Wedding', year: '2024', img: '/images/just us.jpeg',  span: 'wide' },
  { id: 3, title: 'Golden Vows',     category: 'Anniversary', year: '2023', img: '/images/golden vows.jpeg', span: 'tall' },
  { id: 4, title: 'The Kiss',        category: 'Wedding',     year: '2024', img: '/images/the kiss.jpeg',     span: 'square' },
  { id: 5, title: 'Sunrise Promise', category: 'Pre-Wedding', year: '2024', img: '/images/sunrise promise.jpeg', span: 'wide' },
  { id: 6, title: 'Ten Years Strong',category: 'Anniversary', year: '2023', img: '/images/10years.jpeg',span: 'tall' },
  { id: 7, title: 'Joyful Moments',  category: 'Events',      year: '2024', img: '/images/joyful moment.jpeg',       span: 'square' },
  { id: 8, title: 'Family First',    category: 'Events',      year: '2023', img: '/images/family first.jpeg',       span: 'wide' },
]

const CATEGORIES = ['All', 'Wedding', 'Pre-Wedding', 'Anniversary', 'Events']

export default function WorkGrid() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [visible, setVisible] = useState({})
  const refs = useRef({})

  const filtered = filter === 'All' ? PHOTOS : PHOTOS.filter((p) => p.category === filter)

  useEffect(() => {
    const obs = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) setVisible((v) => ({ ...v, [e.target.dataset.id]: true }))
      }),
      { threshold: 0.15 }
    )
    Object.values(refs.current).forEach((el) => el && obs.observe(el))
    return () => obs.disconnect()
  }, [filtered])

  return (
    <section id="work" className="work-section">
      {/* Header */}
      <div className="work-header">
        <div>
          <p className="label">SELECTED WORK</p>
          <h2>Portfolio</h2>
        </div>
        <div className="filter-pills">
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              className={`pill ${filter === cat ? 'active' : ''}`}
              onClick={() => setFilter(cat)}
              data-hover
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      <div className="photo-grid">
        {filtered.map((photo, i) => (
          <div
            key={photo.id}
            ref={(el) => (refs.current[photo.id] = el)}
            data-id={photo.id}
            className={`photo-item ${photo.span} ${visible[photo.id] ? 'visible' : 'hidden'}`}
            style={{ transitionDelay: `${i * 0.08}s` }}
            onClick={() => setLightbox(photo)}
            data-hover
          >
            <img src={photo.img} alt={photo.title} loading="lazy" />
            <div className="photo-overlay">
              <p className="cat">{photo.category.toUpperCase()} · {photo.year}</p>
              <h3>{photo.title}</h3>
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div className="lightbox" onClick={() => setLightbox(null)}>
          <div style={{ position: 'relative' }}>
            <img src={lightbox.img} alt={lightbox.title} />
            <div className="lightbox-caption">
              <span className="cat">{lightbox.category.toUpperCase()}</span>
              <span style={{ color: 'var(--muted)' }}>·</span>
              <span className="title">{lightbox.title}</span>
            </div>
          </div>
          <button className="lightbox-close">CLOSE</button>
        </div>
      )}
    </section>
  )
}