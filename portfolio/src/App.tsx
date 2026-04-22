import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Stats from './components/Stats'
import Services from './components/Services'
import Projects from './components/Projects'
import Testimonial from './components/Testimonial'
import CTA from './components/CTA'
import Footer from './components/Footer'

export default function App() {
  return (
    <div className="noise-overlay bg-[#0c0b0b] min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Stats />
        <Services />
        <Projects />
        <Testimonial />
        <CTA />
      </main>
      <Footer />
    </div>
  )
}
