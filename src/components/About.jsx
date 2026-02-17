import '../styles/components.css'

export default function About() {
  return (
    <section id="about" className="about-section">
      {/* Photo */}
      <div className="about-img-wrap">
        <img
          src="/images/emmy.jpeg"
          alt="Emmy001 Photographer"
        />
        <div className="about-badge">MUSANZE · RWANDA</div>
      </div>

      {/* Text */}
      <div className="about-text">
        <p className="label">ABOUT THE PHOTOGRAPHER</p>
        <h2>Emmy001<br />Photography</h2>

        <p className="p-main">
          I believe every love story deserves to be told beautifully. Based in
          Musanze, Rwanda, I specialize in capturing the emotion, joy, and
          intimacy of your most important days.
        </p>

        <p className="p-sub">
          From the nervous excitement before the ceremony to the first dance
          and everything in between — I'm there for every moment. Weddings,
          pre-wedding shoots, anniversaries, and special celebrations across
          Rwanda and beyond.
        </p>
      </div>
    </section>
  )
}