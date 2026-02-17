import '../styles/components.css'

const SERVICES = [
  {
    num: '01',
    title: 'Wedding',
    desc: 'Full day coverage of your wedding — from getting ready to the last dance. Every moment, every tear, every smile.',
  },
  {
    num: '02',
    title: 'Pre-Wedding',
    desc: 'A relaxed session before the big day. Just the two of you, natural light, and real connection.',
  },
  {
    num: '03',
    title: 'Anniversary',
    desc: 'Celebrate your love story all over again. Whether it\'s your 1st or 25th year — it deserves to be remembered.',
  },
  {
    num: '04',
    title: 'Events & More',
    desc: 'Engagements, family portraits, traditional ceremonies, graduations — if it matters to you, it matters to me.',
  },
]

export default function Services() {
  return (
    <section className="services-section">
      <p className="label">WHAT I OFFER</p>
      <h2>Services</h2>

      <div className="services-grid">
        {SERVICES.map((s) => (
          <div key={s.num} className="service-card" data-hover>
            <p className="num">{s.num}</p>
            <h3>{s.title}</h3>
            <p>{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  )
}