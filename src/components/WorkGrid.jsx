import { useState, useEffect, useRef } from 'react'
import { photosAPI } from '../utils/api'
import '../styles/components.css'

const CATEGORIES = ['All', 'Wedding', 'Pre-Wedding', 'Anniversary', 'Events']

export default function WorkGrid() {
  const [filter, setFilter] = useState('All')
  const [lightbox, setLightbox] = useState(null)
  const [visible, setVisible] = useState({})
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const refs = useRef({})

  useEffect(() => {
    loadPhotos()
  }, [])

  const loadPhotos = async () => {
    try {
      const { data } = await photosAPI.list()
      setPhotos(data)
    } catch (error) {
      console.error('Failed to load photos:', error)
    } finally {
      setLoading(false)
    }
  }

  const filtered = filter === 'All' ? photos : photos.filter((p) => p.category === filter)

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

  if (loading) {
    return (
      <section id="work" className="work-section">
        <p style={{ textAlign: 'center', padding: '40px', color: '#f0ebe0' }}>
          Loading photos...
        </p>
      </section>
    )
  }

  return (
    <section id="work" className="work-section">
     
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