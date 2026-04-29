import Hero from "./components/Hero"
import Projects from "./components/Projects"
import Certificates from "./components/Certificates"

function App() {
  return (
    <>

      <div className="background-effects">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <Hero />
      <Projects />
      <Certificates />
    </>
  )
}

export default App