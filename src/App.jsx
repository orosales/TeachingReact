import './App.css'
import JSXDemo from './components/1-JSX/JSXDemo'
import PropsDemo from './components/2-Props/PropsDemo'
import StateDemo from './components/3-State/StateDemo'
import VirtualDOMDemo from './components/4-VirtualDOM/VirtualDOMDemo'
import UseEffectDemo from './components/5-UseEffect/UseEffectDemo'
import UseContextDemo from './components/6-UseContext/UseContextDemo'
import UseRefDemo from './components/7-UseRef/UseRefDemo'
import AdvancedUseStateDemo from './components/8-AdvancedUseState/AdvancedUseStateDemo'

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

        {/* Section 5: useEffect Hook */}
        <section className="demo-section">
          <h2>5. useEffect Hook - Side Effects</h2>
          <UseEffectDemo />
        </section>

        {/* Section 6: useContext Hook */}
        <section className="demo-section">
          <h2>6. useContext Hook - Global State</h2>
          <UseContextDemo />
        </section>

        {/* Section 7: useRef Hook */}
        <section className="demo-section">
          <h2>7. useRef Hook - DOM Access & Mutable Values</h2>
          <UseRefDemo />
        </section>

        {/* Section 8: Advanced useState */}
        <section className="demo-section">
          <h2>8. Advanced useState Patterns</h2>
          <AdvancedUseStateDemo />
        </section>
      </main>

      <footer className="app-footer">
        <p>Built with React + Vite | Open DevTools Console for additional insights</p>
      </footer>
    </div>
  )
}

export default App
