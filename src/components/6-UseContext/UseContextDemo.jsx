import { useState, useContext, createContext } from 'react'
import './UseContextDemo.css'

/**
 * useContext Demo Component
 * Demonstrates the Context API for avoiding prop drilling:
 * - Creating contexts
 * - Providing values
 * - Consuming values with useContext
 * - Multiple contexts
 * - Updating context values
 *
 * Context is like Angular's Services with Dependency Injection
 * It allows you to share data across the component tree without passing props manually
 */

// Create contexts (like creating a service in Angular)
const ThemeContext = createContext()
const UserContext = createContext()
const SettingsContext = createContext()

function UseContextDemo() {
  console.log('🔵 UseContextDemo component rendered')

  // State that will be shared via context
  const [theme, setTheme] = useState('light')
  const [user, setUser] = useState({ name: 'John Doe', role: 'Developer' })
  const [settings, setSettings] = useState({
    notifications: true,
    language: 'en'
  })

  return (
    <div className="usecontext-demo">

      {/* 1. THE PROBLEM: Prop Drilling */}
      <PropDrillingProblem />

      {/* 2. THE SOLUTION: Context API */}
      <div className="demo-card">
        <h3>2. The Solution: Context API</h3>
        <p className="info">Share data without passing props through every level</p>

        {/* Provide theme context to all children */}
        <ThemeContext.Provider value={{ theme, setTheme }}>
          <UserContext.Provider value={{ user, setUser }}>
            <SettingsContext.Provider value={{ settings, setSettings }}>
              <div className="interactive-demo">
                <ContextSolution />
              </div>
            </SettingsContext.Provider>
          </UserContext.Provider>
        </ThemeContext.Provider>

        <div className="code-explanation">
          <pre>{`// 1. Create context
const ThemeContext = createContext()

// 2. Provide value
<ThemeContext.Provider value={{ theme, setTheme }}>
  <ChildComponents />
</ThemeContext.Provider>

// 3. Consume in any child
function ChildComponent() {
  const { theme, setTheme } = useContext(ThemeContext)
  return <div>{theme}</div>
}`}</pre>
        </div>
      </div>

      {/* 3. PRACTICAL EXAMPLE: Theme Switcher */}
      <ThemeExample />

      {/* 4. MULTIPLE CONTEXTS */}
      <MultipleContextsExample />

      {/* 5. BEST PRACTICES & PITFALLS */}
      <ContextBestPractices />
    </div>
  )
}

/**
 * Example 1: The Problem - Prop Drilling
 * Passing props through multiple levels is tedious
 */
function PropDrillingProblem() {
  const [count, setCount] = useState(0)

  // We have to pass these props through EVERY level
  return (
    <div className="demo-card">
      <h3>1. The Problem: Prop Drilling 😫</h3>
      <p className="warning">Passing props through multiple levels is tedious</p>

      <div className="component-tree">
        <div className="tree-level">
          <strong>Grandparent</strong>
          <div className="props-passed">Props: count={count}, setCount</div>
          <GrandparentWithProps count={count} setCount={setCount} />
        </div>
      </div>

      <div className="code-explanation">
        <pre>{`// Grandparent has the state
function Grandparent() {
  const [count, setCount] = useState(0)
  return <Parent count={count} setCount={setCount} />
}

// Parent doesn't need it, just passes it down
function Parent({ count, setCount }) {
  return <Child count={count} setCount={setCount} />
}

// Finally, Child can use it
function Child({ count, setCount }) {
  return <button onClick={() => setCount(count + 1)}>
    {count}
  </button>
}`}</pre>
      </div>
    </div>
  )
}

// Prop drilling example components
function GrandparentWithProps({ count, setCount }) {
  return (
    <div className="tree-level">
      <strong>↓ Parent (doesn't use props, just passes them)</strong>
      <div className="props-passed">Props: count={count}, setCount</div>
      <ParentWithProps count={count} setCount={setCount} />
    </div>
  )
}

function ParentWithProps({ count, setCount }) {
  return (
    <div className="tree-level">
      <strong>↓ Child (finally uses the props!)</strong>
      <div className="props-passed">Props: count={count}, setCount</div>
      <ChildWithProps count={count} setCount={setCount} />
    </div>
  )
}

function ChildWithProps({ count, setCount }) {
  return (
    <div className="child-component">
      <p>Count: {count}</p>
      <button onClick={() => setCount(count + 1)}>Increment</button>
      <p className="note">Props had to travel through 3 levels!</p>
    </div>
  )
}

/**
 * Example 2: Context Solution
 * Skip the middle components entirely!
 */
function ContextSolution() {
  return (
    <div className="component-tree">
      <div className="tree-level">
        <strong>Provider (has the state)</strong>
        <GrandparentWithContext />
      </div>
    </div>
  )
}

function GrandparentWithContext() {
  return (
    <div className="tree-level">
      <strong>↓ Parent (no props needed!)</strong>
      <ParentWithContext />
    </div>
  )
}

function ParentWithContext() {
  return (
    <div className="tree-level">
      <strong>↓ Child (uses context directly!)</strong>
      <ChildWithContext />
    </div>
  )
}

function ChildWithContext() {
  // Access context directly - no props needed!
  const { theme } = useContext(ThemeContext)
  const { user } = useContext(UserContext)

  return (
    <div className="child-component">
      <p>Theme: {theme}</p>
      <p>User: {user.name}</p>
      <p className="note success">✓ No prop drilling! Direct access via useContext!</p>
    </div>
  )
}

/**
 * Example 3: Practical Theme Switcher
 */
function ThemeExample() {
  const [theme, setTheme] = useState('light')

  return (
    <div className="demo-card">
      <h3>3. Practical Example: Theme Switcher</h3>
      <p className="info">Common use case: Global theme management</p>

      <ThemeContext.Provider value={{ theme, setTheme }}>
        <div className={`themed-app ${theme}`}>
          <ThemeControls />
          <ThemedContent />
        </div>
      </ThemeContext.Provider>

      <div className="code-explanation">
        <pre>{`const ThemeContext = createContext()

function App() {
  const [theme, setTheme] = useState('light')
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeControls />
      <Content />
    </ThemeContext.Provider>
  )
}

function ThemeControls() {
  const { theme, setTheme } = useContext(ThemeContext)
  return <button onClick={() => setTheme(
    theme === 'light' ? 'dark' : 'light'
  )}>Toggle</button>
}`}</pre>
      </div>
    </div>
  )
}

function ThemeControls() {
  const { theme, setTheme } = useContext(ThemeContext)

  return (
    <div className="theme-controls">
      <h4>Theme Controls</h4>
      <button onClick={() => setTheme('light')}>
        ☀️ Light
      </button>
      <button onClick={() => setTheme('dark')}>
        🌙 Dark
      </button>
      <button onClick={() => setTheme('blue')}>
        🔵 Blue
      </button>
      <p className="note">Current theme: {theme}</p>
    </div>
  )
}

function ThemedContent() {
  const { theme } = useContext(ThemeContext)

  return (
    <div className="themed-content">
      <h4>Themed Content</h4>
      <p>This content adapts to the theme!</p>
      <p>Current theme from context: <strong>{theme}</strong></p>
    </div>
  )
}

/**
 * Example 4: Multiple Contexts
 */
function MultipleContextsExample() {
  const [user, setUser] = useState({ name: 'Alice', role: 'Admin' })
  const [settings, setSettings] = useState({ notifications: true })

  return (
    <div className="demo-card">
      <h3>4. Using Multiple Contexts</h3>
      <p className="info">You can use multiple contexts in the same component</p>

      <UserContext.Provider value={{ user, setUser }}>
        <SettingsContext.Provider value={{ settings, setSettings }}>
          <div className="interactive-demo">
            <MultiContextConsumer />
          </div>
        </SettingsContext.Provider>
      </UserContext.Provider>

      <div className="code-explanation">
        <pre>{`function Dashboard() {
  const { user, setUser } = useContext(UserContext)
  const { settings, setSettings } = useContext(SettingsContext)
  const { theme, setTheme } = useContext(ThemeContext)

  // Use all three contexts!
  return <div>...</div>
}`}</pre>
      </div>
    </div>
  )
}

function MultiContextConsumer() {
  const { user, setUser } = useContext(UserContext)
  const { settings, setSettings } = useContext(SettingsContext)

  return (
    <div>
      <div className="user-info">
        <h4>User Context</h4>
        <p>Name: {user.name}</p>
        <p>Role: {user.role}</p>
        <input
          type="text"
          value={user.name}
          onChange={(e) => setUser({ ...user, name: e.target.value })}
          placeholder="Change name"
        />
      </div>

      <div className="settings-info">
        <h4>Settings Context</h4>
        <label>
          <input
            type="checkbox"
            checked={settings.notifications}
            onChange={(e) => setSettings({
              ...settings,
              notifications: e.target.checked
            })}
          />
          Enable Notifications: {settings.notifications ? '✓' : '✗'}
        </label>
      </div>

      <p className="note">Both contexts accessed in the same component!</p>
    </div>
  )
}

/**
 * Example 5: Best Practices & Common Pitfalls
 */
function ContextBestPractices() {
  return (
    <div className="demo-card warning-card">
      <h3>5. Best Practices & Common Pitfalls ⚠️</h3>

      <div className="pitfall-item">
        <h4>✓ When to Use Context</h4>
        <ul>
          <li>Theme preferences (light/dark mode)</li>
          <li>User authentication data</li>
          <li>Language/localization settings</li>
          <li>Data that many components need at different nesting levels</li>
        </ul>
      </div>

      <div className="pitfall-item">
        <h4>✗ When NOT to Use Context</h4>
        <ul>
          <li>Passing props 1-2 levels down (just use props!)</li>
          <li>Frequently changing data (can cause performance issues)</li>
          <li>Complex state management (use Redux/Zustand instead)</li>
        </ul>
      </div>

      <div className="pitfall-item">
        <h4>⚠️ Performance Pitfall: Re-renders</h4>
        <pre>{`// ❌ BAD: Creates new object every render
function App() {
  const [user, setUser] = useState({})
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {/* All consumers re-render on EVERY App render! */}
    </UserContext.Provider>
  )
}

// ✓ GOOD: Memoize or use state directly
const value = useMemo(
  () => ({ user, setUser }),
  [user]
)`}</pre>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Interview Questions</h4>
        <div className="qa-section">
          <p><strong>Q: What's the difference between Context and Redux?</strong></p>
          <p><strong>A:</strong> Context is built into React for simple state sharing. Redux is a third-party library for complex state management with time-travel debugging, middleware, and better DevTools.</p>

          <p style={{ marginTop: '15px' }}><strong>Q: How is useContext similar to Angular services?</strong></p>
          <p><strong>A:</strong> Both provide dependency injection. Context is like a singleton service in Angular - create once, inject anywhere. useContext is like Angular's dependency injection in components.</p>

          <p style={{ marginTop: '15px' }}><strong>Q: Does context replace Redux?</strong></p>
          <p><strong>A:</strong> For simple apps, yes. For complex state with async actions, middleware, time-travel debugging, Redux is still preferred.</p>
        </div>
      </div>

      <div className="pitfall-item">
        <h4>🎯 Key Takeaways</h4>
        <ol>
          <li>Context solves prop drilling (like Angular services)</li>
          <li>Create with <code>createContext()</code></li>
          <li>Provide with <code>&lt;Context.Provider value={'{...}'}&gt;</code></li>
          <li>Consume with <code>useContext(Context)</code></li>
          <li>All consumers re-render when context value changes</li>
          <li>Use for global app state, not local component state</li>
        </ol>
      </div>
    </div>
  )
}

export default UseContextDemo
