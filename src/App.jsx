import './App.css'
import JSXDemo from './components/1-JSX/JSXDemo'
import PropsDemo from './components/2-Props/PropsDemo'
import StateDemo from './components/3-State/StateDemo'
import VirtualDOMDemo from './components/4-VirtualDOM/VirtualDOMDemo'

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>React Fundamentals Learning Path</h1>
        <p>Interactive examples covering core React concepts</p>
      </header>

      <main className="main-content">
        {/* Section 1: JSX Fundamentals */}
        <section className="demo-section">
          <h2>1. JSX (JavaScript XML)</h2>
          <JSXDemo />
        </section>

        {/* Section 2: Props */}
        <section className="demo-section">
          <h2>2. Props (Properties)</h2>
          <PropsDemo />
        </section>

        {/* Section 3: State */}
        <section className="demo-section">
          <h2>3. State Management</h2>
          <StateDemo />
        </section>

        {/* Section 4: Virtual DOM */}
        <section className="demo-section">
          <h2>4. Virtual DOM & Reconciliation</h2>
          <VirtualDOMDemo />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React + Vite | Open DevTools Console for additional insights</p>
      </footer>
    </div>
  )
}

export default App
