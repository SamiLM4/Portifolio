import Hero from "./components/Hero"
import Projects from "./components/Projects"

function App() {
  return (
    <>

      <div className="background-effects">
        <div className="blob blob-1"></div>
        <div className="blob blob-2"></div>
      </div>

      <Hero />
      <Projects />
    </>
  )
}

export default App