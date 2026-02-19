import Cursor   from '../components/Cursor'
import Nav      from '../components/Nav'
import Hero     from '../components/Hero'
import WorkGrid from '../components/WorkGrid'
import About    from '../components/About'
import Services from '../components/Services'
import Contact  from '../components/Contact'
import Footer   from '../components/Footer'

export default function Home() {
  return (
    <>
      <Cursor />
      <Nav />
      <Hero />
      <WorkGrid />
      <About />
      <Services />
      <Contact />
      <Footer />
    </>
  )
}