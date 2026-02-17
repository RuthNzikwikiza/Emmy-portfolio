import '../styles/components.css'

export default function Footer() {
  return (
    <footer className="footer">
      <p>© 2024 EMMY001 PHOTOGRAPHY</p>
      <div className="footer-links">
        {['Instagram', 'Facebook', 'WhatsApp'].map((s) => (
          <a key={s} href="#" data-hover>{s}</a>
        ))}
      </div>
    </footer>
  )
}